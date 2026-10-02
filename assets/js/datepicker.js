/* ============================================================================
   KarirKit — Datepicker (dependency-free)

   Popup:   <div class="datepicker">
              <i class="kk kk-calendar-blank datepicker-icon h-4 w-4"></i>
              <input type="text" class="input" placeholder="dd/mm/yyyy" data-datepicker />
            </div>
   Inline:  <div data-datepicker-inline data-date="2026-10-08" data-datepicker-output="#out"></div>
   Range:   <div class="datepicker-range" data-daterangepicker>
              <div class="datepicker"> icon + <input class="input" /> </div>
              <span class="datepicker-range-sep">sampai</span>
              <div class="datepicker"> icon + <input class="input" /> </div>
            </div>
            (add data-datepicker-inline data-datepicker-range to a plain <div> for an always-visible range)

   Options (data attributes, on the input / inline div / range wrapper):
     data-datepicker-format="dd/mm/yyyy"   tokens: d dd m mm M (Jan) MM (Januari) yy yyyy
     data-datepicker-locale="id|en"        month/day names + button labels (default id)
     data-datepicker-week-start="0..6"     0 = Sunday (default), 1 = Monday
     data-datepicker-min / -max            yyyy-mm-dd, "today" or an offset in days such as "+30" / "-7"
     data-datepicker-disabled              comma separated yyyy-mm-dd dates that cannot be picked
     data-datepicker-disabled-days         comma separated weekday numbers (0 = Sunday), e.g. "0,6"
     data-datepicker-autohide="false"      keep the popup open after a pick (default: it closes)
     data-datepicker-buttons               footer with Today + Clear (range: Clear only)
     data-datepicker-title="Pilih tanggal" title row inside the calendar
     data-datepicker-orientation="top|bottom|left|right"  e.g. "top right" (default: opens below, flips when it does not fit)
     data-datepicker-autoselect-today      pre-fill today
     data-date="yyyy-mm-dd"                initial value (inputs may also carry a value in the chosen format)
     data-datepicker-output="#id"          inline only: element whose text mirrors the picked value

   Events (bubble from the input / inline div / range wrapper):
     datepicker:change      detail { date, value }
     daterangepicker:change detail { start, end }
   A pick in a popup also fires native input + change on the input.
   API: KKDatepicker.init(root?), KKDatepicker.get(el) -> { getDate(), setDate(d), show(), hide() }
        (range: getDates() -> { start, end }, setDates(start, end)),  KKDatepicker.format(date, fmt, locale), KKDatepicker.parse(text, fmt, locale)

   The calendar is generated here, positioned with position: fixed from the input's
   rectangle (so it is never clipped by overflow containers or modal bodies), and closes
   on Escape, outside click or Tab out. Day grid keys: arrows move, PageUp/PageDown change
   month (Shift = year), Home/End jump to the start/end of the week.
   ============================================================================ */
