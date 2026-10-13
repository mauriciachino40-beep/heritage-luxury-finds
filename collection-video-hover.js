(() => {
  if (window.__collectionVideoHoverLoaded) return;
  window.__collectionVideoHoverLoaded = true;
  const videos = {
    'pave-heart-necklace': 'assets/product-videos/pave-heart-necklace/detail.mp4',
    'woven-key-pendant-necklace': 'assets/product-videos/woven-key-pendant-necklace/rose-gold-detail.mp4',
    'hardware-link-pendant-necklace': 'assets/product-videos/downloads-batch-40/o1764067199698_9131_0_0.mp4',
    'pave-hardware-bracelet': 'assets/product-videos/downloads-batch-40/o1732702911_6494_0.mp4',
    'hardware-u-link-bracelet': 'assets/product-videos/downloads-batch-40/o1704536663_6794_0.mp4',
    'hardware-large-link-bracelet': 'assets/product-videos/downloads-batch-40/o1769935682589_1757_0_0.mp4',
    'classic-love-bracelet': 'assets/product-videos/downloads-batch-40/o1664032751_7797_1.mp4',
    'flexible-nail-bangle': 'assets/product-videos/downloads-batch-40/o1664032700_8546_1.mp4',
    'paved-diamonds-love-bracelet': 'assets/product-videos/downloads-batch-40/o1709464097_7614_0.mp4',
    'juste-un-clou-necklace': 'assets/product-videos/downloads-batch-40/o1657891472_1369_1.mp4',
    'juste-un-clou-open-circle-necklace': 'assets/product-videos/downloads-batch-40/o1616050631_257_1.mp4',
    'clover-beaded-pave-bangle': 'assets/product-videos/downloads-batch-40/o1770371044821_4377_0_0.mp4',
    'vintage-alhambra-five-motifs-clover-elegance-bracelet': 'assets/product-videos/downloads-batch-40/o1756966252124_2523_0_0.mp4',
    'sweet-alhambra-clover-pendant-necklace': 'assets/product-videos/downloads-batch-40/o1770371542355_5485_0_0.mp4',
    'sweet-alhambra-heart-pendant-necklace': 'assets/product-videos/downloads-batch-40/o1770371460420_1865_0_0.mp4',
    'clover-pink-bubble-enamel-drop-earrings': 'assets/product-videos/downloads-batch-40/cmp_o1789059449050_2581_0_0.mp4',
    'clover-butterfly-lucky-five-motifs-bracelet': 'assets/product-videos/downloads-batch-40/o1788676421188_9328_0_0.mp4'
  };

  const addStyle = () => {
    if (document.querySelector('#collection-hover-video-style')) return;
    const style = document.createElement('style');
    style.id = 'collection-hover-video-style';
    style.textContent = `
      .card.has-hover-video figure{position:relative}
      .card.has-hover-video figure>img{transition:opacity .2s ease}
      .card-hover-video{position:absolute;inset:0;z-index:2;width:100%;height:100%;object-fit:cover;background:#f7f7f7;opacity:0;transition:opacity .22s ease;pointer-events:none}
      .card.has-hover-video.is-video-playing .card-hover-video{opacity:1}
      .card.has-hover-video .badge{z-index:3}
      .hover-video-hint{position:absolute;z-index:4;left:10px;bottom:10px;padding:6px 8px;background:#ffffffdd;color:#222;font:600 9px/1 Quicksand,"Century Gothic",sans-serif;letter-spacing:.1em;text-transform:uppercase;pointer-events:none}
      .card.has-hover-video.is-video-playing .hover-video-hint{opacity:0}
      @media(hover:none){.hover-video-hint{display:none}}
    `;
    document.head.append(style);
  };

  const enhance = () => {
    addStyle();
    document.querySelectorAll('.card[href]:not(.has-hover-video)').forEach(card => {
      let handle = '';
      try {
        handle = new URL(card.href, location.href).searchParams.get('handle') || '';
      } catch {
        return;
      }
      const source = videos[handle];
      if (!source) return;
      const figure = card.querySelector('figure');
      if (!figure) return;

      card.classList.add('has-hover-video');
      const video = document.createElement('video');
      video.className = 'card-hover-video';
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.setAttribute('aria-hidden', 'true');
      video.innerHTML = `<source src="${source}" type="video/mp4">`;
      const hint = document.createElement('span');
      hint.className = 'hover-video-hint';
      hint.textContent = 'Hover to view';
      figure.append(video, hint);

      const play = () => {
        video.muted = true;
        const result = video.play();
        if (result?.catch) result.catch(() => {});
        card.classList.add('is-video-playing');
      };
      const stop = () => {
        video.pause();
        video.currentTime = 0;
        card.classList.remove('is-video-playing');
      };
      card.addEventListener('mouseenter', play);
      card.addEventListener('mouseleave', stop);
      card.addEventListener('focusin', play);
      card.addEventListener('focusout', stop);
    });
  };

  window.initCollectionVideoHover = enhance;
  enhance();
  queueMicrotask(enhance);
  const grid = document.querySelector('#grid');
  if (grid) new MutationObserver(enhance).observe(grid, { childList: true, subtree: true });
})();
