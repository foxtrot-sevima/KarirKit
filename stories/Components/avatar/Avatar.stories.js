export default {
  title: "Components/Avatar",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Inisial sebagai fallback, status dot, dan grup bertumpuk." } },
  },
  argTypes: {
    initials: { control: "text" },
    size: {
      control: "select",
      options: ["h-8 w-8 text-xs", "h-10 w-10 text-sm", "h-11 w-11 text-base", "h-12 w-12 text-base", "h-14 w-14 text-lg"],
      description: "Class ukuran + font-size yang serasi",
    },
    color: {
      control: "select",
      options: ["default", "primary", "info", "warning", "success", "danger"],
    },
    withStatusDot: { control: "boolean", name: "With Status Dot" },
  },
  args: {
    initials: "AD",
    size: "h-12 w-12 text-base",
    color: "default",
    withStatusDot: false,
  },
};

const COLOR_CLASS = {
  default: "",
  primary: "bg-primary-100 text-primary-700",
  info: "bg-info-100 text-info-700",
  warning: "bg-warning-100 text-warning-700",
  success: "bg-success-100 text-success-700",
  danger: "bg-danger-100 text-danger-700",
};

export const Playground = {
  render: (args) => {
    const colorClass = COLOR_CLASS[args.color];
    const avatar = `<span class="avatar ${args.size} ${colorClass}">${args.initials}</span>`;
    if (!args.withStatusDot) return `<div class="p-6">${avatar}</div>`;
    return `
      <div class="p-6">
        <span class="relative inline-flex">
          <span class="avatar ${args.size} ${colorClass}">${args.initials}</span>
          <span class="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success-500 ring-2 ring-white"></span>
        </span>
      </div>`;
  },
};

export const Sizes = {
  render: () => `
    <div class="flex items-center gap-3 p-6">
      <span class="avatar h-8 w-8 text-xs">AD</span>
      <span class="avatar h-10 w-10 text-sm">AD</span>
      <span class="avatar h-12 w-12 text-base">AD</span>
      <span class="avatar h-14 w-14 text-lg">AD</span>
    </div>`,
};

export const Group = {
  name: "Stacked Group",
  render: () => `
    <div class="flex -space-x-3 p-6">
      <span class="avatar h-9 w-9 bg-info-100 text-info-700 ring-2 ring-white">GJ</span>
      <span class="avatar h-9 w-9 bg-warning-100 text-warning-700 ring-2 ring-white">TP</span>
      <span class="avatar h-9 w-9 bg-success-100 text-success-700 ring-2 ring-white">TV</span>
      <span class="avatar h-9 w-9 bg-slate-200 text-slate-600 ring-2 ring-white">+5</span>
    </div>`,
};

// Appended variants

// ---------------------------------------------------------------------------
// Avatar component - image / placeholder variants (see src/input.css "Avatars")
// ---------------------------------------------------------------------------
import { avatarSrc, avatarImg } from "../../_helpers/placeholders.js";

const exBlock = (inner) => `<div class="p-6">${inner}</div>`;
const AVATAR_SIZES = [
  ["avatar-xs", "Extra small", "18px"],
  ["avatar-sm", "Small", "24px"],
  ["avatar-md", "Base", "32px"],
  ["avatar-lg", "Large", "44px"],
  ["avatar-xl", "Extra large", "56px"],
  ["avatar-2xl", "2XL", "64px"],
];

export const DefaultAvatar = {
  name: "Default avatar",
  render: () =>
    exBlock(`<div class="flex items-center gap-4">
      ${avatarImg(0, "avatar avatar-xl", "Avatar bulat")}
      ${avatarImg(1, "avatar avatar-xl avatar-square", "Avatar sudut membulat")}
    </div>`),
};

export const BorderedAvatar = {
  name: "Bordered",
  render: () =>
    exBlock(`<div class="flex items-center gap-5">
      ${avatarImg(2, "avatar avatar-xl avatar-bordered", "Avatar dengan border")}
      ${avatarImg(3, "avatar avatar-xl avatar-square avatar-bordered", "Avatar kotak dengan border")}
    </div>`),
};

