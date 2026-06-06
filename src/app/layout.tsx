import type { Metadata } from 'next';
import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

const display = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-display',
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
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="bg-ink-950 text-bone-100 antialiased selection:bg-moss-500/40 selection:text-bone-50">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
