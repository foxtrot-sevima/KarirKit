/* Merek di panel admin KarirLink: sidebar dan drawer mobile selalu memakai logo KarirLink bawaan. Nama dan logo kampus
   tidak ditampilkan di panel admin (hanya di hero Portal Karir). `KarirAdminBrand.apply()` dipertahankan agar halaman yang
   memanggilnya (mis. setelah Publish di Personalisasi Portal) tidak error. */
(function () {
  window.KarirAdminBrand = { apply: function () {} };
})();
