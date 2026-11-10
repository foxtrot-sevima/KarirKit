export default {
  title: "Templates/Landing",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Landing page publik KarirLink (`karirlink.id/beranda`) dari `templates/landing/*.html`, ditampilkan lewat `<iframe>` supaya sama persis dengan file aslinya. Dibangun dari komponen KarirKit tanpa gaya komponen sendiri; datanya statis (contoh lowongan ditulis sebagai HTML).",
      },
    },
  },
};

function pageFrame(src, title) {
  return `<iframe src="${src}" title="${title}" style="width: 100%; height: 100vh; border: 0; display: block;"></iframe>`;
}

export const Beranda = {
  name: "Beranda",
  render: () => pageFrame("/templates/landing/index.html", "Landing Beranda KarirLink"),
};
