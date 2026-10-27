/* Contoh File Upload — satu sumber untuk Storybook (FileUpload.stories.js) dan index.html.
   Tiap contoh: { key, name, note, demo }. Perilaku lewat assets/js/file-upload.js (data-file-upload). */

const ic = (n, cls = "") => `<i class="kk kk-${n} ${cls}" aria-hidden="true"></i>`;

const drop = ({ id, accept, multiple = false, title = "Klik untuk unggah", hint, icon = "cloud-arrow-up", disabled = false }) => `<label class="upload-drop" for="${id}">
    <input id="${id}" type="file" class="sr-only" accept="${accept}"${multiple ? " multiple" : ""}${disabled ? " disabled" : ""} />
    <span class="upload-icon">${ic(icon)}</span>
    <span class="upload-title"><b>${title}</b><span class="upload-or"> atau seret file ke sini</span></span>
    <span class="upload-hint">${hint}</span>
  </label>`;

export const examples = [
  {
    key: "input",
    name: "File input",
    note: "Input file standar dengan gaya <code>.input-file</code>: tombol \"Choose file\" bawaan browser dipakai ulang tanpa JS. Cocok untuk satu berkas di formulir yang padat.",
    demo: `<div class="w-full">
  <label class="form-label" for="fu-input">Unggah proposal</label>
  <input id="fu-input" type="file" class="input input-file" accept=".pdf,.doc,.docx" />
  <p class="form-hint">PDF, DOC, atau DOCX, maksimal 5 MB.</p>
</div>`,
  },
  {
    key: "dropzone",
    name: "Dropzone",
    note: "<code>.upload</code> + <code>.upload-drop</code>: klik atau seret file. Format dibaca dari <code>accept</code>, batas ukuran dari <code>data-upload-max-size</code> (MB); file yang ditolak menampilkan pesan di <code>.form-error</code>. Di ponsel teks \"atau seret\" disembunyikan dan area lebih ringkas.",
    demo: `<div class="upload w-full" data-file-upload data-upload-max-size="5">
  <label class="form-label">Proposal Kegiatan</label>
  ${drop({ id: "fu-drop", accept: ".pdf,.doc,.docx", hint: "PDF, DOC, atau DOCX (maks. 5 MB)", icon: "file-arrow-up" })}
</div>`,
  },
  {
    key: "multiple",
    name: "Multiple files with progress",
    note: "Atribut <code>multiple</code> pada input dan <code>data-upload-max-files</code> membatasi jumlah. <code>data-upload-simulate=\"true\"</code> menampilkan progres palsu untuk mockup; di aplikasi, isi progres lewat <code>KKUpload.progress(el, file, persen)</code>.",
    demo: `<div class="upload w-full" data-file-upload data-upload-max-size="10" data-upload-max-files="4" data-upload-simulate="true">
  <label class="form-label">Berkas Pendukung</label>
  ${drop({ id: "fu-multi", accept: ".pdf,.jpg,.jpeg,.png", multiple: true, title: "Klik untuk unggah", hint: "PDF, JPG, atau PNG, maksimal 4 file (maks. 10 MB per file)" })}
</div>`,
  },
  {
    key: "image",
    name: "Image preview",
    note: "<code>data-upload-preview=\"image\"</code> menampilkan miniatur gambar yang dipilih (poster, logo, foto). File non-gambar memakai ikon berkas.",
    demo: `<div class="upload w-full" data-file-upload data-upload-max-size="2" data-upload-preview="image">
  <label class="form-label">Poster</label>
  ${drop({ id: "fu-image", accept: ".jpg,.jpeg,.png", hint: "JPG atau PNG (maks. 2 MB)", icon: "image" })}
</div>`,
  },
  {
    key: "compact",
    name: "Compact",
    note: "<code>.upload-compact</code>: satu baris dengan ikon di kiri, untuk formulir yang tidak butuh area besar (pengaturan, modal).",
    demo: `<div class="upload upload-compact w-full" data-file-upload data-upload-max-size="2" data-upload-preview="image">
  <label class="form-label">Logo Kampus</label>
  <label class="upload-drop" for="fu-compact">
    <input id="fu-compact" type="file" class="sr-only" accept=".jpg,.jpeg,.png" />
    <span class="upload-icon">${ic("image")}</span>
    <span class="upload-text"><span class="upload-title"><b>Klik untuk pilih file</b></span><span class="upload-hint">JPG, JPEG, atau PNG (maks. 2 MB)</span></span>
  </label>
</div>`,
  },
  {
    key: "sizes",
    name: "Sizes",
    note: "Lebar selalu mengikuti wadah. Tinggi area diatur lewat <code>.upload-sm</code> (7rem), bawaan (11rem), atau <code>.upload-lg</code> (16rem); nilai bebas lewat <code>style=\"--upload-h: 12rem\"</code>. Di ponsel tinggi dibatasi 8,5rem.",
    demo: `<div class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
  <div class="upload upload-sm" data-file-upload><label class="form-label">Kecil</label>${drop({ id: "fu-sm", accept: ".pdf", hint: "PDF (maks. 5 MB)" })}</div>
  <div class="upload upload-lg" data-file-upload><label class="form-label">Besar</label>${drop({ id: "fu-lg", accept: ".pdf", hint: "PDF (maks. 5 MB)" })}</div>
</div>`,
  },
  {
    key: "error",
    name: "Error",
    note: "Tambahkan <code>aria-invalid=\"true\"</code> pada <code>.upload</code> dan <code>.form-error</code> di bawahnya. Pesan ini juga diisi otomatis saat format atau ukuran file ditolak (event <code>upload:error</code>).",
    demo: `<div class="upload w-full" data-file-upload aria-invalid="true">
  <label class="form-label">Proposal Kegiatan</label>
  ${drop({ id: "fu-error", accept: ".pdf,.doc,.docx", hint: "PDF, DOC, atau DOCX (maks. 5 MB)", icon: "file-arrow-up" })}
  <p class="form-error" data-upload-error>Proposal wajib diunggah untuk kegiatan kerja sama.</p>
</div>`,
  },
  {
    key: "disabled",
    name: "Disabled",
    note: "Atribut <code>disabled</code> pada input menonaktifkan klik dan seret.",
    demo: `<div class="upload w-full" data-file-upload>
  <label class="form-label">Berkas</label>
  ${drop({ id: "fu-disabled", accept: ".pdf", hint: "Unggah dinonaktifkan", disabled: true })}
</div>`,
  },
];

export const byKey = Object.fromEntries(examples.map((e) => [e.key, e]));
