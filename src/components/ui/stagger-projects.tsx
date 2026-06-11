'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, ArrowUpRight, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

// lucide-react dropped its GitHub brand glyph, so inline the mark (matches Navbar).
function GithubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={className}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export type ProjectStatus =
  | { kind: 'case-study'; href: string }
  | { kind: 'soon' };

export type StaggerProject = {
  tempId: number;
  no: string;
  year: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  status: ProjectStatus;
  /** Public repository URL — renders a GitHub icon link on the card. */
  github?: string;
  /** Deployed/live site URL — renders a globe icon link on the card. */
  demo?: string;
};

interface ProjectCardProps {
  position: number;
  project: StaggerProject;
  handleMove: (steps: number) => void;
  onOpen: (status: ProjectStatus) => void;
  cardSize: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  position,
  project,
  handleMove,
  onOpen,
  cardSize,
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => (isCenter ? onOpen(project.status) : handleMove(position))}
      className={cn(
        'group absolute left-1/2 top-1/2 flex cursor-pointer flex-col border p-7 transition-all duration-500 ease-smooth sm:p-8',
        isCenter
          ? 'z-10 border-bone-50 bg-bone-50 text-ink-950'
          : 'z-0 border-bone-100/15 bg-ink-900/70 text-bone-100 hover:border-moss-300/50 hover:[--card-lift:-12px] hover:[--card-scale:1.03]',
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath:
          'polygon(48px 0%, calc(100% - 48px) 0%, 100% 48px, 100% 100%, calc(100% - 48px) 100%, 48px 100%, 0 100%, 0 0)',
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          translateY(var(--card-lift, 0px))
          scale(var(--card-scale, 1))
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? '0px 8px 0px 4px rgb(var(--ink-700))'
          : '0px 0px 0px 0px transparent',
      }}
    >
      {/* soft accent wash that fades in on hover (non-center cards) */}
      {!isCenter && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-smooth group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(120% 90% at 50% 0%, rgb(var(--moss-300) / 0.14), transparent 60%)',
          }}
        />
      )}

      {/* diagonal hairline cutting the clipped corner */}
      <span
        aria-hidden
        className={cn(
          'absolute block origin-top-right rotate-45',
          isCenter ? 'bg-ink-950/20' : 'bg-bone-100/15',
        )}
        style={{ right: -2, top: 46, width: SQRT_5000, height: 1 }}
      />

      {/* header: year · category + status chip */}
      <div className="flex items-start justify-between gap-3">
        <div
          className={cn(
            'flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em]',
            isCenter ? 'text-ink-950/60' : 'text-bone-100/55',
          )}
        >
          <span className={isCenter ? 'text-ink-950' : 'text-moss-300'}>
            N°{project.no}
          </span>
          <span className={isCenter ? 'text-ink-950/30' : 'text-bone-100/25'}>
            ·
          </span>
          {project.year}
          <span className={isCenter ? 'text-ink-950/30' : 'text-bone-100/25'}>
            ·
          </span>
          {project.category}
        </div>
      </div>

      {/* title + description */}
      <div className="mt-5 flex-1 overflow-hidden">
        <h3
          className={cn(
            'text-balance font-display text-xl leading-snug sm:text-2xl',
            isCenter ? 'text-ink-950' : 'text-bone-50',
          )}
        >
          {project.title}
        </h3>
        <p
          className={cn(
            'mt-3 text-sm leading-relaxed',
            isCenter ? 'text-ink-950/70' : 'text-bone-100/65',
          )}
        >
          {project.description}
        </p>
      </div>

      {/* footer: tags + cta */}
      <div className="mt-4 space-y-4">
        <ul className="flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <li
              key={t}
              className={cn(
                'border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em]',
                isCenter
                  ? 'border-ink-950/20 text-ink-950/70'
                  : 'border-bone-100/15 text-bone-100/60',
              )}
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between gap-3">
          <CtaLabel status={project.status} isCenter={isCenter} />

          {(project.github || project.demo) && (
            <div className="flex items-center gap-1.5">
              {project.github && (
                <IconLink
                  href={project.github}
                  label="Code source sur GitHub"
                  isCenter={isCenter}
                >
                  <GithubMark className="h-3.5 w-3.5" />
                </IconLink>
              )}
              {project.demo && (
                <IconLink
                  href={project.demo}
                  label="Site déployé"
                  isCenter={isCenter}
                >
                  <Globe className="h-3.5 w-3.5" />
                </IconLink>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function IconLink({
  href,
  label,
  isCenter,
  children,
}: {
  href: string;
  label: string;
  isCenter: boolean;
  children: React.ReactNode;
}) {
  // Empty/"#" hrefs are placeholders — render a dimmed, non-navigating icon.
  const placeholder = !href || href === '#';

  return (
    <a
      href={placeholder ? undefined : href}
      {...(placeholder
        ? {}
        : { target: '_blank', rel: 'noreferrer noopener' })}
      aria-label={label}
      aria-disabled={placeholder || undefined}
      title={placeholder ? `${label} — à venir` : label}
      onClick={(e) => {
        e.stopPropagation();
        if (placeholder) e.preventDefault();
      }}
      className={cn(
        'inline-flex h-7 w-7 items-center justify-center border transition-colors',
        placeholder
          ? isCenter
            ? 'cursor-default border-ink-950/10 text-ink-950/25'
            : 'cursor-default border-bone-100/10 text-bone-100/20'
          : isCenter
            ? 'border-ink-950/20 text-ink-950/65 hover:border-ink-950 hover:text-ink-950'
            : 'border-bone-100/15 text-bone-100/55 hover:border-moss-300/60 hover:text-moss-300',
      )}
    >
      {children}
    </a>
  );
}

function CtaLabel({
  status,
  isCenter,
}: {
  status: ProjectStatus;
  isCenter: boolean;
}) {
  const base = cn(
    'inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em]',
    isCenter ? 'text-ink-950' : 'text-bone-100/70',
  );

  if (status.kind === 'soon') {
    return (
      <span
        className={cn(
          'font-mono text-[10px] uppercase tracking-[0.2em]',
          isCenter ? 'text-ink-950/45' : 'text-bone-100/40',
        )}
      >
        Case study bientôt
      </span>
    );
  }

  return (
    <span className={base}>
      Lire le case study
      <ArrowUpRight className="h-3 w-3 transition-transform duration-500 ease-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </span>
  );
}

interface StaggerProjectsProps {
  projects: StaggerProject[];
}

export const StaggerProjects: React.FC<StaggerProjectsProps> = ({
  projects,
}) => {
  const router = useRouter();
  const [cardSize, setCardSize] = useState(365);
  const [list, setList] = useState<StaggerProject[]>(projects);

  const handleMove = (steps: number) => {
    const newList = [...list];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setList(newList);
  };

  const onOpen = (status: ProjectStatus) => {
    if (status.kind === 'case-study') router.push(status.href);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia('(min-width: 640px)');
      setCardSize(matches ? 365 : 290);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 600 }}>
      {list.map((project, index) => {
        const position =
          list.length % 2
            ? index - (list.length + 1) / 2
            : index - list.length / 2;
        return (
          <ProjectCard
            key={project.tempId}
            project={project}
            handleMove={handleMove}
            onOpen={onOpen}
            position={position}
            cardSize={cardSize}
          />
        );
      })}

      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            'flex h-12 w-12 items-center justify-center border border-bone-100/20 bg-ink-900/60 text-bone-100 transition-colors',
            'hover:border-bone-50 hover:bg-bone-50 hover:text-ink-950',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bone-50/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950',
          )}
          aria-label="Projet précédent"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            'flex h-12 w-12 items-center justify-center border border-bone-100/20 bg-ink-900/60 text-bone-100 transition-colors',
            'hover:border-bone-50 hover:bg-bone-50 hover:text-ink-950',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bone-50/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950',
          )}
          aria-label="Projet suivant"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
