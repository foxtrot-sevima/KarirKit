# Changelog Template

Perubahan **mockup template** KarirLink dan Portal Karir (`templates/karirlink`, `templates/portal-karir`, `templates/custom`). Format [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), tetapi versinya **hanya tanggal** (`## YYYY-MM-DD`); semver `X.Y.Z` khusus komponen design system di `CHANGELOG.md`. Pemisahan ini dimulai dari v1.4.0. Branch kerjanya `mockup/<YYYY-MM-DD>`, terpisah dari `karirkit/<versi>` milik design system.

Aturan singkat:
- Satu commit hanya berisi satu lingkup: design system (`feat(ds)`, `fix(ds)`) atau template (`feat(karirlink)`, `feat(portal-karir)`).
- Template selalu memakai komponen KarirKit terbaru. Butuh komponen atau varian baru? Diminta dan dibuat di KarirKit lebih dulu (kelas, story, JS, `CHANGELOG.md`), baru dipakai di template. Tidak ada komponen atau gaya baru yang hidup hanya di template.
- Tiap tanggal menyebut versi KarirKit yang dipakai ("Dasar KarirKit").
- **Gerbang produksi:** mockup masuk `master`/`release` hanya bila "Dasar KarirKit" adalah versi yang sudah dirilis (bertag). Dasar yang belum rilis ditandai "(belum dirilis)" dan mockupnya tertahan di staging (`dev-karirkit`). Cek dengan `npm run check:templates`.

## 2026-10-27

Dasar KarirKit: v1.4.0

### Added

- **Toggle on/off Lulus** di Pengaturan Gelombang Pengiriman (`templates/karirlink/yudisium-detail.html`): kampus yang ingin lulusan langsung mengisi gelombang berikutnya saat lulus bisa menonaktifkan Lulus. Saat nonaktif, kartu meredup, rentang tanggal dikunci, dan muncul keterangan bahwa gelombang tidak dikirim serta tidak tampil di Portal Karir.
- **Portal Karir menyembunyikan gelombang nonaktif** (`templates/portal-karir/portal.js`, `tracer-study.html`, `tracer-study-mahasiswa.html`, dan versi white-label): `PK.api.listTracer` hanya mengembalikan gelombang aktif (`enabled !== false`), dan grid kartu menyesuaikan jumlahnya (2 atau 3 kolom).
- **Pertanyaan Format Lampau dilengkapi di simulasi** (`templates/karirlink/kuesioner-simulasi.html`), mengikuti dokumen arsitektur pertanyaan: f301 + f302/f303 di cabang Bekerja dan Wiraswasta ("merencanakan"), f16 di Bekerja dan Wiraswasta, f6/f7/f7a di Bekerja, serta gerbang f502 Ya/Tidak sebelum isian bulan. Cabang Mencari Kerja: f301 dan f4 bertanda wajib.
- **Builder kuesioner menampilkan opsi pilihan** (`templates/karirlink/kuesioner-builder.html`): untuk pertanyaan Pilihan Ganda dan Kotak Centang, seluruh opsinya tampil sebagai daftar di bawah deskripsi baris. Format Lampau juga mendapat baris gerbang f502 dan baris f302/f303 sendiri di cabang Mencari Kerja.

### Changed

