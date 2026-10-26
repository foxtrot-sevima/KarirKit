export default {
  title: "Templates/Portal Karir",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Halaman pengguna KarirLink (mahasiswa, alumni, dan pengunjung diperlakukan sama) dari `templates/portal-karir/*.html`, ditampilkan lewat `<iframe>` supaya sama persis dengan file aslinya. Alurnya: Register → Onboarding (3 langkah) → Dashboard; Login langsung ke Dashboard jika onboarding sudah selesai. Login dan Register memakai tombol SiAkadCloud dan Google. Dashboard menghitung kecocokan lowongan di browser dari jawaban onboarding (data contoh, disimpan di `localStorage`). Edit langsung file `templates/portal-karir/*.html`, bukan story ini.",
      },
    },
  },
};

function pageFrame(src, title) {
  return `<iframe src="${src}" title="${title}" style="width: 100%; height: 100vh; border: 0; display: block;"></iframe>`;
}

export const Login = {
  name: "Login",
  render: () => pageFrame("/templates/portal-karir/login.html", "Portal Karir Login"),
};

export const Register = {
  name: "Register",
  render: () => pageFrame("/templates/portal-karir/register.html", "Portal Karir Register"),
};

export const Onboarding = {
  name: "Onboarding",
  render: () => pageFrame("/templates/portal-karir/onboarding.html", "Portal Karir Onboarding"),
};

export const Dashboard = {
  name: "Dashboard",
  render: () => pageFrame("/templates/portal-karir/index.html", "Portal Karir Dashboard"),
};
