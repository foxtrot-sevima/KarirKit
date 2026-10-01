const exBlock = (inner) => `<div class="p-6">${inner}</div>`;
const ic = (n, cls = "h-4 w-4") => `<i class="kk kk-${n} ${cls}"></i>`;
const group = (items, extra = "") => `<div class="btn-group ${extra}" role="group">${items.join("")}</div>`;
const item = (label, extra = "", attrs = "") => `<button type="button" class="btn-group-item ${extra}" ${attrs}>${label}</button>`;
const tip = (btn, text) => `<span class="group relative inline-flex">${btn}<span class="tooltip-content">${text}</span></span>`;

export default {
  title: "Components/Button Group",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Kumpulan tombol yang menyatu. Anatomi: `.btn-group` (+ `.btn-group-vertical`) berisi `.btn-group-item`; item aktif memakai `aria-current=\"true\"` atau `.is-active`. Warna lewat `.btn-group-item-primary|success|danger|dark`. Item yang dibungkus (dropdown, tooltip) memakai `.btn-group-slot`. Dropdown di-toggle oleh `assets/js/ui.js` (`data-ui-dropdown`).",
      },
    },
  },
};

export const DefaultExample = {
  name: "Default example",
  render: () => exBlock(group([item("Profil"), item("Pengaturan"), item("Pesan")])),
};

export const ButtonGroupInfo = {
  name: "Button group info",
  render: () =>
    exBlock(
      group([
        item(`${ic("user")}Profil`),
        item("Lengkapi data diri", "pointer-events-none text-fg-subtle", "disabled"),
      ])
    ),
};

export const ButtonGroupIconAction = {
  name: "Button group icon action",
  render: () =>
    exBlock(group([item("Unggah CV"), item(ic("download-simple"), "w-10 px-0", 'aria-label="Unduh"')])),
};

export const ButtonGroupIcons = {
  name: "Button group icons",
  render: () =>
    exBlock(
      group(
        [
          ["pencil-simple", "Ubah"],
          ["share-network", "Bagikan"],
          ["bookmark-simple", "Simpan"],
          ["trash", "Hapus"],
        ].map(([n, t]) => `<span class="btn-group-slot group">${item(ic(n), "w-10 px-0", `aria-label="${t}"`)}<span class="tooltip-content">${t}</span></span>`)
      )
    ),
};

export const ButtonGroupDropdown = {
  name: "Button group dropdown",
  render: () =>
    exBlock(`<div class="min-h-44">${group([
      item("Simpan"),
      item("Pratinjau"),
      `<div class="btn-group-slot">
        <button type="button" class="btn-group-item w-10 px-0" data-ui-dropdown aria-expanded="false" aria-haspopup="true" aria-label="Opsi lainnya">${ic("caret-down", "h-3.5 w-3.5")}</button>
        <div class="dropdown-menu hidden top-full right-0 w-44">
          <a href="#" class="dropdown-item">Simpan sebagai draf</a>
          <a href="#" class="dropdown-item">Jadwalkan</a>
          <a href="#" class="dropdown-item">Duplikat</a>
        </div>
      </div>`,
    ])}</div>`),
};

export const ButtonGroupBadge = {
  name: "Button group badge",
  render: () =>
    exBlock(`<div class="min-h-44">${group([
      item(`${ic("bell")}Notifikasi<span class="badge badge-danger">8</span>`),
      `<div class="btn-group-slot">
        <button type="button" class="btn-group-item w-10 px-0" data-ui-dropdown aria-expanded="false" aria-haspopup="true" aria-label="Filter notifikasi">${ic("caret-down", "h-3.5 w-3.5")}</button>
        <div class="dropdown-menu hidden top-full right-0 w-44">
          <a href="#" class="dropdown-item">Semua</a>
          <a href="#" class="dropdown-item">Belum dibaca</a>
          <a href="#" class="dropdown-item">Dari perusahaan</a>
        </div>
      </div>`,
    ])}</div>`),
};

export const QrCodeButtonGroup = {
  name: "QR code button group",
  render: () => exBlock(group([item(`${ic("qr-code")}Masuk dengan QR`), item(`${ic("lock-simple")}Masuk dengan kata sandi`)])),
};

export const PaginationButtonGroup = {
  name: "Pagination button group",
  render: () =>
    exBlock(
      group([
        item(ic("caret-left"), "w-10 px-0", 'aria-label="Sebelumnya"'),
        item("1", "w-10 px-0", 'aria-current="true"'),
        item("2", "w-10 px-0"),
        item("3", "w-10 px-0"),
        item("…", "w-10 px-0", "disabled"),
        item("12", "w-10 px-0"),
        item(ic("caret-right"), "w-10 px-0", 'aria-label="Berikutnya"'),
      ])
    ),
};

export const VerticalButtonGroups = {
  name: "Vertical button groups",
  render: () =>
    exBlock(
      group(
        [item(`${ic("user")}Profil`), item(`${ic("gear-six")}Pengaturan`), item(`${ic("envelope")}Pesan`)],
        "btn-group-vertical w-48"
      )
    ),
};

export const ButtonGroupWithColors = {
  name: "Button group with colors",
  render: () =>
    exBlock(`<div class="flex flex-col items-start gap-4">
      ${group([item("Profil", "btn-group-item-primary"), item("Pengaturan", "btn-group-item-primary"), item("Pesan", "btn-group-item-primary")])}
      ${group([item("Terima", "btn-group-item-success"), item("Tunda", "btn-group-item-dark"), item("Tolak", "btn-group-item-danger")])}
    </div>`),
};

export const ButtonGroupAsLinks = {
  name: "Button group as links",
  render: () =>
    exBlock(`<div class="btn-group" role="group">
      <a href="#" class="btn-group-item" aria-current="true">Profil</a>
      <a href="#" class="btn-group-item">Pengaturan</a>
      <a href="#" class="btn-group-item">Pesan</a>
    </div>`),
};

export const GroupButtonsWithIcons = {
  name: "Group buttons with icons",
  render: () =>
    exBlock(
      group([
        item(`${ic("user")}Profil`),
        item(`${ic("gear-six")}Pengaturan`),
        item(`${ic("download-simple")}Unduhan`),
      ])
    ),
};

export const ButtonGroupOutline = {
  name: "Button group outline",
  render: () => {
    const o = "border-primary-600 bg-transparent text-primary-700 hover:bg-primary-600 hover:text-white";
    return exBlock(group([item("Profil", o), item("Pengaturan", o), item("Pesan", o)]));
  },
};
