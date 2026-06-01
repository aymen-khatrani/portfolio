'use client';

import { motion, type Variants } from 'framer-motion';
import CTAButton from './CTAButton';
import ThreeDImageHero from './ThreeDImageHero';

const container: Variants = {
  hidden: {},
  shown: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  return (
    <section className="noise relative isolate flex min-h-screen w-full items-center px-6 pb-16 pt-32 sm:px-10 sm:pt-36 lg:px-16">
      {/* Background ambience */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_30%,#1a221c_0%,#0a0c0b_60%,#06070a_100%)]" />
        <div className="editorial-grid absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
      </div>

      <motion.div
        initial="hidden"
        animate="shown"
        variants={container}
        className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-y-14 lg:grid-cols-[1.05fr_1fr] lg:gap-x-20"
      >
        {/* Text column */}
        <div className="order-2 lg:order-1">
          <motion.div
            variants={item}
            className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/60"
          >
            <span className="h-px w-8 bg-bone-100/30" />
            Data Science · Alternance — Sept 2026
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.92] tracking-tightest text-bone-50"
          >
            Aymen
            <br />
            <span className="italic text-bone-100/90">Khatrani.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/55"
          >
            Data Scientist · Élève-ingénieur Polytech Lille — ISIA
          </motion.p>

          <motion.p
            variants={item}
            className="mt-6 max-w-[44ch] text-balance text-lg leading-relaxed text-bone-100/75 sm:text-xl"
          >
            Data science appliquée à la finance et à l’assurance. Scoring
            crédit, modélisation prédictive et ML interprétable — pensé pour la
            production et les contraintes réglementaires.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <CTAButton href="#work">Voir mes projets</CTAButton>
            <CTAButton href="mailto:aymen.khatrani@polytech-lille.net" variant="secondary">
              Me contacter
            </CTAButton>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-14 grid max-w-md grid-cols-2 gap-x-8 gap-y-4 border-t border-bone-100/10 pt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/55"
          >
            <div>
              <dt className="text-bone-100/35">Basé</dt>
              <dd className="mt-1 text-bone-100/80">Lille · mobile IDF</dd>
            </div>
            <div>
              <dt className="text-bone-100/35">Focus</dt>
              <dd className="mt-1 text-bone-100/80">Scoring · ML · SQL</dd>
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
              <dd className="mt-1 text-bone-100/80">Polytech Lille · 4A</dd>
            </div>
          </motion.dl>
        </div>

        {/* Image column */}
        <motion.div variants={item} className="order-1 lg:order-2">
          <ThreeDImageHero
            src="/acceuil-photo.png"
            alt="Portrait éditorial — Aymen Khatrani"
          />
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
