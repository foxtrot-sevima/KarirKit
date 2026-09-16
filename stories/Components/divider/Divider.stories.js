export default {
  title: "Components/Divider",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Garis pemisah vertikal untuk item sebaris, mis. meta info atau breadcrumb ringkas." } },
  },
};

export const Vertical = {
  name: "Vertical Divider",
  render: () => `
    <div class="p-6">
      <div class="flex h-10 items-center gap-4 text-sm text-slate-500">
        <span>Item A</span><span class="divider-v"></span><span>Item B</span><span class="divider-v"></span><span>Item C</span>
      </div>
    </div>`,
};
