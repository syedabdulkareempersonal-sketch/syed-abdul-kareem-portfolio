import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const JourneyEducationSection: React.FC = () => {
  const sectionRef = useScrollReveal<HTMLElement>(90);
  const { journey, education } = PORTFOLIO_DATA;

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="mx-auto max-w-[1280px] px-4 py-16 sm:px-8 sm:py-24"
    >
      {/* Header */}
      <div className="reveal-up mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="section-pill mb-4">
            <span className="section-pill-dot" aria-hidden="true" />
            <span>TIMELINE // 2022 → 2026</span>
          </div>
          <h2 className="section-h2">
            My <span className="serif-italic font-normal text-[#14F195]">journey</span> with AI.
          </h2>
        </div>

        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#14F195]/40 bg-[#14F195]/10 px-5 py-2.5 font-display text-sm font-extrabold text-[#14F195]">
          <span className="h-2 w-2 rounded-full bg-[#14F195] shadow-[0_0_10px_#14F195]" />
          <span>{journey.positioningLine}</span>
        </div>
      </div>

      {/* 3-Step Journey Timeline */}
      <div className="relative mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {journey.milestones.map((item, idx) => (
          <div
            key={item.period}
            className="reveal-up cyber-glass relative flex flex-col justify-between overflow-hidden rounded-[28px] p-7 sm:p-8"
          >
            {/* Top neon accent */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#14F195] via-[#F5C451] to-transparent"
            />

            <div>
              <div className="mb-6 flex items-center justify-between gap-3">
                <span className="font-display text-2xl font-extrabold tracking-tight text-[#14F195] sm:text-3xl">
                  {item.period}
                </span>
                <span className="rounded-full border border-[#F5C451]/35 bg-[#F5C451]/15 px-3 py-1 font-display text-[11px] font-extrabold uppercase tracking-wider text-[#F5C451]">
                  {item.badge}
                </span>
              </div>

              <h3 className="mb-3 font-display text-xl font-extrabold text-white">{item.title}</h3>
              <p className="text-base font-medium leading-relaxed text-slate-300">{item.description}</p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-bold uppercase tracking-widest text-slate-400">
              <span>PHASE 0{idx + 1}</span>
              <span className="text-[#14F195]">● ACTIVE</span>
            </div>
          </div>
        ))}
      </div>

      {/* Education Panel */}
      <div className="reveal-up cyber-glass-gold relative overflow-hidden rounded-[32px] p-7 sm:p-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#F5C451]/40 bg-[#F5C451]/15 px-3.5 py-1 font-display text-xs font-extrabold uppercase tracking-wider text-[#F5C451]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>EDUCATION</span>
            </div>

            <h3 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
              {education.degree} —{' '}
              <span className="text-[#F5C451]">{education.institution}</span>, {education.location}
            </h3>

            {/* Certificate shown as one short line only */}
            <p className="mt-4 border-t border-white/15 pt-3.5 font-body text-sm font-semibold text-slate-200 sm:text-base">
              {education.certificateSingleLine}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-3 lg:flex-col lg:items-end">
            <span className="rounded-full border border-white/20 bg-[#050811]/75 px-4 py-2 font-display text-sm font-extrabold text-white">
              {education.period}
            </span>
            <span className="rounded-full border border-[#14F195]/45 bg-[#14F195]/20 px-4 py-2 font-display text-sm font-extrabold text-[#14F195]">
              {education.score}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
