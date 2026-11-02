export default {
  title: "Templates/Mitra",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Dashboard mitra perusahaan dari `templates/mitra/*.html`, ditampilkan lewat `<iframe>` supaya sama persis dengan file aslinya. Kerangkanya sidebar + topbar seperti admin KarirLink, tetapi menu-nya milik perusahaan (Rekrutmen, Talent, Kerjasama, Komunikasi, Perusahaan). Halaman yang sudah ada: Profil Perusahaan dan Pengaturan; menu lain menuju Segera Hadir. Pendaftaran mitra (guest) ada di `templates/portal-karir/mitra-daftar.html`. Edit langsung file di `templates/mitra/`, bukan story ini.",
      },
    },
  },
};

function pageFrame(src, title) {
  return `<iframe src="${src}" title="${title}" style="width: 100%; height: 100vh; border: 0; display: block;"></iframe>`;
}

export const ProfilPerusahaan = {
  name: "Profil Perusahaan",
  render: () => pageFrame("/templates/mitra/profil.html", "Mitra Profil Perusahaan"),
};

export const Pengaturan = {
  name: "Pengaturan",
  render: () => pageFrame("/templates/mitra/pengaturan.html", "Mitra Pengaturan"),
};

export const SegeraHadir = {
  name: "Segera Hadir",
  render: () => pageFrame("/templates/mitra/segera-hadir.html?menu=Lowongan", "Mitra Segera Hadir"),
};
