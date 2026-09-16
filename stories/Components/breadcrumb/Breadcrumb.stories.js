export default {
  title: "Components/Breadcrumb",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'Jejak navigasi hierarki halaman. `.breadcrumb` sebagai wadah, `.breadcrumb-link` untuk tautan yang bisa diklik, `.breadcrumb-current` untuk halaman aktif (tidak bisa diklik), dipisahkan `.breadcrumb-separator` (ikon `kk-caret-right`).',
      },
    },
  },
};

function homeIcon() {
  return `<i class="kk kk-house h-4 w-4"></i>`;
}

function renderBreadcrumb(args) {
  const items = args.items
    .split(">")
    .map((s) => s.trim())
    .filter(Boolean);

  return `
    <nav class="breadcrumb p-6" aria-label="Breadcrumb">
      ${items
        .map((label, i) => {
          const isLast = i === items.length - 1;
          const sep =
            i > 0
              ? `<span class="breadcrumb-separator"><i class="kk kk-caret-right h-3 w-3"></i></span>`
              : "";
          const icon = args.withIcon && i === 0 ? homeIcon() : "";
          const item = isLast
            ? `<span class="breadcrumb-current" aria-current="page">${icon}${label}</span>`
            : `<a href="#" class="breadcrumb-link">${icon}${label}</a>`;
          return `${sep}${item}`;
        })
        .join("")}
    </nav>`;
}

export const Playground = {
  argTypes: {
    items: { control: "text", description: 'Nama halaman dipisahkan tanda ">"' },
    withIcon: { control: "boolean", description: "Tampilkan ikon rumah di halaman pertama" },
  },
  args: {
    items: "Beranda > Lowongan > Backend Engineer Intern",
    withIcon: true,
  },
  render: renderBreadcrumb,
};

export const Simple = {
  render: () => `
    <nav class="breadcrumb p-6" aria-label="Breadcrumb">
      <a href="#" class="breadcrumb-link">Dashboard</a>
      <span class="breadcrumb-separator"><i class="kk kk-caret-right h-3 w-3"></i></span>
      <span class="breadcrumb-current" aria-current="page">Pengaturan</span>
    </nav>`,
};
