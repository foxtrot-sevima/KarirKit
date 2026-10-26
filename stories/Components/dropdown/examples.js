/* Contoh Dropdown — satu sumber untuk Storybook (Dropdown.stories.js) dan index.html.
   Tiap contoh: { key, name, note, wide?, demo }. Perilaku buka/tutup lewat assets/js/ui.js (data-ui-dropdown). */

const ic = (n, cls = "h-4 w-4") => `<i class="kk kk-${n} ${cls}"></i>`;
const stage = (h, inner) => `<div style="min-height:${h}rem">${inner}</div>`;

/* Tombol pemicu: tombol + menu berurutan di dalam .dropdown */
const trigger = (label, attrs = "", cls = "btn-primary btn-md", chevron = "caret-down") =>
  `<button type="button" class="${cls}" data-ui-dropdown aria-expanded="false" aria-haspopup="true" ${attrs}>${label}${chevron ? ic(chevron, "h-3.5 w-3.5") : ""}</button>`;

const link = (label, icon, cls = "") => `<a href="#" class="dropdown-item ${cls}">${icon ? ic(icon) : ""}${label}</a>`;
const BASIC = ["Dashboard", "Settings", "Earnings", "Sign out"];
const basicItems = BASIC.map((l) => link(l)).join("\n      ");

const menu = (inner, w = "w-44", attrs = "") => `<div class="dropdown-menu ${w} hidden" ${attrs.includes("data-placement") ? attrs : attrs + ' data-placement="bottom-start"'}>\n      ${inner}\n    </div>`;
const dropdown = (btn, m) => `<div class="dropdown">\n    ${btn}\n    ${m}\n  </div>`;

const USERS = [
  ["Jese Leos", "primary"], ["Robert Gough", "info"], ["Bonnie Green", "success"], ["Leslie Livingston", "warning"],
  ["Michael Gough", "danger"], ["Joseph Mcfall", "primary"], ["Roberta Casas", "info"], ["Neil Sims", "success"],
];
const initials = (n) => n.split(" ").map((p) => p[0]).join("");
const av = (n, tone, size = "avatar-sm") => `<span class="avatar ${size} bg-${tone}-100 text-${tone}-700">${initials(n)}</span>`;

const switchRow = (id, label, checked = false) => `<label for="${id}" class="dropdown-item justify-between">
        <span>${label}</span>
        <span class="toggle"><input id="${id}" type="checkbox" class="toggle-input" ${checked ? "checked" : ""} /><span class="toggle-track"></span></span>
      </label>`;

const checkRow = (id, label, checked = false) => `<label for="${id}" class="dropdown-item gap-3"><input id="${id}" type="checkbox" class="form-check" ${checked ? "checked" : ""} />${label}</label>`;
const radioRow = (id, name, label, checked = false) => `<label for="${id}" class="dropdown-item gap-3"><input id="${id}" name="${name}" type="radio" class="form-radio" ${checked ? "checked" : ""} />${label}</label>`;
const helperRow = (id, type, name, title, checked = false) => `<label for="${id}" class="dropdown-item dropdown-item-check"><input id="${id}" ${name ? `name="${name}"` : ""} type="${type}" class="${type === "radio" ? "form-radio" : "form-check"}" ${checked ? "checked" : ""} /><span><span class="dropdown-item-title">${title}</span><span class="dropdown-item-desc">Some helpful instruction goes over here.</span></span></label>`;

const userHeader = `<div class="dropdown-header">
        ${av("Bonnie Green", "primary", "avatar-md")}
        <div class="min-w-0 flex-1"><p class="dropdown-header-title">Bonnie Green</p><p class="dropdown-header-desc">name@karirkit.com</p></div>
        <span class="badge-primary ml-auto">PRO</span>
      </div>`;
const profileItems = `${link("Account", "user-circle")}
      ${link("Settings", "gear-six")}
      ${link("Privacy", "shield-check")}
      ${link("Notifications", "bell")}
      ${link("Help center", "lifebuoy")}
      <label for="dd-dark" class="dropdown-item justify-between"><span class="inline-flex items-center gap-2">${ic("moon")}Dark mode</span><span class="toggle"><input id="dd-dark" type="checkbox" class="toggle-input" /><span class="toggle-track"></span></span></label>
      <hr class="dropdown-divider" />
      ${link("Upgrade to PRO", "crown", "text-primary-600")}
      ${link("Sign out", "sign-out", "dropdown-item-danger")}`;

