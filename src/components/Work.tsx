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
    no: '01',
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
    github: '#',
    demo: '#',
  },
  {
    tempId: 1,
    no: '02',
    year: '2024',
    category: 'Data Science · Scoring',
    title: 'Scoring du risque crédit — Dataset Cofidis',
    description:
      'Scoring crédit sur 5 344 clients : EDA, feature engineering, rééquilibrage SMOTE (déséquilibre ~1:7). Régression logistique retenue pour son interprétabilité réglementaire — AUC = 0,769, Gini = 0,537.',
    tags: ['R', 'scikit-learn', 'XGBoost', 'Régression log.'],
    status: { kind: 'soon' },
    github: '#',
    demo: '#',
  },
  {
    tempId: 2,
    no: '03',
    year: '2025',
    category: 'IA · LLM / RAG',
    title: 'Pack-A.I. — Veille marché & coûts fournisseurs',
    description:
      'Service IA d’analyse automatisée : connecteurs API d’indices de marché (énergie, fret, matières premières) + scraping Playwright. Synthèses LLM via RAG pour le suivi des coûts (TCO) et de l’empreinte CO₂ des acheteurs — en cours.',
    tags: ['Python', 'FastAPI', 'RAG · MCP', 'Playwright'],
    status: { kind: 'soon' },
    github: '#',
    demo: '#',
  },
  {
    tempId: 3,
    no: '04',
    year: '2025',
    category: 'Data Eng · Cloud DW',
    title: 'Dashboard Supply Chain — BigQuery & Looker',
    description:
      'Schéma en étoile sous BigQuery (~180 k commandes : faits + dimensions produit/client/temps). Dashboard Looker — taux de retard, délais d’expédition, ventes par catégorie/région, drill-down — et prévision de demande.',
    tags: ['BigQuery', 'LookML', 'Looker Studio', 'SQL'],
    status: { kind: 'soon' },
    github: '#',
    demo: '#',
  },
  {
    tempId: 4,
    no: '05',
    year: '2024',
    category: 'BI · Dataviz',
    title: 'Dashboard santé & risque — WHO / World Bank',
    description:
      'Tableau de bord macroéconomique sur 200+ pays (2000–2024) : modèle en étoile, mesures DAX, carte choroplèthe, drill-down région→pays sur ~5 300 indicateurs. Prévision d’espérance de vie en séries temporelles.',
    tags: ['Power BI', 'DAX', 'SQL', 'Python'],
    status: { kind: 'soon' },
    github: 'https://github.com/aymen-khatrani/Dashboard-sante',
    demo: '#',
  },
  {
    tempId: 5,
    no: '06',
    year: '2024',
    category: 'Data Eng · SQL',
    title: 'Analytique SQL avancée — Base e-commerce',
    description:
      'Socle analytique sur ~536 k lignes : CTEs récursives, window functions, vues matérialisées. Contrôles qualité automatisés par triggers PL/pgSQL (anomalies de stock, doublons, dérives de CA) — −60 % de temps de reporting.',
    tags: ['PostgreSQL', 'PL/pgSQL', 'ETL', 'Git'],
    status: { kind: 'soon' },
    github: 'https://github.com/aymen-khatrani/Dashboard-e-commerce',
    demo: '#',
  },
  {
    tempId: 6,
    no: '07',
    year: '2024',
    category: 'Data Science · Validation',
    title: 'Back-testing & stabilité de modèle — EA Sports FC',
    description:
      'Validation out-of-time sur 10 saisons (~180 k obs.) : entraînement passé → test futur (17→21, puis 17+21→24), arbre de décision interprétable, CV 5-folds, gestion du déséquilibre. F1 pondéré ≈ 0,95, stable dans le temps.',
    tags: ['Python', 'pandas', 'scikit-learn'],
    status: { kind: 'soon' },
    github: '#',
    demo: '#',
  },
  {
    tempId: 7,
    no: '08',
    year: '2024',
    category: 'Software · Java EE',
    title: 'Solidar_Tool — Architecture logicielle 3-tier',
    description:
      'Application 3-tier de bout en bout : EJB @Remote/@Local, persistance JPA/PostgreSQL, gestion transactionnelle. Moteur de matching géolocalisé (GPS ≤ 5 km) et tests unitaires jUnit.',
    tags: ['Java EE', 'JPA', 'EJB', 'JUnit'],
    status: { kind: 'soon' },
    github: '#',
    demo: '#',
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
