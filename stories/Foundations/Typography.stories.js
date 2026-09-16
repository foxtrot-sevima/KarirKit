export default {
  title: "Foundations/Typography",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Instrument Sans — satu keluarga font untuk judul, branding, dan teks antarmuka.",
      },
    },
  },
};

export const Weights = {
  render: () => `
    <div class="card p-6 sm:p-8">
      <div class="mb-8">
        <p class="nav-eyebrow mb-2 px-0">Instrument Sans</p>
        <p class="font-display text-4xl font-bold text-slate-900">Aa Bb Cc 123</p>
      </div>
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div class="rounded-xl border border-slate-100 p-3">
          <p class="font-normal text-lg text-slate-800">Aa Bb Cc</p>
          <p class="mt-1 text-xs text-slate-400">Regular &middot; 400</p>
        </div>
        <div class="rounded-xl border border-slate-100 p-3">
          <p class="font-medium text-lg text-slate-800">Aa Bb Cc</p>
          <p class="mt-1 text-xs text-slate-400">Medium &middot; 500</p>
        </div>
        <div class="rounded-xl border border-slate-100 p-3">
          <p class="font-semibold text-lg text-slate-800">Aa Bb Cc</p>
          <p class="mt-1 text-xs text-slate-400">SemiBold &middot; 600</p>
        </div>
        <div class="rounded-xl border border-slate-100 p-3">
          <p class="font-bold text-lg text-slate-800">Aa Bb Cc</p>
          <p class="mt-1 text-xs text-slate-400">Bold &middot; 700</p>
        </div>
      </div>
    </div>`,
};

export const Scale = {
  render: () => `
    <div class="card p-6 sm:p-8 divide-y divide-slate-100">
      <div class="flex flex-col gap-2 py-4 sm:flex-row sm:items-baseline sm:justify-between">
        <p class="font-display text-3xl font-bold text-slate-900">Selamat pagi, Ahmad</p>
        <p class="kbd">font-display &middot; text-3xl &middot; font-bold</p>
      </div>
      <div class="flex flex-col gap-2 py-4 sm:flex-row sm:items-baseline sm:justify-between">
        <p class="font-display text-2xl font-bold text-slate-900">Ringkasan Performa Lamaran</p>
        <p class="kbd">font-display &middot; text-2xl &middot; font-bold</p>
      </div>
      <div class="flex flex-col gap-2 py-4 sm:flex-row sm:items-baseline sm:justify-between">
        <p class="text-lg font-semibold text-slate-800">Perlu Aksi Hari Ini</p>
        <p class="kbd">text-lg &middot; font-semibold</p>
      </div>
      <div class="flex flex-col gap-2 py-4 sm:flex-row sm:items-baseline sm:justify-between">
        <p class="text-sm text-slate-600">Teks antarmuka standar untuk deskripsi kartu dan isi tabel.</p>
        <p class="kbd">text-sm &middot; text-slate-600</p>
      </div>
      <div class="flex flex-col gap-2 py-4 sm:flex-row sm:items-baseline sm:justify-between">
        <p class="text-xs text-slate-500">Teks kecil untuk keterangan, metadata, dan timestamp.</p>
        <p class="kbd">text-xs &middot; text-slate-500</p>
      </div>
      <div class="flex flex-col gap-2 py-4 sm:flex-row sm:items-baseline sm:justify-between">
        <p class="nav-eyebrow px-0">Label Grup Navigasi</p>
        <p class="kbd">text-[11px] &middot; uppercase &middot; tracking-wider</p>
      </div>
    </div>`,
};
