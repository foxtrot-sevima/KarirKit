export default {
  title: "Components/Sidebar",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Item navigasi sidebar - default, aktif, dan dengan badge jumlah." } },
  },
};

export const NavItem = {
  name: "Nav Item",
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
