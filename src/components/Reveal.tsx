'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { rise, riseSoft, scaleIn, viewportOnce } from '@/lib/motion';

const VARIANTS = { rise, soft: riseSoft, scale: scaleIn } as const;

type Props = {
  children: ReactNode;
  /** Reveal intensity. Default `rise`. */
  variant?: keyof typeof VARIANTS;
  className?: string;
};

/**
 * Standalone scroll reveal for a single block (panel, visual, paragraph group).
 * Self-triggers once when it enters the viewport. For orchestrated groups, use a
 * `staggerContainer` parent with children bound to the shared variants instead.
 */
export default function Reveal({ children, variant = 'rise', className }: Props) {
  return (
    <motion.div
      initial="hidden"
      whileInView="shown"
      viewport={viewportOnce}
      variants={VARIANTS[variant]}
      className={className}
    >
      {children}
    </motion.div>
  );
}
