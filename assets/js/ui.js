/* KarirKit UI helper — tiny, optional behaviours for static component markup.
   The CSS components work without it; this only adds interactivity.

   Dismiss:   <button data-ui-dismiss=".alert">          removes the closest matching ancestor
   Dropdown:  <button data-ui-dropdown> + next sibling .dropdown-menu (toggled via `hidden`)
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

  function closeDropdowns(except) {
    document.querySelectorAll('[data-ui-dropdown][aria-expanded="true"]').forEach(function (b) {
      var menu = b.nextElementSibling;
      if (menu === except) return;
      b.setAttribute('aria-expanded', 'false');
      if (menu) menu.classList.add('hidden');
    });
  }

  function selectTab(tab) {
    var root = tab.closest('[data-ui-tabs]');
    if (!root) return;
    root.querySelectorAll('[data-ui-tab]').forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.classList.toggle('tab-active', on);
      var panel = document.getElementById(t.getAttribute('data-ui-tab'));
      if (panel) panel.classList.toggle('hidden', !on);
    });
  }

  document.addEventListener('click', function (e) {
    var d = e.target.closest('[data-ui-dismiss]');
    if (d) return dismiss(d);

    var dd = e.target.closest('[data-ui-dropdown]');
    if (dd) {
      var menu = dd.nextElementSibling;
      var open = dd.getAttribute('aria-expanded') !== 'true';
      closeDropdowns(open ? menu : null);
      dd.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (menu) menu.classList.toggle('hidden', !open);
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
