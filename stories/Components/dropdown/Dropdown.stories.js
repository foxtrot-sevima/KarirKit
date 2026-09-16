export default {
  title: "Components/Dropdown",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Menu yang otomatis membalik posisi (bawah/atas, kiri/kanan) sesuai ruang yang tersedia. Ditampilkan dalam state tertutup di sini — buka `index.html` untuk mencoba perilaku auto-placement-nya secara langsung.",
      },
    },
  },
};

function corner(label) {
  return `
    <div class="combo">
      <button type="button" class="btn-outline btn-sm">
        ${label}
        <i class="kk kk-caret-down combo-chevron"></i>
      </button>
    </div>`;
}

export const AutoPlacement = {
  name: "Auto-placement (down / up / left / right)",
  render: () => `
    <div class="p-6">
      <div class="relative h-64 rounded-xl border border-dashed border-slate-200 bg-slate-50/60">
        <div class="absolute left-3 top-3">${corner("Kiri Atas")}</div>
        <div class="absolute right-3 top-3">${corner("Kanan Atas")}</div>
        <div class="absolute bottom-3 left-3">${corner("Kiri Bawah")}</div>
        <div class="absolute bottom-3 right-3">${corner("Kanan Bawah")}</div>
      </div>
    </div>`,
};

export const MenuContent = {
  name: "Menu Content",
  render: () => `
    <div class="p-6">
      <div class="dropdown-menu static inline-block w-56">
        <button type="button" class="dropdown-item">Lihat Detail</button>
        <button type="button" class="dropdown-item">Edit</button>
        <button type="button" class="dropdown-item">Duplikat</button>
        <button type="button" class="dropdown-item dropdown-item-danger">Hapus</button>
      </div>
    </div>`,
};
