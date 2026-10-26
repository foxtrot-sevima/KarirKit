/* Contoh Chart — satu sumber untuk Storybook (Chart.stories.js) dan index.html.
   Tiap contoh: { key, name, note, demo }. Dirender oleh assets/js/chart.js (data-chart). */

const j = (v) => JSON.stringify(v).replace(/"/g, "&quot;");
const MONTHS = ["Mei", "Jun", "Jul", "Agu", "Sep", "Okt"];
const ic = (n, cls = "h-4 w-4") => `<i class="kk kk-${n} ${cls}"></i>`;

const chart = (type, attrs = {}) => {
  const a = Object.entries(attrs)
    .map(([k, v]) => ` data-chart-${k}="${typeof v === "string" ? v : j(v)}"`)
    .join("");
  return `<div data-chart="${type}"${a}></div>`;
};

const card = (title, sub, body) => `<div class="card p-5">
  <p class="text-sm font-semibold text-fg">${title}</p>
  <p class="mb-3 text-xs text-fg-muted">${sub}</p>
  ${body}
</div>`;

const delta = (v, up = true) =>
  `<span class="inline-flex items-center gap-0.5 text-sm font-semibold ${up ? "text-success-600" : "text-danger-600"}">${v}${ic(up ? "arrow-up" : "arrow-down", "h-3.5 w-3.5")}</span>`;

// Footer kartu: pilihan periode di kiri, tautan laporan di kanan
const footer = (link = "Laporan lengkap") => `<div class="mt-4 flex items-center justify-between border-t border-border pt-4">
  <select class="input h-9 w-auto py-0 text-sm" aria-label="Periode"><option>7 hari terakhir</option><option>30 hari terakhir</option><option>90 hari terakhir</option></select>
  <a href="#" class="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:underline">${link}${ic("caret-right", "h-3.5 w-3.5")}</a>
</div>`;

const stat = (label, value, d) => `<div class="rounded-xl bg-surface-muted p-3"><p class="text-xs text-fg-muted">${label}</p><p class="text-lg font-bold text-fg">${value}</p>${d || ""}</div>`;

export const examples = [
  {
    key: "line",
    name: "Line chart",
    note: "Garis halus untuk tren. Beberapa seri otomatis memakai warna token berurutan.",
    demo: card("Lamaran per bulan", "6 bulan terakhir", chart("line", {
      series: [{ name: "Lamaran", data: [4, 7, 5, 9, 12, 10] }, { name: "Diterima", data: [1, 2, 2, 3, 5, 4] }],
      categories: MONTHS, colors: ["primary", "secondary"], height: "260",
    })),
  },
  {
    key: "area",
    name: "Area chart",
    note: "Garis dengan isian gradasi lembut; cocok untuk satu seri berkelanjutan.",
    demo: card("Kunjungan lowongan", "Tren pengunjung", chart("area", {
      series: [{ name: "Kunjungan", data: [31, 40, 28, 51, 42, 62] }],
      categories: MONTHS, colors: ["primary"], height: "260", legend: "none",
    })),
  },
  {
    key: "column",
    name: "Column chart (stacked)",
    note: "Kolom bersudut membulat. Tambahkan <code>data-chart-stacked</code> untuk menumpuk seri.",
    demo: card("Pengisian kuesioner", "Per angkatan", chart("column", {
      series: [{ name: "Sudah", data: [12, 18, 15, 22] }, { name: "Belum", data: [8, 6, 9, 4] }],
      categories: ["2022", "2023", "2024", "2025"], colors: ["primary", "secondary"], height: "260", stacked: "true",
    })),
  },
  {
    key: "bar",
    name: "Bar chart (horizontal)",
    note: "Batang horizontal untuk peringkat. Format angka lewat <code>data-chart-format</code> (number, percent, rupiah, compact).",
    demo: card("Sebaran lokasi kerja", "Persentase alumni", chart("bar", {
      series: [{ name: "Alumni", data: [62, 48, 35, 20] }],
      categories: ["Jakarta", "Bandung", "Surabaya", "Medan"], colors: ["primary"], height: "240", legend: "none", format: "percent",
    })),
  },
  {
    key: "donut",
    name: "Donut chart",
    note: "Total ditampilkan di tengah; label lewat <code>data-chart-total-label</code>.",
    demo: card("Status lamaran", "Semua lamaran", chart("donut", {
      series: [2, 2, 2, 4, 5], categories: ["Terkirim", "Diproses", "Wawancara", "Diterima", "Ditolak"],
      colors: ["info", "warning", "primary", "success", "danger"], height: "300", "total-label": "Lamaran",
    })),
  },
  {
    key: "pie",
    name: "Pie chart",
    note: "Proporsi sederhana tanpa lubang di tengah.",
    demo: card("Status setelah lulus", "Hasil tracer study", chart("pie", {
      series: [42, 48, 10], categories: ["Bekerja", "Studi", "Mencari"], colors: ["success", "info", "warning"], height: "300",
    })),
  },
  {
    key: "radial",
    name: "Radial chart",
    note: "Capaian dalam cincin (0–100). Dengan lebih dari satu seri, tengahnya menampilkan rata-rata.",
    demo: card("Capaian respon", "Terhadap target", chart("radial", {
      series: [76, 64], categories: ["Respon", "Target"], colors: ["primary", "success"], height: "300",
    })),
  },
  {
    key: "sparkline",
    name: "Sparkline",
    note: "Grafik mini tanpa sumbu, legenda, atau grid — untuk dipasang di dalam kartu statistik.",
    demo: `<div class="card flex items-center justify-between gap-4 p-5">
  <div><p class="text-xs text-fg-muted">Pelamar baru</p><p class="text-2xl font-bold text-fg">1.284</p><span class="badge badge-success mt-1">+12%</span></div>
  <div class="w-40">${chart("sparkline", { series: [{ name: "Pelamar", data: [12, 18, 14, 22, 19, 28, 31] }], colors: ["success"], height: "64" })}</div>
</div>`,
  },

  /* ---- Layout kartu ---- */
  {
    key: "card-area",
    name: "Kartu area dengan ringkasan",
    note: "Layout kartu umum: nilai besar + persentase perubahan di atas, grafik area di tengah, pilihan periode dan tautan laporan di bawah.",
    demo: `<div class="card p-5">
  <div class="flex items-start justify-between">
    <div><p class="text-3xl font-bold text-fg">32,4 rb</p><p class="text-sm text-fg-muted">Pelamar minggu ini</p></div>
    ${delta("12%")}
  </div>
  ${chart("area", { series: [{ name: "Pelamar", data: [180, 220, 190, 280, 260, 340, 320] }], categories: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"], colors: ["primary"], height: "200", legend: "none" })}
  ${footer()}
</div>`,
  },
  {
    key: "card-stats",
    name: "Kartu dengan statistik ringkas",
    note: "Beberapa angka ringkas di atas grafik garis dua seri, dengan footer periode.",
    demo: `<div class="card p-5">
  <div class="mb-4 grid grid-cols-2 gap-3">
    ${stat("Lamaran", "1.284", delta("8,2%"))}
    ${stat("Diterima", "312", delta("2,1%", false))}
  </div>
  ${chart("line", { series: [{ name: "Lamaran", data: [4, 7, 5, 9, 12, 10] }, { name: "Diterima", data: [1, 2, 2, 3, 5, 4] }], categories: MONTHS, colors: ["primary", "secondary"], height: "220" })}
  ${footer("Lihat detail")}
</div>`,
  },
  {
    key: "card-column",
    name: "Kartu kolom dengan legenda",
    note: "Kolom bertumpuk dengan keterangan warna di header kartu, cocok untuk perbandingan dua kelompok.",
    demo: `<div class="card p-5">
  <div class="mb-1 flex items-center justify-between">
    <p class="text-lg font-bold text-fg">Pengisian kuesioner</p>
    <div class="flex items-center gap-3 text-xs text-fg-muted"><span class="inline-flex items-center gap-1.5"><span class="h-2.5 w-2.5 rounded-full bg-primary-600"></span>Sudah</span><span class="inline-flex items-center gap-1.5"><span class="h-2.5 w-2.5 rounded-full bg-secondary-500"></span>Belum</span></div>
  </div>
  <p class="mb-2 text-sm text-fg-muted">Per angkatan</p>
  ${chart("column", { series: [{ name: "Sudah", data: [12, 18, 15, 22] }, { name: "Belum", data: [8, 6, 9, 4] }], categories: ["2022", "2023", "2024", "2025"], colors: ["primary", "secondary"], height: "240", legend: "none", stacked: "true" })}
  ${footer()}
</div>`,
  },
  {
    key: "card-donut",
    name: "Kartu donut dengan rincian",
    note: "Donut dengan daftar rincian per kategori di bawahnya, lengkap dengan nilai dan titik warna.",
    demo: `<div class="card p-5">
  <p class="text-lg font-bold text-fg">Status lamaran</p>
  <p class="mb-2 text-sm text-fg-muted">Semua lowongan aktif</p>
  ${chart("donut", { series: [4, 5, 2], categories: ["Diterima", "Ditolak", "Diproses"], colors: ["success", "danger", "warning"], height: "260", legend: "none", "total-label": "Lamaran" })}
  <ul class="mt-2 divide-y divide-border text-sm">
    <li class="flex items-center justify-between py-2"><span class="inline-flex items-center gap-2"><span class="h-2.5 w-2.5 rounded-full bg-success-500"></span>Diterima</span><span class="font-semibold text-fg">4</span></li>
    <li class="flex items-center justify-between py-2"><span class="inline-flex items-center gap-2"><span class="h-2.5 w-2.5 rounded-full bg-danger-500"></span>Ditolak</span><span class="font-semibold text-fg">5</span></li>
    <li class="flex items-center justify-between py-2"><span class="inline-flex items-center gap-2"><span class="h-2.5 w-2.5 rounded-full bg-warning-500"></span>Diproses</span><span class="font-semibold text-fg">2</span></li>
  </ul>
  ${footer()}
</div>`,
  },
  {
    key: "card-bar",
    name: "Kartu bar dengan peringkat",
    note: "Batang horizontal untuk peringkat dengan judul dan tautan di footer.",
    demo: `<div class="card p-5">
  <div class="flex items-start justify-between"><div><p class="text-lg font-bold text-fg">Lokasi kerja alumni</p><p class="text-sm text-fg-muted">Empat kota teratas</p></div>${delta("4,5%")}</div>
  ${chart("bar", { series: [{ name: "Alumni", data: [62, 48, 35, 20] }], categories: ["Jakarta", "Bandung", "Surabaya", "Medan"], colors: ["primary"], height: "220", legend: "none", format: "percent" })}
  ${footer()}
</div>`,
  },
];

export const byKey = Object.fromEntries(examples.map((e) => [e.key, e]));
