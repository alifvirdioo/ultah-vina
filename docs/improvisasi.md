# Improvisasi & Keputusan Teknis

Sesuai aturanmu (*"kalau mau improvisasi, beritahu aku dulu"*), semua tambahan di luar brief dicatat di sini, lengkap dengan status persetujuanmu (24-09-2026).
Toggle ada di [src/config/improvisations.js](../src/config/improvisations.js).

## A. Improvisasi page 9 & 10

### Page 9: Wish
| # | Improvisasi | Status |
|---|---|---|
| 9.1 | Kertas buku tulis bergaris + judul "My wishes at 23 ✨" | ✅ disetujui |
| 9.2 | Maskot biru **mengintip** dari balik kertas, tangannya memegang tepi kertas | ✅ disetujui |
| 9.3 | Saat mengetik, maskot **menutup mata** + "Aku ga ngintip kok 🙈" | ✅ disetujui |
| 9.4 | Balon kata berubah sesuai keadaan (kosong / mengetik / siap / submit kosong) | ✅ disetujui |
| 9.5 | 4 chip inspirasi kalimat pembuka | ❌ tidak disetujui → **sudah dihapus** |
| 9.6 | Submit → kertas terbang ke langit, bintang muncul: "Wish kamu lagi terbang ke bintang… ✨" | ✅ disetujui |
| 9.7 | Draft tersimpan di browser (tidak hilang kalau ter-refresh) | ✅ disetujui |

### Page 10: Rangkuman (semua ✅ disetujui)
| # | Improvisasi |
|---|---|
| 10.1 | Judul "Happy Birthday, Sayang!" + "Vina Ayu Miranda · 23 ✨" |
| 10.2 | Kalender membalik 1 → 26, berhenti di **26 SEP 2003** + hati berdetak |
| 10.3 | Balon "2" dan "3" melayang |
| 10.4 | Foto utama + 2 foto samping miring (template polaroid bertumpuk) |
| 10.5 | Stiker overlay di foto utama: mahkota, kilau, hati, label "birthday girl ♡", maskot bermata hati |
| 10.6 | Hati-hati kecil terus naik dari belakang foto |
| 10.7 | Photo strip ala photobooth (3 foto) |
| 10.8 | Kartu wish bertanda tangan "— Vina, 26.09.2026" |
| 10.9 | Confetti saat halaman terbuka |
| 10.10 | Tombol **Belum** → kilatan flash kamera + toast "Cekrek! 📸 …", tetap di page 10 |

## B. Improvisasi tambahan (semua ✅ disetujui & AKTIF)

| Flag | Page | Isi |
|---|---|---|
| `p1Teasing` | 1 | Tombol **Y makin besar** tiap G kabur (maks. ±1.8×) dan bergeser ke tengah kartu, plus balon ejekan kecil di dekat G ("wlee 😝", "yakin mau G?", "Y aja sayang 🥺", …) |
| `p7Lightbox` | 7 | Tap/klik polaroid → foto tampil besar di tengah layar; tap di mana saja untuk menutup |
| `p11ReplayButton` | 11 | Tombol kecil "Ulang dari awal ↺" muncul setelah semua quotes tampil |
| `p4Cake` | 4 | **Kue ulang tahun 23 lilin.** Setelah kado terbuka → "Make a wish dulu, sayang 🤫✨" → tiap tap kue = satu tiupan "fuuuh~ 🌬️" yang memadamkan 6–8 lilin (ada asap kecil), jadi sekitar 3–4 tap. Semua padam → "Yeay!! Wish-nya pasti terkabul ✨" + confetti + kembang api → Page 5 |
| `p10Photobooth` | 10 | **Photobooth kamera depan.** Tombol "Buka Photobooth 📸" → preview live dengan bingkai pink-biru, mahkota, hati, 2 maskot, label "birthday girl ♡", tulisan "Happy Birthday, Sayang!" + "Vina · 23 · 26.09.2026" → hitung mundur 3-2-1 → flash → hasil foto (1080×1350, rasio 4:5) → **Simpan foto** (di HP lewat menu Bagikan → Simpan Gambar; di laptop langsung terunduh) atau **Foto lagi**. Foto diproses sepenuhnya di HP Vina dan tidak diunggah ke mana pun. Kamera langsung dimatikan saat photobooth ditutup |

## C. Keputusan teknis kecil (semua ✅ disetujui & AKTIF)

| Keputusan | Alasan |
|---|---|
| Lagu mulai tepat saat klik **Next** di page 3 | Browser memblokir audio otomatis tanpa klik |
| Lagu disambung lagi di sentuhan pertama kalau halaman ter-refresh (page 4+) | Supaya musik tetap "tanpa batas" |
| Lagu dikecilkan + di-pause **selama video page 8 diputar**, lalu lanjut | Supaya suara lagu & video tidak tabrakan |
| Teks bantuan "Klik kadonya ya sayang 🎁" & "Surprise!! 🎉" (page 4) | Supaya Vina tahu kadonya harus diklik |
| Teks bantuan "Ada buku kecil buat kita, buka yuk 📖" (page 7) | Supaya bukunya tidak terlewat |
| Judul page 7 ditulis **"Our** Sweet Memories" | Di brief tertulis "Out", kuanggap salah ketik |
| Halaman terakhir yang dibuka diingat selama tab masih terbuka | Kalau ter-refresh tidak mengulang dari page 1 |
| Maskot = alien imut **orisinal** bergaya Stitch (SVG) | Aman dipakai tanpa masalah hak cipta; kalau mau stiker Stitch asli, lihat [aset-dan-konten.md](aset-dan-konten.md) |

## D. Yang TIDAK dibuat

- **Menyimpan tulisan Vina untuk kamu tanpa sepengetahuannya** (dalam bentuk apa pun, termasuk file yang hanya bisa kamu lihat). Wish hanya tersimpan di browser Vina sendiri dan tampil di page 10.
