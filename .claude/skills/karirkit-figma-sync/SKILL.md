---
name: karirkit-figma-sync
description: Sinkron library Figma dengan KarirKit - aturan penomoran (SemVer untuk Figma), versi Figma = tag repo, token Figma = @theme di src/input.css, format changelog Figma, Known Issues KK-xxx, alur rilis Figma, Variable Modes (Brand/Legacy), project dinamis vs freeze, Code Connect, dan catatan API Figma. Pakai saat menyiapkan rilis, mengubah token/komponen yang juga ada di Figma, atau bekerja di file Figma KarirKit.
---

# Sinkron KarirKit dengan Figma

Sumber lengkap (status, ID node, riwayat, rencana catch-up) ada di `karirkit-figma-versioning.md` dan `karirkit-figma-library.md` di folder skill ini. Skill ini hanya memuat **aturan dan keputusan**; status seperti "versi Live saat ini" dan daftar pekerjaan dibaca dari dokumen itu, bukan dari sini.

## 0. Dua lingkup, dua jalur (mengikuti `karirkit-conventions` bagian 0)
Repo memisahkan **Design System** dan **Mockup template**; Figma mengikuti pemisahan yang sama.

| | Design System | Mockup template |
|---|---|---|
| Isi di Figma | File library (variabel, style, komponen, ikon) dan template contoh DS (Autentifikasi, Error, Dashboard; di repo `templates/` akar) | Template KarirLink, Portal Karir, custom: satu file per fitur |
| Versi | semver `X.Y.Z` = tag repo = Named Version | **tanggal** `YYYY-MM-DD` + "Dasar KarirKit: vX.Y.Z" (tanpa Named Version, tanpa tag) |
| Pemicu pekerjaan Figma | rilis design system (perintah rilis eksplisit, `karirkit-release`) | batch mockup yang sudah masuk `master` (satu tanggal), bukan tiap commit |
| Nama file | `KarirKit Design System [x.y.z]`; template contoh DS `<Nama>, KarirKit [x.y.z]` | `<Nama halaman>, KarirLink [YYYY-MM-DD]` atau `..., Portal Karir [YYYY-MM-DD]` |
| Changelog di Figma | satu frame per versi di halaman Changelog library | satu frame per tanggal di halaman "Mockup Changelog" file Index (cermin `templates/CHANGELOG.md`) |
| Dipublish, backup | ya (library; backup beku di Archive) | tidak (file template tidak dipublish; revisi lama dibekukan) |

- Mockup **hanya memakai komponen yang sudah ada di library Live**. Butuh komponen atau variant baru: dibuat dulu di KarirKit (kode, story, Figma, rilis DS), baru dipakai di mockup. Ini versi Figma dari gerbang produksi: "Dasar KarirKit" sebuah file mockup tidak boleh lebih baru dari versi library yang Live di Figma.
- Pekerjaan di repo tidak otomatis berarti pekerjaan Figma. Hanya tampilan yang dibutuhkan developer/QA yang digambar (state default); perilaku dinamis cukup dicatat di Description frame.

## 1. Prinsip
1. **Satu identitas library.** File library yang sudah dipublish dan dipakai file lain tidak boleh diganti hasil duplikasi (instance di file konsumen putus). Versi dilacak lewat Named Version + catatan publish.
2. **Versi di nama file, bukan di nama elemen.** Komponen, variabel, style, dan layer tetap bersih (`Button`, bukan `Button [x.y.z]`).
3. **Versi Figma = tag repo = entri changelog.** `vX.Y.Z` di GitHub = Named Version `vX.Y.Z` di Figma = `## [X.Y.Z]` di `CHANGELOG.md`.
4. **Backup itu beku**: snapshot rilis tidak diedit, tidak dipublish (kecuali salinan LTS yang sengaja), editor view-only.
5. **Setiap perubahan punya jejak**: entri changelog, deskripsi komponen, Named Version.

