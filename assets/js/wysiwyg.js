/* KarirKit WYSIWYG — dependency-free rich text editor on contenteditable.
   Works offline (no TipTap / CDN). Auto-inits every [data-wysiwyg].

   Toolbar buttons (inside the [data-wysiwyg] root):
     <button data-cmd="bold|italic|underline|strike|subscript|superscript|highlight|code|link|unlink
                      |align-left|align-center|align-right|align-justify
                      |bullet-list|ordered-list|blockquote|code-block|hr|image|video">
     <button data-cmd="format" data-value="p|h1..h6">    <button data-cmd="size" data-value="16px">
     <button data-cmd="color" data-value="#ef4444">      <button data-cmd="color-reset">
     <button data-cmd="font" data-value="Georgia">       <input type="text" data-cmd="color-hex">
   Dropdowns:  <button data-dd="name"> + <div data-dd-menu="name" class="hidden">
   API:        KKWysiwyg.get(rootEl) -> { getHTML, setHTML, getText, focus, el }
   Event:      'wysiwyg:change' (bubbles) with detail { html } on the root. */
(function () {
  var SAFE_URL = /^(https?:|mailto:|tel:|\/|#|\.\.?\/)/i;
  var instances = new WeakMap();

  function safeUrl(u) {
    u = (u || '').trim();
    if (SAFE_URL.test(u)) return u;
    return /^[\w-]+(\.[\w-]+)+([/?#].*)?$/.test(u) ? 'https://' + u : '';
  }
  function youtubeId(u) {
    var m = (u || '').match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/))([\w-]{11})/);
    return m ? m[1] : '';
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function exec(cmd, val) { return document.execCommand(cmd, false, val == null ? null : val); }

  function init(root) {
    if (instances.has(root)) return;
    var content = root.querySelector('.wysiwyg-content');
    if (!content) return;
    content.setAttribute('contenteditable', 'true');
    content.setAttribute('role', 'textbox');
    content.setAttribute('aria-multiline', 'true');
    if (!content.hasAttribute('aria-label')) content.setAttribute('aria-label', 'Editor teks');
    var saved = null;

    function inEditor(node) { return node && content.contains(node.nodeType === 1 ? node : node.parentNode); }
    function saveRange() {
      var sel = window.getSelection();
      if (sel.rangeCount && inEditor(sel.anchorNode)) saved = sel.getRangeAt(0).cloneRange();
    }
    function restore() {
      content.focus();
      if (!saved) return;
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(saved);
    }
    function closest(tag) {
      var sel = window.getSelection();
      var n = sel.anchorNode;
      while (n && n !== content) {
        if (n.nodeType === 1 && n.nodeName.toLowerCase() === tag) return n;
        n = n.parentNode;
      }
      return null;
    }
    function changed() {
      root.dispatchEvent(new CustomEvent('wysiwyg:change', { bubbles: true, detail: { html: content.innerHTML } }));
      refresh();
    }

    function refresh() {
      saveRange();
      var q = function (c) { try { return document.queryCommandState(c); } catch (e) { return false; } };
      var hl = '';
      try { hl = document.queryCommandValue('hiliteColor'); } catch (e) {}
      var state = {
        bold: q('bold'), italic: q('italic'), underline: q('underline'), strike: q('strikeThrough'),
        subscript: q('subscript'), superscript: q('superscript'),
        highlight: !!hl && hl !== 'transparent' && hl !== 'rgba(0, 0, 0, 0)',
        code: !!closest('code') && !closest('pre'), link: !!closest('a'),
        'align-left': q('justifyLeft'), 'align-center': q('justifyCenter'),
        'align-right': q('justifyRight'), 'align-justify': q('justifyFull'),
        'bullet-list': q('insertUnorderedList'), 'ordered-list': q('insertOrderedList'),
        blockquote: !!closest('blockquote'), 'code-block': !!closest('pre')
      };
      root.querySelectorAll('button[data-cmd]').forEach(function (b) {
        var k = b.getAttribute('data-cmd');
        if (k in state) b.setAttribute('aria-pressed', state[k] ? 'true' : 'false');
      });
    }

    function applySize(px) {
      exec('styleWithCSS', true);
      exec('fontSize', '7');
      content.querySelectorAll('font[size="7"]').forEach(function (f) {
        var s = document.createElement('span');
        s.style.fontSize = px;
        while (f.firstChild) s.appendChild(f.firstChild);
        f.replaceWith(s);
      });
      content.querySelectorAll('span[style*="xxx-large"],span[style*="-webkit-xxx-large"]').forEach(function (s) {
        s.style.fontSize = px;
      });
    }

    var commands = {
      bold: function () { exec('bold'); },
      italic: function () { exec('italic'); },
      underline: function () { exec('underline'); },
      strike: function () { exec('strikeThrough'); },
      subscript: function () { exec('subscript'); },
      superscript: function () { exec('superscript'); },
      highlight: function () {
        exec('styleWithCSS', true);
        var v = document.queryCommandValue('hiliteColor');
        exec('hiliteColor', v && v !== 'transparent' && v !== 'rgba(0, 0, 0, 0)' ? 'transparent' : '#fde68a');
      },
      code: function () {
        var c = closest('code');
        if (c && !closest('pre')) {
          var t = document.createTextNode(c.textContent);
          c.replaceWith(t);
          return;
        }
        var text = String(window.getSelection());
        if (text) exec('insertHTML', '<code>' + esc(text) + '</code>');
      },
      link: function () {
        var cur = closest('a');
        var url = safeUrl(window.prompt('URL tautan', cur ? cur.getAttribute('href') : 'https://'));
        if (!url) return;
        if (window.getSelection().isCollapsed && !cur) exec('insertHTML', '<a href="' + esc(url) + '">' + esc(url) + '</a>');
        else exec('createLink', url);
      },
      unlink: function () { exec('unlink'); },
      'align-left': function () { exec('justifyLeft'); },
      'align-center': function () { exec('justifyCenter'); },
      'align-right': function () { exec('justifyRight'); },
      'align-justify': function () { exec('justifyFull'); },
      'bullet-list': function () { exec('insertUnorderedList'); },
      'ordered-list': function () { exec('insertOrderedList'); },
      blockquote: function () { exec('formatBlock', closest('blockquote') ? 'p' : 'blockquote'); },
      'code-block': function () { exec('formatBlock', closest('pre') ? 'p' : 'pre'); },
      hr: function () { exec('insertHorizontalRule'); },
      image: function () {
        var url = safeUrl(window.prompt('URL gambar', 'https://'));
        if (url) exec('insertImage', url);
      },
      video: function () {
        var id = youtubeId(window.prompt('URL video YouTube', 'https://www.youtube.com/watch?v='));
        if (!id) return;
        exec('insertHTML', '<div class="wysiwyg-video" contenteditable="false"><iframe src="https://www.youtube-nocookie.com/embed/' + id +
          '" title="Video YouTube" allowfullscreen loading="lazy"></iframe></div><p><br></p>');
      },
      format: function (v) { exec('formatBlock', v === 'p' ? 'p' : v); },
      size: applySize,
      font: function (v) { exec('fontName', v); },
      color: function (v) { exec('styleWithCSS', true); exec('foreColor', v); },
      'color-reset': function () { exec('styleWithCSS', true); exec('foreColor', getComputedStyle(content).color); }
    };

    function closeMenus(except) {
      root.querySelectorAll('[data-dd-menu]').forEach(function (m) {
        if (m === except) return;
        m.classList.add('hidden');
        var b = root.querySelector('[data-dd="' + m.getAttribute('data-dd-menu') + '"]');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
    }

    // Keep the editor selection when pressing toolbar controls (except text inputs)
    root.addEventListener('mousedown', function (e) {
      var ctl = e.target.closest('.wysiwyg-toolbar button, .wysiwyg-menu button');
      if (ctl) e.preventDefault();
    });

    root.addEventListener('click', function (e) {
      var dd = e.target.closest('[data-dd]');
      if (dd) {
        var menu = root.querySelector('[data-dd-menu="' + dd.getAttribute('data-dd') + '"]');
        var open = menu.classList.contains('hidden');
        closeMenus(menu);
        menu.classList.toggle('hidden', !open);
        dd.setAttribute('aria-expanded', open ? 'true' : 'false');
        return;
      }
      var btn = e.target.closest('button[data-cmd]');
      if (!btn || !commands[btn.getAttribute('data-cmd')]) return;
      restore();
      commands[btn.getAttribute('data-cmd')](btn.getAttribute('data-value'));
      if (btn.closest('[data-dd-menu]') && btn.getAttribute('data-keep-open') == null) closeMenus();
      saveRange();
      changed();
    });

    root.addEventListener('keydown', function (e) {
      var hex = e.target.closest('input[data-cmd="color-hex"]');
      if (hex && e.key === 'Enter') {
        e.preventDefault();
        var v = hex.value.trim();
        if (/^#?[0-9a-f]{6}$/i.test(v)) {
          restore();
          commands.color(v[0] === '#' ? v : '#' + v);
          closeMenus();
          changed();
        }
      }
      if (e.key === 'Escape') closeMenus();
    });

    content.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.altKey && /^Digit[0-6]$/.test(e.code)) {
        e.preventDefault();
        var n = e.code.slice(5);
        commands.format(n === '0' ? 'p' : 'h' + n);
        changed();
      }
    });

    // Paste as plain text: keeps content clean and avoids pasting foreign markup
    content.addEventListener('paste', function (e) {
      e.preventDefault();
      var t = (e.clipboardData || window.clipboardData).getData('text/plain');
      exec('insertText', t);
    });

    content.addEventListener('input', changed);
    content.addEventListener('keyup', refresh);
    content.addEventListener('mouseup', refresh);
    content.addEventListener('blur', saveRange);
    document.addEventListener('click', function (e) { if (!root.contains(e.target)) closeMenus(); });

    instances.set(root, {
      el: content,
      getHTML: function () { return content.innerHTML; },
      getText: function () { return content.innerText; },
      setHTML: function (h) { content.innerHTML = h; changed(); },
      focus: function () { content.focus(); }
    });
    root.querySelectorAll('button[data-cmd]').forEach(function (b) { if (!b.hasAttribute('type')) b.setAttribute('type', 'button'); });
    refresh();
  }

  function initAll() { document.querySelectorAll('[data-wysiwyg]').forEach(init); }
  initAll();
  document.addEventListener('DOMContentLoaded', initAll);
  new MutationObserver(initAll).observe(document.documentElement, { childList: true, subtree: true });

  window.KKWysiwyg = { get: function (el) { return instances.get(el); }, init: init };
})();
