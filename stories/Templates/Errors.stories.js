export default {
  title: "Templates/Errors",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Halaman utuh dari `templates/*.html`, ditampilkan lewat `<iframe>` (bukan disalin ulang di sini) supaya yang terlihat di Storybook selalu sama persis dengan file aslinya, termasuk JS-nya sendiri (tombol coba lagi, kembali). Edit langsung file `templates/*.html`-nya, bukan story ini.",
      },
    },
  },
};

function pageFrame(src, title) {
  return `<iframe src="${src}" title="${title}" style="width: 100%; height: 100vh; border: 0; display: block;"></iframe>`;
}

export const NotFound404 = {
  name: "404 - Halaman Tidak Ditemukan",
  render: () => pageFrame("/templates/404.html", "404 - Halaman Tidak Ditemukan"),
};

export const ServerError500 = {
  name: "500 - Kesalahan Server",
  render: () => pageFrame("/templates/500.html", "500 - Kesalahan Server"),
};

export const Forbidden403 = {
  name: "403 - Akses Ditolak",
  render: () => pageFrame("/templates/403.html", "403 - Akses Ditolak"),
};

export const Maintenance503 = {
  name: "503 - Sedang Dalam Pemeliharaan",
  render: () => pageFrame("/templates/503.html", "503 - Sedang Dalam Pemeliharaan"),
};
