(() => {
  const params = new URLSearchParams(location.search);
  const currentHandle = params.get('handle') || '';
  const currentKind = params.get('kind') || '';
  const asset = (name) => `assets/${name}`;

  /* Hand-picked pieces also cover products that are not part of the imported local catalogue. */
  const curated = [
    { handle: 'clover-purple-butterfly-one-motif-necklace', title: 'Clover Purple Butterfly Necklace', price: 82, image: asset('set-necklace.png'), option: 'Purple / Yellow Gold', kind: 'necklace' },
    { handle: 'clover-lucky-spring-butterfly-bracelet', title: 'Clover Lucky Spring Butterfly Bracelet', price: 87, image: asset('love-main-navy.png'), option: 'Yellow Gold · 19 Cm', kind: 'bracelet' },
    { handle: 'clover-purple-butterfly-ring', title: 'Clover Purple Butterfly Ring', price: 82, image: asset('set-ring.png'), option: 'Purple / Yellow Gold · US 5', kind: 'clover-ring' },
    { handle: 'clover-pink-bubble-enamel-drop-earrings', title: 'Clover Pink Drop Earrings', price: 87, image: asset('set-earrings.png'), option: 'Pink / Yellow Gold', kind: 'clover-earring' },
    { handle: 'clover-pink-mother-of-pearl-necklace', title: 'Clover Pink Mother of Pearl Necklace', price: 82, image: asset('set-necklace.png'), option: 'Pink Mother of Pearl', kind: 'necklace' },
    { handle: 'clover-five-motifs-bracelet', title: 'Clover Five Motifs Bracelet', price: 87, image: asset('love-main-navy.png'), option: 'Yellow Gold · 19 Cm', kind: 'bracelet' },
    { handle: 'clover-kaleidoscope-yellow-gold-ring', title: 'Clover Kaleidoscope Ring', price: 82, image: asset('set-ring.png'), option: 'Yellow Gold · US 5', kind: 'clover-ring' },
    { handle: 'clover-pave-flower-stud-earrings', title: 'Clover Pavé Flower Stud Earrings', price: 95, image: asset('set-earrings.png'), option: 'Yellow Gold / Pavé', kind: 'clover-earring' },

    { handle: 'love-pendant', title: 'LOVE Pendant', price: 94, image: 'assets/love-pendant/plain.png', option: 'Plain · Necklace', kind: 'love-necklace' },
    { handle: 'double-charm-bracelet', title: 'Double Charm Bracelet', price: 95, image: asset('love-main-navy.png'), option: 'Rose Gold · 17 Cm', kind: 'love-bracelet' },
    { handle: 'love-classic-ring', title: 'Classic Polished Ring', price: 82, image: asset('set-ring.png'), option: 'Yellow Gold · US 5', kind: 'ring' },
    { handle: 'pave-heart-necklace', title: 'Pavé Heart Necklace', price: 94, image: asset('cartier-love-pendant-navy.png'), option: 'Rose Gold / Pavé', kind: 'love-necklace' },
    { handle: 'paved-diamonds-love-bracelet', title: 'Wide Pavé Screw Motif Bracelet', price: 104, image: asset('love-main-navy.png'), option: 'White Gold / Pavé · 17 Cm', kind: 'love-bracelet' },

    { handle: 'hardware-link-pendant-necklace', title: 'Hardware Link Pendant Necklace', price: 82, image: asset('hardware-link-pendant/hero.png'), option: 'Yellow Gold · 40–45 Cm', kind: 'hardware' },
    { handle: 'hardware-u-link-bracelet', title: 'Hardware U Link Bracelet', price: 85, image: asset('love-main-navy.png'), option: 'Yellow Gold · 17 Cm', kind: 'hardware' },
    { handle: 'hardware-t-pave-ring', title: 'Hardware T Pavé Ring', price: 82, image: asset('set-ring.png'), option: 'Yellow Gold / Pavé · US 5', kind: 'hardware' },
    { handle: 'hardware-u-link-pave-earrings', title: 'Hardware U Link Pavé Earrings', price: 85, image: asset('set-earrings.png'), option: 'White Gold / Pavé', kind: 'hardware' },
    { handle: 'hardware-mini-u-link-pave-necklace', title: 'Hardware Mini U Link Pavé Necklace', price: 82, image: asset('hardware-link-pendant/hero.png'), option: 'White Gold / Pavé', kind: 'hardware' },
    { handle: 'hardware-double-u-link-pave-necklace', title: 'Hardware Double U Link Pavé Necklace', price: 98, image: asset('hardware-link-pendant/hero.png'), option: 'White Gold / Pavé', kind: 'hardware' },
    { handle: 'pave-hardware-bracelet', title: 'Pavé Hardware Bracelet', price: 95, image: asset('love-main-navy.png'), option: 'White Gold / Pavé · 20 Cm', kind: 'hardware' },

    { handle: 'clover-cubic-zirconia-flower-necklace', title: 'Cubic Zirconia Flower Necklace', price: 82, image: asset('set-necklace.png'), option: 'Yellow Gold · 42 Cm', kind: 'necklace' },
    { handle: 'frivole-flower-ring', title: 'Sculpted Flower Ring', price: 82, image: asset('set-ring.png'), option: 'Yellow Gold · US 5', kind: 'frivole-ring' },
    { handle: 'frivole-small-flower-earrings', title: 'Small Flower Earrings', price: 87, image: asset('set-earrings.png'), option: 'Yellow Gold', kind: 'frivole-earring' },
    { handle: 'pave-knot-necklace', title: 'Pavé Knot Necklace', price: 85, image: asset('set-necklace.png'), option: 'Rose Gold / Pavé · 40–45 Cm', kind: 'knot' },
    { handle: 'pink-pave-knot-necklace', title: 'Pink Pavé Knot Necklace', price: 94, image: asset('set-necklace.png'), option: 'Rose Gold / Pink Pavé', kind: 'knot' },
    { handle: 'flexible-nail-bangle', title: 'Flexible Nail Bangle', price: 104, image: asset('love-main-navy.png'), option: 'Yellow Gold · 17 Cm', kind: 'love-bracelet' },
    { handle: 'juste-un-clou-necklace', title: 'Sculptural Nail Necklace', price: 94, image: asset('set-necklace.png'), option: 'Yellow Gold · 42 Cm', kind: 'clou-necklace' }
  ];

  const textFor = (item) => `${item.kind || ''} ${item.handle || ''} ${item.title || ''}`.toLowerCase();
  const categoryFor = (item) => {
    const value = textFor(item);
    if (/\bearrings?\b/.test(value)) return 'earrings';
    if (/\brings?\b/.test(value)) return 'ring';
    if (/\bbracelets?\b|\bbangles?\b/.test(value)) return 'bracelet';
    return 'necklace';
  };
  const familyFor = (item) => {
    const value = textFor(item);
    if (/\bhardware\b/.test(value)) return 'hardware';
    if (/\bknot\b|\bclou\b|\bnail\b|\bwoven\b/.test(value)) return 'sculptural';
    if (/\blove\b|double-circle|double-charm|\bheart\b|screw-motif/.test(value)) return 'love';
    if (/\bfrivole\b|\bflower\b/.test(value)) return 'floral';
    return 'clover';
  };
  const kindFor = (item) => {
    if (item.kind) return item.kind;
    const category = categoryFor(item);
    const family = familyFor(item);
    if (family === 'hardware') return 'hardware';
    if (category === 'bracelet') return family === 'love' ? 'love-bracelet' : 'bracelet';
    if (category === 'ring') return family === 'floral' ? 'frivole-ring' : family === 'clover' ? 'clover-ring' : 'ring';
    if (category === 'earrings') return family === 'floral' ? 'frivole-earring' : 'clover-earring';
    return family === 'sculptural' ? 'knot' : family === 'love' ? 'love-necklace' : 'necklace';
  };
  const displayTitle = (title) => String(title || '')
    .replace(/Vintage\s+Alhambra/gi, 'Clover')
    .replace(/Sweet\s+Alhambra/gi, 'Clover')
    .replace(/Alhambra/gi, 'Clover');
  const optionFor = (product) => {
    const variant = product.variants?.[0] || {};
    return [variant.option1, variant.option2].filter(Boolean).join(' · ') || 'View available options';
  };

  const localProducts = Object.values(window.heritageReferenceProducts || {}).map((product) => ({
    handle: product.handle,
    title: displayTitle(product.title),
    price: Number(product.price || product.variants?.[0]?.price || 0) / 100,
    image: product.featured_image || product.images?.[0] || asset('set-ring.png'),
    option: optionFor(product)
  }));
  const byHandle = new Map();
  [...curated, ...localProducts].forEach((item) => byHandle.set(item.handle, { ...byHandle.get(item.handle), ...item }));
  const products = [...byHandle.values()].map((item) => ({
    ...item,
    category: categoryFor(item),
    family: familyFor(item),
    kind: kindFor(item)
  }));

  const current = {
    handle: currentHandle,
    kind: currentKind,
    title: document.querySelector('#app h1')?.textContent || currentHandle
  };
  current.category = categoryFor(current);
  current.family = familyFor(current);

  const ignoredTokens = new Set(['the', 'and', 'with', 'clover', 'alhambra', 'vintage', 'sweet', 'classic', 'small', 'large', 'mini', 'one', 'five', 'ten', 'motif', 'motifs', 'necklace', 'bracelet', 'bangle', 'ring', 'rings', 'earring', 'earrings']);
  const tokensFor = (item) => new Set(textFor(item).split(/[^a-z0-9]+/).filter((token) => token.length > 2 && !ignoredTokens.has(token)));
  const currentTokens = tokensFor(current);
  const compatibility = (item) => {
    const itemTokens = tokensFor(item);
    const shared = [...itemTokens].filter((token) => currentTokens.has(token)).length;
    const sameFamily = item.family === current.family ? 30 : 0;
    const sameFinish = /white|rose|yellow|pink|purple|blue|red|black|pearl|onyx|malachite|pave/.test(textFor(item))
      && [...itemTokens].some((token) => currentTokens.has(token)) ? 8 : 0;
    return sameFamily + shared * 7 + sameFinish;
  };
  const ranked = products
    .filter((item) => item.handle && item.handle !== currentHandle)
    .sort((a, b) => compatibility(b) - compatibility(a) || a.title.localeCompare(b.title));

  const categoryOrder = {
    necklace: ['ring', 'bracelet', 'earrings'],
    bracelet: ['ring', 'necklace', 'earrings'],
    ring: ['bracelet', 'earrings', 'necklace'],
    earrings: ['necklace', 'bracelet', 'ring']
  }[current.category];
  const setPieces = categoryOrder.map((category) =>
    ranked.find((item) => item.family === current.family && item.category === category)
  ).filter(Boolean);
  const setHandles = new Set(setPieces.map((item) => item.handle));
  const stackPieces = ranked
    .filter((item) => item.category === current.category && !setHandles.has(item.handle))
    .sort((a, b) => (b.family === current.family) - (a.family === current.family) || compatibility(b) - compatibility(a))
    .slice(0, 2);
  const suggestions = [
    ...setPieces.map((item) => ({ ...item, recommendation: 'set' })),
    ...stackPieces.map((item) => ({ ...item, recommendation: 'stack' }))
  ];

  const money = (amount) => `$${Number(amount || 0).toFixed(2)} USD`;
  const safe = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));

  const style = document.createElement('style');
  style.textContent = `
    .set-card .section-heading{flex-wrap:wrap;height:auto;min-height:67px;padding-top:14px;padding-bottom:14px}
    .set-card .section-heading h2{margin:0}
    .set-card .section-heading small{flex-basis:100%;text-align:center;color:#777;font-size:12px;letter-spacing:.02em}
    .recommendation-group{padding:11px 20px 9px;background:#f7f7f7;border-bottom:1px solid #e8e8e8;color:#555;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase}
    .recommendation-group.stack{border-top:1px solid #e8e8e8}
    .recommendation-badge{display:inline-block;margin:0 0 5px;padding:3px 6px;border-radius:2px;background:#eef8f6;color:#007f72;font-size:9px;letter-spacing:.09em}
    .set-item-link{display:block;color:inherit;text-decoration:none}
    .set-item-link img{transition:transform .2s ease}
    .set-item-link:hover img{transform:scale(1.035)}
    .set-item-copy a{color:#222;text-decoration:none}
    .set-item-copy a:hover h3{color:#00a390}
    .set-add.added{background:#00a390!important;border-color:#00a390!important;color:#fff!important}
    .set-summary strong{color:#00a390}
    .set-current-note{display:block;color:#777;font-size:12px;margin-top:3px}
  `;
  document.head.append(style);

  const itemMarkup = (item) => {
    const url = `clover-product.html?kind=${encodeURIComponent(item.kind)}&handle=${encodeURIComponent(item.handle)}`;
    const badge = item.recommendation === 'set' ? 'MATCHING SET' : 'STACK WITH IT';
    return `<article class="set-item" data-price="${item.price}" data-recommendation="${item.recommendation}">
      <a class="set-item-link" href="${url}" aria-label="View ${safe(item.title)}"><img src="${safe(item.image)}" alt="${safe(item.title)}"></a>
      <div class="set-item-copy"><span class="recommendation-badge">${badge}</span><a href="${url}"><h3>${safe(item.title)}</h3></a><b>${money(item.price)}</b><select aria-label="${safe(item.title)} option"><option>${safe(item.option)} · ${money(item.price)}</option></select></div>
      <button class="set-add" type="button" data-title="${safe(item.title)}">ADD</button>
    </article>`;
  };

  const render = () => {
    const app = document.querySelector('#app');
    const setItems = app?.querySelector('.set-items');
    const heading = app?.querySelector('.set-card .section-heading');
    if (!setItems || !heading || setItems.dataset.smartRecommendations) return;

    setItems.dataset.smartRecommendations = 'true';
    const headingTitle = heading.querySelector('h2');
    headingTitle.textContent = 'COMPLETE THE LOOK';
    if (!heading.querySelector('small')) {
      const subtitle = document.createElement('small');
      subtitle.textContent = 'Matching set pieces first, then stackable styles';
      heading.append(subtitle);
    }

    const matching = suggestions.filter((item) => item.recommendation === 'set');
    const stacking = suggestions.filter((item) => item.recommendation === 'stack');
    setItems.innerHTML = `<div class="recommendation-group">Complete the matching set</div>
      ${matching.map(itemMarkup).join('')}
      ${stacking.length ? `<div class="recommendation-group stack">Add a stackable ${safe(current.category)}</div>${stacking.map(itemMarkup).join('')}` : ''}
      <div class="set-summary"><span>1 current item · 0 companions selected</span><strong>Build your matching set</strong></div>
      <button id="setAdd" class="source-all" type="button" style="width:calc(100% - 40px);margin:0 20px 20px;padding:15px;border:2px solid #00a390;background:#fff;color:#00a390;letter-spacing:.12em;font:15px Quicksand,sans-serif">ADD SELECTED TO CART</button>`;

    const selected = new Set();
    const setMessage = app.querySelector('#setMsg');
    const summary = setItems.querySelector('.set-summary span');
    const checkoutButton = setItems.querySelector('#setAdd');

    const update = () => {
      const count = selected.size;
      summary.textContent = `1 current item · ${count} companion${count === 1 ? '' : 's'} selected`;
      checkoutButton.disabled = count === 0;
      checkoutButton.style.opacity = count === 0 ? '.55' : '1';
      checkoutButton.textContent = count ? `ADD ${count} SELECTED TO CART` : 'SELECT MATCHING PIECES';
      setMessage.textContent = count === 0
        ? 'Add 1 matching piece to this item to unlock 10% off.'
        : count === 1
          ? '10% discount unlocked — add 1 more piece to enjoy 15% off.'
          : count === 2
            ? '15% discount unlocked — add 2 more items to enjoy 25% off.'
            : count === 3
              ? '15% discount unlocked — add 1 more item to enjoy 25% off.'
              : '25% discount unlocked.';
    };

    setItems.querySelectorAll('.set-add').forEach((button) => {
      button.addEventListener('click', () => {
        const item = button.closest('.set-item');
        if (selected.has(item)) {
          selected.delete(item);
          button.classList.remove('added');
          button.textContent = 'ADD';
        } else {
          selected.add(item);
          button.classList.add('added');
          button.textContent = 'ADDED';
        }
        update();
      });
    });

    checkoutButton.addEventListener('click', () => {
      if (!selected.size) return;
      const cartCount = document.querySelector('#cartCount');
      const count = Number((cartCount?.textContent || '').replace(/\D/g, '')) || 0;
      if (cartCount) cartCount.textContent = `(${count + selected.size})`;
      checkoutButton.textContent = 'ADDED TO CART ✓';
      setTimeout(update, 1100);
    });

    update();
  };

  const observer = new MutationObserver(render);
  observer.observe(document.querySelector('#app'), { childList: true, subtree: true });
  render();
})();
