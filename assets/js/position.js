/* ============================================================================
   KarirKit — Position (dependency-free)

   Menjaga elemen berlapis tetap di dalam layar tanpa diatur manual di tiap halaman: menu Dropdown (.dropdown-menu),
   menu Combo (.combo-menu), menu WYSIWYG (.wysiwyg-menu), Tooltip (.tooltip-content), dan elemen apa pun yang diberi
   data-kk-position. Datepicker memakai penempatan fixed sendiri, jadi tidak diatur di sini.

   Aturan (dijalankan setiap kali elemen terbuka, jendela diubah ukurannya, atau halaman digulir):
   1. Flip   — bila sisi pilihan (bawah/atas, kanan/kiri) tidak muat dan sisi seberang lebih lega, elemen pindah ke sisi seberang.
   2. Shift  — bila masih melewati tepi layar, elemen digeser (mendatar; menegak untuk penempatan di samping) sampai muat.
   Jarak aman dari tepi layar 8 px. Elemen yang lebih lebar dari layar menempel di tepi kiri.

   Pasang:   <script src="assets/js/position.js"></script>   (tanpa atribut tambahan pada markup yang sudah ada)
   Opt-out:  data-kk-position="off" pada elemennya
   Elemen lain: data-kk-position pada elemen absolut yang berinduk posisi (relative) = ikut diatur
   API:      KKPosition.refresh()   hitung ulang semua elemen (mis. setelah mengubah isi menu)
   Cara kerja: hanya mengubah gaya inline top/bottom/margin pada elemen itu, dan membersihkannya saat elemen tertutup,
   sehingga tidak bentrok dengan transform atau animasi komponen.
   ============================================================================ */
(function () {
  'use strict';

  var PAD = 8, GAP = 6;
  var SEL = '.dropdown-menu, .combo-menu, .wysiwyg-menu, .tooltip-content, [data-kk-position]';
  var PROPS = ['top', 'bottom', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'left', 'right'];

  function rendered(el) { return el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden'; }
  function clear(el) {
    if (!el.__kkFit) return;
    PROPS.forEach(function (p) { el.style[p] = ''; });
    el.__kkFit = false;
  }

  function fit(el) {
    if (el.getAttribute('data-kk-position') === 'off') return;
    clear(el);
    var parent = el.offsetParent;
    var vw = document.documentElement.clientWidth, vh = window.innerHeight;
    var r = el.getBoundingClientRect(), touched = false;
    var anchor = parent && parent !== document.body && parent !== document.documentElement ? parent.getBoundingClientRect() : null;

    if (anchor) {
      var eps = 1.5, below = r.top >= anchor.bottom - eps, above = r.bottom <= anchor.top + eps;
      var rightSide = r.left >= anchor.right - eps, leftSide = r.right <= anchor.left + eps;
      if (below && r.bottom > vh - PAD && (anchor.top - PAD >= r.height || anchor.top > vh - anchor.bottom)) {
        el.style.top = 'auto'; el.style.bottom = 'calc(100% + ' + GAP + 'px)'; el.style.marginTop = '0'; el.style.marginBottom = '0'; touched = true;
      } else if (above && r.top < PAD && (vh - anchor.bottom - PAD >= r.height || vh - anchor.bottom > anchor.top)) {
        el.style.bottom = 'auto'; el.style.top = 'calc(100% + ' + GAP + 'px)'; el.style.marginTop = '0'; el.style.marginBottom = '0'; touched = true;
      } else if (rightSide && r.right > vw - PAD && (anchor.left - PAD >= r.width || anchor.left > vw - anchor.right)) {
        el.style.left = 'auto'; el.style.right = 'calc(100% + ' + GAP + 'px)'; touched = true;
      } else if (leftSide && r.left < PAD && (vw - anchor.right - PAD >= r.width || vw - anchor.right > anchor.left)) {
        el.style.right = 'auto'; el.style.left = 'calc(100% + ' + GAP + 'px)'; touched = true;
      }
      if (touched) r = el.getBoundingClientRect();
    }

    var dx = 0, dy = 0;
    if (r.width > vw - 2 * PAD || r.left < PAD) dx = PAD - r.left;
    else if (r.right > vw - PAD) dx = vw - PAD - r.right;
    var sideways = anchor && (r.left >= anchor.right - 1.5 || r.right <= anchor.left + 1.5);
    if (sideways || !anchor) {
      if (r.top < PAD) dy = PAD - r.top; else if (r.bottom > vh - PAD) dy = vh - PAD - r.bottom;
    }
    if (dx) { el.style.marginLeft = dx + 'px'; el.style.marginRight = -dx + 'px'; touched = true; }
    if (dy) { el.style.marginTop = dy + 'px'; el.style.marginBottom = -dy + 'px'; touched = true; }
    if (touched) el.__kkFit = true;
  }

  function run() {
    pending = false;
    document.querySelectorAll(SEL).forEach(function (el) { if (rendered(el)) fit(el); else clear(el); });
  }
  var pending = false;
  function schedule() {
    if (pending) return;
    pending = true;
    window.requestAnimationFrame(run);
  }

  function start() {
    new MutationObserver(schedule).observe(document.documentElement, {
      subtree: true, childList: true, attributes: true, attributeFilter: ['class', 'hidden', 'aria-expanded', 'data-open', 'data-placement', 'open']
    });
    window.addEventListener('resize', schedule);
    window.addEventListener('scroll', schedule, { capture: true, passive: true });
    ['mouseover', 'focusin', 'transitionend'].forEach(function (ev) { document.addEventListener(ev, schedule, true); });
    schedule();
  }

  window.KKPosition = { refresh: run };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
