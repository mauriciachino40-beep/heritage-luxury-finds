(() => {
  const sideNavStyle = document.createElement('link');
  sideNavStyle.rel = 'stylesheet';
  sideNavStyle.href = 'lisa-side-nav.css?v=20261014-1';
  document.head.append(sideNavStyle);
  const header = document.querySelector('.site-header');
  const primary = header?.querySelector('.desktop-nav');
  if (!header || !primary || header.querySelector('.shop-all-wrap')) return;
  const wordmark = header.querySelector('.wordmark');
  if (wordmark) {
    wordmark.classList.add('heritage-logo');
    wordmark.innerHTML = '<em>Heritage</em><small>LUXURY FINDS</small>';
    wordmark.setAttribute('aria-label', 'Heritage Luxury Finds by Lisa Dee');
  }
  primary.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'shop-all-wrap';
  wrap.innerHTML = `<button type="button" class="shop-all-trigger" aria-expanded="false">SHOP ALL <span>⌄</span></button><div class="shop-all-mega"><section><b>SHOP BY STYLE</b><a href="lisa-dee-catalog.html?style=clover">Clover</a><a href="lisa-dee-catalog.html?style=love">Love</a><a href="lisa-dee-catalog.html?style=nail">Nail</a><a href="lisa-dee-catalog.html?style=hardware">Hardware</a><a href="lisa-dee-catalog.html?style=knot">Knot</a></section><section><b>SHOP BY JEWELRY TYPE</b><a href="lisa-dee-catalog.html?style=necklace">Necklaces</a><a href="lisa-dee-catalog.html?style=bracelet">Bracelets</a><a href="lisa-dee-catalog.html?style=ring">Rings</a><a href="lisa-dee-catalog.html?style=earring">Earrings</a><a href="lisa-dee-catalog.html?style=watch">Watch Bands</a></section><a class="shop-all-view" href="lisa-dee-catalog.html">VIEW ALL 212 PIECES</a></div>`;
  primary.append(wrap);
  const trigger = wrap.querySelector('.shop-all-trigger');
  let closeTimer;
  const open = () => { clearTimeout(closeTimer); wrap.classList.add('open'); trigger.setAttribute('aria-expanded','true'); };
  const close = () => { clearTimeout(closeTimer); wrap.classList.remove('open'); trigger.setAttribute('aria-expanded','false'); };
  const closeSoon = () => { clearTimeout(closeTimer); closeTimer = setTimeout(close, 220); };
  trigger.onclick = event => { event.stopPropagation(); open(); };
  wrap.addEventListener('mouseenter', open);
  wrap.addEventListener('mouseleave', closeSoon);
  wrap.addEventListener('focusin', open);
  wrap.addEventListener('focusout', closeSoon);
  document.addEventListener('click', event => { if (!wrap.contains(event.target)) close(); });

  document.querySelector('.lisa-nav-overlay')?.remove();
  const overlay = document.createElement('div');
  overlay.className = 'lisa-nav-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = `<button class="lisa-nav-backdrop" type="button" aria-label="Close navigation"></button><aside class="lisa-side-nav" aria-label="Main navigation"><div class="lisa-side-head"><a class="lisa-side-logo" href="lisa-dee-v2.html"><em>Heritage</em><small>LUXURY FINDS</small></a><button class="lisa-nav-close" type="button" aria-label="Close navigation">×</button></div><a class="lisa-side-home" href="lisa-dee-v2.html">HOME</a><section><b>SHOP BY STYLE</b><a href="lisa-dee-catalog.html?style=clover">Clover</a><a href="lisa-dee-catalog.html?style=love">Love</a><a href="lisa-dee-catalog.html?style=nail">Nail</a><a href="lisa-dee-catalog.html?style=hardware">Hardware</a><a href="lisa-dee-catalog.html?style=knot">Knot</a></section><section><b>SHOP BY JEWELRY TYPE</b><a href="lisa-dee-catalog.html?style=necklace">Necklaces</a><a href="lisa-dee-catalog.html?style=bracelet">Bracelets</a><a href="lisa-dee-catalog.html?style=ring">Rings</a><a href="lisa-dee-catalog.html?style=earring">Earrings</a><a href="lisa-dee-catalog.html?style=watch">Watch Bands</a></section><a class="lisa-side-all" href="lisa-dee-catalog.html">SHOP ALL 212 PIECES</a><footer><a href="https://instagram.com/Heritage_Luxury_Finds">INSTAGRAM</a><a href="https://wa.me/15627542260">WHATSAPP</a></footer></aside>`;
  document.body.append(overlay);
  const setSideNav = open => {
    overlay.classList.toggle('open', open);
    overlay.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('lisa-nav-open', open);
    document.querySelectorAll('.mobile-menu').forEach(button => button.setAttribute('aria-expanded', String(open)));
  };
  document.addEventListener('click', event => {
    const menuButton = event.target.closest('.mobile-menu');
    if (!menuButton) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    setSideNav(!overlay.classList.contains('open'));
  }, true);
  overlay.querySelector('.lisa-nav-close').onclick = () => setSideNav(false);
  overlay.querySelector('.lisa-nav-backdrop').onclick = () => setSideNav(false);
  document.addEventListener('keydown', event => { if (event.key === 'Escape') setSideNav(false); });
})();
