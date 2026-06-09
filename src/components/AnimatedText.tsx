import React from 'react'
import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

// ── Animation variants ────────────────────────────────────────────────────────
// whileInView fires once the paragraph enters the viewport.
// Each word staggers in from dim → full opacity.
// This is more reliable than scroll-tracking: all words ALWAYS reach full
// opacity once the animation completes (no more "bottom words still dark").

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.05,
    },
  },
}

const wordVariants: Variants = {
  hidden:  { opacity: 0.12 },
  visible: { opacity: 1, transition: { duration: 0.45, ease: 'easeOut' } },
}

// ── Main component ────────────────────────────────────────────────────────────
interface AnimatedTextProps {
  text: string
  className?: string
  style?: CSSProperties
}

/**
 * Renders a paragraph where every word fades from dim (0.12) to full opacity
 * in a staggered cascade the moment the element enters the viewport.
 *
 * Uses whileInView instead of scroll-tracking → the animation always completes
 * fully once triggered, regardless of how fast the user scrolls.
 */
const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className, style }) => {
  const words = text.split(' ')

  return (
    <motion.p
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.25 }}
      variants={containerVariants}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={wordVariants}>
          {word}
          {i < words.length - 1 ? ' ' : null}
        </motion.span>
      ))}
    </motion.p>
  )
}

export default AnimatedText
