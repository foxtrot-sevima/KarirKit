/* Contoh Pagination — satu sumber untuk Storybook (Pagination.stories.js) dan index.html.
   Tiap contoh: { key, name, note, wide?, demo }
     demo = markup contoh (kotak contoh di index.html)
   Contoh 1–6 hanya markup + CSS (tanpa JS). Contoh 7–13 interaktif lewat assets/js/pagination.js (data-pagination). */

const ic = (n, cls = "h-4 w-4") => `<i class="kk kk-${n} ${cls}"></i>`;
const tip = (btn, text) => `<span class="group relative inline-flex">${btn}<span class="tooltip-content">${text}</span></span>`;
const eyebrow = (t) => `<p class="mb-2 text-xs font-medium text-fg-subtle">${t}</p>`;

/* ---- Markup statis ---- */
const link = (inner, attrs = "") => `<a href="#" class="pagination-link" ${attrs}>${inner}</a>`;
const li = (inner) => `<li>${inner}</li>`;

// Daftar bernomor 1–5 dengan Sebelumnya/Berikutnya; `prev`/`next` = isi tautan (teks atau ikon)
const numbered = ({ prev, next, cls = "", current = 3, sr = false }) => `
<nav aria-label="Paginasi">
  <ul class="pagination ${cls}">
    ${li(link(sr ? `${prev}<span class="sr-only">Sebelumnya</span>` : prev))}
    ${[1, 2, 3, 4, 5].map((p) => li(link(p, p === current ? 'aria-current="page"' : ""))).join("\n    ")}
    ${li(link(sr ? `${next}<span class="sr-only">Berikutnya</span>` : next))}
  </ul>
</nav>`;

const sized = (render) => `<div class="space-y-5">
  <div>${eyebrow("Small")}${render("pagination-sm")}</div>
  <div>${eyebrow("Default")}${render("")}</div>
  <div>${eyebrow("Large")}${render("pagination-lg")}</div>
</div>`;

// Hanya Sebelumnya/Berikutnya: dua tautan yang membulat sendiri
const pair = ({ prev, next, cls = "" }) => `
<nav aria-label="Paginasi">
  <div class="pagination pagination-separate ${cls}">
    ${link(prev)}
    ${link(next)}
  </div>
</nav>`;

// Teks ringkasan di atas tombol (pola di bawah tabel)
const tableData = ({ prev, next, cls = "" }) => `
<div class="flex flex-col items-center gap-3">
  <span class="pagination-info">Menampilkan <b>1</b> sampai <b>10</b> dari <b>100</b> data</span>
  <nav aria-label="Paginasi data">
    <div class="pagination ${cls}">
      ${link(prev)}
      ${link(next)}
    </div>
  </nav>
</div>`;

/* ---- Interaktif (assets/js/pagination.js) ---- */
const jumpInput = (id, extra = "") =>
  `<input id="${id}" type="number" min="1" inputmode="numeric" class="input h-10 w-20 px-2 text-center" ${extra} />`;

const prevBtn = (inner, attrs = "") => `<button type="button" class="pagination-link" data-pagination-prev ${attrs}>${inner}</button>`;
const nextBtn = (inner, attrs = "") => `<button type="button" class="pagination-link" data-pagination-next ${attrs}>${inner}</button>`;

