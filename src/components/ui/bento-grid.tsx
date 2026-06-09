'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { slideIn, staggerContainer, viewportOnce, type SlideFrom } from '@/lib/motion';

/* ── Bento grid ──────────────────────────────────────────────────────────────
   A palette-native take on the classic "bento" card grid, wired into the
   project's shared motion vocabulary. The original reference component shipped
   raw gray/blue dark-mode utilities; this version speaks ink/bone/moss instead,
   so it tracks the light/dark theme tokens like the rest of the site.

   Two pieces:
     · BentoGrid — the responsive grid + stagger orchestrator (parent).
     · BentoCard — one card shell that slides in along an axis. It renders
       structured props (icon/title/meta/status/description/tags) or, when given
       `children`, whatever you compose inside it.

   Direction defaults to the card's column when omitted (left col → from left,
   right col → from right, middle → from below), giving the horizontal +
   vertical "assembly" feel without callers thinking about it. */

export interface BentoItem {
  title: string;
  description?: string;
  icon?: ReactNode;
  status?: string;
  tags?: string[];
  meta?: string;
  cta?: string;
  /** 1 = single column, 2 = wide (spans two columns on md+). */
  colSpan?: 1 | 2;
  /** Keep the hover/active treatment always on (feature card). */
  featured?: boolean;
  /** Override the entrance direction; otherwise derived from grid position. */
  from?: SlideFrom;
}

/* ── Card shell ────────────────────────────────────────────────────────────── */

type BentoCardProps = {
  colSpan?: 1 | 2;
  featured?: boolean;
  from?: SlideFrom;
  className?: string;
  children?: ReactNode;
} & Partial<Pick<BentoItem, 'icon' | 'title' | 'meta' | 'status' | 'description' | 'tags' | 'cta'>>;

export function BentoCard({
  colSpan = 1,
  featured = false,
  from = 'up',
  className,
  children,
  icon,
  title,
  meta,
  status,
  description,
  tags,
  cta,
}: BentoCardProps) {
  return (
    <motion.div
      variants={slideIn(from)}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-[3px] p-6 transition-[transform,border-color,box-shadow] duration-500 ease-smooth will-change-transform',
        'border border-moss-300/30 bg-[#14100F]/60 backdrop-blur-sm',
        'hover:-translate-y-1 hover:border-moss-300/60 hover:shadow-[0_0_20px_rgba(201,133,58,0.2)]',
        featured &&
          '-translate-y-1 border-moss-300/55 bg-[#1C1716]/70 shadow-[0_0_20px_rgba(201,133,58,0.15)]',
        colSpan === 2 ? 'md:col-span-2' : 'col-span-1',
        className,
      )}
    >
      {/* hairline sheen on top edge — appears on hover (or always when featured) */}
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-moss-300/40 to-transparent transition-opacity duration-500',
          featured ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
        )}
      />
      {/* subtle dotted texture, fades in on hover */}
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(var(--bone-100)/0.05)_1px,transparent_1px)] [background-size:5px_5px] transition-opacity duration-500',
          featured ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
        )}
      />

      {children ? (
        <div className="relative flex flex-1 flex-col">{children}</div>
      ) : (
        <div className="relative flex flex-1 flex-col">
          {(icon || status) && (
            <div className="mb-5 flex items-center justify-between">
              {icon && (
                <span className="flex h-9 w-9 items-center justify-center rounded-[3px] border border-moss-300/30 bg-moss-300/[0.08] text-moss-300 transition-colors duration-500 group-hover:border-moss-300/60">
                  {icon}
                </span>
              )}
              {status && (
                <span className="ml-auto rounded-[3px] border border-moss-300/40 bg-moss-300/[0.12] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-moss-300">
                  {status}
                </span>
              )}
            </div>
          )}

          {title && (
            <h3 className="text-balance text-lg leading-snug text-bone-50">
              {title}
              {meta && (
                <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/45">
                  {meta}
                </span>
              )}
            </h3>
          )}

          {description && (
            <p className="mt-3 text-balance text-[15px] leading-relaxed text-bone-100/75">
              {description}
            </p>
          )}

          {(tags?.length || cta) && (
            <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
              {tags?.length ? (
                <ul className="flex flex-wrap gap-1.5">
                  {tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-[3px] border border-moss-300 bg-moss-300/[0.15] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-moss-300"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              ) : (
                <span />
              )}
              {cta && (
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-moss-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {cta}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

/* ── Grid orchestrator ─────────────────────────────────────────────────────── */

/** Derive a default slide direction from the card's column in a 3-col grid. */
function directionForColumn(index: number): SlideFrom {
  const col = index % 3;
  if (col === 0) return 'left';
  if (col === 2) return 'right';
  return 'up';
}

export function BentoGrid({ items }: { items: BentoItem[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="shown"
      viewport={viewportOnce}
      variants={staggerContainer(0.08)}
      className="grid grid-cols-1 gap-4 md:grid-cols-3"
    >
      {items.map((item, index) => (
        <BentoCard
          key={item.title}
          colSpan={item.colSpan}
          featured={item.featured}
          from={item.from ?? directionForColumn(index)}
          icon={item.icon}
          title={item.title}
          meta={item.meta}
          status={item.status}
          description={item.description}
          tags={item.tags}
          cta={item.cta}
        />
      ))}
    </motion.div>
  );
}
