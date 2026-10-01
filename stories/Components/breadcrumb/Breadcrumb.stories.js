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

// Appended variants

// ---------------------------------------------------------------------------
// Breadcrumb component - extended variants (see src/input.css "Breadcrumb extras")
// ---------------------------------------------------------------------------
const exBlock = (inner) => `<div class="p-6">${inner}</div>`;
const chev = `<span class="breadcrumb-separator"><i class="kk kk-caret-right h-3 w-3"></i></span>`;
const slash = `<span class="breadcrumb-separator text-base">/</span>`;
const home = `<a href="#" class="breadcrumb-link"><i class="kk kk-house h-4 w-4"></i>Beranda</a>`;
const crumb = (label) => `<a href="#" class="breadcrumb-link">${label}</a>`;

const trigger = (label, items) => `
  <div class="relative">
    <button type="button" class="breadcrumb-trigger" data-ui-dropdown aria-expanded="false" aria-haspopup="true">${label}<i class="kk kk-caret-down h-3 w-3"></i></button>
    <div class="dropdown-menu hidden left-0 right-auto">
      ${items.map((i) => `<a href="#" class="dropdown-item">${i}</a>`).join("")}
    </div>
  </div>`;

export const DefaultBreadcrumb = {
  name: "Default breadcrumb",
  render: () =>
    exBlock(`<nav class="breadcrumb" aria-label="Breadcrumb">
      <span class="breadcrumb-item">${home}</span>${chev}
      <span class="breadcrumb-item">${crumb("Lowongan")}</span>${chev}
      <span class="breadcrumb-item"><span class="breadcrumb-current" aria-current="page">Frontend Engineer</span></span>
    </nav>`),
};

export const SolidBackground = {
  name: "Solid background",
  render: () =>
    exBlock(`<nav class="breadcrumb breadcrumb-solid" aria-label="Breadcrumb">
      <span class="breadcrumb-item">${home}</span>${chev}
      <span class="breadcrumb-item">${crumb("Lowongan")}</span>${chev}
      <span class="breadcrumb-item"><span class="breadcrumb-current" aria-current="page">Frontend Engineer</span></span>
    </nav>`),
};

export const HeaderBreadcrumb = {
  name: "Header breadcrumb",
  render: () =>
    exBlock(`<nav class="breadcrumb" aria-label="Breadcrumb">
      <span class="breadcrumb-item">${crumb("karirkit")}</span>${slash}
      <span class="breadcrumb-item">${trigger("master", ["master", "release", "karirkit/vercel"])}</span>${slash}
      <span class="breadcrumb-item"><span class="breadcrumb-current" aria-current="page">stories</span></span>
      <span class="badge badge-primary badge-rounded ml-2">docs</span>
    </nav>`),
};

export const BreadcrumbWithDropdown = {
  name: "Breadcrumb with dropdown",
  render: () =>
    exBlock(`<nav class="breadcrumb" aria-label="Breadcrumb">
      <span class="breadcrumb-item">${trigger("Proyek Alpha", ["Proyek Alpha", "Proyek Beta", "Proyek Gamma"])}</span>${slash}
      <span class="breadcrumb-item">${trigger("Basis data utama", ["Basis data utama", "Basis data arsip"])}</span>
    </nav>`),
};

export const BreadcrumbWithButton = {
  name: "Breadcrumb with button",
  render: () =>
    exBlock(`<div class="flex flex-wrap items-center gap-3">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <span class="breadcrumb-item">${crumb("Proyek")}</span>${slash}
        <span class="breadcrumb-item">${crumb("Alpha")}</span>${slash}
      </nav>
      <div class="relative">
        <button type="button" class="btn-outline btn-sm" data-ui-dropdown aria-expanded="false" aria-haspopup="true"><i class="kk kk-database h-3.5 w-3.5"></i>Basis data utama<i class="kk kk-caret-down h-3 w-3"></i></button>
        <div class="dropdown-menu hidden left-0 right-auto">
          <a href="#" class="dropdown-item">Basis data utama</a>
          <a href="#" class="dropdown-item">Basis data arsip</a>
        </div>
      </div>
    </div>`),
};

export const BreadcrumbWithNavigation = {
  name: "Breadcrumb with navigation",
  render: () =>
    exBlock(`<div class="flex flex-wrap items-center gap-4">
      <div class="btn-group" role="group" aria-label="Navigasi halaman">
        <button type="button" class="btn-group-item w-9 px-0" aria-label="Sebelumnya"><i class="kk kk-caret-left h-4 w-4"></i></button>
        <button type="button" class="btn-group-item w-9 px-0" aria-label="Berikutnya"><i class="kk kk-caret-right h-4 w-4"></i></button>
      </div>
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <span class="breadcrumb-item">${home}</span>${chev}
        <span class="breadcrumb-item">${crumb("Lowongan")}</span>${chev}
        <span class="breadcrumb-item"><span class="breadcrumb-current" aria-current="page">Frontend Engineer</span></span>
      </nav>
    </div>`),
};
