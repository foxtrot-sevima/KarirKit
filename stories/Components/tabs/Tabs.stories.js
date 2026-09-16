export default {
  title: "Components/Tabs",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Tab bersegmen untuk filter, plus label eyebrow untuk judul grup." } },
  },
};

export const Segmented = {
  name: "Segmented Tabs",
  render: () => `
    <div class="card flex flex-col gap-4 p-4 max-w-xs">
      <div>
        <p class="nav-eyebrow mb-2">Segmented tabs</p>
        <div class="inline-flex w-fit gap-1 rounded-xl bg-slate-100 p-1">
          <span class="tab tab-active">Semua</span>
          <span class="tab">Aktif</span>
          <span class="tab">Selesai</span>
        </div>
      </div>
      <div>
        <p class="nav-eyebrow mb-2">Eyebrow label</p>
        <p class="nav-eyebrow px-0">Alat Karier</p>
      </div>
    </div>`,
};
