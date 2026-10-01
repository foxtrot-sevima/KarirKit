export default {
  title: "Components/Card",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Kartu dasar, kartu statistik, dan kartu hero bergradasi." } },
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    hoverable: { control: "boolean", description: "Tambahkan `.card-hover` (shadow naik saat hover)" },
  },
  args: {
    title: "Basic Card",
    description: "Kontainer default untuk mengelompokkan konten - border tipis, sudut membulat, dan shadow lembut.",
    hoverable: false,
  },
};

export const Playground = {
  render: (args) => `
    <div class="p-6">
      <div class="card${args.hoverable ? " card-hover" : ""} p-5 max-w-sm">
        <p class="mb-1 text-sm font-semibold text-slate-800">${args.title}</p>
        <p class="text-sm text-slate-500">${args.description}</p>
      </div>
    </div>`,
};

export const Stat = {
  render: () => `
    <div class="p-6">
      <div class="card card-hover p-5 max-w-sm">
        <div class="mb-3 flex items-center justify-between">
          <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
            <i class="kk kk-briefcase h-5 w-5"></i>
          </span>
          <span class="badge-success">
            <i class="kk kk-trend-up h-3 w-3"></i>
            12%
          </span>
        </div>
        <p class="font-display text-2xl font-bold text-slate-900">248</p>
        <p class="text-sm text-slate-500">Lamaran Terkirim</p>
      </div>
    </div>`,
};

export const GradientHero = {
  name: "Gradient Hero",
  render: () => `
    <div class="p-6">
      <div class="rounded-2xl bg-brand-gradient p-5 text-white shadow-glow-primary max-w-sm">
        <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
          <i class="kk kk-sparkle h-5 w-5"></i>
        </span>
        <p class="mt-3 font-display text-lg font-bold">AI Career Coach</p>
        <p class="mt-1 text-sm text-white/80">Kartu hero bergradasi untuk fitur unggulan &amp; highlight AI.</p>
      </div>
    </div>`,
};

// Appended variants

// ---------------------------------------------------------------------------
// Card component - extended layouts (see src/input.css "Cards")
// ---------------------------------------------------------------------------
import { avatarSrc, avatarImg, coverSrc } from "../../_helpers/placeholders.js";

const exBlock = (inner) => `<div class="p-6">${inner}</div>`;
const arrow = `<i class="kk kk-arrow-right h-4 w-4"></i>`;
const star = (on) => `<i class="kk kk-fill kk-star h-4 w-4 ${on ? "text-warning-400" : "text-neutral-300"}"></i>`;
const stars = (n) => [1, 2, 3, 4, 5].map((i) => star(i <= n)).join("");
const check = `<i class="kk kk-check-circle h-4 w-4 shrink-0 text-success-600"></i>`;

export const DefaultCard = {
  name: "Default card",
  render: () =>
    exBlock(`<div class="card card-body max-w-sm">
      <h3 class="card-title">Lowongan terbaru minggu ini</h3>
      <p class="card-text mt-2">Lebih dari 120 lowongan baru dari perusahaan mitra sudah tersedia. Temukan yang paling cocok dengan profilmu.</p>
    </div>`),
};

export const CardWithButton = {
  name: "Card with button",
  render: () =>
    exBlock(`<div class="card card-body max-w-sm">
      <h3 class="card-title">Lengkapi profilmu</h3>
      <p class="card-text mt-2">Profil yang lengkap meningkatkan peluang dilirik rekruter hingga dua kali lipat.</p>
      <div class="mt-5"><button type="button" class="btn-primary btn-md">Lengkapi sekarang${arrow}</button></div>
    </div>`),
};

export const CardWithLink = {
  name: "Card with link",
  render: () =>
    exBlock(`<div class="card card-body max-w-sm">
      <h3 class="card-title">Tips menulis CV</h3>
      <p class="card-text mt-2">Panduan singkat menyusun CV yang lolos penyaringan otomatis dan menarik di mata rekruter.</p>
      <a href="#" class="card-link mt-4">Baca selengkapnya${arrow}</a>
    </div>`),
};

