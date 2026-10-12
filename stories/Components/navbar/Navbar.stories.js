import { byKey } from "./examples.js";

export default {
  title: "Components/Navbar",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Bilah navigasi atas. Anatomi: \`nav.navbar\` > \`.navbar-inner\` > \`.navbar-brand\` + \`.navbar-toggle\` (hanya di ponsel) + \`.navbar-menu\` > \`ul.navbar-nav\` > \`li\` > \`.navbar-link\`. Tautan aktif memakai \`aria-current="page"\`. Menu ponsel dibuka lewat \`data-ui-collapse\` (\`assets/js/ui.js\`); dropdown lewat \`data-ui-dropdown\`.

| Kelas | Fungsi |
| --- | --- |
| \`.navbar\` | Bilah dengan garis bawah dan latar permukaan |
| \`.navbar-sticky\` · \`.navbar-fixed\` | Menempel saat digulir · terkunci di tepi atas layar |
| \`.navbar-solid\` · \`.navbar-plain\` | Latar berwarna · tanpa garis dan latar (halaman login/error) |
| \`.navbar-app\` | Bilah atas aplikasi setinggi 4rem (di samping sidebar) |
| \`.navbar-inner\` | Kontainer isi (lebar maks. 80rem, jarak, pembungkusan) |
| \`.navbar-brand\` | Logo dan nama merek |
| \`.navbar-toggle\` · \`.navbar-toggle-always\` | Tombol menu ponsel · tombol yang selalu tampil |
| \`.navbar-menu\` · \`.navbar-nav\` · \`.navbar-link\` | Pembungkus menu, daftar tautan, tautan |
| \`.navbar-actions\` | Kelompok aksi (tombol, avatar) di kanan |
`,
      },
    },
  },
};

const story = (key) => ({
  parameters: { docs: { description: { story: byKey[key].note } } },
  render: () => `<div class="p-6">${byKey[key].demo}</div>`,
});

export const Default = story("default");
export const WithDropdown = story("dropdown");
export const MultiLevelDropdown = story("multilevel");
export const WithCtaButton = story("cta");
export const WithSubmenu = story("submenu");
export const WithSearch = story("search");
export const LanguageDropdown = story("language");
export const UserMenu = story("user");
export const MegaMenu = story("mega");
export const SolidBackground = story("solid");
export const HamburgerMenu = story("hamburger");
