import { byKey } from "./examples.js";

export default {
  title: "Components/Pagination",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Navigasi antarhalaman. Anatomi: \`<nav aria-label="Paginasi">\` > \`.pagination\` > \`li\` > \`.pagination-link\` (tombol atau tautan); halaman aktif memakai \`aria-current="page"\` (atau \`.is-active\`), halaman terkunci memakai \`disabled\` atau \`aria-disabled="true"\`. Item juga boleh langsung menjadi anak \`.pagination\` (grup Sebelumnya | 1 dari 99 | Berikutnya).

**Gaya** pada \`.pagination\`: menyatu (default) atau \`.pagination-separate\` (tiap tombol berdiri sendiri, boleh turun baris). **Ukuran**: \`.pagination-sm\`, default, \`.pagination-lg\`. **Sel statis**: \`.pagination-static\` (elipsis, "1 dari 99"). **Ringkasan**: \`.pagination-info\`.

Footer tabel memakai \`.pagination-btn\` (datar, dirender \`table.js\`); \`.pagination-link\` untuk pagination mandiri yang bergaris.

### JavaScript opsional — \`assets/js/pagination.js\`

CSS saja sudah cukup untuk markup statis. Untuk daftar halaman yang dirender otomatis dan keadaan halaman, bungkus dengan \`data-pagination\`:

| Atribut | Fungsi |
| --- | --- |
| \`data-pagination-total\` · \`-page\` | Jumlah halaman · halaman aktif (default 1) |
| \`data-pagination-siblings\` · \`-boundary\` | Halaman di kiri/kanan aktif · di ujung (default 1 · 1) |
| \`data-pagination-nav\` | Isi Sebelumnya/Berikutnya di dalam daftar: \`text\` (default) \`icon\` \`both\` \`none\` |
| \`data-pagination-size\` · \`-count\` · \`-label\` | Data per halaman · jumlah data · kata benda untuk teks info |
| \`data-pagination-list\` | Pada \`<ul class="pagination">\`: diisi tombol halaman dan elipsis |
| \`data-pagination-prev\` · \`-next\` | Tombol Sebelumnya/Berikutnya di mana saja; otomatis nonaktif di ujung |
| \`data-pagination-jump\` | Pada \`<form>\` berisi \`<input>\`: lompat ke halaman (dijepit ke rentang) |
| \`data-pagination-select\` | Pada \`<select>\`: pilih halaman (opsi dibuat otomatis bila kosong) |
| \`data-pagination-text="info\\|page\\|total\\|range"\` | Teks yang diperbarui otomatis |

\`KKPagination.init(root?)\` · \`KKPagination.get(el)\` → \`{ page, total, goTo(n), next(), prev(), setTotal(n) }\`. Event \`pagination:change\` (bubbling, \`detail: { page, total }\`) muncul dari elemen \`data-pagination\`; memuat data untuk halaman baru adalah tugas aplikasi.
`,
      },
    },
  },
};

const stage = (ex) => `<div class="p-6">${ex.demo}</div>`;
const story = (key, extra = {}) => ({
  parameters: { docs: { description: { story: byKey[key].note } } },
  render: () => stage(byKey[key]),
  ...extra,
});

const SIZES = { sm: "pagination-sm", md: "", lg: "pagination-lg" };

function renderPlayground(args) {
  const cls = ["pagination", args.separate ? "pagination-separate" : "", SIZES[args.size]].filter(Boolean).join(" ");
  const info = args.showInfo ? `<p class="pagination-info" data-pagination-text="info" aria-live="polite"></p>` : "";
  const jump = args.showJump
    ? `<form data-pagination-jump class="flex items-center gap-2 text-sm text-fg-muted">
        <label for="pg-play-jump">Ke halaman</label>
        <input id="pg-play-jump" type="number" min="1" max="${args.total}" class="input h-10 w-20 px-2 text-center" />
      </form>`
    : "";
  return `
    <div class="p-6">
      <div data-pagination data-pagination-total="${args.total}" data-pagination-page="${args.page}" data-pagination-siblings="${args.siblings}" data-pagination-boundary="${args.boundary}" data-pagination-nav="${args.nav}" data-pagination-size="10" data-pagination-count="${args.total * 10 - 4}" class="flex flex-col items-start gap-4">
        ${info}
        <nav aria-label="Paginasi"><ul class="${cls}" data-pagination-list></ul></nav>
        ${jump}
      </div>
    </div>`;
}

export const Playground = {
  argTypes: {
    total: { control: { type: "number", min: 1, max: 200 }, description: "Jumlah halaman" },
    page: { control: { type: "number", min: 1, max: 200 }, description: "Halaman aktif" },
    siblings: { control: { type: "number", min: 0, max: 3 }, description: "Halaman di kiri/kanan halaman aktif" },
    boundary: { control: { type: "number", min: 1, max: 3 }, description: "Halaman di ujung kiri/kanan" },
    nav: { control: "inline-radio", options: ["text", "icon", "both", "none"], description: "Isi tombol Sebelumnya/Berikutnya" },
    size: { control: "inline-radio", options: ["sm", "md", "lg"], description: "Ukuran" },
    separate: { control: "boolean", description: "Tombol terpisah (tidak menyatu)" },
    showInfo: { control: "boolean", description: "Tampilkan teks ringkasan" },
    showJump: { control: "boolean", description: "Tampilkan kolom lompat ke halaman" },
  },
  args: { total: 24, page: 9, siblings: 1, boundary: 1, nav: "icon", size: "md", separate: false, showInfo: true, showJump: true },
  render: renderPlayground,
};

export const DefaultPagination = { name: "Default pagination", ...story("default") };
export const PaginationWithIcons = { name: "Pagination with icons", ...story("icons") };
export const PreviousAndNext = { name: "Previous and next", ...story("previous-next") };
export const PreviousAndNextWithIcons = { name: "Previous and next with icons", ...story("previous-next-icons") };
export const TableDataPagination = { name: "Table data pagination", ...story("table-data") };
export const TablePaginationWithIcons = { name: "Table pagination with icons", ...story("table-icons") };
export const PaginationWithDropdown = { name: "Pagination with dropdown", ...story("dropdown") };
export const PaginationWithInput = { name: "Pagination with input", ...story("input") };
export const InputFieldAndButton = { name: "Input field and button", ...story("input-button") };
export const SelectInputAndButtons = { name: "Select input and buttons", ...story("select-buttons") };
export const SinglePagination = { name: "Single pagination", ...story("single") };
export const SeparatedPagination = { name: "Separated pagination", ...story("separated") };
export const PaginationWithEllipsis = { name: "Pagination with ellipsis", ...story("ellipsis") };
