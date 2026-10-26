/* Contoh Navbar — satu sumber untuk Storybook (Navbar.stories.js) dan index.html.
   Tiap contoh: { key, name, note, wide?, demo }. Menu ponsel: assets/js/ui.js (data-ui-collapse); dropdown: data-ui-dropdown. */

const ic = (n, cls = "h-4 w-4") => `<i class="kk kk-${n} ${cls}" aria-hidden="true"></i>`;
const stage = (h, inner) => `<div style="min-height:${h}rem">${inner}</div>`;

const brand = `<a href="#" class="navbar-brand"><span class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">${ic("briefcase", "h-4 w-4")}</span>KarirKit</a>`;

const toggle = (id, cls = "", icon = "list") =>
  `<button type="button" class="navbar-toggle ${cls}" data-ui-collapse data-ui-collapse-static aria-controls="${id}" aria-expanded="false" aria-label="Buka menu">${ic(icon, "h-5 w-5")}</button>`;

const LINKS = ["Beranda", "Tentang", "Layanan", "Harga", "Kontak"];
const link = (l, i, extra = "") => `<li><a href="#" class="navbar-link"${i === 0 ? ' aria-current="page"' : ""}${extra}>${l}</a></li>`;
const plainLinks = (labels = LINKS) => labels.map((l, i) => link(l, i)).join("\n        ");

const menu = (id, items, cls = "") => `<div class="navbar-menu ${cls}" id="${id}">
      <ul class="navbar-nav">
        ${items}
      </ul>
    </div>`;

const nav = (inner, cls = "") => `<nav class="navbar ${cls}" aria-label="Navigasi utama">
  <div class="navbar-inner">
    ${inner}
  </div>
</nav>`;

const dd = (label, items, { attrs = "", id } = {}) => `<li class="dropdown w-full md:w-auto">
          <button type="button" class="navbar-link flex w-full items-center justify-between gap-1.5 md:w-auto" data-ui-dropdown aria-expanded="false" aria-haspopup="true" ${attrs}>${label}${ic("caret-down", "h-3.5 w-3.5")}</button>
          <div class="dropdown-menu hidden w-44" data-placement="bottom-start">
            ${items}
          </div>
        </li>`;
const dItem = (l, cls = "") => `<a href="#" class="dropdown-item ${cls}">${l}</a>`;
const basic = ["Dasbor", "Pengaturan", "Pendapatan"].map((l) => dItem(l)).join("\n            ") + "\n            " + dItem("Keluar", "dropdown-item-danger");

const initials = "RK";
const avatarBtn = `<button type="button" class="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2" data-ui-dropdown aria-expanded="false" aria-haspopup="true" aria-label="Buka menu pengguna"><span class="avatar avatar-md">${initials}</span></button>`;

const search = (id) => `<div class="relative">
        <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-subtle">${ic("magnifying-glass", "h-4 w-4")}</span>
        <input type="search" id="${id}" class="input h-10 pl-9 text-sm" placeholder="Cari..." aria-label="Cari" />
      </div>`;

