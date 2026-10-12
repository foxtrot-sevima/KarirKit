/* KarirKit Chart: themed charts from plain markup, on top of the bundled chart engine (assets/js/vendor/apexcharts.min.js).
   Load the engine first, then this file:
     <script src="assets/js/vendor/apexcharts.min.js"></script>
     <script src="assets/js/chart.js"></script>

   Markup:
     <div data-chart="area" data-chart-height="280"
          data-chart-series='[{"name":"Lamaran","data":[4,7,5,9]}]'
          data-chart-categories='["Mei","Jun","Jul","Agu"]'></div>

   Types:    line | area | column | bar (horizontal) | donut | pie | radial | sparkline
             add data-chart-stacked on column / bar to stack the series
   Pie types take a plain list: data-chart-series='[44,55,13]' + data-chart-categories for the labels.
   Options:  data-chart-colors='["primary","success","#f59e0b"]'   token names (primary, secondary, success, info, warning,
                                                                  danger, neutral, or name-shade such as primary-300) or hex
             data-chart-legend="bottom|top|right|none"            default bottom (none for sparkline)
             data-chart-format="number|percent|rupiah|compact"    tooltip and axis numbers
             data-chart-total-label="Total"                       centre label of a donut
             data-chart-options='{...}'                           merged last into the engine options
   Charts follow the page theme (html[data-theme]) and the design tokens; markup added later is picked up automatically.
   API: KKChart.init(root), KKChart.render(el, type, config), KKChart.options(type, config), KKChart.get(el), KKChart.destroy(el) */
