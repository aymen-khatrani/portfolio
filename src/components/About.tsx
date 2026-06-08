'use client';

import { motion } from 'framer-motion';
import {
  Award,
  BarChart3,
  BrainCircuit,
  Code2,
  Database,
  GraduationCap,
  Languages,
  Workflow,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import SectionDivider from './SectionDivider';
import SectionHeading from './SectionHeading';
import { BentoCard, type BentoItem } from './ui/bento-grid';
import { rise, riseSoft, staggerContainer, viewportOnce } from '@/lib/motion';

type Fact = { primary: string; secondary: string };
type FactCard = { label: string; icon: LucideIcon; items: Fact[] };

const factCards: FactCard[] = [
  {
    label: 'Formation',
    icon: GraduationCap,
    items: [
      { primary: 'Polytech Lille — ISIA', secondary: '2023 – 2027 · Diplôme d’ingénieur' },
      { primary: 'Lycée Jean Bart, Dunkerque', secondary: '2021 – 2023 · CPGE PSI' },
    ],
  },
  {
    label: 'Langues',
    icon: Languages,
    items: [
      { primary: 'Français', secondary: 'Natif' },
      { primary: 'Anglais', secondary: 'C1 · TOEIC 870' },
      { primary: 'Espagnol', secondary: 'B1' },
    ],
  },
  {
    label: 'Certifications',
    icon: Award,
    items: [
      { primary: 'Google AI Essentials', secondary: 'Google' },
      { primary: 'Claude Certified Architect', secondary: 'Anthropic' },
      { primary: 'AWS Cloud Practitioner', secondary: 'En cours' },
    ],
  },
];

const competences: BentoItem[] = [
  {
    title: 'Langages',
    icon: <Code2 className="h-4 w-4" />,
    description:
      'Python (pandas, NumPy, scikit-learn, XGBoost, statsmodels) · R · SQL avancé · Bash',
  },
  {
    title: 'Machine Learning',
    icon: <BrainCircuit className="h-4 w-4" />,
    description:
      'Régression · Classification · Clustering · Séries temporelles · Feature engineering · SHAP',
  },
  {
    title: 'Bases de données',
    icon: <Database className="h-4 w-4" />,
    description:
      'PostgreSQL (CTEs, window functions, PL/pgSQL, vues matérialisées) · MongoDB',
  },
  {
    title: 'BI & Reporting',
    icon: <BarChart3 className="h-4 w-4" />,
    description: 'Power BI · Tableau · Excel avancé · Plotly · Matplotlib',
  },
  {
    title: 'MLOps & Data Eng.',
    icon: <Workflow className="h-4 w-4" />,
    description: 'ETL/ELT · Docker · Git/GitHub · Airflow (notions) · PySpark (notions)',
  },
  {
    title: 'Outils',
    icon: <Wrench className="h-4 w-4" />,
    description: 'Jupyter · Linux · Agile/Scrum · Documentation technique',
  },
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative isolate scroll-mt-24 px-6 py-28 sm:px-10 sm:py-32 lg:px-16"
    >
      <SectionDivider />

      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          index="02"
          kicker="À propos"
          titleId="about-title"
          titleClassName="max-w-[16ch]"
          meta={<>Polytech Lille · ISIA · 4ᵉ année — orienté finance et assurance.</>}
        >
          Élève-ingénieur,{' '}
          <span className="accent-mark">data scientist en formation.</span>
        </SectionHeading>

        {/* Bio (left) + fact cards (right) — facts slide in from the right */}
        <div className="grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-[1fr_0.8fr]">
          <motion.div
            initial="hidden"
            whileInView="shown"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
          >
            <motion.div
              variants={riseSoft}
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
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="shown"
            viewport={viewportOnce}
            variants={staggerContainer(0.1)}
            className="flex flex-col gap-4"
          >
            {factCards.map(({ label, icon: Icon, items }) => (
              <BentoCard key={label} from="right">
                <div className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/55">
                  <Icon className="h-4 w-4 text-moss-300" />
                  {label}
                </div>
                <ul className="space-y-3">
                  {items.map((i) => (
                    <li
                      key={i.primary}
                      className="flex items-baseline justify-between gap-6 border-b border-dashed border-bone-100/10 pb-3 last:border-0 last:pb-0"
                    >
                      <span className="text-bone-100/90">{i.primary}</span>
                      <span className="shrink-0 text-right font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/55">
                        {i.secondary}
                      </span>
                    </li>
                  ))}
                </ul>
              </BentoCard>
            ))}
          </motion.div>
        </div>

        {/* Compétences — bento grid, cards assemble from the sides */}
        <div className="mt-24 border-t border-bone-100/10 pt-10">
          <motion.div
            initial="hidden"
            whileInView="shown"
            viewport={viewportOnce}
            variants={rise}
            className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/55"
          >
            <span className="h-px w-8 bg-bone-100/30" />
            Compétences techniques
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="shown"
            viewport={viewportOnce}
            variants={staggerContainer(0.08)}
            className="flex flex-col gap-4"
          >
            {competences.map((c, i) => (
              <BentoCard
                key={c.title}
                from={i % 2 === 0 ? 'left' : 'right'}
                icon={c.icon}
                title={c.title}
                description={c.description}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
