/* KarirKit QR Code helper — renders QR codes as inline SVG, fully offline.
   Requires assets/js/vendor/qrcode.js (qrcode-generator, MIT) loaded first.

   Markup:   <div data-qr data-qr-text="https://..." data-qr-level="M" class="h-48 w-48"></div>
   Input:    <input data-qr-target="#id">                 re-renders #id on every keystroke
   Level:    <select data-qr-level-select data-qr-target="#id">
   Actions:  <button data-qr-action="copy-svg|save|refresh" data-qr-target="#id">
   Copy:     <button data-copy-input="#inputId">           copies the input value
   API:      KKQr.svg(text, { level, margin }) -> string;  KKQr.render(el, text, level) */
(function () {
  var INK = '#0f172a';
  var LEVELS = { L: 1, M: 1, Q: 1, H: 1 };

  function svg(text, opts) {
    opts = opts || {};
    var level = LEVELS[opts.level] ? opts.level : 'M';
    var margin = opts.margin == null ? 2 : opts.margin;
    var qr = window.qrcode(0, level);
    qr.addData(String(text == null ? '' : text));
    qr.make();
    var n = qr.getModuleCount();
    var d = '';
    for (var r = 0; r < n; r++) {
      for (var c = 0; c < n; c++) {
        if (!qr.isDark(r, c)) continue;
        var start = c;
        while (c + 1 < n && qr.isDark(r, c + 1)) c++;
        d += 'M' + (start + margin) + ',' + (r + margin) + 'h' + (c - start + 1) + 'v1h-' + (c - start + 1) + 'z';
      }
    }
    var size = n + margin * 2;
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + size + ' ' + size + '" shape-rendering="crispEdges" role="img">' +
      '<rect width="' + size + '" height="' + size + '" fill="#ffffff"/><path fill="' + INK + '" d="' + d + '"/></svg>';
  }

  function render(el, text, level) {
    if (!window.qrcode) return;
    el.dataset.qrText = text;
    if (level) el.dataset.qrLevel = level;
    el.innerHTML = svg(text, { level: el.dataset.qrLevel });
    var s = el.firstChild;
    s.setAttribute('aria-label', 'QR code: ' + text);
  }

  function init(root) {
    (root || document).querySelectorAll('[data-qr]:not([data-qr-ready])').forEach(function (el) {
      if (!window.qrcode) return;
      el.dataset.qrReady = '1';
      render(el, el.dataset.qrText || '', el.dataset.qrLevel);
    });
  }

  function target(el) {
    var sel = el.getAttribute('data-qr-target');
    return sel ? document.querySelector(sel) : null;
  }

  function flash(btn, label) {
    var span = btn.querySelector('[data-label]') || btn;
    var original = btn.dataset.originalLabel || span.textContent;
    btn.dataset.originalLabel = original;
    span.textContent = label;
    clearTimeout(btn._t);
    btn._t = setTimeout(function () { span.textContent = original; }, 1800);
  }

  document.addEventListener('input', function (e) {
    var t = e.target.closest('input[data-qr-target]');
    var q = t && target(t);
    if (q) render(q, t.value || ' ');
  });

  document.addEventListener('change', function (e) {
    var t = e.target.closest('[data-qr-level-select]');
    var q = t && target(t);
    if (q) render(q, q.dataset.qrText, t.value);
  });

  document.addEventListener('click', function (e) {
    var act = e.target.closest('[data-qr-action]');
    if (act) {
      var q = target(act);
      var kind = act.getAttribute('data-qr-action');
      if (kind === 'copy-svg' && q && navigator.clipboard) {
        navigator.clipboard.writeText(q.innerHTML).then(function () { flash(act, 'Tersalin!'); });
      } else if (kind === 'save' && q) {
        var a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([q.innerHTML], { type: 'image/svg+xml' }));
        a.download = 'qr-code.svg';
        a.click();
        setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
      } else if (kind === 'refresh') {
        var box = act.closest('.qr-code');
        var overlay = box && box.querySelector('.qr-overlay');
        if (overlay) {
          overlay.innerHTML = '<span class="qr-spinner" aria-hidden="true"></span><p>Memuat ulang…</p>';
          setTimeout(function () { overlay.remove(); }, 1000);
        }
      }
      return;
    }
    var copy = e.target.closest('[data-copy-input]');
    if (copy) {
      var input = document.querySelector(copy.getAttribute('data-copy-input'));
      if (!input || !navigator.clipboard) return;
      navigator.clipboard.writeText(input.value).then(function () {
        var d = copy.querySelector('[data-copy-default]');
        var ok = copy.querySelector('[data-copy-success]');
        var tip = copy.parentElement.querySelector('.tooltip-content');
        if (d) d.classList.add('hidden');
        if (ok) ok.classList.remove('hidden');
        if (tip) { tip.dataset.orig = tip.dataset.orig || tip.textContent; tip.textContent = 'Tersalin!'; }
        setTimeout(function () {
          if (d) d.classList.remove('hidden');
          if (ok) ok.classList.add('hidden');
          if (tip) tip.textContent = tip.dataset.orig;
        }, 2000);
      });
    }
  });

  // Auto-init now, on DOM ready, and for markup inserted later (Storybook, SPA)
  init();
  document.addEventListener('DOMContentLoaded', function () { init(); });
  new MutationObserver(function () { init(); }).observe(document.documentElement, { childList: true, subtree: true });

  window.KKQr = { svg: svg, render: render, init: init };
})();
