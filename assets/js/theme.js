/* KarirKit theme switcher — light / dark / system.
   Pairs with the tiny inline snippet in <head> that sets <html data-theme> before
   first paint. Preference is stored in localStorage key `kk-theme`
   ("light" | "dark" | "system"; default "system").

   Markup:  <button data-theme-option="light|dark|system">   segmented control (role=radio)
            <button data-theme-cycle>                         one button cycling the modes
            <i data-theme-icon>                               inside the cycle button; icon follows the mode
   API:     KKTheme.get() -> "light|dark|system";  KKTheme.set(pref)  */
(function () {
  var KEY = 'kk-theme';
  var ORDER = ['light', 'dark', 'system'];
  var ICON = { light: 'kk-sun', dark: 'kk-moon', system: 'kk-desktop' };
  var LABEL = { light: 'Terang', dark: 'Gelap', system: 'Ikuti sistem' };
  var mq = matchMedia('(prefers-color-scheme: dark)');
  var ACTIVE = ['bg-surface', 'text-primary-600', 'shadow-sm'];

  function get() {
    try { var v = localStorage.getItem(KEY); return ORDER.indexOf(v) > -1 ? v : 'system'; } catch (e) { return 'system'; }
  }

  function apply(pref) {
    var dark = pref === 'dark' || (pref === 'system' && mq.matches);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';

    document.querySelectorAll('[data-theme-option]').forEach(function (b) {
      var on = b.getAttribute('data-theme-option') === pref;
      b.setAttribute('aria-checked', on ? 'true' : 'false');
      ACTIVE.forEach(function (c) { b.classList.toggle(c, on); });
      b.classList.toggle('text-slate-500', !on);
    });

    document.querySelectorAll('[data-theme-cycle]').forEach(function (b) {
      b.setAttribute('aria-label', 'Tema: ' + LABEL[pref] + ' (klik untuk ganti)');
      b.setAttribute('title', 'Tema: ' + LABEL[pref]);
      var i = b.querySelector('[data-theme-icon]');
      if (i) {
        ORDER.forEach(function (m) { i.classList.remove(ICON[m]); });
        i.classList.add(ICON[pref]);
      }
    });
  }

  function set(pref) {
    if (ORDER.indexOf(pref) < 0) return;
    try { localStorage.setItem(KEY, pref); } catch (e) {}
    apply(pref);
  }

  document.addEventListener('click', function (e) {
    var opt = e.target.closest('[data-theme-option]');
    if (opt) return set(opt.getAttribute('data-theme-option'));
    if (e.target.closest('[data-theme-cycle]')) set(ORDER[(ORDER.indexOf(get()) + 1) % ORDER.length]);
  });

  // "system" follows the OS live
  mq.addEventListener('change', function () { if (get() === 'system') apply('system'); });
  // keep several open tabs/pages in sync
  window.addEventListener('storage', function (e) { if (e.key === KEY) apply(get()); });

  apply(get());
  window.KKTheme = { get: get, set: set };
})();
