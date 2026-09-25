import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import Background from './components/Background'
import FireworksCanvas from './components/FireworksCanvas'
import ScreenWipe from './components/ScreenWipe'
import { MusicProvider, useMusic } from './context/MusicContext'
import { ToastProvider } from './context/ToastContext'
import { startPageParam } from './lib/params'
import { loadPage, loadWish, savePage, saveWish } from './lib/storage'
import P01Question from './pages/P01Question'
import P02Date from './pages/P02Date'
import P03Countdown from './pages/P03Countdown'
import P04Gift from './pages/P04Gift'
import P05Special from './pages/P05Special'
import P06Letter from './pages/P06Letter'
import P07Memories from './pages/P07Memories'
import P08Video from './pages/P08Video'
import P09Wishes from './pages/P09Wishes'
import P10Summary from './pages/P10Summary'
import P11Closing from './pages/P11Closing'

const PAGES = [P01Question, P02Date, P03Countdown, P04Gift, P05Special, P06Letter, P07Memories, P08Video, P09Wishes, P10Summary, P11Closing]
// Musik mulai dari tombol Next di page 3, jadi page 4 ke atas harus selalu ada musik.
const MUSIC_FROM_PAGE = 4

const isValidPage = (n) => Number.isInteger(n) && n >= 1 && n <= PAGES.length
const initialPage = () => (isValidPage(startPageParam) ? startPageParam : isValidPage(loadPage()) ? loadPage() : 1)

function Flow() {
  const [page, setPage] = useState(initialPage)
  const [wipe, setWipe] = useState(null)
  const [wish, setWishState] = useState(loadWish)
  const music = useMusic()

  useEffect(() => savePage(page), [page])

  // Kalau halaman di-refresh setelah page 3, musik disambung lagi di sentuhan/klik pertama
  // (browser tidak mengizinkan audio auto-play tanpa interaksi).
  useEffect(() => {
    if (page < MUSIC_FROM_PAGE || music.started) return
    const resume = () => music.start()
    window.addEventListener('pointerdown', resume, { once: true })
    return () => window.removeEventListener('pointerdown', resume)
  }, [page, music])

  const setWish = useCallback((text) => {
    setWishState(text)
    saveWish(text)
  }, [])

  const go = useCallback((next, fx) => {
    if (!fx) return setPage(next)
    const id = Date.now()
    setWipe({ id, variant: fx })
    setTimeout(() => setPage(next), fx === 'flash' ? 600 : 780)
    setTimeout(() => setWipe((w) => (w?.id === id ? null : w)), fx === 'flash' ? 1000 : 1300)
  }, [])

  const Page = PAGES[page - 1]

  return (
    <>
      <Background night={page === PAGES.length} />
      <main className="relative z-10 overflow-x-clip">
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
          <Page key={page} go={go} wish={wish} setWish={setWish} />
        </AnimatePresence>
      </main>
      <FireworksCanvas />
      <ScreenWipe wipe={wipe} />
    </>
  )
}

export default function App() {
  return (
    <MusicProvider>
      <ToastProvider>
        <Flow />
      </ToastProvider>
    </MusicProvider>
  )
}
