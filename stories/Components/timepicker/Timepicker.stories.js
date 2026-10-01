const exBlock = (inner) => `<div class="p-6">${inner}</div>`;
const ic = (n, cls = "h-4 w-4") => `<i class="kk kk-${n} ${cls}"></i>`;
const clock = `<span class="timepicker-icon">${ic("clock")}</span>`;
const timeInput = (id, label, value = "09:00", extra = "") => `
  <div>
    <label for="${id}" class="form-label">${label}</label>
    <div class="timepicker">
      <input type="time" id="${id}" class="input" min="09:00" max="18:00" value="${value}" ${extra} />
      ${clock}
    </div>
  </div>`;
const menu = (label, items) => `
  <div class="relative">
    <button type="button" class="btn-group-item h-10 whitespace-nowrap bg-neutral-50" data-ui-dropdown aria-expanded="false" aria-haspopup="true">${label}${ic("caret-down", "h-3 w-3")}</button>
    <div class="dropdown-menu hidden left-0 right-auto w-48">${items.map((i) => `<a href="#" class="dropdown-item">${i}</a>`).join("")}</div>
  </div>`;
const SLOTS = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30"];
const slots = (name, selected = "11:00") => `<ul class="grid grid-cols-3 gap-2">${SLOTS.map((t) => `<li><label class="choice choice-slot"><input type="radio" name="${name}" ${t === selected ? "checked" : ""} /><span class="choice-body">${t}</span></label></li>`).join("")}</ul>`;

export default {
  title: "Components/Timepicker",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Pemilih waktu berbasis `<input type=\"time\">` bawaan browser (picker native, mendukung keyboard & layar sentuh), dibungkus `.timepicker` dengan ikon jam. Rentang jam dibatasi lewat `min`/`max`. Untuk pilihan slot waktu, pakai `.choice.choice-slot` (radio kartu). Komposisi dengan dropdown/select memakai `.input-group` dan `.btn-group-item`; dropdown di-toggle oleh `assets/js/ui.js`.",
      },
    },
  },
};

export const DefaultTimepicker = {
  name: "Default timepicker",
  render: () => exBlock(`<div class="max-w-[10rem]">${timeInput("tp-1", "Pilih waktu:", "00:00")}</div>`),
};

export const TimepickerWithIcon = {
  name: "Timepicker with icon",
  render: () =>
    exBlock(`<div class="max-w-xs">
      <label for="tp-2" class="form-label">Waktu wawancara:</label>
      <div class="input-group">
        <span class="inline-flex h-10 items-center rounded-l-control border border-border bg-neutral-50 px-3 text-fg-subtle">${ic("clock")}</span>
        <input type="time" id="tp-2" class="input !rounded-l-none [&::-webkit-calendar-picker-indicator]:hidden" min="09:00" max="18:00" value="09:00" />
      </div>
    </div>`),
};

export const TimepickerWithDropdown = {
  name: "Timepicker with dropdown",
  render: () =>
    exBlock(`<div class="min-h-16 max-w-sm">
      <label for="tp-3" class="form-label">Mulai &amp; durasi:</label>
      <div class="input-group">
        <div class="input-wrap timepicker"><input type="time" id="tp-3" class="input" min="09:00" max="18:00" value="09:00" />${clock}</div>
        ${menu("Durasi", ["30 menit", "1 jam", "2 jam"])}
      </div>
    </div>`),
};

export const TimepickerWithSelect = {
  name: "Timepicker with select",
  render: () =>
    exBlock(`<div class="min-h-16 max-w-sm">
      <label for="tp-4" class="form-label">Waktu &amp; zona:</label>
      <div class="input-group">
        <div class="input-wrap timepicker"><input type="time" id="tp-4" class="input" value="09:00" />${clock}</div>
        ${menu("WIB", ["WIB (Jakarta)", "WITA (Makassar)", "WIT (Jayapura)", "SGT (Singapura)", "GMT (London)"])}
      </div>
    </div>`),
};

export const TimepickerRangeSelector = {
  name: "Timepicker range selector",
  render: () =>
    exBlock(`<div class="grid max-w-md grid-cols-2 gap-3">
      ${timeInput("tp-5a", "Mulai:", "09:00")}
      ${timeInput("tp-5b", "Selesai:", "17:00")}
    </div>`),
};

export const TimerangeWithDropdown = {
  name: "Timerange with dropdown",
  render: () =>
    exBlock(`<div class="relative inline-block min-h-16">
      <button type="button" class="btn-outline btn-md" data-ui-dropdown aria-expanded="false" aria-haspopup="true">${ic("clock")}Pilih jam<i class="kk kk-caret-down h-3.5 w-3.5"></i></button>
      <div class="dropdown-menu hidden left-0 right-auto w-72 p-3">
        <div class="grid grid-cols-2 gap-3">
          ${timeInput("tp-6a", "Mulai:", "09:00")}
          ${timeInput("tp-6b", "Selesai:", "17:00")}
        </div>
        <button type="button" class="card-link mt-3" data-ui-dropdown-close>Simpan jam</button>
      </div>
    </div>`),
};

