const closeBtn = `<button type="button" class="toast-close" data-toast-dismiss aria-label="Tutup"><i class="kk kk-x h-4 w-4"></i></button>`;
const wrap = (inner) => `<div class="p-6">${inner}</div>`;

export default {
  title: "Components/Toast",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Notifikasi sementara, mengikuti seluruh layout Flowbite. Anatomi: `.toast` > `.toast-icon` + isi + `.toast-close`. Varian ikon: `.toast-icon-success|danger|warning|info`; varian latar penuh: `.toast-danger` / `.toast-warning`. Letakkan di `.toast-region` + modifier posisi (`.toast-top-left|top-right|bottom-left|bottom-right`). Tombol `[data-toast-dismiss]` menutup toast terdekat (handler di `assets/js/toast.js`); `[data-toast-show]` menampilkan toast contoh.",
      },
    },
  },
};

export const Default = {
  name: "Default toast",
  render: () =>
    wrap(`
    <div class="toast toast-center" role="status">
      <span class="toast-icon"><i class="kk kk-fire h-5 w-5"></i></span>
      <div>Set yourself free.</div>
      ${closeBtn}
    </div>`),
};

export const Colors = {
  render: () =>
    wrap(`<div class="flex flex-col gap-4">
    <div class="toast toast-center" role="status">
      <span class="toast-icon toast-icon-success"><i class="kk kk-check h-5 w-5"></i></span>
      <div>Item moved successfully.</div>
      ${closeBtn}
    </div>
    <div class="toast toast-center" role="alert">
      <span class="toast-icon toast-icon-danger"><i class="kk kk-x h-5 w-5"></i></span>
      <div>Item has been deleted.</div>
      ${closeBtn}
    </div>
    <div class="toast toast-center" role="alert">
      <span class="toast-icon toast-icon-warning"><i class="kk kk-warning h-5 w-5"></i></span>
      <div>Improve password difficulty.</div>
      ${closeBtn}
    </div>
    </div>`),
};

export const Simple = {
  name: "Simple toast",
  render: () =>
    wrap(`
    <div class="toast toast-center" role="status">
      <i class="kk kk-paper-plane-tilt h-5 w-5 shrink-0 text-primary-600"></i>
      <div>Message sent successfully.</div>
      ${closeBtn}
    </div>`),
};

export const UndoButton = {
  name: "Undo button",
  render: () =>
    wrap(`
    <div class="toast toast-center" role="status">
      <div>Conversation archived.</div>
      <div class="ml-auto flex items-center gap-2">
        <button type="button" class="toast-action">Undo</button>
        ${closeBtn}
      </div>
    </div>`),
};

export const ToastMessage = {
  name: "Toast message",
  render: () =>
    wrap(`
    <div class="toast toast-wide" role="status">
      <span class="avatar h-10 w-10 text-sm">JL</span>
      <div class="min-w-0">
        <p class="toast-title">Jese Leos</p>
        <p class="mt-0.5">Hi Neil, thanks for sharing your thoughts regarding Flowbite.</p>
        <button type="button" class="btn-primary btn-sm mt-3"><i class="kk kk-arrow-bend-up-left h-3.5 w-3.5"></i>Reply</button>
      </div>
      ${closeBtn}
    </div>`),
};

export const PushNotification = {
  name: "Push notification",
  render: () =>
    wrap(`
    <div class="toast toast-wide" role="status">
      <div class="min-w-0 flex-1">
        <div class="mb-3 flex items-center justify-between gap-3">
          <span class="badge-primary">New notification</span>
          <span class="text-xs font-medium text-primary-600">a few seconds ago</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="avatar h-10 w-10 text-sm">BG</span>
          <div class="min-w-0">
            <p class="text-sm font-semibold text-fg">Bonnie Green</p>
            <p class="text-sm">commented on your photo</p>
          </div>
        </div>
        <div class="mt-3 grid grid-cols-2 gap-2">
          <button type="button" class="btn-secondary btn-sm" data-toast-dismiss>Close</button>
          <button type="button" class="btn-primary btn-sm"><i class="kk kk-arrow-bend-up-left h-3.5 w-3.5"></i>Reply</button>
        </div>
      </div>
      ${closeBtn}
    </div>`),
};

