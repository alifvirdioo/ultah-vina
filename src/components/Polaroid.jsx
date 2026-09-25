import { useState } from 'react'
import { Heart } from './Decor'

/** Placeholder manis yang tampil selama foto aslinya belum dimasukkan. */
function PhotoPlaceholder({ label }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-linear-to-br from-pinky-100 via-white to-stitch-100 text-stitch-700">
      <Heart className="anim-beat w-1/4 max-w-12" color="#ff9ec7" />
      {label && <span className="font-script text-[clamp(0.7rem,2.4vw,1rem)] font-semibold opacity-70">{label}</span>}
    </div>
  )
}

export default function Polaroid({ src, caption, label, tape, className = '', children, style }) {
  const [broken, setBroken] = useState(!src)

  return (
    <figure className={`polaroid ${className}`} style={style}>
      {tape && <span className={`tape ${tape === 'blue' ? 'tape-blue' : ''}`} />}
      <div className="relative aspect-square overflow-hidden rounded-[3px] bg-pinky-50">
        {broken ? (
          <PhotoPlaceholder label={label} />
        ) : (
          <img
            src={src}
            alt={caption || label || 'foto kita'}
            loading="lazy"
            decoding="async"
            draggable={false}
            onError={() => setBroken(true)}
            className="h-full w-full select-none object-cover"
          />
        )}
      </div>
      <figcaption>{caption || ' '}</figcaption>
      {children}
    </figure>
  )
}
