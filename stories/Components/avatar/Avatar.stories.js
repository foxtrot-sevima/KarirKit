export default {
  title: "Components/Avatar",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Inisial sebagai fallback, status dot, dan grup bertumpuk." } },
  },
  argTypes: {
    initials: { control: "text" },
    size: {
      control: "select",
      options: ["h-8 w-8 text-xs", "h-10 w-10 text-sm", "h-11 w-11 text-base", "h-12 w-12 text-base", "h-14 w-14 text-lg"],
      description: "Class ukuran + font-size yang serasi",
    },
    color: {
      control: "select",
      options: ["default", "primary", "info", "warning", "success", "danger"],
    },
    withStatusDot: { control: "boolean", name: "With Status Dot" },
  },
  args: {
    initials: "AD",
    size: "h-12 w-12 text-base",
    color: "default",
    withStatusDot: false,
  },
};

const COLOR_CLASS = {
  default: "",
  primary: "bg-primary-100 text-primary-700",
  info: "bg-info-100 text-info-700",
  warning: "bg-warning-100 text-warning-700",
  success: "bg-success-100 text-success-700",
  danger: "bg-danger-100 text-danger-700",
};

export const Playground = {
  render: (args) => {
    const colorClass = COLOR_CLASS[args.color];
    const avatar = `<span class="avatar ${args.size} ${colorClass}">${args.initials}</span>`;
    if (!args.withStatusDot) return `<div class="p-6">${avatar}</div>`;
    return `
      <div class="p-6">
        <span class="relative inline-flex">
          <span class="avatar ${args.size} ${colorClass}">${args.initials}</span>
          <span class="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success-500 ring-2 ring-white"></span>
        </span>
      </div>`;
  },
};

export const Sizes = {
  render: () => `
    <div class="flex items-center gap-3 p-6">
      <span class="avatar h-8 w-8 text-xs">AD</span>
      <span class="avatar h-10 w-10 text-sm">AD</span>
      <span class="avatar h-12 w-12 text-base">AD</span>
      <span class="avatar h-14 w-14 text-lg">AD</span>
    </div>`,
};

export const Group = {
  name: "Stacked Group",
  render: () => `
    <div class="flex -space-x-3 p-6">
      <span class="avatar h-9 w-9 bg-info-100 text-info-700 ring-2 ring-white">GJ</span>
      <span class="avatar h-9 w-9 bg-warning-100 text-warning-700 ring-2 ring-white">TP</span>
      <span class="avatar h-9 w-9 bg-success-100 text-success-700 ring-2 ring-white">TV</span>
      <span class="avatar h-9 w-9 bg-slate-200 text-slate-600 ring-2 ring-white">+5</span>
    </div>`,
};
