/* ============================================================================
   KarirKit — Clipboard (dependency-free)

   Markup:   <button data-clipboard-target="#npm-install"> ... </button>
   Source:   data-clipboard-target="#id | selector"   element whose content is copied
             data-clipboard-text="literal text"       copy a fixed string instead ("@url" = current page URL)
             data-clipboard-type="input|text|html"    what to read from the target
                                                        input  value of an <input>/<textarea> (default for those)
                                                        text   visible text, one line per row (default otherwise)
                                                        html   innerHTML with HTML entities decoded (code blocks)
   Feedback: inside the trigger, [data-clipboard-default] is hidden and [data-clipboard-success] shown for
             data-clipboard-duration ms (default 2000). A sibling/child .tooltip-content switches to
             data-clipboard-tooltip-success (default "Tersalin!") and back.
             data-clipboard-toast="Tautan disalin."   also shows a toast (needs assets/js/toast.js)
   Events:   clipboard:copy  (bubbles from the trigger, detail: { text, trigger, target })
             clipboard:error (bubbles from the trigger, detail: { trigger, target })
   API:      KKClipboard.copy(text) -> Promise · KKClipboard.read(target, type) -> string
   ============================================================================ */
(function () {
  'use strict';

  var DURATION = 2000;
  var live;

  function resolve(ref) {
    if (!ref) return null;
    try { return document.querySelector(ref); } catch (e) { return document.getElementById(ref); }
  }

  function decode(html) {
    var t = document.createElement('textarea');
    t.innerHTML = html;
    return t.value;
  }

  function read(target, type) {
    if (!target) return '';
    var isField = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT';
    type = type || (isField ? 'input' : 'text');
    if (type === 'input') return target.value;
    if (type === 'html') return decode(target.innerHTML).replace(/\r\n?/g, '\n');
    // innerText keeps block elements on their own lines
    var raw = (target.innerText || target.textContent).replace(/\r\n?/g, '\n');
    return raw.split('\n').map(function (l) { return l.replace(/\s+/g, ' ').trim(); }).filter(Boolean).join('\n');
  }

  function legacyCopy(text) {
    return new Promise(function (resolveCopy, reject) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { /* fall through */ }
      ta.remove();
      ok ? resolveCopy() : reject(new Error('copy failed'));
    });
  }

  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function () { return legacyCopy(text); });
    }
    return legacyCopy(text);
  }

  function announce(message) {
    if (!live) {
      live = document.createElement('span');
      live.className = 'sr-only';
      live.setAttribute('role', 'status');
      live.setAttribute('aria-live', 'polite');
      document.body.appendChild(live);
    }
    live.textContent = '';
    setTimeout(function () { live.textContent = message; }, 20);
  }

  function tooltipOf(trigger) {
    return trigger.querySelector('.tooltip-content') ||
      (trigger.parentElement && trigger.parentElement.querySelector('.tooltip-content'));
  }

  // The hidden attribute (display:none !important in the base styles) cannot be beaten by a display
  // utility such as inline-flex on the same element, unlike the .hidden class alone.
  function show(el, on) {
    el.hidden = !on;
    el.classList.toggle('hidden', !on);
  }

  function flash(trigger) {
    var d = trigger.querySelector('[data-clipboard-default]');
    var ok = trigger.querySelector('[data-clipboard-success]');
    var tip = tooltipOf(trigger);
    var message = trigger.getAttribute('data-clipboard-tooltip-success') || 'Tersalin!';
    if (d) show(d, false);
    if (ok) show(ok, true);
    if (tip) {
      if (tip.dataset.clipboardOrig == null) tip.dataset.clipboardOrig = tip.textContent;
      tip.textContent = message;
    }
    announce(message);
    clearTimeout(trigger._kkClipboardTimer);
    trigger._kkClipboardTimer = setTimeout(function () {
      if (d) show(d, true);
      if (ok) show(ok, false);
      if (tip && tip.dataset.clipboardOrig != null) tip.textContent = tip.dataset.clipboardOrig;
    }, parseInt(trigger.getAttribute('data-clipboard-duration'), 10) || DURATION);
  }

  function toast(type, message) {
    if (window.KKToast && message) window.KKToast.show({ type: type, message: message, duration: 3500 });
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-clipboard-target], [data-clipboard-text]');
    if (!trigger) return;
    var target = resolve(trigger.getAttribute('data-clipboard-target'));
    var literal = trigger.getAttribute('data-clipboard-text');
    var text = literal != null ? (literal === '@url' ? location.href : literal) : read(target, trigger.getAttribute('data-clipboard-type'));
    copy(text).then(function () {
      flash(trigger);
      toast('success', trigger.getAttribute('data-clipboard-toast'));
      trigger.dispatchEvent(new CustomEvent('clipboard:copy', { bubbles: true, detail: { text: text, trigger: trigger, target: target } }));
    }, function () {
      toast('danger', 'Gagal menyalin.');
      trigger.dispatchEvent(new CustomEvent('clipboard:error', { bubbles: true, detail: { trigger: trigger, target: target } }));
    });
  });

  // success parts start hidden even when they also carry a display utility
  function init(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll('[data-clipboard-success]'), function (el) {
      if (el.classList.contains('hidden')) el.hidden = true;
    });
  }
  init();
  document.addEventListener('DOMContentLoaded', function () { init(); });
  if (window.MutationObserver) new MutationObserver(function () { init(); }).observe(document.documentElement, { childList: true, subtree: true });

  window.KKClipboard = { copy: copy, read: read };
})();
