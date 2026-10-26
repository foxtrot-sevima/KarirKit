---
name: karirkit-figma-sync
description: Sinkron library Figma dengan KarirKit - aturan penomoran (SemVer untuk Figma), versi Figma = tag repo, token Figma = @theme di src/input.css, format changelog Figma, Known Issues KK-xxx, alur rilis Figma, Variable Modes (Brand/Legacy), project dinamis vs freeze, Code Connect, dan catatan API Figma. Pakai saat menyiapkan rilis, mengubah token/komponen yang juga ada di Figma, atau bekerja di file Figma KarirKit.
---

# Sinkron KarirKit dengan Figma

Sumber lengkap (status, ID node, riwayat) ada di `karirkit-figma-versioning.md` dan `karirkit-figma-library.md` di akar repo. Skill ini hanya memuat **aturan dan keputusan**; status seperti "versi Live saat ini" dibaca dari dokumen itu, bukan dari sini.

## 1. Prinsip
1. **Satu identitas library.** File library yang sudah dipublish dan dipakai file lain tidak boleh diganti hasil duplikasi (instance di file konsumen putus). Versi dilacak lewat Named Version + catatan publish.
2. **Versi di nama file, bukan di nama elemen.** Komponen, variabel, style, dan layer tetap bersih (`Button`, bukan `Button [1.3.5]`).
3. **Versi Figma = tag repo = entri changelog.** `v1.3.5` di GitHub = Named Version `v1.3.5` di Figma = `## [1.3.5]` di `CHANGELOG.md`.
4. **Backup itu beku**: snapshot rilis tidak diedit, tidak dipublish (kecuali salinan LTS yang sengaja), editor view-only.
5. **Setiap perubahan punya jejak**: entri changelog, deskripsi komponen, Named Version.

## 2. Aturan penomoran (SemVer untuk Figma)
- **MAJOR (2.0.0)**: perubahan merusak: rename/hapus komponen, variant property, nama variabel atau koleksi; apa pun yang membuat override di file konsumen reset atau instance terputus. Rename layer atau property di dalam komponen juga dihitung breaking.
- **MINOR (1.4.0)**: tambah komponen, variant, token, atau perubahan visual yang tidak merusak.
- **PATCH (1.3.5)**: perbaikan bug, alignment, spacing, binding variabel salah, dokumentasi.
- Versi **hanya milik design system** (selaras dengan `karirkit-conventions` bagian 0). Mockup template tidak punya semver.
- **Keputusan terbuka (owner rilis):** repo memakai seri 1.3.x untuk rilis yang menambah komponen (mis. 1.3.5 memuat Stat Card), padahal aturan di atas menghitungnya MINOR. Pilih (a) tetap seri 1.3.x dan tulis "penambahan komponen = patch selama seri 1.3.x", atau (b) SemVer ketat dengan menaikkan ke 1.4.0 (repo ikut diberi tag baru). Sampai diputuskan, versi Figma mengikuti tag repo.

## 3. Token harus sama dengan kode
- Variabel Figma = `@theme` di `src/input.css`: **nama dan nilai** sama. Koleksi: Primitive, Colors (mode Light/Dark: `semantic/*`, `color/<palet>/<50..950>`), Utilities (spacing, radius, border, container, screen, z, motion), Typography, `.Component` (disembunyikan dari publish). Style: teks (`text/<ukuran>/<weight>`, `heading/h1..h6`, `label/eyebrow`, `code/*`), efek (`shadow/*`, `glow/*`, `ring/*`), paint (`brand/gradient*`, `gradient/*`).
- `--animate-*` adalah keyframe CSS, tidak punya padanan variabel.
- Setiap rilis: bandingkan `@theme` versi lama vs baru; ada selisih token = ada entri changelog Figma dan pembaruan variabel.
- Binding variabel dan style wajib benar; tidak ada hex literal baru tanpa alasan (pengecualian yang diketahui: warna grafik).
- Token baru di repo (lewat permintaan template, lihat `karirkit-conventions` bagian 0) wajib masuk Figma di rilis yang sama.

## 4. Struktur Figma
- Project: `00 Index` (file "Index & Changelog", pintu masuk), `01 Live` (library yang dipublish), `02 Draft` (duplikat kerja; plan tanpa branch), `03 Archive` (backup beku, satu per rilis), `04 Templates` (satu file per fitur).
- Halaman library: Cover (status, owner, tanggal, link tag), Changelog (satu frame per versi, terbaru di atas), Foundations, Components, Symbol, Templates ringkas, Draft/WIP, Deprecated (bertahan minimal satu rilis minor).
- Draft = duplikat file Live. Saat rilis, terapkan perubahan ke Live (komponen berubah diedit di tempat; komponen baru boleh disalin); **jangan menimpa Live dengan duplikat**.

