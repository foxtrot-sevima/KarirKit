/* ============================================================================
   KarirKit — Modal behaviour (dependency-free)

   Markup:     <div class="modal-backdrop" id="my-modal"> <div class="modal-panel modal-md"> ... </div> </div>
   Triggers:   <button data-modal-toggle="my-modal">   toggle (opens when closed, closes when open)
               <button data-modal-show="my-modal">     open        (data-modal-target / data-modal-trigger are aliases)
               <button data-modal-hide="my-modal">     close       (empty value / data-modal-close = nearest modal)
               The id may be written with or without a leading "#".
   Per trigger: data-modal-placement="top-left|top-center|top-right|center-left|center|center-right|
                                       bottom-left|bottom-center|bottom-right"   (sets the placement for that open)
   Per modal:  data-modal-backdrop="static"   a click on the backdrop does NOT close it
               data-modal-keyboard="false"    Escape does NOT close it
   Events:     modal:show / modal:hide (bubble from the modal element, detail.trigger = opening trigger)
   API:        KKModal.open(elOrSelector, { trigger, placement }), .close(el), .toggle(el), .closeAll(), .isOpen(el)

   Handles for you: .is-open state, role="dialog" + aria-modal + aria-labelledby,
   body scroll lock, Escape (topmost modal only), backdrop click (press AND release
   on the backdrop), focus moved into the modal, Tab kept inside, focus returned to
   the trigger on close.
   ============================================================================ */
