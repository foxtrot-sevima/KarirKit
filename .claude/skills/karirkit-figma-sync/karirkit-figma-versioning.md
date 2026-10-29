# KarirKit Design System — Tata Kelola Versi & Pemberkasan Figma

Dibuat 2026-10-14, sebagai persiapan implementasi v1.3.5 ke atas. Versi library Figma saat ini: **1.3.4 (Live)**; Draft 1.3.5 belum selesai (bagian 13.4). Versi kode (repo/npm): **1.5.0**, dirilis 2026-10-29 (1.3.5 2026-10-09, 1.3.6 2026-10-12, 1.4.0 2026-10-26). Pembaruan 2026-10-15: file template per fitur membawa nomor versi di nama file (bagian 14).

**Pembaruan 2026-10-29 (alur disesuaikan dengan repo):** repo kini memisahkan Design System (semver) dan Mockup template (tanggal). Aturan Figma mengikuti pemisahan itu: lihat `SKILL.md` bagian 0 dan 8, serta bagian 14 (dua jalur template), 16 (catch-up 1.3.5 sampai 1.5.0), 17 (alur ringkas), dan 18 (keputusan yang menunggu persetujuan). Bagian lain tetap berlaku kecuali disebut digantikan.

## 1. Prinsip

1. **Satu identitas library.** File library yang sudah dipublish dan dipakai file lain tidak boleh diganti dengan hasil duplikasi. Duplikat adalah file baru: instance di file konsumen tidak ikut terhubung. Versi library dilacak lewat Named Version + catatan publish, bukan dengan membuat file library baru.
2. **Versi di nama file, bukan di nama elemen.** Nama komponen, variabel, dan style tetap bersih (contoh `Button`, bukan `Button [1.3.5]`). Pengecualian yang disengaja: file template per fitur membawa versi di nama file (`Autentifikasi, KarirKit [1.3.5]`) supaya versi lama dan baru bisa dibuka berdampingan dan dibandingkan (bagian 14). File library tetap satu file, nomornya diganti saat rilis.
3. **Versi Figma = tag repo.** `v1.3.5` di GitHub (foxtrot-sevima/KarirKit) = Named Version `v1.3.5` di Figma = entri changelog `[1.3.5]`.
4. **Backup itu beku.** Snapshot rilis tidak diedit, tidak dipublish sebagai library, dan editor diberi akses view-only. Satu-satunya pengecualian adalah salinan LTS yang sengaja dipublish (lihat bagian 11).
5. **Setiap perubahan punya jejak:** entri changelog, deskripsi komponen, dan Named Version.

## 2. Struktur Project di Figma

Figma tidak mendukung folder bersarang, jadi pisahkan dengan Project berawalan angka:

```
00 KarirKit — Index          → file "KarirKit — Index & Changelog" (satu-satunya pintu masuk, berisi link semua file)
01 KarirKit — Live           → "KarirKit Design System [1.3.4]"   (library yang dipublish; nomor versi diganti saat rilis)
02 KarirKit — Draft          → "KarirKit Design System [x.y.z] — Draft"  (hanya untuk percobaan berisiko; rilis dikerjakan langsung di Live, bagian 19)
03 KarirKit — Archive        → "KarirKit Design System [1.3.4] — Backup 2026-10-14" (beku, satu per rilis)
04 KarirKit — Templates      → satu file per fitur per revisi. Template contoh DS: "<Nama>, KarirKit [x.y.z]" (mis. "Autentifikasi, KarirKit [1.3.5]"); template mockup: "<Nama halaman>, KarirLink|Portal Karir [YYYY-MM-DD]" (bagian 14)
```

Draft: plan yang dipakai tidak mendukung branching. Sejak keputusan bagian 19, rilis dikerjakan langsung di Live (perubahan tidak terlihat konsumen sampai Publish); Draft duplikat hanya untuk percobaan berisiko. Jangan menimpa Live dengan duplikat dan jangan menghapus lalu menempel komponen yang sudah ada.

## 3. Struktur Halaman di Dalam File Library

| Halaman | Isi |
|---|---|
| Cover | Nama, versi, status (Draft / Released), owner, tanggal rilis, link repo tag, link Index |
| Changelog | Satu frame per versi (terbaru di atas), format di bawah |
| Foundations | Warna, tipografi, spacing, efek, ikon |
| Components | Komponen inti, urut per kategori |
| Symbol | Ikon dan logo |
| Templates ringkas | Hanya contoh; template penuh ada di file per fitur |
| Draft / WIP | Pekerjaan belum final, tidak ikut publish |
| Deprecated | Komponen yang akan dihapus (bertahan minimal satu rilis minor) |

## 4. Aturan Penomoran (SemVer untuk Figma)

