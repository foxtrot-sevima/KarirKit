import { byKey } from "./examples.js";

export default {
  title: "Components/Footer",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Kaki halaman. Hanya CSS, tanpa JS. Anatomi: \`footer.footer\` + varian > \`.footer-inner\` > isi.

| Kelas | Fungsi |
| --- | --- |
| \`.footer\` | Dasar: latar permukaan |
| \`.footer-card\` | Kotak bergaris, sudut membulat, dan bayangan |
| \`.footer-inner\` | Kontainer isi (lebar maks. 80rem, jarak); \`.footer-row\` menjadikannya satu baris pada layar lebar |
| \`.footer-copy\` | Teks hak cipta |
| \`.footer-links\` > \`.footer-link\` | Daftar tautan mendatar |
| \`.footer-heading\` · \`.footer-list\` | Judul kolom dan daftar tautan bertumpuk |
| \`.footer-divider\` | Garis pemisah |
| \`.footer-social\` | Barisan ikon sosial |
| \`.footer-fixed\` | Menempel di tepi bawah layar |
| \`.footer-bar\` · \`.footer-center\` | Footer ringkas halaman aplikasi · footer tengah untuk halaman login/error |
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
export const WithLogo = story("logo");
export const SocialMediaIcons = story("social");
export const SitemapLinks = story("sitemap");
export const StickyFooter = story("sticky");
export const AppFooter = story("app");
