# Changelog Template

Perubahan **mockup template** KarirLink dan Portal Karir (`templates/karirlink`, `templates/portal-karir`, `templates/custom`). Format [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), tetapi versinya **hanya tanggal** (`## YYYY-MM-DD`); semver `X.Y.Z` khusus komponen design system di `CHANGELOG.md`. Pemisahan ini dimulai dari v1.4.0. Branch kerjanya `mockup/<YYYY-MM-DD>`, terpisah dari `karirkit/<versi>` milik design system.

Aturan singkat:
- Satu commit hanya berisi satu lingkup: design system (`feat(ds)`, `fix(ds)`) atau template (`feat(karirlink)`, `feat(portal-karir)`).
- Template selalu memakai komponen KarirKit terbaru. Butuh komponen atau varian baru? Diminta dan dibuat di KarirKit lebih dulu (kelas, story, JS, `CHANGELOG.md`), baru dipakai di template. Tidak ada komponen atau gaya baru yang hidup hanya di template.
- Tiap tanggal menyebut versi KarirKit yang dipakai ("Dasar KarirKit").
- **Gerbang produksi:** mockup masuk `master`/`release` hanya bila "Dasar KarirKit" adalah versi yang sudah dirilis (bertag). Dasar yang belum rilis ditandai "(belum dirilis)" dan mockupnya tertahan di staging (`dev-karirkit`). Cek dengan `npm run check:templates`.

## 2026-11-05

Dasar KarirKit: v1.5.0

### Added
- **Aktivasi akun Alumni (FOX-1293):** desain alur dari email undangan sampai akun aktif di Portal Karir, versi mobile dan desktop. Desain yang sama nanti dipakai Mahasiswa Aktif dengan teks email berbeda. Tiket terkait: FOX-1295 (BE aktivasi), FOX-1296 (FE), FOX-1303 (BE undangan).
  - **Alur aktivasi:** `email-undangan.html` (tombol "Aktifkan Akun"; tampilan sama dengan email Tracer Study di `kuesioner-mail.html`) → `aktivasi.html` (nama kampus, email tidak bisa diubah, password dan konfirmasi) → `login.html` (email terisi dan pesan "Akun Anda sudah aktif").
  - **Link bermasalah:** link kedaluwarsa, sudah dipakai, atau salah menuju `aktivasi-kedaluwarsa.html`, `aktivasi-terpakai.html`, atau `aktivasi-tidak-valid.html`; tombol "Kirim link baru" membuka `link-baru.html` (isian email) lalu `link-baru-terkirim.html`.
  - **Dari halaman login:** tautan "Belum menerima undangan atau link kedaluwarsa?" membuka `link-baru.html`. Pesan hasilnya sama untuk email terdaftar maupun tidak terdaftar.
  - **Ubah password:** kartu "Keamanan akun" di `profil.html` → `ubah-password.html` (password lama, baru, konfirmasi; ada keadaan galat bila password lama salah).
  - **Aturan di desain:** email undangan tidak memuat password dan berlaku 7 hari; tombol "Aktifkan Akun" aktif bila aturan password terpenuhi dan konfirmasi sama. Aturan password (minimal 8 karakter, huruf besar, huruf kecil, angka) hanyalah contoh; nilai pastinya mengikuti BE (FOX-1295).

### Changed
- **Versi white-label portal disamakan dengan sumbernya.** Lamaran Saya, Lowongan, Profil, Tes RIASEC, dan Hasil RIASEC di `templates/custom/portal-karir` dibuat ulang dari halaman Portal Karir terbaru (hero Lowongan dan hiasan latar yang sudah dihapus di sumber ikut hilang; contoh kampus di Profil menjadi Universitas Foxtrot).
- **KarirLink: menu Kerjasama dan Report di Segera Hadir kini bisa diklik, dan teks bantuan warna di Personalisasi Portal dirapikan.**
- **Login dan Daftar: teks panel kiri dirapikan.** Judul menjadi "Satu platform karier untuk kampus, alumni, dan mitra.", deskripsi menjadi "Cari lowongan, magang, dan event karier, lalu lamar langsung dalam satu tempat."; tiga langkah (Masuk atau daftar, Atur minat, Cari dan lamar) dan teks "Portal karier kampus dari SEVIMA." dihapus.
- **Login dan Daftar: panel kanan berupa kartu terang berisi pratinjau lowongan, event, dan status lamaran.** Kartu putih berlatar gradasi lembut di atas latar biru, berisi lencana Platform Karier Kampus (ikon topi wisuda), judul gelap, deskripsi, dan pratinjau enam kartu (Lowongan, Event, dan satu kartu Lamar yang menonjol, sisanya memudar; isinya statis tanpa tanggal, status, atau penanda real-time). Logo KarirLink SEVIMA di kiri atas, sejajar dengan lencana di kanan.

