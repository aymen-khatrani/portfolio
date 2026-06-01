'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import SectionDivider from './SectionDivider';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';

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

type ProjectStatus =
  | { kind: 'case-study'; href: string }
  | { kind: 'github'; href: string }
  | { kind: 'soon' };

type Project = {
  year: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  status: ProjectStatus;
};

const projects: Project[] = [
  {
    year: '2025',
    category: 'Software · OOP',
    title: 'CKOALA — Moteur de classification taxonomique',
    description:
      'Conception et test d’un moteur Java pour classer des observations naturelles à partir de taxonomies hiérarchiques. Liskov vérifié au chargement, 90 %+ de code coverage.',
    tags: ['Java 17', 'JUnit', 'JaCoCo', 'GitLab CI'],
    status: {
      kind: 'case-study',
      href: '/work/projet-ppo-ckoala',
    },
  },
  {
    year: '2024',
    category: 'Data Science · Scoring',
    title: 'Scoring d’appétence crédit — Dataset Cofidis',
    description:
      'Modèle de scoring marketing sur 5 344 clients. AUC = 0,769, Gini = 0,537. Comparaison Logistic Regression / Random Forest / MLP, SMOTE pour le déséquilibre 1:7, restitution non technique.',
    tags: ['R', 'scikit-learn', 'XGBoost', 'SMOTE'],
    status: { kind: 'soon' },
  },
  {
    year: '2024',
    category: 'Data Eng · SQL',
    title: 'Analytique SQL avancée — Base e-commerce',
    description:
      'Requêtes analytiques (CTEs récursives, window functions) et vues matérialisées sur ~500 k lignes. Contrôles qualité automatisés en PL/pgSQL — gain de 60 % sur le temps de reporting.',
    tags: ['PostgreSQL', 'PL/pgSQL', 'Git'],
    status: { kind: 'soon' },
  },
  {
    year: '2024',
    category: 'Data Science · EDA',
    title: 'Analyse EA Sports FC — Profilage et classification',
    description:
      'Profilage statistique sur 9 saisons (~150 000 observations) : corrélation salaire/performance, détection d’outliers (z-score, IQR), classification ML avec analyse SHAP de l’importance des variables.',
    tags: ['Python', 'pandas', 'scikit-learn', 'SHAP'],
    status: { kind: 'soon' },
  },
];

export default function Work() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="work"
      aria-labelledby="work-title"
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
              04 — Projets
            </div>
            <h2
              id="work-title"
              className="mt-5 max-w-[20ch] font-display text-[clamp(2rem,5vw,4rem)] leading-[0.98] tracking-tightest text-bone-50"
            >
              Quatre projets,{' '}
              <span className="italic text-bone-100/70">
                de la conception au scoring.
              </span>
            </h2>
          </div>

          <p className="max-w-[34ch] font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/55">
            Études de cas détaillées · plus à venir
          </p>
        </motion.div>

        <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {projects.map((p, i) => (
            <motion.li
              key={p.title}
              variants={item}
              whileHover={reduced ? undefined : { scale: 1.03 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={p} index={i + 1} />
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const indexLabel = String(index).padStart(2, '0');
  const isInternal = project.status.kind === 'case-study';
  const isExternal = project.status.kind === 'github';
  const href =
    project.status.kind !== 'soon' ? project.status.href : undefined;

  const cardClasses =
    'group relative flex h-full flex-col justify-between gap-10 rounded-2xl border border-bone-100/10 bg-ink-900/40 p-7 transition-all duration-500 ease-smooth hover:border-bone-100/25 hover:bg-ink-900/70 hover:shadow-2xl hover:shadow-black/40 sm:p-9';

  const body = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/55">
          {project.year}
          <span className="text-bone-100/25">·</span>
          {project.category}
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/35">
          {indexLabel}
        </div>
      </div>

      <div>
        <h3 className="text-balance font-display text-2xl leading-snug text-bone-50 sm:text-[28px]">
          {project.title}
        </h3>
        <p className="mt-4 max-w-[58ch] text-balance text-base leading-relaxed text-bone-100/70 sm:text-[17px]">
          {project.description}
        </p>

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-bone-100/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-100/65"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-end pt-2">
        <CtaLabel status={project.status} />
      </div>
    </>
  );

  if (isInternal && href) {
    return (
      <Link href={href} className={cardClasses}>
        {body}
      </Link>
    );
  }

  if (isExternal && href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={cardClasses}
      >
        {body}
      </a>
    );
  }

  return <div className={`${cardClasses} cursor-default`}>{body}</div>;
}

function CtaLabel({ status }: { status: ProjectStatus }) {
  if (status.kind === 'case-study') {
    return (
      <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/80 transition-colors group-hover:text-bone-50">
        Lire le case study
        <svg
          viewBox="0 0 16 16"
          width="12"
          height="12"
          aria-hidden="true"
          className="block shrink-0 transition-transform duration-500 ease-smooth group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </span>
    );
  }

  if (status.kind === 'github') {
    return (
      <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/80 transition-colors group-hover:text-bone-50">
        Code sur GitHub ↗
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-100/40">
      Case study bientôt
    </span>
  );
}
