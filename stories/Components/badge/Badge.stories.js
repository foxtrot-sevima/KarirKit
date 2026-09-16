export default {
  title: "Components/Badge",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Status pill untuk lamaran, prioritas, dan tag AI. Pakai panel Controls untuk coba kombinasi lain." } },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["success", "info", "warning", "danger", "primary", "secondary", "neutral"],
    },
    label: { control: "text" },
    withDot: { control: "boolean", name: "With Dot" },
    withIcon: { control: "boolean", name: "With Icon (sparkle)" },
  },
  args: {
    variant: "success",
    label: "Diterima",
    withDot: true,
    withIcon: false,
  },
};

const DOT_COLOR = {
  success: "bg-success-600",
  info: "bg-info-600",
  warning: "bg-warning-600",
  danger: "bg-danger-600",
  primary: "bg-primary-600",
  secondary: "bg-secondary-600",
  neutral: "bg-slate-400",
};

function renderBadge(args) {
  const dot = args.withDot ? `<span class="badge-dot ${DOT_COLOR[args.variant]}"></span>` : "";
  const icon = args.withIcon ? `<i class="kk kk-sparkle h-3 w-3"></i>` : "";
  return `<span class="badge-${args.variant}">${dot}${icon}${args.label}</span>`;
}

export const Playground = {
  render: (args) => `<div class="p-6">${renderBadge(args)}</div>`,
};

export const Soft = {
  render: () => `
    <div class="flex flex-wrap gap-3 p-6">
      <span class="badge-success"><span class="badge-dot bg-success-600"></span>Diterima</span>
      <span class="badge-info"><span class="badge-dot bg-info-600"></span>Ditinjau</span>
      <span class="badge-warning"><span class="badge-dot bg-warning-600"></span>Menunggu</span>
      <span class="badge-danger"><span class="badge-dot bg-danger-600"></span>Ditolak</span>
      <span class="badge-primary"><span class="badge-dot bg-primary-600"></span>Baru</span>
      <span class="badge-secondary"><span class="badge-dot bg-secondary-600"></span>Rekomendasi</span>
      <span class="badge-neutral"><span class="badge-dot bg-slate-400"></span>Draf</span>
    </div>`,
};

export const Solid = {
  render: () => `
    <div class="flex flex-wrap gap-3 p-6">
      <span class="badge bg-success-600 text-white">Success</span>
      <span class="badge bg-info-600 text-white">Info</span>
      <span class="badge bg-warning-600 text-white">Warning</span>
      <span class="badge bg-danger-600 text-white">Danger</span>
      <span class="badge bg-slate-800 text-white">Neutral</span>
    </div>`,
};

export const AITrustTags = {
  name: "AI / Trust Tags",
  render: () => `
    <div class="flex flex-wrap gap-3 p-6">
      <span class="badge-success">
        <i class="kk kk-sparkle h-3 w-3"></i>
        96% Confidence
      </span>
      <span class="badge-danger">CRITICAL</span>
      <span class="badge-warning">NEEDS ATTENTION</span>
    </div>`,
};
