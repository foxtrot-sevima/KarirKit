export default {
  title: "Components/Checkbox",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Checkbox dengan state checked & unchecked." } },
  },
  argTypes: {
    label: { control: "text" },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Notifikasi lamaran baru via email",
    checked: true,
    disabled: false,
  },
};

export const Playground = {
  render: (args) => `
    <div class="p-6">
      <label class="flex items-center gap-2.5 text-sm text-slate-600 ${args.disabled ? "cursor-not-allowed opacity-50" : ""}">
        <input type="checkbox" ${args.checked ? "checked" : ""} ${args.disabled ? "disabled" : ""} class="form-check" /> ${args.label}
      </label>
    </div>`,
};

export const List = {
  render: () => `
    <div class="p-6 space-y-2.5">
      <label class="flex items-center gap-2.5 text-sm text-slate-600"><input type="checkbox" checked class="form-check" /> Notifikasi lamaran baru via email</label>
      <label class="flex items-center gap-2.5 text-sm text-slate-600"><input type="checkbox" class="form-check" /> Newsletter tips karier mingguan</label>
    </div>`,
};
