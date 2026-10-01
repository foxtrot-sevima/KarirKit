export default {
  title: "Components/Checkbox",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Checkbox dengan state checked & unchecked." } },
  },
  argTypes: {
    label: { control: "text" },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Notifikasi lamaran baru via email",
    checked: true,
    disabled: false,
  },
};

export const Playground = {
  render: (args) => `
    <div class="p-6">
      <label class="flex items-center gap-2.5 text-sm text-slate-600 ${args.disabled ? "cursor-not-allowed opacity-50" : ""}">
        <input type="checkbox" ${args.checked ? "checked" : ""} ${args.disabled ? "disabled" : ""} class="form-check" /> ${args.label}
      </label>
    </div>`,
};

export const List = {
  render: () => `
    <div class="p-6 space-y-2.5">
      <label class="flex items-center gap-2.5 text-sm text-slate-600"><input type="checkbox" checked class="form-check" /> Notifikasi lamaran baru via email</label>
      <label class="flex items-center gap-2.5 text-sm text-slate-600"><input type="checkbox" class="form-check" /> Newsletter tips karier mingguan</label>
    </div>`,
};

// Appended variants

// ---------------------------------------------------------------------------
// Checkbox - extended layouts (see src/input.css "Form choice controls")
// ---------------------------------------------------------------------------
const exBlock = (inner) => `<div class="p-6">${inner}</div>`;
const cIcon = (n, cls = "h-5 w-5") => `<i class="kk kk-${n} ${cls}"></i>`;
const check = ({ id, label, checked = false, disabled = false, help = "", cls = "", box = "form-check" }) => `
  <div class="check-row ${cls}">
    <input id="${id}" type="checkbox" class="${box} mt-0.5" ${checked ? "checked" : ""} ${disabled ? "disabled" : ""} />
    <div><label for="${id}" class="check-label">${label}</label>${help ? `<p class="check-help">${help}</p>` : ""}</div>
  </div>`;
const STACK = ["Vue JS", "React", "Angular", "Laravel"];

export const CheckboxExample = {
  name: "Checkbox example",
  render: () =>
    exBlock(`<div class="space-y-3">
      ${check({ id: "cx-1", label: "Default checkbox" })}
      ${check({ id: "cx-2", label: "Checked state", checked: true })}
    </div>`),
};

export const CheckboxDisabled = {
  name: "Disabled state",
  render: () =>
    exBlock(`<div class="space-y-3">
      ${check({ id: "cd-1", label: "Disabled checkbox", disabled: true })}
      ${check({ id: "cd-2", label: "Disabled checked", checked: true, disabled: true })}
    </div>`),
};

export const CheckboxLink = {
  name: "Checkbox link",
  render: () =>
    exBlock(`<div class="check-row">
      <input id="cl-1" type="checkbox" class="form-check mt-0.5" />
      <label for="cl-1" class="check-label font-normal text-fg-muted">Saya setuju dengan <a href="#" class="card-link">syarat dan ketentuan</a>.</label>
    </div>`),
};

export const CheckboxHelperText = {
  name: "Helper text",
  render: () =>
    exBlock(`<div class="space-y-4">
      ${check({ id: "ch-1", label: "Email lowongan mingguan", help: "Ringkasan lowongan yang cocok dengan profilmu.", checked: true })}
      ${check({ id: "ch-2", label: "Info promo dan event", help: "Webinar, kelas, dan kegiatan karier terbaru." })}
    </div>`),
};

export const CheckboxBordered = {
  name: "Bordered",
  render: () =>
    exBlock(`<div class="grid max-w-xl gap-3 sm:grid-cols-2">
      <label class="check-bordered"><input type="checkbox" class="form-check" />Default checkbox</label>
      <label class="check-bordered"><input type="checkbox" class="form-check" checked />Checked state</label>
    </div>`),
};

export const CheckboxBorderedDescription = {
  name: "Bordered with description",
  render: () =>
    exBlock(`<div class="grid max-w-2xl gap-3 sm:grid-cols-2">
      ${[
        ["Paket Dasar", "Lamar hingga 20 lowongan per bulan.", true],
        ["Paket Premium", "Lamar tanpa batas dan analisis CV.", false],
      ]
        .map(
          ([t, d, c]) => `<label class="check-bordered items-start">
        <input type="checkbox" class="form-check mt-0.5" ${c ? "checked" : ""} />
        <span><span class="block text-sm font-semibold text-fg">${t}</span><span class="check-help block font-normal">${d}</span></span>
      </label>`
        )
        .join("")}
    </div>`),
};

