'use client';

import { motion, type Variants } from 'framer-motion';
import SectionDivider from './SectionDivider';

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
  shown: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

type Experience = {
  date: string;
  role: string;
  company: string;
  location: string;
  tags: string[];
  current?: boolean;
  description: string;
};

const experiences: Experience[] = [
  {
    date: 'Mai – Août 2026',
    role: 'Stagiaire R&D · Modélisation et pipelines de données neuroimagerie',
    company: 'MIMLAB, Boğaziçi University',
    location: 'Istanbul',
    tags: ['Data · R&D', 'Python', 'ML / DL'],
    current: true,
    description:
      'Construction d’un pipeline Python de prétraitement et de classification de signaux IRM/EEG multi-sites (3 laboratoires partenaires) ; benchmark de modèles ML/DL (accuracy, F1) et co-rédaction d’un rapport scientifique en anglais.',
  },
  {
    date: 'Juillet 2025 – Janvier 2026',
    role: 'Vendeur',
    company: 'Project X Paris',
    location: 'Roubaix',
    tags: ['Retail · Client'],
    description:
      'Conseil et vente en boutique, gestion du réassort et de la mise en rayon. Relation client en flux continu et restitution des indicateurs de performance à l’équipe.',
  },
  {
    date: 'Juin 2025',
    role: 'Stagiaire Data Quality & Fiabilisation · CRM Immobilier',
    company: 'Cimmobilier',
    location: 'France',
    tags: ['Data Quality', 'Python', 'SQL'],
    description:
      'Réduit le taux d’erreur des données CRM de 22 % à 6 % en quatre semaines via un pipeline Python/SQL de déduplication et de standardisation sur ~1 500 fiches clients, documenté pour reprise autonome.',
  },
  {
    date: 'Juin – Juillet 2024',
    role: 'Stagiaire Analyse de Données',
    company: 'Banque Populaire du Maroc · Agence Lille',
    location: 'Lille',
    tags: ['Data · Banque', 'Reporting'],
    description:
      'Conçu un tableau de bord de suivi d’activité (clients, transferts, crédits) livrant 5 KPIs actionnables à la direction. Réduit le temps de production du reporting mensuel d’environ 60 % en automatisant l’agrégation des données sous Python/Excel.',
  },
  {
    date: 'Juin – Août 2022',
    role: 'Conseiller de vente',
    company: 'Bouygues Telecom',
    location: 'France',
    tags: ['Retail · Client'],
    description:
      'Conseil et vente d’offres mobiles et internet en boutique, accompagnement des clients dans le choix et la mise en place de leurs forfaits, suivi de la satisfaction post-vente.',
  },
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="relative isolate scroll-mt-24 px-6 py-28 sm:px-10 sm:py-32 lg:px-16"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-ink-950" />
      </div>

      <SectionDivider />

      <motion.div
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: '-15% 0px' }}
        variants={stagger}
        className="mx-auto max-w-[1400px]"
      >
        <motion.div
          variants={item}
          className="mb-14 flex flex-col gap-6 border-b border-bone-100/10 pb-8 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/55">
              <span className="h-px w-8 bg-bone-100/30" />
              03 — Expériences
            </div>
            <h2
              id="experience-title"
              className="mt-5 max-w-[18ch] font-display text-[clamp(2rem,5vw,4rem)] leading-[0.98] tracking-tightest text-bone-50"
            >
              Cinq postes,{' '}
              <span className="accent-mark">une trajectoire data.</span>
            </h2>
          </div>

          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/55">
            Antéchronologique · 2026 → 2022
          </p>
        </motion.div>

        <ul className="divide-y divide-bone-100/10">
          {experiences.map((exp) => (
            <motion.li
              key={`${exp.company}-${exp.date}`}
              variants={item}
              className="group grid grid-cols-1 gap-y-3 py-8 md:grid-cols-[200px_1fr] md:gap-x-10 md:py-10"
            >
              {/* Left: date + status */}
              <div className="flex flex-col gap-2">
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/55">
                  {exp.date}
                </div>
                {exp.current && (
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-moss-300">
                    <span className="relative inline-flex h-1.5 w-1.5">
                      <span className="absolute inset-0 animate-ping rounded-full bg-moss-300/60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-moss-300" />
                    </span>
                    En cours
                  </div>
                )}
              </div>

              {/* Right: content */}
              <div>
                <h3 className="text-balance text-xl leading-snug text-bone-50 sm:text-2xl">
                  {exp.role}
                </h3>
                <div className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/55">
                  {exp.company} <span className="text-bone-100/30">·</span>{' '}
                  {exp.location}
                </div>

                <p className="mt-5 max-w-[68ch] text-balance text-base leading-relaxed text-bone-100/75 sm:text-lg">
                  {exp.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {exp.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-bone-100/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-100/65"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
