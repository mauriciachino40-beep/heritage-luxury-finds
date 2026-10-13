const menuScript=document.createElement('script');menuScript.src='catalog-nav.js';document.head.append(menuScript);const items=[
{handle:'hardware-u-link-bracelet',title:'Hardware U Link Bracelet',image:'https://xcimg.szwego.com/img/39b0e681/20250620/i1750384184254_3337_0_0.jpg',price:8500},
{handle:'pave-hardware-bracelet',title:'Pavé Hardware Bracelet',image:'https://xcimg.szwego.com/img/30293d96/20241127/i1732702746_7014_7.jpg',price:9500},
{handle:'hardware-large-link-bracelet',title:'Hardware Large Link Bracelet',image:'https://xcimg.szwego.com/img/30293d96/20250916/i1758016476938_2132_0_0.jpg',price:12500},
{handle:'hardware-t-pave-bangle',title:'Hardware T Pavé Bangle',image:'https://xcimg.szwego.com/img/5b0ad70f/20260823/a1787460974126_6361.jpg',price:8500},
{handle:'hardware-t-pave-ring',title:'Hardware T Pavé Ring',image:'https://xcimg.szwego.com/img/5b0ad70f/20260823/a1787460974126_6361.jpg',price:8200},
{handle:'hardware-smile-pendant-necklace',title:'Hardware Smile Pendant Necklace',image:'https://xcimg.szwego.com/img/5b0ad70f/20260823/a1787460974126_0512.jpg',price:8200},
{handle:'hardware-link-pendant-necklace',title:'Hardware Link Pendant Necklace',image:'assets/hardware-link-pendant/hero.png',price:8200},
{handle:'hardware-mini-u-link-pave-necklace',title:'Hardware Mini U Link Pavé Necklace',image:'https://xcimg.szwego.com/img/39b0e681/20251118/i1763448121873_244_0_0.jpg',price:8200},
{handle:'hardware-double-u-link-pave-necklace',title:'Hardware Double U Link Pavé Necklace',image:'https://xcimg.szwego.com/img/39b0e681/20251103/i1762152012879_7897_0_0.jpg',price:9800},
{handle:'hardware-u-link-pave-earrings',title:'Hardware U Link Pavé Earrings',image:'https://xcimg.szwego.com/img/39b0e681/20251015/i1760492238244_2565_0_0.jpg',price:8500}
];const esc=s=>String(s||'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));document.querySelector('#grid').innerHTML=items.map(item=>`<a class="card" href="clover-product.html?kind=hardware&handle=${encodeURIComponent(item.handle)}"><figure><img src="${esc(item.image)}" alt="${esc(item.title)}"></figure><h2>${esc(item.title)}</h2><p>$${(item.price/100).toFixed(2)} USD</p></a>`).join('');
