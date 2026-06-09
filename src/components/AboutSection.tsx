import React, { useState } from 'react'
import FadeIn from './FadeIn'
import AnimatedText from './AnimatedText'
import ContactButton from './ContactButton'

// ── Köşe dekoratifleri ────────────────────────────────────────────────────────
const CORNER_IMAGES = [
  {
    key: 'moon',
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
    alt: 'Ay ikonu',
    posClass: 'absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px]',
    delay: 0.1,
    x: -80,
  },
  {
    key: 'obj',
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
    alt: '3D nesne',
    posClass: 'absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px]',
    delay: 0.25,
    x: -80,
  },
  {
    key: 'lego',
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
    alt: 'Lego ikonu',
    posClass: 'absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px]',
    delay: 0.15,
    x: 80,
  },
  {
    key: 'group',
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
    alt: '3D grup',
    posClass: 'absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px]',
    delay: 0.3,
    x: 80,
  },
]

const ABOUT_TEXT =
  "Merhaba, ben Abdulkadir Karataş.\n\nYenilikçi teknolojileri ve karmaşık mühendislik problemlerini çözmeyi tutku haline getirmiş bir Bilgisayar Mühendisiyim.\n\nYapay Zeka (AI), Büyük Dil Modelleri (LLM), API tabanlı RAG mimarileri, Nesnelerin İnterneti (IoT) ve sistem simülasyonları temel ilgi alanlarımı oluşturuyor. Bu alanlardaki teorik altyapımı, kurumsal sektörde edindiğim tecrübelerle harmanlıyorum. SANshine'da SAP ABAP ile kurumsal kaynak planlama (ERP) otomasyonları üzerine çalışırken, SMLabs'te .NET altyapısıyla dijital dönüşüm ve web projelerinin mimarisinde aktif rol aldım.\n\nTemel hedefim; donanım kısıtlamalarını aşan optimize edilmiş algoritmalar, veri gizliliğini (privacy-first) merkeze alan yerel yapay zeka sistemleri ve güvenilir yazılım mimarileri inşa ederek, teknolojik altyapılara kalıcı, güvenli ve yüksek performanslı çözümler kazandırmaktır."

// ── PDF Görüntüleyici Modalı ──────────────────────────────────────────────────
interface PdfModalProps {
  url: string
  title: string
  onClose: () => void
}

const PdfModal: React.FC<PdfModalProps> = ({ url, title, onClose }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center"
    style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
    onClick={onClose}
  >
    <div
      className="relative w-[95vw] max-w-4xl h-[90vh] rounded-3xl overflow-hidden flex flex-col"
      style={{ background: '#111', border: '1.5px solid rgba(215,226,234,0.18)' }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Başlık çubuğu */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#D7E2EA]/10 flex-shrink-0">
        <span className="text-[#D7E2EA] font-medium text-sm uppercase tracking-widest">{title}</span>
        <div className="flex items-center gap-3">
          <a
            href={url}
            download
            className="text-[#D7E2EA]/60 hover:text-[#D7E2EA] text-xs uppercase tracking-wider transition-colors border border-[#D7E2EA]/20 rounded-full px-4 py-1.5 hover:border-[#D7E2EA]/50"
          >
            İndir
          </a>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#D7E2EA]/60 hover:text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-all text-lg leading-none"
          >
            ✕
          </button>
        </div>
      </div>
      {/* PDF gömme */}
      <iframe
        src={`${url}#toolbar=0`}
        title={title}
        className="flex-1 w-full"
        style={{ border: 'none' }}
      />
    </div>
  </div>
)

// ── Bölüm ─────────────────────────────────────────────────────────────────────
const AboutSection: React.FC = () => {
  const [modal, setModal] = useState<{ url: string; title: string } | null>(null)

  const openCv = () =>
    setModal({ url: '/Abdulkadir Karataş CV.pdf', title: 'Abdulkadir Karataş — CV' })

  const openThesis = () =>
    setModal({
      url: '/abdulkadir karataş bitirme tezi.pdf',
      title: 'Abdulkadir Karataş — Bitirme Tezi',
    })

  return (
    <>
      {/* PDF Görüntüleyici Modalı */}
      {modal && (
        <PdfModal url={modal.url} title={modal.title} onClose={() => setModal(null)} />
      )}

      <section
        id="about"
        className="min-h-screen relative flex flex-col items-center justify-start pt-12 sm:pt-16 md:pt-20 px-5 sm:px-8 md:px-10 pb-24"
      >
        {/* Köşe 3D dekoratifleri */}
        {CORNER_IMAGES.map(({ key, src, alt, posClass, delay, x }) => (
          <FadeIn key={key} delay={delay} x={x} y={0} duration={0.9} className={posClass}>
            <img src={src} alt={alt} className="w-full" draggable={false} />
          </FadeIn>
        ))}

        {/* Orta içerik */}
        <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10 relative z-10 w-full">
          <FadeIn delay={0} y={40}>
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight text-center"
              style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            >
              Hakkımda
            </h2>
          </FadeIn>

          <div className="flex flex-col items-center gap-8 sm:gap-10 w-full">
            {/* Yazılı biyografi — okuma sütununa kadar tam genişlik, sola hizalı */}
            <AnimatedText
              text={ABOUT_TEXT}
              className="text-[#D7E2EA] font-light leading-[1.9] max-w-2xl w-full px-2 sm:px-0"
              style={{ fontSize: 'clamp(1rem, 1.7vw, 1.2rem)' }}
            />

            {/* Belge butonları satırı */}
            <FadeIn delay={0.2} y={20}>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                {/* CV butonu */}
                <button
                  onClick={openCv}
                  className="flex items-center gap-2 rounded-full border-2 border-[#D7E2EA]/40 text-[#D7E2EA] font-medium uppercase tracking-widest px-7 py-3 text-sm transition-all hover:border-[#D7E2EA] hover:bg-[#D7E2EA]/8"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                  </svg>
                  CV Görüntüle
                </button>

                {/* Tez butonu */}
                <button
                  onClick={openThesis}
                  className="flex items-center gap-2 rounded-full border-2 border-[#D7E2EA]/40 text-[#D7E2EA] font-medium uppercase tracking-widest px-7 py-3 text-sm transition-all hover:border-[#D7E2EA] hover:bg-[#D7E2EA]/8"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                  </svg>
                  Bitirme Tezi
                </button>

                {/* İletişim */}
                <ContactButton />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutSection
