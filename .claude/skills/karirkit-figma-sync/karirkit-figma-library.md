# KarirKit Design System [1.3.4] — catatan library Figma

> **Snapshot 1.3.4.** Repo sudah di 1.5.0. Komponen dan aset baru sejak 1.3.5 (Stat Card, Chart, Clipboard, List Group, Drawer, Navbar, Footer, Timeline, Tabs diperluas, File Upload, logo lockup SEVIMA, aset berwarna) belum ada di Live; daftar pekerjaan dan status catch-up ada di `karirkit-figma-versioning.md` bagian 16. Template mockup berversi tanggal, tidak lagi `[x.y.z]` (versioning bagian 14).

File Figma: https://www.figma.com/design/vQw8JpdeFVza18CSnh3FYt (folder KarirKit). Sumber: https://github.com/foxtrot-sevima/KarirKit v1.3.4. Struktur halaman, penamaan `Nama [1.3.4]`, dan konvensi variabel mengikuti file referensi tim.

## Isi library
- Variabel (5 koleksi, 416 variabel): Primitive (161, palet dasar), Colors (97, mode Light/Dark: semantic/* dan color/<palet>/<50..950>), Utilities (62: spacing, radius, border, container, screen, z, motion), Typography (33), .Component (63, disembunyikan dari publish).
- Style: 54 teks (`text/<ukuran>/<weight>`, `heading/h1..h6`, `label/eyebrow`, `code/*`), 72 efek (`shadow/*`, `glow/*`, `ring/*`), 33 paint (`brand/gradient`, `brand/gradient-soft`, `brand/shell`, `gradient/*`).
- Semua token `@theme` di `src/input.css` sudah dicek ada di Figma (77 warna + 8 semantic, z, radius control/card/check, spacing check, motion, text btn-lg/micro, shadow card/card-lg/glow-primary). `--animate-*` adalah keyframe CSS, tidak punya padanan variabel.
- Komponen: 56 komponen inti dengan variant dan property (Button, Button Outline/Inverse/Gradient/Icon/Social, Button Group, Input, Textarea, Select, Checkbox, Radio, Toggle, Date Picker, Time Picker, Search, Counter, WYSIWYG, Modal, Dropdown, Badge, Breadcrumb, Progress, Alert, Toast, Tooltip, Callout, Table, Pagination, QR Code, Avatar, Tabs, Card, Stat Card, Divider, Kbd, Sidebar, Sidebar Nav Item, Topbar) dan 117 set ikon (6 weight) di halaman Symbol bersama logo KarirKit/KarirLink.
- Template (33 frame dari 23 halaman sumber): Autentifikasi (8 frame: login, login-fancy, register, register-fancy; desktop 1440 + mobile 375), Error (8 frame: 403/404/500/503; desktop + mobile), Dashboard (desktop + mobile), KarirLink (15 frame desktop: 4 error, index, index tab Tracer Study (tambahan), kuesioner-mail, kuesioner, kuesioner-simulasi, kuesioner-builder, kuesioner-builder-2, mahasiswa-alumni(+detail), yudisium(+detail)). Bagian lokal yang dipakai berulang ada di frame `Page parts — …` di bawah tiap halaman template.

## Celah yang diketahui (jujur)
- Font mono memakai Roboto Mono sebagai pengganti; font display = Instrument Sans (sama dengan teks).
- Dark mode belum diuji di frame template; logo dark tidak otomatis berganti (pakai komponen logo putih).
- Hanya state default yang dibuat untuk frame KarirLink: modal, state wizard tersembunyi (kuesioner-simulasi), varian email kuesioner-mail selain pra-lulus, dan view Builder lain tidak digambar.
- Topbar admin hanya mendukung satu breadcrumb; halaman dengan breadcrumb bertingkat memakai salinan topbar lokal atau overlay Breadcrumb.
- Opacity paint yang terikat variabel tidak ikut ke instance; border 70% di beberapa kartu dipasang ulang manual sebagai override.
- Lebar kolom tabel adalah estimasi dari auto table layout browser; tinggi Search/Select di instance terkunci 40px (HTML memakai 36/32px).
- Chart (grafik dashboard, tracer study) adalah vektor yang bisa diedit, warna ungu/merah muda memakai hex literal karena tidak ada token.
- Nilai KPI halaman Mahasiswa/Alumni memakai angka hasil JS saat load (10 / 4 / 1 / 1 / 1), bukan teks statis di HTML.

## Catatan API Figma yang berguna untuk pekerjaan lanjutan
- Resize layer anak di dalam instance diabaikan; resize root instance atau bangun komponen sendiri.
- Fill/stroke terikat variabel yang sama dengan default komponen bisa berubah hitam saat di-override di instance; lewati override jika sama, atau kirim warna hasil resolve.
- Opacity pada paint terikat harus dipatch setelah assignment, dan sebaiknya di call terpisah; tidak ikut ke instance.
- Mengganti ikon Button mereset warna vektor; ikat ulang fill VECTOR (nama layer jadi `Icon/<nama>`).
- Anak FILL di parent vertikal hug tidak menumbuhkan parent; pakai hug + minHeight. Mengatur lineHeight pada teks melepas text style.
- `isExposedInstance` hanya bisa diset setelah node ada di dalam component/set; rotasi/relativeTransform tidak bisa dioverride di instance.