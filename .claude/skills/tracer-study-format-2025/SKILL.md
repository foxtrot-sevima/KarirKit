---
name: tracer-study-format-2025
description: Format kuesioner Tracer Study Pasca-Lulus 1 & 4 Tahun di mockup KarirLink - Format 2025 (instrumen Kemendikti untuk lulusan >= 2025) berdampingan dengan Format Lampau (<= 2024), perbedaannya, sumber spesifikasi di repo JARVIS, dan cara kerja ?format= serta tab di builder. Pakai saat mengubah kuesioner builder/simulasi.
---

# Tracer Study: Format 2025 vs Lampau

Berlaku untuk gelombang **Pasca-Lulus 1 dan 2** (dulu Pasca-Lulus 1 dan 4 Tahun; nama diganti netral karena waktu kirimnya diatur kampus per periode, dan Lulus bisa dinonaktifkan) di `templates/karirlink/kuesioner-builder.html` (panel admin) dan `kuesioner-simulasi.html` (tampilan responden). Lulus dan Pengguna Lulusan tidak terpengaruh. File `kuesioner-builder-2..6` dan `kuesioner-simulasi-2` adalah iterasi lama, bukan sumber.

## Sumber spesifikasi
Repo kode JARVIS `karirlink-tracer-fe`: `src/constant/form/template-pddikti-2025.json` (struktur, redaksi, nilai) dan devplan FOX-1206 / FOX-1208 (Template Kemendikti / Lengkap 2025); sisi BE di `karirlink-tracer-be` (`docs/development-plan/FOX-1206..1208`). Lulusan >= 2025 memakai instrumen 2025, <= 2024 memakai format lampau.

## Perbedaan utama format 2025
- Alur: status (f8) -> cabang -> sumber dana (f1201) -> kompetensi -> metode. f1201, f502, f1001 tidak lagi ditanya di langkah 2.
- Negara (f5a0) ditanya dulu; provinsi (f5a1) dan kab/kota (f5a2) hanya jika Indonesia; juga ada di cabang Melanjutkan Pendidikan.
- f502 = Ya/Tidak ("pekerjaan pertama sebelum lulus?"), lalu bulan bila Tidak; jawaban verifikasi pra-lulus "Ya" mengisinya otomatis.
- Baru: izin usaha (f5e) untuk Wiraswasta; 4 aspek kompetensi (Berpikir kritis, Kreativitas, Kewirausahaan, Adaptasi) = 11 aspek; metode pembelajaran 17 butir dengan skala "Tidak ada".
- f1201: KIP-K menggantikan Bidikmisi, ditambah Beasiswa pemerintah daerah. f1101 hanya di Bekerja tanpa opsi Wiraswasta. f5c Wiraswasta tanpa Staff. f301 Wiraswasta dan Mencari Kerja hanya 2 opsi. Opsi f4/f16 yang dihapus: f410, f412, f1611.
- Redaksi f14 memakai "relevan"; semua pertanyaan wajib.

## Cara kerja di mockup
- Responden: `?format=lampau` (default 2025). Elemen berlabel `data-fmt="2025|lampau"` disembunyikan lewat CSS `body[data-fmt]`; cabang punya dua varian (`data-branch` + `data-fmt`). Popup Simulasi Tracer di `kuesioner.html` dan `kuesioner-mail.html` meneruskan `format`.
- Builder: tab Format 2025 / Format Lampau per gelombang (`data-format-tab`, `data-format-pane`); panel 2025 untuk 1th dan 4th digenerate dari satu definisi. Pertanyaan baru ditandai pill "Baru 2025".
- Pitfall saat menyunting file besar lewat skrip: argumen pengganti `String.prototype.replace` yang berisi `$$` atau `$&` ditafsirkan khusus; gunakan fungsi pengganti (`() => teks`).
