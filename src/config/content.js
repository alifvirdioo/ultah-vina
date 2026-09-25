/**
 * ─────────────────────────────────────────────────────────────────────
 *  SEMUA KONTEN WEBSITE ADA DI FILE INI.
 *  Mau ganti teks, foto, surat, atau quotes? Cukup edit file ini saja,
 *  komponen & animasi tidak perlu disentuh.
 * ─────────────────────────────────────────────────────────────────────
 */

export const HER = {
  fullName: "Vina Ayu Miranda",
  nickname: "Vina",
  age: 23,
  birthday: {
    day: 26,
    month: 9,
    year: 2003,
    monthShort: "SEP",
    monthName: "September",
  },
};

export const ME = {
  fullName: "Alif Virdio Yudhistira Widyawan",
  nickname: "Alif",
};

// Countdown page 3 menuju jam 00:00 WIB tanggal 26 September 2026.
export const BIRTHDAY_TARGET = "2026-09-26T00:00:00+07:00";

/**
 * Saklar countdown page 3.
 *   true  → countdown normal: tombol "Next" baru muncul saat BIRTHDAY_TARGET tiba.
 *   false → countdown dimatikan: page 3 langsung dalam kondisi "selesai"
 *           (00:00:00:00 + kembang api + tombol Next). Pakai ini untuk mengecek page 4–11.
 * ⚠️ Kembalikan ke `true` sebelum link dikirim ke Vina.
 */
export const isCountdown = true;

// Jawaban benar di page 2 (format DD-MM-YYYY).
export const CORRECT_DATE = "26-09-2026";

export const MEDIA = {
  // Taruh file lagunya di: public/audio/my-love.mp3
  music: "/audio/my-love.mp3",
  video: {
    // Taruh videonya di: public/video/a-moment-of-you.mp4
    src: "/video/a-moment-of-you.mp4",
    // Opsional: cover video sebelum di-play (public/photos/video-poster.jpg)
    poster: "/photos/video-poster.jpg",
    // '16 / 9' untuk video landscape, '9 / 16' untuk video portrait (dari HP)
    aspect: "16 / 9",
  },
};

const photo = (folder, n, caption = "") => ({
  src: `/photos/${folder}/${String(n).padStart(2, "0")}.jpg`,
  caption,
});

export const PHOTOS = {
  // Page 5: 3 foto kiri + 3 foto kanan → public/photos/special/01.jpg … 06.jpg
  special: [
    photo("special", 1, "my girl ♡"),
    photo("special", 2, "cantiknya"),
    photo("special", 3, "us ♡"),
    photo("special", 4, "lucuu"),
    photo("special", 5, "forever"),
    photo("special", 6, "my favorite"),
  ],

  // Page 7: 20 foto memori → public/photos/memories/01.jpg … 20.jpg
  memories: [
    photo("memories", 1, "our first chapter"),
    photo("memories", 2, "kita lucu ya"),
    photo("memories", 3, "my favorite view"),
    photo("memories", 4, "jalan-jalan"),
    photo("memories", 5, "happy us"),
    photo("memories", 6, "senyum kamu ♡"),
    photo("memories", 7, "random day"),
    photo("memories", 8, "date night"),
    photo("memories", 9, "silly faces"),
    photo("memories", 10, "a day to remember"),
    photo("memories", 11, "you & me"),
    photo("memories", 12, "my sunshine"),
    photo("memories", 13, "makan-makan"),
    photo("memories", 14, "little trip"),
    photo("memories", 15, "always you"),
    photo("memories", 16, "best day ever"),
    photo("memories", 17, "kangen ini"),
    photo("memories", 18, "my home"),
    photo("memories", 19, "still us"),
    photo("memories", 20, "and counting…"),
  ],

  // Page 7 (buku): 2 foto per halaman terbuka → public/photos/book/01.jpg … 10.jpg
  book: [
    photo("book", 1, "chapter one"),
    photo("book", 2, "the beginning"),
    photo("book", 3, "our laughs"),
    photo("book", 4, "our trips"),
    photo("book", 5, "our silly days"),
    photo("book", 6, "our quiet days"),
    photo("book", 7, "grow together"),
    photo("book", 8, "stay together"),
    photo("book", 9, "year six"),
    photo("book", 10, "and forever"),
  ],

  // Page 10: foto-foto Vina → public/photos/her/01.jpg … 06.jpg
  her: {
    main: photo("her", 1, "my birthday girl"),
    sides: [photo("her", 2), photo("her", 3)],
    strip: [photo("her", 4), photo("her", 5), photo("her", 6)],
  },
};

