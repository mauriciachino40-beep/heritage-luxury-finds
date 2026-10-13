const menuScript=document.createElement('script');
menuScript.src='catalog-nav.js';
document.head.append(menuScript);
const nailPendant={handle:'juste-un-clou-necklace',title:'Nail Pendant Necklace',image:'https://xcimg.szwego.com/20220715/i1657891451_9718_0.jpg',price:8200};
const handles=['juste-un-clou-open-circle-necklace','juste-un-clou-plain-round-necklace','juste-un-clou-link-necklace'];
const esc=s=>String(s||'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const full=u=>String(u||'').startsWith('//')?`https:${u}`:u;
Promise.all(handles.map(async handle=>{try{const r=await fetch(`products/${handle}.js`);if(!r.ok)throw Error();const p=await r.json();return{handle,title:p.title,image:full(p.featured_image),price:p.price}}catch{return{handle,title:handle.replaceAll('-',' '),image:'',price:0}}})).then(items=>[nailPendant,...items]).then(items=>document.querySelector('#grid').innerHTML=items.map(p=>`<a class="card" href="clover-product.html?kind=clou-necklace&handle=${encodeURIComponent(p.handle)}"><figure>${p.image?`<img src="${esc(p.image)}" alt="${esc(p.title)}">`:''}</figure><h2>${esc(p.title)}</h2><p>$${(Number(p.price)/100).toFixed(2)} USD</p></a>`).join(''));
