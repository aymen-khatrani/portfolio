'use client';

import SectionDivider from './SectionDivider';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import {
  StaggerProjects,
  type StaggerProject,
} from './ui/stagger-projects';

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
      <SectionDivider />

      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          index="04"
          kicker="Projets"
          titleId="work-title"
          titleClassName="max-w-[20ch]"
          meta="Cliquez une carte pour la centrer · études de cas détaillées"
        >
          Projets
        </SectionHeading>

        <Reveal variant="scale">
          <StaggerProjects projects={projects} />
        </Reveal>
      </div>
    </section>
  );
}