export const COPY = {
  p1: {
    question: "Kamu sayang aku ga?",
    yes: "Y",
    no: "G",
    // Hanya dipakai kalau improvisasi p1Teasing dinyalakan
    teases: [
      "wlee 😝",
      "ga kena~",
      "yakin mau G?",
      "hihi coba lagi",
      "HAHA KENA TIPU, WLE",
      "aku kabur ah",
      "ga bisa weee",
      "pencet Y dong",
    ],
  },
  p2: {
    title: "Yeay, kamu sayang aku yh, boong ye?",
    question: "Sekarang tanggal berapa sayang?",
    wrong: "Salah, wlee 😜❤️, Coba lagi!",
    right: "Yey, benerr 😘❤️",
  },
  p3: {
    counting: "Counting Day",
    special: "Her Special Day",
    coming: "is Coming",
    message:
      "Something special and magic will happen to your life, be ready sayang!",
    labels: ["Day", "Hour", "Minutes", "Second"],
    waiting: "Nungguin yaaa..!!",
    next: "Next",
  },
  p4: {
    hint: "Klik kadonya ya sayang 🎁",
    opened: "Surprise!! 🎉",
    // Kue 23 lilin (improvisasi p4Cake)
    wishFirst: "Make a wish dulu, sayang 🤫✨",
    blowHint: "Terus tiup lilinnya, tap kuenya ya 🎂",
    candlesLeft: "{n} lilin masih menyala",
    puff: "fuuuh~ 🌬️",
    blown: "Yeay!! Wish-nya pasti terkabul ✨",
  },
  p5: {
    title: "Your Special Day",
    credit: "Created by your Engineer love, Alif Virdio Yudhistira Widyawan",
    button: "Read Letter",
  },
  p6: { button: "Our Memories" },
  p7: {
    title: "Our Sweet Memories, Sayang!",
    subtitle: "6 years and still counting",
    bookHint: "Ada buku kecil buat kita, buka yuk 📖",
    bookTitle: "Our Little Love Book",
    bookNames: "Vina ♡ Alif",
    bookOutro: "and our story goes on…",
    bookEnd: "to be continued, forever ♡",
    button: "Watch Video",
  },
  p8: {
    title: "A Moment of You",
    playHint: "tap buat play ♡",
    missing: "Videonya nanti muncul di sini ya 🎬",
    button: "Your Wishes",
  },
  p9: {
    intro:
      "Halo sayang, tadi kan udah wish dari aku yaa, sekarang aku mau kamu tulis isi hatimu apa aja, wish mu apa aja untuk usiamu ke yang ke-23 ini ya sayang",
    paperTitle: "My wishes at 23 ✨",
    placeholder: "Tulis di sini ya sayang…",
    submit: "Submit",
    bubbles: {
      idle: "Tulis yang banyak yaa sayang~ 💕",
      typing: "Aku ga ngintip kok 🙈",
      ready: "Udah? Pencet Submit yaa ✨",
      empty: "Isi dulu dong sayang 🥺",
    },
    sending: "Wish kamu lagi terbang ke bintang… ✨",
  },
  p10: {
    title: "Happy Birthday, Sayang!",
    wishLabel: "Wish kamu di umur 23 💌",
    wishEmpty:
      "Kamu belum nulis wish, tapi aku udah wish buat kamu setiap hari 💕",
    wishSign: "— Vina, 26.09.2026",
    calendarCaption: "hari kamu lahir ♡",
    stripLabel: "vina · 23",
    tag: "birthday girl",
    photoPrompt: "Difoto dulu sayang, ini lucuu bangett lochh! ❤️",
    question: "Sudah foto?",
    yes: "Sudah",
    no: "Belum",
    notYet: "Cekrek! 📸 Difoto dulu yaa sayang, aku tungguin 🥰",
    // Photobooth (improvisasi p10Photobooth)
    boothOpen: "Buka Photobooth 📸",
    boothTitle: "Photobooth Vina 📸",
    boothHint: "Senyum yang lucu yaa sayang~",
    boothShoot: "Cekrek!",
    boothRetake: "Foto lagi",
    boothSave: "Simpan foto",
    boothSaved: "Fotonya udah kesimpen, lucu bangett! 🥰",
    boothLoading: "Nyalain kamera dulu yaa…",
    boothDenied:
      "Kameranya belum diizinkan 🥺 Izinkan akses kamera di browser, lalu coba lagi ya.",
    boothUnsupported:
      "Browser ini belum bisa pakai kamera 🥺 Coba buka pakai Chrome atau Safari ya.",
    boothRetry: "Coba lagi",
    frameTitle: "Happy Birthday, Sayang!",
    frameSub: "Vina · 23 · 26.09.2026",
  },
  p11: {
    title: "Made with Love",
    from: "from : Alif Virdio Yudhistira Widyawan",
    replay: "Ulang dari awal ↺",
  },
};

