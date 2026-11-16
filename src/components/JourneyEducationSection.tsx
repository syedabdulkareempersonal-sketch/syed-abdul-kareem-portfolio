import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SpotlightCard } from './SpotlightCard';

export const JourneyEducationSection: React.FC = () => {
  const sectionRef = useScrollReveal<HTMLElement>(90);
  const { journey, education } = PORTFOLIO_DATA;

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative z-10 mx-auto max-w-[1280px] px-4 py-16 sm:px-8 sm:py-24"
    >
      {/* Header */}
      <div className="reveal-up mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="section-pill mb-4">
            <span className="section-pill-dot" aria-hidden="true" />
            <span>[06] // TIMELINE · 2022 → 2026</span>
          </div>
          <h2 className="section-h2">
            My <span className="serif-italic font-normal text-neon-emerald">journey</span> with AI.
          </h2>
        </div>

        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#00F5A0]/40 bg-[#00F5A0]/10 px-5 py-2.5 font-mono text-xs font-semibold text-[#00F5A0] sm:text-sm">
          <span className="h-2 w-2 rounded-full bg-[#00F5A0] shadow-[0_0_10px_#00F5A0]" />
          <span>{journey.positioningLine}</span>
        </div>
      </div>

      {/* 3-Step Journey Timeline */}
      <div className="relative mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {journey.milestones.map((item, idx) => (
          <SpotlightCard
            key={item.period}
            glowColor="rgba(0, 245, 160, 0.16)"
            className="reveal-up cyber-glass rounded-[28px] p-7 sm:p-8"
          >
            {/* Top neon accent */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#00F5A0] via-[#00D9F5] to-transparent"
            />

            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="mb-6 flex items-center justify-between gap-3">
                  <span className="font-display text-2xl font-extrabold tracking-tight text-neon-emerald sm:text-3xl">
                    {item.period}
                  </span>
                  <span className="rounded-full border border-[#E5B84B]/35 bg-[#E5B84B]/12 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#E5B84B]">
                    {item.badge}
                  </span>
                </div>

                <h3 className="mb-3 font-display text-xl font-extrabold text-white">{item.title}</h3>
                <p className="text-base font-medium leading-relaxed text-slate-300">{item.description}</p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-4 font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                <span>PHASE // 0{idx + 1}</span>
                <span className="text-[#00F5A0]">● VERIFIED</span>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Education Panel */}
      <SpotlightCard
        maxTilt={2}
        glowColor="rgba(229, 184, 75, 0.16)"
        className="reveal-up cyber-glass-gold relative overflow-hidden rounded-[32px] p-7 sm:p-10"
      >
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E5B84B]/40 bg-[#E5B84B]/12 px-3.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#E5B84B]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>EDUCATION // ACADEMIC CREDENTIALS</span>
            </div>

            <h3 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
              {education.degree} —{' '}
              <span className="text-neon-gold">{education.institution}</span>, {education.location}
            </h3>

            {/* Certificate shown as one short line only */}
            <p className="mt-4 border-t border-white/12 pt-3.5 font-body text-sm font-semibold text-slate-200 sm:text-base">
              {education.certificateSingleLine}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-3 lg:flex-col lg:items-end">
            <span className="rounded-full border border-white/15 bg-[#04070E]/85 px-4 py-2 font-mono text-xs font-semibold text-white">
              {education.period}
            </span>
            <span className="rounded-full border border-[#00F5A0]/45 bg-[#00F5A0]/15 px-4 py-2 font-mono text-xs font-semibold text-[#00F5A0]">
              {education.score}
            </span>
          </div>
        </div>
      </SpotlightCard>
    </section>
  );
};
