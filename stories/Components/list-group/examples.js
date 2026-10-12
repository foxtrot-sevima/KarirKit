/* Contoh List group — satu sumber untuk Storybook (ListGroup.stories.js) dan index.html.
   Tiap contoh: { key, name, note, wide?, demo }. Hanya CSS (tanpa JS). */

const ic = (n, cls = "h-4 w-4") => `<i class="kk kk-${n} ${cls}" aria-hidden="true"></i>`;

const ITEMS = ["Profil", "Pengaturan", "Pesan", "Unduh"];

const plain = ITEMS.map((l) => `<li class="list-group-item">${l}</li>`).join("\n    ");
const links = ITEMS.map((l, i) => `<a href="#" class="list-group-item list-group-item-action"${i === 0 ? ' aria-current="true"' : ""}>${l}</a>`).join("\n    ");
const buttons = [...ITEMS.slice(0, 3), "Opsi", "Unduh"].map((l, i, a) =>
  `<button type="button" class="list-group-item list-group-item-action"${i === 0 ? ' aria-current="true"' : ""}${i === a.length - 1 ? " disabled" : ""}>${l}</button>`).join("\n    ");
const withIcons = [["user", "Profil"], ["gear-six", "Pengaturan"], ["chat-circle", "Pesan"], ["download-simple", "Unduh"]]
  .map(([i, l], n) => `<a href="#" class="list-group-item list-group-item-action"${n === 0 ? ' aria-current="true"' : ""}>${ic(i)}${l}</a>`).join("\n    ");

const feature = (text, off = false) => `<li class="flex items-center gap-2${off ? " line-through decoration-fg-subtle" : ""}">${ic("check-circle", `h-5 w-5 shrink-0 ${off ? "text-fg-subtle" : "text-primary-600"}`)}<span class="${off ? "text-fg-subtle" : "text-fg-muted"}">${text}</span></li>`;

const STATS = [
  ["devices", "Elektronik", "Rp5 M"], ["t-shirt", "Fesyen", "Rp2,78 M"], ["couch", "Perabot rumah", "Rp1,8 M"], ["car", "Otomotif", "Rp1,1 M"],
  ["fork-knife", "Makanan dan minuman", "Rp987 jt"], ["puzzle-piece", "Mainan", "Rp705 jt"], ["book-open", "Buku dan musik", "Rp688 jt"], ["printer", "Perlengkapan kantor", "Rp534 jt"],
];
const stat = ([i, l, v], last) => `<li class="flex items-center justify-between ${last ? "" : "pb-3"}"><span class="flex items-center gap-2 text-fg-muted">${ic(i, "h-5 w-5 shrink-0")}${l}</span><span class="font-medium text-fg">${v}</span></li>`;

const USERS = [["Neil Sims", "neil@karirkit.com", "primary"], ["Bonnie Green", "bonnie@karirkit.com", "success"], ["Michael Gough", "michael@karirkit.com", "info"], ["Lana Byrd", "lana@karirkit.com", "warning"], ["Thomas Lean", "thomas@karirkit.com", "danger"]];
const initials = (n) => n.split(" ").map((p) => p[0]).join("");
const user = ([n, e, tone], i, a) => `<li class="${i === 0 ? "pb-4" : i === a.length - 1 ? "pt-4" : "py-4"}">
        <div class="flex items-center gap-3">
          <span class="avatar avatar-md bg-${tone}-100 text-${tone}-700 shrink-0">${initials(n)}</span>
          <div class="min-w-0 flex-1"><p class="truncate text-sm font-medium text-fg">${n}</p><p class="truncate text-sm text-fg-muted">${e}</p></div>
          <div class="inline-flex shrink-0 items-center gap-1.5">
            <button type="button" class="btn-outline btn-sm">Ikuti</button>
            <span class="group relative inline-flex"><button type="button" class="btn-ghost btn-icon-sm text-danger-600" aria-label="Hapus ${n}">${ic("trash")}</button><span class="tooltip-content">Hapus</span></span>
          </div>
        </div>
      </li>`;

export const examples = [
  {
    key: "default",
    name: "Default list group",
    note: "<code>.list-group</code> membungkus baris-baris <code>.list-group-item</code> yang dipisah garis. Lebar diatur dengan utilitas (<code>w-48</code>).",
    demo: `<ul class="list-group w-48">
    ${plain}
  </ul>`,
  },
  {
    key: "links",
    name: "List group with links",
    note: "Tautan sebagai item dengan <code>.list-group-item-action</code> (hover dan fokus); item aktif memakai <code>aria-current=\"true\"</code>.",
    demo: `<div class="list-group w-48">
    ${links}
  </div>`,
  },
  {
    key: "buttons",
    name: "List group with buttons",
    note: "Tombol sebagai item. Atribut <code>disabled</code> mematikan baris dan memberi kursor tidak boleh.",
    demo: `<div class="list-group w-48">
    ${buttons}
  </div>`,
  },
  {
    key: "icons",
    name: "List group with icons",
    note: "Ikon <code>kk-*</code> di kiri label; jarak antar-isi dari <code>gap-2</code> pada item.",
    demo: `<div class="list-group w-48">
    ${withIcons}
  </div>`,
  },
  {
    key: "features",
    name: "Features list group",
    note: "Daftar fitur dalam kartu: ikon centang untuk fitur yang tersedia, teks tercoret untuk yang tidak.",
    demo: `<div class="card w-72 p-6">
  <ul role="list" class="space-y-4 text-sm">
    ${feature("2 anggota tim")}
    ${feature("Penyimpanan 20 GB")}
    ${feature("Bantuan integrasi")}
    ${feature("Berkas desain", true)}
    ${feature("Akses API", true)}
    ${feature("Dokumentasi lengkap", true)}
    ${feature("Telepon 24x7", true)}
  </ul>
</div>`,
  },
  {
    key: "stats",
    name: "Statistic list with divider",
    note: "Label berikon di kiri dan nilai di kanan; pemisah antar-baris dari <code>divide-y</code>.",
    demo: `<div class="card w-96 max-w-full p-6">
  <ul role="list" class="space-y-3 divide-y divide-border text-sm">
    ${STATS.map((s, i) => stat(s, i === STATS.length - 1)).join("\n    ")}
  </ul>
</div>`,
  },
  {
    key: "avatars",
    name: "List with avatars and CTA",
    note: "Daftar pengguna dalam kartu: avatar, nama dan email (terpotong bila panjang), tombol aksi, dan tombol ikon dengan tooltip.",
    demo: `<div class="card w-full max-w-sm p-6">
  <h3 class="mb-6 text-xl font-semibold text-fg">Pengguna terbaru</h3>
  <div class="flow-root">
    <ul role="list" class="divide-y divide-border">
      ${USERS.map(user).join("\n      ")}
    </ul>
  </div>
</div>`,
  },
];

export const byKey = Object.fromEntries(examples.map((e) => [e.key, e]));
