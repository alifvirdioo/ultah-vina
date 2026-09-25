/**
 * Maskot alien imut bergaya Stitch (gambar orisinal, bukan aset Disney).
 * color: 'blue' | 'pink'
 * mood : 'happy' | 'love' | 'wink' | 'joy' | 'tongue' | 'wow' | 'cover'
 */
const PALETTES = {
  blue: { main: '#5b8def', dark: '#3c6bd6', light: '#b3d0ff', inner: '#ff9ec7', nose: '#1e2a55' },
  pink: { main: '#ff8fc0', dark: '#e5679f', light: '#ffd6ea', inner: '#8fc1ff', nose: '#6b2346' },
}

const heartPath = (cx, cy, s) =>
  `M${cx} ${cy + s * 0.9} C${cx - s * 1.7} ${cy - s * 0.15} ${cx - s * 0.85} ${cy - s * 1.35} ${cx} ${cy - s * 0.45} ` +
  `C${cx + s * 0.85} ${cy - s * 1.35} ${cx + s * 1.7} ${cy - s * 0.15} ${cx} ${cy + s * 0.9} Z`

function Eyes({ mood }) {
  if (mood === 'love') {
    return (
      <g className="anim-beat" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
        <path d={heartPath(72, 100, 13)} fill="#ff4f8f" />
        <path d={heartPath(128, 100, 13)} fill="#ff4f8f" />
        <circle cx="67" cy="94" r="3" fill="#fff" opacity=".8" />
        <circle cx="123" cy="94" r="3" fill="#fff" opacity=".8" />
      </g>
    )
  }
  if (mood === 'joy') {
    return (
      <g stroke="#141b3a" strokeWidth="5" strokeLinecap="round" fill="none">
        <path d="M60 104 Q72 90 84 104" />
        <path d="M116 104 Q128 90 140 104" />
      </g>
    )
  }
  const open = (cx) => (
    <g key={cx}>
      <ellipse cx={cx} cy="100" rx="13" ry="16" fill="#141b3a" />
      <circle cx={cx + 5} cy="93" r="5.5" fill="#fff" />
      <circle cx={cx - 4} cy="107" r="2.5" fill="#fff" opacity=".8" />
    </g>
  )
  if (mood === 'wink' || mood === 'tongue') {
    return (
      <g>
        <g className="mascot-eyes">{open(72)}</g>
        <path d="M116 102 Q128 90 140 102" stroke="#141b3a" strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>
    )
  }
  return <g className="mascot-eyes">{[open(72), open(128)]}</g>
}

function Mouth({ mood, c }) {
  if (mood === 'wow') {
    return (
      <g>
        <ellipse cx="100" cy="140" rx="7" ry="8" fill={c.nose} />
        <ellipse cx="100" cy="143" rx="4" ry="3.5" fill="#ff7fa8" />
      </g>
    )
  }
  return (
    <g>
      {mood === 'tongue' && <path d="M96 138 Q95 152 102 152 Q109 152 108 138 Z" fill="#ff6f9f" />}
      <path d="M84 134 Q100 148 116 134" stroke={c.nose} strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </g>
  )
}

export default function Mascot({ color = 'blue', mood = 'happy', body = true, className = '', title }) {
  const c = PALETTES[color] ?? PALETTES.blue
  const viewBox = body ? '0 0 200 212' : '0 0 200 166'

  return (
    <svg viewBox={viewBox} className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}

      {body && (
        <g>
          <ellipse cx="100" cy="184" rx="40" ry="27" fill={c.main} />
          <ellipse cx="100" cy="190" rx="24" ry="16" fill={c.light} />
          {mood !== 'cover' && (
            <>
              <ellipse cx="58" cy="178" rx="12" ry="9" fill={c.main} transform="rotate(-25 58 178)" />
              <ellipse cx="142" cy="178" rx="12" ry="9" fill={c.main} transform="rotate(25 142 178)" />
            </>
          )}
          <ellipse cx="80" cy="207" rx="12" ry="6" fill={c.dark} />
          <ellipse cx="120" cy="207" rx="12" ry="6" fill={c.dark} />
        </g>
      )}

      <g className="mascot-ear-l">
        <path d="M62 74 Q24 44 4 22 Q10 72 52 106 Z" fill={c.main} />
        <path d="M57 81 Q31 58 17 41 Q23 72 52 98 Z" fill={c.inner} />
      </g>
      <g className="mascot-ear-r">
        <path d="M138 74 Q176 44 196 22 Q190 72 148 106 Z" fill={c.main} />
        <path d="M143 81 Q169 58 183 41 Q177 72 148 98 Z" fill={c.inner} />
      </g>

      {color === 'pink' && (
        <g>
          <path d="M100 60 C96 40 110 32 116 20" stroke={c.dark} strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d={heartPath(117, 16, 7)} fill="#ff4f8f" />
        </g>
      )}

      <ellipse cx="100" cy="108" rx="60" ry="52" fill={c.main} />
      <path d="M86 58 Q100 84 114 58 Q100 53 86 58Z" fill={c.dark} opacity=".65" />
      <ellipse cx="100" cy="133" rx="34" ry="22" fill={c.light} />

      <Eyes mood={mood} />

      <ellipse cx="100" cy="120" rx="13" ry="9" fill={c.nose} />
      <ellipse cx="96" cy="117" rx="4" ry="2.2" fill="#fff" opacity=".55" />
      <Mouth mood={mood} c={c} />

      <ellipse cx="60" cy="128" rx="9" ry="5.5" fill="#ff7fb0" opacity=".55" />
      <ellipse cx="140" cy="128" rx="9" ry="5.5" fill="#ff7fb0" opacity=".55" />

      {mood === 'cover' && (
        <g>
          <ellipse cx="72" cy="100" rx="23" ry="18" fill={c.main} stroke={c.dark} strokeWidth="2.5" />
          <ellipse cx="128" cy="100" rx="23" ry="18" fill={c.main} stroke={c.dark} strokeWidth="2.5" />
          <g fill={c.light}>
            <circle cx="62" cy="92" r="4" />
            <circle cx="72" cy="88" r="4" />
            <circle cx="82" cy="92" r="4" />
            <circle cx="118" cy="92" r="4" />
            <circle cx="128" cy="88" r="4" />
            <circle cx="138" cy="92" r="4" />
          </g>
        </g>
      )}
    </svg>
  )
}
