import React, { useState } from 'react'
import FadeIn from './FadeIn'

// ── Boşluk / Türkçe karakter içeren yollar için URL kodlayıcı ─────────────────
const img = (path: string) => encodeURI(path)

const CERTS = [
  { src: '/Sertifikalar VE Belgeler/1694801958587.jpg', alt: 'Sertifika 1' },
  { src: '/Sertifikalar VE Belgeler/1697378754318.jpg', alt: 'Sertifika 2' },
  { src: '/Sertifikalar VE Belgeler/1753176586665.jpg', alt: 'Sertifika 3' },
]

const CertificatesSection: React.FC = () => {
  const [lightbox, setLightbox] = useState<string | null>(null)

  return (
    <section
      id="sertifikalar"
      className={`relative flex flex-col items-center justify-start pt-20 sm:pt-24 md:pt-32 px-5 sm:px-8 md:px-10 pb-24 sm:pb-32 bg-[#E5E7EB] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 ${lightbox ? 'z-[100]' : 'z-20'}`}
    >
      {lightbox && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="Sertifika"
            className="max-w-[90vw] max-h-[90vh] rounded-3xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
        </div>
      )}

      <div className="flex flex-col items-center gap-10 sm:gap-14 w-full max-w-6xl relative z-10">
        <FadeIn delay={0} y={40}>
          <h2
            className="font-black uppercase leading-none tracking-tight text-center text-[#0C0C0C] mb-8"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Sertifikalar
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 w-full">
          {CERTS.map(({ src, alt }, i) => (
            <FadeIn key={src} delay={0.1 + i * 0.15} y={30}>
              <button
                onClick={() => setLightbox(img(src))}
                className="group relative w-full overflow-hidden rounded-[32px] sm:rounded-[40px] border border-black/5 hover:border-black/20 transition-all duration-300 shadow-[0_15px_30px_rgba(0,0,0,0.1)]"
              >
                <img
                  src={img(src)}
                  alt={alt}
                  loading="lazy"
                  className="w-full h-64 sm:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/60 transition-all duration-300">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs font-medium uppercase tracking-widest border border-white/50 rounded-full px-6 py-2.5 bg-black/40 backdrop-blur-sm">
                    Büyüt
                  </span>
                </div>
              </button>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CertificatesSection
