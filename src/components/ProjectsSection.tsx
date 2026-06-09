import React, { useState } from 'react'
import { motion } from 'framer-motion'
import FadeIn from './FadeIn'

// ── Boşluk / Türkçe karakter içeren yollar için URL kodlayıcı ─────────────────
const img = (path: string) => encodeURI(path)

// ── Veri ──────────────────────────────────────────────────────────────────────
interface ProjectData {
  number: string
  name: string
  type: string
  description: string
  tags: string[]
  allImages: string[]
}

const PROJECTS: ProjectData[] = [
  {
    number: '01',
    name: 'Bitirme Projesi — RAG Sistemi',
    type: 'Bitirme Projesi',
    description:
      'Fırat Üniversitesi bitirme projesi kapsamında geliştirilen endüstriyel RAG tabanlı akıllı soru-cevap sistemi. Öğrenci ve idari personelin üniversite mevzuatına, yönetmeliklere ve belgelere anında erişimini sağlar. ChromaDB vektör veritabanı, yerel LLM entegrasyonu ve 4 GB VRAM kısıtlamasına optimize mimari ile çalışmaktadır.',
    tags: ['Python', 'RAG', 'ChromaDB', 'LLM', 'FastAPI', 'ASP.NET Core'],
    allImages: [
      img('/Projeler/Bitirme Projesi RAG/1770580285859.jpg'),
      img('/Projeler/Bitirme Projesi RAG/1770580286041.jpg'),
      img('/Projeler/Bitirme Projesi RAG/1770580286379.jpg'),
      img('/Projeler/Bitirme Projesi RAG/1770580286508.jpg'),
      img('/Projeler/Bitirme Projesi RAG/1770580288003.jpg'),
      img('/Projeler/Bitirme Projesi RAG/1770580288218.jpg'),
      img('/Projeler/Bitirme Projesi RAG/1770580288664.jpg'),
    ],
  },
  {
    number: '02',
    name: 'AI-Lib Projesi',
    type: 'Kişisel Proje',
    description:
      'Geliştiricilere büyük dil modellerine kolay erişim sağlayan açık kaynak Python kütüphanesi. OpenAI, Anthropic ve yerel modeller için birleşik bir arayüz sunar; birden fazla LLM sağlayıcısıyla tek API üzerinden çalışmaya olanak tanır.',
    tags: ['Python', 'LLM', 'OpenAI', 'API', 'Açık Kaynak'],
    allImages: [
      img('/Projeler/Ai-Lib Projesi/1769248429788.jpg'),
      img('/Projeler/Ai-Lib Projesi/1769248430035.jpg'),
      img('/Projeler/Ai-Lib Projesi/1769248430087.jpg'),
      img('/Projeler/Ai-Lib Projesi/1769248430099.jpg'),
      img('/Projeler/Ai-Lib Projesi/1769248430103.jpg'),
      img('/Projeler/Ai-Lib Projesi/1769248430268.jpg'),
      img('/Projeler/Ai-Lib Projesi/1769248430554.jpg'),
    ],
  },
  {
    number: '03',
    name: 'Fire Detection Sistemi',
    type: 'Görüntü İşleme',
    description:
      'OpenCV ve YOLO tabanlı gerçek zamanlı yangın ve duman tespiti sistemi. Kamera görüntüsü üzerinde saniyeler içinde anomali tespiti yaparak anlık uyarı mekanizması tetikler. Endüstriyel tesisler ve kamu binaları için düşük maliyetli güvenlik çözümü sunar.',
    tags: ['Python', 'OpenCV', 'YOLO', 'PyTorch', 'IoT', 'Gerçek Zamanlı'],
    allImages: [
      img('/Projeler/Fire Detection Projesi/1751283727733.jpg'),
      img('/Projeler/Fire Detection Projesi/1751283727733 (1).jpg'),
      img('/Projeler/Fire Detection Projesi/1751283727733 (2).jpg'),
      img('/Projeler/Fire Detection Projesi/1751283727733 (3).jpg'),
      img('/Projeler/Fire Detection Projesi/1751283727733 (4).jpg'),
      img('/Projeler/Fire Detection Projesi/1751283727733 (5).jpg'),
    ],
  },
  {
    number: '04',
    name: 'NİT Tabanlı Güvenlik Sistemi',
    type: 'Güvenlik & IoT',
    description:
      'Ağ İzleme Teknolojisi (NİT) tabanlı akıllı ev ve iş yeri güvenlik sistemi. Raspberry Pi üzerinde çalışan MQTT protokollü sensör ağı, hareket ve mesafe algılama sensörleri ile anlık bildirim sistemi. Uzak erişim ve merkezi izleme paneli içerir.',
    tags: ['Raspberry Pi', 'MQTT', 'Python', 'IoT', 'Güvenlik', 'Sensör'],
    allImages: [
      img('/Projeler/NİT Tabanlı Güvenlik Sistemi Projesi/1749317516533.jpg'),
      img('/Projeler/NİT Tabanlı Güvenlik Sistemi Projesi/1749317516533 (1).jpg'),
      img('/Projeler/NİT Tabanlı Güvenlik Sistemi Projesi/1749317516533 (2).jpg'),
      img('/Projeler/NİT Tabanlı Güvenlik Sistemi Projesi/1749317516533 (3).jpg'),
    ],
  },
]

