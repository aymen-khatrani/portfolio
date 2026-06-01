'use client';

import { motion, type Variants } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';

/**
 * Animated section divider — a hairline that draws outward from its centre as it
 * scrolls into view, with a small diamond mark at the middle. Replaces the static
 * top hairline that each section used to render, giving an editorial "reveal" cue
 * for the transition between sections.
 *
 * Honours reduced-motion: when the user opts out, the line shows fully drawn with
 * no animation (duration collapses to a near-instant 0.01s, per the project rule).
 */
export default function SectionDivider() {
  const reduced = usePrefersReducedMotion();

  const line: Variants = {
    hidden: { scaleX: reduced ? 1 : 0, opacity: reduced ? 1 : 0 },
    shown: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: reduced ? 0.01 : 1.1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const mark: Variants = {
    hidden: { scale: reduced ? 1 : 0, opacity: reduced ? 1 : 0 },
    shown: {
      scale: 1,
      opacity: 1,
      transition: { duration: reduced ? 0.01 : 0.6, delay: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      aria-hidden
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '-10% 0px' }}
      className="pointer-events-none absolute left-1/2 top-0 flex w-[60%] -translate-x-1/2 items-center justify-center"
    >
      <motion.span
        variants={line}
        className="h-px w-full origin-center bg-gradient-to-r from-transparent via-bone-100/20 to-transparent"
      />
      <motion.span
        variants={mark}
        className="absolute h-1 w-1 rotate-45 bg-bone-100/30"
      />
    </motion.div>
  );
}
