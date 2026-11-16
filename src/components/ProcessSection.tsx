import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SpotlightCard } from './SpotlightCard';

export const ProcessSection: React.FC = () => {
  const sectionRef = useScrollReveal<HTMLElement>(100);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative z-10 mx-auto max-w-[1280px] px-4 py-16 sm:px-8 sm:py-24"
    >
      {/* Header */}
      <div className="reveal-up mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="section-pill mb-4">
            <span className="section-pill-dot" aria-hidden="true" />
            <span>[07] // EXECUTION PROTOCOL · HOW I WORK</span>
          </div>
          <h2 className="section-h2">
            From idea to <span className="serif-italic font-normal text-neon-emerald">working</span> product.
          </h2>
        </div>
        <p className="max-w-[420px] text-base font-medium leading-relaxed text-slate-300">
          Three focused steps that turn clear requirements into real, usable software and media.
        </p>
      </div>

      {/* 3 Steps — Translucent Obsidian Monoliths (no loud solid blocks) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {PORTFOLIO_DATA.process.map((step, idx) => {
          const isFeatured = idx === 1;
          return (
            <SpotlightCard
              key={step.number}
              glowColor={isFeatured ? 'rgba(0, 245, 160, 0.2)' : 'rgba(0, 217, 245, 0.15)'}
              className={`reveal-up rounded-[28px] p-7 sm:p-8 ${
                isFeatured ? 'cyber-glass-emerald' : 'cyber-glass'
              }`}
            >
              {/* Top glowing hairline */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-6 top-0 h-[1.5px]"
                style={{
                  background: isFeatured
                    ? 'linear-gradient(90deg, transparent, #00F5A0, #00D9F5, transparent)'
                    : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                }}
              />

              <div className="flex h-full flex-col justify-between">
                <div>
                  {/* Step Number Pill */}
                  <div className="mb-8 flex items-center justify-between">
                    <span
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border font-mono text-base font-bold ${
                        isFeatured
                          ? 'border-[#00F5A0]/50 bg-[#00F5A0]/15 text-[#00F5A0] shadow-[0_0_24px_rgba(0,245,160,0.25)]'
                          : 'border-white/15 bg-white/[0.04] text-white'
                      }`}
                    >
                      {step.number}
                    </span>

                    <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                      STEP // {step.number}
                    </span>
                  </div>

                  <h3 className="mb-3 font-display text-2xl font-extrabold tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="text-base font-medium leading-relaxed text-slate-300">
                    {step.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-white/[0.08] pt-4 font-mono text-xs font-semibold uppercase tracking-wider text-[#00F5A0]">
                  <span>{step.deliverable}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
};
