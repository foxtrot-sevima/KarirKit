/* Contoh Datepicker — satu sumber untuk Storybook (Datepicker.stories.js) dan index.html.
   Tiap contoh: { key, name, note, wide?, storyPad?, demo, modals? }
     demo     = markup contoh (kotak contoh di index.html)
     modals   = markup modal pendukung (opsional; diletakkan di akhir section)
     storyPad = kelas padding tambahan hanya untuk Storybook (ruang untuk kalender yang membuka ke atas)
   Perilaku (popup, inline, range, format, min/max) ada di assets/js/datepicker.js. */

const field = ({ id, label, attrs = "", hint = "", placeholder = "dd/mm/yyyy", cls = "" }) => `
<div class="${cls}">
  <label class="form-label" for="${id}">${label}</label>
  <div class="datepicker">
    <i class="kk kk-calendar-blank datepicker-icon h-4 w-4"></i>
    <input id="${id}" type="text" class="input" placeholder="${placeholder}" ${attrs} data-datepicker />
  </div>${hint ? `\n  <p class="form-hint">${hint}</p>` : ""}
</div>`;

const range = (id, attrs = "") => `
<div class="datepicker-range" data-daterangepicker ${attrs}>
  <div class="datepicker min-w-0 flex-1">
    <i class="kk kk-calendar-blank datepicker-icon h-4 w-4"></i>
    <input id="${id}-start" type="text" class="input" placeholder="Tanggal mulai" aria-label="Tanggal mulai" />
  </div>
  <span class="datepicker-range-sep">sampai</span>
  <div class="datepicker min-w-0 flex-1">
    <i class="kk kk-calendar-blank datepicker-icon h-4 w-4"></i>
    <input id="${id}-end" type="text" class="input" placeholder="Tanggal selesai" aria-label="Tanggal selesai" />
  </div>
</div>`;

