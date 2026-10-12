/* Contoh Timeline — satu sumber untuk Storybook (Timeline.stories.js) dan index.html.
   Tiap contoh: { key, name, note, wide?, demo }. Hanya CSS (tanpa JS). */

const ic = (n, cls = "h-4 w-4") => `<i class="kk kk-${n} ${cls}" aria-hidden="true"></i>`;
const initials = (n) => n.split(" ").map((p) => p[0]).join("");
const av = (n, tone) => `<span class="avatar avatar-sm bg-${tone}-100 text-${tone}-700">${initials(n)}</span>`;

const btn = (label, icon, cls = "btn-outline btn-md", tag = "a") =>
  `<${tag} ${tag === "a" ? 'href="#"' : 'type="button"'} class="${cls}">${label}${icon ? ic(icon) : ""}</${tag}>`;

/* 1. Default: titik polos */
const DEFAULT = [
  ["Februari 2026", "Pendaftaran akun dan profil", "Alumni melengkapi profil dasar, riwayat pendidikan, dan kontak sebelum mengisi kuesioner."],
  ["Maret 2026", "Pengisian Kuesioner Lulusan", "Kuesioner Tracer Study dibuka untuk angkatan terbaru dengan pengingat otomatis."],
  ["April 2026", "Rekap dan laporan akreditasi", "Data jawaban dirangkum menjadi laporan partisipasi dan status karier alumni."],
];
const defaultTimeline = `<ol class="timeline">
    ${DEFAULT.map(([t, h, p], i) => `<li class="timeline-item timeline-item-dot">
      <span class="timeline-dot"></span>
      <time class="timeline-time">${t}</time>
      <h3 class="timeline-title">${h}</h3>
      <p class="timeline-body">${p}</p>${i === 0 ? `\n      ${btn("Pelajari", "arrow-right")}` : ""}
    </li>`).join("\n    ")}
  </ol>`;

/* 2. Vertikal: penanda ikon + lencana waktu */
const RELEASES = [
  ["13 Maret 2026", "KarirKit v1.3.0", "Tabel dirombak total, Modal dan Datepicker dilengkapi."],
  ["09 Januari 2026", "KarirKit v1.2.0", "Storybook interaktif penuh dan komponen Breadcrumb."],
  ["14 Oktober 2025", "KarirKit v1.1.0", "Penamaan komponen diseragamkan di seluruh dokumentasi."],
];
const verticalTimeline = `<ol class="timeline">
    ${RELEASES.map(([t, h, p], i) => `<li class="timeline-item">
      <span class="timeline-marker">${ic("calendar-blank", "h-3 w-3")}</span>
      <time class="badge-neutral">${t}</time>
      <h3 class="timeline-title flex items-center gap-2">${h}${i === 0 ? '<span class="badge-primary">Terbaru</span>' : ""}</h3>
      <p class="timeline-body mb-0">${p}</p>${i === 0 ? `\n      <div class="mt-4">${btn("Unduh ZIP", "download-simple")}</div>` : ""}
    </li>`).join("\n    ")}
  </ol>`;

/* 3. Stepper horizontal */
const STEPS = [
  ["09 Januari 2026", "Tahap 1: Pengiriman"],
  ["14 Maret 2026", "Tahap 2: Pengisian"],
  ["26 September 2026", "Tahap 3: Rekap"],
];
const stepper = `<ol class="timeline-steps">
    ${STEPS.map(([t, h], i) => `<li class="timeline-step">
      <div class="timeline-step-track">
        <span class="timeline-step-marker">${ic("calendar-blank", "h-3 w-3")}</span>
        <span class="timeline-step-line${i === STEPS.length - 1 ? " sm:invisible" : ""}"></span>
      </div>
      <div class="mt-3 sm:pe-8">
        <time class="badge-neutral">${t}</time>
        <h3 class="timeline-title">${h}</h3>
        <p class="timeline-body">Tautan kuesioner dikirim ke alumni dan dipantau dari dashboard.</p>
        ${btn("Selengkapnya", "", "btn-outline btn-sm", "button")}
      </div>
    </li>`).join("\n    ")}
  </ol>`;

