export default {
  title: "Components/Table",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Tabel data dasar dengan avatar, badge status, dan hover baris. Untuk tabel lengkap dengan cari, filter, sort, bulk-select, dan pagination, lihat `Components/DataTable`.",
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