## 2. Aturan penomoran (SemVer untuk Figma)
- **MAJOR (angka pertama naik)**: perubahan merusak: rename/hapus komponen, variant property, nama variabel atau koleksi; apa pun yang membuat override di file konsumen reset atau instance terputus. Rename layer atau property di dalam komponen juga dihitung breaking.
- **MINOR (angka kedua naik)**: tambah komponen, variant, token, atau perubahan visual yang tidak merusak.
- **PATCH (angka ketiga naik)**: perbaikan bug, alignment, spacing, binding variabel salah, dokumentasi.
- Versi **hanya milik design system** (selaras dengan `karirkit-conventions` bagian 0). Mockup template tidak punya semver.
- **Keputusan: SemVer ketat.** Penambahan komponen = MINOR; seri patch hanya untuk perbaikan. Versi lama yang pernah dinomori ad hoc dibiarkan, tidak dinomori ulang. Versi Figma mengikuti tag repo.

## 3. Token harus sama dengan kode
- Variabel Figma = `@theme` di `src/input.css`: **nama dan nilai** sama. Koleksi: Primitive, Colors (mode Light/Dark: `semantic/*`, `color/<palet>/<50..950>`), Utilities (spacing, radius, border, container, screen, z, motion), Typography, `.Component` (disembunyikan dari publish). Style: teks (`text/<ukuran>/<weight>`, `heading/h1..h6`, `label/eyebrow`, `code/*`), efek (`shadow/*`, `glow/*`, `ring/*`), paint (`brand/gradient*`, `gradient/*`).
- `--animate-*` adalah keyframe CSS, tidak punya padanan variabel.
- Setiap rilis: bandingkan `@theme` versi lama vs baru; ada selisih token = ada entri changelog Figma dan pembaruan variabel.
- Binding variabel dan style wajib benar; tidak ada hex literal baru tanpa alasan (pengecualian yang diketahui: warna grafik).
- Token baru di repo (lewat permintaan template, lihat `karirkit-conventions` bagian 0) wajib masuk Figma di rilis yang sama.

## 4. Struktur Figma
- Project: `00 Index` (file "Index & Changelog", pintu masuk; memuat Project Registry dan halaman "Mockup Changelog"), `01 Live` (library yang dipublish), `02 Draft` (duplikat hanya untuk percobaan berisiko, bukan jalur rilis; plan tanpa branch), `03 Archive` (backup beku, satu per rilis DS), `04 Templates` (satu file per fitur; template contoh DS berversi `[x.y.z]`, mockup berversi `[YYYY-MM-DD]`, bagian 8).
- Halaman library: Cover (status, owner, tanggal, link tag), Changelog (satu frame per versi, terbaru di atas), Foundations, Components, Symbol, Templates ringkas, Draft/WIP, Deprecated (bertahan minimal satu rilis minor).
- **Live adalah ruang kerja.** Perubahan di Live tidak terlihat oleh file konsumen sampai Publish, jadi komponen dibangun dan diedit langsung di Live (lewat MCP/skrip atau manual), tanpa menyalin dari Draft. Draft duplikat hanya untuk percobaan berisiko (ubah struktur banyak komponen); yang sudah matang dibangun ulang di Live, bukan dihapus lalu ditempel.
- **Jangan hapus lalu tempel komponen yang sudah ada** (ikon, komponen template, apa pun yang sudah dipublish): komponen berganti key dan instance di file konsumen putus. Komponen yang berubah diedit di tempat (rename variant boleh bila hanya menambah property berdefault); komponen baru dibuat di Live, atau ditempel sekali dengan memilih **hanya** yang baru. Setelah menempel, periksa instance yang menunjuk komponen remote (`mainComponent.remote`) atau tanpa parent dan arahkan ke komponen lokal. Jangan Publish di tengah pekerjaan; tidak ada hotfix selagi pekerjaan belum selesai (pulihkan dari Named Version bila perlu).

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
Hanya dijalankan untuk rilis **design system** (perintah rilis eksplisit, lihat `karirkit-release`); alur untuk mockup ada di bagian 8.
1. Persiapan: entri `[x.y.z] (Draft)` di Changelog Figma.
2. Titik aman: Named Version `v<lama>` di Live (bisa dipulihkan lewat Version history). Backup Archive dibuat sekali saat rilis (langkah 5).
3. Kerjakan langsung di Live (jangan Publish dulu); perbarui entri `[x.y.z] (Draft)` tiap perubahan.
4. Review: checklist di bawah.
5. Rilis: rename file ke `[x.y.z]`, Named Version `vx.y.z` (deskripsi = ringkasan changelog), publish library dengan catatan yang sama, Cover dan Changelog = Released (tanggal), tag repo, duplikat Live ke Archive `[x.y.z] — Backup <tanggal>` (matikan publish, view-only).
6. Pasca rilis: perbarui Index, bagikan changelog, lanjut ke versi berikutnya langsung di Live.

