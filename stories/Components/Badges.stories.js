export default {
  title: "Components/Badges",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Status pill untuk lamaran, prioritas, dan tag AI." } },
  },
};

export const Soft = {
  render: () => `
    <div class="card p-6 sm:p-8">
      <div class="flex flex-wrap gap-3">
        <span class="badge-success"><span class="badge-dot bg-success-600"></span>Diterima</span>
        <span class="badge-info"><span class="badge-dot bg-info-600"></span>Ditinjau</span>
        <span class="badge-warning"><span class="badge-dot bg-warning-600"></span>Menunggu</span>
        <span class="badge-danger"><span class="badge-dot bg-danger-600"></span>Ditolak</span>
        <span class="badge-primary"><span class="badge-dot bg-primary-600"></span>Baru</span>
        <span class="badge-secondary"><span class="badge-dot bg-secondary-600"></span>Rekomendasi</span>
        <span class="badge-neutral"><span class="badge-dot bg-slate-400"></span>Draf</span>
      </div>
    </div>`,
};

export const Solid = {
  render: () => `
    <div class="card p-6 sm:p-8">
      <div class="flex flex-wrap gap-3">
        <span class="badge bg-success-600 text-white">Success</span>
        <span class="badge bg-info-600 text-white">Info</span>
        <span class="badge bg-warning-600 text-white">Warning</span>
        <span class="badge bg-danger-600 text-white">Danger</span>
        <span class="badge bg-slate-800 text-white">Neutral</span>
      </div>
    </div>`,
};

export const AITrustTags = {
  name: "AI / Trust Tags",
  render: () => `
    <div class="card p-6 sm:p-8">
      <div class="flex flex-wrap gap-3">
        <span class="badge-success">
          <i class="kk kk-sparkle h-3 w-3"></i>
          96% Confidence
        </span>
        <span class="badge-danger">CRITICAL</span>
        <span class="badge-warning">NEEDS ATTENTION</span>
      </div>
    </div>`,
};