(function () {
  'use strict';

  var PLACEMENT_RE = /(^|\s)modal-((top|center|bottom)-(left|center|right)|center)(?=\s|$)/g;
  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  var stack = []; // open modals, topmost last
  var uid = 0;

  function resolve(ref) {
    if (!ref) return null;
    if (ref.nodeType === 1) return ref;
    return document.getElementById(String(ref).replace(/^#/, ''));
  }
  function panelOf(modal) { return modal.querySelector('.modal-panel') || modal; }
  function focusables(modal) {
    return Array.prototype.filter.call(panelOf(modal).querySelectorAll(FOCUSABLE), function (el) { return el.offsetParent !== null || el === document.activeElement; });
  }
  function isOpen(modal) { modal = resolve(modal); return !!modal && modal.classList.contains('is-open'); }

  function ensureA11y(modal) {
    if (!modal.hasAttribute('role')) modal.setAttribute('role', 'dialog');
    if (!modal.hasAttribute('aria-modal')) modal.setAttribute('aria-modal', 'true');
    if (!modal.hasAttribute('aria-labelledby') && !modal.hasAttribute('aria-label')) {
      var title = modal.querySelector('.modal-title');
      if (title) { if (!title.id) title.id = 'kk-modal-title-' + (++uid); modal.setAttribute('aria-labelledby', title.id); }
    }
    var panel = panelOf(modal);
    if (panel !== modal && !panel.hasAttribute('tabindex')) panel.setAttribute('tabindex', '-1');
  }

  function lockScroll() {
    if (document.body.hasAttribute('data-modal-lock')) return;
    var gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.setAttribute('data-modal-lock', document.body.style.paddingRight || '');
    document.body.classList.add('overflow-hidden');
    if (gap > 0) document.body.style.paddingRight = gap + 'px';
  }
  function unlockScroll() {
    if (!document.body.hasAttribute('data-modal-lock')) return;
    document.body.style.paddingRight = document.body.getAttribute('data-modal-lock');
    document.body.removeAttribute('data-modal-lock');
    document.body.classList.remove('overflow-hidden');
  }

  function open(ref, opts) {
    var modal = resolve(ref); opts = opts || {};
    if (!modal || isOpen(modal)) return modal;
    ensureA11y(modal);
    if (opts.placement) {
      modal.className = modal.className.replace(PLACEMENT_RE, ' ').replace(/\s+/g, ' ').trim();
      modal.classList.add('modal-' + opts.placement);
    }
    modal._kkReturnFocus = opts.trigger || document.activeElement;
    modal.classList.add('is-open');
    stack.push(modal);
    lockScroll();
    var target = modal.querySelector('[autofocus], [data-modal-autofocus]') || panelOf(modal);
    // wait a frame so the element is visible (visibility transition) before focusing
    window.requestAnimationFrame(function () { try { target.focus({ preventScroll: true }); } catch (e) { /* ignore */ } });
    modal.dispatchEvent(new CustomEvent('modal:show', { bubbles: true, detail: { trigger: opts.trigger || null } }));
    return modal;
  }

  function close(ref) {
    var modal = resolve(ref);
    if (!modal || !isOpen(modal)) return modal;
    modal.classList.remove('is-open');
    var i = stack.indexOf(modal); if (i > -1) stack.splice(i, 1);
    if (!stack.length) unlockScroll();
    var back = modal._kkReturnFocus; modal._kkReturnFocus = null;
    if (back && typeof back.focus === 'function' && document.contains(back)) { try { back.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
    modal.dispatchEvent(new CustomEvent('modal:hide', { bubbles: true }));
    return modal;
  }

  function toggle(ref, opts) { return isOpen(ref) ? close(ref) : open(ref, opts); }
  function closeAll() { stack.slice().forEach(close); }

  /* ----------------------------------------------------------- triggers */
  var TRIGGERS = '[data-modal-toggle],[data-modal-show],[data-modal-hide],[data-modal-close],[data-modal-target],[data-modal-trigger]';
  document.addEventListener('click', function (e) {
    var t = e.target.closest(TRIGGERS);
    if (!t) return;
    var hide = t.hasAttribute('data-modal-hide') ? t.getAttribute('data-modal-hide') : t.hasAttribute('data-modal-close') ? t.getAttribute('data-modal-close') : null;
    if (hide !== null) {
      e.preventDefault();
      return close(hide ? resolve(hide) : t.closest('.modal-backdrop'));
    }
    var toggleId = t.getAttribute('data-modal-toggle');
    var showId = t.getAttribute('data-modal-show') || t.getAttribute('data-modal-target') || t.getAttribute('data-modal-trigger');
    var opts = { trigger: t, placement: t.getAttribute('data-modal-placement') || '' };
    if (toggleId) { e.preventDefault(); toggle(toggleId, opts); }
    else if (showId) { e.preventDefault(); open(showId, opts); }
  });

  /* ------------------------------------------------------- backdrop click */
  var downOnBackdrop = null;
  document.addEventListener('mousedown', function (e) {
    downOnBackdrop = e.target.classList && e.target.classList.contains('modal-backdrop') ? e.target : null;
  });
  document.addEventListener('click', function (e) {
    var m = e.target;
    if (!m.classList || !m.classList.contains('modal-backdrop') || m !== downOnBackdrop) return;
    downOnBackdrop = null;
    if (!isOpen(m) || stack[stack.length - 1] !== m || m.getAttribute('data-modal-backdrop') === 'static') return;
    close(m);
  });

  /* -------------------------------------------------- Escape + Tab trap */
  document.addEventListener('keydown', function (e) {
    var top = stack[stack.length - 1];
    if (!top) return;
    if (e.key === 'Escape') {
      if (top.getAttribute('data-modal-keyboard') === 'false') return;
      e.preventDefault();
      return close(top);
    }
    if (e.key !== 'Tab') return;
    var items = focusables(top), panel = panelOf(top);
    if (!items.length) { e.preventDefault(); return panel.focus(); }
    var first = items[0], last = items[items.length - 1], active = document.activeElement;
    if (e.shiftKey && (active === first || active === panel)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
    else if (!top.contains(active)) { e.preventDefault(); first.focus(); }
  });

  window.KKModal = { open: open, close: close, toggle: toggle, closeAll: closeAll, isOpen: isOpen };
})();
