import React, { useRef, Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, useAnimations, Html } from '@react-three/drei'
import * as THREE from 'three'
import FadeIn from './FadeIn'
import ContactButton from './ContactButton'
import { Mail } from 'lucide-react'

// ── Hata Sınırı ──────────────────────────────────────────────────────────────
class ModelErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: any }> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error }
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.error("3D Model Yükleme Hatası:", error, errorInfo)
  }
  render() {
    if (this.state.hasError) {
      return (
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshBasicMaterial color="yellow" />
        </mesh>
      )
    }
    return this.props.children
  }
}

// ── 3D Model ──────────────────────────────────────────────────────────────────
const MODELS = [
  '/model.glb',
  '/model/model (3).glb',
  '/model/model (4).glb',
  '/model/model (5).glb',
  '/model/model (6).glb',
  '/model/model (7).glb',
  '/model/model (8).glb',
  '/model/model (9).glb',
  '/model/model (10).glb',
  '/model/model (11).glb'
]

const ModelViewer: React.FC<{ modelPath: string; isMain: boolean; onAnimationComplete: () => void }> = ({ modelPath, isMain, onAnimationComplete }) => {
  const groupRef = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF(modelPath)
  const { actions, mixer } = useAnimations(animations, groupRef)

  useEffect(() => {
    if (actions && mixer) {
      const names = Object.keys(actions)
      if (names.length > 0) {
        const action = actions[names[0]]
        if (action) {
          action.reset()

          if (!isMain) {
            // Tıklanınca açılan model (animasyon bitince geri döner)
            action.setLoop(THREE.LoopOnce, 1)
            // eslint-disable-next-line react-hooks/immutability
            action.clampWhenFinished = true
            action.play()

            const onFinished = (e: any) => {
              if (e.action === action) {
                onAnimationComplete()
              }
            }
            mixer.addEventListener('finished', onFinished)
            return () => {
              mixer.removeEventListener('finished', onFinished)
            }
          } else {
            // Ana model (sürekli döngü)
            action.setLoop(THREE.LoopRepeat, Infinity)
            action.play()
          }
        } else if (!isMain) {
          setTimeout(onAnimationComplete, 1000)
        }
      } else if (!isMain) {
        setTimeout(onAnimationComplete, 1000)
      }
    }
  }, [actions, mixer, isMain, onAnimationComplete])

  return (
    <group ref={groupRef}>
      <primitive object={scene} position={[0, -1.8, 0]} scale={1.35} />
    </group>
  )
}

const HeroModel: React.FC = () => {
  const [currentModel, setCurrentModel] = useState('/model/model (3).glb')
  const [nextModelIndex, setNextModelIndex] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio('/whoosh.mp3')
    audioRef.current.volume = 0.6
  }, [])

  const handleClick = (e: any) => {
    e.stopPropagation()
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(err => console.log("Audio play error:", err))
    }
    // Tıklamada her zaman bir sonraki modele geç (animasyon bitmesini beklemeden)
    setCurrentModel(MODELS[nextModelIndex])
    setNextModelIndex((prev) => (prev + 1) % MODELS.length)
  }

  return (
    <group onClick={handleClick}>
      <ModelViewer
        key={currentModel}
        modelPath={currentModel}
        isMain={currentModel === '/model/model (3).glb'}
        onAnimationComplete={() => setCurrentModel('/model/model (3).glb')}
      />
    </group>
  )
}

useGLTF.preload('/model/model (3).glb')
// Diğer modeller tıklandıkça yüklenecek (performans ve bant genişliği için preload kaldırıldı)