/**
 * Page 6: surat untuk Vina.
 * Ini TEMPLATE, silakan ganti seluruh isinya dengan tulisanmu sendiri.
 * Enter/baris baru di sini = baris baru juga di surat.
 */
export const LETTER = `Dear Vina Ayu Miranda, sayangku,

Selamat ulang tahun yang ke-23, cantikku. 🎂💕

Hari ini aku mau bilang sesuatu yang mungkin udah sering kamu denger, tapi nggak pernah bosen aku ucapin: aku sayang banget sama kamu.

Enam tahun ternyata cepet banget ya. Dari hal-hal kecil yang dulu kita anggap biasa, sampai hari-hari berat yang kita lewatin bareng, semuanya jadi cerita yang paling aku syukuri. Makasih ya udah sabar sama aku, udah jadi rumah paling nyaman buat aku pulang, dan udah tetap milih aku, lagi dan lagi.

Di umur 23 ini, aku berdoa semoga kamu selalu sehat, selalu bahagia, dan semua mimpi yang kamu simpan pelan-pelan jadi nyata. Semoga kamu makin sayang sama diri kamu sendiri, karena kamu pantas dapet semua hal baik di dunia ini.

Kalau nanti ada hari-hari yang capek, inget ya: kamu nggak sendirian. Ada aku yang bakal selalu di samping kamu, jadi tempat cerita, tempat ketawa, dan tempat bersandar.

Terima kasih udah lahir ke dunia, sayang. Dunia jadi jauh lebih indah karena ada kamu, dan hidupku jadi jauh lebih berarti karena ada kamu di dalamnya.

Happy birthday, my love. Ini baru permulaan dari banyak ulang tahun yang mau aku rayain bareng kamu and last but not least, Thank you for being LDR near 1 year HAHAHA

With all my love, Jakarta -> Surabaya
Alif ❤️`;

// Kecepatan mengetik surat (milidetik per huruf). Makin besar = makin pelan.
export const LETTER_TYPING_SPEED = 45;

/**
 * Page 11: kalimat-kalimat penutup berbahasa Inggris.
 * Ini PLACEHOLDER, ganti dengan kalimat pilihanmu.
 */
export const CLOSING_QUOTES = [
  "Of all the places I have been, my favorite is right next to you.",
  "Twenty-three looks beautiful on you, but forever will look even better.",
  "You are the calm in my chaos and the light in all my ordinary days.",
  "Thank you for choosing me, again and again, for six beautiful years.",
  "Here's to every sunrise we haven't seen yet. I want them all with you.",
];
