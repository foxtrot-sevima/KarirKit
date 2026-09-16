export default {
  title: "Components/Avatars",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Inisial sebagai fallback, status dot, dan grup bertumpuk." } },
  },
};

export const Sizes = {
  render: () => `
    <div class="card p-6 sm:p-8">
      <div class="flex items-center gap-3">
        <span class="avatar h-8 w-8 text-xs">AD</span>
        <span class="avatar h-10 w-10 text-sm">AD</span>
        <span class="avatar h-12 w-12 text-base">AD</span>
        <span class="avatar h-14 w-14 text-lg">AD</span>
      </div>
    </div>`,
};

export const StatusAndGroup = {
  name: "Status & Group",
  render: () => `
    <div class="card p-6 sm:p-8">
      <div class="flex flex-wrap items-center gap-8">
        <span class="relative inline-flex">
          <span class="avatar h-11 w-11">AD</span>
          <span class="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success-500 ring-2 ring-white"></span>
        </span>
        <div class="flex -space-x-3">
          <span class="avatar h-9 w-9 bg-info-100 text-info-700 ring-2 ring-white">GJ</span>
          <span class="avatar h-9 w-9 bg-warning-100 text-warning-700 ring-2 ring-white">TP</span>
          <span class="avatar h-9 w-9 bg-success-100 text-success-700 ring-2 ring-white">TV</span>
          <span class="avatar h-9 w-9 bg-slate-200 text-slate-600 ring-2 ring-white">+5</span>
        </div>
      </div>
    </div>`,
};
