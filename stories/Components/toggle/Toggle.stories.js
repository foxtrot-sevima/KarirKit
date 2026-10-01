export default {
  title: "Components/Toggle",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Switch on/off berbasis checkbox + peer, tanpa JS tambahan." } },
  },
  argTypes: {
    label: { control: "text" },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Mode pencarian aktif",
    checked: true,
    disabled: false,
  },
};

export const Playground = {
  render: (args) => `
    <div class="p-6">
      <label class="inline-flex items-center gap-3 ${args.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}">
        <span class="relative">
          <input type="checkbox" ${args.checked ? "checked" : ""} ${args.disabled ? "disabled" : ""} class="peer sr-only" />
          <span class="block h-6 w-11 rounded-full bg-slate-200 transition-colors peer-checked:bg-primary-600"></span>
          <span class="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-5"></span>
        </span>
        <span class="text-sm text-slate-600">${args.label}</span>
      </label>
    </div>`,
};

// Appended variants

// ---------------------------------------------------------------------------
// Toggle - extended layouts (see src/input.css "Form choice controls")
// ---------------------------------------------------------------------------
const exBlock = (inner) => `<div class="p-6">${inner}</div>`;
const tIcon = (n, cls = "h-5 w-5") => `<i class="kk kk-${n} ${cls}"></i>`;
const toggle = ({ id, checked = false, disabled = false, cls = "", label = "" }) => `
  <label class="inline-flex cursor-pointer items-center gap-3 ${disabled ? "cursor-not-allowed" : ""}">
    <span class="toggle ${cls}"><input id="${id}" type="checkbox" class="toggle-input" ${checked ? "checked" : ""} ${disabled ? "disabled" : ""} /><span class="toggle-track"></span></span>
    ${label ? `<span class="text-sm font-medium ${disabled ? "text-fg-subtle" : "text-fg"}">${label}</span>` : ""}
  </label>`;

export const ToggleExample = { name: "Toggle example", render: () => exBlock(toggle({ id: "tg-1", label: "Notifikasi lowongan" })) };
export const ToggleChecked = { name: "Checked state", render: () => exBlock(toggle({ id: "tg-2", checked: true, label: "Notifikasi lowongan" })) };

export const ToggleDisabled = {
  name: "Disabled state",
  render: () =>
    exBlock(`<div class="flex flex-wrap items-center gap-8">
      ${toggle({ id: "tg-3", disabled: true, label: "Nonaktif" })}
      ${toggle({ id: "tg-4", disabled: true, checked: true, label: "Nonaktif (aktif)" })}
    </div>`),
};

export const ToggleDoubleLabels = {
  name: "Double labels",
  render: () =>
    exBlock(`<label class="inline-flex cursor-pointer items-center gap-3 text-sm font-medium text-fg">
      Bulanan
      <span class="toggle"><input type="checkbox" class="toggle-input" checked /><span class="toggle-track"></span></span>
      Tahunan
    </label>`),
};

export const ToggleWithIcons = {
  name: "Toggle with icons",
  render: () =>
    exBlock(`<label class="inline-flex cursor-pointer items-center gap-3 text-fg-muted">
      ${tIcon("sun")}
      <span class="toggle"><input type="checkbox" class="toggle-input" aria-label="Mode tampilan" /><span class="toggle-track"></span></span>
      ${tIcon("moon")}
    </label>`),
};

export const ToggleCard = {
  name: "Toggle card",
  render: () =>
    exBlock(`<label class="card flex max-w-sm cursor-pointer items-start justify-between gap-4 p-4">
      <span>
        <span class="block text-sm font-semibold text-fg">Notifikasi email</span>
        <span class="check-help block">Terima ringkasan lowongan dan status lamaran.</span>
      </span>
      <span class="toggle mt-0.5"><input type="checkbox" class="toggle-input" checked /><span class="toggle-track"></span></span>
    </label>`),
};

export const ToggleCardWithIcon = {
  name: "Toggle card with icon",
  render: () =>
    exBlock(`<label class="card flex max-w-sm cursor-pointer items-center gap-4 p-4">
      <span class="toast-icon toast-icon-lg"><i class="kk kk-bell h-6 w-6"></i></span>
      <span class="flex-1">
        <span class="block text-sm font-semibold text-fg">Pengingat wawancara</span>
        <span class="check-help block">Ingatkan 1 jam sebelum jadwal dimulai.</span>
      </span>
      <span class="toggle"><input type="checkbox" class="toggle-input" /><span class="toggle-track"></span></span>
    </label>`),
};

export const ToggleColors = {
  name: "Colors",
  render: () =>
    exBlock(`<div class="flex flex-wrap items-center gap-x-8 gap-y-4">
      ${["red", "green", "purple", "yellow", "teal", "orange"]
        .map((c) => toggle({ id: `tc-${c}`, checked: true, cls: `toggle-${c}`, label: c.charAt(0).toUpperCase() + c.slice(1) }))
        .join("")}
    </div>`),
};

export const ToggleSizes = {
  name: "Sizes",
  render: () =>
    exBlock(`<div class="flex flex-wrap items-center gap-8">
      ${toggle({ id: "ts-1", checked: true, label: "Base" })}
      ${toggle({ id: "ts-2", checked: true, cls: "toggle-lg", label: "Large" })}
    </div>`),
};
