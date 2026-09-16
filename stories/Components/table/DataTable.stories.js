export default {
  title: "Components/DataTable",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Tabel lengkap: nomor urut, checkbox bulk-select, kolom lebar-tetap untuk checkbox/nomor/aksi, kolom sekunder disembunyikan & dilipat jadi satu baris ringkas di layar kecil, cari, filter status, sort kolom, dan pagination. Markup di sini statis (satu contoh baris) untuk dokumentasi struktur — versi yang sepenuhnya interaktif (vanilla JS, tanpa dependency) ada di `index.html`, lihat `#datatable`.",
      },
    },
  },
};

export const ToolbarAndRow = {
  name: "Toolbar & Row (static)",
  render: () => `
    <div class="card overflow-hidden">
      <div class="flex flex-col gap-3 border-b border-slate-100 p-4">
        <div class="flex items-center justify-between gap-3">
          <div class="flex gap-1 overflow-x-auto scrollbar-none rounded-xl bg-slate-100 p-1">
            <button type="button" class="tab tab-active">Semua</button>
            <button type="button" class="tab">Interview</button>
            <button type="button" class="tab">Ditinjau</button>
            <button type="button" class="tab">Ditawari</button>
            <button type="button" class="tab">Ditolak</button>
          </div>
          <button class="btn-primary btn-sm hidden sm:inline-flex">
            <i class="kk kk-plus h-4 w-4"></i>
            Tambah Lamaran
          </button>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <div class="relative w-full sm:w-64">
            <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <i class="kk kk-magnifying-glass h-4 w-4"></i>
            </span>
            <input class="input h-9 pl-9" placeholder="Cari perusahaan atau posisi..." />
          </div>
          <button type="button" class="btn-outline btn-sm">
            <i class="kk kk-sort-ascending h-4 w-4"></i>
            Urutkan
          </button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="table table-fixed w-auto sm:w-full">
          <thead>
            <tr>
              <th class="table-col-check"><input type="checkbox" class="form-check" /></th>
              <th class="table-col-num hidden xl:table-cell">No</th>
              <th class="th-sortable w-28 sm:w-44 lg:w-64"><span class="inline-flex items-center gap-1">Perusahaan <i class="kk kk-caret-down h-3 w-3"></i></span></th>
              <th class="th-sortable hidden whitespace-nowrap xl:table-cell"><span class="inline-flex items-center gap-1">Posisi <i class="kk kk-caret-down h-3 w-3"></i></span></th>
              <th class="th-sortable hidden w-28 xl:table-cell"><span class="inline-flex items-center gap-1">Tanggal Lamar <i class="kk kk-caret-down h-3 w-3"></i></span></th>
              <th class="th-sortable hidden w-32 xl:table-cell"><span class="inline-flex items-center gap-1">Skor <i class="kk kk-caret-down h-3 w-3"></i></span></th>
              <th class="w-28">Status</th>
              <th class="table-col-actions">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="checkbox" class="form-check" /></td>
              <td class="table-col-num hidden xl:table-cell">1</td>
              <td>
                <div class="flex items-center gap-3"><span class="avatar h-9 w-9 bg-info-100 text-info-700">GJ</span><span class="font-medium text-slate-800">Gojek</span></div>
                <p class="mt-0.5 text-xs text-slate-400 xl:hidden">Product Designer &middot; 3 Sep 2026 &middot; Skor 92%</p>
              </td>
              <td class="hidden whitespace-nowrap xl:table-cell">Product Designer</td>
              <td class="hidden xl:table-cell">3 Sep 2026</td>
              <td class="hidden xl:table-cell"><div class="flex items-center gap-2"><div class="progress-track w-16"><div class="progress-bar w-[92%]"></div></div><span class="text-xs text-slate-500">92%</span></div></td>
              <td><span class="badge-success"><span class="badge-dot bg-success-600"></span>Interview</span></td>
              <td class="table-col-actions">
                <div class="flex items-center justify-end gap-2">
                  <div class="relative inline-block">
                    <button type="button" class="group relative flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                      <i class="kk kk-dots-three-vertical h-4 w-4"></i>
                      <span class="pointer-events-none absolute bottom-full right-0 z-30 mb-2 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">Aksi lainnya</span>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex flex-col gap-3 border-t border-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-2 text-xs text-slate-500">
          <span>Baris per halaman</span>
          <select class="input h-8 w-auto py-0 text-xs">
            <option value="5">5</option>
            <option value="10" selected>10</option>
            <option value="25">25</option>
          </select>
        </div>
        <p class="text-xs text-slate-500">Menampilkan 1-10 dari 15 lamaran</p>
        <div class="flex items-center gap-1">
          <button class="pagination-btn" disabled>&lsaquo;</button>
          <button class="pagination-btn pagination-btn-active">1</button>
          <button class="pagination-btn">2</button>
          <button class="pagination-btn">&rsaquo;</button>
        </div>
      </div>
    </div>`,
};
