const navScript=document.createElement('script');
navScript.src='catalog-nav.js';
document.head.append(navScript);
const items=[
  {handle:'clover-full-pave-butterfly-necklace',kind:'necklace',title:'Clover Full Pavé Butterfly Necklace',image:'assets/supplier-clean/full-pave-butterfly-necklace/01.jpg',price:8500},
  {handle:'clover-mother-of-pearl-pave-double-butterfly-ring',kind:'clover-ring',title:'Clover Mother of Pearl & Pavé Double Butterfly Ring',image:'assets/supplier-clean/double-butterfly-ring/01.jpg',price:9500},
  {handle:'clover-white-mother-of-pearl-butterfly-necklace',kind:'necklace',title:'Clover White Mother of Pearl Butterfly Necklace',image:'assets/supplier-butterfly/necklace/01.jpg',price:8500},
  {handle:'clover-white-mother-of-pearl-butterfly-bracelet',kind:'bracelet',title:'Clover White Mother of Pearl Butterfly Bracelet',image:'assets/supplier-butterfly/bracelet/01.jpg',price:7500},
  {handle:'clover-white-mother-of-pearl-butterfly-ring',kind:'clover-ring',title:'Clover White Mother of Pearl Butterfly Ring',image:'assets/supplier-butterfly/ring/01.jpg',price:9500},
  {handle:'clover-white-mother-of-pearl-butterfly-earrings',kind:'clover-earring',title:'Clover White Mother of Pearl Butterfly Earrings',image:'assets/supplier-butterfly/earrings/01.png',price:9500},
  {handle:'pave-heart-necklace',kind:'love-necklace',title:'Pavé Heart Necklace',image:'assets/pave-heart-necklace/large.png',price:9800},
  {handle:'pave-knot-necklace',kind:'knot',title:'Pavé Knot Necklace',image:'https://xcimg.szwego.com/img/0905f827/20260328/i1774676649579_2919_0_7.jpg',price:8500},
  {handle:'woven-key-pendant-necklace',kind:'knot',title:'Woven Key Pendant Necklace',image:'assets/reference-local/woven-key-pendant-necklace/01.jpg',price:8500},
  {handle:'pink-pave-knot-necklace',kind:'knot',title:'Pink Pavé Knot Necklace',image:'https://xcimg.szwego.com/img/0905f827/20260328/i1774676885264_8970_0_2.jpg',price:9400},
  {handle:'hardware-t-pave-bangle',kind:'hardware',title:'Hardware T Pavé Bangle',image:'https://xcimg.szwego.com/img/5b0ad70f/20260823/a1787460974126_6361.jpg',price:8500},
  {handle:'hardware-t-pave-ring',kind:'hardware',title:'Hardware T Pavé Ring',image:'https://xcimg.szwego.com/img/5b0ad70f/20260823/a1787460974126_6361.jpg',price:8200},
  {handle:'hardware-smile-pendant-necklace',kind:'hardware',title:'Hardware Smile Pendant Necklace',image:'https://xcimg.szwego.com/img/5b0ad70f/20260823/a1787460974126_0512.jpg',price:8200},
  {handle:'hardware-link-pendant-necklace',kind:'hardware',title:'Hardware Link Pendant Necklace',image:'assets/hardware-link-pendant/hero.png',price:8200},
  {handle:'hardware-mini-u-link-pave-necklace',kind:'hardware',title:'Hardware Mini U Link Pavé Necklace',image:'https://xcimg.szwego.com/img/39b0e681/20251118/i1763448121873_244_0_0.jpg',price:8200},
  {handle:'hardware-double-u-link-pave-necklace',kind:'hardware',title:'Hardware Double U Link Pavé Necklace',image:'https://xcimg.szwego.com/img/39b0e681/20251103/i1762152012879_7897_0_0.jpg',price:9800},
  {handle:'hardware-u-link-pave-earrings',kind:'hardware',title:'Hardware U Link Pavé Earrings',image:'https://xcimg.szwego.com/img/39b0e681/20251015/i1760492238244_2565_0_0.jpg',price:8500},
  {handle:'hardware-large-link-bracelet',kind:'love-bracelet',title:'Hardware Large Link Bracelet',image:'https://xcimg.szwego.com/img/30293d96/20250916/i1758016476938_2132_0_0.jpg',price:12500},
  {handle:'pave-hardware-bracelet',kind:'love-bracelet',title:'Pavé Hardware Bracelet',image:'https://xcimg.szwego.com/img/30293d96/20241127/i1732702746_7014_7.jpg',price:9500},
  {handle:'hardware-u-link-bracelet',kind:'love-bracelet',title:'Hardware U Link Bracelet',image:'https://xcimg.szwego.com/img/39b0e681/20250620/i1750384184254_3337_0_0.jpg',price:8500},
  {handle:'pink-diamond-double-pendant-necklace',kind:'love-necklace',title:'LOVE Pendant, 2 Diamonds',image:'assets/love-pendant-2-diamonds/pink-diamond.jpg',price:9500},
  {handle:'double-charm-bracelet',kind:'love-bracelet',title:'Double Charm Bracelet',image:'https://xcimg.szwego.com/20241127/i1732644061_8738_0.jpg',price:9500},
  {handle:'flexible-nail-bangle',kind:'love-bracelet',title:'Flexible Nail Bangle',image:'https://xcimg.szwego.com/img/f521789a/20251207/i1765042432438_843_0_2.jpg',price:10400},
  {handle:'love-pendant',kind:'love-necklace',title:'LOVE Pendant',image:'assets/love-pendant/plain.png',price:9400},
  {handle:'pave-cross-bracelet',kind:'bracelet',title:'Pavé Cross Bracelet',image:'https://xcimg.szwego.com/img/f521789a/20260409/i1775672761126_1029_0_0.jpg',price:8700},
  {handle:'clover-beaded-pave-bangle',kind:'bracelet',title:'Clover Beaded Pavé Bangle',image:'https://xcimg.szwego.com/20201214/i1607922389_5668_0.jpg',price:8700},
  {handle:'paved-diamonds-love-bracelet',kind:'love-bracelet',title:'Wide Pavé Screw Motif Bracelet',image:'https://xcimg.szwego.com/img/f521789a/20251207/i1765042323658_2985_0_1.jpg',price:10400}
];
const esc=s=>String(s||'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
document.querySelector('#grid').innerHTML=items.map(item=>`<a class="card" href="clover-product.html?kind=${encodeURIComponent(item.kind)}&handle=${encodeURIComponent(item.handle)}"><figure><img src="${esc(item.image)}" alt="${esc(item.title)}"><span class="badge">NEW</span></figure><h2>${esc(item.title)}</h2><p>$${(item.price/100).toFixed(2)} USD</p></a>`).join('');
const hoverVideoScript=document.createElement('script');hoverVideoScript.src='collection-video-hover.js';document.head.append(hoverVideoScript);