// ── Proje Detay Modalı ────────────────────────────────────────────────────────
const ProjectModal: React.FC<{ project: ProjectData; onClose: () => void }> = ({
  project,
  onClose,
}) => (
  <div
    className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto py-6 px-4"
    style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(14px)' }}
    onClick={onClose}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 10 }}
      transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative w-full max-w-3xl rounded-[32px] sm:rounded-[40px] overflow-hidden"
      style={{
        background: '#0f0f0f',
        border: '1.5px solid rgba(215,226,234,0.14)',
        boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Yapışkan (Sticky) başlık */}
      <div
        className="sticky top-0 z-10 flex items-start justify-between gap-4 p-6 sm:p-8 border-b border-[#D7E2EA]/10"
        style={{ background: '#0f0f0f' }}
      >
        <div className="min-w-0">
          <span className="text-[#D7E2EA]/40 text-[10px] uppercase tracking-widest font-medium">
            {project.type}
          </span>
          <h2 className="text-[#D7E2EA] font-bold text-xl sm:text-2xl mt-0.5 leading-tight">
            {project.name}
          </h2>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] sm:text-[10px] font-medium uppercase tracking-wide text-[#D7E2EA]/55 border border-[#D7E2EA]/18 rounded-full px-2.5 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 w-9 h-9 rounded-full bg-[#D7E2EA]/8 hover:bg-[#D7E2EA]/18 flex items-center justify-center text-[#D7E2EA]/60 hover:text-[#D7E2EA] transition-all text-sm"
        >
          ✕
        </button>
      </div>

      {/* Görseller */}
      <div className="p-6 sm:p-8 flex flex-col gap-4">
        {project.allImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${project.name} — görsel ${i + 1}`}
            loading="lazy"
            className="w-full object-cover rounded-2xl sm:rounded-3xl"
          />
        ))}
      </div>
    </motion.div>
  </div>
)

// ── Proje Akordiyon Satırı ────────────────────────────────────────────────────
const ProjectRow: React.FC<{
  project: ProjectData
  isExpanded: boolean
  onClick: () => void
  onView: (p: ProjectData) => void
}> = ({ project, isExpanded, onClick, onView }) => {
  return (
    <div
      onClick={onClick}
      className={`group border-b border-[#D7E2EA]/10 cursor-pointer transition-all duration-300 relative overflow-hidden ${
        isExpanded ? 'bg-[#D7E2EA]/5' : 'hover:bg-[#D7E2EA]/[0.02]'
      }`}
    >
      {/* Solda hafif hover parlama şeridi */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-[#D7E2EA] transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />

      {/* Her zaman görünür başlık satırı */}
      <div className="py-6 sm:py-8 px-6 sm:px-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Sol: Numara + Başlık */}
        <div className="flex items-center gap-6 sm:gap-8 flex-1 min-w-0">
          <span className="font-black text-[#D7E2EA]/20 leading-none text-4xl sm:text-5xl md:text-6xl flex-shrink-0 transition-colors duration-300 group-hover:text-[#D7E2EA]/40">
            {project.number}
          </span>
          <div className="min-w-0">
            <span className="text-[#D7E2EA]/60 uppercase tracking-widest text-[10px] font-semibold block mb-1">
              {project.type}
            </span>
            <h3 className="text-[#D7E2EA] font-semibold text-xl sm:text-2xl md:text-3xl leading-snug truncate">
              {project.name}
            </h3>
          </div>
        </div>

        {/* Sağ: Etiketler + Buton */}
        <div className="flex flex-col items-end gap-3 flex-shrink-0">
          <div className="flex flex-wrap justify-end gap-1.5 max-w-[280px] sm:max-w-sm">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] sm:text-[10px] font-medium uppercase tracking-wide text-[#D7E2EA]/50 border border-[#D7E2EA]/15 rounded-full px-2.5 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onView(project)
            }}
            className="mt-1 rounded-full border border-[#D7E2EA]/40 text-[#D7E2EA] font-medium uppercase tracking-widest px-6 py-2 text-[10px] sm:text-xs transition-all hover:bg-[#D7E2EA] hover:text-[#0C0C0C] hover:shadow-[0_0_15px_rgba(215,226,234,0.3)] duration-300"
          >
            Projeyi Gör
          </button>
        </div>
      </div>

      {/* Genişleyen Açıklama Alanı */}
      <div
        className="transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{
          maxHeight: isExpanded ? '500px' : '0px',
          opacity: isExpanded ? 1 : 0,
        }}
      >
        <div className="px-6 sm:px-10 pb-8 pt-0 ml-[88px] sm:ml-[112px]">
          <p
            className="text-[#D7E2EA]/70 font-light leading-relaxed max-w-3xl"
            style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)' }}
          >
            {project.description}
          </p>
        </div>
      </div>
    </div>
  )
}


// ── Projeler Bölümü ───────────────────────────────────────────────────────────
const ProjectsSection: React.FC = () => {
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <>
      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}

      <section
        id="projeler"
        className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 pt-10 sm:pt-14 md:pt-20 pb-32 sm:pb-40"
      >
        <FadeIn>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-8 sm:mb-12 md:mb-16"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Projeler
          </h2>
        </FadeIn>

        <div className="max-w-6xl mx-auto flex flex-col border-t border-[#D7E2EA]/10">
          {PROJECTS.map((project, i) => (
            <FadeIn key={project.number} delay={i * 0.1} y={20}>
              <ProjectRow
                project={project}
                isExpanded={expandedIndex === i}
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                onView={setActiveProject}
              />
            </FadeIn>
          ))}
        </div>
      </section>

    </>
  )
}

export default ProjectsSection
