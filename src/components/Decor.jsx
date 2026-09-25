// Ikon-ikon kecil (SVG) yang dipakai di banyak halaman.

export const HEART_D =
  'M16 28.5C16 28.5 1 19 1 9.5 1 4.5 5 1 9.5 1c3 0 5.3 1.7 6.5 4 1.2-2.3 3.5-4 6.5-4C27 1 31 4.5 31 9.5 31 19 16 28.5 16 28.5z'

export function Heart({ className = '', color = '#ff78b0', shine = true, style }) {
  return (
    <svg viewBox="0 0 32 30" className={className} style={style} aria-hidden="true">
      <path d={HEART_D} fill={color} />
      {shine && <ellipse cx="9" cy="8" rx="3.2" ry="2" fill="#fff" opacity=".55" transform="rotate(-30 9 8)" />}
    </svg>
  )
}

export function Flower({ className = '', petal = '#ff9ec7', center = '#ffcf5c', petals = 5, style }) {
  return (
    <svg viewBox="-50 -50 100 100" className={className} style={style} aria-hidden="true">
      {Array.from({ length: petals }, (_, i) => (
        <ellipse key={i} cx="0" cy="-24" rx="15" ry="24" fill={petal} transform={`rotate(${(i * 360) / petals})`} />
      ))}
      <circle r="13" fill={center} />
      <circle r="4.5" cx="-4" cy="-4" fill="#fff" opacity=".6" />
    </svg>
  )
}

export function Sparkle({ className = '', color = '#ffcf5c', style }) {
  return (
    <svg viewBox="-50 -50 100 100" className={className} style={style} aria-hidden="true">
      <path d="M0 -50 C6 -8 8 -6 50 0 C8 6 6 8 0 50 C-6 8 -8 6 -50 0 C-8 -6 -6 -8 0 -50Z" fill={color} />
    </svg>
  )
}

export function Clock({ className = '' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="24" cy="18" r="11" fill="#ff78b0" />
      <circle cx="76" cy="18" r="11" fill="#ff78b0" />
      <path d="M30 88 L22 97 M70 88 L78 97" stroke="#274fa3" strokeWidth="6" strokeLinecap="round" />
      <circle cx="50" cy="54" r="38" fill="#fff" stroke="#3f7fe6" strokeWidth="7" />
      {Array.from({ length: 12 }, (_, i) => (
        <line
          key={i}
          x1="50"
          y1="22"
          x2="50"
          y2={i % 3 === 0 ? 29 : 26}
          stroke={i % 3 === 0 ? '#f7559a' : '#88bbff'}
          strokeWidth={i % 3 === 0 ? 3.5 : 2.5}
          strokeLinecap="round"
          transform={`rotate(${i * 30} 50 54)`}
        />
      ))}
      <line className="clock-hand" x1="50" y1="54" x2="50" y2="38" stroke="#1d2f5c" strokeWidth="5" strokeLinecap="round" style={{ animationDuration: '12s' }} />
      <line className="clock-hand" x1="50" y1="54" x2="50" y2="28" stroke="#f7559a" strokeWidth="3.5" strokeLinecap="round" style={{ animationDuration: '2s' }} />
      <circle cx="50" cy="54" r="4.5" fill="#1d2f5c" />
    </svg>
  )
}

export function Balloon({ className = '', color = '#ff78b0', text, style }) {
  return (
    <svg viewBox="0 0 60 118" className={className} style={style} aria-hidden="true">
      <path d="M30 72 C30 82 23 88 31 97 S27 110 30 118" stroke="#9aa9c9" strokeWidth="1.4" fill="none" />
      <ellipse cx="30" cy="36" rx="27" ry="33" fill={color} />
      <path d="M25 68 L35 68 L30 75 Z" fill={color} />
      <ellipse cx="19" cy="22" rx="6" ry="10" fill="#fff" opacity=".45" transform="rotate(-22 19 22)" />
      {text && (
        <text x="30" y="49" textAnchor="middle" fontFamily="Pacifico, cursive" fontSize="30" fill="#fff">
          {text}
        </text>
      )}
    </svg>
  )
}

export function Crown({ className = '', style }) {
  return (
    <svg viewBox="0 0 64 46" className={className} style={style} aria-hidden="true">
      <path d="M4 38 L8 10 L22 24 L32 4 L42 24 L56 10 L60 38 Z" fill="#ffd36e" stroke="#f0a92e" strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="3" y="35" width="58" height="8" rx="3.5" fill="#ffc23d" stroke="#f0a92e" strokeWidth="2" />
      <circle cx="32" cy="5" r="3.8" fill="#ff78b0" />
      <circle cx="8" cy="10" r="3.2" fill="#5b9bf5" />
      <circle cx="56" cy="10" r="3.2" fill="#5b9bf5" />
      <circle cx="32" cy="28" r="4" fill="#ff78b0" />
      <circle cx="18" cy="31" r="2.6" fill="#5b9bf5" />
      <circle cx="46" cy="31" r="2.6" fill="#5b9bf5" />
    </svg>
  )
}

export function Bow({ className = '' }) {
  return (
    <svg viewBox="0 0 120 64" className={className} aria-hidden="true">
      <path d="M60 40 C40 6 6 4 10 30 C13 50 42 50 60 40Z" fill="#5b9bf5" stroke="#2f64c9" strokeWidth="3" />
      <path d="M60 40 C80 6 114 4 110 30 C107 50 78 50 60 40Z" fill="#5b9bf5" stroke="#2f64c9" strokeWidth="3" />
      <path d="M52 44 L40 62 M68 44 L80 62" stroke="#2f64c9" strokeWidth="7" strokeLinecap="round" />
      <ellipse cx="60" cy="40" rx="11" ry="10" fill="#3f7fe6" stroke="#2f64c9" strokeWidth="3" />
      <ellipse cx="30" cy="24" rx="7" ry="4" fill="#fff" opacity=".4" transform="rotate(-20 30 24)" />
    </svg>
  )
}

export function Envelope({ className = '' }) {
  return (
    <svg viewBox="0 0 40 30" className={className} aria-hidden="true">
      <rect x="1.5" y="1.5" width="37" height="27" rx="4" fill="#fff" stroke="currentColor" strokeWidth="2.5" />
      <path d="M3 4 L20 17 L37 4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d={HEART_D} fill="#ff78b0" transform="translate(15 17) scale(.32)" />
    </svg>
  )
}
