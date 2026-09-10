# Changelog

Format [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

## [1.0.0] - 2026-09-10

### Added
- Design tokens (`src/input.css`): palet warna primary & secondary (diambil
  dari logo resmi KarirLink) & semantik (success/warning/danger/info),
  shadow, dan gradasi brand, dibangun dengan Tailwind CSS v4 (`@theme` +
  `@utility`).
- Pustaka komponen: button (termasuk `.btn-accent`), badge (termasuk
  `.badge-secondary`), avatar, card, form, navigasi, tabel, callout/alert,
  progress bar, tab, dan tooltip (`@layer components`).
- `index.html` - style guide/dokumentasi visual seluruh token & komponen,
  termasuk section "Logo" yang memperagakan keempat varian logo (mark/lockup
  x warna/putih) beserta kapan masing-masing dipakai.
- `templates/dashboard.html` - dashboard KarirKit (AI Career Coach untuk
  pencari kerja) sebagai implementasi nyata dari design system.
- Font Instrument Sans di-hosting lokal, menggantikan Google Fonts agar
  kedua halaman berjalan offline.
- Scrollbar kustom (tipis, thumb rounded mengambang, warna brand saat
  hover) dan smooth scroll untuk navigasi anchor, berlaku di semua area
  scroll (halaman utama, sidebar, nav pill horizontal, tabel).
- Dokumen proyek: README, LICENSE, THIRD-PARTY-LICENSES, CHANGELOG.

### Changed
- Palet warna **primary** (biru `#22489e`) dan **secondary** (oranye
  `#f05925`) diambil langsung dari logo resmi KarirLink, menggantikan
  placeholder violet; `bg-brand-gradient`, `bg-brand-gradient-soft`,
  `shadow-glow-primary`, dan wash `bg-shell` memakai warna brand ini.
- Placeholder logo (ikon briefcase generik) di header `index.html` dan
  sidebar dashboard diganti dengan logo KarirLink asli, lalu diperbarui lagi
  ke format resmi terbaru dari tim brand (`logo/new/`): dirapikan jadi
  `assets/logo/karirlink-mark(.svg|-white.svg)` dan
  `karirlink-logo(.svg|-white.svg)` - mark (ikon saja) untuk favicon/ruang
  sempit, lockup (ikon+teks) untuk header/sidebar, masing-masing versi warna
  & putih.
- Heading "Design System KarirKit" memakai dua warna solid (Karir = primary,
  Kit = secondary) mengikuti gaya split-warna logo KarirLink.
- Callout/alert (`.callout` dan kotak "AI Recommendation & Impact" di
  dashboard) diberi border penuh yang lembut, bukan cuma aksen border kiri
  saja, supaya kotaknya lebih terdefinisi.
- Badge dibuat sedikit lebih besar (padding & dot lebih besar) supaya lebih
  mudah dibaca.
- `dashboard.html` dipindah ke `templates/dashboard.html`; seluruh path
  relatif di dalamnya (favicon, `dist/output.css`, logo, link kembali ke
  `index.html`) disesuaikan ke `../`, dan link menuju dashboard di
  `index.html` diperbarui ke `templates/dashboard.html`.

### Fixed
- Tombol aksi di header dashboard ("30 Hari" / "Cari Lowongan Baru") dan di
  kartu AI Career Coach ("Atur Preferensi" / "Lihat Rekomendasi") overflow/
  terpotong di lebar 320-375px karena baris flex-nya tidak bisa wrap, dan
  masih rata kiri (bukan kanan) di rentang 768-1023px karena breakpoint
  `lg:flex-row` terlalu tinggi serta induknya tidak diberi `min-w-0` untuk
  menyempit. Sekarang `flex-wrap` + full-width di mobile, breakpoint
  diturunkan ke `md` (768px), dan label "30 Hari" dipersingkat (konsisten
  dengan tombol periode di kartu grafik) supaya kedua tombol muat satu baris
  mulai 768px.
- Tabel "Lamaran Terbaru" memaksa seluruh halaman melebar (horizontal
  scroll di seluruh body) di layar sempit karena grid item induknya tidak
  diberi `min-w-0` - default `min-width: auto` pada flex/grid item mencegah
  `overflow-x-auto` di dalamnya bekerja. Sekarang tabel scroll-horizontal
  di dalam kartunya sendiri, halaman tidak lagi melebar.
- Elemen yang terlihat bisa diklik (sidebar nav-item, segmented tabs, dan
  semua `<button>` polos yang belum pakai class `.btn-*`) tidak menunjukkan
  `cursor: pointer` - browser hanya memberi cursor pointer otomatis untuk
  `<a href>`, bukan untuk `<button>`, `<a>` tanpa `href`, atau `<span>`.
  Ditambahkan aturan `@layer base` di `src/input.css` yang memberi
  `cursor: pointer` ke semua `button`, `[role="button"]`, `select`,
  `summary`, serta label checkbox/radio - plus `cursor-pointer` langsung di
  `.nav-item` dan `.tab`.
- Diverifikasi dengan Playwright (headless Chromium) di 320/360/375/390/
  414/428/768/1024/1440px pada kedua halaman: tidak ada horizontal
  overflow, konten terpotong, maupun elemen interaktif tanpa
  `cursor: pointer` di lebar manapun.

Rilis internal pertama.