- **MAJOR (2.0.0)** — perubahan yang merusak: rename/hapus komponen, variant property, nama variabel/koleksi, atau perubahan yang menyebabkan override di file konsumen reset atau instance terputus.
- **MINOR (1.4.0)** — penambahan komponen, variant, token, template, atau perubahan visual yang tidak merusak.
- **PATCH (1.3.5)** — perbaikan bug, alignment, spacing, binding variabel yang salah, perbaikan dokumentasi.
Catatan: rename layer atau property di komponen sudah dihitung breaking. Untuk rilis 1.3.5, tentukan dulu apakah isinya patch atau minor sebelum memberi nomor. Hasil penilaian 1.3.5 ada di bagian 13.

## 5. Format Changelog (per versi)

```
## [1.3.5] — 2026-MM-DD   (Draft | Released)
Repo tag: v1.3.5 · Named Version: v1.3.5 · Backup: <nama file backup>

### Added
- Komponen `Nama` (variant: …) — link node
### Changed
- Layout/desain `Nama`: sebelum → sesudah — link node
### Fixed
- KK-003: deskripsi bug di versi sebelumnya — link node
### Deprecated / Removed
- `Nama` → gunakan `Pengganti`
### Breaking & Migration notes
- Langkah yang harus dilakukan konsumen
### Known issues (masih terbawa)
- KK-00x …
```

## 6. Known Issues Register