export const examples = [
  {
    key: "default",
    name: "Default navbar",
    note: "<code>nav.navbar</code> > <code>.navbar-inner</code> memuat merek (<code>.navbar-brand</code>), tombol menu (<code>.navbar-toggle</code>, hanya di ponsel), dan <code>.navbar-menu</code> > <code>ul.navbar-nav</code> > <code>.navbar-link</code>. Tautan aktif memakai <code>aria-current=\"page\"</code>. Menu ponsel dibuka lewat <code>data-ui-collapse</code>.",
    wide: true,
    demo: stage(12, nav(`${brand}
    ${toggle("nb-default")}
    ${menu("nb-default", plainLinks())}`)),
  },
  {
    key: "dropdown",
    name: "Navbar with dropdown",
    note: "Item menu dengan dropdown: <code>li.dropdown</code> berisi tombol <code>.navbar-link</code> + <code>.dropdown-menu</code>.",
    wide: true,
    demo: stage(15, nav(`${brand}
    ${toggle("nb-dd")}
    ${menu("nb-dd", `${link("Beranda", 0)}
        ${dd("Dropdown", basic)}
        ${link("Layanan", 1)}
        ${link("Harga", 1)}
        ${link("Kontak", 1)}`)}`)),
  },
  {
    key: "multilevel",
    name: "Multi-level dropdown",
    note: "Dropdown di dalam dropdown: tombol di dalam <code>.dropdown-menu</code> membuka submenu ke samping (<code>data-ui-dropdown-placement=\"right-start\"</code>).",
    wide: true,
    demo: stage(17, nav(`${brand}
    ${toggle("nb-multi")}
    ${menu("nb-multi", `${link("Beranda", 0)}
        ${dd("Dropdown", `${dItem("Dasbor")}
            <div class="relative">
              <button type="button" class="dropdown-item justify-between" data-ui-dropdown aria-expanded="false" aria-haspopup="true" data-ui-dropdown-placement="right-start" data-ui-dropdown-offset-distance="8">Dropdown ${ic("caret-right", "h-3.5 w-3.5")}</button>
              <div class="dropdown-menu hidden w-44">
                ${["Ikhtisar", "Unduhan saya", "Tagihan", "Hadiah"].map((l) => dItem(l)).join("\n                ")}
              </div>
            </div>
            ${dItem("Pendapatan")}
            ${dItem("Keluar")}`)}
        ${link("Layanan", 1)}
        ${link("Kontak", 1)}`)}`)),
  },
  {
    key: "cta",
    name: "Navbar with CTA button",
    note: "Grup aksi <code>.navbar-actions</code> (tombol ajakan + tombol menu) berpindah ke kanan; <code>.navbar-sticky</code> menempel di atas saat digulir, <code>.navbar-fixed</code> mengunci ke tepi atas layar.",
    wide: true,
    demo: stage(12, nav(`${brand}
    <div class="navbar-actions">
      <button type="button" class="btn-primary btn-sm">Mulai</button>
      ${toggle("nb-cta")}
    </div>
    ${menu("nb-cta", plainLinks(["Beranda", "Tentang", "Layanan", "Kontak"]), "md:order-1")}`, "navbar-sticky")),
  },
  {
    key: "submenu",
    name: "Navbar with submenu",
    note: "Dua baris: baris atas untuk kontak dan masuk, baris bawah untuk tautan utama (tanpa tombol menu, tautan membungkus di ponsel).",
    wide: true,
    demo: `<header>
  <nav class="navbar border-b-0" aria-label="Informasi">
    <div class="navbar-inner py-2">
      <a href="#" class="text-sm text-fg-muted hover:underline">(021) 555-1234</a>
      <a href="#" class="text-sm font-medium text-primary-600 hover:underline">Masuk</a>
    </div>
  </nav>
  <nav class="navbar navbar-solid border-y border-border" aria-label="Navigasi utama">
    <div class="navbar-inner py-3">
      <ul class="flex flex-wrap gap-x-8 gap-y-2 text-sm font-medium">
        ${["Beranda", "Perusahaan", "Tim", "Fitur"].map((l, i) => `<li><a href="#" class="text-fg hover:underline"${i === 0 ? ' aria-current="page"' : ""}>${l}</a></li>`).join("\n        ")}
      </ul>
    </div>
  </nav>
</header>`,
  },
  {
    key: "search",
    name: "Navbar with search",
    note: "Kolom pencarian tampil di sisi kanan layar lebar; di ponsel kolom itu pindah ke dalam menu yang dibuka tombol menu.",
    wide: true,
    demo: stage(12, nav(`${brand}
    <div class="navbar-actions">
      <div class="hidden md:block md:w-64">${search("nb-search-d")}</div>
      ${toggle("nb-search")}
    </div>
    <div class="navbar-menu md:order-1" id="nb-search">
      <div class="mt-3 md:hidden">${search("nb-search-m")}</div>
      <ul class="navbar-nav">
        ${plainLinks(["Beranda", "Tentang", "Layanan"])}
      </ul>
    </div>`)),
  },
  {
    key: "language",
    name: "Language dropdown",
    note: "Pemilih bahasa dengan bendera (<code>kk-flag kk-flag-id</code>) di sisi kanan.",
    wide: true,
    demo: stage(15, nav(`${brand}
    <div class="navbar-actions">
      <div class="dropdown">
        <button type="button" class="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-fg hover:bg-neutral-100" data-ui-dropdown aria-expanded="false" aria-haspopup="true"><i class="kk-flag kk-flag-id text-base"></i>Indonesia${ic("caret-down", "h-3.5 w-3.5")}</button>
        <div class="dropdown-menu hidden w-44" data-placement="bottom-end">
          <a href="#" class="dropdown-item"><i class="kk-flag kk-flag-id text-base"></i>Indonesia</a>
          <a href="#" class="dropdown-item"><i class="kk-flag kk-flag-us text-base"></i>English (US)</a>
          <a href="#" class="dropdown-item"><i class="kk-flag kk-flag-de text-base"></i>Deutsch</a>
          <a href="#" class="dropdown-item"><i class="kk-flag kk-flag-jp text-base"></i>日本語</a>
        </div>
      </div>
      ${toggle("nb-lang")}
    </div>
    ${menu("nb-lang", plainLinks(), "md:order-1")}`)),
  },
  {
    key: "user",
    name: "User menu dropdown",
    note: "Avatar sebagai pemicu menu pengguna dengan kepala berisi nama dan email.",
    wide: true,
    demo: stage(17, nav(`${brand}
    <div class="navbar-actions">
      <div class="dropdown">
        ${avatarBtn}
        <div class="dropdown-menu hidden w-56" data-placement="bottom-end">
          <div class="px-3 py-2"><p class="truncate text-sm font-medium text-fg">Rina Kartika</p><p class="truncate text-sm text-fg-muted">rina@kampus.ac.id</p></div>
          <hr class="dropdown-divider" />
          ${basic}
        </div>
      </div>
      ${toggle("nb-user")}
    </div>
    ${menu("nb-user", plainLinks(), "md:order-1")}`)),
  },
  {
    key: "mega",
    name: "Mega menu navbar",
    note: "Menu lebar penuh: tombol \"Perusahaan\" membuka panel kartu tautan di bawah navbar (<code>data-ui-collapse</code>).",
    wide: true,
    demo: stage(18, `<nav class="navbar" aria-label="Navigasi utama">
  <div class="navbar-inner">
    ${brand}
    ${toggle("nb-mega")}
    ${menu("nb-mega", `${link("Beranda", 0)}
        <li><button type="button" class="navbar-link flex w-full items-center justify-between gap-1.5 md:w-auto" data-ui-collapse data-ui-collapse-static aria-controls="nb-mega-panel" aria-expanded="false">Perusahaan${ic("caret-down", "h-3.5 w-3.5")}</button></li>
        ${link("Pasar", 1)}
        ${link("Sumber daya", 1)}
        ${link("Kontak", 1)}`)}
  </div>
  <div id="nb-mega-panel" class="hidden border-y border-border bg-surface shadow-card">
    <div class="mx-auto grid max-w-7xl px-4 py-5 sm:grid-cols-2 md:grid-cols-3 md:px-6">
      <ul class="space-y-1">
        <li><a href="#" class="block rounded-lg p-3 hover:bg-neutral-100"><span class="block font-semibold text-fg">Toko Online</span><span class="text-sm text-fg-muted">Hubungkan ke platform penjualan</span></a></li>
        <li><a href="#" class="block rounded-lg p-3 hover:bg-neutral-100"><span class="block font-semibold text-fg">Segmentasi</span><span class="text-sm text-fg-muted">Kelompokkan audiens</span></a></li>
      </ul>
      <ul class="space-y-1">
        <li><a href="#" class="block rounded-lg p-3 hover:bg-neutral-100"><span class="block font-semibold text-fg">CRM Pemasaran</span><span class="text-sm text-fg-muted">Kelola pelanggan dan prospek</span></a></li>
        <li><a href="#" class="block rounded-lg p-3 hover:bg-neutral-100"><span class="block font-semibold text-fg">Manajemen Audiens</span><span class="text-sm text-fg-muted">Pantau pertumbuhan audiens</span></a></li>
      </ul>
      <ul class="hidden space-y-1 md:block">
        <li><a href="#" class="block rounded-lg p-3 hover:bg-neutral-100"><span class="block font-semibold text-fg">Alat Kreatif</span><span class="text-sm text-fg-muted">Rancang materi kampanye</span></a></li>
        <li><a href="#" class="block rounded-lg p-3 hover:bg-neutral-100"><span class="block font-semibold text-fg">Otomasi Pemasaran</span><span class="text-sm text-fg-muted">Jadwalkan kampanye otomatis</span></a></li>
      </ul>
    </div>
  </div>
</nav>`),
  },
  {
    key: "solid",
    name: "Solid background",
    note: "<code>.navbar-solid</code>: latar berwarna alih-alih putih bergaris.",
    wide: true,
    demo: stage(12, nav(`${brand}
    ${toggle("nb-solid")}
    ${menu("nb-solid", plainLinks())}`, "navbar-solid")),
  },
  {
    key: "hamburger",
    name: "Hamburger menu",
    note: "Tombol menu selalu tampil di semua ukuran layar (<code>data-ui-collapse</code> tanpa <code>md:hidden</code>): tambahkan <code>.navbar-toggle-always</code> dan hapus <code>md:block</code> pada menu.",
    wide: true,
    demo: stage(14, nav(`${brand}
    ${toggle("nb-ham", "navbar-toggle-always")}
    <div class="hidden w-full" id="nb-ham">
      <ul class="mt-4 flex flex-col gap-1 border-t border-border pt-4 font-medium">
        ${plainLinks(["Beranda", "Layanan", "Harga", "Kontak"])}
      </ul>
    </div>`, "navbar-solid")),
  },
];

export const byKey = Object.fromEntries(examples.map((e) => [e.key, e]));
