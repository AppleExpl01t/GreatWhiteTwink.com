import { motion, useReducedMotion } from 'framer-motion'
import { edgeSlug } from '../content/site'

/*
 * The press-sheet edge slug: the strip of job markings a printer leaves
 * on the trim edge, set moving like the sheet is still going through.
 * Two identical spans, track slides half its width, loops seamlessly.
 * Decorative and duplicated, so it's hidden from assistive tech;
 * reduced motion parks it as a plain printed strip.
 */
export default function EdgeSlug() {
  const reduce = useReducedMotion()
  return (
    <div className="slug" aria-hidden="true">
      <motion.div
        className="slug-track"
        animate={reduce ? undefined : { x: ['0%', '-50%'] }}
        transition={{ duration: 48, ease: 'linear', repeat: Infinity }}
      >
        <span>{edgeSlug}</span>
        <span>{edgeSlug}</span>
      </motion.div>
    </div>
  )
}
