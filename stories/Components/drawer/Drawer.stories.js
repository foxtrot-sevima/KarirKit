import { byKey } from "./examples.js";

export default {
  title: "Components/Drawer",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Panel yang meluncur dari tepi layar. Anatomi: \`.drawer\` (+ \`.drawer-left|right|top|bottom\`) > \`.drawer-header\` (\`.drawer-title\` + \`.drawer-close\`) + \`.drawer-body\` + \`.drawer-footer\`. Perilaku di \`assets/js/drawer.js\`.

| Atribut | Fungsi |
| --- | --- |
| \`data-drawer-toggle="id"\` | Tombol yang membuka/menutup drawer (\`data-drawer-show\` / \`data-drawer-target\` = buka saja) |
| \`data-drawer-hide="id"\` | Tombol penutup (kosong = drawer terdekat) |
| \`data-drawer-placement\` | \`left\` · \`right\` · \`top\` · \`bottom\` (menimpa kelas) |
| \`data-drawer-backdrop\` | \`false\` = tanpa latar gelap · \`static\` = klik di luar tidak menutup |
| \`data-drawer-body-scrolling="true"\` | Halaman tetap bisa digulir saat drawer terbuka |
| \`data-drawer-keyboard="false"\` | Escape tidak menutup drawer |

Drawer bawah dengan \`.drawer-edge\` menyisakan pegangan yang terlihat saat tertutup (\`.drawer-handle\` + \`.drawer-grab\`). Event \`drawer:show\` / \`drawer:hide\`. API: \`KKDrawer.open(el)\`, \`.close(el)\`, \`.toggle(el)\`, \`.closeAll()\`, \`.isOpen(el)\`.

Layer: aplikasi dengan sidebar atau topbar ber-z-50 menambahkan \`.drawer-over-shell\` pada drawer supaya drawer dan latarnya tampil di atas shell (laci z-60, latar z-59; \`drawer.js\` menambahkan \`.drawer-backdrop-over-shell\` pada latarnya). \`.drawer-contained\` (di dalam kotak ber-\`relative\`) memakai z-index lokal sehingga tidak menimpa header atau latar drawer lain.

Aksesibilitas: \`role="dialog"\` dan \`aria-labelledby\` dipasang otomatis; fokus berpindah ke drawer dan kembali ke pemicu saat ditutup; Tab tetap di dalam drawer selama ada latar gelap.
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
export const Placement = story("placement");
export const BottomSheetWithEdge = story("swipe");
export const BodyScrolling = story("scrolling");
export const BackdropOptions = story("backdrop");
export const Navigation = story("navigation");
export const ContactForm = story("contact");
export const FormElements = story("form");