**Urutan terhadap rilis repo.** Rilis repo (merge `master`/`release`, publish npm, tag `vX.Y.Z`) berjalan lebih dulu dan **tidak menunggu Figma**; Figma dikerjakan sesudahnya, dan tag repo menjadi acuan nomor Named Version. Named Version dan publish library dikerjakan manual di UI Figma (tidak ada tool MCP-nya); isinya disalin dari section `CHANGELOG.md` repo. Selisih antara repo dan Figma dicatat di Index ("Repo vX.Y.Z · Figma vA.B.C").

**Catch-up (Figma tertinggal beberapa versi dari repo).** Status saat ini (versi Live, selisih, isi per versi) dibaca di dokumen versioning bagian 16, bukan di skill ini. Aturan:
- **Keputusan: rilis berurutan, satu rilis Figma per versi repo yang terlewat** (Named Version, publish, dan backup masing-masing), supaya version history Figma utuh. Gabungan (satu Named Version ke versi terbaru) hanya bila ada keputusan tertulis baru.
- Changelog Figma satu frame per versi repo.
- Pekerjaan dilanjutkan langsung di Live; daftar isi per versi ada di dokumen versioning bagian 16.
- Selisih repo dan Figma tidak boleh lebih dari satu rilis MINOR saat rilis MINOR/MAJOR berikutnya disiapkan, kecuali ada keputusan tertulis.

**Checklist review:** token sama dengan `@theme` · tidak ada nomor versi di nama elemen · variant/property baru mengikuti penamaan yang ada · binding benar · Light dan Dark dicek · deskripsi dan changelog terisi dengan link node valid · breaking change punya migration note · Known Issues diperbarui · Code Connect diperbarui bila komponen berubah.

## 7. Variable Modes dan project freeze
- Palet warna per kampus (Personalisasi Portal di mockup) adalah tema **runtime** lewat token `--color-primary-*` dan `--color-secondary-*`; di Figma cukup state default (warna KarirLink). Memetakan preset kampus (Zamrud, Marun, Ungu, Teal, Navy) menjadi mode koleksi `Brand` adalah opsi yang belum diputuskan.
- Perubahan token yang boleh berbeda antar halaman dikelola dengan koleksi `Brand`: mode `Default` (terbaru) dan `Legacy <versi>` (dibekukan). `Colors/semantic/*` menjadi alias ke `Brand/*`; mode Light/Dark tidak diubah.
- Mode hanya menggerakkan variabel; perubahan layout/struktur komponen tidak bisa lewat mode. Untuk itu pakai library LTS (`KarirKit Design System [x.y.z] — LTS`, jangan aktif bersamaan dengan Live di file yang sama) atau variant property. Jangan detach instance.
- Sebelum mengubah nilai `Default` yang berdampak luas, duplikat dulu menjadi `Legacy <versi>` dan kunci halaman yang harus tetap.
- **Project Registry** (di file Index): per file konsumen: link, status Dinamis/Freeze, mode `Brand`, versi dibekukan, alasan, library Live/LTS, owner, tanggal tinjau ulang (wajib untuk Freeze). Tiap rilis: cek semua project Dinamis, tinjau Freeze yang lewat tanggal.

