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
    'group inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-medium ' +
    'transition-[transform,background-color,border-color,color] duration-500 ease-smooth ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bone-100/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950';

  const styles =
    variant === 'primary'
      ? 'bg-bone-50 text-ink-950 hover:bg-bone-100 active:translate-y-px'
      : 'border border-bone-100/15 bg-transparent text-bone-100 hover:border-bone-100/40 hover:bg-bone-100/[0.04]';

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
