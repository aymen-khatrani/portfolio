'use client';

import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';

/**
 * Route-level transition. Unlike `layout.tsx`, a `template.tsx` remounts on every
 * navigation, so each route (home ↔ case studies) fades and lifts into place —
 * a lightweight stand-in for AnimatePresence page transitions in the App Router.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0.01 : 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
