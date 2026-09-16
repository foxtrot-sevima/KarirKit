export default {
  title: "Components/Card",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Kartu dasar, kartu statistik, dan kartu hero bergradasi." } },
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    hoverable: { control: "boolean", description: "Tambahkan `.card-hover` (shadow naik saat hover)" },
  },
  args: {
    title: "Basic Card",
    description: "Kontainer default untuk mengelompokkan konten - border tipis, sudut membulat, dan shadow lembut.",
    hoverable: false,
  },
};

export const Playground = {
  render: (args) => `
    <div class="p-6">
      <div class="card${args.hoverable ? " card-hover" : ""} p-5 max-w-sm">
        <p class="mb-1 text-sm font-semibold text-slate-800">${args.title}</p>
        <p class="text-sm text-slate-500">${args.description}</p>
      </div>
    </div>`,
};

export const Stat = {
  render: () => `
    <div class="p-6">
      <div class="card card-hover p-5 max-w-sm">
        <div class="mb-3 flex items-center justify-between">
          <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
            <i class="kk kk-briefcase h-5 w-5"></i>
          </span>
          <span class="badge-success">
            <i class="kk kk-trend-up h-3 w-3"></i>
            12%
          </span>
        </div>
        <p class="font-display text-2xl font-bold text-slate-900">248</p>
        <p class="text-sm text-slate-500">Lamaran Terkirim</p>
      </div>
    </div>`,
};

export const GradientHero = {
  name: "Gradient Hero",
  render: () => `
    <div class="p-6">
      <div class="rounded-2xl bg-brand-gradient p-5 text-white shadow-glow-primary max-w-sm">
        <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
          <i class="kk kk-sparkle h-5 w-5"></i>
        </span>
        <p class="mt-3 font-display text-lg font-bold">AI Career Coach</p>
        <p class="mt-1 text-sm text-white/80">Kartu hero bergradasi untuk fitur unggulan &amp; highlight AI.</p>
      </div>
    </div>`,
};
