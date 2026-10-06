/* KarirKit QR Code helper — renders QR codes as inline SVG, fully offline.
   Requires assets/js/vendor/qrcode.js (qrcode-generator, MIT) loaded first.

   Markup:   <div data-qr data-qr-text="https://..." data-qr-level="M" class="h-48 w-48"></div>
   Input:    <input data-qr-target="#id">                 re-renders #id on every keystroke
   Level:    <select data-qr-level-select data-qr-target="#id">
   Actions:  <button data-qr-action="copy-svg|save|refresh" data-qr-target="#id">
   Copy:     <button data-copy-input="#inputId">           copies the input value
   API:      KKQr.svg(text, { level, margin }) -> string;  KKQr.render(el, text, level)

   Branded/personalized variant (rounded data modules, solid brand color,
   rounded finder patterns, center logo badge) — layered on the same markup
   via attributes:
   Markup:   <div data-qr data-qr-text="…" data-qr-brand data-qr-level="H"
                  data-qr-style="dots" data-qr-color="#2361e7"
                  data-qr-color-end="#5d8bef" data-qr-logo="mark"
                  class="h-48 w-48"></div>
   - data-qr-brand        shorthand: rounded modules + solid primary color +
                          mark logo, forces level H (center logo needs the
                          extra error-correction budget to stay scannable)
   - data-qr-style        "square" (default, original crisp-edge rects) or
                          "dots" (rounded data modules, used alone for a
                          lighter touch without full branding)
   - data-qr-color(-end)  single color by default; pass both for a gradient
                          - pick colors of similar lightness (e.g. two brand
                          shades), not complementary hues, which blend
                          muddy once interlaced across many small modules
   - data-qr-logo         "mark" clears a center circle of modules (no badge
                          shape drawn - just the natural white canvas) and
                          places the KarirLink mark there (the product the
                          QR actually links to, not the KarirKit kit itself),
                          painted in the same color/gradient as the modules
                          (not the mark's own brand colors) so it always
                          matches whatever data-qr-color is set; omit/"none"
                          for no logo
   Logo toggle: <input type="checkbox" data-qr-logo-toggle data-qr-target="#id"> */
