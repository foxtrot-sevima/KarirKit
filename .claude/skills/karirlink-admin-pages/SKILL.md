---
name: karirlink-admin-pages
description: Pola halaman admin KarirLink di templates/karirlink - tabel (toolbar, No, aksi, filter KKTable), kartu KPI, grafik, combo, modal/drawer (z-index di atas sidebar), merek kampus white-label (admin-brand.js), dan cara membangun halaman admin baru dari halaman yang sudah ada. Pakai saat membuat atau memigrasi halaman admin.
---

# Halaman admin KarirLink (`templates/karirlink/*.html`)

> **Lingkup template** (sejak v1.4.0): halaman di sini hanya memakai komponen KarirKit terbaru dan versinya berupa tanggal (`templates/CHANGELOG.md`), bukan semver. Butuh komponen baru? Minta dan buat di design system dulu (commit `feat(ds)`), baru dipakai di sini (commit `feat(...)` area template). Detail: skill `karirkit-conventions` bagian 0.

Referensi terbaik: `mahasiswa-alumni.html` (tabel + KPI + combo), `yudisium.html`, `yudisium-detail.html`, `aktivitas-lamaran.html` (KPI, pita status, grafik, laci detail), `pengaturan-landing-page.html` (editor + pratinjau). Bangun halaman baru dengan menyalin kerangka (head, sidebar, drawer menu, topbar) dari salah satunya, lalu ganti judul/meta/breadcrumb dan penanda menu aktif (`nav-item-active` di sidebar **dan** drawer menu).

## Tabel (komponen `.table` + `assets/js/table.js`)
1. Header **Title Case** ("Periode Yudisium"), tidak huruf besar semua.
2. Setiap tabel punya kolom **No** (`.table-col-num` + `data-num`), selalu terlihat di semua breakpoint; `table.js` menomori ulang sesuai urutan tampil.
3. Footer = `.table-footer` dengan `<span data-table-info>` (kiri) + `<nav data-table-pages>` (kanan); tanpa pilihan baris per halaman. Tambah `data-table-empty` untuk keadaan kosong.
4. Aksi baris berupa tautan teks atau `btn-outline btn-sm table-action` berikon (ikon + label dari `xl`, ikon saja di bawahnya, header kolom "Aksi" terlihat). **Tidak ada menu titik tiga (kebab).**
5. Toolbar: **pencarian di kiri, filter/aksi sebagai dropdown di kanan** (`.table-toolbar` + `.table-search` + `.table-filters`; `.table-toolbar-many` bila 4+ filter). Tanpa tab status berbentuk pil; filter status = dropdown combo.
6. Kolom nama alumni/mahasiswa: tanpa avatar, NIM di bawah nama (`NIM 2111500101`); di layar kecil (<sm) hanya nama + NIM (boleh satu baris info penting, mis. posisi). Pencarian juga mencocokkan NIM.
7. Tanpa scroll horizontal di 390/768/1024+: pakai `.table-fit`, jangan beri lebar kolom tetap, sembunyikan teks sekunder di bawah `xl`; kolom sekunder `hidden lg:table-cell` dan sejenisnya.
8. Filter khusus halaman lewat `KKTable.get(root).addFilter(fn)` + `table.refresh()`, dan dengarkan event `table:render` (`e.detail.visible`) untuk menghitung KPI. `table.js` hanya mendukung SATU `[data-table-filter-label]`.
9. Aksi massal: kolom checkbox + `.table-bulk` + modal konfirmasi + `KKToast`; hanya baris yang layak yang checkbox-nya aktif.

## Combo (pengganti `<select>`)
Markup `data-combo` + skrip combo disalin ke tiap halaman (belum ada di `assets/js`). Isi `data-combo-list` boleh diisi JS **sebelum** skrip combo dijalankan. Label dan `is-selected` diubah manual bila nilai diubah lewat kode; `combochange` tidak ditembakkan oleh pengubahan programatik.

## KPI, grafik
- KPI: `.stat-grid` (`style="--stat-cols: N; --stat-lg: M"`) berisi `.stat-card` > `.stat-icon` + `.stat-value` + `.stat-label` (+ `.stat-note`).
- Grafik: komponen chart (`assets/js/vendor/apexcharts.min.js` + `assets/js/chart.js`), markup `data-chart="column|bar|donut|..."` atau `KKChart.render(el, type, {series, categories, stacked, colors, height})` untuk data dinamis (memanggil ulang akan menghancurkan lalu menggambar ulang).

## Modal dan Drawer di atas sidebar
Sidebar karirlink ber-`z-50`, di atas lapisan overlay bawaan (z 40; backdrop drawer z 30). Akibatnya backdrop tidak menggelapkan sidebar kecuali dinaikkan:
- Modal: `class="modal-backdrop z-[60]"`.
- Drawer detail: saat terbuka beri kelas pada `body` (dari event `drawer:show`/`drawer:hide`) dan naikkan `.drawer-backdrop` (z 59) dan drawernya (z 60). Menu mobile tidak ikut dinaikkan.
- Verifikasi dengan `document.elementFromPoint` di atas sidebar/topbar: harus mengenai backdrop, terang maupun gelap.
- Responsif: laci kanan di >= 640px, lembar bawah di bawahnya (`data-drawer-placement` diatur sebelum `KKDrawer.open`).

## Merek kampus di admin (white-label)
`admin-brand.js` (dimuat paling akhir di setiap halaman admin) mengganti logo di sidebar, sidebar terlipat, dan drawer menu dengan logo kampus + nama kampus bila "Logo Career Center" sudah dipublikasikan di Personalisasi Portal. Tata letaknya sama dengan `templates/custom/index.html`: avatar persegi 48px (40px saat dilipat), "Karirlink" kecil di atas nama kampus (maks. 2 baris, 13px bila membungkus), logo `object-contain` dengan inisial sebagai cadangan. Halaman admin baru harus memuat `<script src="admin-brand.js"></script>`. Panggil `KarirAdminBrand.apply()` setelah logo terbit/dihapus.

Warna kampus: setiap halaman admin memuat `<script src="../campus-theme.js"></script>` sinkron di `<head>`, tepat setelah `dist/output.css`. Skrip itu menimpa token `--color-primary-*` / `--color-secondary-*` dari warna yang dipublikasikan di Personalisasi Portal (kosong = bawaan KarirLink), jadi pakai token, bukan hex merek. Detail di skill `portal-karir-ui`.

## Menu sidebar
Link menu ada di dua tempat per halaman (sidebar desktop dan drawer menu). Saat menambah halaman, ubah keduanya di semua halaman admin yang memuat menu.
