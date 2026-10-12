/* Contoh Clipboard — satu sumber untuk Storybook (Clipboard.stories.js) dan index.html.
   Tiap contoh: { key, name, note, wide?, demo }. Perilaku salin lewat assets/js/clipboard.js (data-clipboard-target). */

const ic = (n, cls = "h-4 w-4") => `<i class="kk kk-${n} ${cls}"></i>`;

/* Isi tombol: keadaan awal + keadaan berhasil (bertukar otomatis) */
const parts = (label, doneLabel, cls = "h-4 w-4") =>
  `<span data-clipboard-default class="inline-flex items-center gap-1.5">${ic("copy", cls)}${label ?? ""}</span><span data-clipboard-success class="hidden items-center gap-1.5 text-success-600">${ic("check", cls)}${doneLabel ?? ""}</span>`;
const iconOnly = () => `<span data-clipboard-default>${ic("copy")}</span><span data-clipboard-success class="hidden text-success-600">${ic("check")}</span>`;

const tip = (btn, text) => `<span class="group relative inline-flex">${btn}<span class="tooltip-content">${text}</span></span>`;
const readonlyInput = (id, value, cls = "") => `<input id="${id}" type="text" class="input ${cls}" value="${value}" readonly aria-label="${value}" />`;

const BTN = "inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-fg-subtle transition-colors hover:bg-neutral-100 hover:text-fg";
// tombol ikon di dalam input: pembungkus .group yang absolut supaya tooltip menempel ke tombol
const inset = (target, label, text, pos = "right-1.5 top-1/2 -translate-y-1/2", type = "") =>
  `<span class="group absolute ${pos} inline-flex"><button type="button" class="${BTN}" data-clipboard-target="#${target}" ${type} aria-label="${label}">${iconOnly()}</button><span class="tooltip-content">${text}</span></span>`;

const apiField = (id, label, value) => `<div>
    <label class="form-label" for="${id}">${label}</label>
    <div class="relative">
      ${readonlyInput(id, value, "pr-11")}
      ${inset(id, "Salin " + label, "Salin")}
    </div>
  </div>`;