export const TimerangePickerWithToggle = {
  name: "Timerange picker with toggle",
  render: () =>
    exBlock(`<div class="max-w-md" data-ui-collapse-root>
      <button type="button" class="card-link" data-ui-collapse aria-expanded="false" aria-controls="tp-7-panel">Pilih jam<i class="kk kk-caret-down h-3.5 w-3.5 transition-transform"></i></button>
      <div id="tp-7-panel" class="mt-3 hidden rounded-control border border-border bg-surface p-4">
        <div class="grid grid-cols-2 gap-3">
          ${timeInput("tp-7a", "Mulai:", "09:00")}
          ${timeInput("tp-7b", "Selesai:", "17:00")}
        </div>
      </div>
    </div>`),
};

export const InlineTimepickerButtons = {
  name: "Inline timepicker buttons",
  render: () =>
    exBlock(`<div class="grid gap-6 md:grid-cols-[1fr_1.2fr]">
      <div class="card card-body">
        <h3 class="card-title">Sesi konsultasi karier</h3>
        <p class="card-text mt-1">Pilih tanggal dan jam yang kamu inginkan.</p>
        <ul class="mt-4 space-y-2 text-sm text-fg-muted">
          <li class="flex items-center gap-2">${ic("map-pin")}Online (Google Meet)</li>
          <li class="flex items-center gap-2">${ic("users")}Mentor + 1 peserta</li>
          <li class="flex items-center gap-2">${ic("clock")}Durasi 30 menit</li>
        </ul>
      </div>
      <div class="card card-body">
        <p class="mb-3 text-sm font-semibold text-fg">Pilih hari</p>
        <ul class="mb-5 grid grid-cols-5 gap-2">${["Sen 6", "Sel 7", "Rab 8", "Kam 9", "Jum 10"].map((d, i) => `<li><label class="choice choice-slot"><input type="radio" name="tp-8d" ${i === 2 ? "checked" : ""} /><span class="choice-body">${d}</span></label></li>`).join("")}</ul>
        <p class="mb-3 text-sm font-semibold text-fg">Pilih jam</p>
        ${slots("tp-8t")}
      </div>
    </div>`),
};

export const ModalWithTimepicker = {
  name: "Modal with timepicker",
  render: () =>
    exBlock(`<div class="rounded-xl bg-neutral-100 p-4 sm:p-8">
      <div class="card mx-auto max-w-lg">
        <div class="modal-header"><h3 class="modal-title">Jadwalkan wawancara</h3></div>
        <div class="modal-body space-y-5">
          <div>
            <label for="tp-9d" class="form-label">Tanggal</label>
            <input id="tp-9d" type="date" class="input" value="2026-10-08" />
          </div>
          <div>
            <p class="form-label">Jam tersedia</p>
            ${slots("tp-9t", "10:30")}
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn-primary btn-md">Simpan</button>
          <button type="button" class="btn-outline btn-md">Batal</button>
        </div>
      </div>
    </div>`),
};

export const DrawerWithTimepicker = {
  name: "Drawer with timepicker",
  render: () =>
    exBlock(`<div class="relative h-[34rem] overflow-hidden rounded-xl border border-border bg-neutral-100">
      <aside class="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-border bg-surface shadow-card-lg" aria-label="Jadwal jam kerja">
        <div class="flex items-center justify-between border-b border-border-subtle px-5 py-4">
          <h3 class="card-title">Jadwal jam kerja</h3>
          <button type="button" class="btn-ghost btn-icon-sm" aria-label="Tutup">${ic("x")}</button>
        </div>
        <div class="flex-1 space-y-5 overflow-y-auto px-5 py-4">
          <label class="flex items-center justify-between text-sm font-medium text-fg">Aktifkan jam kerja
            <span class="toggle"><input type="checkbox" class="toggle-input" checked /><span class="toggle-track"></span></span>
          </label>
          ${["Senin", "Selasa"]
            .map(
              (d, i) => `<div>
            <label class="check-row mb-2 items-center"><input type="checkbox" class="form-check" ${i < 2 ? "checked" : ""} /><span class="check-label">${d}</span></label>
            <div class="grid grid-cols-[1fr_1fr_auto] items-end gap-2">
              ${timeInput(`tp-10a${i}`, "Mulai", "09:00")}
              ${timeInput(`tp-10b${i}`, "Selesai", "17:00")}
              <button type="button" class="btn-ghost btn-icon-lg" aria-label="Hapus interval">${ic("trash")}</button>
            </div>
          </div>`
            )
            .join("")}
          <button type="button" class="btn-outline btn-sm">${ic("plus", "h-3.5 w-3.5")}Tambah interval</button>
        </div>
        <div class="grid grid-cols-2 gap-2 border-t border-border-subtle px-5 py-4">
          <button type="button" class="btn-outline btn-md">Tutup</button>
          <button type="button" class="btn-primary btn-md">Simpan semua</button>
        </div>
      </aside>
    </div>`),
};
