(() => {
  const config = window.LISA_SUPABASE || {};
  const sessionKey = 'lisa-admin-session-v1';
  const setup = document.querySelector('#setup');
  const login = document.querySelector('#login');
  const dashboard = document.querySelector('#dashboard');
  const logout = document.querySelector('#logout');
  const escapeHtml = value => String(value || '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
  const configured = /^https:\/\/.+\.supabase\.co$/i.test(config.url || '') && !!config.publishableKey;
  const getSession = () => { try { return JSON.parse(sessionStorage.getItem(sessionKey)); } catch { return null; } };
  const setSession = session => sessionStorage.setItem(sessionKey, JSON.stringify(session));
  const authHeaders = session => ({ apikey: config.publishableKey, Authorization: `Bearer ${session.access_token}`, 'Content-Type': 'application/json' });
  const optionsText = item => (item.options || []).join(' · ');
  const statuses = ['awaiting_lisa','awaiting_payment','paid','processing','shipped','completed','cancelled'];
  const statusLabel = value => value.split('_').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');

  const renderOrders = orders => {
    const box = document.querySelector('#orders');
    if (!orders.length) { box.innerHTML = '<p class="empty">No orders have been created yet.</p>'; return; }
    box.innerHTML = orders.map(order => {
      const customer = order.customer || {};
      const address = [customer.address,customer.apartment,customer.city,customer.region,customer.postalCode,customer.country].filter(Boolean).join(', ');
      const items = (order.items || []).map(item => `<article class="admin-item"><b>${escapeHtml(item.title)}</b><small>${item.code ? `Product ${escapeHtml(item.code)} · ` : ''}${item.sku ? `SKU ${escapeHtml(item.sku)} · ` : ''}${escapeHtml(optionsText(item))} · Qty ${Number(item.quantity || 1)}</small></article>`).join('');
      return `<article class="order-card"><div class="order-summary"><div class="order-number"><small>ORDER NUMBER</small><b>${escapeHtml(order.order_number)}</b><span>${new Date(order.created_at).toLocaleString()}</span></div><div class="order-status"><label for="status-${order.id}">Status</label><select id="status-${order.id}" data-order-id="${order.id}">${statuses.map(status => `<option value="${status}" ${status === order.status ? 'selected' : ''}>${statusLabel(status)}</option>`).join('')}</select></div></div><div class="order-details"><div class="customer"><h2>CUSTOMER &amp; DELIVERY</h2><p><b>${escapeHtml(customer.name)}</b></p><p>${escapeHtml(customer.contactMethod)}: ${escapeHtml(customer.contact)}</p><p>${escapeHtml(address)}</p>${customer.notes ? `<p>Notes: ${escapeHtml(customer.notes)}</p>` : ''}<p class="total">$${Number(order.estimated_total).toFixed(2)} USD</p></div><div class="order-items"><h2>PRODUCTS</h2>${items}</div></div></article>`;
    }).join('');
    box.querySelectorAll('[data-order-id]').forEach(select => select.onchange = () => updateStatus(select));
  };

  const loadOrders = async () => {
    const session = getSession();
    const response = await fetch(`${config.url}/rest/v1/orders?select=id,order_number,status,customer,items,estimated_total,created_at,updated_at&order=created_at.desc`, { headers: authHeaders(session) });
    if (response.status === 401 || response.status === 403) return signOut();
    if (!response.ok) throw new Error(await response.text());
    renderOrders(await response.json());
  };
  const updateStatus = async select => {
    select.disabled = true;
    try {
      const response = await fetch(`${config.url}/rest/v1/orders?id=eq.${encodeURIComponent(select.dataset.orderId)}`, { method:'PATCH', headers:{...authHeaders(getSession()), Prefer:'return=minimal'}, body:JSON.stringify({status:select.value}) });
      if (!response.ok) throw new Error(await response.text());
    } catch (error) { alert('Could not update this order status.'); await loadOrders(); }
    finally { select.disabled = false; }
  };
  const showDashboard = async () => {
    login.hidden = true; setup.hidden = true; dashboard.hidden = false; logout.hidden = false;
    try { await loadOrders(); } catch (error) { document.querySelector('#orders').innerHTML = '<p class="empty">Could not load orders. Please refresh or sign in again.</p>'; }
  };
  const signOut = () => { sessionStorage.removeItem(sessionKey); dashboard.hidden = true; logout.hidden = true; login.hidden = false; };

  if (!configured) setup.hidden = false;
  else if (getSession()?.access_token) showDashboard();
  else login.hidden = false;

  login.querySelector('form').onsubmit = async event => {
    event.preventDefault();
    const error = login.querySelector('.error');
    const button = event.currentTarget.querySelector('button');
    error.hidden = true; button.disabled = true; button.textContent = 'SIGNING IN…';
    const form = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const response = await fetch(`${config.url}/auth/v1/token?grant_type=password`, { method:'POST', headers:{apikey:config.publishableKey,'Content-Type':'application/json'}, body:JSON.stringify(form) });
      if (!response.ok) throw new Error('Invalid email or password');
      setSession(await response.json());
      await showDashboard();
    } catch (caught) { error.textContent = caught.message; error.hidden = false; }
    finally { button.disabled = false; button.textContent = 'SIGN IN'; }
  };
  logout.onclick = signOut;
  document.querySelector('#refresh').onclick = loadOrders;
})();
