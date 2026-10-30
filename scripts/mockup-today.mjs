// Pindah (atau buat) branch mockup untuk tanggal hari ini dan pindahkan entri changelog yang belum di-commit:
// `npm run mockup:today`.
//
// Aturan repo: satu branch mockup per tanggal (`mockup/<YYYY-MM-DD>`), hari baru = branch baru dari ujung
// branch tanggal lalu, dan entri `templates/CHANGELOG.md` bertanggal hari commit. Skrip ini hanya bekerja bila
// branch aktif adalah branch mockup; di branch lain (mis. `karirkit/<versi>`) ia tidak menyentuh apa pun.
// Ia tidak pernah memaksa: `git switch` ditolak Git bila perubahan lokal bentrok, dan skrip hanya menampilkan
// file yang bentrok lalu berhenti tanpa error.
//
// Changelog: entri yang belum di-commit (selisih terhadap HEAD) dan masih berada di section tanggal lama
// dipindahkan ke section tanggal hari ini (dibuat bila belum ada), di sub-bagian yang sama (Added/Changed/...).
// Entri yang sudah ter-commit tidak disentuh.
//
//   node scripts/mockup-today.mjs            pindah/buat branch hari ini, lalu pindahkan entri changelog
//   node scripts/mockup-today.mjs --dry-run  hanya tampilkan yang akan dilakukan
//   MOCKUP_TODAY=YYYY-MM-DD ...              mengganti tanggal hari ini (untuk uji)
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const dryRun = process.argv.includes('--dry-run');

function git(...args) {
  return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 1e8 }).trim();
}
function gitOk(...args) {
  try { git(...args); return true; } catch { return false; }
}
function say(msg) { console.log(`[mockup:today] ${msg}`); }