export const CardWithImage = {
  name: "Card with image",
  render: () =>
    exBlock(`<div class="card max-w-sm">
      <img class="card-img" src="${coverSrc(0)}" alt="Ilustrasi kegiatan karier">
      <div class="card-body">
        <span class="badge badge-primary badge-rounded">Webinar</span>
        <h3 class="card-title mt-3">Strategi wawancara kerja pertama</h3>
        <div class="mt-5"><button type="button" class="btn-primary btn-md">Daftar${arrow}</button></div>
      </div>
    </div>`),
};

export const CardWithDescription = {
  name: "Card with description",
  render: () =>
    exBlock(`<div class="card max-w-sm">
      <img class="card-img" src="${coverSrc(1)}" alt="Ilustrasi kelas karier">
      <div class="card-body">
        <h3 class="card-title">Kelas persiapan karier</h3>
        <p class="card-text mt-2">Belajar menyusun portofolio, latihan wawancara, dan negosiasi gaji bersama mentor berpengalaman.</p>
        <a href="#" class="btn-primary btn-md mt-5">Lihat kelas${arrow}</a>
      </div>
    </div>`),
};

export const HorizontalCard = {
  name: "Horizontal card",
  render: () =>
    exBlock(`<div class="card card-horizontal max-w-2xl">
      <img class="card-img" src="${coverSrc(2)}" alt="Ilustrasi berita karier">
      <div class="card-body">
        <h3 class="card-title">Tren rekrutmen 2026</h3>
        <p class="card-text mt-2">Skill apa yang paling dicari perusahaan tahun ini, dan bagaimana mempersiapkannya sejak masa kuliah.</p>
        <a href="#" class="card-link mt-4">Baca artikel${arrow}</a>
      </div>
    </div>`),
};

export const UserProfileCard = {
  name: "User profile card",
  render: () =>
    exBlock(`<div class="card max-w-xs">
      <div class="flex justify-end px-4 pt-4">
        <div class="relative">
          <button type="button" class="btn-ghost btn-icon-sm" data-ui-dropdown aria-expanded="false" aria-haspopup="true" aria-label="Opsi profil"><i class="kk kk-dots-three h-5 w-5"></i></button>
          <div class="dropdown-menu hidden">
            <a href="#" class="dropdown-item">Ubah profil</a>
            <a href="#" class="dropdown-item">Ekspor data</a>
            <a href="#" class="dropdown-item dropdown-item-danger">Hapus</a>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center px-6 pb-8 text-center">
        ${avatarImg(0, "avatar avatar-2xl mb-3", "Foto profil")}
        <h3 class="card-title">Ahmad Dimas</h3>
        <p class="text-sm text-fg-muted">Frontend Engineer</p>
        <div class="mt-5 flex gap-2">
          <button type="button" class="btn-primary btn-md">Ikuti</button>
          <button type="button" class="btn-outline btn-md">Kirim pesan</button>
        </div>
      </div>
    </div>`),
};

export const CardWithFormInputs = {
  name: "Card with form inputs",
  render: () =>
    exBlock(`<form class="card card-body max-w-sm space-y-4" onsubmit="return false">
      <h3 class="card-title">Masuk ke KarirLink</h3>
      <div>
        <label class="form-label" for="cf-email">Email</label>
        <input id="cf-email" type="email" class="input" placeholder="nama@email.com" />
      </div>
      <div>
        <label class="form-label" for="cf-pass">Kata sandi</label>
        <input id="cf-pass" type="password" class="input" placeholder="••••••••" />
      </div>
      <div class="flex items-center justify-between text-sm">
        <label class="flex items-center gap-2 text-fg-muted"><input type="checkbox" class="form-check" />Ingat saya</label>
        <a href="#" class="card-link">Lupa kata sandi?</a>
      </div>
      <button type="submit" class="btn-primary btn-md w-full">Masuk</button>
      <p class="text-center text-sm text-fg-muted">Belum punya akun? <a href="#" class="card-link">Daftar</a></p>
    </form>`),
};