export const examples = [
  {
    key: "default",
    name: "Default datepicker",
    note: "Input dengan ikon kalender: klik atau fokus untuk membuka kalender, atau ketik langsung (default dd/mm/yyyy). Judul bulan membuka tampilan bulan lalu tahun. Tutup lewat pilihan tanggal, Escape, atau klik di luar.",
    demo: `<div class="max-w-xs">${field({ id: "dp-default", label: "Tanggal mulai kerja", hint: "Ketik langsung atau pilih lewat kalender." })}</div>`,
  },
  {
    key: "inline",
    name: "Inline datepicker",
    note: "Kalender selalu terlihat tanpa input: data-datepicker-inline. Nilai terpilih bisa ditampilkan lewat data-datepicker-output atau event datepicker:change.",
    demo: `<div data-datepicker-inline data-date="2026-10-08" data-datepicker-output="#dp-inline-out"></div>
<p class="mt-3 text-sm text-fg-muted">Dipilih: <b id="dp-inline-out" class="text-fg">–</b></p>`,
  },
  {
    key: "title",
    name: "Datepicker with title",
    note: "Judul di dalam kalender lewat data-datepicker-title.",
    demo: `<div class="max-w-xs">${field({ id: "dp-title", label: "Jadwal wawancara", attrs: 'data-datepicker-title="Pilih tanggal wawancara"' })}</div>`,
  },
  {
    key: "buttons",
    name: "Datepicker with buttons",
    note: "Footer Hari ini dan Hapus lewat data-datepicker-buttons. Tambahkan data-datepicker-autoselect-today untuk mengisi hari ini otomatis.",
    demo: `<div class="max-w-xs">${field({ id: "dp-buttons", label: "Tanggal lahir", attrs: "data-datepicker-buttons data-datepicker-autoselect-today" })}</div>`,
  },
  {
    key: "autohide",
    name: "Autohide",
    note: "Kalender menutup otomatis setelah memilih tanggal. Matikan dengan data-datepicker-autohide=\"false\" supaya tetap terbuka.",
    demo: `<div class="grid gap-4 sm:grid-cols-2">
${field({ id: "dp-autohide-on", label: "Menutup otomatis (default)" })}
${field({ id: "dp-autohide-off", label: "Tetap terbuka", attrs: 'data-datepicker-autohide="false"' })}
</div>`,
  },
  {
    key: "format",
    name: "Date format",
    note: "Format lewat data-datepicker-format. Token: d, dd, m, mm, M (Okt), MM (Oktober), yy, yyyy.",
    demo: `<div class="grid gap-4 sm:grid-cols-3">
${field({ id: "dp-fmt-1", label: "dd/mm/yyyy", attrs: 'data-date="2026-10-17"' })}
${field({ id: "dp-fmt-2", label: "yyyy-mm-dd", attrs: 'data-datepicker-format="yyyy-mm-dd" data-date="2026-10-17"', placeholder: "yyyy-mm-dd" })}
${field({ id: "dp-fmt-3", label: "dd MM yyyy", attrs: 'data-datepicker-format="dd MM yyyy" data-date="2026-10-17"', placeholder: "17 Oktober 2026" })}
</div>`,
  },
  {
    key: "minmax",
    name: "Min and max dates",
    note: "Batas tanggal lewat data-datepicker-min dan data-datepicker-max: yyyy-mm-dd, today, atau selisih hari seperti +30.",
    demo: `<div class="max-w-xs">${field({ id: "dp-minmax", label: "Tanggal pendaftaran", attrs: 'data-datepicker-min="today" data-datepicker-max="+30"', hint: "Hanya hari ini sampai 30 hari ke depan." })}</div>`,
  },
  {
    key: "disabled",
    name: "Disabled dates",
    note: "Hari tertentu lewat data-datepicker-disabled-days (0 = Minggu) dan tanggal tertentu lewat data-datepicker-disabled.",
    demo: `<div class="max-w-xs">${field({ id: "dp-disabled", label: "Jadwal tatap muka", attrs: 'data-datepicker-disabled-days="0,6" data-datepicker-disabled="2026-10-14,2026-10-15" data-date="2026-10-12"', hint: "Sabtu, Minggu, dan 14–15 Okt 2026 tidak bisa dipilih." })}</div>`,
  },
  {
    key: "locale",
    name: "Week start and language",
    note: "Awal pekan lewat data-datepicker-week-start (1 = Senin) dan bahasa lewat data-datepicker-locale (id atau en).",
    demo: `<div class="grid gap-4 sm:grid-cols-2">
${field({ id: "dp-week", label: "Pekan mulai Senin", attrs: 'data-datepicker-week-start="1"' })}
${field({ id: "dp-en", label: "English", attrs: 'data-datepicker-locale="en" data-datepicker-format="MM d, yyyy" data-datepicker-buttons', placeholder: "October 17, 2026" })}
</div>`,
  },
  {
    key: "orientation",
    name: "Orientation",
    note: "Arah kalender lewat data-datepicker-orientation: top atau bottom, ditambah left atau right (mis. top right). Tanpa atribut, kalender membuka ke bawah dan berbalik otomatis bila tidak muat.",
    storyPad: "pt-80",
    demo: `<div class="grid gap-4 sm:grid-cols-2">
${field({ id: "dp-or-bl", label: "bottom left", attrs: 'data-datepicker-orientation="bottom left"' })}
${field({ id: "dp-or-br", label: "bottom right", attrs: 'data-datepicker-orientation="bottom right"' })}
${field({ id: "dp-or-tl", label: "top left", attrs: 'data-datepicker-orientation="top left"' })}
${field({ id: "dp-or-tr", label: "top right", attrs: 'data-datepicker-orientation="top right"' })}
</div>`,
  },
  {
    key: "range",
    name: "Date range picker",
    note: "Dua input dalam data-daterangepicker berbagi satu kalender: pilih tanggal mulai lalu tanggal selesai, rentang disorot (pratinjau saat kursor bergerak). Event daterangepicker:change.",
    wide: true,
    demo: `<div class="max-w-xl">${range("dp-range", "data-datepicker-buttons")}</div>`,
  },
  {
    key: "rangeInline",
    name: "Inline date range",
    note: "Rentang tanpa input: data-datepicker-inline bersama data-datepicker-range.",
    demo: `<div data-datepicker-inline data-datepicker-range data-datepicker-output="#dp-rinline-out" data-datepicker-week-start="1" data-datepicker-buttons></div>
<p class="mt-3 text-sm text-fg-muted">Rentang: <b id="dp-rinline-out" class="text-fg">–</b></p>`,
  },
  {
    key: "modal",
    name: "Datepicker in modal",
    note: "Kalender memakai position: fixed sehingga tidak terpotong oleh isi modal yang menggulir.",
    demo: `<button type="button" class="btn-outline btn-md" data-modal-toggle="dp-modal"><i class="kk kk-calendar-check h-4 w-4"></i>Jadwalkan wawancara</button>`,
    modals: `
<div class="modal-backdrop" id="dp-modal">
  <div class="modal-panel modal-md">
    <div class="modal-header">
      <div>
        <h3 class="modal-title">Jadwalkan wawancara</h3>
        <p class="modal-description">Pilih tanggal yang tersedia untuk kandidat.</p>
      </div>
      <button type="button" class="modal-close" data-modal-hide="dp-modal" aria-label="Tutup"><i class="kk kk-x h-4 w-4"></i></button>
    </div>
    <div class="modal-body space-y-4">
${field({ id: "dp-modal-date", label: "Tanggal wawancara", attrs: 'data-datepicker-min="today" data-datepicker-disabled-days="0,6" data-datepicker-buttons' })}
      <div>
        <label class="form-label" for="dp-modal-slot">Jam</label>
        <select id="dp-modal-slot" class="input"><option>09.00</option><option>10.00</option><option>13.00</option><option>15.00</option></select>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn-outline btn-md" data-modal-hide="dp-modal">Batal</button>
      <button type="button" class="btn-primary btn-md" data-modal-hide="dp-modal">Jadwalkan</button>
    </div>
  </div>
</div>`,
  },
];

export const byKey = Object.fromEntries(examples.map((e) => [e.key, e]));
