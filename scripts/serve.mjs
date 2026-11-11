// Sajikan checkout/worktree ini lewat HTTP: `npm run serve`.
//
// Halaman template memakai <base href="/templates/..."> absolut, jadi harus lewat HTTP dari akar repo (bukan file://).
// Skrip ini menyajikan folder tempat `npm run` dijalankan, jadi di tiap worktree otomatis yang disajikan adalah
// worktree itu. Tanpa dependensi tambahan. Port mulai 5600 (bukan 5500 milik Live Server) dan naik sendiri bila terpakai,
// sehingga beberapa worktree bisa jalan bersamaan.
//
//   npm run serve                 port 5600+, build dulu bila dist/output.css belum ada
//   npm run serve -- --open       buka browser ke halaman beranda
//   npm run serve -- --port 5600  port awal lain
//   npm run serve -- --no-build   jangan membangun CSS
//   npm run serve -- --open templates/portal-karir/index.html   buka halaman tertentu
import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { spawn, spawnSync } from 'node:child_process';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { execFileSync } from 'node:child_process';
import { connect } from 'node:net';

const root = resolve(process.cwd());
const args = process.argv.slice(2);
const say = (m) => console.log(`[serve] ${m}`);
const flagValue = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };

const startPort = Number(flagValue('--port')) || 5600;
const noBuild = args.includes('--no-build');
const openIdx = args.indexOf('--open');
const openPath = openIdx >= 0 ? (args[openIdx + 1] && !args[openIdx + 1].startsWith('--') ? args[openIdx + 1] : '') : null;

if (!existsSync(join(root, 'index.html')) || !existsSync(join(root, 'package.json'))) {
  say(`Bukan akar repo KarirKit: ${root}. Jalankan lewat npm run di akar checkout/worktree.`);
  process.exit(1);
}

if (!noBuild && !existsSync(join(root, 'dist', 'output.css'))) {
  say('dist/output.css belum ada (tidak di-commit), menjalankan npm run build...');
  const r = spawnSync('npm', ['run', 'build'], { stdio: 'inherit', shell: true, cwd: root });
  if (r.status !== 0) { say('Build gagal. Berhenti.'); process.exit(r.status || 1); }
}

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp',
  '.avif': 'image/avif', '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
  '.otf': 'font/otf', '.txt': 'text/plain; charset=utf-8', '.md': 'text/plain; charset=utf-8', '.xml': 'application/xml',
  '.pdf': 'application/pdf', '.mp4': 'video/mp4', '.webm': 'video/webm', '.map': 'application/json',
};

const server = createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname); }
  catch { res.writeHead(400).end('Bad request'); return; }

  let file = normalize(join(root, pathname));
  if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403).end('Forbidden'); return; }
  if (/(^|[\\/])\.git([\\/]|$)/.test(file) || /(^|[\\/])node_modules[\\/]\.cache/.test(file)) { res.writeHead(404).end('Not found'); return; }

  try {
    let st = statSync(file);
    if (st.isDirectory()) {
      if (!pathname.endsWith('/')) { res.writeHead(301, { Location: pathname + '/' }).end(); return; }
      file = join(file, 'index.html');
      st = statSync(file);
    }
    res.writeHead(200, {
      'Content-Type': MIME[extname(file).toLowerCase()] || 'application/octet-stream',
      'Content-Length': st.size,
      'Cache-Control': 'no-store',
    });
    if (req.method === 'HEAD') { res.end(); return; }
    createReadStream(file).pipe(res);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found: ' + pathname);
  }
});

// Windows mengizinkan dua proses memakai port sama bila alamat bind-nya berbeda (mis. Live Server di 0.0.0.0),
// jadi EADDRINUSE saja tidak cukup: cek dulu apakah sudah ada yang menjawab di port itu.
const taken = (port) => new Promise((ok) => {
  const s = connect({ port, host: '127.0.0.1' });
  s.once('connect', () => { s.destroy(); ok(true); });
  s.once('error', () => ok(false));
});

async function listen(port, attempts = 50) {
  while (attempts-- > 0 && await taken(port)) port++;
  server.once('error', (e) => {
    if (e.code === 'EADDRINUSE' && attempts > 0) { listen(port + 1, attempts); return; }
    say('Gagal menjalankan server: ' + e.message); process.exit(1);
  });
  server.listen(port, '127.0.0.1', () => {
    let branch = '';
    try { branch = execFileSync('git', ['branch', '--show-current'], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch {}
    const base = `http://localhost:${port}`;
    say(`Menyajikan ${root}${branch ? ` (branch ${branch})` : ''}`);
    const links = [['KarirKit - Design System', '/'], ['Portal Karir', '/templates/portal-karir/'], ['Tracer Study', '/templates/karirlink/']];
    const w = Math.max(...links.map(([l]) => l.length));
    for (const [label, path] of links) say(`${label.padEnd(w)}  ${base}${path}`);
    say('Hentikan dengan Ctrl+C.');
    if (openPath !== null) {
      const url = `${base}/${openPath.replace(/^\/+/, '')}`;
      const cmd = process.platform === 'win32' ? ['cmd', ['/c', 'start', '""', url]] : process.platform === 'darwin' ? ['open', [url]] : ['xdg-open', [url]];
      spawn(cmd[0], cmd[1], { stdio: 'ignore', detached: true }).unref();
    }
  });
}
listen(startPort);
