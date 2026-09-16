export default {
  title: "Components/Button",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: "Enam varian, tiga ukuran, mendukung ikon & state disabled. Pakai panel Controls di bawah untuk coba kombinasi lain — kode HTML-nya ikut berubah di tab Show code." },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "accent", "outline", "ghost", "danger", "white"],
      description: "Class varian warna (`.btn-*`)",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Class ukuran (`.btn-*`)",
    },
    label: { control: "text" },
    icon: {
      control: "select",
      options: ["none", "plus", "caret-right", "sparkle", "trash"],
      description: "Ikon opsional di kiri tombol",
    },
    disabled: { control: "boolean" },
  },
  args: {
    variant: "primary",
    size: "md",
    label: "Tambah Lamaran",
    icon: "plus",
    disabled: false,
  },
};

function renderButton(args) {
  const iconHtml = args.icon && args.icon !== "none" ? `<i class="kk kk-${args.icon} h-4 w-4"></i>` : "";
  const disabledAttr = args.disabled ? " disabled" : "";
  return `<button class="btn-${args.variant} btn-${args.size}"${disabledAttr}>${iconHtml}${args.label}</button>`;
}

export const Playground = {
  render: (args) => `<div class="p-6">${renderButton(args)}</div>`,
};

export const Variants = {
  render: () => `
    <div class="flex flex-wrap items-center gap-3 p-6">
      <button class="btn-primary btn-md">Primary</button>
      <button class="btn-secondary btn-md">Secondary</button>
      <button class="btn-accent btn-md">Accent</button>
      <button class="btn-outline btn-md">Outline</button>
      <button class="btn-ghost btn-md">Ghost</button>
      <button class="btn-danger btn-md">Danger</button>
    </div>`,
};

export const Sizes = {
  render: () => `
    <div class="flex flex-wrap items-center gap-3 p-6">
      <button class="btn-primary btn-sm">Small</button>
      <button class="btn-primary btn-md">Medium</button>
      <button class="btn-primary btn-lg">Large</button>
    </div>`,
};

export const OnGradient = {
  name: "On Gradient",
  render: () => `
    <div class="flex flex-wrap items-center gap-3 rounded-xl bg-brand-gradient p-5 m-6">
      <button class="btn-white btn-md">Lihat Rekomendasi</button>
      <button class="btn btn-md border border-white/30 text-white hover:bg-white/10 focus-visible:ring-white">Atur Preferensi</button>
    </div>`,
};
