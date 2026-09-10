# Changelog

Format mengikuti [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.0.0] — 2026-09-10

### Added
- Design tokens (`src/input.css`): palet warna primer (violet) & semantik
  (success/warning/danger/info), shadow, dan gradasi brand, dibangun dengan
  Tailwind CSS v4 (`@theme` + `@utility`).
- Pustaka komponen: button, badge, avatar, card, form, navigasi, tabel,
  callout/alert, progress bar, tab, dan tooltip (`@layer components`).
- `index.html` — style guide/dokumentasi visual seluruh token & komponen.
- `dashboard.html` — dashboard KarirKit (AI Career Coach untuk pencari
  kerja) sebagai implementasi nyata dari design system.
- Font Instrument Sans di-hosting lokal (diambil dari Quantum design system
  SEVIMA), menggantikan Google Fonts agar kedua halaman berjalan offline.
- Dokumen proyek: README, LICENSE, THIRD-PARTY-LICENSES, CHANGELOG.

Rilis internal pertama — belum ada remote git untuk proyek ini.