- **Onboarding Portal Karir layar penuh** (`templates/portal-karir/onboarding.html`): panel biru di kanan (logo, stepper vertikal, kartu "Kenapa kami menanyakan ini?") dihapus. Satu kolom di semua lebar layar (maks. 56rem) dengan logo, "Lewati semua", dan progres bersegmen di bagian atas seperti tampilan ponsel, ukuran elemen lebih ringkas, dan latar `bg-shell` seperti halaman portal lainnya. Bidang minat 3 kolom di layar lebar.
- **Unggah file memakai komponen File Upload** (`templates/karirlink/pengaturan-landing-page.html`, `lowongan-form.html`, `event-form.html`): kolom gambar Landing Page memakai tampilan `.upload-compact` (CSS `.lp-drop` buatan halaman dihapus); formulir Lowongan dan Event memakai dropzone dengan validasi format/ukuran dan pratinjau gambar. Komponen File Upload ada di KarirKit [Unreleased] (belum dirilis), jadi bagian ini tertahan di staging sampai dirilis.
- **Nama gelombang mengikuti istilah kuesioner Kemdikti**, bukan lagi berdasar waktu: Pra-Lulus menjadi **Lulus**, Pasca-Lulus 1 Tahun menjadi **Pasca-Lulus 1**, Pasca-Lulus 4 Tahun menjadi **Pasca-Lulus 2**. Waktu kirim ditentukan kampus per periode (Pasca-Lulus 1 bisa dikirim saat lulus), jadi nama tidak lagi memuat "1 tahun" atau "4 tahun". Berlaku di Yudisium (daftar, detail, jawaban), detail alumni, Kuesioner (builder, simulasi, email undangan), badge periode di Overview, dan Portal Karir.
- **Tautan Tracer Study mengikuti domain kampus** (`kuesioner.html`, `kuesioner-mail.html`, `kuesioner-simulasi.html`): tautan kuesioner, QR, email undangan, dan tautan survei atasan memakai domain tempat panel dibuka, bukan `karirlink.id` tetap.
- **Email undangan Tracer Study** (`templates/karirlink/kuesioner-mail.html`): salam memakai nama lengkap (alumni "Halo Ahmad Dimas,"; atasan "Yth. Bapak/Ibu/Saudara ..."), sapaan atasan diganti netral "Bapak/Ibu/Saudara" agar satu template cukup, kartu info (durasi, jumlah langkah, batas waktu) dihapus, nama universitas ditebalkan, dan logo KarirLink menautkan ke https://karirlink.id.

## 2026-10-26

Dasar KarirKit: v1.4.0

### Added

- **Halaman umum "Segera Hadir"** untuk menu dan tautan yang belum punya halaman: `templates/karirlink/segera-hadir.html` (admin: Kerjasama, Lowongan, Event, Report, dan daftar laporan di Overview) dan `templates/portal-karir/segera-hadir.html` (Portal Karir: Konsultasi karier, Pertanyaan umum, Kebijakan privasi, Syarat dan ketentuan, Lupa kata sandi). Satu tampilan yang sama tanpa teks per halaman, dengan tombol kembali ke Overview atau Beranda.
- **Pilihan format Pasca-Lulus di atas daftar gelombang** (`templates/karirlink/kuesioner-builder.html?tpl=lulusan`): tombol Format Baru dan Format Lampau kini terlihat sejak halaman dibuka, sebelumnya baru muncul setelah gelombang Pasca-Lulus dibuka. Satu pilihan menggerakkan tab format di Pasca-Lulus 1 dan 4 Tahun, dan ikut berubah bila tab gelombang diganti.
- **Ekspor Hasil di Kuesioner** (`templates/karirlink/kuesioner.html`): modal unduh jawaban alumni ke Excel seperti fitur Download Hasil di Tracer Study live. Pilih kuesioner, Template Laporan (Kemendikti atau Lengkap), Tahun Lulus dan Program Studi (dropdown Combo KarirKit), dan "Menampilkan data terbaru", lalu progres unduhan. Pengguna Lulusan diunduh langsung tanpa pilihan template. Header kuesioner dirapikan: "Simulasi Tracer" tetap tombol utama, sedangkan Lihat Panduan, QR Tracer, dan Ekspor Hasil masuk menu "Lainnya". Unduhan hanya simulasi.
- **Daftar Kuesioner Kosong Anda dan Arsip dalam satu layout** (`templates/karirlink/kuesioner.html`): judul dan penjelasan di kiri, kolom cari di kanan, daftar baris dalam satu kartu (ikon, judul, keterangan, tombol aksi), dan footer bergaya tabel (sama dengan Mahasiswa/Alumni) "Menampilkan x–y dari n" dengan tombol halaman (5 baris per halaman), baris menggelap tipis saat di-hover. Kuesioner Kosong punya aksi Edit dan Hapus (konfirmasi lewat modal), Arsip tetap Lihat Detail. Kartu arsip lama diganti baris daftar ini.
- **Aktivitas Lamaran Alumni** di admin KarirLink (`templates/karirlink/aktivitas-lamaran.html`): halaman pemantauan lamaran alumni (revamp), dan menu sidebar "Aktivitas Lamaran" kini menautkannya di semua halaman admin.
- **Dua tes baru di katalog Pengembangan Diri** (berstatus segera hadir): Tes Komunikasi dan Kerja Sama, serta Tes Nilai dan Motivasi Kerja.

