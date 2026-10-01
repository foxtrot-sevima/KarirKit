/* KarirKit Toast helper — optional. The .toast markup works without JS; this
   adds dismiss + a tiny programmatic API.

   Dismiss:  <button data-toast-dismiss>  closes its closest .toast
   Demo:     <button data-toast-show="success|danger|warning|info">
   API:      KKToast.show({ type, message, duration })  // duration ms, 0 = sticky */
(function () {
  var ICONS = { success: 'check', danger: 'x', warning: 'warning', info: 'info' };
  var MESSAGES = {
    success: 'Perubahan berhasil disimpan.',
    danger: 'Terjadi kesalahan, coba lagi.',
    warning: 'Sesi kamu hampir berakhir.',
    info: 'Ada pembaruan baru tersedia.'
  };

  function dismiss(toast) {
    if (!toast || toast.classList.contains('toast-leaving')) return;
    toast.classList.add('toast-leaving');
    setTimeout(function () { toast.remove(); }, 200);
  }

  function region() {
    var el = document.getElementById('kkToastRegion');
    if (!el) {
      el = document.createElement('div');
      el.id = 'kkToastRegion';
      el.className = 'toast-region toast-bottom-right';
      el.setAttribute('aria-live', 'polite');
      document.body.appendChild(el);
    }
    return el;
  }

  function show(opts) {
    opts = opts || {};
    var type = ICONS[opts.type] ? opts.type : 'info';
    var toast = document.createElement('div');
    toast.className = 'toast toast-center';
    toast.setAttribute('role', type === 'danger' || type === 'warning' ? 'alert' : 'status');
    toast.innerHTML =
      '<span class="toast-icon toast-icon-' + type + '"><i class="kk kk-' + ICONS[type] + ' h-5 w-5"></i></span>' +
      '<div></div>' +
      '<button type="button" class="toast-close" data-toast-dismiss aria-label="Tutup"><i class="kk kk-x h-4 w-4"></i></button>';
    toast.children[1].textContent = opts.message || MESSAGES[type];
    region().appendChild(toast);
    var duration = opts.duration == null ? 4000 : opts.duration;
    if (duration > 0) setTimeout(function () { dismiss(toast); }, duration);
    return toast;
  }

  document.addEventListener('click', function (e) {
    var closeEl = e.target.closest('[data-toast-dismiss]');
    if (closeEl) return dismiss(closeEl.closest('.toast'));
    var showEl = e.target.closest('[data-toast-show]');
    if (showEl) show({ type: showEl.getAttribute('data-toast-show') });
  });

  window.KKToast = { show: show, dismiss: dismiss };
})();
