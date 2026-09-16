export default {
  title: "Components/Progress & Misc",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Progress bar, tooltip, dan divider." } },
  },
};

export const ProgressBar = {
  render: () => `
    <div class="card p-6 sm:p-8">
      <div class="max-w-md space-y-4">
        <div>
          <div class="mb-1.5 flex justify-between text-xs text-slate-500"><span>Kelengkapan Profil</span><span>83%</span></div>
          <div class="progress-track"><div class="progress-bar w-[83%]"></div></div>
        </div>
        <div>
          <div class="mb-1.5 flex justify-between text-xs text-slate-500"><span>Skor Kecocokan CV</span><span>65%</span></div>
          <div class="progress-track"><div class="progress-bar bg-warning-500 w-[65%]"></div></div>
        </div>
      </div>
    </div>`,
};

export const Tooltip = {
  render: () => `
    <div class="card p-6 sm:p-8">
      <span class="group relative inline-flex">
        <button class="btn-outline btn-sm">Hover aku</button>
        <span class="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">Ini contoh tooltip</span>
      </span>
    </div>`,
};

export const VerticalDivider = {
  name: "Vertical Divider",
  render: () => `
    <div class="card p-6 sm:p-8">
      <div class="flex h-10 items-center gap-4 text-sm text-slate-500">
        <span>Item A</span><span class="divider-v"></span><span>Item B</span><span class="divider-v"></span><span>Item C</span>
      </div>
    </div>`,
};
