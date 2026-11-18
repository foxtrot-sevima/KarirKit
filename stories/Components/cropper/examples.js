/* Contoh Cropper — satu sumber untuk Storybook (Cropper.stories.js) dan index.html.
   Tiap contoh: { key, name, note, demo }. Perilaku lewat assets/js/cropper.js (data-cropper). */

// Gambar contoh (SVG inline) supaya demo tidak butuh berkas luar.
const sample = (a, b) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="1200" height="800" fill="url(#g)"/><circle cx="820" cy="260" r="120" fill="#fff" fill-opacity=".35"/><path d="M0 800V560l240-160 220 140 260-220 480 260v220z" fill="#fff" fill-opacity=".28"/><circle cx="360" cy="330" r="64" fill="#fff" fill-opacity=".55"/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const examples = [
  {
    key: "round",
    name: "Round (foto profil)",
    note: "<code>.cropper.cropper-round</code> menampilkan bingkai bulat dengan sudut digelapkan; hasil pangkas tetap persegi 1:1 (<code>data-cropper-ratio=\"1\"</code>, default). Geser gambar, atur zoom lewat slider, roda mouse, cubit dua jari, atau tombol +/-.",
    demo: `<div class="cropper cropper-round" data-cropper data-cropper-output="512" data-cropper-src="${sample("#2361e7", "#f97316")}"></div>`,
  },
  {
    key: "square",
    name: "Square",
    note: "Tanpa <code>.cropper-round</code>, bingkai persegi dengan sudut membulat. Cocok untuk logo atau gambar produk 1:1.",
    demo: `<div class="cropper" data-cropper data-cropper-output="800" data-cropper-src="${sample("#0f766e", "#6366f1")}"></div>`,
  },
  {
    key: "landscape",
    name: "Landscape",
    note: "<code>data-cropper-ratio</code> mengatur rasio hasil, mis. <code>1.7778</code> untuk 16:9 (sampul atau banner). Tinggi hasil = lebar hasil / rasio.",
    demo: `<div class="cropper" data-cropper data-cropper-ratio="1.7778" data-cropper-output="1280" data-cropper-src="${sample("#be185d", "#2361e7")}"></div>`,
  },
];

export const byKey = Object.fromEntries(examples.map((e) => [e.key, e]));
