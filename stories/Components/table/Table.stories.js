import { avatarImg, coverSrc } from "../../_helpers/placeholders.js";

// ---------------------------------------------------------------------------
// Sample data (lowongan / pelamar) shared by the examples below.
// ---------------------------------------------------------------------------
const rp = (n) => "Rp" + n.toLocaleString("id-ID");
const JOBS = [
  ["Frontend Engineer", "Gojek", "Teknologi", 18000000, 12],
  ["Product Designer", "Tokopedia", "Desain", 15000000, 4],
  ["Data Analyst", "Traveloka", "Data", 14000000, 8],
  ["Marketing Specialist", "Bukalapak", "Pemasaran", 11000000, 6],
  ["HR Business Partner", "Telkom Indonesia", "SDM", 13000000, 3],
  ["Backend Engineer", "Shopee", "Teknologi", 20000000, 10],
  ["UI/UX Researcher", "Blibli", "Desain", 12500000, 5],
  ["Finance Analyst", "Bank Mandiri", "Keuangan", 12000000, 7],
  ["Content Strategist", "Kompas Gramedia", "Pemasaran", 9500000, 2],
  ["DevOps Engineer", "Tiket.com", "Teknologi", 19000000, 6],
  ["Customer Success", "Ruangguru", "Operasional", 8500000, 9],
  ["Recruiter", "Astra", "SDM", 10000000, 4],
];
const USERS = [
  ["Neil Sims", "neil.sims@email.com", "Frontend Engineer", "Online", "Berpengalaman 3 tahun di React dan desain sistem."],
  ["Bonnie Green", "bonnie@email.com", "Product Designer", "Online", "Fokus pada riset pengguna dan prototipe."],
  ["Jese Leos", "jese@email.com", "Data Analyst", "Offline", "Menyukai visualisasi data dan SQL."],
  ["Thomas Lean", "thomas@email.com", "Backend Engineer", "Online", "Membangun API skala besar dengan Node.js."],
  ["Leslie Livingston", "leslie@email.com", "Marketing Specialist", "Offline", "Pengalaman kampanye digital 4 tahun."],
  ["Michael Gough", "michael@email.com", "DevOps Engineer", "Online", "CI/CD, Kubernetes, dan observabilitas."],
  ["Lana Byrd", "lana@email.com", "Recruiter", "Offline", "Spesialis rekrutmen teknologi."],
];
const exBlock = (inner) => `<div class="p-6">${inner}</div>`;
const ic = (n, cls = "h-4 w-4") => `<i class="kk kk-${n} ${cls}"></i>`;
const editLink = `<a href="#" class="card-link">Edit</a>`;
const deleteLink = `<a href="#" class="inline-flex items-center text-sm font-semibold text-danger-600 hover:text-danger-700 hover:underline">Hapus</a>`;
const search = (id = "ts") => `
  <div class="relative">
    <span class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-fg-subtle">${ic("magnifying-glass")}</span>
    <label for="${id}" class="sr-only">Cari</label>
    <input id="${id}" type="search" class="input h-10 w-64 pl-10" placeholder="Cari" data-table-search />
  </div>`;
// Every table carries a "No" column; table.js renumbers it after sort/filter/paging.
const noTh = `<th scope="col" class="table-col-num">No</th>`;
const noTd = (i) => `<td class="table-col-num" data-num>${i + 1}</td>`;
const headCells = (cols) => noTh + cols.map((c) => `<th scope="col">${c}</th>`).join("");
const jobRows = (n = 5, extra = () => "") =>
  JOBS.slice(0, n).map((j, i) => `<tr>
        ${noTd(i)}<td class="font-medium text-fg">${j[0]}</td><td>${j[1]}</td><td>${j[2]}</td><td data-value="${j[3]}">${rp(j[3])}</td><td data-value="${j[4]}">${j[4]}</td>${extra(j)}
      </tr>`).join("");
const JOB_COLS = ["Posisi", "Perusahaan", "Kategori", "Gaji", "Kuota"];
const simpleTable = (cls, { rows = 5, wrap = "table-wrap", extraHead = "", extra } = {}) => exBlock(`
  <div class="${wrap}"><table class="table ${cls}">
    <thead><tr>${headCells(JOB_COLS)}${extraHead}</tr></thead>
    <tbody>${jobRows(rows, extra)}</tbody>
  </table></div>`);
