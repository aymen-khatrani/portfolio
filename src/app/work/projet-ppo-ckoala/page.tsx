import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CaseStudyHeader from '@/components/case-study/CaseStudyHeader';
import CaseStudySection from '@/components/case-study/CaseStudySection';
import CaseStudyFooter from '@/components/case-study/CaseStudyFooter';

export const metadata: Metadata = {
  title: 'CKOALA — Moteur de classification taxonomique · Aymen Khatrani',
  description:
    'Étude de cas : conception et test d’un moteur Java pour classer des observations naturelles à partir de taxonomies hiérarchiques. OOP rigoureuse, principe de Liskov, 90 %+ de code coverage.',
};

const repoUrl = 'https://github.com/aymen-khatrani/Projet_PPO_CKOALA';

export default function CKOALACaseStudy() {
  return (
    <main className="relative min-h-screen">
      <Navbar />

      <CaseStudyHeader
        eyebrow="Étude de cas · Polytech Lille · Automne 2025"
        title={
          <>
            CKOALA,{' '}
            <span className="italic text-bone-100/85">
              moteur de classification taxonomique.
            </span>
          </>
        }
        subtitle="Un assistant digital pour reconnaître à quelle catégorie appartient une observation naturelle — nuage, arbre — à partir d’une taxonomie hiérarchique écrite en XML. Conçu et testé en binôme dans le cadre du module PPO &amp; TM."
        tags={[
          'Java 17',
          'OOP',
          'JUnit',
          'JaCoCo',
          'GitLab CI/CD',
          'XML',
          'Conception',
        ]}
        facts={[
          { label: 'Année', value: 'Automne 2025' },
          { label: 'Équipe', value: '2 personnes' },
          { label: 'Couverture', value: '> 90 %' },
          { label: 'Stack', value: 'Java 17' },
        ]}
      />

      <CaseStudySection
        index="01"
        label="Contexte"
        title="Classer ce qui n’est pas binaire."
      >
        <p className="text-balance text-lg leading-relaxed text-bone-100/80">
          Dans la nature, peu de classifications sont binaires. Un nuage n’est
          pas <em>juste</em> un cumulus — c’est un cumulus à une certaine
          altitude, avec une certaine couleur, une forme dominante, et qui peut
          appartenir à plusieurs sous-catégories selon les axes de description.
          CKOALA <span className="font-mono text-[0.95em] text-bone-100/65">(« C’est Quoi Là ? »)</span>{' '}
          part de ce constat : pour qu’un système puisse reconnaître une
          observation, il faut d’abord modéliser proprement la hiérarchie qui
          la définit.
        </p>
        <p className="text-balance text-lg leading-relaxed text-bone-100/80">
          L’enjeu n’était pas de faire du machine learning, mais de la{' '}
          <span className="text-bone-50">conception logicielle au cordeau</span>
          {' '}
          : un domaine modélisé sans approximation, des contraintes vérifiées
          au chargement, et un harnais de tests dense pour rendre la base
          extensible sans peur de régression.
        </p>
      </CaseStudySection>

      <CaseStudySection
        index="02"
        label="Modèle"
        title="Catégories, caractéristiques, domaines."
      >
        <p className="text-balance text-lg leading-relaxed text-bone-100/80">
          Le cœur du système repose sur quatre abstractions :
        </p>

        <ul className="space-y-4 border-l border-bone-100/10 pl-6">
          <ModelEntity
            name="Categorie"
            description="Un nœud de l’arbre taxonomique, avec un parent et des enfants. Porte un ensemble de caractéristiques héritées et raffinées."
          />
          <ModelEntity
            name="Caracteristique"
            description="Un attribut nommé (couleur, altitude, forme) associé à un domaine de valeurs autorisées."
          />
          <ModelEntity
            name="Domaine"
            description="Abstraction des valeurs valides. Deux variantes concrètes : DomaineIntervalle pour les bornes numériques (ex. [0.5 ; 12.0]), DomaineEnsemble pour des valeurs discrètes (ex. {rond, carré})."
          />
          <ModelEntity
            name="Observation"
            description="Une instance à classer — un nuage qu’on vient d’observer, avec ses valeurs sur chaque caractéristique."
          />
        </ul>

        <div className="mt-4 rounded-lg border border-bone-100/10 bg-ink-900/60 p-5 font-mono text-sm text-bone-100/85">
          <div className="mb-2 text-[10px] uppercase tracking-[0.22em] text-bone-100/45">
            Exemple
          </div>
          <pre className="whitespace-pre-wrap leading-relaxed">{`Nuage          → altitude ∈ [0 ; 14000]    forme ∈ {tout}
└─ Cumulus     → altitude ∈ [500 ; 6000]   forme ∈ {floconneux}
   └─ Mediocris→ altitude ∈ [500 ; 2000]   forme ∈ {floconneux}`}</pre>
        </div>
      </CaseStudySection>

      <CaseStudySection
        index="03"
        label="Conception"
        title="Liskov, ou la contrainte vérifiée au chargement."
      >
        <p className="text-balance text-lg leading-relaxed text-bone-100/80">
          Le piège classique d’une hiérarchie de catégories : un enfant qui{' '}
          <em>élargit</em> silencieusement le domaine de son parent. Si un
          Cumulus accepte des altitudes hors du domaine défini par Nuage, toute
          la cohérence du système s’effondre — un Cumulus n’est plus
          substituable à un Nuage.
        </p>
        <p className="text-balance text-lg leading-relaxed text-bone-100/80">
          Nous avons fait le choix d’imposer le{' '}
          <span className="text-bone-50">principe de substitution de Liskov</span>{' '}
          au chargement de la taxonomie, pas à l’exécution. Le parser{' '}
          <span className="font-mono text-[0.95em] text-bone-100/70">LireXML</span>{' '}
          valide chaque relation parent-enfant, et lève une exception si un
          enfant tente d’étendre un intervalle ou d’introduire une valeur hors
          de l’ensemble du parent. Conséquence : aucune classification
          incohérente possible à l’usage, parce que la taxonomie est saine{' '}
          <em>by construction</em>.
        </p>
        <p className="text-balance text-lg leading-relaxed text-bone-100/80">
          Le moteur de classification{' '}
          <span className="font-mono text-[0.95em] text-bone-100/70">Classifieur</span>{' '}
          descend ensuite l’arbre de haut en bas et retient la catégorie la
          plus spécifique compatible avec l’observation. Quand plusieurs
          chemins sont valides, la spécificité maximale est préférée — c’est ce
          qui rend la sortie utile : <em>cumulus mediocris</em> plutôt que{' '}
          <em>nuage</em>.
        </p>
      </CaseStudySection>

      <CaseStudySection
        index="04"
        label="Qualité"
        title="Tests denses, couverture mesurée, intégration continue."
      >
        <p className="text-balance text-lg leading-relaxed text-bone-100/80">
          Huit fichiers de tests JUnit couvrent les trois couches (modèle, IO,
          logique). Les cas limites traités explicitement :
        </p>
        <ul className="space-y-2 pl-1 text-bone-100/80">
          <Bullet>Taxonomies invalides (XML mal formé, références cassées)</Bullet>
          <Bullet>Conflits de types entre caractéristiques héritées</Bullet>
          <Bullet>Violations LSP détectées au chargement</Bullet>
          <Bullet>Observations incomplètes ou hors domaine</Bullet>
          <Bullet>Comparaison croisée DomaineIntervalle × DomaineEnsemble</Bullet>
        </ul>
        <p className="text-balance text-lg leading-relaxed text-bone-100/80">
          La couverture mesurée par{' '}
          <span className="text-bone-50">JaCoCo dépasse les 90 %</span>, vérifiée
          à chaque push par la pipeline GitLab CI. Un rapport HTML est généré
          pour chaque build, ce qui rend visible la dette de test au fil de
          l’évolution du code.
        </p>

        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-bone-100/10 pt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/55 sm:grid-cols-4">
          <Metric label="Code coverage" value=">90 %" />
          <Metric label="Tests JUnit" value="8 suites" />
          <Metric label="Pipeline" value="GitLab CI" />
          <Metric label="Langage" value="Java 17" />
        </dl>
      </CaseStudySection>

      <CaseStudySection
        index="05"
        label="Bilan"
        title="Ce qui a marché, ce qui mériterait un v2."
      >
        <p className="text-balance text-lg leading-relaxed text-bone-100/80">
          Valider Liskov au chargement plutôt qu’à l’exécution s’est révélé
          être le choix le plus payant. Plusieurs bugs subtils détectés tôt —
          enfants qui élargissaient discrètement leur parent — auraient été
          quasi-introuvables sans cette vérification systématique.
        </p>
        <p className="text-balance text-lg leading-relaxed text-bone-100/80">
          Le format XML est resté un bon choix « ouvert par défaut » : un
          biologiste peut étendre la taxonomie sans jamais ouvrir l’IDE. Si je
          devais reprendre le projet, je remplacerais XML par un schéma typé
          (JSON Schema ou Protocol Buffers) pour rendre la validation moins
          verbeuse, et j’ajouterais une interface en ligne pour visualiser
          l’arbre interactivement.
        </p>
        <p className="text-balance text-lg leading-relaxed text-bone-100/80">
          C’est aussi le projet où j’ai vraiment intégré que{' '}
          <span className="text-bone-50">
            la rigueur de conception en amont coûte moins cher
          </span>{' '}
          que les correctifs en aval — un principe qui guide aujourd’hui ma
          façon d’écrire du code data.
        </p>
      </CaseStudySection>

      <CaseStudyFooter
        repoUrl={repoUrl}
        collaborators={['Aymen Khatrani', 'Léane Labis']}
      />
    </main>
  );
}

function ModelEntity({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <li className="flex flex-col gap-1 sm:flex-row sm:gap-6">
      <span className="shrink-0 font-mono text-sm uppercase tracking-[0.15em] text-bone-50 sm:w-40">
        {name}
      </span>
      <span className="text-balance text-base leading-relaxed text-bone-100/80">
        {description}
      </span>
    </li>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 leading-relaxed">
      <span
        aria-hidden
        className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-moss-300/70"
      />
      <span>{children}</span>
    </li>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-bone-100/35">{label}</dt>
      <dd className="mt-1.5 text-bone-100/85">{value}</dd>
    </div>
  );
}
