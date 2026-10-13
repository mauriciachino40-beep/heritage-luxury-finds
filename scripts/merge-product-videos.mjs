import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync('product-videos.js', 'utf8').replace(
  'const product = products[handle];',
  'window.__productVideos = products; const product = products[handle];'
);
const context = {
  window: {}, location: { search: '', pathname: '/' }, URLSearchParams,
  document: { querySelector: () => null, body: {} }, MutationObserver: class { observe() {} }
};
vm.createContext(context);
vm.runInContext(source, context);
const mapping = context.window.__productVideos || {};
mapping['clover-white-mother-of-pearl-butterfly-necklace'] = {
  videos: [
    { src: 'assets/supplier-butterfly/necklace/detail-01.mp4', label: 'Necklace detail', orientation: 'portrait' },
    { src: 'assets/supplier-butterfly/necklace/detail-02.mp4', label: 'Necklace styling', orientation: 'portrait' },
    { src: 'assets/supplier-butterfly/necklace/detail-03.mp4', label: 'Mother of pearl detail', orientation: 'portrait' }
  ]
};
mapping['clover-white-mother-of-pearl-butterfly-earrings'] = {
  videos: [{ src: 'assets/supplier-butterfly/earrings/detail.mp4', label: 'Earring detail', orientation: 'portrait' }]
};

const catalogPath = 'assets/rayray-authorized/catalog.json';
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
let matched = 0;
let references = 0;
for (const product of catalog) {
  const entry = mapping[product.handle];
  if (!entry?.videos?.length) continue;
  const videos = entry.videos.filter(video => fs.existsSync(video.src));
  if (!videos.length) continue;
  product.videos = videos;
  matched += 1;
  references += videos.length;
}
fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + '\n');
console.log(JSON.stringify({ mappedProducts: matched, videoReferences: references }, null, 2));
