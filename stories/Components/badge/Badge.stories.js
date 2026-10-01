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

// Appended variants

// ---------------------------------------------------------------------------
// Badge component - extended variants (see src/input.css "Badges")
// ---------------------------------------------------------------------------
import { avatarImg } from "../../_helpers/placeholders.js";

const exBlock = (inner) => `<div class="p-6">${inner}</div>`;
const BADGE_COLORS = [
  ["primary", "Primary", "bg-primary-600"],
  ["secondary", "Secondary", "bg-secondary-600"],
  ["neutral", "Neutral", "bg-neutral-500"],
  ["danger", "Danger", "bg-danger-600"],
  ["success", "Success", "bg-success-600"],
  ["warning", "Warning", "bg-warning-500"],
];
const badgeRow = (fn) => exBlock(`<div class="flex flex-wrap items-center gap-3">${BADGE_COLORS.map(fn).join("")}</div>`);
const bClose = `<button type="button" class="badge-close" data-ui-dismiss=".badge" aria-label="Hapus"><i class="kk kk-x h-3 w-3"></i></button>`;

export const DefaultBadges = { name: "Default badges", render: () => badgeRow(([c, l]) => `<span class="badge badge-${c} badge-rounded">${l}</span>`) };
export const BorderedBadges = { name: "Bordered badges", render: () => badgeRow(([c, l]) => `<span class="badge badge-${c} badge-rounded badge-bordered">${l}</span>`) };
export const LargeBadges = { name: "Large badges", render: () => badgeRow(([c, l]) => `<span class="badge badge-${c} badge-rounded badge-lg">${l}</span>`) };
export const LargeBorderedBadges = { name: "Large bordered badges", render: () => badgeRow(([c, l]) => `<span class="badge badge-${c} badge-rounded badge-lg badge-bordered">${l}</span>`) };
export const PillBadges = { name: "Pill badges", render: () => badgeRow(([c, l]) => `<span class="badge badge-${c}">${l}</span>`) };
export const PillBorderedBadges = { name: "Pill bordered badges", render: () => badgeRow(([c, l]) => `<span class="badge badge-${c} badge-bordered">${l}</span>`) };
export const BadgesAsLinks = { name: "Badges as links", render: () => badgeRow(([c, l]) => `<a href="#" class="badge badge-${c} badge-rounded badge-link">${l}</a>`) };
export const BadgesWithIcon = { name: "Badges with icon", render: () => badgeRow(([c, l]) => `<span class="badge badge-${c} badge-rounded"><i class="kk kk-clock h-3 w-3"></i>${l}</span>`) };
export const LargeBadgesWithIcon = { name: "Large badges with icon", render: () => badgeRow(([c, l]) => `<span class="badge badge-${c} badge-rounded badge-lg"><i class="kk kk-clock h-3.5 w-3.5"></i>${l}</span>`) };
export const BadgesWithOnlyIcon = { name: "Badges with only icon", render: () => badgeRow(([c, l]) => `<span class="badge badge-${c} badge-icon" title="${l}"><i class="kk kk-check h-3 w-3"></i><span class="sr-only">${l}</span></span>`) };
export const LargeBadgesWithOnlyIcon = { name: "Large badges with only icon", render: () => badgeRow(([c, l]) => `<span class="badge badge-${c} badge-icon badge-lg" title="${l}"><i class="kk kk-check h-3.5 w-3.5"></i><span class="sr-only">${l}</span></span>`) };
export const BadgesWithDot = { name: "Badges with dot", render: () => badgeRow(([c, l, dot]) => `<span class="badge badge-${c}"><span class="badge-dot ${dot}"></span>${l}</span>`) };
export const BadgesWithSvgLoader = { name: "Badges with SVG loader", render: () => badgeRow(([c, l]) => `<span class="badge badge-${c}"><span class="badge-spinner" aria-hidden="true"></span>${l}</span>`) };
export const DismissibleBadges = { name: "Dismissible badges (chips)", render: () => badgeRow(([c, l]) => `<span class="badge badge-${c} badge-chip">${l}${bClose}</span>`) };
export const ChipsWithAvatar = {
  name: "Chips with avatar",
  render: () => badgeRow(([c, l], i) => `<span class="badge badge-${c} badge-chip">${avatarImg(i, "avatar", l)}${l}${bClose}</span>`),
};

export const NotificationBadge = {
  name: "Notification badge",
  render: () =>
    exBlock(`<div class="flex items-center gap-8">
      <button type="button" class="btn-outline btn-md relative" aria-label="Notifikasi, 8 baru">
        <i class="kk kk-bell h-4 w-4"></i>Notifikasi
        <span class="badge-counter">8</span>
      </button>
      <button type="button" class="btn-outline btn-md relative" aria-label="Pesan, 99+ baru">
        <i class="kk kk-envelope h-4 w-4"></i>Pesan
        <span class="badge-counter">99+</span>
      </button>
    </div>`),
};

export const ButtonWithBadge = {
  name: "Button with badge",
  render: () =>
    exBlock(`<div class="flex flex-wrap items-center gap-3">
      <button type="button" class="btn-primary btn-md">Pesan<span class="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-[11px] font-bold text-primary-700">4</span></button>
      <button type="button" class="btn-secondary btn-md">Lamaran<span class="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-600 px-1.5 text-[11px] font-bold text-white">12</span></button>
      <button type="button" class="btn-outline btn-md">Undangan<span class="badge badge-danger">Baru</span></button>
    </div>`),
};
