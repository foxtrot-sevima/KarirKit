import { byKey } from "./examples.js";

export default {
  title: "Components/Dropdown",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Menu yang terbuka dari sebuah tombol. Anatomi: \`.dropdown\` > tombol \`[data-ui-dropdown]\` + \`.dropdown-menu\` (tersembunyi lewat \`hidden\`) > \`.dropdown-item\`. Perilaku buka/tutup (klik, Escape, klik di luar) ada di \`assets/js/ui.js\`; CSS saja cukup untuk tampilan.

**Bagian menu:** \`.dropdown-header\` (+ \`-title\`, \`-desc\`) · \`.dropdown-divider\` · \`.dropdown-item-danger\` · \`.dropdown-item-check\` (+ \`.dropdown-item-title\`, \`.dropdown-item-desc\`) · \`.dropdown-search\` · \`.dropdown-scroll\` · \`.dropdown-footer\`. Lebar menu lewat utilitas \`w-*\`.

| Atribut pada tombol | Fungsi |
| --- | --- |
| \`data-ui-dropdown-placement\` | \`top\` · \`right\` · \`bottom\` · \`left\`, boleh diakhiri \`-start\` / \`-end\` (default \`bottom-end\`) |
| \`data-ui-dropdown-offset-distance\` · \`-skidding\` | Jarak dari tombol · geser menyamping (px) |
| \`data-ui-dropdown-trigger="hover"\` | Buka saat kursor di atas tombol |
| \`data-ui-dropdown-delay\` | Jeda penutupan untuk mode hover (ms, default 300) |

Tombol di dalam \`.dropdown-menu\` membuka submenu tanpa menutup menu induk.
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
export const Hover = story("hover");
export const Delay = story("delay");
export const Divider = story("divider");
export const Header = story("header");
export const MultiLevel = story("multilevel");
export const Checkbox = story("checkbox");
export const CheckboxHelper = story("checkbox-helper");
export const Radio = story("radio");
export const RadioHelper = story("radio-helper");
export const Toggle = story("toggle");
export const Scrolling = story("scroll");
export const ScrollableCheckboxes = story("scroll-check");
export const Search = story("search");
export const MenuIcon = story("icon");
export const NotificationBell = story("notification");
export const UserAvatar = story("avatar");
export const AvatarWithName = story("avatar-name");
export const Navbar = story("navbar");
export const Datepicker = story("datepicker");
export const Sizes = story("sizes");
export const Placement = story("placement");
export const Offset = story("offset");
