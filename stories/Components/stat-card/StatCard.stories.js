export default {
  title: "Components/Stat Card",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Kartu kecil berikon untuk angka ringkasan biasa (total, sudah mengisi, belum mengisi). Pengganti baris kartu KPI besar `card p-5`: tingginya sekitar 60px dan tidak memakan banyak tempat. `.stat-grid` sebagai wadah dengan jumlah kolom dari `--stat-cols` (1 kolom di bawah 360px, 2 di ponsel dengan kartu ganjil terakhir melebar, 3 mulai `sm`, `--stat-lg` mulai `lg`, dan `--stat-cols` mulai `xl`), `.stat-card` untuk tiap kartu, `.stat-icon` untuk petak ikon (ganti warnanya dengan `bg-success-50 text-success-600`, dst.), `.stat-value` untuk angka, `.stat-label` untuk keterangan, dan `.stat-note` untuk catatan seperti persentase. Untuk kartu dashboard yang butuh tren atau grafik tetap pakai `.card`.",
      },
    },
  },
};

const icon = (name, tone = "") => `<span class="stat-icon ${tone}"><i class="kk kk-${name} h-[18px] w-[18px]"></i></span>`;
const card = (iconHtml, value, label) => `
  <div class="stat-card">
    ${iconHtml}
    <div class="min-w-0"><p class="stat-value">${value}</p><p class="stat-label">${label}</p></div>
  </div>`;

export const Default = {
  render: () => `
    <div class="p-6">
      <div class="stat-grid" style="--stat-cols: 4">
        ${card(icon("graduation-cap"), "10", "Total Lulusan")}
        ${card(icon("check-circle", "bg-success-50 text-success-600"), "4", "Sudah Mengisi")}
        ${card(icon("hourglass", "bg-warning-50 text-warning-600"), "6", "Belum Mengisi")}
        ${card(icon("percent", "bg-info-50 text-info-600"), "40%", "Tingkat Partisipasi")}
      </div>
    </div>`,
};

export const FiveCards = {
  name: "Five cards with notes",
  render: () => `
    <div class="p-6">
      <div class="stat-grid" style="--stat-cols: 5; --stat-lg: 3">
        ${card(icon("users"), "1.248", "Total Terdata")}
        ${card(icon("briefcase", "bg-success-50 text-success-600"), "612", 'Bekerja <span class="stat-note">(49%)</span>')}
        ${card(icon("storefront", "bg-secondary-50 text-secondary-600"), "134", "Wiraswasta")}
        ${card(icon("graduation-cap", "bg-info-50 text-info-600"), "98", "Melanjutkan Studi")}
        ${card(icon("magnifying-glass", "bg-warning-50 text-warning-600"), "227", "Mencari Kerja")}
      </div>
    </div>`,
};
