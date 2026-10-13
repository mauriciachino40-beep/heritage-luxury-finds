const safe = value => String(value ?? '').replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));
const visualMatch = document.createElement('link');
visualMatch.rel = 'stylesheet';
visualMatch.href = 'rayray-match.css?v=20261013-1';
document.head.append(visualMatch);
const menuButton = document.createElement('button');
menuButton.className = 'mobile-menu';
menuButton.type = 'button';
menuButton.setAttribute('aria-label', 'Browse the collection');
menuButton.onclick = () => location.href = 'lisa-dee-catalog.html';
document.querySelector('.site-header')?.prepend(menuButton);
const money = value => `$${Number(value).toFixed(2)} USD`;
const app = document.querySelector('#productApp');
const handle = new URLSearchParams(location.search).get('handle');
const detailStyle = document.createElement('style');
detailStyle.textContent = '.product-description{margin:30px 0;padding-bottom:25px;border-bottom:1px solid #d8d0c8}.product-description h2{font-size:10px;letter-spacing:.16em}.product-description p{color:#5f5852;font-size:13px;line-height:1.75}';
document.head.append(detailStyle);

fetch('assets/rayray-authorized/catalog.json')
  .then(response => response.json())
  .then(items => {
    const product = items.find(item => item.handle === handle);
    if (!product) throw Error('missing');
    document.title = `${product.title} — Lisa Dee`;
    const variants = product.variants.filter(variant => variant.available !== false);
    const description = product.description || "A thoughtfully selected piece from Lisa's private jewelry edit, chosen for effortless everyday styling and easy pairing.";
    app.innerHTML = `
      <nav class="product-bread"><a href="lisa-dee-v2.html">Home</a><span>/</span><a href="lisa-dee-catalog.html">Shop the Edit</a></nav>
      <section class="product-layout">
        <div class="product-media"><img id="mainImage" src="${safe(product.images[0])}" alt="${safe(product.title)}"><div class="product-thumbs">${product.images.map((src, index) => `<button type="button" class="${index ? '' : 'active'}" data-image="${safe(src)}"><img src="${safe(src)}" alt="${safe(product.title)} view ${index + 1}"></button>`).join('')}</div></div>
        <div class="product-panel clover-panel">
          <p class="eyebrow">LISA'S CURATED EDIT</p><h1>${safe(product.title)}</h1><p id="price" class="main-price">${money(product.price)}</p>
          ${variants.length > 1 ? `<div data-option-group="Selection" class="variant-picker"><label>YOUR SELECTION</label><b class="lisa-product-option-value">${safe(variants[0].title)}</b><select id="variantSelect">${variants.map((variant, index) => `<option value="${index}">${safe(variant.title)} — ${money(variant.price)}</option>`).join('')}</select><p>SKU: <strong class="lisa-sku-value">${safe(String(variants[0].id))}</strong></p></div>` : ''}
          <div class="product-description"><h2>THE DETAILS</h2><p>${safe(description)}</p></div>
          <div class="qty-row"><span>QUANTITY</span><button id="minus" type="button">−</button><b id="qty">1</b><button id="plus" type="button">+</button></div>
          <button id="add" class="product-add" type="button">ADD TO LISA ORDER</button><p class="private-note">Lisa will personally confirm availability, the final eligible discount, delivery and payment instructions before you pay.</p>
        </div>
      </section>`;
    app.querySelectorAll('[data-image]').forEach(button => button.onclick = () => {
      document.querySelector('#mainImage').src = button.dataset.image;
      app.querySelectorAll('[data-image]').forEach(item => item.classList.toggle('active', item === button));
    });
    document.querySelector('#minus').onclick = () => { const quantity = document.querySelector('#qty'); quantity.textContent = Math.max(1, Number(quantity.textContent) - 1); };
    document.querySelector('#plus').onclick = () => { const quantity = document.querySelector('#qty'); quantity.textContent = Number(quantity.textContent) + 1; };
    const select = document.querySelector('#variantSelect');
    if (select) select.onchange = () => {
      const variant = variants[Number(select.value)];
      document.querySelector('.lisa-product-option-value').textContent = variant.title;
      document.querySelector('.lisa-sku-value').textContent = variant.id;
      document.querySelector('#price').textContent = money(variant.price);
    };
  })
  .catch(() => { app.innerHTML = '<div class="product-error"><h1>This piece is unavailable</h1><p>Please return to Lisa’s collection and choose another item.</p><a href="lisa-dee-catalog.html">BACK TO THE COLLECTION</a></div>'; });
