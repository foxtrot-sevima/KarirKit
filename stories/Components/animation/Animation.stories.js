export default {
  title: "Components/Animation",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Kelas gerak dekoratif: `.anim-orbit` / `.anim-orbit-rev` (putar lambat), `.anim-float` (melayang), `.anim-pulse` (denyut pudar), `.anim-enter` (masuk halus dari bawah, berjalan tiap elemen tampil). Semuanya dimatikan bila pengguna memilih gerakan dikurangi (`prefers-reduced-motion`).",
      },
    },
  },
};

export const Decorative = {
  render: () => `<div class="flex flex-wrap items-center gap-10 p-10">
    <div class="relative h-24 w-24"><div class="anim-orbit absolute inset-0 rounded-full border-2 border-dashed border-primary-300"></div><div class="anim-orbit-rev absolute inset-4 rounded-full border-2 border-dashed border-secondary-300"></div></div>
    <div class="anim-float rounded-card bg-primary-600 px-5 py-4 text-sm font-semibold text-white shadow-card-lg">Melayang</div>
    <div class="anim-pulse h-16 w-16 rounded-full bg-primary-500"></div>
  </div>`,
};

export const Enter = {
  render: () => `<div class="space-y-3 p-6"><div class="anim-enter card p-4 text-sm">Panel masuk dengan <code>.anim-enter</code></div></div>`,
};
