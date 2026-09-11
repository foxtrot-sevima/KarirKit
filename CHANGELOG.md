# Changelog

Format [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added
- `templates/karirlink/index.html` — dashboard admin khusus untuk platform
  KarirLink (Panel Admin Karir kampus), terpisah dari dashboard pencari
  kerja di `templates/dashboard.html`. Sidebar disusun ulang sesuai
  struktur produk: Dashboard, grup "Tracer" (Kuesioner), grup "Portal
  Karir" (Kerjasama, Lowongan, Event), dan grup "General"
  (Mahasiswa/Alumni, Aktivitas Lamaran, Report, Pengaturan Landing Page).
  Konten dashboard disesuaikan untuk kebutuhan admin: KPI (mahasiswa/alumni
  terdata, lowongan aktif, mitra kerjasama, partisipasi tracer study), tren
  partisipasi tracer study per angkatan, lowongan mitra yang menunggu
  persetujuan (Setujui/Tolak), event mendatang, aktivitas lamaran terbaru,
  kerjasama terbaru, dan pintasan laporan & publikasi.
- Tombol on/off sidebar di topbar `templates/karirlink/index.html` (khusus
  desktop, terpisah dari toggle overlay mobile) yang menyembunyikan
  sidebar sepenuhnya dan melebarkan konten ke penuh saat dimatikan -
  bukan versi mini/ciutkan, jadi ukuran logo tidak berubah. Preferensi
  disimpan di `localStorage` agar bertahan setelah reload.
- Section "DataTable" baru di `index.html`: pola tabel lengkap dan benar-benar
  berfungsi (vanilla JS, tanpa dependency) dengan pencarian live, filter
  status via tab bersegmen, kolom yang bisa diurutkan (klik header atau
  dropdown "Urutkan" dengan opsi radio terkelompok — keduanya saling
  sinkron), pilih baris massal (checkbox + select-all + bulk delete), tombol
  aksi utama per baris yang menyesuaikan status ("Detail Interview", "Lihat
  Progres", dst.) plus menu overflow (Lihat Detail/Edit/Hapus) dengan
  tooltip, dan pagination (ubah jumlah baris per halaman, navigasi halaman).
  Komponen baru: `.th-sortable`, `.dropdown-menu`, `.dropdown-item`,
  `.pagination-btn`, `.tooltip-content`.
- Section "Dropdown" baru beserta komponen combobox generik (`.combo`) yang
  memposisikan diri otomatis ke sisi dengan ruang paling lega (bawah/atas,
  rata-kiri/rata-kanan), relatif terhadap viewport atau kontainer pembatas
  opsional (`data-combo-boundary`). Dipakai untuk tiga pola: menu aksi biasa,
  combobox pencarian single-select (`data-combo-search`), dan combobox
  multi-pilih dengan checkbox + tag yang bisa dihapus langsung
  (`data-combo-multi`, `.chip`).
- Field baru di Forms: "Pilih Posisi" (combobox dengan pencarian) dan "Pilih
  Skill" (combobox multi-pilih dengan checkbox & tag); "Level Pengalaman"
  kini juga memakai komponen combobox yang sama menggantikan `<select>`
  bawaan browser, supaya konsisten.
- Textarea `.textarea-autogrow` (field "Ringkasan Profil") yang tingginya
  menyesuaikan panjang teks secara otomatis (CSS `field-sizing: content`,
  dengan fallback JS berbasis `scrollHeight` untuk browser yang belum
  mendukungnya) — tidak ada lagi scrollbar atau resize handle manual.
- Checkbox & radio custom (`.form-check`, `.form-radio`) - kotak/lingkaran
  dengan tanda centang & titik ber-SVG, transisi, ring fokus, dan state
  disabled - menggantikan gaya `accent-color` bawaan browser.
- Swatch warna "Neutral - Slate" (skala 50-950) dan "Base - Light & Dark"
  (putih & hitam) di section Colors, yang sebelumnya belum ada preview-nya
  sama sekali.
- Field "Ekspektasi Gaji" (`[data-currency-input]`) di Forms: input angka
  berprefiks "Rp." yang otomatis menambahkan titik pemisah ribuan saat
  mengetik (mis. `1000000000` → `1.000.000.000`), membuang karakter
  non-digit, dan mempertahankan posisi kursor saat memformat ulang.
- Field "Tanggal Mulai Kerja" di Forms: date picker kalender custom
  (`[data-date-picker]`) dibangun di atas komponen combobox yang sama.
  Tanggal bisa diketik langsung dalam format `dd/mm/yyyy` (dengan mask "/"
  otomatis dan validasi tanggal asli, menolak input seperti `31/02/2026`),
  atau dipilih lewat kalender dengan navigasi bertingkat ala Google
  Calendar — klik judul header untuk *drill-up* dari tampilan hari ke
  bulan lalu ke tahun (grid 12 tahun per halaman, bukan dropdown yang bisa
  kepanjangan), lalu pilih tahun → bulan untuk *drill-down* kembali ke
  tanggal. Highlight hari ini & tanggal terpilih di ketiga tampilan, plus
  pintasan "Hari ini" dan "Hapus".

### Changed
- Profil admin di `templates/karirlink/index.html` dipindah dari footer
  sidebar ke topbar (avatar + nama + peran, menyatu dengan tombol), dan
  label institusi ("Universitas Nusantara Raya · Panel Admin Karir") yang
  sebelumnya nempel di bawah logo sidebar dihapus.
- Warna **primary** (`#22489e` → `#2361e7`) dan **secondary** (`#f05925` →
  `#f67e28`) disesuaikan ke versi yang lebih vivid/hidup, tetap satu
  keluarga hue biru & oranye dengan logo tapi tidak lagi hex logo persis.
  `.btn-accent` diganti dari teks putih ke `text-slate-900` karena oranye
  baru punya kontras lebih rendah terhadap putih (2.65:1) dibanding gelap
  (6.74:1).
- Header tabel (`.table th`) diubah dari label kecil huruf kapital
  (`uppercase tracking-wider`) menjadi teks normal yang lebih besar dan
  jelas, mengikuti referensi desain yang lebih bersih — berlaku untuk semua
  tabel, bukan cuma DataTable.
- Tabel didesain ulang mengikuti referensi Kolaj "Orders": avatar + nama
  perusahaan pada kolom utama, progress bar skor kecocokan, badge status,
  dan menu aksi kebab per baris.
- Scrollbar didesain ulang meniru Quantum: thumb tipis dan nyaris tak
  terlihat (`slate-100`) di atas track transparan, disembunyikan total di
  sidebar nav & tab-strip horizontal lewat utility `.scrollbar-none` baru.
- Swatch warna Semantic sekarang menampilkan token code di bawah tiap warna
  (`success-600`, `warning-500`, dst.), bukan cuma kotak warna tanpa label.
- Field "Search dalam dropdown" dan "Checkbox & tag dalam dropdown"
  dipindah dari section Dropdown ke section Forms karena keduanya memang
  komponen form; section Dropdown kini fokus ke demo auto-placement saja.
- Ikon pencarian di dalam combobox (`.combo-search-icon`) diberi jarak yang
  lebih pas dari tepi input (dipisah ke wrapper `.combo-search-field`
  sendiri) — sebelumnya terlalu mepet ke kiri karena berbagi posisi dengan
  padding kontainer luar.
- Trigger combobox "Pilih Skill" sekarang tumbuh tingginya (`min-h-10`, tag
  boleh wrap ke baris berikutnya) mengikuti jumlah tag terpilih, alih-alih
  tinggi tetap `h-10` yang memotong tag ke-3 dan seterusnya.

### Fixed
- Checkbox pada combobox multi-pilih dobel-toggle saat item berupa `<label>`
  yang membungkus `<input type="checkbox">` - klik label memicu toggle
  native dari browser sekaligus toggle manual di JS, saling membatalkan.
  Sekarang state checkbox dibaca lewat event `change`, bukan di-toggle
  manual lagi.
- Menu dropdown yang lebih lebar dari ruang yang tersedia di kedua sisi
  (viewport atau kontainer pembatas sempit) selalu jatuh ke perataan
  "start" meski itu yang paling terpotong; sekarang otomatis memilih sisi
  dengan ruang paling lega.
- Menu combobox yang lebih lebar dari ruang di kedua sisi trigger sekaligus
  (mis. kalender date picker di layar 320px) masih bisa terpotong walau
  perataan "start"/"end" sudah dipilih sebaik mungkin, karena keduanya
  tetap dihitung relatif ke trigger, bukan ke batas layar. Sekarang posisi
  akhir menu di-clamp lewat offset inline supaya selalu penuh berada di
  dalam boundary.
- Kalender date picker sama sekali tidak terbuka saat input teks di dalam
  trigger-nya ditambahkan - `stopPropagation()` pada klik input mencegah
  event mencapai listener buka/tutup milik trigger. Dihapus; listener pada
  trigger sendiri sudah cukup untuk membuka saat tertutup dan membiarkan
  tetap terbuka saat pengguna mengetik.

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
