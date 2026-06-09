import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Work from '@/components/Work';
import ExperienceSection from '@/components/Experience';

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <ExperienceSection />
      <Work />

      {/* Footer — large faded katakana watermark (ポートフォリオ · "portfolio") */}
      <footer className="relative isolate overflow-hidden border-t border-[rgba(201,133,58,0.2)] px-6 py-16 sm:px-10 lg:px-16">
        <span
          aria-hidden
          className="jp-watermark pointer-events-none absolute inset-x-0 -bottom-8 -z-10 text-center text-[clamp(5rem,20vw,18rem)] tracking-[0.1em]"
        >
          ポートフォリオ
        </span>
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-200/60 sm:flex-row sm:items-center">
          <span>Aymen Khatrani · Data &amp; IA</span>
          <span className="text-bone-100/35">© 2026 · Lille</span>
        </div>
      </footer>
    </main>
  );
}
