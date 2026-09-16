export default {
  title: "Components/Progress",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Progress bar dengan label persentase, warna mengikuti status." } },
  },
};

export const Bar = {
  name: "Progress Bar",
  render: () => `
    <div class="p-6">
      <div class="max-w-md space-y-4">
        <div>
          <div class="mb-1.5 flex justify-between text-xs text-slate-500"><span>Kelengkapan Profil</span><span>83%</span></div>
          <div class="progress-track"><div class="progress-bar w-[83%]"></div></div>
        </div>
        <div>
          <div class="mb-1.5 flex justify-between text-xs text-slate-500"><span>Skor Kecocokan CV</span><span>65%</span></div>
          <div class="progress-track"><div class="progress-bar bg-warning-500 w-[65%]"></div></div>
        </div>
      </div>
    </div>`,
};