## 2026-11-03

Dasar KarirKit: v1.5.0

### Added

- **Halaman Kerjasama di dashboard mitra** (`templates/mitra/kampus-mitra.html`, `kampus-cari.html`, `kegiatan-kolaborasi.html`, `kegiatan-kolaborasi-form.html`, `job-fair.html`): Kampus Mitra menampilkan kampus yang bermitra dengan status Menunggu Jawabanmu (undangan kampus: Terima atau Tolak), Menunggu Kampus (pengajuan sendiri: bisa dibatalkan), Berhasil Bergabung, dan Ditolak; Cari Kampus mencari berdasarkan kota atau nama lalu mengajukan kerja sama dengan pesan perkenalan. Kegiatan Kolaborasi mendaftar kegiatan yang diajukan ke kampus (Draf, Menunggu Persetujuan, Terjadwal, Berlangsung, Selesai, Ditolak) dengan form pengajuan sendiri (kampus tujuan, jenis, jadwal, lokasi, proposal wajib) dan opsi tarik pengajuan. Job Fair menampilkan job fair dari kampus mitra: perusahaan ikut dengan memilih lowongan yang ditampilkan, lalu menunggu persetujuan kampus. Langkah "Ajukan Kerja Sama ke Kampus" di status pendaftaran mitra kini menuju Cari Kampus. Detail baris memakai Modal, tanpa blok `<style>` baru.

### Changed

- **Beranda Portal Karir: "Lowongan pilihan" kini di atas "Layanan pusat karier"** (`templates/portal-karir/index.html`, dan versi white-label): urutan bagian menjadi Lowongan pilihan, Layanan pusat karier, Tes Potensi, lalu bagian lainnya.
- **Daftar Yudisium: kolom "Tanggal Yudisium" dan kartu "Menunggu Finalisasi" dihapus** (`templates/karirlink/yudisium.html`): tabel periode kini berisi Periode Yudisium, Jumlah Lulusan, Partisipasi Mengisi, dan Aksi; ringkasan menjadi empat kartu (Periode Yudisium, Total Lulusan Tercatat, Alumni Sudah Mengisi, Periode Capai Target). Baris kecil di ponsel hanya memuat jumlah lulusan.

### Fixed

- **Tombol di footer modal detail dashboard mitra tidak lagi keluar dari panel** (`templates/mitra/job-fair.html`, `kampus-mitra.html`, `kegiatan-kolaborasi.html`): footer kini boleh turun ke baris berikutnya, dan modal detail Job Fair memakai ukuran lebar karena tiga tombolnya (Tutup, Ubah Lowongan, Lihat Halaman Job Fair) tidak muat di ukuran sedang.
- **Beranda Portal Karir tampil sama dengan atau tanpa garis miring di akhir alamat** (`templates/portal-karir/index.html`, dan versi white-label): alamat `/templates/portal-karir` (tanpa `/`) disajikan tanpa pengalihan, sehingga `shell.js`, `landing.js`, dan `portal.js` dicari di `/templates/` dan 404 (navbar, footer, dan data hilang). `<base href>` membuat jalur skrip selalu benar, seperti di halaman admin KarirLink.

## 2026-11-02

Dasar KarirKit: v1.5.0

### Changed

