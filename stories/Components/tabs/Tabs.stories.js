import { byKey } from "./examples.js";

export default {
  title: "Components/Tabs",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Tab untuk berpindah antar-tampilan. Anatomi: \`.tabs\` + varian (\`.tabs-default\`, \`.tabs-underline\`, \`.tabs-pills\`, \`.tabs-vertical\`, \`.tabs-full\`) > \`.tabs-item\` (\`<a>\` atau \`<button>\`). Aktif: \`aria-current="page"\` atau \`aria-selected="true"\`; nonaktif: \`aria-disabled="true"\`.

**Interaktif** (\`assets/js/ui.js\`): bungkus dengan \`data-ui-tabs\`; tab \`role="tab"\` + \`data-ui-tab="id-panel"\`; panel \`role="tabpanel"\`. Panah kiri/kanan (atau atas/bawah untuk vertikal), Home, dan End berpindah tab. \`data-ui-tabs-active-classes\` / \`-inactive-classes\` mengganti warna aktif/nonaktif. \`<select data-ui-tab-select>\` mencerminkan tab di layar kecil.

Tab bersegmen \`.tab\` / \`.tab-active\` (filter kecil) ada di story "Segmented Tabs".
`,
      },
    },
  },
};

const story = (key) => ({
  parameters: { docs: { description: { story: byKey[key].note } } },
  render: () => `<div class="p-6">${byKey[key].demo}</div>`,
});

export const Default = story("default");
export const Underline = story("underline");
export const WithIcons = story("icons");
export const Pills = story("pills");
export const Vertical = story("vertical");
export const FullWidth = story("full");
export const FullWidthWithIcons = story("full-icons");
export const Interactive = story("interactive");
export const ActiveTabStyle = story("custom");

export const Segmented = {
  name: "Segmented Tabs",
  render: () => `
    <div class="card flex flex-col gap-4 p-4 max-w-xs">
      <div>
        <p class="nav-eyebrow mb-2">Segmented tabs</p>
        <div class="inline-flex w-fit gap-1 rounded-xl bg-slate-100 p-1">
          <span class="tab tab-active">Semua</span>
          <span class="tab">Aktif</span>
          <span class="tab">Selesai</span>
        </div>
      </div>
      <div>
        <p class="nav-eyebrow mb-2">Eyebrow label</p>
        <p class="nav-eyebrow px-0">Alat Karier</p>
      </div>
    </div>`,
};
