# Changelog

Format mengikuti [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [1.1.0] — 2026-09-10

### Added
- Section "Logo" baru di `index.html` yang memperagakan keempat varian
  logo beserta kapan masing-masing dipakai.
- Komponen `.btn-accent` dan `.badge-secondary` untuk memakai warna
  secondary/oranye di UI.

### Changed
- Palet warna **primary** diganti dari violet ke biru (`#22489e`) dan
  **secondary** oranye (`#f05925`) ditambahkan — keduanya diturunkan
  langsung dari logo resmi KarirLink, bukan lagi warna sembarang.
- `bg-brand-gradient`, `bg-brand-gradient-soft`, `text-gradient-brand`,
  `shadow-glow-primary`, dan wash `bg-shell` diperbarui memakai warna brand
  baru.
- Placeholder logo (ikon briefcase generik) di header `index.html` dan
  sidebar `dashboard.html` diganti dengan logo KarirLink asli.
- Set logo diperbarui ke format resmi terbaru dari tim brand (`logo/new/`):
  4 file dirapikan jadi `assets/logo/karirlink-mark(.svg|-white.svg)` dan
  `karirlink-logo(.svg|-white.svg)` — mark (ikon saja) untuk favicon/ruang
  sempit, lockup (ikon+teks) untuk header/sidebar, masing-masing versi warna
  & putih. Palet primary/secondary disesuaikan ke hex resmi yang baru.
- Heading "Design System KarirKit" kini memakai dua warna solid (Karir =
  primary, Kit = secondary) mengikuti gaya split-warna logo KarirLink,
  menggantikan efek gradient sebelumnya. Utility `text-gradient-brand` yang
  jadi tidak terpakai dihapus dari `src/input.css`.

### Fixed
- `dashboard.html`: tombol aksi di header ("30 Hari Terakhir" / "Cari
  Lowongan Baru") dan di kartu AI Career Coach ("Atur Preferensi" / "Lihat
  Rekomendasi") overflow/terpotong di lebar 320–375px karena baris flex-nya
  tidak bisa wrap — sekarang `flex-wrap` + full-width di mobile, auto-width
  di layar lebih besar.
- `dashboard.html`: tabel "Lamaran Terbaru" memaksa seluruh halaman melebar
  (horizontal scroll di seluruh body) di layar sempit karena grid item
  induknya tidak diberi `min-w-0` — default `min-width: auto` pada flex/grid
  item mencegah `overflow-x-auto` di dalamnya bekerja. Sekarang tabel
  scroll-horizontal di dalam kartunya sendiri, halaman tidak lagi melebar.
- `dashboard.html`: tombol "Atur Preferensi" / "Lihat Rekomendasi" di kartu
  AI Career Coach baru pindah ke kanan (sejajar judul) di breakpoint `lg`
  (1024px) — di rentang 768–1023px keduanya masih ikut `flex-col`, jadi
  tampil di bawah teks & rata kiri. Breakpoint diturunkan ke `md` (768px)
  dan induknya diberi `min-w-0` supaya teks bisa menyempit duluan; kini
  tombol sudah rata kanan mulai 768px.
- `dashboard.html`: tombol "30 Hari Terakhir" / "Cari Lowongan Baru" di
  header masih pecah jadi 2 baris di rentang ~640–767px meski sudah rata
  kanan — total lebar kedua tombol (~384px) sedikit lebih besar dari ruang
  yang tersisa (~360px). Label dipersingkat jadi "30 Hari" (konsisten
  dengan tombol periode di kartu grafik) sehingga keduanya muat satu baris
  mulai 768px, sama seperti kartu AI Career Coach di atas.
- Elemen yang terlihat bisa diklik (sidebar nav-item, segmented tabs, dan
  semua `<button>` polos yang belum pakai class `.btn-*`) tidak menunjukkan
  `cursor: pointer` — browser hanya memberi cursor pointer otomatis untuk
  `<a href>`, bukan untuk `<button>`, `<a>` tanpa `href`, atau `<span>`.
  Ditambahkan aturan `@layer base` di `src/input.css` yang memberi
  `cursor: pointer` ke semua `button`, `[role="button"]`, `select`,
  `summary`, serta label checkbox/radio — plus `cursor-pointer` langsung di
  `.nav-item` dan `.tab`.
- Diverifikasi dengan Playwright (headless Chromium) di 320/360/375/390/
  414/428/768/1024/1440px pada kedua halaman: tidak ada horizontal
  overflow, konten terpotong, maupun elemen interaktif tanpa
  `cursor: pointer` di lebar manapun.

## [1.0.0] — 2026-09-10

### Added
- Design tokens (`src/input.css`): palet warna primer (violet) & semantik
  (success/warning/danger/info), shadow, dan gradasi brand, dibangun dengan
  Tailwind CSS v4 (`@theme` + `@utility`).
- Pustaka komponen: button, badge, avatar, card, form, navigasi, tabel,
  callout/alert, progress bar, tab, dan tooltip (`@layer components`).
- `index.html` — style guide/dokumentasi visual seluruh token & komponen.
- `dashboard.html` — dashboard KarirKit (AI Career Coach untuk pencari
  kerja) sebagai implementasi nyata dari design system.
- Font Instrument Sans, menggantikan Google Fonts agar kedua halaman berjalan offline.
- Dokumen proyek: README, LICENSE, THIRD-PARTY-LICENSES, CHANGELOG.

Rilis internal pertama.
