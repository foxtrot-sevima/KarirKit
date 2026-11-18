/* ============================================================================
   KarirKit — Cropper (dependency-free)

   Pangkas gambar dengan rasio tetap: geser untuk memosisikan, zoom lewat slider, roda mouse, cubit dua jari, atau tombol +/-.
   Markup:   <div class="cropper cropper-round" data-cropper data-cropper-ratio="1" data-cropper-output="512"></div>
             Isi (area pangkas, bingkai, slider zoom) dibuat otomatis bila kosong. Kelas .cropper-round menampilkan bingkai bulat
             (untuk foto profil); hasil pangkas tetap persegi sesuai rasio.
   Options:  data-cropper-ratio="1"        lebar / tinggi hasil (1, 1.5, 1.7778 ...); default 1
             data-cropper-output="512"     lebar hasil dalam piksel (tinggi = lebar / rasio)
             data-cropper-max-zoom="4"     zoom maksimum, kelipatan dari ukuran paling kecil yang menutup bingkai
             data-cropper-src="..."        gambar yang dimuat otomatis (URL atau data URL)
   Events:   cropper:ready   (detail: { width, height })    gambar selesai dimuat
             cropper:change  (detail: { zoom })              posisi atau zoom berubah
             cropper:error                                   berkas bukan gambar atau gagal dibaca
   API:      KKCropper.load(el, fileOrUrl) -> Promise      muat gambar (File, Blob, atau URL)
             KKCropper.toDataURL(el, { type, quality, size }) -> string | null
             KKCropper.toBlob(el, { type, quality, size }) -> Promise<Blob | null>
             KKCropper.reset(el)                            kembalikan ke posisi dan zoom awal
             KKCropper.init(root)                           memasang komponen yang ditambahkan setelah halaman dimuat
   Papan ketik: fokus di area pangkas, panah menggeser, + dan - mengubah zoom.
   ============================================================================ */
