import { byKey } from "./examples.js";

export default {
  title: "Components/Timeline",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Urutan peristiwa berdasarkan waktu. Hanya CSS, tanpa JS.

**Vertikal:** \`ol.timeline\` > \`li.timeline-item\` > penanda (\`.timeline-marker\` berikon/avatar atau \`.timeline-dot\` titik polos) + \`time.timeline-time\` (atau \`.badge-neutral\`) + \`.timeline-title\` + \`.timeline-body\`.

**Mendatar (stepper):** \`ol.timeline-steps\` > \`li.timeline-step\` > \`.timeline-step-track\` (\`.timeline-step-marker\` + \`.timeline-step-line\`) + isi. Mendatar mulai \`sm\`, menumpuk di ponsel.

| Kelas | Fungsi |
| --- | --- |
| \`.timeline\` | Daftar vertikal dengan garis di sisi kiri |
| \`.timeline-item\` | Satu peristiwa (jarak bawah dan indentasi); \`.timeline-item-dot\` untuk titik polos |
| \`.timeline-marker\` | Penanda bulat (ikon atau avatar) di atas garis |
| \`.timeline-dot\` | Titik polos kecil |
| \`.timeline-time\` · \`.timeline-title\` · \`.timeline-body\` | Tipografi waktu, judul, isi |
| \`.timeline-steps\` · \`.timeline-step\` | Stepper mendatar |
`,
      },
    },
  },
};

const story = (key) => ({
  parameters: { docs: { description: { story: byKey[key].note } } },
  render: () => `<div class="max-w-3xl p-6">${byKey[key].demo}</div>`,
});

export const Default = story("default");
export const Vertical = story("vertical");
export const Stepper = story("stepper");
export const ActivityLog = story("activity");
export const Grouped = story("grouped");