## 8. Template di Figma (dua jalur)
**Template contoh DS** (Autentifikasi, Error, Dashboard): mengikuti library. Nama `<Nama>, KarirKit [x.y.z]` = versi library saat terakhir direvisi; dibuat ulang hanya bila berubah di rilis DS.

**Template mockup** (KarirLink, Portal Karir, custom): berversi **tanggal**, mengikuti `templates/CHANGELOG.md`.
- Nama file: `<Nama halaman>, KarirLink [YYYY-MM-DD]` atau `<Nama halaman>, Portal Karir [YYYY-MM-DD]`. Tanggal = tanggal revisi mockup (sama dengan section di `templates/CHANGELOG.md`); "Dasar KarirKit: vX.Y.Z" dicatat di Index dan di frame Mockup Changelog.
- Tidak ada semver, Named Version, tag, backup, atau publish untuk file mockup. Revisi yang tidak berubah tidak dibuat ulang.
- Saat sebuah fitur berubah dalam batch baru: duplikat file terakhir, ganti nama ke tanggal batch, kerjakan di file baru; file lama dibekukan (view-only) dan tetap di project 04, revisi lebih lama dari dua terakhir dipindah ke Archive.
- Instance tetap menunjuk library Live, jadi file lama tidak menjamin tampilan lama; untuk perbandingan akurat andalkan frame di file lama dan Backup library.
- Alur per batch: (1) mockup batch masuk `master` (rilis Vercel); (2) catat entri tanggal di Mockup Changelog (ringkas dari `templates/CHANGELOG.md`, tanpa menyalin seluruh teks); (3) gambar/perbarui hanya frame yang dibutuhkan; (4) pastikan "Dasar KarirKit" tidak lebih baru dari library Live; (5) perbarui Index per fitur: revisi terbaru, revisi sebelumnya, library yang dipakai.
- Perubahan template yang butuh komponen baru: komponen dibuat di KarirKit (kode dan Figma) dulu, baru dipakai di template.

## 9. Code Connect
Dipetakan **setelah rilis ke Live** (node Live, bukan Draft), sumber berupa file story (`stories/Components/<nama>/*.stories.js`), properti Figma dipetakan ke kelas (mis. `tone` -> varian `.stat-card`). Komponen halaman template bukan komponen DS: cukup catatan di Description. Butuh seat Dev atau Full di plan Figma.

## 10. Catatan API Figma (untuk pekerjaan lewat MCP/skrip)
- Resize layer anak di dalam instance diabaikan; resize root instance atau bangun komponen sendiri.
- Fill/stroke terikat variabel yang sama dengan default bisa jadi hitam saat di-override; lewati override jika sama atau kirim warna hasil resolve. Opacity pada paint terikat dipatch setelah assignment, di call terpisah, dan tidak ikut ke instance.
- Mengganti ikon Button mereset warna vektor (ikat ulang fill VECTOR). Anak FILL di parent vertikal hug tidak menumbuhkan parent (pakai hug + minHeight). Mengatur lineHeight melepas text style.
- `isExposedInstance` hanya bisa diset setelah node ada di component/set; rotasi tidak bisa dioverride di instance.
- Aset berwarna (bendera, pembayaran, logo, berkas) di repo dibangkitkan dari `npm run assets:classes`; di Figma disusun sebagai komponen/variant (`Style` Default/Black/White/Disabled/Gray/Solid) dan namanya tidak boleh bentrok dengan komponen ikon (mis. `kk-flag`, `kk-file`).
- Perubahan yang hanya ada di repo (Storybook, build, docs `index.html`, `check:templates`) tidak perlu masuk Figma; cukup dicatat di `CHANGELOG.md`.
