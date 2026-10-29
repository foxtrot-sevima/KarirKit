/* ============================================================================
   KarirKit — File Upload (dependency-free)

   Markup:   <div class="upload" data-file-upload>
               <label class="upload-drop"><input type="file" class="sr-only" ...> ... </label>
               <p class="form-error" data-upload-error hidden></p>      (dibuat otomatis bila tidak ada)
               <ul class="upload-list" data-upload-list></ul>            (dibuat otomatis bila tidak ada)
             </div>
   Options (pada [data-file-upload]; format dan jumlah juga dibaca dari <input accept multiple>):
             data-upload-max-size="5"        ukuran maksimum per file, MB
             data-upload-max-files="3"       jumlah file maksimum (input multiple)
             data-upload-preview="image"     gambar tampil sebagai miniatur
             data-upload-simulate="true"     progres palsu untuk contoh/mockup (tanpa jaringan)
   Events:   upload:add     (detail: { files, added })      file lolos validasi dan masuk daftar
             upload:remove  (detail: { file, files })
             upload:error   (detail: { file, reason, message })   reason: type | size | count
   API:      KKUpload.files(el) -> File[] · KKUpload.clear(el) · KKUpload.progress(el, file, pct)
             KKUpload.init(root) memasang komponen yang ditambahkan setelah halaman dimuat.
   File yang lolos disinkronkan kembali ke <input>.files (DataTransfer), jadi pengiriman <form> biasa tetap bekerja.
   ============================================================================ */
