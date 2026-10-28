# AGENTS — KarirKit

Satu-satunya sumber aturan untuk **semua** AI agent (Cursor, Claude Code, Codex, Copilot, Gemini, Windsurf, dan lainnya) dan engineer yang bekerja di repo ini. **Baca file ini di setiap sesi, sebelum mengubah apa pun.** Detail per topik ada di `.claude/skills/<nama>/SKILL.md`; baca skill yang relevan sebelum mengerjakan topiknya (agent selain Claude Code membacanya sebagai dokumen biasa).

## Cara memakai aturan ini

- `CLAUDE.md` dan `GEMINI.md` hanya meng-import `@AGENTS.md`. **Jangan** membuat file aturan agent lain (`.cursor/rules/`, `.github/copilot-instructions.md`, `.windsurfrules`, dan sejenisnya): aturan baru masuk ke `AGENTS.md` atau ke skill.
- Jika `AGENTS.md` tidak terbaca, berhenti dan laporkan ke user; jangan mengubah kode.
- Sebelum mengubah file, jalankan `git status`. File yang berubah dan bukan kamu yang mengubahnya adalah pekerjaan orang/sesi lain: jangan commit, jangan revert, jangan pindah branch di atasnya.
- Aturan ini mencatat **keputusan tim**, bukan isi kode. Mengubah aturan = ubah file ini atau skill-nya di commit yang sama dengan perubahan kebiasaannya.

## Skill (baca sesuai topik)

| Topik | Skill |
|---|---|
| Lingkup design system vs template, nama branch, nama komponen = Storybook, KarirIcon, larangan nama pihak ketiga, responsive | `karirkit-conventions` |
| Rilis, staging, deploy, push GitHub + GitLab, perintah rilis eksplisit | `karirkit-release` |
| Sinkron dengan Figma (SemVer Figma, token = `@theme`, changelog Figma) | `karirkit-figma-sync` |
| Komponen Modal | `karirkit-modal` |
| Halaman admin KarirLink (`templates/karirlink`) | `karirlink-admin-pages` |
| Halaman Portal Karir (`templates/portal-karir`) | `portal-karir-ui` |
| Kuesioner Tracer Study Format 2025 | `tracer-study-format-2025` |
| Memeriksa tampilan di browser sebelum menyatakan selesai | `karirkit-verify-in-browser` |

## Produk

- **KarirKit** = design system SEVIMA (`@foxtrot-sevima/karirkit`, Tailwind v4): kelas komponen di `src/input.css`, JS di `assets/js`, dokumentasi `index.html` + Storybook (`stories/`), ikon KarirIcon (`icons.html`).
- **Mockup template** KarirLink dan Portal Karir (`templates/karirlink`, `templates/portal-karir`, `templates/custom`): visual untuk kebutuhan produk, memakai komponen KarirKit.
- Produk KarirLink (aplikasi sungguhan) memakai paket KarirKit untuk semua FE; repo ini bukan aplikasinya. Jangan menaruh logika aplikasi atau panggilan API sungguhan di mockup (data contoh lewat `PK.api`).
- Repo: GitHub `foxtrot-sevima/KarirKit` dan mirror GitLab (`origin` punya dua pushurl).

## Keputusan terkunci (jangan buka ulang tanpa perintah user)

