import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const collectionFiles = [
  'clover-collection.js','clover-10-motifs-necklaces.js','clover-11-motifs-necklaces.js',
  'clover-20-motifs-necklaces.js','sweet-clover-necklaces.js','clover-earrings.js','clover-rings.js',
  'frivole-earrings.js','frivole-rings.js','love-bracelets.js','love-necklaces.js','love-rings.js',
  'hardware.js','knot.js','juste-un-clou-necklaces.js','new-arrivals.js'
];

const records = new Map();
const add = (handle, source) => {
  if (!handle || !/^[a-z0-9][a-z0-9-%]+$/i.test(handle)) return;
  if (!records.has(handle)) records.set(handle, { handle, sources: [] });
  records.get(handle).sources.push(source);
};

for (const file of collectionFiles) {
  const text = fs.readFileSync(path.join(root, file), 'utf8');
  for (const match of text.matchAll(/handle\s*:\s*['"]([^'"]+)['"]/g)) add(match[1], file);
  for (const match of text.matchAll(/(?:const\s+)?(?:handles|\w+Handles)\s*=\s*\[([\s\S]*?)\]/g)) {
    for (const item of match[1].matchAll(/['"]([^'"]+)['"]/g)) add(item[1], file);
  }
}

const refText = fs.readFileSync(path.join(root, 'reference-products-local.js'), 'utf8');
const productBlock = refText.slice(0, refText.indexOf('const aliases'));
for (const match of productBlock.matchAll(/^\s{2}"([^"]+)":\s*\{/gm)) add(match[1], 'reference-products-local.js');

const current = JSON.parse(fs.readFileSync(path.join(root, 'assets/rayray-authorized/catalog.json'), 'utf8'));
const currentHandles = new Set(current.map(item => item.handle));
const old = [...records.values()].sort((a,b) => a.handle.localeCompare(b.handle));
const missing = old.filter(item => !currentHandles.has(item.handle));
const report = { generatedAt: new Date().toISOString(), oldUniqueProducts: old.length, newProducts: current.length, exactHandleOverlap: old.length - missing.length, missingCount: missing.length, missing };
fs.writeFileSync('/tmp/lisa-old-vs-new.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify({oldUniqueProducts:report.oldUniqueProducts,newProducts:report.newProducts,exactHandleOverlap:report.exactHandleOverlap,missingCount:report.missingCount},null,2));
