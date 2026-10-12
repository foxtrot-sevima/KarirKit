import { byKey } from "./examples.js";

export default {
  title: "Components/Clipboard",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Tombol untuk menyalin teks ke papan klip. Pasang \`data-clipboard-target\` pada tombol; \`assets/js/clipboard.js\` menyalin isi elemen tujuan dan menukar tampilan tombol selama 2 detik. Memakai \`navigator.clipboard\` dan cadangan \`execCommand\` untuk halaman non-HTTPS.

| Atribut | Fungsi |
| --- | --- |
| \`data-clipboard-target\` | Selektor elemen yang disalin (mis. \`#npm-install\`) |
| \`data-clipboard-text\` | Teks tetap yang disalin; \`@url\` = alamat halaman saat ini |
| \`data-clipboard-type\` | \`input\` (nilai field, default untuk input) · \`text\` (teks terlihat) · \`html\` (innerHTML dengan entitas didekode, untuk blok kode) |
| \`data-clipboard-duration\` | Lama keadaan berhasil (ms, default 2000) |
| \`data-clipboard-tooltip-success\` | Teks tooltip setelah berhasil (default "Tersalin!") |
| \`data-clipboard-toast\` | Pesan toast setelah berhasil (butuh \`toast.js\`) |

**Isi tombol:** \`[data-clipboard-default]\` tampil awalnya, \`[data-clipboard-success]\` (kelas \`hidden\`) tampil setelah menyalin. Jika ada \`.tooltip-content\` di dalam atau di samping tombol, teksnya ikut berganti.

Event \`clipboard:copy\` (\`detail: { text, trigger, target }\`) dan \`clipboard:error\`. API: \`KKClipboard.copy(text)\` → Promise, \`KKClipboard.read(target, type)\`.
`,
      },
    },
  },
};

const story = (key) => ({
  parameters: { docs: { description: { story: byKey[key].note } } },
  render: () => `<div class="p-6">${byKey[key].demo}</div>`,
});

export const Default = story("default");
export const InputWithIconButton = story("icon");
export const ButtonWithText = story("text");
export const InputGroup = story("group");
export const UrlShortener = story("shortener");
export const CodeBlock = story("code");
export const ApiKeysCard = story("card");
export const ContactDetails = story("contact");
export const WithModal = story("modal");
