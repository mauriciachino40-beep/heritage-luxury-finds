const safe = value => String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
const money = value => `$${Number(value).toFixed(2)} USD`;
const visualMatch = document.createElement('link');
visualMatch.rel = 'stylesheet'; visualMatch.href = 'rayray-match.css?v=20261014-1'; document.head.append(visualMatch);
const productMatch = document.createElement('link');
productMatch.rel = 'stylesheet'; productMatch.href = 'rayray-product-match.css?v=20261014-5'; document.head.append(productMatch);
const assistantFont = document.createElement('link');
assistantFont.rel = 'stylesheet'; assistantFont.href = 'https://fonts.googleapis.com/css2?family=Assistant:wght@400;500;600&display=swap'; document.head.append(assistantFont);
const menuButton = document.createElement('button');
menuButton.className = 'mobile-menu'; menuButton.type = 'button'; menuButton.setAttribute('aria-label','Browse the collection'); menuButton.onclick = () => location.href = 'lisa-dee-catalog.html'; document.querySelector('.site-header')?.prepend(menuButton);
const app = document.querySelector('#productApp');
const handle = new URLSearchParams(location.search).get('handle');
const detailStyle = document.createElement('style');
detailStyle.textContent = '.product-description{margin:24px 0;padding:18px 0;border-top:1px solid #ddd;border-bottom:1px solid #ddd}.product-description h2{font-size:11px;letter-spacing:.1em}.product-description p{color:#555;font-size:13px;line-height:1.65}';
document.head.append(detailStyle);

const colorName = value => /rose|pink/i.test(value) ? 'rose' : /white|silver/i.test(value) ? 'silver' : /black|onyx/i.test(value) ? 'black' : /red|carnelian/i.test(value) ? 'red' : /blue/i.test(value) ? 'blue' : /green|malachite/i.test(value) ? 'green' : /purple/i.test(value) ? 'purple' : 'gold';
const isColorGroup = values => values.length > 1 && values.every(value => /gold|silver|rose|white|yellow|black|pink|red|blue|green|purple/i.test(value));
const isSizeGroup = values => values.some(value => /\b(us\s*)?\d{1,2}(\.\d+)?\s*(cm|mm)?\b/i.test(value));
const optionLabel = (values, product, index) => {
  if (isColorGroup(values)) return 'Color';
  if (values.some(value => /stone|diamond|pav[eé]/i.test(value))) return 'Style';
  if (isSizeGroup(values)) return /ring/i.test(product.title) ? 'Ring Size' : /bracelet|bangle/i.test(product.title) ? 'Bangle Size' : 'Size';
  return index === 0 ? 'Style' : `Option ${index + 1}`;
};
const productType = product => {
  const text = `${product.handle} ${product.title}`.toLowerCase();
  if (/earring/.test(text)) return 'earrings';
  if (/ring/.test(text)) return 'ring';
  if (/necklace|pendant/.test(text)) return 'necklace';
  if (/bracelet|bangle/.test(text)) return 'bracelet';
  if (/watch/.test(text)) return 'watch';
  return 'other';
};
const productFamily = product => {
  const text = `${product.handle} ${product.title} ${product.category}`.toLowerCase();
  if (/hardware/.test(text)) return 'hardware';
  if (/knot/.test(text)) return 'knot';
  if (/nail|clou/.test(text)) return 'nail';
  if (/\blove\b|screw/.test(text)) return 'love';
  if (/clover|alhambra/.test(text)) return 'clover';
  if (/flower|blossom|frivole/.test(text)) return 'floral';
  return product.category || 'other';
};
const recommendationTokens = product => new Set(`${product.handle} ${product.title}`.toLowerCase().split(/[^a-z0-9]+/).filter(token => token.length > 2 && !['the','and','with','edition','bracelet','bangle','ring','necklace','pendant','earring','earrings'].includes(token)));