export const ECommerceCard = {
  name: "E-commerce card",
  render: () =>
    exBlock(`<div class="card max-w-xs">
      <img class="card-img" src="${coverSrc(3)}" alt="Kelas Persiapan Interview">
      <div class="card-body">
        <h3 class="card-title">Kelas Persiapan Interview</h3>
        <div class="mt-2 flex items-center gap-1" aria-label="Rating 4 dari 5">${stars(4)}<span class="badge badge-primary badge-rounded ml-2">4,0</span></div>
        <div class="mt-5 flex items-center justify-between">
          <span class="font-display text-2xl font-bold text-fg">Rp149.000</span>
          <button type="button" class="btn-primary btn-md"><i class="kk kk-shopping-cart h-4 w-4"></i>Tambah</button>
        </div>
      </div>
    </div>`),
};

export const CallToActionCard = {
  name: "Call to action card",
  render: () =>
    exBlock(`<div class="card card-body max-w-xl text-center">
      <h3 class="font-display text-2xl font-bold text-fg">Cari kerja langsung dari ponsel</h3>
      <p class="card-text mt-2">Dapatkan notifikasi lowongan yang cocok dan lamar dalam satu ketukan dengan aplikasi KarirLink.</p>
      <div class="mt-6 flex flex-wrap justify-center gap-3">
        <a href="#" class="btn-dark btn-lg"><i class="kk kk-apple-logo h-5 w-5"></i>App Store</a>
        <a href="#" class="btn-dark btn-lg"><i class="kk kk-google-play-logo h-5 w-5"></i>Google Play</a>
      </div>
    </div>`),
};

const tabs = (id, labels, panels) => `
  <div data-ui-tabs>
    <div class="flex gap-1 rounded-control bg-neutral-100 p-1" role="tablist">
      ${labels.map((l, i) => `<button type="button" role="tab" data-ui-tab="${id}-${i}" aria-selected="${i === 0}" class="tab ${i === 0 ? "tab-active" : ""}">${l}</button>`).join("")}
    </div>
    <div class="mt-4">
      ${panels.map((p, i) => `<div role="tabpanel" id="${id}-${i}" class="${i === 0 ? "" : "hidden"}">${p}</div>`).join("")}
    </div>
  </div>`;

export const CardWithNavTabs = {
  name: "Card with nav tabs",
  render: () =>
    exBlock(`<div class="card card-body max-w-md">${tabs(
      "cnt",
      ["Tentang", "Layanan", "Statistik"],
      [
        `<h3 class="card-title">Tentang kami</h3><p class="card-text mt-2">KarirLink menghubungkan lulusan dengan perusahaan lewat lowongan, pelacakan alumni, dan kuesioner tracer study.</p>`,
        `<h3 class="card-title">Layanan</h3><ul class="card-text mt-2 list-disc space-y-1 pl-5"><li>Bursa lowongan kerja</li><li>Tracer study</li><li>Konsultasi karier</li></ul>`,
        `<h3 class="card-title">Statistik</h3><p class="card-text mt-2">12.480 lulusan terdaftar dan 340 perusahaan mitra aktif.</p>`,
      ]
    )}</div>`),
};

export const CardFullWidthTabs = {
  name: "Card full width tabs",
  render: () =>
    exBlock(`<div class="card max-w-2xl overflow-hidden" data-ui-tabs>
      <div class="grid grid-cols-2 border-b border-border-subtle text-sm font-medium" role="tablist">
        <button type="button" role="tab" data-ui-tab="cfw-0" aria-selected="true" class="tab-active border-b-2 border-primary-600 px-4 py-3 text-primary-700">Statistik</button>
        <button type="button" role="tab" data-ui-tab="cfw-1" aria-selected="false" class="px-4 py-3 text-fg-muted hover:text-fg">FAQ</button>
      </div>
      <div id="cfw-0" role="tabpanel" class="grid grid-cols-3 gap-4 p-6 text-center">
        <div><div class="font-display text-2xl font-bold text-fg">12,4rb</div><div class="text-sm text-fg-muted">Lulusan</div></div>
        <div><div class="font-display text-2xl font-bold text-fg">340</div><div class="text-sm text-fg-muted">Perusahaan</div></div>
        <div><div class="font-display text-2xl font-bold text-fg">2,1rb</div><div class="text-sm text-fg-muted">Lowongan</div></div>
      </div>
      <div id="cfw-1" role="tabpanel" class="hidden divide-y divide-border-subtle">
        ${["Bagaimana cara melamar?", "Apakah layanan ini gratis?", "Bagaimana mengisi tracer study?"]
          .map(
            (q) => `<details class="group px-6 py-4">
          <summary class="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-fg">${q}<i class="kk kk-caret-down h-4 w-4 transition-transform group-open:rotate-180"></i></summary>
          <p class="card-text mt-2">Buka halaman lowongan, pilih posisi yang diminati, lalu tekan tombol Lamar dan lengkapi data yang diminta.</p>
        </details>`
          )
          .join("")}
      </div>
    </div>`),
};

