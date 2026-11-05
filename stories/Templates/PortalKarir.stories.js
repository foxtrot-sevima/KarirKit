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

export const EmailUndanganAktivasi = {
  name: "Email Undangan Aktivasi",
  render: () => pageFrame("/templates/portal-karir/email-undangan.html", "Portal Karir Email Undangan Aktivasi"),
};

export const AktivasiAkun = {
  name: "Aktivasi Akun",
  render: () => pageFrame("/templates/portal-karir/aktivasi.html", "Portal Karir Aktivasi Akun"),
};

export const AktivasiKedaluwarsa = {
  name: "Aktivasi Link Kedaluwarsa",
  render: () => pageFrame("/templates/portal-karir/aktivasi-kedaluwarsa.html", "Portal Karir Aktivasi Link Kedaluwarsa"),
};

export const AktivasiTerpakai = {
  name: "Aktivasi Link Sudah Dipakai",
  render: () => pageFrame("/templates/portal-karir/aktivasi-terpakai.html", "Portal Karir Aktivasi Link Sudah Dipakai"),
};

export const AktivasiTidakValid = {
  name: "Aktivasi Link Tidak Valid",
  render: () => pageFrame("/templates/portal-karir/aktivasi-tidak-valid.html", "Portal Karir Aktivasi Link Tidak Valid"),
};

export const MintaLinkBaru = {
  name: "Minta Link Aktivasi Baru",
  render: () => pageFrame("/templates/portal-karir/link-baru.html", "Portal Karir Minta Link Aktivasi Baru"),
};

export const LinkBaruTerkirim = {
  name: "Link Aktivasi Baru Terkirim",
  render: () => pageFrame("/templates/portal-karir/link-baru-terkirim.html", "Portal Karir Link Aktivasi Baru Terkirim"),
};

export const UbahPassword = {
  name: "Ubah Password",
  render: () => pageFrame("/templates/portal-karir/ubah-password.html", "Portal Karir Ubah Password"),
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

export const EventDetail = {
  name: "Event - Detail",
  render: () => pageFrame("/templates/portal-karir/event-detail.html?id=1", "Portal Karir Detail Event"),
};

export const JobFair = {
  name: "Job Fair",
  render: () => pageFrame("/templates/portal-karir/job-fair.html", "Portal Karir Job Fair"),
};

export const JobFairLowongan = {
  name: "Job Fair - Lowongan",
  render: () => pageFrame("/templates/portal-karir/job-fair-lowongan.html", "Portal Karir Lowongan Job Fair"),
};

export const JobFairPerusahaan = {
  name: "Job Fair - Perusahaan",
  render: () => pageFrame("/templates/portal-karir/job-fair-perusahaan.html?company=teknologi-cakra", "Portal Karir Perusahaan Job Fair"),
};

export const PengembanganDiri = {
  name: "Pengembangan Diri",
  render: () => pageFrame("/templates/portal-karir/pengembangan.html", "Portal Karir Pengembangan Diri"),
};

export const Course = {
  name: "Course",
  render: () => pageFrame("/templates/portal-karir/course.html?id=1", "Portal Karir Course"),
};

export const SegeraHadir = {
  name: "Segera Hadir",
  render: () => pageFrame("/templates/portal-karir/segera-hadir.html", "Portal Karir Segera Hadir"),
};

export const TesRiasec = {
  name: "Tes RIASEC",
  render: () => pageFrame("/templates/portal-karir/riasec.html", "Portal Karir Tes RIASEC"),
};

export const PengerjaanTesRiasec = {
  name: "Pengerjaan Tes RIASEC",
  render: () => pageFrame("/templates/portal-karir/riasec-tes.html", "Portal Karir Pengerjaan Tes RIASEC"),
};

export const HasilTesRiasec = {
  name: "Hasil Tes RIASEC",
  render: () => pageFrame("/templates/portal-karir/riasec-hasil.html", "Portal Karir Hasil Tes RIASEC"),
};

export const CustomKampus = {
  name: "Custom Kampus (white-label)",
  render: () => pageFrame("/templates/custom/portal-karir/index.html", "Portal Karir Custom Kampus"),
};
