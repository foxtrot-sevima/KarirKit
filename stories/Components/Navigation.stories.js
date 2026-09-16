export default {
  title: "Components/Navigation",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Item sidebar, label grup, dan tab bersegmen." } },
  },
};

export const SidebarNavItem = {
  name: "Sidebar Nav Item",
  render: () => `
    <div class="card p-4 max-w-xs">
      <p class="nav-eyebrow mb-2">Sidebar nav item</p>
      <div class="space-y-1">
        <a class="nav-item nav-item-active">
          <i class="kk kk-house h-5 w-5"></i>
          Template
        </a>
        <a class="nav-item">
          <i class="kk kk-briefcase h-5 w-5"></i>
          Lowongan Cocok
        </a>
        <a class="nav-item">
          <i class="kk kk-file-text h-5 w-5"></i>
          Lamaran Saya
          <span class="badge-neutral ml-auto">12</span>
        </a>
      </div>
    </div>`,
};

export const SegmentedTabsAndEyebrow = {
  name: "Segmented Tabs & Eyebrow",
  render: () => `
    <div class="card flex flex-col gap-4 p-4 max-w-xs">
      <div>
        <p class="nav-eyebrow mb-2">Segmented tabs</p>
        <div class="inline-flex w-fit gap-1 rounded-xl bg-slate-100 p-1">
          <span class="tab tab-active">Semua</span>
          <span class="tab">Aktif</span>
          <span class="tab">Selesai</span>
        </div>
      </div>
      <div>
        <p class="nav-eyebrow mb-2">Eyebrow label</p>
        <p class="nav-eyebrow px-0">Alat Karier</p>
      </div>
    </div>`,
};