Ubah bagian "Celah yang diketahui" di catatan 1.3.4 menjadi daftar ber-ID (`KK-001`, `KK-002`, …) dengan kolom: ID, deskripsi, ditemukan di versi, status (Open / Fixed di x.y.z / Won't fix). Perbaikan bug di versi baru wajib menyebut ID-nya di changelog.

## 7. Dokumentasi di Level Komponen

- Kolom Description komponen diisi: `Since 1.3.5` atau `Changed 1.3.6 — ringkasan`.
- Di halaman Draft, beri sticker/label `NEW`, `CHANGED`, `FIXED` di samping komponen; hapus saat rilis.
- Gunakan section status Figma (Ready for dev / Completed) hanya untuk hal yang sudah lulus review.

## 8. Alur Rilis

1. **Persiapan** — tulis entri `[x.y.z] (Draft)` di Changelog dan buat ticket.
2. **Freeze versi sebelumnya** — Named Version `v<lama>`, duplikat ke Archive sebagai `— Backup <tanggal>`, matikan publish library di file backup, set view-only.
3. **Kerjakan di Live** (bagian 19) — tanpa Publish sampai review selesai; update entri changelog setiap ada perubahan. Template yang berubah dikerjakan di file template `[x.y.z]` (bagian 14).
4. **Review** — jalankan checklist (bagian 9).
5. **Rilis** — terapkan ke Live, rename file ke `[x.y.z]`, Named Version `v<x.y.z>` dengan deskripsi = ringkasan changelog, publish library dengan catatan yang sama, ubah status Cover menjadi Released, buat tag repo, tambahkan backup rilis ke Archive. File template `[x.y.z]` yang berubah dipindah/ditautkan di project 04 dan didaftarkan di Index.
6. **Pasca rilis** — update Index, bagikan changelog ke tim, lanjut ke versi berikutnya langsung di Live.

## 9. Checklist Review Sebelum Rilis

- Token Figma sama dengan `@theme` di `src/input.css` (nama dan nilai)
- Tidak ada nama elemen (komponen, variabel, style, layer) yang memuat nomor versi; nama file template `[x.y.z]` dikecualikan (bagian 14)
- Variant/property baru mengikuti penamaan yang sudah ada
- Binding variabel dan style benar (tidak ada hex literal baru tanpa alasan)
- Light dan Dark mode dicek bila relevan
- Deskripsi komponen dan changelog terisi, node link valid
- Breaking change punya migration note
- Known Issues register diperbarui
- Code Connect diperbarui bila komponen berubah

## 10. Langkah Sebelum Mulai 1.3.5

1. Buat Named Version `v1.3.4` pada file saat ini, lalu duplikat sebagai backup di Archive (tidak dipublish, view-only). **Selesai 2026-10-15** (Named Version v1.3.4 terlihat di version history Live; backup dan draft sudah dibuat).
2. Buat file `KarirKit — Index & Changelog` dan isi entri retroaktif `[1.3.4]` dari catatan library.
3. Ubah "Celah yang diketahui" menjadi Known Issues register ber-ID.
4. Putuskan mekanisme Draft (branch atau duplikat) sesuai plan Figma. **Selesai: duplikat (tidak ada branch).**
5. Pindahkan template ke file per fitur sesuai bagian 14 (`<Nama halaman>, <platform> [x.y.z]`), dengan file design system tetap tidak diubah. Versi awal tiap template diberi `[1.3.4]`, yang berubah di 1.3.5 menjadi `[1.3.5]`.
6. Pasang halaman Cover dan Changelog di file library. **Selesai di Draft.**
7. Tetapkan siapa owner rilis dan reviewer.

## 11. Variable Modes: mengikuti atau menahan perubahan per halaman

Keputusan: perubahan token (warna, radius, spacing) yang boleh berbeda antar halaman dikelola dengan Variable Modes.

### Struktur
- Koleksi baru `Brand` dengan mode `Default` (terbaru) dan mode legacy bernama `Legacy <versi>` (contoh `Legacy 1.3.4`).
- `Colors/semantic/primary` (dan semantic lain yang berubah) menjadi alias ke `Brand/<token>`. Mode Light/Dark di `Colors` tidak diubah, sehingga dimensi tema dan dimensi era brand terpisah.
- Komponen tidak diubah; mereka mengikuti mode dari frame induk.

### Aturan pemakaian
- Halaman/frame yang harus selalu mengikuti versi terbaru: biarkan di mode `Default`. Saat primary berubah, hanya nilai di mode `Default` yang diubah.
- Halaman/frame yang harus tetap seperti versi lama: set mode `Legacy <versi>` pada frame/section/halaman tersebut (koleksi `Brand`).
- Nilai mode `Legacy <versi>` dibekukan: tidak diedit setelah dibuat, kecuali perbaikan bug yang dicatat di changelog.
- Mode hanya untuk "era" yang masih dipakai. Jangan membuat satu mode per versi; hapus mode legacy yang sudah tidak dipakai lewat entri Deprecated di changelog, lalu Removed di rilis berikutnya.
- Jumlah mode dibatasi plan Figma; cek sebelum menambah mode baru.

### Batasan
- Mode hanya menggerakkan variabel (warna, angka, string, boolean). Perubahan layout/struktur komponen (misalnya desain Button) tidak bisa lewat mode.
- Untuk itu pilih salah satu: library LTS (salinan backup yang sengaja dipublish, nama `KarirKit Design System [x.y.z] — LTS`, jangan diaktifkan bersamaan dengan library Live di file yang sama) atau variant property (`Style = Default / Legacy`) untuk kasus kecil.
- Jangan detach instance untuk menahan perubahan.

### Pencatatan di changelog
- Penambahan atau perubahan mode dicatat di bagian Added/Changed (`Brand: mode Legacy 1.3.4 ditambahkan`).
- Perubahan nilai di mode `Default` yang berdampak ke halaman lain dicatat di Changed, dan masuk Breaking & Migration notes bila halaman perlu dikunci ke mode Legacy.
- Daftar halaman/frame yang dikunci ke mode Legacy dicatat di Index (kolom: file, halaman, mode, alasan, tanggal kadaluarsa bila ada).

### Langkah menerapkan pertama kali (sebelum rilis 1.3.5)
1. Buat koleksi `Brand` dengan mode `Default`.
2. Pindahkan nilai primary dan semantic yang berpotensi berubah ke `Brand`, lalu ubah `Colors/semantic/*` menjadi alias.
3. Cek semua komponen dan template masih tampil sama (Light dan Dark).
4. Catat di changelog 1.3.5 sebagai perubahan struktur token, dan tentukan apakah ini patch atau minor (alias baru tanpa perubahan nama token = minor).
5. Sebelum primary diubah, duplikat mode `Default` menjadi `Legacy 1.3.4` (nilai masih hijau), kunci halaman yang harus tetap hijau ke mode itu, baru ubah nilai di mode `Default` menjadi biru.
Catatan 1.3.5: perbandingan `@theme` 1.3.4 vs 1.3.5 menunjukkan tidak ada perubahan token, jadi langkah di atas tidak diperlukan untuk rilis ini.

## 12. Project Dinamis vs Project Freeze (Project Registry)

Status freeze atau dinamis adalah atribut project/file konsumen (yang memakai library), bukan atribut versi library.

| | Project dinamis | Project freeze |
|---|---|---|
| Mode `Brand` | `Default` | `Legacy <versi>` |
| Saat versi baru rilis | Terima update library, style ikut berubah | Token tetap, perubahan token tidak masuk |
| Perubahan layout/desain komponen | Ikut otomatis | Tidak tertahan oleh mode; pakai library LTS atau variant property bila harus beku |

### Project Registry (di file `KarirKit — Index & Changelog`)
Satu baris per file/project konsumen, kolom:
- Nama file/project dan link
- Status: Dinamis | Freeze
- Mode `Brand` yang dipakai
- Versi yang dibekukan (kosong untuk Dinamis)
- Alasan freeze
- Library yang dipakai: Live | LTS
- Owner
- Tanggal tinjau ulang (wajib untuk Freeze)

### Checklist setiap rilis baru
1. Buka registry; cek tampilan semua project Dinamis setelah update.
2. Untuk project Freeze, pastikan mode `Brand` masih terkunci; tinjau yang sudah lewat tanggal tinjau ulang (lanjutkan atau pindahkan ke Dinamis).
3. Bila rilis mengubah layout/struktur komponen, tentukan project Freeze mana yang perlu library LTS.
4. Catat hasilnya di changelog (Migration notes) dan perbarui registry.

## 13. Rilis 1.3.5 — Pemetaan Perubahan Repo ke Figma

Sumber: `CHANGELOG.md` paket `@foxtrot-sevima/karirkit@1.3.5` (rilis repo 2026-10-09, diunggah 2026-10-15). Library Figma masih 1.3.4 di Live, jadi entri di bawah adalah daftar yang disusul di file Draft. Status entri Figma: **Draft**. Link node diisi saat pekerjaan Draft berjalan.

### 13.1 Penilaian nomor versi
> **Selesai (2026-10-29):** repo memilih SemVer ketat mulai 1.4.0 dan tag 1.3.5, 1.3.6, 1.4.0, dan 1.5.0 sudah ada. Pilihan (a) dan (b) di bawah tidak berlaku lagi; versi Figma mengikuti tag (bagian 16). Teks asli dibiarkan sebagai riwayat.
- Isi 1.3.5 memuat komponen baru (Stat Card), perubahan komponen (Breadcrumb dengan dropdown), foundation aset baru, dan template baru. Menurut aturan bagian 4, ini **MINOR** (1.4.0), bukan patch.
- Namun repo sudah memakai 1.3.x untuk rilis yang menambah komponen (1.3.1 WYSIWYG, 1.3.2 Button Group dan Timepicker, 1.3.4 Pagination), dan prinsip 3 menyatakan versi Figma = tag repo. Jadi ada selisih antara aturan bagian 4 dan praktik repo.
- **Keputusan yang perlu diambil owner rilis:** (a) tetap `1.3.5` agar sama dengan repo dan bagian 4 diubah menjadi "selama seri 1.3.x, penambahan komponen dihitung sebagai patch", atau (b) menjaga SemVer ketat dan menamai rilis Figma `1.4.0` (repo harus ikut diberi tag baru). Sampai ada keputusan, entri memakai `1.3.5` (pilihan sementara dari pemilik pekerjaan: tetap 1.3.5).

### 13.2 Draft entri changelog Figma

```
## [1.3.5] — 2026-MM-DD   (Draft)
Repo tag: v1.3.5 · Named Version: v1.3.5 · Backup: KarirKit Design System [1.3.4] — Backup 2026-10-14

### Added
- Komponen `Stat Card` (.stat-grid, .stat-card, .stat-icon, .stat-value, .stat-label, .stat-note): kartu angka ringkasan berikon, tinggi ±60px (KPI card lama ±112px); kolom 1 (<360px), 2 (ponsel), 3 (sm ke atas) — link node
- Foundations/Assets (berwarna, bukan mask): Flags (266, kode ISO), Payment (83), Brand logo (28, 4 warna: default/black/white/disabled), Application (29 termasuk SiAkadCloud, 3 warna), File types (51, 3 tampilan: default/gray/solid) — link node
- Logo SiAkadCloud versi disabled (abu-abu #94969C, opacity 0,68; dibuat sendiri, belum ada di sumber aset asal) — link node
- Ikon target, hourglass, storefront, percent (6 weight) di halaman Symbol
- Template Portal Karir: Login, Register, Onboarding (3 langkah), Dashboard — file "Portal Karir, KarirLink [1.3.5]"
- Template KarirLink: Detail Arsip Kuesioner, Jawaban Arsip per alumni (tab per template), Jawaban di detail yudisium (Pra-Lulus, Pasca-Lulus 1 Tahun, Pasca-Lulus 4 Tahun, Pengguna Lulusan; keadaan terisi dan kosong) — file "Kuesioner, KarirLink [1.3.5]" dan "Yudisium, KarirLink [1.3.5]"
### Changed
- Breadcrumb: untuk halaman 3 tingkat atau lebih, maksimal 3 breadcrumb terlihat; menu pertama setelah Dashboard berikon dropdown di halaman 4 tingkat; di ponsel (<640px) hanya ikon home dan halaman aktif — link node
- Tombol login sosial: Microsoft diganti "Lanjutkan dengan SiAkadCloud" (di atas "Lanjutkan dengan Google"); semua teks "Lanjutkan dengan …" — link node
- Dropdown filter di toolbar tabel: penuh selebar toolbar di bawah 640px; tidak berubah dari 640px
- Kartu ringkasan seragam: padding p-4 sm:p-5, judul text-base, 2/3/4 kolom, nilai berupa teks biasa (bukan chip)
- Kartu angka biasa di yudisium, yudisium-detail, mahasiswa-alumni, kuesioner-arsip-detail memakai Stat Card (KPI card dashboard tidak berubah)
- Kartu arsip Kuesioner: "Lihat Preview" → "Lihat Detail", "Dibuat pada" → "Dikirim pada"; badge "Arsip" dihapus dari kartu profil halaman jawaban
- Teks ringkas di ponsel (<640px, maks. 2–3 baris) untuk subjudul, callout, dan keterangan panjang
### Deprecated / Removed
- Modal preview arsip Kuesioner (diganti halaman detail)
- Auth/Icon Microsoft dipindah ke halaman Deprecated (0 instance)
### Breaking & Migration notes
- Tombol login Microsoft tidak ada lagi di template; ganti dengan SiAkadCloud
- Konsumen yang memakai kartu angka biasa dapat beralih ke Stat Card (opsional)
### Known issues (masih terbawa)
- Salin dari Known Issues register setelah register dibuat (langkah 10.3)
```

### 13.3 Catatan khusus untuk Figma
- Berbeda dengan repo (class dibangkitkan dari `npm run assets:classes`), di Figma aset berwarna perlu disusun sebagai komponen/variant sendiri: `Style` (Default/Black/White/Disabled/Gray/Solid) bila konsisten dengan penamaan ikon yang ada. Ukuran mengikuti font-size di kode, jadi di Figma tentukan ukuran standar per set.
- `kk-flag` dan `kk-file` juga nama ikon di set ikon utama. Di Figma pastikan nama komponen aset berwarna tidak bentrok dengan komponen ikon yang sudah ada.
- Perubahan Storybook (Theming digabung ke Colors; ikon tab diganti ikon KarirKit) tidak berdampak ke Figma; cukup dicatat di repo.
- Token: perbandingan `@theme` 1.3.4 vs 1.3.5 sudah dilakukan (warna, radius, spacing, z-index, motion, ukuran teks, shadow/card, shadow/card-lg, glow/primary): tidak ada perubahan, tidak perlu entri Brand/Legacy.
- Portal Karir `index.html` yang sebelumnya direncanakan sebagai halaman terpisah kini sudah ada sebagai dashboard; tidak ada tahap "selesai" setelah onboarding.
- Temuan: varian `siakad` di Button Social sebelumnya memakai ikon graduation-cap; di Draft sudah diganti Auth/Icon SiAkadCloud dengan teks "Masuk dengan SiAkadCloud".

### 13.4 Tindak lanjut
1. Owner rilis memutuskan nomor versi (13.1).
2. ~~Bandingkan `@theme`~~ selesai: tidak ada selisih.
3. ~~Freeze 1.3.4 dan backup~~ selesai (Named Version v1.3.4, backup, draft).
4. Draft `KCA9QC9LjRMlKoZyIr1K5p`: Stat Card Compact, Breadcrumb dropdown, Assets, Auth/Icon SiAkadCloud, Cover/Changelog/Draft-WIP/Deprecated sudah ada; kartu ringkasan sudah diterapkan di template Yudisium, Yudisium Detail, Mahasiswa Alumni.
5. Progres draft (2026-10-15): Breadcrumb mobile selesai; Portal Karir Login, Register, Onboarding 3 langkah, dan Dashboard (Desktop 1440) selesai di halaman Portal Karir file Draft, dengan komponen baru Onboarding/Option, Work Mode Card, Chip, Skill Suggestion, Progress Panel dan 22 ikon baru di Symbol. Detail Arsip, Jawaban Arsip, dan Jawaban Yudisium (terisi dan kosong) juga selesai (Desktop 1440 dan Mobile 375), begitu pula Portal Karir Mobile untuk Onboarding dan Dashboard. Belum: pemakaian Breadcrumb di topbar template 3+ tingkat, Code Connect Stat Card dan Breadcrumb, cek Light/Dark, cek bentrok nama kk-flag/kk-file, pemindahan template ke file per fitur ber-versi (bagian 14). Koreksi Onboarding (2026-10-15): Desktop dan Mobile dibangun ulang mengikuti `onboarding.html` (state awal 0 dipilih): eyebrow ikon gradien, legend per grup (ikon 36, judul, deskripsi, status), kartu bidang bernada per bidang, kartu model kerja 3 kolom, field keahlian dengan meter, nav bawah dengan border atas, serta panel progres dengan stepper bergaris, ikon, dan kartu "Kenapa kami menanyakan ini?".

## 14. File Template Per Fitur dengan Versi di Nama File

> **Diperbarui 2026-10-29 (dua jalur, menunggu persetujuan reviewer; bagian 18).** Aturan di bawah ditulis untuk template ber-semver. Sejak repo memisahkan lingkup, hanya **template contoh DS** (Autentifikasi, Error, Dashboard) yang tetap memakai `[x.y.z]`. **Template mockup** (KarirLink, Portal Karir, custom) memakai **tanggal revisi**: `<Nama halaman>, KarirLink [YYYY-MM-DD]` atau `..., Portal Karir [YYYY-MM-DD]`, dengan "Dasar KarirKit: vX.Y.Z" tercatat di Index dan frame Mockup Changelog (cermin `templates/CHANGELOG.md`). Mockup tidak punya Named Version, backup, atau publish. Di semua kalimat di bawah, baca `[x.y.z]` sebagai tanggal untuk template mockup. Pemicu pembuatan file mockup baru adalah batch yang sudah masuk `master`, bukan tiap commit.

Keputusan 2026-10-15 (pemilik pekerjaan): setiap file template membawa versi di nama dan versi baru dibuat sebagai file terpisah, supaya developer bisa membuka versi lama dan baru berdampingan dan membandingkannya.

### Aturan
- Nama file: `<Nama halaman>, <platform> [x.y.z]`, mis. `Autentifikasi, KarirKit [1.3.4]` dan `Autentifikasi, KarirKit [1.3.5]`.
- Angka `[x.y.z]` = versi library saat template itu terakhir direvisi. Template yang tidak berubah di sebuah rilis tidak dibuat ulang dan tetap memakai angka lamanya (mis. `Error, KarirKit [1.3.4]` tetap sampai ada perubahan).
- Saat template berubah di rilis baru: duplikat file versi terakhir, ganti nama ke `[versi baru]`, kerjakan perubahan di file baru. File versi lama dibekukan: tidak diedit, tidak dipublish, view-only (sama dengan prinsip 4), dan tetap berada di project 04 untuk perbandingan; bila menumpuk, versi yang lebih lama dari dua rilis dapat dipindah ke Archive (03).
- Kedua file (lama dan baru) terhubung ke library yang sama; instance komponen tetap menunjuk ke library Live. Karena itu jangan membuka file template lama setelah library berubah dan berharap tampilannya sama dengan 1.3.4: tampilan komponennya mengikuti library terbaru. Untuk perbandingan yang akurat, andalkan frame yang sudah ada di file lama dan Backup library (view-only), atau gunakan library LTS bila perlu (bagian 11).
- Index mencatat per fitur: versi terbaru (link), versi sebelumnya (link), dan library versi berapa yang dipakai. Entri changelog menyebut file template yang dibuat atau diubah.
- Link frame di changelog (`link node`) menunjuk ke file template versi yang bersangkutan.

### Dampak pada pekerjaan 1.3.5
- Template yang berubah (Login/Register di Autentifikasi, Yudisium, Yudisium Detail, Mahasiswa Alumni, Kuesioner/arsip) dibuat sebagai file `[1.3.5]`; template yang tidak berubah (mis. Error) tetap `[1.3.4]`.
- Template baru (Portal Karir, Detail Arsip, Jawaban Arsip, Jawaban Yudisium) langsung dibuat sebagai `[1.3.5]`.
- Sampai pemindahan dilakukan, perubahan template 1.3.5 dikerjakan di halaman Template di file Draft; setelah disetujui, dipindah ke file `[1.3.5]` yang sesuai.

### Hal yang perlu dikonfirmasi
- Apakah versi lama tetap di project 04 atau langsung ke Archive (default di atas: tetap di 04, dua revisi terakhir).
- Penamaan tanggal untuk template mockup (bagian 18, keputusan 2).
- Bagian 1 prinsip 2 dan bagian 9 sudah disesuaikan; perlu persetujuan reviewer karena ini mengubah aturan "tanpa nomor versi" untuk nama file template.
---

## 15. Code Connect 1.3.5 (tertahan seat) dan cek Light/Dark

Status 2026-10-15: pemetaan belum bisa disimpan karena akun belum punya seat Dev atau Full di plan Organization/Enterprise (Figma menolak `get_code_connect_map` dan `add_code_connect_map`). Setelah seat tersedia, petakan setelah rilis ke Live (node Live, bukan Draft), label Storybook atau Web Components, sumber berupa file story di repo.

| Komponen Figma | Node di Draft | Sumber di repo | Properti Figma ke kelas |
|---|---|---|---|
| Stat Card Compact | 2005:104 | `stories/Components/stat-card/StatCard.stories.js` | `tone` ke `.stat-card` varian tone; `icon` ke `.stat-icon`; `value` ke `.stat-value`; `label` ke `.stat-label`; `note` dan `show note` ke `.stat-note`; wadah `.stat-grid` |
| Breadcrumb | 82:159 | `stories/Components/breadcrumb/Breadcrumb.stories.js` | `items` jumlah tingkat; `dropdown` menu tingkat tengah; `mobile` tampilan ikon home plus halaman aktif; `style` dan `separator` seperti sebelumnya |
| Onboarding/Option, Work Mode Card, Chip, Skill Suggestion, Progress Panel | 2043:1702, 2043:1715, 2043:1728, 2043:1737, 2026:549 | `templates/portal-karir/onboarding.html` | Template halaman, bukan komponen DS; cukup catatan di Description |
| Jawaban/Fact Cell, Jawaban/Answer Row, Arsip/Question Row | lihat halaman Page parts — Arsip & Jawaban | `templates/karirlink/kuesioner-arsip-*.html`, `yudisium-jawaban*.html` | Template halaman, bukan komponen DS |

Cek Light/Dark (struktur): semua fill dan stroke di frame Portal Karir dan frame Arsip/Jawaban terikat variabel. Sebagian memakai warna primitif (primary 600, neutral 100/200, white di panel brand), yang tidak berganti mode otomatis; periksa visual mode Dark dan pindahkan ke token semantic bila terlihat janggal.

## 16. Catch-up Figma: 1.3.5 sampai 1.5.0 (status 2026-10-29)

Repo sudah di 1.5.0, Figma Live masih 1.3.4. Pekerjaan di bawah dikerjakan di Draft yang ada (`KCA9QC9LjRMlKoZyIr1K5p`) sebagai **satu rilis Figma gabungan** (SKILL.md bagian 6). Sumber isi: `CHANGELOG.md` repo; link node diisi saat pekerjaan berjalan. Status Figma di tabel diisi dari bagian 13.4 dan perlu diverifikasi ulang di file sebelum melanjutkan (isi di tabel belum diperiksa ulang terhadap file Figma per 2026-10-29).

### 16.1 Design System (library)
| Versi repo | Tanggal | Isi yang perlu ada di Figma | Status |
|---|---|---|---|
| 1.3.5 | 2026-10-09 | Bagian 13.2: Stat Card, Breadcrumb dropdown, aset berwarna, logo SiAkadCloud, tombol login sosial | Draft sebagian (13.4 poin 5) |
| 1.3.6 | 2026-10-12 | Komponen baru **Chart** (line, area, column, bar, donut, pie, radial, sparkline; mengikuti token dan mode gelap), **Clipboard** (tombol, tombol ikon di dalam input, tombol berlabel, grup input, blok kode), **List Group**; **Dropdown** diperluas (23 layout: hover, pembatas, kepala menu pengguna, submenu, checkbox/radio/toggle); menu profil topbar berlayout dropdown baru | Belum |
| 1.4.0 | 2026-10-26 | Komponen baru **Drawer** (4 sisi, handle, footer), **Navbar** (sticky/fixed/...), **Footer**, **Timeline**; **Tabs** diperluas (default, underline berikon, pil, vertikal, penuh; Tabs sudah ada di 1.3.4, cek variannya); pola tabel daftar admin (pencarian kiri, filter kanan, kolom pendamping, tombol aksi ikon, badge membungkus, footer rata tengah di ponsel); **logo lockup SEVIMA** (berwarna dan putih); perubahan Toast bertumpuk dan label combo elipsis. Hanya di repo (tidak masuk Figma): kerangka docs `index.html`, `dist/` tidak di-commit, `check:templates` | Belum |
| 1.5.0 | 2026-10-29 | Komponen baru **File Upload** (dropzone, input berkas, banyak berkas dengan progres, pratinjau gambar, compact, ukuran kecil/besar, error, disabled). Logo KarirKit (`karirkit-logo`, versi putih) dipakai di sidebar docs: pastikan ada di halaman Symbol. Hanya di repo: halaman Overview docs dan kolom salin | Belum |

Tindak lanjut teknis (urutan): (1) verifikasi isi Draft terhadap tabel; (2) bandingkan `@theme` 1.3.4 vs 1.5.0 untuk token baru (entri changelog Figma dan variabel); (3) bangun komponen baru per versi, beri Description `Since x.y.z`; (4) satu frame changelog per versi repo, ditandai "Released di repo <tanggal>; masuk Figma bersama v1.5.0"; (5) checklist review (bagian 9); (6) rilis: Named Version `v1.5.0` (deskripsi merujuk keempat entri), publish library, Cover = Released, backup, Index; (7) Code Connect setelah seat tersedia (bagian 15).

### 16.2 Mockup (template, versi tanggal)
Sumber: `templates/CHANGELOG.md` (Dasar KarirKit v1.4.0 untuk 2026-10-13 sampai 2026-10-26, v1.5.0 untuk 2026-10-27 sampai 2026-10-29). Satu batch catch-up `[2026-10-29]` untuk fitur yang berubah sejak file `[1.3.5]` di Draft; gambar hanya state default dan hanya layar yang dibutuhkan developer/QA.

| Area | Fitur yang berubah (rentang tanggal) |
|---|---|
| Portal Karir | Template didesain ulang (10-13); Pengembangan Diri (Tes dan Course), Tes Minat RIASEC dan jalur rekomendasi (10-20); menu akun (10-26); onboarding layar penuh dan latar mengikuti halaman lain (10-28); palet warna kampus dari Personalisasi Portal (10-28) |
| KarirLink admin | Mahasiswa/Alumni dirombak, Yudisium, detail Yudisium dan detail Arsip Kuesioner (10-13); Aktivitas Lamaran Alumni, daftar Kuesioner dan Arsip satu layout, Ekspor Hasil, halaman Segera Hadir (10-26); Personalisasi Portal (nama baru Pengaturan Landing Page, dua kolom; 10-28), unggah file memakai File Upload (10-27) |
| Tracer Study | Toggle Lulus, gelombang Pasca-Lulus 1 dan 2 dengan Format 2025 dan Format Lampau (10-26 sampai 10-27); simulasi dan builder diselaraskan, aksi kembali ke Kuesioner, pengaturan simulasi di popup, validasi bulan (10-28 sampai 10-29); email undangan |

Aturan gerbang: "Dasar KarirKit" file mockup tidak boleh lebih baru dari library Live di Figma. Karena File Upload baru ada di 1.5.0, frame yang memakainya (unggah gambar Personalisasi Portal) menunggu rilis Figma 1.5.0.

## 17. Alur ringkas gabungan (Design System dan Mockup)

**Design System (library, semver)**
1. Kode: komponen/variant/token di KarirKit (branch `karirkit/<versi>`), `CHANGELOG.md` `[Unreleased]`.
2. Rilis repo atas perintah eksplisit: bump versi, merge `master` lalu `release`, publish npm, tag `vX.Y.Z`, GitHub release, deploy Vercel (`karirkit-release`).
3. Figma menyusul (tidak memblokir rilis repo): entri changelog `[x.y.z]`, token sama dengan `@theme`, bangun komponen di Draft, review, Named Version `vx.y.z`, publish library, backup, Index. Bila tertinggal: catch-up gabungan (bagian 16).
4. Template contoh DS (Autentifikasi, Error, Dashboard) diperbarui sebagai `[x.y.z]` hanya bila berubah.

**Mockup (template, tanggal)**
1. Kode: halaman di `templates/karirlink`, `templates/portal-karir`, `templates/custom` dengan komponen KarirKit terbaru; branch `mockup/<YYYY-MM-DD>`; entri di `templates/CHANGELOG.md` dengan "Dasar KarirKit".
2. Komponen baru dibutuhkan: lewat jalur Design System dulu, lalu mockup menyusul.
3. Rilis batch ke `master` dan Vercel (gerbang: Dasar KarirKit sudah dirilis, `check:templates`).
4. Figma menyusul per batch: Mockup Changelog (ringkas), file template `[YYYY-MM-DD]` untuk fitur yang berubah, Index diperbarui. Tanpa Named Version, tag, atau publish.

## 18. Keputusan yang menunggu persetujuan owner rilis dan reviewer

1. **Catch-up gabungan atau berurutan.** Usulan: satu rilis Figma `v1.5.0` (empat entri changelog, satu backup, satu publish). Alternatif: rilis `v1.3.5` dulu karena Draft hampir selesai, lalu `1.3.6`, `1.4.0`, dan `1.5.0` menyusul (empat backup dan empat publish untuk satu pekerjaan yang saling bergantung). Named Version tidak bisa dibuat mundur pada kondisi library lama, jadi usulan gabungan kehilangan titik-titik antara 1.3.5 dan 1.4.0 di version history Figma (jejaknya tetap ada di changelog).
2. **Nama file template mockup memakai tanggal** (`[YYYY-MM-DD]`) dan mencatat Dasar KarirKit, menggantikan `[x.y.z]` (bagian 14).
3. **Template contoh DS tetap `[x.y.z]`** karena berada di lingkup design system.
4. **Figma boleh tertinggal dari repo**, dicatat di Index, dengan batas satu rilis MINOR (SKILL.md bagian 6).
5. **Palet kampus sebagai mode `Brand`** (Zamrud, Marun, Ungu, Teal, Navy) atau cukup state default (SKILL.md bagian 7). Usulan: cukup state default sampai ada kebutuhan desain.

## 19. Keputusan 2026-10-29: Live sebagai ruang kerja (menggantikan duplikat Draft ke Live)

Disetujui owner. Latar belakang: pada rilis 1.3.5, menyalin komponen dari Draft ke Live dengan hapus lalu tempel mengganti key komponen (139 ikon, bagian komponen template Autentifikasi) dan memutus instance; pemulihan lewat Version history dan perbaikan manual (instance diarahkan ulang ke komponen lokal, komponen yang tertempel sebagai referensi remote dijadikan komponen lokal).

Aturan baru (rinci di SKILL.md bagian 4 dan 6):
1. Kerjakan langsung di Live; Publish hanya saat rilis. Titik aman: Named Version `v<lama>` sebelum mulai.
2. Draft duplikat hanya untuk percobaan berisiko; yang matang dibangun ulang di Live.
3. Jangan hapus lalu tempel komponen yang sudah ada. Komponen berubah diedit di tempat; komponen baru dibuat di Live atau ditempel hanya yang baru; periksa instance remote atau tanpa parent sesudah menempel.
4. Backup Archive satu kali, saat rilis.
5. Catch-up Figma dikerjakan berurutan per versi repo (menggantikan usulan gabungan di bagian 16 dan 18 butir 1); pekerjaan 1.3.6 dan seterusnya langsung di Live.
6. Branching Figma tetap pilihan terbaik bila plan naik ke Organization atau Enterprise.
