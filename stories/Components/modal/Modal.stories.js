import { byKey } from "./examples.js";

export default {
  title: "Components/Modal",
  tags: ["autodocs"],
  parameters: {
    // Modals are fixed to the viewport, so docs render each story in its own iframe.
    docs: {
      story: { inline: false, height: "480px", iframeHeight: 480 },
      description: {
        component: `
Dialog di atas backdrop gelap — \`.modal-backdrop\` > \`.modal-panel\` > \`.modal-header\` + \`.modal-body\` + \`.modal-footer\`. Semua contoh di bawah interaktif: klik tombol untuk membukanya.

**Ukuran** di panel: \`.modal-sm\`, \`.modal-md\` (default), \`.modal-lg\`, \`.modal-xl\`, \`.modal-2xl\`.
**Posisi** di backdrop: \`.modal-top-left\` · \`.modal-top-center\` · \`.modal-top-right\` · \`.modal-center-left\` · \`.modal-center\` · \`.modal-center-right\` · \`.modal-bottom-left\` · \`.modal-bottom-center\` · \`.modal-bottom-right\`.
**Footer**: rata kanan (default), \`.modal-footer-start\`, \`.modal-footer-center\`, \`.modal-footer-between\`. **Pop-up**: \`.modal-popup\` + \`.modal-icon\` (\`-primary|success|danger|warning|info\`). Gunakan \`.modal-contained\` di dalam parent \`relative\` untuk pratinjau statis.

Isi yang panjang menggulir di dalam \`.modal-body\` (header dan footer tetap terlihat) dan panel tidak pernah lebih tinggi dari layar.

### JavaScript — \`assets/js/modal.js\`

| Atribut | Fungsi |
| --- | --- |
| \`data-modal-toggle="id"\` | Pemicu: buka jika tertutup, tutup jika terbuka |
| \`data-modal-show="id"\` | Pemicu: buka (alias: \`data-modal-target\`, \`data-modal-trigger\`) |
| \`data-modal-hide="id"\` | Menutup modal tertentu; nilai kosong (atau \`data-modal-close\`) menutup modal terdekat |
| \`data-modal-placement="top-left"\` | Pada pemicu: posisi modal untuk pembukaan itu |
| \`data-modal-backdrop="static"\` | Pada modal: klik di luar tidak menutup modal |
| \`data-modal-keyboard="false"\` | Pada modal: Escape tidak menutup modal |

\`KKModal.open(el, { trigger, placement })\` · \`.close(el)\` · \`.toggle(el)\` · \`.closeAll()\` · \`.isOpen(el)\`. Event \`modal:show\` dan \`modal:hide\` muncul dari elemen modal (bubbling).

Otomatis: \`role="dialog"\`, \`aria-modal\`, \`aria-labelledby\` dari \`.modal-title\`, kunci scroll halaman, Escape menutup modal paling atas, fokus pindah ke dalam modal dan tertahan saat Tab, lalu kembali ke pemicu saat ditutup. Tata letak yang punya lapisan sendiri di atas \`--z-overlay\` (mis. sidebar \`z-50\`) perlu menaikkan backdrop, contoh \`class="modal-backdrop z-[60]"\`.
`,
      },
    },
  },
};

const stage = (ex) => `<div class="flex flex-wrap items-center gap-3 p-6">${ex.demo}</div>${ex.modals}`;
const story = (key, extra = {}) => ({
  parameters: { docs: { description: { story: byKey[key].note } } },
  render: () => stage(byKey[key]),
  ...extra,
});

const SIZES = { sm: "modal-sm", md: "modal-md", lg: "modal-lg", xl: "modal-xl", "2xl": "modal-2xl" };

function renderModal(args) {
  const footer = args.showFooter
    ? `
      <div class="modal-footer">
        <button type="button" class="btn-outline btn-md">${args.cancelLabel}</button>
        <button type="button" class="${args.confirmDanger ? "btn-danger" : "btn-primary"} btn-md">${args.confirmLabel}</button>
      </div>`
    : "";
  return `
    <div class="modal-backdrop is-open">
      <div class="modal-panel ${SIZES[args.size]}">
        <div class="modal-header">
          <div>
            <h3 class="modal-title">${args.title}</h3>
            ${args.description ? `<p class="modal-description">${args.description}</p>` : ""}
          </div>
          <button type="button" class="modal-close" aria-label="Tutup">
            <i class="kk kk-x h-4 w-4"></i>
          </button>
        </div>
        <div class="modal-body">${args.body}</div>
        ${footer}
      </div>
    </div>`;
}

export const Playground = {
  parameters: { docs: { description: { story: "Ubah ukuran, judul, isi, dan footer lewat Controls. Pratinjau ini selalu terbuka." } } },
  argTypes: {
    size: { control: "select", options: Object.keys(SIZES) },
    title: { control: "text" },
    description: { control: "text" },
    body: { control: "text" },
    showFooter: { control: "boolean" },
    cancelLabel: { control: "text" },
    confirmLabel: { control: "text" },
    confirmDanger: { control: "boolean" },
  },
  args: {
    size: "md",
    title: "Hapus Lowongan?",
    description: "Tindakan ini tidak bisa dibatalkan.",
    body: 'Lowongan "Backend Engineer Intern" beserta seluruh data pelamarnya akan dihapus secara permanen.',
    showFooter: true,
    cancelLabel: "Batal",
    confirmLabel: "Hapus",
    confirmDanger: true,
  },
  render: renderModal,
};

export const Default = { name: "Default modal", ...story("default") };
export const Popup = { name: "Pop-up modal", ...story("popup") };
export const FormElement = { name: "Form element", ...story("form") };
export const Sizes = { name: "Modal sizes", ...story("sizes") };
export const Placement = { name: "Modal placement", ...story("placement") };
export const Static = { name: "Static modal", ...story("static") };
export const Scrolling = { name: "Scrolling modal", ...story("scrolling") };
export const Timeline = { name: "Timeline modal", ...story("timeline") };
export const ChoiceList = { name: "Choice list modal", ...story("choice") };
export const Create = { name: "Create modal", ...story("create") };
