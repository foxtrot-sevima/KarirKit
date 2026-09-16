export default {
  title: "Components/Tooltip",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Hover atau fokus keyboard (Tab) - pakai `.tooltip-content` di dalam `.group`." } },
  },
};

export const Default = {
  render: () => `
    <div class="p-6">
      <span class="group relative inline-flex">
        <button class="btn-outline btn-sm">Hover aku</button>
        <span class="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">Ini contoh tooltip</span>
      </span>
    </div>`,
};
