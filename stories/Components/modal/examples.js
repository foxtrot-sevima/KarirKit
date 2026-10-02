/* Contoh Modal — satu sumber untuk Storybook (Modal.stories.js) dan index.html.
   Tiap contoh: { key, name, note, wide?, demo, modals }
     demo   = tombol pemicu (diletakkan di kotak contoh)
     modals = markup modal (letakkan di mana saja; index.html menaruhnya di akhir section)
   Perilaku (buka/tutup/Escape/fokus) ada di assets/js/modal.js. */

const close = (id) =>
  `<button type="button" class="modal-close" data-modal-hide="${id}" aria-label="Tutup"><i class="kk kk-x h-4 w-4"></i></button>`;

const header = (id, title, description) => `
        <div class="modal-header">
          <div>
            <h3 class="modal-title">${title}</h3>${description ? `\n            <p class="modal-description">${description}</p>` : ""}
          </div>
          ${close(id)}
        </div>`;

const lorem = {
  a: "Dengan menggunakan KarirLink, Anda menyetujui bahwa data profil dan CV yang diunggah dapat dilihat oleh perusahaan mitra yang Anda lamar. Kami hanya membagikan informasi yang Anda isi sendiri dan tidak menjualnya kepada pihak lain.",
  b: "Perusahaan wajib menjaga kerahasiaan data pelamar, menggunakannya semata-mata untuk proses rekrutmen, dan menghapusnya sesuai kebijakan retensi yang berlaku setelah proses seleksi selesai.",
};

const SIZE_LIST = [
  ["sm", "Small", "modal-sm"],
  ["md", "Default", "modal-md"],
  ["lg", "Large", "modal-lg"],
  ["xl", "Extra large", "modal-xl"],
  ["2xl", "2X large", "modal-2xl"],
];

const PLACEMENTS = [
  ["top-left", "Kiri atas"],
  ["top-center", "Atas"],
  ["top-right", "Kanan atas"],
  ["center-left", "Kiri"],
  ["center", "Tengah"],
  ["center-right", "Kanan"],
  ["bottom-left", "Kiri bawah"],
  ["bottom-center", "Bawah"],
  ["bottom-right", "Kanan bawah"],
];

const longBody = Array.from({ length: 7 }, (_, i) => `<p class="${i ? "mt-3 " : ""}leading-relaxed">${i % 2 ? lorem.b : lorem.a}</p>`).join("\n          ");

const choice = (icon, title, text) => `
            <li>
              <button type="button" class="flex w-full cursor-pointer items-center gap-3 rounded-lg border border-border p-3 text-left transition-colors hover:border-primary-300 hover:bg-primary-50/50" data-modal-hide="mdl-choice">
                <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600"><i class="kk ${icon} h-5 w-5"></i></span>
                <span class="min-w-0 flex-1"><span class="block text-sm font-semibold text-fg">${title}</span><span class="block text-xs text-fg-muted">${text}</span></span>
                <i class="kk kk-caret-right h-4 w-4 shrink-0 text-fg-subtle"></i>
              </button>
            </li>`;

const step = (icon, title, date, text, last) => `
            <li class="${last ? "" : "mb-6 "}ms-6">
              <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-50 text-primary-600 ring-8 ring-surface"><i class="kk ${icon} h-3.5 w-3.5"></i></span>
              <h4 class="text-sm font-semibold text-fg">${title}</h4>
              <time class="mb-1 block text-xs text-fg-subtle">${date}</time>
              <p class="text-sm text-fg-muted">${text}</p>
            </li>`;

