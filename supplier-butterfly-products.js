(() => {
  const base = 'assets/supplier-butterfly';
  const products = {
    'clover-white-mother-of-pearl-butterfly-necklace': {
      title: 'Clover White Mother of Pearl Butterfly Necklace',
      handle: 'clover-white-mother-of-pearl-butterfly-necklace',
      price: 8500,
      featured_image: `${base}/necklace/01.jpg`,
      images: [`${base}/necklace/01.jpg`, `${base}/necklace/02.jpg`, `${base}/necklace/03.jpg`, `${base}/necklace/04.jpg`],
      variants: [{ option1: 'White Mother of Pearl / Rose Gold', option2: '40 – 45 Cm', price: 8500, available: true }]
    },
    'clover-white-mother-of-pearl-butterfly-bracelet': {
      title: 'Clover White Mother of Pearl Butterfly Bracelet',
      handle: 'clover-white-mother-of-pearl-butterfly-bracelet',
      price: 7500,
      featured_image: `${base}/bracelet/01.jpg`,
      images: [`${base}/bracelet/01.jpg`, `${base}/bracelet/02.jpg`],
      variants: [{ option1: 'White Mother of Pearl / Rose Gold', option2: '19 Cm', price: 7500, available: true }]
    },
    'clover-white-mother-of-pearl-butterfly-ring': {
      title: 'Clover White Mother of Pearl Butterfly Ring',
      handle: 'clover-white-mother-of-pearl-butterfly-ring',
      price: 9500,
      featured_image: `${base}/ring/01.jpg`,
      images: [`${base}/ring/01.jpg`, `${base}/ring/02.jpg`],
      variants: [5, 6, 7, 8].map((size) => ({ option1: 'White Mother of Pearl / Rose Gold', option2: `US ${size}`, price: 9500, available: true }))
    },
    'clover-white-mother-of-pearl-butterfly-earrings': {
      title: 'Clover White Mother of Pearl Butterfly Earrings',
      handle: 'clover-white-mother-of-pearl-butterfly-earrings',
      price: 9500,
      featured_image: `${base}/earrings/01.png`,
      images: [`${base}/earrings/01.png`, `${base}/earrings/02.jpg`],
      variants: [{ option1: 'White Mother of Pearl / Rose Gold', price: 9500, available: true }]
    }
  };

  Object.assign(window.heritageReferenceProducts || {}, products);

  const videos = {
    'clover-white-mother-of-pearl-butterfly-necklace': [
      `${base}/necklace/detail-01.mp4`,
      `${base}/necklace/detail-02.mp4`,
      `${base}/necklace/detail-03.mp4`
    ],
    'clover-white-mother-of-pearl-butterfly-earrings': [`${base}/earrings/detail.mp4`]
  };
  const handle = new URLSearchParams(location.search).get('handle');

  function addProductVideos() {
    const sources = videos[handle];
    const app = document.querySelector('#app');
    const thumbs = app?.querySelector('#thumbs');
    if (!sources || !thumbs || app.dataset.supplierButterflyVideos) return;
    app.dataset.supplierButterflyVideos = 'true';

    const section = document.createElement('section');
    section.className = 'supplier-product-videos';
    section.innerHTML = `<h2>SEE IT IN MOTION</h2><div>${sources.map((src, index) => `<video controls muted loop playsinline preload="none" aria-label="${products[handle].title} video ${index + 1}"><source src="${src}" type="video/mp4"></video>`).join('')}</div>`;
    thumbs.after(section);

    if (!document.querySelector('#supplierButterflyVideoStyles')) {
      const style = document.createElement('style');
      style.id = 'supplierButterflyVideoStyles';
      style.textContent = '.supplier-product-videos{margin-top:18px}.supplier-product-videos h2{margin:0 0 10px;font:600 12px Quicksand,sans-serif;letter-spacing:.14em;color:#243357}.supplier-product-videos>div{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px}.supplier-product-videos video{display:block;width:100%;max-height:520px;aspect-ratio:9/16;object-fit:cover;background:#101d4d}.supplier-product-videos video:only-child{aspect-ratio:16/9;max-height:none}';
      document.head.append(style);
    }
  }

  const app = document.querySelector('#app');
  if (app) new MutationObserver(addProductVideos).observe(app, { childList: true, subtree: true });
  addProductVideos();
})();
