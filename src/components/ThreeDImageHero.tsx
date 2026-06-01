'use client';

import Image from 'next/image';
import { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import {
  usePrefersReducedMotion,
  useIsCoarsePointer,
} from '@/lib/usePrefersReducedMotion';

type Props = {
  src: string;
  alt: string;
};

const spring = { stiffness: 110, damping: 22, mass: 0.5 };

/**
 * A premium "fake-3D" hero card:
 *  - Mouse-tracked tilt with spring physics
 *  - Multi-layer parallax (background glow, card, foreground captions)
 *  - Slow floating motion
 *  - Cursor-following specular sheen
 *  - All interactivity disabled for reduced-motion / touch users
 */
export default function ThreeDImageHero({ src, alt }: Props) {
  const reduced = usePrefersReducedMotion();
  const coarse = useIsCoarsePointer();
  const interactive = !reduced && !coarse;

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Normalized pointer position in [-0.5, 0.5]
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), spring);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [5, -5]), spring);

  // Subtle counter-parallax for back layers (move opposite to cursor)
  const bgX = useSpring(useTransform(px, [-0.5, 0.5], [16, -16]), spring);
  const bgY = useSpring(useTransform(py, [-0.5, 0.5], [12, -12]), spring);

  // Foreground captions drift slightly more than the card.
  const fgX = useSpring(useTransform(px, [-0.5, 0.5], [-22, 22]), spring);
  const fgY = useSpring(useTransform(py, [-0.5, 0.5], [-14, 14]), spring);

  // Sheen — a soft highlight that follows the cursor across the card.
  const sheenX = useTransform(px, [-0.5, 0.5], ['10%', '90%']);
  const sheenY = useTransform(py, [-0.5, 0.5], ['10%', '90%']);
  const sheen = useMotionTemplate`radial-gradient(420px circle at ${sheenX} ${sheenY}, rgba(246,244,236,0.10), transparent 60%)`;

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || !wrapperRef.current) return;
    const r = wrapperRef.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  const handleLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div
      ref={wrapperRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="stage-perspective relative mx-auto aspect-[834/915] w-full max-w-[560px] select-none"
    >
      {/* Back layer: large ambient glow with counter-parallax */}
      <motion.div
        aria-hidden
        style={interactive ? { x: bgX, y: bgY } : undefined}
        className="pointer-events-none absolute inset-[-12%] -z-10"
      >
        <div className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-moss-700/40 blur-3xl" />
        <div className="absolute left-[20%] top-[15%] h-40 w-40 rounded-full bg-moss-300/10 blur-2xl" />
        <div className="absolute bottom-[10%] right-[10%] h-56 w-56 rounded-full bg-bone-200/[0.07] blur-3xl" />
      </motion.div>

      {/* Caption — far back-left */}
      <ParallaxCaption
        x={bgX}
        y={bgY}
        interactive={interactive}
        className="left-[-1.5rem] top-2 sm:left-[-2.5rem]"
      >
        01 — Portrait
      </ParallaxCaption>

      {/* Card stack with tilt */}
      <motion.div
        style={
          interactive
            ? { rotateX, rotateY, transformPerspective: 1600 }
            : undefined
        }
        className="preserve-3d relative h-full w-full will-change-transform"
      >
        <motion.div
          animate={
            reduced
              ? undefined
              : { y: [0, -6, 0, 6, 0] }
          }
          transition={{ duration: 9, ease: 'easeInOut', repeat: Infinity }}
          className="preserve-3d relative h-full w-full"
        >
          {/* Drop-shadow plate beneath the card (sits deepest) */}
          <div
            aria-hidden
            className="absolute inset-x-6 bottom-0 h-10 translate-y-6 rounded-[40%] bg-black/60 blur-2xl"
          />

          {/* The card itself */}
          <div
            className="relative h-full w-full overflow-hidden rounded-[22px] border border-bone-100/10 bg-ink-900 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9),0_8px_30px_-12px_rgba(0,0,0,0.6)]"
            style={{ transform: 'translateZ(0)' }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              priority
              sizes="(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 560px"
              className="object-cover"
            />

            {/* Vignette to ground the subject */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(120% 90% at 50% 30%, transparent 55%, rgba(10,12,11,0.55) 100%)',
              }}
            />

            {/* Subtle scanlines inspired by the wall paneling */}
            <div
              aria-hidden
              className="scanlines pointer-events-none absolute inset-0 opacity-50"
            />

            {/* Cursor-following sheen */}
            {interactive && (
              <motion.div
                aria-hidden
                style={{ backgroundImage: sheen }}
                className="pointer-events-none absolute inset-0 mix-blend-screen"
              />
            )}

            {/* Inner hairline frame */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-[10px] rounded-[16px] ring-1 ring-inset ring-bone-100/10"
            />

            {/* Top-edge highlight, simulating light falling on glass */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bone-100/30 to-transparent"
            />

            {/* Caption inside the card — corner mono label */}
            <div className="absolute left-4 top-4 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-50/80">
              <span className="h-1 w-1 rounded-full bg-bone-50/80" />
              REC · 2026
            </div>
            <div className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-50/70">
              N 48.86° / E 2.34°
            </div>
            <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-50/70">
              AYK · Hero · 35mm
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-50/70">
              001 / 001
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Foreground floating label — bottom-right, drifts opposite of the card */}
      <ParallaxCaption
        x={fgX}
        y={fgY}
        interactive={interactive}
        className="bottom-[-1.25rem] right-[-1rem] sm:right-[-2rem]"
      >
        MMXXVI
      </ParallaxCaption>

      {/* Floating dot — depth marker */}
      <motion.div
        aria-hidden
        style={interactive ? { x: fgX, y: fgY } : undefined}
        className="pointer-events-none absolute -right-2 top-10 flex items-center gap-2 sm:-right-6"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-bone-50" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-100/70">
          Live
        </span>
      </motion.div>
    </div>
  );
}

function ParallaxCaption({
  x,
  y,
  interactive,
  className = '',
  children,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  interactive: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      aria-hidden
      style={interactive ? { x, y } : undefined}
      className={`pointer-events-none absolute font-mono text-[10px] uppercase tracking-[0.22em] text-bone-100/55 ${className}`}
    >
      {children}
    </motion.div>
  );
}
