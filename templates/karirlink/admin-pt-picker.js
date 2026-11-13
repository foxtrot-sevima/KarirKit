/* Pemilih PT di header admin (muncul untuk role internal, seperti di aplikasi).
   Markup memakai kelas combo KarirKit; perilaku buka, cari, dan pilih ada di sini karena KarirKit belum
   punya JS combo bersama. Atribut: data-pt-picker (akar .combo), data-pt-trigger, data-pt-label, data-pt-menu,
   data-pt-search, data-pt-list, data-pt-item[data-label], data-pt-empty. Pilihan disimpan di localStorage. */
(function () {
  'use strict';
  var KEY = 'karirlink:selected-pt';

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
    function choose(name, persist) {
      var match = items.filter(function (it) { return it.getAttribute('data-label') === name; })[0];
      if (!match) return;
      items.forEach(function (it) { it.classList.toggle('is-selected', it === match); });
      label.textContent = name;
      label.classList.remove('combo-placeholder');
      if (persist) write(name);
    }

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
