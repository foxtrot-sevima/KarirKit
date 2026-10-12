/* KarirKit UI helper — tiny, optional behaviours for static component markup.
   The CSS components work without it; this only adds interactivity.

   Dismiss:   <button data-ui-dismiss=".alert">          removes the closest matching ancestor
   Dropdown:  <button data-ui-dropdown> + next sibling .dropdown-menu (toggled via `hidden`)
              data-ui-dropdown-placement="top|right|bottom|left[-start|-end]"   menu side/alignment (default: bottom-end)
              data-ui-dropdown-offset-distance="8" · data-ui-dropdown-offset-skidding="20"   px
              data-ui-dropdown-trigger="hover" · data-ui-dropdown-delay="300"   open on hover, close after delay (ms)
              A trigger inside another .dropdown-menu opens a submenu and keeps its parent open.
   Collapse:  <button data-ui-collapse aria-controls="id" aria-expanded="false"> toggles #id via `hidden`
   Close:     <button data-ui-dropdown-close>            closes every open dropdown
   Tabs:      <div data-ui-tabs>
                <button role="tab" data-ui-tab="id" aria-selected="true|false">
                <div role="tabpanel" id="id" class="hidden?">  */
(function () {
  function dismiss(btn) {
    var target = btn.closest(btn.getAttribute('data-ui-dismiss') || '.alert');
    if (!target) return;
    target.classList.add('alert-leaving');
    setTimeout(function () { target.remove(); }, 200);
  }

  // apply placement/offset from the trigger's data attributes onto its menu
  function place(trigger, menu) {
    var p = trigger.getAttribute('data-ui-dropdown-placement');
    if (p) menu.setAttribute('data-placement', p);
    var d = trigger.getAttribute('data-ui-dropdown-offset-distance');
    var k = trigger.getAttribute('data-ui-dropdown-offset-skidding');
    if (d != null) menu.style.setProperty('--dd-distance', parseFloat(d) + 'px');
    if (k != null) menu.style.setProperty('--dd-skidding', parseFloat(k) + 'px');
  }
  function setOpen(trigger, open) {
    var menu = trigger.nextElementSibling;
    if (open && menu) place(trigger, menu);
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (menu) menu.classList.toggle('hidden', !open);
  }

  function closeDropdowns(except) {
    document.querySelectorAll('[data-ui-dropdown][aria-expanded="true"]').forEach(function (b) {
      var menu = b.nextElementSibling;
      if (menu === except) return;
      // keep a parent menu open while one of its submenus is being used
      if (except && menu && menu.contains(except)) return;
      b.setAttribute('aria-expanded', 'false');
      if (menu) menu.classList.add('hidden');
    });
  }

  // hover triggers: open on enter, close after a delay once the pointer leaves the whole dropdown
  var hoverTimers = new WeakMap();
  document.addEventListener('mouseover', function (e) {
    var root = e.target.closest && e.target.closest('.dropdown');
    var t = root && root.querySelector('[data-ui-dropdown-trigger="hover"]');
    if (!t) return;
    clearTimeout(hoverTimers.get(t));
    if (t.getAttribute('aria-expanded') !== 'true') setOpen(t, true);
  });
  document.addEventListener('mouseout', function (e) {
    var root = e.target.closest && e.target.closest('.dropdown');
    if (!root || root.contains(e.relatedTarget)) return;
    var t = root.querySelector('[data-ui-dropdown-trigger="hover"]');
    if (!t) return;
    var delay = parseInt(t.getAttribute('data-ui-dropdown-delay'), 10);
    hoverTimers.set(t, setTimeout(function () { setOpen(t, false); }, isNaN(delay) ? 300 : delay));
  });

  function selectTab(tab) {
    var root = tab.closest('[data-ui-tabs]');
    if (!root) return;
    root.querySelectorAll('[data-ui-tab]').forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      if (t.classList.contains('tab')) t.classList.toggle('tab-active', on);
      var panel = document.getElementById(t.getAttribute('data-ui-tab'));
      if (panel) panel.classList.toggle('hidden', !on);
    });
  }

  document.addEventListener('click', function (e) {
    var d = e.target.closest('[data-ui-dismiss]');
    if (d) return dismiss(d);

    if (e.target.closest('[data-ui-dropdown-close]')) return closeDropdowns(null);

    var col = e.target.closest('[data-ui-collapse]');
    if (col) {
      var panel = document.getElementById(col.getAttribute('aria-controls'));
      var show = col.getAttribute('aria-expanded') !== 'true';
      col.setAttribute('aria-expanded', show ? 'true' : 'false');
      if (panel) panel.classList.toggle('hidden', !show);
      var chev = col.querySelector('i:last-child');
      if (chev) chev.classList.toggle('rotate-180', show);
      return;
    }

    var dd = e.target.closest('[data-ui-dropdown]');
    if (dd) {
      var menu = dd.nextElementSibling;
      var open = dd.getAttribute('aria-expanded') !== 'true';
      closeDropdowns(open ? menu : null);
      setOpen(dd, open);
      return;
    }
    if (!e.target.closest('.dropdown-menu')) closeDropdowns(null);

    var tab = e.target.closest('[data-ui-tab]');
    if (tab) selectTab(tab);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDropdowns(null);
  });

  window.KKUi = { dismiss: dismiss, selectTab: selectTab };
})();
