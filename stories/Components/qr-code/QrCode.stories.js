const URL_DEMO = "https://karirkit.vercel.app";
const wrap = (inner) => `<div class="p-6">${inner}</div>`;

export default {
  title: "Components/QR Code",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "QR code sebagai SVG inline, dirender offline oleh `assets/js/qr-code.js` (library `qrcode-generator`, MIT, di-vendor di `assets/js/vendor/qrcode.js`). Markup: `.qr-code` > `<div data-qr data-qr-text=\"…\" data-qr-level=\"M\" class=\"h-48 w-48\">`. Overlay status: `.qr-overlay` (+ `.qr-spinner`). Kode selalu hitam-di-atas-putih, tidak mengikuti dark theme, supaya tetap terbaca scanner. Aksi: `[data-qr-action=\"copy-svg|save|refresh\"]`, input live `[data-qr-target]`, salin input `[data-copy-input]`.",
      },
    },
  },
};

export const QrCodeGenerator = {
  name: "QR code generator",
  render: () =>
    wrap(`
    <div class="grid max-w-3xl gap-6 md:grid-cols-[auto_1fr]">
      <div class="qr-code self-start">
        <div id="qr-gen" data-qr data-qr-text="${URL_DEMO}" data-qr-level="M" class="h-48 w-48"></div>
      </div>
      <div class="space-y-4">
        <div>
          <label class="mb-1.5 block text-sm font-medium text-fg" for="qr-gen-input">Teks atau URL</label>
          <input id="qr-gen-input" class="input" value="${URL_DEMO}" data-qr-target="#qr-gen" />
        </div>
        <div>
          <label class="mb-1.5 block text-sm font-medium text-fg" for="qr-gen-level">Error correction</label>
          <select id="qr-gen-level" class="input" data-qr-level-select data-qr-target="#qr-gen">
            <option value="L">L - Low (7%)</option>
            <option value="M" selected>M - Medium (15%)</option>
            <option value="Q">Q - Quartile (25%)</option>
            <option value="H">H - High (30%)</option>
          </select>
        </div>
        <div class="flex flex-wrap gap-2">
          <button type="button" class="btn-outline btn-sm" data-qr-action="copy-svg" data-qr-target="#qr-gen"><span data-label>Copy as SVG</span></button>
          <button type="button" class="btn-primary btn-sm" data-qr-action="save" data-qr-target="#qr-gen">Save as file</button>
        </div>
      </div>
    </div>`),
};

export const DefaultQrCode = {
  name: "Default QR code",
  render: () =>
    wrap(`
    <div class="qr-code">
      <div data-qr data-qr-text="${URL_DEMO}" class="h-48 w-48"></div>
    </div>`),
};

export const QrCodeWithInput = {
  name: "QR code with input",
  render: () =>
    wrap(`
    <div class="max-w-xs space-y-4">
      <div class="qr-code">
        <div data-qr data-qr-text="${URL_DEMO}/profil/ahmad-dimas" class="h-48 w-48"></div>
      </div>
      <div class="relative flex items-center gap-2">
        <input id="qr-input-url" class="input" readonly value="${URL_DEMO}/profil/ahmad-dimas" aria-label="URL QR code" />
        <span class="group relative inline-flex">
          <button type="button" class="btn-outline h-10 w-10 shrink-0 p-0" data-copy-input="#qr-input-url" aria-label="Salin URL">
            <i data-copy-default class="kk kk-copy h-4 w-4"></i>
            <i data-copy-success class="kk kk-check hidden h-4 w-4 text-success-600"></i>
          </button>
          <span class="tooltip-content">Salin URL</span>
        </span>
      </div>
    </div>`),
};

export const QrCodeWithCard = {
  name: "QR code with card",
  render: () =>
    wrap(`
    <div class="card max-w-sm overflow-hidden">
      <div class="flex justify-center bg-brand-gradient p-8">
        <div class="qr-code">
          <div data-qr data-qr-text="${URL_DEMO}/unduh" class="h-40 w-40"></div>
        </div>
      </div>
      <div class="p-6">
        <h3 class="font-display text-lg font-bold text-fg">Scan untuk mengunduh aplikasi</h3>
        <p class="mt-1 text-sm text-fg-muted">Arahkan kamera ponsel ke kode di atas untuk membuka halaman unduhan KarirLink.</p>
        <a href="#" class="toast-action mt-4 inline-flex items-center gap-1">Buka halaman unduhan <i class="kk kk-arrow-right h-4 w-4"></i></a>
      </div>
    </div>`),
};

export const ShareProfileWithQr = {
  name: "Share profile with QR",
  render: () =>
    wrap(`
    <div class="card max-w-xs p-6 text-center">
      <span class="avatar mx-auto h-16 w-16 text-xl">AD</span>
      <h3 class="mt-3 font-display text-lg font-bold text-fg">Ahmad Dimas</h3>
      <p class="text-sm text-fg-muted">Frontend Engineer</p>
      <div class="qr-code mt-5">
        <div data-qr data-qr-text="${URL_DEMO}/profil/ahmad-dimas" class="h-44 w-44"></div>
      </div>
      <p class="mt-4 text-sm text-fg-muted">Bagikan profilmu - minta orang lain scan kode ini untuk membuka profil publikmu.</p>
    </div>`),
};

export const LoadingState = {
  name: "Loading state",
  render: () =>
    wrap(`
    <div class="qr-code">
      <div data-qr data-qr-text="${URL_DEMO}/login/sesi-1" class="h-48 w-48"></div>
      <div class="qr-overlay" role="status">
        <span class="qr-spinner" aria-hidden="true"></span>
        <p>Membuat QR code…</p>
      </div>
    </div>`),
};

export const SuccessState = {
  name: "Success state",
  render: () =>
    wrap(`
    <div class="qr-code">
      <div data-qr data-qr-text="${URL_DEMO}/login/sesi-2" class="h-48 w-48"></div>
      <div class="qr-overlay" role="status">
        <span class="toast-icon toast-icon-success toast-icon-lg"><i class="kk kk-check h-6 w-6"></i></span>
        <p>Scanned</p>
      </div>
    </div>`),
};

export const ExpiredState = {
  name: "Expired state",
  render: () =>
    wrap(`
    <div class="qr-code">
      <div data-qr data-qr-text="${URL_DEMO}/login/sesi-3" class="h-48 w-48"></div>
      <div class="qr-overlay" role="alert">
        <span class="toast-icon toast-icon-danger toast-icon-lg"><i class="kk kk-x h-6 w-6"></i></span>
        <p>QR code kedaluwarsa</p>
        <button type="button" class="btn-primary btn-sm" data-qr-action="refresh">Muat ulang</button>
      </div>
    </div>`),
};