export const Interactive = {
  name: "Interactive toast",
  render: () =>
    wrap(`
    <div class="toast toast-wide" role="status">
      <span class="toast-icon"><i class="kk kk-arrow-clockwise h-5 w-5"></i></span>
      <div class="min-w-0 flex-1">
        <p class="toast-title">Update available</p>
        <p class="mt-0.5">A new software version is available for download.</p>
        <div class="mt-3 grid grid-cols-2 gap-2">
          <button type="button" class="btn-secondary btn-sm" data-toast-dismiss>Not now</button>
          <button type="button" class="btn-primary btn-sm"><i class="kk kk-download-simple h-3.5 w-3.5"></i>Update</button>
        </div>
      </div>
      ${closeBtn}
    </div>`),
};

export const ToastIllustration = {
  name: "Toast illustration",
  render: () =>
    wrap(`
    <div class="toast toast-wide flex-col" role="status">
      <div class="flex items-start gap-3">
        <div class="min-w-0 flex-1">
          <svg viewBox="0 0 240 120" class="mb-3 w-full rounded-control bg-primary-50" role="img" aria-label="Ilustrasi ponsel dengan dompet digital">
            <rect x="82" y="12" width="76" height="132" rx="14" class="fill-surface stroke-primary-600" stroke-width="3" />
            <rect x="92" y="28" width="56" height="30" rx="6" class="fill-primary-100" />
            <rect x="92" y="66" width="38" height="5" rx="2.5" class="fill-primary-200" />
            <rect x="92" y="78" width="26" height="5" rx="2.5" class="fill-primary-200" />
            <circle cx="140" cy="100" r="9" class="fill-primary-600" />
            <path d="M136 100h8M140 96v8" class="stroke-white" stroke-width="2" stroke-linecap="round" />
            <circle cx="40" cy="30" r="6" class="fill-secondary-200" />
            <circle cx="200" cy="82" r="9" class="fill-secondary-100" />
          </svg>
          <p class="toast-title">Connect your wallet</p>
          <p class="mt-0.5">Connect your wallet by clicking the bottom-right blue button.</p>
        </div>
        ${closeBtn}
      </div>
      <div class="grid grid-cols-2 gap-2">
        <button type="button" class="btn-secondary btn-sm" data-toast-dismiss>Not now</button>
        <button type="button" class="btn-primary btn-sm"><i class="kk kk-wallet h-3.5 w-3.5"></i>Connect</button>
      </div>
    </div>`),
};

export const ToastProgressBar = {
  name: "Toast progress bar",
  render: () =>
    wrap(`
    <div class="toast toast-wide" role="status">
      <span class="toast-icon"><i class="kk kk-arrow-clockwise h-5 w-5"></i></span>
      <div class="min-w-0 flex-1">
        <p class="toast-title">Uploading in progress</p>
        <p class="mt-0.5">Please wait while your file is being uploaded. This may take a moment.</p>
        <div class="mt-3 flex items-center gap-3">
          <div class="progress-track flex-1"><div class="progress-bar w-3/4"></div></div>
          <span class="text-xs font-semibold text-fg">75%</span>
        </div>
        <div class="mt-3 grid grid-cols-2 gap-2">
          <button type="button" class="btn-secondary btn-sm" data-toast-dismiss>Cancel upload</button>
          <button type="button" class="btn-primary btn-sm">Go to uploads</button>
        </div>
      </div>
      ${closeBtn}
    </div>`),
};

