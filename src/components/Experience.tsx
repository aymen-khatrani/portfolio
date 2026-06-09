'use client';

import { motion } from 'framer-motion';
import SectionDivider from './SectionDivider';
import SectionHeading from './SectionHeading';
import { BentoCard } from './ui/bento-grid';
import { staggerContainer, viewportOnce } from '@/lib/motion';

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
      <SectionDivider />

      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          index="03"
          kicker="Expériences"
          titleId="experience-title"
          titleClassName="max-w-[18ch]"
          meta="Antéchronologique · 2026 → 2022"
        >
          Cinq postes,{' '}
          <span className="accent-mark">une trajectoire data &amp; IA.</span>
        </SectionHeading>

        <motion.div
          initial="hidden"
          whileInView="shown"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="flex flex-col gap-4"
        >
          {experiences.map((exp, i) => (
            <BentoCard
              key={`${exp.company}-${exp.date}`}
              featured={exp.current}
              from={i % 2 === 0 ? 'left' : 'right'}
            >
              {/* date + live status */}
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/55">
                  {exp.date}
                </span>
                {exp.current && (
                  <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-moss-300">
                    <span className="relative inline-flex h-1.5 w-1.5">
                      <span className="absolute inset-0 animate-ping rounded-full bg-moss-300/60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-moss-300" />
                    </span>
                    En cours
                  </span>
                )}
              </div>

              <h3 className="text-balance text-xl leading-snug text-bone-50 sm:text-[1.35rem]">
                {exp.role}
              </h3>
              <div className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/55">
                {exp.company} <span className="text-bone-100/30">·</span>{' '}
                {exp.location}
              </div>

              <p className="mt-4 text-balance text-[15px] leading-relaxed text-bone-100/75">
                {exp.description}
              </p>

              <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
                {exp.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-bone-100/12 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-100/60 transition-colors duration-500 group-hover:border-bone-100/25"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </BentoCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
