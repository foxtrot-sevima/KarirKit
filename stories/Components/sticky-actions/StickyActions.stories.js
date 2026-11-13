export default {
  title: "Components/Sticky actions",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "`.sticky-actions`: bilah aksi lengket di dasar kartu formulir bertahap (Kembali / Lanjut tetap terjangkau pada langkah panjang). Margin negatif menyamai padding kartu (`p-6`, `sm:p-8`). `.form-question` adalah teks pertanyaan yang lebih tegas daripada `.form-label`.",
      },
    },
  },
};

export const InCard = {
  render: () => `<div class="max-w-xl p-6"><div class="card h-80 overflow-y-auto p-6 sm:p-8">
    <p class="form-question">Apa rencana utama Anda setelah lulus?</p>
    <div class="mt-3 space-y-2">${["Bekerja", "Berwirausaha", "Melanjutkan studi", "Lainnya"].map((t) => `<label class="radio-card"><input type="radio" class="form-radio" name="sa" />${t}</label>`).join("")}</div>
    <div class="h-48"></div>
    <div class="sticky-actions"><button type="button" class="btn-outline btn-md">Kembali</button><button type="button" class="btn-primary btn-md">Lanjut</button></div>
  </div></div>`,
};
