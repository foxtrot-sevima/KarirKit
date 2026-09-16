export default {
  title: "Components/Modal",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Dialog di atas backdrop gelap — `.modal-backdrop` + `.modal-panel`, header/body/footer terpisah lewat `.modal-header` / `.modal-body` / `.modal-footer`. Ditampilkan dalam kondisi terbuka di sini; untuk interaksi buka/tutup sungguhan (trigger, klik backdrop, tombol batal), lihat contoh di index.html.",
      },
    },
  },
};

const SIZES = { sm: "modal-sm", md: "modal-md", lg: "modal-lg", xl: "modal-xl" };

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

export const Sizes = {
  render: () => `
    <div class="flex flex-col gap-6 p-6">
      ${Object.entries(SIZES)
        .map(
          ([size, cls]) => `
        <div class="modal-panel ${cls}">
          <div class="modal-header"><h3 class="modal-title">Modal ${size}</h3></div>
          <div class="modal-body">Contoh lebar panel untuk <code class="kbd">.modal-${size}</code>.</div>
        </div>`
        )
        .join("")}
    </div>`,
};
