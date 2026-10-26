# Changelog Template

Perubahan **mockup template** KarirLink dan Portal Karir (`templates/karirlink`, `templates/portal-karir`, `templates/custom`). Format [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), tetapi versinya **hanya tanggal** (`## YYYY-MM-DD`); semver `X.Y.Z` khusus komponen design system di `CHANGELOG.md`. Pemisahan ini dimulai dari v1.3.7. Branch kerjanya `mockup/<YYYY-MM-DD>`, terpisah dari `karirkit/<versi>` milik design system.

Aturan singkat:
- Satu commit hanya berisi satu lingkup: design system (`feat(ds)`, `fix(ds)`) atau template (`feat(karirlink)`, `feat(portal-karir)`).
- Template selalu memakai komponen KarirKit terbaru. Butuh komponen atau varian baru? Diminta dan dibuat di KarirKit lebih dulu (kelas, story, JS, `CHANGELOG.md`), baru dipakai di template. Tidak ada komponen atau gaya baru yang hidup hanya di template.
- Tiap tanggal menyebut versi KarirKit yang dipakai ("Dasar KarirKit").
- **Gerbang produksi:** mockup masuk `master`/`release` hanya bila "Dasar KarirKit" adalah versi yang sudah dirilis (bertag). Dasar yang belum rilis ditandai "(belum dirilis)" dan mockupnya tertahan di staging (`dev-karirkit`). Cek dengan `npm run check:templates`.

## 2026-10-20

Dasar KarirKit: v1.3.7 (belum dirilis)

### Added

- **Portal Karir: Pengembangan Diri (Tes dan Course)**: halaman Course digabung dengan tes menjadi `pengembangan.html` (daftar tes dan course, baris "Lanjutkan", filter kategori dan level, "Course saya"). Detail dan belajar course dipisah ke `course.html?id=`.
- **Tes Minat Karier RIASEC** (30 pernyataan, 6 tipe, kode Holland) sebagai tiga halaman terpisah: `riasec.html` (detail dan riwayat pengerjaan), `riasec-tes.html` (pengerjaan layar penuh dengan komponen Choice, draf tersimpan otomatis, jawaban lanjut otomatis, pintasan keyboard) dan `riasec-hasil.html` (kode karier, diagram radar, skor per tipe, bidang, lowongan dan course yang cocok).
- **Jalur rekomendasi lowongan dari RIASEC**: hasil tes yang dijadikan acuan dipadukan dengan jawaban onboarding (70:30) untuk persentase cocok di halaman Lowongan, dengan ajakan mengerjakan tes bila belum pernah.

### Changed

- Navbar, drawer, dan footer portal-karir memakai "Pengembangan" (Tes dan Course) menggantikan "Course"; skrip `gen-custom-portal.mjs` menerima nama halaman, dan Storybook memuat halaman baru.
- **Menu "Dashboard" diganti "Overview"** di panel admin KarirLink (label sidebar, tooltip, drawer ponsel, breadcrumb, dan judul halaman) pada semua template `templates/karirlink` dan `templates/custom`.

## 2026-10-13

Dasar KarirKit: v1.3.7 (belum dirilis)

### Changed

- **Navbar dan footer di template memakai komponen baru**: bilah atas aplikasi (`.navbar.navbar-sticky.navbar-app`, 16 halaman), header logo halaman error (`.navbar.navbar-plain`, 8 halaman), footer aplikasi (`.footer.footer-bar`, 14 halaman) dan footer tengah login/error (`.footer.footer-center`, 10 halaman). Tampilan tidak berubah.
- **Mahasiswa/Alumni dirombak penuh** (daftar dan detail di panel admin KarirLink): daftar memakai tabel standar (No, urut, cari nama/NIM/email, filter Program Studi, Angkatan, Tipe, Status Karier, paginasi, KPI mengikuti filter) dan tanpa avatar; detail berisi profil, progres Tracer Study per gelombang, riwayat karier (Timeline), preferensi karier, dan tabel aktivitas lamaran, tanpa data yang diulang.
- **Yudisium, detail Yudisium, dan detail Arsip Kuesioner** memakai kelas pola tabel baru, sehingga toolbar, tombol aksi, dan badge statusnya seragam.
- **Template Portal Karir didesain ulang** sebagai halaman dengan navbar atas: kartu lowongan, detail satu gulir, dan pelacak lamaran.
