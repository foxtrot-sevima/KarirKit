import { byKey } from "./examples.js";

export default {
  title: "Components/File Upload",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Unggah file lewat klik atau seret. Bungkus dengan \`.upload\` + \`data-file-upload\`; \`assets/js/file-upload.js\` memvalidasi format dan ukuran, menampilkan daftar file (miniatur gambar, tombol hapus, progres), dan menyinkronkan file yang lolos kembali ke \`<input type="file">\` sehingga pengiriman \`<form>\` biasa tetap bekerja. Untuk satu berkas di formulir padat, cukup \`.input.input-file\` tanpa JS.

| Atribut | Fungsi |
| --- | --- |
| \`accept\` (pada input) | Format yang diizinkan (\`.pdf,.docx\`, \`image/*\`) |
| \`multiple\` (pada input) | Banyak file; tanpa ini file baru menggantikan yang lama |
| \`data-upload-max-size\` | Ukuran maksimum per file, MB |
| \`data-upload-max-files\` | Jumlah file maksimum (dengan \`multiple\`) |
| \`data-upload-preview="image"\` | Miniatur untuk file gambar |
| \`data-upload-simulate="true"\` | Progres palsu untuk mockup |

**Ukuran:** lebar mengikuti wadah; tinggi lewat \`.upload-sm\` / \`.upload-lg\` atau \`--upload-h\`.

**Responsif:** di ponsel area menjadi tombol ketuk (tanpa teks "seret"), dan tombol hapus berukuran 44px.

Event \`upload:add\`, \`upload:remove\`, \`upload:error\` (\`detail.reason\`: \`type\` · \`size\` · \`count\`). API: \`KKUpload.files(el)\`, \`KKUpload.clear(el)\`, \`KKUpload.progress(el, file, persen)\`, \`KKUpload.init(root)\`.
`,
      },
    },
  },
};

const story = (key) => ({
  parameters: { docs: { description: { story: byKey[key].note } } },
  render: () => `<div class="p-6">${byKey[key].demo}</div>`,
});

export const FileInput = story("input");
export const Dropzone = story("dropzone");
export const MultipleFiles = story("multiple");
export const ImagePreview = story("image");
export const Compact = story("compact");
export const Sizes = story("sizes");
export const ErrorState = story("error");
export const Disabled = story("disabled");