fetch('assets/rayray-authorized/catalog.json')
  .then(response => response.json())
  .then(items => {
    const product = items.find(item => item.handle === handle);
    if (!product) throw Error('missing');
    document.title = `Lisa Dee ${product.title}`;
    const allVariants = product.variants;
    const variants = allVariants.filter(variant => variant.available !== false);
    const keys = ['option1','option2','option3'];
    const groups = keys.map((key, index) => {
      const values = [...new Set(allVariants.map(variant => variant[key]).filter(Boolean))];
      return values.length ? { key, index, values, label: optionLabel(values, product, index), color: isColorGroup(values) } : null;
    }).filter(Boolean);
    const selected = Object.fromEntries(groups.map(group => [group.key, variants[0]?.[group.key] || group.values[0]]));
    const optionsMarkup = groups.map(group => `<fieldset class="rr-option-group ${group.color ? 'rr-colors' : ''}" data-option-group="${safe(group.label)}" data-option-key="${group.key}"><legend>${safe(group.label)}${group.color ? `: <b class="lisa-product-option-value">${safe(selected[group.key])}</b>` : '<b class="lisa-product-option-value rr-visually-hidden">' + safe(selected[group.key]) + '</b>'}</legend><div>${group.values.map(value => { const available = variants.some(variant => variant[group.key] === value); return `<button type="button" class="rr-option ${selected[group.key] === value ? 'active' : ''} ${available ? '' : 'sold-out'}" data-option-value="${safe(value)}" ${available ? '' : 'disabled aria-label="' + safe(value) + ' sold out"'} ${group.color ? `data-color="${colorName(value)}" title="${safe(value)}" aria-label="${safe(value)}"` : ''}>${group.color ? '' : safe(value)}</button>`; }).join('')}</div></fieldset>`).join('');

    app.innerHTML = `<nav class="product-bread"><a href="lisa-dee-v2.html">Home</a><span>/</span><a href="lisa-dee-catalog.html">Shop the Edit</a></nav><section class="product-layout"><div class="product-media"><img id="mainImage" src="${safe(product.images[0])}" alt="${safe(product.title)}"><div class="product-thumbs">${product.images.map((src,index) => `<button type="button" class="${index ? '' : 'active'}" data-image="${safe(src)}"><img src="${safe(src)}" alt="${safe(product.title)} view ${index + 1}"></button>`).join('')}</div></div><div class="product-panel clover-panel"><p class="rr-vendor">HERITAGE LUXURY FINDS BY LISA DEE</p><h1>${safe(product.title)}</h1><p id="price" class="main-price">${money(product.price)}</p><p class="rr-order-note">Shipping and final availability are confirmed directly with Lisa.</p><div class="rr-options">${optionsMarkup}</div><p class="rr-sku">SKU: <strong class="lisa-sku-value">${safe(String(variants[0]?.id || ''))}</strong></p><div class="rr-quantity"><label>Quantity</label><div><button id="minus" type="button">−</button><b id="qty">1</b><button id="plus" type="button">+</button></div></div><button id="add" class="product-add" type="button">ADD TO LISA ORDER</button><div class="product-description"><section><h2>Product Details</h2><p>Lisa Dee ${safe(product.title)}</p></section><section><h2>Content + Care</h2><p>Each piece in Lisa’s collection is carefully selected and handcrafted. To preserve its finish, keep it away from water, perfume and harsh chemicals.</p></section><section><h2>Disclaimer</h2><p>These items are independently crafted, design-inspired fashion jewelry. They are not affiliated with, endorsed by or represented as products of any trademarked designer brand. No ownership of third-party trademarks or copyrighted logos is claimed.</p></section></div><p class="private-note">Lisa will personally confirm availability, the final eligible discount, delivery and payment instructions before you pay.</p></div></section>`;

    app.querySelector('h1').textContent = `Lisa Dee ${product.title}`;
    app.querySelector('#add').insertAdjacentHTML('afterend', `<section class="lisa-volume-offer" aria-label="Buy more save more"><header><span></span><h2>BUY MORE, SAVE MORE</h2><span></span></header><div class="lisa-volume-tiers"><article><small>BUY 2</small><b>10% OFF</b></article><article><small>BUY 3</small><b>15% OFF</b></article><article><small>BUY 5+</small><b>25% OFF</b></article></div><p><i>✓</i> Lisa will confirm your best eligible discount before payment.</p><a href="lisa-dee-catalog.html">ADD ANOTHER PIECE</a></section>`);

    const updateVariant = () => {
      const variant = variants.find(item => groups.every(group => item[group.key] === selected[group.key])) || variants[0];
      document.querySelector('#price').textContent = money(variant.price);
      document.querySelector('.lisa-sku-value').textContent = variant.id || '';
    };
    app.querySelectorAll('.rr-option-group').forEach(groupElement => groupElement.querySelectorAll('.rr-option').forEach(button => button.onclick = () => {
      const key = groupElement.dataset.optionKey;
      selected[key] = button.dataset.optionValue;
      groupElement.querySelectorAll('.rr-option').forEach(item => item.classList.toggle('active', item === button));
      groupElement.querySelector('.lisa-product-option-value').textContent = selected[key];
      updateVariant();
    }));
    app.querySelectorAll('[data-image]').forEach(button => button.onclick = () => { document.querySelector('#mainImage').src = button.dataset.image; app.querySelectorAll('[data-image]').forEach(item => item.classList.toggle('active', item === button)); });
    document.querySelector('#minus').onclick = () => { const quantity = document.querySelector('#qty'); quantity.textContent = Math.max(1, Number(quantity.textContent) - 1); };
    document.querySelector('#plus').onclick = () => { const quantity = document.querySelector('#qty'); quantity.textContent = Number(quantity.textContent) + 1; };

    const currentType = productType(product);
    const currentFamily = productFamily(product);
    const currentTokens = recommendationTokens(product);
    const matchingCandidates = items.filter(item => item.handle !== product.handle && productFamily(item) === currentFamily && productType(item) !== currentType && productType(item) !== 'other').sort((a,b) => {
      const score = item => [...recommendationTokens(item)].filter(token => currentTokens.has(token)).length;
      return score(b) - score(a);
    });
    const typeOrder = ['necklace','ring','earrings','bracelet','watch'].filter(type => type !== currentType);
    const matching = typeOrder.map(type => matchingCandidates.find(item => productType(item) === type)).filter(Boolean).slice(0,4);
    const bestSellerHandles = ['classic-love-bracelet','rayray-nail-bangle','rayray-clover-ring-lucky-collection','rayray-lucky-ladybug-bracelet-gold','vintage-alhambra-black-onyx-ring'];
    const bestSellers = bestSellerHandles.map(bestHandle => items.find(item => item.handle === bestHandle)).filter(item => item && item.handle !== product.handle).slice(0,4);
    const suggestions = matching.length ? matching : bestSellers;
    if (suggestions.length) {
      const recommendationTitle = matching.length ? 'COMPLETE THE SET' : 'BESTSELLERS';
      const recommendationCopy = matching.length ? 'Matching pieces from the same collection, selected to complete your look.' : 'Lisa’s most-loved pieces, selected for easy everyday styling.';
      const quickPicks = suggestions.slice(0,2);
      app.querySelector('.lisa-volume-tiers').insertAdjacentHTML('afterend', `<div class="lisa-quick-picks"><h3>${matching.length ? 'ADD A MATCHING PIECE' : 'ADD A BESTSELLER'}</h3>${quickPicks.map(item => `<article data-quick-handle="${safe(item.handle)}"><a href="lisa-dee-product.html?handle=${encodeURIComponent(item.handle)}"><img src="${safe(item.images[0])}" alt="${safe(item.title)}"></a><div><a href="lisa-dee-product.html?handle=${encodeURIComponent(item.handle)}"><b>Lisa Dee ${safe(item.title)}</b></a><span>${money(item.price)}</span></div><button type="button" class="lisa-quick-add">ADD</button></article>`).join('')}</div>`);
      app.querySelectorAll('.lisa-quick-add').forEach(button => button.onclick = () => {
        const card = button.closest('[data-quick-handle]');
        const item = items.find(candidate => candidate.handle === card.dataset.quickHandle);
        const variant = item?.variants?.find(candidate => candidate.available !== false) || item?.variants?.[0] || {};
        if (!item) return;
        const title = `Lisa Dee ${item.title}`;
        const options = variant.title && variant.title !== 'Default Title' ? [`Selection: ${variant.title}`] : [];
        const key = `${title}|${options.join('|')}`;
        let cart = [];
        try { cart = JSON.parse(localStorage.getItem('lisa-order-draft-v1')) || []; } catch {}
        const existing = cart.find(cartItem => cartItem.key === key);
        if (existing) existing.quantity += 1;
        else cart.push({ title, price:Number(variant.price ?? item.price ?? 0), priceText:money(variant.price ?? item.price), quantity:1, options, sku:String(variant.id || ''), code:'', key });
        localStorage.setItem('lisa-order-draft-v1', JSON.stringify(cart));
        const count = cart.reduce((total, cartItem) => total + Number(cartItem.quantity || 0), 0);
        document.querySelectorAll('.lisa-cart-count').forEach(node => { node.textContent = `(${count})`; });
        button.textContent = 'ADDED ✓';
        button.classList.add('added');
        const note = app.querySelector('.lisa-volume-offer>p');
        if (note) note.innerHTML = count >= 5 ? '<i>✓</i> 25% discount tier reached — Lisa will confirm it before payment.' : count >= 3 ? '<i>✓</i> 15% discount tier reached — add more to unlock 25%.' : count >= 2 ? '<i>✓</i> 10% discount tier reached — add one more to unlock 15%.' : '<i>✓</i> Added to your Lisa order.';
      });
      app.insertAdjacentHTML('beforeend', `<section class="lisa-recommendations"><header><p>${matching.length ? 'PAIR IT WITH' : 'LISA’S EDIT'}</p><h2>${recommendationTitle}</h2><span>${recommendationCopy}</span></header><div>${suggestions.map(item => `<a href="lisa-dee-product.html?handle=${encodeURIComponent(item.handle)}"><figure><img src="${safe(item.images[0])}" alt="${safe(item.title)}"><i>${matching.length ? 'MATCHING SET' : 'BESTSELLER'}</i></figure><h3>Lisa Dee ${safe(item.title)}</h3><p>${money(item.price)}</p></a>`).join('')}</div></section>`);
    }

    if (product.videos?.length) {
      app.insertAdjacentHTML('beforeend', `<section class="lisa-product-motion"><h2>SEE IT IN MOTION</h2><p>Hover to play · Tap for controls</p><div>${product.videos.map(video => `<figure class="${safe(video.orientation || 'portrait')}"><video controls muted loop playsinline preload="metadata" poster="${safe(product.images[0])}" aria-label="${safe(`${product.title} ${video.label}`)}"><source src="${safe(video.src)}" type="video/mp4"></video><figcaption>▶ ${safe(video.label)}</figcaption></figure>`).join('')}</div></section>`);
      app.querySelectorAll('.lisa-product-motion figure').forEach(card => { const video = card.querySelector('video'); card.addEventListener('mouseenter', () => video.play().catch(() => {})); card.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; }); });
    }
  })
  .catch(() => { app.innerHTML = '<div class="product-error"><h1>This piece is unavailable</h1><p>Please return to Lisa’s collection and choose another item.</p><a href="lisa-dee-catalog.html">BACK TO THE COLLECTION</a></div>'; });
