'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

export type CaseStudyFact = { label: string; value: string };

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  tags: string[];
  facts: CaseStudyFact[];
};

export default function CaseStudyHeader({
  eyebrow,
  title,
  subtitle,
  tags,
  facts,
}: Props) {
  return (
    <header className="relative isolate px-6 pb-16 pt-32 sm:px-10 sm:pt-36 lg:px-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_30%,#1a221c_0%,#0a0c0b_60%,#06070a_100%)]" />
        <div className="editorial-grid absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
      </div>

      <motion.div
        initial="hidden"
        animate="shown"
        variants={stagger}
        className="mx-auto max-w-[1100px]"
      >
        <motion.div variants={item} className="mb-10">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/55 transition-colors hover:text-bone-50"
          >
            <svg
              viewBox="0 0 16 16"
              width="12"
              height="12"
              aria-hidden="true"
              className="block shrink-0 transition-transform duration-500 ease-smooth group-hover:-translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 8H3M7 4 3 8l4 4" />
            </svg>
            Retour au portfolio
          </Link>
        </motion.div>

        <motion.div
          variants={item}
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/60"
        >
          <span className="h-px w-8 bg-bone-100/30" />
          {eyebrow}
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-6 max-w-[18ch] font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tightest text-bone-50"
        >
          {title}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-[60ch] text-balance text-lg leading-relaxed text-bone-100/75 sm:text-xl"
        >
          {subtitle}
        </motion.p>

        <motion.ul
          variants={item}
          className="mt-8 flex flex-wrap gap-1.5"
        >
          {tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-bone-100/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-100/65"
            >
              {t}
            </li>
          ))}
        </motion.ul>

        <motion.dl
          variants={item}
          className="mt-14 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-bone-100/10 pt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/55 sm:grid-cols-4"
        >
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="text-bone-100/35">{f.label}</dt>
              <dd className="mt-1.5 text-bone-100/85">{f.value}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </header>
  );
}