- **Fitur notifikasi disembunyikan dari Portal Karir** (`templates/portal-karir/shell.js`, dipakai juga oleh versi white-label di `templates/custom/portal-karir`): tombol lonceng di navbar (dropdown di desktop, lembar bawah di ponsel), panel daftar notifikasi, dan tautan "Lihat semua notifikasi" dihapus dari navbar. Menu dan akun tidak berubah; tidak ada overflow di 390px.
- **Navbar dan sidebar selalu logo KarirLink; nama dan logo kampus cukup di hero** (`templates/portal-karir/shell.js`, `portal.js`, `templates/karirlink/admin-brand.js`, `pengaturan-landing-page.html`): navbar Portal Karir (dan versi white-label) tidak lagi berganti ke logo dan nama kampus saat logo Career Center dipublikasikan, begitu pula sidebar dan drawer panel admin KarirLink. Nama dan logo kampus tampil di hero Beranda Portal Karir (dan identitas di footer). Keterangan di Personalisasi Portal disesuaikan.
- **Navbar Portal Karir menyusut jadi pil padat saat digulir** (`templates/portal-karir/shell.js`, dipakai juga oleh versi white-label): di atas hero navbar terdiri dari tiga bagian terpisah (logo di kiri, tautan dalam pil kaca di tengah, akun dalam pil kaca di kanan); begitu halaman digulir semuanya melebur menjadi satu pil putih yang lebih sempit di tengah dengan logo lebih kecil dan akun hanya berupa avatar, dengan jarak logo ke tepi kiri pil 20px. Dibuat ringan untuk perangkat low-end: pil yang sudah digulir tidak memakai blur latar (sudah 95% putih), blur pil kaca di atas hero diperkecil (md), handler gulir hanya membaca scrollY dan menulis atribut saat berubah (tanpa membaca layout), dan transisi dimatikan bila perangkat meminta gerak dikurangi. Transisi 500 ms lewat varian `data-[scrolled]` yang sudah ada, tanpa kelas atau JS baru. Menu Layanan dan menu akun tetap terbuka di dalam layar pada kedua keadaan; di ponsel pil kaca di kanan memuat avatar dan hamburger.
- **Angka real-time dihapus dari Portal Karir** (`templates/portal-karir/portal.js`, `course.html`, `index.html` dan versi white-label): jumlah peserta pada kartu dan detail Course serta "Nx dikerjakan" pada kartu tes tidak ditampilkan lagi, karena butuh hitungan langsung dari server. Urutan Course populer di Beranda tidak lagi memakai jumlah peserta. Kartu tes yang sudah dikerjakan juga tidak lagi menampilkan kode Holland hasilmu (kueri hasil per kartu); diganti teks statis "Sudah dikerjakan / Hasil siap dilihat", kodenya tetap tampil di halaman hasil.
- **Daftar dan detail Event Portal Karir dirombak, tanpa tag** (`templates/portal-karir/event.html`, `event-detail.html`, `portal.js`, `job-fair.html`, dan versi white-label): detail event sekarang halaman sendiri (`event-detail.html?id=`), tidak lagi satu file dua tampilan. Kartu event baru (di Event dan Beranda): penanda tanggal berwarna per kategori, nama kategori sebagai teks biasa, waktu dan lokasi dengan ikon, tanpa chip kategori/format dan tanpa angka kuota. Detail memakai band judul gradasi dengan tautan kembali, kartu "Tentang acara" dan "Rangkaian acara", serta panel tanggal, waktu, lokasi, dan pendaftaran yang tampil paling atas di ponsel. Baris tab kategori diganti pilihan "Kategori" di formulir pencarian (bersama Format) agar tampilan lebih lega, dan jumlah per kategori serta bilah kuota dihapus karena butuh hitungan langsung dari server. Story "Event - Detail" ditambahkan.
- **Alur mitra yang mendaftar sendiri (bukan lewat kampus)** (halaman publik `templates/portal-karir/mitra-daftar.html` dan `mitra-status.html`; sisi admin kampus `templates/karirlink/kerjasama.html`): perusahaan mendaftar sendiri (data perusahaan, penanggung jawab, email kerja non-gratisan), memverifikasi email, lalu diverifikasi tim KarirLink satu kali untuk semua kampus. Setelah terverifikasi, lowongan bisa terbit dan tampil umum; kerja sama dengan kampus bersifat opsional dan memberi penanda mitra. Halaman status menampilkan tahapan dan apa yang sudah terbuka di tiap tahap (pratinjau lewat `?status=email|ditinjau|terverifikasi|ditolak`). Menu Kerjasama di admin kampus kini halaman sungguhan (menggantikan "Segera Hadir"): daftar mitra dengan sumber (Undangan Kampus / Daftar Mandiri), status (Menunggu Verifikasi, Menunggu Persetujuan, Berhasil Bergabung, Ditolak), laci detail dengan Setujui/Tolak (alasan wajib), Undang Mitra lewat email, dan salin tautan pendaftaran khusus kampus. Pintu masuk guest: tautan "Daftar sebagai mitra" di bawah form Masuk dan Daftar Portal Karir (`login.html`, `register.html`). Kolom wajib di form pendaftaran mitra bertanda bintang merah, dan tombol "Daftar Sekarang" selebar form serta menempel di bawah layar selama form digulir.
- **Unduh Hasil Kuesioner: judul diganti dan Tahun Lulus juga untuk template Lengkap** (`templates/karirlink/kuesioner.html`): judul modal "Ekspor Hasil Kuesioner" menjadi "Unduh Hasil Kuesioner" (toast ikut "Unduhan selesai"). Pilihan Tahun Lulus kini muncul untuk template Lengkap, tidak hanya Kemendikti, dan wajib diisi pada keduanya sebelum tombol Unduh aktif.
- **Dashboard mitra perusahaan (tahap 1)** (`templates/mitra/profil.html`, `pengaturan.html`, `segera-hadir.html`; story "Templates/Mitra"): area template baru dengan kerangka sidebar + topbar seperti admin KarirLink dan menu lengkap mengikuti fitur peran perusahaan di aplikasi KarirLink (Rekrutmen, Talent, Kerjasama, Komunikasi, Perusahaan). Halaman yang sudah ada: Profil Perusahaan (informasi umum dengan nama dan NIB baca-saja, kontak dan alamat, media sosial, logo, kelengkapan profil) dan Pengaturan (akun, kata sandi, tim perekrut dengan undang dan hapus, notifikasi email); menu lain menuju Segera Hadir. Pengaturan memakai pola daftar bagian di kiri dan isi bagian di kanan seperti Personalisasi Portal (Akun Saya, Kata Sandi, Tim Perekrut, Notifikasi Email; di ponsel berganti layar dengan tombol Kembali), tanpa blok `<style>` baru. Kolom di Akun Saya disusun satu kolom ke bawah (lebar maksimal xl). Langkah "Lengkapi profil perusahaan" di `mitra-status.html` kini menuju profil ini. `AGENTS.md`, skill `mitra-dashboard-pages`, dan `check:templates` ikut mencatat `templates/mitra`.

