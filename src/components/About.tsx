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
  shown: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

type Fact = { primary: string; secondary: string };

const formation: Fact[] = [
  { primary: 'Polytech Lille — ISIA', secondary: '2023 – 2027 · Diplôme d’ingénieur' },
  { primary: 'Lycée Jean Bart, Dunkerque', secondary: '2021 – 2023 · CPGE PSI' },
];

const langues: Fact[] = [
  { primary: 'Français', secondary: 'Natif' },
  { primary: 'Anglais', secondary: 'C1 · TOEIC 870' },
  { primary: 'Espagnol', secondary: 'B1' },
];

const certifications: Fact[] = [
  { primary: 'Google AI Essentials', secondary: 'Google' },
  { primary: 'Claude Certified Architect', secondary: 'Anthropic' },
  { primary: 'AWS Cloud Practitioner', secondary: 'En cours' },
];

const competences: Fact[] = [
  {
    primary: 'Langages',
    secondary:
      'Python (pandas, NumPy, scikit-learn, XGBoost, statsmodels) · R · SQL avancé · Bash',
  },
  {
    primary: 'Machine Learning',
    secondary:
      'Régression · Classification · Clustering · Séries temporelles · Feature engineering · SHAP',
  },
  {
    primary: 'Bases de données',
    secondary:
      'PostgreSQL (CTEs, window functions, PL/pgSQL, vues matérialisées) · MongoDB',
  },
  {
    primary: 'BI & Reporting',
    secondary: 'Power BI · Tableau · Excel avancé · Plotly · Matplotlib',
  },
  {
    primary: 'MLOps & Data Eng.',
    secondary: 'ETL/ELT · Docker · Git/GitHub · Airflow (notions) · PySpark (notions)',
  },
  {
    primary: 'Outils',
    secondary: 'Jupyter · Linux · Agile/Scrum · Documentation technique',
  },
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative isolate scroll-mt-24 px-6 py-28 sm:px-10 sm:py-32 lg:px-16"
    >
      {/* Background continuity with the hero */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950" />
      </div>

      <SectionDivider />

      <motion.div
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: '-15% 0px' }}
        variants={stagger}
        className="mx-auto max-w-[1400px]"
      >
        {/* Section header */}
        <motion.div
          variants={item}
          className="mb-14 flex flex-col gap-6 border-b border-bone-100/10 pb-8 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/55">
              <span className="h-px w-8 bg-bone-100/30" />
              02 — About
            </div>
            <h2
              id="about-title"
              className="mt-5 max-w-[16ch] font-display text-[clamp(2rem,5vw,4rem)] leading-[0.98] tracking-tightest text-bone-50"
            >
              Élève-ingénieur,{' '}
              <span className="italic text-bone-100/70">
                data scientist en formation.
              </span>
            </h2>
          </div>

          <p className="max-w-[34ch] font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/55">
            Polytech Lille · ISIA · 4ᵉ année — orienté finance et assurance.
          </p>
        </motion.div>

        {/* Bio + facts grid */}
        <div className="grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-[1fr_0.7fr]">
          <motion.div
            variants={item}
            className="space-y-6 text-balance text-lg leading-relaxed text-bone-100/75"
          >
            <p>
              En 4ᵉ année à{' '}
              <span className="text-bone-50">Polytech Lille (ISIA)</span>, je me
              forme à la data science appliquée — avec une appétence particulière
              pour la <span className="text-bone-50">finance et l’assurance</span>.
              Scoring crédit, modélisation prédictive, séries temporelles, ML
              interprétable : mon cœur de travail.
            </p>
            <p>
              Mes expériences (Banque Populaire, Cimmobilier, R&amp;D
              neuroimagerie à Boğaziçi) m’ont appris à transformer des données
              dispersées en livrables industrialisables — pipelines, dashboards,
              modèles validés. Je code en{' '}
              <span className="text-bone-50">Python et SQL avancé</span>, et je
              documente comme je code.
            </p>
            <p>
              Je cherche une{' '}
              <span className="text-bone-50">
                alternance Data Scientist d’un an, dès septembre 2026
              </span>
              , dans une équipe qui prend au sérieux la rigueur des modèles,
              leur interprétabilité et leur passage en production.
            </p>
          </motion.div>

          <motion.div variants={item} className="space-y-10">
            <FactGroup label="Formation" items={formation} />
            <FactGroup label="Langues" items={langues} />
            <FactGroup label="Certifications" items={certifications} />
          </motion.div>
        </div>

        {/* Compétences */}
        <motion.div
          variants={item}
          className="mt-24 border-t border-bone-100/10 pt-10"
        >
          <div className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/55">
            <span className="h-px w-8 bg-bone-100/30" />
            Compétences techniques
          </div>

          <dl className="divide-y divide-bone-100/10">
            {competences.map((c) => (
              <div
                key={c.primary}
                className="grid grid-cols-1 gap-2 py-5 md:grid-cols-[220px_1fr] md:gap-8"
              >
                <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/55">
                  {c.primary}
                </dt>
                <dd className="text-balance text-base leading-relaxed text-bone-100/85 sm:text-lg">
                  {c.secondary}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </motion.div>
    </section>
  );
}

function FactGroup({ label, items }: { label: string; items: Fact[] }) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/45">
        <span className="h-1 w-1 rounded-full bg-moss-300/70" />
        {label}
      </div>
      <ul className="space-y-3">
        {items.map((i) => (
          <li
            key={i.primary}
            className="flex items-baseline justify-between gap-6 border-b border-dashed border-bone-100/10 pb-3 last:border-0"
          >
            <span className="text-bone-100/90">{i.primary}</span>
            <span className="shrink-0 text-right font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/55">
              {i.secondary}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
