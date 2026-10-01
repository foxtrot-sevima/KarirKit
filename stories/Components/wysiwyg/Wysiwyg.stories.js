const ic = (name) => `<i class="kk kk-${name} h-4 w-4"></i>`;

const btn = (cmd, icon, label, value) =>
  `<button type="button" class="wysiwyg-btn" data-cmd="${cmd}"${value ? ` data-value="${value}"` : ""} aria-pressed="false" title="${label}" aria-label="${label}">${ic(icon)}</button>`;

const group = (...items) => `<div class="wysiwyg-group" role="group">${items.join("")}</div>`;

const dd = (name, label, icon, menu) => `
  <div class="wysiwyg-dd">
    <button type="button" class="wysiwyg-btn" data-dd="${name}" aria-haspopup="true" aria-expanded="false" title="${label}" aria-label="${label}">${ic(icon)}${ic("caret-down").replace("h-4 w-4", "h-3 w-3")}</button>
    <div class="wysiwyg-menu hidden" data-dd-menu="${name}">${menu}</div>
  </div>`;

const COLORS = [
  "#0f172a", "#334155", "#64748b", "#94a3b8", "#cbd5e1", "#ffffff",
  "#7f1d1d", "#b91c1c", "#ef4444", "#f87171", "#fca5a5", "#fee2e2",
  "#7c2d12", "#c2410c", "#f97316", "#fb923c", "#fdba74", "#ffedd5",
  "#064e3b", "#047857", "#10b981", "#34d399", "#a7f3d0", "#d1fae5",
  "#173678", "#1950c8", "#2361e7", "#5d8bef", "#98b6f6", "#e2ebfd",
  "#4c1d95", "#6d28d9", "#8b5cf6", "#a78bfa", "#c4b5fd", "#ede9fe",
];
const FONTS = ["Instrument Sans", "Arial", "Courier New", "Georgia", "Lucida Sans Unicode", "Tahoma", "Times New Roman", "Trebuchet MS", "Verdana"];
const SIZES = ["12px", "14px", "16px", "18px", "20px", "36px"];
const FORMATS = [
  ["p", "Paragraph", "0"],
  ["h1", "Heading 1", "1"],
  ["h2", "Heading 2", "2"],
  ["h3", "Heading 3", "3"],
  ["h4", "Heading 4", "4"],
  ["h5", "Heading 5", "5"],
  ["h6", "Heading 6", "6"],
];

const sizeMenu = SIZES.map((s) => `<button type="button" class="wysiwyg-menu-item" data-cmd="size" data-value="${s}">${s}</button>`).join("");
const fontMenu = FONTS.map((f) => `<button type="button" class="wysiwyg-menu-item" data-cmd="font" data-value="${f}" style="font-family: '${f}', sans-serif">${f}</button>`).join("");
const formatMenu = FORMATS.map(([v, l, n]) => `<button type="button" class="wysiwyg-menu-item" data-cmd="format" data-value="${v}"><span>${l}</span><kbd>Ctrl+Alt+${n}</kbd></button>`).join("");
const colorMenu = `
  <div class="p-2 pb-0">
    <p class="mb-1 text-xs font-medium text-fg-muted">Hex</p>
    <input class="input h-8 text-xs" placeholder="#2361e7 lalu Enter" data-cmd="color-hex" aria-label="Warna hex" />
  </div>
  <div class="wysiwyg-swatches">${COLORS.map((c) => `<button type="button" class="wysiwyg-swatch" style="background:${c}" data-cmd="color" data-value="${c}" title="${c}" aria-label="Warna ${c}"></button>`).join("")}</div>
  <button type="button" class="wysiwyg-menu-item" data-cmd="color-reset">Reset warna</button>`;

const SAMPLE = `
  <h2>Selamat datang di editor KarirKit</h2>
  <p>Tulis, <strong>format</strong>, dan atur teks langsung di sini. Pilih sebagian teks lalu pakai toolbar di atas — coba <em>miring</em>, <u>garis bawah</u>, atau <a href="https://karirkit.vercel.app">tambahkan tautan</a>.</p>
  <p>Gunakan <code>kode inline</code> untuk potongan kode singkat.</p>`;

const editor = ({ toolbar, content = SAMPLE, footer = "", placeholder = "Tulis sesuatu…" }) => `
  <div class="wysiwyg max-w-3xl" data-wysiwyg>
    <div class="wysiwyg-toolbar" role="toolbar" aria-label="Format teks">${toolbar}</div>
    <div class="wysiwyg-content" data-placeholder="${placeholder}">${content}</div>
    ${footer}
  </div>`;

const wrap = (inner) => `<div class="p-6">${inner}</div>`;

