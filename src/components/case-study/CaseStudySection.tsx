'use client';

import { motion, type Variants } from 'framer-motion';

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.06 } },
};

type Props = {
  index: string;
  label: string;
  title?: string;
  children: React.ReactNode;
};

export default function CaseStudySection({
  index,
  label,
  title,
  children,
}: Props) {
  return (
    <motion.section
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '-15% 0px' }}
      variants={stagger}
      className="relative scroll-mt-24 px-6 py-20 sm:px-10 sm:py-24 lg:px-16"
    >
      <div className="mx-auto max-w-[1100px]">
        <motion.div
          variants={item}
          className="mb-10 grid grid-cols-1 gap-x-12 gap-y-4 border-b border-bone-100/10 pb-6 md:grid-cols-[180px_1fr] md:items-end"
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/55">
            {index} — {label}
          </div>
          {title && (
            <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.6rem)] leading-tight tracking-tighten text-bone-50">
              {title}
            </h2>
          )}
        </motion.div>

        <motion.div variants={item} className="space-y-6">
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
}
