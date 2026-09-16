export default {
  title: "Components/Toggle",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Switch on/off berbasis checkbox + peer, tanpa JS tambahan." } },
  },
  argTypes: {
    label: { control: "text" },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Mode pencarian aktif",
    checked: true,
    disabled: false,
  },
};

export const Playground = {
  render: (args) => `
    <div class="p-6">
      <label class="inline-flex items-center gap-3 ${args.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}">
        <span class="relative">
          <input type="checkbox" ${args.checked ? "checked" : ""} ${args.disabled ? "disabled" : ""} class="peer sr-only" />
          <span class="block h-6 w-11 rounded-full bg-slate-200 transition-colors peer-checked:bg-primary-600"></span>
          <span class="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-5"></span>
        </span>
        <span class="text-sm text-slate-600">${args.label}</span>
      </label>
    </div>`,
};
