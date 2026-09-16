export default {
  title: "Components/Input",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Text input dasar, plus varian dengan prefix (mis. mata uang) dan hint text." } },
  },
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    hint: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Nama Lengkap",
    placeholder: "Ahmad Dimas",
    hint: "",
    disabled: false,
  },
};

export const Playground = {
  render: (args) => `
    <div class="p-6 max-w-sm">
      <label class="form-label">${args.label}</label>
      <input class="input" placeholder="${args.placeholder}" ${args.disabled ? "disabled" : ""} />
      ${args.hint ? `<p class="form-hint">${args.hint}</p>` : ""}
    </div>`,
};

export const WithPrefixAndHint = {
  name: "With Prefix & Hint",
  render: () => `
    <div class="p-6 max-w-sm">
      <label class="form-label">Ekspektasi Gaji</label>
      <div class="relative">
        <span class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">Rp.</span>
        <input type="text" inputmode="numeric" class="input pl-11" placeholder="0" />
      </div>
      <p class="form-hint">Titik pemisah ribuan ditambahkan otomatis saat mengetik.</p>
    </div>`,
};