1. **Dua lingkup, dipisah commit-nya.** Design System: `src/`, `dist/`, `assets/js`, `stories/` (kecuali `stories/Templates`), `index.html`, `icons.html`, `package*.json`, `README.md`, `CHANGELOG.md`, dan template contoh DS di akar `templates/` (dashboard, login, register, error). Template mockup: `templates/karirlink`, `templates/portal-karir`, `templates/custom`, `stories/Templates`, `scripts/gen-custom-portal.mjs`, `templates/CHANGELOG.md`.
2. **Versi.** Design System = semver `X.Y.Z` (`CHANGELOG.md`, Table of Version, tag, publish). Template = **hanya tanggal** (`templates/CHANGELOG.md`, `## YYYY-MM-DD` + "Dasar KarirKit: vX.Y.Z"). Satu-satunya yang menjadi komponen/npm adalah KarirKit.
3. **Commit.** Satu commit satu lingkup: `feat(ds)` / `fix(ds)` / `docs(ds)` untuk design system; `feat(karirlink)` / `feat(portal-karir)` / `fix(...)` untuk template. Pekerjaan yang menyentuh keduanya dipecah: design system dulu, lalu template yang memakainya. Stage per path; **jangan `git add -A`**.
4. **Branch.** Design System: `karirkit/<versi>` (topik lain `karirkit/<topik>`). Mockup: `mockup/<YYYY-MM-DD>`. Tanpa `fix/`, `chore/`, `feat/`. Mockup: satu branch per tanggal; hari baru = branch baru dari ujung branch lama, tanggal dicek dengan `date` (jangan menyalin dari nama branch). Keduanya bermuara ke cabang utama yang sama (`staging`/`master` > `release` > deploy Vercel); hanya `karirkit/<versi>` yang menjadi paket npm.
5. **Template memakai komponen KarirKit terbaru dan tidak membuat komponen sendiri** (tidak ada blok `<style>` komponen, kelas komponen buatan, atau logika komponen di `portal.js`/`admin-*.js`). Butuh komponen atau varian baru: dibuat dulu di KarirKit (kelas, story, JS, `CHANGELOG.md`, build), baru dipakai di template. Yang disesuaikan komponennya, bukan logika di template. **Gerbang produksi:** mockup masuk `master`/`release` hanya bila komponen KarirKit yang dipakainya sudah dirilis (`Dasar KarirKit` di `templates/CHANGELOG.md` harus versi yang sudah bertag). Selama komponennya belum rilis, mockup boleh menumpuk di atas branch `karirkit/<versi>` hanya untuk staging (`dev-karirkit`) dan tertahan di sana. Cek dengan `npm run check:templates`.
6. **Rilis hanya atas perintah eksplisit user** (merge ke `master`, `master` > `release`, tag, GitHub release, deploy produksi). Persetujuan sebelumnya tidak berlaku untuk rilis berikutnya. "Siapkan versi X" = ubah file, commit, push branch; berhenti di situ dan katakan belum ada yang dirilis. `master` hanya berisi kode yang sudah dirilis; pekerjaan belum rilis lewat `staging`.
7. **Satu halaman = satu file.** Halaman yang tujuan dan tampilannya berbeda (daftar, detail, pengerjaan, hasil) adalah file HTML sendiri. Dilarang satu file multi-view yang berpindah lewat JS. Konten statis ditulis sebagai HTML; JS hanya mengisi data dari `PK.api`. Kode yang dipakai dua halaman pindah ke `portal.js`.
8. **Jangan menyebut design system/UI kit/library pihak ketiga** di mana pun yang tercatat di repo (changelog, docs, copy, story, komentar, commit rilis). Jelaskan fitur dengan bahasa sendiri.
9. **Penamaan `index.html` = Storybook** untuk pill dan `<h2>` komponen (Colors, Typography, Icons, Button, Card, Table, Navigation, Forms, ...). Ikon bernama **KarirIcon** (tab navbar cukup "Icon"; kelas `kk-*` dan title story tidak diubah).
10. **Komponen yang sudah dihapus tidak dibuat ulang:** DataTable dan Table - Katalog Produk (komponen Table mencakup semuanya).
11. **Responsive = adaptive UX**, bukan sekadar mengecilkan: dropdown menjadi bottom sheet, menu menjadi Drawer, data multi-kolom menjadi kartu, target sentuh >= 44px. Periksa hasilnya di 390px.
12. **`dist/` tidak di-commit** (di `.gitignore`). `dist/output.css` dibangun lewat `npm run build`: di lokal setelah clone, di `publish.yml` saat publish, dan di Vercel (Build Command project `karirkit` dan `dev-karirkit`). Aplikasi FE memakai `@foxtrot-sevima/karirkit/theme` (`src/input.css`) dan membangun CSS-nya sendiri, bukan `dist`. Jangan memasang `prepare` di `package.json`: itu membuat instalasi dari git ikut membangun CSS dan berisiko merusak build FE.

## Cara menambah komponen KarirKit

