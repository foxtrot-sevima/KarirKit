# Storybook — KarirKit Design System

Storybook dipakai sebagai galeri komponen interaktif untuk KarirKit, supaya
dev bisa menjelajah semua token & komponen (warna, tipografi, ikon, button,
badge, card, form, dropdown, navigasi, tabel, alert, progress) satu per
satu, lengkap dengan markup HTML yang bisa langsung disalin.

Ini murni tooling development — tidak mengubah `index.html`,
`templates/`, atau `src/input.css` yang sudah ada. Style guide statis di
`index.html` tetap bisa dipakai seperti biasa.

## Prasyarat

- Node.js v18+ (disarankan, sama seperti kebutuhan `npm run build`/`watch`)

## Setup

Clone/pull repo ini, lalu dari root project:

```bash
npm install
```

Perintah ini otomatis meng-install Storybook beserta dependency-nya
(`storybook`, `@storybook/html-vite`, `@storybook/addon-docs`, `vite`,
`@tailwindcss/vite`) yang sudah terdaftar di `package.json`.

## Menjalankan Storybook

```bash
npm run storybook
```

- Storybook akan jalan di **http://localhost:6006**
- Browser biasanya terbuka otomatis; kalau tidak, buka URL di atas manual
- Semua class Tailwind & token dari `src/input.css` (warna, `.btn-*`,
  `.badge-*`, `.card`, `.input`, ikon `.kk-*`, dst.) otomatis tersedia di
  setiap story — tidak perlu config tambahan saat menambah class baru

Hentikan server dengan `Ctrl+C` di terminal.

## Build versi statis (opsional)

Untuk menghasilkan build statis Storybook (mis. untuk di-hosting atau
dibagikan sebagai referensi offline):

```bash
npm run build-storybook
```

Hasil build ada di folder `storybook-static/` (sudah masuk `.gitignore`,
tidak perlu di-commit). Buka `storybook-static/index.html` di browser, atau
serve foldernya dengan static server apa saja.

## Struktur story

```
.storybook/main.js              Konfigurasi Storybook (framework, Tailwind v4 via Vite plugin)
.storybook/preview.js            Import src/input.css + pengaturan global (urutan sidebar, dll.)
stories/Guides/Introduction.mdx  Halaman pembuka
stories/Guides/TableOfDependency.mdx  Tabel dependency (dari package.json)
stories/Guides/TableOfVersion.mdx     Tabel riwayat rilis (versi, tanggal, link)
stories/Guides/Changelog.mdx     Versi (dari package.json) + isi CHANGELOG.md apa adanya
stories/Foundations/             Colors, Typography, Icons
stories/Components/              Buttons, Badges, Avatars, Cards, Forms, Dropdowns,
                                 Navigation, Tables, Alerts, Progress & Misc
```

Grup **Guides** di sidebar berisi info seputar proyek (bukan komponen UI):
cara mulai, dependency yang dipakai, riwayat versi, dan changelog lengkap —
mengikuti pola yang sama seperti Storybook internal SEVIMA lain (mis.
Quantum).

## Halaman Guides

- **Introduction** — ringkasan proyek & cara membaca story lain.
- **Table of Dependency** (`TableOfDependency.mdx`) — daftar package inti
  (`tailwindcss`, `storybook`, `vite`, dst.) beserta versi terpasang, dibaca
  langsung dari `devDependencies` di `package.json`. Tidak perlu di-update
  manual — kalau versi package berubah lewat `npm install`, tabelnya ikut
  berubah.
- **Table of Version** (`TableOfVersion.mdx`) — riwayat rilis KarirKit
  (versi, tanggal, catatan ringkas) dengan link ke halaman **Changelog** di
  Storybook ini dan ke bagian yang sama persis di `CHANGELOG.md` pada
  GitHub. Baris ini ditulis manual — setiap kali menambah versi baru di
  `CHANGELOG.md`, tambahkan juga satu baris di sini.
- **Changelog** (`Changelog.mdx`) — menampilkan nomor versi (`pkg.version`
  dari `package.json`) dan isi `CHANGELOG.md` secara langsung (di-import
  lewat `?raw` lalu di-render sebagai markdown pakai komponen `Markdown`
  dari `@storybook/addon-docs/blocks`) — bukan salinan manual, jadi tidak
  akan basi. Update `CHANGELOG.md` seperti biasa dan halaman ini otomatis
  ikut berubah saat Storybook di-restart/rebuild.

Menambah komponen baru: duplikat salah satu file di `stories/Components/`,
ganti `title` dan markup di dalam `render()` memakai class yang sudah ada di
`src/input.css`.

## Catatan: widget interaktif (combobox, date picker, DataTable)

Story untuk combobox, date picker, dan DataTable hanya menampilkan
**tampilan statis/tertutup** — logika interaksinya ditulis sebagai vanilla
JS inline di dalam `index.html`, bukan modul terpisah yang bisa diimpor ke
Storybook. Untuk mencoba versi yang sepenuhnya interaktif, buka `index.html`
langsung di browser (bagian `#forms`, `#dropdowns`, `#datatable`).
