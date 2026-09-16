export default {
  title: "Components/Date Picker",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Input tanggal dengan ikon kalender - mendukung ketik langsung format dd/mm/yyyy atau pilih lewat kalender. Ditampilkan dalam state tertutup di sini; interaksinya digerakkan oleh vanilla JS di `index.html`.",
      },
    },
  },
};

export const Default = {
  render: () => `
    <div class="p-6 max-w-sm">
      <label class="form-label">Tanggal Mulai Kerja</label>
      <div class="combo combo-full">
        <div class="combo-trigger">
          <span class="flex flex-1 items-center gap-2">
            <i class="kk kk-calendar-blank h-4 w-4 shrink-0 text-slate-400"></i>
            <input type="text" inputmode="numeric" class="date-text-input" placeholder="dd/mm/yyyy" />
          </span>
          <i class="kk kk-caret-down combo-chevron"></i>
        </div>
      </div>
      <p class="form-hint">Ketik langsung format dd/mm/yyyy atau pilih lewat kalender.</p>
    </div>`,
};
