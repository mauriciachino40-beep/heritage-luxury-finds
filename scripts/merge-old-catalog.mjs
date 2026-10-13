import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';

const root = process.cwd();
const currentPath = path.join(root, 'assets/rayray-authorized/catalog.json');
const current = JSON.parse(fs.readFileSync(currentPath, 'utf8'));
const products = {};
const context = {
  window: { heritageReferenceProducts: products, fetch: async () => ({}) },
  Response, URLSearchParams, location: { search: '' },
  MutationObserver: class { observe() {} },
  document: { querySelector: () => null, createElement: () => ({}) },
  console
};
context.window.fetch.bind = Function.prototype.bind.bind(context.window.fetch);
vm.createContext(context);
for (const file of ['reference-products-local.js','supplier-clean-products.js','supplier-butterfly-products.js']) {
  try { vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file }); } catch (error) {
    if (!context.window.heritageReferenceProducts) throw error;
  }
}
Object.assign(products, context.window.heritageReferenceProducts || {});

const sourceFiles = [
  'clover-collection.js','clover-10-motifs-necklaces.js','clover-11-motifs-necklaces.js',
  'sweet-clover-necklaces.js','clover-earrings.js','clover-rings.js','love-bracelets.js',
  'love-necklaces.js','hardware.js','knot.js','new-arrivals.js'
];
for (const file of sourceFiles) {
  const text = fs.readFileSync(path.join(root, file), 'utf8');
  for (const match of text.matchAll(/\{([^{}]{0,1600}?handle\s*:\s*['"][^'"]+['"][^{}]{0,1600}?)\}/g)) {
    const body = match[1];
    const field = name => body.match(new RegExp(`${name}\\s*:\\s*['"]([^'"]+)['"]`))?.[1];
    const handle = field('handle'), title = field('title'), image = field('image');
    const price = Number(body.match(/price\s*:\s*(\d+)/)?.[1] || 0);
    if (!handle || !title || !image || !price || products[handle]) continue;
    products[handle] = { handle, title, price, featured_image: image, images: [image], variants: [{ option1: 'Standard Selection', price, available: true }] };
  }
}

const cleanTitle = title => String(title)
  .replace(/\b(Van Cleef(?:\s*&\s*Arpels)?|Cartier|Tiffany(?:\s*&\s*Co\.)?|RayRay)\b/gi, '')
  .replace(/Vintage Alhambra|Magic Alhambra|Sweet Alhambra|Alhambra/gi, 'Clover')
  .replace(/Juste Un Clou/gi, 'Nail')
  .replace(/\s+/g, ' ').replace(/\s+-\s+$/,'').trim();
const norm = value => cleanTitle(value).toLowerCase().replace(/\b(the|collection|edition|inspired)\b/g,'').replace(/[^a-z0-9]+/g,'');
const category = item => {
  const text = `${item.title} ${item.handle}`.toLowerCase();
  if (/clover|alhambra|butterfly|ladybug/.test(text)) return 'clover';
  if (/love|screw/.test(text)) return 'love';
  if (/nail|clou/.test(text)) return 'nail';
  if (/hardware|link/.test(text)) return 'hardware';
  if (/knot|woven/.test(text)) return 'knot';
  if (/ring/.test(text)) return 'ring';
  if (/necklace|pendant/.test(text)) return 'necklace';
  if (/earring|earclip/.test(text)) return 'earring';
  return 'bracelet';
};
const description = item => {
  const type = /ring/i.test(item.title) ? 'ring' : /earring|earclip/i.test(item.title) ? 'earrings' : /necklace|pendant/i.test(item.title) ? 'necklace' : /watch/i.test(item.title) ? 'watch band' : 'bracelet';
  return `A thoughtfully selected ${type} from Lisa's private jewelry edit. Designed for effortless everyday styling, it can be worn alone or paired with coordinating pieces to create a personal set. Choose your preferred option and Lisa will confirm availability, sizing and final order details directly.`;
};
const fileHash = file => fs.existsSync(file) ? crypto.createHash('sha1').update(fs.readFileSync(file)).digest('hex') : '';
const knownTitles = new Set(current.map(item => norm(item.title)));
const knownImages = new Set(current.flatMap(item => item.images || []).map(image => fileHash(path.join(root,image))).filter(Boolean));
const additions = [];
const downloadRoot = path.join(root, 'assets/old-site-authorized');
fs.mkdirSync(downloadRoot, { recursive: true });

for (const raw of Object.values(products)) {
  const title = cleanTitle(raw.title);
  if (!title || knownTitles.has(norm(title))) continue;
  const localImages = [];
  for (let index = 0; index < (raw.images || [raw.featured_image]).length; index++) {
    let image = (raw.images || [raw.featured_image])[index];
    if (!image) continue;
    if (/^\/\//.test(image)) image = `https:${image}`;
    if (/^https?:/.test(image)) {
      const clean = image.split('?')[0];
      const extension = /\.(png|webp|gif|jpe?g)$/i.exec(clean)?.[1]?.toLowerCase() || 'jpg';
      const dir = path.join(downloadRoot, raw.handle); fs.mkdirSync(dir, { recursive: true });
      const target = path.join(dir, `${String(index + 1).padStart(2,'0')}.${extension}`);
      if (!fs.existsSync(target) || fs.statSync(target).size === 0) {
        try { const response = await fetch(image); if (!response.ok) throw new Error(String(response.status)); fs.writeFileSync(target, Buffer.from(await response.arrayBuffer())); } catch { continue; }
      }
      image = path.relative(root, target);
    }
    if (!fs.existsSync(path.join(root, image))) continue;
    localImages.push(image);
  }
  if (!localImages.length) continue;
  const hashes = localImages.map(image => fileHash(path.join(root,image))).filter(Boolean);
  if (hashes.some(hash => knownImages.has(hash))) continue;
  const price = Number(raw.price || raw.variants?.[0]?.price || 0) / 100;
  if (!price) continue;
  const variants = (raw.variants || []).filter(v => v.available !== false).map((variant,index) => {
    const options = [variant.option1,variant.option2,variant.option3].filter(Boolean);
    return { id: variant.id || `${raw.handle}-${index+1}`, title: variant.title && variant.title !== 'Default Title' ? variant.title : options.join(' / ') || 'Standard Selection', option1:variant.option1||null, option2:variant.option2||null, option3:variant.option3||null, available:true, price:Number(variant.price || raw.price)/100 };
  });
  const item = { handle: raw.handle, title, price, images: localImages, variants: variants.length ? variants : [{id:`${raw.handle}-1`,title:'Standard Selection',available:true,price}], category:category(raw), description:description(raw), source:'old-site-authorized' };
  additions.push(item); knownTitles.add(norm(title)); hashes.forEach(hash=>knownImages.add(hash));
}

const enrichedCurrent = current.map(item => ({...item, category:item.category||category(item), description:item.description||description(item)}));
const merged = [...enrichedCurrent, ...additions].sort((a,b)=>a.title.localeCompare(b.title));
fs.writeFileSync(currentPath, JSON.stringify(merged,null,2)+'\n');
fs.writeFileSync('/tmp/lisa-merge-summary.json', JSON.stringify({before:current.length,candidates:Object.keys(products).length,added:additions.length,after:merged.length,handles:additions.map(x=>x.handle)},null,2));
console.log(JSON.stringify({before:current.length,candidates:Object.keys(products).length,added:additions.length,after:merged.length},null,2));
