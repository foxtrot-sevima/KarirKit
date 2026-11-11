// Mulai fitur mockup: `npm run mockup:new <fitur>`.
//
// Membuat worktree ../karirkit-<fitur> dengan branch `mockup/<fitur>` dari ujung `origin/staging` terbaru dan
// menautkan node_modules checkout ini ke worktree itu (junction di Windows) supaya `npm run build` langsung jalan.
// Checkout utama tidak disentuh, jadi pekerjaan setengah jadi di dalamnya aman.
//
//   npm run mockup:new event-redesign
//   node scripts/mockup-new.mjs <fitur> --dry-run   hanya tampilkan yang akan dilakukan
//
// Nama fitur: huruf kecil, angka, dan tanda hubung (tanpa tanggal, tanpa feat/ atau fix/).
import { execFileSync } from 'node:child_process';
import { existsSync, symlinkSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const name = args.find((a) => !a.startsWith('--'));
const say = (m) => console.log(`[mockup:new] ${m}`);
const git = (...a) => execFileSync('git', a, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();

if (!name || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name) || /^\d{4}-\d{2}-\d{2}/.test(name) || /^(feat|fix|chore)(-|$)/.test(name)) {
  say('Nama fitur harus huruf kecil/angka/tanda hubung, tanpa tanggal dan tanpa awalan feat/fix/chore. Contoh: event-redesign');
  process.exit(1);
}
const branch = `mockup/${name}`;
const root = git('rev-parse', '--show-toplevel');
const dir = resolve(root, '..', `karirkit-${name}`);

if (existsSync(dir)) { say(`Folder ${dir} sudah ada. Pakai itu, atau hapus dengan: git worktree remove "${dir}"`); process.exit(1); }
try { git('rev-parse', '--verify', `refs/heads/${branch}`); say(`Branch ${branch} sudah ada lokal. Pilih nama lain atau pakai worktree yang ada.`); process.exit(1); } catch { /* belum ada */ }

if (dryRun) { say(`(dry-run) fetch origin; git worktree add "${dir}" -b ${branch} origin/staging; tautkan node_modules`); process.exit(0); }
say('Mengambil origin/staging terbaru...');
git('fetch', 'origin', 'staging');
git('worktree', 'add', dir, '-b', branch, 'origin/staging');
const nm = join(root, 'node_modules');
if (existsSync(nm) && !existsSync(join(dir, 'node_modules'))) symlinkSync(nm, join(dir, 'node_modules'), 'junction');
say(`Siap: ${dir} (branch ${branch}, dari origin/staging).`);
say(`Kerjakan di folder itu. Selesai: merge --no-ff ke staging di worktree sementara; branch fitur tidak perlu dipush, supaya kuota deployment Vercel tidak habis (lihat skill karirkit-release).`);
say(`Bersihkan setelah tergabung: hapus tautan node_modules (rmdir di Windows), lalu git worktree remove "${dir}".`);
