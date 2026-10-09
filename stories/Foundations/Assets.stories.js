import { FLAGS, PAY, BRAND, APP, APP_NO_DISABLED, FILE } from "./asset-names.js";

export default {
  title: "Foundations/Assets",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Aset berwarna dari Quantum yang dipakai lewat class, seperti ikon `kk-*` tetapi **warnanya asli** (dipasang sebagai `background-image`, bukan mask), jadi tidak mengikuti `currentColor`. Ukuran mengikuti `font-size` (`text-2xl`) atau utility `h-* w-*`. Class dibangkitkan dari isi folder `assets/flags` dan `assets/misc-icons` oleh `npm run assets:classes` (jangan diedit manual): `kk-flag kk-flag-id`, `kk-pay kk-pay-visa`, `kk-brand kk-brand-github`, `kk-app kk-app-siakadcloud`, `kk-file kk-file-pdf`. `kk-flag` dan `kk-file` juga nama ikon Phosphor, jadi aturannya hanya berlaku pada elemen **tanpa** class `kk`; ikon `<i class=\"kk kk-flag\">` tidak terpengaruh. Ilustrasi (`assets/illustrations`) dan badge toko aplikasi (`assets/misc-icons/badges`) tidak punya class, pakai `<img src>`.",
      },
    },
  },
};

const tile = (cls, label, extra = "") => `
  <div class="flex flex-col items-center gap-2 ${extra}">
    <span class="${cls}"></span>
    <p class="max-w-full truncate text-center text-[11px] text-slate-500">${label}</p>
  </div>`;

const code = (html) =>
  `<code class="kbd">${html.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code>`;

const intro = (title, text, example) => `
  <div class="mb-5">
    <p class="nav-eyebrow mb-1 px-0">${title}</p>
    <p class="form-hint mb-3 mt-0">${text}</p>
    ${code(example)}
  </div>`;

export const Flags = {
  name: "Flags (266)",
  render: () => {
    const root = document.createElement("div");
    root.className = "p-2";
    root.innerHTML = `
      ${intro(
        "Flags",
        "Nama class memakai kode ISO 3166-1 alpha-2 huruf kecil. Wilayah khusus: <b>gb-eng</b>, <b>gb-sct</b>, <b>gb-wls</b>, <b>gb-nir</b>, <b>es-ct</b>, <b>es-ga</b>, <b>eu</b>, <b>un</b>, <b>xk</b> (Kosovo), <b>xx</b> (tidak diketahui). Rasio 4:3.",
        '<span class="kk-flag kk-flag-id text-2xl"></span>'
      )}
      <div class="relative mb-5 w-full sm:w-64">
        <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><i class="kk kk-magnifying-glass h-4 w-4"></i></span>
        <input type="search" class="input h-9 pl-9" placeholder="Cari kode, mis. id atau gb" aria-label="Cari bendera" />
      </div>
      <div data-grid class="grid grid-cols-4 gap-4 sm:grid-cols-6 lg:grid-cols-10">
        ${FLAGS.map((c) => tile(`kk-flag kk-flag-${c} text-3xl`, c, "")).join("")}
      </div>
      <p data-empty class="form-hint hidden">Tidak ada bendera yang cocok.</p>`;
    const input = root.querySelector("input");
    const grid = root.querySelector("[data-grid]");
    const empty = root.querySelector("[data-empty]");
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      let shown = 0;
      [...grid.children].forEach((el) => {
        const on = !q || el.textContent.trim().includes(q);
        el.hidden = !on;
        if (on) shown++;
      });
      empty.classList.toggle("hidden", shown > 0);
    });
    return root;
  },
};

export const Payment = {
  name: "Payment logos (83)",
  render: () => `
    <div class="p-2">
      ${intro(
        "Payment logos",
        "Logo bank, dompet digital, dan jaringan kartu. Satu versi per logo (rasio 29:20); atur ukuran dengan <code class=\"kbd\">text-*</code> atau <code class=\"kbd\">h-* w-*</code>.",
        '<span class="kk-pay kk-pay-visa text-3xl"></span>'
      )}
      <div class="grid grid-cols-3 gap-5 sm:grid-cols-5 lg:grid-cols-8">
        ${PAY.map((n) => tile(`kk-pay kk-pay-${n} text-4xl`, n)).join("")}
      </div>
    </div>`,
};

