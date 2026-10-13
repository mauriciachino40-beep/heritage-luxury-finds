/* Local catalogue fallback: product pages and collection pages never need an external catalogue request. */
(()=>{
  const titleFromHandle=handle=>String(handle||'product').replace(/^vintage-alhambra-?/,'Clover ').replace(/^sweet-alhambra-?/,'Clover ').replace(/alhambra/gi,'Clover').replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase()).replace(/\s+/g,' ').trim();
  const imageFor=handle=>/necklace/i.test(handle)?'assets/cartier-love-pendant-navy.png':/ring/i.test(handle)?'assets/set-ring.png':'assets/love-main-navy.png';
  const kindFor=handle=>/necklace/i.test(handle)?'42 Cm':/ring/i.test(handle)?'US 5':'19 Cm';
  const finishFor=handle=>/white|silver/i.test(handle)?'White Gold':/rose|pink/i.test(handle)?'Rose Gold':'Yellow Gold';
  window.heritageProduct=handle=>{
    const image=imageFor(handle),isNecklace=/necklace/i.test(handle),price=isNecklace?11200:/ring/i.test(handle)?8200:8700;
    return {title:titleFromHandle(handle),featured_image:image,images:[image],variants:[{option1:finishFor(handle),option2:kindFor(handle),price}]};
  };
  window.heritageFetch=async handle=>new Response(JSON.stringify(window.heritageProduct(handle)),{status:200,headers:{'Content-Type':'application/json'}});
})();