export const CheckboxBorderedIcon = {
  name: "Bordered with icon",
  render: () =>
    exBlock(`<div class="grid max-w-2xl gap-3 sm:grid-cols-2">
      ${[
        ["file-text", "Unggah CV", "Format PDF atau DOCX, maks 5 MB."],
        ["graduation-cap", "Tambah sertifikat", "Sertifikat pelatihan atau kursus."],
      ]
        .map(
          ([ic, t, d], i) => `<label class="check-bordered items-start">
        <input type="checkbox" class="form-check mt-0.5" ${i === 0 ? "checked" : ""} />
        ${cIcon(ic, "mt-0.5 h-5 w-5 shrink-0")}
        <span><span class="block text-sm font-semibold text-fg">${t}</span><span class="check-help block font-normal">${d}</span></span>
      </label>`
        )
        .join("")}
    </div>`),
};

export const CheckboxListGroup = {
  name: "Checkbox list group",
  render: () =>
    exBlock(`<ul class="check-list max-w-sm">
      ${STACK.map((l, i) => `<li><label class="check-list-item cursor-pointer"><input type="checkbox" class="form-check" ${i === 1 ? "checked" : ""} />${l}</label></li>`).join("")}
    </ul>`),
};

export const CheckboxHorizontalListGroup = {
  name: "Horizontal list group",
  render: () =>
    exBlock(`<ul class="check-list check-list-horizontal max-w-3xl">
      ${STACK.map((l, i) => `<li><label class="check-list-item cursor-pointer"><input type="checkbox" class="form-check" ${i === 1 ? "checked" : ""} />${l}</label></li>`).join("")}
    </ul>`),
};

export const CheckboxDropdown = {
  name: "Checkbox dropdown",
  render: () =>
    exBlock(`<div class="relative inline-block min-h-16">
      <button type="button" class="btn-outline btn-md" data-ui-dropdown aria-expanded="false" aria-haspopup="true">Pilih keahlian<i class="kk kk-caret-down h-3.5 w-3.5"></i></button>
      <div class="dropdown-menu hidden left-0 right-auto w-64 p-2">
        <div class="relative mb-2">
          <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-subtle"><i class="kk kk-magnifying-glass h-4 w-4"></i></span>
          <input class="input h-9 pl-9 text-xs" placeholder="Cari keahlian" aria-label="Cari keahlian" />
        </div>
        <ul class="max-h-44 overflow-y-auto">
          ${["Desain UI", "Analisis data", "Manajemen proyek", "Penulisan konten", "Pemasaran digital"]
            .map((l, i) => `<li><label class="flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-fg-muted hover:bg-neutral-50"><input type="checkbox" class="form-check form-check-sm" ${i < 2 ? "checked" : ""} />${l}</label></li>`)
            .join("")}
        </ul>
        <button type="button" class="dropdown-item dropdown-item-danger mt-1 border-t border-border-subtle pt-2">${cIcon("trash", "h-4 w-4")}Hapus terpilih</button>
      </div>
    </div>`),
};

export const CheckboxInline = {
  name: "Inline layout",
  render: () =>
    exBlock(`<div class="flex flex-wrap items-center gap-x-6 gap-y-3">
      ${check({ id: "cin-1", label: "Inline 1" })}
      ${check({ id: "cin-2", label: "Inline 2" })}
      ${check({ id: "cin-3", label: "Inline checked", checked: true })}
      ${check({ id: "cin-4", label: "Inline disabled", disabled: true })}
    </div>`),
};

export const CheckboxColors = {
  name: "Colors",
  render: () =>
    exBlock(`<div class="flex flex-wrap items-center gap-x-6 gap-y-3">
      ${["red", "green", "purple", "teal", "yellow", "orange"]
        .map((c) => check({ id: `cc-${c}`, label: c.charAt(0).toUpperCase() + c.slice(1), checked: true, box: `form-check form-check-${c}` }))
        .join("")}
    </div>`),
};

export const CheckboxAdvanced = {
  name: "Advanced layout",
  render: () =>
    exBlock(`<ul class="grid max-w-3xl gap-3 sm:grid-cols-3">
      ${[
        ["briefcase", "Full-time", "Kerja penuh waktu."],
        ["clock", "Part-time", "Paruh waktu fleksibel."],
        ["graduation-cap", "Magang", "Program magang kampus."],
      ]
        .map(
          ([ic, t, d], i) => `<li><label class="choice"><input type="checkbox" ${i === 0 ? "checked" : ""} />
        <span class="choice-body items-center text-center">${cIcon(ic, "h-7 w-7")}<span class="choice-title">${t}</span><span>${d}</span></span></label></li>`
        )
        .join("")}
    </ul>`),
};