const sortHead = (label, type) => `<th scope="col" data-sort="${type}"><button type="button" class="th-sort">${label}${ic("caret-up-down", "sort-icon")}</button></th>`;
const statusCell = (s) => `<div class="flex items-center gap-2"><span class="badge-dot ${s === "Online" ? "bg-success-500" : "bg-danger-500"}"></span><span data-cell="status">${s}</span></div>`;
const userCell = (u, i) => `<div class="flex items-center gap-3">${avatarImg(i, "avatar avatar-lg", u[0])}<div class="min-w-0"><div class="font-medium text-fg" data-cell="name">${u[0]}</div><div class="text-xs text-fg-muted">${u[1]}</div></div></div>`;

export default {
  title: "Components/Table",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Tabel data. Gaya: `.table` di dalam `.table-wrap` (scroll horizontal + border + radius). Varian: `.table-striped`, `.table-striped-cols`, `.table-hover`, `.table-borderless`, `.table-bordered`, `.table-sm`/`.table-lg`, `.table-sticky` (dengan `.table-scroll`), `.table-head-soft`, `.table-wrap-shadow`, plus `<caption class=\"table-caption\">` dan `<tfoot>`. Fungsi (sortir, cari, filter, pagination, pilih baris, counter, modal edit) disediakan `assets/js/table.js` lewat atribut `data-table`, `data-sort`, `data-table-search`, `data-page-size`, `data-table-select*`, dst. Toolbar: **pencarian di kiri, filter/aksi sebagai dropdown di kanan** (di semua tabel). Teks header kolom memakai **Title Case** (Capital Each Word, mis. Periode Yudisium, Status Karier) - bukan huruf kapital semua. Footer + aksi baris mengikuti pola **Table with users**: info Menampilkan a-b dari n di kiri, pagination di kanan; aksi baris = tautan teks (mis. Edit, Hapus) tanpa menu titik tiga, header kolom aksi `sr-only`. Setiap tabel punya kolom **No** (`.table-col-num` + `data-num`) yang diberi nomor ulang mengikuti urutan tampilan - setelah sortir, filter, pagination (lanjut 6, 7, …), dan hapus baris. Untuk integrasi halaman: `KKTable.get(root).addFilter(fn)`/`refresh()`, event `table:render` (`detail.visible`), `<select data-table-page-size>`, dan `data-item-label`. Tanpa JS tabel tetap tampil benar; template lama (`.table`, `.th-sortable`, `.table-col-*`) tidak berubah.",
      },
    },
  },
};

export const DefaultTable = { name: "Default table", render: () => simpleTable("table-head-soft table-static") };

export const StripedRows = { name: "Striped rows", render: () => simpleTable("table-head-soft table-striped", { extraHead: `<th scope="col"><span class="sr-only">Aksi</span></th>`, extra: () => `<td class="text-right">${editLink}</td>` }) };

export const StripedColumns = { name: "Striped columns", render: () => simpleTable("table-head-soft table-striped-cols table-static") };

export const HoverState = { name: "Hover state", render: () => simpleTable("table-head-soft table-hover") };

export const TableHead = {
  name: "Table head",
  render: () =>
    exBlock(`<div class="table-wrap" data-table>
      <table class="table table-head-soft">
        <thead><tr>${noTh}${sortHead("Posisi", "text")}${sortHead("Perusahaan", "text")}${sortHead("Kategori", "text")}${sortHead("Gaji", "number")}${sortHead("Kuota", "number")}<th scope="col"><span class="sr-only">Aksi</span></th></tr></thead>
        <tbody>${jobRows(5, () => `<td class="text-right">${editLink}</td>`)}</tbody>
      </table>
    </div>`),
};

