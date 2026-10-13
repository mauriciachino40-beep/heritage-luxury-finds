(() => {
  if (document.querySelector('.lisa-dual-nav')) return;
  const header = document.querySelector('.site-header');
  if (!header) return;
  const nav = document.createElement('nav');
  nav.className = 'lisa-dual-nav';
  nav.setAttribute('aria-label', 'Browse jewelry');
  nav.innerHTML = `
    <div><b>SHOP BY STYLE</b><a href="lisa-dee-catalog.html?style=clover">Clover</a><a href="lisa-dee-catalog.html?style=love">Love</a><a href="lisa-dee-catalog.html?style=nail">Nail</a><a href="lisa-dee-catalog.html?style=hardware">Hardware</a><a href="lisa-dee-catalog.html?style=knot">Knot</a></div>
    <div><b>SHOP BY JEWELRY TYPE</b><a href="lisa-dee-catalog.html?style=necklace">Necklaces</a><a href="lisa-dee-catalog.html?style=bracelet">Bracelets</a><a href="lisa-dee-catalog.html?style=ring">Rings</a><a href="lisa-dee-catalog.html?style=earring">Earrings</a><a href="lisa-dee-catalog.html?style=watch">Watch Bands</a></div>`;
  header.insertAdjacentElement('afterend', nav);
})();
