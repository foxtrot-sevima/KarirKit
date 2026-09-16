export default {
  title: "Foundations/Icons",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'Ikon KarirKit — token berbasis class, pakai seperti icon font: `<i class="kk kk-home"></i>`. Mewarisi `currentColor`, ukuran diatur lewat utility `h-*`/`w-*`.',
      },
    },
  },
};

const ICONS = [
  ["kk-house", "home"],
  ["kk-briefcase", "briefcase"],
  ["kk-file-text", "document"],
  ["kk-calendar-blank", "calendar"],
  ["kk-bookmark-simple", "bookmark"],
  ["kk-chat-circle", "message"],
  ["kk-gear-six", "settings"],
  ["kk-magnifying-glass", "search"],
  ["kk-bell", "bell"],
  ["kk-sparkle", "sparkles"],
  ["kk-eye", "eye"],
  ["kk-chart-bar", "chart-bar"],
  ["kk-check-circle", "check-circle"],
  ["kk-warning-circle", "warning"],
  ["kk-clock", "clock"],
  ["kk-plus", "plus"],
  ["kk-sign-out", "logout"],
  ["kk-star", "star"],
  ["kk-shield-check", "shield-check"],
  ["kk-caret-right", "chevron-right"],
];

export const Library = {
  render: () => `
    <div class="card p-6 sm:p-8">
      <div class="grid grid-cols-4 gap-4 sm:grid-cols-6 lg:grid-cols-10">
        ${ICONS.map(
          ([cls, label]) => `
          <div class="flex flex-col items-center gap-2">
            <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-slate-600"><i class="kk ${cls} h-5 w-5"></i></span>
            <p class="text-[11px] text-slate-400">${label}</p>
          </div>`
        ).join("")}
      </div>
    </div>`,
};

export const Weights = {
  render: () => `
    <div class="card p-6 sm:p-8">
      <p class="nav-eyebrow mb-1 px-0">Weights</p>
      <p class="form-hint mb-4 mt-0">Tambahkan satu class modifier di samping <code class="kbd">kk-nama</code> untuk ganti ketebalan — default (tanpa modifier) adalah Regular.</p>
      <div class="grid grid-cols-3 gap-4 sm:grid-cols-6">
        <div class="flex flex-col items-center gap-2"><span class="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-slate-600"><i class="kk kk-house kk-thin h-6 w-6"></i></span><p class="text-[11px] text-slate-400">Thin</p></div>
        <div class="flex flex-col items-center gap-2"><span class="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-slate-600"><i class="kk kk-house kk-light h-6 w-6"></i></span><p class="text-[11px] text-slate-400">Light</p></div>
        <div class="flex flex-col items-center gap-2"><span class="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-slate-600"><i class="kk kk-house h-6 w-6"></i></span><p class="text-[11px] text-slate-400">Regular</p></div>
        <div class="flex flex-col items-center gap-2"><span class="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-slate-600"><i class="kk kk-house kk-bold h-6 w-6"></i></span><p class="text-[11px] text-slate-400">Bold</p></div>
        <div class="flex flex-col items-center gap-2"><span class="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-slate-600"><i class="kk kk-house kk-fill h-6 w-6"></i></span><p class="text-[11px] text-slate-400">Fill</p></div>
        <div class="flex flex-col items-center gap-2"><span class="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-slate-600"><i class="kk kk-house kk-duotone h-6 w-6"></i></span><p class="text-[11px] text-slate-400">Duotone</p></div>
      </div>
    </div>`,
};
