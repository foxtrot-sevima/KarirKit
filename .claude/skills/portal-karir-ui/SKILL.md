---
name: portal-karir-ui
description: Aturan UI Portal Karir KarirLink (templates/portal-karir) - merek, komponen, satu halaman satu file, data lewat PK.api, white-label PK_CAMPUS, dan konfigurasi Landing Page (landing.js) yang diatur dari Personalisasi Portal (`templates/karirlink/pengaturan-landing-page.html`; menu sidebar "Personalisasi"). Pakai saat mengubah atau menambah halaman portal.
---

# Portal Karir (`templates/portal-karir/*`)

> **Lingkup template** (sejak v1.4.0): halaman di sini hanya memakai komponen KarirKit terbaru dan versinya berupa tanggal (`templates/CHANGELOG.md`), bukan semver. Butuh komponen baru? Minta dan buat di design system dulu (commit `feat(ds)`), baru dipakai di sini (commit `feat(...)` area template). Detail: skill `karirkit-conventions` bagian 0.

Portal ini untuk pelamar (mahasiswa/alumni), bukan dashboard: navbar atas, tanpa sidebar.

## Merek dan komponen
- Tetap KarirLink: hero `bg-brand-gradient` (sama dengan login/onboarding), aksen `secondary` jingga, logo KarirLink, token design system. Moodboard hanya inspirasi tata letak, bukan warna.
- Navbar menjadi kaca saat digulir (`data-glass-nav` + utilitas `data-[scrolled=true]`); footer selalu menempel di bawah (`body` `flex min-h-screen flex-col`, `main` `flex-1`).
- Pakai komponen KarirKit (Combo, Dropdown, Tabs, Pagination, Modal, Toast, Timeline, Badge, Callout); tanpa `<select>` bawaan. Samakan pola dengan `templates/karirlink`, termasuk `form-label` yang terlihat di atas combo.
- Tidak ada "Ubah Minat" di beranda/lowongan/lamaran: onboarding hanya sekali. Perubahan data pribadi kelak di halaman profil; jangan menautkan `onboarding.html?ubah`.
- Data lewat `PK.api` (lapisan Promise dengan kontrak paginasi/filter sisi server yang didokumentasikan di `portal.js`); halaman tidak membaca `JOBS` langsung.

## Satu halaman = satu file
Halaman dengan tujuan dan tampilan berbeda = satu file HTML sendiri. Jangan menumpuk daftar + detail + pengerjaan + hasil dalam satu file yang berpindah tampilan lewat JS (`?id=`, `?mulai=1`, `?hasil=` di satu file).
- Konten statis ditulis sebagai HTML di file halamannya; JS hanya mengisi bagian dari data/API lewat container ber-id.
- Navigasi antar halaman memakai `<a href>` dan parameter URL (`course.html?id=1`, `riasec-hasil.html?id=...`).
- Kode yang dipakai dua halaman pindah ke `portal.js` (`PK.*`), jangan disalin.
- Pola: `pengembangan.html` (daftar), `course.html` (detail/belajar), `riasec.html` (detail tes), `riasec-tes.html` (pengerjaan, layar penuh), `riasec-hasil.html` (hasil). Halaman baru ditambahkan ke `scripts/gen-custom-portal.mjs` dan ke story Storybook.
- Alamat lama yang sudah beredar boleh diberi redirect kecil.

## White-label kampus (`PK_CAMPUS`)
`portal.js` membaca `window.PK_CAMPUS` (mis. `templates/custom/portal-karir/campus.js`): `name`, `unit`, `logo`, `about`, `address`, `email`, `phone`, `social`, `tracerUrl`. `logo` kosong = logo KarirLink; terisi = avatar logo kampus + "KarirLink" kecil di atas nama kampus (navbar, footer, dan logo di tengah orbit hero). Kotak logo selalu persegi (`object-contain`), jangan melebar mengikuti gambar.

## Konfigurasi Landing Page (`portal-karir/landing.js`)
Diisi admin lewat `templates/karirlink/pengaturan-landing-page.html` (alur mengikuti KarirLink produksi: `Web/UniversityController`, `FooterController`, `resources/views/web/landing-page/setting.blade.php`: section Header, Main, Testimoni (maks 8), Bimbingan Karir, Kontak, Footer (maks 4 tautan); Simpan per section lalu Publish; hanya paket dengan izin `personalize-cdc`).
- `landing.js` dimuat SEBELUM `portal.js` (`<script src="landing.js" data-lp-apply>`): mengisi `PK_CAMPUS` (logo, about, email, phone, address, social) lalu, setelah halaman siap, menerapkan hero (judul/deskripsi/latar), Bimbingan Karier, Cerita alumni, dan tautan footer.
- Kunci simpan mockup: `karirlink-landing-published` (pengunjung) dan `karirlink-landing-draft` (pratinjau `?landing=draft`). Di produksi ganti baca/tulisnya dengan endpoint; kontrak bentuk konfigurasi didokumentasikan di komentar kepala `landing.js`.
- Warna kampus (section **Warna**): `primaryColor` / `secondaryColor` (hex `#rrggbb`; kosong = warna bawaan KarirLink) dan `palettePreset` (hanya untuk mengingat pilihan di editor). `templates/campus-theme.js` (`window.CampusTheme`) membuat skala 50-950 dari satu warna dasar (dasar = 600) dan menimpa token `--color-primary-*` / `--color-secondary-*` di `<html>`. Skrip ini WAJIB ada sinkron di `<head>` (`<script src="../campus-theme.js"></script>` tepat setelah `dist/output.css`) di setiap halaman baru, baik portal maupun admin `templates/karirlink`, supaya warna kampus berlaku di seluruh produk tanpa kedipan. Halaman cukup memakai token (`bg-primary-600`, `text-primary-700`); jangan menulis hex warna merek di halaman. Warna utama wajib kontras >= 4,5:1 dengan putih (`CampusTheme.contrast`). Versi white-label `templates/custom` tidak memuatnya (generator membuangnya). Editor memanggil `CampusTheme.refresh()` setelah Publish/Atur Ulang.
- Section yang bisa disembunyikan: Testimoni Alumni dan Bimbingan Karir (`showTestimonials` / `showGuide`).
- Pratinjau editor memuat portal di iframe 1280px yang diskalakan; jangan memakai `scrollIntoView` dari dalam iframe (ikut menggulir pembungkus di halaman induk) dan kembalikan posisi scroll hanya setelah isi portal selesai dirender.
