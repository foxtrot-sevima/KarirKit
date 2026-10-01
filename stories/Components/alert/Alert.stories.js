export default {
  title: "Components/Alert",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Aksen border kiri untuk tingkat urgensi, plus kotak rekomendasi AI." } },
  },
  argTypes: {
    level: {
      control: "select",
      options: ["critical", "warning", "info", "success"],
    },
    title: { control: "text" },
    description: { control: "text" },
  },
  args: {
    level: "critical",
    title: "Critical",
    description: "Dipakai untuk kondisi yang butuh tindakan segera, mis. interview dalam hitungan jam.",
  },
};

export const Playground = {
  render: (args) => `
    <div class="p-6 max-w-md">
      <div class="callout-${args.level}">
        <p class="mb-1 text-sm font-semibold text-slate-800">${args.title}</p>
        <p class="text-sm text-slate-500">${args.description}</p>
      </div>
    </div>`,
};

export const Callouts = {
  render: () => `
    <div class="grid gap-4 sm:grid-cols-2 max-w-2xl p-6">
      <div class="callout-critical">
        <p class="mb-1 text-sm font-semibold text-slate-800">Critical</p>
        <p class="text-sm text-slate-500">Dipakai untuk kondisi yang butuh tindakan segera, mis. interview dalam hitungan jam.</p>
      </div>
      <div class="callout-warning">
        <p class="mb-1 text-sm font-semibold text-slate-800">Needs Attention</p>
        <p class="text-sm text-slate-500">Kondisi penting namun belum mendesak, mis. CV belum diperbarui.</p>
      </div>
      <div class="callout-info">
        <p class="mb-1 text-sm font-semibold text-slate-800">Info</p>
        <p class="text-sm text-slate-500">Informasi netral, mis. pembaruan fitur atau tips umum.</p>
      </div>
      <div class="callout-success">
        <p class="mb-1 text-sm font-semibold text-slate-800">Success</p>
        <p class="text-sm text-slate-500">Konfirmasi hasil positif, mis. lamaran berhasil dikirim.</p>
      </div>
    </div>`,
};

export const AIRecommendation = {
  name: "AI Recommendation Box",
  render: () => `
    <div class="max-w-2xl rounded-xl border border-warning-100 bg-warning-50 p-4 m-6">
      <p class="mb-1 text-xs font-semibold uppercase tracking-wide text-warning-600">AI Recommendation &amp; Impact</p>
      <p class="text-sm text-slate-700">Kotak rekomendasi bertingkat di dalam kartu aksi - memberi konteks kenapa AI menyarankan sesuatu dan dampaknya.</p>
    </div>`,
};

// Appended variants

// ---------------------------------------------------------------------------
// Alert component - status alerts (see src/input.css "Alerts")
// ---------------------------------------------------------------------------
const exBlock = (inner) => `<div class="p-6">${inner}</div>`;
const ALERT_KINDS = [
  ["info", "Info", "info", "Perbarui profilmu agar rekomendasi lowongan makin akurat."],
  ["danger", "Gagal", "warning-circle", "Lamaran belum terkirim. Periksa koneksi lalu coba lagi."],
  ["success", "Berhasil", "check-circle", "Lamaran berhasil dikirim ke perusahaan."],
  ["warning", "Perhatian", "warning", "CV kamu belum diperbarui dalam 6 bulan terakhir."],
  ["dark", "Catatan", "info", "Ubah beberapa hal di profil, lalu coba kirim ulang."],
];
const alertClose = `<button type="button" class="alert-close" data-ui-dismiss=".alert" aria-label="Tutup"><i class="kk kk-x h-4 w-4"></i></button>`;
const alertIcon = (name) => `<i class="kk kk-${name} alert-icon"></i>`;

const alertRow = ({ kind, label, icon, text, cls = "", withIcon = false, close = false }) => `
  <div class="alert alert-${kind} ${cls}" role="alert">
    ${withIcon ? alertIcon(icon) : ""}
    <div><span class="alert-title">${label}!</span> ${text}</div>
    ${close ? alertClose : ""}
  </div>`;

const alertStack = (opts) => exBlock(`<div class="max-w-3xl space-y-3">${ALERT_KINDS.map(([kind, label, icon, text]) => alertRow({ kind, label, icon, text, ...opts })).join("")}</div>`);

export const DefaultAlert = { name: "Default alert", render: () => alertStack({}) };
export const AlertsWithIcon = { name: "Alerts with icon", render: () => alertStack({ withIcon: true }) };
export const BorderedAlerts = { name: "Bordered alerts", render: () => alertStack({ withIcon: true, cls: "alert-bordered" }) };

export const AlertsWithList = {
  name: "Alerts with list",
  render: () =>
    exBlock(`<div class="max-w-3xl space-y-3">${ALERT_KINDS.slice(0, 4)
      .map(
        ([kind, label, icon]) => `
      <div class="alert alert-${kind}" role="alert">
        ${alertIcon(icon)}
        <div>
          <span class="alert-title">${label}!</span> Pastikan persyaratan berikut terpenuhi:
          <ul class="alert-list">
            <li>Minimal 8 karakter, gabungan huruf dan angka</li>
            <li>Gunakan huruf besar dan kecil</li>
            <li>Sertakan satu karakter khusus</li>
          </ul>
        </div>
      </div>`
      )
      .join("")}</div>`),
};

export const Dismissing = { name: "Dismissing", render: () => alertStack({ withIcon: true, close: true }) };
export const BorderAccent = { name: "Border accent", render: () => alertStack({ withIcon: true, close: true, cls: "alert-accent" }) };

export const AdditionalContent = {
  name: "Additional content",
  render: () =>
    exBlock(`<div class="max-w-3xl space-y-3">${ALERT_KINDS.slice(0, 4)
      .map(
        ([kind, label, icon, text]) => `
      <div class="alert alert-${kind}" role="alert">
        ${alertIcon(icon)}
        <div>
          <p class="alert-title">${label}!</p>
          <p class="mt-1">${text} Tinjau detailnya sebelum melanjutkan agar tidak ada yang terlewat.</p>
          <div class="alert-actions">
            <button type="button" class="btn-outline btn-sm"><i class="kk kk-eye h-3.5 w-3.5"></i>Lihat detail</button>
            <button type="button" class="btn-ghost btn-sm" data-ui-dismiss=".alert">Tutup</button>
          </div>
        </div>
        ${alertClose}
      </div>`
      )
      .join("")}</div>`),
};

const ANNOUNCE_SOLID = { info: "bg-info-600", danger: "bg-danger-600", success: "bg-success-600", warning: "bg-warning-600", dark: "bg-neutral-700" };

export const AnnouncementAlerts = {
  name: "Announcement alerts",
  render: () =>
    exBlock(`<div class="flex flex-col items-start gap-3">${ALERT_KINDS.map(
      ([kind, label]) => `
      <a href="#" class="alert alert-${kind} alert-announcement" role="alert">
        <span class="rounded-full ${ANNOUNCE_SOLID[kind]} px-2.5 py-1 text-[11px] font-semibold text-white">Baru</span>
        <span class="font-medium">${label}: fitur terbaru sudah tersedia</span>
        <i class="kk kk-arrow-right h-3.5 w-3.5"></i>
      </a>`
    ).join("")}</div>`),
};
