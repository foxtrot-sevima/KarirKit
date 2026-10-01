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

// Appended variants

// ---------------------------------------------------------------------------
// Button component - extended variants (see src/input.css "Buttons: extra ...")
// ---------------------------------------------------------------------------
const exBlock = (inner) => `<div class="p-6">${inner}</div>`;
const btnRow = (items, gap = "gap-3") => exBlock(`<div class="flex flex-wrap items-center ${gap}">${items.join("")}</div>`);
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const COLORS = [
  ["primary", "Primary"],
  ["secondary", "Secondary"],
  ["tertiary", "Tertiary"],
  ["success", "Success"],
  ["danger", "Danger"],
  ["warning", "Warning"],
  ["dark", "Dark"],
  ["ghost", "Ghost"],
];
const MONO = ["blue", "green", "cyan", "teal", "lime", "red", "pink", "purple"];
const DUO = [
  ["purple-blue", "Purple to Blue"],
  ["cyan-blue", "Cyan to Blue"],
  ["green-blue", "Green to Blue"],
  ["purple-pink", "Purple to Pink"],
  ["pink-orange", "Pink to Orange"],
  ["teal-lime", "Teal to Lime"],
  ["red-yellow", "Red to Yellow"],
];
const OUTLINE = [
  ["primary", "Primary"],
  ["neutral", "Neutral"],
  ["success", "Success"],
  ["danger", "Danger"],
  ["warning", "Warning"],
];
const SIZES = [
  ["btn-xs", "Extra small"],
  ["btn-sm", "Small"],
  ["btn-md", "Base"],
  ["btn-lg", "Large"],
  ["btn-xl", "Extra large"],
];
const cart = `<i class="kk kk-shopping-cart h-4 w-4"></i>`;

export const DefaultButton = { name: "Default button", render: () => btnRow(COLORS.map(([c, l]) => `<button type="button" class="btn-${c === "ghost" ? "ghost" : c} btn-md">${l}</button>`)) };
export const ButtonPills = { name: "Button pills", render: () => btnRow(COLORS.map(([c, l]) => `<button type="button" class="btn-${c} btn-pill btn-md">${l}</button>`)) };
export const GradientMonochrome = { name: "Gradient monochrome", render: () => btnRow(MONO.map((c) => `<button type="button" class="btn-gradient-${c} btn-md">${cap(c)}</button>`)) };
export const GradientDuotone = { name: "Gradient duotone", render: () => btnRow(DUO.map(([c, l]) => `<button type="button" class="btn-duo-${c} btn-md">${l}</button>`)) };
export const GradientOutline = {
  name: "Gradient outline",
  render: () => btnRow(DUO.map(([c, l]) => `<button type="button" class="btn-duo-${c} btn-gradient-outline"><span>${l}</span></button>`)),
};
export const ColoredShadows = { name: "Colored shadows", render: () => btnRow(MONO.map((c) => `<button type="button" class="btn-glow-${c} btn-md">${cap(c)}</button>`), "gap-4") };

export const SocialButtons = {
  name: "Social buttons",
  render: () =>
    btnRow([
      `<button type="button" class="btn-social-facebook"><i class="kk kk-facebook-logo h-4 w-4"></i>Masuk dengan Facebook</button>`,
      `<button type="button" class="btn-social-x"><i class="kk kk-x-logo h-4 w-4"></i>Masuk dengan X</button>`,
      `<button type="button" class="btn-social-github"><i class="kk kk-github-logo h-4 w-4"></i>Masuk dengan GitHub</button>`,
      `<button type="button" class="btn-social-google"><i class="kk kk-google-logo h-4 w-4"></i>Masuk dengan Google</button>`,
      `<button type="button" class="btn-social-apple"><i class="kk kk-apple-logo h-4 w-4"></i>Masuk dengan Apple</button>`,
    ]),
};

export const OutlineButtons = { name: "Outline buttons", render: () => btnRow(OUTLINE.map(([c, l]) => `<button type="button" class="btn-outline-${c} btn-md">${l}</button>`)) };
export const ButtonSizes = { name: "Button sizes", render: () => btnRow(SIZES.map(([s, l]) => `<button type="button" class="btn-primary ${s}">${l}</button>`)) };
export const OutlineButtonSizes = { name: "Outline button sizes", render: () => btnRow(SIZES.map(([s, l]) => `<button type="button" class="btn-outline-primary ${s}">${l}</button>`)) };
export const ButtonSizesWithIcon = { name: "Button sizes with icon", render: () => btnRow(SIZES.map(([s, l]) => `<button type="button" class="btn-primary ${s}">${cart}${l}</button>`)) };

export const ButtonsWithIcon = {
  name: "Buttons with icon",
  render: () =>
    btnRow([
      `<button type="button" class="btn-primary btn-md"><i class="kk kk-briefcase h-4 w-4"></i>Lamar sekarang</button>`,
      `<button type="button" class="btn-primary btn-md">Pilih paket<i class="kk kk-arrow-right h-4 w-4"></i></button>`,
      `<button type="button" class="btn-outline btn-md"><i class="kk kk-download-simple h-4 w-4"></i>Unduh CV</button>`,
    ]),
};

export const ButtonWithLabel = {
  name: "Button with label",
  render: () =>
    btnRow([
      `<button type="button" class="btn-primary btn-md">Notifikasi<span class="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-[11px] font-bold text-primary-700">3</span></button>`,
      `<button type="button" class="btn-outline btn-md">Pesan<span class="badge badge-primary">12</span></button>`,
    ]),
};

export const IconButtons = {
  name: "Icon buttons",
  render: () =>
    exBlock(`<div class="space-y-4">
      <div class="flex flex-wrap items-center gap-3">
        ${["btn-icon-sm", "btn-icon-md", "btn-icon-lg"].map((s) => `<button type="button" class="btn-primary ${s}" aria-label="Berikutnya"><i class="kk kk-arrow-right h-4 w-4"></i></button>`).join("")}
      </div>
      <div class="flex flex-wrap items-center gap-3">
        ${["btn-icon-sm", "btn-icon-md", "btn-icon-lg"].map((s) => `<button type="button" class="btn-outline-primary ${s}" aria-label="Berikutnya"><i class="kk kk-arrow-right h-4 w-4"></i></button>`).join("")}
      </div>
    </div>`),
};

export const Loader = {
  name: "Loader",
  render: () =>
    btnRow([
      `<button type="button" class="btn-primary btn-md btn-loading" disabled>Memuat…</button>`,
      `<button type="button" class="btn-outline btn-md btn-loading" disabled>Memuat…</button>`,
    ]),
};

export const DisabledButtons = {
  name: "Disabled",
  render: () =>
    btnRow([
      `<button type="button" class="btn-primary btn-md" disabled>Primary</button>`,
      `<button type="button" class="btn-outline btn-md" disabled>Outline</button>`,
      `<button type="button" class="btn-danger btn-md" disabled>Danger</button>`,
    ]),
};