## 2026-10-30

Dasar KarirKit: v1.5.0

### Changed

- **Tanggal Akhir dihapus dari Pengaturan Gelombang Pengiriman** (`templates/karirlink/yudisium-detail.html`): tiap gelombang (Lulus, Pasca-Lulus 1, Pasca-Lulus 2) kini hanya punya Tanggal Mulai. Keterangan yang menyebut "rentang tanggal" diganti "tanggal mulai", dan catatan dev ikut disesuaikan.
- **Form Tanggal Mulai selalu di bawah kartu gelombang** (`templates/karirlink/yudisium-detail.html`): kartu Lulus, Pasca-Lulus 1, dan Pasca-Lulus 2 kini kolom flex dengan blok Tanggal Mulai di dasar kartu (`mt-auto`), sehingga ketiganya sejajar walau panjang deskripsinya berbeda.
- **Modal Ekspor Hasil disederhanakan** (`templates/karirlink/kuesioner.html`): pilihan "Menampilkan data terbaru" dihapus, dan penamaan di dropdown Tahun Lulus menjadi "2025 (Baru)" serta "2024/2023/2022 (Lampau)" (sebelumnya "format v2"/"format v1"), sama dengan istilah Format Baru dan Format Lampau di Tracer; keterangan di bawahnya disesuaikan.
- **Tooltip tombol header Kuesioner dirapikan** (`templates/karirlink/kuesioner.html`): tooltip kini rata tengah di bawah tombol (`data-tooltip-side="bottom"` benar-benar dipakai, sebelumnya diabaikan sehingga muncul di atas dan rata kiri), tetap di dalam layar, dan menghilang saat tombol diklik agar tidak menutupi menu atau modal.
- **Ekspor Hasil menjadi tombol ikon di luar menu, titik tiga diberi tooltip** (`templates/karirlink/kuesioner.html`): header halaman Kuesioner kini berisi, dari kiri: tombol titik tiga vertikal yang lebih ramping (tooltip "Lainnya", membuka menu QR Tracer dan Lihat Panduan), tombol ikon Ekspor Hasil (tooltip "Ekspor Hasil"), lalu Simulasi Tracer. Tooltip memakai `data-tooltip-trigger`; target sentuh 44px di ponsel dan tidak ada scroll horizontal di 390px.
- **Data Atasan wajib untuk status Bekerja di Tracer Pasca-Lulus** (`templates/karirlink/kuesioner-simulasi.html`): badge "Opsional" dan tombol "Lewati" dihapus; nama, jabatan, email, telp, dan alamat kantor atasan bertanda `*`, menolak kosong ("Wajib diisi."), dan menahan Buat Link serta Selesai sampai terisi semua. Teks pengantar diganti menjadi langkah wajib terakhir.
- **Tombol Ekspor Hasil menjadi tombol berlabel "Unduh Hasil"** (`templates/karirlink/kuesioner.html`): tombol ikon saja di header Kuesioner diganti tombol berikon unduh dengan teks "Unduh Hasil", tanpa tooltip (menggantikan tombol ikon bertooltip di entri sebelumnya). Menu Lainnya (titik tiga) dan modal ekspor tidak berubah. Dirilis langsung ke produksi dan disinkronkan dengan staging.
- **Kolom Aksi Lowongan dan Event lebih ringkas** (`templates/karirlink/lowongan.html`, `event.html`): tombol "Lihat Detail" dihapus, judul posisi/event kini menjadi tautan ke detail (Event: membuka drawer detail). Kolom Aksi hanya berisi aksi yang berbeda per baris (Tinjau untuk menunggu persetujuan, Ubah untuk lowongan kampus).

