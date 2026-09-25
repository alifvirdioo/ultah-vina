// Parameter URL khusus untuk kamu saat testing (Vina tidak perlu tahu):
//   ?page=7     → langsung lompat ke page 7
//   ?preview=1  → countdown page 3 selesai 8 detik lagi (untuk coba tombol Next + kembang api)
const params = new URLSearchParams(window.location.search)

export const startPageParam = parseInt(params.get('page'), 10)
export const isPreview = params.has('preview')
