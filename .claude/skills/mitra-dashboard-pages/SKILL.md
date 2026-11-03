---
name: mitra-dashboard-pages
description: Dashboard mitra perusahaan di templates/mitra - kerangka sidebar + topbar (disalin dari admin KarirLink), daftar menu lengkap mengikuti fitur peran perusahaan di aplikasi KarirLink, halaman yang sudah ada (Profil Perusahaan, Pengaturan, Segera Hadir), dan hubungannya dengan pendaftaran mitra di Portal Karir. Pakai saat menambah atau mengubah halaman mitra.
---

# Dashboard mitra (`templates/mitra/*.html`)

> **Lingkup template**: sama seperti `karirlink` dan `portal-karir` (versi berupa tanggal di `templates/CHANGELOG.md`, commit `feat(mitra)`, hanya komponen KarirKit terbaru, tanpa `<style>` komponen).

## Siapa dan di mana
- **Mitra** = perusahaan yang memasang lowongan. Pendaftaran guest ada di Portal Karir: `templates/portal-karir/mitra-daftar.html` lalu `mitra-status.html` (verifikasi email, verifikasi perusahaan oleh tim KarirLink, kerja sama kampus opsional). Dashboard ini yang dipakai setelah itu.
- Admin kampus melihat mitra di `templates/karirlink/kerjasama.html`; dashboard mitra terpisah dari panel admin kampus dan dari portal pelamar.

## Kerangka
Salin dari halaman admin karirlink (head, sidebar, drawer menu, topbar, skrip sidebar/combo/tooltip); `<base href="/templates/mitra/">`. Tanpa `campus-theme.js` dan `admin-brand.js`: sidebar selalu logo KarirLink dan warna bawaan. Identitas pengguna di topbar: penanggung jawab perusahaan (mis. Dewi Anggraini, Admin Perusahaan).

## Menu (semua ditampilkan; yang belum dibuat menuju `segera-hadir.html?menu=<Nama>`)
Mengikuti fitur peran perusahaan di aplikasi KarirLink:
- Overview
- **Rekrutmen**: Lowongan (daftar, buat, ubah, tutup, pelamar + catatan, unduh pelamar), Rekomendasi Kandidat
- **Talent**: Cari Talent (riwayat pencarian), Talenta Saya (unduh), Undangan
- **Kerjasama**: Kampus Mitra, Kegiatan Kolaborasi, Job Fair (campaign)
- **Komunikasi**: Pesan, Pengikut
- **Perusahaan**: Profil Perusahaan, Pengaturan, Premium

Menambah halaman: ubah daftar menu di semua halaman mitra (sidebar dan drawer), ganti tautan Segera Hadir menjadi file barunya.

## Halaman yang ada
- `profil.html`: informasi umum (nama dan NIB baca-saja karena terverifikasi), kontak dan alamat, media sosial, logo, kelengkapan profil (dihitung di browser).
- `pengaturan.html`: akun, kata sandi, tim perekrut (tabel KKTable, undang, hapus), notifikasi email.
- `kampus-mitra.html` (+ `kampus-cari.html`): kampus yang bermitra (undangan masuk, pengajuan, berhasil bergabung, ditolak) dan pencarian kampus untuk mengajukan kerja sama. Mengikuti rute `collaboration/partner`, `search`, dan `search-list` di aplikasi.
- `kegiatan-kolaborasi.html` (+ `kegiatan-kolaborasi-form.html`): kegiatan yang diajukan ke kampus mitra (beasiswa, kewirausahaan, pelatihan, seminar, pameran karier), dengan persetujuan kampus. Mengikuti rute `collaboration/activity`.
- `job-fair.html`: job fair dari kampus mitra; perusahaan ikut dengan memilih lowongan yang ditampilkan di halaman campaign Portal Karir kampus.
- `segera-hadir.html`: placeholder; menu yang diklik tetap aktif lewat `?menu=`.

## Aturan
- Detail baris memakai **Modal** (`z-[60]`, di atas sidebar), bukan Drawer, supaya tidak perlu blok `<style>` penaik z-index.
- Form: kolom wajib bertanda `*` merah, pesan galat `form-error`, simpan hanya simulasi (toast), tanpa panggilan API.
- Tabel dan combo mengikuti skill `karirlink-admin-pages` (No, Title Case, aksi berupa tombol berikon, tanpa kebab).
- Hindari angka real-time dari server (jumlah peserta, dilihat sekian kali) pada kartu dan daftar.
