(() => {
  const STORAGE_KEY = 'lisa-order-draft-v1';
  const LAST_ORDER_KEY = 'lisa-last-order-v1';
  const ORDERS_KEY = 'lisa-order-history-v1';
  const ORDER_SEQUENCE_KEY = 'lisa-daily-order-sequence-v1';
  const LISA_DISPLAY_NAME = 'Heritage Luxury Finds by Lisa Dee';
  // Public contact details confirmed by Lisa. Usernames do not include @.
  const LISA_CONTACTS = { instagram: 'Heritage_Luxury_Finds', telegram: '', whatsapp: '15627542260' };
  const moneyValue = value => Number(String(value || '').replace(/[^0-9.]/g, '')) || 0;
  const productNumber = value => {
    let hash = 2166136261;
    for (const character of String(value || 'product')) {
      hash ^= character.charCodeAt(0);
      hash = Math.imul(hash, 16777619);
    }
    return `P-${String((hash >>> 0) % 1000000).padStart(6, '0')}`;
  };
  const escapeHtml = value => String(value || '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[character]));

  const loadOrder = () => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; }
  };
  const loadOrders = () => {
    try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []; } catch { return []; }
  };
  const saveOrders = orders => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    updateCounts();
  };
  const saveOrder = items => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    updateCounts(items);
  };
  const updateCounts = (items = loadOrder()) => {
    const count = items.reduce((total, item) => total + item.quantity, 0);
    const orderCount = loadOrders().length;
    document.querySelectorAll('.lisa-cart-count').forEach(node => { if (node.textContent !== `(${count})`) node.textContent = `(${count})`; });
    document.querySelectorAll('.lisa-orders-count').forEach(node => { if (node.textContent !== `(${orderCount})`) node.textContent = `(${orderCount})`; });
  };
  const ensureHeaderActions = () => {
    document.querySelectorAll('.reference-tools').forEach(tools => {
      if (!tools.querySelector('[data-open-cart]')) tools.innerHTML = `<button type="button" data-open-cart><span class="cart-icon">🛍</span>Cart <span class="lisa-cart-count">(0)</span></button><button type="button" data-open-orders>My Orders <span class="lisa-orders-count">(0)</span></button>`;
    });
    document.querySelectorAll('.brand-nav-right').forEach(nav => {
      let cart = nav.querySelector('[data-open-cart]');
      if (!cart) {
        cart = [...nav.querySelectorAll('button')].find(button => /^(cart|order|my order)/i.test(button.textContent.trim()));
        if (!cart) { cart = document.createElement('button'); nav.append(cart); }
        cart.dataset.openCart = '';
        cart.innerHTML = `Cart <span class="lisa-cart-count">(0)</span>`;
      }
      if (!nav.querySelector('[data-open-orders]')) {
        const orders = document.createElement('button');
        orders.type = 'button';
        orders.dataset.openOrders = '';
        orders.innerHTML = `My Orders <span class="lisa-orders-count">(0)</span>`;
        nav.append(orders);
      }
    });
  };

  const currentProduct = () => {
    const title = document.querySelector('.clover-panel h1, .product-panel h1, .necklace-panel h1, main h1')?.textContent?.trim() || document.title.split('—')[0].trim();
    const priceText = document.querySelector('#price, .main-price, .clover-price, .necklace-price')?.textContent?.trim() || '$0.00 USD';
    const quantity = Math.max(1, Number(document.querySelector('#qty, #quantity')?.textContent) || 1);
    const skuOptions = [...document.querySelectorAll('[data-option-group]')].map(group => {
      const label = group.dataset.optionGroup;
      const value = group.querySelector('.lisa-product-option-value')?.textContent?.trim();
      return label && value ? `${label}: ${value}` : '';
    }).filter(Boolean);
    const color = document.querySelector('#colorText, #colorName')?.textContent?.trim();
    const size = document.querySelector('#sizeText')?.textContent?.trim();
    const options = skuOptions.length ? skuOptions : [
      color ? `Color: ${color}` : '',
      size ? `Size: ${size}` : ''
    ].filter(Boolean);
    const sku = document.querySelector('.lisa-sku-value')?.textContent?.trim() || '';
    const code = document.querySelector('.lisa-product-code-value')?.textContent?.trim() || productNumber(new URLSearchParams(location.search).get('handle') || location.pathname);
    return { title, price: moneyValue(priceText), priceText, quantity, options, sku, code };
  };

  const addCurrentProduct = () => {
    const product = currentProduct();
    if (!product.title || /bracelets|necklaces|rings|earrings|new arrivals/i.test(product.title)) {
      openOrder();
      return;
    }
    const items = loadOrder();
    const key = `${product.title}|${product.options.join('|')}`;
    const existing = items.find(item => item.key === key);
    if (existing) existing.quantity += product.quantity;
    else items.push({ ...product, key });
    saveOrder(items);
    showNotice('Added to your Lisa order');
    openOrder();
  };

  const orderNumber = () => {
    const now = new Date();
    const date = `${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
    let sequence = { date, count: 0 };
    try {
      const saved = JSON.parse(localStorage.getItem(ORDER_SEQUENCE_KEY));
      if (saved?.date === date) sequence = saved;
    } catch {}
    sequence.count = Math.min(99, Number(sequence.count || 0) + 1);
    localStorage.setItem(ORDER_SEQUENCE_KEY, JSON.stringify(sequence));
    return `${date}-${String(sequence.count).padStart(2, '0')}`;
  };
  const orderMessage = (items, id, customer = {}) => {
    const lines = items.map((item, index) => `${index + 1}. ${item.title}${item.code ? ` [Product: ${item.code}]` : ''}${item.sku ? ` [SKU: ${item.sku}]` : ''}${item.options.length ? ` (${item.options.join(' / ')})` : ''} × ${item.quantity} — $${(item.price * item.quantity).toFixed(2)}`);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const address = [customer.address, customer.apartment, customer.city, customer.region, customer.postalCode, customer.country].filter(Boolean).join(', ');
    const customerLines = [
      customer.name ? `Name: ${customer.name}` : '',
      customer.contact ? `Contact: ${customer.contact}${customer.contactMethod ? ` (${customer.contactMethod})` : ''}` : '',
      address ? `Delivery address: ${address}` : '',
      customer.notes ? `Notes: ${customer.notes}` : ''
    ].filter(Boolean).join('\n');
    return `Hi Lisa! My order number is ${id}. I have confirmed my order and I am ready to pay.\n\n${lines.join('\n')}\n\nEstimated total: $${total.toFixed(2)} USD\n\n${customerLines}\n\nPlease confirm availability, the final discount and total, then send me the transfer instructions. Thank you!`;
  };

  const copyText = async text => {
    try { await navigator.clipboard.writeText(text); }
    catch {
      const box = document.createElement('textarea');
      box.value = text;
      document.body.append(box);
      box.select();
      document.execCommand('copy');
      box.remove();
    }
  };
  const backendConfig = () => window.LISA_SUPABASE || {};
  const backendEnabled = () => /^https:\/\/.+\.supabase\.co$/i.test(backendConfig().url || '') && !!backendConfig().publishableKey;
  const createSharedOrder = async (customer, items, total) => {
    const config = backendConfig();
    const headers = { apikey: config.publishableKey, 'Content-Type': 'application/json' };
    if (/^eyJ/.test(config.publishableKey)) headers.Authorization = `Bearer ${config.publishableKey}`;
    const response = await fetch(`${config.url}/rest/v1/rpc/create_lisa_order`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ p_customer: customer, p_items: items, p_estimated_total: total })
    });
    if (!response.ok) {
      const detail = await response.text();
      throw new Error(detail || `Order service returned ${response.status}`);
    }
    const payload = await response.json();
    const result = Array.isArray(payload) ? payload[0] : payload;
    if (!result?.order_number || !result?.access_token) throw new Error('Order service returned an incomplete response');
    return result;
  };

  const showNotice = text => {
    let notice = document.querySelector('.lisa-order-notice');
    if (!notice) {
      notice = document.createElement('div');
      notice.className = 'lisa-order-notice';
      document.body.append(notice);
    }
    notice.textContent = text;
    notice.classList.add('show');
    setTimeout(() => notice.classList.remove('show'), 1800);
  };

  const renderOptionRows = options => (options || []).map(option => {
    const parts = String(option).split(':');
    const hasLabel = parts.length > 1;
    const label = hasLabel ? parts.shift().trim() : 'Option';
    const value = hasLabel ? parts.join(':').trim() : String(option).trim();
    return `<div class="lisa-order-option"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
  }).join('');
  const renderItems = (items, removable = true) => items.length ? items.map((item, index) => `
    <article class="lisa-order-item">
      <div class="lisa-order-item-body"><b class="lisa-order-item-title">${escapeHtml(item.title)}</b><div class="lisa-order-identifiers">${item.code ? `<span>PRODUCT NO. <b>${escapeHtml(item.code)}</b></span>` : ''}${item.sku ? `<span>SKU <b>${escapeHtml(item.sku)}</b></span>` : ''}</div><div class="lisa-order-options">${renderOptionRows(item.options)}</div><span class="lisa-order-line-total">$${item.price.toFixed(2)} × ${item.quantity}</span></div>
      ${removable ? `<button type="button" data-remove="${index}" aria-label="Remove ${escapeHtml(item.title)}">Remove</button>` : ''}
    </article>`).join('') : '<p class="lisa-order-empty">Your order is empty. Open a product and choose “Add to Lisa order”.</p>';

  const getModal = () => {
    let modal = document.querySelector('.lisa-order-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'lisa-order-modal';
      document.body.append(modal);
    }
    return modal;
  };
  const sheet = (modal, content, label = 'Lisa order') => {
    modal.innerHTML = `<div class="lisa-order-backdrop" data-close-order></div><section class="lisa-order-sheet" role="dialog" aria-modal="true" aria-label="${label}"><button class="lisa-order-close" type="button" data-close-order>×</button>${content}</section>`;
    modal.classList.add('open');
    modal.querySelectorAll('[data-close-order]').forEach(button => button.onclick = () => modal.classList.remove('open'));
  };

  const openConfirmation = order => {
    const modal = getModal();
    const contactButtons = [
      LISA_CONTACTS.whatsapp ? `<button type="button" class="lisa-contact-button whatsapp" data-contact-url="https://wa.me/${LISA_CONTACTS.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(order.message)}">WHATSAPP LISA</button>` : '',
      LISA_CONTACTS.instagram ? `<button type="button" class="lisa-contact-button instagram" data-copy-open="https://ig.me/m/${encodeURIComponent(LISA_CONTACTS.instagram)}">INSTAGRAM DM</button>` : '',
      LISA_CONTACTS.telegram ? `<button type="button" class="lisa-contact-button telegram" data-copy-open="https://t.me/${encodeURIComponent(LISA_CONTACTS.telegram)}">TELEGRAM LISA</button>` : ''
    ].filter(Boolean).join('');
    sheet(modal, `<p class="lisa-order-kicker">ORDER CREATED</p><h2>Contact ${escapeHtml(LISA_DISPLAY_NAME)} to complete payment</h2><div class="lisa-order-number"><small>YOUR ORDER NUMBER</small><b>${escapeHtml(order.id)}</b></div><div class="lisa-confirmed-items"><h3>MY ORDER</h3>${renderItems(order.items || [], false)}</div><p class="lisa-order-alert"><b>Your order has not been sent yet.</b> Choose a contact option below and send the prepared message to Lisa. She will confirm availability, the final discount and transfer instructions.</p><div class="lisa-contact-actions">${contactButtons}<button type="button" class="lisa-contact-button share" data-share-order>SHARE ORDER</button><button type="button" class="lisa-contact-button copy" data-copy-order>COPY ORDER MESSAGE</button></div>${contactButtons ? '' : '<p class="lisa-contact-missing">Lisa’s direct Instagram, Telegram and WhatsApp links will appear here after her contact details are added. “Share order” and “Copy order message” work now.</p>'}<details class="lisa-order-preview"><summary>View prepared message</summary><pre>${escapeHtml(order.message)}</pre></details><button type="button" class="lisa-order-back" data-back-orders>BACK TO MY ORDERS</button>`, `Contact ${LISA_DISPLAY_NAME} to complete payment`);
    modal.querySelector('[data-copy-order]').onclick = async () => { await copyText(order.message); showNotice('Order message copied'); };
    modal.querySelector('[data-share-order]').onclick = async () => {
      try {
        if (navigator.share) await navigator.share({ title: `Lisa order ${order.id}`, text: order.message });
        else { await copyText(order.message); showNotice('Order copied — paste it into your chat with Lisa'); }
      } catch (error) { if (error?.name !== 'AbortError') showNotice('Please copy the order message instead'); }
    };
    modal.querySelectorAll('[data-contact-url]').forEach(button => button.onclick = () => window.open(button.dataset.contactUrl, '_blank', 'noopener'));
    modal.querySelectorAll('[data-copy-open]').forEach(button => button.onclick = async () => {
      await copyText(order.message);
      showNotice('Order copied — paste it into your message to Lisa');
      window.open(button.dataset.copyOpen, '_blank', 'noopener');
    });
    modal.querySelector('[data-back-orders]').onclick = openMyOrders;
  };

  const openMyOrders = () => {
    const orders = loadOrders();
    const modal = getModal();
    const list = orders.length ? orders.map((order, index) => {
      const total = (order.items || []).reduce((sum, item) => sum + item.price * item.quantity, 0);
      const itemCount = (order.items || []).reduce((sum, item) => sum + item.quantity, 0);
      return `<article class="lisa-history-item"><div><small>ORDER NUMBER</small><b>${escapeHtml(order.id)}</b><span>${itemCount} item${itemCount === 1 ? '' : 's'} · $${total.toFixed(2)} USD</span><em>Awaiting Lisa confirmation</em></div><button type="button" data-view-order="${index}">VIEW</button></article>`;
    }).join('') : '<p class="lisa-order-empty">You have no created orders on this device yet. Items that have not been submitted are kept in Cart.</p>';
    sheet(modal, `<p class="lisa-order-kicker">ORDER HISTORY</p><h2>My Orders</h2><p class="lisa-order-help">Created orders are saved on this device so you can reopen the order number, products and SKUs.</p><div class="lisa-order-history">${list}</div><button type="button" class="lisa-order-back" data-open-cart>OPEN CART</button>`, 'My Orders');
    modal.querySelectorAll('[data-view-order]').forEach(button => button.onclick = () => openConfirmation(orders[Number(button.dataset.viewOrder)]));
    modal.querySelector('[data-open-cart]').onclick = openOrder;
  };

  const openCheckout = () => {
    const items = loadOrder();
    if (!items.length) return openOrder();
    const modal = getModal();
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    sheet(modal, `<button class="lisa-order-back top" type="button" data-back-cart>← ORDER</button><p class="lisa-order-kicker">CHECKOUT</p><h2>Delivery details</h2><p class="lisa-order-help">These details stay on your device until you send the prepared order message to Lisa.</p><form class="lisa-checkout-form"><div class="lisa-field-grid"><label class="wide">Full name<input name="name" autocomplete="name" required></label><label>Preferred contact<select name="contactMethod" required><option>Instagram</option><option>WhatsApp</option><option>Telegram</option><option>Email</option></select></label><label>Your username / phone / email<input name="contact" autocomplete="tel" required></label><label class="wide">Address<input name="address" autocomplete="street-address" required></label><label class="wide">Apartment, suite, etc. <span>(optional)</span><input name="apartment" autocomplete="address-line2"></label><label>City<input name="city" autocomplete="address-level2" required></label><label>State / Province<input name="region" autocomplete="address-level1" required></label><label>Postal code<input name="postalCode" autocomplete="postal-code" required></label><label>Country<input name="country" autocomplete="country-name" required></label><label class="wide">Order notes <span>(optional)</span><textarea name="notes" rows="3"></textarea></label></div><fieldset class="lisa-payment-choice"><legend>Payment</legend><label><input type="radio" checked name="payment" value="contact-lisa"><span><b>Contact Lisa to pay</b><small>No payment is collected on this website. Lisa will confirm the final total and send transfer instructions privately.</small></span></label></fieldset><div class="lisa-order-total"><span>Estimated total</span><b>$${total.toFixed(2)} USD</b></div><button class="lisa-order-share" type="submit">CREATE ORDER &amp; CONTACT LISA</button><p class="lisa-submit-note">Creating the order does not send it automatically. You will choose how to contact Lisa on the next screen.</p></form>`, 'Checkout with Lisa');
    modal.querySelector('[data-back-cart]').onclick = openOrder;
    modal.querySelector('.lisa-checkout-form').onsubmit = async event => {
      event.preventDefault();
      const customer = Object.fromEntries(new FormData(event.currentTarget).entries());
      const submit = event.currentTarget.querySelector('[type="submit"]');
      submit.disabled = true;
      submit.textContent = backendEnabled() ? 'CREATING SHARED ORDER…' : 'CREATING ORDER…';
      event.currentTarget.querySelector('.lisa-checkout-error')?.remove();
      try {
        const shared = backendEnabled() ? await createSharedOrder(customer, items, total) : null;
        const id = shared?.order_number || orderNumber();
        const order = { id, customer, items, message: orderMessage(items, id, customer), createdAt: shared?.created_at || new Date().toISOString(), accessToken: shared?.access_token || '', shared: !!shared };
        localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
        saveOrders([order, ...loadOrders()]);
        saveOrder([]);
        openConfirmation(order);
      } catch (error) {
        submit.disabled = false;
        submit.textContent = 'TRY CREATING ORDER AGAIN';
        submit.insertAdjacentHTML('beforebegin', '<p class="lisa-checkout-error">We could not create your order. Your Cart is still saved. Please try again or contact Lisa.</p>');
        console.error('Shared order creation failed', error);
      }
    };
  };

  const openOrder = () => {
    const items = loadOrder();
    const modal = getModal();
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    sheet(modal, `<p class="lisa-order-kicker">ORDER DRAFT</p><h2>Cart</h2><p class="lisa-order-help">Review your product numbers, SKUs and selected options, then continue to delivery details. Created orders will move to My Orders.</p><div class="lisa-order-items">${renderItems(items)}</div><div class="lisa-order-total"><span>Estimated total</span><b>$${total.toFixed(2)} USD</b></div><button class="lisa-order-share" type="button" ${items.length ? '' : 'disabled'}>CONTINUE TO CHECKOUT</button><button class="lisa-order-clear" type="button" ${items.length ? '' : 'disabled'}>Clear cart</button>`, 'Cart');
    modal.querySelectorAll('[data-remove]').forEach(button => button.onclick = () => {
      const next = loadOrder();
      next.splice(Number(button.dataset.remove), 1);
      saveOrder(next);
      openOrder();
    });
    modal.querySelector('.lisa-order-clear').onclick = () => { saveOrder([]); openOrder(); };
    modal.querySelector('.lisa-order-share').onclick = openCheckout;
  };

  const productButtonSelectors = ['#add', '#cartCta', '#stickyAdd', '.clover-sticky button'];
  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.matches(productButtonSelectors.join(','))) {
      event.preventDefault();
      event.stopImmediatePropagation();
      addCurrentProduct();
      return;
    }
    if (button.matches('[data-open-orders]')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      openMyOrders();
      return;
    }
    if (button.matches('[data-open-cart]') || /^(cart|order)$/i.test(button.textContent.trim().replace(/\s*\(\d+\)$/, ''))) {
      event.preventDefault();
      event.stopImmediatePropagation();
      openOrder();
    }
  }, true);

  const polishPage = () => {
    ensureHeaderActions();
    updateCounts();
    const isProductPage = new URLSearchParams(location.search).has('handle') || !!document.querySelector('#add, #cartCta, #stickyAdd');
    if (isProductPage && !document.querySelector('.lisa-product-code')) {
      const title = document.querySelector('.clover-panel h1, .product-panel h1, .necklace-panel h1');
      if (title) {
        const code = productNumber(new URLSearchParams(location.search).get('handle') || location.pathname);
        title.insertAdjacentHTML('afterend', `<p class="lisa-product-code">PRODUCT NO. <b class="lisa-product-code-value">${code}</b></p>`);
      }
    }
    document.querySelectorAll('#add, #cartCta, #stickyAdd, .clover-sticky button').forEach(button => {
      if (button.textContent !== 'ADD TO LISA ORDER') button.textContent = 'ADD TO LISA ORDER';
    });
    document.querySelectorAll('.clover-shop, .shop-pay, .payment-options, .clover-more').forEach(button => {
      if (!button.hidden) button.hidden = true;
      if (button.style.display !== 'none') button.style.display = 'none';
    });
    document.querySelectorAll('.clover-security, .security').forEach(section => {
      if (!section.dataset.lisaOrderPolished && /payment/i.test(section.textContent)) {
        section.dataset.lisaOrderPolished = 'true';
        section.innerHTML = '<h2>Ordering with Lisa</h2><p>Add your choices to an order draft, then share it with Lisa. Availability, discounts, delivery and transfer details are confirmed privately before payment.</p>';
      }
    });
    document.querySelectorAll('.offer-foot, .saving-card > p').forEach(node => {
      if (!node.dataset.lisaOrderPolished) {
        node.dataset.lisaOrderPolished = 'true';
        node.innerHTML = '<i>✓</i> Lisa will confirm the best available discount before payment.';
      }
    });
  };

  new MutationObserver(polishPage).observe(document.documentElement, { childList: true, subtree: true });
  polishPage();
  updateCounts();
})();