## 5. Format changelog Figma (per versi)
```
## [x.y.z] — YYYY-MM-DD   (Draft | Released)
Repo tag: vx.y.z · Named Version: vx.y.z · Backup: <nama file backup>
### Added / Changed / Fixed (sebut ID KK-xxx) / Deprecated-Removed
### Breaking & Migration notes
### Known issues (masih terbawa)
```
- **Known Issues register**: daftar ber-ID `KK-001…` (ID, deskripsi, ditemukan di versi, status Open / Fixed di x.y.z / Won't fix). Perbaikan bug menyebut ID-nya.
- Kolom Description komponen: `Since x.y.z` atau `Changed x.y.z — ringkasan`. Di Draft pakai label `NEW`/`CHANGED`/`FIXED`, dihapus saat rilis.

## 6. Alur rilis Figma (mengikuti rilis repo)
Hanya dijalankan saat ada rilis design system (perintah rilis eksplisit, lihat `karirkit-release`).
1. Persiapan: entri `[x.y.z] (Draft)` di Changelog Figma.
2. Freeze versi lama: Named Version `v<lama>`, duplikat ke Archive `— Backup <tanggal>`, matikan publish, view-only.
3. Draft: kerjakan di duplikat; perbarui entri tiap perubahan.
4. Review: checklist di bawah.
5. Rilis: terapkan ke Live, rename file ke `[x.y.z]`, Named Version `vx.y.z` (deskripsi = ringkasan changelog), publish library dengan catatan yang sama, Cover = Released, tag repo, backup ke Archive.
6. Pasca rilis: perbarui Index, bagikan changelog, buat Draft versi berikutnya.

**Checklist review:** token sama dengan `@theme` · tidak ada nomor versi di nama elemen · variant/property baru mengikuti penamaan yang ada · binding benar · Light dan Dark dicek · deskripsi dan changelog terisi dengan link node valid · breaking change punya migration note · Known Issues diperbarui · Code Connect diperbarui bila komponen berubah.

## 7. Variable Modes dan project freeze
- Perubahan token yang boleh berbeda antar halaman dikelola dengan koleksi `Brand`: mode `Default` (terbaru) dan `Legacy <versi>` (dibekukan). `Colors/semantic/*` menjadi alias ke `Brand/*`; mode Light/Dark tidak diubah.
- Mode hanya menggerakkan variabel; perubahan layout/struktur komponen tidak bisa lewat mode. Untuk itu pakai library LTS (`KarirKit Design System [x.y.z] — LTS`, jangan aktif bersamaan dengan Live di file yang sama) atau variant property. Jangan detach instance.
- Sebelum mengubah nilai `Default` yang berdampak luas, duplikat dulu menjadi `Legacy <versi>` dan kunci halaman yang harus tetap.
- **Project Registry** (di file Index): per file konsumen: link, status Dinamis/Freeze, mode `Brand`, versi dibekukan, alasan, library Live/LTS, owner, tanggal tinjau ulang (wajib untuk Freeze). Tiap rilis: cek semua project Dinamis, tinjau Freeze yang lewat tanggal.

## 8. Template di Figma
- File template per fitur: `<Nama halaman>, <platform> [...]` di project 04; versi lama dibekukan saat versi baru dibuat. Instance tetap menunjuk library Live, jadi file lama tidak menjamin tampilan lama.
- **Perlu penyesuaian dengan kebijakan baru:** dokumen versioning (bagian 14) memberi nomor library `[x.y.z]` pada nama file template, sedangkan template mockup sekarang berversi **tanggal** (`karirkit-conventions` bagian 0). Usulan: nama file template memakai tanggal revisi (`[YYYY-MM-DD]`) dan mencatat "Dasar KarirKit: vX.Y.Z"; sampai disetujui reviewer, pakai aturan lama di dokumen. Jangan ubah dokumen sumber tanpa persetujuan owner.
- Perubahan template yang butuh komponen baru: komponen dibuat di KarirKit (kode dan Figma) dulu, baru dipakai di template.

## 9. Code Connect
Dipetakan **setelah rilis ke Live** (node Live, bukan Draft), sumber berupa file story (`stories/Components/<nama>/*.stories.js`), properti Figma dipetakan ke kelas (mis. `tone` -> varian `.stat-card`). Komponen halaman template bukan komponen DS: cukup catatan di Description. Butuh seat Dev atau Full di plan Figma.

## 10. Catatan API Figma (untuk pekerjaan lewat MCP/skrip)
- Resize layer anak di dalam instance diabaikan; resize root instance atau bangun komponen sendiri.
- Fill/stroke terikat variabel yang sama dengan default bisa jadi hitam saat di-override; lewati override jika sama atau kirim warna hasil resolve. Opacity pada paint terikat dipatch setelah assignment, di call terpisah, dan tidak ikut ke instance.
- Mengganti ikon Button mereset warna vektor (ikat ulang fill VECTOR). Anak FILL di parent vertikal hug tidak menumbuhkan parent (pakai hug + minHeight). Mengatur lineHeight melepas text style.
- `isExposedInstance` hanya bisa diset setelah node ada di component/set; rotasi tidak bisa dioverride di instance.
- Aset berwarna (bendera, pembayaran, logo, berkas) di repo dibangkitkan dari `npm run assets:classes`; di Figma disusun sebagai komponen/variant (`Style` Default/Black/White/Disabled/Gray/Solid) dan namanya tidak boleh bentrok dengan komponen ikon (mis. `kk-flag`, `kk-file`).
- Perubahan yang hanya ada di repo (Storybook, build) tidak perlu masuk Figma; cukup dicatat di `CHANGELOG.md`.
