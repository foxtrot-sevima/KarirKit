---
name: karirkit-release
description: Alur rilis dan staging KarirKit - checklist rilis (CHANGELOG, versi, Table of Version, install docs, PR, tag), alur deploy release vs staging di Vercel, push ke GitHub + GitLab, dan aturan bahwa rilis hanya dilakukan atas perintah eksplisit. Pakai saat menyiapkan versi, memindahkan kode ke staging, atau diminta merilis.
---

# Rilis dan staging KarirKit

## Aturan utama
- **Versi semver, Table of Version, tag, dan publish hanya untuk komponen design system.** Perubahan mockup template KarirLink/Portal Karir tidak menaikkan versi; dicatat di `templates/CHANGELOG.md` dengan tanggal (lihat skill `karirkit-conventions` bagian 0). Commit dipisah per lingkup (`feat(ds)` vs `feat(karirlink)` / `feat(portal-karir)`).
- Checklist rilis di bawah hanya untuk branch `karirkit/<versi>` dan `CHANGELOG.md` (design system); catatan template ke `templates/CHANGELOG.md` dari branch `mockup/<tanggal>`.
- **Rilis hanya atas perintah eksplisit** (merge PR rilis ke `master`, PR `master` -> `release`, tag, GitHub release, deploy `master` -> `karirkit/vercel`). Persetujuan rilis sebelumnya tidak berlaku untuk rilis berikutnya.
- "Siapkan / jadikan versi X" = ubah file + commit + push branch + paling jauh PR *draft*. Berhenti di situ dan katakan jelas bahwa belum ada yang dirilis.
- `master` hanya berisi kode yang sudah dirilis. Pekerjaan belum rilis masuk ke `staging` untuk pratinjau.

## Dua keluarga branch, satu jalur deploy
Cabang utama dan deploy dipakai bersama oleh kedua keluarga branch (lihat skill `karirkit-conventions` bagian 0 dan 1):
| Sumber | Lingkup | Versi | Jadi komponen/npm? |
|---|---|---|---|
| `karirkit/<versi>` | Design System | semver `X.Y.Z` | **ya** (publish, tag, GitHub release) |
| `mockup/<YYYY-MM-DD>` | Template KarirLink/Portal Karir | tanggal | tidak |

| Alur | Rantai branch | Hasil |
|---|---|---|
| Release | `karirkit/<versi>` atau `mockup/<tanggal>` > `master` > `release` > `karirkit/vercel` | `karirkit.vercel.app` + storybook rilis (`karirkit`, `storybook-karirkit`); paket npm hanya bila ada versi baru |
| Staging | `karirkit/<versi>` atau `mockup/<tanggal>` > `staging` > `karirkit/staging-vercel` | `dev-karirkit.vercel.app` + storybook staging (`dev-karirkit`, `dev-storybook-karirkit`) |

- Rilis mockup = merge `mockup/<tanggal>` ke `master` > `release` > `karirkit/vercel` **tanpa** naik versi, tanpa Table of Version, tanpa tag, tanpa GitHub release, tanpa sinkron Figma versi.
- Bila mockup butuh komponen baru: `karirkit/<versi>` yang memuatnya masuk lebih dulu (staging dulu, lalu rilis); mockup menyusul, jangan terbalik.
- **Gerbang produksi untuk mockup:** `mockup/<tanggal>` masuk `master`/`release` hanya bila komponen yang dipakainya sudah dirilis (`Dasar KarirKit` di `templates/CHANGELOG.md` = versi yang sudah bertag). Sebelum itu mockup boleh menumpuk di atas branch `karirkit/<versi>` untuk staging saja. Komponen kecil yang menghambat boleh dirilis cepat sebagai patch. Cek: `npm run check:templates`.
- **`dist/` tidak di-commit.** Dibangun lewat `npm run build` (lokal setelah clone, `publish.yml`, dan Build Command Vercel project `karirkit` dan `dev-karirkit`; atur di dashboard, bukan `vercel.json`). Jangan merge ke `karirkit/vercel` atau `karirkit/staging-vercel` sebelum Build Command terisi.
- **Publish hanya untuk versi baru.** `publish.yml` berjalan pada setiap push ke `release` dan `npm publish` menolak versi yang sudah terbit (E409). Merge mockup ke `release` tidak boleh memicu publish: workflow perlu guard (mis. lewati bila `package.json` version sudah ada di registry) sebelum alur ini dipakai. Sampai guard ada, run publish yang gagal pada merge mockup dianggap bising, bukan kegagalan rilis.
- Hanya dua cabang deploy: `karirkit/vercel` (rilis) dan `karirkit/staging-vercel` (staging). Tidak ada branch `vercel` perantara. `karirkit/staging-vercel` menerima merge dari `staging`; merge commit itulah yang memicu build. Kerjakan merge ke cabang deploy di worktree sementara agar working tree yang berisi pekerjaan lain tidak terganggu.