### Changed

- **Menu akun Portal Karir** dikelompokkan dengan judul bagian "Akun" dan "Karier" dan dipisah garis, di navbar dan drawer akun.
- Judul bagian tes di halaman Pengembangan Diri menjadi "Tes Potensi".

## 2026-10-20

Dasar KarirKit: v1.4.0

### Added

- **Portal Karir: Pengembangan Diri (Tes dan Course)**: halaman Course digabung dengan tes menjadi `pengembangan.html` (daftar tes dan course, baris "Lanjutkan", filter kategori dan level, "Course saya"). Detail dan belajar course dipisah ke `course.html?id=`.
- **Tes Minat Karier RIASEC** (30 pernyataan, 6 tipe, kode Holland) sebagai tiga halaman terpisah: `riasec.html` (detail dan riwayat pengerjaan), `riasec-tes.html` (pengerjaan layar penuh dengan komponen Choice, draf tersimpan otomatis, jawaban lanjut otomatis, pintasan keyboard) dan `riasec-hasil.html` (kode karier, diagram radar, skor per tipe, bidang, lowongan dan course yang cocok).
- **Jalur rekomendasi lowongan dari RIASEC**: hasil tes yang dijadikan acuan dipadukan dengan jawaban onboarding (70:30) untuk persentase cocok di halaman Lowongan, dengan ajakan mengerjakan tes bila belum pernah.

### Changed

- Navbar, drawer, dan footer portal-karir memakai "Pengembangan" (Tes dan Course) menggantikan "Course"; skrip `gen-custom-portal.mjs` menerima nama halaman, dan Storybook memuat halaman baru.
- **Menu "Dashboard" diganti "Overview"** di panel admin KarirLink (label sidebar, tooltip, drawer ponsel, breadcrumb, dan judul halaman) pada semua template `templates/karirlink` dan `templates/custom`.

## 2026-10-13

Dasar KarirKit: v1.4.0

### Changed

- **Navbar dan footer di template memakai komponen baru**: bilah atas aplikasi (`.navbar.navbar-sticky.navbar-app`, 16 halaman), header logo halaman error (`.navbar.navbar-plain`, 8 halaman), footer aplikasi (`.footer.footer-bar`, 14 halaman) dan footer tengah login/error (`.footer.footer-center`, 10 halaman). Tampilan tidak berubah.
- **Mahasiswa/Alumni dirombak penuh** (daftar dan detail di panel admin KarirLink): daftar memakai tabel standar (No, urut, cari nama/NIM/email, filter Program Studi, Angkatan, Tipe, Status Karier, paginasi, KPI mengikuti filter) dan tanpa avatar; detail berisi profil, progres Tracer Study per gelombang, riwayat karier (Timeline), preferensi karier, dan tabel aktivitas lamaran, tanpa data yang diulang.
- **Yudisium, detail Yudisium, dan detail Arsip Kuesioner** memakai kelas pola tabel baru, sehingga toolbar, tombol aksi, dan badge statusnya seragam.
- **Template Portal Karir didesain ulang** sebagai halaman dengan navbar atas: kartu lowongan, detail satu gulir, dan pelacak lamaran.
