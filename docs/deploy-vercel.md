# Menjalankan & Deploy ke Vercel

## 1. Jalankan di laptop

Butuh **Node.js 20.19+ atau 22+** ([nodejs.org](https://nodejs.org)).

```bash
npm install
npm run dev          # buka http://localhost:5173
```

URL bantuan untuk testing (Vina tidak perlu tahu):

| URL | Fungsi |
|---|---|
| `/?page=7` | Langsung lompat ke page 7 (angka 1–11) |
| `/?page=3&preview=1` | Countdown selesai 8 detik lagi, untuk mencoba tombol Next + kembang api + lagu |

Untuk mematikan countdown sepenuhnya selama testing, ubah `isCountdown` jadi `false` di `src/config/content.js`.

Halaman terakhir diingat selama tab masih terbuka. Kalau mau mulai dari awal lagi, tutup tab lalu buka baru (atau pakai `?page=1`).

## 2. Deploy

### Opsi A: lewat GitHub (disarankan)
1. Push folder ini ke repo GitHub (private boleh).
2. Buka [vercel.com/new](https://vercel.com/new) → **Import** repo tersebut.
3. Framework otomatis terdeteksi **Vite** (sudah diatur di `vercel.json`) → **Deploy**.
4. Ganti nama domain di **Settings → Domains**, misalnya `untuk-vina.vercel.app`.

### Opsi B: Vercel CLI
```bash
npx vercel          # deploy preview
npx vercel --prod   # deploy production
```

## 3. Checklist sebelum dikirim ke Vina

- [ ] **`isCountdown` di `src/config/content.js` sudah dikembalikan ke `true`**
- [ ] `public/audio/my-love.mp3` sudah ada & bunyi setelah klik Next (`?page=3&preview=1`)
- [ ] Semua foto tampil (tidak ada placeholder hati)
- [ ] Video bisa diputar di HP
- [ ] Photobooth page 10 dicoba di HP: izinkan kamera, foto, lalu **Simpan foto** (kamera hanya jalan di HTTPS; link Vercel sudah HTTPS)
- [ ] Surat & quotes penutup sudah diganti tulisanmu
- [ ] Sudah dicoba di HP (Chrome Android / Safari iPhone), bukan cuma laptop
- [ ] Ingatkan Vina untuk menyalakan volume HP-nya sebelum membuka link 🔊
