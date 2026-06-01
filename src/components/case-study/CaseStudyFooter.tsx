'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

type Props = {
  repoUrl?: string;
  collaborators?: string[];
};

export default function CaseStudyFooter({ repoUrl, collaborators }: Props) {
  return (
    <footer className="relative scroll-mt-24 border-t border-bone-100/10 px-6 py-20 sm:px-10 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex max-w-[1100px] flex-col gap-10 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/55">
            Fin du dossier
          </div>
          <p className="mt-3 max-w-[36ch] text-balance text-lg text-bone-100/80">
            Envie d’en parler de vive voix ? Je suis ouvert à un café ou un
            call.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 rounded-full border border-bone-100/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/80 transition-colors hover:border-bone-100/40 hover:text-bone-50"
            >
              ← Autres projets
            </Link>
            <a
              href="mailto:aymen.khatrani@polytech-lille.net"
              className="inline-flex items-center gap-2 rounded-full bg-bone-50 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-950 transition-colors hover:bg-bone-100"
            >
              Me contacter
            </a>
          </div>
        </div>

        <div className="space-y-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/55">
          {repoUrl && (
            <div className="flex items-baseline justify-between gap-6 sm:justify-end">
              <span className="text-bone-100/35 sm:text-right">Code</span>
              <a
                href={repoUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-bone-100/85 transition-colors hover:text-bone-50"
              >
                GitHub ↗
              </a>
            </div>
          )}
          {collaborators && collaborators.length > 0 && (
            <div className="flex items-baseline justify-between gap-6 sm:justify-end">
              <span className="text-bone-100/35 sm:text-right">
                Collaborateurs
              </span>
              <span className="text-bone-100/85">
                {collaborators.join(' · ')}
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </footer>
  );
}
