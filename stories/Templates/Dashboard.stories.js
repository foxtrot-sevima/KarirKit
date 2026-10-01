export default {
  title: "Templates/Dashboard",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Halaman utuh dari `templates/dashboard.html`, ditampilkan lewat `<iframe>` (bukan disalin ulang di sini) supaya yang terlihat di Storybook selalu sama persis dengan file aslinya, termasuk JS-nya sendiri (toggle sidebar, dst). Edit langsung file `templates/dashboard.html`, bukan story ini.",
      },
    },
  },
};

export const Dashboard = {
  name: "Dashboard",
  render: () =>
    `<iframe src="/templates/dashboard.html" title="Dashboard" style="width: 100%; height: 100vh; border: 0; display: block;"></iframe>`,
};
