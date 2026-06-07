import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type Variant = 'primary' | 'secondary';

type Props = Omit<ComponentPropsWithoutRef<typeof Link>, 'href'> & {
  href: string;
  variant?: Variant;
  children: ReactNode;
};

export default function CTAButton({
  href,
  variant = 'primary',
  children,
  className = '',
  ...rest
}: Props) {
  const base =
    'group inline-flex items-center gap-2.5 rounded-lg px-5 py-2.5 text-sm font-medium ' +
    'transition-[transform,background-color,border-color,color] duration-500 ease-smooth ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bone-100/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950';

  // Flat, shadowless surfaces. Primary = the single dark CTA (black in light,
  // bronze in dark via the --primary token); secondary = hairline ghost button.
  const styles =
    variant === 'primary'
      ? 'bg-primary text-primary-contrast hover:bg-primary-hover active:translate-y-px'
      : 'border border-border-strong bg-transparent text-text-primary hover:bg-bone-100/[0.04]';

  return (
    <Link href={href} className={`${base} ${styles} ${className}`} {...rest}>
      <span>{children}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5 transition-transform duration-500 ease-smooth group-hover:translate-x-0.5"
      >
        <path
          d="M3 8h10M9 4l4 4-4 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
