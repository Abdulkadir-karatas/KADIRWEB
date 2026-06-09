import React from 'react'
import FadeIn from './FadeIn'

interface Service {
  number: string
  name: string
  description: string
}

const SERVICES: Service[] = [
  {
    number: '01',
    name: 'Yapay Zeka & LLM',
    description:
      'RAG sistemleri, büyük dil modeli entegrasyonu ve chatbot geliştirme. 4 GB VRAM kısıtlamasına optimize yerel LLM çözümleri ve ChromaDB tabanlı vektör veritabanı mimarileri.',
  },
  {
    number: '02',
    name: 'Görüntü İşleme',
    description:
      'OpenCV ve PyTorch ile gerçek zamanlı video analizi, nesne tanıma ve sınıflandırma. Endüstriyel kalite kontrol ve akıllı kamera sistemleri geliştirme.',
  },
  {
    number: '03',
    name: 'IoT & Gömülü Sistemler',
    description:
      'Raspberry Pi ve Arduino tabanlı sensör ağları, MQTT protokolü ile bulut entegrasyonu ve akıllı çevre izleme sistemleri geliştirme.',
  },
  {
    number: '04',
    name: 'Web & API Geliştirme',
    description:
      'ASP.NET Core ile RESTful API tasarımı ve modern, kullanıcı odaklı web arayüzleri. React tabanlı SPA mimarileri ve gerçek zamanlı veri akışı yönetimi.',
  },
  {
    number: '05',
    name: 'Mobil Geliştirme',
    description:
      'React Native ile iOS ve Android için çapraz platform mobil uygulamalar. Modern UI/UX tasarımı, native API entegrasyonu ve gerçek zamanlı veri senkronizasyonu.',
  },
  {
    number: '06',
    name: 'Otomasyon',
    description:
      'Python ile iş süreçleri otomasyonu, web scraping, görev planlama ve veri boru hattı geliştirme. Tekrarlayan işleri akıllı, ölçeklenebilir sistemlere dönüştürme.',
  },
]

// ── Tekil hizmet satırı (her sütun içinde kullanılır) ──────────────────────
const ServiceRow: React.FC<{
  service: Service
  delay: number
  isLast: boolean
}> = ({ service, delay, isLast }) => (
  <FadeIn delay={delay}>
    <div
      className="flex gap-4 sm:gap-6 items-start py-8 sm:py-10"
      style={{
        borderTop: '1px solid rgba(12,12,12,0.15)',
        borderBottom: isLast ? '1px solid rgba(12,12,12,0.15)' : 'none',
      }}
    >
      {/* Büyük numara */}
      <span
        className="font-black text-[#0C0C0C] leading-none flex-shrink-0 select-none"
        style={{ fontSize: 'clamp(2.5rem, 7vw, 100px)' }}
      >
        {service.number}
      </span>

      {/* İsim + açıklama */}
      <div className="flex flex-col gap-1 sm:gap-2 pt-1">
        <h3
          className="font-medium uppercase text-[#0C0C0C]"
          style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.6rem)' }}
        >
          {service.name}
        </h3>
        <p
          className="font-light leading-relaxed text-[#0C0C0C]"
          style={{
            fontSize: 'clamp(0.78rem, 1.1vw, 1rem)',
            opacity: 0.58,
          }}
        >
          {service.description}
        </p>
      </div>
    </div>
  </FadeIn>
)

// ── Bölüm ──────────────────────────────────────────────────────────────────────
const ServicesSection: React.FC = () => {
  const leftCol  = SERVICES.slice(0, 3)   // 01, 02, 03
  const rightCol = SERVICES.slice(3)      // 04, 05, 06

  return (
    <section
      id="hizmetler"
      className="bg-[#E5E7EB] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-12 sm:pt-16 md:pt-20 pb-20 sm:pb-24 md:pb-32"
    >
      {/* Başlık */}
      <FadeIn>
        <h2
          className="font-black uppercase leading-none tracking-tight text-center text-[#0C0C0C] mb-8 sm:mb-12 md:mb-16"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          HİZMETLER
        </h2>
      </FadeIn>

      {/*
        3 satır × 2 sütun
        • Mobil  (< md): tek sütun, tüm 6 öğe alt alta
        • Masaüstü (≥ md): sol sütun = 01-02-03 │ sağ sütun = 04-05-06
      */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
        {/* Sol sütun — hizmetler 01, 02, 03 */}
        <div>
          {leftCol.map((service, i) => (
            <ServiceRow
              key={service.number}
              service={service}
              delay={i * 0.07}
              isLast={i === leftCol.length - 1}
            />
          ))}
        </div>

        {/* Sağ sütun — hizmetler 04, 05, 06 */}
        <div>
          {rightCol.map((service, i) => (
            <ServiceRow
              key={service.number}
              service={service}
              delay={i * 0.07 + 0.12}
              isLast={i === rightCol.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
