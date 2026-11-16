import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SpotlightCard } from './SpotlightCard';

export const StatsSection: React.FC = () => {
  const containerRef = useScrollReveal<HTMLElement>(90);

  return (
    <section
      id="stats"
      ref={containerRef}
      aria-label="Key AI Building Metrics"
      className="relative z-10 mx-auto max-w-[1280px] px-4 py-14 sm:px-8 sm:py-20"
    >
      {/* Top positioning bar */}
      <div className="reveal-up mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="section-pill">
          <span className="section-pill-dot" aria-hidden="true" />
          <span>[02] // TELEMETRY · PROOF OF WORK</span>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-[#00F5A0]/30 bg-[#00F5A0]/10 px-4 py-1.5 font-mono text-xs font-semibold tracking-wider text-[#00F5A0]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00F5A0] shadow-[0_0_8px_#00F5A0]" />
          <span>{PORTFOLIO_DATA.hero.positioningLine}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PORTFOLIO_DATA.stats.map((stat, idx) => {
          const isGold = stat.theme === 'gold';
          return (
            <SpotlightCard
              key={idx}
              glowColor={isGold ? 'rgba(229, 184, 75, 0.18)' : 'rgba(0, 245, 160, 0.18)'}
              className={`reveal-up rounded-[28px] p-6 sm:p-7 ${
                isGold ? 'cyber-glass-gold' : idx === 0 ? 'cyber-glass-emerald' : 'cyber-glass'
              }`}
            >
              {/* Top glowing hairline */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-6 top-0 h-[1.5px]"
                style={{
                  background: isGold
                    ? 'linear-gradient(90deg, transparent, #E5B84B, transparent)'
                    : 'linear-gradient(90deg, transparent, #00F5A0, transparent)',
                }}
              />

              <div className="flex h-full min-h-[210px] flex-col justify-between">
                {/* Top indicator */}
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest ${
                      isGold
                        ? 'border-[#E5B84B]/35 bg-[#E5B84B]/10 text-[#E5B84B]'
                        : 'border-[#00F5A0]/35 bg-[#00F5A0]/10 text-[#00F5A0]'
                    }`}
                  >
                    <span>METRIC.0{idx + 1}</span>
                  </span>

                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={isGold ? 'text-[#E5B84B]/70' : 'text-[#00F5A0]/70'}
                    aria-hidden="true"
                  >
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>

                {/* Big number */}
                <div className="my-5">
                  <div className="flex items-baseline gap-2.5">
                    <span
                      className={`font-display text-[clamp(2.8rem,4.5vw,4rem)] font-extrabold leading-none tracking-[-0.04em] ${
                        isGold ? 'text-neon-gold' : idx === 0 ? 'text-neon-emerald' : 'text-white'
                      }`}
                    >
                      {stat.value}
                    </span>
                    {stat.suffix && (
                      <span className="rounded-full border border-[#00F5A0]/35 bg-[#00F5A0]/12 px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#00F5A0]">
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                </div>

                {/* Label & Sublabel */}
                <div className="border-t border-white/[0.07] pt-4">
                  <h2 className="font-display text-base font-extrabold leading-snug text-white sm:text-lg">
                    {stat.label}
                  </h2>
                  <p className="mt-1 text-xs font-medium leading-relaxed text-slate-400 sm:text-sm">
                    {stat.sublabel}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
};
