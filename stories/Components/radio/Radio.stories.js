export default {
  title: "Components/Radio",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Radio button dalam satu grup (`name` sama)." } },
  },
  argTypes: {
    optionA: { control: "text", name: "Label opsi A" },
    optionB: { control: "text", name: "Label opsi B" },
    selected: { control: "radio", options: ["A", "B"] },
  },
  args: {
    optionA: "Remote",
    optionB: "Hybrid",
    selected: "A",
  },
};

export const Playground = {
  render: (args) => `
    <div class="p-6 space-y-2.5">
      <label class="flex items-center gap-2.5 text-sm text-slate-600"><input type="radio" name="wfh" ${args.selected === "A" ? "checked" : ""} class="form-radio" /> ${args.optionA}</label>
      <label class="flex items-center gap-2.5 text-sm text-slate-600"><input type="radio" name="wfh" ${args.selected === "B" ? "checked" : ""} class="form-radio" /> ${args.optionB}</label>
    </div>`,
};

// Appended variants

// ---------------------------------------------------------------------------
// Radio - extended layouts (see src/input.css "Form choice controls")
// ---------------------------------------------------------------------------
const exBlock = (inner) => `<div class="p-6">${inner}</div>`;
const rIcon = (n, cls = "h-5 w-5") => `<i class="kk kk-${n} ${cls}"></i>`;
const radio = ({ id, name = "rg", label, checked = false, disabled = false, help = "", cls = "" }) => `
  <div class="check-row ${cls}">
    <input id="${id}" type="radio" name="${name}" class="form-radio mt-0.5" ${checked ? "checked" : ""} ${disabled ? "disabled" : ""} />
    <div><label for="${id}" class="check-label">${label}</label>${help ? `<p class="check-help">${help}</p>` : ""}</div>
  </div>`;
const IDS = ["Kartu Tanda Penduduk", "Kartu Pelajar", "Surat Izin Mengemudi", "Paspor"];

export const RadioExample = {
  name: "Radio example",
  render: () =>
    exBlock(`<div class="space-y-3">
      ${radio({ id: "rx-1", name: "rx", label: "Default radio" })}
      ${radio({ id: "rx-2", name: "rx", label: "Checked state", checked: true })}
    </div>`),
};

export const RadioDisabled = {
  name: "Disabled state",
  render: () =>
    exBlock(`<div class="space-y-3">
      ${radio({ id: "rd-1", name: "rd", label: "Disabled radio", disabled: true })}
      ${radio({ id: "rd-2", name: "rd", label: "Disabled checked", checked: true, disabled: true })}
    </div>`),
};

export const RadioLink = {
  name: "Radio link",
  render: () =>
    exBlock(`<div class="check-row">
      <input id="rl-1" type="radio" class="form-radio mt-0.5" />
      <label for="rl-1" class="check-label font-normal text-fg-muted">Saya menyetujui <a href="#" class="card-link">syarat dan ketentuan</a>.</label>
    </div>`),
};

export const RadioHelperText = {
  name: "Helper text",
  render: () =>
    exBlock(`<div class="space-y-4">
      ${radio({ id: "rh-1", name: "rh", label: "Notifikasi email", help: "Terima ringkasan lowongan yang cocok setiap minggu.", checked: true })}
      ${radio({ id: "rh-2", name: "rh", label: "Tanpa notifikasi", help: "Kamu tetap bisa melihat rekomendasi di dashboard." })}
    </div>`),
};

export const RadioBordered = {
  name: "Bordered",
  render: () =>
    exBlock(`<div class="grid max-w-xl gap-3 sm:grid-cols-2">
      <label class="check-bordered"><input type="radio" name="rb" class="form-radio" />Default radio</label>
      <label class="check-bordered"><input type="radio" name="rb" class="form-radio" checked />Checked state</label>
    </div>`),
};

export const RadioListGroup = {
  name: "Radio list group",
  render: () =>
    exBlock(`<ul class="check-list max-w-sm">
      ${IDS.map((l, i) => `<li><label class="check-list-item cursor-pointer"><input type="radio" name="rlg" class="form-radio" ${i === 0 ? "checked" : ""} />${l}</label></li>`).join("")}
    </ul>`),
};

export const RadioHorizontalListGroup = {
  name: "Horizontal list group",
  render: () =>
    exBlock(`<ul class="check-list check-list-horizontal max-w-3xl">
      ${IDS.map((l, i) => `<li><label class="check-list-item cursor-pointer"><input type="radio" name="rhl" class="form-radio" ${i === 0 ? "checked" : ""} />${l}</label></li>`).join("")}
    </ul>`),
};

export const RadioInDropdown = {
  name: "Radio in dropdown",
  render: () =>
    exBlock(`<div class="relative inline-block min-h-16">
      <button type="button" class="btn-outline btn-md" data-ui-dropdown aria-expanded="false" aria-haspopup="true">Tipe akun<i class="kk kk-caret-down h-3.5 w-3.5"></i></button>
      <div class="dropdown-menu hidden left-0 right-auto w-72 p-2">
        ${[
          ["Individu", "Untuk pencari kerja perorangan."],
          ["Perusahaan", "Untuk tim rekrutmen dan HR."],
          ["Institusi", "Untuk kampus dan lembaga pelatihan."],
        ]
          .map(
            ([t, d], i) => `<label class="flex cursor-pointer gap-3 rounded-lg p-2.5 hover:bg-neutral-50">
          <input type="radio" name="rdd" class="form-radio mt-0.5" ${i === 0 ? "checked" : ""} />
          <span><span class="block text-sm font-medium text-fg">${t}</span><span class="check-help block">${d}</span></span>
        </label>`
          )
          .join("")}
      </div>
    </div>`),
};

export const RadioInline = {
  name: "Inline layout",
  render: () =>
    exBlock(`<div class="flex flex-wrap items-center gap-x-6 gap-y-3">
      ${radio({ id: "ri-1", name: "ri", label: "Inline 1" })}
      ${radio({ id: "ri-2", name: "ri", label: "Inline 2" })}
      ${radio({ id: "ri-3", name: "ri", label: "Inline checked", checked: true })}
      ${radio({ id: "ri-4", name: "ri", label: "Inline disabled", disabled: true })}
    </div>`),
};

export const RadioAdvanced = {
  name: "Advanced layout",
  render: () =>
    exBlock(`<ul class="grid max-w-xl gap-3 sm:grid-cols-2">
      ${[
        ["0-50 MB", "Cocok untuk CV dan portofolio ringan."],
        ["500-1000 MB", "Untuk portofolio video dan karya besar."],
      ]
        .map(
          ([t, d], i) => `<li><label class="choice"><input type="radio" name="ra" ${i === 0 ? "checked" : ""} />
        <span class="choice-body"><span class="choice-title">${t}</span><span>${d}</span></span></label></li>`
        )
        .join("")}
    </ul>`),
};

export const RadioAdvancedWithIcons = {
  name: "Advanced layout with icons",
  render: () =>
    exBlock(`<ul class="grid max-w-3xl gap-3 sm:grid-cols-3">
      ${[
        ["house", "Remote", "Kerja dari mana saja."],
        ["buildings", "On-site", "Bekerja di kantor."],
        ["globe", "Hybrid", "Gabungan keduanya."],
      ]
        .map(
          ([ic, t, d], i) => `<li><label class="choice"><input type="radio" name="rai" ${i === 1 ? "checked" : ""} />
        <span class="choice-body items-center text-center">${rIcon(ic, "h-7 w-7")}<span class="choice-title">${t}</span><span>${d}</span></span></label></li>`
        )
        .join("")}
    </ul>`),
};