export const TableFoot = {
  name: "Table foot",
  render: () =>
    exBlock(`<div class="table-wrap"><table class="table table-head-soft table-static">
      <thead><tr>${headCells(JOB_COLS)}</tr></thead>
      <tbody>${jobRows(4)}</tbody>
      <tfoot><tr><th scope="row" colspan="4">Total</th><td>${rp(JOBS.slice(0, 4).reduce((a, j) => a + j[3], 0))}</td><td>${JOBS.slice(0, 4).reduce((a, j) => a + j[4], 0)}</td></tr></tfoot>
    </table></div>`),
};

export const TableCaption = {
  name: "Table caption",
  render: () =>
    exBlock(`<div class="table-wrap"><table class="table table-head-soft table-static">
      <caption class="table-caption">Lowongan aktif<p>Daftar lowongan dari perusahaan mitra beserta kisaran gaji dan sisa kuota pelamar.</p></caption>
      <thead><tr>${headCells(JOB_COLS)}</tr></thead>
      <tbody>${jobRows(4)}</tbody>
    </table></div>`),
};

export const WithoutBorder = { name: "Without border", render: () => simpleTable("table-borderless table-striped", { wrap: "table-wrap table-wrap-borderless" }) };

export const TableWithShadow = { name: "Table with shadow", render: () => simpleTable("table-head-soft", { wrap: "table-wrap table-wrap-shadow" }) };

export const OverflowScrolling = {
  name: "Overflow scrolling",
  render: () => {
    const cols = ["Posisi", "Perusahaan", "Kategori", "Lokasi", "Tipe", "Level", "Gaji", "Kuota", "Pelamar", "Tenggat", "Status"];
    const rows = JOBS.slice(0, 5).map((j, i) => `<tr>
      <td class="w-10"><input type="checkbox" class="form-check form-check-sm" aria-label="Pilih ${j[0]}" /></td>
      ${noTd(i)}<td class="font-medium text-fg whitespace-nowrap">${j[0]}</td><td class="whitespace-nowrap">${j[1]}</td><td>${j[2]}</td><td>Jakarta</td><td>Full-time</td><td>Junior</td>
      <td class="whitespace-nowrap">${rp(j[3])}</td><td>${j[4]}</td><td>${120 + i * 17}</td><td class="whitespace-nowrap">3${i} Okt 2026</td><td><span class="badge badge-success badge-rounded">Dibuka</span></td>
    </tr>`).join("");
    return exBlock(`<div class="table-wrap max-w-3xl"><table class="table table-head-soft table-static">
      <thead><tr><th class="w-10"><input type="checkbox" class="form-check form-check-sm" aria-label="Pilih semua" /></th>${headCells(cols)}</tr></thead>
      <tbody>${rows}</tbody>
    </table></div>`);
  },
};

export const TableSearch = {
  name: "Table search",
  render: () =>
    exBlock(`<div class="table-wrap" data-table>
      <div class="table-toolbar">${search("ts-1")}</div>
      <table class="table table-head-soft"><thead><tr>${headCells(JOB_COLS)}</tr></thead><tbody>${jobRows(8)}</tbody></table>
      <div data-table-empty hidden class="table-empty">Tidak ada lowongan yang cocok dengan pencarianmu.</div>
    </div>`),
};

export const TableFilter = {
  name: "Table filter",
  render: () => {
    const cats = [...new Set(JOBS.map((j) => j[2]))];
    return exBlock(`<div class="table-wrap" data-table>
      <div class="table-toolbar">
        ${search("ts-2")}
        <div class="relative">
          <button type="button" class="btn-outline btn-md" data-ui-dropdown aria-expanded="false" aria-haspopup="true">${ic("funnel")}<span data-table-filter-label data-default="Filter">Filter</span>${ic("caret-down", "h-3 w-3")}</button>
          <div class="dropdown-menu hidden w-48">
            <button type="button" class="dropdown-item" data-filter-col="3" data-filter-value="">Semua kategori</button>
            ${cats.map((c) => `<button type="button" class="dropdown-item" data-filter-col="3" data-filter-value="${c}">${c}</button>`).join("")}
          </div>
        </div>
      </div>
      <table class="table table-head-soft"><thead><tr>${headCells(JOB_COLS)}</tr></thead><tbody>${jobRows(12)}</tbody></table>
      <div data-table-empty hidden class="table-empty">Tidak ada lowongan yang cocok.</div>
    </div>`);
  },
};