// ── Daktilo Animasyon Bileşeni ───────────────────────────────────────────────
const TypewriterText: React.FC = () => {
  const [text, setText] = useState('')
  const fullText = "yapay zeka ve dijital çözümler üreten bilgisayar mühendisi"

  useEffect(() => {
    let currentText = ''
    let isDeleting = false
    let timer: ReturnType<typeof setTimeout>

    const tick = () => {
      if (!isDeleting) {
        currentText = fullText.substring(0, currentText.length + 1)
        setText(currentText)
        if (currentText === fullText) {
          isDeleting = true
          timer = setTimeout(tick, 3000)
        } else {
          timer = setTimeout(tick, 60 + Math.random() * 40)
        }
      } else {
        currentText = fullText.substring(0, currentText.length - 1)
        setText(currentText)
        if (currentText === '') {
          isDeleting = false
          timer = setTimeout(tick, 800)
        } else {
          timer = setTimeout(tick, 20)
        }
      }
    }

    timer = setTimeout(tick, 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <p
      className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug whitespace-nowrap overflow-hidden text-ellipsis flex-1 mr-4"
      style={{ fontSize: 'clamp(0.6rem, 1.4vw, 1.1rem)' }}
    >
      {text}
      <span className="animate-pulse font-light ml-1 text-[#D7E2EA]">|</span>
    </p>
  )
}

// ── Navigasyon ─────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Hakkımda', href: '#about' },
  { label: 'Hizmetler', href: '#hizmetler' },
  { label: 'Sertifikalar', href: '#sertifikalar' },
  { label: 'Projeler', href: '#projeler' },
  { label: 'İletişim', href: '#iletisim' },
]

// ── Bölüm ──────────────────────────────────────────────────────────────────────
const HeroSection: React.FC = () => (
  <section
    id="home"
    className="h-screen flex flex-col"
    style={{ overflowX: 'clip' }}
  >
    {/* ── Navbar ────────────────────────────────────────────────────────────── */}
    <FadeIn delay={0} y={-20}>
      <nav className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 shrink-0">
        {NAV_LINKS.map(({ label, href }, index) => (
          <React.Fragment key={label}>
            <a
              href={href}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70"
            >
              {label}
            </a>
            {index < NAV_LINKS.length - 1 && (
              <div className="h-4 sm:h-6 md:h-8 w-[2px] bg-[#D7E2EA]/30 mx-2 sm:mx-4" />
            )}
          </React.Fragment>
        ))}
      </nav>
    </FadeIn>

    {/* ── İçerik satırı: METİN solda │ TUVAL sağda ────────────────────────────── */}
    <div className="flex-1 flex flex-col md:flex-row min-h-0">

      {/* Sol — isim (iki satır, sol sütun genişliğini doldurur) ─────────────────── */}
      <FadeIn
        delay={0.15}
        y={30}
        className="relative z-10 flex flex-col justify-center shrink-0 md:w-[50%] lg:w-[55%] px-6 md:px-10 pt-5 pb-2 md:py-0"
      >
        <h1 className="text-5xl sm:text-6xl md:text-[6rem] lg:text-[7.5rem] font-bold leading-[0.9] tracking-normal uppercase max-w-[90vw] md:max-w-none whitespace-nowrap overflow-visible">
          <span className="text-zinc-200 drop-shadow-[0_0_15px_rgba(228,228,231,0.6)]">ABDULKADİR</span>
          <br />
          <span className="text-zinc-400 drop-shadow-[0_0_20px_rgba(161,161,170,0.6)]">KARATAŞ</span>
        </h1>
        
        <div className="relative inline-block mt-4 sm:mt-6 ml-1 w-max">
          {/* Yanıp Sönen (Pulsing) Arka Plan Glow Efekti */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-[20px] opacity-60 animate-pulse"></div>
          
          <h2 className="relative text-2xl sm:text-3xl md:text-4xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-[0_0_5px_rgba(168,85,247,0.8)]">
            AKtif Yazılım
          </h2>
        </div>

        {/* KARATAŞ altındaki Sosyal İkonlar */}
        <div className="flex gap-5 sm:gap-6 mt-4 sm:mt-6 md:mt-8 ml-2">
          <a
            href="https://www.instagram.com/abdulkadir_karatass/"
            target="_blank"
            rel="noreferrer"
            className="text-[#D7E2EA]/60 hover:text-white hover:scale-110 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
          <a
            href="mailto:Abdulkadir.karatass@hotmail.com"
            className="text-[#D7E2EA]/60 hover:text-white hover:scale-110 transition-all duration-300"
          >
            <Mail size={32} strokeWidth={1.5} />
          </a>
          <a
            href="https://www.linkedin.com/in/-abdulkadir-karatas"
            target="_blank"
            rel="noreferrer"
            className="text-[#D7E2EA]/60 hover:text-white hover:scale-110 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </FadeIn>

      {/* Sağ — 3D Tuval (kalan esnek alanı doldurur) ────────────────────────────── */}
      <div className="flex-1 w-full relative cursor-grab active:cursor-grabbing flex items-center justify-center" style={{ minHeight: '500px' }}>
        
        {/* Model Arka Plan Parlama Efekti */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] bg-[#D7E2EA]/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[300px] sm:w-[200px] sm:h-[400px] bg-white/5 blur-[100px] rounded-full pointer-events-none" />

        <Canvas
          style={{ display: 'block', width: '100%', height: '100%', position: 'relative', zIndex: 10 }}
          camera={{ position: [0, 0.0, 2.8], fov: 52 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={1.5} />
          <directionalLight position={[2, 4, 3]} intensity={1.5} />
          <pointLight position={[-2, 2, -1]} intensity={1.2} color="#b600a8" />
          <pointLight position={[2, -1, 2]} intensity={0.8} color="#7621b0" />



          <ModelErrorBoundary>
            <Suspense fallback={
              <Html center>
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 border-t-[#b600a8] border-r-[#7621b0] border-b-transparent border-l-transparent animate-spin"></div>
                  <span className="text-[#D7E2EA]/60 text-xs sm:text-sm tracking-wider uppercase font-medium">Model Yükleniyor...</span>
                </div>
              </Html>
            }>
              <HeroModel />
            </Suspense>
          </ModelErrorBoundary>

          {/* Sürükleyerek manuel döndürme — otomatik döndürme yok */}
          <OrbitControls
            makeDefault
            target={[0, -0.5, 0]}
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 5}
            maxPolarAngle={(Math.PI * 2) / 3}
            rotateSpeed={0.5}
          />
        </Canvas>
      </div>
    </div>

    {/* ── Alt çubuk ─────────────────────────────────────────────────────────────── */}
    <FadeIn delay={0.4} y={20}>
      <div className="shrink-0 flex justify-between items-center px-6 md:px-10 pb-7 md:pb-10 pt-2 w-full">
        <TypewriterText />
        <ContactButton />
      </div>
    </FadeIn>
  </section>
)

export default HeroSection
