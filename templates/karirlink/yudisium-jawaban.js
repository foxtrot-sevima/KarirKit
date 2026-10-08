/* Halaman jawaban lulusan pada detail yudisium:
     yudisium-jawaban.html         data-mode="terisi"  jawaban Pra-Lulus, Pasca-Lulus 1 dan 4 Tahun, dan Pengguna Lulusan
     yudisium-jawaban-kosong.html  data-mode="kosong"  semua gelombang belum terisi (menunggu mengisi atau belum dikirim)
   Data di bawah adalah contoh; di produksi datang dari API jawaban responden. Hanya-baca: tidak ada aksi kirim atau ubah. */
(function () {
  'use strict';

  var MODE = document.body.getAttribute('data-mode') === 'kosong' ? 'kosong' : 'terisi';
  var PERIOD = { name: 'Yudisium Genap 2025/2026', date: '28 Agu 2026', praSent: '14 Agu 2026' };
  var GELS = [
    { key: 'pra', label: 'Pra-Lulus', sent: '14 Agu 2026', schedule: '14 Agu 2026 sampai 27 Agu 2026' },
    { key: 'pasca-1', label: 'Pasca-Lulus 1 Tahun', sent: '28 Agu 2027', schedule: '28 Agu 2027 sampai 11 Sep 2027' },
    { key: 'pasca-4', label: 'Pasca-Lulus 4 Tahun', sent: '28 Agu 2030', schedule: '28 Agu 2030 sampai 11 Sep 2030' },
    { key: 'pengguna', label: 'Pengguna Lulusan', sent: '9 Sep 2027', schedule: 'Setelah Pasca-Lulus selesai' }
  ];

  // ---------------------------------------------------------------- pertanyaan (sumber: kuesioner-builder.html)
  var PRA_Q = [
    { title: 'Data Diri & Status', when: 'Semua responden', q: ['Alamat email aktif Anda saat ini', 'Nomor HP / WhatsApp aktif', 'Apakah Anda sudah bekerja atau berwirausaha sebelum lulus?'] },
    { title: 'Bekerja', when: 'Tampil jika sudah bekerja', q: ['Apa nama tempat Anda bekerja?'] },
    { title: 'Berwirausaha', when: 'Tampil jika sudah berwirausaha', q: ['Apa nama usaha/tempat Anda berwirausaha?'] },
    { title: 'Rencana Setelah Lulus', when: 'Semua responden', q: ['Apa rencana utama Anda setelah lulus?', 'Dukungan yang diharapkan dari kampus', 'Tautan profil LinkedIn'] },
    { title: 'Testimoni & Harapan', when: 'Semua responden', q: ['Testimoni pengalaman kuliah/kampus', 'Apa harapan Anda terhadap layanan bimbingan karir kampus sebelum lulus?'] }
  ];
  var PASCA = [
    { key: 'umum', title: 'Informasi Umum', when: 'Semua responden', q: [
      'Apakah pekerjaan/usaha yang Anda jalani sebelum lulus masih berlanjut?', 'Jelaskan status Anda saat ini?', 'Apakah Anda aktif mencari pekerjaan dalam 4 minggu terakhir?',
      'Sumber dana apa yang Anda gunakan untuk membiayai kuliah?', 'Berapa lama Anda mendapatkan pekerjaan/memulai usaha/melanjutkan pendidikan sejak lulus?'] },
    { key: 'work', title: 'Bekerja', when: 'Tampil jika status: bekerja', q: [
      'Apa tingkat tempat kerja Anda saat ini?', 'Dimana Anda bekerja saat ini?', 'Dimana provinsi Anda bekerja saat ini?', 'Dimana Kabupaten/Kota Anda bekerja saat ini?',
      'Apa jenis perusahaan/instansi/institusi tempat Anda bekerja saat ini?', 'Apa nama perusahaan/kantor tempat Anda bekerja saat ini?', 'Apa posisi/jabatan Anda di tempat kerja saat ini?',
      'Berapa rata-rata pendapatan Anda per bulan saat ini?', 'Seberapa erat hubungan antara bidang studi dengan pekerjaan Anda saat ini?', 'Tingkat pendidikan apa yang paling tepat/sesuai untuk pekerjaan Anda saat ini?',
      'Bagaimana Anda mencari pekerjaan tersebut?', 'Kapan Anda mulai mencari pekerjaan yang Anda jalani saat ini?', 'Jika mulai mencari sebelum lulus, berapa bulan sebelum lulus?',
      'Jika mulai mencari sesudah lulus, berapa bulan sesudah lulus?', 'Berapa perusahaan/instansi/institusi yang sudah Anda lamar sampai saat ini?', 'Berapa banyak perusahaan yang merespon lamaran Anda sampai saat ini?',
      'Berapa banyak perusahaan yang mengundang Anda untuk wawancara sampai saat ini?', 'Jika pekerjaan saat ini tidak sesuai pendidikan, mengapa mengambil pekerjaan tersebut?'] },
    { key: 'biz', title: 'Wiraswasta', when: 'Tampil jika status: berwiraswasta', q: [
      'Apa posisi/jabatan Anda saat ini?', 'Apa jenis perusahaan/usaha wiraswasta yang Anda kelola saat ini?', 'Apa nama perusahaan/kantor tempat Anda berwiraswasta saat ini?',
      'Apa tingkat/ukuran tempat berwiraswasta Anda saat ini?', 'Dimana provinsi tempat Anda berwiraswasta saat ini?', 'Dimana Kabupaten/Kota tempat Anda berwiraswasta saat ini?',
      'Berapa rata-rata pendapatan Anda per bulan saat ini?', 'Seberapa erat hubungan antara bidang studi dengan pekerjaan Anda saat ini?', 'Tingkat pendidikan apa yang paling tepat/sesuai untuk pekerjaan Anda saat ini?',
      'Kapan Anda mulai merencanakan berwiraswasta?', 'Jika sebelum lulus, berapa bulan sebelum lulus mulai merencanakannya?', 'Jika sesudah lulus, berapa bulan sesudah lulus mulai merencanakannya?',
      'Jika pekerjaan saat ini tidak sesuai pendidikan, mengapa mengambil pekerjaan tersebut?'] },
    { key: 'study', title: 'Melanjutkan Pendidikan', when: 'Tampil jika status: melanjutkan pendidikan', q: [
      'Dari manakah sumber biaya studi lanjut Anda?', 'Apa nama Perguruan Tinggi tempat Anda melanjutkan pendidikan?', 'Apa nama program studi yang Anda ambil dalam melanjutkan pendidikan?',
      'Kapan Anda mulai masuk melanjutkan pendidikan?', 'Seberapa erat hubungan antara bidang studi dengan pendidikan lanjut Anda?'] },
    { key: 'none', title: 'Tidak Kerja, Mencari Kerja', when: 'Tampil jika status: tidak bekerja, mencari kerja', q: [
      'Kapan Anda mulai mencari pekerjaan?', 'Bagaimana Anda mencari pekerjaan tersebut?', 'Berapa perusahaan/instansi/institusi yang sudah Anda lamar sampai saat ini?',
      'Berapa banyak perusahaan yang merespon lamaran Anda sampai saat ini?', 'Berapa banyak perusahaan yang mengundang Anda untuk wawancara sampai saat ini?'] },
    { key: 'komp', title: 'Tingkat Kompetensi', when: 'Semua responden', q: [
      'Pada tingkat mana kompetensi berikut Anda kuasai saat lulus, dan seberapa dibutuhkan saat ini?', 'Seberapa besar penekanan metode pembelajaran berikut dilaksanakan di program studi Anda?'] }
  ];
  var PENGGUNA = [
    { key: 'inti', title: 'Pertanyaan Inti', when: 'Wajib, tidak dapat dihapus', q: [
      'Bagaimana penilaian Anda terhadap etika kerja lulusan ini?', 'Bagaimana penilaian Anda terhadap keahlian di bidang ilmu (kompetensi utama)?', 'Bagaimana penilaian Anda terhadap kemampuan berbahasa asing?'] },
    { key: 'opsional', title: 'Pertanyaan Opsional Sistem', when: 'Dipilih admin dari daftar sistem', q: [
      'Apakah pekerjaan lulusan relevan dengan bidang studi?', 'Berapa kisaran gaji pertama lulusan di perusahaan Anda?', 'Apakah perusahaan Anda tertarik menjalin kerjasama magang?'] },
    { key: 'admin', title: 'Pertanyaan Buatan Admin', when: 'Ditambahkan oleh admin kampus', q: [
      'Apa saran Anda untuk pengembangan kurikulum kampus?', 'Skala kepuasan terhadap fasilitas kampus (1-5)'] }
  ];

  // ---------------------------------------------------------------- data lulusan
  function stars(n) { return { stars: n }; }
  function rp(n) { return { rp: n }; }
  var COMP = ['Etika', 'Keahlian pada bidang ilmu', 'Bahasa Inggris', 'Penggunaan teknologi informasi', 'Komunikasi', 'Kerja sama tim', 'Pengembangan diri'];
  var METODE = ['Perkuliahan', 'Demonstrasi', 'Partisipasi dalam proyek riset', 'Magang', 'Praktikum', 'Kerja lapangan', 'Diskusi'];
  var EMPH = { 1: 'Tidak sama sekali', 2: 'Kurang', 3: 'Cukup', 4: 'Besar', 5: 'Sangat besar' };
  function kompetensi(seed) {
    return [
      { comp: COMP.map(function (c, j) { return [c, 3 + ((seed + j * 2) % 3), 4 + ((seed + j) % 2)]; }) },
      { emph: METODE.map(function (m, j) { return [m, 3 + ((seed + j * 2) % 3)]; }) }
    ];
  }

  // jawaban Pasca-Lulus; hasil: { kind: 'work|biz|study|none', sections: { umum:[], <kind>:[], komp:[] } }
  function pascaWork(c) {
    return { kind: 'work', sections: {
      umum: ['Ya', 'Bekerja penuh waktu', 'Tidak', c.dana, c.lama],
      work: [c.tingkat, 'Dalam negeri', c.prov, c.kota, c.jenis, c.nama, c.posisi, rp(c.gaji), 'Sangat erat', 'Setingkat dengan ijazah', ['Portal karier kampus', 'Relasi atau alumni'],
        'Sebelum lulus', c.sebelum, 'Tidak berlaku', String(c.lamar), String(c.respon), String(c.wawancara), 'Tidak berlaku, pekerjaan sudah sesuai bidang studi'],
      komp: kompetensi(c.seed) } };
  }
  function pascaBiz(c) {
    return { kind: 'biz', sections: {
      umum: ['Ya', 'Berwiraswasta', 'Tidak', c.dana, c.lama],
      biz: ['Pemilik', c.jenis, c.nama, c.ukuran, c.prov, c.kota, rp(c.gaji), 'Sangat erat', 'Setingkat dengan ijazah', 'Sebelum lulus', c.sebelum, 'Tidak berlaku', 'Tidak berlaku, usaha sudah sesuai bidang studi'],
      komp: kompetensi(c.seed) } };
  }
  function pascaStudy(c) {
    return { kind: 'study', sections: {
      umum: ['Tidak', 'Melanjutkan pendidikan', 'Tidak', c.dana, c.lama],
      study: [c.biaya, c.pt, c.prodi, c.mulai, 'Sangat erat'],
      komp: kompetensi(c.seed) } };
  }
  function penggunaAnswers(c) {
    return { inti: [stars(c.a), stars(c.b), stars(c.c)], opsional: ['Ya, sangat relevan', c.gaji, c.magang], admin: [c.saran, stars(c.fas)] };
  }

  var FILLED = [
    { nim: '2111500214', name: 'Sari Puspita', prodi: 'S1 - Sistem Informasi', email: 'sari.puspita@mail.ac.id',
      pra: { filledAt: '22 Agu 2026', status: 'work', phone: '0812-3456-7801', place: 'PT Teknologi Nusantara', plan: 'Bekerja penuh waktu', support: ['Informasi lowongan', 'Pelatihan wawancara'], linkedin: 'linkedin.com/in/sari-puspita',
        testimonial: 'Dosen pembimbing sangat membantu dan kegiatan magang membuat saya lebih percaya diri masuk dunia kerja.', hope: 'Tolong perbanyak sesi konsultasi karier dan simulasi wawancara sebelum lulus.' },
      pasca1: { at: '3 Sep 2027', data: pascaWork({ seed: 1, dana: 'Biaya sendiri atau keluarga', lama: 'Kurang dari 3 bulan', tingkat: 'Nasional', prov: 'DKI Jakarta', kota: 'Jakarta Selatan', jenis: 'Perusahaan swasta', nama: 'PT Teknologi Nusantara', posisi: 'Junior Software Engineer', gaji: 8500000, sebelum: '2 bulan', lamar: 6, respon: 3, wawancara: 2 }) },
      pasca4: { at: '5 Sep 2030', data: pascaWork({ seed: 2, dana: 'Biaya sendiri atau keluarga', lama: 'Kurang dari 3 bulan', tingkat: 'Nasional', prov: 'DKI Jakarta', kota: 'Jakarta Selatan', jenis: 'Perusahaan swasta', nama: 'PT Teknologi Nusantara', posisi: 'Software Engineer', gaji: 14500000, sebelum: '2 bulan', lamar: 6, respon: 3, wawancara: 2 }) },
      pengguna: { at: '20 Sep 2027', data: penggunaAnswers({ a: 5, b: 4, c: 4, gaji: 'Rp8 - 10 juta', magang: 'Ya', saran: 'Tambahkan materi praktik pengembangan perangkat lunak dengan metode agile pada kurikulum.', fas: 4 }) } },
    { nim: '2111500552', name: 'Bella Lestari', prodi: 'S1 - Teknik Elektro', email: 'bella.lestari@mail.ac.id',
      pra: { filledAt: '21 Agu 2026', status: 'biz', phone: '0813-2200-1452', place: 'Bella Craft Studio', plan: 'Berwirausaha', support: ['Akses permodalan', 'Mentoring bisnis'], linkedin: 'linkedin.com/in/bella-lestari',
        testimonial: 'Mata kuliah kewirausahaan dan laboratorium kampus menjadi bekal utama saat merintis usaha.', hope: 'Adakan inkubator bisnis dan pertemuan rutin dengan alumni pengusaha.' },
      pasca1: { at: '1 Sep 2027', data: pascaBiz({ seed: 0, dana: 'Beasiswa', lama: 'Kurang dari 3 bulan', jenis: 'Usaha kerajinan dan elektronik rumahan', nama: 'Bella Craft Studio', ukuran: 'Usaha mikro', prov: 'Jawa Barat', kota: 'Bandung', gaji: 6000000, sebelum: '6 bulan' }) },
      pasca4: { at: '4 Sep 2030', data: pascaBiz({ seed: 1, dana: 'Beasiswa', lama: 'Kurang dari 3 bulan', jenis: 'Usaha kerajinan dan elektronik rumahan', nama: 'Bella Craft Studio', ukuran: 'Usaha kecil', prov: 'Jawa Barat', kota: 'Bandung', gaji: 18000000, sebelum: '6 bulan' }) },
      pengguna: { at: '18 Sep 2027', data: penggunaAnswers({ a: 5, b: 5, c: 4, gaji: 'Rp5 - 8 juta', magang: 'Ya', saran: 'Perbanyak proyek kolaborasi dengan pelaku usaha agar mahasiswa terbiasa dengan kebutuhan pasar.', fas: 5 }) } },
    { nim: '2111500778', name: 'Indah Nuraini', prodi: 'S1 - Sistem Informasi', email: 'indah.nuraini@mail.ac.id',
      pra: { filledAt: '25 Agu 2026', status: 'none', phone: '0857-9001-3378', place: '', plan: 'Melanjutkan studi', support: ['Rekomendasi beasiswa', 'Surat rekomendasi dosen'], linkedin: '',
        testimonial: 'Suasana belajar mendukung dan dosen terbuka untuk diskusi riset.', hope: 'Informasi beasiswa S2 sebaiknya dibagikan lebih awal.' },
      pasca1: { at: '10 Sep 2027', data: pascaStudy({ seed: 2, dana: 'Biaya sendiri atau keluarga', lama: '3 sampai 6 bulan', biaya: 'Beasiswa', pt: 'Universitas Indonesia', prodi: 'S2 - Ilmu Komputer', mulai: 'September 2026' }) },
      pasca4: { at: '8 Sep 2030', data: pascaWork({ seed: 0, dana: 'Biaya sendiri atau keluarga', lama: '3 sampai 6 bulan', tingkat: 'Nasional', prov: 'DKI Jakarta', kota: 'Jakarta Pusat', jenis: 'BUMN', nama: 'Bank Sentra Mandiri', posisi: 'Data Analyst', gaji: 11000000, sebelum: 'Tidak berlaku', lamar: 9, respon: 4, wawancara: 3 }) },
      pengguna: { at: '24 Sep 2027', data: penggunaAnswers({ a: 4, b: 5, c: 5, gaji: 'Rp10 - 12 juta', magang: 'Tidak', saran: 'Pertahankan porsi riset dan perkuat pelatihan menulis ilmiah berbahasa Inggris.', fas: 4 }) } },
    { nim: '2111501016', name: 'Hendra Wijaya', prodi: 'S1 - Teknik Informatika', email: 'hendra.wijaya@mail.ac.id',
      pra: { filledAt: '23 Agu 2026', status: 'work', phone: '0821-7788-1016', place: 'Bank Sentra Mandiri', plan: 'Bekerja penuh waktu', support: ['Informasi lowongan', 'Jejaring alumni'], linkedin: 'linkedin.com/in/hendra-wijaya',
        testimonial: 'Proyek akhir berbasis kasus nyata sangat membantu saya diterima bekerja sebelum wisuda.', hope: 'Perluas kerja sama industri agar mahasiswa punya lebih banyak pilihan magang.' },
      pasca1: { at: '2 Sep 2027', data: pascaWork({ seed: 1, dana: 'Biaya sendiri atau keluarga', lama: 'Kurang dari 3 bulan', tingkat: 'Nasional', prov: 'DKI Jakarta', kota: 'Jakarta Pusat', jenis: 'BUMN', nama: 'Bank Sentra Mandiri', posisi: 'IT Officer', gaji: 9500000, sebelum: '4 bulan', lamar: 4, respon: 2, wawancara: 2 }) },
      pasca4: { at: '6 Sep 2030', data: pascaWork({ seed: 2, dana: 'Biaya sendiri atau keluarga', lama: 'Kurang dari 3 bulan', tingkat: 'Nasional', prov: 'DKI Jakarta', kota: 'Jakarta Pusat', jenis: 'BUMN', nama: 'Bank Sentra Mandiri', posisi: 'IT Project Lead', gaji: 21000000, sebelum: '4 bulan', lamar: 4, respon: 2, wawancara: 2 }) },
      pengguna: { at: '19 Sep 2027', data: penggunaAnswers({ a: 5, b: 5, c: 5, gaji: 'Rp8 - 10 juta', magang: 'Ya', saran: 'Libatkan praktisi perbankan sebagai dosen tamu dan tambah studi kasus keamanan sistem.', fas: 4 }) } }
  ];
  var EMPTY = [
    { nim: '2111500101', name: 'Andi Nugroho', prodi: 'S1 - Teknik Informatika', email: 'andi.nugroho@mail.ac.id', state: 'menunggu' },
    { nim: '2111500327', name: 'Rudi Hartono', prodi: 'S1 - Teknik Informatika', email: 'rudi.hartono@mail.ac.id', state: 'menunggu' },
    { nim: '2111500439', name: 'Dewi Pratiwi', prodi: 'D3 - Manajemen Informatika', email: 'dewi.pratiwi@mail.ac.id', state: 'belum-dikirim' },
    { nim: '2111500665', name: 'Fajar Ardiansyah', prodi: 'S1 - Teknik Informatika', email: 'fajar.ardiansyah@mail.ac.id', state: 'menunggu' },
    { nim: '2111500890', name: 'Yoga Pratama', prodi: 'D3 - Manajemen Informatika', email: 'yoga.pratama@mail.ac.id', state: 'menunggu' },
    { nim: '2111500903', name: 'Maya Ramadhani', prodi: 'S1 - Teknik Elektro', email: 'maya.ramadhani@mail.ac.id', state: 'belum-dikirim' }
  ];
  var STATUS_LABEL = { work: 'Ya, sudah bekerja', biz: 'Ya, sudah berwirausaha', none: 'Belum bekerja atau berwirausaha' };

  // ---------------------------------------------------------------- helpers
  function $(id) { return document.getElementById(id); }
  function esc(s) { var d = document.createElement('div'); d.textContent = s == null ? '' : String(s); return d.innerHTML; }
  function initials(name) { var p = name.split(' '); return (p[0].charAt(0) + (p[1] ? p[1].charAt(0) : '')).toUpperCase(); }
  function rupiah(n) { return 'Rp' + Math.round(n).toLocaleString('id-ID'); }
  function cell(label, value, extra) { return '<div' + (extra ? ' class="' + extra + '"' : '') + '><p class="text-xs text-slate-400">' + label + '</p><p class="mt-0.5 text-sm font-medium text-slate-700">' + value + '</p></div>'; }
  function countQ(sections) { return sections.reduce(function (t, x) { return t + x.q.length; }, 0); }

  // ---- Tingkat Kompetensi: ditampilkan seperti form survei aslinya, skala 1-5 dengan jawaban yang dipilih disorot
  function scale(n, tone) {
    var on = tone === 'secondary' ? 'bg-secondary-500 text-white' : 'bg-primary-600 text-white';
    var out = '<span class="inline-flex items-center gap-1" role="img" aria-label="Dipilih ' + n + ' dari 5">';
    for (var i = 1; i <= 5; i++) {
      out += '<span class="flex h-6 w-6 items-center justify-center rounded-lg text-xs font-semibold sm:h-7 sm:w-7 ' + (i === n ? on : 'border border-slate-200 text-slate-400') + '">' + i + '</span>';
    }
    return out + '</span>';
  }
  function gap(have, need) {
    if (need > have) return '<span class="badge-warning">Perlu ditingkatkan</span>';
    if (need === have) return '<span class="badge-success">Sesuai kebutuhan</span>';
    return '<span class="badge-info">Melebihi kebutuhan</span>';
  }
  function scaleHint(low, high) {
    return '<p class="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500"><span><b class="font-semibold text-slate-700">1</b> = ' + low + '</span><span><b class="font-semibold text-slate-700">5</b> = ' + high + '</span></p>';
  }
  function compHtml(rows) {
    return scaleHint('Sangat rendah', 'Sangat tinggi') +
      '<div class="divide-y divide-slate-100 rounded-xl border border-slate-100">' +
      '<div class="hidden grid-cols-[minmax(0,1fr)_11.5rem_11.5rem] items-center gap-5 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-500 sm:grid"><span>Kompetensi</span>' +
        '<span class="flex items-center gap-1.5"><span class="h-2.5 w-2.5 rounded-md bg-primary-600"></span>Dikuasai saat lulus</span>' +
        '<span class="flex items-center gap-1.5"><span class="h-2.5 w-2.5 rounded-md bg-secondary-500"></span>Dibutuhkan saat ini</span></div>' +
      rows.map(function (r) {
        return '<div class="grid gap-x-5 gap-y-2.5 px-4 py-3.5 sm:grid-cols-[minmax(0,1fr)_11.5rem_11.5rem] sm:items-center">' +
          '<div><p class="text-sm font-medium text-slate-700">' + esc(r[0]) + '</p><p class="mt-1">' + gap(r[1], r[2]) + '</p></div>' +
          '<div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3"><span class="text-xs text-slate-400 sm:hidden">Dikuasai saat lulus</span>' + scale(r[1], 'primary') + '</div>' +
          '<div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3"><span class="text-xs text-slate-400 sm:hidden">Dibutuhkan saat ini</span>' + scale(r[2], 'secondary') + '</div></div>';
      }).join('') + '</div>';
  }
  function emphHtml(rows) {
    return scaleHint('Tidak sama sekali', 'Sangat besar') +
      '<div class="divide-y divide-slate-100 rounded-xl border border-slate-100">' + rows.map(function (r) {
        return '<div class="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5"><p class="min-w-0 text-sm text-slate-700">' + esc(r[0]) + '</p>' +
          '<div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">' + scale(r[1], 'primary') + '<span class="text-xs font-medium text-slate-600 sm:w-28">' + EMPH[r[1]] + '</span></div></div>';
      }).join('') + '</div>';
  }

  function valueHtml(v) {
    if (v && v.stars) {
      var out = '<span class="flex items-center gap-0.5" aria-label="' + v.stars + ' dari 5">';
      for (var i = 1; i <= 5; i++) out += '<i class="kk kk-star kk-fill h-4 w-4 ' + (i <= v.stars ? 'text-warning-500' : 'text-neutral-300') + '"></i>';
      return out + '<span class="ml-2 text-sm font-medium text-slate-700">' + v.stars + ' dari 5</span></span>';
    }
    if (v && v.rp) return '<span class="text-sm font-medium text-slate-800">' + rupiah(v.rp) + ' per bulan</span>';
    if (v && v.comp) return compHtml(v.comp);
    if (v && v.emph) return emphHtml(v.emph);
    if (Array.isArray(v)) return '<div class="flex flex-wrap gap-1.5">' + v.map(function (x) { return '<span class="badge-primary">' + esc(x) + '</span>'; }).join('') + '</div>';
    if (v === '' || v == null) return '<span class="text-sm text-slate-400">Tidak diisi</span>';
    return '<p class="text-sm leading-relaxed text-slate-800">' + esc(v) + '</p>';
  }

  // kartu jawaban: sections = [{ title, items: [[pertanyaan, nilai], ...] }]
  function answersHtml(sections) {
    var n = 0;
    return sections.map(function (sec) {
      return '<div class="card p-5 sm:p-6"><div class="flex items-center justify-between gap-2"><h3 class="text-base font-semibold text-slate-800">' + esc(sec.title) + '</h3><span class="badge-neutral">' + sec.items.length + ' pertanyaan</span></div>' +
        '<ol class="mt-4 divide-y divide-slate-100 rounded-xl border border-slate-100">' + sec.items.map(function (it) {
          n++;
          return '<li class="flex gap-3 p-4"><span class="kbd mt-0.5 shrink-0 self-start">' + n + '</span><div class="min-w-0 flex-1"><p class="text-sm text-slate-500">' + esc(it[0]) + '</p><div class="mt-1.5">' + valueHtml(it[1]) + '</div></div></li>';
        }).join('') + '</ol></div>';
    }).join('');
  }

  // pratinjau pertanyaan (bagian yang bisa dibuka), dipakai saat belum ada jawaban
  function previewHtml(sections) {
    var n = 0;
    return sections.map(function (sec, i) {
      return '<details class="card group overflow-hidden"' + (i === 0 ? ' open' : '') + '>' +
        '<summary class="flex cursor-pointer list-none items-center justify-between gap-3 p-5 sm:px-6">' +
          '<div class="min-w-0"><h3 class="text-base font-semibold text-slate-800">' + esc(sec.title) + '</h3><p class="mt-0.5 text-xs text-slate-400">' + esc(sec.when) + '</p></div>' +
          '<span class="flex shrink-0 items-center gap-2"><span class="badge-neutral">' + sec.q.length + ' pertanyaan</span><i class="kk kk-caret-down h-4 w-4 text-slate-400 transition-transform group-open:rotate-180"></i></span>' +
        '</summary>' +
        '<ol class="mx-5 mb-5 divide-y divide-slate-100 rounded-xl border border-slate-100 sm:mx-6 sm:mb-6">' + sec.q.map(function (t) {
          n++;
          return '<li class="flex items-start gap-3 p-3.5"><span class="kbd mt-0.5 shrink-0 self-start">' + n + '</span><p class="min-w-0 flex-1 text-sm text-slate-700">' + esc(t) + '</p></li>';
        }).join('') + '</ol></details>';
    }).join('');
  }

  // ---------------------------------------------------------------- render
  var LIST = MODE === 'kosong' ? EMPTY : FILLED;
  var nim = new URLSearchParams(location.search).get('nim');
  var idx = -1;
  LIST.forEach(function (s, i) { if (s.nim === nim) idx = i; });
  if (idx < 0 && MODE === 'kosong' && !nim) idx = 0;
  if (idx < 0) {
    $('ansContent').hidden = true;
    $('ansMissing').hidden = false;
    document.title = (MODE === 'kosong' ? 'Mahasiswa tidak ditemukan' : 'Jawaban tidak ditemukan') + ' | KarirLink';
    return;
  }
  var s = LIST[idx];
  var base = MODE === 'kosong' ? 'yudisium-jawaban-kosong.html' : 'yudisium-jawaban.html';
  var gelParam = new URLSearchParams(location.search).get('gelombang');
  var cur = GELS.filter(function (g) { return g.key === gelParam; })[0] || GELS[0];
  function href(key, nimValue) { return base + '?nim=' + nimValue + (key === 'pra' ? '' : '&gelombang=' + key); }

  document.title = (MODE === 'kosong' ? 'Belum ada jawaban ' : 'Jawaban ') + s.name + ' | KarirLink';
  $('ansName').textContent = s.name;
  $('ansMeta').textContent = 'NIM ' + s.nim + ' · ' + s.prodi + ' · ' + PERIOD.name;
  $('ansEmail').textContent = s.email;
  $('ansTabs').innerHTML = GELS.map(function (g) {
    var on = g.key === cur.key;
    return '<a href="' + href(g.key, s.nim) + '" class="tab whitespace-nowrap' + (on ? ' tab-active' : '') + '"' + (on ? ' aria-current="page"' : '') + '>' + g.label + '</a>';
  }).join('');

  var BADGE = {
    done: '<span class="badge-success"><span class="badge-dot bg-success-600"></span>Sudah Mengisi</span>',
    wait: '<span class="badge-warning"><span class="badge-dot bg-warning-600"></span>Menunggu Mengisi</span>',
    none: '<span class="badge-neutral"><span class="badge-dot bg-neutral-400"></span>Belum Dikirim</span>'
  };
  var INFO_ICON = 'kk kk-clock mt-0.5 h-4 w-4 shrink-0 text-info-600';

  if (MODE === 'terisi') {
    // ======================= semua gelombang sudah terisi
    $('ansStatus').innerHTML = BADGE.done;
    $('ansCalloutIcon').className = 'kk kk-sparkle mt-0.5 h-4 w-4 shrink-0 text-info-600';
    if (cur.key === 'pra') {
      var p = s.pra;
      $('ansCallout').textContent = 'Pra-Lulus dikirim sebelum yudisium untuk memetakan status kerja dan rencana setelah lulus. Jawabannya dipakai kampus untuk menyiapkan layanan karier bagi lulusan baru.';
      $('ansSummary').innerHTML =
        cell('Kuesioner', 'Kuesioner Lulusan', 'col-span-2 sm:col-span-1') + cell('Gelombang', 'Pra-Lulus') +
        cell('Periode Yudisium', esc(PERIOD.name), 'col-span-2 sm:col-span-1') + cell('Tanggal Yudisium', PERIOD.date) +
        cell('Dikirim Pada', PERIOD.praSent) + cell('Diisi Pada', esc(p.filledAt)) + cell('Status', 'Sudah mengisi');
      var secs = [{ title: 'Data Diri & Status', items: [
        [PRA_Q[0].q[0], s.email], [PRA_Q[0].q[1], p.phone], [PRA_Q[0].q[2], STATUS_LABEL[p.status]]] }];
      if (p.status === 'work') secs.push({ title: 'Bekerja', items: [[PRA_Q[1].q[0], p.place]] });
      if (p.status === 'biz') secs.push({ title: 'Berwirausaha', items: [[PRA_Q[2].q[0], p.place]] });
      secs.push({ title: 'Rencana Setelah Lulus', items: [[PRA_Q[3].q[0], p.plan], [PRA_Q[3].q[1], p.support], [PRA_Q[3].q[2], p.linkedin]] });
      secs.push({ title: 'Testimoni & Harapan', items: [[PRA_Q[4].q[0], p.testimonial], [PRA_Q[4].q[1], p.hope]] });
      $('ansSections').innerHTML = answersHtml(secs);
    } else if (cur.key === 'pengguna') {
      var u = s.pengguna;
      $('ansCallout').textContent = 'Survei Pengguna Lulusan diisi atasan lulusan untuk menilai kinerja di tempat kerja. Dikirim setelah lulusan menyelesaikan Pasca-Lulus, dan hasilnya melengkapi laporan tracer study.';
      $('ansSummaryTitle').textContent = 'Ringkasan Pengisian';
      $('ansSummary').innerHTML =
        cell('Kuesioner', 'Kuesioner Pengguna Lulusan', 'col-span-2 sm:col-span-1') + cell('Responden', 'Atasan lulusan') +
        cell('Periode Yudisium', esc(PERIOD.name), 'col-span-2 sm:col-span-1') + cell('Tanggal Yudisium', PERIOD.date) +
        cell('Dikirim Pada', cur.sent) + cell('Diisi Pada', esc(u.at)) + cell('Status', 'Sudah mengisi');
      $('ansSections').innerHTML = answersHtml(PENGGUNA.map(function (sec) {
        return { title: sec.title, items: sec.q.map(function (q, i) { return [q, u.data[sec.key][i]]; }) };
      }));
    } else {
      var w = cur.key === 'pasca-1' ? s.pasca1 : s.pasca4;
      $('ansCallout').textContent = cur.label + ' mencatat status karier lulusan ' + (cur.key === 'pasca-1' ? '1 tahun' : '4 tahun') + ' setelah yudisium dan menjadi bahan laporan tracer study. Bagian pertanyaan yang tampil mengikuti status yang dipilih lulusan: bekerja, wiraswasta, atau melanjutkan pendidikan.';
      $('ansSummary').innerHTML =
        cell('Kuesioner', 'Kuesioner Lulusan', 'col-span-2 sm:col-span-1') + cell('Gelombang', cur.label) +
        cell('Periode Yudisium', esc(PERIOD.name), 'col-span-2 sm:col-span-1') + cell('Tanggal Yudisium', PERIOD.date) +
        cell('Dikirim Pada', cur.sent) + cell('Diisi Pada', esc(w.at)) + cell('Status Saat Itu', { work: 'Bekerja', biz: 'Berwiraswasta', study: 'Melanjutkan pendidikan', none: 'Mencari kerja' }[w.data.kind]);
      $('ansSections').innerHTML = answersHtml(PASCA.filter(function (sec) {
        return sec.key === 'umum' || sec.key === 'komp' || sec.key === w.data.kind;
      }).map(function (sec) {
        return { title: sec.title, items: sec.q.map(function (q, i) { return [q, w.data.sections[sec.key][i]]; }) };
      }));
    }
  } else {
    // ======================= semua gelombang masih kosong
    var waiting = s.state === 'menunggu';
    var praEmpty = cur.key === 'pra';
    $('ansStatus').innerHTML = praEmpty && waiting ? BADGE.wait : BADGE.none;
    var first = esc(s.name);
    if (cur.key === 'pra') {
      $('ansCalloutIcon').className = INFO_ICON;
      $('ansCallout').innerHTML = waiting
        ? '<span class="font-medium text-slate-800">Pra-Lulus</span> sudah dikirim ' + PERIOD.praSent + ' tetapi ' + first + ' belum mengisi, jadi belum ada jawaban.'
        : '<span class="font-medium text-slate-800">Pra-Lulus</span> belum pernah dikirim ke ' + first + ', jadi belum ada jawaban.';
      $('ansSummary').innerHTML =
        cell('Kuesioner', 'Kuesioner Lulusan', 'col-span-2 sm:col-span-1') + cell('Gelombang', 'Pra-Lulus') +
        cell('Periode Yudisium', esc(PERIOD.name), 'col-span-2 sm:col-span-1') + cell('Tanggal Yudisium', PERIOD.date) +
        cell('Dikirim Pada', waiting ? PERIOD.praSent : '-') + cell('Diisi Pada', '-') + cell('Status', waiting ? 'Menunggu mengisi' : 'Belum dikirim');
      $('ansSections').innerHTML = '<div><h3 class="text-base font-semibold text-slate-800">Pratinjau Pertanyaan</h3><p class="mt-1 text-sm text-slate-500">' + countQ(PRA_Q) + ' pertanyaan dalam ' + PRA_Q.length + ' bagian.</p></div>' + previewHtml(PRA_Q);
    } else if (cur.key === 'pengguna') {
      $('ansSummaryTitle').textContent = 'Ringkasan Pengiriman';
      $('ansCalloutIcon').className = INFO_ICON;
      $('ansCallout').innerHTML = '<span class="font-medium text-slate-800">Survei Pengguna Lulusan</span> belum dikirim. Survei ini dikirim ke atasan ' + first + ' lewat CTA setelah lulusan menyelesaikan kuesioner Pasca-Lulus, jadi belum ada jawaban.';
      $('ansSummary').innerHTML =
        cell('Kuesioner', 'Kuesioner Pengguna Lulusan', 'col-span-2 sm:col-span-1') + cell('Responden', 'Atasan lulusan') +
        cell('Waktu Pengiriman', 'Setelah Pasca-Lulus selesai', 'col-span-2 sm:col-span-1') + cell('Periode Yudisium', esc(PERIOD.name)) +
        cell('Tanggal Yudisium', PERIOD.date) + cell('Status', 'Belum dikirim');
      $('ansSections').innerHTML = '<div><h3 class="text-base font-semibold text-slate-800">Pratinjau Pertanyaan</h3><p class="mt-1 text-sm text-slate-500">' + countQ(PENGGUNA) + ' pertanyaan dalam ' + PENGGUNA.length + ' tingkatan. Data atasan (nama, jabatan, kontak) tidak dikumpulkan di sini.</p></div>' + previewHtml(PENGGUNA);
    } else {
      $('ansSummaryTitle').textContent = 'Ringkasan Pengiriman';
      $('ansCalloutIcon').className = INFO_ICON;
      $('ansCallout').innerHTML = '<span class="font-medium text-slate-800">' + cur.label + '</span> belum dikirim; dijadwalkan ' + cur.schedule + ' sesuai Pengaturan Gelombang Pengiriman, jadi belum ada jawaban.';
      $('ansSummary').innerHTML =
        cell('Kuesioner', 'Kuesioner Lulusan', 'col-span-2 sm:col-span-1') + cell('Gelombang', cur.label) +
        cell('Jadwal Pengiriman', cur.schedule, 'col-span-2 sm:col-span-1') + cell('Periode Yudisium', esc(PERIOD.name)) +
        cell('Tanggal Yudisium', PERIOD.date) + cell('Status', 'Belum dikirim');
      $('ansSections').innerHTML = '<div><h3 class="text-base font-semibold text-slate-800">Pratinjau Pertanyaan</h3><p class="mt-1 text-sm text-slate-500">' + countQ(PASCA) + ' pertanyaan dalam ' + PASCA.length + ' bagian. Pasca-Lulus 1 dan 4 Tahun memakai struktur yang sama; bagian status tampil sesuai jawaban lulusan.</p></div>' + previewHtml(PASCA);
    }
  }

  function link(el, t) {
    if (!t) { el.setAttribute('aria-disabled', 'true'); el.classList.add('pointer-events-none', 'opacity-50'); el.removeAttribute('href'); return; }
    el.setAttribute('href', href(cur.key, t.nim));
  }
  link($('ansPrev'), LIST[idx - 1]);
  link($('ansNext'), LIST[idx + 1]);
})();