export const ToastDangerAlert = {
  name: "Toast danger alert",
  render: () =>
    wrap(`
    <div class="toast toast-wide toast-danger" role="alert">
      <span class="toast-icon toast-icon-danger"><i class="kk kk-warning-circle h-5 w-5"></i></span>
      <div class="min-w-0 flex-1">
        <p class="toast-title">Whoops! Something went wrong</p>
        <p class="mt-0.5">The file format is not supported. Please upload a valid file type (PDF, JPG, PNG).</p>
        <div class="mt-3 flex gap-2">
          <button type="button" class="btn-danger btn-sm"><i class="kk kk-upload-simple h-3.5 w-3.5"></i>Try again</button>
          <button type="button" class="btn-outline btn-sm" data-toast-dismiss>Close</button>
        </div>
      </div>
    </div>`),
};

export const ToastWarningAlert = {
  name: "Toast warning alert",
  render: () =>
    wrap(`
    <div class="toast toast-wide toast-warning" role="alert">
      <div class="min-w-0 flex-1">
        <div class="mb-2 flex items-center gap-2">
          <i class="kk kk-info h-5 w-5 shrink-0"></i>
          <span class="text-sm font-semibold">Info</span>
        </div>
        <p class="toast-title">Upload your invoice</p>
        <p class="mt-0.5">Upload your invoice in one of the supported formats (PDF, JPG, PNG) with a maximum file size of 5MB. Ensure that all relevant details are visible for verification.</p>
        <div class="mt-3 flex gap-2">
          <button type="button" class="btn-primary btn-sm"><i class="kk kk-eye h-3.5 w-3.5"></i>Upload invoice</button>
          <button type="button" class="btn-outline btn-sm" data-toast-dismiss>Remind me later</button>
        </div>
      </div>
      ${closeBtn}
    </div>`),
};

const posToast = (label) => `
  <div class="toast toast-center" role="status">
    <span class="toast-icon"><i class="kk kk-bell h-5 w-5"></i></span>
    <div>${label}</div>
    ${closeBtn}
  </div>`;

// Mini "screen" mock so each corner is easy to read at any width
const frame = (label, pos) => `
  <figure class="m-0">
    <div class="relative h-48 overflow-hidden rounded-xl border border-border bg-surface">
      <div class="flex items-center gap-1.5 border-b border-border bg-neutral-50 px-3 py-2">
        <span class="h-2 w-2 rounded-full bg-danger-400"></span><span class="h-2 w-2 rounded-full bg-warning-400"></span><span class="h-2 w-2 rounded-full bg-success-400"></span>
      </div>
      <div class="space-y-2 p-4">
        <div class="h-2.5 w-2/5 rounded bg-neutral-100"></div>
        <div class="h-2 w-4/5 rounded bg-neutral-100"></div>
        <div class="h-2 w-3/5 rounded bg-neutral-100"></div>
      </div>
      <div class="toast-region toast-region-contained ${pos} w-max max-w-full p-2 ${pos.includes("top") ? "mt-8" : ""}">${posToast(label)}</div>
    </div>
    <figcaption class="mt-2 text-center text-xs text-fg-muted"><code class="kbd">${pos}</code></figcaption>
  </figure>`;

export const Positioning = {
  render: () =>
    wrap(`<div class="grid gap-4 sm:grid-cols-2">
      ${frame("Top left positioning.", "toast-top-left")}
      ${frame("Top right positioning.", "toast-top-right")}
      ${frame("Bottom right positioning.", "toast-bottom-right")}
      ${frame("Bottom left positioning.", "toast-bottom-left")}
    </div>`),
};

export const JavaScriptBehaviour = {
  name: "JavaScript behaviour",
  render: () => `
    <div class="flex flex-wrap gap-2 p-6">
      <button type="button" class="btn-primary btn-sm" data-toast-show="success">Tampilkan toast sukses</button>
      <button type="button" class="btn-outline btn-sm" data-toast-show="danger">Tampilkan toast error</button>
      <button type="button" class="btn-outline btn-sm" data-toast-show="warning">Tampilkan toast peringatan</button>
    </div>`,
};