(function () {
  'use strict';

  var FALLBACK = { primary: '#2361e7', secondary: '#f7893b', success: '#10b981', info: '#0ea5e9', warning: '#f59e0b', danger: '#ef4444', neutral: '#94a3b8' };
  var SHADE = { primary: 600, secondary: 500, success: 500, info: 500, warning: 500, danger: 500, neutral: 400 };
  var PALETTE = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'primary-300', 'neutral'];
  var FONT = '"Instrument Sans", ui-sans-serif, system-ui, sans-serif';
  var instances = new WeakMap();
  var live = [];

  function cssVar(name, fallback) {
    var v = '';
    try { v = getComputedStyle(document.documentElement).getPropertyValue(name).trim(); } catch (e) { /* no DOM styles */ }
    return v || fallback;
  }
  function isDark() { return document.documentElement.getAttribute('data-theme') === 'dark'; }
  function theme() {
    return {
      dark: isDark(),
      fg: cssVar('--color-fg', isDark() ? '#e2e8f0' : '#0f172a'),
      muted: cssVar('--color-fg-muted', isDark() ? '#94a3b8' : '#64748b'),
      border: cssVar('--color-border', isDark() ? '#334155' : '#e2e8f0'),
      surface: cssVar('--color-surface', isDark() ? '#0f172a' : '#ffffff')
    };
  }
  // "primary" -> --color-primary-600, "primary-300" -> --color-primary-300, "#abc" stays as is
  function color(spec) {
    if (!spec || spec.charAt(0) === '#' || /^(rgb|hsl)/.test(spec)) return spec;
    var m = /^([a-z]+)(?:-(\d{2,3}))?$/.exec(spec);
    if (!m) return spec;
    var shade = m[2] || SHADE[m[1]] || 600;
    return cssVar('--color-' + m[1] + '-' + shade, FALLBACK[m[1]] || '#2361e7');
  }

  function formatter(kind) {
    var nf = function (n) { return Number(n).toLocaleString('id-ID', { maximumFractionDigits: 1 }); };
    if (kind === 'percent') return function (n) { return nf(n) + '%'; };
    if (kind === 'rupiah') return function (n) { return 'Rp' + Number(n).toLocaleString('id-ID', { maximumFractionDigits: 0 }); };
    if (kind === 'compact') return function (n) {
      var v = Math.abs(Number(n));
      if (v >= 1e9) return nf(n / 1e9) + ' M';
      if (v >= 1e6) return nf(n / 1e6) + ' jt';
      if (v >= 1e3) return nf(n / 1e3) + ' rb';
      return nf(n);
    };
    return nf;
  }

  function merge(a, b) {
    if (!b || typeof b !== 'object') return a;
    Object.keys(b).forEach(function (k) {
      if (b[k] && typeof b[k] === 'object' && !Array.isArray(b[k]) && a[k] && typeof a[k] === 'object' && !Array.isArray(a[k])) merge(a[k], b[k]);
      else a[k] = b[k];
    });
    return a;
  }

  // Engine options for one chart. config: { series, categories, height, colors, legend, format, stacked, totalLabel, options }
  function options(type, config) {
    config = config || {};
    var t = theme();
    var fmt = formatter(config.format || 'number');
    var pieLike = type === 'donut' || type === 'pie' || type === 'radial';
    var colors = (config.colors && config.colors.length ? config.colors : PALETTE).map(color);
    var legend = config.legend || (type === 'sparkline' ? 'none' : 'bottom');
    var o = {
      chart: {
        type: type === 'column' || type === 'bar' ? 'bar' : type === 'sparkline' ? 'area' : type === 'radial' ? 'radialBar' : type,
        height: config.height || (type === 'sparkline' ? 48 : pieLike ? 300 : 280),
        fontFamily: FONT,
        foreColor: t.muted,
        background: 'transparent',
        toolbar: { show: false },
        zoom: { enabled: false },
        parentHeightOffset: 0,
        animations: { enabled: true, speed: 500, animateGradually: { enabled: false } },
        stacked: !!config.stacked
      },
      series: config.series || [],
      colors: colors,
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: type === 'line' || type === 'area' ? 3 : 0, lineCap: 'round' },
      fill: { type: 'solid', opacity: 1 },
      grid: { borderColor: t.border, strokeDashArray: 4, padding: { left: 8, right: 8, top: 0, bottom: 0 }, xaxis: { lines: { show: false } } },
      legend: {
        show: legend !== 'none', position: legend === 'none' ? 'bottom' : legend, fontFamily: FONT, fontSize: '13px',
        labels: { colors: t.muted }, markers: { size: 5, shape: 'circle', strokeWidth: 0, offsetX: -2 }, itemMargin: { horizontal: 10, vertical: 4 }
      },
      tooltip: { theme: t.dark ? 'dark' : 'light', style: { fontFamily: FONT, fontSize: '13px' }, y: { formatter: fmt } },
      states: { hover: { filter: { type: 'lighten', value: 0.04 } }, active: { filter: { type: 'none' } } }
    };

    if (!pieLike) {
      o.xaxis = {
        categories: config.categories || [],
        labels: { style: { colors: t.muted, fontFamily: FONT, fontSize: '12px' } },
        axisBorder: { show: false }, axisTicks: { show: false },
        crosshairs: { show: type === 'line' || type === 'area', stroke: { color: t.border, dashArray: 4 } }
      };
      // horizontal bars carry the numbers on the x axis, the categories on the y axis
      var numLabels = { style: { colors: t.muted, fontFamily: FONT, fontSize: '12px' }, formatter: fmt };
      var catLabels = { style: { colors: t.muted, fontFamily: FONT, fontSize: '12px' } };
      o.yaxis = { labels: type === 'bar' ? catLabels : numLabels };
      if (type === 'bar') o.xaxis.labels = numLabels;
    }

    if (type === 'area') {
      o.fill = { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.32, opacityTo: 0, stops: [0, 95, 100] } };
      o.markers = { size: 0, hover: { size: 5, sizeOffset: 2 } };
    } else if (type === 'line') {
      o.markers = { size: 0, strokeWidth: 2, strokeColors: t.surface, hover: { size: 6, sizeOffset: 0 } };
    } else if (type === 'column' || type === 'bar') {
      o.plotOptions = { bar: { horizontal: type === 'bar', borderRadius: 6, borderRadiusApplication: 'end', borderRadiusWhenStacked: 'last', columnWidth: '55%', barHeight: '60%' } };
      if (type === 'bar') { o.grid.xaxis = { lines: { show: true } }; o.grid.yaxis = { lines: { show: false } }; }
    } else if (type === 'donut' || type === 'pie') {
      o.labels = config.categories || [];
      o.stroke = { width: 2, colors: [t.surface] };
      o.plotOptions = { pie: { expandOnClick: false, donut: { size: '72%', labels: type === 'donut' ? {
        show: true,
        name: { show: true, fontFamily: FONT, fontSize: '13px', color: t.muted, offsetY: 18 },
        value: { show: true, fontFamily: FONT, fontSize: '26px', fontWeight: 700, color: t.fg, offsetY: -14, formatter: function (v) { return fmt(v); } },
        total: { show: true, showAlways: true, label: config.totalLabel || 'Total', fontFamily: FONT, fontSize: '13px', color: t.muted,
          formatter: function (w) { return fmt(w.globals.seriesTotals.reduce(function (a, b) { return a + b; }, 0)); } }
      } : { show: false } } } };
    } else if (type === 'radial') {
      o.labels = config.categories || [];
      o.stroke = { lineCap: 'round' };
      o.plotOptions = { radialBar: { hollow: { size: '52%' }, track: { background: t.border, strokeWidth: '100%', margin: 6 },
        dataLabels: {
          name: { show: true, fontFamily: FONT, fontSize: '13px', color: t.muted, offsetY: 20 },
          value: { show: true, fontFamily: FONT, fontSize: '26px', fontWeight: 700, color: t.fg, offsetY: -14, formatter: function (v) { return Math.round(v) + '%'; } },
          total: { show: (config.series || []).length > 1, label: config.totalLabel || 'Rata-rata', fontFamily: FONT, fontSize: '13px', color: t.muted,
            formatter: function (w) { var a = w.globals.seriesTotals; return Math.round(a.reduce(function (x, y) { return x + y; }, 0) / a.length) + '%'; } }
        } } };
    } else if (type === 'sparkline') {
      o.chart.sparkline = { enabled: true };
      o.stroke = { curve: 'smooth', width: 2 };
      o.fill = { type: 'gradient', gradient: { opacityFrom: 0.28, opacityTo: 0, stops: [0, 100] } };
      o.tooltip.x = { show: false };
      o.xaxis.labels = { show: false }; o.yaxis = { show: false };
    }
    return merge(o, config.options);
  }

  function parse(el, name, fallback) {
    var raw = el.getAttribute('data-chart-' + name);
    if (raw == null || raw === '') return fallback;
    try { return JSON.parse(raw); } catch (e) { return fallback; }
  }
  function readConfig(el) {
    return {
      series: parse(el, 'series', []),
      categories: parse(el, 'categories', []),
      colors: parse(el, 'colors', null),
      height: parseInt(el.getAttribute('data-chart-height'), 10) || undefined,
      legend: el.getAttribute('data-chart-legend') || undefined,
      format: el.getAttribute('data-chart-format') || undefined,
      totalLabel: el.getAttribute('data-chart-total-label') || undefined,
      stacked: el.hasAttribute('data-chart-stacked'),
      options: parse(el, 'options', null)
    };
  }

  function destroy(el) {
    var inst = instances.get(el);
    if (!inst) return;
    try { inst.chart.destroy(); } catch (e) { /* already gone */ }
    instances.delete(el);
    live = live.filter(function (x) { return x !== el; });
  }
  function render(el, type, config) {
    if (!window.ApexCharts) { if (window.console) console.warn('KKChart: chart engine not loaded'); return null; }
    destroy(el);
    config = config || {};
    var chart = new window.ApexCharts(el, options(type, config));
    chart.render();
    instances.set(el, { chart: chart, type: type, config: config });
    live.push(el);
    return chart;
  }
  function get(el) { var i = instances.get(el); return i ? i.chart : null; }

  function init(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll('[data-chart]'), function (el) {
      if (instances.has(el) || el._kkChartPending) return;
      el._kkChartPending = true;
      // wait a frame so the container has its final width (tabs, modals and grids settle first)
      requestAnimationFrame(function () {
        el._kkChartPending = false;
        if (!el.isConnected || instances.has(el)) return;
        render(el, el.getAttribute('data-chart'), readConfig(el));
      });
    });
  }

  // follow the page theme: re-colour every chart when html[data-theme] changes
  function retheme() {
    live.slice().forEach(function (el) {
      var i = instances.get(el);
      if (i) i.chart.updateOptions(options(i.type, i.config), false, false);
    });
  }
  if (window.MutationObserver) {
    new MutationObserver(retheme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    new MutationObserver(function (list) {
      for (var i = 0; i < list.length; i++) if (list[i].addedNodes.length) { init(); return; }
    }).observe(document.documentElement, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(); });
  else init();

  window.KKChart = { init: init, render: render, options: options, get: get, destroy: destroy };
})();
