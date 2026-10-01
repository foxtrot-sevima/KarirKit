/* KarirKit Table behaviours — dependency-free progressive enhancement.
   The CSS (.table, .table-wrap, ...) works without JS; this adds the functions.

   Root:       <div data-table data-page-size="5"> ... <table class="table"> ... </div>
   Sort:       <th data-sort="text|number|date"><button class="th-sort">Label <i class="kk kk-caret-up-down sort-icon"></i></button></th>
               optional per-cell raw value: <td data-value="1500000">Rp1.500.000</td>
   Search:     <input data-table-search>
   Filter:     <button data-filter-col="2" data-filter-value="Aktif"> (value "" = all) ; label: [data-table-filter-label]
   Pagination: <div data-table-pagination><span data-table-info></span><nav data-table-pages></nav></div>
   Select:     <input type="checkbox" data-table-select-all> / <input type="checkbox" data-table-select>
               <div data-table-bulk hidden> ... <span data-table-selected-count></span></div>
   Number:     <th class="table-col-num">No</th> / <td class="table-col-num" data-num>1</td> - renumbered in display order
               (after sort, filter, paging and row removal); every table keeps a "No" column
   Empty:      <div data-table-empty hidden>...</div>
   Row menu:   <button data-table-menu aria-expanded="false"> + next sibling .dropdown-menu.hidden  (fixed-positioned: not clipped)
   Counter:    <div class="counter" data-counter data-min="1" data-max="9"> [data-counter-dec] <input class="counter-input"> [data-counter-inc]
               row: data-price="N" + [data-line-total]; footer: [data-cart-total]; remove: [data-row-remove]
   Modal:      <button data-table-modal-open="#id"> inside a <tr data-user-name ...>;
               <div class="modal-backdrop" id="id" data-table-modal> with [data-field="name|position|bio"], [name=status], [data-table-modal-save], [data-table-modal-close]
   Page size:  <select data-table-page-size> (options = rows per page)
   Item label: data-item-label="periode" on the root -> "Menampilkan 1–10 dari 15 periode"
   Hooks:      var t = KKTable.get(rootEl);
                 t.addFilter(function (row) { return true; })  // extra predicate (e.g. custom dropdown filters)
                 t.refresh()                                      // re-run filters, back to page 1
               rootEl.addEventListener('table:render', function (e) { e.detail.visible = all rows passing the filters })
   API:        KKTable.init(rootEl), KKTable.get(rootEl) */
