// Pindah (atau buat) branch mockup untuk tanggal hari ini: `npm run mockup:today`.
//
// Aturan repo: satu branch mockup per tanggal (`mockup/<YYYY-MM-DD>`), dan hari baru = branch baru dari ujung
// branch tanggal lalu. Skrip ini hanya bekerja bila branch aktif adalah branch mockup; di branch lain
// (mis. `karirkit/<versi>`) ia tidak menyentuh apa pun. Ia tidak pernah memaksa: `git switch` ditolak Git
// bila perubahan lokal bentrok, dan skrip hanya menampilkan file yang bentrok lalu berhenti tanpa error.
//
//   node scripts/mockup-today.mjs            pindah/buat branch hari ini
//   node scripts/mockup-today.mjs --dry-run  hanya tampilkan yang akan dilakukan
import { execFileSync } from 'node:child_process';

const dryRun = process.argv.includes('--dry-run');

function git(...args) {
  return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}
function gitOk(...args) {
  try { git(...args); return true; } catch { return false; }
}
function say(msg) { console.log(`[mockup:today] ${msg}`); }

const now = new Date();
const pad = (n) => String(n).padStart(2, '0');
const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
const target = `mockup/${today}`;

if (!gitOk('rev-parse', '--is-inside-work-tree')) { say('bukan repo git, dilewati.'); process.exit(0); }

const current = git('branch', '--show-current');
const m = /^mockup\/(\d{4}-\d{2}-\d{2})(-\d+)?$/.exec(current);

if (!m) { say(`branch aktif "${current || '(detached)'}" bukan branch mockup, tidak diganti.`); process.exit(0); }
if (m[1] === today) { say(`sudah di ${current} (tanggal hari ini).`); process.exit(0); }
if (m[1] > today) { say(`${current} bertanggal lebih baru dari hari ini (${today}), tidak diganti.`); process.exit(0); }

gitOk('fetch', 'origin', '--quiet');

const hasLocal = gitOk('show-ref', '--verify', '--quiet', `refs/heads/${target}`);
const hasRemote = gitOk('show-ref', '--verify', '--quiet', `refs/remotes/origin/${target}`);

// Branch baru dibuat dari ujung branch aktif; bila versi origin-nya lebih maju, pakai itu supaya semua commit ikut.
let base = current;
if (gitOk('show-ref', '--verify', '--quiet', `refs/remotes/origin/${current}`) && gitOk('merge-base', '--is-ancestor', current, `origin/${current}`)) {
  base = `origin/${current}`;
}

const plan = hasLocal || hasRemote ? `pindah ke ${target}` : `buat ${target} dari ${base}`;
say(`${current} -> ${plan}${dryRun ? ' (dry-run)' : ''}`);
if (dryRun) process.exit(0);

try {
  if (hasLocal) git('switch', target);
  else if (hasRemote) git('switch', '--track', '-c', target, `origin/${target}`);
  else git('switch', '-c', target, base);
  say(`sekarang di ${target}.`);
} catch (e) {
  const msg = String(e.stderr || e.message);
  say(`tidak bisa pindah ke ${target}; branch tetap ${current}.`);
  console.log(msg.split('\n').filter(Boolean).map((l) => `  ${l}`).join('\n'));
  say('Commit atau stash perubahan di atas, lalu jalankan `npm run mockup:today` lagi.');
}
