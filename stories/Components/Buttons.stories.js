export default {
  title: "Components/Buttons",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: { component: "Enam varian, tiga ukuran, mendukung ikon & state disabled." },
    },
  },
};

export const Variants = {
  render: () => `
    <div class="card p-6 sm:p-8">
      <div class="flex flex-wrap items-center gap-3">
        <button class="btn-primary btn-md">Primary</button>
        <button class="btn-secondary btn-md">Secondary</button>
        <button class="btn-accent btn-md">Accent</button>
        <button class="btn-outline btn-md">Outline</button>
        <button class="btn-ghost btn-md">Ghost</button>
        <button class="btn-danger btn-md">Danger</button>
      </div>
    </div>`,
};

export const Sizes = {
  render: () => `
    <div class="card p-6 sm:p-8">
      <div class="flex flex-wrap items-center gap-3">
        <button class="btn-primary btn-sm">Small</button>
        <button class="btn-primary btn-md">Medium</button>
        <button class="btn-primary btn-lg">Large</button>
      </div>
    </div>`,
};

export const WithIconsAndState = {
  name: "With Icons & State",
  render: () => `
    <div class="card p-6 sm:p-8">
      <div class="flex flex-wrap items-center gap-3">
        <button class="btn-primary btn-md">
          <i class="kk kk-plus h-4 w-4"></i>
          Tambah Lamaran
        </button>
        <button class="btn-outline btn-md">
          Cari Lowongan
          <i class="kk kk-caret-right h-4 w-4"></i>
        </button>
        <button class="btn-primary btn-md" disabled>Disabled</button>
      </div>
    </div>`,
};

export const OnGradient = {
  name: "On Gradient",
  render: () => `
    <div class="card p-6 sm:p-8">
      <div class="flex flex-wrap items-center gap-3 rounded-xl bg-brand-gradient p-5">
        <button class="btn-white btn-md">Lihat Rekomendasi</button>
        <button class="btn btn-md border border-white/30 text-white hover:bg-white/10 focus-visible:ring-white">Atur Preferensi</button>
      </div>
    </div>`,
};