const now = new Date();
const pad = (n) => String(n).padStart(2, '0');
const today = process.env.MOCKUP_TODAY || `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
const target = `mockup/${today}`;
const CHANGELOG = 'templates/CHANGELOG.md';

// ---- changelog: pindahkan entri yang belum di-commit dari section tanggal lama ke section hari ini ----
function migrateChangelog() {
  if (!existsSync(CHANGELOG)) return;
  let diff;
  try { diff = git('diff', '-U0', 'HEAD', '--', CHANGELOG); } catch { return; }
  if (!diff) return;

  const raw = readFileSync(CHANGELOG, 'utf8');
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  const lines = raw.replace(/\r\n/g, '\n').split('\n');

  // indeks (0-based) baris yang ditambahkan terhadap HEAD
  const added = new Set();
  for (const m of diff.matchAll(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/gm)) {
    const start = Number(m[1]);
    const count = m[2] === undefined ? 1 : Number(m[2]);
    for (let i = 0; i < count; i++) added.add(start - 1 + i);
  }
  if (!added.size) return;

  const secs = [];
  lines.forEach((l, i) => { const m = /^## (\d{4}-\d{2}-\d{2})\s*$/.exec(l); if (m) secs.push({ date: m[1], start: i }); });
  secs.forEach((s, k) => { s.end = k + 1 < secs.length ? secs[k + 1].start : lines.length; });

  const moved = [];          // { sub, text }
  const remove = new Set();  // indeks baris yang dihapus dari section lama
  for (const s of secs) {
    if (s.date >= today) continue;
    const headerAdded = added.has(s.start);
    let sub = null;
    const subs = [];         // { name, headerIdx, items: [idx] }
    for (let i = s.start + 1; i < s.end; i++) {
      const sm = /^### (.+?)\s*$/.exec(lines[i]);
      if (sm) { sub = { name: sm[1], headerIdx: i, items: [] }; subs.push(sub); continue; }
      if (!added.has(i) || lines[i].trim() === '' || /^Dasar KarirKit:/.test(lines[i])) continue;
      moved.push({ sub: sub ? sub.name : 'Changed', text: lines[i] });
      remove.add(i);
      if (sub) sub.items.push(i);
    }
    if (headerAdded) {
      // seluruh section baru dan belum ter-commit: hapus utuh setelah isinya dipindah
      for (let i = s.start; i < s.end; i++) remove.add(i);
    } else {
      // sub-bagian yang header-nya baru dan kini kosong ikut dihapus
      for (const sb of subs) {
        if (added.has(sb.headerIdx) && sb.items.length) {
          let left = 0;
          for (let i = sb.headerIdx + 1; i < s.end && !/^### /.test(lines[i]); i++) if (lines[i].trim() && !remove.has(i)) left++;
          if (!left) { remove.add(sb.headerIdx); if (lines[sb.headerIdx + 1] === '') remove.add(sb.headerIdx + 1); }
        }
      }
    }
  }
  if (!moved.length) return;

  // susun ulang tanpa baris yang dihapus; jangan menyisakan baris kosong ganda di bekas penghapusan
  const out = [];
  let pending = false;
  lines.forEach((l, i) => {
    if (remove.has(i)) { pending = true; return; }
    if (pending && l.trim() === '' && out.length && out[out.length - 1].trim() === '') return;
    if (l.trim() !== '') pending = false;
    out.push(l);
  });

  // section hari ini: cari atau buat (di atas section terbaru)
  const dasar = (lines.find((l) => /^Dasar KarirKit:/.test(l)) || '').trim();
  let todayIdx = out.findIndex((l) => l === `## ${today}`);
  if (todayIdx < 0) {
    const first = out.findIndex((l) => /^## \d{4}-\d{2}-\d{2}/.test(l));
    const block = [`## ${today}`, ''].concat(dasar ? [dasar, ''] : []);
    out.splice(first < 0 ? out.length : first, 0, ...block);
    todayIdx = out.findIndex((l) => l === `## ${today}`);
  }
  const bySub = new Map();
  for (const it of moved) { if (!bySub.has(it.sub)) bySub.set(it.sub, []); bySub.get(it.sub).push(it.text); }
  for (const [name, items] of bySub) {
    const endOfToday = () => { const e = out.findIndex((l, i) => i > todayIdx && /^## /.test(l)); return e < 0 ? out.length : e; };
    let subIdx = -1;
    for (let i = todayIdx + 1; i < endOfToday(); i++) if (out[i] === `### ${name}`) { subIdx = i; break; }
    if (subIdx < 0) {
      let e = endOfToday();
      while (e > todayIdx + 1 && out[e - 1].trim() === '') e--;
      out.splice(e, 0, '', `### ${name}`, '', ...items);
    } else {
      let e = subIdx + 1;
      while (e < out.length && !/^## |^### /.test(out[e])) e++;
      let ins = e;
      while (ins > subIdx + 1 && out[ins - 1].trim() === '') ins--;
      out.splice(ins, 0, ...items);
      if (out[subIdx + 1] !== '') out.splice(subIdx + 1, 0, '');
    }
  }
  // satu baris kosong sebelum tiap header section/sub-bagian
  for (let i = 1; i < out.length; i++) if (/^##+ /.test(out[i]) && out[i - 1].trim() !== '') out.splice(i, 0, '');

  say(`changelog: ${moved.length} entri yang belum di-commit dipindah ke section ${today}${dryRun ? ' (dry-run, tidak ditulis)' : ''}.`);
  if (!dryRun) writeFileSync(CHANGELOG, out.join('\n').replace(/\n/g, eol));
}

if (!gitOk('rev-parse', '--is-inside-work-tree')) { say('bukan repo git, dilewati.'); process.exit(0); }

const current = git('branch', '--show-current');
const m = /^mockup\/(\d{4}-\d{2}-\d{2})(-\d+)?$/.exec(current);

if (!m) { say(`branch aktif "${current || '(detached)'}" bukan branch mockup, tidak diganti.`); process.exit(0); }
if (m[1] > today) { say(`${current} bertanggal lebih baru dari hari ini (${today}), tidak diganti.`); process.exit(0); }
if (m[1] === today) {
  say(`sudah di ${current} (tanggal hari ini).`);
  migrateChangelog();
  process.exit(0);
}

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
if (dryRun) { migrateChangelog(); process.exit(0); }

try {
  if (hasLocal) git('switch', target);
  else if (hasRemote) git('switch', '--track', '-c', target, `origin/${target}`);
  else git('switch', '-c', target, base);
  say(`sekarang di ${target}.`);
  migrateChangelog();
} catch (e) {
  const msg = String(e.stderr || e.message);
  say(`tidak bisa pindah ke ${target}; branch tetap ${current}.`);
  console.log(msg.split('\n').filter(Boolean).map((l) => `  ${l}`).join('\n'));
  say('Commit atau stash perubahan di atas, lalu jalankan `npm run mockup:today` lagi.');
}