const userRows = (checkbox, prefix) => USERS.map(([n, tone], i) =>
  checkbox
    ? `<label for="${prefix}-${i}" class="dropdown-item justify-between"><span class="inline-flex items-center gap-2.5">${av(n, tone)}${n}</span><input id="${prefix}-${i}" type="checkbox" class="form-check" /></label>`
    : `<a href="#" class="dropdown-item gap-2.5">${av(n, tone)}${n}</a>`).join("\n        ");

const notif = (n, tone, text, time, badge) => `<a href="#" class="flex gap-3 px-4 py-3 hover:bg-neutral-50">
        <span class="relative shrink-0">${av(n, tone, "avatar-lg")}<span class="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-surface bg-${badge[0]}-500 text-white">${ic(badge[1], "h-2.5 w-2.5")}</span></span>
        <span class="min-w-0 flex-1"><span class="block text-sm text-fg-muted">${text}</span><span class="mt-1 block text-xs font-medium text-primary-600">${time}</span></span>
      </a>`;

const placementBtn = (side, extra = "") => dropdown(
  trigger(`Dropdown ${side}`, `data-ui-dropdown-placement="${side}" ${extra}`, "btn-primary btn-md", { top: "caret-up", right: "caret-right", left: "caret-left" }[side.split("-")[0]] || "caret-down"),
  menu(basicItems.split("\n      ").slice(0, 3).join("\n      "), "w-44"));