const pagination = `<div class="table-footer" data-table-pagination><span data-table-info></span><nav data-table-pages class="flex items-center gap-1" aria-label="Halaman"></nav></div>`;

export const TablePagination = {
  name: "Table pagination",
  render: () =>
    exBlock(`<div class="table-wrap" data-table data-page-size="5">
      <table class="table table-head-soft"><thead><tr>${headCells(JOB_COLS)}</tr></thead><tbody>${jobRows(12)}</tbody></table>
      ${pagination}
    </div>`),
};

export const CheckboxSelection = {
  name: "Checkbox selection",
  render: () =>
    exBlock(`<div class="table-wrap" data-table>
      <div data-table-bulk hidden class="table-bulk">
        <span><b data-table-selected-count>0</b> baris dipilih</span>
        <span class="ml-auto flex gap-2"><button type="button" class="btn-outline btn-sm">${ic("archive", "h-3.5 w-3.5")}Arsipkan</button><button type="button" class="btn-danger btn-sm">${ic("trash", "h-3.5 w-3.5")}Hapus</button></span>
      </div>
      <table class="table table-head-soft">
        <thead><tr><th class="w-10"><input type="checkbox" class="form-check form-check-sm" data-table-select-all aria-label="Pilih semua" /></th>${headCells(JOB_COLS)}</tr></thead>
        <tbody>${JOBS.slice(0, 6).map((j, i) => `<tr>
          <td><input type="checkbox" class="form-check form-check-sm" data-table-select aria-label="Pilih ${j[0]}" /></td>
          ${noTd(i)}<td class="font-medium text-fg">${j[0]}</td><td>${j[1]}</td><td>${j[2]}</td><td>${rp(j[3])}</td><td>${j[4]}</td></tr>`).join("")}</tbody>
      </table>
    </div>`),
};

export const TableWithUsers = {
  name: "Table with users",
  render: () =>
    exBlock(`<div class="table-wrap" data-table data-page-size="5" data-item-label="pelamar">
      <div class="table-toolbar">${search("ts-u")}<span class="text-sm text-fg-muted">${USERS.length} pelamar</span></div>
      <table class="table table-head-soft table-hover">
        <thead><tr><th class="w-10"><input type="checkbox" class="form-check form-check-sm" data-table-select-all aria-label="Pilih semua" /></th>${noTh}
          ${sortHead("Nama", "text")}${sortHead("Posisi", "text")}${sortHead("Status", "text")}<th scope="col"><span class="sr-only">Aksi</span></th></tr></thead>
        <tbody>${USERS.map((u, i) => `<tr>
          <td><input type="checkbox" class="form-check form-check-sm" data-table-select aria-label="Pilih ${u[0]}" /></td>
          ${noTd(i)}<td>${userCell(u, i)}</td><td>${u[2]}</td><td>${statusCell(u[3])}</td>
          <td><div class="flex items-center justify-end gap-4">${editLink}${deleteLink}</div></td></tr>`).join("")}</tbody>
      </table>
      <div data-table-empty hidden class="table-empty">Pelamar tidak ditemukan.</div>
      ${pagination}
    </div>`),
};

const CART = [
  ["Kelas Persiapan Interview", 149000, 1, 0],
  ["Workshop Portofolio Kreatif", 99000, 2, 1],
  ["Sertifikasi Analisis Data", 249000, 1, 2],
];

