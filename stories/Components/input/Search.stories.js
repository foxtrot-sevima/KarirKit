export default {
  title: "Components/Search",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Input pencarian dengan ikon, plus varian dengan keyboard shortcut hint." } },
  },
};

export const IconPrefix = {
  name: "Icon Prefix",
  render: () => `
    <div class="p-6 max-w-sm">
      <label class="form-label">Posisi yang dicari</label>
      <div class="relative">
        <span class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
          <i class="kk kk-magnifying-glass h-4 w-4"></i>
        </span>
        <input class="input pl-10" placeholder="Product Designer" />
      </div>
      <p class="form-hint">Contoh: Product Designer, Data Analyst</p>
    </div>`,
};

export const WithShortcut = {
  name: "With Keyboard Shortcut",
  render: () => `
    <div class="p-6 max-w-sm">
      <label class="form-label mb-2.5">Search dengan shortcut</label>
      <div class="relative">
        <span class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
          <i class="kk kk-magnifying-glass h-4 w-4"></i>
        </span>
        <input class="input pl-10 pr-14" placeholder="Cari sesuatu..." />
        <span class="kbd absolute right-2.5 top-1/2 -translate-y-1/2">&#8984;K</span>
      </div>
    </div>`,
};
