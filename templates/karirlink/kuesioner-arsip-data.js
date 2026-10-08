/* Data contoh untuk halaman Arsip Kuesioner Tracer Study (kuesioner-arsip-detail.html dan kuesioner-arsip-jawaban.html).
   Di produksi data ini datang dari API Arsip (FOX-1179); di sini dibangkitkan secara deterministik dari id arsip
   supaya kedua halaman melihat alumni dan jawaban yang sama tanpa backend. Hanya-baca: tidak ada fungsi kirim. */
(function () {
  'use strict';

  var ARSIP = [
    { id: 1, title: 'Kuesioner Tracer Study Lengkap & Pengguna Lulusan 2025', created: '2026-08-27', time: '16:25', year: 2025, kind: 'alumni', templates: ['Template Lengkap', 'Template Pengguna Lulusan'] },
    { id: 2, title: 'Kuesioner Tracer Study Kemdikbud 2026', created: '2026-07-31', time: '14:42', year: 2026, kind: 'alumni', templates: ['Template Kemdikbud'] },
    { id: 3, title: 'Kuesioner Tracer Study Lengkap 2026', created: '2026-07-21', time: '09:25', year: 2026, kind: 'alumni', templates: ['Template Lengkap'] },
    { id: 4, title: 'Kuesioner Tracer Study Pengguna Lulusan 2026', created: '2026-07-21', time: '09:24', year: 2026, kind: 'pengguna', templates: ['Template Pengguna Lulusan'] },
    { id: 5, title: 'Kuesioner Tracer Study Pengguna Lulusan 2025', created: '2026-06-14', time: '10:12', year: 2025, kind: 'pengguna', templates: ['Template Pengguna Lulusan'] },
    { id: 6, title: 'Kuesioner Tracer Study Lengkap 2025', created: '2026-06-14', time: '10:05', year: 2025, kind: 'alumni', templates: ['Template Lengkap'] },
    { id: 7, title: 'Kuesioner Tracer Study Kemdikbud 2025', created: '2026-05-02', time: '13:30', year: 2025, kind: 'alumni', templates: ['Template Kemdikbud'] },
    { id: 8, title: 'Kuesioner Tracer Study Lengkap & Pengguna Lulusan 2024', created: '2025-12-19', time: '15:20', year: 2024, kind: 'alumni', templates: ['Template Lengkap', 'Template Pengguna Lulusan'] },
    { id: 9, title: 'Kuesioner Tracer Study Kemdikbud 2024', created: '2025-09-05', time: '09:45', year: 2024, kind: 'alumni', templates: ['Template Kemdikbud'] },
    { id: 10, title: 'Kuesioner Tracer Study Lengkap 2024', created: '2025-08-28', time: '10:03', year: 2024, kind: 'alumni', templates: ['Template Lengkap'] },
    { id: 11, title: 'Kuesioner Tracer Study Pengguna Lulusan 2024', created: '2025-08-28', time: '09:58', year: 2024, kind: 'pengguna', templates: ['Template Pengguna Lulusan'] },
    { id: 12, title: 'Kuesioner Tracer Study Lengkap 2023', created: '2025-05-12', time: '11:40', year: 2023, kind: 'alumni', templates: ['Template Lengkap'] }
  ];

  // Pertanyaan sistem lama. type: choice | rating | rupiah | text
  var Q_ALUMNI = [
    { text: 'Apakah Anda saat ini bekerja?', type: 'choice', options: ['Ya, bekerja penuh waktu', 'Ya, wiraswasta', 'Belum bekerja', 'Melanjutkan studi'] },
    { text: 'Berapa lama Anda mendapatkan pekerjaan pertama setelah lulus?', type: 'choice', options: ['Kurang dari 3 bulan', '3 sampai 6 bulan', '6 sampai 12 bulan', 'Lebih dari 12 bulan'] },
    { text: 'Berapa pendapatan pertama Anda per bulan?', type: 'rupiah' },
    { text: 'Apakah pekerjaan Anda saat ini sesuai dengan bidang studi?', type: 'choice', options: ['Sangat sesuai', 'Sesuai', 'Kurang sesuai', 'Tidak sesuai'] },
    { text: 'Bagaimana penilaian Anda terhadap kurikulum yang diajarkan?', type: 'rating' },
    { text: 'Apakah Anda melanjutkan studi ke jenjang yang lebih tinggi?', type: 'choice', options: ['Ya', 'Tidak'] },
    { text: 'Bagaimana peran kampus dalam membantu Anda mendapatkan pekerjaan?', type: 'choice', options: ['Sangat membantu', 'Cukup membantu', 'Kurang membantu', 'Tidak membantu'] },
    { text: 'Apa saran Anda untuk pengembangan kampus ke depannya?', type: 'text', pool: [
      'Perbanyak kelas praktik dan kunjungan industri agar lulusan lebih siap kerja.',
      'Tambah kerja sama magang dengan perusahaan dan perbarui materi mengikuti kebutuhan pasar.',
      'Layanan karier sebaiknya aktif sejak semester lima, bukan hanya saat mendekati kelulusan.',
      'Kurikulum perlu lebih banyak studi kasus nyata dan dosen tamu dari praktisi.',
      'Fasilitas laboratorium dan akses jurnal perlu ditingkatkan.',
      'Sudah baik. Mohon jaringan alumni dan bursa kerja diadakan lebih sering.'
    ] }
  ];
  var Q_PENGGUNA = [
    { text: 'Sudah berapa lama alumni bekerja di instansi Anda?', type: 'choice', options: ['Kurang dari 1 tahun', '1 sampai 2 tahun', '2 sampai 5 tahun', 'Lebih dari 5 tahun'] },
    { text: 'Bagaimana penilaian Anda terhadap etika dan integritas alumni?', type: 'rating' },
    { text: 'Bagaimana penilaian Anda terhadap keahlian pada bidang ilmunya?', type: 'rating' },
    { text: 'Bagaimana penilaian Anda terhadap kemampuan bahasa asing alumni?', type: 'rating' },
    { text: 'Bagaimana penilaian Anda terhadap penguasaan teknologi informasi?', type: 'rating' },
    { text: 'Bagaimana penilaian Anda terhadap kemampuan komunikasi alumni?', type: 'rating' },
    { text: 'Bagaimana penilaian Anda terhadap kerja sama tim alumni?', type: 'rating' },
    { text: 'Apa masukan Anda untuk kampus dalam menyiapkan lulusan?', type: 'text', pool: [
      'Perkuat kemampuan komunikasi dan presentasi sejak semester awal.',
      'Lulusan sudah baik secara teknis, tinggal diperkuat pengalaman proyek tim.',
      'Tambahkan pelatihan bahasa Inggris untuk dunia kerja.',
      'Kerja sama magang yang lebih panjang akan sangat membantu adaptasi.',
      'Puas dengan kinerja alumni. Mohon pertahankan kualitas lulusannya.'
    ] }
  ];

  var PRODI = ['S1 - Teknik Informatika', 'S1 - Sistem Informasi', 'S1 - Manajemen', 'S1 - Akuntansi', 'S1 - Psikologi', 'D3 - Administrasi Bisnis'];
  var FIRST = ['Andi', 'Sari', 'Rudi', 'Dewi', 'Budi', 'Rina', 'Fajar', 'Putri', 'Dimas', 'Maya', 'Eko', 'Nadia', 'Hendra', 'Lestari', 'Yoga', 'Intan', 'Bayu', 'Citra', 'Reza', 'Wulan', 'Agus', 'Tiara', 'Galih', 'Anisa', 'Rizky', 'Melati', 'Doni', 'Salsa', 'Teguh', 'Ayu'];
  var LAST = ['Nugroho', 'Puspita', 'Hartono', 'Lestari', 'Santoso', 'Wijaya', 'Pratama', 'Kusuma', 'Saputra', 'Rahmawati', 'Setiawan', 'Maharani', 'Hidayat', 'Permata', 'Firmansyah', 'Anggraini', 'Utomo', 'Handayani', 'Ramadhan', 'Suryani'];
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  var MONTHS_LONG = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  function rng(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function pick(r, list) { return list[Math.floor(r() * list.length)]; }
  function addDays(iso, n) { var d = new Date(iso + 'T00:00:00'); d.setDate(d.getDate() + n); return d; }
  function isoOf(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function fmt(iso) { if (!iso) return ''; var d = new Date(iso + 'T00:00:00'); return d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear(); }
  function fmtLong(iso) { var d = new Date(iso + 'T00:00:00'); return d.getDate() + ' ' + MONTHS_LONG[d.getMonth()] + ' ' + d.getFullYear(); }

  function getArsip(id) {
    id = parseInt(id, 10);
    return ARSIP.filter(function (a) { return a.id === id; })[0] || null;
  }
  function questionsOf(arsip) { return arsip.kind === 'pengguna' ? Q_PENGGUNA : Q_ALUMNI; }

  function answersFor(arsip, r) {
    var qs = questionsOf(arsip), out = [];
    var employed = null;
    qs.forEach(function (q, i) {
      var v;
      if (arsip.kind === 'alumni') {
        if (i === 0) { employed = r() < 0.7; v = employed ? (r() < 0.85 ? q.options[0] : q.options[1]) : (r() < 0.5 ? q.options[2] : q.options[3]); }
        else if (i === 1) { v = employed ? q.options[Math.floor(r() * 4)] : 'Belum mendapat pekerjaan'; }
        else if (i === 2) { v = employed ? (3 + Math.floor(r() * 10)) * 1000000 : 0; }
        else if (i === 3) { v = employed ? q.options[Math.floor(r() * 4)] : 'Tidak berlaku'; }
        else if (q.type === 'rating') { v = 3 + Math.floor(r() * 3); }
        else if (q.type === 'text') { v = pick(r, q.pool); }
        else { v = q.options[Math.floor(r() * q.options.length)]; }
      } else if (q.type === 'rating') { v = 3 + Math.floor(r() * 3); }
      else if (q.type === 'text') { v = pick(r, q.pool); }
      else { v = q.options[Math.floor(r() * q.options.length)]; }
      out.push(v);
    });
    return out;
  }

  // Alumni penerima satu arsip. Belum pernah dikirim berarti pasti belum mengisi.
  function getAlumni(arsipId) {
    var arsip = getArsip(arsipId);
    if (!arsip) return [];
    var r = rng(arsip.id * 7919 + 13);
    var total = 14 + ((arsip.id * 7) % 22);
    var used = {};
    var list = [];
    var angkatan = String(arsip.year - 4).slice(2);
    for (var i = 0; i < total; i++) {
      var name;
      do { name = pick(r, FIRST) + ' ' + pick(r, LAST); } while (used[name]);
      used[name] = 1;
      var sent = r() < 0.86;
      var sentCount = sent ? 1 + Math.floor(r() * 3) : 0;
      var firstSent = sent ? addDays(arsip.created, Math.floor(r() * 7)) : null;
      var lastSent = sent ? addDays(isoOf(firstSent), (sentCount - 1) * 7 + Math.floor(r() * 3)) : null;
      var filled = sent && r() < 0.62;
      var filledAt = filled ? addDays(isoOf(lastSent), 1 + Math.floor(r() * 9)) : null;
      var prodi = pick(r, PRODI);
      var nim = angkatan + '115' + String(100 + i * 7 + Math.floor(r() * 5)).padStart(5, '0');
      list.push({
        id: i + 1,
        name: name,
        nim: nim,
        prodi: prodi,
        email: name.toLowerCase().replace(/ /g, '.') + '@mail.ac.id',
        tahunLulus: arsip.year,
        sent: sent,
        sentCount: sentCount,
        firstSent: firstSent ? isoOf(firstSent) : '',
        lastSent: lastSent ? isoOf(lastSent) : '',
        filled: filled,
        filledAt: filledAt ? isoOf(filledAt) : '',
        answers: filled ? answersFor(arsip, rng(arsip.id * 104729 + i * 31 + 7)) : null
      });
    }
    return list;
  }

  window.KKArsip = {
    ARSIP: ARSIP,
    getArsip: getArsip,
    getAlumni: getAlumni,
    questionsOf: questionsOf,
    fmt: fmt,
    fmtLong: fmtLong
  };
})();
