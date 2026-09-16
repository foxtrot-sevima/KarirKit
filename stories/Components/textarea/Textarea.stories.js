export default {
  title: "Components/Textarea",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Textarea dengan auto-grow (`.textarea-autogrow`) - tinggi menyesuaikan konten saat mengetik." } },
  },
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    rows: { control: "number" },
  },
  args: {
    label: "Ringkasan Profil",
    placeholder: "Ceritakan pengalamanmu secara singkat...",
    rows: 3,
  },
};

export const Playground = {
  render: (args) => `
    <div class="p-6 max-w-sm">
      <label class="form-label">${args.label}</label>
      <textarea class="input textarea-autogrow h-auto py-2.5" rows="${args.rows}" placeholder="${args.placeholder}"></textarea>
    </div>`,
};
