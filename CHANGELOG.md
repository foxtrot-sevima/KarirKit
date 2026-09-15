# Changelog

Format [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added

- Tab "Tracer Study" di dashboard KarirLink dirombak total dari satu
  grafik tren + kartu Perlu Perhatian menjadi enam widget analitik nyata,
  meniru pola dari prototipe produk Tracer Study SEVIMA yang sudah ada
  (`Tracer Study/tracer-study/v2.1` & `v3`) - semuanya pakai
  [Chart.js](https://www.chartjs.org/) (v4.5.1, dimuat dari cdnjs), satu
  library yang sama dipakai konsisten di kedua prototipe referensi:
  - **Filter** - card berisi tiga dropdown (Angkatan, Tahun Lulus, Program
    Studi) + tombol "Terapkan Filter", ditaruh di atas semua widget tab
    ini - pola filter berbasis dropdown angkatan/tahun-lulus ini yang
    dipakai di kedua prototipe referensi untuk "filter berdasarkan waktu"
    (bukan date-range picker - tidak ada satu pun di seluruh referensi).
    Ketiga dropdown-nya pakai komponen `.combo` dari UI kit (bukan
    `<select>` bawaan browser) - trigger + menu self-positioning dengan
    pencarian di dalam menu untuk Program Studi, persis komponen yang
    sama seperti field "Level Pengalaman" di `index.html`. JS-nya
    (`setupCombo`/`getBoundary`) di-port verbatim ke halaman ini karena
    sebelumnya belum ada combo apa pun terpakai di
    `templates/karirlink/index.html`.
  - **Riwayat Pengisian Tracer Study** - awalnya bar chart total responden
    per gelombang (menggantikan grafik "Tren Partisipasi" SVG lama yang
    memakai `preserveAspectRatio="none"`, meregangkan viewBox tetap
    secara tidak proporsional dan membuat garisnya terlihat panjang/
    melebar tidak jelas di layar lebar - keluhan yang memicu perombakan
    ini). Diganti lagi jadi bentuk corong (funnel) horizontal-bar 4 tahap
    - Terkirim → Dibuka → Mulai Diisi → Selesai, untuk satu gelombang
    yang sedang berjalan (badge "Gelombang Pra-Lulus") - dipilih dari 3
    opsi bentuk diagram yang ditawarkan (line/area tren waktu, funnel,
    bar bertumpuk sudah/belum) karena lebih menunjukkan di tahap mana
    alumni paling banyak berhenti mengisi, bukan sekadar total akhir.
    Warna tiap tahap juga progresif (abu netral → biru → oranye → hijau
    sukses) dan tooltip-nya menampilkan persentase terhadap jumlah
    terkirim.
  - **Distribusi Status Karier Alumni** - donut (Bekerja/Wiraswasta/
    Melanjutkan Studi/Mencari Kerja) dengan label besar di tengah donut
    dan legenda HTML di sampingnya (bukan legenda bawaan Chart.js).
  - **Distribusi Waktu Tunggu Pekerjaan Pertama** - donut serupa, 4 rentang
    waktu (0-3/3-6/6-12/>12 bulan), gradasi biru gelap→terang mewakili
    cepat→lambat.
  - **Persebaran Alumni per Lokasi Kerja** - bar horizontal per provinsi,
    diurutkan dari yang terbanyak.
  - **Demografi Alumni Bekerja per Daerah** - stacked bar (Laki-laki/
    Perempuan) per provinsi, dengan catatan bahwa data gender diambil dari
    SIAKAD, bukan ditanya ulang di kuesioner.
  - **Kuesioner Pengguna Lulusan** - stacked horizontal bar, 8 aspek
    kompetensi (Integritas/Etika, Profesionalisme, Bahasa Asing,
    Penggunaan TI, Komunikasi, Kerjasama Tim, Kepemimpinan, Pengembangan
    Diri) × 4 tingkat penilaian (Kurang/Cukup/Baik/Sangat Baik), plus
    callout otomatis menyoroti aspek kompetensi terlemah.
  Semua kanvas berada di dalam tab "Tracer Study" yang defaultnya
  tersembunyi (lihat segmented tab di bawah) - Chart.js mengukur ukuran
  kanvas saat dibuat, jadi seluruh chart di-`resize()` ulang begitu tab
  itu pertama kali dibuka supaya tidak salah ukur akibat container
  `display: none`. Dua penyesuaian warna: "Demografi Alumni Bekerja per
  Daerah" dipertegas jadi biru (Laki-laki) & pink `#ec4899` (Perempuan) -
  sebelumnya oranye brand (secondary) yang kurang lazim untuk konteks
  gender; "Distribusi Status Karier Alumni" diberi warna yang lebih
  sesuai konteks psikologisnya per kategori - Bekerja tetap hijau
  (positif), Mencari Kerja tetap amber (perlu perhatian), tapi
  Melanjutkan Studi dipindah dari oranye (bentrok makna dengan Mencari
  Kerja yang sama-sama warna hangat, padahal satu netral/positif dan
  satu perlu perhatian) ke biru (asosiasi akademik), dan Wiraswasta
  diberi ungu `#7c3aed` tersendiri (mandiri/wirausaha, berbeda dari
  Bekerja yang notabene bekerja untuk orang lain) alih-alih berbagi
  warna info dengan kategori lain.
- Dashboard `templates/karirlink/index.html` dipisah jadi dua segmented
  tab, "Portal Karir" dan "Tracer Study", menggantikan tombol "Kirim
  Reminder Tracer" dan "Tambah Lowongan" yang sebelumnya ada di baris
  sapaan (kedua aksi itu sudah tersedia kontekstual di dalam konten
  masing-masing tab - "Kirim Reminder Sekarang" di kartu Perlu Perhatian,
  "Setujui/Tolak" di kartu Lowongan Menunggu Persetujuan). Tab "Portal
  Karir" (aktif secara default) berisi Lowongan Menunggu Persetujuan,
  Event Mendatang, dan Kerjasama Terbaru; tab "Tracer Study" berisi
  keenam widget analitik Tracer Study (lihat poin di atas) plus kartu
  Perlu Perhatian. KPI row, Aktivitas
  Lamaran Terbaru, dan Laporan & Publikasi (General, lintas keduanya)
  tetap tampil di luar tab, tidak ikut terpisah. Kartu Aktivitas Lamaran
  Terbaru sekarang berdampingan dengan Laporan & Publikasi (menggantikan
  posisi Kerjasama Terbaru yang sudah pindah ke tab Portal Karir). Kedua
  tombol tab-nya diberi `flex-1` di mobile (`sm:flex-none` supaya balik
  ke lebar seukuran konten di layar yang lebih lebar) - sebelumnya
  container pil abu-abunya melebar penuh di mobile tapi kedua tombolnya
  tetap seukuran konten, jadi nempel di kiri dengan banyak ruang kosong
  di kanan; sekarang keduanya berbagi rata lebar container.
- Filter di tab "Portal Karir" dashboard KarirLink (sebelumnya cuma tab
  "Tracer Study" yang punya) - card dengan tiga dropdown `.combo` (pakai
  komponen UI kit yang sama seperti filter Tracer Study): **Periode**
  (7 Hari Terakhir/30 Hari Terakhir/3 Bulan Terakhir/Tahun Ini/Semua
  Waktu - waktu umum, bukan angkatan/tahun-lulus akademik seperti di tab
  Tracer Study, karena konten tab ini - lowongan, event, kerjasama -
  bukan data akademik), **Kategori** (Lowongan/Event/Kerjasama), dan
  **Status** (Menunggu Persetujuan/Disetujui-Aktif/Ditolak), plus tombol
  "Terapkan Filter".
- Dropdown pada tombol profil di topbar kelima halaman
  `templates/karirlink/` - sebelumnya tombolnya (avatar + nama + ikon
  caret-down) tidak menampilkan menu apa pun saat diklik. Sekarang klik
  membuka menu "Pengaturan Akun", "Bantuan", dan "Keluar" (merah, terpisah
  dengan garis pembatas), pakai komponen `.dropdown-menu`/`.dropdown-item`
  yang sudah ada; ikon caret berputar 180° saat terbuka, menu tertutup
  otomatis saat klik di luar area menu.
- Footer di kelima halaman `templates/karirlink/` (`index.html`,
  `kuesioner.html`, `kuesioner-builder.html`, `yudisium.html`,
  `yudisium-detail.html`) yang sebelumnya belum punya footer sama sekali:
  "© 2005-2026 SEVIMA. All Rights Reserved." rata kiri dan "KarirLink" rata
  kanan (bertumpuk-tengah di mobile), konsisten dengan pola footer yang
  sudah ada di `index.html` (style guide KarirKit). Tahun akhir dihitung
  otomatis lewat JS (`new Date().getFullYear()`) saat halaman dimuat,
  bukan ditulis statis - situs ini murni HTML statis tanpa backend, jadi
  templating server-side seperti Blade (`{{ now()->year }}`) tidak akan
  ter-render dan malah tampil sebagai teks literal di browser. Padding
  dipangkas (`py-6` → `py-4`) dan diberi latar putih (beda dari
  `bg-shell` di belakangnya) supaya terlihat sebagai footer, bukan
  sekadar baris teks yang menyatu dengan konten di atasnya. Border &
  latar putihnya dipindah ke elemen dalam yang dibatasi `max-w-[1600px]`
  (bukan di elemen `<footer>` terluar yang selebar kolom konten) supaya
  lebar pita footer-nya sejajar dengan card-card di atasnya, tidak
  full-bleed lebih lebar dari konten. `#mainColumn` dijadikan
  `flex flex-col min-h-screen` dan `<main>` diberi `flex-1` supaya
  footer selalu menempel di dasar layar pada halaman berkonten pendek
  (bukan mengambang tepat di bawah konten dengan celah kosong di
  bawahnya), sambil tetap mengikuti alur dokumen seperti biasa pada
  halaman berkonten panjang.
- Modul Kuesioner Tracer Study di platform admin KarirLink, 4 halaman baru
  di `templates/karirlink/`:
  - `kuesioner.html` — daftar tiga jenis template kuesioner (Lulusan,
    Pengguna Lulusan, Kosong), plus penjelasan tiga tingkatan pertanyaan.
    Hanya template Kosong yang mendukung versioning. Kuesioner hanya
    menyediakan template & builder — tidak ada pengaturan pengiriman di
    sini. Meta-teks "Diperbarui X hari lalu" (Lulusan, Pengguna Lulusan)
    dan "v1.0 · 1 versi" (Kosong) di tiap card dihapus - dianggap tidak
    perlu, cukup jumlah pertanyaan saja yang tampil.
  - `kuesioner-builder.html` — halaman kelola pertanyaan per template,
    tiga tingkatan (Core berkode Dikti dan tidak dapat dihapus, Optional
    bisa diaktif/matikan, Custom bisa ditambah/diedit/dihapus — masing-
    masing dengan toggle wajib/opsional independen dari tingkatannya).
    Tiga tampilan berbeda tergantung template: Pengguna Lulusan tampil
    flat (satu set tingkatan saja, tanpa versioning maupun gelombang);
    Lulusan tidak memakai versioning — pertanyaannya dikelompokkan per
    Gelombang (Pra-Lulus, Pasca-Lulus 1 Tahun, Pasca-Lulus 4 Tahun),
    masing-masing section sendiri dengan tiga tingkatannya sendiri, section
    pertama (Pra-Lulus) tampil terbuka dan dua lainnya dapat
    diperluas/ditutup; Kosong satu-satunya template dengan versioning
    (section tersendiri per versi, bukan dropdown, dengan aksi "Jadikan
    Aktif" untuk versi arsip) — saat ini baru punya satu versi aktif dan
    kosong (belum ada pertanyaan Core/Optional bawaan, hanya bisa diisi
    pertanyaan Custom). Ditambahkan juga baris quick-nav "Lompat ke" di
    atas daftar gelombang Lulusan — klik pil gelombang langsung scroll ke
    section-nya dan otomatis membukanya kalau sedang tertutup, plus tombol
    "Buka semua" / "Tutup semua" untuk expand-collapse sekaligus, supaya
    admin tidak perlu scroll manual menyusuri tiap section Core/Optional/
    Custom satu per satu. Status wajib/opsional pada pertanyaan Core kini
    ditampilkan sebagai teks statis, bukan toggle - status ini sudah
    ditetapkan sistem (mengikuti definisi Dikti) dan tidak bisa diubah
    admin, beda dari Optional (boleh ubah wajib/opsional & aktif/nonaktif)
    dan Custom (boleh diubah bebas). Ikon drag-handle di baris Core juga
    tidak lagi menyiratkan bisa di-drag/urutkan ulang. Badge tingkatan
    Core/Optional/Custom di setiap section kini punya tooltip saat
    di-hover yang menjelaskan arti masing-masing tingkatan (posisi di
    bawah badge, bukan di atas, supaya tidak terpotong oleh
    `overflow-hidden` pada card pembungkusnya) - rata kiri ke badge, bukan
    center, karena badge-nya dekat tepi kiri card sehingga tooltip lebar
    yang di-center akan terpotong juga oleh tepi kiri card yang sama.
    Grid ringkasan jumlah Core/Optional/Custom dihapus dari semua section
    (flat Pengguna Lulusan maupun ketiga Gelombang di Lulusan) - dianggap
    tidak penting karena jumlah pertanyaan sudah tampil di badge header
    tiap section (mis. "16 pertanyaan").
  - Baris pertanyaan Core/Optional/Custom dirombak untuk mobile (di bawah
    breakpoint `sm`) karena sebelumnya sangat sesak - teks pertanyaan
    terpotong `truncate` jadi nyaris tidak terbaca, dua toggle Optional
    (Wajib + Aktif) dan toggle+edit+hapus Custom berhimpitan. Sekarang di
    mobile teks pertanyaan tampil penuh (wrap, tidak terpotong) di baris
    tersendiri, dengan kode Core/toggle/tombol aksi mengelompok di baris
    terpisah; dari breakpoint `sm` ke atas kembali ke tata letak satu
    baris seperti semula (teks `truncate`, semua kontrol sejajar). Ikon
    drag-handle (dekoratif, tidak ada logika drag) disembunyikan di mobile
    untuk menghemat ruang. Header tiap section (Core/Optional/Custom) juga
    ditumpuk vertikal di mobile - badge+judul di atas, teks meta atau
    tombol "Tambah Pertanyaan" di bawah (dulu berhimpitan/wrap acak).
  - Baris quick-nav "Lompat ke" pada Gelombang Lulusan dirapikan untuk
    mobile - sebelumnya pil gelombang dan tombol "Buka semua"/"Tutup
    semua" berada dalam satu `flex-wrap` yang sama sehingga urutan
    wrap-nya tidak konsisten di berbagai lebar layar (kadang menyatu di
    baris terakhir, kadang terpisah acak). Sekarang keduanya jadi dua
    grup yang jelas - ditumpuk vertikal (dengan garis pemisah) di mobile,
    kembali sejajar satu baris dari breakpoint `sm` ke atas.
  - Badge jumlah pertanyaan ("16 pertanyaan", dst.) pada header tiap
    section Gelombang disembunyikan di mobile - info ini dianggap tidak
    penting di layar sempit, cukup nama gelombangnya saja yang tampil;
    badge tetap tampil dari breakpoint `sm` ke atas.
  - Pil gelombang pada quick-nav "Lompat ke" di mobile sekarang scroll ke
    samping (satu baris, `overflow-x-auto`) alih-alih wrap ke banyak
    baris - label "Lompat ke" tetap diam di kiri, cuma pil-nya yang
    scroll. Dari breakpoint `sm` ke atas kembali ke `flex-wrap` biasa
    seperti semula karena sudah cukup lebar untuk menampung ketiganya.
  - `yudisium.html` — halaman terpisah di bawah Kuesioner untuk menetapkan
    lulusan berdasarkan Data Lulusan Yudisium: daftar Periode Yudisium
    (15 data, dengan pagination - 10 per halaman) dengan jumlah lulusan,
    status kuesioner, dan aksi Finalisasi & Kirim per periode, plus
    pengaturan Gelombang Pengiriman - kini 3 gelombang lengkap (Pra-Lulus,
    Pasca-Lulus 1 Tahun, Pasca-Lulus 4 Tahun yang sebelumnya belum ada),
    masing-masing berisi rentang tanggal pengiriman (Tanggal Mulai &
    Tanggal Akhir, dua `input type="date"` berdampingan) - lebih
    dibutuhkan admin daripada angka relatif "berapa hari/bulan
    sebelum/setelah yudisium" yang dipakai sebelumnya. Field "Template
    kuesioner" dihapus dari ketiga kartu karena nilainya sudah pasti
    (selalu Kuesioner Lulusan, bukan pilihan), begitu juga toggle
    aktif/nonaktif per gelombang. Tabel Periode Yudisium disesuaikan untuk
    mobile: kolom Tanggal Yudisium & Jumlah Lulusan disembunyikan di bawah
    breakpoint `sm` dan dipindah jadi subteks di bawah nama periode, badge
    status & tombol aksi diberi lebar maksimum + wrap teks supaya tidak
    memaksa scroll ke samping - diverifikasi tidak ada horizontal overflow
    di 320px maupun 375px. Tidak ada tombol "Tambah Periode Yudisium" -
    data periode disinkronkan otomatis, jadi diganti indikator di header
    yang menampilkan tanggal & jam sinkronisasi terakhir plus selisih
    waktu relatifnya, mis. "Sinkron · 14 Sep 2026, 09:45 (10 menit lalu)".
    Tombol aksi per baris "Finalisasi & Kirim" (periode Belum
    Difinalisasi) dan "Kirim Ulang" (periode Terkirim) dihapus - kini
    semua baris cukup satu tombol "Lihat Detail" saja, konsisten dengan
    periode Selesai; aksi kirim/finalisasi cukup dilakukan dari halaman
    detail periode.
  - `yudisium-detail.html` — detail satu Periode Yudisium: KPI partisipasi
    dan tabel mahasiswa (Nama, Prodi, Email, Status, Aksi) dengan filter
    tab status, pencarian langsung, dan pagination (10 data, 5 per
    halaman) — semuanya benar-benar berfungsi dan saling terhubung
    (mengganti filter mengembalikan ke halaman 1). Tombol "Kirim Reminder
    Massal" dihapus dari header - hanya "Finalisasi & Kirim Kuesioner"
    yang tersisa. Tabelnya dirapikan untuk mobile mengikuti pola yang
    sama seperti `yudisium.html` (kolom Prodi & Email disembunyikan di
    bawah `sm`, dipindah jadi subteks di bawah nama; nama & badge status
    diberi lebar maksimum supaya kolomnya benar-benar menyempit, bukan
    cuma `whitespace-normal` tanpa batas lebar yang tidak berefek pada
    algoritma auto-layout tabel).
  - Sidebar admin KarirLink diperbarui: "Kuesioner" sekarang tautan aktif,
    dan item baru "Daftar Yudisium" ditambahkan tepat di bawahnya dalam
    grup "Tracer".

### Fixed
- Tabel "Aktivitas Lamaran Terbaru" di `templates/karirlink/index.html`
  butuh scroll horizontal di layar sempit - dirapikan dengan pola yang
  sama seperti tabel Yudisium (kolom Posisi/Perusahaan/Tanggal
  disembunyikan di bawah `sm`, dipindah jadi subteks di bawah nama; badge
  status diberi lebar maksimum).
- Tabel di `yudisium-detail.html` masih bisa di-scroll horizontal sedikit
  di mobile walau semua kolom yang terlihat sudah pas - penyebabnya
  tooltip "Aksi lainnya" pada tombol menu titik-tiga: elemen tooltip-nya
  `opacity-0` (tak terlihat) tapi tetap `position:absolute` dan ikut
  dihitung dalam `scrollWidth`, jadi walau tak kelihatan, container-nya
  tetap bisa digeser. Perbaikan pertama (`hidden` di bawah `sm`) ternyata
  cuma memindah masalahnya - tooltip itu balik muncul di breakpoint `sm`
  ke atas dan overflow lagi di sana karena posisinya `left-1/2
  -translate-x-1/2` (center) sementara tombolnya ada persis di tepi kanan
  tabel. Diganti total: tooltip sekarang jadi elemen mandiri (tidak pakai
  komponen `.tooltip-content` bersama) dengan `right-0` (rata kanan ke
  tombol) alih-alih center, jadi tidak akan pernah menjorok keluar tepi
  tabel di lebar berapa pun. Kolom Prodi & Email juga diberi lebar
  maksimum + `truncate` mulai dari breakpoint `sm` (bukan cuma
  disembunyikan di bawahnya) - tanpa ini keduanya melebar mengikuti
  konten terpanjang dan overflow lagi tepat di titik breakpoint `sm`
  (640px) begitu kembali terlihat. Diverifikasi tidak ada horizontal
  overflow dari 320px sampai 1920px, termasuk di halaman ke-2 pagination.
- Dashboard `templates/karirlink/index.html` overflow horizontal persis
  di breakpoint `sm` (640px), sehingga footer terlihat "kepotong"/tidak
  selebar konten - dua penyebab terpisah: (1) div judul "Selamat pagi,
  Rina" belum punya `min-w-0`, jadi tidak bisa menyempit dan mendorong
  segmented tab Portal Karir/Tracer Study keluar baris; (2) container
  tab-nya sendiri (`#dashboardTabs`, `sm:w-fit`) ikut diperkecil oleh
  parent flex row-nya (default `flex-shrink` menang atas `w-fit`) padahal
  tombol di dalamnya `flex-none` (ukuran tetap, tidak ikut menyempit) -
  jadi kontainernya lebih sempit dari total lebar kedua tombolnya
  sendiri. Diperbaiki dengan `min-w-0` di div judul dan `shrink-0` di
  `#dashboardTabs`. Tabel "Aktivitas Lamaran Terbaru" juga masih overflow
  tipis persis di 640px meski sudah dirapikan sebelumnya (lihat poin di
  atas) - kolom Posisi/Perusahaan/Tanggal belum punya batas lebar saat
  muncul kembali di breakpoint `sm`, jadi diberi `sm:max-w-[85px]
  sm:truncate`. Diverifikasi tidak ada horizontal overflow dari 320px
  sampai 1920px di kelima halaman `templates/karirlink/`.
- Footer & konten dashboard terlihat tidak rata kanan-kiri di layar lebar
  (di atas ~1600px) - `<main>` dan `<footer>` sebenarnya sudah konsisten
  sama-sama dibatasi `max-w-[1600px]`, jadi lebarnya identik satu sama
  lain, tapi keduanya berhenti melebar jauh sebelum tepi layar sehingga
  ada ruang kosong besar di kanan yang membuat konten terlihat
  "mengambang"/tidak pas dengan lebar jendela penuh. `max-w-[1600px]`
  dihapus dari `<main>` dan `<footer>` di kelima halaman
  `templates/karirlink/` (`index.html`, `yudisium.html`,
  `yudisium-detail.html`, `kuesioner.html`, `kuesioner-builder.html`) dan
  dari `<main>` di `kuesioner-builder-2.html` (tidak punya `<footer>`),
  sehingga dashboard mengisi penuh lebar layar di atas breakpoint
  manapun. Diverifikasi lebar `<footer>` dan `<main>` tetap identik
  piksel-demi-piksel di semua breakpoint (320-1920px) dan tidak ada
  horizontal overflow yang muncul di seluruh halaman.
- Card "Laporan & Publikasi" di `templates/karirlink/index.html` terlihat
  jomplang terhadap card "Aktivitas Lamaran Terbaru" di sebelah kirinya -
  keduanya satu baris grid (`lg:grid-cols-3`, kiri `lg:col-span-2`)
  sehingga tinggi card kanan otomatis diregangkan grid mengikuti tinggi
  card kiri yang lebih tinggi (403px), tapi isinya (3 link laporan) cuma
  butuh ~239px, sisa ~164px jadi ruang kosong nganggur di bagian bawah
  card. Percobaan pertama (`flex-1 justify-between` supaya 3 link ikut
  meregang mengisi tinggi card) malah membuat jarak antar-link jadi
  sangat lebar dan tidak wajar di layar lebar - dibatalkan. Diganti jadi
  pendekatan lain: card tidak lagi dipaksa meregang penuh (`self-start`,
  jadi tingginya ikut isinya sendiri) dan tiap link diberi ikon warna +
  subteks singkat (mis. "Partisipasi & status karier alumni"), menambah
  tinggi konten secara wajar (308px, dari sebelumnya 239px) tanpa
  gap kosong yang janggal - sisa selisih tinggi ke card kiri kini cuma
  tampak sebagai ruang latar biasa, bukan kotak kosong bertepi.
  Ditemukan efek samping saat perbaikan: grid `.grid.gap-6.lg:grid-cols-3`
  ini (dan satu grid lain dengan class sama di atasnya, untuk "Riwayat
  Pengisian + Perlu Perhatian") tidak punya `grid-cols-1` eksplisit di
  mobile, jadi lebar kolom implisitnya dihitung dari max-content item
  terlebar di antara SEMUA baris pada grid itu (bukan mengikuti lebar
  container) - begitu isi card kanan bertambah (ikon+subteks), max-
  content-nya naik jadi ~351px dan mendorong kedua card overflow
  horizontal tepat di 320px meski masing-masing kontennya sendiri
  muat. Diperbaiki dengan menambah `grid-cols-1` eksplisit (dan
  `min-w-0` di card kanan) pada kedua grid tersebut, memaksa track
  kolom mengikuti lebar container (`minmax(0,1fr)`) alih-alih auto
  mengikuti konten terlebar. Diverifikasi tidak ada horizontal overflow
  dari 320px sampai 1920px di kelima halaman `templates/karirlink/`.
- Legend "Distribusi Status Karier Alumni" & "Distribusi Waktu Tunggu
  Pekerjaan Pertama" di tab Tracer Study terlihat terlalu renggang di
  layar lebar - efek samping dari penghapusan `max-w-[1600px]` di atas:
  wrapper legend-nya `w-full` di dalam card yang sekarang ikut melebar
  penuh, jadi tiap baris `justify-between` (label kiri, persentase kanan)
  mendorong angkanya jauh ke ujung kanan card. Dibatasi dengan
  `sm:max-w-[220px]` pada wrapper legend supaya label dan angka tetap
  berdekatan seperti donut+legend pada umumnya, di breakpoint manapun -
  tetap `w-full` di bawah `sm` (mobile, chart & legend ditumpuk vertikal)
  supaya tidak terlalu sempit di sana. Efek lanjutan setelah legend
  dibatasi lebarnya: grup donut+legend jadi nempel rata kiri dengan
  ruang kosong lebar di kanan card. Ditambahkan `sm:justify-center` pada
  wrapper flex-row-nya supaya grup donut+legend selalu di tengah card,
  di lebar berapa pun.

## [1.1.0] - 2026-09-11

### Changed

- Seluruh ikon (203 pemakaian di `index.html`, `templates/dashboard.html`,
  dan `templates/karirlink/index.html`) diganti dari SVG outline
  hand-authored - tidak ada lagi ikon custom yang digambar sendiri.
- Ikon dijadikan token gaya icon font: tidak ada lagi markup SVG di HTML
  sama sekali. Tiap ikon kini dipakai sebagai `<i class="kk kk-nama"></i>`
  (mis. `<i class="kk kk-home"></i>`), didefinisikan sekali per ikon di
  `src/input.css` (`.kk` + 38 kelas `.kk-*`) lewat CSS `mask-image` yang
  meng-encode SVG dari `assets/icons/` sebagai data URI ber-base64 -
  mewarisi `currentColor` dan diberi ukuran lewat utility `h-*`/`w-*`
  seperti biasa. Data URI dipakai (bukan file sprite eksternal atau SVG
  `<use>` lintas-dokumen) karena keduanya diblokir kebijakan CORS Chrome
  saat halaman dibuka langsung lewat `file://` alih-alih lewat server -
  begitu cara situs offline-first ini dipakai.
- Ikon KarirKit kini mendukung 6 ketebalan sekaligus - Thin,
  Light, Regular, Bold, Fill, dan Duotone - bukan cuma Regular. Ketebalan
  dipilih lewat class modifier tambahan di samping `kk-nama` (mis.
  `<i class="kk kk-home kk-bold"></i>`); tanpa modifier tetap Regular
  seperti semula, jadi 203 pemakaian yang sudah ada tidak berubah. Duotone
  didekati dengan satu warna (bagian sekunder pada SVG asli sudah
  memakai opacity lebih rendah, yang otomatis terbawa oleh alpha mask),
  bukan dua warna sungguhan.

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
  Calendar — klik judul header untuk _drill-up_ dari tampilan hari ke
  bulan lalu ke tahun (grid 12 tahun per halaman, bukan dropdown yang bisa
  kepanjangan), lalu pilih tahun → bulan untuk _drill-down_ kembali ke
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