(function () {
  var INK = '#0f172a';
  var LEVELS = { L: 1, M: 1, Q: 1, H: 1 };
  // Solid brand blue by default, not a gradient: across a dense field of
  // small irregular module shapes a gradient mostly just reads as uneven/
  // noisy coloring rather than a deliberate effect - a single vivid color
  // is what actually looks clean and "designed" here. A two-tone gradient
  // is still available opt-in via data-qr-color + data-qr-color-end.
  var BRAND_COLOR = '#2361e7'; // primary-600
  // KarirLink mark (assets/logo/karirlink-mark.svg) — the product the QR
  // actually links to, not the KarirKit design-system mark. Inlined so the
  // generated QR stays one self-contained SVG (matters for Copy/Save).
  // No fill of its own: it's painted with whatever color/gradient the QR
  // modules use (see `fill` below), so the logo always matches the code
  // around it instead of clashing with its own fixed brand colors.
  var MARK_VIEWBOX = { w: 420, h: 401 };
  var MARK_PATHS =
    '<path d="M326.11 400.95H1.48022C0.660225 400.95 0 400.29 0 399.47V1.47998C0 0.65998 0.660225 0 1.48022 0H84.05C84.87 0 85.53 0.65998 85.53 1.47998V313.93C85.53 314.75 86.2 315.42 87.02 315.42H169.59C170.41 315.42 171.07 314.75 171.07 313.93V245.9L326.11 400.95Z"/>' +
    '<path d="M171.07 137.21V1.47998C171.07 0.65998 171.74 0 172.56 0H308.29L171.07 137.21Z"/>' +
    '<path d="M419.37 10.1001V373.33L237.6 191.57L419.37 10.1001Z"/>';

  function svg(text, opts) {
    opts = opts || {};
    if (opts.style === 'dots' || opts.brand) return svgBranded(text, opts);
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

  // Neighbor-aware rounded modules (full module coverage, corners rounded
  // only on the "free" sides so connected runs read as one smooth blob -
  // same technique as the reference style in moodboard/qr-code/qrcode.svg)
  // + rounded finder patterns + optional brand gradient + optional center
  // logo badge. Logo requests always force level H (30% error-correction
  // budget) since the badge covers real data modules — scanners recover the
  // rest from redundancy, the same trick every personalized QR generator
  // relies on.
  function svgBranded(text, opts) {
    var hasLogo = !!opts.logo && opts.logo !== 'none';
    var level = hasLogo ? 'H' : (LEVELS[opts.level] ? opts.level : 'H');
    var margin = opts.margin == null ? 2 : opts.margin;
    var qr = window.qrcode(0, level);
    qr.addData(String(text == null ? '' : text));
    qr.make();
    var n = qr.getModuleCount();
    var size = n + margin * 2;
    // Solid by default: colorEnd only ever differs from colorStart when the
    // caller explicitly passes both, so a single data-qr-color override can
    // never accidentally turn into a color->BRAND_COLOR gradient.
    var colorStart = opts.color || (opts.brand ? BRAND_COLOR : INK);
    var colorEnd = opts.colorEnd || colorStart;
    var gradId = 'kkqr-grad-' + Math.random().toString(36).slice(2, 9);
    var fill = colorEnd === colorStart ? colorStart : ('url(#' + gradId + ')');

    function inFinder(r, c) {
      return (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7);
    }
    // No badge shape is drawn behind the logo - modules are simply skipped
    // in a center circle so the plain white canvas shows through, same as
    // everywhere else a module is light. That's what makes the logo read as
    // "the pattern thins out around it" instead of "a sticker on top of it".
    var logoR = hasLogo ? size * 0.135 : 0;
    function inLogoZone(r, c) {
      if (!hasLogo) return false;
      var dx = c + margin + 0.5 - size / 2, dy = r + margin + 0.5 - size / 2;
      return Math.sqrt(dx * dx + dy * dy) < logoR;
    }
    function isDark(r, c) {
      return r >= 0 && r < n && c >= 0 && c < n && qr.isDark(r, c) && !inFinder(r, c) && !inLogoZone(r, c);
    }

    // Rounded rect for one 1x1 module at grid (r,c), corner radius `rad`
    // (module units). A corner stays square whenever either module sharing
    // that edge is also dark, so adjacent dark modules fuse into one
    // continuous shape instead of leaving a notch between them. 0.44 (not
    // the initial 0.32): too small leaves isolated modules looking like
    // small hard-edged diamonds next to fully-round neighbors - close to
    // the 0.5 ceiling reads as a clean, uniformly soft dot/pill pattern
    // instead, matching the reference in moodboard/qr-code/qrcode.svg.
    var rad = 0.44;
    function moduleShape(r, c) {
      var x = c + margin, y = r + margin, x1 = x + 1, y1 = y + 1;
      var tl = !isDark(r - 1, c) && !isDark(r, c - 1);
      var tr = !isDark(r - 1, c) && !isDark(r, c + 1);
      var br = !isDark(r + 1, c) && !isDark(r, c + 1);
      var bl = !isDark(r + 1, c) && !isDark(r, c - 1);
      var d = 'M' + (tl ? x + rad : x) + ',' + y;
      d += 'L' + (tr ? x1 - rad : x1) + ',' + y;
      if (tr) d += 'A' + rad + ',' + rad + ' 0 0 1 ' + x1 + ',' + (y + rad);
      d += 'L' + x1 + ',' + (br ? y1 - rad : y1);
      if (br) d += 'A' + rad + ',' + rad + ' 0 0 1 ' + (x1 - rad) + ',' + y1;
      d += 'L' + (bl ? x + rad : x) + ',' + y1;
      if (bl) d += 'A' + rad + ',' + rad + ' 0 0 1 ' + x + ',' + (y1 - rad);
      d += 'L' + x + ',' + (tl ? y + rad : y);
      if (tl) d += 'A' + rad + ',' + rad + ' 0 0 1 ' + (x + rad) + ',' + y;
      return d + 'Z';
    }
    var dots = '';
    for (var r = 0; r < n; r++) {
      for (var c = 0; c < n; c++) {
        if (!isDark(r, c)) continue;
        dots += moduleShape(r, c);
      }
    }

    // Matches moodboard/qr-code/qrcode.svg exactly: outer 7x7 rounded ring
    // via an evenodd path (outer rx=1.4 modules, inner cutout rx=1 module,
    // inset by 1 module on every side) + a separate 3x3 rounded-rect eye at
    // the center (rx=1 module). Keeps the scanner-critical 1:1:3:1:1
    // dark/light ratio exact on both center scanlines - only the corners
    // round off, which detectors don't rely on.
    function finder(r0, c0) {
      var x = c0 + margin, y = r0 + margin;
      return '<path fill-rule="evenodd" fill="' + fill + '" d="' +
        'M' + x + ',' + (y + 1.4) + 'A1.4,1.4 0 0 1 ' + (x + 1.4) + ',' + y + 'H' + (x + 5.6) +
        'A1.4,1.4 0 0 1 ' + (x + 7) + ',' + (y + 1.4) + 'V' + (y + 5.6) +
        'A1.4,1.4 0 0 1 ' + (x + 5.6) + ',' + (y + 7) + 'H' + (x + 1.4) +
        'A1.4,1.4 0 0 1 ' + x + ',' + (y + 5.6) + 'Z' +
        'M' + (x + 1) + ',' + (y + 2) + 'A1,1 0 0 1 ' + (x + 2) + ',' + (y + 1) + 'H' + (x + 5) +
        'A1,1 0 0 1 ' + (x + 6) + ',' + (y + 2) + 'V' + (y + 5) +
        'A1,1 0 0 1 ' + (x + 5) + ',' + (y + 6) + 'H' + (x + 2) +
        'A1,1 0 0 1 ' + (x + 1) + ',' + (y + 5) + 'Z"/>' +
        '<rect x="' + (x + 2) + '" y="' + (y + 2) + '" width="3" height="3" rx="1" fill="' + fill + '"/>';
    }
    var finders = finder(0, 0) + finder(0, n - 7) + finder(n - 7, 0);

    // No background plate - the logo sits directly on the natural white
    // clearing left by inLogoZone() above, so it reads as part of the code
    // instead of a shape dropped on top of it.
    var logo = '';
    if (hasLogo) {
      var cx = size / 2, cy = size / 2, markW = logoR * 2 * 0.56, markH = markW * (MARK_VIEWBOX.h / MARK_VIEWBOX.w);
      var markX = cx - markW / 2, markY = cy - markH / 2, scale = markW / MARK_VIEWBOX.w;
      logo = '<g fill="' + fill + '" transform="translate(' + markX + ' ' + markY + ') scale(' + scale + ')">' + MARK_PATHS + '</g>';
    }

    // gradientUnits="userSpaceOnUse" is required here: the default
    // objectBoundingBox maps 0%-100% across EACH shape's own tiny bounding
    // box, so every module would independently re-sample the same narrow
    // color slice instead of sweeping across the whole code.
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + size + ' ' + size + '" role="img">' +
      (fill.indexOf('url(') === 0 ? '<defs><linearGradient id="' + gradId + '" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="' + size + '" y2="' + size + '">' +
        '<stop offset="0%" stop-color="' + colorStart + '"/><stop offset="100%" stop-color="' + colorEnd + '"/></linearGradient></defs>' : '') +
      '<rect width="' + size + '" height="' + size + '" fill="#ffffff"/>' +
      '<path fill="' + fill + '" d="' + dots + '"/>' + finders + logo + '</svg>';
  }

  function render(el, text, level) {
    if (!window.qrcode) return;
    el.dataset.qrText = text;
    if (level) el.dataset.qrLevel = level;
    var brand = el.hasAttribute('data-qr-brand');
    el.innerHTML = svg(text, {
      level: el.dataset.qrLevel,
      brand: brand,
      style: el.dataset.qrStyle || (brand ? 'dots' : null),
      color: el.dataset.qrColor,
      colorEnd: el.dataset.qrColorEnd,
      logo: el.dataset.qrLogo || (brand ? 'mark' : null),
    });
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
    // Scoped to actual text fields: a checkbox is also an <input> and also
    // carries data-qr-target (for data-qr-logo-toggle), so an unqualified
    // selector here would fire on every check/uncheck too, re-encoding the
    // QR as the checkbox's own "on" value instead of the real text/URL.
    if (e.target.type === 'checkbox' || e.target.type === 'radio') return;
    var t = e.target.closest('input[data-qr-target]');
    var q = t && target(t);
    if (q) render(q, t.value || ' ');
  });

  document.addEventListener('change', function (e) {
    var t = e.target.closest('[data-qr-level-select]');
    var q = t && target(t);
    if (q) render(q, q.dataset.qrText, t.value);
  });

  // <input type="checkbox" data-qr-logo-toggle data-qr-target="#id"> flips
  // data-qr-logo between "mark" and "none" and re-renders — lets a demo
  // show the forced-H behavior actually engaging/releasing, instead of a
  // level <select> that silently has no visible effect while a logo badge
  // is permanently on.
  document.addEventListener('change', function (e) {
    var t = e.target.closest('[data-qr-logo-toggle]');
    var q = t && target(t);
    if (q) {
      q.dataset.qrLogo = t.checked ? 'mark' : 'none';
      render(q, q.dataset.qrText);
    }
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
