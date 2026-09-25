# Aset & Konten

Semua aset ditaruh di folder `public/`. Nama file harus **persis** seperti di bawah (atau ubah path-nya di [src/config/content.js](../src/config/content.js)).
Selama foto belum dimasukkan, website menampilkan placeholder hati yang manis, jadi aman dicoba kapan saja.

## Lagu & video

| File | Keterangan |
|---|---|
| `public/audio/my-love.mp3` | Westlife – My Love. MP3 128–192 kbps sudah cukup (±4–6 MB) |
| `public/video/a-moment-of-you.mp4` | Video page 8. Format **MP4 (H.264 + AAC)** supaya jalan di iPhone & Android. Usahakan ≤ 50 MB (720p cukup) |
| `public/photos/video-poster.jpg` | (Opsional) gambar cover sebelum video diputar |

Video vertikal dari HP? Ubah `MEDIA.video.aspect` jadi `'9 / 16'`.

## Foto

| Folder | Jumlah | Nama file | Dipakai di |
|---|---|---|---|
| `public/photos/special/` | 6 | `01.jpg` … `06.jpg` | Page 5 (01–03 kiri, 04–06 kanan) |
| `public/photos/memories/` | 20 | `01.jpg` … `20.jpg` | Page 7 (galeri polaroid) |
| `public/photos/book/` | 10 | `01.jpg` … `10.jpg` | Page 7 (buku, 2 foto per halaman terbuka) |
| `public/photos/her/` | 6 | `01.jpg` … `06.jpg` | Page 10 (01 foto utama, 02–03 samping, 04–06 photo strip) |

**Tips foto:**
- Semua ditampilkan **persegi** (dipotong otomatis ke tengah). Taruh wajah di tengah foto.
- Ukuran ideal **800×800 px**, JPG kualitas ±80% (±100–200 KB per foto). Kompres pakai [squoosh.app](https://squoosh.app) supaya cepat dibuka di HP.
- Mau format lain (`.png`, `.webp`)? Ubah ekstensi di fungsi `photo()` dalam `content.js`.
- Caption tiap foto bisa diubah di `PHOTOS` dalam `content.js`.
- Jumlah foto buku bebas (lebih baik genap). Jumlah foto galeri juga bebas, tinggal tambah/kurangi baris di `PHOTOS.memories`.

## Teks

| Yang diubah | Lokasi di `content.js` |
|---|---|
| Surat page 6 | `LETTER` (Enter = baris baru) |
| Kecepatan mengetik surat | `LETTER_TYPING_SPEED` (ms per huruf; makin besar makin pelan) |
| Kalimat penutup page 11 | `CLOSING_QUOTES` |
| Semua teks lain per page | `COPY.p1` … `COPY.p11` |
| Target countdown | `BIRTHDAY_TARGET` |
| Jawaban benar page 2 | `CORRECT_DATE` |

## Mau pakai stiker Stitch asli?

Maskot bawaan adalah gambar **orisinal** bergaya Stitch (bukan aset Disney). Kalau kamu punya stiker PNG Stitch/Angel sendiri, taruh di `public/stickers/` lalu minta aku ganti komponen `Mascot` supaya memakai gambar itu.
