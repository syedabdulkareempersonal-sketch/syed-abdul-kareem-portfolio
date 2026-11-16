import React from 'react';
import { PORTFOLIO_DATA, StatItem } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const StatsSection: React.FC = () => {
  const containerRef = useScrollReveal<HTMLElement>(90);

  const getCardClasses = (theme: StatItem['theme']) => {
    switch (theme) {
      case 'emerald':
        return 'bg-gradient-to-br from-[#14F195] to-[#0B7A5E] text-[#041019] dot-texture-light border border-[#14F195] shadow-[0_24px_60px_-16px_rgba(20,241,149,0.35)]';
      case 'navy':
        return 'bg-gradient-to-br from-[#101E3C] to-[#081022] text-white dot-texture-emerald border border-[#14F195]/40 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.85)]';
      case 'gold':
        return 'bg-gradient-to-br from-[#F5C451] to-[#B58917] text-[#050811] dot-texture-light border border-[#FDE68A] shadow-[0_24px_60px_-16px_rgba(245,196,81,0.32)]';
      case 'glass':
      default:
        return 'cyber-glass text-white dot-texture-emerald border border-white/15';
    }
  };

  return (
    <section
      ref={containerRef}
      aria-label="Key AI Building Metrics"
      className="mx-auto max-w-[1280px] px-4 py-12 sm:px-8 sm:py-16"
    >
      {/* Top positioning bar */}
      <div className="reveal-up mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="section-pill">
          <span className="section-pill-dot" aria-hidden="true" />
          <span>TELEMETRY // PROOF OF WORK</span>
        </div>
        <p className="font-display text-sm font-extrabold tracking-wide text-[#14F195] sm:text-base">
          {PORTFOLIO_DATA.hero.positioningLine}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PORTFOLIO_DATA.stats.map((stat, idx) => (
          <div
            key={idx}
            className={`reveal-up relative flex min-h-[225px] flex-col justify-between overflow-hidden rounded-[28px] p-6 sm:p-7 ${getCardClasses(
              stat.theme
            )}`}
          >
            {/* Top indicator */}
            <div className="flex items-center justify-between">
              <span
                className={`inline-flex h-8 w-8 items-center justify-center rounded-full font-display text-xs font-extrabold ${
                  stat.theme === 'emerald' || stat.theme === 'gold'
                    ? 'bg-black/15 text-[#041019]'
                    : 'border border-[#14F195]/35 bg-[#14F195]/15 text-[#14F195]'
                }`}
              >
                0{idx + 1}
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-65"
                aria-hidden="true"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>

            {/* Big number */}
            <div className="my-5">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-[clamp(2.7rem,4.5vw,3.9rem)] font-extrabold leading-none tracking-[-0.04em]">
                  {stat.value}
                </span>
                {stat.suffix && (
                  <span className="rounded-full bg-black/15 px-2.5 py-0.5 font-display text-xs font-extrabold uppercase tracking-wider opacity-90">
                    {stat.suffix}
                  </span>
                )}
              </div>
            </div>

            {/* Label & Sublabel */}
            <div>
              <h2 className="font-display text-base font-extrabold leading-snug sm:text-lg">{stat.label}</h2>
              <p
                className={`mt-1 text-xs font-semibold leading-relaxed sm:text-sm ${
                  stat.theme === 'emerald' || stat.theme === 'gold' ? 'text-[#041019]/80' : 'text-slate-300'
                }`}
              >
                {stat.sublabel}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
