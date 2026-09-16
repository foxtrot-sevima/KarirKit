export default {
  title: "Foundations/Icons",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'Ikon KarirKit — token berbasis class, pakai seperti icon font: `<i class="kk kk-house"></i>`. Mewarisi `currentColor`, ukuran diatur lewat utility `h-*`/`w-*`. Setiap ikon tersedia dalam 6 ketebalan (weight): Regular (default, tanpa modifier), Thin, Light, Bold, Fill, dan Duotone — tinggal tambahkan satu class modifier (`kk-thin`, `kk-light`, `kk-bold`, `kk-fill`, `kk-duotone`) di samping `kk-{nama}`.',
      },
    },
  },
};

// Semua 38 ikon yang tersedia di src/input.css, masing-masing dengan 6 varian weight.
const ICONS = [
  ["kk-bell", "bell"],
  ["kk-bookmark-simple", "bookmark"],
  ["kk-briefcase", "briefcase"],
  ["kk-calendar-blank", "calendar"],
  ["kk-caret-down", "caret down"],
  ["kk-caret-left", "caret left"],
  ["kk-caret-right", "caret right"],
  ["kk-chart-bar", "chart bar"],
  ["kk-chat-circle", "chat"],
  ["kk-check-circle", "check circle"],
  ["kk-clipboard-text", "clipboard"],
  ["kk-clock", "clock"],
  ["kk-dots-three", "dots (horizontal)"],
  ["kk-dots-three-vertical", "dots (vertical)"],
  ["kk-eye", "eye"],
  ["kk-file-text", "document"],
  ["kk-gear-six", "settings"],
  ["kk-graduation-cap", "graduation cap"],
  ["kk-handshake", "handshake"],
  ["kk-house", "home"],
  ["kk-list", "list / menu"],
  ["kk-magnifying-glass", "search"],
  ["kk-monitor", "monitor"],
  ["kk-moon", "moon"],
  ["kk-pencil-simple", "edit"],
  ["kk-plus", "plus"],
  ["kk-question", "help"],
  ["kk-shield-check", "shield check"],
  ["kk-sidebar-simple", "sidebar toggle"],
  ["kk-sign-out", "logout"],
  ["kk-sort-ascending", "sort"],
  ["kk-sparkle", "sparkle / AI"],
  ["kk-star", "star"],
  ["kk-trash", "delete"],
  ["kk-trend-down", "trend down"],
  ["kk-trend-up", "trend up"],
  ["kk-warning-circle", "warning"],
  ["kk-x", "close"],
];

const WEIGHTS = ["regular", "thin", "light", "bold", "fill", "duotone"];

function weightClass(weight) {
  return weight === "regular" ? "" : `kk-${weight}`;
}

export const Explorer = {
  name: "Icon Explorer (interactive)",
  argTypes: {
    icon: {
      control: "select",
      options: ICONS.map(([cls]) => cls),
      description: "Pilih salah satu dari 38 ikon yang tersedia",
    },
    weight: {
      control: "select",
      options: WEIGHTS,
    },
    size: {
      control: "select",
      options: ["h-4 w-4", "h-5 w-5", "h-6 w-6", "h-8 w-8", "h-10 w-10", "h-12 w-12"],
    },
  },
  args: {
    icon: "kk-sparkle",
    weight: "regular",
    size: "h-10 w-10",
  },
  render: (args) => {
    const classes = `kk ${args.icon} ${weightClass(args.weight)} ${args.size}`.replace(/\s+/g, " ").trim();
    return `
      <div class="flex flex-col items-center gap-4 p-8">
        <span class="flex h-24 w-24 items-center justify-center rounded-2xl bg-slate-50 text-primary-600">
          <i class="${classes}"></i>
        </span>
        <code class="kbd">&lt;i class="${classes}"&gt;&lt;/i&gt;</code>
      </div>`;
  },
};

export const Library = {
  name: "Library (all 38, Regular)",
  render: () => `
    <div class="grid grid-cols-4 gap-4 p-6 sm:grid-cols-6 lg:grid-cols-8">
      ${ICONS.map(
        ([cls, label]) => `
        <div class="flex flex-col items-center gap-2">
          <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-slate-600"><i class="kk ${cls} h-5 w-5"></i></span>
          <p class="text-center text-[11px] text-slate-400">${label}</p>
        </div>`
      ).join("")}
    </div>`,
};

export const Weights = {
  name: "Weights (all 6, one icon)",
  argTypes: {
    icon: { control: "select", options: ICONS.map(([cls]) => cls) },
  },
  args: { icon: "kk-house" },
  render: (args) => `
    <div class="p-6">
      <p class="nav-eyebrow mb-1 px-0">Weights</p>
      <p class="form-hint mb-4 mt-0">Tambahkan satu class modifier di samping <code class="kbd">kk-nama</code> untuk ganti ketebalan — default (tanpa modifier) adalah Regular.</p>
      <div class="grid grid-cols-3 gap-4 sm:grid-cols-6">
        ${WEIGHTS.map(
          (weight) => `
          <div class="flex flex-col items-center gap-2">
            <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-slate-600"><i class="kk ${args.icon} ${weightClass(weight)} h-6 w-6"></i></span>
            <p class="text-[11px] text-slate-400 capitalize">${weight}</p>
          </div>`
        ).join("")}
      </div>
    </div>`,
};
