import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import CuteButton from './CuteButton'
import Mascot from './Mascot'
import { Crown, Heart, Sparkle } from './Decor'
import { COPY } from '../config/content'

const t = COPY.p10

// Semua posisi memakai koordinat foto hasil (1080×1350, rasio 4:5),
// jadi preview di layar dan file yang disimpan selalu sama persis.
const W = 1080
const H = 1350
const CARD = { x: 40, y: 40, w: 1000, h: 1270, r: 36 }
const PHOTO = { x: 80, y: 80, w: 920, h: 920, r: 24 }
const TAG = { x: 380, y: 928, w: 320, h: 76, rotate: -5 }
const TITLE_Y = 1112
const SUB_Y = 1212

const STICKERS = [
  { id: 'crown', x: 26, y: 6, w: 250, rotate: -18, el: <Crown className="block w-full" /> },
  { id: 'spark-1', x: 800, y: 36, w: 70, rotate: 0, el: <Sparkle className="block w-full" /> },
  { id: 'heart-1', x: 890, y: 42, w: 140, rotate: 14, el: <Heart className="block w-full" /> },
  { id: 'spark-2', x: 985, y: 250, w: 55, rotate: 0, el: <Sparkle className="block w-full" color="#88bbff" /> },
  { id: 'heart-2', x: 26, y: 420, w: 82, rotate: -16, el: <Heart className="block w-full" color="#5b9bf5" /> },
  { id: 'mascot-pink', x: 6, y: 772, w: 240, rotate: -8, el: <Mascot color="pink" mood="love" className="block w-full" /> },
  { id: 'mascot-blue', x: 826, y: 752, w: 254, rotate: 7, el: <Mascot color="blue" mood="joy" className="block w-full" /> },
  { id: 'heart-3', x: 92, y: 1238, w: 60, rotate: -10, el: <Heart className="block w-full" /> },
  { id: 'heart-4', x: 928, y: 1238, w: 60, rotate: 12, el: <Heart className="block w-full" color="#5b9bf5" /> },
]

