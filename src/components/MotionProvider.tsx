'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Wraps the app in a single MotionConfig so every Framer Motion animation
 * respects the OS "reduce motion" setting (reducedMotion="user"): transforms
 * and layout animations are dropped, opacity is kept. This is the smart layer
 * on top of the CSS reset in globals.css — the CSS reset only stops CSS-driven
 * animations, not Framer Motion's JS-driven ones.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