export const examples = [
  {
    key: "default",
    name: "Default modal",
    note: "Header dengan tombol tutup, isi, dan footer aksi. Tutup lewat tombol X, tombol di footer, klik area gelap, atau Escape.",
    demo: `<button type="button" class="btn-primary btn-md" data-modal-toggle="mdl-default">Tampilkan modal</button>`,
    modals: `
    <div class="modal-backdrop" id="mdl-default">
      <div class="modal-panel modal-lg">${header("mdl-default", "Syarat dan Ketentuan")}
        <div class="modal-body space-y-3 leading-relaxed">
          <p>${lorem.a}</p>
          <p>${lorem.b}</p>
        </div>
        <div class="modal-footer modal-footer-start">
          <button type="button" class="btn-primary btn-md" data-modal-hide="mdl-default">Saya setuju</button>
          <button type="button" class="btn-outline btn-md" data-modal-hide="mdl-default">Tolak</button>
        </div>
      </div>
    </div>`,
  },
  {
    key: "popup",
    name: "Pop-up modal",
    note: "Konfirmasi singkat: ikon, pesan, dan dua tombol di tengah (kelas .modal-popup + .modal-icon).",
    demo: `<button type="button" class="btn-danger btn-md" data-modal-toggle="mdl-popup"><i class="kk kk-trash h-4 w-4"></i>Hapus lowongan</button>`,
    modals: `
    <div class="modal-backdrop" id="mdl-popup">
      <div class="modal-panel modal-sm modal-popup">
        ${close("mdl-popup")}
        <div class="modal-body">
          <span class="modal-icon modal-icon-danger"><i class="kk kk-warning-circle h-7 w-7"></i></span>
          <h3 class="modal-title text-lg">Hapus lowongan ini?</h3>
          <p class="mt-1.5 text-sm text-fg-muted">Lowongan &ldquo;Backend Engineer Intern&rdquo; beserta seluruh data pelamarnya akan dihapus permanen.</p>
          <div class="modal-footer-body">
            <button type="button" class="btn-danger btn-md" data-modal-hide="mdl-popup">Ya, hapus</button>
            <button type="button" class="btn-outline btn-md" data-modal-hide="mdl-popup">Batal</button>
          </div>
        </div>
      </div>
    </div>`,
  },
  {
    key: "form",
    name: "Form element",
    note: "Form di dalam modal, mis. masuk atau undang anggota.",
    demo: `<button type="button" class="btn-primary btn-md" data-modal-toggle="mdl-form"><i class="kk kk-lock-simple h-4 w-4"></i>Masuk</button>`,
    modals: `
    <div class="modal-backdrop" id="mdl-form">
      <div class="modal-panel modal-md">${header("mdl-form", "Masuk ke KarirLink", "Gunakan email kampus atau email pribadi Anda.")}
        <form class="flex min-h-0 flex-1 flex-col" onsubmit="return false">
          <div class="modal-body space-y-4">
            <div>
              <label class="form-label" for="mdl-form-email">Email</label>
              <input id="mdl-form-email" type="email" class="input" placeholder="nama@kampus.ac.id" />
            </div>
            <div>
              <label class="form-label" for="mdl-form-pass">Kata sandi</label>
              <input id="mdl-form-pass" type="password" class="input" placeholder="••••••••" />
            </div>
            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 text-fg-muted"><input type="checkbox" class="form-check" />Ingat saya</label>
              <a href="#" class="card-link">Lupa kata sandi?</a>
            </div>
          </div>
          <div class="modal-footer modal-footer-between">
            <p class="text-sm text-fg-muted">Belum terdaftar? <a href="#" class="card-link">Buat akun</a></p>
            <button type="submit" class="btn-primary btn-md" data-modal-hide="mdl-form">Masuk</button>
          </div>
        </form>
      </div>
    </div>`,
  },
  {
    key: "sizes",
    name: "Modal sizes",
    note: "Lebar diatur di panel: .modal-sm, .modal-md (default), .modal-lg, .modal-xl, .modal-2xl.",
    demo: `<div class="flex flex-wrap gap-2">${SIZE_LIST.map(([k, label]) => `<button type="button" class="btn-outline btn-md" data-modal-toggle="mdl-size-${k}">${label}</button>`).join("")}</div>`,
    modals: SIZE_LIST.map(
      ([k, label, cls]) => `
    <div class="modal-backdrop" id="mdl-size-${k}">
      <div class="modal-panel ${cls}">${header(`mdl-size-${k}`, `Modal ${label.toLowerCase()}`)}
        <div class="modal-body">Lebar panel ini memakai <code class="kbd">.${cls}</code>. Di layar sempit semua ukuran otomatis memenuhi lebar layar dikurangi jarak tepi.</div>
        <div class="modal-footer">
          <button type="button" class="btn-primary btn-md" data-modal-hide="mdl-size-${k}">Mengerti</button>
        </div>
      </div>
    </div>`
    ).join(""),
  },
  {
    key: "placement",
    name: "Modal placement",
    wide: true,
    note: "Posisi di layar lewat kelas pada .modal-backdrop, atau per pemicu dengan data-modal-placement (top-left … bottom-right, default center).",
    demo: `<div class="grid max-w-md grid-cols-3 gap-2">${PLACEMENTS.map(
      ([p, label]) => `<button type="button" class="btn-outline btn-sm" data-modal-toggle="mdl-placement" data-modal-placement="${p}" title="${p}">${label}</button>`
    ).join("")}</div>`,
    modals: `
    <div class="modal-backdrop" id="mdl-placement">
      <div class="modal-panel modal-sm">${header("mdl-placement", "Posisi modal")}
        <div class="modal-body">Posisi diatur lewat <code class="kbd">data-modal-placement</code> pada tombol pemicu, mis. <code class="kbd">top-right</code> menambahkan <code class="kbd">.modal-top-right</code> ke backdrop.</div>
        <div class="modal-footer">
          <button type="button" class="btn-outline btn-md" data-modal-hide="mdl-placement">Tutup</button>
        </div>
      </div>
    </div>`,
  },
  {
    key: "static",
    name: "Static modal",
    note: "data-modal-backdrop=\"static\": klik di luar tidak menutup modal, jadi pengguna harus memilih salah satu tombol (Escape tetap menutup; matikan dengan data-modal-keyboard=\"false\").",
    demo: `<button type="button" class="btn-outline btn-md" data-modal-toggle="mdl-static">Static modal</button>`,
    modals: `
    <div class="modal-backdrop" id="mdl-static" data-modal-backdrop="static" data-modal-keyboard="false">
      <div class="modal-panel modal-lg">${header("mdl-static", "Persetujuan penggunaan data")}
        <div class="modal-body space-y-3 leading-relaxed">
          <p>${lorem.a}</p>
          <p class="font-medium text-fg">Modal ini tidak bisa ditutup dengan klik di luar atau Escape. Pilih salah satu tombol untuk melanjutkan.</p>
        </div>
        <div class="modal-footer modal-footer-start">
          <button type="button" class="btn-primary btn-md" data-modal-hide="mdl-static">Saya setuju</button>
          <button type="button" class="btn-outline btn-md" data-modal-hide="mdl-static">Tolak</button>
        </div>
      </div>
    </div>`,
  },
  {
    key: "scrolling",
    name: "Scrolling modal",
    note: "Isi panjang menggulir di dalam .modal-body; header dan footer tetap terlihat dan panel tidak pernah lebih tinggi dari layar.",
    demo: `<button type="button" class="btn-outline btn-md" data-modal-toggle="mdl-scrolling">Scrolling modal</button>`,
    modals: `
    <div class="modal-backdrop" id="mdl-scrolling">
      <div class="modal-panel modal-lg">${header("mdl-scrolling", "Kebijakan Privasi")}
        <div class="modal-body">
          ${longBody}
        </div>
        <div class="modal-footer modal-footer-start">
          <button type="button" class="btn-primary btn-md" data-modal-hide="mdl-scrolling">Saya mengerti</button>
        </div>
      </div>
    </div>`,
  },
  {
    key: "timeline",
    name: "Timeline modal",
    note: "Modal berisi linimasa, mis. tahapan seleksi.",
    demo: `<button type="button" class="btn-outline btn-md" data-modal-toggle="mdl-timeline"><i class="kk kk-calendar-check h-4 w-4"></i>Lihat tahapan seleksi</button>`,
    modals: `
    <div class="modal-backdrop" id="mdl-timeline">
      <div class="modal-panel modal-md">${header("mdl-timeline", "Tahapan Seleksi Magang", "Program Magang Batch Genap 2026")}
        <div class="modal-body">
          <ol class="relative ms-3 border-s border-border">${step("kk-file-text", "Pendaftaran dibuka", "1 – 15 November 2026", "Unggah CV dan portofolio melalui KarirLink.")}${step("kk-clipboard-text", "Seleksi administrasi", "16 – 20 November 2026", "Tim HR memeriksa kelengkapan berkas dan kesesuaian jurusan.")}${step("kk-calendar-check", "Wawancara", "23 – 27 November 2026", "Wawancara daring dengan calon mentor, jadwal dikirim lewat email.")}${step("kk-seal-check", "Pengumuman", "1 Desember 2026", "Hasil akhir diumumkan di dashboard KarirLink.", true)}
          </ol>
        </div>
        <div class="modal-footer modal-footer-start">
          <button type="button" class="btn-primary btn-md" data-modal-hide="mdl-timeline">Daftar sekarang</button>
          <button type="button" class="btn-outline btn-md" data-modal-hide="mdl-timeline">Nanti saja</button>
        </div>
      </div>
    </div>`,
  },
  {
    key: "choice",
    name: "Choice list modal",
    note: "Daftar pilihan berikon, mis. memilih metode verifikasi.",
    demo: `<button type="button" class="btn-outline btn-md" data-modal-toggle="mdl-choice"><i class="kk kk-shield-check h-4 w-4"></i>Verifikasi akun</button>`,
    modals: `
    <div class="modal-backdrop" id="mdl-choice">
      <div class="modal-panel modal-sm">${header("mdl-choice", "Pilih metode verifikasi")}
        <div class="modal-body">
          <p class="mb-4">Pilih cara untuk memastikan akun ini milik Anda.</p>
          <ul class="space-y-2.5">${choice("kk-envelope-simple", "Email kampus", "Kirim tautan verifikasi ke email .ac.id")}${choice("kk-device-mobile", "Nomor ponsel", "Kode OTP via SMS atau WhatsApp")}${choice("kk-identification-card", "Kartu mahasiswa", "Unggah foto KTM aktif")}
          </ul>
          <a href="#" class="card-link mt-4">Mengapa perlu verifikasi?</a>
        </div>
      </div>
    </div>`,
  },
  {
    key: "create",
    name: "Create modal",
    note: "Form dua kolom di modal besar, mis. menambah lowongan baru.",
    demo: `<button type="button" class="btn-primary btn-md" data-modal-toggle="mdl-create"><i class="kk kk-plus h-4 w-4"></i>Tambah lowongan</button>`,
    modals: `
    <div class="modal-backdrop" id="mdl-create">
      <div class="modal-panel modal-xl">${header("mdl-create", "Tambah Lowongan", "Isi detail lowongan yang akan ditampilkan ke pencari kerja.")}
        <form class="flex min-h-0 flex-1 flex-col" onsubmit="return false">
          <div class="modal-body">
            <div class="grid gap-4 sm:grid-cols-2">
              <div class="sm:col-span-2">
                <label class="form-label" for="mdl-c-title">Judul lowongan</label>
                <input id="mdl-c-title" type="text" class="input" placeholder="mis. Backend Engineer Intern" />
              </div>
              <div>
                <label class="form-label" for="mdl-c-type">Tipe</label>
                <select id="mdl-c-type" class="input"><option>Magang</option><option>Penuh waktu</option><option>Paruh waktu</option><option>Kontrak</option></select>
              </div>
              <div>
                <label class="form-label" for="mdl-c-loc">Lokasi</label>
                <input id="mdl-c-loc" type="text" class="input" placeholder="mis. Surabaya" />
              </div>
              <div class="sm:col-span-2">
                <label class="form-label" for="mdl-c-desc">Deskripsi</label>
                <textarea id="mdl-c-desc" rows="4" class="input h-auto py-2.5" placeholder="Tanggung jawab dan kualifikasi..."></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer modal-footer-start">
            <button type="submit" class="btn-primary btn-md" data-modal-hide="mdl-create"><i class="kk kk-plus h-4 w-4"></i>Tambah lowongan</button>
            <button type="button" class="btn-outline btn-md" data-modal-hide="mdl-create">Batal</button>
          </div>
        </form>
      </div>
    </div>`,
  },
];

export const byKey = Object.fromEntries(examples.map((e) => [e.key, e]));
