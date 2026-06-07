'use client';

import { motion, type Variants } from 'framer-motion';
import SectionDivider from './SectionDivider';
import {
  StaggerProjects,
  type StaggerProject,
} from './ui/stagger-projects';

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

const projects: StaggerProject[] = [
  {
    tempId: 0,
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
    tempId: 1,
    year: '2024',
    category: 'Data Science · Scoring',
    title: 'Scoring d’appétence crédit — Dataset Cofidis',
    description:
      'Modèle de scoring marketing sur 5 344 clients. AUC = 0,769, Gini = 0,537. Comparaison Logistic Regression / Random Forest / MLP, SMOTE pour le déséquilibre 1:7, restitution non technique.',
    tags: ['R', 'scikit-learn', 'XGBoost', 'SMOTE'],
    status: { kind: 'soon' },
  },
  {
    tempId: 2,
    year: '2024',
    category: 'Data Eng · SQL',
    title: 'Analytique SQL avancée — Base e-commerce',
    description:
      'Requêtes analytiques (CTEs récursives, window functions) et vues matérialisées sur ~500 k lignes. Contrôles qualité automatisés en PL/pgSQL — gain de 60 % sur le temps de reporting.',
    tags: ['PostgreSQL', 'PL/pgSQL', 'Git'],
    status: { kind: 'soon' },
  },
  {
    tempId: 3,
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
          className="mb-10 flex flex-col gap-6 border-b border-bone-100/10 pb-8 md:flex-row md:items-end md:justify-between"
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
              <span className="accent-mark">de la conception au scoring.</span>
            </h2>
          </div>

          <p className="max-w-[34ch] font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/55">
            Cliquez une carte pour la centrer · études de cas détaillées
          </p>
        </motion.div>

        <motion.div variants={item}>
          <StaggerProjects projects={projects} />
        </motion.div>
      </motion.div>
    </section>
  );
}
