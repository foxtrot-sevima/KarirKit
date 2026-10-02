import { byKey } from "./examples.js";

export default {
  title: "Components/Datepicker",
  tags: ["autodocs"],
  parameters: {
    // The calendar pops over the page (position: fixed), so docs render each story in its own iframe.
    docs: {
      story: { inline: false, height: "440px", iframeHeight: 440 },
      description: {
        component: `
Pemilih tanggal tanpa dependensi — input dengan ikon kalender (\`.datepicker\` + \`.input\`) yang membuka kalender (\`.datepicker-panel\`), kalender inline, dan rentang tanggal. Semua contoh interaktif. Kalender dibuat oleh \`assets/js/datepicker.js\`; tampilan hari, bulan, dan tahun (klik judul untuk memperbesar), ketik langsung, serta navigasi keyboard (panah, PageUp/PageDown, Home/End, Escape) sudah termasuk.

### Atribut

| Atribut | Fungsi |
| --- | --- |
| \`data-datepicker\` | Pada \`<input>\`: kalender popup |
| \`data-datepicker-inline\` | Pada \`<div>\`: kalender selalu terlihat (nilai: \`data-date="yyyy-mm-dd"\`) |
| \`data-daterangepicker\` | Pada pembungkus dua \`<input>\`: rentang tanggal (inline: \`data-datepicker-inline\` + \`data-datepicker-range\`) |
| \`data-datepicker-format="dd/mm/yyyy"\` | Format tampil dan ketik: \`d\` \`dd\` \`m\` \`mm\` \`M\` \`MM\` \`yy\` \`yyyy\` |
| \`data-datepicker-locale="id\\|en"\` | Nama bulan, hari, dan label tombol (default id) |
| \`data-datepicker-week-start="1"\` | Awal pekan (0 = Minggu, default) |
| \`data-datepicker-min\` / \`-max\` | Batas: \`yyyy-mm-dd\`, \`today\`, atau selisih hari (\`+30\`, \`-7\`) |
| \`data-datepicker-disabled\` | Tanggal yang tidak bisa dipilih, dipisah koma |
| \`data-datepicker-disabled-days\` | Hari yang tidak bisa dipilih (0 = Minggu), mis. \`0,6\` |
| \`data-datepicker-autohide="false"\` | Kalender tetap terbuka setelah memilih (default menutup) |
| \`data-datepicker-buttons\` | Footer Hari ini + Hapus (rentang: Hapus saja) |
| \`data-datepicker-title\` | Judul di dalam kalender |
| \`data-datepicker-orientation\` | \`top\` / \`bottom\` + \`left\` / \`right\` (default: bawah, berbalik bila tidak muat) |
| \`data-datepicker-autoselect-today\` | Mengisi hari ini otomatis |
| \`data-datepicker-output="#id"\` | Inline: elemen yang menampilkan nilai terpilih |

**Event** (muncul dari input / pembungkus): \`datepicker:change\` (\`detail.date\`, \`detail.value\`) dan \`daterangepicker:change\` (\`detail.start\`, \`detail.end\`); pilihan di popup juga memicu \`input\` dan \`change\` bawaan. **API:** \`KKDatepicker.get(el).getDate()\` / \`.setDate(date)\` / \`.show()\` / \`.hide()\`, rentang: \`.getDates()\` / \`.setDates(start, end)\`.
`,
      },
    },
  },
};

const stage = (ex) => `<div class="p-6 ${ex.storyPad || ""}">${ex.demo}</div>${ex.modals || ""}`;
const story = (key, height = 440) => ({
  parameters: { docs: { story: { inline: false, height: height + "px", iframeHeight: height }, description: { story: byKey[key].note } } },
  render: () => stage(byKey[key]),
});

const attr = (name, value) => (value === "" || value == null || value === false ? "" : value === true ? ` ${name}` : ` ${name}="${value}"`);

export const Playground = {
  parameters: { docs: { story: { inline: false, height: "440px", iframeHeight: 440 }, description: { story: "Ubah opsi lewat Controls; kalender ikut berubah." } } },
  argTypes: {
    format: { control: "select", options: ["dd/mm/yyyy", "yyyy-mm-dd", "dd MM yyyy", "d M yy"] },
    locale: { control: "select", options: ["id", "en"] },
    weekStart: { control: "select", options: [0, 1, 6] },
    min: { control: "text" },
    max: { control: "text" },
    title: { control: "text" },
    buttons: { control: "boolean" },
    autohide: { control: "boolean" },
  },
  args: { format: "dd/mm/yyyy", locale: "id", weekStart: 0, min: "", max: "", title: "", buttons: true, autohide: true },
  render: (a) => `
    <div class="max-w-xs p-6">
      <label class="form-label" for="dp-play">Tanggal</label>
      <div class="datepicker">
        <i class="kk kk-calendar-blank datepicker-icon h-4 w-4"></i>
        <input id="dp-play" type="text" class="input" placeholder="${a.format}" autocomplete="off"
          data-datepicker${attr("data-datepicker-format", a.format)}${attr("data-datepicker-locale", a.locale)}${attr("data-datepicker-week-start", a.weekStart)}${attr("data-datepicker-min", a.min)}${attr("data-datepicker-max", a.max)}${attr("data-datepicker-title", a.title)}${attr("data-datepicker-buttons", a.buttons)}${attr("data-datepicker-autohide", a.autohide ? "" : "false")} />
      </div>
    </div>`,
};

export const Default = { name: "Default datepicker", ...story("default") };
export const Inline = { name: "Inline datepicker", ...story("inline", 400) };
export const Title = { name: "Datepicker with title", ...story("title") };
export const Buttons = { name: "Datepicker with buttons", ...story("buttons") };
export const Autohide = { name: "Autohide", ...story("autohide") };
export const Format = { name: "Date format", ...story("format") };
export const MinMax = { name: "Min and max dates", ...story("minmax") };
export const Disabled = { name: "Disabled dates", ...story("disabled") };
export const Locale = { name: "Week start and language", ...story("locale") };
export const Orientation = { name: "Orientation", ...story("orientation", 760) };
export const Range = { name: "Date range picker", ...story("range", 460) };
export const RangeInline = { name: "Inline date range", ...story("rangeInline", 420) };
export const InModal = { name: "Datepicker in modal", ...story("modal", 520) };