### Added

- **Lowongan di panel admin KarirLink** (`templates/karirlink/lowongan.html`, `lowongan-detail.html`, `lowongan-form.html`): satu daftar untuk lowongan kampus dan lowongan yang diajukan mitra, dengan antrean "Menunggu Persetujuan" (lowongan mitra tidak tampil di Portal Karir sebelum disetujui), filter Status/Sumber/Tipe, halaman tinjau (setujui & terbitkan, tolak dengan alasan wajib, turunkan), pelacakan pelamar per tahap (Belum Diproses, Lolos Berkas, Interview 1, Interview 2, Diterima, Ditolak), serta formulir buat/ubah lowongan (penyelenggara kampus atau mitra, target program studi, batas kota, dokumen wajib, jadwal terbit).
- **Event di panel admin KarirLink** (`templates/karirlink/event.html`, `event-form.html`): daftar event kampus dan permintaan kegiatan kerja sama mitra (beasiswa, kewirausahaan, pelatihan, seminar/webinar, pameran karier), laci detail dengan setujui/tolak (alasan wajib), dan formulir buat/ubah event dengan proposal untuk kegiatan mitra.
- **Job Fair (campaign) di Portal Karir** (`templates/portal-karir/job-fair.html`, `job-fair-lowongan.html`, `job-fair-perusahaan.html`, dan versi white-label): landing campaign (poster, tanggal, sesi dan informasi, perusahaan peserta, lowongan unggulan), daftar lowongan peserta dengan filter perusahaan, tipe, dan pencarian, serta halaman perusahaan peserta. Halaman hanya terbuka selama masa aktif campaign; di luar itu tampil "tidak tersedia", kecuali dibuka admin dengan `?preview`. Data lewat `PK.api` (`getJobFair`, `listFairJobs`, `getFairCompany`, kontrak di `portal.js`). Event berjenis Job Fair menautkan ke halamannya (`event.html`, juga di panel admin untuk "Pameran Karier"). Ditambahkan ke story Templates/Portal Karir.

## 2026-10-29

Dasar KarirKit: v1.5.0

### Changed

