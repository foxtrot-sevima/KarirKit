export default {
  title: "Templates/Portal Karir",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Halaman pengguna KarirLink (mahasiswa, alumni, dan pengunjung diperlakukan sama) dari `templates/portal-karir/*.html`, ditampilkan lewat `<iframe>` supaya sama persis dengan file aslinya. Alurnya: Register → Onboarding (3 langkah) → Beranda; Login langsung ke Beranda jika onboarding sudah selesai. Setelah masuk, pengguna memakai tiga halaman dengan navbar atas (bukan sidebar): Beranda (hero pencarian + feed lowongan), Lowongan (daftar dan detail berdampingan), dan Lamaran Saya (pelacak tahap). Login dan Register memakai tombol SiAkadCloud dan Google. Halaman portal menghitung kecocokan lowongan di browser dari jawaban onboarding (data contoh, disimpan di `localStorage`). Data contoh bersama ada di `templates/portal-karir/portal.js`. Edit langsung file di `templates/portal-karir/`, bukan story ini.",
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

export const Beranda = {
  name: "Beranda",
  render: () => pageFrame("/templates/portal-karir/index.html", "Portal Karir Beranda"),
};

export const Lowongan = {
  name: "Lowongan",
  render: () => pageFrame("/templates/portal-karir/lowongan.html", "Portal Karir Lowongan"),
};

export const Lamaran = {
  name: "Lamaran Saya",
  render: () => pageFrame("/templates/portal-karir/lamaran.html", "Portal Karir Lamaran Saya"),
};


export const Profil = {
  name: "Profil",
  render: () => pageFrame("/templates/portal-karir/profil.html", "Portal Karir Profil"),
};

export const ProfilPublik = {
  name: "Profil (tampilan publik)",
  render: () => pageFrame("/templates/portal-karir/profil.html?publik=1", "Portal Karir Profil Publik"),
};

export const Event = {
  name: "Event",
  render: () => pageFrame("/templates/portal-karir/event.html", "Portal Karir Event"),
};

export const Course = {
  name: "Course",
  render: () => pageFrame("/templates/portal-karir/course.html", "Portal Karir Course"),
};

export const CustomKampus = {
  name: "Custom Kampus (white-label)",
  render: () => pageFrame("/templates/custom/portal-karir/index.html", "Portal Karir Custom Kampus"),
};
