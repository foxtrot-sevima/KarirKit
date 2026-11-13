/* Navbar, drawer menu, dan footer landing page publik KarirLink. Dipasang ke elemen [data-shell="nav|footer"].
   Hanya merakit komponen KarirKit (Drawer, Button, Footer); tidak ada gaya atau logika komponen baru.
   Menu "Fitur", "Lowongan", "Cara Bergabung", dan "FAQ" menaut ke bagian di halaman beranda. */
(function () {
  'use strict';

  var LINKS = [
    { href: 'index.html', label: 'Beranda', icon: 'house', key: 'home' },
    { href: 'index.html#fitur', label: 'Fitur', icon: 'sparkle', key: 'fitur' },
    { href: 'index.html#lowongan', label: 'Lowongan', icon: 'briefcase', key: 'lowongan' },
    { href: 'index.html#cara-bergabung', label: 'Cara Bergabung', icon: 'user-plus', key: 'cara-bergabung' },
    { href: 'index.html#tips', label: 'Tips & Trik', icon: 'newspaper', key: 'tips' },
    { href: 'index.html#faq', label: 'FAQ', icon: 'chats', key: 'faq' }
  ]; // urutan menu = urutan bagian di halaman (key = id bagian, dipakai penanda menu aktif)
  var JOIN_URL = 'https://portal.karirlink.id';
  var LOGO = '../../assets/logo/karirlink-sevima.svg';

  // Warna mengikuti navbar Portal Karir: kapsul kaca di atas halaman, putih setelah digulir (teks gelap karena hero landing terang).
  var LINK_CLS = 'whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium xl:px-4 text-slate-600 outline-none transition-colors hover:bg-white hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-primary-500 aria-[current=page]:bg-primary-50 aria-[current=page]:text-primary-700 group-data-[scrolled=true]:hover:bg-slate-100';

  function nav(page) {
    var links = LINKS.map(function (l) {
      return '<a href="' + l.href + '" data-spy="' + l.key + '" class="' + LINK_CLS + '"' + (l.key === page ? ' aria-current="page"' : '') + '>' + l.label + '</a>';
    }).join('\n        ');
    var drawerLinks = LINKS.map(function (l) {
      return '<a href="' + l.href + '" data-drawer-hide="lpDrawer" class="flex min-h-11 items-center gap-3 rounded-control px-3 py-3 text-sm font-semibold text-fg hover:bg-neutral-50"><i class="kk kk-' + l.icon + ' h-5 w-5" aria-hidden="true"></i>' + l.label + '</a>';
    }).join('\n      ');
    return '<header data-shell-header class="sticky top-0 z-30 h-[4.5rem]">\n' +
      '  <nav class="mx-auto w-full max-w-7xl px-3 pt-3 sm:px-6" aria-label="Navigasi utama">\n' +
      '    <div data-glass-nav class="group relative mx-auto flex w-full max-w-7xl items-center justify-between gap-3 rounded-full py-1 pl-3 pr-1 ring-1 ring-transparent transition-[max-width,background-color,box-shadow,padding] duration-500 ease-out motion-reduce:transition-none data-[scrolled=true]:max-w-[58rem] data-[scrolled=true]:bg-white/95 data-[scrolled=true]:py-1.5 data-[scrolled=true]:pl-5 data-[scrolled=true]:pr-1.5 data-[scrolled=true]:shadow-xl data-[scrolled=true]:shadow-primary-950/15 data-[scrolled=true]:ring-black/5">\n' +
      '      <a href="index.html" class="flex shrink-0 items-center" aria-label="KarirLink, ke beranda"><img src="' + LOGO + '" alt="KarirLink SEVIMA" class="h-8 w-auto sm:h-9 group-data-[scrolled=true]:h-7" /></a>\n' +
      '      <div class="mx-auto hidden items-center gap-1 rounded-full bg-white/60 p-1 ring-1 ring-white/80 backdrop-blur-md transition-[background-color,box-shadow] duration-500 group-data-[scrolled=true]:bg-transparent group-data-[scrolled=true]:p-0 group-data-[scrolled=true]:ring-transparent group-data-[scrolled=true]:backdrop-blur-none lg:flex">\n        ' + links + '\n      </div>\n' +
      '      <div class="flex shrink-0 items-center gap-1 rounded-full bg-white/60 p-0.5 ring-1 ring-white/80 backdrop-blur-md transition-[background-color,box-shadow] duration-500 group-data-[scrolled=true]:bg-transparent group-data-[scrolled=true]:ring-transparent group-data-[scrolled=true]:backdrop-blur-none sm:gap-1.5">\n' +
      '        <a href="' + JOIN_URL + '" class="btn-primary btn-md hidden !rounded-full sm:inline-flex">Gabung Sekarang</a>\n' +
      '        <button type="button" class="flex h-11 w-11 items-center justify-center rounded-full text-slate-700 outline-none transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-primary-500 group-data-[scrolled=true]:hover:bg-slate-100 lg:hidden" data-drawer-toggle="lpDrawer" aria-controls="lpDrawer" aria-label="Buka menu"><i class="kk kk-list h-5 w-5" aria-hidden="true"></i></button>\n' +
      '      </div>\n    </div>\n  </nav>\n</header>\n\n' +
      '<!-- Menu perangkat kecil: Drawer samping KarirKit -->\n' +
      '<div class="drawer drawer-left" id="lpDrawer" aria-label="Menu utama">\n' +
      '  <div class="drawer-header">\n    <a href="index.html" class="drawer-title flex items-center"><img src="' + LOGO + '" alt="KarirLink SEVIMA" class="h-8 w-auto" /></a>\n    <button type="button" class="drawer-close" data-drawer-hide="lpDrawer" aria-label="Tutup menu"><i class="kk kk-x h-5 w-5"></i></button>\n  </div>\n' +
      '  <div class="drawer-body !p-3"><nav aria-label="Menu mobile" class="space-y-1">\n      ' + drawerLinks + '\n    </nav></div>\n' +
      '  <div class="drawer-footer !p-3"><a href="' + JOIN_URL + '" class="btn-primary btn-lg w-full">Gabung Sekarang</a></div>\n' +
      '</div>';
  }

  function col(title, items) {
    return '<details class="group border-b border-border py-3 md:border-0 md:py-0" data-footer-col>\n' +
      '  <summary class="flex min-h-11 cursor-pointer list-none items-center justify-between md:pointer-events-none md:min-h-0 md:cursor-default"><span class="footer-heading !mb-0 md:!mb-5">' + title + '</span><i class="kk kk-caret-down h-4 w-4 text-fg-subtle transition-transform group-open:rotate-180 md:hidden" aria-hidden="true"></i></summary>\n' +
      '  <ul class="footer-list !space-y-1 mt-3 text-sm md:mt-0">' + items.map(function (i) {
        return '<li><a href="' + i[1] + '"' + (/^https?:/.test(i[1]) ? ' target="_blank" rel="noopener noreferrer"' : '') + ' class="footer-link inline-block py-1">' + i[0] + '</a></li>';
      }).join('') + '</ul>\n</details>';
  }

  function footer() {
    return '<footer class="footer border-t border-border">\n' +
      '  <div class="footer-inner !max-w-7xl !px-4 !py-12 sm:!px-6">\n    <div class="grid grid-cols-1 gap-10 lg:grid-cols-12">\n' +
      '      <div class="lg:col-span-4">\n        <a href="index.html" class="inline-flex" aria-label="KarirLink, ke beranda"><img src="' + LOGO + '" alt="KarirLink SEVIMA" class="h-10 w-auto" /></a>\n' +
      '        <p class="mt-4 max-w-sm text-sm leading-relaxed text-fg-muted">KarirLink adalah platform yang memenuhi kebutuhan mahasiswa dalam mencari pekerjaan dan perusahaan dalam menemukan kandidat terbaik sesuai kualifikasi.</p>\n' +
      '        <ul class="mt-6 space-y-3 text-sm text-fg-muted">\n' +
      '          <li class="flex gap-3"><i class="kk kk-map-pin mt-0.5 h-5 w-5 shrink-0 text-primary-600" aria-hidden="true"></i><span><span class="block font-semibold text-fg">SEVIMA Office</span>Jl. Medokan Asri Tengah, MA 2 Q-16, Surabaya, Jawa Timur, Indonesia</span></li>\n' +
      '          <li class="flex items-center gap-3"><i class="kk kk-envelope h-5 w-5 shrink-0 text-primary-600" aria-hidden="true"></i><a href="mailto:marketing@sevima.co.id" class="hover:text-primary-700">marketing@sevima.co.id</a></li>\n' +
      '          <li class="flex items-center gap-3"><i class="kk kk-phone h-5 w-5 shrink-0 text-primary-600" aria-hidden="true"></i><a href="tel:+6282261610404" class="hover:text-primary-700">+62 822-6161-0404</a></li>\n' +
      '        </ul>\n      </div>\n' +
      '      <div class="lg:col-span-8"><div class="grid grid-cols-1 md:grid-cols-3 md:gap-8">\n' +
      col('KarirLink', [['Fitur', 'index.html#fitur'], ['Lowongan Kerja', 'index.html#lowongan'], ['Tips & Trik', 'index.html#tips'], ['Cara Bergabung', 'index.html#cara-bergabung'], ['FAQ', 'index.html#faq']]) + '\n' +
      col('Produk SEVIMA', [['siAkad Cloud', 'https://siakadcloud.com/'], ['GOFeeder Cloud', 'https://gofeedercloud.com/'], ['Akreditasi Cloud', 'https://akreditasicloud.com/'], ['Profeeder', 'https://profeeder.id/'], ['SevimaPay', 'https://sevimapay.com/'], ['EdLink', 'https://edlink.id/']]) + '\n' +
      col('Perusahaan', [['SEVIMA', 'https://sevima.com/'], ['Tentang SEVIMA', 'https://sevima.com/tentang-sevima/'], ['Karir', 'https://sevima.com/karir/'], ['Berita', 'https://sevima.com/artikel-blog/'], ['Kebijakan Privasi', '#'], ['Syarat & Ketentuan', '#']]) + '\n' +
      '      </div></div>\n    </div>\n' +
      '    <div class="footer-divider"></div>\n' +
      '    <p class="text-center text-xs text-fg-muted">&copy; 2026 SEVIMA. Hak cipta dilindungi.</p>\n' +
      '  </div>\n</footer>';
  }

  // Navbar lebar di atas halaman, mengecil menjadi kapsul setelah digulir (sama seperti Portal Karir).
  function initGlass() {
    var bar = document.querySelector('[data-glass-nav]');
    if (!bar) return;
    var last;
    function apply() {
      var v = String(window.scrollY > 8);
      if (v !== last) { last = v; bar.setAttribute('data-scrolled', v); }
    }
    apply();
    window.addEventListener('scroll', apply, { passive: true });
  }

  // Penanda menu aktif ikut berpindah mengikuti bagian yang sedang dibaca. Di atas bagian pertama = "Beranda".
  function initSpy() {
    var links = document.querySelectorAll('[data-spy]');
    if (!links.length) return;
    var items = [];
    links.forEach(function (a) {
      var key = a.getAttribute('data-spy');
      items.push({ a: a, key: key, el: key === 'home' ? null : document.getElementById(key) });
    });
    var current;
    function update() {
      var line = window.innerHeight * 0.35, active = 'home';
      items.forEach(function (it) { if (it.el && it.el.getBoundingClientRect().top <= line) active = it.key; });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) active = items[items.length - 1].key; // mentok di bawah = menu terakhir
      if (active === current) return;
      current = active;
      items.forEach(function (it) { if (it.key === active) it.a.setAttribute('aria-current', 'page'); else it.a.removeAttribute('aria-current'); });
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  // Animasi masuk saat digulir: elemen [data-reveal] memudar naik satu kali. Tanpa JS atau saat gerakan dikurangi, konten langsung tampil.
  function initReveal() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!els.length || !('IntersectionObserver' in window) || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.remove('opacity-0', 'translate-y-8');
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el, i) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) return; // sudah terlihat saat dimuat: jangan disembunyikan
      el.classList.add('opacity-0', 'translate-y-8', 'transition-[opacity,transform]', 'duration-700', 'ease-out');
      el.style.transitionDelay = (i % 4) * 80 + 'ms';
      io.observe(el);
    });
  }

  function mount() {
    var n = document.querySelector('[data-shell="nav"]'), f = document.querySelector('[data-shell="footer"]');
    if (n) { n.outerHTML = nav(n.getAttribute('data-page')); initGlass(); }
    if (f) f.outerHTML = footer();
  }
  // Dipanggil langsung (skrip dimuat di akhir <body>, sebelum ui.js/drawer.js) supaya Drawer ikut terpasang.
  mount();
  initSpy();
  initReveal();
})();
