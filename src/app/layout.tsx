import type { Metadata } from 'next';
import { Oswald, Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import GridBackground from '@/components/GridBackground';
import MotionProvider from '@/components/MotionProvider';

// Poster display face: Oswald — a bold condensed grotesque set uppercase with
// wide tracking for the anime/Japanese-poster headlines (see globals.css).
const display = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

// Elegant high-contrast serif — reserved for the hero name in italic, matching
// the refined wordmark in the art direction.
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aymen Khatrani — Data Scientist',
  description:
    'Élève-ingénieur Polytech Lille (ISIA). Data science appliquée à la finance et à l’assurance — scoring crédit, modélisation prédictive, ML interprétable. Recherche alternance, septembre 2026.',
  openGraph: {
    title: 'Aymen Khatrani — Data Scientist',
    description:
      'Élève-ingénieur Polytech Lille (ISIA). Data science appliquée à la finance et à l’assurance. Recherche alternance, septembre 2026.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${serif.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        {/* Set the theme before first paint to avoid a flash of the wrong mode.
            Honours a saved choice, otherwise the OS preference (default: dark). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`,
          }}
        />
      </head>
      <body className="bg-ink-950 font-sans text-bone-100 antialiased selection:bg-moss-500/40 selection:text-bone-50">
        <GridBackground />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
