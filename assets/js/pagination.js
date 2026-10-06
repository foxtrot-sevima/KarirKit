/* ============================================================================
   KarirKit — Pagination behaviour (dependency-free)

   Markup:   <div data-pagination data-pagination-total="12" data-pagination-page="4"> ... </div>
   Bagian di dalam root (semuanya opsional, boleh dipakai sebagian):
     [data-pagination-list]                         <ul class="pagination">: diisi tombol halaman, Sebelumnya/Berikutnya, dan elipsis
     [data-pagination-prev] / [data-pagination-next]  tombol di mana saja di dalam root; otomatis nonaktif di halaman pertama/terakhir
     [data-pagination-jump]                         <form> dengan <input>: submit = lompat ke halaman itu (di luar rentang dijepit; form dibuat novalidate)
     [data-pagination-select]                       <select>: pilih halaman (opsi 1..N dibuat bila select kosong)
     [data-pagination-text="info|page|total|range"] teks yang diperbarui otomatis:
                                                      info  = "Menampilkan 1 sampai 10 dari 100 data" (atau "Halaman 1 dari 10" tanpa size/count)
                                                      page  = nomor halaman aktif, total = jumlah halaman, range = "1–10"
   Atribut root:
     data-pagination-total     jumlah halaman (default 1)         data-pagination-page      halaman aktif (default 1)
     data-pagination-siblings  halaman di kiri/kanan aktif (1)    data-pagination-boundary  halaman di ujung kiri/kanan (1)
     data-pagination-nav       isi tombol Sebelumnya/Berikutnya di dalam list: text (default) | icon | both | none
     data-pagination-size      data per halaman  } untuk teks info & range
     data-pagination-count     jumlah seluruh data }   data-pagination-label  kata benda di teks info (default "data")
   Event:    pagination:change (bubble dari root) detail { page, total }
   API:      KKPagination.init(root?), KKPagination.get(el) -> { page, total, goTo(n), next(), prev(), setTotal(n) }
   Dokumen ini hanya mengatur tampilan dan keadaan halaman; memuat data untuk halaman baru adalah tugas aplikasi (dengarkan pagination:change).
   ============================================================================ */