export const CardWithList = {
  name: "Card with list",
  render: () =>
    exBlock(`<div class="card card-body max-w-md">
      <div class="mb-4 flex items-center justify-between">
        <h3 class="card-title">Pelamar terbaru</h3>
        <a href="#" class="card-link">Lihat semua</a>
      </div>
      <ul class="divide-y divide-border-subtle">
        ${[
          ["Neil Sims", "neil@email.com", "92%"],
          ["Bonnie Green", "bonnie@email.com", "88%"],
          ["Michael Gough", "michael@email.com", "81%"],
          ["Lana Byrd", "lana@email.com", "76%"],
        ]
          .map(
            ([n, e, s], i) => `<li class="flex items-center gap-3 py-3">
          ${avatarImg(i, "avatar avatar-lg", n)}
          <div class="min-w-0 flex-1"><p class="truncate text-sm font-semibold text-fg">${n}</p><p class="truncate text-sm text-fg-muted">${e}</p></div>
          <span class="badge badge-success">${s}</span>
        </li>`
          )
          .join("")}
      </ul>
    </div>`),
};

export const PricingCard = {
  name: "Pricing card",
  render: () =>
    exBlock(`<div class="card card-body max-w-sm">
      <h3 class="text-sm font-semibold uppercase tracking-wide text-fg-muted">Paket Premium</h3>
      <div class="mt-3 flex items-baseline gap-1"><span class="font-display text-4xl font-bold text-fg">Rp99rb</span><span class="text-sm text-fg-muted">/bulan</span></div>
      <ul class="mt-6 space-y-3 text-sm text-fg-muted">
        ${["Lamar hingga 100 lowongan/bulan", "Analisis kecocokan CV dengan AI", "Prioritas dilihat rekruter", "Konsultasi karier 1x/bulan"].map((f) => `<li class="flex items-center gap-2">${check}${f}</li>`).join("")}
      </ul>
      <button type="button" class="btn-primary btn-lg mt-6 w-full">Pilih paket</button>
    </div>`),
};

export const TestimonialCard = {
  name: "Testimonial card",
  render: () =>
    exBlock(`<div class="grid gap-4 md:grid-cols-3">${[
      ["Dari sini aku dapat panggilan interview dalam dua minggu. Fitur rekomendasinya benar-benar relevan.", "Neil Sims", "Fresh Graduate"],
      ["Tracer study jadi jauh lebih mudah. Data alumni langsung rapi tanpa rekap manual.", "Bonnie Green", "Staf Kemahasiswaan"],
      ["Kami menemukan kandidat yang tepat lebih cepat dibanding jalur rekrutmen sebelumnya.", "Michael Gough", "HR Manager"],
    ]
      .map(
        ([q, n, r], i) => `<figure class="card card-body flex flex-col">
        <div class="flex items-center gap-1" aria-label="Rating 5 dari 5">${stars(5)}</div>
        <blockquote class="mt-3 flex-1 text-sm text-fg-muted">&ldquo;${q}&rdquo;</blockquote>
        <figcaption class="mt-5 flex items-center gap-3">
          ${avatarImg(i, "avatar avatar-lg", n)}
          <div><div class="text-sm font-semibold text-fg">${n}</div><div class="text-xs text-fg-muted">${r}</div></div>
        </figcaption>
      </figure>`
      )
      .join("")}</div>`),
};