- **Validasi bulan pekerjaan/usaha pertama di simulasi Tracer** (`templates/karirlink/kuesioner-simulasi.html`): bila "Apakah Anda mendapatkan pekerjaan pertama sebelum lulus?" (atau memulai wiraswasta sebelum lulus) dijawab **Tidak**, isian "Dalam berapa bulan…" wajib terisi dan **lebih dari 0** (Format Lampau dan 2025, cabang Bekerja dan Wiraswasta). Nilai 0 atau kosong menampilkan pesan galat dan menahan Lanjut; pesan hilang begitu nilainya valid.
- **Perkiraan bulan mulai mencari kerja/usaha wajib terisi di simulasi Tracer** (`templates/karirlink/kuesioner-simulasi.html`): setelah "Kapan Anda mulai mencari pekerjaan?" (atau mulai wiraswasta) dijawab Sebelum atau Sesudah lulus, isian "Berapa perkiraan bulan sebelum/sesudah lulus ..." yang muncul kini bertanda `*`, menolak kosong dengan pesan "Wajib diisi." dan garis merah, dan menahan tombol Lanjut sampai terisi (angka 0 tetap sah). Berlaku di Format 2025 dan Format Lampau, untuk cabang bekerja, wiraswasta, dan sedang mencari kerja; builder sudah menandainya "Wajib kondisional".
- **Jumlah lamaran, respons, dan undangan wawancara wajib terisi di simulasi Tracer Format Lampau** (`templates/karirlink/kuesioner-simulasi.html`): tiga isian "Berapa ... yang sudah Anda lamar / merespon lamaran / mengundang Anda untuk wawancara sampai saat ini?" di cabang bekerja dan sedang mencari kerja kini bertanda `*`, menolak kosong (pesan "Wajib diisi." dan garis merah), dan menahan tombol Lanjut; angka 0 tetap sah. Pengecekannya memakai penanda yang sama dengan perkiraan bulan di atas (`data-reveal-required`). Builder sudah menandainya "Wajib".
- **Keterangan tambahan pertanyaan dihapus dari simulasi Tracer** (`templates/karirlink/kuesioner-simulasi.html`): catatan "(boleh pilih lebih dari satu)" di delapan pertanyaan pilihan ganda dan baris "Pertanyaan bertanda * wajib diisi; jumlah lamaran tidak wajib" di cabang sedang mencari kerja Format Lampau (yang juga sudah tidak benar, karena jumlah lamaran kini wajib) tidak lagi tampil.
- **Penjelasan "take home pay" di simulasi Tracer** (`templates/karirlink/kuesioner-simulasi.html`): pertanyaan pendapatan per bulan di cabang bekerja (Format 2025 dan Format Lampau) kini punya keterangan di bawah pertanyaan: "(take home pay adalah jumlah total penghasilan yang diterima ditambah tunjangan/bonus)", memakai kelas `form-hint`.
- **Keterangan kelulusan di Tracer Pasca-Lulus** (`templates/karirlink/kuesioner-simulasi.html`): judul langkah status di Pasca-Lulus 1 dan 2 kini sama ("Status Anda Setelah Lulus", sebelumnya "Status Satu Tahun/Empat Tahun Setelah Lulus") agar cocok untuk alumni dengan Exit aktif maupun nonaktif, dan di bawahnya ada kalimat "Kelulusan dihitung berdasarkan bulan yudisium." agar alumni tahu acuan waktu "setelah lulus". Teksnya per tracer lewat `g1Sub` di `WAVES`.
- **Langkah "Detail Sesuai Status Anda" dilewati untuk status "Belum memungkinkan bekerja"** (`templates/karirlink/kuesioner-simulasi.html`): status itu tidak punya pertanyaan tambahan (langkahnya hanya berisi keterangan), jadi responden asli langsung ke Sumber Dana, Kompetensi, dan Metode Pembelajaran, dan tombol Kembali juga melompati langkah itu. Simulasi admin (`?simulasi=1`) tetap menampilkan langkah tersebut.
- **Tautan Tracer Study dari Portal Karir membuka tracer yang benar** (`templates/karirlink/kuesioner-simulasi.html`): kartu di Tracer Study portal menautkan `?kuesioner=<id>` (`pra-lulus`, `pasca-1`, `pasca-4`), sedangkan halaman simulasi hanya membaca `?tracer=`, sehingga klik Pasca-Lulus 1 atau 2 selalu jatuh ke "Tracer Study Lulus". Halaman kini juga membaca `?kuesioner=` (`pasca-1` dan `pasca-4` dipetakan ke `pasca-1th` dan `pasca-4th`) lalu menormalkan URL ke `?tracer=`; kontrak `PK.tracerLink` di portal tidak berubah.
- **Simulasi Tracer: aksi kembali ke Kuesioner dan pengaturan simulasi digabung** (`templates/karirlink/kuesioner-mail.html`, `kuesioner-simulasi.html`, `kuesioner.html`): halaman email simulasi dan halaman kuesioner simulasi punya tautan "Kembali ke Kuesioner" di atas kartu (ke halaman Kuesioner, bukan popup), di luar kartu supaya email dan kuesioner tetap persis seperti yang dilihat responden. Di kuesioner, tautan itu dan tombol "Isi Ulang Simulasi" di layar selesai hanya tampil bila dibuka dari email simulasi (`?simulasi=1`); responden asli, mis. dari Tracer Study di Portal Karir, tidak melihatnya. Di popup Simulasi Tracer, "Kondisi alumni sebelum membuka kuesioner" dan "Format kuesioner" kini satu bagian di bawah Pasca-Lulus 2: Format selalu tampil untuk Pasca-Lulus 1 dan 2, Kondisi alumni hanya muncul untuk Pasca-Lulus 1.