/* 4. Log aktivitas */
const link = (t) => `<a href="#" class="font-medium text-fg hover:underline">${t}</a>`;
const activity = `<ol class="timeline">
    <li class="timeline-item">
      <span class="timeline-marker p-0">${av("Bonnie Green", "primary")}</span>
      <div class="card items-center justify-between p-4 sm:flex">
        <time class="badge-primary mb-1 shrink-0 whitespace-nowrap sm:order-last sm:mb-0">baru saja</time>
        <div class="text-sm text-fg-muted">${link("Bonnie Green")} memindahkan ${link("Jese Leos")} ke <span class="badge-neutral">Grup Alumni 2025</span></div>
      </div>
    </li>
    <li class="timeline-item">
      <span class="timeline-marker p-0">${av("Thomas Lean", "info")}</span>
      <div class="card p-4">
        <div class="mb-2 items-center justify-between sm:flex">
          <time class="badge-primary mb-1 shrink-0 whitespace-nowrap sm:order-last sm:mb-0">2 jam lalu</time>
          <div class="text-sm font-normal text-fg-muted">${link("Thomas Lean")} berkomentar di ${link("Laporan Tracer Study")}</div>
        </div>
        <div class="rounded-control border border-border bg-neutral-50 p-3 text-xs italic text-fg-muted">"Halo semua! Saya ingin membagikan hasil rekap partisipasi angkatan 2024 untuk bahan rapat akreditasi."</div>
        <div class="mt-3 flex gap-2">${btn("Lihat komentar", "", "btn-outline btn-sm", "button")}${btn("Balas", "arrow-bend-up-left", "btn-primary btn-sm", "button")}</div>
      </div>
    </li>
    <li class="timeline-item">
      <span class="timeline-marker p-0">${av("Rina Kartika", "success")}</span>
      <div class="card items-center justify-between p-4 sm:flex">
        <time class="badge-primary mb-1 shrink-0 whitespace-nowrap sm:order-last sm:mb-0">3 jam lalu</time>
        <div class="text-sm text-fg-muted">${link("Rina Kartika")} memindahkan ${link("Dewi Pratiwi")} ke <span class="badge-neutral">Grup Alumni 2024</span></div>
      </div>
    </li>
  </ol>`;

/* 5. Linimasa berkelompok per tanggal */
const PEOPLE = [["Laura Romeros", "primary", true], ["Mike Willi", "info", false], ["Jese Leos", "success", true], ["Bonnie Green", "warning", false]];
const entry = ([n, tone, pub]) => `<li>
        <a href="#" class="block items-center p-3 transition-colors hover:bg-neutral-100 sm:flex">
          <span class="avatar avatar-lg me-3 mb-3 bg-${tone}-100 text-${tone}-700 sm:mb-0">${initials(n)}</span>
          <div>
            <div class="mb-1 text-sm text-fg-muted"><span class="font-medium text-fg">${n}</span> menambahkan komentar di <span class="font-medium text-fg">Laporan Tracer Study</span></div>
            <div class="mb-2 text-sm text-fg-muted">"Saya ingin membagikan rekap partisipasi angkatan ini."</div>
            <span class="badge-neutral">${ic(pub ? "eye" : "lock", "h-3 w-3")}${pub ? "Publik" : "Privat"}</span>
          </div>
        </a>
      </li>`;
const group = (date) => `<div class="mb-4 rounded-control border border-border bg-neutral-50 p-5">
    <time class="text-lg font-semibold text-fg">${date}</time>
    <ol class="mt-3 divide-y divide-border">
      ${PEOPLE.map(entry).join("\n      ")}
    </ol>
  </div>`;
const grouped = `${group("15 Januari 2026")}\n  ${group("13 Januari 2026")}`;

export const examples = [
  {
    key: "default",
    name: "Default timeline",
    note: "<code>ol.timeline</code> dengan garis di kiri; tiap <code>li.timeline-item</code> memuat titik <code>.timeline-dot</code>, waktu (<code>.timeline-time</code>), judul (<code>.timeline-title</code>), dan isi (<code>.timeline-body</code>). Pakai <code>.timeline-item-dot</code> untuk jarak titik polos.",
    demo: defaultTimeline,
  },
  {
    key: "vertical",
    name: "Vertical timeline",
    note: "Penanda berikon <code>.timeline-marker</code> menutupi garis, dengan lencana waktu dan lencana \"Terbaru\" di judul.",
    demo: verticalTimeline,
  },
  {
    key: "stepper",
    name: "Stepper timeline",
    note: "Mendatar mulai ukuran <code>sm</code> dengan <code>.timeline-steps</code> > <code>.timeline-step</code>; garis penghubung <code>.timeline-step-line</code> tersembunyi di ponsel dan langkah menumpuk ke bawah.",
    wide: true,
    demo: stepper,
  },
  {
    key: "activity",
    name: "Activity log",
    note: "Penanda berisi avatar dan kartu <code>.card</code> per aktivitas; lencana waktu berada di kanan pada layar lebar.",
    demo: activity,
  },
  {
    key: "grouped",
    name: "Grouped timeline",
    note: "Satu kotak per tanggal berisi daftar bergaris pemisah (<code>divide-y</code>) dengan avatar, kutipan, dan lencana visibilitas.",
    wide: true,
    demo: grouped,
  },
];

export const byKey = Object.fromEntries(examples.map((e) => [e.key, e]));
