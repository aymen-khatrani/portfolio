'use client';

import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion';
import CTAButton from './CTAButton';
import ThreeDImageHero from './ThreeDImageHero';
import {
  clipRise,
  fade,
  rise,
  riseSoft,
  scaleIn,
  staggerContainer,
  EASE_OUT_BACK,
} from '@/lib/motion';

// CTAs land with a touch of overshoot — the one "sporty" beat of the entrance.
const ctas: Variants = {
  hidden: { opacity: 0, y: 18 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_BACK },
  },
};

export default function Hero() {
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  // Subtle scroll parallax: the hero drifts up and dims as you leave it, so the
  // page feels layered rather than a flat block. Disabled under reduced-motion.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -56]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.3]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -96]);

  return (
    <section
      ref={heroRef}
      className="noise relative isolate flex min-h-screen w-full items-center px-6 pb-16 pt-32 sm:px-10 sm:pt-36 lg:px-16"
    >
      {/* Background ambience */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-ambient absolute inset-0" />
        <div className="editorial-grid absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
      </div>

      <motion.div
        initial="hidden"
        animate="shown"
        variants={staggerContainer(0.12, 0.1)}
        className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-y-14 lg:grid-cols-[1.05fr_1fr] lg:gap-x-20"
      >
        {/* Text column */}
        <motion.div
          style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
          className="order-2 lg:order-1"
        >
          <motion.div
            variants={riseSoft}
            className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/60"
          >
            <span className="h-px w-8 bg-bone-100/30" />
            Data &amp; IA · Alternance — Sept 2026
          </motion.div>

          <motion.h1
            variants={reduced ? fade : clipRise}
            className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.92] tracking-tightest text-bone-50"
          >
            Aymen
            <br />
            <span className="italic text-bone-100/90">Khatrani.</span>
          </motion.h1>

          <motion.p
            variants={riseSoft}
            className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/55"
          >
            Data Scientist &amp; IA · Élève-ingénieur Polytech Lille — ISIA
          </motion.p>

          <motion.p
            variants={riseSoft}
            className="mt-6 max-w-[44ch] text-balance text-lg leading-relaxed text-bone-100/75 sm:text-xl"
          >
            Data science et intelligence artificielle appliquées : machine
            learning, modélisation prédictive et data engineering — du prototype
            jusqu’à la mise en production.
          </motion.p>

          <motion.div
            variants={ctas}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <CTAButton href="#work">Voir mes projets</CTAButton>
            <CTAButton href="mailto:aymen.khatrani@polytech-lille.net" variant="secondary">
              Me contacter
            </CTAButton>
          </motion.div>

          <motion.div variants={riseSoft} className="mt-5">
            <a
              href="/aymen-khatrani-cv.pdf"
              target="_blank"
              rel="noreferrer noopener"
              download
              className="link-underline group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/55 transition-colors hover:text-bone-50"
            >
              <svg
                viewBox="0 0 16 16"
                width="12"
                height="12"
                aria-hidden="true"
                className="block shrink-0 transition-transform duration-500 ease-smooth group-hover:translate-y-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 2v10M4 8l4 4 4-4M2.5 14h11" />
              </svg>
              Télécharger le CV <span className="text-bone-100/30">· PDF · 376 KB</span>
            </a>
          </motion.div>

          <motion.dl
            variants={rise}
            className="mt-14 grid max-w-md grid-cols-2 gap-x-8 gap-y-4 border-t border-bone-100/10 pt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/55"
          >
            <div>
              <dt className="text-bone-100/35">Basé</dt>
              <dd className="mt-1 text-bone-100/80">Lille · mobile IDF</dd>
            </div>
            <div>
              <dt className="text-bone-100/35">Focus</dt>
              <dd className="mt-1 text-bone-100/80">ML · IA · Data Eng</dd>
            </div>
            <div>
              <dt className="text-bone-100/35">Disponibilité</dt>
              <dd className="mt-1 flex items-center gap-1.5 text-bone-100/80">
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-moss-300/60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-moss-300" />
                </span>
                Sept 2026 · 1 an
              </dd>
            </div>
            <div>
              <dt className="text-bone-100/35">École</dt>
              <dd className="mt-1 text-bone-100/80">Polytech Lille · 5A</dd>
            </div>
          </motion.dl>
        </motion.div>

        {/* Image column — parallax wrapper (outer) + reveal (inner) kept separate
            so the scroll MotionValue and the scaleIn entrance don't fight over y. */}
        <motion.div
          style={reduced ? undefined : { y: imageY }}
          className="order-1 lg:order-2"
        >
          <motion.div variants={scaleIn}>
            <ThreeDImageHero
              src="/acceuil-photo.png"
              alt="Portrait éditorial — Aymen Khatrani"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center sm:flex">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-bone-100/45">
          <span className="h-px w-6 bg-bone-100/20" />
          Scroll
          <span className="h-px w-6 bg-bone-100/20" />
        </div>
      </div>
    </section>
  );
}
