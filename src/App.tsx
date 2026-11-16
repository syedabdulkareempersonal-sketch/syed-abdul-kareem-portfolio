import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsSection } from './components/StatsSection';
import { WorkSection } from './components/WorkSection';
import { ServicesSection } from './components/ServicesSection';
import { VideoReelSection } from './components/VideoReelSection';
import { JourneyEducationSection } from './components/JourneyEducationSection';
import { ProcessSection } from './components/ProcessSection';
import { ToolkitSection } from './components/ToolkitSection';
import { ContactSection } from './components/ContactSection';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-bone text-ink paper-grain selection:bg-vermilion selection:text-bone">
      <Navbar />
      <main>
        <Hero />
        <StatsSection />
        <WorkSection />
        <ServicesSection />
        <VideoReelSection />
        <JourneyEducationSection />
        <ProcessSection />
        <ToolkitSection />
      </main>
      <ContactSection />
    </div>
  );
}

export default App;
