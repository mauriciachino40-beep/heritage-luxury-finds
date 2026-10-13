(() => {
  if (document.querySelector('.reference-nav')) return;
  const header = document.querySelector('.brand-header');
  if (!header) return;

  const style = document.createElement('style');
  style.textContent = `
    .brand-strip,.brand-header{display:none!important}
    .reference-nav{font-family:Quicksand,"Century Gothic",Arial,sans-serif;color:#242424;background:#fff;border-bottom:1px solid #e7e7e7}
    .reference-shipping{height:33px;background:#101d4d;color:#fff;display:grid;place-items:center;font-size:10px;letter-spacing:.04em}
    .reference-main{max-width:1320px;margin:auto;min-height:122px;display:grid;grid-template-columns:210px minmax(280px,1fr) 210px;align-items:center;gap:40px;padding:0 26px}
    .reference-logo{color:#101d4d;text-decoration:none;text-align:left;line-height:.86}
    .reference-logo em{display:block;font:600 37px/1 "Cormorant Garamond",Georgia,serif;letter-spacing:-.05em}
    .reference-logo small{display:block;margin:7px 0 0 3px;font:600 8px/1 Quicksand,sans-serif;letter-spacing:.25em}
    .reference-search{height:44px;display:flex;align-items:center;background:#f4f5f6;border-radius:3px;padding:0 15px}
    .reference-search input{width:100%;border:0;outline:0;background:transparent;color:#444;font:13px Quicksand,sans-serif}
    .reference-search button{border:0;background:none;padding:0;color:#222;font-size:22px;cursor:pointer}
    .reference-tools{display:flex;justify-content:flex-end;gap:21px;align-items:center}
    .reference-tools a,.reference-tools button{border:0;background:transparent;color:#222;text-decoration:none;font:12px Quicksand,sans-serif;white-space:nowrap;padding:0;cursor:pointer}
    .cart-icon{font-size:22px;vertical-align:-2px;margin-right:4px}
    .reference-nav-row{min-height:55px;display:flex;justify-content:center;align-items:stretch;gap:34px}
    .reference-nav-row>div{position:relative;display:flex;align-items:center}
    .reference-nav-row>a,.reference-trigger{display:flex;align-items:center;border:0;background:transparent;color:#1d1d1d;text-decoration:none;padding:0;font:600 13px/1 Quicksand,sans-serif;letter-spacing:.13em;white-space:nowrap;cursor:pointer}
    .reference-new{color:#00a390!important;position:relative}
    .reference-new:after{content:"NEW";position:absolute;top:7px;right:-25px;border-radius:9px;background:#00a390;color:#fff;padding:2px 5px;font:700 7px/1 Quicksand,sans-serif;letter-spacing:.07em}
    .reference-trigger:after{content:'⌄';font-size:16px;font-weight:400;margin-left:7px;margin-top:-3px}
    .reference-dropdown{position:absolute;display:none;z-index:90;top:calc(100% - 2px);left:50%;transform:translateX(-50%);min-width:235px;padding:14px;background:#fff;border:1px solid #e5e5e5;box-shadow:0 14px 30px #00000016}
    .reference-nav-row>div:hover .reference-dropdown,.reference-nav-row>div:focus-within .reference-dropdown,.reference-nav-row>div.is-open .reference-dropdown{display:block}
    .reference-dropdown a{display:block;padding:9px 8px;color:#333;text-decoration:none;font:13px/1.25 Quicksand,sans-serif;white-space:nowrap}
    .reference-dropdown a:hover{background:#f6f6f6;color:#00a390}
    .reference-mega-dropdown{width:min(780px,calc(100vw - 36px));padding:25px 28px}
    .reference-style-grid{display:grid;grid-template-columns:2fr 1.35fr 1fr 1fr;gap:26px}
    .reference-product-grid{display:grid;grid-template-columns:1fr 1.7fr 1fr 1fr;gap:26px}
    .reference-style-group{min-width:0}
    .reference-style-group+div{border-left:1px solid #ededed;padding-left:25px}
    .reference-style-group h3{margin:0 0 9px;padding:0 8px;color:#101d4d;font:600 14px/1.2 Quicksand,sans-serif;letter-spacing:.13em}
    .reference-style-group a{white-space:normal}
    .reference-style-all{color:#00a390!important;font-weight:600!important}
    @media(max-width:900px){
      .reference-nav-row{gap:25px}
      .reference-mega-dropdown{width:min(700px,calc(100vw - 28px))}
      .reference-style-grid{grid-template-columns:1.6fr 1.3fr 1fr 1fr;gap:18px}
      .reference-product-grid{grid-template-columns:1fr 1.55fr 1fr 1fr;gap:18px}
      .reference-style-group+div{padding-left:17px}
    }
    @media(max-width:760px){
      .reference-main{min-height:88px;grid-template-columns:1fr auto;gap:14px;padding:0 16px}
      .reference-logo em{font-size:29px}
      .reference-logo small{font-size:6px}
      .reference-search{display:none}
      .reference-tools a:first-child{display:none}
      .reference-tools{gap:10px}
      .reference-nav-row{justify-content:flex-start;overflow-x:auto;gap:25px;padding:0 16px}
      .reference-nav-row>div{position:static;flex:0 0 auto}
      .reference-nav-row>a,.reference-trigger{font-size:11px;letter-spacing:.1em}
      .reference-dropdown{position:fixed;z-index:120;top:174px;left:12px;right:12px;transform:none;width:auto;min-width:0;max-height:calc(100vh - 190px);overflow:auto}
      .reference-mega-dropdown{padding:20px}
      .reference-style-grid,.reference-product-grid{grid-template-columns:1fr 1fr;gap:24px 18px}
      .reference-style-group+div{border-left:0;padding-left:0}
      .reference-style-group:nth-child(even){border-left:1px solid #ededed;padding-left:18px}
      .reference-shipping{font-size:9px}
      .reference-new:after{top:3px}
    }
  `;
  document.head.append(style);

  const styleGroups = [
    {
      name: 'CLOVER',
      links: [
        ['Clover Bracelets', 'clover-bracelets.html'],
        ['One Motif Necklaces', 'sweet-clover-necklaces.html'],
        ['10 Motifs Necklaces', 'clover-10-motifs-necklaces.html'],
        ['11 Motifs Necklaces', 'clover-11-motifs-necklaces.html'],
        ['20 Motifs Necklaces', 'clover-20-motifs-necklaces.html'],
        ['Clover Rings', 'clover-rings.html'],
        ['Clover Earrings', 'clover-earrings.html']
      ]
    },
    {
      name: 'LOVE',
      links: [
        ['Love Bracelets', 'love-bracelets.html'],
        ['Love Necklaces', 'love-necklaces.html'],
        ['Love Rings', 'love-rings.html']
      ]
    },
    {
      name: 'KNOT',
      links: [['Shop Knot Collection', 'knot.html']]
    },
    {
      name: 'HARDWARE',
      links: [['Shop Hardware Collection', 'hardware.html']]
    }
  ];

  const productGroups = {
    BRACELETS: [
      ['Clover Bracelets', 'clover-bracelets.html'],
      ['Love Bracelets', 'love-bracelets.html']
    ],
    NECKLACES: [
      ['Love Necklaces', 'love-necklaces.html'],
      ['One Motif Clover Necklaces', 'sweet-clover-necklaces.html'],
      ['Clover 10 Motifs Necklaces', 'clover-10-motifs-necklaces.html'],
      ['Clover 11 Motifs Necklaces', 'clover-11-motifs-necklaces.html'],
      ['Clover 20 Motifs Necklaces', 'clover-20-motifs-necklaces.html'],
      ['Juste Un Clou Necklaces', 'juste-un-clou-necklaces.html']
    ],
    RINGS: [
      ['Clover Rings', 'clover-rings.html'],
      ['Love Rings', 'love-rings.html'],
      ['Frivole Rings', 'frivole-rings.html']
    ],
    EARRINGS: [
      ['Clover Earrings', 'clover-earrings.html'],
      ['Frivole Earrings', 'frivole-earrings.html']
    ]
  };

  const styleMenu = `<div class="reference-style-menu"><button class="reference-trigger" type="button" aria-expanded="false">SHOP BY STYLE</button><nav class="reference-dropdown reference-mega-dropdown"><div class="reference-style-grid">${styleGroups.map(group => `<section class="reference-style-group"><h3>${group.name}</h3>${group.links.map(([label, url], index) => `<a class="${group.links.length === 1 || index === 0 ? 'reference-style-all' : ''}" href="${url}">${label}</a>`).join('')}</section>`).join('')}</div></nav></div>`;
  const productMenu = `<div class="reference-product-menu"><button class="reference-trigger" type="button" aria-expanded="false">SHOP BY JEWELRY TYPE</button><nav class="reference-dropdown reference-mega-dropdown"><div class="reference-product-grid">${Object.entries(productGroups).map(([name, links]) => `<section class="reference-style-group"><h3>${name}</h3>${links.map(([label, url]) => `<a href="${url}">${label}</a>`).join('')}</section>`).join('')}</div></nav></div>`;

  const nav = document.createElement('header');
  nav.className = 'reference-nav';
  nav.innerHTML = `<div class="reference-shipping">PRIVATE ORDERING · AVAILABILITY &amp; PAYMENT CONFIRMED DIRECTLY WITH LISA</div><div class="reference-main"><a class="reference-logo" href="clover-bracelets.html"><em>Heritage</em><small>LUXURY FINDS</small></a><form class="reference-search"><input aria-label="Search for anything" placeholder="Search for anything"><button aria-label="Search" type="button">⌕</button></form><nav class="reference-tools"><button type="button"><span class="cart-icon">🛍</span>Order <span>(0)</span></button></nav></div><nav class="reference-nav-row"><a href="clover-bracelets.html">BEST SELLERS</a><a class="reference-new" href="new-arrivals.html">NEW</a>${styleMenu}${productMenu}</nav>`;
  header.before(nav);

  const closeMenus = except => {
    nav.querySelectorAll('.reference-nav-row>div.is-open').forEach(menu => {
      if (menu === except) return;
      menu.classList.remove('is-open');
      menu.querySelector('.reference-trigger')?.setAttribute('aria-expanded', 'false');
    });
  };
  nav.querySelectorAll('.reference-trigger').forEach(button => {
    button.addEventListener('click', event => {
      event.stopPropagation();
      const menu = button.parentElement;
      const willOpen = !menu.classList.contains('is-open');
      closeMenus(menu);
      menu.classList.toggle('is-open', willOpen);
      button.setAttribute('aria-expanded', String(willOpen));
    });
  });
  nav.querySelectorAll('.reference-dropdown a').forEach(link => link.addEventListener('click', () => closeMenus()));
  document.addEventListener('click', event => {
    if (!nav.contains(event.target)) closeMenus();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenus();
  });
})();

/* Never let a storefront link navigate customers to the reference retailer. */
document.addEventListener('click', event => {
  const link = event.target.closest('a[href]');
  if (!link) return;
  try {
    const target = new URL(link.getAttribute('href'), location.href);
    if (/(^|\.)pnstime\.com$/i.test(target.hostname)) {
      event.preventDefault();
      location.href = 'clover-bracelets.html';
    }
  } catch {}
});

/* Enable product-card video previews on every collection page after the catalogue grid is built. */
if (!document.querySelector('script[src$="collection-video-hover.js"]')) {
  const productVideoPreviewScript = document.createElement('script');
  productVideoPreviewScript.src = 'collection-video-hover.js';
  document.head.append(productVideoPreviewScript);
}
