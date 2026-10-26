/* Contoh Drawer — satu sumber untuk Storybook (Drawer.stories.js) dan index.html.
   Tiap contoh: { key, name, note, wide?, demo }. Perilaku buka/tutup: assets/js/drawer.js (data-drawer-*). */

const ic = (n, cls = "h-4 w-4") => `<i class="kk kk-${n} ${cls}" aria-hidden="true"></i>`;

const close = (id) => `<button type="button" class="drawer-close" data-drawer-hide="${id}" aria-label="Tutup">${ic("x", "h-4 w-4")}</button>`;
const trigger = (id, label, icon = "", cls = "btn-primary btn-md") => `<button type="button" class="${cls}" data-drawer-toggle="${id}" aria-controls="${id}">${icon ? ic(icon) : ""}${label}</button>`;

const drawer = ({ id, title, placement = "left", body, footer = "", attrs = "", cls = "" }) => `<div class="drawer drawer-${placement} ${cls}" id="${id}" ${attrs}>
  <div class="drawer-header"><h3 class="drawer-title">${title}</h3>${close(id)}</div>
  <div class="drawer-body">${body}</div>${footer ? `\n  <div class="drawer-footer">${footer}</div>` : ""}
</div>`;

const LOREM = `<p class="mb-3">Pasang kuesioner Tracer Study ke seluruh angkatan lewat satu tautan. Alumni cukup memindai QR code dan mengisi kuesioner dari ponsel.</p>
    <p>Hasilnya langsung masuk ke dasbor sehingga program studi dapat memantau partisipasi per angkatan.</p>`;
const actions = (id) => `<button type="button" class="btn-outline btn-md" data-drawer-hide="${id}">Batal</button><button type="button" class="btn-primary btn-md" data-drawer-hide="${id}">Simpan</button>`;

const field = (id, label, extra = "") => `<div><label class="form-label" for="${id}">${label}</label><input id="${id}" class="input" ${extra} /></div>`;

