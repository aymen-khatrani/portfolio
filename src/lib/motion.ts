import type { Variants } from 'framer-motion';

/* ── Shared motion vocabulary ───────────────────────────────────────────────
   One small, consistent set of easings + reveal variants so the whole site
   speaks the same motion language. Four reveals, by intent/intensity:

     · rise      — default content reveal (headers' meta, blocks)
     · riseSoft  — calmer, shorter (paragraphs, captions) → the "quiet" moments
     · scaleIn   — visuals / cards, adds a touch of depth
     · clipRise  — section/hero headlines: a vertical wipe — the "loud" moments

   Everything animates transform + opacity only (clip-path is reserved for a
   handful of headlines). Reduced-motion is handled globally by MotionConfig
   (reducedMotion="user"), which keeps opacity and drops transforms; components
   that use clipRise additionally fall back to a plain fade via useReducedMotion. */

export const EASE = [0.22, 1, 0.36, 1] as const; // signature ease-out (calm, premium)
export const EASE_OUT_BACK = [0.34, 1.32, 0.64, 1] as const; // gentle overshoot for CTAs

export const DUR = {
  fast: 0.5,
  base: 0.7,
  slow: 0.9,
  hero: 1.1,
} as const;

/** Shared viewport config — reveal once, slightly before fully in view. */
export const viewportOnce = { once: true, margin: '-12% 0px' } as const;

export const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  shown: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE } },
};

export const riseSoft: Variants = {
  hidden: { opacity: 0, y: 12 },
  shown: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  shown: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: DUR.slow, ease: EASE },
  },
};

export const clipRise: Variants = {
  hidden: { opacity: 0, y: 26, clipPath: 'inset(0 0 100% 0)' },
  shown: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: DUR.hero, ease: EASE },
  },
};

/** Plain fade — the reduced-motion fallback for clipRise headlines. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: DUR.base, ease: EASE } },
};

/** Container that orchestrates children using the hidden/shown variant names. */
export const staggerContainer = (
  stagger = 0.08,
  delayChildren = 0.05,
): Variants => ({
  hidden: {},
  shown: { transition: { staggerChildren: stagger, delayChildren } },
});
