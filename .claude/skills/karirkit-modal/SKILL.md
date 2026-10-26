---
name: karirkit-modal
description: Komponen Modal KarirKit - sumber tunggal contoh (stories/Components/modal/examples.js), bagian Modal di index.html yang digenerate, atribut dan API assets/js/modal.js, dan aturan z-index di template karirlink. Pakai saat menambah atau mengubah contoh modal.
---

# Komponen Modal

- **Sumber tunggal contoh:** `stories/Components/modal/examples.js` (default, popup, form, sizes, placement, static, scrolling, timeline, choice, create; tiap contoh `{key, name, note, demo, modals}`). `Modal.stories.js` mengimpornya; `name` story harus string literal di `export` agar sidebar Storybook menampilkannya, mis. `export const Popup = { name: "Pop-up modal", ...story("popup") }`.
- **Bagian Modal di `index.html` digenerate, bukan diedit tangan.** Skrip Node sekali pakai (tidak disimpan di repo) mengimpor `examples.js` dan membangun ulang blok di antara komentar `<!-- ====== MODAL` dan `<!-- ====== NAVIGATION` (grid kartu + modal ditambahkan sesudahnya), sama seperti bagian Table. Bila contoh berubah, generate ulang bagian itu.
- **Perilaku** ada di `assets/js/modal.js`: `data-modal-toggle|show|hide` (alias `-target`/`-trigger`/`-close`), `data-modal-placement`, `data-modal-backdrop="static"`, `data-modal-keyboard="false"`, API `KKModal.open/close/toggle/closeAll/isOpen`, event `modal:show` / `modal:hide`. Dimuat di `index.html` dan `.storybook/preview-head.html`. Modal lama yang mengubah `.is-open` sendiri (`data-table-modal` di table.js, skrip inline di `yudisium-detail.html`) tetap jalan dan tidak dikelola `modal.js`.
- Storybook merender tiap story modal dalam iframe sendiri (`docs.story.inline: false`) karena modal `position: fixed`.
- **Di template karirlink** modal perlu `class="modal-backdrop z-[60]"` (sidebar z-50 di atas overlay bawaan). Lihat skill `karirlink-admin-pages`.
- Jika Storybook sudah jalan di port 6006 (biasanya milik rekan), `storybook dev -p 6006` otomatis pindah ke 6007; uji ke yang sudah ada, dan hanya matikan proses yang Anda mulai sendiri.
