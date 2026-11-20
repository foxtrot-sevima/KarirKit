/* Pemilih PT di header admin (muncul untuk role internal, seperti di aplikasi).
   Markup memakai kelas combo KarirKit; perilaku buka, cari, dan pilih ada di sini karena KarirKit belum
   punya JS combo bersama. Atribut: data-pt-picker (akar .combo), data-pt-trigger, data-pt-label, data-pt-menu,
   data-pt-search, data-pt-list, data-pt-item[data-label], data-pt-empty. Pilihan disimpan di localStorage.
   Responsif: dropdown hanya tampil dari lg (sidebar tetap terlihat). Di bawah lg, skrip ini menambahkan tombol ringkas
   (ikon gedung, plus nama PT dari sm) di sebelah dropdown yang membuka bottom sheet Drawer berisi cari dan daftar PT. */
(function () {
  'use strict';
  var KEY = 'karirlink:selected-pt';
  var seq = 0;
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

  function read() {
    try { return window.localStorage.getItem(KEY) || ''; } catch (e) { return ''; }
  }
  function write(v) {
    try { window.localStorage.setItem(KEY, v); } catch (e) { /* mode privat: pilihan tidak disimpan */ }
  }

  document.querySelectorAll('[data-pt-picker]').forEach(function (root) {
    var trigger = root.querySelector('[data-pt-trigger]');
    var menu = root.querySelector('[data-pt-menu]');
    var label = root.querySelector('[data-pt-label]');
    var search = root.querySelector('[data-pt-search]');
    var empty = root.querySelector('[data-pt-empty]');
    var items = Array.prototype.slice.call(root.querySelectorAll('[data-pt-item]'));
    if (!trigger || !menu || !label) return;
    menu.setAttribute('data-placement', 'bottom-end');

    function isOpen() { return menu.classList.contains('is-open'); }
    function open() {
      root.setAttribute('data-open', 'true');
      menu.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      if (search) { search.value = ''; filter(''); search.focus(); }
    }
    function close() {
      root.removeAttribute('data-open');
      menu.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    }
    function filter(q) {
      q = q.trim().toLowerCase();
      var shown = 0;
      items.forEach(function (it) {
        var ok = !q || (it.getAttribute('data-label') || '').toLowerCase().indexOf(q) !== -1;
        it.classList.toggle('hidden', !ok);
        if (ok) shown++;
      });
      if (empty) empty.classList.toggle('hidden', shown !== 0);
    }
    var sheet = null;
    function buildSheet() {
      var id = 'ptSheet' + (++seq), wrap = root.parentElement;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'inline-flex h-9 min-w-0 max-w-[13rem] shrink items-center gap-2 rounded-lg px-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 lg:hidden';
      btn.setAttribute('data-drawer-toggle', id);
      btn.setAttribute('aria-controls', id);
      btn.setAttribute('aria-label', 'Pilih perguruan tinggi');
      btn.innerHTML = '<i class="kk kk-buildings h-5 w-5 shrink-0"></i><span class="hidden min-w-0 truncate sm:inline" data-pt-sheet-label>Pilih PT</span><i class="kk kk-caret-down hidden h-4 w-4 shrink-0 text-slate-400 sm:block"></i>';
      wrap.parentNode.insertBefore(btn, wrap);
      var drawer = document.createElement('div');
      drawer.className = 'drawer drawer-bottom lg:hidden';
      drawer.id = id;
      drawer.setAttribute('aria-label', 'Pilih perguruan tinggi');
      drawer.innerHTML = '<div class="drawer-header"><h2 class="drawer-title">Pilih perguruan tinggi</h2>' +
        '<button type="button" class="drawer-close" data-drawer-hide="' + id + '" aria-label="Tutup"><i class="kk kk-x h-5 w-5"></i></button></div>' +
        '<div class="drawer-body !p-3"><div class="combo-search-field mb-2"><span class="combo-search-icon"><i class="kk kk-magnifying-glass h-4 w-4"></i></span>' +
        '<input type="text" class="combo-search" placeholder="Cari PT..." aria-label="Cari PT" data-sheet-search /></div>' +
        '<div class="space-y-0.5" role="listbox">' + items.map(function (it) {
          var name = it.getAttribute('data-label');
          return '<button type="button" class="combo-item min-h-11" role="option" data-sheet-item data-label="' + esc(name) + '">' + esc(name) + '</button>';
        }).join('') + '</div><p class="combo-empty hidden" data-sheet-empty>Tidak ada PT yang cocok.</p></div>';
      document.body.appendChild(drawer);
      var list = Array.prototype.slice.call(drawer.querySelectorAll('[data-sheet-item]')), none = drawer.querySelector('[data-sheet-empty]');
      drawer.querySelector('[data-sheet-search]').addEventListener('input', function () {
        var q = this.value.trim().toLowerCase(), shown = 0;
        list.forEach(function (it) { var ok = !q || it.getAttribute('data-label').toLowerCase().indexOf(q) !== -1; it.classList.toggle('hidden', !ok); if (ok) shown++; });
        none.classList.toggle('hidden', shown !== 0);
      });
      list.forEach(function (it) {
        it.addEventListener('click', function () { choose(it.getAttribute('data-label'), true); if (window.KKDrawer) window.KKDrawer.close(drawer); });
      });
      sheet = { btnLabel: btn.querySelector('[data-pt-sheet-label]'), list: list };
    }
    function choose(name, persist) {
      var match = items.filter(function (it) { return it.getAttribute('data-label') === name; })[0];
      if (!match) return;
      items.forEach(function (it) { it.classList.toggle('is-selected', it === match); });
      label.textContent = name;
      label.title = name;
      label.classList.remove('combo-placeholder');
      if (sheet) {
        sheet.btnLabel.textContent = name;
        sheet.list.forEach(function (it) { it.classList.toggle('is-selected', it.getAttribute('data-label') === name); it.setAttribute('aria-selected', it.getAttribute('data-label') === name ? 'true' : 'false'); });
      }
      if (persist) write(name);
    }

    buildSheet();
    trigger.setAttribute('aria-expanded', 'false');
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (isOpen()) close(); else open();
    });
    if (search) search.addEventListener('input', function () { filter(search.value); });
    items.forEach(function (it) {
      it.addEventListener('click', function () { choose(it.getAttribute('data-label'), true); close(); });
    });
    document.addEventListener('click', function (e) { if (isOpen() && !root.contains(e.target)) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && isOpen()) { close(); trigger.focus(); } });

    var saved = read();
    if (saved) choose(saved, false);
  });
})();
