/* Konfigurasi Landing Page portal: hasil "Pengaturan Landing Page" di admin KarirLink (templates/karirlink/pengaturan-landing-page.html).
   Dimuat SEBELUM portal.js. Mockup ini menyimpan konfigurasi di localStorage; di produksi ganti window.PK_LANDING.read/write dengan
   endpoint (GET/PUT /api/landing-page) tanpa mengubah bagian lain.

   Bentuk konfigurasi (semua opsional; kosong = bawaan portal, bagian tambahan disembunyikan):
     logo          URL/data-URL logo Career Center (navbar + footer)                     -> PK_CAMPUS.logo
     heroImage     URL/data-URL gambar latar hero (16:9)
     heroTitle     Judul hero (50-100 karakter)      heroDesc   Deskripsi hero (50-250 karakter)
     guideUrl      URL video YouTube Bimbingan Karir (watch / youtu.be / embed; disimpan apa adanya, diubah ke embed saat tampil)
     showTestimonials, showGuide  false = section Testimoni Alumni / Bimbingan Karir disembunyikan (kosong/true = tampil)
     testimonials  [{ id, name, position, company, program, year, comment, photo, companyLogo }]  maksimal 8
     phone, email  Kontak Career Center (footer)                                         -> PK_CAMPUS.phone / email
     address       Alamat Career Center (footer); string kosong = baris alamat disembunyikan   -> PK_CAMPUS.address
     instagram, facebook  username (tanpa @ atau URL)                                    -> PK_CAMPUS.social.*
     about         Deskripsi footer (50-250 karakter)                                    -> PK_CAMPUS.about
     footerLinks   [{ id, name, url }] maksimal 4, menggantikan kolom "Bantuan" di footer

   Dua kunci: PUBLISHED dipakai pengunjung; DRAFT hanya dipakai pratinjau (?landing=draft) di editor admin. */
