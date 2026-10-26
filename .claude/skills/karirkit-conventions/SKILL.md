---
name: karirkit-conventions
description: Konvensi inti KarirKit (design system KarirLink) - dua lingkup (design system vs mockup template) dan pemisahan commit, penamaan branch, penamaan komponen di index.html vs Storybook, nama halaman KarirIcon, larangan menyebut UI kit pihak ketiga, DataTable/Katalog yang sudah dihapus, dan aturan "responsive = adaptive UX". Pakai sebelum menambah/mengubah komponen, halaman template, copy, atau membuat branch.
---

# Konvensi inti KarirKit

## 0. Dua lingkup: Design System vs Template
Perbaikan dan peningkatan dibagi dua lingkup, masing-masing dengan commit dan catatan perubahan sendiri.

| | **Design System KarirKit** | **Template mockup (KarirLink / Portal Karir)** |
|---|---|---|
| Isi | `src/`, `dist/`, `assets/js/*`, ikon/logo, `stories/` (kecuali `stories/Templates/`), `index.html`, `icons.html`, `.storybook/`, `package*.json`, `README.md`, `CHANGELOG.md`, serta template contoh DS di akar `templates/` (dashboard, login, register, halaman error) | `templates/karirlink/**`, `templates/portal-karir/**`, `templates/custom/**`, `stories/Templates/**`, `scripts/gen-custom-portal.mjs`, `templates/CHANGELOG.md` |
| Versi | semver `X.Y.Z`, Table of Version, tag, publish | **hanya tanggal** (`## YYYY-MM-DD` di `templates/CHANGELOG.md`); tanpa naik versi, tanpa tag |
| Branch | `karirkit/<versi>` (topik lain: `karirkit/<topik>`) | `mockup/<YYYY-MM-DD>` |
| Commit | `feat(ds): ...`, `fix(ds): ...`, `docs(ds): ...` | `feat(karirlink): ...`, `feat(portal-karir): ...`, `fix(...)` dengan nama area yang sama |
| Catatan perubahan | `CHANGELOG.md` (dibaca halaman Storybook Changelog) | `templates/CHANGELOG.md` (halaman Storybook "Changelog Template") |

- **Satu commit satu lingkup.** Pekerjaan yang menyentuh keduanya dipecah: commit design system dulu, lalu commit template yang memakainya. Stage per path, jangan `git add -A`.
- **Template selalu memakai komponen KarirKit terbaru** (`dist/output.css` dan `assets/js/*` yang dibangun dari repo yang sama). Template tidak boleh punya komponen atau gaya komponen baru sendiri: tidak ada blok `<style>` untuk komponen, kelas komponen buatan sendiri, atau logika komponen di `portal.js`/`admin-*.js`. Logika khusus halaman (data lewat `PK.api`, alur halaman) tetap boleh di template.
- **Template butuh komponen atau varian baru?** Diminta dan dibuat di KarirKit lebih dulu: kelas di `src/input.css`, story, JS di `assets/js`, entri `CHANGELOG.md`, build. Baru setelah itu template memakainya (commit template menyusul). Mockup baru boleh masuk produksi setelah komponennya rilis; sebelum itu hanya untuk staging (lihat `karirkit-release`). Yang disesuaikan adalah komponennya, bukan logika di template.
- Versi design system juga menjadi versi library Figma (versi Figma = tag repo); aturan penomoran dan sinkron token ada di skill `karirkit-figma-sync`. Token baru di `@theme` wajib masuk Figma di rilis yang sama.
- Tiap tanggal di `templates/CHANGELOG.md` menulis "Dasar KarirKit: vX.Y.Z" supaya terlihat komponen versi mana yang dipakai.

