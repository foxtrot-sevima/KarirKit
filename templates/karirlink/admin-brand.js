/* Merek Career Center di panel admin KarirLink (white-label), tata letaknya sama dengan templates/custom/index.html:
   avatar logo kampus (48px, 40px saat sidebar dilipat) + "Karirlink" kecil di atas nama kampus (tebal, maks. 2 baris; 13px bila membungkus).
   Logo ditampilkan utuh (object-contain) di atas latar putih; bila gambar gagal dimuat yang tampil dua inisial kampus.

   Sumber logo: "Logo Career Center" yang sudah DIPUBLIKASIKAN di Pengaturan Landing Page (templates/portal-karir/landing.js).
   Tanpa logo terpublikasi, logo KarirLink bawaan tidak diubah. apply() aman dipanggil ulang (setelah Publish atau Atur Ulang).
   Mockup: nama kampus tetap; di produksi diambil dari sesi admin. */
(function () {
  var CAMPUS_NAME = 'Universitas Foxtrot';
  var KEY_PUB = 'karirlink-landing-published';

  function logo() {
    try { var c = JSON.parse(localStorage.getItem(KEY_PUB) || 'null'); return (c && c.logo) || ''; } catch (e) { return ''; }
  }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function initials(n) { return n.split(' ').filter(Boolean).slice(0, 2).map(function (w) { return w.charAt(0); }).join('').toUpperCase(); }

  // avatar persegi: inisial di bawah, logo di atasnya (inisial tetap terlihat bila gambar gagal dimuat)
  function avatar(src, size) {
    var big = size === 48;
    return '<span class="avatar avatar-square relative ' + (big ? 'h-12 w-12 text-base' : 'h-10 w-10 text-sm') + ' shrink-0 overflow-hidden border border-slate-200 font-bold" aria-hidden="true">' + esc(initials(CAMPUS_NAME)) +
      '<img src="' + esc(src) + '" alt="" class="absolute inset-0 h-full w-full bg-white object-contain p-1" onerror="this.remove()" /></span>';
  }
  function full(src) {
    return avatar(src, 48) +
      '<span class="flex min-w-0 flex-col justify-center gap-1"><span class="text-xs font-bold leading-none"><span class="text-[#22489E]">Karir</span><span class="text-[#F05925]">link</span></span>' +
      '<span class="line-clamp-2 text-balance text-sm font-bold leading-[1.2] text-slate-900" data-campus-name>' + esc(CAMPUS_NAME) + '</span></span>';
  }

  // nama 1 baris = 14px; bila membungkus jadi 2 baris, dikecilkan ke 13px agar tetap sejajar dengan avatar
  function fitNames() {
    document.querySelectorAll('[data-campus-name]').forEach(function (el) {
      el.classList.remove('text-[13px]');
      var lh = parseFloat(getComputedStyle(el).lineHeight) || 17;
      if (el.scrollHeight > lh * 1.5) el.classList.add('text-[13px]');
    });
  }

  function apply() {
    var src = logo();
    [['.sidebar-logo-full', 'full'], ['.sidebar-logo-mark', 'mark'], ['.drawer-title', 'full']].forEach(function (t) {
      document.querySelectorAll(t[0]).forEach(function (el) {
        if (el.dataset.brandHtml === undefined) { el.dataset.brandHtml = el.innerHTML; el.dataset.brandClass = el.className; } // bawaan, untuk dipulihkan
        if (!src) { el.innerHTML = el.dataset.brandHtml; el.className = el.dataset.brandClass; el.removeAttribute('title'); return; }
        el.className = el.dataset.brandClass + (t[1] === 'full' ? ' min-w-0 gap-3' : '');
        el.innerHTML = t[1] === 'full' ? full(src) : avatar(src, 40);
        el.setAttribute('title', CAMPUS_NAME);
      });
    });
    fitNames();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitNames);
  }

  window.KarirAdminBrand = { apply: apply };
  window.addEventListener('resize', fitNames);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply); else apply();
  // lebar sidebar berubah saat dilipat/dibuka: ukur ulang setelah transisinya selesai
  document.addEventListener('click', function (e) { if (e.target.closest('#collapseSidebarBtn')) setTimeout(fitNames, 350); });
})();