(function () {
  'use strict';

  var state = new WeakMap();

  function build(root) {
    if (root.querySelector('.cropper-stage')) return;
    root.innerHTML =
      '<div class="cropper-stage" tabindex="0" role="application" aria-label="Area pangkas gambar. Geser untuk memosisikan, plus dan minus untuk zoom.">' +
        '<img class="cropper-image" alt="" draggable="false" />' +
        '<div class="cropper-frame"></div>' +
      '</div>' +
      '<div class="cropper-controls">' +
        '<button type="button" class="cropper-step" data-cropper-out aria-label="Perkecil"><i class="kk kk-minus h-4 w-4" aria-hidden="true"></i></button>' +
        '<input type="range" class="cropper-zoom" data-cropper-zoom min="1" max="4" step="0.01" value="1" aria-label="Zoom" />' +
        '<button type="button" class="cropper-step" data-cropper-in aria-label="Perbesar"><i class="kk kk-plus h-4 w-4" aria-hidden="true"></i></button>' +
      '</div>';
  }

  function ratioOf(root) { var r = parseFloat(root.getAttribute('data-cropper-ratio')); return r > 0 ? r : 1; }
  function maxZoom(root) { var z = parseFloat(root.getAttribute('data-cropper-max-zoom')); return z > 1 ? z : 4; }

  function fire(root, name, detail) { root.dispatchEvent(new CustomEvent('cropper:' + name, { bubbles: true, detail: detail || {} })); }

  // Posisi disimpan sebagai zoom (z >= 1) dan titik pusat di koordinat gambar (cx, cy), jadi tetap benar saat ukuran area berubah.
  function layout(root) {
    var st = state.get(root);
    if (!st || !st.ready) return;
    var W = st.stage.clientWidth, H = st.stage.clientHeight;
    if (!W || !H) return;
    var min = Math.max(W / st.iw, H / st.ih), s = min * st.z;
    var hw = W / 2 / s, hh = H / 2 / s;
    st.cx = Math.min(Math.max(st.cx, hw), st.iw - hw);
    st.cy = Math.min(Math.max(st.cy, hh), st.ih - hh);
    st.img.style.width = st.iw + 'px';
    st.img.style.height = st.ih + 'px';
    st.img.style.transform = 'translate(' + (W / 2 - st.cx * s) + 'px,' + (H / 2 - st.cy * s) + 'px) scale(' + s + ')';
    st.slider.value = st.z;
    st.scale = s;
  }

  function setZoom(root, z) {
    var st = state.get(root); if (!st || !st.ready) return;
    st.z = Math.min(Math.max(z, 1), maxZoom(root));
    layout(root); fire(root, 'change', { zoom: st.z });
  }

  function pan(root, dx, dy) {
    var st = state.get(root); if (!st || !st.ready || !st.scale) return;
    st.cx -= dx / st.scale; st.cy -= dy / st.scale;
    layout(root); fire(root, 'change', { zoom: st.z });
  }

  function reset(root) {
    var st = state.get(root); if (!st || !st.ready) return;
    st.z = 1; st.cx = st.iw / 2; st.cy = st.ih / 2; layout(root);
  }

  function load(root, source) {
    var st = state.get(root);
    if (!st) return Promise.reject(new Error('Cropper belum dipasang'));
    return new Promise(function (resolve, reject) {
      var url = source, revoke = false;
      if (typeof source !== 'string') {
        if (!source || !/^image\//.test(source.type || '')) { fire(root, 'error'); reject(new Error('Bukan berkas gambar')); return; }
        url = URL.createObjectURL(source); revoke = true;
      }
      var probe = new Image();
      probe.onload = function () {
        if (st.url) URL.revokeObjectURL(st.url);
        st.url = revoke ? url : null;
        st.iw = probe.naturalWidth; st.ih = probe.naturalHeight;
        st.img.src = url; st.ready = true;
        st.z = 1; st.cx = st.iw / 2; st.cy = st.ih / 2;
        root.classList.add('cropper-ready');
        layout(root);
        fire(root, 'ready', { width: st.iw, height: st.ih });
        resolve({ width: st.iw, height: st.ih });
      };
      probe.onerror = function () { if (revoke) URL.revokeObjectURL(url); fire(root, 'error'); reject(new Error('Gambar tidak bisa dibaca')); };
      probe.src = url;
    });
  }

  // Gambar hasil pangkas, persegi sesuai rasio. size = lebar hasil dalam piksel (default data-cropper-output atau 512).
  function canvasOf(root, opts) {
    var st = state.get(root); if (!st || !st.ready) return null;
    layout(root);
    var W = st.stage.clientWidth, H = st.stage.clientHeight; if (!W || !H) return null;
    var out = (opts && opts.size) || parseInt(root.getAttribute('data-cropper-output'), 10) || 512;
    var cv = document.createElement('canvas'); cv.width = out; cv.height = Math.round(out / ratioOf(root));
    var sw = W / st.scale, sh = H / st.scale, ctx = cv.getContext('2d');
    var type = (opts && opts.type) || 'image/jpeg';
    if (type === 'image/jpeg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, cv.width, cv.height); }
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(st.img, st.cx - sw / 2, st.cy - sh / 2, sw, sh, 0, 0, cv.width, cv.height);
    return cv;
  }
  function toDataURL(root, opts) { var cv = canvasOf(root, opts); return cv ? cv.toDataURL((opts && opts.type) || 'image/jpeg', (opts && opts.quality) || 0.9) : null; }
  function toBlob(root, opts) {
    var cv = canvasOf(root, opts);
    return new Promise(function (resolve) { if (!cv) { resolve(null); return; } cv.toBlob(resolve, (opts && opts.type) || 'image/jpeg', (opts && opts.quality) || 0.9); });
  }

  function mount(root) {
    if (state.has(root)) return;
    build(root);
    var stage = root.querySelector('.cropper-stage'), st = {
      stage: stage, img: root.querySelector('.cropper-image'), slider: root.querySelector('[data-cropper-zoom]'),
      ready: false, iw: 0, ih: 0, z: 1, cx: 0, cy: 0, scale: 1, url: null
    };
    state.set(root, st);
    stage.style.setProperty('--cropper-ratio', String(ratioOf(root)));
    st.slider.max = String(maxZoom(root));

    var pts = {}, pinch = 0;
    function count() { return Object.keys(pts).length; }
    function dist() { var k = Object.keys(pts); return Math.hypot(pts[k[0]].x - pts[k[1]].x, pts[k[0]].y - pts[k[1]].y); }
    stage.addEventListener('pointerdown', function (e) {
      if (!st.ready) return;
      stage.setPointerCapture(e.pointerId); pts[e.pointerId] = { x: e.clientX, y: e.clientY };
      if (count() === 2) pinch = dist();
    });
    stage.addEventListener('pointermove', function (e) {
      var p = pts[e.pointerId]; if (!p) return;
      if (count() === 1) { pan(root, e.clientX - p.x, e.clientY - p.y); }
      p.x = e.clientX; p.y = e.clientY;
      if (count() === 2) { var d = dist(); if (pinch) setZoom(root, st.z * d / pinch); pinch = d; }
    });
    function up(e) { delete pts[e.pointerId]; pinch = 0; }
    stage.addEventListener('pointerup', up);
    stage.addEventListener('pointercancel', up);
    stage.addEventListener('wheel', function (e) {
      if (!st.ready) return;
      e.preventDefault(); setZoom(root, st.z * Math.exp(-e.deltaY * 0.0015));
    }, { passive: false });
    stage.addEventListener('keydown', function (e) {
      if (!st.ready) return;
      var step = 12, k = e.key;
      if (k === 'ArrowLeft') pan(root, step, 0); else if (k === 'ArrowRight') pan(root, -step, 0);
      else if (k === 'ArrowUp') pan(root, 0, step); else if (k === 'ArrowDown') pan(root, 0, -step);
      else if (k === '+' || k === '=') setZoom(root, st.z * 1.1); else if (k === '-') setZoom(root, st.z / 1.1);
      else return;
      e.preventDefault();
    });
    st.slider.addEventListener('input', function () { setZoom(root, parseFloat(st.slider.value)); });
    root.querySelector('[data-cropper-in]').addEventListener('click', function () { setZoom(root, st.z * 1.15); });
    root.querySelector('[data-cropper-out]').addEventListener('click', function () { setZoom(root, st.z / 1.15); });
    if (window.ResizeObserver) new ResizeObserver(function () { layout(root); }).observe(stage);
    else window.addEventListener('resize', function () { layout(root); });

    var src = root.getAttribute('data-cropper-src');
    if (src) load(root, src).catch(function () { /* cropper:error sudah dikirim */ });
  }

  function init(root) { (root || document).querySelectorAll('[data-cropper]').forEach(mount); }

  window.KKCropper = {
    init: init, load: function (el, s) { mount(el); return load(el, s); },
    toDataURL: toDataURL, toBlob: toBlob, reset: reset
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(); });
  else init();
})();
