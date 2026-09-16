export default {
  title: "Components/Forms",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Input, select, textarea, checkbox, radio, toggle, dan search. Combobox & date picker ditampilkan dalam state tertutup — interaksinya digerakkan oleh vanilla JS di `index.html`, lihat catatan di halaman Introduction.",
      },
    },
  },
};

export const TextAndSelect = {
  name: "Text, Search & Combobox",
  render: () => `
    <div class="card grid gap-8 p-6 sm:p-8 md:grid-cols-2 max-w-3xl">
      <div class="space-y-5">
        <div>
          <label class="form-label">Nama Lengkap</label>
          <input class="input" placeholder="Ahmad Dimas" />
        </div>
        <div>
          <label class="form-label">Posisi yang dicari</label>
          <div class="relative">
            <span class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <i class="kk kk-magnifying-glass h-4 w-4"></i>
            </span>
            <input class="input pl-10" placeholder="Product Designer" />
          </div>
          <p class="form-hint">Contoh: Product Designer, Data Analyst</p>
        </div>
        <div>
          <label class="form-label">Level Pengalaman</label>
          <div class="combo combo-full">
            <button type="button" class="combo-trigger">
              <span>Entry Level</span>
              <i class="kk kk-caret-down combo-chevron"></i>
            </button>
          </div>
        </div>
        <div>
          <label class="form-label">Ekspektasi Gaji</label>
          <div class="relative">
            <span class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">Rp.</span>
            <input type="text" inputmode="numeric" class="input pl-11" placeholder="0" />
          </div>
          <p class="form-hint">Titik pemisah ribuan ditambahkan otomatis saat mengetik.</p>
        </div>
      </div>
      <div class="space-y-5">
        <div>
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
        </div>
        <div>
          <label class="form-label">Ringkasan Profil</label>
          <textarea class="input textarea-autogrow h-auto py-2.5" rows="3" placeholder="Ceritakan pengalamanmu secara singkat..."></textarea>
        </div>
        <div>
          <label class="form-label">Pilih Posisi (search dropdown)</label>
          <div class="combo combo-full">
            <button type="button" class="combo-trigger">
              <span class="combo-placeholder">Pilih posisi...</span>
              <i class="kk kk-caret-down combo-chevron"></i>
            </button>
          </div>
        </div>
      </div>
    </div>`,
};

export const ChoiceControls = {
  name: "Checkbox, Radio & Toggle",
  render: () => `
    <div class="card grid gap-8 p-6 sm:p-8 md:grid-cols-2 max-w-3xl">
      <div class="space-y-6">
        <div>
          <p class="form-label mb-2.5">Checkbox</p>
          <div class="space-y-2.5">
            <label class="flex items-center gap-2.5 text-sm text-slate-600"><input type="checkbox" checked class="form-check" /> Notifikasi lamaran baru via email</label>
            <label class="flex items-center gap-2.5 text-sm text-slate-600"><input type="checkbox" class="form-check" /> Newsletter tips karier mingguan</label>
          </div>
        </div>
        <div>
          <p class="form-label mb-2.5">Radio</p>
          <div class="space-y-2.5">
            <label class="flex items-center gap-2.5 text-sm text-slate-600"><input type="radio" name="wfh" checked class="form-radio" /> Remote</label>
            <label class="flex items-center gap-2.5 text-sm text-slate-600"><input type="radio" name="wfh" class="form-radio" /> Hybrid</label>
          </div>
        </div>
        <div>
          <p class="form-label mb-2.5">Toggle</p>
          <label class="inline-flex cursor-pointer items-center gap-3">
            <span class="relative">
              <input type="checkbox" checked class="peer sr-only" />
              <span class="block h-6 w-11 rounded-full bg-slate-200 transition-colors peer-checked:bg-primary-600"></span>
              <span class="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-5"></span>
            </span>
            <span class="text-sm text-slate-600">Mode pencarian aktif</span>
          </label>
        </div>
      </div>
      <div class="space-y-6">
        <div>
          <p class="form-label mb-2.5">Search dengan shortcut</p>
          <div class="relative">
            <span class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <i class="kk kk-magnifying-glass h-4 w-4"></i>
            </span>
            <input class="input pl-10 pr-14" placeholder="Cari sesuatu..." />
            <span class="kbd absolute right-2.5 top-1/2 -translate-y-1/2">&#8984;K</span>
          </div>
        </div>
        <div>
          <p class="form-label mb-2.5">Pilih Skill (checkbox &amp; tag dropdown)</p>
          <div class="combo combo-full">
            <button type="button" class="combo-trigger">
              <span class="combo-tags">
                <span class="combo-placeholder">Pilih skill...</span>
              </span>
              <i class="kk kk-caret-down combo-chevron"></i>
            </button>
          </div>
        </div>
      </div>
    </div>`,
};
