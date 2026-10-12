import { byKey } from "./examples.js";

export default {
  title: "Components/Chart",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Grafik data yang mengikuti token warna dan mode gelap KarirKit. Cukup tulis \`<div data-chart="line">\` dengan atribut data; \`assets/js/chart.js\` merendernya (mesin grafik ada di \`assets/js/vendor/apexcharts.min.js\`, dimuat lebih dulu, tanpa CDN).

**Jenis** (\`data-chart\`): \`line\` · \`area\` · \`column\` · \`bar\` (horizontal) · \`donut\` · \`pie\` · \`radial\` · \`sparkline\`.

| Atribut | Fungsi |
| --- | --- |
| \`data-chart-series\` | JSON. Untuk line/area/column/bar: \`[{"name":"A","data":[1,2]}]\`; untuk donut/pie/radial: \`[10,20]\` |
| \`data-chart-categories\` | JSON array label sumbu X (atau label irisan) |
| \`data-chart-colors\` | JSON array nama token (\`primary\`, \`success\`, \`primary-300\` ...) atau hex |
| \`data-chart-height\` | Tinggi dalam px (default 280) |
| \`data-chart-legend\` | \`bottom\` (default) · \`top\` · \`right\` · \`none\` |
| \`data-chart-format\` | \`number\` · \`percent\` · \`rupiah\` · \`compact\` |
| \`data-chart-total-label\` | Teks di bawah total pada donut |
| \`data-chart-stacked\` | \`true\` untuk menumpuk seri column/bar/area |
| \`data-chart-options\` | JSON opsi mesin yang digabung terakhir |

\`KKChart.init(root?)\` · \`KKChart.render(el, config)\` · \`KKChart.get(el)\` · \`KKChart.destroy(el)\`. Grafik otomatis dirender untuk elemen yang ditambahkan belakangan dan berganti warna saat tema berubah.
`,
      },
    },
  },
};

const story = (key) => ({
  parameters: { docs: { description: { story: byKey[key].note } } },
  render: () => `<div class="max-w-xl p-6">${byKey[key].demo}</div>`,
});

export const Line = story("line");
export const Area = story("area");
export const Column = story("column");
export const Bar = story("bar");
export const Donut = story("donut");
export const Pie = story("pie");
export const Radial = story("radial");
export const Sparkline = story("sparkline");
export const CardArea = story("card-area");
export const CardStats = story("card-stats");
export const CardColumn = story("card-column");
export const CardDonut = story("card-donut");
export const CardBar = story("card-bar");
