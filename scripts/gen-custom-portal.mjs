// Membangkitkan templates/custom/portal-karir/ dari templates/portal-karir/ (white-label per kampus).
// Halaman disalin dengan jalur aset disesuaikan; kode bersama (portal.js, shell.js) tetap dari templates/portal-karir/.
// Identitas kampus ada di templates/custom/portal-karir/campus.js (tidak ditimpa skrip ini).
// Jalankan: node scripts/gen-custom-portal.mjs [halaman ...]  (tanpa argumen = semua halaman)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'templates/portal-karir');
const out = path.join(root, 'templates/custom/portal-karir');
const ALL = ['index', 'lowongan', 'event', 'pengembangan', 'course', 'segera-hadir', 'riasec', 'riasec-tes', 'riasec-hasil', 'lamaran', 'profil', 'tracer-study', 'tracer-study-mahasiswa'];
const PAGES = process.argv.length > 2 ? ALL.filter((n) => process.argv.slice(2).includes(n)) : ALL;
const SHARED = ['login', 'register', 'onboarding']; // tetap dipakai dari portal-karir

fs.mkdirSync(out, { recursive: true });
for (const name of PAGES) {
  let s = fs.readFileSync(path.join(src, name + '.html'), 'utf8');
  s = s.split('../../assets/').join('../../../assets/').split('../../dist/').join('../../../dist/');
  s = s.replace('<script src="shell.js"></script>', '<script src="../../portal-karir/shell.js"></script>');
  s = s.replace('<script src="portal.js"></script>', '<script src="campus.js"></script>\n<script src="../../portal-karir/portal.js"></script>');
  for (const t of SHARED) s = s.split(`"${t}.html`).join(`"../../portal-karir/${t}.html`).split(`'${t}.html`).join(`'../../portal-karir/${t}.html`);
  s = s.replace('<meta name="robots" content="noindex, nofollow" />', '<meta name="robots" content="noindex, nofollow" />');
  s = s.split('/templates/portal-karir/').join('/templates/custom/portal-karir/');
  fs.writeFileSync(path.join(out, name + '.html'), s);
}
console.log('templates/custom/portal-karir:', PAGES.length, 'halaman dibangkitkan');
