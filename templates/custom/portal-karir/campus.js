/* Identitas kampus untuk Portal Karir (white-label). Muat sebelum portal.js. Yang diganti per kampus hanya berkas ini.
   Semua nilai opsional; yang kosong memakai bawaan portal (logo KarirLink SEVIMA) atau barisnya tidak ditampilkan.

   name     Nama tampilan kampus (disarankan maksimal ~40 karakter; nama panjang dikecilkan otomatis di hero).
   unit     Nama unit pengelola, tampil di atas nama kampus pada hero.
   logo     URL logo kampus (WebP/PNG/SVG/JPG, ideal persegi), relatif terhadap halaman ini, mis. "../assets/logo/ub.webp".
            Kosong = logo KarirLink SEVIMA. Diisi = navbar dan footer menampilkan logo kampus + "Karirlink" kecil di atas nama kampus,
            sama seperti templates/custom/index.html.
   tracerUrl  Alamat aplikasi Tracer Study kampus; kuesioner tiap kuesioner dibuka dari sini (halaman Tracer Study hanya pengingat).
   about    Deskripsi singkat di footer.
   address, email, phone    Kontak kampus di footer.
   social   Tautan media sosial kampus: facebook, instagram, x, youtube. Kosong = ikonnya tidak ditampilkan. */
window.PK_CAMPUS = {
  name: 'Universitas Brawijaya',
  unit: 'Pusat Karier dan Alumni',
  logo: '../assets/logo/ub.webp',
  tracerUrl: '../../karirlink/kuesioner-simulasi.html',
  about: 'Pusat karier dan alumni Universitas Brawijaya membantu mahasiswa dan lulusan menemukan lowongan, mengikuti event dan pelatihan, serta mengembangkan kariernya.',
  address: 'Jl. Veteran, Ketawanggede, Kec. Lowokwaru, Kota Malang, Jawa Timur 65145',
  email: 'karier@ub.ac.id',
  phone: '+62 341 551 611',
  social: { facebook: '#', instagram: '#', x: '#', youtube: '#' }
};
