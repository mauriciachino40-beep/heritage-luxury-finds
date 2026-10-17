const safe = value => String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
const visualMatch = document.createElement('link');
visualMatch.rel = 'stylesheet'; visualMatch.href = 'rayray-match.css?v=20261014-1'; document.head.append(visualMatch);
const menuButton = document.createElement('button');
menuButton.className = 'mobile-menu'; menuButton.type = 'button'; menuButton.setAttribute('aria-label','Open navigation'); menuButton.setAttribute('aria-expanded','false'); document.querySelector('.site-header')?.prepend(menuButton);
const styleFilters = new Set(['clover', 'love', 'nail', 'hardware', 'knot']);
const typeFilters = new Set(['necklace', 'bracelet', 'ring', 'earring', 'watch']);
const titleText = product => String(product.title || '').toLowerCase();
const hasWord = (text, word) => new RegExp(`(^|[^a-z])${word}([^a-z]|$)`, 'i').test(text);
const jewelryType = product => {
  const text = titleText(product);
  if (/earrings?|earclips?|studs?/.test(text)) return 'earring';
  if (/rings?/.test(text)) return 'ring';
  if (/necklaces?|pendants?/.test(text)) return 'necklace';
  if (/watch\s*bands?/.test(text)) return 'watch';
  if (/bracelets?|bangles?/.test(text)) return 'bracelet';
  return typeFilters.has(product.category) ? product.category : '';
};
const matchesFilter = (product, filter) => {
  if (filter === 'all') return true;
  if (typeFilters.has(filter)) return jewelryType(product) === filter;
  if (styleFilters.has(filter)) return hasWord(titleText(product), filter);
  return false;
};
const money = value => `$${Number(value).toFixed(2)} USD`;
let products = [], active = new URLSearchParams(location.search).get('style') || 'all';
const grid = document.querySelector('#catalogGrid'), count = document.querySelector('#catalogCount'), search = document.querySelector('#catalogSearch');

function bindVideoCards() {
  grid.querySelectorAll('.catalog-card.has-video').forEach(card => {
    const video = card.querySelector('video');
    const image = card.querySelector('figure>img');
    const play = () => { video.currentTime = 0; video.play().catch(() => {}); video.style.opacity = '1'; image.style.opacity = '0'; };
    const stop = () => { video.pause(); video.currentTime = 0; video.style.opacity = '0'; image.style.opacity = '1'; };
    card.addEventListener('mouseenter', play); card.addEventListener('mouseleave', stop); card.addEventListener('focusin', play); card.addEventListener('focusout', stop);
  });
}
function render() {
  const query = search.value.trim().toLowerCase();
  const shown = products.filter(product => {
    const text = `${product.title} ${product.handle}`.toLowerCase();
    return (!query || text.includes(query)) && matchesFilter(product, active);
  });
  count.textContent = `${shown.length} PIECES`;
  grid.innerHTML = shown.map(product => {
    const video = product.videos?.[0];
    return `<a class="catalog-card ${video ? 'has-video' : ''}" href="lisa-dee-product.html?handle=${encodeURIComponent(product.handle)}"><figure><img src="${safe(product.images[0])}" alt="${safe(product.title)}" loading="lazy">${video ? `<video muted loop playsinline preload="metadata" poster="${safe(product.images[0])}"><source src="${safe(video.src)}" type="video/mp4"></video><i>▶ VIDEO</i>` : ''}${product.images.length > 1 ? `<span>${product.images.length} VIEWS</span>` : ''}</figure><h2>${safe(product.title)}</h2><p>From ${money(product.price)}</p></a>`;
  }).join('') || '<p class="catalog-empty">No pieces match this search.</p>';
  document.querySelectorAll('[data-filter]').forEach(button => button.classList.toggle('active', button.dataset.filter === active));
  bindVideoCards();
}
document.querySelectorAll('[data-filter]').forEach(button => button.onclick = () => { active = button.dataset.filter; history.replaceState(null,'',`?style=${active}`); render(); });
search.oninput = render;
fetch('assets/rayray-authorized/catalog.json?v=20261017-1').then(response => response.json()).then(data => { products = data; render(); }).catch(() => { grid.innerHTML = '<p class="catalog-empty">The collection could not be loaded. Please try again.</p>'; });