export default {
  title: "Components/WYSIWYG",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Rich text editor tanpa dependensi (contenteditable), jalan offline - **tanpa dependensi eksternal/CDN**, jadi tidak perlu `npm install` tambahan. **Getting started:** muat `assets/js/wysiwyg.js`, lalu beri atribut `data-wysiwyg` pada root `.wysiwyg` yang berisi `.wysiwyg-toolbar` dan `.wysiwyg-content`. Tombol toolbar memakai `data-cmd` (`bold`, `italic`, `format` + `data-value=\"h1\"`, `size`, `color`, `font`, `link`, `image`, `video`, dst); dropdown memakai `data-dd` + `data-dd-menu`. Ambil isi lewat `KKWysiwyg.get(root).getHTML()` atau dengarkan event `wysiwyg:change`. Teks yang di-paste dijadikan plain text. Pintasan: `Ctrl/Cmd+Alt+0..6` untuk Paragraph/Heading 1-6.",
      },
    },
  },
};

export const DefaultTextEditor = {
  name: "Default text editor",
  render: () =>
    wrap(
      editor({
        toolbar: [
          group(btn("bold", "text-b", "Bold"), btn("italic", "text-italic", "Italic"), btn("underline", "text-underline", "Underline"), btn("strike", "text-strikethrough", "Strike")),
          group(btn("highlight", "highlighter", "Highlight"), btn("code", "code", "Code")),
          group(btn("link", "link", "Link"), btn("unlink", "link-break", "Remove link")),
          group(dd("size", "Text size", "text-aa", sizeMenu), dd("color", "Text color", "palette", colorMenu), dd("font", "Font family", "text-t", fontMenu)),
          group(btn("align-left", "text-align-left", "Align left"), btn("align-center", "text-align-center", "Align center"), btn("align-right", "text-align-right", "Align right")),
          group(dd("format", "Typography", "text-h", formatMenu), btn("image", "image", "Add image"), btn("video", "youtube-logo", "Add video")),
          group(btn("bullet-list", "list-bullets", "Bullet list"), btn("ordered-list", "list-numbers", "Ordered list"), btn("blockquote", "quotes", "Blockquote"), btn("hr", "minus", "Horizontal rule")),
        ].join(""),
      })
    ),
};

export const TextFormatting = {
  name: "Text formatting",
  render: () =>
    wrap(
      editor({
        toolbar: [
          group(btn("bold", "text-b", "Bold"), btn("italic", "text-italic", "Italic"), btn("underline", "text-underline", "Underline"), btn("strike", "text-strikethrough", "Strike"), btn("subscript", "text-subscript", "Subscript"), btn("superscript", "text-superscript", "Superscript")),
          group(btn("highlight", "highlighter", "Highlight"), btn("code", "code", "Code")),
          group(dd("size", "Text size", "text-aa", sizeMenu), dd("color", "Text color", "palette", colorMenu), dd("font", "Font family", "text-t", fontMenu)),
        ].join(""),
        content: `<p>Setiap komentar bisa diformat: <strong>tebal</strong>, <em>miring</em>, H<sub>2</sub>O, x<sup>2</sup>, dan <mark>sorotan</mark>.</p>`,
        placeholder: "Tulis komentar…",
        footer: `<div class="wysiwyg-footer"><span class="text-xs text-fg-subtle">Pilih teks lalu terapkan format</span><button type="button" class="btn-primary btn-sm">Post comment</button></div>`,
      })
    ),
};

export const TextAlignment = {
  name: "Text alignment",
  render: () =>
    wrap(
      editor({
        toolbar: group(
          btn("align-left", "text-align-left", "Align left"),
          btn("align-center", "text-align-center", "Align center"),
          btn("align-right", "text-align-right", "Align right"),
          btn("align-justify", "text-align-justify", "Justify")
        ),
        content: `<h3>Judul paragraf</h3><p>Letakkan kursor di paragraf, lalu pilih perataan: kiri, tengah, kanan, atau rata kiri-kanan (justify). Perataan berlaku untuk blok yang sedang dipilih, termasuk judul. Teks yang cukup panjang membuat efek justify terlihat jelas pada baris-baris penuh.</p>`,
      })
    ),
};

export const TypographyElements = {
  name: "Typography elements",
  render: () =>
    wrap(
      editor({
        toolbar: [
          group(dd("format", "Typography", "text-h", formatMenu)),
          group(btn("code-block", "code-block", "Code block"), btn("bullet-list", "list-bullets", "Bullet list"), btn("ordered-list", "list-numbers", "Ordered list"), btn("blockquote", "quotes", "Blockquote"), btn("hr", "minus", "Horizontal rule")),
        ].join(""),
        content: `
          <h2>Elemen tipografi</h2>
          <p>Paragraf biasa, diikuti daftar dan kutipan.</p>
          <ul><li>Butir pertama</li><li>Butir kedua</li></ul>
          <ol><li>Langkah satu</li><li>Langkah dua</li></ol>
          <blockquote>Desain yang baik adalah sesedikit mungkin desain.</blockquote>
          <pre><code>npm install @foxtrot-sevima/karirkit</code></pre>
          <hr>
          <p>Coba pintasan <code>Ctrl+Alt+1</code> untuk Heading 1.</p>`,
      })
    ),
};
