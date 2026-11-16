import React from 'react';
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
  return (
    <div className="min-h-screen w-full overflow-x-hidden selection:bg-[#14F195] selection:text-[#041019]">
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
  );
};

export default App;
