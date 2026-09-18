# KarirKit Design System

**KarirKit** adalah UI kit/design system internal SEVIMA untuk **KarirLink**
— platform karier berbasis AI. Dibangun dengan Tailwind CSS v4. Proyek
internal SEVIMA (Foxtrot).

Referensi visual ada di `moodboard/`: SaaS dashboard bertema AI dengan
sidebar tergrup, kartu statistik bertren, badge status, dan panel
rekomendasi AI. Warna dan logo mengikuti identitas resmi KarirLink — lihat
bagian [Brand & Logo](#brand--logo).

## Fitur

- **Design tokens** — tiga lapisan di `src/input.css` `@theme`: primitive
  (neutral / primary / secondary / status), semantic surfaces (`background`,
  `surface`, `fg`, `border`, …), dan komponen (radius/control size/z/motion).
  Tipografi Instrument Sans, shadow, dan gradasi brand ikut di situ.
- **Pustaka komponen** — button (incl. ghost-inverse + loading), badge, avatar,
  card, form (error/disabled/toggle), navigasi (sidebar + tab), tabel, callout,
  progress bar, dan tooltip (hover + focus).
- **Style guide interaktif** (`index.html`) — dokumentasi visual setiap
  token dan komponen, bisa dibuka langsung tanpa server.
- **Dashboard contoh** (`templates/dashboard.html`) — implementasi nyata: AI Career
  Coach, ringkasan lamaran kerja, grafik performa, tabel lamaran, dan
  aktivitas terbaru — semua memakai komponen dari design system yang sama.
- **Sepenuhnya offline** — CSS sudah di-build (`dist/output.css`) dan font
  di-hosting lokal, tidak bergantung pada CDN atau koneksi internet.
- **Light-only** — dark mode sengaja ditunda. Pakai semantic tokens supaya
  nanti cukup override map di `.dark`, bukan rewrite komponen.

## Instalasi (npm package)

KarirKit di-publish sebagai package private `@foxtrot-sevima/karirkit` ke
[GitHub Packages](https://github.com/orgs/foxtrot-sevima/packages) — **bukan**
npm registry publik, jadi `npm install @foxtrot-sevima/karirkit` polos tanpa
setup di bawah akan gagal dengan `404 Not Found` (npm defaultnya mencari ke
`registry.npmjs.org`, yang memang tidak punya package ini). GitHub Packages
juga selalu butuh autentikasi untuk install, walau packagenya sendiri public.

### 1. Buat Personal Access Token (PAT)

1. Buka [github.com/settings/tokens](https://github.com/settings/tokens) →
   **Generate new token** → **Generate new token (classic)**.
2. Beri nama bebas (mis. "read npm packages"), centang scope **`read:packages`**
   saja (tambah `repo` juga kalau repo `KarirKit`-nya private dan Anda belum
   pernah clone/akses lewat token lain).
3. Generate, lalu **salin tokennya sekarang** (`ghp_...`) — GitHub cuma
   menampilkannya sekali.

### 2. Setup `.npmrc`

Di root project consumer (folder tempat `package.json` Anda berada), buat
file `.npmrc` berisi:

```
@foxtrot-sevima:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Baris pertama mengarahkan scope `@foxtrot-sevima` ke GitHub Packages (bukan
npm publik), baris kedua yang mengautentikasi instalasinya.

Lalu set environment variable `GITHUB_TOKEN` ke token dari langkah 1 — atau,
kalau tidak mau repot dengan env var, tempel tokennya langsung menggantikan
`${GITHUB_TOKEN}` di `.npmrc` (tapi jangan sampai `.npmrc` ini ikut ter-commit
ke repo publik kalau isinya token asli).

<details>
<summary>Set <code>GITHUB_TOKEN</code> per OS/shell</summary>

```powershell
# PowerShell (sesi saat ini saja)
$env:GITHUB_TOKEN = "ghp_xxxxxxxxxxxxxxxxxxxx"

# PowerShell (permanen, akun user)
setx GITHUB_TOKEN "ghp_xxxxxxxxxxxxxxxxxxxx"
```

```bash
# bash/zsh (sesi saat ini saja)
export GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxx"

# bash/zsh (permanen — tambahkan ke ~/.bashrc atau ~/.zshrc)
echo 'export GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxx"' >> ~/.bashrc
```

</details>

### 3. Install

```
npm install @foxtrot-sevima/karirkit@1.2.0
```

Tanpa versi (`npm install @foxtrot-sevima/karirkit`) akan mengambil versi
`latest` yang sedang aktif — cek versi yang tersedia di
[github.com/orgs/foxtrot-sevima/packages/npm/package/karirkit](https://github.com/orgs/foxtrot-sevima/packages/npm/package/karirkit).

Pemakaian di project consumer:

```css
/* import CSS hasil build (siap pakai) */
@import "@foxtrot-sevima/karirkit";

/* atau import source token/komponen kalau mau digabung ke @theme sendiri
   lewat Tailwind CSS v4 milik project consumer */
@import "@foxtrot-sevima/karirkit/theme";
```

Font dan icon ikut ter-package di `assets/fonts` dan `assets/icons` (bisa
diakses lewat `@foxtrot-sevima/karirkit/assets/...`).

### Publish rilis baru

Publish otomatis lewat GitHub Actions (`.github/workflows/publish.yml`)
setiap kali branch `release` di-push/di-merge — alurnya: bump versi di branch
kerja → merge ke `master` → merge/push `master` ke `release` → workflow
otomatis build & `npm publish`. Workflow ini juga bisa dipicu manual lewat
tab **Actions → Publish package → Run workflow** (`workflow_dispatch`),
termasuk untuk ref selain `release` kalau perlu.

Untuk publish manual dari mesin lokal (butuh token dengan scope
`write:packages`, bukan `read:packages`):

```
npm version <patch|minor|major>
npm publish
```

`prepublishOnly` akan menjalankan `npm run build` otomatis sebelum publish,
jadi `dist/output.css` selalu ikut versi terbaru.

## Struktur

```
src/input.css              Design tokens (@theme) + komponen (@layer components)
dist/output.css            CSS hasil build — dimuat oleh index.html & templates/dashboard.html
assets/fonts/InstrumentSans/  Font self-hosted (lihat bagian Font di bawah)
assets/logo/                  Logo KarirLink dipakai di kedua halaman (lihat Brand & Logo)
index.html                 Style guide: warna, tipografi, ikon, dan semua komponen
templates/dashboard.html   Dashboard KarirKit yang memakai design system tersebut
moodboard/                 Referensi visual (tidak dipakai runtime)
logo/                      Aset logo asli dari tim brand (sumber, tidak dipakai runtime)
```

Kedua file HTML adalah statis (tanpa build tool saat dibuka) dan bisa
langsung dibuka di browser — cukup double-click `index.html` atau
`templates/dashboard.html`.

## Tech stack

- [Tailwind CSS v4](https://tailwindcss.com) — lewat `@tailwindcss/cli`,
  bukan CDN, supaya token custom (`@theme`) dan komponen (`@layer
  components`) bisa di-build jadi satu file CSS statis.
- HTML statis + sedikit vanilla JS (toggle sidebar mobile) — tanpa
  framework, tanpa dependency runtime.
- [Instrument Sans](https://github.com/Instrument/instrument-sans) sebagai
  font, di-hosting lokal.

## Brand & Logo

Logo resmi **KarirLink** (`logo/new/`, dari tim brand SEVIMA) adalah aset
visual utama proyek ini, tersedia dalam 4 varian di `assets/logo/` — lihat
bagian Logo di `index.html` untuk contoh visual & kapan memakai masing-masing:

| File | Varian | Fungsi |
| --- | --- | --- |
| `karirlink-mark.svg` | Mark, warna | Favicon, ikon aplikasi, ruang sempit |
| `karirlink-mark-white.svg` | Mark, putih | Mark di atas latar gelap/gradasi |
| `karirlink-logo.svg` | Lockup, warna | Header & sidebar (penempatan utama) |
| `karirlink-logo-white.svg` | Lockup, putih | Lockup di atas latar gelap |

`karirlink-mark.svg` dipakai sebagai favicon kedua halaman; `karirlink-logo.svg`
dipakai di header `index.html` dan sidebar `templates/dashboard.html`.

Warna **primary** dan **secondary** design system satu keluarga hue dengan
warna logo (biru & oranye), tapi saturasi/lightness-nya disesuaikan supaya
lebih hidup untuk UI — bukan hex logo yang persis sama (lihat `src/input.css`,
`@theme`):

| Token | Base (600) | Sumber |
| --- | --- | --- |
| `primary` (biru) | `#2361e7` | Hue sama dengan mark "L" & teks "Karir" pada logo, dibuat lebih vivid |
| `secondary` (oranye) | `#f67e28` | Hue sama dengan mark panah "K" & teks "link" pada logo, dibuat lebih hangat |

Skala 50–950 tiap warna diturunkan dari base tersebut (lihat bagian Colors
di `index.html` untuk swatch lengkap). `bg-brand-gradient` dan
`shadow-glow-primary` juga sudah memakai biru brand ini. Karena oranye
punya kontras lebih rendah terhadap putih, `.btn-accent` memakai teks gelap
(`text-neutral-900`), bukan putih, supaya tetap mudah dibaca.

## Arsitektur token (3 layer)

Semua token hidup di `src/input.css` → `@theme`.

| Layer | Contoh | Kapan ubah |
| --- | --- | --- |
| **Primitive** | `neutral-*`, `primary-*`, `success-*` | Jarang — fondasi brand |
| **Semantic** | `background`, `surface`, `fg`, `fg-muted`, `border` | Theme / meaning |
| **Component** | `radius-control`, `radius-card`, `text-btn-lg`, `--z-dropdown` | Per-komponen |

**Aturan:** komponen baru pakai semantic (`bg-surface`, `text-fg`, `border-border`)
atau class kit (`.btn-primary`, `.card`). Hindari `bg-white` / `text-slate-*`
langsung di komponen bersama. Neutral owned (`neutral-*`) menggantikan
pinjaman Tailwind `slate` untuk DS.

**Dark mode:** belum. Keputusan eksplisit = light-only sampai semantic map
punya pasangan `.dark { --color-background: … }`. Jangan tambah `dark:`
ad-hoc di template sebelum itu.

## Font

Satu keluarga font untuk semua teks: **Instrument Sans** (400/500/600/700), supaya
kedua halaman tetap konsisten dengan produk SEVIMA lain dan bisa dibuka tanpa
koneksi internet. `@font-face` didefinisikan di awal `src/input.css`; lisensi
OFL font ini ada di `assets/fonts/InstrumentSans/OFL.txt` (lihat juga
`THIRD-PARTY-LICENSES.md`).

## Mengembangkan

Butuh Node.js (disarankan v18+).

```bash
npm install       # sekali saja
npm run watch     # build ulang otomatis saat src/input.css berubah
npm run build     # build sekali, hasil di-minify
```

Ubah token warna/shadow/font di `src/input.css` bagian `@theme`, atau tambah
komponen baru di `@layer components`. Karena Tailwind v4 men-scan kelas yang
benar-benar dipakai di `index.html`/`templates/dashboard.html`, kelas baru
otomatis ikut ter-build tanpa perlu ubah konfigurasi apa pun.

**Catatan Tailwind v4:** `@apply` hanya bisa memanggil utility asli (bawaan
atau `@utility` kustom) — bukan class komponen lain. Base button digabung
lewat selector list bersama (`.btn, .btn-primary, …`); varian hanya menambah
warna.

## Creator

Dibuat oleh **Ahmad Dimas** ([ahmad.dimas@sevima.id](mailto:ahmad.dimas@sevima.id)) — SEVIMA, tim Foxtrot.

## Lisensi

Kode di repositori ini bersifat **proprietary/internal SEVIMA** — lihat
[`LICENSE`](./LICENSE). Aset pihak ketiga yang dibundel (font Instrument
Sans) tetap mengikuti lisensinya sendiri — lihat
[`THIRD-PARTY-LICENSES.md`](./THIRD-PARTY-LICENSES.md).

Riwayat perubahan ada di [`CHANGELOG.md`](./CHANGELOG.md).
