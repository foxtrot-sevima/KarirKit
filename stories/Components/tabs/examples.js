/* Contoh Tabs — satu sumber untuk Storybook (Tabs.stories.js) dan index.html.
   Tiap contoh: { key, name, note, wide?, demo }. Tab interaktif memakai assets/js/ui.js (data-ui-tabs). */

const ic = (n, cls = "h-4 w-4") => `<i class="kk kk-${n} ${cls}" aria-hidden="true"></i>`;

const LABELS = ["Profil", "Dasbor", "Pengaturan", "Kontak"];
const ICONS = ["user-circle", "squares-four", "sliders-horizontal", "phone"];

/* Tab tautan statis: item aktif memakai aria-current="page", item nonaktif memakai aria-disabled="true" */
const links = (cls, active, { withDisabled = true, icons = false, labels = LABELS } = {}) => {
  const items = labels.map((l, i) => `<a href="#" class="tabs-item"${i === active ? ' aria-current="page"' : ""}>${icons ? ic(ICONS[i]) : ""}${l}</a>`);
  if (withDisabled) items.push(`<span class="tabs-item" aria-disabled="true">Nonaktif</span>`);
  return `<nav class="${cls}" aria-label="Tab">\n    ${items.join("\n    ")}\n  </nav>`;
};

const tabsSelect = (id, options) => `<div class="sm:hidden">
    <label for="${id}" class="sr-only">Pilih tab</label>
    <select id="${id}" class="input" data-ui-tab-select>${options.map((o, i) => `<option value="${o.toLowerCase()}"${i === 0 ? " selected" : ""}>${o}</option>`).join("")}</select>
  </div>`;

/* Tab interaktif dengan panel */
const panels = (id, labels, { activeClasses = "", inactiveClasses = "" } = {}) => {
  const attrs = (activeClasses ? ` data-ui-tabs-active-classes="${activeClasses}"` : "") + (inactiveClasses ? ` data-ui-tabs-inactive-classes="${inactiveClasses}"` : "");
  return `<div data-ui-tabs${attrs}>
    <div class="tabs tabs-underline mb-4" role="tablist" aria-label="Contoh tab">
      ${labels.map((l, i) => `<button type="button" role="tab" id="${id}-t${i}" class="tabs-item" data-ui-tab="${id}-p${i}" aria-selected="${i === 0}">${l}</button>`).join("\n      ")}
    </div>
    ${labels.map((l, i) => `<div role="tabpanel" id="${id}-p${i}" aria-labelledby="${id}-t${i}" class="rounded-control bg-neutral-50 p-4 text-sm text-fg-muted${i === 0 ? "" : " hidden"}">Ini isi tab <span class="font-medium text-fg">${l}</span>. Panel lain disembunyikan sampai tabnya dipilih.</div>`).join("\n    ")}
  </div>`;
};

const vertical = `<div data-ui-tabs class="md:flex">
    <div class="tabs tabs-vertical mb-4 md:me-4 md:mb-0 md:w-48 md:shrink-0" role="tablist" aria-orientation="vertical" aria-label="Tab vertikal">
      ${LABELS.map((l, i) => `<button type="button" role="tab" id="vt-t${i}" class="tabs-item" data-ui-tab="vt-p${i}" aria-selected="${i === 0}">${ic(ICONS[i])}${l}</button>`).join("\n      ")}
      <span class="tabs-item" aria-disabled="true">${ic("lock-simple")}Nonaktif</span>
    </div>
    ${LABELS.map((l, i) => `<div role="tabpanel" id="vt-p${i}" aria-labelledby="vt-t${i}" class="w-full rounded-control bg-neutral-50 p-6 text-sm text-fg-muted${i === 0 ? "" : " hidden"}">
      <h3 class="mb-3 text-lg font-semibold text-fg">Tab ${l}</h3>
      <p class="mb-2">Ini isi tab <span class="font-medium text-fg">${l}</span> pada tampilan vertikal.</p>
      <p>Di layar kecil daftar tab tampil di atas panel.</p>
    </div>`).join("\n    ")}
  </div>`;

export const examples = [
  {
    key: "default",
    name: "Default tabs",
    note: "<code>.tabs.tabs-default</code> berisi <code>.tabs-item</code>; tab aktif memakai <code>aria-current=\"page\"</code> (atau <code>aria-selected=\"true\"</code>), tab nonaktif memakai <code>aria-disabled=\"true\"</code>.",
    demo: links("tabs tabs-default", 0),
  },
  {
    key: "underline",
    name: "Tabs with underline",
    note: "<code>.tabs-underline</code>: garis bawah penuh dengan penanda aktif di bawah tab.",
    demo: links("tabs tabs-underline", 1),
  },
  {
    key: "icons",
    name: "Tabs with icons",
    note: "Ikon <code>kk-*</code> di kiri label; jarak otomatis dari <code>gap-2</code> pada <code>.tabs-item</code>.",
    demo: links("tabs tabs-underline", 1, { icons: true }),
  },
  {
    key: "pills",
    name: "Pills tabs",
    note: "<code>.tabs-pills</code>: tab berbentuk pil, aktif berlatar primer.",
    demo: links("tabs tabs-pills", 0, { labels: ["Tab 1", "Tab 2", "Tab 3", "Tab 4"] }),
  },
  {
    key: "vertical",
    name: "Vertical tabs",
    note: "<code>.tabs-vertical</code> di samping panel pada layar <code>md</code> ke atas, menumpuk di ponsel. Interaktif lewat <code>data-ui-tabs</code>.",
    wide: true,
    demo: vertical,
  },
  {
    key: "full",
    name: "Full width tabs",
    note: "<code>.tabs-full</code>: tab menyatu selebar kontainer. Di ponsel tampilkan <code>&lt;select&gt;</code> (<code>sm:hidden</code>) dan sembunyikan tab (<code>hidden sm:flex</code>).",
    wide: true,
    demo: `${tabsSelect("tabs-sel-1", ["Profil", "Dasbor", "Pengaturan", "Tagihan"])}
  ${links("tabs tabs-full hidden sm:flex", 0, { withDisabled: false, labels: ["Profil", "Dasbor", "Pengaturan", "Tagihan"] })}`,
  },
  {
    key: "full-icons",
    name: "Full width tabs with icons",
    note: "Sama seperti tab selebar kontainer, dengan ikon di kiri label.",
    wide: true,
    demo: `${tabsSelect("tabs-sel-2", ["Profil", "Dasbor", "Pengaturan", "Tagihan"])}
  ${links("tabs tabs-full hidden sm:flex", 0, { withDisabled: false, icons: true, labels: ["Profil", "Dasbor", "Pengaturan", "Tagihan"] })}`,
  },
  {
    key: "interactive",
    name: "Interactive tabs",
    note: "Tab dengan panel: bungkus dengan <code>data-ui-tabs</code>, beri tab <code>role=\"tab\"</code> dan <code>data-ui-tab=\"id-panel\"</code>. Panah kiri/kanan berpindah tab, Home dan End ke tab pertama/terakhir.",
    demo: panels("it", LABELS),
  },
  {
    key: "custom",
    name: "Active tab style",
    note: "Warna tab aktif dan nonaktif bisa diganti per komponen lewat <code>data-ui-tabs-active-classes</code> dan <code>data-ui-tabs-inactive-classes</code> pada <code>data-ui-tabs</code>.",
    demo: panels("ct", LABELS, { activeClasses: "!text-secondary-600 !border-secondary-500", inactiveClasses: "text-fg-muted" }),
  },
];

export const byKey = Object.fromEntries(examples.map((e) => [e.key, e]));