(function () {
  'use strict';

  var idr = function (n) { return 'Rp' + Math.round(n).toLocaleString('id-ID'); };
  var $$ = function (r, s) { return Array.prototype.slice.call(r.querySelectorAll(s)); };

  /* ---------------------------------------------------------------- table */
  function init(root) {
    if (root._kkTable) return;
    var table = root.querySelector('table');
    if (!table || !table.tBodies[0]) return;
    root._kkTable = true;
    var tbody = table.tBodies[0];
    var size = parseInt(root.getAttribute('data-page-size') || '0', 10);
    var state = { q: '', filters: {}, col: -1, dir: 1, page: 1, custom: [] };
    var label = root.getAttribute('data-item-label') || '';
    var sizeSelect = root.querySelector('[data-table-page-size]');
    if (sizeSelect) size = parseInt(sizeSelect.value, 10) || size;

    var dataRows = function () { return $$(tbody, 'tr').filter(function (r) { return !r.hasAttribute('data-empty-row'); }); };
    dataRows().forEach(function (r, i) { r._order = i; });

    function cellValue(row, col, type) {
      var c = row.cells[col]; if (!c) return '';
      var raw = c.hasAttribute('data-value') ? c.getAttribute('data-value') : c.textContent.trim();
      if (type === 'number') { var n = parseFloat(String(raw).replace(/\./g, '').replace(',', '.').replace(/[^\d.-]/g, '')); return isNaN(n) ? -Infinity : n; }
      if (type === 'date') { var t = Date.parse(raw); return isNaN(t) ? -Infinity : t; }
      return String(raw).toLowerCase();
    }

    function matches(row) {
      if (state.q && row.textContent.toLowerCase().indexOf(state.q) === -1) return false;
      for (var k = 0; k < state.custom.length; k++) if (!state.custom[k](row)) return false;
      for (var col in state.filters) {
        var want = state.filters[col]; if (!want) continue;
        var c = row.cells[+col]; if (!c) return false;
        var have = c.hasAttribute('data-value') ? c.getAttribute('data-value') : c.textContent.trim();
        if (have !== want) return false;
      }
      return true;
    }

    function selectAll() { return root.querySelector('[data-table-select-all]'); }
    function updateSelection() {
      var rows = dataRows();
      var boxes = rows.map(function (r) { return r.querySelector('[data-table-select]'); }).filter(Boolean);
      var picked = boxes.filter(function (b) { return b.checked; });
      rows.forEach(function (r) { var b = r.querySelector('[data-table-select]'); r.classList.toggle('is-selected', !!(b && b.checked)); });
      var all = selectAll();
      if (all) {
        var vis = boxes.filter(function (b) { return !b.closest('tr').hidden; });
        var visPicked = vis.filter(function (b) { return b.checked; }).length;
        all.checked = vis.length > 0 && visPicked === vis.length;
        all.indeterminate = visPicked > 0 && visPicked < vis.length;
      }
      var cnt = root.querySelector('[data-table-selected-count]'); if (cnt) cnt.textContent = picked.length;
      var bulk = root.querySelector('[data-table-bulk]'); if (bulk) bulk.hidden = picked.length === 0;
    }

    function pageButtons(pages) {
      var out = [], cur = state.page;
      var add = function (label, page, opts) {
        opts = opts || {};
        out.push('<button type="button" class="pagination-btn' + (opts.active ? ' pagination-btn-active' : '') + '" data-page="' + page + '"' +
          (opts.disabled ? ' disabled' : '') + (opts.active ? ' aria-current="page"' : '') + (opts.label ? ' aria-label="' + opts.label + '"' : '') + '>' + label + '</button>');
      };
      add('<i class="kk kk-caret-left h-4 w-4"></i>', cur - 1, { disabled: cur <= 1, label: 'Sebelumnya' });
      var shown = {}; [1, pages, cur - 1, cur, cur + 1].forEach(function (p) { if (p >= 1 && p <= pages) shown[p] = 1; });
      var list = Object.keys(shown).map(Number).sort(function (a, b) { return a - b; }), prev = 0;
      list.forEach(function (p) {
        if (p - prev > 1) out.push('<span class="px-1 text-fg-subtle" aria-hidden="true">…</span>');
        add(p, p, { active: p === cur }); prev = p;
      });
      add('<i class="kk kk-caret-right h-4 w-4"></i>', cur + 1, { disabled: cur >= pages, label: 'Berikutnya' });
      return out.join('');
    }

    function render() {
      var rows = dataRows();
      var visible = rows.filter(matches);
      var pages = size ? Math.max(1, Math.ceil(visible.length / size)) : 1;
      if (state.page > pages) state.page = pages;
      var start = size ? (state.page - 1) * size : 0, end = size ? start + size : visible.length;
      rows.forEach(function (r) { r.hidden = true; });
      visible.slice(start, end).forEach(function (r, i) {
        r.hidden = false;
        var n = r.querySelector('[data-num]'); if (n) n.textContent = start + i + 1; // "No" follows display order
      });

      var empty = root.querySelector('[data-table-empty]'); if (empty) empty.hidden = visible.length > 0;
      var info = root.querySelector('[data-table-info]');
      if (info) info.innerHTML = visible.length
        ? 'Menampilkan <b>' + (start + 1) + '–' + Math.min(end, visible.length) + '</b> dari <b>' + visible.length + '</b>' + (label ? ' ' + label : '')
        : 'Tidak ada data';
      var pg = root.querySelector('[data-table-pages]'); if (pg) pg.innerHTML = size && pages > 1 ? pageButtons(pages) : '';
      updateSelection();
      root.dispatchEvent(new CustomEvent('table:render', { detail: { visible: visible, page: state.page, size: size } }));
    }

    function sortBy(th) {
      var col = th.cellIndex, type = th.getAttribute('data-sort') || 'text';
      state.dir = state.col === col ? -state.dir : 1; state.col = col;
      var rows = dataRows();
      rows.sort(function (a, b) {
        var x = cellValue(a, col, type), y = cellValue(b, col, type);
        return (x < y ? -1 : x > y ? 1 : a._order - b._order) * state.dir;
      });
      rows.forEach(function (r) { tbody.appendChild(r); });
      $$(table, 'th[data-sort]').forEach(function (h) {
        var on = h === th;
        if (on) h.setAttribute('aria-sort', state.dir === 1 ? 'ascending' : 'descending'); else h.removeAttribute('aria-sort');
        var ic = h.querySelector('.sort-icon');
        if (ic) { ic.classList.remove('kk-caret-up', 'kk-caret-down', 'kk-caret-up-down'); ic.classList.add(on ? (state.dir === 1 ? 'kk-caret-up' : 'kk-caret-down') : 'kk-caret-up-down'); }
      });
      state.page = 1; render();
    }

    // --- events
    $$(table, 'th[data-sort]').forEach(function (th) {
      th.setAttribute('scope', 'col');
      var b = th.querySelector('.th-sort'); (b || th).addEventListener('click', function () { sortBy(th); });
    });
    var search = root.querySelector('[data-table-search]');
    if (search) search.addEventListener('input', function () { state.q = search.value.trim().toLowerCase(); state.page = 1; render(); });

    root.addEventListener('click', function (e) {
      var f = e.target.closest('[data-filter-col]');
      if (f) {
        state.filters[f.getAttribute('data-filter-col')] = f.getAttribute('data-filter-value') || '';
        var label = root.querySelector('[data-table-filter-label]');
        if (label) label.textContent = f.getAttribute('data-filter-value') ? f.textContent.trim() : (label.getAttribute('data-default') || 'Filter');
        var menu = f.closest('.dropdown-menu');
        if (menu) { menu.classList.add('hidden'); var t = menu.previousElementSibling; if (t) t.setAttribute('aria-expanded', 'false'); }
        state.page = 1; render(); return;
      }
      var p = e.target.closest('[data-page]');
      if (p && !p.disabled) { state.page = +p.getAttribute('data-page'); render(); }
    });

    root.addEventListener('change', function (e) {
      if (e.target.matches('[data-table-page-size]')) { size = parseInt(e.target.value, 10) || 0; state.page = 1; render(); return; }
      if (e.target.matches('[data-table-select-all]')) {
        dataRows().filter(function (r) { return !r.hidden; }).forEach(function (r) { var b = r.querySelector('[data-table-select]'); if (b) b.checked = e.target.checked; });
        updateSelection();
      } else if (e.target.matches('[data-table-select]')) updateSelection();
    });

    root._kkTable = {
      refresh: function () { state.page = 1; render(); },
      addFilter: function (fn) { state.custom.push(fn); },
      render: render
    };
    render();
  }

  /* ------------------------------------------------- row menu (fixed) */
  var openMenu = null;
  function closeMenu() {
    if (!openMenu) return;
    openMenu.menu.classList.add('hidden'); openMenu.menu.classList.remove('dropdown-menu-fixed');
    openMenu.btn.setAttribute('aria-expanded', 'false'); openMenu = null;
  }
  function toggleMenu(btn) {
    var menu = btn.nextElementSibling; if (!menu) return;
    var wasOpen = openMenu && openMenu.btn === btn; closeMenu(); if (wasOpen) return;
    menu.classList.remove('hidden'); menu.classList.add('dropdown-menu-fixed');
    var r = btn.getBoundingClientRect(), w = menu.offsetWidth, h = menu.offsetHeight;
    var left = Math.min(Math.max(8, r.right - w), document.documentElement.clientWidth - w - 8);
    var top = r.bottom + 4; if (top + h > window.innerHeight - 8) top = Math.max(8, r.top - h - 4);
    menu.style.left = left + 'px'; menu.style.top = top + 'px'; menu.style.right = 'auto';
    btn.setAttribute('aria-expanded', 'true'); openMenu = { btn: btn, menu: menu };
  }

  /* ------------------------------------------------------------ counter */
  function recalcTotals(scope) {
    var total = 0;
    $$(scope, 'tr[data-price]').forEach(function (row) {
      var inp = row.querySelector('.counter-input'), q = inp ? parseInt(inp.value, 10) || 0 : 1;
      var line = (parseFloat(row.getAttribute('data-price')) || 0) * q; total += line;
      var cell = row.querySelector('[data-line-total]'); if (cell) cell.textContent = idr(line);
    });
    var t = scope.querySelector('[data-cart-total]'); if (t) t.textContent = idr(total);
  }
  function step(counter, delta) {
    var inp = counter.querySelector('.counter-input'); if (!inp) return;
    var min = parseInt(counter.getAttribute('data-min') || '1', 10), max = parseInt(counter.getAttribute('data-max') || '99', 10);
    var v = Math.min(max, Math.max(min, (parseInt(inp.value, 10) || min) + delta)); inp.value = v;
    var dec = counter.querySelector('[data-counter-dec]'), inc = counter.querySelector('[data-counter-inc]');
    if (dec) dec.disabled = v <= min; if (inc) inc.disabled = v >= max;
    var scope = counter.closest('[data-table]') || document; recalcTotals(scope);
  }

  /* -------------------------------------------------------------- modal */
  var modalCtx = null;
  function openModal(sel, row) {
    var m = document.querySelector(sel); if (!m) return;
    modalCtx = { modal: m, row: row };
    if (row) {
      $$(m, '[data-field]').forEach(function (f) { f.value = row.getAttribute('data-user-' + f.getAttribute('data-field')) || ''; });
      var st = row.getAttribute('data-user-status') || '';
      $$(m, 'input[name="status"]').forEach(function (r) { r.checked = r.value === st; });
      var title = m.querySelector('[data-modal-name]'); if (title) title.textContent = row.getAttribute('data-user-name') || '';
    }
    m.classList.add('is-open'); var first = m.querySelector('input,textarea,button'); if (first) setTimeout(function () { first.focus(); }, 30);
  }
  function closeModal() { if (modalCtx) { modalCtx.modal.classList.remove('is-open'); modalCtx = null; } }
  function saveModal() {
    if (!modalCtx || !modalCtx.row) return closeModal();
    var m = modalCtx.modal, row = modalCtx.row;
    $$(m, '[data-field]').forEach(function (f) { row.setAttribute('data-user-' + f.getAttribute('data-field'), f.value); });
    var st = m.querySelector('input[name="status"]:checked'); if (st) row.setAttribute('data-user-status', st.value);
    $$(row, '[data-cell]').forEach(function (c) {
      var k = c.getAttribute('data-cell'), v = row.getAttribute('data-user-' + k) || '';
      if (k === 'status') { c.textContent = v; var dot = c.previousElementSibling; if (dot && dot.classList.contains('badge-dot')) { dot.classList.toggle('bg-success-500', v === 'Online'); dot.classList.toggle('bg-danger-500', v !== 'Online'); } }
      else c.textContent = v;
    });
    closeModal();
  }

  /* -------------------------------------------------- global delegation */
  document.addEventListener('click', function (e) {
    var mb = e.target.closest('[data-table-menu]');
    if (mb) { e.preventDefault(); return toggleMenu(mb); }
    if (openMenu && !e.target.closest('.dropdown-menu')) closeMenu();

    var dec = e.target.closest('[data-counter-dec]'); if (dec) return step(dec.closest('[data-counter]'), -1);
    var inc = e.target.closest('[data-counter-inc]'); if (inc) return step(inc.closest('[data-counter]'), 1);
    var rm = e.target.closest('[data-row-remove]');
    if (rm) {
      e.preventDefault();
      var row = rm.closest('tr'), scope = row.closest('[data-table]') || document;
      row.remove(); recalcTotals(scope);
      $$(scope, 'tr[data-price]').forEach(function (r, i) { var n = r.querySelector('[data-num]'); if (n) n.textContent = i + 1; });
      var empty = scope.querySelector('[data-table-empty]'); if (empty) empty.hidden = scope.querySelectorAll('tr[data-price]').length > 0;
      return;
    }
    var mo = e.target.closest('[data-table-modal-open]');
    if (mo) { e.preventDefault(); return openModal(mo.getAttribute('data-table-modal-open'), mo.closest('tr')); }
    if (e.target.closest('[data-table-modal-save]')) { e.preventDefault(); return saveModal(); }
    if (e.target.closest('[data-table-modal-close]') || (e.target.matches('[data-table-modal]') && e.target === e.target.closest('[data-table-modal]'))) closeModal();
  });
  document.addEventListener('input', function (e) {
    if (e.target.matches('.counter-input')) { var c = e.target.closest('[data-counter]'); if (c) step(c, 0); }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeMenu(); closeModal(); } });
  window.addEventListener('scroll', closeMenu, true);
  window.addEventListener('resize', closeMenu);

  function initAll() {
    $$(document, '[data-table]').forEach(init);
    $$(document, '[data-counter]').forEach(function (c) { if (c._kkInit) return; c._kkInit = true; step(c, 0); });
  }
  initAll();
  document.addEventListener('DOMContentLoaded', initAll);
  new MutationObserver(function () { initAll(); }).observe(document.documentElement, { childList: true, subtree: true });

  window.KKTable = { init: init, get: function (root) { return root && root._kkTable && root._kkTable.render ? root._kkTable : null; } };
})();