## 2026-10-28

Dasar KarirKit: v1.5.0

### Added

- **Palet warna per kampus di Personalisasi Portal** (`templates/karirlink/pengaturan-landing-page.html`, `templates/campus-theme.js`, `templates/portal-karir/landing.js`): section baru **Warna** untuk memilih palet bawaan KarirLink, lima preset (Zamrud, Marun, Ungu, Teal, Navy), atau Kustom dengan warna utama dan aksen (pemilih warna + kolom hex). Warna utama divalidasi kontrasnya dengan teks putih (minimal 4,5:1); ada contoh tampilan langsung di panel Warna. Satu warna dasar dibuat menjadi skala 50-950 oleh skrip baru `templates/campus-theme.js`, dimuat di `<head>` **semua halaman panel admin KarirLink dan Portal Karir** (termasuk login, daftar, onboarding), dan menimpa token `--color-primary-*` / `--color-secondary-*`. Seluruh komponen KarirKit ikut berganti tanpa kelas baru dan tanpa kedipan warna bawaan. Berlaku hanya untuk kampus yang mengisinya: kosong = warna bawaan KarirLink, dan versi white-label `templates/custom` tidak memuat tema ini (`scripts/gen-custom-portal.mjs` membuangnya). Kunci konfigurasi baru: `primaryColor`, `secondaryColor`, `palettePreset`.
- **Kolom YouTube di Kontak Career Center** (`templates/karirlink/pengaturan-landing-page.html`, `templates/portal-karir/landing.js`): username/handle YouTube kampus tampil sebagai ikon di footer portal (`youtube.com/@handle`). Ikon media sosial yang kolomnya kosong tidak lagi tampil di footer setelah konfigurasi dipublikasikan (sebelumnya memakai tautan contoh `#`). Pratinjau Bimbingan Karir kini memakai poster video YouTube, bukan kotak biru kosong. Kartu pilihan palet warna menampilkan strip lima warna.

### Changed

