import React, { useEffect, useRef, useState } from 'react'

// ── /public/GIFLER klasöründen Yerel GIF'ler ────────────────────────────────
const TOP_GIFS = [
  '/GIFLER/sql.jpg',
  '/GIFLER/1-pe6N_-1HupnKplcXTzS4_g.gif',
  '/GIFLER/görüntü.gif',
  '/GIFLER/oto.gif',
]

const BOTTOM_GIFS = [
  '/GIFLER/llm.gif',
  '/GIFLER/f47fd896add554744b4114d964b61b41.gif',
  '/GIFLER/iot.gif',
  '/GIFLER/mobil.gif',
]

// Kesintisiz sonsuz hissi veren kaydırma için tekrarla
const ROW1 = [...TOP_GIFS, ...TOP_GIFS, ...TOP_GIFS, ...TOP_GIFS]
const ROW2 = [...BOTTOM_GIFS, ...BOTTOM_GIFS, ...BOTTOM_GIFS, ...BOTTOM_GIFS]

const TILE_W = 420
const TILE_H = 270

const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(200)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const sectionTop =
        sectionRef.current.getBoundingClientRect().top + window.scrollY
      const scrollOffset =
        (window.scrollY - sectionTop + window.innerHeight) * 0.3
      setOffset(scrollOffset)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
    >
      {/* 1. Satır — kaydırma ile SAĞA hareket eder */}
      <div
        className="flex gap-3 mb-3"
        style={{
          transform: `translateX(${offset - 200}px)`,
          willChange: 'transform',
        }}
      >
        {ROW1.map((url, i) => (
          <img
            key={i}
            src={url}
            loading="lazy"
            alt=""
            aria-hidden="true"
            className="rounded-2xl flex-shrink-0"
            style={{
              width: TILE_W,
              height: TILE_H,
              objectFit: 'cover',
            }}
          />
        ))}
      </div>

      {/* 2. Satır — kaydırma ile SOLA hareket eder */}
      <div
        className="flex gap-3"
        style={{
          transform: `translateX(${-(offset - 200)}px)`,
          willChange: 'transform',
        }}
      >
        {ROW2.map((url, i) => (
          <img
            key={i}
            src={url}
            loading="lazy"
            alt=""
            aria-hidden="true"
            className="rounded-2xl flex-shrink-0"
            style={{
              width: TILE_W,
              height: TILE_H,
              objectFit: 'cover',
            }}
          />
        ))}
      </div>
    </section>
  )
}

export default MarqueeSection
