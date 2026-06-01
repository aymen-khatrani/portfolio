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
      <Work />
      <ExperienceSection />
    </main>
  );
}
