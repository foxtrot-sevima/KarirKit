/* Contoh Footer — satu sumber untuk Storybook (Footer.stories.js) dan index.html.
   Tiap contoh: { key, name, note, wide?, demo }. Hanya CSS (tanpa JS). */

const ic = (n, cls = "h-5 w-5") => `<i class="kk kk-${n} ${cls}" aria-hidden="true"></i>`;
const brandMark = `<span class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">${ic("briefcase", "h-4 w-4")}</span>`;
const copy = `&copy; 2026 <a href="#" class="hover:underline">KarirKit</a>. Hak cipta dilindungi.`;

const linkRow = (labels) => labels.map((l) => `<li><a href="#" class="footer-link">${l}</a></li>`).join("\n        ");
const social = `<div class="footer-social">
        <a href="#" aria-label="Facebook">${ic("facebook-logo")}</a>
        <a href="#" aria-label="Discord">${ic("discord-logo")}</a>
        <a href="#" aria-label="X">${ic("x-logo")}</a>
        <a href="#" aria-label="GitHub">${ic("github-logo")}</a>
        <a href="#" aria-label="Dribbble">${ic("dribbble-logo")}</a>
      </div>`;
const column = (title, labels) => `<div>
          <h3 class="footer-heading">${title}</h3>
          <ul class="footer-list">
            ${labels.map((l) => `<li><a href="#" class="hover:underline">${l}</a></li>`).join("\n            ")}
          </ul>
        </div>`;

export const examples = [
  {
    key: "default",
    name: "Default footer",
    note: "<code>footer.footer.footer-card</code> berisi <code>.footer-inner.footer-row</code> dengan hak cipta (<code>.footer-copy</code>) di kiri dan tautan (<code>.footer-links</code> > <code>.footer-link</code>) di kanan.",
    wide: true,
    demo: `<footer class="footer footer-card">
  <div class="footer-inner footer-row">
    <span class="footer-copy">${copy}</span>
    <ul class="footer-links">
        ${linkRow(["Tentang", "Kebijakan Privasi", "Lisensi", "Kontak"])}
    </ul>
  </div>
</footer>`,
  },
  {
    key: "logo",
    name: "Footer with logo",
    note: "Logo di kiri, tautan di kanan, lalu pemisah (<code>.footer-divider</code>) dan hak cipta di tengah.",
    wide: true,
    demo: `<footer class="footer footer-card">
  <div class="footer-inner py-6 md:py-8">
    <div class="sm:flex sm:items-center sm:justify-between">
      <a href="#" class="mb-4 flex items-center gap-3 sm:mb-0"><span class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">${ic("briefcase", "h-4 w-4")}</span><span class="text-2xl font-semibold text-fg">KarirKit</span></a>
      <ul class="footer-links mb-6 sm:mb-0">
        ${linkRow(["Tentang", "Kebijakan Privasi", "Lisensi", "Kontak"])}
      </ul>
    </div>
    <hr class="footer-divider" />
    <span class="footer-copy block">${copy}</span>
  </div>
</footer>`,
  },
  {
    key: "social",
    name: "Footer with social media icons",
    note: "Logo dan tiga kolom tautan berjudul di atas, pemisah, lalu hak cipta dan ikon sosial (<code>.footer-social</code>) di bawah.",
    wide: true,
    demo: `<footer class="footer">
  <div class="footer-inner py-6 lg:py-8">
    <div class="md:flex md:justify-between">
      <a href="#" class="mb-6 flex items-center gap-3 md:mb-0">${brandMark}<span class="text-2xl font-semibold text-fg">KarirKit</span></a>
      <div class="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
        ${column("Sumber daya", ["Dokumentasi", "Storybook"])}
        ${column("Ikuti kami", ["GitHub", "Discord"])}
        ${column("Legal", ["Kebijakan Privasi", "Syarat &amp; Ketentuan"])}
      </div>
    </div>
    <hr class="footer-divider" />
    <div class="sm:flex sm:items-center sm:justify-between">
      <span class="footer-copy">${copy}</span>
      ${social.replace('class="footer-social"', 'class="footer-social mt-4 sm:mt-0"')}
    </div>
  </div>
</footer>`,
  },
  {
    key: "sitemap",
    name: "Sitemap links",
    note: "Empat kolom tautan di atas dan bilah bawah berlatar abu-abu muda (<code>bg-neutral-50</code>) berisi hak cipta dan ikon sosial.",
    wide: true,
    demo: `<footer class="footer">
  <div class="mx-auto w-full max-w-7xl">
    <div class="grid grid-cols-2 gap-8 px-4 py-6 md:grid-cols-4 lg:py-8">
      ${column("Perusahaan", ["Tentang", "Karier", "Pusat Merek", "Blog"])}
      ${column("Pusat bantuan", ["Server Discord", "X", "Facebook", "Hubungi kami"])}
      ${column("Legal", ["Kebijakan Privasi", "Lisensi", "Syarat &amp; Ketentuan"])}
      ${column("Unduh", ["iOS", "Android", "Windows", "macOS"])}
    </div>
    <div class="bg-neutral-50 px-4 py-6 md:flex md:items-center md:justify-between">
      <span class="footer-copy">${copy}</span>
      ${social.replace('class="footer-social"', 'class="footer-social mt-4 md:mt-0"')}
    </div>
  </div>
</footer>`,
  },
  {
    key: "sticky",
    name: "Sticky footer",
    note: "<code>.footer-fixed</code> menempel di tepi bawah layar (contoh ini memakai <code>relative</code> di dalam kotak contoh).",
    wide: true,
    demo: `<div class="relative h-40 overflow-hidden rounded-control border border-dashed border-border">
  <footer class="footer footer-fixed !absolute">
    <span class="footer-copy">${copy}</span>
    <ul class="footer-links mt-3 sm:mt-0">
        ${linkRow(["Tentang", "Kebijakan Privasi", "Lisensi", "Kontak"])}
    </ul>
  </footer>
</div>`,
  },
  {
    key: "app",
    name: "App footer",
    note: "Varian ringkas untuk halaman aplikasi (<code>.footer-bar</code>) dan halaman tengah seperti login atau error (<code>.footer-center</code>).",
    wide: true,
    demo: `<div class="space-y-6">
  <footer class="footer footer-bar rounded-control border">
    <p>&copy; 2026 SEVIMA. All Rights Reserved.</p>
    <p>KarirLink</p>
  </footer>
  <footer class="footer footer-center">&copy; 2026 SEVIMA. All Rights Reserved.</footer>
</div>`,
  },
];

export const byKey = Object.fromEntries(examples.map((e) => [e.key, e]));
