/* Toolbar builder kuesioner (kuesioner-builder.html dan kuesioner-kosong.html), mengikuti aplikasi:
   - "Simpan Perubahan" nonaktif sampai ada perubahan;
   - saat ada perubahan muncul lencana "Ada perubahan belum disimpan" dan tombol "Batalkan";
   - Batalkan membuang perubahan (memuat ulang halaman), Simpan menandai tersimpan.
   Elemen: #builderSaveBtn, #builderDiscardBtn, #builderDirtyBadge. Perubahan terdeteksi dari: saklar/isian di <main>
   (input[data-dirty-field] untuk teks), simpan atau hapus pertanyaan Custom, dan seret-urut baris.
   Halaman dapat memanggil KKBuilderToolbar.setDirty(true|false) sendiri. */
(function () {
  'use strict';
  var save = document.getElementById('builderSaveBtn');
  var discard = document.getElementById('builderDiscardBtn');
  var badge = document.getElementById('builderDirtyBadge');
  if (!save) return;

  var dirty = false;
  function setDirty(v) {
    dirty = !!v;
    save.disabled = !dirty;
    if (badge) badge.classList.toggle('hidden', !dirty);
    if (discard) discard.classList.toggle('hidden', !dirty);
  }

  document.addEventListener('change', function (e) {
    if (e.target.closest && e.target.closest('main') && e.target.matches('input[type="checkbox"], input[type="radio"], select')) setDirty(true);
  });
  document.addEventListener('input', function (e) {
    if (e.target.matches && e.target.matches('[data-dirty-field]')) setDirty(true);
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest) return;
    if (e.target.closest('#customQSaveBtn')) {
      var text = document.getElementById('customQText');
      if (text && text.value.trim()) setDirty(true);
    }
    if (e.target.closest('#deleteCustomOkBtn')) setDirty(true);
  });
  document.addEventListener('dragend', function (e) {
    if (e.target.closest && e.target.closest('[data-sortable-list]')) setDirty(true);
  });

  if (discard) discard.addEventListener('click', function () { window.location.reload(); });
  save.addEventListener('click', function () {
    if (typeof window.KKBuilderBeforeSave === 'function' && window.KKBuilderBeforeSave() === false) return;
    setDirty(false);
  });

  window.KKBuilderToolbar = { setDirty: setDirty, isDirty: function () { return dirty; } };
})();
