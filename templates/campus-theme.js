/* Tema warna kampus (white-label per universitas). Dimuat SINKRON di <head> semua halaman KarirLink (admin) dan Portal Karir, tepat setelah
   dist/output.css, supaya warna kampus terpasang sebelum halaman digambar.

   Sumber: konfigurasi landing page yang sudah DIPUBLIKASIKAN di Personalisasi Portal (primaryColor, secondaryColor); tombol "Lihat Landing Page" di editor memakai
   draf lewat ?landing=draft. Satu warna dasar dibuat menjadi skala 50-950 yang menimpa token --color-primary-* / --color-secondary-* pada <html>,
   jadi semua komponen KarirKit ikut berganti tanpa kelas atau gaya baru. Kosong = warna bawaan KarirLink.

   Mockup: konfigurasi tinggal di localStorage (satu kampus: Universitas Foxtrot). Di produksi, ganti read() dengan konfigurasi tenant dari domain
   kampus (GET /api/landing-page); universitas yang tidak mengisi warna tetap memakai warna KarirLink. */
(function () {
  var KEY_PUB = 'karirlink-landing-published', KEY_DRAFT = 'karirlink-landing-draft';
  var FAMILIES = ['primary', 'secondary'], STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  var PRESETS = [
    { key: 'zamrud', name: 'Zamrud', primary: '#0b7a55', secondary: '#f59e0b' },
    { key: 'marun', name: 'Marun', primary: '#a61e3a', secondary: '#d97706' },
    { key: 'ungu', name: 'Ungu', primary: '#6d3fd1', secondary: '#f59e0b' },
    { key: 'teal', name: 'Teal', primary: '#0e7490', secondary: '#f67e28' },
    { key: 'navy', name: 'Navy', primary: '#1e3a8a', secondary: '#f59e0b' }
  ];
  // Pencampuran dengan putih (w) atau hitam (k); warna dasar menjadi tingkat 600, seperti token KarirKit.
  var MIX = { 50: ['w', 0.93], 100: ['w', 0.86], 200: ['w', 0.72], 300: ['w', 0.54], 400: ['w', 0.3], 500: ['w', 0.12], 600: null, 700: ['k', 0.2], 800: ['k', 0.38], 900: ['k', 0.54], 950: ['k', 0.72] };
  var MIN_CONTRAST = 4.5; // warna utama dengan teks putih (tombol primer)

  function hex6(h) {
    h = String(h || '').trim().replace(/^#/, '');
    if (/^[0-9a-f]{3}$/i.test(h)) h = h.split('').map(function (c) { return c + c; }).join('');
    return /^[0-9a-f]{6}$/i.test(h) ? '#' + h.toLowerCase() : '';
  }
  function rgbOf(h) { return [1, 3, 5].map(function (i) { return parseInt(h.slice(i, i + 2), 16); }); }
  function hexOf(c) { return '#' + c.map(function (v) { return ('0' + Math.round(v).toString(16)).slice(-2); }).join(''); }
  function mixHex(h, to, t) { var c = rgbOf(h); return hexOf(c.map(function (v, i) { return v + (to[i] - v) * t; })); }
  function scale(h) {
    h = hex6(h); if (!h) return null;
    var out = {};
    STEPS.forEach(function (k) {
      var m = MIX[k];
      out[k] = !m ? h : mixHex(h, m[0] === 'w' ? [255, 255, 255] : [0, 0, 0], m[1]);
    });
    return out;
  }
  // Rasio kontras warna terhadap putih (WCAG).
  function contrast(h) {
    h = hex6(h); if (!h) return 0;
    var l = rgbOf(h).map(function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 1.05 / (0.2126 * l[0] + 0.7152 * l[1] + 0.0722 * l[2] + 0.05);
  }
  function clear(el) {
    FAMILIES.forEach(function (f) { STEPS.forEach(function (k) { el.style.removeProperty('--color-' + f + '-' + k); }); });
    el.style.removeProperty('--color-brand-soft-mid');
  }
  // Menimpa token warna pada satu elemen (halaman: <html>; contoh di editor: kotak pratinjau).
  function apply(el, primary, secondary) {
    var p = scale(primary), s = scale(secondary);
    if (p) {
      STEPS.forEach(function (k) { el.style.setProperty('--color-primary-' + k, p[k]); });
      el.style.setProperty('--color-brand-soft-mid', mixHex(p[50], [255, 255, 255], 0.5));
    }
    if (s) STEPS.forEach(function (k) { el.style.setProperty('--color-secondary-' + k, s[k]); });
  }
  function read() {
    var key = new URLSearchParams(location.search).get('landing') === 'draft' ? KEY_DRAFT : KEY_PUB;
    try { return JSON.parse(localStorage.getItem(key) || 'null') || {}; } catch (e) { return {}; }
  }
  // Pasang ulang dari konfigurasi terbaru (dipanggil editor setelah Publish / Atur Ulang).
  function refresh() {
    var root = document.documentElement, cfg = read(), p = hex6(cfg.primaryColor);
    clear(root);
    api.active = !!p;
    if (p) apply(root, p, hex6(cfg.secondaryColor));
  }

  var api = { active: false, PRESETS: PRESETS, MIN_CONTRAST: MIN_CONTRAST, hex6: hex6, scale: scale, contrast: contrast, apply: apply, clear: clear, refresh: refresh };
  window.CampusTheme = api;
  refresh();
})();
