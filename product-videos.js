(() => {
  const requestedHandle = new URLSearchParams(location.search).get('handle') || '';
  const pageHandle = location.pathname.split('/').pop().replace(/\.html$/, '');
  const handle = requestedHandle || pageHandle;
  const batch = 'assets/product-videos/downloads-batch-40';
  const products = {
    'pave-heart-necklace': {
      title: 'Pavé Heart Necklace',
      poster: 'assets/pave-heart-necklace/large.png',
      videos: [
        { src: 'assets/product-videos/pave-heart-necklace/detail.mp4', label: 'Pavé heart detail', orientation: 'landscape' }
      ]
    },
    'woven-key-pendant-necklace': {
      title: 'Woven Key Pendant Necklace',
      poster: 'assets/reference-local/woven-key-pendant-necklace/01.jpg',
      videos: [
        { src: 'assets/product-videos/woven-key-pendant-necklace/rose-gold-detail.mp4', label: 'Rose gold detail', orientation: 'portrait' },
        { src: 'assets/product-videos/woven-key-pendant-necklace/white-gold-detail.mp4', label: 'White gold detail', orientation: 'portrait' },
        { src: 'assets/product-videos/woven-key-pendant-necklace/color-comparison.mp4', label: 'Color comparison', orientation: 'landscape' }
      ]
    },
    'hardware-link-pendant-necklace': {
      title: 'Hardware Link Pendant Necklace',
      poster: 'assets/hardware-link-pendant/hero.png',
      videos: [
        { src: `${batch}/o1764067199698_9131_0_0.mp4`, label: 'Pavé link detail', orientation: 'portrait' }
      ]
    },
    'pave-hardware-bracelet': {
      title: 'Pavé Hardware Bracelet',
      poster: 'https://xcimg.szwego.com/img/30293d96/20241127/i1732702746_7014_7.jpg',
      videos: [
        { src: `${batch}/o1732702911_6494_0.mp4`, label: 'Yellow gold detail', orientation: 'landscape' },
        { src: `${batch}/o1732702890_3661_0.mp4`, label: 'Rose gold detail', orientation: 'landscape' },
        { src: `${batch}/o1732702845_2710_0.mp4`, label: 'White gold detail', orientation: 'landscape' },
        { src: `${batch}/o1769935682589_1757_0_0.mp4`, label: 'Color assortment', orientation: 'portrait' }
      ]
    },
    'hardware-u-link-bracelet': {
      title: 'Hardware U Link Bracelet',
      poster: 'https://xcimg.szwego.com/img/39b0e681/20250620/i1750384184254_3337_0_0.jpg',
      videos: [
        { src: `${batch}/o1704536663_6794_0.mp4`, label: 'White gold detail', orientation: 'landscape' },
        { src: `${batch}/o1769935682589_1757_0_0.mp4`, label: 'Color assortment', orientation: 'portrait' }
      ]
    },
    'hardware-large-link-bracelet': {
      title: 'Hardware Large Link Bracelet',
      poster: 'https://xcimg.szwego.com/img/30293d96/20250916/i1758016476938_2132_0_0.jpg',
      videos: [
        { src: `${batch}/o1769935682589_1757_0_0.mp4`, label: 'Hardware bracelet assortment', orientation: 'portrait' }
      ]
    },
    'classic-love-bracelet': {
      title: 'Classic Love Bracelet',
      poster: 'assets/reference-local/classic-love-bracelet/01.png',
      videos: [
        { src: `${batch}/o1664032751_7797_1.mp4`, label: 'Rose gold detail', orientation: 'portrait' },
        { src: `${batch}/o1664032700_8546_1.mp4`, label: 'Stacked styling', orientation: 'portrait' }
      ]
    },
    'flexible-nail-bangle': {
      title: 'Flexible Nail Bangle',
      poster: 'https://xcimg.szwego.com/img/f521789a/20251207/i1765042432438_843_0_2.jpg',
      videos: [
        { src: `${batch}/o1664032700_8546_1.mp4`, label: 'Nail and screw bracelet styling', orientation: 'portrait' }
      ]
    },
    'paved-diamonds-love-bracelet': {
      title: 'Wide Pavé Screw Motif Bracelet',
      poster: 'https://xcimg.szwego.com/img/f521789a/20251207/i1765042323658_2985_0_1.jpg',
      videos: [
        { src: `${batch}/o1709464097_7614_0.mp4`, label: 'Pavé bracelet comparison', orientation: 'portrait' }
      ]
    },
    'juste-un-clou-necklace': {
      title: 'Nail Pendant Necklace',
      poster: 'https://xcimg.szwego.com/20220715/i1657891451_9718_0.jpg',
      videos: [
        { src: `${batch}/o1657891472_1369_1.mp4`, label: 'White gold pendant detail', orientation: 'portrait' }
      ]
    },
    'juste-un-clou-open-circle-necklace': {
      title: 'Juste Un Clou Open Circle Necklace',
      poster: 'assets/reference-local/juste-un-clou-open-circle-necklace/01.jpg',
      videos: [
        { src: `${batch}/o1616050631_257_1.mp4`, label: 'Pavé open circle detail', orientation: 'portrait' }
      ]
    },
    'two-stone-circle-pendant-necklace': {
      title: 'Two-Stone Circle Pendant Necklace',
      poster: 'https://xcimg.szwego.com/20201008/i1602171197_429_0.jpg',
      videos: [
        { src: `${batch}/o1602172375_9070_1.mp4`, label: 'Pendant reverse detail', orientation: 'portrait' },
        { src: `${batch}/o1602172468_373_1.mp4`, label: 'Pendant front detail', orientation: 'portrait' }
      ]
    },
    'clover-beaded-pave-bangle': {
      title: 'Clover Beaded Pavé Bangle',
      poster: 'https://xcimg.szwego.com/20201214/i1607922389_5668_0.jpg',
      videos: [
        { src: `${batch}/o1770371044821_4377_0_0.mp4`, label: 'Beaded pavé detail', orientation: 'portrait' }
      ]
    },
    'clover-kaleidoscope-yellow-gold-ring': {
      title: 'Clover Kaleidoscope Ring — Yellow Gold',
      poster: 'https://xcimg.szwego.com/img/96235afc/20250907/i1757224550736_5794_0_3.jpg',
      videos: [
        { src: 'assets/kaleidoscope-videos/yellow-gold.mp4', label: 'Yellow gold detail', orientation: 'landscape' },
        { src: `${batch}/o1757224159783_3420_0_0.mp4`, label: 'Three-color comparison', orientation: 'landscape' }
      ]
    },
    'clover-kaleidoscope-rose-gold-ring': {
      title: 'Clover Kaleidoscope Ring — Rose Gold',
      poster: 'https://xcimg.szwego.com/img/96235afc/20250907/i1757224550776_4981_0_2.jpg',
      videos: [
        { src: 'assets/kaleidoscope-videos/rose-gold.mp4', label: 'Rose gold detail', orientation: 'landscape' },
        { src: `${batch}/o1757224159783_3420_0_0.mp4`, label: 'Three-color comparison', orientation: 'landscape' }
      ]
    },
    'clover-kaleidoscope-white-gold-ring': {
      title: 'Clover Kaleidoscope Ring — White Gold',
      poster: 'https://xcimg.szwego.com/img/96235afc/20250907/i1757224550737_252_0_1.jpg',
      videos: [
        { src: 'assets/kaleidoscope-videos/white-gold.mp4', label: 'White gold detail', orientation: 'landscape' },
        { src: `${batch}/o1757224159783_3420_0_0.mp4`, label: 'Three-color comparison', orientation: 'landscape' }
      ]
    },
    'vintage-alhambra-five-motifs-clover-elegance-bracelet': {
      title: 'Black Onyx & Pavé Five Motifs Bracelet',
      poster: 'assets/reference-local/vintage-alhambra-five-motifs-clover-elegance-bracelet/01.png',
      videos: [
        { src: `${batch}/o1756966252124_2523_0_0.mp4`, label: 'Black onyx and pavé detail', orientation: 'portrait' }
      ]
    },
    'sweet-alhambra-clover-pendant-necklace': {
      title: 'Clover Pavé Pendant Necklace',
      poster: 'assets/reference-local/sweet-alhambra-clover-pendant-necklace/01.png',
      videos: [
        { src: `${batch}/o1770371542355_5485_0_0.mp4`, label: 'Pavé and black clover styling', orientation: 'portrait' }
      ]
    },
    'sweet-alhambra-heart-pendant-necklace': {
      title: 'Sweet Clover Heart Pendant Necklace',
      poster: 'assets/reference-local/sweet-alhambra-heart-pendant-necklace/01.png',
      videos: [
        { src: `${batch}/o1770371460420_1865_0_0.mp4`, label: 'Red heart detail', orientation: 'portrait' }
      ]
    },
    'clover-pink-bubble-enamel-drop-earrings': {
      title: 'Clover Pink Bubble Enamel Drop Earrings',
      poster: 'https://xcimg.szwego.com/imgHD/fa75a71d/20260911/cmp_i1789059411767_241_0_8.jpg',
      videos: [
        { src: `${batch}/cmp_o1789059449050_2581_0_0.mp4`, label: 'On-ear styling', orientation: 'portrait' },
        { src: `${batch}/o1790002641410_417_0_0.mp4`, label: 'Drop earring detail', orientation: 'portrait' }
      ]
    },
    'clover-butterfly-lucky-five-motifs-bracelet': {
      title: 'Clover Butterfly Lucky Five Motifs Bracelet',
      poster: 'https://xcimg.szwego.com/img/0cf8269c/20260906/i1788676127146_3702_0_0.jpg',
      videos: [
        { src: `${batch}/o1788676421188_9328_0_0.mp4`, label: 'Butterfly bracelet detail', orientation: 'portrait' }
      ]
    }
  };
  const product = products[handle];
  if (!product) return;

  const style = document.createElement('style');
  style.textContent = `
    .product-motion{margin:54px 0 20px;padding-top:38px;border-top:1px solid #e3e3e3;font-family:Quicksand,"Century Gothic",sans-serif}
    .product-motion-heading{text-align:center;margin-bottom:25px}
    .product-motion-heading h2{margin:0 0 8px;color:#222;font:500 28px/1.2 "Cormorant Garamond",Georgia,serif}
    .product-motion-heading p{margin:0;color:#777;font-size:12px;letter-spacing:.09em;text-transform:uppercase}
    .product-motion-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;max-width:1050px;margin:auto}
    .product-motion-grid.is-single{grid-template-columns:minmax(0,850px);justify-content:center}
    .product-motion-grid.is-single-portrait{grid-template-columns:minmax(0,520px)}
    .product-motion-card{position:relative;margin:0;overflow:hidden;background:#f5f5f5;border-radius:4px}
    .product-motion-card.landscape{grid-column:1/-1}
    .product-motion-card video{display:block;width:100%;height:auto;background:#f5f5f5;cursor:pointer}
    .product-motion-card.portrait video{aspect-ratio:9/12;object-fit:contain}
    .product-motion-card.landscape video{aspect-ratio:16/9;object-fit:cover}
    .product-motion-card figcaption{position:absolute;left:12px;bottom:12px;padding:7px 10px;border-radius:2px;background:#ffffffdf;color:#222;font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;pointer-events:none}
    .product-motion-card.is-playing figcaption{opacity:0;transition:opacity .2s}
    @media(max-width:700px){.product-motion{margin-top:36px;padding-top:30px}.product-motion-grid{grid-template-columns:1fr}.product-motion-card.landscape{grid-column:auto}.product-motion-heading h2{font-size:25px}}
  `;
  document.head.append(style);

  const render = () => {
    const host = document.querySelector('#app') || document.querySelector('main');
    const layout = host?.querySelector('.clover-layout, .product-layout');
    if (!layout || host.dataset.motionReady) return;
    host.dataset.motionReady = 'true';

    const section = document.createElement('section');
    section.className = 'product-motion';
    const singleClass = product.videos.length === 1 ? `is-single ${product.videos[0].orientation === 'portrait' ? 'is-single-portrait' : ''}` : '';
    section.innerHTML = `<header class="product-motion-heading"><h2>SEE IT IN MOTION</h2><p>Hover to play · Tap for controls</p></header><div class="product-motion-grid ${singleClass}">${product.videos.map((item) => `<figure class="product-motion-card ${item.orientation}"><video controls muted loop playsinline preload="metadata" poster="${product.poster}" aria-label="${product.title} ${item.label} video"><source src="${item.src}" type="video/mp4"></video><figcaption>▶ ${item.label}</figcaption></figure>`).join('')}</div>`;
    layout.after(section);

    section.querySelectorAll('.product-motion-card').forEach(card => {
      const video = card.querySelector('video');
      const play = () => {
        video.muted = true;
        const result = video.play();
        if (result?.catch) result.catch(() => {});
        card.classList.add('is-playing');
      };
      const stop = () => {
        video.pause();
        video.currentTime = 0;
        card.classList.remove('is-playing');
      };
      card.addEventListener('mouseenter', play);
      card.addEventListener('mouseleave', stop);
      card.addEventListener('focusin', play);
      card.addEventListener('focusout', stop);
      video.addEventListener('play', () => card.classList.add('is-playing'));
      video.addEventListener('pause', () => card.classList.remove('is-playing'));
    });
  };

  const observeTarget = document.querySelector('#app') || document.body;
  new MutationObserver(render).observe(observeTarget, { childList: true, subtree: true });
  render();
})();
