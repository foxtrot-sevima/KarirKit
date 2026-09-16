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