export const examples = [
  {
    key: "default",
    name: "Default copy to clipboard",
    note: "Tombol dengan <code>data-clipboard-target</code> menyalin isi input. Bagian <code>[data-clipboard-default]</code> berganti ke <code>[data-clipboard-success]</code> selama 2 detik.",
    demo: `<div class="flex w-full max-w-sm gap-2">
  ${readonlyInput("cb-npm", "npm install karirkit", "flex-1")}
  <button type="button" class="btn-primary btn-md shrink-0" data-clipboard-target="#cb-npm">${parts("Salin", "Tersalin!")}</button>
</div>`,
  },
  {
    key: "icon",
    name: "Input with copy button",
    note: "Tombol ikon di dalam input (<code>.input-icon-btn</code>) dengan tooltip yang berubah menjadi \"Tersalin!\".",
    demo: `<div class="relative max-w-xs">
  ${readonlyInput("cb-icon", "npm install karirkit", "pr-11")}
  ${inset("cb-icon", "Salin ke papan klip", "Salin ke papan klip")}
</div>`,
  },
  {
    key: "text",
    name: "Copy button with text",
    note: "Tombol kecil berlabel di tepi kanan input.",
    demo: `<div class="relative max-w-xs">
  ${readonlyInput("cb-text", "npm install karirkit", "pr-24")}
  <button type="button" class="btn-outline btn-sm absolute right-1.5 top-1/2 -translate-y-1/2" data-clipboard-target="#cb-text">${parts("Salin", "Tersalin", "h-3.5 w-3.5")}</button>
</div>`,
  },
  {
    key: "group",
    name: "Input group with copy",
    note: "Awalan \"URL\" (<code>.input-group-addon</code>), input, dan tombol salin menyatu dalam <code>.input-group</code>; teks bantuan di bawahnya.",
    demo: `<div class="max-w-sm">
  <label class="form-label" for="cb-url">Tautan kuesioner</label>
  <div class="input-group">
    <span class="input-group-addon">URL</span>
    ${readonlyInput("cb-url", "https://karirlink.id/tracer-study")}
    ${tip(`<button type="button" class="input-group-btn" data-clipboard-target="#cb-url" aria-label="Salin tautan">${iconOnly()}</button>`, "Salin tautan")}
  </div>
  <p class="form-hint">Bagikan tautan ini ke alumni lewat email atau pesan.</p>
</div>`,
  },
  {
    key: "shortener",
    name: "URL shortener",
    note: "Tombol aksi di kiri, tautan hasil di tengah, tombol salin di kanan.",
    demo: `<div class="max-w-sm">
  <label class="form-label" for="cb-short">Perpendek tautan</label>
  <div class="input-group">
    <button type="button" class="input-group-btn">Buat</button>
    ${readonlyInput("cb-short", "https://krk.it/3U2SXcF")}
    ${tip(`<button type="button" class="btn-group-item h-10 px-3" data-clipboard-target="#cb-short" aria-label="Salin tautan">${iconOnly()}</button>`, "Salin tautan")}
  </div>
  <p class="form-hint">Pastikan tautan yang dimasukkan valid.</p>
</div>`,
  },
  {
    key: "code",
    name: "Copy source code block",
    note: "Salin isi blok kode: <code>data-clipboard-type=\"html\"</code> membaca <code>innerHTML</code> dengan entitas HTML didekode, jadi yang tersalin adalah kode aslinya.",
    wide: true,
    demo: `<div class="relative rounded-control border border-border bg-neutral-50 p-4">
  <button type="button" class="btn-outline btn-sm absolute right-2 top-2 bg-surface" data-clipboard-target="#cb-code" data-clipboard-type="html">${parts("Salin", "Tersalin", "h-3.5 w-3.5")}</button>
  <pre class="max-h-56 overflow-auto pr-24 font-mono text-sm leading-relaxed text-fg"><code id="cb-code">&lt;div data-chart="line"
     data-chart-series='[{"name":"Lamaran","data":[4,7,5,9]}]'
     data-chart-categories='["Mei","Jun","Jul","Agu"]'&gt;&lt;/div&gt;</code></pre>
</div>`,
  },
  {
    key: "card",
    name: "Card with API keys",
    note: "Beberapa kolom dalam satu kartu, masing-masing punya tombol salin dan tooltip sendiri.",
    demo: `<div class="card max-w-md space-y-4 p-5 sm:p-6">
  <div><h3 class="text-base font-semibold text-fg">Kredensial API</h3><p class="mt-1 text-sm text-fg-muted">Simpan nilai berikut di tempat yang aman; kunci hanya ditampilkan sekali.</p></div>
  ${apiField("cb-acc", "ID akun", "756593826")}
  ${apiField("cb-key", "Kunci API", "sk_live_51NzQ2eJf8a")}
  ${apiField("cb-arn", "Role ARN", "123456789012:user/KarirKit")}
  <div class="flex justify-end gap-3 pt-1"><button type="button" class="btn-outline btn-md">Batal</button><button type="button" class="btn-primary btn-md">Langkah berikutnya</button></div>
</div>`,
  },
  {
    key: "contact",
    name: "Copy contact details",
    note: "Salin teks biasa dari sebuah blok (<code>data-clipboard-type=\"text\"</code>); tiap baris menjadi satu baris hasil.",
    demo: `<address class="relative grid grid-cols-1 gap-1 rounded-control border border-border bg-neutral-50 p-4 pr-12 not-italic sm:grid-cols-2">
  <div class="hidden space-y-1 text-sm text-fg-muted sm:block"><p>Nama</p><p>Email</p><p>Telepon</p></div>
  <div id="cb-contact" class="space-y-1 text-sm font-medium text-fg"><p>Bonnie Green</p><p>bonnie@karirkit.com</p><p>+62 812 3456 7890</p></div>
  ${inset("cb-contact", "Salin kontak", "Salin kontak", "right-2 top-2", 'data-clipboard-type="text"')}
</address>`,
  },
  {
    key: "modal",
    name: "Copy button with modal",
    note: "Tombol salin di dalam dialog bagikan; dialog dibuka dengan <code>data-modal-show</code> (<code>assets/js/modal.js</code>).",
    demo: `<button type="button" class="btn-primary btn-md" data-modal-show="cb-modal">${ic("share-network")}Bagikan kursus</button>
<div class="modal-backdrop" id="cb-modal">
  <div class="modal-panel modal-md">
    <div class="modal-header">
      <div><h3 class="modal-title">Bagikan kursus</h3></div>
      <button type="button" class="modal-close" data-modal-hide="cb-modal" aria-label="Tutup">${ic("x")}</button>
    </div>
    <div class="modal-body">
      <label class="form-label" for="cb-course">Tautan kursus</label>
      <div class="relative">
        ${readonlyInput("cb-course", "https://karirlink.id/kursus/ui-ux-dasar", "pr-11")}
        ${inset("cb-course", "Salin tautan", "Salin tautan")}
      </div>
    </div>
    <div class="modal-footer"><button type="button" class="btn-outline btn-md" data-modal-hide="cb-modal">Tutup</button></div>
  </div>
</div>`,
  },
];

export const byKey = Object.fromEntries(examples.map((e) => [e.key, e]));
