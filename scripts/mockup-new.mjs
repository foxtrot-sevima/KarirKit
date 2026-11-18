// Mulai fitur mockup: `npm run mockup:new <fitur>`.
//
// Memotong branch `mockup/<fitur>` dari ujung `origin/staging` terbaru dan pindah ke sana, langsung di checkout ini
// (tanpa worktree). Menolak jalan bila ada perubahan tracked yang belum disimpan, supaya pekerjaan orang/sesi lain
// tidak terbawa ke branch baru. File belum ter-track (copy, backup, WIP) tidak berpengaruh.
//
//   npm run mockup:new event-redesign
//   node scripts/mockup-new.mjs <fitur> --dry-run   hanya tampilkan yang akan dilakukan
import { execFileSync } from 'node:child_process';

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

try { git('rev-parse', '--verify', `refs/heads/${branch}`); say(`Branch ${branch} sudah ada lokal. Pilih nama lain atau pindah ke sana: git switch ${branch}`); process.exit(1); } catch { /* belum ada */ }

const dirty = git('status', '--porcelain', '--untracked-files=no');
if (dirty) {
  say('Ada perubahan tracked yang belum disimpan (bukan milikmu bila bukan kamu yang mengubahnya):');
  console.log(dirty);
  say('Simpan dulu (commit atau stash) sebelum membuat branch fitur; jangan commit atau revert pekerjaan orang lain.');
  process.exit(1);
}

if (dryRun) { say(`(dry-run) fetch origin; git switch -c ${branch} origin/staging`); process.exit(0); }
say('Mengambil origin/staging terbaru...');
git('fetch', 'origin', 'staging');
git('switch', '-c', branch, 'origin/staging');
say(`Siap: branch ${branch} dari origin/staging, di checkout ini.`);
say('Selesai: git switch staging, lalu git merge --no-ff ' + branch + '; branch fitur tidak perlu dipush, supaya kuota deployment Vercel tidak habis (lihat skill karirkit-release).');
