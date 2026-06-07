'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

export type ProjectStatus =
  | { kind: 'case-study'; href: string }
  | { kind: 'github'; href: string }
  | { kind: 'soon' };

export type StaggerProject = {
  tempId: number;
  year: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  status: ProjectStatus;
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
        'absolute left-1/2 top-1/2 flex cursor-pointer flex-col border p-7 transition-all duration-500 ease-smooth sm:p-8',
        isCenter
          ? 'z-10 border-bone-50 bg-bone-50 text-ink-950'
          : 'z-0 border-bone-100/15 bg-ink-900/70 text-bone-100 hover:border-bone-100/35',
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
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? '0px 8px 0px 4px rgb(var(--ink-700))'
          : '0px 0px 0px 0px transparent',
      }}
    >
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

        <CtaLabel status={project.status} isCenter={isCenter} />
      </div>
    </div>
  );
};

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
      {status.kind === 'case-study' ? 'Lire le case study' : 'Code sur GitHub'}
      <ArrowUpRight className="h-3 w-3" />
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
    else if (status.kind === 'github')
      window.open(status.href, '_blank', 'noopener,noreferrer');
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