export const examples = [
  {
    key: "default",
    name: "Default drawer",
    note: "<code>.drawer</code> berisi <code>.drawer-header</code> (<code>.drawer-title</code> + <code>.drawer-close</code>), <code>.drawer-body</code>, dan <code>.drawer-footer</code>. Buka dengan <code>data-drawer-toggle=\"id\"</code>; tutup dengan tombol silang, Escape, atau klik latar gelap. Default di kiri (<code>.drawer-left</code>).",
    demo: `${trigger("dr-default", "Tampilkan drawer")}
${drawer({ id: "dr-default", title: "Pengaturan Tracer", body: LOREM, footer: actions("dr-default") })}`,
  },
  {
    key: "placement",
    name: "Drawer placement",
    note: "Posisi lewat kelas <code>.drawer-left</code>, <code>.drawer-right</code>, <code>.drawer-top</code>, atau <code>.drawer-bottom</code> (atau atribut <code>data-drawer-placement</code>). Lebar kiri/kanan diatur dengan utilitas <code>w-*</code> (default 20rem).",
    wide: true,
    demo: `<div class="flex flex-wrap gap-3">
  ${trigger("dr-left", "Kiri", "arrow-line-left", "btn-outline btn-md")}
  ${trigger("dr-right", "Kanan", "arrow-line-right", "btn-outline btn-md")}
  ${trigger("dr-top", "Atas", "arrow-line-up", "btn-outline btn-md")}
  ${trigger("dr-bottom", "Bawah", "arrow-line-down", "btn-outline btn-md")}
</div>
${drawer({ id: "dr-left", title: "Drawer kiri", placement: "left", body: LOREM, cls: "w-96" })}
${drawer({ id: "dr-right", title: "Drawer kanan", placement: "right", body: LOREM, cls: "w-96" })}
${drawer({ id: "dr-top", title: "Drawer atas", placement: "top", body: LOREM })}
${drawer({ id: "dr-bottom", title: "Drawer bawah", placement: "bottom", body: LOREM })}`,
  },
  {
    key: "swipe",
    name: "Bottom sheet with edge",
    note: "<code>.drawer-edge</code> pada drawer bawah menyisakan pegangan yang selalu terlihat; tombol pegangan memakai <code>data-drawer-toggle</code> dan drawer ini tanpa latar gelap (<code>data-drawer-backdrop=\"false\"</code>). <code>.drawer-contained</code> menempatkannya di dalam kontainer <code>relative</code> (di sini kotak contoh) alih-alih di tepi layar.",
    demo: `<div class="relative h-56 overflow-hidden rounded-control border border-dashed border-border bg-neutral-50">
<p class="p-4 text-sm text-fg-muted">Pegangan muncul di tepi bawah kotak ini; klik untuk membuka widget.</p>
<div class="drawer drawer-bottom drawer-edge drawer-contained" id="dr-edge" data-drawer-backdrop="false" aria-label="Widget cepat">
  <button type="button" class="drawer-handle" data-drawer-toggle="dr-edge" aria-controls="dr-edge" aria-label="Buka atau tutup widget"><span class="drawer-grab"></span><span class="block pt-2 text-sm font-medium text-fg">Aksi cepat</span></button>
  <div class="grid grid-cols-3 gap-4 p-4 lg:grid-cols-4">
    ${[["briefcase", "Lowongan"], ["calendar-check", "Event"], ["file-text", "Dokumen"], ["chart-bar", "Laporan"]].map(([i, l], n) => `<a href="#" class="${n === 3 ? "hidden lg:block " : ""}cursor-pointer rounded-control border border-border bg-neutral-50 p-4 text-center hover:bg-neutral-100"><span class="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface">${ic(i, "h-5 w-5")}</span><span class="text-sm font-medium text-fg">${l}</span></a>`).join("\n    ")}
  </div>
</div>
</div>`,
  },
  {
    key: "scrolling",
    name: "Body scrolling",
    note: "Dengan latar gelap, halaman terkunci saat drawer terbuka. <code>data-drawer-body-scrolling=\"true\"</code> membiarkan halaman tetap bisa digulir.",
    demo: `<div class="flex flex-wrap gap-3">
  ${trigger("dr-lock", "Halaman terkunci", "", "btn-outline btn-md")}
  ${trigger("dr-scroll", "Halaman bisa digulir", "", "btn-outline btn-md")}
</div>
${drawer({ id: "dr-lock", title: "Halaman terkunci", body: "<p>Halaman di belakang tidak bisa digulir selama drawer terbuka.</p>" })}
${drawer({ id: "dr-scroll", title: "Halaman bisa digulir", body: "<p>Halaman di belakang masih bisa digulir.</p>", attrs: 'data-drawer-body-scrolling="true"' })}`,
  },
  {
    key: "backdrop",
    name: "Backdrop options",
    note: "<code>data-drawer-backdrop=\"false\"</code> menghilangkan latar gelap (halaman tetap bisa dipakai); <code>\"static\"</code> mempertahankan latar tetapi klik di luar tidak menutup drawer.",
    demo: `<div class="flex flex-wrap gap-3">
  ${trigger("dr-bd-on", "Dengan latar", "", "btn-outline btn-md")}
  ${trigger("dr-bd-off", "Tanpa latar", "", "btn-outline btn-md")}
  ${trigger("dr-bd-static", "Latar statis", "", "btn-outline btn-md")}
</div>
${drawer({ id: "dr-bd-on", title: "Dengan latar", body: "<p>Klik di luar drawer untuk menutup.</p>" })}
${drawer({ id: "dr-bd-off", title: "Tanpa latar", body: "<p>Tidak ada latar gelap; tutup lewat tombol silang atau Escape.</p>", attrs: 'data-drawer-backdrop="false"' })}
${drawer({ id: "dr-bd-static", title: "Latar statis", body: "<p>Klik di luar tidak menutup drawer ini.</p>", footer: `<button type="button" class="btn-primary btn-md" data-drawer-hide="dr-bd-static">Mengerti</button>`, attrs: 'data-drawer-backdrop="static"' })}`,
  },
  {
    key: "navigation",
    name: "Navigation drawer",
    note: "Menu navigasi samping, mis. untuk tampilan ponsel: daftar <code>.nav-item</code> dengan submenu yang dibuka <code>data-ui-collapse</code>.",
    demo: `${trigger("dr-nav", "Buka menu", "list")}
${drawer({
      id: "dr-nav", title: "Menu", body: `<ul class="space-y-1">
      <li><a href="#" class="nav-item nav-item-active">${ic("house", "h-5 w-5")}Dasbor</a></li>
      <li><a href="#" class="nav-item">${ic("briefcase", "h-5 w-5")}Lowongan</a></li>
      <li>
        <button type="button" class="nav-item w-full" data-ui-collapse data-ui-collapse-static aria-controls="dr-nav-sub" aria-expanded="false">${ic("clipboard-text", "h-5 w-5")}Tracer Study<span class="ml-auto">${ic("caret-down", "h-3.5 w-3.5")}</span></button>
        <ul id="dr-nav-sub" class="hidden space-y-1 py-1 pl-8"><li><a href="#" class="nav-item">Kuesioner</a></li><li><a href="#" class="nav-item">Arsip</a></li><li><a href="#" class="nav-item">Laporan</a></li></ul>
      </li>
      <li><a href="#" class="nav-item">${ic("gear-six", "h-5 w-5")}Pengaturan</a></li>
    </ul>` })}`,
  },
  {
    key: "contact",
    name: "Contact form drawer",
    note: "Formulir di dalam drawer kanan dengan aksi pada <code>.drawer-footer</code>.",
    demo: `${trigger("dr-contact", "Hubungi kami", "envelope-simple")}
${drawer({
      id: "dr-contact", title: "Hubungi kami", placement: "right", body: `<form class="space-y-4" onsubmit="return false">
      ${field("dr-c-name", "Nama", 'placeholder="Nama lengkap"')}
      ${field("dr-c-mail", "Email", 'type="email" placeholder="nama@email.com"')}
      <div><label class="form-label" for="dr-c-msg">Pesan</label><textarea id="dr-c-msg" class="input" rows="4" placeholder="Tulis pesan Anda"></textarea></div>
    </form>`, footer: `<button type="button" class="btn-outline btn-md" data-drawer-hide="dr-contact">Batal</button><button type="button" class="btn-primary btn-md" data-drawer-hide="dr-contact">Kirim</button>` })}`,
  },
  {
    key: "form",
    name: "Form elements drawer",
    note: "Berbagai isian (teks, tanggal, pilihan, centang, sakelar) di dalam drawer; daftar yang panjang digulir di dalam <code>.drawer-body</code>.",
    demo: `${trigger("dr-form", "Filter lanjutan", "funnel", "btn-outline btn-md")}
${drawer({
      id: "dr-form", title: "Filter lanjutan", placement: "right", body: `<form class="space-y-4" onsubmit="return false">
      ${field("dr-f-q", "Cari", 'type="search" placeholder="Nama atau NIM"')}
      <div><label class="form-label" for="dr-f-year">Tahun lulus</label><select id="dr-f-year" class="input"><option>Semua tahun</option><option>2026</option><option>2025</option><option>2024</option></select></div>
      ${field("dr-f-date", "Tanggal pengisian", 'type="date"')}
      <fieldset><legend class="form-label">Status</legend><div class="space-y-2">
        <label class="flex items-center gap-2 text-sm text-fg"><input type="checkbox" class="form-check" checked /> Sudah mengisi</label>
        <label class="flex items-center gap-2 text-sm text-fg"><input type="checkbox" class="form-check" /> Belum mengisi</label>
      </div></fieldset>
      <label class="flex items-center justify-between text-sm text-fg">Hanya alumni aktif<span class="toggle"><input type="checkbox" class="toggle-input" /><span class="toggle-track"></span></span></label>
    </form>`, footer: `<button type="button" class="btn-outline btn-md" data-drawer-hide="dr-form">Atur ulang</button><button type="button" class="btn-primary btn-md" data-drawer-hide="dr-form">Terapkan</button>` })}`,
  },
];

export const byKey = Object.fromEntries(examples.map((e) => [e.key, e]));