(function () {
  'use strict';

  var LOCALES = {
    id: {
      months: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
      short: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
      days: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
      today: 'Hari ini', clear: 'Hapus', prev: 'Sebelumnya', next: 'Berikutnya', label: 'Pilih tanggal', view: 'Ganti tampilan'
    },
    en: {
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      days: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      today: 'Today', clear: 'Clear', prev: 'Previous', next: 'Next', label: 'Choose date', view: 'Change view'
    }
  };
  var YEARS = 12;
  var TOKEN = /yyyy|yy|MM|M|mm|m|dd|d/g;

  /* ------------------------------------------------------------ date utils */
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function mk(y, m, d) { var x = new Date(y, m, d); x.setHours(0, 0, 0, 0); return x; }
  function startOfDay(d) { return mk(d.getFullYear(), d.getMonth(), d.getDate()); }
  function same(a, b) { return !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
  function iso(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function daysIn(y, m) { return new Date(y, m + 1, 0).getDate(); }
  function parseISO(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec((s || '').trim());
    if (!m) return null;
    var d = mk(+m[1], +m[2] - 1, +m[3]);
    return d.getMonth() === +m[2] - 1 && d.getDate() === +m[3] ? d : null;
  }
  function parseRel(s, today) {
    s = (s || '').trim();
    if (!s) return null;
    if (s === 'today') return today;
    if (/^[+-]\d+$/.test(s)) { var d = new Date(today); d.setDate(d.getDate() + parseInt(s, 10)); return startOfDay(d); }
    return parseISO(s);
  }
  function esc(s) { return s.replace(/[.*+?^${}()|[\]\\\/-]/g, '\\$&'); }

  function format(d, fmt, loc) {
    loc = loc || LOCALES.id;
    return fmt.replace(TOKEN, function (t) {
      switch (t) {
        case 'yyyy': return '' + d.getFullYear();
        case 'yy': return ('' + d.getFullYear()).slice(-2);
        case 'MM': return loc.months[d.getMonth()];
        case 'M': return loc.short[d.getMonth()];
        case 'mm': return pad(d.getMonth() + 1);
        case 'm': return '' + (d.getMonth() + 1);
        case 'dd': return pad(d.getDate());
        default: return '' + d.getDate();
      }
    });
  }

  // Strict parse in the given format; rolled-over dates (31/02/2026) are rejected, not corrected.
  function parse(text, fmt, loc) {
    loc = loc || LOCALES.id;
    text = (text || '').trim();
    if (!text) return null;
    var tokens = [], re = '^', last = 0, m;
    TOKEN.lastIndex = 0;
    while ((m = TOKEN.exec(fmt))) {
      var t = m[0];
      re += esc(fmt.slice(last, m.index));
      if (t === 'yyyy') re += '(\\d{4})';
      else if (t === 'yy') re += '(\\d{2})';
      else if (t === 'MM') re += '(' + loc.months.map(esc).join('|') + ')';
      else if (t === 'M') re += '(' + loc.short.map(esc).join('|') + ')';
      else re += '(\\d{1,2})';
      tokens.push(t);
      last = m.index + t.length;
    }
    re += esc(fmt.slice(last)) + '$';
    var hit = new RegExp(re, 'i').exec(text);
    if (!hit) return null;
    var y = null, mo = null, d = null;
    tokens.forEach(function (tk, i) {
      var v = hit[i + 1];
      if (tk === 'yyyy') y = +v;
      else if (tk === 'yy') y = 2000 + +v;
      else if (tk === 'MM' || tk === 'M') {
        var list = tk === 'MM' ? loc.months : loc.short;
        for (var k = 0; k < list.length; k++) if (list[k].toLowerCase() === v.toLowerCase()) mo = k;
      } else if (tk === 'mm' || tk === 'm') mo = +v - 1;
      else d = +v;
    });
    if (y === null || mo === null || d === null) return null;
    var out = mk(y, mo, d);
    return out.getFullYear() === y && out.getMonth() === mo && out.getDate() === d ? out : null;
  }

  /* --------------------------------------------------------------- options */
  function readOptions(el) {
    var today = startOfDay(new Date());
    function a(n) { return el.getAttribute('data-datepicker-' + n); }
    function list(n) { return (a(n) || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean); }
    return {
      today: today,
      format: a('format') || 'dd/mm/yyyy',
      loc: LOCALES[(a('locale') || 'id').toLowerCase()] || LOCALES.id,
      weekStart: (parseInt(a('week-start'), 10) || 0) % 7,
      min: parseRel(a('min'), today),
      max: parseRel(a('max'), today),
      disabledDates: list('disabled'),
      disabledDays: list('disabled-days').map(Number),
      autohide: a('autohide') !== 'false',
      buttons: el.hasAttribute('data-datepicker-buttons') && a('buttons') !== 'false',
      title: a('title') || '',
      orientation: (a('orientation') || '').toLowerCase(),
      autoselectToday: el.hasAttribute('data-datepicker-autoselect-today')
    };
  }
  function isDisabled(d, o) {
    if (o.min && d < o.min) return true;
    if (o.max && d > o.max) return true;
    if (o.disabledDays.indexOf(d.getDay()) > -1) return true;
    return o.disabledDates.indexOf(iso(d)) > -1;
  }
  function rangeBlocked(from, to, o) { // whole span outside min/max (used by month / year cells)
    return (o.min && to < o.min) || (o.max && from > o.max);
  }

  /* -------------------------------------------------------------- calendar */
  // Builds the calendar panel and owns its view state. Selection lives in the
  // wrappers below; they push it in with setSelected()/setRange() and receive
  // clicks through the callbacks.
  function Calendar(o, cb, range) {
    var st = { mode: 'days', year: o.today.getFullYear(), month: o.today.getMonth(), yearStart: 0, focus: o.today, sel: null, start: null, end: null, hover: null };
    var el = document.createElement('div');
    el.className = 'datepicker-panel' + (range ? ' datepicker-range-mode' : '');
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', o.title || o.loc.label);
    el.innerHTML =
      '<div class="datepicker-title" data-dp-title hidden></div>' +
      '<div class="date-cal-header">' +
        '<button type="button" class="date-cal-nav-btn" data-dp-prev><i class="kk kk-caret-left h-4 w-4"></i></button>' +
        '<button type="button" class="date-cal-title-btn" data-dp-view aria-live="polite"></button>' +
        '<button type="button" class="date-cal-nav-btn" data-dp-next><i class="kk kk-caret-right h-4 w-4"></i></button>' +
      '</div>' +
      '<div class="date-cal-weekdays" data-dp-weekdays></div>' +
      '<div class="date-cal-grid" data-dp-grid></div>' +
      '<div class="date-cal-footer" data-dp-footer hidden>' +
        '<button type="button" class="date-cal-today-btn" data-dp-today></button>' +
        '<button type="button" class="date-cal-clear-btn" data-dp-clear></button>' +
      '</div>';
    var q = function (s) { return el.querySelector(s); };
    var titleEl = q('[data-dp-title]'), viewBtn = q('[data-dp-view]'), prevBtn = q('[data-dp-prev]'), nextBtn = q('[data-dp-next]');
    var weekdaysEl = q('[data-dp-weekdays]'), gridEl = q('[data-dp-grid]'), footerEl = q('[data-dp-footer]');
    var todayBtn = q('[data-dp-today]'), clearBtn = q('[data-dp-clear]');

    if (o.title) { titleEl.textContent = o.title; titleEl.hidden = false; }
    prevBtn.setAttribute('aria-label', o.loc.prev);
    nextBtn.setAttribute('aria-label', o.loc.next);
    viewBtn.setAttribute('aria-label', o.loc.view);
    todayBtn.textContent = o.loc.today;
    clearBtn.textContent = o.loc.clear;
    footerEl.hidden = !o.buttons;
    if (range) todayBtn.hidden = true;
    weekdaysEl.innerHTML = o.loc.days.map(function (_, i) { return '<span>' + o.loc.days[(i + o.weekStart) % 7] + '</span>'; }).join('');

    function cell(text, cls, onClick) {
      var b = document.createElement('button');
      b.type = 'button'; b.textContent = text; b.className = cls;
      b.addEventListener('click', onClick);
      return b;
    }
    function selDates() { return range ? [st.start, st.end] : [st.sel]; }

    function paint() { // selection / range / hover states on the visible day buttons (cheap, no rebuild)
      if (st.mode !== 'days') return;
      var s = range ? st.start : st.sel, e = range ? st.end : null;
      var edge = range && s && (e || st.hover) ? (e || st.hover) : null;
      var lo = edge ? (edge < s ? edge : s) : null, hi = edge ? (edge < s ? s : edge) : null;
      Array.prototype.forEach.call(gridEl.children, function (b) {
        var d = parseISO(b.getAttribute('data-date'));
        var outside = b.classList.contains('is-outside');
        var picked = same(d, s) || same(d, e);
        b.classList.toggle('is-selected', picked);
        b.setAttribute('aria-pressed', picked ? 'true' : 'false');
        b.classList.toggle('is-in-range', !!lo && !outside && d > lo && d < hi);
        b.classList.toggle('is-range-start', !!lo && !outside && same(d, lo) && !same(lo, hi));
        b.classList.toggle('is-range-end', !!lo && !outside && same(d, hi) && !same(lo, hi));
      });
    }

    function renderDays() {
      gridEl.className = 'date-cal-grid';
      var offset = (new Date(st.year, st.month, 1).getDay() - o.weekStart + 7) % 7;
      for (var i = 0; i < 42; i++) {
        var d = mk(st.year, st.month, 1 - offset + i);
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'date-cal-day';
        b.textContent = d.getDate();
        b.setAttribute('data-date', iso(d));
        b.setAttribute('aria-label', d.getDate() + ' ' + o.loc.months[d.getMonth()] + ' ' + d.getFullYear());
        b.tabIndex = same(d, st.focus) ? 0 : -1;
        if (d.getMonth() !== st.month) b.classList.add('is-outside');
        if (same(d, o.today)) { b.classList.add('is-today'); b.setAttribute('aria-current', 'date'); }
        if (isDisabled(d, o)) { b.classList.add('is-disabled'); b.setAttribute('aria-disabled', 'true'); }
        gridEl.appendChild(b);
      }
      paint();
    }
    function renderMonths() {
      gridEl.className = 'date-cal-grid-cells';
      o.loc.short.forEach(function (name, i) {
        var blocked = rangeBlocked(mk(st.year, i, 1), mk(st.year, i, daysIn(st.year, i)), o);
        var on = selDates().some(function (d) { return d && d.getFullYear() === st.year && d.getMonth() === i; });
        var b = cell(name, 'date-cal-cell' + (on ? ' is-selected' : '') + (st.year === o.today.getFullYear() && i === o.today.getMonth() ? ' is-today' : '') + (blocked ? ' is-disabled' : ''), function () {
          if (blocked) return;
          st.month = i; st.mode = 'days'; st.focus = mk(st.year, i, Math.min(st.focus.getDate(), daysIn(st.year, i))); render();
        });
        b.setAttribute('aria-label', o.loc.months[i] + ' ' + st.year);
        gridEl.appendChild(b);
      });
    }
    function renderYears() {
      gridEl.className = 'date-cal-grid-cells';
      for (var y = st.yearStart; y < st.yearStart + YEARS; y++) {
        (function (yy) {
          var blocked = rangeBlocked(mk(yy, 0, 1), mk(yy, 11, 31), o);
          var on = selDates().some(function (d) { return d && d.getFullYear() === yy; });
          gridEl.appendChild(cell(yy, 'date-cal-cell' + (on ? ' is-selected' : '') + (yy === o.today.getFullYear() ? ' is-today' : '') + (blocked ? ' is-disabled' : ''), function () {
            if (blocked) return;
            st.year = yy; st.mode = 'months'; render();
          }));
        })(y);
      }
    }
    function navLimits() { // prev/next disabled once the neighbouring page is fully outside min/max
      var prev = false, next = false;
      if (st.mode === 'days') {
        prev = !!o.min && mk(st.year, st.month, 0) < o.min;
        next = !!o.max && mk(st.year, st.month + 1, 1) > o.max;
      } else if (st.mode === 'months') {
        prev = !!o.min && mk(st.year - 1, 11, 31) < o.min;
        next = !!o.max && mk(st.year + 1, 0, 1) > o.max;
      } else {
        prev = !!o.min && mk(st.yearStart - 1, 11, 31) < o.min;
        next = !!o.max && mk(st.yearStart + YEARS, 0, 1) > o.max;
      }
      prevBtn.disabled = prev; nextBtn.disabled = next;
    }
    function render() {
      gridEl.innerHTML = '';
      weekdaysEl.hidden = st.mode !== 'days';
      if (st.mode === 'days') { viewBtn.textContent = o.loc.months[st.month] + ' ' + st.year; renderDays(); }
      else if (st.mode === 'months') { viewBtn.textContent = '' + st.year; renderMonths(); }
      else { viewBtn.textContent = st.yearStart + ' - ' + (st.yearStart + YEARS - 1); renderYears(); }
      navLimits();
    }

    function step(dir) {
      if (st.mode === 'days') {
        var m = st.month + dir; st.year += Math.floor(m / 12); st.month = ((m % 12) + 12) % 12;
        st.focus = mk(st.year, st.month, Math.min(st.focus.getDate(), daysIn(st.year, st.month)));
      } else if (st.mode === 'months') st.year += dir;
      else st.yearStart += dir * YEARS;
      render();
    }
    function focusDay() {
      var b = gridEl.querySelector('[data-date="' + iso(st.focus) + '"]');
      if (b) b.focus();
    }
    function moveFocus(d) {
      st.focus = d; st.year = d.getFullYear(); st.month = d.getMonth(); st.mode = 'days';
      render(); focusDay();
    }

    el.addEventListener('click', function (e) {
      if (e.target.closest('[data-dp-prev]')) step(-1);
      else if (e.target.closest('[data-dp-next]')) step(1);
      else if (e.target.closest('[data-dp-view]')) {
        if (st.mode === 'days') st.mode = 'months';
        else if (st.mode === 'months') { st.mode = 'years'; st.yearStart = st.year - Math.floor(YEARS / 2); }
        render();
      } else if (e.target.closest('[data-dp-today]')) cb.today();
      else if (e.target.closest('[data-dp-clear]')) cb.clear();
      else {
        var b = e.target.closest('.date-cal-day');
        if (b && b.getAttribute('aria-disabled') !== 'true') cb.pick(parseISO(b.getAttribute('data-date')));
      }
    });
    if (range) {
      el.addEventListener('mouseover', function (e) {
        var b = e.target.closest('.date-cal-day');
        if (!b || !st.start || st.end) return;
        st.hover = parseISO(b.getAttribute('data-date')); paint();
      });
      el.addEventListener('mouseleave', function () { if (st.hover) { st.hover = null; paint(); } });
    }
    el.addEventListener('keydown', function (e) {
      var b = e.target.closest && e.target.closest('.date-cal-day');
      if (!b) return;
      var d = parseISO(b.getAttribute('data-date')), n = null;
      switch (e.key) {
        case 'ArrowLeft': n = mk(d.getFullYear(), d.getMonth(), d.getDate() - 1); break;
        case 'ArrowRight': n = mk(d.getFullYear(), d.getMonth(), d.getDate() + 1); break;
        case 'ArrowUp': n = mk(d.getFullYear(), d.getMonth(), d.getDate() - 7); break;
        case 'ArrowDown': n = mk(d.getFullYear(), d.getMonth(), d.getDate() + 7); break;
        case 'Home': n = mk(d.getFullYear(), d.getMonth(), d.getDate() - ((d.getDay() - o.weekStart + 7) % 7)); break;
        case 'End': n = mk(d.getFullYear(), d.getMonth(), d.getDate() + 6 - ((d.getDay() - o.weekStart + 7) % 7)); break;
        case 'PageUp': case 'PageDown':
          var delta = (e.key === 'PageUp' ? -1 : 1) * (e.shiftKey ? 12 : 1), tm = d.getMonth() + delta;
          var ty = d.getFullYear() + Math.floor(tm / 12), tmo = ((tm % 12) + 12) % 12;
          n = mk(ty, tmo, Math.min(d.getDate(), daysIn(ty, tmo)));
          break;
      }
      if (n) { e.preventDefault(); moveFocus(n); }
    });

    render();
    return {
      el: el,
      render: render,
      paint: paint,
      setSelected: function (d) {
        if (!d && !st.sel) return;
        if (d && same(st.sel, d) && st.mode === 'days' && st.year === d.getFullYear() && st.month === d.getMonth()) return;
        st.sel = d; if (d) this.view(d); else render();
      },
      setRange: function (s, e) { st.start = s; st.end = e; st.hover = null; var t = s || e; if (t) this.view(t); else render(); },
      view: function (d) { st.year = d.getFullYear(); st.month = d.getMonth(); st.focus = d; st.mode = 'days'; render(); },
      reset: function () { st.mode = 'days'; st.hover = null; var t = (range ? (st.start || st.end) : st.sel) || o.today; st.year = t.getFullYear(); st.month = t.getMonth(); st.focus = t; render(); },
      focusDay: focusDay
    };
  }

  /* ------------------------------------------------- popup placement + dismiss */
  function Popup(panel, anchorFn, container, o, onHide) {
    var open = false;
    function place() {
      var anchor = anchorFn(), r = anchor.getBoundingClientRect();
      var pw = panel.offsetWidth, ph = panel.offsetHeight, vw = document.documentElement.clientWidth, vh = window.innerHeight, gap = 6;
      var below = vh - r.bottom, above = r.top;
      var v = /top/.test(o.orientation) ? 'top' : /bottom/.test(o.orientation) ? 'bottom' : (below >= ph + gap || below >= above ? 'bottom' : 'top');
      var h = /right/.test(o.orientation) ? 'right' : /left/.test(o.orientation) ? 'left' : (r.left + pw > vw - 8 ? 'right' : 'left');
      var left = h === 'right' ? r.right - pw : r.left;
      var top = v === 'bottom' ? r.bottom + gap : r.top - gap - ph;
      panel.style.left = Math.max(8, Math.min(left, vw - pw - 8)) + 'px';
      panel.style.top = Math.max(8, top) + 'px';
    }
    function onDocDown(e) { if (!container.contains(e.target)) hide(); }
    function show() {
      if (open) { place(); return; }
      open = true;
      panel.hidden = false;
      place();
      document.addEventListener('pointerdown', onDocDown, true);
      window.addEventListener('resize', place);
      window.addEventListener('scroll', place, true);
    }
    function hide() {
      if (!open) return;
      open = false;
      panel.hidden = true;
      document.removeEventListener('pointerdown', onDocDown, true);
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
      if (onHide) onHide();
    }
    return { show: show, hide: hide, place: place, isOpen: function () { return open; } };
  }

  function fire(el, name, detail) { el.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail })); }
  function nativeChange(input) {
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  /* ----------------------------------------------------------- single popup */
  function initInput(input) {
    if (input._kkDatepicker) return;
    var o = readOptions(input), selected = null, suppress = false;
    var holder = input.closest('.datepicker') || input.parentElement;
    var cal = Calendar(o, { pick: pick, today: function () { pick(o.today); }, clear: clear }, false);
    var panel = cal.el;
    panel.hidden = true;
    input.insertAdjacentElement('afterend', panel);
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('aria-haspopup', 'dialog');
    input.setAttribute('aria-expanded', 'false');
    var popup = Popup(panel, function () { return input; }, holder, o, function () { input.setAttribute('aria-expanded', 'false'); });

    function sync(d) { selected = d; input.value = d ? format(d, o.format, o.loc) : ''; cal.setSelected(d); }
    function change() { fire(input, 'datepicker:change', { date: selected, value: input.value }); }
    function pick(d) {
      if (d && isDisabled(d, o)) return;
      sync(d); nativeChange(input); change();
      if (o.autohide) { popup.hide(); suppress = true; input.focus(); suppress = false; }
    }
    function clear() { pick(null); }
    function open() { cal.reset(); input.setAttribute('aria-expanded', 'true'); popup.show(); }

    input.addEventListener('focus', function () { if (!suppress) open(); });
    input.addEventListener('click', function () { if (!popup.isOpen()) open(); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && popup.isOpen()) { e.preventDefault(); e.stopPropagation(); popup.hide(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); if (!popup.isOpen()) open(); cal.focusDay(); }
      else if (e.key === 'Enter') { e.preventDefault(); commitTyped(); popup.hide(); }
    });
    panel.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); popup.hide(); suppress = true; input.focus(); suppress = false; }
    });
    panel.addEventListener('mousedown', function (e) { if (!e.target.closest('button')) e.preventDefault(); }); // keep focus in the input
    holder.addEventListener('focusout', function (e) { if (e.relatedTarget && !holder.contains(e.relatedTarget)) { commitTyped(); popup.hide(); } });
    input.addEventListener('input', function () { // a fully typed, valid date moves the calendar along (preview only)
      var d = parse(input.value, o.format, o.loc);
      if (d && !isDisabled(d, o)) cal.view(d);
    });
    function commitTyped() {
      var raw = input.value.trim();
      if (!raw) { if (selected) { selected = null; cal.setSelected(null); change(); } return; }
      var d = parse(raw, o.format, o.loc);
      if (d && !isDisabled(d, o)) {
        if (same(d, selected)) { input.value = format(d, o.format, o.loc); return; }
        sync(d); change();
      } else input.value = selected ? format(selected, o.format, o.loc) : ''; // reject garbage / disabled dates
    }
    input.addEventListener('blur', commitTyped);

    var initial = parseISO(input.getAttribute('data-date')) || parse(input.value, o.format, o.loc) || (o.autoselectToday ? o.today : null);
    if (initial && !isDisabled(initial, o)) sync(initial); else cal.reset();

    input._kkDatepicker = {
      getDate: function () { return selected; },
      setDate: function (d) { sync(d ? startOfDay(d) : null); },
      show: open, hide: function () { popup.hide(); }
    };
  }

  /* ----------------------------------------------------------- range popup */
  function initRange(wrap) {
    if (wrap._kkDatepicker) return;
    var o = readOptions(wrap), start = null, end = null, active = 0, suppress = false;
    var inline = wrap.hasAttribute('data-datepicker-inline');
    var inputs = inline ? [] : Array.prototype.slice.call(wrap.querySelectorAll('input')).slice(0, 2);
    if (!inline && inputs.length < 2) return;
    var output = wrap.getAttribute('data-datepicker-output') ? document.querySelector(wrap.getAttribute('data-datepicker-output')) : null;
    var cal = Calendar(o, { pick: pick, today: function () {}, clear: clear }, true);
    var panel = cal.el, popup = null;
    wrap.appendChild(panel);

    function text(d) { return d ? format(d, o.format, o.loc) : ''; }
    function sync() {
      if (inputs.length) { inputs[0].value = text(start); inputs[1].value = text(end); }
      if (output) output.textContent = start ? text(start) + (end ? ' – ' + text(end) : ' – …') : '–';
      cal.setRange(start, end);
    }
    function change() {
      inputs.forEach(nativeChange);
      fire(wrap, 'daterangepicker:change', { start: start, end: end });
    }
    function pick(d) {
      if (!d || isDisabled(d, o)) return;
      // popup: the focused input decides (start / end); inline: first click starts, second ends, a third starts over
      var startNew = inputs.length ? (active === 0 || !start || d < start) : (!start || !!end || d < start);
      if (startNew) { start = d; end = null; active = 1; }
      else { end = d; active = 0; }
      sync(); change();
      if (inputs.length) {
        if (end) { if (o.autohide) popup.hide(); }
        else { suppress = true; inputs[1].focus(); suppress = false; popup.place(); }
      }
    }
    function clear() { start = end = null; active = 0; sync(); change(); }

    if (inputs.length) {
      popup = Popup(panel, function () { return inputs[active]; }, wrap, o, function () { inputs.forEach(function (i) { i.setAttribute('aria-expanded', 'false'); }); });
      panel.hidden = true;
      var open = function (i) { active = i; cal.reset(); inputs.forEach(function (n) { n.setAttribute('aria-expanded', 'true'); }); popup.show(); };
      inputs.forEach(function (input, i) {
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('aria-haspopup', 'dialog');
        input.setAttribute('aria-expanded', 'false');
        input.addEventListener('focus', function () { if (!suppress) open(i); else { active = i; } });
        input.addEventListener('click', function () { active = i; if (!popup.isOpen()) open(i); else popup.place(); });
        input.addEventListener('keydown', function (e) {
          if (e.key === 'Escape' && popup.isOpen()) { e.preventDefault(); e.stopPropagation(); popup.hide(); }
          else if (e.key === 'ArrowDown') { e.preventDefault(); if (!popup.isOpen()) open(i); cal.focusDay(); }
          else if (e.key === 'Enter') { e.preventDefault(); commit(i); popup.hide(); }
        });
        input.addEventListener('blur', function () { commit(i); });
      });
      panel.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); popup.hide(); suppress = true; inputs[active].focus(); suppress = false; }
      });
      panel.addEventListener('mousedown', function (e) { if (!e.target.closest('button')) e.preventDefault(); });
      wrap.addEventListener('focusout', function (e) { if (e.relatedTarget && !wrap.contains(e.relatedTarget)) popup.hide(); });
    } else {
      panel.classList.add('datepicker-inline');
    }
    function commit(i) {
      var raw = inputs[i].value.trim(), cur = i === 0 ? start : end;
      if (!raw) { if (cur) { if (i === 0) start = null; else end = null; sync(); change(); } return; }
      var d = parse(raw, o.format, o.loc);
      if (!d || isDisabled(d, o) || (i === 1 && start && d < start)) { inputs[i].value = text(cur); return; } // reject garbage / disabled / end before start
      if (same(d, cur)) { inputs[i].value = text(d); return; }
      if (i === 0) { start = d; if (end && end < d) end = null; } else end = d;
      sync(); change();
    }

    var s0 = parseISO(wrap.getAttribute('data-date-start')), e0 = parseISO(wrap.getAttribute('data-date-end'));
    if (inputs.length && !s0) s0 = parse(inputs[0].value, o.format, o.loc);
    if (inputs.length && !e0) e0 = parse(inputs[1].value, o.format, o.loc);
    if (s0 && !isDisabled(s0, o)) start = s0;
    if (e0 && start && e0 >= start && !isDisabled(e0, o)) end = e0;
    sync();

    wrap._kkDatepicker = {
      getDates: function () { return { start: start, end: end }; },
      setDates: function (s, e) { start = s ? startOfDay(s) : null; end = e ? startOfDay(e) : null; sync(); },
      show: function () { if (popup) open(0); }, hide: function () { if (popup) popup.hide(); }
    };
  }

  /* ---------------------------------------------------------------- inline */
  function initInline(box) {
    if (box._kkDatepicker) return;
    if (box.hasAttribute('data-datepicker-range')) { initRange(box); return; }
    var o = readOptions(box), selected = null;
    var output = box.getAttribute('data-datepicker-output') ? document.querySelector(box.getAttribute('data-datepicker-output')) : null;
    var cal = Calendar(o, { pick: pick, today: function () { pick(o.today); }, clear: function () { pick(null); } }, false);
    cal.el.classList.add('datepicker-inline');
    box.appendChild(cal.el);
    function sync(d) {
      selected = d; cal.setSelected(d);
      if (output) output.textContent = d ? format(d, o.format, o.loc) : '–';
    }
    function pick(d) {
      if (d && isDisabled(d, o)) return;
      sync(d);
      fire(box, 'datepicker:change', { date: selected, value: selected ? format(selected, o.format, o.loc) : '' });
    }
    var initial = parseISO(box.getAttribute('data-date')) || (o.autoselectToday ? o.today : null);
    sync(initial && !isDisabled(initial, o) ? initial : null);
    box._kkDatepicker = { getDate: function () { return selected; }, setDate: function (d) { sync(d ? startOfDay(d) : null); }, show: function () {}, hide: function () {} };
  }

  /* ------------------------------------------------------------------ init */
  function init(root) {
    root = root || document;
    Array.prototype.forEach.call(root.querySelectorAll('[data-datepicker]'), initInput);
    Array.prototype.forEach.call(root.querySelectorAll('[data-datepicker-inline]'), initInline);
    Array.prototype.forEach.call(root.querySelectorAll('[data-daterangepicker]'), initRange);
  }

  window.KKDatepicker = {
    init: init,
    get: function (el) { return (el && el._kkDatepicker) || null; },
    format: format,
    parse: parse
  };

  function boot() {
    init(document);
    if (window.MutationObserver) { // markup added later (Storybook, async renders)
      var queued = false;
      new MutationObserver(function (list) {
        if (queued || !list.some(function (m) { return m.addedNodes.length; })) return;
        queued = true;
        window.requestAnimationFrame(function () { queued = false; init(document); });
      }).observe(document.body, { childList: true, subtree: true });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