export const PlaceholderIcon = {
  name: "Placeholder icon",
  render: () =>
    exBlock(`<div class="flex items-center gap-4">
      <span class="avatar avatar-xl avatar-placeholder"><i class="kk kk-user h-6 w-6"></i></span>
      <span class="avatar avatar-xl avatar-square avatar-placeholder"><i class="kk kk-user h-6 w-6"></i></span>
    </div>`),
};

export const PlaceholderInitials = {
  name: "Placeholder initials",
  render: () =>
    exBlock(`<div class="flex items-center gap-4">
      <span class="avatar avatar-xl">AD</span>
      <span class="avatar avatar-xl avatar-square">JL</span>
      <span class="avatar avatar-xl bg-secondary-100 text-secondary-700">BG</span>
    </div>`),
};

export const AvatarTooltip = {
  name: "Avatar tooltip",
  render: () =>
    exBlock(`<div class="flex items-center -space-x-3">
      ${["Ahmad Dimas", "Jese Leos", "Bonnie Green"]
        .map(
          (n, i) => `<span class="group relative inline-flex">
        ${avatarImg(i, "avatar avatar-lg ring-2 ring-surface", n)}
        <span class="tooltip-content">${n}</span>
      </span>`
        )
        .join("")}
    </div>`),
};

export const DotIndicator = {
  name: "Dot indicator",
  render: () => {
    const dot = (pos, tone, i) => `<span class="avatar-wrap">${avatarImg(i, "avatar avatar-xl", "Pengguna")}<span class="avatar-dot avatar-dot-${pos} avatar-dot-${tone}"></span></span>`;
    return exBlock(`<div class="flex flex-wrap items-center gap-6">
      ${dot("tl", "success", 0)}${dot("tr", "danger", 1)}${dot("bl", "success", 2)}${dot("br", "danger", 3)}
    </div>`);
  },
};

export const Stacked = {
  name: "Stacked",
  render: () =>
    exBlock(`<div class="avatar-stack">
      ${[0, 1, 2, 3].map((i) => avatarImg(i, "avatar avatar-lg", "Anggota tim")).join("")}
      <a href="#" class="avatar avatar-lg avatar-count text-xs" aria-label="99 anggota lain">+99</a>
    </div>`),
};

export const AvatarText = {
  name: "Avatar text",
  render: () =>
    exBlock(`<div class="flex items-center gap-3">
      ${avatarImg(0, "avatar avatar-lg", "Jese Leos")}
      <div class="leading-tight">
        <div class="text-sm font-semibold text-fg">Jese Leos</div>
        <div class="text-sm text-fg-muted">Bergabung Agustus 2024</div>
      </div>
    </div>`),
};

export const UserDropdown = {
  name: "User dropdown",
  render: () =>
    exBlock(`<div class="relative inline-block min-h-64">
      <button type="button" class="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2" data-ui-dropdown aria-expanded="false" aria-haspopup="true" aria-label="Menu pengguna">
        ${avatarImg(0, "avatar avatar-lg", "Ahmad Dimas")}
      </button>
      <div class="dropdown-menu hidden left-0 right-auto w-56">
        <div class="px-3 py-2">
          <p class="text-sm font-semibold text-fg">Ahmad Dimas</p>
          <p class="truncate text-xs text-fg-muted">ahmad.dimas@sevima.id</p>
        </div>
        <div class="my-1 border-t border-border-subtle"></div>
        <a href="#" class="dropdown-item">Dashboard</a>
        <a href="#" class="dropdown-item">Pengaturan</a>
        <a href="#" class="dropdown-item">Lamaran saya</a>
        <div class="my-1 border-t border-border-subtle"></div>
        <a href="#" class="dropdown-item dropdown-item-danger">Keluar</a>
      </div>
    </div>`),
};

export const AvatarSizes = {
  name: "Sizes",
  render: () =>
    exBlock(`<div class="flex flex-wrap items-end gap-6">
      ${AVATAR_SIZES.map(
        ([cls, label, px], i) => `<div class="flex flex-col items-center gap-2">
        ${avatarImg(i, `avatar ${cls}`, label)}
        <span class="text-xs text-fg-muted">${label}<br><code class="kbd">${px}</code></span>
      </div>`
      ).join("")}
    </div>`),
};