(function () {
  'use strict';

  var TEXT = { prev: 'Sebelumnya', next: 'Berikutnya', page: 'Halaman' };
  var ICON_PREV = '<i class="kk kk-caret-left h-4 w-4"></i>';
  var ICON_NEXT = '<i class="kk kk-caret-right h-4 w-4"></i>';

  function toInt(v, d) { var n = parseInt(v, 10); return isNaN(n) ? d : n; }
  function clamp(n, lo, hi) { return Math.min(hi, Math.max(lo, n)); }
  function range(a, b) { var out = []; for (var i = a; i <= b; i++) out.push(i); return out; }

  /* Nomor halaman yang ditampilkan; 'gap' = elipsis. Lebar daftar tetap konstan saat halaman banyak, dan elipsis
     tidak pernah menggantikan satu halaman saja (halaman itu ditampilkan). */
  function items(page, total, siblings, boundary) {
    var start = range(1, Math.min(boundary, total));
    var end = range(Math.max(total - boundary + 1, boundary + 1), total);
    var sibStart = Math.max(Math.min(page - siblings, total - boundary - siblings * 2 - 1), boundary + 2);
    var sibEnd = Math.min(Math.max(page + siblings, boundary + siblings * 2 + 2), end.length > 0 ? end[0] - 2 : total - 1);
    var out = start.slice();
    if (sibStart > boundary + 2) out.push('gap');
    else if (boundary + 1 < total - boundary) out.push(boundary + 1);
    out = out.concat(range(sibStart, sibEnd));
    if (sibEnd < total - boundary - 1) out.push('gap');
    else if (total - boundary > boundary) out.push(total - boundary);
    return out.concat(end);
  }

  function Pagination(root) {
    var o = {
      total: Math.max(1, toInt(root.getAttribute('data-pagination-total'), 1)),
      siblings: Math.max(0, toInt(root.getAttribute('data-pagination-siblings'), 1)),
      boundary: Math.max(1, toInt(root.getAttribute('data-pagination-boundary'), 1)),
      nav: root.getAttribute('data-pagination-nav') || 'text',
      size: toInt(root.getAttribute('data-pagination-size'), 0),
      count: toInt(root.getAttribute('data-pagination-count'), 0),
      label: root.getAttribute('data-pagination-label') || 'data'
    };
    var page = clamp(toInt(root.getAttribute('data-pagination-page'), 1), 1, o.total);
    var list = root.querySelector('[data-pagination-list]');
    var select = root.querySelector('[data-pagination-select]');
    var selectOwned = !!select && !select.options.length; // opsi dibuat di sini, jadi ikut dibuat ulang saat total berubah
    // Nomor di luar rentang dijepit (bukan ditolak), jadi validasi bawaan browser (min/max) dimatikan; atribut tetap berguna untuk spinner.
    Array.prototype.forEach.call(root.querySelectorAll('[data-pagination-jump]'), function (f) { f.noValidate = true; });

    function navButton(dir) {
      var isPrev = dir === 'prev';
      var disabled = isPrev ? page <= 1 : page >= o.total;
      var label = isPrev ? TEXT.prev : TEXT.next;
      var icon = isPrev ? ICON_PREV : ICON_NEXT;
      var inner = o.nav === 'icon' ? icon + '<span class="sr-only">' + label + '</span>'
        : o.nav === 'both' ? (isPrev ? icon + label : label + icon)
        : label;
      return '<li><button type="button" class="pagination-link" data-pagination-go="' + dir + '"' + (disabled ? ' disabled' : '') +
        (o.nav === 'icon' ? ' aria-label="' + label + '"' : '') + '>' + inner + '</button></li>';
    }

    function renderList() {
      if (!list) return;
      var html = o.nav === 'none' ? '' : navButton('prev');
      items(page, o.total, o.siblings, o.boundary).forEach(function (it) {
        if (it === 'gap') { html += '<li><span class="pagination-static" aria-hidden="true">…</span></li>'; return; }
        var cur = it === page;
        html += '<li><button type="button" class="pagination-link" data-pagination-go="' + it + '" aria-label="' + TEXT.page + ' ' + it + '"' +
          (cur ? ' aria-current="page"' : '') + '>' + it + '</button></li>';
      });
      if (o.nav !== 'none') html += navButton('next');
      list.innerHTML = html;
    }

    function renderSelect() {
      if (!select) return;
      if (selectOwned && select.options.length !== o.total) {
        select.innerHTML = range(1, o.total).map(function (n) { return '<option value="' + n + '">' + n + '</option>'; }).join('');
      }
      select.value = String(page);
    }

    function bounds() {
      if (!o.size || !o.count) return null;
      var from = (page - 1) * o.size + 1;
      return { from: from, to: Math.min(page * o.size, o.count) };
    }

    function textFor(kind) {
      var b = bounds();
      if (kind === 'page') return String(page);
      if (kind === 'total') return String(o.total);
      if (kind === 'range') return b ? b.from + '–' + b.to : '';
      if (kind === 'info') {
        return b ? 'Menampilkan <b>' + b.from + '</b> sampai <b>' + b.to + '</b> dari <b>' + o.count + '</b> ' + o.label
          : TEXT.page + ' <b>' + page + '</b> dari <b>' + o.total + '</b>';
      }
      return '';
    }

    function render() {
      renderList();
      renderSelect();
      Array.prototype.forEach.call(root.querySelectorAll('[data-pagination-prev], [data-pagination-next]'), function (btn) {
        var off = btn.hasAttribute('data-pagination-prev') ? page <= 1 : page >= o.total;
        if ('disabled' in btn) btn.disabled = off;
        btn.setAttribute('aria-disabled', off ? 'true' : 'false');
      });
      Array.prototype.forEach.call(root.querySelectorAll('[data-pagination-text]'), function (el) {
        el.innerHTML = textFor(el.getAttribute('data-pagination-text'));
      });
    }

    function goTo(n) {
      n = clamp(toInt(n, page), 1, o.total);
      var changed = n !== page;
      page = n;
      render(); // juga mengembalikan select/teks ke keadaan sebenarnya bila n di luar rentang
      if (changed) root.dispatchEvent(new CustomEvent('pagination:change', { bubbles: true, detail: { page: page, total: o.total } }));
    }

    root.addEventListener('click', function (e) {
      var go = e.target.closest('[data-pagination-go]');
      if (go && root.contains(go)) {
        e.preventDefault();
        var v = go.getAttribute('data-pagination-go');
        goTo(v === 'prev' ? page - 1 : v === 'next' ? page + 1 : v);
        return;
      }
      if (e.target.closest('[data-pagination-prev]')) { e.preventDefault(); goTo(page - 1); }
      else if (e.target.closest('[data-pagination-next]')) { e.preventDefault(); goTo(page + 1); }
    });

    root.addEventListener('submit', function (e) {
      var form = e.target.closest('[data-pagination-jump]');
      if (!form || !root.contains(form)) return;
      e.preventDefault();
      var input = form.querySelector('input');
      var n = input ? toInt(input.value, NaN) : NaN;
      if (input) input.value = '';
      if (!isNaN(n)) goTo(n);
    });

    root.addEventListener('change', function (e) {
      var sel = e.target.closest('[data-pagination-select]');
      if (sel && root.contains(sel)) goTo(sel.value);
    });

    render();

    return {
      get page() { return page; },
      get total() { return o.total; },
      goTo: goTo,
      next: function () { goTo(page + 1); },
      prev: function () { goTo(page - 1); },
      setTotal: function (n) {
        o.total = Math.max(1, toInt(n, o.total));
        goTo(page); // menjepit halaman aktif ke total baru dan merender ulang
      }
    };
  }

  function init(root) {
    root = root || document;
    var nodes = root.matches && root.matches('[data-pagination]') ? [root] : [];
    Array.prototype.forEach.call(root.querySelectorAll('[data-pagination]'), function (el) { nodes.push(el); });
    nodes.forEach(function (el) { if (!el._kkPagination) el._kkPagination = Pagination(el); });
  }

  window.KKPagination = {
    init: init,
    get: function (el) { return (el && el._kkPagination) || null; },
    items: items
  };

  function boot() {
    init(document);
    if (window.MutationObserver) { // markup added later (Storybook, async renders)
      var queued = false;
      new MutationObserver(function (list) {
        if (queued || !list.some(function (m) { return m.addedNodes.length; })) return;
        queued = true;
        window.requestAnimationFrame(function () { queued = false; init(document); });
      }).observe(document.body, { childList: true, subtree: true });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
