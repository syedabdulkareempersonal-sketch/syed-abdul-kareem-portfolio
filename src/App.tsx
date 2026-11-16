import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { WorldCanvas3D } from './components/WorldCanvas3D';
import { SpatialHUD } from './components/SpatialHUD';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Ring3D } from './components/Ring3D';
import { GhostMarquee } from './components/GhostMarquee';
import { StatsSection } from './components/StatsSection';
import { WorkSection } from './components/WorkSection';
import { ServicesSection } from './components/ServicesSection';
import { VideoReelSection } from './components/VideoReelSection';
import { JourneyEducationSection } from './components/JourneyEducationSection';
import { ProcessSection } from './components/ProcessSection';
import { ToolkitSection } from './components/ToolkitSection';
import { ContactSection } from './components/ContactSection';

export const App: React.FC = () => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden selection:bg-[#00F5A0] selection:text-[#020806]">
      {/* Persistent Full-Viewport 3D WebGL Custom GLSL Shader World */}
      <WorldCanvas3D />

      {/* Spatial HUD Overlay (Progress Laser, Custom Magnetic Reticle, Telemetry Chapter Rail) */}
      <SpatialHUD />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Ring3D />
          <GhostMarquee />
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
    </div>
  );
};

export default App;
