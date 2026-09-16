export default {
  title: "Foundations/Colors",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Primary & secondary diturunkan langsung dari logo KarirLink, plus warna semantik. Tersedia sebagai utility `bg-*`, `text-*`, `border-*`.",
      },
    },
  },
};

function swatchRow(name, shades) {
  return `
    <p class="nav-eyebrow mb-3 px-0">${name}</p>
    <div class="grid grid-cols-3 gap-3 sm:grid-cols-6 lg:grid-cols-11 mb-8">
      ${shades
        .map(
          (s) => `
        <div class="flex flex-col gap-2">
          <div class="h-14 rounded-xl${s.border ? " border border-slate-200/70" : ""} bg-${s.token}"></div>
          <p class="text-xs font-medium text-slate-600">${s.label}</p>
        </div>`
        )
        .join("")}
    </div>`;
}

const PRIMARY = [
  { token: "primary-50", label: "50", border: true },
  { token: "primary-100", label: "100" },
  { token: "primary-200", label: "200" },
  { token: "primary-300", label: "300" },
  { token: "primary-400", label: "400" },
  { token: "primary-500", label: "500" },
  { token: "primary-600", label: "600 base" },
  { token: "primary-700", label: "700" },
  { token: "primary-800", label: "800" },
  { token: "primary-900", label: "900" },
  { token: "primary-950", label: "950" },
];

const SECONDARY = PRIMARY.map((s) => ({ ...s, token: s.token.replace("primary", "secondary") }));

const SLATE = [
  { token: "slate-50", label: "50", border: true },
  { token: "slate-100", label: "100" },
  { token: "slate-200", label: "200" },
  { token: "slate-300", label: "300" },
  { token: "slate-400", label: "400" },
  { token: "slate-500", label: "500" },
  { token: "slate-600", label: "600" },
  { token: "slate-700", label: "700" },
  { token: "slate-800", label: "800" },
  { token: "slate-900", label: "900 teks utama" },
  { token: "slate-950", label: "950" },
];

function semanticGroup(name, color) {
  return `
    <div>
      <p class="mb-2 text-sm font-semibold text-slate-700">${name}</p>
      <div class="grid grid-cols-5 gap-2">
        <div class="flex flex-col gap-1.5"><div class="h-10 rounded-lg border border-slate-200/70 bg-${color}-50"></div><p class="text-[11px] font-mono text-slate-400">${color}-50</p></div>
        <div class="flex flex-col gap-1.5"><div class="h-10 rounded-lg bg-${color}-100"></div><p class="text-[11px] font-mono text-slate-400">${color}-100</p></div>
        <div class="flex flex-col gap-1.5"><div class="h-10 rounded-lg bg-${color}-500"></div><p class="text-[11px] font-mono text-slate-400">${color}-500</p></div>
        <div class="flex flex-col gap-1.5"><div class="h-10 rounded-lg bg-${color}-600"></div><p class="text-[11px] font-mono text-slate-400">${color}-600</p></div>
        <div class="flex flex-col gap-1.5"><div class="h-10 rounded-lg bg-${color}-700"></div><p class="text-[11px] font-mono text-slate-400">${color}-700</p></div>
      </div>
    </div>`;
}

export const Primary = { render: () => `<div class="card p-6 sm:p-8">${swatchRow("Primary - Blue", PRIMARY)}</div>` };
export const Secondary = { render: () => `<div class="card p-6 sm:p-8">${swatchRow("Secondary - Orange", SECONDARY)}</div>` };
export const Neutral = { render: () => `<div class="card p-6 sm:p-8">${swatchRow("Neutral - Slate", SLATE)}</div>` };

export const Semantic = {
  render: () => `
    <div class="card p-6 sm:p-8">
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        ${semanticGroup("Success", "success")}
        ${semanticGroup("Warning", "warning")}
        ${semanticGroup("Danger", "danger")}
        ${semanticGroup("Info", "info")}
      </div>
    </div>`,
};

export const GradientAndShell = {
  name: "Gradient & Shell",
  render: () => `
    <div class="card p-6 sm:p-8">
      <div class="grid gap-4 sm:grid-cols-3">
        <div class="flex h-20 items-end rounded-xl bg-brand-gradient p-3 text-xs font-medium text-white">bg-brand-gradient</div>
        <div class="flex h-20 items-end rounded-xl bg-brand-gradient-soft border border-slate-200/70 p-3 text-xs font-medium text-slate-500">bg-brand-gradient-soft</div>
        <div class="flex h-20 items-end rounded-xl bg-shell border border-slate-200/70 p-3 text-xs font-medium text-slate-500">bg-shell (app background)</div>
      </div>
    </div>`,
};
