/* ============================================================================
   KarirKit — Drawer behaviour (dependency-free)

   Markup:     <div class="drawer drawer-left" id="my-drawer"> <div class="drawer-header">…</div> <div class="drawer-body">…</div> </div>
   Triggers:   <button data-drawer-toggle="my-drawer">   toggle   (data-drawer-show = open, data-drawer-target is an alias of show)
               <button data-drawer-hide="my-drawer">     close     (empty value = nearest drawer)
               The id may be written with or without a leading "#".
   Per drawer: data-drawer-placement="left|right|top|bottom"   overrides the placement class
               data-drawer-backdrop="false"    no backdrop (page stays usable); "static" = a click on the backdrop does not close
               data-drawer-body-scrolling="true"   keep the page scrollable while open (default: locked when there is a backdrop)
               data-drawer-keyboard="false"    Escape does NOT close it
   Edge:       .drawer-edge keeps a strip visible while closed (bottom sheet); its handle is a data-drawer-toggle button
   Events:     drawer:show / drawer:hide (bubble from the drawer, detail.trigger = opening trigger)
   API:        KKDrawer.open(elOrId, { trigger }), .close(el), .toggle(el), .closeAll(), .isOpen(el)

   Handles for you: .is-open state, role="dialog" (+ aria-modal with a backdrop), aria-labelledby from .drawer-title,
   backdrop (created on demand), Escape (topmost drawer), focus moved into the drawer and returned to the trigger,
   Tab kept inside while a backdrop is shown, body scroll lock.
   ============================================================================ */
(function () {
  'use strict';

  var PLACEMENT_RE = /(^|\s)drawer-(left|right|top|bottom)(?=\s|$)/g;
  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  var stack = [];
  var uid = 0;

  function resolve(ref) {
    if (!ref) return null;
    if (ref.nodeType === 1) return ref;
    return document.getElementById(String(ref).replace(/^#/, ''));
  }
  function isOpen(d) { d = resolve(d); return !!d && d.classList.contains('is-open'); }
  function hasBackdrop(d) { return d.getAttribute('data-drawer-backdrop') !== 'false'; }

  function ensureA11y(d) {
    if (!d.hasAttribute('role')) d.setAttribute('role', 'dialog');
    if (hasBackdrop(d)) d.setAttribute('aria-modal', 'true'); else d.removeAttribute('aria-modal');
    if (!d.hasAttribute('aria-labelledby') && !d.hasAttribute('aria-label')) {
      var title = d.querySelector('.drawer-title');
      if (title) { if (!title.id) title.id = 'kk-drawer-title-' + (++uid); d.setAttribute('aria-labelledby', title.id); }
    }
    if (!d.hasAttribute('tabindex')) d.setAttribute('tabindex', '-1');
  }

  function lockScroll() {
    if (document.body.hasAttribute('data-drawer-lock')) return;
    var gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.setAttribute('data-drawer-lock', document.body.style.paddingRight || '');
    document.body.classList.add('overflow-hidden');
    if (gap > 0) document.body.style.paddingRight = gap + 'px';
  }
  function unlockScroll() {
    if (!document.body.hasAttribute('data-drawer-lock')) return;
    document.body.style.paddingRight = document.body.getAttribute('data-drawer-lock');
    document.body.removeAttribute('data-drawer-lock');
    if (!document.body.hasAttribute('data-modal-lock')) document.body.classList.remove('overflow-hidden');
  }
  function scrollLocked() {
    return stack.some(function (d) { return hasBackdrop(d) && d.getAttribute('data-drawer-body-scrolling') !== 'true'; });
  }

  function showBackdrop(d) {
    if (!hasBackdrop(d)) return;
    var b = document.createElement('div');
    b.className = 'drawer-backdrop';
    b.setAttribute('aria-hidden', 'true');
    document.body.appendChild(b);
    d._kkBackdrop = b;
    window.requestAnimationFrame(function () { b.classList.add('is-open'); });
    b.addEventListener('click', function () {
      if (d.getAttribute('data-drawer-backdrop') === 'static') return;
      close(d);
    });
  }
  function hideBackdrop(d) {
    var b = d._kkBackdrop; d._kkBackdrop = null;
    if (!b) return;
    b.classList.remove('is-open');
    setTimeout(function () { b.remove(); }, 250);
  }

  function open(ref, opts) {
    var d = resolve(ref); opts = opts || {};
    if (!d || isOpen(d)) return d;
    ensureA11y(d);
    var placement = d.getAttribute('data-drawer-placement');
    if (placement) {
      d.className = d.className.replace(PLACEMENT_RE, ' ').replace(/\s+/g, ' ').trim();
      d.classList.add('drawer-' + placement);
    }
    d._kkReturnFocus = opts.trigger || document.activeElement;
    d.classList.add('is-open');
    stack.push(d);
    showBackdrop(d);
    if (scrollLocked()) lockScroll();
    window.requestAnimationFrame(function () { try { d.focus({ preventScroll: true }); } catch (e) { /* ignore */ } });
    d.dispatchEvent(new CustomEvent('drawer:show', { bubbles: true, detail: { trigger: opts.trigger || null } }));
    return d;
  }

  function close(ref) {
    var d = resolve(ref);
    if (!d || !isOpen(d)) return d;
    d.classList.remove('is-open');
    var i = stack.indexOf(d); if (i > -1) stack.splice(i, 1);
    hideBackdrop(d);
    if (!scrollLocked()) unlockScroll();
    var back = d._kkReturnFocus; d._kkReturnFocus = null;
    if (back && typeof back.focus === 'function' && document.contains(back)) { try { back.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
    d.dispatchEvent(new CustomEvent('drawer:hide', { bubbles: true }));
    return d;
  }

  function toggle(ref, opts) { return isOpen(ref) ? close(ref) : open(ref, opts); }
  function closeAll() { stack.slice().forEach(close); }

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-drawer-toggle],[data-drawer-show],[data-drawer-hide],[data-drawer-target]');
    if (!t) return;
    if (t.hasAttribute('data-drawer-hide')) {
      e.preventDefault();
      var id = t.getAttribute('data-drawer-hide');
      return close(id ? resolve(id) : t.closest('.drawer'));
    }
    var toggleId = t.getAttribute('data-drawer-toggle');
    var showId = t.getAttribute('data-drawer-show') || t.getAttribute('data-drawer-target');
    if (toggleId) { e.preventDefault(); toggle(toggleId, { trigger: t }); }
    else if (showId) { e.preventDefault(); open(showId, { trigger: t }); }
  });

  document.addEventListener('keydown', function (e) {
    var top = stack[stack.length - 1];
    if (!top) return;
    if (e.key === 'Escape') {
      if (top.getAttribute('data-drawer-keyboard') === 'false') return;
      e.preventDefault();
      return close(top);
    }
    if (e.key !== 'Tab' || !hasBackdrop(top)) return;
    var items = Array.prototype.filter.call(top.querySelectorAll(FOCUSABLE), function (el) { return el.offsetParent !== null || el === document.activeElement; });
    if (!items.length) { e.preventDefault(); return top.focus(); }
    var first = items[0], last = items[items.length - 1], active = document.activeElement;
    if (e.shiftKey && (active === first || active === top)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
  });

  window.KKDrawer = { open: open, close: close, toggle: toggle, closeAll: closeAll, isOpen: isOpen };
})();