1. Kelas di `src/input.css`, JS (bila perlu) di `assets/js`, story di `stories/Components/<nama>/` (Modal: ikuti `karirkit-modal`), bagian di `index.html` dengan nama yang sama dengan Storybook.
2. `npm run build` (menghasilkan `dist/output.css`, tidak di-commit); bila menambah aset berwarna atau ikon: `npm run assets:classes` / `npm run icons:names`.
3. Catat di `CHANGELOG.md` bagian `[Unreleased]` (Added/Changed/Fixed). Komponen yang juga ada di Figma: ikuti `karirkit-figma-sync` (token baru di `@theme` wajib masuk Figma di rilis yang sama).
4. Verifikasi di browser desktop dan 390px (`karirkit-verify-in-browser`) sebelum menyatakan selesai.
5. Rilis (hanya atas perintah): naikkan versi (`package.json`, `package-lock.json`), section `CHANGELOG.md`, perintah install di `README.md` dan `stories/Guides/Installation.mdx`, baris baru di `stories/Guides/TableOfVersion.mdx`, lalu alur di `karirkit-release`.

## Cara menambah atau mengubah halaman template

1. Pakai pola halaman yang sudah ada (`karirlink-admin-pages` atau `portal-karir-ui`) dan komponen KarirKit; data contoh lewat `PK.api` (portal) atau data lokal halaman (admin).
2. Halaman portal baru ditambahkan ke `scripts/gen-custom-portal.mjs` (versi white-label) dan ke story di `stories/Templates/`.
3. Setelah menambah kelas Tailwind baru: `npm run build`. Muat halaman lewat HTTP (bukan `file://`) saat memeriksa.
4. Catat di `templates/CHANGELOG.md` pada tanggal hari itu (bukan `CHANGELOG.md`), dengan "Dasar KarirKit: vX.Y.Z".

## Git & push

- Merge antar-branch memakai merge commit (jejak "Merge branch ..."); tidak squash. Jangan merge cabang utama ke branch fitur; menyusul base lewat rebase.
- `git push origin <branch>` mengirim ke GitHub **dan** GitLab. Tag dipush eksplisit. Bila "Out of memory, malloc failed": `git -c http.postBuffer=1048576 push ...`. Setelah push penting, bandingkan `LC_ALL=C git ls-remote --heads <url>` di kedua sisi.
- GitLab `main` berisi satu commit README yang tidak terkait: jangan disentuh. **Jangan force-push atau menghapus ref** tanpa izin.
- Merge dari branch kerja ke cabang utama dikerjakan di worktree sementara agar working tree yang berisi pekerjaan lain tidak terganggu. Tanpa `gh`, merge dilakukan lokal lalu dipush.
- Commit bermakna, dalam bahasa Inggris dengan prefiks lingkup (lihat keputusan 3). **Tanpa atribusi AI** di commit dan PR: jangan menambah `Co-Authored-By:` untuk AI, trailer sesi agent, atau "Generated with ...". Jangan bypass hook dengan `--no-verify`.

## Deploy (Vercel, tim foxtrot-sevima)

- Release: sumber > `master` > `release` > `karirkit/vercel` (`karirkit.vercel.app` + storybook rilis). Staging: sumber > `staging` > `karirkit/staging-vercel` (`dev-karirkit.vercel.app` + storybook staging).
- Push ke `release` memicu `publish.yml` (GitHub Packages) yang menolak versi yang sudah terbit (E409). Rilis mockup tanpa versi baru tidak boleh memicu publish: workflow perlu guard sebelum jalur mockup ke `release` dipakai.
- Build Command `npm run build` harus terisi di project Vercel `karirkit` dan `dev-karirkit` sebelum branch deploy menerima commit tanpa `dist/` (tanpa itu halaman mockup kehilangan CSS). Jangan memakai `vercel.json` untuk ini: berlaku ke semua project dan menimpa build Storybook.
- Jangan commit secret atau file contoh milik proyek lain.

## Pengecualian

Spike boleh menyimpang hanya dengan persetujuan user. Catat di commit atau PR. Jangan diam-diam.

## Bahasa

Teks antarmuka dan dokumentasi berbahasa Indonesia; nama kelas, kode, dan pesan commit berbahasa Inggris. Istilah: KarirKit (design system), KarirLink (produk), Portal Karir (portal pelamar), Tracer Study, Pengembangan Diri.
