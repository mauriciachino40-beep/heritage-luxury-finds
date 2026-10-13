(() => {
  const header = document.querySelector('.site-header');
  const primary = header?.querySelector('.desktop-nav');
  if (!header || !primary || header.querySelector('.shop-all-wrap')) return;
  primary.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'shop-all-wrap';
  wrap.innerHTML = `<button type="button" class="shop-all-trigger" aria-expanded="false">SHOP ALL <span>⌄</span></button><div class="shop-all-mega"><section><b>SHOP BY STYLE</b><a href="lisa-dee-catalog.html?style=clover">Clover</a><a href="lisa-dee-catalog.html?style=love">Love</a><a href="lisa-dee-catalog.html?style=nail">Nail</a><a href="lisa-dee-catalog.html?style=hardware">Hardware</a><a href="lisa-dee-catalog.html?style=knot">Knot</a></section><section><b>SHOP BY JEWELRY TYPE</b><a href="lisa-dee-catalog.html?style=necklace">Necklaces</a><a href="lisa-dee-catalog.html?style=bracelet">Bracelets</a><a href="lisa-dee-catalog.html?style=ring">Rings</a><a href="lisa-dee-catalog.html?style=earring">Earrings</a><a href="lisa-dee-catalog.html?style=watch">Watch Bands</a></section><a class="shop-all-view" href="lisa-dee-catalog.html">VIEW ALL 212 PIECES</a></div>`;
  primary.append(wrap);
  const trigger = wrap.querySelector('.shop-all-trigger');
  const close = () => { wrap.classList.remove('open'); trigger.setAttribute('aria-expanded','false'); };
  trigger.onclick = event => { event.stopPropagation(); const open = wrap.classList.toggle('open'); trigger.setAttribute('aria-expanded', String(open)); };
  wrap.addEventListener('mouseenter', () => { wrap.classList.add('open'); trigger.setAttribute('aria-expanded','true'); });
  wrap.addEventListener('mouseleave', close);
  document.addEventListener('click', event => { if (!wrap.contains(event.target)) close(); });
})();
