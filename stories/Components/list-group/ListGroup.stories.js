import { byKey } from "./examples.js";

export default {
  title: "Components/List Group",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Daftar baris dalam satu bingkai. Anatomi: \`.list-group\` (\`<ul>\` atau \`<div>\`) > \`.list-group-item\` (\`<li>\`, \`<a>\`, atau \`<button>\`). Hanya CSS, tanpa JS.

| Kelas / atribut | Fungsi |
| --- | --- |
| \`.list-group\` | Bingkai dengan garis dan sudut membulat; atur lebar dengan \`w-*\` |
| \`.list-group-item\` | Satu baris: padding, garis bawah, ikon di kiri lewat \`gap-2\` |
| \`.list-group-item-action\` | Menambah hover, fokus, dan kursor untuk tautan atau tombol |
| \`aria-current="true"\` atau \`.is-active\` | Baris aktif (teks dan latar primer) |
| \`disabled\` atau \`aria-disabled="true"\` | Baris nonaktif |
| \`.list-group-flush\` | Tanpa bingkai luar dan sudut (untuk di dalam kartu) |

Untuk daftar fitur, statistik, dan pengguna, gabungkan \`.card\` dengan \`<ul>\` dan utilitas \`space-y-*\` atau \`divide-y\`.
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
export const WithLinks = story("links");
export const WithButtons = story("buttons");
export const WithIcons = story("icons");
export const Features = story("features");
export const Statistics = story("stats");
export const AvatarsAndCta = story("avatars");

export const ListMenu = {
  name: "List menu",
  parameters: { docs: { description: { story: "Daftar pengaturan berbaris: `.list-menu-item` (tombol), `.list-menu-row` (baris dengan aksi di sisi), `.list-menu-back`, `.list-menu-foot`. `.list-menu-row.is-off` meredupkan barisnya." } } },
  render: () => `<div class="p-6"><div class="list-group max-w-md divide-y divide-border-subtle">
    <button type="button" class="list-menu-item"><span>Header</span><i class="kk kk-caret-right h-4 w-4 text-fg-subtle"></i></button>
    <div class="list-menu-row"><button type="button" class="list-menu-item"><span>Testimoni Alumni</span></button><label class="toggle mr-5"><input type="checkbox" class="toggle-input" checked /><span class="toggle-track"></span></label></div>
    <div class="list-menu-row is-off"><button type="button" class="list-menu-item"><span>Bimbingan Karir</span></button><label class="toggle mr-5"><input type="checkbox" class="toggle-input" /><span class="toggle-track"></span></label></div>
    <button type="button" class="list-menu-item" disabled><span>Segera hadir</span></button>
    <div class="list-menu-foot"><button type="button" class="btn-outline btn-md">Batal</button><button type="button" class="btn-primary btn-md">Simpan</button></div>
  </div></div>`,
};
