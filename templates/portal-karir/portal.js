/* Portal Karir - data contoh dan helper bersama untuk index.html, lowongan.html, dan lamaran.html.
   Semua data tinggal di browser (localStorage): jawaban onboarding, lowongan tersimpan, dan lamaran yang dikirim dari portal. */
(function () {
  var ROOT = (function () { var s = document.currentScript; return s && s.src ? new URL('../../', s.src).href : '../../'; })();
  var STORE_KEY = 'kk_portal_onboarding';
  var USER_KEY = 'kk_portal_user';
  var SAVED_KEY = 'kk_portal_saved';
  var APPLIED_KEY = 'kk_portal_applied';
  var DAY = 86400000;

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s == null ? '' : String(s);
    return d.innerHTML;
  }
  function read(key, fallback) {
    try { var v = JSON.parse(localStorage.getItem(key)); return v == null ? fallback : v; } catch (e) { return fallback; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage tidak tersedia: demo tetap jalan untuk kunjungan ini */ }
  }
  function initials(name) {
    var parts = String(name || '').split(' ').filter(Boolean);
    if (!parts.length) return 'U';
    return (parts[0].charAt(0) + (parts.length > 1 ? parts[1].charAt(0) : '')).toUpperCase();
  }
  function when(ago) {
    if (ago <= 0) return 'Hari ini';
    if (ago === 1) return 'Kemarin';
    if (ago < 7) return ago + ' hari lalu';
    if (ago < 30) return Math.floor(ago / 7) + ' minggu lalu';
    return Math.floor(ago / 30) + ' bulan lalu';
  }
  function dateOf(ago) {
    return new Date(Date.now() - ago * DAY).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  // Warna per bidang (nama kelas ditulis utuh supaya terbaca build CSS).
  var TINT = {
    primary: { soft: 'bg-primary-50', logo: 'bg-primary-100 text-primary-700', text: 'text-primary-700' },
    secondary: { soft: 'bg-secondary-50', logo: 'bg-secondary-100 text-secondary-700', text: 'text-secondary-700' },
    success: { soft: 'bg-success-50', logo: 'bg-success-100 text-success-700', text: 'text-success-700' },
    warning: { soft: 'bg-warning-50', logo: 'bg-warning-100 text-warning-700', text: 'text-warning-700' },
    danger: { soft: 'bg-danger-50', logo: 'bg-danger-100 text-danger-700', text: 'text-danger-700' },
    info: { soft: 'bg-info-50', logo: 'bg-info-100 text-info-700', text: 'text-info-700' }
  };
  var FIELDS = {
    'Teknologi & IT': { color: 'primary', icon: 'laptop' },
    'Desain & Kreatif': { color: 'secondary', icon: 'palette' },
    'Keuangan & Akuntansi': { color: 'success', icon: 'bank' },
    'Pemasaran & Penjualan': { color: 'warning', icon: 'megaphone' },
    'Kesehatan': { color: 'danger', icon: 'heartbeat' },
    'Pendidikan & Pelatihan': { color: 'info', icon: 'graduation-cap' },
    'Teknik & Manufaktur': { color: 'primary', icon: 'wrench' },
    'Hukum & Pemerintahan': { color: 'secondary', icon: 'scales' },
    'Hospitality & Pariwisata': { color: 'info', icon: 'airplane-tilt' },
    'Logistik & Rantai Pasok': { color: 'warning', icon: 'truck' },
    'Media & Komunikasi': { color: 'danger', icon: 'newspaper' },
    'Riset & Sains': { color: 'success', icon: 'flask' }
  };
  function tintOf(job) { return TINT[(FIELDS[job.field] || FIELDS['Teknologi & IT']).color]; }

  // Katalog contoh. `pop` = popularitas (dipakai saat pengguna belum mengisi minat), `payMin` dalam juta rupiah (urutan gaji),
  // `posted` = berapa hari lalu diposting, `applicants` = jumlah pelamar.
  var JOBS = [
    { id: 1, title: 'Frontend Developer Intern', company: 'PT Nusantara Digital', field: 'Teknologi & IT', type: 'Magang', mode: 'Hybrid', city: 'Bandung', skills: ['JavaScript', 'HTML & CSS', 'React'], pay: 'Rp3 - 5 juta', payMin: 3, pop: 9, posted: 1, applicants: 42, about: 'Bergabung dengan tim produk yang membangun aplikasi web untuk ribuan pengguna kampus. Kamu akan dibimbing langsung oleh engineer senior.' },
    { id: 2, title: 'Data Analyst', company: 'Bank Sentra Mandiri', field: 'Keuangan & Akuntansi', type: 'Penuh waktu', mode: 'Di kantor', city: 'Jakarta', skills: ['SQL', 'Microsoft Excel', 'Power BI'], pay: 'Rp8 - 12 juta', payMin: 8, pop: 8, posted: 3, applicants: 87, about: 'Mengolah data transaksi menjadi wawasan yang membantu tim bisnis mengambil keputusan lebih cepat dan tepat.' },
    { id: 3, title: 'UI/UX Designer', company: 'Studio Kreatif Kita', field: 'Desain & Kreatif', type: 'Kontrak', mode: 'Remote', city: 'Di mana saja', skills: ['Figma', 'Riset pengguna'], pay: 'Rp6 - 9 juta', payMin: 6, pop: 8, posted: 2, applicants: 64, about: 'Merancang pengalaman digital untuk klien dari berbagai industri, dari riset pengguna sampai prototipe siap pakai.' },
    { id: 4, title: 'Digital Marketing Executive', company: 'Toko Bumi Raya', field: 'Pemasaran & Penjualan', type: 'Penuh waktu', mode: 'Hybrid', city: 'Surabaya', skills: ['SEO', 'Copywriting', 'Google Ads'], pay: 'Rp5 - 7 juta', payMin: 5, pop: 7, posted: 5, applicants: 51, about: 'Mengelola kampanye digital toko online yang sedang tumbuh cepat, mulai dari iklan berbayar sampai konten organik.' },
    { id: 5, title: 'Staf Administrasi Rumah Sakit', company: 'RS Harapan Sehat', field: 'Kesehatan', type: 'Penuh waktu', mode: 'Di kantor', city: 'Yogyakarta', skills: ['Rekam medis', 'Microsoft Office'], pay: 'Rp4 - 5 juta', payMin: 4, pop: 5, posted: 6, applicants: 23, about: 'Mendukung layanan administrasi pasien dan pengelolaan rekam medis di rumah sakit tipe B.' },
    { id: 6, title: 'Guru Pendamping Kelas', company: 'Sekolah Cendekia', field: 'Pendidikan & Pelatihan', type: 'Paruh waktu', mode: 'Di kantor', city: 'Semarang', skills: ['Pengajaran', 'Public speaking'], pay: 'Rp2 - 3 juta', payMin: 2, pop: 5, posted: 8, applicants: 18, about: 'Mendampingi guru utama di kelas, membantu siswa yang butuh perhatian lebih, dan menyiapkan bahan ajar.' },
    { id: 7, title: 'Quality Control Engineer', company: 'PT Mekatronika Prima', field: 'Teknik & Manufaktur', type: 'Penuh waktu', mode: 'Di kantor', city: 'Medan', skills: ['Pengendalian mutu', 'K3', 'AutoCAD'], pay: 'Rp6 - 8 juta', payMin: 6, pop: 6, posted: 4, applicants: 31, about: 'Memastikan setiap produk lini perakitan memenuhi standar mutu dan keselamatan sebelum dikirim ke pelanggan.' },
    { id: 8, title: 'Staf Legal', company: 'Kantor Hukum Adil Makmur', field: 'Hukum & Pemerintahan', type: 'Kontrak', mode: 'Di kantor', city: 'Jakarta', skills: ['Penyusunan kontrak', 'Riset hukum'], pay: 'Rp5 - 7 juta', payMin: 5, pop: 4, posted: 9, applicants: 27, about: 'Membantu advokat senior menyusun dokumen hukum, meninjau kontrak, dan meriset peraturan terbaru.' },
    { id: 9, title: 'Front Office Staff', company: 'Hotel Samudra', field: 'Hospitality & Pariwisata', type: 'Penuh waktu', mode: 'Di kantor', city: 'Denpasar', skills: ['Layanan pelanggan', 'Bahasa Inggris'], pay: 'Rp4 - 6 juta', payMin: 4, pop: 6, posted: 2, applicants: 45, about: 'Menyambut tamu hotel bintang empat dan memastikan proses check-in sampai check-out berjalan nyaman.' },
    { id: 10, title: 'Supply Chain Officer', company: 'Logistik Garuda', field: 'Logistik & Rantai Pasok', type: 'Penuh waktu', mode: 'Di kantor', city: 'Jakarta', skills: ['SAP', 'Microsoft Excel', 'Manajemen gudang'], pay: 'Rp6 - 9 juta', payMin: 6, pop: 7, posted: 7, applicants: 38, about: 'Memantau arus barang dari gudang sampai tujuan dan mencari cara memangkas waktu pengiriman.' },
    { id: 11, title: 'Content Writer Freelance', company: 'Media Kampus Id', field: 'Media & Komunikasi', type: 'Freelance', mode: 'Remote', city: 'Di mana saja', skills: ['Penulisan konten', 'SEO'], pay: 'Per proyek', payMin: 0, pop: 6, posted: 1, applicants: 56, about: 'Menulis artikel seputar dunia kampus dan karier untuk pembaca muda, dengan jadwal yang fleksibel.' },
    { id: 12, title: 'Research Assistant', company: 'Pusat Riset Terapan', field: 'Riset & Sains', type: 'Magang', mode: 'Hybrid', city: 'Bandung', skills: ['Analisis data', 'Statistik', 'Penulisan ilmiah'], pay: 'Rp2 - 3 juta', payMin: 2, pop: 5, posted: 10, applicants: 14, about: 'Mendukung peneliti dalam pengumpulan data lapangan, analisis, dan penulisan laporan hasil riset.' },
    { id: 13, title: 'Backend Developer', company: 'Teknologi Cakra', field: 'Teknologi & IT', type: 'Penuh waktu', mode: 'Hybrid', city: 'Jakarta', skills: ['Python', 'SQL', 'Git'], pay: 'Rp9 - 14 juta', payMin: 9, pop: 8, posted: 3, applicants: 96, about: 'Membangun layanan API yang menopang platform pembayaran dengan jutaan transaksi setiap bulan.' },
    { id: 14, title: 'Graphic Designer Intern', company: 'Agensi Warna', field: 'Desain & Kreatif', type: 'Magang', mode: 'Di kantor', city: 'Yogyakarta', skills: ['Desain grafis', 'Adobe Photoshop'], pay: 'Rp1,5 - 2,5 juta', payMin: 1.5, pop: 6, posted: 4, applicants: 73, about: 'Ikut menggarap materi visual kampanye klien, dari poster dan media sosial sampai kemasan produk.' },
    { id: 15, title: 'Staf Akuntansi', company: 'KAP Mitra Jaya', field: 'Keuangan & Akuntansi', type: 'Kontrak', mode: 'Di kantor', city: 'Bandung', skills: ['Akuntansi', 'Microsoft Excel'], pay: 'Rp5 - 6 juta', payMin: 5, pop: 5, posted: 6, applicants: 29, about: 'Membantu penyusunan laporan keuangan dan rekonsiliasi untuk klien kantor akuntan publik.' },
    { id: 16, title: 'Social Media Specialist', company: 'Kopi Nusa', field: 'Pemasaran & Penjualan', type: 'Paruh waktu', mode: 'Remote', city: 'Di mana saja', skills: ['Media sosial', 'Copywriting'], pay: 'Rp3 - 4 juta', payMin: 3, pop: 7, posted: 2, applicants: 61, about: 'Mengelola akun media sosial jaringan kedai kopi dan membangun komunitas pelanggan yang aktif.' },
    { id: 17, title: 'Perawat Klinik', company: 'Klinik Sehat Bersama', field: 'Kesehatan', type: 'Penuh waktu', mode: 'Di kantor', city: 'Surabaya', skills: ['Pelayanan pasien', 'Pertolongan pertama'], pay: 'Rp5 - 7 juta', payMin: 5, pop: 4, posted: 11, applicants: 19, about: 'Memberikan pelayanan keperawatan dasar di klinik rawat jalan dengan jam kerja yang teratur.' },
    { id: 18, title: 'Data Science Intern', company: 'Laboratorium Data Nusantara', field: 'Riset & Sains', type: 'Magang', mode: 'Hybrid', city: 'Jakarta', skills: ['Python', 'Statistik', 'Analisis data'], pay: 'Rp3 - 4 juta', payMin: 3, pop: 7, posted: 5, applicants: 82, about: 'Belajar membangun model prediksi pada data nyata bersama tim data science yang suportif.' }
  ];

  // Lowongan tambahan (dibangkitkan dari daftar ringkas) supaya paginasi terasa nyata: 54 lowongan.
  [
    ['Backend Developer Intern', 'Inovasi Teknologi Nusa', 'Teknologi & IT', 'Magang', 'Remote', 'Di mana saja', ['Node.js', 'SQL', 'Git'], 'Rp3 - 4 juta', 3],
    ['Mobile Developer', 'Aplikasi Karya Bangsa', 'Teknologi & IT', 'Penuh waktu', 'Hybrid', 'Jakarta', ['Flutter', 'Dart', 'Git'], 'Rp8 - 13 juta', 8],
    ['QA Engineer', 'Pixel Perfect Studio', 'Teknologi & IT', 'Kontrak', 'Hybrid', 'Bandung', ['Pengujian perangkat lunak', 'Selenium'], 'Rp6 - 9 juta', 6],
    ['DevOps Engineer', 'Cloud Nusantara', 'Teknologi & IT', 'Penuh waktu', 'Remote', 'Di mana saja', ['Docker', 'Linux', 'CI/CD'], 'Rp12 - 18 juta', 12],
    ['IT Support', 'Rumah Sakit Pelita', 'Teknologi & IT', 'Penuh waktu', 'Di kantor', 'Semarang', ['Jaringan', 'Troubleshooting'], 'Rp4 - 6 juta', 4],
    ['Product Designer', 'Dompet Digital Kita', 'Desain & Kreatif', 'Penuh waktu', 'Hybrid', 'Jakarta', ['Figma', 'Prototyping', 'Riset pengguna'], 'Rp9 - 14 juta', 9],
    ['Motion Graphic Intern', 'Studio Gerak', 'Desain & Kreatif', 'Magang', 'Di kantor', 'Bandung', ['After Effects', 'Ilustrasi'], 'Rp1,5 - 2,5 juta', 1.5],
    ['Videografer', 'Kreasi Visual', 'Desain & Kreatif', 'Kontrak', 'Di kantor', 'Yogyakarta', ['Videografi', 'Adobe Premiere'], 'Rp5 - 7 juta', 5],
    ['Akuntan Junior', 'KAP Sejahtera', 'Keuangan & Akuntansi', 'Penuh waktu', 'Di kantor', 'Surabaya', ['Akuntansi', 'Microsoft Excel', 'Perpajakan'], 'Rp5 - 7 juta', 5],
    ['Financial Analyst', 'Investama Prima', 'Keuangan & Akuntansi', 'Penuh waktu', 'Hybrid', 'Jakarta', ['Pemodelan keuangan', 'Microsoft Excel'], 'Rp9 - 13 juta', 9],
    ['Staf Pajak', 'Konsultan Pajak Mandiri', 'Keuangan & Akuntansi', 'Magang', 'Di kantor', 'Medan', ['Perpajakan', 'Microsoft Excel'], 'Rp2 - 3 juta', 2],
    ['Sales Executive', 'Distribusi Maju Jaya', 'Pemasaran & Penjualan', 'Penuh waktu', 'Di kantor', 'Medan', ['Negosiasi', 'Penjualan'], 'Rp4 - 8 juta', 4],
    ['Brand Strategist', 'Agensi Citra', 'Pemasaran & Penjualan', 'Penuh waktu', 'Hybrid', 'Jakarta', ['Strategi merek', 'Riset pasar'], 'Rp8 - 12 juta', 8],
    ['E-commerce Specialist', 'Belanja Mudah', 'Pemasaran & Penjualan', 'Kontrak', 'Remote', 'Di mana saja', ['Marketplace', 'Analisis penjualan'], 'Rp5 - 8 juta', 5],
    ['Apoteker Pendamping', 'Apotek Sehat Sentosa', 'Kesehatan', 'Penuh waktu', 'Di kantor', 'Bandung', ['Farmasi klinis', 'Pelayanan pasien'], 'Rp6 - 8 juta', 6],
    ['Ahli Gizi', 'Klinik Gizi Prima', 'Kesehatan', 'Kontrak', 'Di kantor', 'Jakarta', ['Gizi klinis', 'Konseling'], 'Rp5 - 7 juta', 5],
    ['Dosen Tamu', 'Politeknik Mandiri', 'Pendidikan & Pelatihan', 'Paruh waktu', 'Hybrid', 'Surabaya', ['Pengajaran', 'Penyusunan kurikulum'], 'Rp3 - 5 juta', 3],
    ['Instruktur Pelatihan', 'Akademi Kerja Pintar', 'Pendidikan & Pelatihan', 'Kontrak', 'Remote', 'Di mana saja', ['Public speaking', 'Desain pembelajaran'], 'Rp4 - 6 juta', 4],
    ['Tutor Bahasa Inggris', 'Bimbel Cerdas', 'Pendidikan & Pelatihan', 'Paruh waktu', 'Di kantor', 'Yogyakarta', ['Bahasa Inggris', 'Pengajaran'], 'Rp2 - 3 juta', 2],
    ['Maintenance Engineer', 'PT Baja Perkasa', 'Teknik & Manufaktur', 'Penuh waktu', 'Di kantor', 'Semarang', ['Perawatan mesin', 'K3'], 'Rp6 - 9 juta', 6],
    ['Drafter Teknik', 'Konstruksi Andal', 'Teknik & Manufaktur', 'Kontrak', 'Di kantor', 'Surabaya', ['AutoCAD', 'Gambar teknik'], 'Rp4 - 6 juta', 4],
    ['Production Planner', 'Pabrik Pangan Nusantara', 'Teknik & Manufaktur', 'Penuh waktu', 'Di kantor', 'Bandung', ['Perencanaan produksi', 'SAP'], 'Rp6 - 8 juta', 6],
    ['Paralegal', 'Firma Hukum Pratama', 'Hukum & Pemerintahan', 'Magang', 'Di kantor', 'Jakarta', ['Riset hukum', 'Penyusunan kontrak'], 'Rp2 - 3 juta', 2],
    ['Analis Kebijakan', 'Lembaga Kajian Publik', 'Hukum & Pemerintahan', 'Kontrak', 'Hybrid', 'Yogyakarta', ['Analisis kebijakan', 'Penulisan ilmiah'], 'Rp5 - 7 juta', 5],
    ['Tour Consultant', 'Wisata Nusantara', 'Hospitality & Pariwisata', 'Penuh waktu', 'Di kantor', 'Denpasar', ['Layanan pelanggan', 'Bahasa Inggris'], 'Rp4 - 6 juta', 4],
    ['Barista Trainee', 'Kopi Senja', 'Hospitality & Pariwisata', 'Magang', 'Di kantor', 'Yogyakarta', ['Layanan pelanggan', 'Kerja tim'], 'Rp1,5 - 2 juta', 1.5],
    ['Event Coordinator', 'Pesta Rakyat Organizer', 'Hospitality & Pariwisata', 'Kontrak', 'Hybrid', 'Denpasar', ['Manajemen acara', 'Negosiasi'], 'Rp5 - 7 juta', 5],
    ['Warehouse Supervisor', 'Gudang Sentral', 'Logistik & Rantai Pasok', 'Penuh waktu', 'Di kantor', 'Surabaya', ['Manajemen gudang', 'Microsoft Excel'], 'Rp6 - 8 juta', 6],
    ['Procurement Staff', 'Pengadaan Bersama', 'Logistik & Rantai Pasok', 'Kontrak', 'Hybrid', 'Jakarta', ['Pengadaan', 'Negosiasi', 'SAP'], 'Rp5 - 7 juta', 5],
    ['Jurnalis Muda', 'Warta Kampus', 'Media & Komunikasi', 'Magang', 'Hybrid', 'Jakarta', ['Penulisan berita', 'Wawancara'], 'Rp2 - 3 juta', 2],
    ['Public Relations Officer', 'Komunikasi Prima', 'Media & Komunikasi', 'Penuh waktu', 'Hybrid', 'Bandung', ['Hubungan media', 'Penulisan konten'], 'Rp5 - 8 juta', 5],
    ['Podcast Producer', 'Suara Muda', 'Media & Komunikasi', 'Freelance', 'Remote', 'Di mana saja', ['Penyuntingan audio', 'Penulisan konten'], 'Per proyek', 0],
    ['Lab Analyst', 'Laboratorium Mutu Indonesia', 'Riset & Sains', 'Penuh waktu', 'Di kantor', 'Bandung', ['Analisis laboratorium', 'Statistik'], 'Rp5 - 7 juta', 5],
    ['Bioinformatics Intern', 'Institut Genomika', 'Riset & Sains', 'Magang', 'Hybrid', 'Jakarta', ['Python', 'Biostatistik'], 'Rp2 - 3 juta', 2],
    ['UX Researcher', 'Studio Kreatif Kita', 'Desain & Kreatif', 'Paruh waktu', 'Remote', 'Di mana saja', ['Riset pengguna', 'Wawancara'], 'Rp4 - 6 juta', 4],
    ['Customer Success', 'Teknologi Cakra', 'Teknologi & IT', 'Penuh waktu', 'Hybrid', 'Jakarta', ['Layanan pelanggan', 'SQL'], 'Rp6 - 9 juta', 6]
  ].forEach(function (t, i) {
    var id = 19 + i;
    JOBS.push({
      id: id, title: t[0], company: t[1], field: t[2], type: t[3], mode: t[4], city: t[5], skills: t[6], pay: t[7], payMin: t[8],
      pop: 4 + (id * 5) % 6, posted: 1 + (id * 7) % 14, applicants: 12 + (id * 37) % 90,
      about: t[1] + ' membuka posisi ' + t[0] + ' untuk kamu yang ingin berkembang di bidang ' + t[2].toLowerCase() + '.'
    });
  });

  // Uraian per bidang untuk halaman detail lowongan (contoh).
  var FIELD_TEXT = {
    'Teknologi & IT': { tasks: ['Membangun dan merawat fitur sesuai kebutuhan produk', 'Menulis kode yang rapi, teruji, dan mudah dibaca', 'Berdiskusi rutin dengan desainer dan tim produk'], reqs: ['Mahasiswa tingkat akhir atau lulusan Teknik Informatika/Sistem Informasi', 'Terbiasa membaca dokumentasi dan belajar mandiri'] },
    'Desain & Kreatif': { tasks: ['Menerjemahkan brief menjadi konsep visual', 'Menyiapkan aset desain untuk berbagai kanal', 'Menerima dan mengolah masukan dari tim dan klien'], reqs: ['Memiliki portofolio yang bisa dilihat', 'Peka terhadap detail, tipografi, dan tata letak'] },
    'Keuangan & Akuntansi': { tasks: ['Menyiapkan laporan berkala dengan data yang akurat', 'Memeriksa kewajaran angka dan melaporkan selisih', 'Mendukung tim dalam proses audit dan evaluasi'], reqs: ['Lulusan Akuntansi, Manajemen, Statistika, atau bidang terkait', 'Teliti dan nyaman bekerja dengan angka'] },
    'Pemasaran & Penjualan': { tasks: ['Merencanakan dan menjalankan kampanye pemasaran', 'Memantau performa kampanye dan menyusun laporannya', 'Mencari ide konten dan promosi yang relevan'], reqs: ['Memahami perilaku audiens di media sosial', 'Mampu menulis dengan gaya yang menarik'] },
    'Kesehatan': { tasks: ['Melayani pasien dengan ramah dan sesuai prosedur', 'Mencatat data pelayanan secara lengkap dan rapi', 'Menjaga kebersihan dan keselamatan area kerja'], reqs: ['Memiliki latar belakang kesehatan atau administrasi', 'Bersedia bekerja dengan jadwal bergilir'] },
    'Pendidikan & Pelatihan': { tasks: ['Mendampingi kegiatan belajar mengajar di kelas', 'Menyiapkan bahan ajar dan alat peraga', 'Melaporkan perkembangan siswa kepada guru utama'], reqs: ['Sabar, komunikatif, dan menyukai dunia anak atau remaja', 'Mahasiswa atau lulusan kependidikan lebih diutamakan'] },
    'Teknik & Manufaktur': { tasks: ['Memeriksa produk dan proses sesuai standar mutu', 'Mencatat temuan dan mengusulkan perbaikan', 'Menerapkan prosedur keselamatan kerja di lini produksi'], reqs: ['Lulusan Teknik Industri, Mesin, atau bidang terkait', 'Bersedia ditempatkan di area pabrik'] },
    'Hukum & Pemerintahan': { tasks: ['Menyusun dan meninjau draf dokumen hukum', 'Meriset peraturan dan putusan yang relevan', 'Mengarsipkan berkas perkara dengan tertib'], reqs: ['Lulusan Ilmu Hukum', 'Terbiasa menulis dengan bahasa yang baku dan runtut'] },
    'Hospitality & Pariwisata': { tasks: ['Menyambut dan melayani tamu dengan ramah', 'Menangani reservasi, check-in, dan check-out', 'Menindaklanjuti keluhan tamu dengan cepat'], reqs: ['Berpenampilan rapi dan komunikatif', 'Bersedia bekerja dengan jadwal bergilir'] },
    'Logistik & Rantai Pasok': { tasks: ['Memantau stok dan pergerakan barang', 'Berkoordinasi dengan gudang, pemasok, dan kurir', 'Menyusun laporan pengiriman mingguan'], reqs: ['Lulusan Logistik, Teknik Industri, atau Manajemen', 'Teliti dan terbiasa bekerja dengan tenggat'] },
    'Media & Komunikasi': { tasks: ['Menulis dan menyunting konten sesuai panduan gaya', 'Mengusulkan topik yang sedang dicari pembaca', 'Memeriksa fakta dan sumber sebelum terbit'], reqs: ['Memiliki contoh tulisan atau portofolio', 'Mampu bekerja dengan tenggat yang jelas'] },
    'Riset & Sains': { tasks: ['Mengumpulkan dan membersihkan data penelitian', 'Menjalankan analisis dan mencatat hasilnya', 'Menyusun ringkasan temuan untuk tim peneliti'], reqs: ['Mahasiswa tingkat akhir atau lulusan sains, statistika, atau bidang terkait', 'Teliti dan terbiasa mendokumentasikan pekerjaan'] }
  };

  // Lamaran contoh. `sent` = hari sejak dikirim, `upd` = hari sejak pembaruan terakhir. Lamaran yang dikirim dari portal ditambahkan di atasnya.
  var SAMPLE_APPLIED = [
    { id: 3, status: 'Wawancara', sent: 7, upd: 2, interviewIn: 3 },
    { id: 2, status: 'Diproses', sent: 5, upd: 3 },
    { id: 13, status: 'Terkirim', sent: 2, upd: 2 },
    { id: 11, status: 'Diterima', sent: 21, upd: 4 },
    { id: 4, status: 'Ditolak', sent: 34, upd: 20 },
    { id: 8, status: 'Ditolak', sent: 48, upd: 30 },
    { id: 16, status: 'Diterima', sent: 66, upd: 40 },
    { id: 7, status: 'Ditolak', sent: 90, upd: 70 },
    { id: 9, status: 'Ditolak', sent: 125, upd: 100 },
    { id: 20, status: 'Diproses', sent: 10, upd: 6 },
    { id: 24, status: 'Wawancara', sent: 9, upd: 4, interviewIn: 5 },
    { id: 31, status: 'Terkirim', sent: 3, upd: 3 },
    { id: 27, status: 'Ditolak', sent: 60, upd: 45 }
  ];
  var STATUSES = [
    { key: 'Terkirim', badge: 'badge-info', step: 0 },
    { key: 'Diproses', badge: 'badge-warning', step: 1 },
    { key: 'Wawancara', badge: 'badge-primary', step: 2 },
    { key: 'Diterima', badge: 'badge-success', step: 3 },
    { key: 'Ditolak', badge: 'badge-danger', step: 3 }
  ];
  var STEPS = ['Terkirim', 'Diproses', 'Wawancara', 'Keputusan'];

  function jobById(id) { return JOBS.filter(function (j) { return j.id === id; })[0]; }
  function statusOf(key) { return STATUSES.filter(function (s) { return s.key === key; })[0] || STATUSES[0]; }

  // ---- siapa yang masuk dan apa jawaban onboarding-nya
  var user = read(USER_KEY, null) || {};
  var saved0 = read(STORE_KEY, null);
  var prefs = {
    interests: (saved0 && saved0.interests) || [],
    jobTypes: (saved0 && saved0.jobTypes) || [],
    workModes: (saved0 && saved0.workModes) || [],
    locations: (saved0 && saved0.locations) || [],
    skills: (saved0 && saved0.skills) || []
  };
  var onboarded = !!(saved0 && saved0.completedAt);
  var hasOnb = !!(prefs.interests.length || prefs.jobTypes.length || prefs.workModes.length || prefs.locations.length || prefs.skills.length);

  // ---- hasil tes minat (RIASEC) = jalur kedua rekomendasi lowongan, selain jawaban onboarding.
  // Tersimpan di localStorage (kk_portal_tests): { riasec: { attempts:[{ id, at, answers, scores, code, minutes }], draft, active } }.
  // Pengerjaan yang dipilih sebagai acuan (active, bawaan = terbaru) menentukan kode Holland 3 huruf yang dipakai untuk menilai tiap bidang.
  var TESTS_KEY = 'kk_portal_tests';
  var testStore = read(TESTS_KEY, {});
  // Huruf RIASEC yang paling khas untuk tiap bidang, dari yang terkuat.
  var RIASEC_FIELD = {
    'Teknologi & IT': ['I', 'R', 'C'], 'Desain & Kreatif': ['A', 'E', 'I'], 'Keuangan & Akuntansi': ['C', 'E', 'I'],
    'Pemasaran & Penjualan': ['E', 'A', 'S'], 'Kesehatan': ['S', 'I', 'R'], 'Pendidikan & Pelatihan': ['S', 'A', 'E'],
    'Teknik & Manufaktur': ['R', 'I', 'C'], 'Hukum & Pemerintahan': ['E', 'S', 'C'], 'Hospitality & Pariwisata': ['S', 'E', 'C'],
    'Logistik & Rantai Pasok': ['C', 'R', 'E'], 'Media & Komunikasi': ['A', 'S', 'E'], 'Riset & Sains': ['I', 'R', 'A']
  };
  function riasecState() { return testStore.riasec || (testStore.riasec = { attempts: [], draft: null, active: null }); }
  function activeAttempt() {
    var st = testStore.riasec;
    if (!st || !st.attempts.length) return null;
    return st.attempts.filter(function (a) { return a.id === st.active; })[0] || st.attempts[st.attempts.length - 1];
  }
  // Kecocokan 0..1 antara kode pengguna (mis. "IAS") dan bidang: huruf yang sama di posisi yang sama bernilai penuh, di posisi lain 0,6.
  function riasecFit(field, code) {
    var f = RIASEC_FIELD[field], w = [3, 2, 1], t = 0;
    if (!f || !code) return 0;
    for (var i = 0; i < 3; i++) { var at = f.indexOf(code.charAt(i)); if (at === i) t += w[i]; else if (at !== -1) t += w[i] * 0.6; }
    return t / 6;
  }
  var riasecCode = (activeAttempt() || {}).code || '';
  var hasPrefs = hasOnb || !!riasecCode;
  var savedIds = read(SAVED_KEY, []);
  var applied = read(APPLIED_KEY, []); // [{ id, at }]

  function score(job) {
    var s = 0, why = [];
    if (prefs.interests.indexOf(job.field) !== -1) { s += 45; why.push('bidang'); }
    if (prefs.jobTypes.indexOf(job.type) !== -1) { s += 20; why.push('jenis pekerjaan'); }
    if (prefs.workModes.indexOf(job.mode) !== -1) { s += 10; why.push('model kerja'); }
    if (prefs.locations.indexOf(job.city) !== -1 || prefs.locations.indexOf('Di mana saja') !== -1 || (job.mode === 'Remote' && prefs.locations.length)) { s += 10; why.push('lokasi'); }
    var mine = prefs.skills.map(function (x) { return x.toLowerCase(); });
    var overlap = job.skills.filter(function (k) { return mine.indexOf(k.toLowerCase()) !== -1; }).length;
    if (overlap) { s += Math.min(15, overlap * 5); why.push('keahlian'); }
    // Dua jalur digabung: onboarding 70% + RIASEC 30%; bila hanya salah satu yang ada, jalur itu berdiri sendiri.
    var fit = riasecCode ? riasecFit(job.field, riasecCode) : 0, total = hasOnb ? Math.min(100, s) : 0;
    if (riasecCode) { total = hasOnb ? Math.round(total * 0.7 + fit * 30) : Math.round(fit * 100); if (fit >= 0.6) why.push('minat RIASEC'); }
    return { job: job, score: hasPrefs ? total : 0, why: why };
  }
  var ranked;
  function rerank() { ranked = JOBS.map(score).sort(function (a, b) { return b.score - a.score || b.job.pop - a.job.pop; }); }
  rerank();
  function rankOf(id) { return ranked.filter(function (r) { return r.job.id === id; })[0]; }

  // ---- lamaran = contoh + yang dikirim dari portal, urut dari yang terbaru diperbarui
  function allApplications() {
    var mine = applied.map(function (a) {
      var days = Math.max(0, Math.floor((Date.now() - a.at) / DAY));
      return { id: a.id, status: 'Terkirim', sent: days, upd: days, mine: true };
    });
    return mine.concat(SAMPLE_APPLIED).map(function (a) {
      return { id: a.id, job: jobById(a.id), status: a.status, sent: a.sent, upd: a.upd, interviewIn: a.interviewIn, mine: !!a.mine };
    }).filter(function (a) { return a.job; }).sort(function (a, b) { return a.upd - b.upd || a.sent - b.sent; });
  }
  function hasApplied(id) {
    return applied.some(function (a) { return a.id === id; }) || SAMPLE_APPLIED.some(function (a) { return a.id === id; });
  }
  function isActive(a) { return a.status === 'Terkirim' || a.status === 'Diproses' || a.status === 'Wawancara'; }

  // Riwayat per lamaran: satu peristiwa untuk tiap tahap yang sudah dilewati.
  function history(app) {
    var stage = statusOf(app.status).step;
    var rows = [];
    for (var k = 0; k <= stage; k++) {
      var ago = stage === 0 ? app.sent : Math.round(app.sent - (app.sent - app.upd) * k / stage);
      var title, body;
      if (k === 0) { title = 'Lamaran terkirim'; body = 'Lamaranmu sudah diterima ' + app.job.company + '.'; }
      else if (k === 1) { title = 'Lamaran sedang ditinjau'; body = 'Tim rekrutmen memeriksa profil dan keahlianmu.'; }
      else if (k === 2) { title = 'Lolos ke tahap wawancara'; body = 'Kamu dipilih untuk berbincang langsung dengan tim ' + app.job.company + '.'; }
      else if (app.status === 'Diterima') { title = 'Selamat, kamu diterima'; body = app.job.company + ' menawarkan posisi ' + app.job.title + ' kepadamu.'; }
      else { title = 'Belum lolos kali ini'; body = 'Terima kasih sudah melamar. Masih banyak lowongan lain yang cocok untukmu.'; }
      rows.push({ ago: Math.max(0, ago), title: title, body: body, step: k });
    }
    return rows.reverse();
  }

  function detailOf(job) {
    var t = FIELD_TEXT[job.field] || FIELD_TEXT['Teknologi & IT'];
    var perks = job.type === 'Magang'
      ? ['Sertifikat magang dan surat rekomendasi', 'Mentor yang membimbing langsung', 'Peluang diangkat menjadi karyawan']
      : ['BPJS Kesehatan dan Ketenagakerjaan', 'Jenjang karier yang jelas', 'Pelatihan dan pengembangan keahlian'];
    var sizes = ['11 - 50 karyawan', '51 - 200 karyawan', '201 - 500 karyawan', '501 - 1.000 karyawan', 'Lebih dari 1.000 karyawan'];
    return {
      tasks: t.tasks,
      reqs: t.reqs.concat(['Menguasai ' + job.skills.join(', ')]),
      perks: perks,
      size: sizes[job.id % sizes.length],
      founded: 1998 + (job.id * 3) % 24,
      deadline: Math.max(2, 14 - job.posted)
    };
  }

  // Kelengkapan profil dari jawaban onboarding.
  function profile() {
    var steps = [
      { label: 'Akun dibuat', done: true },
      { label: 'Bidang minat', done: prefs.interests.length > 0 },
      { label: 'Preferensi kerja', done: !!(prefs.jobTypes.length || prefs.workModes.length || prefs.locations.length) },
      { label: 'Keahlian', done: prefs.skills.length > 0 }
    ];
    return { steps: steps, pct: Math.round(steps.filter(function (s) { return s.done; }).length / steps.length * 100) };
  }

  // ---- tindakan: simpan dan lamar
  function toggleSave(id) {
    var at = savedIds.indexOf(id);
    if (at === -1) savedIds.push(id); else savedIds.splice(at, 1);
    write(SAVED_KEY, savedIds);
    return at === -1;
  }
  function isSaved(id) { return savedIds.indexOf(id) !== -1; }
  function apply(id) {
    if (hasApplied(id)) return false;
    applied.push({ id: id, at: Date.now() });
    write(APPLIED_KEY, applied);
    return true;
  }
  function toast(type, message) {
    if (window.KKToast) window.KKToast.show({ type: type, message: message });
  }

  /* ==========================================================================
     Lapisan data (API). Halaman tidak pernah membaca JOBS langsung: semua lewat fungsi di bawah yang
     mengembalikan Promise, meniru server (jeda jaringan, paginasi, penyaringan di sisi server).
     Untuk memakai server sungguhan cukup mengganti isi fungsi ini dengan fetch(); halaman tidak berubah.

       GET  /api/jobs?q&bidang&kota&jenis&mode&saved&urut=cocok|terbaru|gaji&page&pageSize
            -> { items:[{ job, score, why }], total, page, pageSize, pages }
       GET  /api/jobs/:id                      -> { rank, detail, applied, similar:[rank] }   (dimuat saat lowongan dipilih)
       GET  /api/jobs/facets                   -> { total, fields:{ bidang: jumlah } }        (cache, jarang berubah)
       GET  /api/applications?status&q&active&page&pageSize
            -> { items, total, page, pageSize, pages, counts:{ all, Terkirim, ... } }
       GET  /api/applications/:id              -> { app }
       POST /api/jobs/:id/apply  { note }      -> { ok }
       PUT/DELETE /api/jobs/:id/save           -> { saved }  (UI memperbarui tombol lebih dulu, lalu menyelaraskan)
     Tambahkan ?galat=1 di URL halaman untuk mencoba tampilan gagal-muat (permintaan pertama ditolak sekali).
     ========================================================================== */
  var failOnce = /[?&]galat=1/.test(location.search);
  function simulate(fn, ms) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        if (failOnce) { failOnce = false; reject(new Error('Koneksi terputus')); return; }
        try { resolve(fn()); } catch (e) { reject(e); }
      }, ms == null ? 260 + Math.random() * 240 : ms);
    });
  }
  function paginate(list, page, size) {
    var pages = Math.max(1, Math.ceil(list.length / size));
    var p = Math.min(Math.max(parseInt(page, 10) || 1, 1), pages);
    return { items: list.slice((p - 1) * size, p * size), total: list.length, page: p, pageSize: size, pages: pages };
  }
  var api = {
    listJobs: function (o) {
      o = o || {};
      return simulate(function () {
        var q = (o.q || '').trim().toLowerCase();
        var list = ranked.filter(function (r) {
          var j = r.job;
          if (o.bidang && j.field !== o.bidang) return false;
          if (o.kota && j.city !== o.kota && j.city !== 'Di mana saja') return false;
          if (o.jenis && j.type !== o.jenis) return false;
          if (o.mode && j.mode !== o.mode) return false;
          if (o.saved && !isSaved(j.id)) return false;
          if (q && (j.title + ' ' + j.company + ' ' + j.field + ' ' + j.city + ' ' + j.skills.join(' ')).toLowerCase().indexOf(q) === -1) return false;
          return true;
        });
        if (o.sort === 'terbaru') list = list.slice().sort(function (a, b) { return a.job.posted - b.job.posted || a.job.id - b.job.id; });
        if (o.sort === 'gaji') list = list.slice().sort(function (a, b) { return b.job.payMin - a.job.payMin || a.job.id - b.job.id; });
        return paginate(list, o.page, o.pageSize || 8);
      });
    },
    getJob: function (id) {
      return simulate(function () {
        var r = rankOf(id);
        if (!r) throw new Error('Lowongan tidak ditemukan');
        return {
          rank: r, detail: detailOf(r.job), applied: hasApplied(id),
          similar: ranked.filter(function (x) { return x.job.field === r.job.field && x.job.id !== id; }).slice(0, 3)
        };
      });
    },
    facets: function () {
      return simulate(function () {
        var fields = {};
        Object.keys(FIELDS).forEach(function (f) { fields[f] = JOBS.filter(function (j) { return j.field === f; }).length; });
        return { total: JOBS.length, fields: fields };
      }, 180);
    },
    listApplications: function (o) {
      o = o || {};
      return simulate(function () {
        var q = (o.q || '').trim().toLowerCase();
        var base = allApplications().filter(function (a) { return !q || (a.job.title + ' ' + a.job.company).toLowerCase().indexOf(q) !== -1; });
        var counts = { all: base.length };
        STATUSES.forEach(function (s) { counts[s.key] = base.filter(function (a) { return a.status === s.key; }).length; });
        counts.active = base.filter(isActive).length;
        var list = base.filter(function (a) { return (!o.status || a.status === o.status) && (!o.active || isActive(a)); });
        var res = paginate(list, o.page, o.pageSize || 6);
        res.counts = counts;
        return res;
      });
    },
    getApplication: function (id) {
      return simulate(function () {
        var a = allApplications().filter(function (x) { return x.id === id; })[0];
        if (!a) throw new Error('Lamaran tidak ditemukan');
        return { app: a };
      });
    },
    applyJob: function (id) {
      return simulate(function () { return { ok: apply(id) }; }, 700);
    }
  };

  // Penjaga respons usang: ambil token sebelum meminta, abaikan hasilnya bila sudah ada permintaan yang lebih baru.
  function latest() {
    var n = 0;
    return function () { var mine = ++n; return function () { return mine === n; }; };
  }
  function debounce(fn, ms) {
    var t;
    return function () { var args = arguments, self = this; clearTimeout(t); t = setTimeout(function () { fn.apply(self, args); }, ms); };
  }

  // ---- potongan HTML yang dipakai bersama
  function icon(name, cls) { return '<i class="kk kk-' + name + ' ' + (cls || 'h-4 w-4') + '" aria-hidden="true"></i>'; }

  function saveButton(id, cls) {
    var on = isSaved(id);
    return '<button type="button" class="' + (cls || 'flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-slate-500 transition-colors hover:text-primary-600') + '" data-save="' + id + '" aria-pressed="' + on + '" aria-label="' + (on ? 'Lepas simpanan' : 'Simpan lowongan') + '">' +
      icon('bookmark-simple', 'h-[18px] w-[18px] ' + (on ? 'kk-fill text-primary-600' : '')) + '</button>';
  }
  function logo(job, size) {
    return '<span class="flex ' + (size || 'h-11 w-11 text-sm') + ' shrink-0 items-center justify-center rounded-xl font-bold ' + tintOf(job).logo + '" aria-hidden="true">' + esc(initials(job.company)) + '</span>';
  }
  function tag(text, cls) {
    return '<span class="' + (cls || 'rounded-full border border-slate-900/10 px-2.5 py-0.5 text-xs text-slate-600') + '">' + esc(text) + '</span>';
  }
  function matchText(r) {
    return hasPrefs && r.score > 0 ? '<span class="font-semibold text-primary-600">' + r.score + '% cocok</span>' : '<span>' + esc(r.job.city) + '</span>';
  }

  // Kartu lowongan berlatar pastel (beranda).
  function jobCard(r, pick) {
    var j = r.job;
    return '<article class="relative flex flex-col rounded-2xl border border-border/70 bg-surface p-2 shadow-card transition-shadow hover:shadow-card-lg" data-job="' + j.id + '">' +
      '<div class="flex flex-1 flex-col rounded-xl p-4 ' + tintOf(j).soft + '">' +
        '<div class="flex items-start justify-between gap-2">' +
          '<span class="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700">' + when(j.posted) + '</span>' +
          saveButton(j.id, pick ? 'relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-slate-500 transition-colors hover:text-primary-600' : null) +
        '</div>' +
        '<div class="mt-5 flex items-start justify-between gap-3">' +
          '<div class="min-w-0"><p class="truncate text-xs text-slate-500">' + esc(j.company) + '</p>' +
          '<h3 class="mt-1 font-display text-lg font-semibold leading-snug text-slate-900">' + (pick ? '<button type="button" class="text-left after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-primary-500" data-pick="' + j.id + '">' + esc(j.title) + '</button>' : esc(j.title)) + '</h3></div>' +
          logo(j, 'h-11 w-11 bg-white text-sm') +
        '</div>' +
        '<div class="mt-4 flex flex-wrap gap-1.5">' + tag(j.type) + tag(j.mode) + tag(j.city) + '</div>' +
      '</div>' +
      '<div class="flex items-center justify-between gap-3 px-3 pb-2 pt-3.5">' +
        '<div class="min-w-0"><p class="truncate text-sm font-semibold leading-5 text-slate-900">' + esc(j.pay) + '</p><p class="mt-0.5 flex h-4 items-center text-xs text-slate-400">' + (hasApplied(j.id) ? '<span class="inline-flex items-center gap-1 font-medium text-success-700">' + icon('check', 'h-3 w-3') + 'Sudah dilamar</span>' : matchText(r)) + '</p></div>' +
        (pick ? '<span class="btn-primary btn-sm shrink-0" aria-hidden="true">Lihat Detail</span>' : '<a href="lowongan.html?id=' + j.id + '" class="btn-primary btn-sm shrink-0">Detail</a>') +
      '</div></article>';
  }

  // Baris kompak untuk daftar lowongan (halaman lowongan).
  function jobRow(r, selected, noMatch, flat) {
    var j = r.job;
    var mutedTag = 'rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600';
    return '<article class="relative rounded-2xl border p-4 ' + (flat ? '' : 'shadow-card ') + 'transition-shadow ' + (selected ? 'border-primary-500 bg-primary-50/40 shadow-none ring-1 ring-primary-500' : 'border-border bg-surface hover:border-primary-200 ' + (flat ? '' : ' hover:shadow-card-lg')) + '">' +
      '<div class="flex items-start gap-3">' + logo(j) +
        '<div class="min-w-0 flex-1"><h3 class="text-sm font-semibold text-slate-900"><button type="button" class="block w-full truncate text-left after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-primary-500" data-pick="' + j.id + '" aria-current="' + (selected ? 'true' : 'false') + '">' + esc(j.title) + '</button></h3>' +
        '<p class="mt-0.5 truncate text-xs text-slate-500">' + esc(j.company) + ' &middot; ' + esc(j.city) + '</p></div>' +
        saveButton(j.id, 'relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-primary-600') +
      '</div>' +
      '<div class="mt-3 flex flex-wrap items-center gap-1.5">' + tag(j.type, mutedTag) + tag(j.mode, mutedTag) +
        (!noMatch && hasPrefs && r.score > 0 ? tag(r.score + '% cocok', 'rounded-md bg-primary-50 px-2 py-0.5 text-xs font-semibold text-primary-700') : '') +
'</div>' +
      '<div class="mt-3 flex items-center justify-between gap-2 text-xs"><span class="font-semibold text-slate-800">' + esc(j.pay) + '</span>' +
        '<span class="flex items-center gap-1.5 text-slate-400">' + (hasApplied(j.id) ? '<span class="inline-flex items-center gap-1 rounded-full bg-success-50 px-2 py-0.5 text-[11px] font-semibold text-success-700">' + icon('check', 'h-3 w-3') + 'Sudah dilamar</span>' : j.posted <= 2 ? '<span class="rounded-full bg-success-50 px-2 py-0.5 text-[11px] font-semibold text-success-700">Baru</span>' : '') + when(j.posted) + '</span></div></article>';
  }

  // Penanda tahap lamaran: 4 segmen, terisi sampai tahap sekarang.
  function stageBar(app) {
    var st = statusOf(app.status);
    var bad = app.status === 'Ditolak';
    var out = '<div class="flex gap-1" role="img" aria-label="Tahap ' + (st.step + 1) + ' dari 4: ' + esc(app.status) + '">';
    for (var i = 0; i < 4; i++) {
      var on = i <= st.step;
      out += '<span class="h-1.5 flex-1 rounded-full ' + (on ? (bad && i === 3 ? 'bg-danger-400' : (app.status === 'Diterima' && i === 3 ? 'bg-success-500' : 'bg-primary-600')) : 'bg-neutral-200') + '"></span>';
    }
    return out + '</div>';
  }

  // ---- keadaan memuat, kosong, dan gagal
  function sk(cls) { return '<span class="block animate-pulse rounded-md bg-neutral-200 ' + cls + '"></span>'; }
  function skeletonRows(n) {
    var out = '<div role="status" aria-label="Memuat" class="space-y-3">';
    for (var i = 0; i < n; i++) {
      out += '<div class="rounded-2xl border border-border/70 bg-surface p-4"><div class="flex items-start gap-3">' + sk('h-11 w-11 shrink-0 rounded-xl') +
        '<div class="flex-1 space-y-2 pt-1">' + sk('h-3.5 w-3/4') + sk('h-3 w-1/2') + '</div></div>' +
        '<div class="mt-4 flex gap-2">' + sk('h-5 w-16') + sk('h-5 w-14') + '</div>' +
        '<div class="mt-4 flex justify-between">' + sk('h-3 w-20') + sk('h-3 w-14') + '</div></div>';
    }
    return out + '<span class="sr-only">Memuat...</span></div>';
  }
  function skeletonCards(n) {
    var out = '';
    for (var i = 0; i < n; i++) {
      out += '<div class="rounded-2xl border border-border/70 bg-surface p-2" aria-hidden="true"><div class="rounded-xl bg-neutral-50 p-4">' +
        '<div class="flex justify-between">' + sk('h-6 w-20 rounded-full') + sk('h-9 w-9 rounded-full') + '</div>' +
        '<div class="mt-5 flex justify-between gap-3"><div class="flex-1 space-y-2">' + sk('h-3 w-1/3') + sk('h-5 w-3/4') + '</div>' + sk('h-11 w-11 rounded-xl') + '</div>' +
        '<div class="mt-4 flex gap-1.5">' + sk('h-5 w-14 rounded-full') + sk('h-5 w-14 rounded-full') + sk('h-5 w-16 rounded-full') + '</div></div>' +
        '<div class="flex items-center justify-between px-3 pb-2 pt-3.5"><div class="space-y-2">' + sk('h-3.5 w-24') + sk('h-3 w-14') + '</div>' + sk('h-8 w-16 rounded-xl') + '</div></div>';
    }
    return out;
  }
  function skeletonDetail() {
    return '<div role="status" aria-label="Memuat detail" class="p-5 sm:p-7"><div class="flex items-start gap-4">' + sk('h-14 w-14 shrink-0 rounded-xl') +
      '<div class="flex-1 space-y-3 pt-1">' + sk('h-6 w-2/3') + sk('h-3.5 w-1/3') + '<div class="flex gap-2">' + sk('h-5 w-16') + sk('h-5 w-16') + '</div></div></div>' +
      '<div class="mt-6">' + sk('h-16 w-full rounded-xl') + '</div>' +
      '<div class="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">' + sk('h-16 rounded-xl') + sk('h-16 rounded-xl') + sk('h-16 rounded-xl') + sk('h-16 rounded-xl') + '</div>' +
      '<div class="mt-8 space-y-3">' + sk('h-4 w-40') + sk('h-3 w-full') + sk('h-3 w-5/6') + sk('h-3 w-2/3') + '</div>' +
      '<div class="mt-8 space-y-3">' + sk('h-4 w-32') + sk('h-3 w-3/4') + sk('h-3 w-2/3') + sk('h-3 w-3/4') + '</div><span class="sr-only">Memuat...</span></div>';
  }
  // Keadaan kosong memakai ilustrasi empty-state (assets/illustrations/empty-state); parameter pertama = nama berkas tanpa .svg.
  function emptyBox(art, title, text, actionHtml) {
    return '<div class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface px-6 py-10 text-center"><img src="' + ROOT + 'assets/illustrations/empty-state/' + art + '.svg" alt="" class="mx-auto h-36 w-auto" />' +
      '<p class="mt-4 text-base font-semibold text-slate-800">' + esc(title) + '</p><p class="mx-auto mt-1 max-w-sm text-sm text-slate-500">' + esc(text) + '</p>' + (actionHtml ? '<div class="mt-5">' + actionHtml + '</div>' : '') + '</div>';
  }
  function errorBox(message) {
    return '<div role="alert" class="rounded-2xl border border-danger-200 bg-danger-50/50 p-8 text-center"><span class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-danger-100 text-danger-600">' + icon('seal-warning', 'h-6 w-6') + '</span>' +
      '<p class="mt-3 text-sm font-semibold text-slate-800">Data belum bisa dimuat</p><p class="mt-1 text-sm text-slate-500">' + esc(message || 'Periksa koneksimu lalu coba lagi.') + '</p>' +
      '<button type="button" class="btn-outline btn-sm mt-4" data-retry>' + icon('clock-counter-clockwise', 'h-4 w-4') + 'Coba lagi</button></div>';
  }

  // Paginasi ringkas (komponen Pagination DS). Isi `host` ulang setiap respons; dengarkan `pagination:change` pada host.
  function pager(host, res, label) {
    if (!res || !res.total) { host.innerHTML = ''; return; }
    var from = (res.page - 1) * res.pageSize + 1;
    var info = '<p class="text-center text-xs text-slate-500">Menampilkan ' + from + ' sampai ' + Math.min(res.page * res.pageSize, res.total) + ' dari ' + res.total + ' ' + esc(label) + '</p>';
    if (res.pages <= 1) { host.innerHTML = info; return; }
    host.innerHTML = '<div data-pagination data-pagination-total="' + res.pages + '" data-pagination-page="' + res.page + '" data-pagination-siblings="0" data-pagination-nav="none" class="flex flex-col items-center gap-3">' + info +
      '<div class="flex items-center justify-center gap-2">' +
        '<button type="button" class="btn-outline btn-sm w-8 px-0" data-pagination-prev aria-label="Halaman sebelumnya">' + icon('caret-left') + '</button>' +
        '<nav aria-label="Halaman"><ul class="pagination pagination-separate" data-pagination-list></ul></nav>' +
        '<button type="button" class="btn-outline btn-sm w-8 px-0" data-pagination-next aria-label="Halaman berikutnya">' + icon('caret-right') + '</button>' +
      '</div></div>';
    if (window.KKPagination) window.KKPagination.init(host);
  }

  // Aksi simpan (tombol [data-save]) untuk wadah mana pun. Tombol diperbarui di tempat (tanpa render ulang), lalu onChange dipanggil.
  function paintSave(id, on) {
    document.querySelectorAll('[data-save="' + id + '"]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(on));
      b.setAttribute('aria-label', on ? 'Lepas simpanan' : 'Simpan lowongan');
      var i = b.querySelector('i');
      if (i) { i.classList.toggle('kk-fill', on); i.classList.toggle('text-primary-600', on); }
      var l = b.querySelector('[data-save-label]');
      if (l) l.textContent = on ? 'Tersimpan' : 'Simpan';
    });
  }
  function bindSave(root, onChange) {
    root.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-save]');
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      var id = parseInt(btn.getAttribute('data-save'), 10);
      var on = toggleSave(id);
      paintSave(id, on);
      toast('success', on ? 'Lowongan disimpan.' : 'Simpanan dilepas.');
      if (onChange) onChange(id, on);
    });
  }

  // ---- komponen Combo (dropdown pilihan KarirKit): markup dibuat dari daftar opsi, perilakunya sama dengan halaman tracer study.
  // options: [[nilai, label], ...]; `all` = label untuk nilai kosong ("Semua kota"). Perubahan memicu event `combo:change` (detail.value).
  function comboHtml(o) {
    var items = [['', o.all]].concat(o.options);
    var cur = items.filter(function (i) { return i[0] === (o.value || ''); })[0] || items[0];
    return '<div id="' + o.id + '" class="combo combo-full" data-combo data-value="' + esc(cur[0]) + '">' +
      '<button type="button" class="combo-trigger ' + (o.triggerClass || '') + '" data-combo-trigger aria-haspopup="listbox" aria-expanded="false" aria-label="' + esc(o.label || o.all) + '">' +
        '<span data-combo-label class="truncate">' + esc(cur[1]) + '</span>' + icon('caret-down', 'combo-chevron') + '</button>' +
      '<div class="combo-menu ' + (o.menuClass || '') + '" data-combo-menu>' +
      (o.search ? '<div class="combo-search-wrap"><div class="combo-search-field"><span class="combo-search-icon">' + icon('magnifying-glass', 'h-4 w-4') + '</span><input type="text" class="combo-search" placeholder="' + esc(o.search) + '" aria-label="' + esc(o.search) + '" autocomplete="off" data-combo-search /></div></div>' : '') +
      '<div class="combo-list" data-combo-list role="listbox">' +
        items.map(function (i) {
          return '<button type="button" role="option" class="combo-item' + (i[0] === cur[0] ? ' is-selected' : '') + '" data-combo-item data-value="' + esc(i[0]) + '" data-label="' + esc(i[1]) + '">' + esc(i[1]) + '</button>';
        }).join('') +
      '</div>' + (o.search ? '<p class="combo-empty hidden" data-combo-empty>Tidak ada hasil yang cocok.</p>' : '') + '</div></div>';
  }
  function comboSet(root, value) {
    var found = null;
    root.querySelectorAll('[data-combo-item]').forEach(function (it) {
      var on = it.getAttribute('data-value') === value;
      it.classList.toggle('is-selected', on);
      if (on) found = it;
    });
    if (!found) return;
    root.dataset.value = value;
    root.querySelector('[data-combo-label]').textContent = found.getAttribute('data-label');
  }
  function initCombo(root) {
    if (root._kkCombo) return;
    var trigger = root.querySelector('[data-combo-trigger]');
    var menu = root.querySelector('[data-combo-menu]');
    if (!trigger || !menu) return;
    root._kkCombo = true;
    var search = menu.querySelector('[data-combo-search]');
    var emptyEl = menu.querySelector('[data-combo-empty]');
    function filterItems(q) {
      var n = 0;
      menu.querySelectorAll('[data-combo-item]').forEach(function (it) {
        var hit = !q || it.getAttribute('data-label').toLowerCase().indexOf(q) !== -1;
        it.classList.toggle('hidden', !hit);
        if (hit) n++;
      });
      if (emptyEl) emptyEl.classList.toggle('hidden', n > 0);
    }

    function place() {
      var list = menu.querySelector('[data-combo-list]');
      if (list) list.style.maxHeight = '';
      var tr = trigger.getBoundingClientRect();
      var mr = menu.getBoundingClientRect();
      var vw = document.documentElement.clientWidth, vh = document.documentElement.clientHeight;
      var below = vh - tr.bottom, above = tr.top - 84; // 84 = tinggi navbar yang menempel di atas
      var vertical = below >= mr.height + 8 || below >= above ? 'bottom' : 'top';
      // layar pendek: perkecil daftar agar menu selalu utuh terlihat (tidak terpotong tepi layar)
      var room = (vertical === 'bottom' ? below : above) - 20;
      if (list && room < mr.height) list.style.maxHeight = Math.max(96, room - 12) + 'px';
      var horizontal = vw - tr.left >= mr.width + 8 || vw - tr.left >= tr.right ? 'start' : 'end';
      menu.setAttribute('data-placement', vertical + '-' + horizontal);
    }
    function isOpen() { return menu.classList.contains('is-open'); }
    function close() {
      if (!isOpen()) return;
      menu.classList.remove('is-open');
      root.removeAttribute('data-open');
      trigger.setAttribute('aria-expanded', 'false');
      document.removeEventListener('click', outside, true);
      document.removeEventListener('keydown', onKey);
    }
    function open() {
      document.querySelectorAll('.combo-menu.is-open').forEach(function (m) { if (m !== menu) { m.classList.remove('is-open'); m.parentNode.removeAttribute('data-open'); } });
      if (search) { search.value = ''; filterItems(''); }
      place();
      menu.classList.add('is-open');
      root.setAttribute('data-open', 'true');
      trigger.setAttribute('aria-expanded', 'true');
      document.addEventListener('click', outside, true);
      document.addEventListener('keydown', onKey);
      if (search) requestAnimationFrame(function () { search.focus(); });
    }
    function outside(e) { if (!root.contains(e.target)) close(); }
    function onKey(e) { if (e.key === 'Escape') { close(); trigger.focus(); } }

    trigger.addEventListener('click', function (e) { e.stopPropagation(); if (isOpen()) close(); else open(); });
    menu.addEventListener('click', function (e) {
      var item = e.target.closest('[data-combo-item]');
      if (!item) return;
      var value = item.getAttribute('data-value') || '';
      comboSet(root, value);
      close();
      root.dispatchEvent(new CustomEvent('combo:change', { bubbles: true, detail: { value: value } }));
    });
    if (search) {
      search.addEventListener('click', function (e) { e.stopPropagation(); });
      search.addEventListener('input', function () { filterItems(search.value.trim().toLowerCase()); });
    }
    place();
  }
  function initCombos(scope) { (scope || document).querySelectorAll('[data-combo]').forEach(initCombo); }

  // Isi nama pengguna di navbar, tahun di footer, dan beri efek kaca pada navbar saat halaman digulir.
  // Merek di navbar: bawaan = logo KarirLink SEVIMA; bila CAMPUS.logo diisi, tampil logo kampus (white-label) dengan inisial sebagai cadangan.
  function initBrand() {
    document.querySelectorAll('[data-brand]').forEach(function (a) {
      var def = a.querySelector('[data-brand-default]'), cus = a.querySelector('[data-brand-custom]');
      if (!def || !cus || !CAMPUS.logo) return;
      def.hidden = true; cus.hidden = false;
      a.title = CAMPUS.name;
      var nm = cus.querySelector('[data-campus-name]'); if (nm) nm.textContent = CAMPUS.name;
      var av = cus.querySelector('[data-brand-avatar]');
      if (av) {
        av.textContent = CAMPUS.name.split(' ').filter(Boolean).slice(0, 2).map(function (w) { return w.charAt(0); }).join('').toUpperCase();
        var img = new Image(); img.alt = '';
        img.className = 'absolute inset-0 h-full w-full bg-white object-contain p-0.5';
        img.addEventListener('load', function () { av.appendChild(img); });
        img.src = new URL(CAMPUS.logo, location.href).href;
      }
    });
  }

  // ---- shell bersama: navbar, drawer, dan footer (markup di shell.js)
  var PAGE_FILE = { home: 'index.html', jobs: 'lowongan.html', event: 'event.html', grow: 'pengembangan.html', tracer: 'tracer-study.html' };
  function mountShell() {
    var S = window.PK_SHELL; if (!S) return;
    document.querySelectorAll('[data-shell]').forEach(function (ph) {
      var kind = ph.getAttribute('data-shell'), page = ph.getAttribute('data-page');
      var wrap = document.createElement('div'); wrap.innerHTML = (S[kind] || '').split('../../assets/').join(ROOT + 'assets/');
      if (kind === 'nav' && PAGE_FILE[page]) {
        wrap.querySelectorAll('[data-nav-links] a, #pkDrawer nav a').forEach(function (a) {
          if (a.getAttribute('href') !== PAGE_FILE[page]) return;
          a.setAttribute('aria-current', 'page');
          if (a.closest('#pkDrawer')) { a.classList.remove('text-fg', 'hover:bg-neutral-50'); a.classList.add('bg-primary-50', 'text-primary-700'); }
        });
      }
      var frag = document.createDocumentFragment();
      while (wrap.firstChild) frag.appendChild(wrap.firstChild);
      ph.replaceWith(frag);
    });
  }
  // Navbar: transparan (teks putih) di atas band gradasi [data-nav-hero], putih solid bila tidak ada band atau setelah digulir.
  function initNav() {
    var header = document.querySelector('[data-shell-header]'), bar = document.querySelector('[data-glass-nav]');
    if (!header || !bar) return;
    function sync() {
      var hero = Array.prototype.some.call(document.querySelectorAll('[data-nav-hero]'), function (e) { return !e.hidden && e.offsetParent !== null; });
      header.classList.toggle('-mb-[4.5rem]', hero);
      bar.setAttribute('data-scrolled', String(!hero || window.scrollY > 8));
    }
    sync();
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    if ('MutationObserver' in window) {
      var mo = new MutationObserver(sync);
      document.querySelectorAll('[data-nav-hero]').forEach(function (e) { mo.observe(e, { attributes: true, attributeFilter: ['hidden'] }); });
    }
    PK.syncNav = sync;
  }
  // Footer: identitas, kontak, dan media sosial milik kampus (PK.CAMPUS).
  function initFooter() {
    var C = CAMPUS;
    var about = document.querySelector('[data-foot-about]'); if (about) about.textContent = C.about || '';
    var def = document.querySelector('[data-foot-default]');
    if (def && C.logo) {
      var cus = document.querySelector('[data-foot-custom]'), lg = document.querySelector('[data-foot-logo]');
      def.hidden = true; cus.hidden = false;
      document.querySelector('[data-foot-name]').textContent = C.name;
      lg.textContent = C.name.split(' ').filter(Boolean).slice(0, 2).map(function (w) { return w.charAt(0); }).join('').toUpperCase();
      var im = new Image(); im.alt = ''; im.className = 'absolute inset-0 h-full w-full bg-white object-contain p-0.5';
      im.addEventListener('load', function () { lg.appendChild(im); }); im.src = new URL(C.logo, location.href).href;
    }
    function row(i, body) { return '<li class="flex items-start gap-3"><span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-control bg-primary-50 text-primary-600">' + icon(i) + '</span><span class="min-w-0 pt-1 text-sm text-fg-muted">' + body + '</span></li>'; }
    var rows = '';
    if (C.address) rows += row('map-pin', esc(C.address));
    if (C.email) rows += row('envelope-simple', '<a href="mailto:' + esc(C.email) + '" class="footer-link">' + esc(C.email) + '</a>');
    if (C.phone) rows += row('phone', '<a href="tel:' + esc(C.phone.replace(/[^+0-9]/g, '')) + '" class="footer-link">' + esc(C.phone) + '</a>');
    var ct = document.getElementById('footContact'); if (ct) ct.innerHTML = rows;
    var SOC = [['facebook', 'facebook-logo', 'Facebook'], ['instagram', 'instagram-logo', 'Instagram'], ['x', 'x-logo', 'X'], ['youtube', 'youtube-logo', 'YouTube']];
    var soc = SOC.filter(function (x) { return C.social && C.social[x[0]]; }).map(function (x) {
      return '<a href="' + esc(C.social[x[0]]) + '" target="_blank" rel="noopener" class="flex h-10 w-10 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600" aria-label="' + x[2] + '">' + icon(x[1], 'h-[18px] w-[18px]') + '</a>';
    }).join('');
    var so = document.getElementById('footSocial'), sw = document.getElementById('footSocialWrap');
    if (so) so.innerHTML = soc; if (sw) sw.hidden = !soc;
    // kolom footer: akordeon di ponsel, selalu terbuka di md ke atas
    var mq = window.matchMedia('(min-width: 768px)');
    function syncCols() { document.querySelectorAll('[data-footer-col]').forEach(function (d) { if (mq.matches) d.setAttribute('open', ''); else d.removeAttribute('open'); }); }
    syncCols(); if (mq.addEventListener) mq.addEventListener('change', syncCols);
  }

  function initShell() {
    mountShell();
    initBrand();
    initNav();
    initFooter();
    var name = user.name || 'Pengguna';
    document.querySelectorAll('[data-user-initials]').forEach(function (el) { el.textContent = initials(user.name); });
    document.querySelectorAll('[data-user-name]').forEach(function (el) { el.textContent = name; });
    document.querySelectorAll('[data-user-email]').forEach(function (el) { el.textContent = user.email || 'Email belum diisi'; });
    document.querySelectorAll('.js-current-year').forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ==========================================================================
     Event dan kegiatan pusat karier (contoh). `in` = berapa hari dari hari ini, jadi data selalu "akan datang".
       GET  /api/events?kategori&format&q&page&pageSize -> { items, total, page, pageSize, pages, counts:{ kategori: jumlah, all } }
       GET  /api/events/:id                            -> { event, registered, similar }
       POST /api/events/:id/register                   -> { ok }
     ========================================================================== */
  var EVENT_CATS = ['Job Fair', 'Workshop', 'Webinar', 'Pelatihan', 'Kegiatan Kampus'];
  var EVENTS = [
    { id: 1, cat: 'Job Fair', title: 'Job Fair Teknologi 2026', in: 3, time: '09.00 - 16.00 WIB', place: 'Jakarta Convention Hall', mode: 'Offline', quota: 500, taken: 412, org: 'Pusat Karier dan 40 perusahaan mitra', desc: 'Bertemu langsung dengan lebih dari 40 perusahaan teknologi. Bawa CV terbaikmu dan ikuti sesi wawancara di tempat.', agenda: ['Registrasi dan pembukaan', 'Booth perusahaan dan wawancara langsung', 'Talkshow: tren karier teknologi', 'Penutupan dan pengundian'] },
    { id: 2, cat: 'Workshop', title: 'Workshop Wawancara Kerja', in: 10, time: '13.00 - 15.30 WIB', place: 'Zoom Meeting', mode: 'Online', quota: 150, taken: 96, org: 'Pusat Karier bersama praktisi HR', desc: 'Latihan wawancara bersama praktisi HR: cara menjawab, bahasa tubuh, dan pertanyaan yang sering muncul.', agenda: ['Pengantar dan tips', 'Simulasi wawancara berpasangan', 'Umpan balik dari praktisi', 'Tanya jawab'] },
    { id: 3, cat: 'Webinar', title: 'Webinar Karier Kreatif', in: 17, time: '19.30 - 21.00 WIB', place: 'YouTube Live', mode: 'Online', quota: 1000, taken: 340, org: 'Pusat Karier dan komunitas kreatif', desc: 'Kisah dan strategi dari profesional desain, media, dan komunikasi untuk membangun portofolio yang dilirik.', agenda: ['Sesi inspirasi', 'Membangun portofolio', 'Tanya jawab'] },
    { id: 4, cat: 'Kegiatan Kampus', title: 'Wisuda dan Temu Alumni', in: 25, time: '08.00 - 13.00 WIB', place: 'Aula Utama Kampus', mode: 'Offline', quota: 800, taken: 560, org: 'Biro Kemahasiswaan dan Alumni', desc: 'Rangkaian wisuda dilanjutkan temu alumni lintas angkatan untuk membangun jejaring profesional.', agenda: ['Prosesi wisuda', 'Foto bersama', 'Temu alumni dan makan siang'] },
    { id: 5, cat: 'Pelatihan', title: 'Pelatihan CV dan Portofolio', in: 31, time: '10.00 - 12.00 WIB', place: 'Ruang Pusat Karier', mode: 'Offline', quota: 40, taken: 38, org: 'Pusat Karier', desc: 'Praktik langsung menyusun CV satu halaman dan portofolio yang menonjolkan pencapaianmu, dengan umpan balik individual.', agenda: ['Anatomi CV yang baik', 'Praktik menulis pencapaian', 'Review portofolio'] },
    { id: 6, cat: 'Workshop', title: 'Workshop Dasar Analisis Data', in: 38, time: '09.00 - 12.00 WIB', place: 'Laboratorium Komputer 2', mode: 'Offline', quota: 60, taken: 22, org: 'Program Studi dan mitra industri', desc: 'Pengantar analisis data dengan spreadsheet dan SQL, cocok untuk pemula dari berbagai program studi.', agenda: ['Konsep dasar data', 'Praktik spreadsheet', 'Pengenalan SQL'] },
    { id: 7, cat: 'Webinar', title: 'Webinar Memulai Karier sebagai Freelancer', in: 45, time: '16.00 - 17.30 WIB', place: 'Zoom Webinar', mode: 'Online', quota: 300, taken: 71, org: 'Pusat Karier dan komunitas freelancer', desc: 'Cara menemukan klien pertama, menentukan tarif, dan mengelola proyek sebagai freelancer pemula.', agenda: ['Menentukan layanan', 'Mencari klien', 'Tarif dan kontrak'] },
    { id: 8, cat: 'Kegiatan Kampus', title: 'Seminar Kewirausahaan Mahasiswa', in: 52, time: '09.00 - 12.00 WIB', place: 'Auditorium Fakultas Ekonomi', mode: 'Offline', quota: 250, taken: 130, org: 'Fakultas Ekonomi dan Bisnis', desc: 'Pengalaman pendiri startup lulusan kampus dan peluang pendanaan bagi usaha mahasiswa.', agenda: ['Keynote pendiri startup', 'Panel pendanaan', 'Pitching mini'] },
    { id: 9, cat: 'Pelatihan', title: 'Pelatihan Komunikasi dan Presentasi', in: 60, time: '13.00 - 16.00 WIB', place: 'Ruang Seminar Pusat Karier', mode: 'Offline', quota: 50, taken: 12, org: 'Pusat Karier', desc: 'Latihan berbicara di depan umum, menyusun presentasi, dan menyampaikan ide secara meyakinkan.', agenda: ['Dasar komunikasi efektif', 'Latihan presentasi', 'Umpan balik'] },
    { id: 10, cat: 'Job Fair', title: 'Job Fair Bisnis dan Keuangan', in: 75, time: '09.00 - 16.00 WIB', place: 'Gedung Serbaguna Kampus', mode: 'Offline', quota: 400, taken: 88, org: 'Pusat Karier dan perusahaan mitra', desc: 'Peluang karier di perbankan, akuntansi, dan konsultan bisnis dari perusahaan mitra kampus.', agenda: ['Registrasi', 'Booth dan wawancara', 'Sesi karier keuangan'] }
  ];
  var EVENTS_KEY = 'kk_portal_events';
  var regEvents = read(EVENTS_KEY, []);
  function evDate(e) { return new Date(Date.now() + e.in * DAY); }
  function evFmt(e, opt) { return evDate(e).toLocaleDateString('id-ID', opt); }
  function eventRegistered(id) { return regEvents.indexOf(id) !== -1; }
  var apiExtra = {
    listEvents: function (o) {
      o = o || {};
      return simulate(function () {
        var q = (o.q || '').trim().toLowerCase();
        var base = EVENTS.filter(function (e) {
          if (o.format && e.mode !== o.format) return false;
          if (q && (e.title + ' ' + e.place + ' ' + e.cat + ' ' + e.org).toLowerCase().indexOf(q) === -1) return false;
          return true;
        });
        var counts = { all: base.length };
        EVENT_CATS.forEach(function (c) { counts[c] = base.filter(function (e) { return e.cat === c; }).length; });
        var list = base.filter(function (e) { return !o.kategori || e.cat === o.kategori; }).sort(function (a, b) { return a.in - b.in; });
        var res = paginate(list, o.page, o.pageSize || 6);
        res.counts = counts;
        return res;
      });
    },
    getEvent: function (id) {
      return simulate(function () {
        var e = EVENTS.filter(function (x) { return x.id === id; })[0];
        if (!e) throw new Error('Event tidak ditemukan');
        return { event: e, registered: eventRegistered(id), similar: EVENTS.filter(function (x) { return x.cat === e.cat && x.id !== id; }).slice(0, 3) };
      });
    },
    registerEvent: function (id) {
      return simulate(function () {
        if (!eventRegistered(id)) { regEvents.push(id); write(EVENTS_KEY, regEvents); var e = EVENTS.filter(function (x) { return x.id === id; })[0]; if (e) e.taken++; }
        return { ok: true };
      }, 600);
    }
  };
  Object.keys(apiExtra).forEach(function (k) { api[k] = apiExtra[k]; });

  function evDay(e) { return evFmt(e, { day: '2-digit' }); }
  function evMonth(e) { return evFmt(e, { month: 'short' }); }
  function evWeekday(e) { return evFmt(e, { weekday: 'long', day: 'numeric', month: 'long' }); }
  function evFull(e) { return evFmt(e, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }); }

  // Kartu event: gaya yang sama dengan kartu lowongan (blok pastel per kategori, penanda tanggal, tag, dan kaki kartu).
  var EVENT_TONE = { 'Job Fair': 'primary', 'Workshop': 'secondary', 'Webinar': 'info', 'Pelatihan': 'success', 'Kegiatan Kampus': 'warning' };
  function eventCard(e) {
    var t = TINT[EVENT_TONE[e.cat] || 'primary'];
    var left = Math.max(e.quota - e.taken, 0), pct = Math.min(100, Math.round(e.taken / e.quota * 100));
    var reg = eventRegistered(e.id);
    return '<article class="relative flex flex-col rounded-2xl border border-border/70 bg-surface p-2 shadow-card transition-shadow hover:shadow-card-lg" data-event-card="' + e.id + '">' +
      '<div class="flex flex-1 flex-col rounded-xl p-4 ' + t.soft + '">' +
        '<div class="flex items-start justify-between gap-2"><span class="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold ' + t.text + '">' + esc(e.cat) + '</span>' +
        '<span class="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700">' + icon(e.mode === 'Online' ? 'video-camera' : 'map-pin', 'h-3.5 w-3.5') + (e.mode === 'Online' ? 'Online' : 'Tatap muka') + '</span></div>' +
        '<div class="mt-5 flex items-start justify-between gap-3"><div class="min-w-0"><p class="truncate text-xs text-slate-500">' + esc(e.org) + '</p>' +
        '<h3 class="mt-1 font-display text-lg font-semibold leading-snug text-slate-900"><a href="event.html?id=' + e.id + '" data-open="' + e.id + '" class="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-primary-500">' + esc(e.title) + '</a></h3></div>' +
        '<span class="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-white ' + t.text + '"><span class="text-lg font-bold leading-none">' + evDay(e) + '</span><span class="mt-0.5 text-[10px] font-semibold uppercase tracking-wider">' + evMonth(e) + '</span></span></div>' +
        '<div class="mt-4 flex flex-wrap gap-1.5">' + tag(evWeekday(e)) + tag(e.time.split(' - ')[0] + ' WIB') + '</div>' +
      '</div>' +
      '<div class="flex items-center justify-between gap-3 px-3 pb-2 pt-3.5"><div class="min-w-0"><p class="truncate text-sm font-semibold text-slate-900">' + esc(e.place) + '</p><p class="mt-0.5 text-xs ' + (left ? 'text-slate-400' : 'text-danger-600') + '">' + (left ? left + ' kursi tersisa (' + pct + '% terisi)' : 'Kuota penuh') + '</p></div>' +
      (reg ? '<span class="inline-flex h-8 shrink-0 items-center gap-1 rounded-xl bg-success-50 px-3 text-xs font-semibold text-success-700">' + icon('check', 'h-3.5 w-3.5') + 'Terdaftar</span>' : '<span class="btn-primary btn-sm shrink-0" aria-hidden="true">Lihat Detail</span>') + '</div></article>';
  }

  /* ==========================================================================
     Course dan pelatihan (contoh). Progres belajar tersimpan di localStorage (kk_portal_courses).
       GET  /api/courses?kategori&level&q&mine&page&pageSize -> { items:[{course, progress}], total, page, pageSize, pages, counts:{ all, mine, kategori... } }
       GET  /api/courses/:id                                 -> { course, progress, similar }
       POST /api/courses/:id/enroll                          -> { ok }
       PUT  /api/courses/:id/lessons/:index  { done }        -> { progress }
     ========================================================================== */
  var COURSE_CATS = ['Soft Skill', 'Keahlian Digital', 'Persiapan Karier', 'Bahasa', 'Kewirausahaan'];
  var COURSE_TONE = { 'Soft Skill': 'secondary', 'Keahlian Digital': 'primary', 'Persiapan Karier': 'success', 'Bahasa': 'info', 'Kewirausahaan': 'warning' };
  function mod(title, lessons) { return { title: title, lessons: lessons.map(function (l) { return { t: l[0], min: l[1] }; }) }; }
  var COURSES = [
    { id: 1, cat: 'Persiapan Karier', title: 'CV dan Personal Branding yang Menarik Perekrut', level: 'Pemula', instructor: 'Rina Maharani', role: 'Konselor Karier', desc: 'Susun CV satu halaman yang jelas, tulis pencapaian dengan angka, dan bangun profil profesional yang konsisten di berbagai platform.', learn: ['Struktur CV yang mudah dipindai', 'Menulis pencapaian yang terukur', 'Menyesuaikan CV dengan lowongan', 'Dasar personal branding'], learners: 1240, modules: [mod('Dasar CV', [['Apa yang dicari perekrut', 8], ['Struktur dan tata letak', 12]]), mod('Isi CV', [['Menulis pencapaian dengan angka', 14], ['Keahlian dan kata kunci', 10]]), mod('Branding', [['Profil profesional online', 11], ['Latihan dan umpan balik', 15]])] },
    { id: 2, cat: 'Persiapan Karier', title: 'Menghadapi Wawancara Kerja dengan Percaya Diri', level: 'Pemula', instructor: 'Dimas Aryo', role: 'Praktisi HR', desc: 'Pelajari pola pertanyaan wawancara, teknik menjawab dengan metode STAR, dan cara mengelola gugup sebelum dan saat wawancara.', learn: ['Jenis pertanyaan wawancara', 'Metode STAR', 'Bahasa tubuh dan wawancara daring', 'Menegosiasikan gaji'], learners: 980, modules: [mod('Persiapan', [['Riset perusahaan', 9], ['Mengenali pertanyaan umum', 12]]), mod('Menjawab', [['Metode STAR', 15], ['Pertanyaan sulit', 13]]), mod('Hari H', [['Wawancara daring', 10], ['Negosiasi gaji', 12]])] },
    { id: 3, cat: 'Soft Skill', title: 'Komunikasi dan Presentasi Efektif', level: 'Pemula', instructor: 'Maya Sari', role: 'Trainer Komunikasi', desc: 'Berbicara jelas, menyusun presentasi yang menarik, dan menyampaikan ide dengan meyakinkan di depan tim maupun klien.', learn: ['Struktur pesan yang jelas', 'Menyusun slide yang efektif', 'Mengelola audiens', 'Umpan balik yang membangun'], learners: 860, modules: [mod('Dasar komunikasi', [['Pesan yang jelas', 10], ['Mendengar aktif', 9]]), mod('Presentasi', [['Menyusun slide', 14], ['Menyampaikan dengan percaya diri', 12]]), mod('Praktik', [['Latihan presentasi', 18]])] },
    { id: 4, cat: 'Keahlian Digital', title: 'Dasar Analisis Data dengan Spreadsheet', level: 'Pemula', instructor: 'Fajar Nugroho', role: 'Data Analyst', desc: 'Mengolah, membersihkan, dan menyajikan data menggunakan spreadsheet, dari rumus dasar sampai tabel pivot dan grafik.', learn: ['Rumus dan fungsi dasar', 'Membersihkan data', 'Tabel pivot', 'Visualisasi data'], learners: 1520, modules: [mod('Dasar spreadsheet', [['Rumus dan fungsi', 15], ['Format dan validasi', 10]]), mod('Mengolah data', [['Membersihkan data', 14], ['Tabel pivot', 16]]), mod('Menyajikan', [['Grafik yang informatif', 12], ['Proyek mini', 20]])] },
    { id: 5, cat: 'Keahlian Digital', title: 'Pengantar SQL untuk Pemula', level: 'Menengah', instructor: 'Fajar Nugroho', role: 'Data Analyst', desc: 'Menulis kueri untuk mengambil dan menggabungkan data dari basis data relasional, dengan latihan di kasus nyata.', learn: ['SELECT, WHERE, dan ORDER BY', 'JOIN antar tabel', 'Agregasi dan GROUP BY', 'Menulis kueri yang rapi'], learners: 740, modules: [mod('Dasar', [['SELECT dan filter', 12], ['Pengurutan dan batas', 8]]), mod('Lanjutan', [['JOIN', 16], ['GROUP BY dan agregasi', 15]]), mod('Latihan', [['Studi kasus penjualan', 22]])] },
    { id: 6, cat: 'Bahasa', title: 'Bahasa Inggris untuk Dunia Kerja', level: 'Menengah', instructor: 'Sarah Williams', role: 'Pengajar Bahasa', desc: 'Kosakata dan ungkapan profesional untuk surel, rapat, dan wawancara dalam bahasa Inggris.', learn: ['Surel profesional', 'Berbicara di rapat', 'Wawancara dalam bahasa Inggris', 'Kosakata kantor'], learners: 1100, modules: [mod('Tulisan', [['Menulis surel', 12], ['Pesan singkat profesional', 9]]), mod('Lisan', [['Rapat dan diskusi', 14], ['Wawancara', 15]])] },
    { id: 7, cat: 'Kewirausahaan', title: 'Memulai Usaha dari Nol', level: 'Pemula', instructor: 'Budi Hartono', role: 'Pendiri Startup', desc: 'Dari ide ke usaha pertama: validasi masalah, model bisnis sederhana, dan langkah awal menjangkau pelanggan.', learn: ['Validasi ide usaha', 'Model bisnis sederhana', 'Menentukan harga', 'Menjangkau pelanggan pertama'], learners: 560, modules: [mod('Ide', [['Menemukan masalah nyata', 11], ['Validasi dengan calon pelanggan', 13]]), mod('Model', [['Model bisnis sederhana', 14], ['Harga dan keuntungan', 12]]), mod('Peluncuran', [['Pelanggan pertama', 16]])] },
    { id: 8, cat: 'Soft Skill', title: 'Bekerja dalam Tim dan Mengelola Waktu', level: 'Pemula', instructor: 'Maya Sari', role: 'Trainer Komunikasi', desc: 'Kolaborasi lintas peran, membagi tugas, dan mengatur prioritas agar pekerjaan selesai tepat waktu tanpa kewalahan.', learn: ['Kolaborasi yang sehat', 'Prioritas dan jadwal', 'Menangani konflik', 'Kebiasaan kerja produktif'], learners: 690, modules: [mod('Tim', [['Peran dan tanggung jawab', 10], ['Komunikasi dalam tim', 11]]), mod('Waktu', [['Prioritas', 9], ['Jadwal dan kebiasaan', 12]])] }
  ];
  var COURSES_KEY = 'kk_portal_courses';
  var courseState = read(COURSES_KEY, {}); // { id: { done: [indeks materi] } }
  function lessonsOf(c) { var out = []; c.modules.forEach(function (m, mi) { m.lessons.forEach(function (l, li) { out.push({ mi: mi, li: li, t: l.t, min: l.min }); }); }); return out; }
  function courseMinutes(c) { return lessonsOf(c).reduce(function (n, l) { return n + l.min; }, 0); }
  function courseDuration(c) { var m = courseMinutes(c); return m >= 60 ? Math.floor(m / 60) + ' jam ' + (m % 60 ? (m % 60) + ' mnt' : '').trim() : m + ' mnt'; }
  function courseProgress(c) {
    var st = courseState[c.id], total = lessonsOf(c).length;
    if (!st) return { enrolled: false, done: [], total: total, pct: 0, complete: false };
    var done = st.done || [];
    return { enrolled: true, done: done, total: total, pct: Math.round(done.length / total * 100), complete: done.length >= total };
  }
  var courseApi = {
    listCourses: function (o) {
      o = o || {};
      return simulate(function () {
        var q = (o.q || '').trim().toLowerCase();
        var all = COURSES.map(function (c) { return { course: c, progress: courseProgress(c) }; }).filter(function (x) {
          if (o.level && x.course.level !== o.level) return false;
          if (q && (x.course.title + ' ' + x.course.instructor + ' ' + x.course.cat).toLowerCase().indexOf(q) === -1) return false;
          return true;
        });
        var counts = { all: all.length, mine: all.filter(function (x) { return x.progress.enrolled; }).length };
        COURSE_CATS.forEach(function (c) { counts[c] = all.filter(function (x) { return x.course.cat === c; }).length; });
        var list = all.filter(function (x) { return (!o.kategori || x.course.cat === o.kategori) && (!o.mine || x.progress.enrolled); });
        var res = paginate(list, o.page, o.pageSize || 6);
        res.counts = counts;
        return res;
      });
    },
    getCourse: function (id) {
      return simulate(function () {
        var c = COURSES.filter(function (x) { return x.id === id; })[0];
        if (!c) throw new Error('Course tidak ditemukan');
        return { course: c, progress: courseProgress(c), similar: COURSES.filter(function (x) { return x.cat === c.cat && x.id !== id; }).concat(COURSES.filter(function (x) { return x.cat !== c.cat && x.id !== id; })).slice(0, 3) };
      });
    },
    enrollCourse: function (id) {
      return simulate(function () { if (!courseState[id]) { courseState[id] = { done: [] }; write(COURSES_KEY, courseState); } return { ok: true }; }, 600);
    },
    setLesson: function (id, index, done) {
      return simulate(function () {
        var st = courseState[id] || (courseState[id] = { done: [] });
        var at = st.done.indexOf(index);
        if (done && at === -1) st.done.push(index); else if (!done && at !== -1) st.done.splice(at, 1);
        write(COURSES_KEY, courseState);
        return { progress: courseProgress(COURSES.filter(function (x) { return x.id === id; })[0]) };
      }, 300);
    }
  };
  Object.keys(courseApi).forEach(function (k) { api[k] = courseApi[k]; });

  // Kartu course: gaya yang sama dengan kartu lowongan dan event.
  function courseCard(x) {
    var c = x.course || x, p = x.progress || courseProgress(c), t = TINT[COURSE_TONE[c.cat] || 'primary'];
    var n = lessonsOf(c).length;
    return '<article class="relative flex flex-col rounded-2xl border border-border/70 bg-surface p-2 shadow-card transition-shadow hover:shadow-card-lg">' +
      '<div class="flex flex-1 flex-col rounded-xl p-4 ' + t.soft + '">' +
        '<div class="flex items-start justify-between gap-2"><span class="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold ' + t.text + '">' + esc(c.cat) + '</span><span class="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700">' + esc(c.level) + '</span></div>' +
        '<div class="mt-5 flex items-start justify-between gap-3"><div class="min-w-0"><p class="truncate text-xs text-slate-500">' + esc(c.instructor) + ', ' + esc(c.role) + '</p>' +
        '<h3 class="mt-1 font-display text-lg font-semibold leading-snug text-slate-900"><a href="course.html?id=' + c.id + '" class="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-primary-500">' + esc(c.title) + '</a></h3></div>' +
        '<span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white ' + t.text + '">' + icon('graduation-cap', 'h-6 w-6') + '</span></div>' +
        '<div class="mt-4 flex flex-wrap gap-1.5">' + tag(courseDuration(c)) + tag(n + ' materi') + tag('Sertifikat') + '</div>' +
      '</div>' +
      '<div class="flex items-center justify-between gap-3 px-3 pb-2 pt-3.5">' +
      (p.enrolled
        ? '<div class="min-w-0 flex-1"><div class="flex items-center justify-between text-xs"><span class="font-semibold text-slate-900">' + (p.complete ? 'Selesai' : 'Progres ' + p.pct + '%') + '</span><span class="text-slate-400">' + p.done.length + '/' + p.total + '</span></div><div class="progress-track mt-1.5 h-1.5"><div class="progress-bar" style="width: ' + p.pct + '%"></div></div></div><span class="btn-' + (p.complete ? 'secondary' : 'primary') + ' btn-sm shrink-0" aria-hidden="true">' + (p.complete ? 'Lihat' : 'Lanjutkan') + '</span>'
        : '<div class="min-w-0"><p class="text-sm font-semibold text-slate-900">Gratis</p><p class="mt-0.5 text-xs text-slate-400">' + c.learners.toLocaleString('id-ID') + ' peserta</p></div><span class="btn-primary btn-sm shrink-0" aria-hidden="true">Lihat Detail</span>') +
      '</div></article>';
  }

  function tintOfCat(cat) { return TINT[COURSE_TONE[cat] || 'primary']; }

  /* ==========================================================================
     Tes (contoh). Hanya Tes Minat Karier RIASEC yang bisa dikerjakan; tes lain tampil sebagai "Segera hadir".
     Draf jawaban tersimpan otomatis, hasil tiap pengerjaan masuk riwayat, dan satu pengerjaan dipakai sebagai acuan rekomendasi lowongan.
       GET  /api/tests?kategori&q                      -> { items:[{ test, state }], counts }
       GET  /api/tests/:id                             -> { test, state, attempts }      (attempts: terbaru dulu)
       PUT  /api/tests/:id/draft  { answers, page }    -> { ok }
       POST /api/tests/:id/attempts { answers }        -> { attempt }                    (menghitung skor dan kode Holland)
       GET  /api/attempts?page&pageSize                -> { items, total, page, pageSize, pages, drafts }
       PUT  /api/tests/:id/active { attempt }          -> { ok }                         (pilih acuan rekomendasi)
       GET  /api/tests/riasec/recommendations?kode     -> { jobs:[rank], fields:[{ field, fit }] }
     ========================================================================== */
  var TEST_CATS = ['Minat dan Bakat', 'Kepribadian', 'Kemampuan'];
  var TEST_TONE = { 'Minat dan Bakat': 'primary', 'Kepribadian': 'secondary', 'Kemampuan': 'info' };
  var RIASEC_ORDER = ['R', 'I', 'A', 'S', 'E', 'C'];
  var RIASEC = {
    R: { name: 'Realistis', en: 'Realistic', nick: 'Si Praktis', tone: 'warning', icon: 'wrench', desc: 'Suka bekerja dengan benda, alat, mesin, atau alam. Praktis, tangguh, dan puas saat melihat hasil kerja yang nyata.', strengths: ['Terampil secara teknis', 'Tahan banting di lapangan', 'Pemecah masalah yang praktis'], roles: ['Teknisi', 'Insinyur lapangan', 'Quality control', 'Operator produksi'] },
    I: { name: 'Investigatif', en: 'Investigative', nick: 'Si Penyelidik', tone: 'info', icon: 'flask', desc: 'Suka menganalisis, meneliti, dan memahami cara kerja sesuatu. Rasa ingin tahu tinggi dan nyaman dengan masalah yang rumit.', strengths: ['Berpikir analitis', 'Teliti dan mendalam', 'Belajar mandiri'], roles: ['Data analyst', 'Peneliti', 'Software engineer', 'Ilmuwan'] },
    A: { name: 'Artistik', en: 'Artistic', nick: 'Si Kreatif', tone: 'secondary', icon: 'palette', desc: 'Suka berekspresi lewat gagasan, visual, tulisan, atau karya. Imajinatif dan lebih nyaman dengan ruang yang bebas dan tidak kaku.', strengths: ['Imajinatif dan orisinal', 'Peka terhadap estetika', 'Bercerita dengan menarik'], roles: ['UI/UX designer', 'Content creator', 'Videografer', 'Penulis'] },
    S: { name: 'Sosial', en: 'Social', nick: 'Si Penolong', tone: 'success', icon: 'hand-heart', desc: 'Suka membantu, mengajar, dan bekerja bersama orang lain. Empatik, komunikatif, dan senang melihat orang lain berkembang.', strengths: ['Empatik dan pendengar yang baik', 'Pandai membimbing', 'Kolaboratif'], roles: ['Guru dan instruktur', 'Konselor', 'Tenaga kesehatan', 'HR officer'] },
    E: { name: 'Wirausaha', en: 'Enterprising', nick: 'Si Pemimpin', tone: 'danger', icon: 'rocket', desc: 'Suka memimpin, meyakinkan, dan mengejar target. Berani mengambil risiko, kompetitif, dan senang memulai hal baru.', strengths: ['Persuasif dan percaya diri', 'Berani mengambil keputusan', 'Berorientasi target'], roles: ['Sales dan marketing', 'Manajer produk', 'Pengusaha', 'Konsultan bisnis'] },
    C: { name: 'Konvensional', en: 'Conventional', nick: 'Si Teliti', tone: 'primary', icon: 'list-checks', desc: 'Suka keteraturan, data, dan prosedur yang jelas. Rapi, andal, dan nyaman bekerja dengan angka serta dokumen.', strengths: ['Teliti dan terorganisir', 'Konsisten mengikuti prosedur', 'Andal dengan angka'], roles: ['Akuntan', 'Staf administrasi', 'Supply chain officer', 'Auditor'] }
  };
  // 30 pernyataan (5 per tipe), diurutkan bergantian antar tipe supaya jawaban tidak berpola. Jawaban 1 (sangat tidak suka) sampai 5 (sangat suka).
  var RIASEC_ITEMS = {
    R: ['Memperbaiki mesin, kendaraan, atau perangkat elektronik', 'Bekerja dengan alat dan perkakas di bengkel atau lapangan', 'Berkegiatan di luar ruangan, seperti berkebun, bertani, atau mendaki', 'Merakit atau membangun sesuatu dengan tangan', 'Mengoperasikan mesin atau peralatan berat'],
    I: ['Memecahkan soal logika atau teka-teki yang rumit', 'Melakukan percobaan atau penelitian kecil', 'Membaca artikel ilmiah untuk memahami cara kerja sesuatu', 'Menganalisis data untuk menemukan pola', 'Mencari penyebab suatu masalah sampai tuntas'],
    A: ['Menggambar, melukis, atau mendesain sesuatu', 'Menulis cerita, puisi, atau konten kreatif', 'Bermain musik, bernyanyi, atau tampil di panggung', 'Menciptakan ide baru yang berbeda dari kebanyakan orang', 'Memotret atau membuat video'],
    S: ['Membantu orang yang sedang kesulitan', 'Mengajari teman sampai ia paham', 'Mendengarkan curhat dan memberi dukungan', 'Menjadi relawan di kegiatan sosial', 'Bekerja bersama tim untuk membantu banyak orang'],
    E: ['Memimpin kelompok atau organisasi', 'Meyakinkan orang lain agar setuju dengan idemu', 'Memulai usaha atau proyek sendiri', 'Mengambil keputusan dan risiko demi mencapai target', 'Bernegosiasi atau menjual produk'],
    C: ['Merapikan dokumen, data, atau arsip', 'Mengatur jadwal dan anggaran dengan teliti', 'Bekerja mengikuti prosedur yang jelas', 'Mencatat dan memeriksa angka agar akurat', 'Mengurus administrasi dan kelengkapan berkas']
  };
  var RIASEC_QS = [];
  for (var qi = 0; qi < 5; qi++) RIASEC_ORDER.forEach(function (k) { RIASEC_QS.push({ type: k, text: RIASEC_ITEMS[k][qi] }); });
  var SCALE = ['Sangat tidak suka', 'Tidak suka', 'Netral', 'Suka', 'Sangat suka'];

  var TESTS = [
    { id: 'riasec', ready: true, cat: 'Minat dan Bakat', icon: 'compass', title: 'Tes Minat Karier RIASEC', short: 'RIASEC', minutes: 10, count: RIASEC_QS.length,
      desc: 'Kenali tipe minat kariermu berdasarkan model Holland. Hasilnya berupa kode tiga huruf, bidang karier yang cocok, dan dipakai untuk mengurutkan lowongan yang direkomendasikan untukmu.' },
    { id: 'kepribadian', ready: false, cat: 'Kepribadian', icon: 'brain', title: 'Tes Kepribadian Big Five', short: 'Big Five', minutes: 15, count: 50, desc: 'Pahami lima dimensi kepribadianmu dan bagaimana gayamu bekerja bersama orang lain.' },
    { id: 'logika', ready: false, cat: 'Kemampuan', icon: 'calculator', title: 'Tes Logika dan Numerik', short: 'Logika', minutes: 20, count: 30, desc: 'Latihan soal penalaran logika dan hitungan seperti yang sering muncul pada seleksi kerja.' },
    { id: 'gaya-belajar', ready: false, cat: 'Kepribadian', icon: 'book-open', title: 'Tes Gaya Belajar', short: 'Gaya Belajar', minutes: 8, count: 20, desc: 'Temukan cara belajar yang paling efektif untukmu: visual, auditori, atau praktik langsung.' }
  ];
  function testById(id) { return TESTS.filter(function (t) { return t.id === id; })[0]; }

  function riasecScores(answers) {
    var sc = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    answers.forEach(function (v, i) { if (v) sc[RIASEC_QS[i].type] += v; });
    return sc;
  }
  function riasecCodeOf(sc) {
    return RIASEC_ORDER.slice().sort(function (a, b) { return sc[b] - sc[a] || RIASEC_ORDER.indexOf(a) - RIASEC_ORDER.indexOf(b); }).slice(0, 3).join('');
  }
  function testState(t) {
    var st = t.id === 'riasec' ? riasecState() : { attempts: [], draft: null, active: null };
    var act = t.id === 'riasec' ? activeAttempt() : null;
    var answered = st.draft ? st.draft.answers.filter(Boolean).length : 0;
    return { attempts: st.attempts.length, last: st.attempts.length ? st.attempts[st.attempts.length - 1] : null, active: act, draft: st.draft, answered: answered };
  }
  function saveTests() { write(TESTS_KEY, testStore); }

  var testApi = {
    listTests: function (o) {
      o = o || {};
      return simulate(function () {
        var q = (o.q || '').trim().toLowerCase();
        var base = TESTS.filter(function (t) { return !q || (t.title + ' ' + t.short + ' ' + t.cat).toLowerCase().indexOf(q) !== -1; });
        var counts = { all: base.length };
        TEST_CATS.forEach(function (c) { counts[c] = base.filter(function (t) { return t.cat === c; }).length; });
        var items = base.filter(function (t) { return !o.kategori || t.cat === o.kategori; }).map(function (t) { return { test: t, state: testState(t) }; });
        return { items: items, counts: counts, riasec: testState(TESTS[0]) };
      });
    },
    getTest: function (id) {
      return simulate(function () {
        var t = testById(id);
        if (!t) throw new Error('Tes tidak ditemukan');
        var st = testState(t);
        return { test: t, state: st, attempts: (t.id === 'riasec' ? riasecState().attempts.slice().reverse() : []) };
      });
    },
    saveDraft: function (id, draft) {
      var st = riasecState();
      st.draft = draft; saveTests();
      return Promise.resolve({ ok: true });
    },
    discardDraft: function () { riasecState().draft = null; saveTests(); return Promise.resolve({ ok: true }); },
    submitTest: function (id, answers, startedAt) {
      return simulate(function () {
        var st = riasecState(), sc = riasecScores(answers);
        var at = Date.now(), a = { id: 'r' + at, test: 'riasec', at: at, answers: answers, scores: sc, code: riasecCodeOf(sc), minutes: Math.max(1, Math.round((at - (startedAt || at)) / 60000)) };
        st.attempts.push(a); st.draft = null; st.active = a.id; saveTests();
        riasecCode = a.code; hasPrefs = true; rerank();
        return { attempt: a };
      }, 900);
    },
    // Riwayat semua tes (terbaru dulu) + draf yang belum selesai.
    listAttempts: function (o) {
      o = o || {};
      return simulate(function () {
        var st = riasecState();
        var rows = st.attempts.slice().reverse().map(function (a) { return Object.assign({}, a, { current: !!(activeAttempt() && activeAttempt().id === a.id) }); });
        var res = paginate(rows, o.page, o.pageSize || 5);
        res.draft = st.draft ? { test: 'riasec', answered: st.draft.answers.filter(Boolean).length, updated: st.draft.updatedAt } : null;
        res.total_all = rows.length;
        return res;
      });
    },
    getAttempt: function (id) {
      return simulate(function () {
        var a = riasecState().attempts.filter(function (x) { return x.id === id; })[0];
        if (!a) throw new Error('Hasil tes tidak ditemukan');
        var cur = activeAttempt();
        return { attempt: a, current: !!(cur && cur.id === a.id), count: riasecState().attempts.length };
      });
    },
    setActiveAttempt: function (testId, attemptId) {
      return simulate(function () {
        var st = riasecState();
        if (st.attempts.some(function (a) { return a.id === attemptId; })) { st.active = attemptId; saveTests(); riasecCode = (activeAttempt() || {}).code || ''; rerank(); }
        return { ok: true };
      }, 300);
    },
    // Lowongan dan bidang yang paling cocok dengan satu kode RIASEC (dipakai pada halaman hasil).
    riasecRecommend: function (code) {
      return simulate(function () {
        var jobs = JOBS.map(function (j) { var f = riasecFit(j.field, code); return { job: j, score: Math.round(f * 100), why: f >= 0.6 ? ['minat RIASEC'] : [] }; })
          .sort(function (a, b) { return b.score - a.score || b.job.pop - a.job.pop; }).slice(0, 6);
        var fields = Object.keys(RIASEC_FIELD).map(function (f) { return { field: f, fit: Math.round(riasecFit(f, code) * 100), jobs: JOBS.filter(function (j) { return j.field === f; }).length }; })
          .sort(function (a, b) { return b.fit - a.fit; }).slice(0, 5);
        return { jobs: jobs, fields: fields };
      }, 420);
    }
  };
  Object.keys(testApi).forEach(function (k) { api[k] = testApi[k]; });

  // Huruf kode Holland sebagai kotak kecil berwarna (dipakai di kartu, riwayat, dan hasil).
  function codeChips(code, size) {
    return '<span class="inline-flex gap-1" aria-label="Kode ' + esc(code) + '">' + code.split('').map(function (k) {
      var t = TINT[RIASEC[k].tone];
      return '<span class="flex ' + (size || 'h-7 w-7 text-xs') + ' items-center justify-center rounded-lg font-bold ' + t.logo + '" title="' + esc(RIASEC[k].name) + '">' + k + '</span>';
    }).join('') + '</span>';
  }

  function fmtDate(ms) { return new Date(ms).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }); }
  // Kartu bagian dengan judul (halaman pengembangan dan tes).
  function cardSection(title, body, extra) { return '<section class="card overflow-hidden"><div class="flex items-center justify-between gap-3 p-6 pb-3"><h2 class="card-title">' + title + '</h2>' + (extra || '') + '</div>' + body + '</section>'; }

  // Kartu tes: gaya yang sama dengan kartu course, penanda "Tes" dan kaki kartu menurut status (baru, draf, selesai, segera hadir).
  function testCard(x) {
    var t = x.test, s = x.state, tn = TINT[TEST_TONE[t.cat] || 'primary'];
    var head = '<div class="flex items-start justify-between gap-2"><span class="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold ' + tn.text + '">' + esc(t.cat) + '</span><span class="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700">' + icon('clipboard-text', 'h-3.5 w-3.5') + 'Tes</span></div>';
    var title = t.ready
      ? '<a href="' + t.id + '.html" class="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-primary-500">' + esc(t.title) + '</a>'
      : esc(t.title);
    var foot;
    if (!t.ready) foot = '<div class="min-w-0"><p class="text-sm font-semibold text-slate-900">Segera hadir</p><p class="mt-0.5 text-xs text-slate-400">Belum bisa dikerjakan</p></div><span class="btn-outline btn-sm shrink-0 pointer-events-none opacity-50" aria-hidden="true">Segera</span>';
    else if (s.draft && s.answered) {
      var pct = Math.round(s.answered / t.count * 100);
      foot = '<div class="min-w-0 flex-1"><div class="flex items-center justify-between text-xs"><span class="font-semibold text-slate-900">Draf ' + pct + '%</span><span class="text-slate-400">' + s.answered + '/' + t.count + '</span></div><div class="progress-track mt-1.5 h-1.5"><div class="progress-bar" style="width: ' + pct + '%"></div></div></div><span class="btn-primary btn-sm shrink-0" aria-hidden="true">Lanjutkan</span>';
    } else if (s.active) foot = '<div class="min-w-0"><p class="flex items-center gap-2 text-sm font-semibold text-slate-900">Hasilmu ' + codeChips(s.active.code, 'h-6 w-6 text-[11px]') + '</p><p class="mt-0.5 text-xs text-slate-400">' + s.attempts + 'x dikerjakan</p></div><span class="btn-secondary btn-sm shrink-0" aria-hidden="true">Lihat Hasil</span>';
    else foot = '<div class="min-w-0"><p class="text-sm font-semibold text-slate-900">Gratis</p><p class="mt-0.5 text-xs text-slate-400">Draf tersimpan otomatis</p></div><span class="btn-primary btn-sm shrink-0" aria-hidden="true">Mulai Tes</span>';
    return '<article class="relative flex flex-col rounded-2xl border border-border/70 bg-surface p-2 shadow-card transition-shadow ' + (t.ready ? 'hover:shadow-card-lg' : '') + '">' +
      '<div class="flex flex-1 flex-col rounded-xl p-4 ' + tn.soft + '">' + head +
        '<div class="mt-5 flex items-start justify-between gap-3"><div class="min-w-0"><p class="truncate text-xs text-slate-500">' + (t.id === 'riasec' ? 'Model Holland, dipakai untuk rekomendasi lowongan' : 'Asesmen pusat karier') + '</p>' +
        '<h3 class="mt-1 font-display text-lg font-semibold leading-snug text-slate-900">' + title + '</h3></div>' +
        '<span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white ' + tn.text + '">' + icon(t.icon, 'h-6 w-6') + '</span></div>' +
        '<div class="mt-4 flex flex-wrap gap-1.5">' + tag('±' + t.minutes + ' menit') + tag(t.count + ' pernyataan') + tag(t.ready ? 'Hasil langsung' : 'Belum tersedia') + '</div>' +
      '</div><div class="flex items-center justify-between gap-3 px-3 pb-2 pt-3.5">' + foot + '</div></article>';
  }

  /* ==========================================================================
     Tracer Study: portal hanya menjadi pengingat. Kuesionernya sendiri diisi di aplikasi Tracer Study (CAMPUS.tracerUrl);
     tiap kuesioner punya tautan langsung ke kuesionernya. Status diterima dari aplikasi Tracer Study.
       GET /api/tracer -> { locked, items:[{ id, custom?, title, when, status:'selesai'|'perlu'|'belum', closes?, opensIn?, doneAgo? }] }
     ========================================================================== */
  var TRACER = [
    { id: 'pra-lulus', title: 'Pra-lulus', when: 'Saat menjelang kelulusan', minutes: 5, status: 'selesai', doneAgo: 420,
      desc: 'Pengalaman kuliah dan rencana setelah lulus. Diisi sebelum wisuda.' },
    { id: 'pasca-1', title: 'Pasca-lulus 1 tahun', when: 'Satu tahun setelah lulus', minutes: 10, status: 'perlu', closes: 21,
      desc: 'Status pekerjaan atau studi lanjutanmu setahun setelah lulus, dipakai untuk akreditasi dan pelaporan.' },
    { id: 'pasca-4', title: 'Pasca-lulus 4 tahun', when: 'Empat tahun setelah lulus', minutes: 10, status: 'belum', opensIn: 1095,
      desc: 'Perkembangan kariermu setelah empat tahun, termasuk kesesuaian pekerjaan dan kompetensi.' },
    // Kuesioner custom yang dibuat admin kampus untuk alumni (custom: true). Nama, deskripsi, batas waktu, dan estimasi waktu diisi admin;
    // semuanya boleh kosong, halaman memakai teks bawaan. Hanya tampil di halaman alumni.
    { id: 'kampus-14', custom: true, title: 'Survei kepuasan layanan alumni', status: 'perlu', closes: 45, minutes: 3,
      desc: 'Bantu kampus menilai layanan alumni dan kegiatan ikatan alumni.' },
    { id: 'kampus-15', custom: true, title: '', status: 'perlu' }
  ];
  // Kuesioner hanya bisa diisi alumni. tracer-study.html = alumni (kuesioner terbuka); tracer-study-mahasiswa.html = mahasiswa (semua terkunci).
  // Navbar menuju tracer-study.html; halaman mahasiswa dipilih server dan tidak ditautkan di prototipe.
  api.listTracer = function (audience) {
    return simulate(function () {
      var alumni = audience === 'alumni';
      return { locked: !alumni, items: TRACER.filter(function (t) { return alumni || !t.custom; }).map(function (t) { return alumni ? t : Object.assign({}, t, { status: 'terkunci' }); }) };
    }, 220);
  };
  function tracerLink(item) { return (CAMPUS.tracerUrl || 'https://tracer.karirlink.id/kuesioner') + '?kuesioner=' + encodeURIComponent(item.id); }

  // Identitas kampus pengelola portal (diganti per universitas).
  // logo kosong = logo KarirLink SEVIMA bawaan. Isi URL gambar (relatif terhadap halaman) untuk tampilan white-label seperti templates/custom:
  // avatar logo kampus + "KarirLink" kecil di atas nama kampus.
  var CAMPUS = {
    name: 'Universitas Foxtrot', unit: 'Pusat Karier dan Alumni', logo: '',
    // Alamat aplikasi Tracer Study kampus (kuesioner diisi di sana).
    tracerUrl: '../karirlink/kuesioner-simulasi.html',
    // Kontak dan media sosial milik kampus (footer). Nilai kosong = barisnya tidak ditampilkan.
    about: 'Pusat karier dan alumni yang membantu mahasiswa dan lulusan menemukan lowongan, mengikuti event dan pelatihan, serta mengembangkan kariernya.',
    address: 'Gedung Rektorat Lt. 2, Jl. Contoh Raya No. 1, Surabaya, Jawa Timur', email: 'karier@contoh.ac.id', phone: '+62 31 5551 234',
    social: { facebook: '#', instagram: '#', x: '', youtube: '#' }
  };
  if (window.PK_CAMPUS) {
    var over = window.PK_CAMPUS;
    Object.keys(over).forEach(function (k) { if (k === 'social') CAMPUS.social = Object.assign({}, CAMPUS.social, over.social); else CAMPUS[k] = over[k]; });
  }

  window.PK = {
    TINT: TINT, rootUrl: ROOT, fmtDate: fmtDate, cardSection: cardSection, TESTS: TESTS, TEST_CATS: TEST_CATS, RIASEC: RIASEC, RIASEC_ORDER: RIASEC_ORDER, RIASEC_QS: RIASEC_QS, RIASEC_SCALE: SCALE, testCard: testCard, codeChips: codeChips, riasecCode: function () { return riasecCode; },
    CAMPUS: CAMPUS, tracerLink: tracerLink, COURSES: COURSES, COURSE_CATS: COURSE_CATS, courseCard: courseCard, courseDuration: courseDuration, lessonsOf: lessonsOf, courseProgress: courseProgress, TINT_OF: tintOfCat, eventCard: eventCard, EVENTS: EVENTS, EVENT_CATS: EVENT_CATS, eventRegistered: eventRegistered, evDay: evDay, evMonth: evMonth, evWeekday: evWeekday, evFull: evFull,
    JOBS: JOBS, STATUSES: STATUSES, STEPS: STEPS, FIELDS: FIELDS, api: api,
    user: user, prefs: prefs, onboarded: onboarded, hasPrefs: hasPrefs,
    esc: esc, initials: initials, when: when, dateOf: dateOf, icon: icon, profile: profile,
    statusOf: statusOf, tintOf: tintOf, isActive: isActive, history: history, hasApplied: hasApplied,
    isSaved: isSaved, savedCount: function () { return savedIds.length; }, toast: toast,
    latest: latest, debounce: debounce,
    comboHtml: comboHtml, comboSet: comboSet, initCombos: initCombos,
    logo: logo, tag: tag, saveButton: saveButton, jobCard: jobCard, jobRow: jobRow, stageBar: stageBar, bindSave: bindSave, initShell: initShell,
    skeletonRows: skeletonRows, skeletonCards: skeletonCards, skeletonDetail: skeletonDetail, emptyBox: emptyBox, errorBox: errorBox, pager: pager
  };
})();
