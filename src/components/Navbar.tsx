'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';
import ThemeToggle from './ThemeToggle';

const links = [
  { href: '#about', label: 'À propos' },
  { href: '#experience', label: 'Expériences' },
  { href: '#work', label: 'Projets' },
  { href: '/aymen-khatrani-cv.pdf', label: 'CV', external: true },
  { href: 'mailto:aymen.khatrani@polytech-lille.net', label: 'Contact', external: true },
];

// Section ids tracked for the active-link indicator, in document order.
const sectionIds = ['about', 'work', 'experience'];

const socials = [
  {
    href: 'https://github.com/aymen-khatrani',
    label: 'GitHub',
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        role="img"
        aria-hidden="true"
        className="block shrink-0"
        fill="currentColor"
      >
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    href: 'https://linkedin.com/in/aymen-khatrani',
    label: 'LinkedIn',
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        role="img"
        aria-hidden="true"
        className="block shrink-0"
        fill="currentColor"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const reduced = usePrefersReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // Progressive backdrop: the nav background fades in once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active-section indicator driven by IntersectionObserver.
  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: reduced ? 0 : -24, opacity: reduced ? 1 : 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reduced ? 0.01 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5"
    >
      <div
        className={`mx-auto flex max-w-[1320px] items-center justify-between gap-4 rounded-full border px-5 py-3 backdrop-blur-md transition-[background-color,border-color] duration-500 ease-smooth sm:px-7 ${
          scrolled
            ? 'border-ink-700 bg-ink-900/90'
            : 'border-ink-700/60 bg-ink-900/70'
        }`}
      >
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/80 transition-colors hover:text-bone-50"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-moss-300/80" />
          AK / Portfolio
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {links.map((l) => {
              const isActive = !l.external && active === l.href.replace('#', '');
              return l.external ? (
                <li key={l.href}>
                  <a
                    href={l.href}
                    {...(l.href.startsWith('mailto:')
                      ? {}
                      : { target: '_blank', rel: 'noreferrer noopener' })}
                    className="link-underline font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/60 transition-colors hover:text-bone-50"
                  >
                    {l.label}
                  </a>
                </li>
              ) : (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    data-active={isActive}
                    aria-current={isActive ? 'true' : undefined}
                    className={`link-underline font-mono text-[11px] uppercase tracking-[0.22em] transition-colors hover:text-bone-50 ${
                      isActive ? 'text-bone-50' : 'text-bone-100/60'
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-5">
          <ul className="hidden items-center gap-3 sm:flex">
            {socials.map((s) => (
              <li key={s.href} className="flex">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-bone-100/60 transition-colors hover:bg-bone-100/[0.05] hover:text-bone-50"
                >
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <a
            href="mailto:aymen.khatrani@polytech-lille.net"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100/80 transition-colors hover:text-bone-50"
          >
            <span className="hidden sm:inline">Available · </span>Sept 2026
          </a>
        </div>
      </div>
    </motion.header>
  );
}