## 1. Nama branch
Dua keluarga branch, dipisah menurut lingkup (bagian 0). Keduanya bermuara ke cabang utama yang sama (`staging`/`master`/`release`), tetapi hanya `karirkit/<versi>` yang menjadi komponen/npm.
- **Design System:** `karirkit/<versi>` untuk rilis (contoh `karirkit/1.3.7`); topik lain `karirkit/<topik>` (contoh `karirkit/storybook`). Hanya berisi commit `(ds)`.
- **Mockup template:** `mockup/<YYYY-MM-DD>` (contoh `mockup/2026-10-26`), satu branch per tanggal; bila perlu batch kedua di hari yang sama, akhiran `-2`. Hanya berisi commit template (`feat(karirlink)`, `feat(portal-karir)`, `fix(...)`).
- Branch yang sudah ada (`karirkit/vercel`, `karirkit/staging-vercel`, `staging`, `master`, `release`) adalah cabang utama/deploy, bukan keluarga di atas.
- Jangan pakai `fix/`, `chore/`, `feat/`, jangan menambah akhiran seperti `-components`, dan jangan memasukkan nama UI kit pihak ketiga.
- Tentukan nama sebelum `git switch -c`. Salah nama: ganti nama lokal, push nama baru, buka PR baru, tutup PR lama dengan `--delete-branch`.
- Template butuh komponen baru: branch `karirkit/<versi>` yang memuat komponen itu digabung lebih dulu; branch `mockup/<tanggal>` baru menyusul (atau memuat commit DS-nya lebih dulu).

## 2. Jangan sebut UI kit / library pihak ketiga
KarirKit tampil sebagai design system sendiri. Jangan menulis nama design system / UI kit lain atau library rujukan di belakangnya (termasuk library editor teks) di mana pun yang terlihat pengguna atau tercatat di repo: `CHANGELOG.md`, `stories/Guides/TableOfVersion.mdx`, catatan rilis GitHub, README/Storybook, deskripsi story, copy `index.html`, teks contoh, dan komentar kode.
- Jelaskan fitur dengan bahasa sendiri ("layout contoh yang konsisten", "penamaan baku", "tanpa dependensi eksternal/CDN").
- Memakai referensi saat membangun itu boleh; yang dilarang adalah menuliskan namanya di file repo, teks commit/PR untuk rilis, atau catatan rilis.
- Sebelum rilis, grep repo (kecuali `node_modules`, `dist`, `.git`) untuk nama-nama kit rujukan tersebut. Minta daftar namanya ke maintainer; daftar itu sengaja tidak ditulis di sini.

## 3. Penamaan `index.html` = Storybook
Setiap pill navigasi dan `<h2>` di `index.html` yang cocok 1:1 dengan story `Components/*` harus memakai kata Inggris yang sama dengan `title` story itu (bukan terjemahan, bukan jamak/tunggal yang berbeda): Colors, Typography, Icons, Button, Card, Table, Navigation, Forms, Alert, "Progress & Misc".
- Sebelum menamai bagian baru, cek `storySort` di `.storybook/preview.js` dan `title` di `stories/Components/<nama>/*.stories.js`.
- Bagian gabungan tanpa padanan 1 story (Forms, Navigation, Misc) tetap pakai satu kata Inggris.
- Paragraf isi boleh tetap berbahasa Indonesia; aturan ini hanya untuk pill + `<h2>`.

## 4. KarirIcon
Katalog ikon `icons.html` bernama **KarirIcon** (judul, heading "Karir" biru + "Icon" jingga, tautan dari `index.html`, changelog/README/Storybook). Tab navbar paling atas cukup tertulis **"Icon"** di semua ukuran layar. Kelas `kk-*` dan title story `Foundations/Icons` tidak boleh diubah (itu API/URL).

## 5. Komponen yang sudah dihapus
**DataTable** dan bagian **Table - Katalog Produk** sudah dihapus dari `index.html`, Storybook, dan docs. Jangan dibuat ulang. Komponen **Table** (`stories/Components/table/Table.stories.js` + `assets/js/table.js`) mencakup semuanya; untuk demo tabel lebih kaya, perluas story Table. Entri historis di `CHANGELOG.md` / `TableOfVersion.mdx` yang menyebut DataTable dibiarkan.

## 6. Responsive = adaptive UX
Responsive bukan mengecilkan komponen desktop. Ganti pola interaksi per perangkat:
- dropdown/popover -> bottom sheet (Drawer bawah), menu navigasi -> Drawer samping, mega-menu -> daftar bertumpuk/grid, hover -> target sentuh >= 44px, data multi-kolom -> kartu/daftar, panel samping sticky -> bilah aksi bawah.
- Overlay tidak boleh terpotong keluar layar.
- Selalu cek hasilnya di 390px lewat screenshot, bukan hanya desktop.
