# Design System: Stitch Pink × Blue

## Warna

| Token | Hex | Dipakai untuk |
|---|---|---|
| `pinky-50` | `#fff1f7` | latar lembut |
| `pinky-200` | `#ffc4de` | border, garis putus-putus |
| `pinky-300` | `#ff9ec7` | "Angel pink", confetti, maskot pink |
| `pinky-500` | `#f7559a` | judul, tombol utama |
| `stitch-200` | `#b6d6ff` | border biru |
| `stitch-400` | `#5b9bf5` | "Stitch blue", tombol kedua, maskot biru |
| `stitch-500` | `#3f7fe6` | aksen biru kuat |
| `stitch-900` | `#1d2f5c` | warna teks utama (navy) |
| `cream` | `#fffaf3` | kertas surat & buku |
| `sun` | `#ffcf5c` | kilau, mahkota, sinar kado |

Gradasi judul `.text-candy`: pink `#f7559a` → ungu `#c46bdc` → biru `#3f7fe6`.

Background siang: gradasi pink kiri-atas → lavender → biru kanan-bawah. Background malam (page 11): navy `#131f42` → biru `#22377a` → ungu `#4b3a86` dengan cahaya pink di bawah.

## Tipografi (mostly tegak bersambung)

| Font | Kelas | Peran |
|---|---|---|
| **Pacifico** | `font-cute` | Judul imut, tombol, angka countdown |
| **Dancing Script** | `font-script` | Teks utama, surat, wish, caption polaroid |
| **Great Vibes** | `font-vibes` | Judul romantis: *Her Special Day*, *Your Special Day*, *A Moment of You*, *Made with Love* |
| Quicksand | `font-round` | Label kecil (DAY, HOUR, SEP), satu-satunya font non-sambung, dipakai supaya tetap terbaca |

## Komponen

| Komponen | Deskripsi |
|---|---|
| `CuteButton` (`.btn-cute`) | Pil gemuk, border putih 3px, "bayangan 3D" 5px, kilau lewat tiap 3.4 dtk; varian pink / blue / white; hover membesar & miring, tap mengempis |
| `.card-cute` | Kartu putih kaca (blur) + garis putus-putus pink di dalam |
| `Polaroid` | Bingkai putih, foto persegi, caption tulisan tangan, selotip washi opsional; placeholder manis kalau foto belum ada |
| `Mascot` | Alien imut 2 warna × 7 ekspresi (`happy`, `love`, `wink`, `joy`, `tongue`, `wow`, `cover`), telinga bergoyang & mata berkedip |
| `Modal` | Pop-up pegas di tengah, backdrop blur |
| Toast | Pil pink/biru meluncur dari atas |
| `FlipBook` | Buku 3D, 2 foto per halaman terbuka |
| `SparkleBurst` | Bunga + kilau + hati bermunculan di sekeliling elemen |
| `Cake` | Kue 2 tingkat (pink & biru) dengan 23 lilin berapi goyang; tap = tiupan yang memadamkan beberapa lilin + asap |
| `Photobooth` | Kamera depan + bingkai & stiker; hasil digambar ke kanvas 1080×1350 dengan tata letak yang sama persis dengan preview |

## Gerak (motion)

| Pola | Durasi | Dipakai |
|---|---|---|
| Masuk/keluar halaman | 0.6 dtk, fade + scale 0.97→1 + blur 8px→0 | semua page |
| Transisi hati | 0.8 dtk menutup, 0.55 dtk memudar | 1→2, 2→3, 9→10, 10→11 |
| Kilatan putih | 0.6 dtk | 3→4, 4→5 |
| Pegas "pop" | stiffness 200–260, damping 12–16 | kartu, tombol, maskot |
| Goyang idle | 2.4–5 dtk, loop | polaroid, maskot, kado |
| Detak hati | 1.4 dtk | ikon hati |

Library: **Motion** (`motion/react`, sebelumnya Framer Motion) untuk animasi komponen, CSS keyframes untuk dekorasi latar (lebih ringan di HP), `canvas-confetti` untuk confetti, dan canvas buatan sendiri untuk kembang api.