## Checklist rilis (satu commit rilis)
1. `CHANGELOG.md`: section baru `## [X.Y.Z] - tanggal` (pindahkan dari `[Unreleased]`); halaman Changelog di Storybook membaca file ini.
2. Naikkan `version` di `package.json` dan dua field versi di bagian atas `package-lock.json`.
3. Ubah `npm install @foxtrot-sevima/karirkit@X.Y.Z` di `README.md` dan `stories/Guides/Installation.mdx`.
4. **`stories/Guides/TableOfVersion.mdx` wajib diperbarui setiap rilis**: tambah baris baru paling atas di `rows` (versi, tanggal, catatan satu baris, `githubAnchor` berbentuk digit versi + `---` + tanggal, mis. `131---2026-10-01`) dan tambah tautan tag `vX.Y.Z` di kalimat tag bagian bawah. Buka filenya setelah diedit dan pastikan barisnya benar-benar ada (selisih CRLF/LF pernah membuat penggantian skrip gagal diam-diam).
5. Grep nama UI kit pihak ketiga (lihat skill `karirkit-conventions`) di repo dan di catatan rilis yang dihasilkan.
6. Alur: branch `karirkit/X.Y.Z` (atau `mockup/<tanggal>` untuk mockup, tanpa langkah versi/tag) -> PR ke `master` -> PR `master` -> `release` (push ke `release` memicu `publish.yml` -> GitHub Packages). GitHub Packages menolak publish ulang versi yang sama (E409): versi terbit tidak bisa ditimpa, naikkan versi.
7. Setelah publish: tag + GitHub release `vX.Y.Z` (`gh release create --target <sha release>`, catatan dari section CHANGELOG) dan cek dist-tag `latest`.
8. **Sinkron Figma** (skill `karirkit-figma-sync`): versi Figma = tag repo; tulis entri `[X.Y.Z]` di Changelog Figma, samakan token dengan `@theme` di `src/input.css`, buat Named Version `vX.Y.Z`, perbarui Index dan Known Issues. Hanya untuk rilis design system, bukan perubahan template.
9. Deploy: Vercel hanya deploy dari `karirkit/vercel`; buka PR `master` -> `karirkit/vercel` lalu merge, dan cek `gh api repos/foxtrot-sevima/KarirKit/deployments`.

Singkatan "merge X > master > vercel" = tepat dua PR (`karirkit/X` -> `master`, lalu `master` -> `karirkit/vercel`); tidak termasuk `master` -> `release`, publish npm, tag, atau GitHub release.

## Push ke GitHub + GitLab
`origin` mengambil dari GitHub (`foxtrot-sevima/KarirKit`) dan punya **dua pushurl** (GitHub + `gitlab.sevima.com/foxtrot/karirkit`), jadi `git push origin <branch>` mengirim ke keduanya. Tag harus dipush eksplisit. Setelah rilis, verifikasi kedua sisi identik: `LC_ALL=C git ls-remote --heads --tags <url> | sort`.
- Jika push gagal dengan "Out of memory, malloc failed" (buffer global besar): `git -c http.postBuffer=1048576 push ...`.
- Branch default GitLab `main` berisi satu commit README yang tidak terkait; jangan disentuh. Jangan force-push atau hapus ref GitLab tanpa izin.
