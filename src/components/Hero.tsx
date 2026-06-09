'use client';

import { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion';
import CTAButton from './CTAButton';
import {
  clipRise,
  fade,
  riseSoft,
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

// Dark gradient over the illustration: opaque on the left (where the text sits),
// clearing to reveal the storefront on the right — per the art direction.
const OVERLAY =
  'linear-gradient(to right, rgba(13,10,11,0.96) 32%, rgba(13,10,11,0.55) 62%, rgba(13,10,11,0.12) 100%)';

export default function Hero() {
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  // Subtle scroll parallax: text drifts up + dims, image drifts a touch more, so
  // the hero feels layered rather than flat. Disabled under reduced-motion.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -56]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.3]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={heroRef}
      className="noise relative isolate flex min-h-screen w-full items-center overflow-hidden"
    >
      {/* Background illustration — bleeds to the right */}
      <motion.div
        aria-hidden
        style={reduced ? undefined : { y: imageY }}
        className="absolute inset-0 -z-20 scale-110"
      >
        <Image
          src="/background.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
      </motion.div>

      {/* Dark gradient overlay + bottom fade into the page */}
      <div aria-hidden className="absolute inset-0 -z-10" style={{ background: OVERLAY }} />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#0D0A0B] to-transparent"
      />

      {/* PORTFOLIO stamp over the storefront sign (desktop) */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[5%] top-[22%] z-0 hidden select-none text-right lg:block"
      >
        <div className="portfolio-stamp font-display text-[clamp(3.5rem,7vw,7rem)] font-bold leading-none">
          Portfolio
        </div>
        <div className="mt-3 font-display text-2xl font-light tracking-[0.45em] text-bone-200/80">
          2025
        </div>
      </div>

      {/* Large faded kanji watermark — 未来 (mirai · "future") */}
      <span
        aria-hidden
        className="jp-watermark absolute -bottom-6 right-[6%] hidden text-[clamp(8rem,16vw,16rem)] lg:block"
      >
        未来
      </span>

      {/* Content — LEFT, image bleeds right */}
      <motion.div
        initial="hidden"
        animate="shown"
        variants={staggerContainer(0.12, 0.1)}
        className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pt-32 pb-44 sm:px-10 sm:pt-36 lg:px-16"
      >
        <motion.div
          style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
          className="max-w-xl"
        >
          <motion.div
            variants={riseSoft}
            className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-200/80"
          >
            <span className="h-px w-8 bg-moss-300/60" />
            Data &amp; IA · Alternance — Sept 2026
          </motion.div>

          <motion.h1
            variants={reduced ? fade : clipRise}
            className="font-serif text-[clamp(3.5rem,9vw,8rem)] italic leading-[0.9] text-bone-50"
          >
            Aymen
            <br />
            Khatrani.
          </motion.h1>

          <motion.p
            variants={riseSoft}
            className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-moss-300"
          >
            Data Scientist &amp; IA · Élève-ingénieur Polytech Lille — ISIA
          </motion.p>

          <motion.p
            variants={riseSoft}
            className="mt-6 max-w-[46ch] text-balance text-lg leading-relaxed text-bone-100/80 sm:text-xl"
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
              className="link-underline group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-200/70 transition-colors hover:text-moss-300"
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
        </motion.div>
      </motion.div>

      {/* Metadata strip — full-width bar anchored to the bottom (amber rule) */}
      <motion.dl
        initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0.01 : 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 z-10 mx-auto grid w-full max-w-[1400px] grid-cols-2 gap-x-8 gap-y-4 px-6 py-5 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-200/70 sm:grid-cols-4 sm:px-10 lg:px-16"
        style={{ borderTop: '1px solid rgba(201,133,58,0.2)' }}
      >
        <div>
          <dt className="text-bone-100/35">Basé</dt>
          <dd className="mt-1 text-bone-100/85">Lille · mobile IDF</dd>
        </div>
        <div>
          <dt className="text-bone-100/35">Focus</dt>
          <dd className="mt-1 text-bone-100/85">ML · IA · Data Eng</dd>
        </div>
        <div>
          <dt className="text-bone-100/35">Disponibilité</dt>
          <dd className="mt-1 flex items-center gap-1.5 text-bone-100/85">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-moss-300/60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-moss-300" />
            </span>
            Sept 2026 · 1 an
          </dd>
        </div>
        <div>
          <dt className="text-bone-100/35">École</dt>
          <dd className="mt-1 text-bone-100/85">Polytech Lille · 5A</dd>
        </div>
      </motion.dl>
    </section>
  );
}