(function () {
  'use strict';

  var ICONS = { pdf: 'file-pdf', doc: 'file-doc', docx: 'file-doc' };
  var state = new WeakMap();

  function fmtSize(b) {
    if (b < 1024) return b + ' B';
    if (b < 1048576) return (b / 1024).toFixed(b < 10240 ? 1 : 0).replace('.', ',') + ' KB';
    return (b / 1048576).toFixed(1).replace('.', ',') + ' MB';
  }

  function ext(name) { var m = /\.([^.]+)$/.exec(name || ''); return m ? m[1].toLowerCase() : ''; }

  function accepts(file, accept) {
    if (!accept) return true;
    var name = (file.name || '').toLowerCase(), type = (file.type || '').toLowerCase();
    return accept.split(',').some(function (t) {
      t = t.trim().toLowerCase();
      if (!t) return false;
      if (t.charAt(0) === '.') return name.slice(-t.length) === t;
      if (t.slice(-2) === '/*') return type.indexOf(t.slice(0, -1)) === 0;
      return type === t;
    });
  }

  function acceptLabel(accept) {
    return accept.split(',').map(function (t) { return t.trim().replace(/^\./, '').toUpperCase(); }).join(', ');
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function icon(name) { var i = el('i', 'kk kk-' + name); i.setAttribute('aria-hidden', 'true'); return i; }

  function setup(root) {
    if (state.has(root)) return;
    var input = root.querySelector('input[type="file"]');
    if (!input) return;
    var drop = root.querySelector('.upload-drop') || input.parentNode;
    var list = root.querySelector('[data-upload-list]');
    var err = root.querySelector('[data-upload-error]');
    if (!list) { list = el('ul', 'upload-list'); list.setAttribute('data-upload-list', ''); root.appendChild(list); }
    if (!err) { err = el('p', 'form-error'); err.setAttribute('data-upload-error', ''); err.hidden = true; root.insertBefore(err, list); }
    var s = { input: input, drop: drop, list: list, err: err, files: [], items: new Map(), timers: new Map() };
    state.set(root, s);

    function opts() {
      return {
        accept: input.getAttribute('accept') || '',
        max: parseFloat(root.getAttribute('data-upload-max-size')) || 0,
        maxFiles: parseInt(root.getAttribute('data-upload-max-files'), 10) || 0,
        multiple: input.multiple,
        image: root.getAttribute('data-upload-preview') === 'image',
        simulate: root.getAttribute('data-upload-simulate') === 'true'
      };
    }

    function showError(msg) {
      err.textContent = msg;
      err.hidden = false;
      root.setAttribute('aria-invalid', 'true');
    }
    function clearError() {
      err.hidden = true; err.textContent = '';
      root.removeAttribute('aria-invalid');
    }

    function sync() {
      try {
        var dt = new DataTransfer();
        s.files.forEach(function (f) { dt.items.add(f); });
        input.files = dt.files;
      } catch (e) { /* DataTransfer tidak tersedia: daftar tetap berfungsi */ }
    }

    function render(file, o) {
      var li = el('li', 'upload-item');
      var thumb = el('span', 'upload-thumb');
      var isImg = /^image\//.test(file.type);
      if (o.image && isImg) {
        var img = el('img'); img.alt = '';
        img.src = URL.createObjectURL(file);
        thumb.appendChild(img);
        li._url = img.src;
      } else {
        thumb.appendChild(icon(ICONS[ext(file.name)] || (isImg ? 'image' : 'file-text')));
      }
      var body = el('span', 'upload-body');
      body.appendChild(el('span', 'upload-name', file.name));
      var meta = el('span', 'upload-meta', fmtSize(file.size));
      body.appendChild(meta);
      var rm = el('button', 'upload-remove');
      rm.type = 'button';
      rm.setAttribute('aria-label', 'Hapus ' + file.name);
      rm.appendChild(icon('trash'));
      rm.addEventListener('click', function () { remove(file); });
      li.appendChild(thumb); li.appendChild(body); li.appendChild(rm);
      if (o.simulate) {
        var track = el('span', 'progress-track'), bar = el('span', 'progress-bar');
        bar.style.display = 'block'; bar.style.width = '0%';
        track.appendChild(bar); body.appendChild(track);
        li._bar = bar; li._meta = meta; li._size = fmtSize(file.size);
        li.setAttribute('data-state', 'uploading');
      }
      return li;
    }

    function progress(file, pct) {
      var li = s.items.get(file);
      if (!li || !li._bar) return;
      pct = Math.max(0, Math.min(100, pct));
      li._bar.style.width = pct + '%';
      li._meta.textContent = pct >= 100 ? li._size + ' · Selesai' : li._size + ' · ' + Math.round(pct) + '%';
      li.setAttribute('data-state', pct >= 100 ? 'done' : 'uploading');
    }

    function simulate(file) {
      var p = 0;
      var t = setInterval(function () {
        p += 8 + Math.random() * 14;
        progress(file, p);
        if (p >= 100) { clearInterval(t); s.timers.delete(file); }
      }, 160);
      s.timers.set(file, t);
    }

    function remove(file) {
      var i = s.files.indexOf(file);
      if (i < 0) return;
      s.files.splice(i, 1);
      var li = s.items.get(file);
      if (li) { if (li._url) URL.revokeObjectURL(li._url); li.remove(); s.items.delete(file); }
      if (s.timers.has(file)) { clearInterval(s.timers.get(file)); s.timers.delete(file); }
      clearError(); sync();
      root.dispatchEvent(new CustomEvent('upload:remove', { bubbles: true, detail: { file: file, files: s.files.slice() } }));
    }

    function fail(file, reason, message) {
      showError(message);
      root.dispatchEvent(new CustomEvent('upload:error', { bubbles: true, detail: { file: file, reason: reason, message: message } }));
    }

    function add(fileList) {
      var o = opts(), incoming = Array.prototype.slice.call(fileList || []);
      if (!incoming.length) return;
      clearError();
      if (!o.multiple) { incoming = incoming.slice(0, 1); }
      var added = [], rejected = false;
      incoming.forEach(function (f) {
        if (rejected) return;
        if (!accepts(f, o.accept)) {
          rejected = true;
          return fail(f, 'type', '"' + f.name + '" tidak didukung. Format yang diizinkan: ' + acceptLabel(o.accept) + '.');
        }
        if (o.max && f.size > o.max * 1048576) {
          rejected = true;
          return fail(f, 'size', '"' + f.name + '" melebihi batas ' + o.max + ' MB.');
        }
        if (o.multiple && o.maxFiles && s.files.length + added.length >= o.maxFiles) {
          rejected = true;
          return fail(f, 'count', 'Maksimal ' + o.maxFiles + ' file.');
        }
        added.push(f);
      });
      if (rejected) { sync(); return; }
      if (!o.multiple) s.files.slice().forEach(remove);
      added.forEach(function (f) {
        s.files.push(f);
        var li = render(f, o);
        s.items.set(f, li);
        s.list.appendChild(li);
        if (o.simulate) simulate(f);
      });
      sync();
      if (added.length) root.dispatchEvent(new CustomEvent('upload:add', { bubbles: true, detail: { files: s.files.slice(), added: added } }));
    }

    input.addEventListener('change', function () {
      // memilih ulang lewat dialog: nilai input sudah berisi pilihan baru; gabungkan lewat add()
      var picked = Array.prototype.slice.call(input.files || []);
      if (input.multiple) {
        var existing = s.files.slice();
        picked = picked.filter(function (f) { return existing.indexOf(f) < 0; });
      }
      add(picked);
    });

    ['dragenter', 'dragover'].forEach(function (ev) {
      drop.addEventListener(ev, function (e) {
        if (input.disabled) return;
        e.preventDefault();
        drop.classList.add('upload-drop-active');
      });
    });
    ['dragleave', 'dragend'].forEach(function (ev) {
      drop.addEventListener(ev, function (e) {
        if (e.relatedTarget && drop.contains(e.relatedTarget)) return;
        drop.classList.remove('upload-drop-active');
      });
    });
    drop.addEventListener('drop', function (e) {
      e.preventDefault();
      drop.classList.remove('upload-drop-active');
      if (input.disabled) return;
      add(e.dataTransfer && e.dataTransfer.files);
    });

    if (input.disabled) root.setAttribute('aria-disabled', 'true');
    s.api = { add: add, remove: remove, progress: progress };
  }

  function init(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll('[data-file-upload]'), setup);
  }

  window.KKUpload = {
    init: init,
    files: function (root) { var s = state.get(root); return s ? s.files.slice() : []; },
    clear: function (root) { var s = state.get(root); if (s) s.files.slice().forEach(s.api.remove); },
    progress: function (root, file, pct) { var s = state.get(root); if (s) s.api.progress(file, pct); }
  };

  // Storybook dan halaman dinamis merender markup setelah DOMContentLoaded
  if (window.MutationObserver) {
    new MutationObserver(function (list) {
      list.forEach(function (m) { Array.prototype.forEach.call(m.addedNodes, function (n) { if (n.nodeType === 1) init(n.matches && n.matches('[data-file-upload]') ? n.parentNode : n); }); });
    }).observe(document.documentElement, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(); });
  else init();
})();
