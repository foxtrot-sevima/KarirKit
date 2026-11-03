// Tarik hasil terbaru ke checkout ini tanpa mengurus stash: `npm run sync`.
//
// fetch, lalu `git merge --ff-only --autostash origin/<branch aktif>` (perubahan lokal disimpan dan dikembalikan
// otomatis), lalu `npm run build` agar dist/output.css ikut baru. Tidak pernah membuat merge commit atau
// menimpa perubahan lokal. Bila branch lokal punya commit sendiri (tidak bisa ff), skrip berhenti dan menjelaskan.
//
//   npm run sync            branch aktif
//   npm run sync -- --no-build
import { execFileSync, spawnSync } from 'node:child_process';

const noBuild = process.argv.includes('--no-build');
const say = (m) => console.log(`[sync] ${m}`);
const git = (...a) => execFileSync('git', a, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();

const branch = git('branch', '--show-current');
if (!branch) { say('HEAD tidak berada di branch (detached). Berhenti.'); process.exit(1); }
say(`Mengambil origin/${branch}...`);
try { git('fetch', 'origin', branch); } catch (e) { say(`origin/${branch} tidak ada di remote. Berhenti.`); process.exit(1); }

const behind = Number(git('rev-list', '--count', `${branch}..origin/${branch}`));
const ahead = Number(git('rev-list', '--count', `origin/${branch}..${branch}`));
if (ahead > 0 && behind > 0) { say(`Branch lokal punya ${ahead} commit sendiri dan tertinggal ${behind}. Tidak bisa fast-forward; selesaikan dengan rebase atau minta bantuan.`); process.exit(1); }
if (behind === 0) { say('Sudah terbaru.'); }
else {
  try { git('merge', '--ff-only', '--autostash', `origin/${branch}`); say(`Maju ${behind} commit.`); }
  catch (e) { say('Gagal: ' + String(e.stderr || e.message).trim().split('\n').slice(-4).join(' | ')); say('Perubahan lokal aman di stash (git stash list) bila bentrok.'); process.exit(1); }
  // Autostash yang bentrok dengan pembaruan meninggalkan penanda konflik (UU/AA/...) dan menyimpan salinannya di stash.
  const conflicts = git('status', '--porcelain').split('\n').filter((l) => /^(UU|AA|DU|UD|AU|UA)\s/.test(l)).map((l) => l.slice(3));
  if (conflicts.length) {
    say('Pembaruan sudah masuk, tetapi perubahan lokalmu bentrok di: ' + conflicts.join(', '));
    say('Buka file itu, selesaikan penanda <<<<<<< / >>>>>>>, lalu `git add` file-nya dan `git stash drop`. Salinan perubahanmu tetap ada di `git stash list`.');
    process.exit(1);
  }
}
if (!noBuild) {
  say('npm run build...');
  const r = spawnSync('npm', ['run', 'build'], { stdio: 'inherit', shell: true });
  if (r.status !== 0) process.exit(r.status || 1);
}
say('Selesai. Muat ulang browser dengan Ctrl+F5.');
