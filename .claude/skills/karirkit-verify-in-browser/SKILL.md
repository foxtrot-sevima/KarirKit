---
name: karirkit-verify-in-browser
description: Cara memverifikasi halaman template KarirKit/KarirLink di browser - menyajikan repo lewat HTTP (karena <base href> absolut), cek desktop 1440 dan ponsel 390 tanpa overflow, build CSS setelah menambah kelas, dan aturan aman memakai browser. Pakai sebelum menyatakan perubahan UI selesai.
---

# Verifikasi halaman di browser

1. **Build CSS dulu bila menambah kelas utilitas baru:** `npm run build` (menulis `dist/output.css`; file ini tidak di-commit, jalankan juga setelah clone atau ganti branch). Kelas Tailwind yang belum pernah dipakai tidak ada di CSS sampai di-build.
2. **Sajikan repo lewat HTTP dari akar repo** (`npx http-server .` atau server statis apa pun). Beberapa halaman memakai `<base href="/templates/karirlink/" />` sehingga tidak berfungsi dibuka lewat `file://`. Buka mis. `http://localhost:<port>/templates/karirlink/aktivitas-lamaran.html`.
3. **Periksa dua ukuran:** 1440 px dan 390 px. Pastikan tidak ada scroll horizontal (`document.documentElement.scrollWidth <= clientWidth`), overlay tidak terpotong, dan pola interaksi berganti untuk ponsel (lihat skill `karirkit-conventions`).
4. **Konsol bersih:** tidak ada error JS saat memuat dan saat berinteraksi (klik filter, buka modal/laci, ganti format).
5. **Overlay vs sidebar:** untuk modal/laci di halaman karirlink, uji dengan `document.elementFromPoint` di atas sidebar/topbar (harus mengenai backdrop).
6. **Aman memakai browser:** jangan `taskkill`/`pkill chrome.exe` untuk membersihkan alat uji - itu bisa menutup jendela browser rekan. Jalankan browser uji dengan profil terpisah (`--user-data-dir`) dan hentikan hanya proses yang Anda mulai sendiri; begitu pula server statisnya (hentikan lewat PID/port Anda).
7. **Screenshot penuh halaman** dengan elemen `sticky`/`fixed` menampilkan artefak (navbar muncul di tengah halaman); gulir lalu ambil screenshot viewport untuk menilai tampilan sebenarnya.