const pct = (v, total) => `${(v / total) * 100}%`
const cqw = (px) => `${(px / W) * 100}cqw`

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function svgToImage(svg) {
  const clone = svg.cloneNode(true)
  const vb = svg.viewBox.baseVal
  clone.setAttribute('width', vb.width * 4)
  clone.setAttribute('height', vb.height * 4)
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  const img = new Image()
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(new XMLSerializer().serializeToString(clone))}`
  return img.decode().then(() => img)
}

function fitText(ctx, text, weight, family, size, maxWidth) {
  let s = size
  do {
    ctx.font = `${weight} ${s}px ${family}`
    s -= 2
  } while (ctx.measureText(text).width > maxWidth && s > 20)
}

/** Gambar bingkai + foto kamera + stiker + teks ke kanvas 1080×1350. */
async function compose(video, stickerEls) {
  await Promise.all([document.fonts.load('80px Pacifico'), document.fonts.load('700 56px "Dancing Script"')]).catch(() => {})
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')

  const bg = ctx.createLinearGradient(0, 0, W, H)
  bg.addColorStop(0, '#ffc4de')
  bg.addColorStop(0.5, '#ead6ff')
  bg.addColorStop(1, '#b6d6ff')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)
  roundRect(ctx, CARD.x, CARD.y, CARD.w, CARD.h, CARD.r)
  ctx.fillStyle = '#fff'
  ctx.fill()

  // Foto kamera depan: di-mirror & di-crop tengah supaya sama dengan preview
  ctx.save()
  roundRect(ctx, PHOTO.x, PHOTO.y, PHOTO.w, PHOTO.h, PHOTO.r)
  ctx.clip()
  const vw = video.videoWidth
  const vh = video.videoHeight
  const scale = Math.max(PHOTO.w / vw, PHOTO.h / vh)
  const sw = PHOTO.w / scale
  const sh = PHOTO.h / scale
  ctx.translate(PHOTO.x + PHOTO.w, PHOTO.y)
  ctx.scale(-1, 1)
  ctx.drawImage(video, (vw - sw) / 2, (vh - sh) / 2, sw, sh, 0, 0, PHOTO.w, PHOTO.h)
  ctx.restore()

  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#f7559a'
  fitText(ctx, t.frameTitle, '', 'Pacifico', 80, 900)
  ctx.fillText(t.frameTitle, W / 2, TITLE_Y)
  ctx.fillStyle = '#274fa3'
  fitText(ctx, t.frameSub, '700', '"Dancing Script"', 58, 760)
  ctx.fillText(t.frameSub, W / 2, SUB_Y)

  for (const st of STICKERS) {
    const svg = stickerEls.get(st.id)?.querySelector('svg')
    if (!svg) continue
    try {
      const img = await svgToImage(svg)
      const h = (st.w * img.naturalHeight) / img.naturalWidth
      ctx.save()
      ctx.translate(st.x + st.w / 2, st.y + h / 2)
      ctx.rotate((st.rotate * Math.PI) / 180)
      ctx.drawImage(img, -st.w / 2, -h / 2, st.w, h)
      ctx.restore()
    } catch {
      // stiker gagal dirender → lewati saja, foto tetap jadi
    }
  }

  ctx.save()
  ctx.translate(TAG.x + TAG.w / 2, TAG.y + TAG.h / 2)
  ctx.rotate((TAG.rotate * Math.PI) / 180)
  roundRect(ctx, -TAG.w / 2, -TAG.h / 2, TAG.w, TAG.h, TAG.h / 2)
  ctx.fillStyle = '#5b9bf5'
  ctx.fill()
  ctx.lineWidth = 6
  ctx.strokeStyle = '#fff'
  ctx.stroke()
  ctx.fillStyle = '#fff'
  ctx.font = '38px Pacifico'
  ctx.fillText(`${t.tag} ♡`, 0, 2)
  ctx.restore()

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.92))
  return { blob, url: URL.createObjectURL(blob) }
}

async function saveImage(blob) {
  const file = new File([blob], 'photobooth-vina-23.jpg', { type: 'image/jpeg' })
  // Di HP: pakai menu "Bagikan" bawaan (ada pilihan "Simpan Gambar"). Di laptop: unduh file.
  const touch = window.matchMedia?.('(pointer: coarse)').matches
  if (touch && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: 'Photobooth Vina 23' })
      return true
    } catch (e) {
      if (e?.name === 'AbortError') return false
    }
  }
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = file.name
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 4000)
  return true
}

/**
 * Photobooth kamera depan dengan bingkai & stiker. Semua proses terjadi di perangkat
 * Vina sendiri: tidak ada foto yang diunggah ke mana pun.
 */
export default function Photobooth({ open, onClose, onSaved }) {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const openRef = useRef(false)
  const timers = useRef([])
  const stickerEls = useRef(new Map())
  const [status, setStatus] = useState('starting')
  const [count, setCount] = useState(0)
  const [result, setResult] = useState(null)
  const [flash, setFlash] = useState(0)

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    timers.current.forEach(clearTimeout)
    timers.current = []
  }, [])

  const start = useCallback(async () => {
    setStatus('starting')
    if (!navigator.mediaDevices?.getUserMedia) return setStatus('unsupported')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 1280 } },
        audio: false,
      })
      if (!openRef.current) return stream.getTracks().forEach((track) => track.stop())
      streamRef.current = stream
      const video = videoRef.current
      video.srcObject = stream
      await video.play().catch(() => {})
      setStatus('live')
    } catch (e) {
      setStatus(e?.name === 'NotAllowedError' || e?.name === 'SecurityError' ? 'denied' : 'unsupported')
    }
  }, [])

  useEffect(() => {
    if (!open) return
    openRef.current = true
    setResult(null)
    start()
    return () => {
      openRef.current = false
      stop()
    }
  }, [open, start, stop])

  useEffect(() => () => result && URL.revokeObjectURL(result.url), [result])

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms))

  const shoot = () => {
    if (status !== 'live') return
    setStatus('counting')
    ;[3, 2, 1].forEach((n, i) => later(() => setCount(n), i * 800))
    later(async () => {
      setCount(0)
      setFlash((f) => f + 1)
      const shot = await compose(videoRef.current, stickerEls.current)
      if (!openRef.current) return URL.revokeObjectURL(shot.url)
      setResult(shot)
      setStatus('result')
    }, 2400)
  }

  const retake = () => {
    setResult(null)
    setStatus('live')
  }

  const save = async () => {
    if (result && (await saveImage(result.blob))) onSaved?.()
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[86] flex items-center justify-center bg-stitch-900/45 p-3 backdrop-blur-sm sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t.boothTitle}
            className="card-cute flex max-h-[97svh] w-full max-w-md flex-col items-center gap-3 overflow-y-auto px-4 pb-5 pt-4"
            initial={{ scale: 0.6, y: 60 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 240, damping: 18 }}
          >
            <div className="relative flex w-full items-center justify-center">
              <h2 className="font-cute text-2xl text-pinky-500">{t.boothTitle}</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup photobooth"
                className="absolute right-0 grid h-9 w-9 place-items-center rounded-full bg-pinky-100 font-round text-xl font-bold text-pinky-600 transition hover:bg-pinky-200"
              >
                ×
              </button>
            </div>

            <div className="relative w-full" style={{ maxWidth: 'min(100%, calc(64svh * 0.8))', aspectRatio: `${W} / ${H}`, containerType: 'inline-size' }}>
              <div className="absolute inset-0 overflow-hidden rounded-[3cqw] bg-linear-to-br from-pinky-200 via-[#ead6ff] to-stitch-200">
                <div className="absolute bg-white" style={{ left: pct(CARD.x, W), top: pct(CARD.y, H), width: pct(CARD.w, W), height: pct(CARD.h, H), borderRadius: cqw(CARD.r) }} />
                <div
                  className="absolute overflow-hidden bg-stitch-900"
                  style={{ left: pct(PHOTO.x, W), top: pct(PHOTO.y, H), width: pct(PHOTO.w, W), height: pct(PHOTO.h, H), borderRadius: cqw(PHOTO.r) }}
                >
                  <video ref={videoRef} playsInline muted autoPlay className="h-full w-full -scale-x-100 object-cover" />
                  {(status === 'starting' || status === 'denied' || status === 'unsupported') && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-linear-to-br from-pinky-100 to-stitch-100 p-6 text-center">
                      <Mascot color="blue" mood={status === 'starting' ? 'happy' : 'wow'} className="anim-bob w-1/3" />
                      <p className="font-script text-lg font-bold text-stitch-700">
                        {status === 'starting' ? t.boothLoading : status === 'denied' ? t.boothDenied : t.boothUnsupported}
                      </p>
                    </div>
                  )}
                </div>

                <p
                  className="absolute inset-x-0 whitespace-nowrap text-center font-cute leading-none text-pinky-500"
                  style={{ top: pct(TITLE_Y, H), fontSize: cqw(72), transform: 'translateY(-50%)' }}
                >
                  {t.frameTitle}
                </p>
                <p
                  className="absolute inset-x-0 text-center font-script font-bold leading-none text-stitch-700"
                  style={{ top: pct(SUB_Y, H), fontSize: cqw(58), transform: 'translateY(-50%)' }}
                >
                  {t.frameSub}
                </p>

                {STICKERS.map((st) => (
                  <div
                    key={st.id}
                    ref={(el) => (el ? stickerEls.current.set(st.id, el) : stickerEls.current.delete(st.id))}
                    className="pointer-events-none absolute"
                    style={{ left: pct(st.x, W), top: pct(st.y, H), width: pct(st.w, W), rotate: `${st.rotate}deg` }}
                  >
                    {st.el}
                  </div>
                ))}
                <span
                  className="pointer-events-none absolute flex items-center justify-center rounded-full bg-stitch-400 font-cute text-white"
                  style={{
                    left: pct(TAG.x, W),
                    top: pct(TAG.y, H),
                    width: pct(TAG.w, W),
                    height: pct(TAG.h, H),
                    rotate: `${TAG.rotate}deg`,
                    fontSize: cqw(38),
                    border: `${cqw(6)} solid #fff`,
                  }}
                >
                  {t.tag} ♡
                </span>
              </div>

              {result && <img src={result.url} alt="Hasil photobooth" className="absolute inset-0 h-full w-full rounded-[3cqw] object-cover" />}

              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    className="text-outline absolute inset-0 grid place-items-center font-cute text-pinky-500"
                    style={{ fontSize: cqw(300) }}
                    initial={{ scale: 0.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.6, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <div className="flex min-h-16 flex-wrap items-center justify-center gap-3">
              {status === 'result' ? (
                <>
                  <CuteButton onClick={save}>{t.boothSave} 💾</CuteButton>
                  <CuteButton tone="blue" onClick={retake}>
                    {t.boothRetake}
                  </CuteButton>
                </>
              ) : status === 'denied' || status === 'unsupported' ? (
                <CuteButton tone="blue" onClick={start}>
                  {t.boothRetry}
                </CuteButton>
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <CuteButton onClick={shoot} disabled={status !== 'live'} className="px-10">
                    {t.boothShoot} 📸
                  </CuteButton>
                  <span className="font-script text-base font-bold text-stitch-600">{t.boothHint}</span>
                </div>
              )}
            </div>
          </motion.div>

          <AnimatePresence>
            {flash > 0 && (
              <motion.div
                key={flash}
                className="pointer-events-none fixed inset-0 bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.95, 0] }}
                transition={{ duration: 0.5, times: [0, 0.15, 1] }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