export const examples = [
  {
    key: "default",
    name: "Dropdown",
    note: "Tombol pemicu dan menu bersebelahan di dalam <code>.dropdown</code>; menu memakai <code>.dropdown-menu</code> dan tiap baris <code>.dropdown-item</code>. Pemicu memakai <code>data-ui-dropdown</code> (klik untuk buka/tutup, Escape atau klik di luar untuk menutup).",
    demo: stage(11, dropdown(trigger("Dropdown button"), menu(basicItems))),
  },
  {
    key: "hover",
    name: "Dropdown hover",
    note: "<code>data-ui-dropdown-trigger=\"hover\"</code> membuka menu saat kursor di atas pemicu dan menutupnya setelah jeda (default 300 ms). Atur jeda lewat <code>data-ui-dropdown-delay</code>.",
    demo: stage(11, dropdown(trigger("Dropdown hover", 'data-ui-dropdown-trigger="hover"'), menu(basicItems))),
  },
  {
    key: "delay",
    name: "Delay duration",
    note: "Jeda penutupan 500 ms lewat <code>data-ui-dropdown-delay=\"500\"</code>.",
    demo: stage(11, dropdown(trigger("Dropdown delay", 'data-ui-dropdown-trigger="hover" data-ui-dropdown-delay="500"'), menu(basicItems))),
  },
  {
    key: "divider",
    name: "Dropdown divider",
    note: "Pisahkan kelompok dengan <code>&lt;hr class=\"dropdown-divider\"&gt;</code>.",
    demo: stage(12, dropdown(trigger("Dropdown button"), menu(`${link("Dashboard")}
      ${link("Settings")}
      ${link("Earnings")}
      <hr class="dropdown-divider" />
      ${link("Separated link")}`))),
  },
  {
    key: "header",
    name: "Dropdown header",
    note: "Kepala menu <code>.dropdown-header</code> berisi avatar, nama (<code>.dropdown-header-title</code>), email (<code>.dropdown-header-desc</code>), dan badge; item memakai ikon di kiri dan toggle di baris tertentu.",
    demo: stage(26, dropdown(trigger("Dropdown button"), menu(`${userHeader}\n      ${profileItems}`, "w-72"))),
  },
  {
    key: "multilevel",
    name: "Multi-level dropdown",
    note: "Pemicu di dalam <code>.dropdown-menu</code> membuka submenu dan menjaga menu induk tetap terbuka. Pasang <code>data-ui-dropdown-placement=\"right-start\"</code> agar submenu muncul di samping.",
    demo: stage(14, dropdown(trigger("Dropdown button"), menu(`${link("Dashboard")}
      <div class="relative">
        <button type="button" class="dropdown-item justify-between" data-ui-dropdown aria-expanded="false" aria-haspopup="true" data-ui-dropdown-placement="right-start" data-ui-dropdown-offset-distance="8">Dropdown ${ic("caret-right", "h-3.5 w-3.5")}</button>
        <div class="dropdown-menu hidden w-44">
          ${["Overview", "My downloads", "Billing", "Rewards"].map((l) => link(l)).join("\n          ")}
        </div>
      </div>
      ${link("Earnings")}
      ${link("Sign out")}`))),
  },
  {
    key: "checkbox",
    name: "Dropdown with checkbox",
    note: "Baris berisi <code>.form-check</code>; pakai <code>&lt;label class=\"dropdown-item\"&gt;</code> supaya seluruh baris bisa diklik dan mendapat warna hover.",
    demo: stage(11, dropdown(trigger("Dropdown button"), menu(`${checkRow("dd-c1", "Default checkbox")}
      ${checkRow("dd-c2", "Checked state", true)}
      ${checkRow("dd-c3", "Default checkbox")}`, "w-52"))),
  },
  {
    key: "checkbox-helper",
    name: "Checkbox with helper text",
    note: "Judul (<code>.dropdown-item-title</code>) dan keterangan (<code>.dropdown-item-desc</code>) di samping kotak centang, dengan <code>.dropdown-item-check</code>.",
    demo: stage(14, dropdown(trigger("Dropdown button"), menu(`${helperRow("dd-h1", "checkbox", "", "Enable notifications", true)}
      ${helperRow("dd-h2", "checkbox", "", "Enable 2FA auth")}
      ${helperRow("dd-h3", "checkbox", "", "Subscribe newsletter")}`, "w-64"))),
  },
  {
    key: "radio",
    name: "Dropdown with radio",
    note: "Pilihan tunggal memakai <code>.form-radio</code> dengan <code>name</code> yang sama.",
    demo: stage(11, dropdown(trigger("Dropdown radio"), menu(`${radioRow("dd-r1", "dd-radio", "Default radio")}
      ${radioRow("dd-r2", "dd-radio", "Checked radio", true)}
      ${radioRow("dd-r3", "dd-radio", "Default radio")}`))),
  },
  {
    key: "radio-helper",
    name: "Radio with helper text",
    note: "Sama seperti checkbox: tambahkan judul dan keterangan di samping radio.",
    demo: stage(14, dropdown(trigger("Dropdown radio"), menu(`${helperRow("dd-rh1", "radio", "dd-rh", "Individual", true)}
      ${helperRow("dd-rh2", "radio", "dd-rh", "Company")}
      ${helperRow("dd-rh3", "radio", "dd-rh", "Non profit")}`, "w-60"))),
  },
  {
    key: "toggle",
    name: "Dropdown with toggle switch",
    note: "Baris <code>.dropdown-item.justify-between</code> dengan <code>.toggle</code> di kanan.",
    demo: stage(11, dropdown(trigger("Dropdown button"), menu(`${switchRow("dd-t1", "Enable notifications", true)}
      ${switchRow("dd-t2", "Enable 2FA authentication")}
      ${switchRow("dd-t3", "Subscribe to newsletter")}`, "w-72"))),
  },
  {
    key: "scroll",
    name: "Dropdown with scrolling",
    note: "Daftar panjang di dalam <code>.dropdown-scroll</code> (tinggi maks. 12 rem) dengan kaki menu <code>.dropdown-footer</code> berisi tombol aksi.",
    demo: stage(20, dropdown(trigger("Dropdown button"), menu(`<div class="dropdown-scroll">
        ${userRows(false)}
      </div>
      <div class="dropdown-footer"><a href="#" class="btn-primary btn-sm w-full">${ic("user-plus")}Add new user</a></div>`, "w-56"))),
  },
  {
    key: "scroll-check",
    name: "Scrollable checkboxes",
    note: "Daftar pengguna dengan kotak centang di kanan dan tombol bahaya di kaki menu.",
    demo: stage(20, dropdown(trigger("Dropdown button"), menu(`<div class="dropdown-scroll">
        ${userRows(true, "dd-u")}
      </div>
      <div class="dropdown-footer"><a href="#" class="btn-danger btn-sm w-full">${ic("trash")}Delete user</a></div>`, "w-56"))),
  },
  {
    key: "search",
    name: "Dropdown with search",
    note: "Kolom pencarian di atas menu dengan <code>.dropdown-search</code>, lalu daftar yang dapat digulir dan aksi di kaki.",
    demo: stage(22, dropdown(trigger("Dropdown button"), menu(`<div class="dropdown-search">
        <div class="relative"><span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-subtle">${ic("magnifying-glass", "h-3.5 w-3.5")}</span><input type="search" class="input h-9 pl-9 text-sm" placeholder="Search for users" aria-label="Search for users" /></div>
      </div>
      <div class="dropdown-scroll">
        ${userRows(true, "dd-s")}
      </div>
      <div class="dropdown-footer"><a href="#" class="btn-danger btn-sm w-full">${ic("trash")}Delete user</a></div>`, "w-56"))),
  },
  {
    key: "icon",
    name: "Menu icon",
    note: "Tombol ikon tanpa label (titik tiga vertikal atau horizontal) untuk menu aksi baris.",
    demo: stage(13, `<div class="flex items-start gap-6">
  ${dropdown(trigger(ic("dots-three-vertical", "h-5 w-5"), 'aria-label="Opsi"', "btn-ghost btn-icon-sm", ""), menu(`${link("Dashboard")}
      ${link("Settings")}
      ${link("Earnings")}
      <hr class="dropdown-divider" />
      ${link("Separated link")}`))}
  ${dropdown(trigger(ic("dots-three", "h-5 w-5"), 'aria-label="Opsi"', "btn-ghost btn-icon-sm", ""), menu(`${link("Dashboard")}
      ${link("Settings")}
      ${link("Earnings")}
      <hr class="dropdown-divider" />
      ${link("Separated link")}`))}
</div>`),
  },
  {
    key: "notification",
    name: "Notification bell",
    note: "Ikon lonceng dengan titik merah membuka daftar notifikasi: judul di tengah, baris dengan avatar dan lencana status, serta tautan \"View all\" di bawah.",
    wide: true,
    demo: stage(30, dropdown(`<button type="button" class="btn-ghost btn-icon-md relative" data-ui-dropdown aria-expanded="false" aria-haspopup="true" aria-label="Notifikasi">${ic("bell", "h-5 w-5")}<span class="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-danger-500 ring-2 ring-surface"></span></button>`,
      `<div class="dropdown-menu hidden w-80 max-w-[calc(100vw-2rem)] divide-y divide-border/70 p-0 sm:w-96" data-placement="bottom-start">
      <div class="rounded-t-control bg-neutral-50 px-4 py-2 text-center text-sm font-semibold text-fg">Notifications</div>
      <div class="divide-y divide-border/70">
        ${notif("Jese Leos", "primary", "New message from <b class=\"font-semibold text-fg\">Jese Leos</b>: \"Hey, what's up? All set for the presentation?\"", "a few moments ago", ["primary", "chat-circle"])}
        ${notif("Joseph Mcfall", "info", "<b class=\"font-semibold text-fg\">Joseph Mcfall</b> and 5 others started following you.", "10 minutes ago", ["secondary", "user-plus"])}
        ${notif("Bonnie Green", "success", "<b class=\"font-semibold text-fg\">Bonnie Green</b> and 141 others love your story.", "44 minutes ago", ["danger", "heart"])}
        ${notif("Leslie Livingston", "warning", "<b class=\"font-semibold text-fg\">Leslie Livingston</b> mentioned you in a comment.", "1 hour ago", ["success", "at"])}
        ${notif("Robert Brown", "danger", "<b class=\"font-semibold text-fg\">Robert Brown</b> posted a new video.", "3 hours ago", ["info", "video-camera"])}
      </div>
      <a href="#" class="flex items-center justify-center gap-2 rounded-b-control bg-neutral-50 py-2.5 text-sm font-medium text-fg hover:bg-neutral-100">${ic("eye")}View all</a>
    </div>`)),
  },
  {
    key: "avatar",
    name: "User avatar",
    note: "Avatar bulat sebagai pemicu; menu berisi kepala pengguna dan daftar pengaturan.",
    demo: stage(26, dropdown(`<button type="button" class="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2" data-ui-dropdown aria-expanded="false" aria-haspopup="true" aria-label="Open user menu">${av("Joseph McFall", "primary", "avatar-lg")}</button>`,
      menu(`${userHeader.replace("Bonnie Green", "Joseph McFall").replace("BG", "JM")}\n      ${profileItems.replace('id="dd-dark"', 'id="dd-dark-2"').replace('for="dd-dark"', 'for="dd-dark-2"')}`, "w-72"))),
  },
  {
    key: "avatar-name",
    name: "Avatar with name",
    note: "Pemicu berisi avatar, nama, dan panah.",
    demo: stage(26, dropdown(`<button type="button" class="inline-flex items-center gap-2 rounded-full py-1 pl-1 pr-3 text-sm font-medium text-fg hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500" data-ui-dropdown aria-expanded="false" aria-haspopup="true">${av("Joseph McFall", "primary", "avatar-md")}Joseph McFall${ic("caret-down", "h-3.5 w-3.5")}</button>`,
      menu(`${userHeader.replace("Bonnie Green", "Joseph McFall").replace("BG", "JM")}\n      ${profileItems.replace('id="dd-dark"', 'id="dd-dark-3"').replace('for="dd-dark"', 'for="dd-dark-3"')}`, "w-72"))),
  },
  {
    key: "navbar",
    name: "Dropdown navbar",
    note: "Tautan menu dengan submenu di dalam navbar; item aktif memakai warna primer.",
    wide: true,
    demo: stage(15, `<nav class="flex flex-wrap items-center justify-between gap-2 rounded-control border border-border bg-surface px-4 py-3">
  <span class="font-display text-base font-bold text-fg">KarirKit</span>
  <ul class="flex flex-wrap items-center gap-1 text-sm font-medium">
    <li><a href="#" class="rounded-lg px-3 py-2 text-primary-600">Home</a></li>
    <li>${dropdown(trigger("Dropdown", "", "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-fg-muted hover:bg-neutral-50 hover:text-fg", "caret-down"),
      menu(["Dashboard", "Settings", "Earnings"].map((l) => link(l)).join("\n      "), "w-44", 'data-placement="bottom-start"'))}</li>
    <li><a href="#" class="rounded-lg px-3 py-2 text-fg-muted hover:bg-neutral-50 hover:text-fg">Services</a></li>
    <li><a href="#" class="rounded-lg px-3 py-2 text-fg-muted hover:bg-neutral-50 hover:text-fg">Pricing</a></li>
    <li><a href="#" class="rounded-lg px-3 py-2 text-fg-muted hover:bg-neutral-50 hover:text-fg">Contact</a></li>
  </ul>
</nav>`),
  },
  {
    key: "datepicker",
    name: "Dropdown datepicker",
    note: "Pemicu berupa teks rentang tanggal; menu memuat kalender rentang inline (<code>assets/js/datepicker.js</code>).",
    demo: stage(26, dropdown(trigger("Last 7 days", "", "inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:underline"),
      menu(`<div data-datepicker-inline data-datepicker-range data-datepicker-week-start="1"></div>`, "w-auto p-3", 'data-placement="bottom-start"'))),
  },
  {
    key: "sizes",
    name: "Sizes",
    note: "Ukuran pemicu mengikuti tombol: <code>btn-sm</code>, <code>btn-md</code>, dan <code>btn-lg</code>.",
    demo: stage(13, `<div class="flex flex-wrap items-start gap-6">
  ${dropdown(trigger("Small dropdown", "", "btn-primary btn-sm"), menu(basicItems))}
  ${dropdown(trigger("Large dropdown", "", "btn-primary btn-lg"), menu(basicItems))}
</div>`),
  },
  {
    key: "placement",
    name: "Placement",
    note: "<code>data-ui-dropdown-placement</code>: <code>top</code>, <code>right</code>, <code>bottom</code>, atau <code>left</code>, dengan akhiran <code>-start</code> / <code>-end</code> untuk perataan (contoh <code>left-end</code>, <code>right-end</code>). Default <code>bottom-end</code>.",
    wide: true,
    demo: stage(16, `<div class="grid grid-cols-2 place-items-center gap-6 pt-36 sm:grid-cols-4">
  ${placementBtn("top")}
  ${placementBtn("right")}
  ${placementBtn("bottom")}
  ${placementBtn("left")}
  ${placementBtn("left-end")}
  ${placementBtn("right-end")}
  ${placementBtn("top-start")}
  ${placementBtn("bottom-start")}
</div>`),
  },
  {
    key: "offset",
    name: "Dropdown offset",
    note: "Jarak dari pemicu lewat <code>data-ui-dropdown-offset-distance</code> dan geser menyamping lewat <code>data-ui-dropdown-offset-skidding</code> (piksel).",
    wide: true,
    demo: stage(13, `<div class="flex flex-wrap items-start gap-10">
  ${dropdown(trigger("Distance 35", 'data-ui-dropdown-placement="bottom-start" data-ui-dropdown-offset-distance="35"'), menu(basicItems))}
  ${dropdown(trigger("Skidding 100", 'data-ui-dropdown-placement="bottom-start" data-ui-dropdown-offset-skidding="100"'), menu(basicItems))}
</div>`),
  },
];

export const byKey = Object.fromEntries(examples.map((e) => [e.key, e]));