(function () {
  var KEY_PUB = 'karirlink-landing-published', KEY_DRAFT = 'karirlink-landing-draft';
  var LIMITS = { title: [50, 100], desc: [50, 250], about: [50, 250], testimonials: 8, footerLinks: 4, linkName: 50, linkUrl: 150, social: 30, email: 64, phone: 15, imageBytes: 2 * 1024 * 1024 };

  function read(key) {
    try { var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : null; } catch (e) { return null; }
  }
  function write(key, cfg) {
    try { localStorage.setItem(key, JSON.stringify(cfg)); return true; } catch (e) { return false; } // false = penyimpanan penuh/ditolak
  }
  function remove(key) { try { localStorage.removeItem(key); } catch (e) {} }

  // Video YouTube dalam bentuk apa pun -> alamat embed; selain YouTube -> ''.
  function youtubeEmbed(u) {
    var m = String(u || '').trim().match(/^(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})(?:[?&#].*)?$/);
    return m ? 'https://www.youtube.com/embed/' + m[1] : '';
  }
  function safeUrl(u) { return /^https?:\/\//i.test(String(u || '').trim()) ? String(u).trim() : ''; }

  window.PK_LANDING = {
    KEY_PUB: KEY_PUB, KEY_DRAFT: KEY_DRAFT, LIMITS: LIMITS,
    readPublished: function () { return read(KEY_PUB); },
    readDraft: function () { return read(KEY_DRAFT); },
    writeDraft: function (cfg) { return write(KEY_DRAFT, cfg); },
    publish: function (cfg) { return write(KEY_PUB, cfg) && write(KEY_DRAFT, cfg); },
    reset: function () { remove(KEY_PUB); remove(KEY_DRAFT); },
    youtubeEmbed: youtubeEmbed, safeUrl: safeUrl
  };

  // Hanya portal yang menandai skrip ini dengan data-lp-apply; editor admin memuatnya sebagai pustaka saja.
  var self = document.currentScript;
  if (!self || !self.hasAttribute('data-lp-apply')) return;

  var cfg = read(new URLSearchParams(location.search).get('landing') === 'draft' ? KEY_DRAFT : KEY_PUB);
  if (!cfg) return;

  // 1) Sebelum portal.js: isi PK_CAMPUS supaya navbar dan footer bawaan portal memakai identitas Career Center.
  var ov = {}, social = {};
  if (cfg.logo) ov.logo = cfg.logo;
  if (cfg.about) ov.about = cfg.about;
  if (cfg.email) ov.email = cfg.email;
  if (typeof cfg.address === 'string') ov.address = cfg.address;
  if (cfg.phone) ov.phone = '+' + String(cfg.phone).replace(/[^0-9]/g, '');
  if (cfg.instagram) social.instagram = 'https://instagram.com/' + encodeURIComponent(cfg.instagram);
  if (cfg.facebook) social.facebook = 'https://facebook.com/' + encodeURIComponent(cfg.facebook);
  var prev = window.PK_CAMPUS || {};
  window.PK_CAMPUS = Object.assign({}, prev, ov, { social: Object.assign({}, prev.social, social) });

  // 2) Setelah portal.js dan skrip halaman berjalan: hero, Bimbingan Karier, Testimoni, dan tautan footer.
  document.addEventListener('DOMContentLoaded', function () {
    function $(id) { return document.getElementById(id); }
    function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
    function initials(n) { return String(n || '').split(' ').filter(Boolean).slice(0, 2).map(function (w) { return w.charAt(0); }).join('').toUpperCase(); }
    var C = (window.PK && window.PK.CAMPUS) || window.PK_CAMPUS || {};

    // Hero: judul/deskripsi/latar dari pengaturan. Nama kampus dan unit tetap tampil sebagai label di atas judul.
    var hero = document.querySelector('[data-nav-hero]');
    if (cfg.heroTitle && $('heroCampus')) {
      if ($('heroUnit')) $('heroUnit').textContent = [C.name, C.unit].filter(Boolean).join(' · ');
      var len = cfg.heroTitle.length;
      $('heroCampus').textContent = cfg.heroTitle;
      $('heroCampus').className = 'mt-3 text-balance font-display font-bold leading-tight tracking-tight ' + (len <= 60 ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-2xl sm:text-3xl lg:text-4xl');
    }
    if (cfg.heroDesc && $('heroDesc')) $('heroDesc').textContent = cfg.heroDesc;
    if (cfg.heroImage && hero) {
      hero.style.backgroundImage = 'linear-gradient(135deg, rgba(14,42,118,.88), rgba(35,97,231,.72)), url("' + String(cfg.heroImage).replace(/"/g, '%22') + '")';
      hero.style.backgroundSize = 'cover';
      hero.style.backgroundPosition = 'center';
    }

    // Bimbingan Karier: tampil bila URL YouTube valid.
    var embed = cfg.showGuide === false ? '' : youtubeEmbed(cfg.guideUrl);
    if (embed && $('lpBimbingan')) {
      var vid = embed.split('/').pop();
      $('lpGuidePoster').src = 'https://i.ytimg.com/vi/' + vid + '/hqdefault.jpg';
      $('lpGuidePoster').addEventListener('error', function () { this.remove(); }); // tanpa poster: latar gradien merek
      $('lpGuidePlay').addEventListener('click', function () {
        var f = document.createElement('iframe');
        f.src = embed + '?autoplay=1&rel=0'; f.title = 'Video bimbingan karier'; f.className = 'absolute inset-0 h-full w-full';
        f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'; f.allowFullscreen = true;
        $('lpGuideBox').replaceChildren(f);
      });
      $('lpBimbingan').hidden = false;
    }

    // Testimoni Alumni
    var T = cfg.showTestimonials === false ? [] : (cfg.testimonials || []).slice(0, LIMITS.testimonials);
    if (T.length && $('lpTestimoni')) {
      $('lpTestimoniGrid').innerHTML = T.map(function (t) {
        var photo = t.photo ? '<img src="' + esc(t.photo) + '" alt="" class="absolute inset-0 h-full w-full object-cover" />' : '';
        var logo = t.companyLogo ? '<img src="' + esc(t.companyLogo) + '" alt="' + esc(t.company) + '" class="h-6 w-auto max-w-[6rem] object-contain" />' : '<span class="text-xs font-semibold text-fg-muted">' + esc(t.company) + '</span>';
        return '<figure class="card flex h-full flex-col p-5 sm:p-6">' +
          '<blockquote class="flex-1 text-sm leading-relaxed text-fg-muted">&ldquo;' + esc(t.comment) + '&rdquo;</blockquote>' +
          '<figcaption class="mt-5 flex items-center gap-3 border-t border-border pt-4">' +
            '<span class="avatar avatar-square relative h-11 w-11 shrink-0 overflow-hidden bg-primary-50 text-sm font-bold text-primary-700">' + esc(initials(t.name)) + photo + '</span>' +
            '<span class="min-w-0 flex-1"><span class="block truncate text-sm font-semibold text-fg">' + esc(t.name) + '</span>' +
            '<span class="block truncate text-xs text-fg-muted">' + esc(t.position) + ' di ' + esc(t.company) + '</span>' +
            '<span class="block truncate text-xs text-fg-subtle">' + esc(t.program) + ' · Lulus ' + esc(t.year) + '</span></span>' + logo +
          '</figcaption></figure>';
      }).join('');
      $('lpTestimoni').hidden = false;
    }

    // Footer: "Link Terkait" menggantikan isi kolom Bantuan (kolom ketiga).
    var links = (cfg.footerLinks || []).filter(function (l) { return l && l.name && safeUrl(l.url); }).slice(0, LIMITS.footerLinks);
    var col = document.querySelectorAll('[data-footer-col]')[2];
    if (links.length && col) {
      var head = col.querySelector('.footer-heading'); if (head) head.textContent = 'Tautan Terkait';
      var ul = col.querySelector('ul');
      if (ul) ul.innerHTML = links.map(function (l) { return '<li><a href="' + esc(safeUrl(l.url)) + '" target="_blank" rel="noopener" class="footer-link inline-block py-1">' + esc(l.name) + '</a></li>'; }).join('');
    }
  });
})();
