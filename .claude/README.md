# .claude - skill Claude Code untuk KarirKit

> Aturan inti untuk semua AI agent ada di `AGENTS.md` di akar repo (`CLAUDE.md` dan `GEMINI.md` hanya meng-import-nya). Skill di sini adalah detail per topik yang dirujuk dari `AGENTS.md`.

Folder ini berisi *skill* (panduan yang dimuat Claude Code otomatis bila relevan) berisi konvensi dan keputusan desain KarirKit, supaya semua engineer yang memakai Claude Code di repo ini mendapat arahan yang sama. Setiap skill ada di `skills/<nama>/SKILL.md` dengan front matter `name` + `description`; Claude memilih skill berdasarkan `description`-nya, dan Anda juga bisa memanggilnya manual lewat `/nama-skill`.

| Skill | Dipakai untuk |
|---|---|
| `karirkit-conventions` | Dua lingkup (design system vs template) dan pemisahan commit, nama branch, nama komponen = Storybook, KarirIcon, responsive = adaptive UX |
| `karirkit-figma-sync` | Penomoran SemVer untuk Figma, versi Figma = tag repo, token = `@theme`, changelog dan Known Issues Figma, alur rilis, Variable Modes, Code Connect |
| `karirkit-release` | Checklist rilis, alur release vs staging di Vercel, push GitHub + GitLab, rilis hanya atas perintah |
| `karirlink-admin-pages` | Tabel, KPI, grafik, combo, modal/laci di atas sidebar, merek kampus di admin (`templates/karirlink`) |
| `karirkit-modal` | Komponen Modal: sumber contoh, generator `index.html`, API |
| `portal-karir-ui` | Aturan Portal Karir, satu halaman satu file, `PK_CAMPUS`, konfigurasi Landing Page (`landing.js`) |
| `tracer-study-format-2025` | Format kuesioner Pasca-Lulus 2025 vs lampau di builder/simulasi |
| `karirkit-verify-in-browser` | Cara memverifikasi tampilan desktop/ponsel dan aman memakai browser |

## Merawat skill
- Skill mencatat **keputusan tim** yang tidak terbaca dari kode. Jangan menyalin isi kode atau riwayat git ke sini.
- Ubah skill di PR yang sama dengan perubahan konvensinya, dan tulis tanggal/alasan singkat bila keputusannya baru.
- Jangan menulis nama UI kit/library pihak ketiga di sini (aturan `karirkit-conventions`).
- File lokal sesi (mis. `scheduled_tasks.lock`) bukan bagian dari skill dan tidak perlu di-commit.
