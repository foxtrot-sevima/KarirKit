import { byKey } from "./examples.js";

export default {
  title: "Components/Cropper",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Pangkas gambar dengan rasio tetap sebelum diunggah, mis. foto profil 1:1. Cukup \`<div class="cropper" data-cropper></div>\`; \`assets/js/cropper.js\` membuat area pangkas, bingkai, dan slider zoom, lalu pengguna menggeser dan memperbesar gambar.

| Atribut | Fungsi |
| --- | --- |
| \`data-cropper-ratio\` | Lebar / tinggi hasil (default \`1\`) |
| \`data-cropper-output\` | Lebar hasil dalam piksel (default \`512\`) |
| \`data-cropper-max-zoom\` | Zoom maksimum (default \`4\`) |
| \`data-cropper-src\` | Gambar yang dimuat otomatis (URL atau data URL) |
| \`.cropper-round\` (kelas) | Bingkai bulat untuk foto profil; hasil tetap persegi |

**Memuat gambar dari berkas:** \`KKCropper.load(el, file)\` menerima \`File\`, \`Blob\`, atau URL dan mengembalikan Promise. Biasanya dipakai di dalam Modal setelah pengguna memilih berkas.

**Mengambil hasil:** \`KKCropper.toDataURL(el, { type, quality, size })\` atau \`KKCropper.toBlob(el, ...)\`; \`KKCropper.reset(el)\` mengembalikan posisi awal.

**Papan ketik dan sentuh:** fokus di area pangkas, panah menggeser dan + / - mengubah zoom; cubit dua jari memperbesar. Tombol zoom berukuran 44px di ponsel.

Event \`cropper:ready\` (\`detail: { width, height }\`), \`cropper:change\` (\`detail: { zoom }\`), dan \`cropper:error\`.
`,
      },
    },
  },
};

const story = (key) => ({
  parameters: { docs: { description: { story: byKey[key].note } } },
  render: () => `<div class="p-6">${byKey[key].demo}</div>`,
});

export const Round = story("round");
export const Square = story("square");
export const Landscape = story("landscape");
