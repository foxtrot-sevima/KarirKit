// Memeriksa mockup template KarirLink / Portal Karir terhadap aturan "template memakai komponen KarirKit, tanpa komponen sendiri".
// 1. Gaya lokal: blok <style> atau stylesheet selain dist/output.css di halaman yang dilacak git (komponen baru harus dibuat di KarirKit).
// 2. Gerbang produksi: "Dasar KarirKit: vX.Y.Z" di templates/CHANGELOG.md harus versi yang sudah bertag (sudah dirilis).
// Pakai: node scripts/check-templates.mjs [--strict]   (npm run check:templates)
// Tanpa --strict hanya melapor (keluar 0); dengan --strict keluar 1 bila ada temuan gaya lokal, 2 bila dasarnya belum rilis.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

const strict = process.argv.includes('--strict');
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).replace(/\r/g, '');

const files = git('ls-files', 'templates/karirlink', 'templates/portal-karir', 'templates/custom').split('\n').filter((f) => f.endsWith('.html'));
const findings = [];
for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  const styles = (html.match(/<style[\s>]/g) || []).length;
  const sheets = [...html.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]*>/g)]
    .map((m) => (m[0].match(/href=["']([^"']+)["']/) || [])[1])
    .filter((h) => h && !/dist\/output\.css$/.test(h) && !/fonts\.googleapis\.com/.test(h));
  if (styles || sheets.length) findings.push({ f, styles, sheets });
}

console.log(`Halaman template yang dicek: ${files.length}`);
if (findings.length) {
  console.log(`\nGaya lokal ditemukan (${findings.length} halaman) - pindahkan ke KarirKit:`);
  for (const x of findings) console.log(`  ${x.f}${x.styles ? `  <style> x${x.styles}` : ''}${x.sheets.length ? `  stylesheet: ${x.sheets.join(', ')}` : ''}`);
} else {
  console.log('Tidak ada gaya lokal di template.');
}

let gate = 0;
if (fs.existsSync('templates/CHANGELOG.md')) {
  const m = fs.readFileSync('templates/CHANGELOG.md', 'utf8').match(/Dasar KarirKit:\s*v(\d+\.\d+\.\d+)/);
  if (m) {
    const tag = `v${m[1]}`;
    const released = git('tag', '-l', tag).trim() === tag;
    console.log(`\nDasar KarirKit terbaru: ${tag} - ${released ? 'sudah dirilis (boleh ke produksi)' : 'BELUM dirilis (mockup tertahan di staging)'}`);
    if (!released) gate = 2;
  }
}

if (strict) process.exit(findings.length ? 1 : gate);
