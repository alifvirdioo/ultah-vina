// Penyimpanan lokal di browser (hanya di perangkat yang membuka website).
const PAGE_KEY = 'ultah-vina:page'
const WISH_KEY = 'ultah-vina:wish'

const safe = (fn, fallback) => {
  try {
    return fn()
  } catch {
    return fallback
  }
}

export const loadPage = () => safe(() => parseInt(sessionStorage.getItem(PAGE_KEY), 10), NaN)
export const savePage = (n) => safe(() => sessionStorage.setItem(PAGE_KEY, String(n)))
export const loadWish = () => safe(() => localStorage.getItem(WISH_KEY) ?? '', '')
export const saveWish = (text) => safe(() => localStorage.setItem(WISH_KEY, text))
