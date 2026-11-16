import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SpotlightCard } from './SpotlightCard';

export const ToolkitSection: React.FC = () => {
  const sectionRef = useScrollReveal<HTMLElement>(90);
  const { aiPlatforms, buildingWithAi } = PORTFOLIO_DATA.toolkit;

  return (
    <section
      id="toolkit"
      ref={sectionRef}
      className="relative z-10 mx-auto max-w-[1280px] px-4 py-16 sm:px-8 sm:py-24"
    >
      {/* Header */}
      <div className="reveal-up mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="section-pill mb-4">
            <span className="section-pill-dot" aria-hidden="true" />
            <span>[08] // NEURAL STACK · TOOLKIT</span>
          </div>
          <h2 className="section-h2">
            AI platforms & <span className="serif-italic font-normal text-neon-emerald">tools</span> I use daily.
          </h2>
        </div>
        <p className="max-w-[430px] text-base font-medium leading-relaxed text-slate-300">
          Four AI platforms combined with modern web and creative tools to ship complete products.
        </p>
      </div>

      {/* Two Panels */}
      <div className="grid grid-cols-1 gap-7 lg:grid-cols-12">
        {/* Panel 1: AI Platforms */}
        <SpotlightCard
          maxTilt={3}
          glowColor="rgba(0, 245, 160, 0.16)"
          className="reveal-up cyber-glass-emerald dot-texture-emerald rounded-[32px] p-7 text-white sm:p-10 lg:col-span-6"
        >
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="mb-6 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#00F5A0]/40 bg-[#00F5A0]/12 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#00F5A0]">
                  <span className="h-2 w-2 rounded-full bg-[#00F5A0] shadow-[0_0_8px_#00F5A0]" />
                  PANEL 01 // AI PLATFORMS
                </span>
                <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                  DAILY DRIVER STACK
                </span>
              </div>

              <h3 className="mb-6 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                AI Platforms
              </h3>

              <div className="space-y-3.5">
                {aiPlatforms.map((platform, idx) => (
                  <div
                    key={platform.name}
                    className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-[#04070E]/85 p-4 transition-colors hover:border-[#00F5A0]/45"
                  >
                    <div>
                      <div className="font-display text-base font-extrabold text-white sm:text-lg">
                        {platform.name}
                      </div>
                      <p className="mt-0.5 text-sm font-medium text-slate-300">{platform.role}</p>
                    </div>
                    <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#00F5A0]/35 bg-[#00F5A0]/15 font-mono text-xs font-semibold text-[#00F5A0]">
                      0{idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5 text-xs font-semibold text-slate-300">
              <span>Cloud frontier models + private local inference</span>
              <span className="font-mono font-semibold text-[#00F5A0]">4 ACTIVE PLATFORMS</span>
            </div>
          </div>
        </SpotlightCard>

        {/* Panel 2: Building with AI */}
        <SpotlightCard
          maxTilt={3}
          glowColor="rgba(229, 184, 75, 0.16)"
          className="reveal-up cyber-glass rounded-[32px] p-7 sm:p-10 lg:col-span-6"
        >
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="mb-6 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#E5B84B]/40 bg-[#E5B84B]/12 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#E5B84B]">
                  <span className="h-2 w-2 rounded-full bg-[#E5B84B] shadow-[0_0_8px_#E5B84B]" />
                  PANEL 02 // BUILDING WITH AI
                </span>
                <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                  PRODUCTION STACK
                </span>
              </div>

              <h3 className="mb-6 font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Building with AI
              </h3>

              {/* Group 1: What I build */}
              <div className="mb-6">
                <div className="mb-2.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  What I create end to end
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {buildingWithAi.whatIMake.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#00F5A0]/45 bg-[#00F5A0]/15 px-4 py-2 font-display text-sm font-extrabold text-[#00F5A0] shadow-[0_0_20px_rgba(0,245,160,0.15)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Group 2: Tech used */}
              <div className="mb-6">
                <div className="mb-2.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Code & Application Stack
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {buildingWithAi.techUsed.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-xs font-semibold text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Group 3: Design & CMS */}
              <div>
                <div className="mb-2.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Design & Publishing Platforms
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {buildingWithAi.creativeAndCms.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-[#E5B84B]/45 bg-[#E5B84B]/12 px-4 py-2 font-mono text-xs font-semibold text-[#E5B84B]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5 text-xs font-semibold text-slate-300">
              <span>Full workflow from prompt to live deployment</span>
              <span className="font-mono font-semibold text-[#E5B84B]">END-TO-END</span>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
};
