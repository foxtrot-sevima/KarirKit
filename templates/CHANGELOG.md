# Changelog Template

Perubahan **mockup template** KarirLink dan Portal Karir (`templates/karirlink`, `templates/portal-karir`, `templates/custom`). Format [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), tetapi versinya **hanya tanggal** (`## YYYY-MM-DD`); semver `X.Y.Z` khusus komponen design system di `CHANGELOG.md`. Pemisahan ini dimulai dari v1.4.0. Branch kerjanya `mockup/<YYYY-MM-DD>`, terpisah dari `karirkit/<versi>` milik design system.

Aturan singkat:
- Satu commit hanya berisi satu lingkup: design system (`feat(ds)`, `fix(ds)`) atau template (`feat(karirlink)`, `feat(portal-karir)`).
- Template selalu memakai komponen KarirKit terbaru. Butuh komponen atau varian baru? Diminta dan dibuat di KarirKit lebih dulu (kelas, story, JS, `CHANGELOG.md`), baru dipakai di template. Tidak ada komponen atau gaya baru yang hidup hanya di template.
- Tiap tanggal menyebut versi KarirKit yang dipakai ("Dasar KarirKit").
- **Gerbang produksi:** mockup masuk `master`/`release` hanya bila "Dasar KarirKit" adalah versi yang sudah dirilis (bertag). Dasar yang belum rilis ditandai "(belum dirilis)" dan mockupnya tertahan di staging (`dev-karirkit`). Cek dengan `npm run check:templates`.

## 2026-10-26

Dasar KarirKit: v1.4.0 (belum dirilis)

### Added

- **Halaman umum "Segera Hadir"** untuk menu dan tautan yang belum punya halaman: `templates/karirlink/segera-hadir.html` (admin: Kerjasama, Lowongan, Event, Report, dan daftar laporan di Overview) dan `templates/portal-karir/segera-hadir.html` (Portal Karir: Konsultasi karier, Pertanyaan umum, Kebijakan privasi, Syarat dan ketentuan, Lupa kata sandi). Satu tampilan yang sama tanpa teks per halaman, dengan tombol kembali ke Overview atau Beranda.
- **Ekspor Hasil di Kuesioner** (`templates/karirlink/kuesioner.html`): modal unduh jawaban alumni ke Excel seperti fitur Download Hasil di Tracer Study live. Pilih kuesioner, Template Laporan (Kemendikti atau Lengkap), Tahun Lulus dan Program Studi (dropdown Combo KarirKit), dan "Menampilkan data terbaru", lalu progres unduhan. Pengguna Lulusan diunduh langsung tanpa pilihan template. Header kuesioner dirapikan: "Simulasi Tracer" tetap tombol utama, sedangkan Lihat Panduan, QR Tracer, dan Ekspor Hasil masuk menu "Lainnya". Unduhan hanya simulasi.
- **Aktivitas Lamaran Alumni** di admin KarirLink (`templates/karirlink/aktivitas-lamaran.html`): halaman pemantauan lamaran alumni (revamp), dan menu sidebar "Aktivitas Lamaran" kini menautkannya di semua halaman admin.
- **Dua tes baru di katalog Pengembangan Diri** (berstatus segera hadir): Tes Komunikasi dan Kerja Sama, serta Tes Nilai dan Motivasi Kerja.

### Changed

- **Menu akun Portal Karir** dikelompokkan dengan judul bagian "Akun" dan "Karier" dan dipisah garis, di navbar dan drawer akun.
- Judul bagian tes di halaman Pengembangan Diri menjadi "Tes Potensi".

## 2026-10-20

Dasar KarirKit: v1.4.0 (belum dirilis)

### Added

- **Portal Karir: Pengembangan Diri (Tes dan Course)**: halaman Course digabung dengan tes menjadi `pengembangan.html` (daftar tes dan course, baris "Lanjutkan", filter kategori dan level, "Course saya"). Detail dan belajar course dipisah ke `course.html?id=`.
- **Tes Minat Karier RIASEC** (30 pernyataan, 6 tipe, kode Holland) sebagai tiga halaman terpisah: `riasec.html` (detail dan riwayat pengerjaan), `riasec-tes.html` (pengerjaan layar penuh dengan komponen Choice, draf tersimpan otomatis, jawaban lanjut otomatis, pintasan keyboard) dan `riasec-hasil.html` (kode karier, diagram radar, skor per tipe, bidang, lowongan dan course yang cocok).
- **Jalur rekomendasi lowongan dari RIASEC**: hasil tes yang dijadikan acuan dipadukan dengan jawaban onboarding (70:30) untuk persentase cocok di halaman Lowongan, dengan ajakan mengerjakan tes bila belum pernah.

### Changed

- Navbar, drawer, dan footer portal-karir memakai "Pengembangan" (Tes dan Course) menggantikan "Course"; skrip `gen-custom-portal.mjs` menerima nama halaman, dan Storybook memuat halaman baru.
- **Menu "Dashboard" diganti "Overview"** di panel admin KarirLink (label sidebar, tooltip, drawer ponsel, breadcrumb, dan judul halaman) pada semua template `templates/karirlink` dan `templates/custom`.

## 2026-10-13

Dasar KarirKit: v1.4.0 (belum dirilis)

### Changed

- **Navbar dan footer di template memakai komponen baru**: bilah atas aplikasi (`.navbar.navbar-sticky.navbar-app`, 16 halaman), header logo halaman error (`.navbar.navbar-plain`, 8 halaman), footer aplikasi (`.footer.footer-bar`, 14 halaman) dan footer tengah login/error (`.footer.footer-center`, 10 halaman). Tampilan tidak berubah.
- **Mahasiswa/Alumni dirombak penuh** (daftar dan detail di panel admin KarirLink): daftar memakai tabel standar (No, urut, cari nama/NIM/email, filter Program Studi, Angkatan, Tipe, Status Karier, paginasi, KPI mengikuti filter) dan tanpa avatar; detail berisi profil, progres Tracer Study per gelombang, riwayat karier (Timeline), preferensi karier, dan tabel aktivitas lamaran, tanpa data yang diulang.
- **Yudisium, detail Yudisium, dan detail Arsip Kuesioner** memakai kelas pola tabel baru, sehingga toolbar, tombol aksi, dan badge statusnya seragam.
- **Template Portal Karir didesain ulang** sebagai halaman dengan navbar atas: kartu lowongan, detail satu gulir, dan pelacak lamaran.