export const TableWithProducts = {
  name: "Table with products",
  render: () =>
    exBlock(`<div class="table-wrap" data-table>
      <table class="table table-head-soft table-static">
        <thead><tr>${noTh}<th class="w-24"><span class="sr-only">Gambar</span></th><th scope="col">Kelas</th><th scope="col">Jumlah</th><th scope="col">Harga</th><th scope="col"><span class="sr-only">Hapus</span></th></tr></thead>
        <tbody>${CART.map(([n, p, q, i], idx) => `<tr data-price="${p}">
          ${noTd(idx)}<td><img src="${coverSrc(i)}" alt="${n}" class="h-14 w-20 rounded-lg object-cover" /></td>
          <td class="font-medium text-fg">${n}</td>
          <td><div class="counter" data-counter data-min="1" data-max="9">
            <button type="button" class="counter-btn" data-counter-dec aria-label="Kurangi">${ic("minus", "h-3.5 w-3.5")}</button>
            <input type="number" class="counter-input" value="${q}" min="1" max="9" aria-label="Jumlah ${n}" />
            <button type="button" class="counter-btn" data-counter-inc aria-label="Tambah">${ic("plus", "h-3.5 w-3.5")}</button>
          </div></td>
          <td class="font-semibold text-fg" data-line-total>${rp(p * q)}</td>
          <td class="text-right"><a href="#" class="text-sm font-medium text-danger-600 hover:underline" data-row-remove>Hapus</a></td></tr>`).join("")}</tbody>
        <tfoot><tr><th scope="row" colspan="4" class="text-right">Total</th><td colspan="2" data-cart-total>${rp(CART.reduce((a, c) => a + c[1] * c[2], 0))}</td></tr></tfoot>
      </table>
      <div data-table-empty hidden class="table-empty">Keranjang kosong.</div>
    </div>`),
};

export const TableWithModal = {
  name: "Table with modal",
  render: () =>
    exBlock(`<div class="table-wrap" data-table>
      <div class="table-toolbar">
        ${search("ts-m")}
        <div class="relative">
          <button type="button" class="btn-outline btn-md" data-ui-dropdown aria-expanded="false" aria-haspopup="true">Aksi${ic("caret-down", "h-3 w-3")}</button>
          <div class="dropdown-menu hidden w-48">
            <a href="#" class="dropdown-item">Tambah pelamar</a><a href="#" class="dropdown-item">Ekspor CSV</a><a href="#" class="dropdown-item dropdown-item-danger">Hapus terpilih</a>
          </div>
        </div>
      </div>
      <table class="table table-head-soft table-hover">
        <thead><tr>${noTh}<th scope="col">Nama</th><th scope="col">Posisi</th><th scope="col">Status</th><th scope="col"><span class="sr-only">Aksi</span></th></tr></thead>
        <tbody>${USERS.slice(0, 4).map((u, i) => `<tr data-user-name="${u[0]}" data-user-position="${u[2]}" data-user-status="${u[3]}" data-user-bio="${u[4]}">
          ${noTd(i)}<td>${userCell(u, i)}</td><td data-cell="position">${u[2]}</td><td>${statusCell(u[3])}</td>
          <td class="text-right"><a href="#" class="card-link" data-table-modal-open="#tbl-modal-user">Edit pelamar</a></td></tr>`).join("")}</tbody>
      </table>
      <div class="modal-backdrop" id="tbl-modal-user" data-table-modal role="dialog" aria-modal="true" aria-labelledby="tbl-modal-title">
        <div class="modal-panel modal-md">
          <div class="modal-header"><h3 class="modal-title" id="tbl-modal-title">Edit <span data-modal-name></span></h3>
            <button type="button" class="modal-close" data-table-modal-close aria-label="Tutup">${ic("x")}</button></div>
          <div class="modal-body space-y-4">
            <div><label class="form-label" for="tbl-f-name">Nama</label><input id="tbl-f-name" class="input" data-field="name" /></div>
            <div><label class="form-label" for="tbl-f-position">Posisi</label><input id="tbl-f-position" class="input" data-field="position" /></div>
            <fieldset><legend class="form-label">Status</legend>
              <div class="flex gap-6"><label class="check-row items-center"><input type="radio" name="status" value="Online" class="form-radio" /><span class="check-label">Online</span></label>
              <label class="check-row items-center"><input type="radio" name="status" value="Offline" class="form-radio" /><span class="check-label">Offline</span></label></div></fieldset>
            <div><label class="form-label" for="tbl-f-bio">Biografi</label><textarea id="tbl-f-bio" rows="3" class="input h-auto py-2" data-field="bio"></textarea></div>
          </div>
          <div class="modal-footer"><button type="button" class="btn-primary btn-md" data-table-modal-save>Perbarui</button><button type="button" class="btn-outline btn-md" data-table-modal-close>Batal</button></div>
        </div>
      </div>
    </div>`),
};
