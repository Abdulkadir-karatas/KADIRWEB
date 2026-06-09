import React, { useRef, useEffect } from 'react'

interface MagnetProps {
  children: React.ReactNode
  padding?: number
  strength?: number
  activeTransition?: string
  inactiveTransition?: string
}

/**
 * Manyetik hover bileşeni.
 * Fare pozisyonunu global olarak takip eder; imleç öğenin sınır kutusunun
 * `padding` piksel yakınına geldiğinde, `strength` değerine bölünmüş orantılı
 * bir translate3d ofseti uygular. Çıkışta pürüzsüz bir şekilde orijine döner.
 */
const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()

      const isWithin =
        e.clientX >= rect.left - padding &&
        e.clientX <= rect.right + padding &&
        e.clientY >= rect.top - padding &&
        e.clientY <= rect.bottom + padding

      if (isWithin) {
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const dx = e.clientX - centerX
        const dy = e.clientY - centerY
        el.style.transition = activeTransition
        el.style.transform = `translate3d(${dx / strength}px, ${dy / strength}px, 0)`
      } else {
        el.style.transition = inactiveTransition
        el.style.transform = 'translate3d(0, 0, 0)'
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [padding, strength, activeTransition, inactiveTransition])

  return (
    <div ref={ref} style={{ willChange: 'transform', display: 'inline-block' }}>
      {children}
    </div>
  )
}

export default Magnet
