# KarirKit Design System

**KarirKit** adalah UI kit/design system internal SEVIMA untuk **KarirLink**
— platform karier berbasis AI. Dibangun dengan Tailwind CSS v4. Proyek
internal SEVIMA (Foxtrot).

Referensi visual ada di `moodboard/`: SaaS dashboard bertema AI dengan
sidebar tergrup, kartu statistik bertren, badge status, dan panel
rekomendasi AI. Warna dan logo mengikuti identitas resmi KarirLink — lihat
bagian [Brand & Logo](#brand--logo).

## Fitur

- **Design tokens** — palet warna primary & secondary (diturunkan dari logo
  KarirLink) & semantik (success/warning/danger/info), tipografi, shadow,
  dan gradasi brand, didefinisikan sekali di `src/input.css` lewat `@theme`
  Tailwind v4.
- **Pustaka komponen** — button, badge, avatar, card, form, navigasi
  (sidebar + tab), tabel, callout/alert, progress bar, dan tooltip.
- **Style guide interaktif** (`index.html`) — dokumentasi visual setiap
  token dan komponen, bisa dibuka langsung tanpa server.
- **Dashboard contoh** (`templates/dashboard.html`) — implementasi nyata: AI Career
  Coach, ringkasan lamaran kerja, grafik performa, tabel lamaran, dan
  aktivitas terbaru — semua memakai komponen dari design system yang sama.
- **Sepenuhnya offline** — CSS sudah di-build (`dist/output.css`) dan font
  di-hosting lokal, tidak bergantung pada CDN atau koneksi internet.

## Struktur

```
src/input.css              Design tokens (@theme) + komponen (@layer components)
dist/output.css            CSS hasil build — dimuat oleh index.html & templates/dashboard.html
assets/fonts/InstrumentSans/  Font self-hosted (lihat bagian Font di bawah)
assets/logo/                  Logo KarirLink dipakai di kedua halaman (lihat Brand & Logo)
index.html                 Style guide: warna, tipografi, ikon, dan semua komponen
templates/dashboard.html   Dashboard KarirKit yang memakai design system tersebut
moodboard/                 Referensi visual (tidak dipakai runtime)
logo/                      Aset logo asli dari tim brand (sumber, tidak dipakai runtime)
```

Kedua file HTML adalah statis (tanpa build tool saat dibuka) dan bisa
langsung dibuka di browser — cukup double-click `index.html` atau
`templates/dashboard.html`.

## Tech stack

- [Tailwind CSS v4](https://tailwindcss.com) — lewat `@tailwindcss/cli`,
  bukan CDN, supaya token custom (`@theme`) dan komponen (`@layer
  components`) bisa di-build jadi satu file CSS statis.
- HTML statis + sedikit vanilla JS (toggle sidebar mobile) — tanpa
  framework, tanpa dependency runtime.
- [Instrument Sans](https://github.com/Instrument/instrument-sans) sebagai
  font, di-hosting lokal.

## Brand & Logo

Logo resmi **KarirLink** (`logo/new/`, dari tim brand SEVIMA) adalah aset
visual utama proyek ini, tersedia dalam 4 varian di `assets/logo/` — lihat
bagian Logo di `index.html` untuk contoh visual & kapan memakai masing-masing:

| File | Varian | Fungsi |
| --- | --- | --- |
| `karirlink-mark.svg` | Mark, warna | Favicon, ikon aplikasi, ruang sempit |
| `karirlink-mark-white.svg` | Mark, putih | Mark di atas latar gelap/gradasi |
| `karirlink-logo.svg` | Lockup, warna | Header & sidebar (penempatan utama) |
| `karirlink-logo-white.svg` | Lockup, putih | Lockup di atas latar gelap |

`karirlink-mark.svg` dipakai sebagai favicon kedua halaman; `karirlink-logo.svg`
dipakai di header `index.html` dan sidebar `templates/dashboard.html`.

Warna **primary** dan **secondary** design system satu keluarga hue dengan
warna logo (biru & oranye), tapi saturasi/lightness-nya disesuaikan supaya
lebih hidup untuk UI — bukan hex logo yang persis sama (lihat `src/input.css`,
`@theme`):

| Token | Base (600) | Sumber |
| --- | --- | --- |
| `primary` (biru) | `#2361e7` | Hue sama dengan mark "L" & teks "Karir" pada logo, dibuat lebih vivid |
| `secondary` (oranye) | `#f67e28` | Hue sama dengan mark panah "K" & teks "link" pada logo, dibuat lebih hangat |

Skala 50–950 tiap warna diturunkan dari base tersebut (lihat bagian Colors
di `index.html` untuk swatch lengkap). `bg-brand-gradient` dan
`shadow-glow-primary` juga sudah memakai biru brand ini. Karena oranye
punya kontras lebih rendah terhadap putih, `.btn-accent` memakai teks gelap
(`text-slate-900`), bukan putih, supaya tetap mudah dibaca.

## Font

Satu keluarga font untuk semua teks: **Instrument Sans** (400/500/600/700), supaya
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
benar-benar dipakai di `index.html`/`templates/dashboard.html`, kelas baru
otomatis ikut ter-build tanpa perlu ubah konfigurasi apa pun.

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