const toneRow = (base, name, tones) => `
  <div class="flex items-center gap-4 rounded-xl border border-border p-3">
    <p class="w-28 shrink-0 truncate text-xs text-slate-500">${name}</p>
    ${tones
      .map(
        ([label, mod, dark]) => `
      <div class="flex flex-col items-center gap-1.5">
        <span class="flex h-12 w-12 items-center justify-center rounded-lg ${dark ? "bg-slate-800" : "bg-slate-50"}">
          <span class="${base} ${base}-${name} ${mod} text-2xl"></span>
        </span>
        <p class="text-[10px] text-slate-400">${label}</p>
      </div>`
      )
      .join("")}
  </div>`;

export const Brand = {
  name: "Brand logos (28, 4 tones)",
  render: () => `
    <div class="p-2">
      ${intro(
        "Brand logos",
        "Logo merek pihak ketiga. Tanpa modifier = warna asli; tambahkan satu modifier untuk mengganti warna: <b>kk-brand-black</b>, <b>kk-brand-white</b> (untuk latar gelap), <b>kk-brand-disabled</b> (abu-abu).",
        '<span class="kk-brand kk-brand-github kk-brand-white text-2xl"></span>'
      )}
      <div class="grid grid-cols-1 gap-3 lg:grid-cols-2">
        ${BRAND.map((n) =>
          toneRow("kk-brand", n, [
            ["original", "", false],
            ["black", "kk-brand-black", false],
            ["white", "kk-brand-white", true],
            ["disabled", "kk-brand-disabled", false],
          ])
        ).join("")}
      </div>
    </div>`,
};

export const Apps = {
  name: "App logos (29)",
  render: () => `
    <div class="p-2">
      ${intro(
        "App logos",
        "Logo aplikasi, termasuk <b>SiAkadCloud</b> (<code class=\"kbd\">kk-app-siakadcloud</code>). Tanpa modifier = warna utama; tambahkan <b>kk-app-white</b> (latar gelap) atau <b>kk-app-disabled</b>.",
        '<span class="kk-app kk-app-siakadcloud text-2xl"></span>'
      )}
      <div class="grid grid-cols-1 gap-3 lg:grid-cols-2">
        ${APP.map((n) =>
          toneRow("kk-app", n, [
            ["primary", "", false],
            ["white", "kk-app-white", true],
            ...(APP_NO_DISABLED.includes(n) ? [] : [["disabled", "kk-app-disabled", false]]),
          ])
        ).join("")}
      </div>
    </div>`,
};

export const FileTypes = {
  name: "File types (51, 3 looks)",
  render: () => `
    <div class="p-2">
      ${intro(
        "File types",
        "Ikon tipe file berwarna. Tanpa modifier = tampilan default; tambahkan <b>kk-file-gray</b> atau <b>kk-file-solid</b>. Varian kedua pdf dan video bernama <b>kk-file-pdf-2</b> dan <b>kk-file-video-2</b>.",
        '<span class="kk-file kk-file-pdf kk-file-gray text-2xl"></span>'
      )}
      <div class="grid grid-cols-1 gap-3 lg:grid-cols-2">
        ${FILE.map((n) =>
          toneRow("kk-file", n, [
            ["default", "", false],
            ["gray", "kk-file-gray", false],
            ["solid", "kk-file-solid", false],
          ])
        ).join("")}
      </div>
    </div>`,
};

export const InLoginButtons = {
  name: "Contoh: tombol login sosial",
  render: () => `
    <div class="mx-auto max-w-sm space-y-3 p-6">
      <button type="button" class="btn-outline btn-md w-full">
        <span class="kk-app kk-app-siakadcloud h-4 w-4" aria-hidden="true"></span>
        Lanjutkan dengan SiAkadCloud
      </button>
      <button type="button" class="btn-outline btn-md w-full">
        <span class="kk-brand kk-brand-google h-4 w-4" aria-hidden="true"></span>
        Lanjutkan dengan Google
      </button>
    </div>`,
};
