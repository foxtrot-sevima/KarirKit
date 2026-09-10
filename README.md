# KarirKit Design System

Design system dan dashboard contoh untuk **KarirKit** — produk karier
berbasis AI — dibangun dengan Tailwind CSS v4. Proyek internal SEVIMA
(Foxtrot).

Referensi visual ada di `moodboard/`: SaaS dashboard bertema AI dengan
sidebar tergrup, kartu statistik bertren, aksen gradasi violet, badge status,
dan panel rekomendasi AI.

## Fitur

- **Design tokens** — palet warna primer (violet) & semantik
  (success/warning/danger/info), tipografi, shadow, dan gradasi brand,
  didefinisikan sekali di `src/input.css` lewat `@theme` Tailwind v4.
- **Pustaka komponen** — button, badge, avatar, card, form, navigasi
  (sidebar + tab), tabel, callout/alert, progress bar, dan tooltip.
- **Style guide interaktif** (`index.html`) — dokumentasi visual setiap
  token dan komponen, bisa dibuka langsung tanpa server.
- **Dashboard contoh** (`dashboard.html`) — implementasi nyata: AI Career
  Coach, ringkasan lamaran kerja, grafik performa, tabel lamaran, dan
  aktivitas terbaru — semua memakai komponen dari design system yang sama.
- **Sepenuhnya offline** — CSS sudah di-build (`dist/output.css`) dan font
  di-hosting lokal, tidak bergantung pada CDN atau koneksi internet.

## Struktur

```
src/input.css              Design tokens (@theme) + komponen (@layer components)
dist/output.css            CSS hasil build — dimuat oleh index.html & dashboard.html
assets/fonts/InstrumentSans/  Font self-hosted (lihat bagian Font di bawah)
index.html                 Style guide: warna, tipografi, ikon, dan semua komponen
dashboard.html             Dashboard KarirKit yang memakai design system tersebut
moodboard/                 Referensi visual (tidak dipakai runtime)
```

Kedua file HTML adalah statis (tanpa build tool saat dibuka) dan bisa
langsung dibuka di browser — cukup double-click `index.html` atau
`dashboard.html`.

## Tech stack

- [Tailwind CSS v4](https://tailwindcss.com) — lewat `@tailwindcss/cli`,
  bukan CDN, supaya token custom (`@theme`) dan komponen (`@layer
  components`) bisa di-build jadi satu file CSS statis.
- HTML statis + sedikit vanilla JS (toggle sidebar mobile) — tanpa
  framework, tanpa dependency runtime.
- [Instrument Sans](https://github.com/Instrument/instrument-sans) sebagai
  font, di-hosting lokal.

## Font

Satu keluarga font untuk semua teks: **Instrument Sans** (400/500/600/700),
di-hosting lokal di `assets/fonts/InstrumentSans/` — diambil dari Quantum
design system SEVIMA (`D:\laragon\QUANTUM`) alih-alih Google Fonts, supaya
kedua halaman tetap konsisten dengan produk SEVIMA lain dan bisa dibuka tanpa
koneksi internet. `@font-face` didefinisikan di awal `src/input.css`; lisensi
OFL font ini ada di `assets/fonts/InstrumentSans/OFL.txt` (lihat juga
`THIRD-PARTY-LICENSES.md`).

## Mengembangkan

Butuh Node.js (disarankan v18+).

```bash
npm install       # sekali saja
npm run watch     # build ulang otomatis saat src/input.css berubah
npm run build     # build sekali, hasil di-minify
```

Ubah token warna/shadow/font di `src/input.css` bagian `@theme`, atau tambah
komponen baru di `@layer components`. Karena Tailwind v4 men-scan kelas yang
benar-benar dipakai di `index.html`/`dashboard.html`, kelas baru otomatis
ikut ter-build tanpa perlu ubah konfigurasi apa pun.

**Catatan Tailwind v4:** `@apply` hanya bisa memanggil utility asli (bawaan
atau `@utility` kustom) — bukan class komponen lain. Jadi varian seperti
`.btn-primary` menulis ulang base style-nya sendiri, bukan `@apply btn`.

## Creator

Dibuat oleh **Ahmad Dimas** ([ahmad.dimas@sevima.id](mailto:ahmad.dimas@sevima.id)) — SEVIMA, tim Foxtrot.

## Lisensi

Kode di repositori ini bersifat **proprietary/internal SEVIMA** — lihat
[`LICENSE`](./LICENSE). Aset pihak ketiga yang dibundel (font Instrument
Sans) tetap mengikuti lisensinya sendiri — lihat
[`THIRD-PARTY-LICENSES.md`](./THIRD-PARTY-LICENSES.md).

Riwayat perubahan ada di [`CHANGELOG.md`](./CHANGELOG.md).
