export default {
  title: "Components/Tables",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Tabel data dengan avatar, badge status, dan hover baris. DataTable lengkap (cari, filter, sort, bulk-select, pagination) memakai vanilla JS yang sama dengan `index.html` — lihat `#datatable` di sana untuk versi yang sepenuhnya interaktif.",
      },
    },
  },
};

export const Basic = {
  render: () => `
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Perusahaan</th>
              <th>Posisi</th>
              <th>Skor Kecocokan</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><div class="flex items-center gap-3"><span class="avatar h-9 w-9 bg-info-100 text-info-700">GJ</span><span class="font-medium text-slate-800">Gojek</span></div></td>
              <td>Product Designer</td>
              <td>92%</td>
              <td><span class="badge-success"><span class="badge-dot bg-success-600"></span>Interview</span></td>
              <td class="text-right text-slate-300"><i class="kk kk-caret-right ml-auto h-4 w-4"></i></td>
            </tr>
            <tr>
              <td><div class="flex items-center gap-3"><span class="avatar h-9 w-9 bg-warning-100 text-warning-700">TP</span><span class="font-medium text-slate-800">Tokopedia</span></div></td>
              <td>UI/UX Researcher</td>
              <td>78%</td>
              <td><span class="badge-info"><span class="badge-dot bg-info-600"></span>Ditinjau</span></td>
              <td class="text-right text-slate-300"><i class="kk kk-caret-right ml-auto h-4 w-4"></i></td>
            </tr>
            <tr>
              <td><div class="flex items-center gap-3"><span class="avatar h-9 w-9 bg-danger-100 text-danger-700">TV</span><span class="font-medium text-slate-800">Traveloka</span></div></td>
              <td>Frontend Engineer</td>
              <td>54%</td>
              <td><span class="badge-danger"><span class="badge-dot bg-danger-600"></span>Ditolak</span></td>
              <td class="text-right text-slate-300"><i class="kk kk-caret-right ml-auto h-4 w-4"></i></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>`,
};

export const DataTableToolbarAndRow = {
  name: "DataTable — Toolbar & Row (static)",
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
        <table class="table">
          <thead>
            <tr>
              <th class="w-10"><input type="checkbox" class="form-check" /></th>
              <th class="th-sortable"><span class="inline-flex items-center gap-1">Perusahaan <i class="kk kk-caret-down h-3 w-3"></i></span></th>
              <th class="th-sortable"><span class="inline-flex items-center gap-1">Posisi <i class="kk kk-caret-down h-3 w-3"></i></span></th>
              <th class="th-sortable"><span class="inline-flex items-center gap-1">Skor <i class="kk kk-caret-down h-3 w-3"></i></span></th>
              <th>Status</th>
              <th class="text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="checkbox" class="form-check" /></td>
              <td><div class="flex items-center gap-3"><span class="avatar h-9 w-9 bg-info-100 text-info-700">GJ</span><span class="font-medium text-slate-800">Gojek</span></div></td>
              <td>Product Designer</td>
              <td><div class="flex items-center gap-2"><div class="progress-track w-16"><div class="progress-bar w-[92%]"></div></div><span class="text-xs text-slate-500">92%</span></div></td>
              <td><span class="badge-success"><span class="badge-dot bg-success-600"></span>Interview</span></td>
              <td class="text-right">
                <div class="flex items-center justify-end gap-2">
                  <button type="button" class="btn-outline btn-sm">Lihat</button>
                  <button type="button" class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                    <i class="kk kk-dots-three-vertical h-4 w-4"></i>
                  </button>
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
