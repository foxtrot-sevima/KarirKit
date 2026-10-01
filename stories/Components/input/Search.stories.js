export default {
  title: "Components/Search",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Input pencarian dengan ikon, plus varian dengan keyboard shortcut hint." } },
  },
};

export const IconPrefix = {
  name: "Icon Prefix",
  render: () => `
    <div class="p-6 max-w-sm">
      <label class="form-label">Posisi yang dicari</label>
      <div class="relative">
        <span class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
          <i class="kk kk-magnifying-glass h-4 w-4"></i>
        </span>
        <input class="input pl-10" placeholder="Product Designer" />
      </div>
      <p class="form-hint">Contoh: Product Designer, Data Analyst</p>
    </div>`,
};

export const WithShortcut = {
  name: "With Keyboard Shortcut",
  render: () => `
    <div class="p-6 max-w-sm">
      <label class="form-label mb-2.5">Search dengan shortcut</label>
      <div class="relative">
        <span class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
          <i class="kk kk-magnifying-glass h-4 w-4"></i>
        </span>
        <input class="input pl-10 pr-14" placeholder="Cari sesuatu..." />
        <span class="kbd absolute right-2.5 top-1/2 -translate-y-1/2">&#8984;K</span>
      </div>
    </div>`,
};

// Appended variants

// ---------------------------------------------------------------------------
// Search input - extended layouts (see src/input.css "Input group + search")
// ---------------------------------------------------------------------------
const exBlock = (inner) => `<div class="p-6">${inner}</div>`;
const sIcon = (n, cls = "h-4 w-4") => `<i class="kk kk-${n} ${cls}"></i>`;
const magnifier = `<span class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-fg-subtle">${sIcon("magnifying-glass")}</span>`;
const submit = (label = "Cari") => `<button type="submit" class="input-group-btn">${sIcon("magnifying-glass")}<span class="sr-only sm:not-sr-only">${label}</span></button>`;

const ddGroup = (label, items) => `
  <div class="relative">
    <button type="button" class="btn-group-item h-10 whitespace-nowrap bg-neutral-50" data-ui-dropdown aria-expanded="false" aria-haspopup="true">${label}${sIcon("caret-down", "h-3 w-3")}</button>
    <div class="dropdown-menu hidden left-0 right-auto w-44">${items.map((i) => `<a href="#" class="dropdown-item">${i}</a>`).join("")}</div>
  </div>`;

export const SearchBarExample = {
  name: "Search bar example",
  render: () =>
    exBlock(`<form class="max-w-lg" onsubmit="return false" role="search">
      <label for="sb-1" class="sr-only">Cari lowongan</label>
      <div class="relative">
        ${magnifier}
        <input id="sb-1" type="search" class="input h-12 pl-10 pr-28" placeholder="Cari lowongan, perusahaan…" />
        <button type="submit" class="btn-primary btn-sm absolute right-1.5 top-1/2 -translate-y-1/2">Cari</button>
      </div>
    </form>`),
};

export const SearchWithDropdown = {
  name: "Search with dropdown",
  render: () =>
    exBlock(`<form class="min-h-16 max-w-xl" onsubmit="return false" role="search">
      <div class="input-group">
        ${ddGroup("Semua kategori", ["Semua kategori", "Lowongan", "Perusahaan", "Artikel", "Kelas"])}
        <div class="input-wrap"><input type="search" class="input" placeholder="Cari…" aria-label="Kata kunci" /></div>
        ${submit()}
      </div>
    </form>`),
};

export const SimpleSearchInput = {
  name: "Simple search input",
  render: () =>
    exBlock(`<form class="max-w-lg" onsubmit="return false" role="search">
      <div class="input-group">
        <div class="input-wrap">
          ${magnifier}
          <input type="search" class="input pl-10" placeholder="Cari posisi…" aria-label="Cari posisi" />
        </div>
        ${submit()}
      </div>
    </form>`),
};

export const LocationSearch = {
  name: "Location search",
  render: () =>
    exBlock(`<form class="min-h-16 max-w-xl" onsubmit="return false" role="search">
      <div class="input-group">
        ${ddGroup(`${sIcon("map-pin", "h-4 w-4")}Indonesia`, ["Indonesia", "Malaysia", "Singapura", "Remote global"])}
        <div class="input-wrap"><input type="search" class="input" placeholder="Kota atau alamat…" aria-label="Lokasi" /></div>
        ${submit("Cari lokasi")}
      </div>
    </form>`),
};

export const VoiceSearch = {
  name: "Voice search",
  render: () =>
    exBlock(`<form class="max-w-lg" onsubmit="return false" role="search">
      <div class="input-group">
        <div class="input-wrap">
          ${magnifier}
          <input type="search" class="input pl-10 pr-10" placeholder="Cari dengan suara atau teks…" aria-label="Pencarian" />
          <button type="button" class="input-icon-btn" aria-label="Cari dengan suara">${sIcon("microphone", "h-4 w-4")}</button>
        </div>
        ${submit()}
      </div>
    </form>`),
};

export const AdvancedSearchInput = {
  name: "Advanced search input",
  render: () =>
    exBlock(`<form class="min-h-16 max-w-3xl" onsubmit="return false" role="search">
      <div class="input-group">
        ${ddGroup("Tipe pekerjaan", ["Full-time", "Part-time", "Magang", "Kontrak"])}
        ${ddGroup("Level", ["Fresh graduate", "Junior", "Senior", "Manajer"])}
        <div class="input-wrap">
          ${magnifier}
          <input type="search" class="input pl-10" placeholder="Cari posisi, perusahaan, atau keahlian…" aria-label="Pencarian lanjutan" />
        </div>
        ${submit()}
      </div>
    </form>`),
};