export const examples = [
  {
    key: "default",
    name: "Default pagination",
    note: "Daftar bernomor yang menyatu: `.pagination` > `li` > `.pagination-link`, halaman aktif memakai `aria-current=\"page\"`. Ukuran lewat `.pagination-sm` dan `.pagination-lg` pada daftar. Hanya markup dan CSS.",
    demo: sized((cls) => numbered({ prev: "Sebelumnya", next: "Berikutnya", cls })),
  },
  {
    key: "icons",
    name: "Pagination with icons",
    note: "Sebelumnya/Berikutnya diganti ikon. Teks tetap ada untuk pembaca layar (`.sr-only`).",
    demo: sized((cls) => numbered({ prev: ic("caret-left"), next: ic("caret-right"), cls, sr: true })),
  },
  {
    key: "previous-next",
    name: "Previous and next",
    note: "Hanya dua tombol, tanpa nomor halaman: `.pagination.pagination-separate` agar tiap tombol membulat sendiri.",
    demo: `<div class="space-y-5">
  <div>${eyebrow("Small")}${pair({ prev: "Sebelumnya", next: "Berikutnya", cls: "pagination-sm" })}</div>
  <div>${eyebrow("Default")}${pair({ prev: "Sebelumnya", next: "Berikutnya" })}</div>
</div>`,
  },
  {
    key: "previous-next-icons",
    name: "Previous and next with icons",
    note: "Dua tombol dengan panah dan teks.",
    demo: `<div class="space-y-5">
  <div>${eyebrow("Small")}${pair({ prev: `${ic("arrow-left")}Sebelumnya`, next: `Berikutnya${ic("arrow-right")}`, cls: "pagination-sm" })}</div>
  <div>${eyebrow("Default")}${pair({ prev: `${ic("arrow-left")}Sebelumnya`, next: `Berikutnya${ic("arrow-right")}` })}</div>
</div>`,
  },
  {
    key: "table-data",
    name: "Table data pagination",
    note: "Ringkasan jumlah data (`.pagination-info`) di atas tombol, cocok di bawah tabel.",
    demo: `<div class="space-y-8">
  <div>${eyebrow("Small")}${tableData({ prev: "Sebelumnya", next: "Berikutnya", cls: "pagination-sm" })}</div>
  <div>${eyebrow("Default")}${tableData({ prev: "Sebelumnya", next: "Berikutnya" })}</div>
</div>`,
  },
  {
    key: "table-icons",
    name: "Table pagination with icons",
    note: "Pola yang sama dengan tombol berpanah.",
    demo: `<div class="space-y-8">
  <div>${eyebrow("Small")}${tableData({ prev: `${ic("arrow-left")}Sebelumnya`, next: `Berikutnya${ic("arrow-right")}`, cls: "pagination-sm" })}</div>
  <div>${eyebrow("Default")}${tableData({ prev: `${ic("arrow-left")}Sebelumnya`, next: `Berikutnya${ic("arrow-right")}` })}</div>
</div>`,
  },
  {
    key: "dropdown",
    name: "Pagination with dropdown",
    note: "Daftar halaman interaktif di samping pilihan jumlah data per halaman. Perubahan jumlah per halaman ditangani aplikasi (mis. lewat `setTotal()`).",
    demo: `<div data-pagination data-pagination-total="5" data-pagination-page="1" class="flex flex-wrap items-center gap-4">
  <nav aria-label="Paginasi"><ul class="pagination" data-pagination-list></ul></nav>
  <select class="input h-10 w-auto" aria-label="Data per halaman">
    <option>10 per halaman</option>
    <option>25 per halaman</option>
    <option>50 per halaman</option>
    <option>100 per halaman</option>
  </select>
</div>`,
  },
  {
    key: "input",
    name: "Pagination with input",
    note: "Lompat ke halaman tertentu: ketik nomor lalu tekan Enter (`data-pagination-jump`). Nomor di luar rentang dijepit ke halaman pertama/terakhir.",
    demo: `<div data-pagination data-pagination-total="12" data-pagination-page="1" data-pagination-nav="icon" class="flex flex-wrap items-center gap-x-6 gap-y-3">
  <nav aria-label="Paginasi"><ul class="pagination" data-pagination-list></ul></nav>
  <form data-pagination-jump class="flex items-center gap-2 text-sm text-fg-muted">
    <label for="pg-jump-a">Ke halaman</label>
    ${jumpInput("pg-jump-a", 'max="12" aria-describedby="pg-jump-a-hint"')}
    <span id="pg-jump-a-hint" class="sr-only">Tekan Enter untuk pindah halaman</span>
  </form>
</div>`,
  },
  {
    key: "input-button",
    name: "Input field and button",
    note: "Kolom nomor halaman dengan tombol Buka. Teks info (`data-pagination-text=\"info\"`) menunjukkan halaman aktif.",
    demo: `<div data-pagination data-pagination-total="99" data-pagination-page="1" class="space-y-3">
  <form data-pagination-jump class="flex flex-wrap items-center gap-3 text-sm text-fg-muted">
    <label for="pg-jump-b">Ke halaman</label>
    ${jumpInput("pg-jump-b", 'max="99"')}
    <button type="submit" class="btn-primary btn-md">Buka</button>
  </form>
  <p class="pagination-info" data-pagination-text="info" aria-live="polite"></p>
</div>`,
  },
  {
    key: "select-buttons",
    name: "Select input and buttons",
    note: "Pilih halaman dari daftar (`data-pagination-select`, opsi dibuat otomatis), dengan jumlah halaman dan tombol panah berpetunjuk (tooltip).",
    demo: `<div data-pagination data-pagination-total="99" data-pagination-page="1" class="flex flex-wrap items-center gap-3">
  <label class="sr-only" for="pg-select-a">Halaman</label>
  <select id="pg-select-a" class="input h-10 w-24" data-pagination-select></select>
  <span class="text-sm text-fg-muted">dari <span data-pagination-text="total"></span> halaman</span>
  <nav aria-label="Paginasi">
    <div class="pagination" role="group">
      ${tip(prevBtn(`${ic("caret-left")}<span class="sr-only">Halaman sebelumnya</span>`), "Sebelumnya")}
      ${tip(nextBtn(`${ic("caret-right")}<span class="sr-only">Halaman berikutnya</span>`), "Berikutnya")}
    </div>
  </nav>
</div>`,
  },
  {
    key: "single",
    name: "Single pagination",
    note: "Satu grup: Sebelumnya, posisi saat ini (`.pagination-static`), dan Berikutnya. Tombol otomatis nonaktif di ujung (`data-pagination-prev` / `data-pagination-next`).",
    demo: `<div data-pagination data-pagination-total="99" data-pagination-page="1">
  <nav aria-label="Paginasi">
    <div class="pagination" role="group">
      ${prevBtn(`${ic("arrow-left")}Sebelumnya`)}
      <span class="pagination-static" aria-live="polite"><b data-pagination-text="page" class="font-semibold text-fg"></b>&nbsp;dari&nbsp;<b data-pagination-text="total" class="font-semibold text-fg"></b></span>
      ${nextBtn(`Berikutnya${ic("arrow-right")}`)}
    </div>
  </nav>
</div>`,
  },
  {
    key: "separated",
    name: "Separated pagination",
    note: "Tiap tombol berdiri sendiri: tambahkan `.pagination-separate` (jarak `gap-1.5`, semua sudut membulat). Cocok bila daftar boleh turun baris di layar sempit.",
    demo: `<div data-pagination data-pagination-total="8" data-pagination-page="2" data-pagination-nav="icon">
  <nav aria-label="Paginasi"><ul class="pagination pagination-separate" data-pagination-list></ul></nav>
</div>`,
  },
  {
    key: "ellipsis",
    name: "Pagination with ellipsis",
    note: "Untuk halaman yang banyak: lebar daftar tetap, elipsis muncul di sela halaman yang disembunyikan. Atur `data-pagination-siblings` dan `data-pagination-boundary`; dengarkan event `pagination:change`.",
    wide: true,
    demo: `<div data-pagination data-pagination-total="24" data-pagination-page="9" data-pagination-size="10" data-pagination-count="236" data-pagination-nav="both" class="flex flex-col items-start gap-4">
  <p class="pagination-info" data-pagination-text="info" aria-live="polite"></p>
  <nav aria-label="Paginasi"><ul class="pagination" data-pagination-list></ul></nav>
</div>`,
  },
];

export const byKey = Object.fromEntries(examples.map((e) => [e.key, e]));