- **Redaksi Tracer Study Format Lampau disamakan dengan builder dan yang dilihat lulusan** (`templates/karirlink/kuesioner-simulasi.html`, `kuesioner-builder.html`): "Penggunaan TI" menjadi "Penggunaan Teknologi Informasi"; pertanyaan kesesuaian pendidikan (f15, Bekerja dan Wiraswasta) memakai "Tingkat pendidikan apa yang paling tepat/sesuai untuk pekerjaan Anda saat ini?"; "Pengembangan Diri" menjadi "Pengembangan diri". Deskripsi di bawah pertanyaan yang berupa catatan internal atau penjelasan alur ("Dikirim ke Dikti", "data internal", "Data Atasan tidak ditampilkan", pemisah ribuan, provinsi/kab-kota hanya jika di Indonesia) dihapus dari simulasi agar sama persis dengan tampilan lulusan. Penjelasan tambahan yang dinilai tidak perlu bagi lulusan juga dihapus: "Diisi semua alumni, apa pun status Anda", "Tanggal lulus = tanggal yudisium", "Wiraswasta = wirausaha", "Kelulusan dihitung berdasarkan bulan yudisium" (termasuk "dan pekerjaan sambilan tidak dimasukkan"), dan "Dipakai untuk membuat link Survei Pengguna Lulusan".
- **Cara mencari pekerjaan di cabang Tidak Bekerja, Mencari Kerja (Format Lampau) menjadi 15 opsi** (`templates/karirlink/kuesioner-simulasi.html`): sebelumnya hanya 6 opsi. Kini sama dengan cabang Bekerja dan builder: `f401`-`f414` ditambah Lainnya (`f415`, dengan isian teks `f416`), sesuai `template-pddikti.json`. Format 2025 tetap 13 opsi karena instrumen 2025 menghapus `f410` dan `f412`.
- **Redaksi tiga pertanyaan jumlah lamaran di cabang Tidak Bekerja, Mencari Kerja (Format Lampau) disamakan** (`templates/karirlink/kuesioner-simulasi.html`, `kuesioner-builder.html`): "Jumlah perusahaan dilamar", "Jumlah merespons lamaran", dan "Jumlah mengundang wawancara" menjadi kalimat pertanyaan lengkap ("Berapa perusahaan / instansi / institusi yang sudah Anda lamar sampai saat ini?", dan seterusnya), sama dengan cabang Bekerja. Builder (Lampau, Bekerja dan Tidak Bekerja Mencari Kerja) ikut disamakan.
- **Pengaturan Landing Page menjadi Personalisasi Portal** (`templates/karirlink/pengaturan-landing-page.html` dan menu sidebar semua halaman admin, label "Personalisasi"): isinya sekarang logo, warna, dan landing page, bukan lagi hanya landing page. Panel Pratinjau Portal Karir (iframe) dihapus; editor memakai dua kolom di layar lebar (daftar section di kiri dengan penanda section aktif, form di kanan; Simpan/Batal tetap di section yang sama), sedangkan di ponsel daftar dan form tetap bergantian. Animasi geser/fade antar-section dihapus (panel langsung berganti). Tombol "Lihat Landing Page" membuka draf (`?landing=draft`) di tab baru. Nama file tidak berubah supaya tautan lama tetap jalan.
- **Onboarding Portal Karir layar penuh** (`templates/portal-karir/onboarding.html`): panel biru di kanan (logo, stepper vertikal, kartu "Kenapa kami menanyakan ini?") dihapus. Satu kolom di semua lebar layar (maks. 56rem) dengan logo, "Lewati semua", dan progres bersegmen di bagian atas seperti tampilan ponsel, ukuran elemen lebih ringkas, dan latar `bg-shell` seperti halaman portal lainnya. Bidang minat 3 kolom di layar lebar.


## 2026-10-27

Dasar KarirKit: v1.5.0

### Added

- **Toggle on/off Lulus** di Pengaturan Gelombang Pengiriman (`templates/karirlink/yudisium-detail.html`): kampus yang ingin lulusan langsung mengisi gelombang berikutnya saat lulus bisa menonaktifkan Lulus. Saat nonaktif, kartu meredup, rentang tanggal dikunci, dan muncul keterangan bahwa gelombang tidak dikirim serta tidak tampil di Portal Karir.
- **Portal Karir menyembunyikan gelombang nonaktif** (`templates/portal-karir/portal.js`, `tracer-study.html`, `tracer-study-mahasiswa.html`, dan versi white-label): `PK.api.listTracer` hanya mengembalikan gelombang aktif (`enabled !== false`), dan grid kartu menyesuaikan jumlahnya (2 atau 3 kolom).
- **Pertanyaan Format Lampau dilengkapi di simulasi** (`templates/karirlink/kuesioner-simulasi.html`), mengikuti dokumen arsitektur pertanyaan: f301 + f302/f303 di cabang Bekerja dan Wiraswasta ("merencanakan"), f16 di Bekerja dan Wiraswasta, f6/f7/f7a di Bekerja, serta gerbang f502 Ya/Tidak sebelum isian bulan. Cabang Mencari Kerja: f301 dan f4 bertanda wajib.
- **Builder kuesioner menampilkan opsi pilihan** (`templates/karirlink/kuesioner-builder.html`): untuk pertanyaan Pilihan Ganda dan Kotak Centang, seluruh opsinya tampil sebagai daftar di bawah deskripsi baris. Format Lampau juga mendapat baris gerbang f502 dan baris f302/f303 sendiri di cabang Mencari Kerja.

### Changed

- **Unggah file memakai komponen File Upload** (`templates/karirlink/pengaturan-landing-page.html`, `lowongan-form.html`, `event-form.html`): kolom gambar Landing Page memakai tampilan `.upload-compact` (CSS `.lp-drop` buatan halaman dihapus); formulir Lowongan dan Event memakai dropzone dengan validasi format/ukuran dan pratinjau gambar. Komponen File Upload sudah dirilis di KarirKit v1.5.0.
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
