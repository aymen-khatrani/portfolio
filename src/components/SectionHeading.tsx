'use client';

import { useRef, type ReactNode } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  clipRise,
  fade,
  riseSoft,
  staggerContainer,
  viewportOnce,
} from '@/lib/motion';

type Props = {
  /** Section index, e.g. "02". Doubles as the faint watermark numeral. */
  index: string;
  /** Mono kicker label, e.g. "À propos". */
  kicker: string;
  /** Headline content (may contain inline accent spans). */
  children: ReactNode;
  titleId?: string;
  /** Right-aligned mono meta line. */
  meta?: ReactNode;
  /** Tailwind max-width clamp for the headline, e.g. "max-w-[16ch]". */
  titleClassName?: string;
  className?: string;
};

/**
 * Consistent section header: a mono kicker, a headline that wipes up (clipRise —
 * the section's "loud" moment), and a large ghost numeral drifting in parallax
 * behind it for editorial depth. The headline degrades to a plain fade under
 * reduced-motion; the numeral parallax is disabled there too.
 */
export default function SectionHeading({
  index,
  kicker,
  children,
  titleId,
  meta,
  titleClassName = 'max-w-[18ch]',
  className = '',
}: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const numeralY = useTransform(scrollYProgress, [0, 1], ['28%', '-28%']);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="shown"
      viewport={viewportOnce}
      variants={staggerContainer(0.12, 0.05)}
      className={`relative mb-14 flex flex-col gap-6 border-b border-bone-100/10 pb-8 md:flex-row md:items-end md:justify-between ${className}`}
    >
      {/* Ghost numeral — depth + rhythm, never competes with the type. */}
      <motion.span
        aria-hidden
        style={reduced ? undefined : { y: numeralY }}
        className="pointer-events-none absolute -top-10 right-0 select-none font-display text-[clamp(6rem,16vw,12rem)] leading-none text-bone-100/[0.045]"
      >
        {index}
      </motion.span>

      <div className="relative">
        <motion.div
          variants={riseSoft}
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/55"
        >
          <span className="h-px w-8 bg-bone-100/30" />
          {index} — {kicker}
        </motion.div>

        <motion.h2
          id={titleId}
          variants={reduced ? fade : clipRise}
          className={`mt-5 ${titleClassName} font-display text-[clamp(2rem,5vw,4rem)] leading-[0.98] tracking-tightest text-bone-50`}
        >
          {children}
        </motion.h2>
      </div>

      {meta && (
        <motion.p
          variants={riseSoft}
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/55"
        >
          {meta}
        </motion.p>
      )}
    </motion.div>
  );
}
