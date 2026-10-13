(() => {
  const necklaceBase = 'assets/supplier-clean/full-pave-butterfly-necklace';
  const ringBase = 'assets/supplier-clean/double-butterfly-ring';
  const products = {
    'clover-full-pave-butterfly-necklace': {
      title: 'Clover Full Pavé Butterfly Necklace',
      handle: 'clover-full-pave-butterfly-necklace',
      price: 8500,
      featured_image: `${necklaceBase}/01.jpg`,
      images: Array.from({ length: 7 }, (_, index) => `${necklaceBase}/${String(index + 1).padStart(2, '0')}.jpg`),
      variants: [
        { option1: 'Rose Gold / Full Pavé', option2: '40 – 45 Cm', price: 8500, available: true },
        { option1: 'Yellow Gold / Full Pavé', option2: '40 – 45 Cm', price: 8500, available: true },
        { option1: 'White Gold / Full Pavé', option2: '40 – 45 Cm', price: 8500, available: true }
      ]
    },
    'clover-mother-of-pearl-pave-double-butterfly-ring': {
      title: 'Clover Mother of Pearl & Pavé Double Butterfly Ring',
      handle: 'clover-mother-of-pearl-pave-double-butterfly-ring',
      price: 9500,
      featured_image: `${ringBase}/01.jpg`,
      images: Array.from({ length: 6 }, (_, index) => `${ringBase}/${String(index + 1).padStart(2, '0')}.jpg`),
      variants: ['US 5', 'US 6', 'US 7', 'US 8'].map((size) => ({
        option1: 'White Mother of Pearl & Pavé / Rose Gold',
        option2: size,
        price: 9500,
        available: true
      }))
    }
  };

  Object.assign(window.heritageReferenceProducts || {}, products);
})();
