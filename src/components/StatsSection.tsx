import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const StatsSection: React.FC = () => {
  const { stats, owner } = PORTFOLIO_DATA;

  return (
    <section
      id="stats"
      aria-label="Verified AI Experience Metrics"
      className="border-b border-rule bg-bone"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-20">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-rule">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-vermilion">
              01 / Proof of Practice
            </p>
            <h2 className="mt-2 font-display font-bold text-2xl sm:text-3xl text-ink tracking-tight">
              {owner.positioningLine}
            </h2>
          </div>
          <p className="font-mono text-xs text-ink-muted max-w-md">
            Every figure below reflects direct, daily building across frontier and local AI models since November 2022.
          </p>
        </div>

        {/* 4-Column Architectural Stat Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-rule border-b border-rule">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="py-8 sm:px-6 first:sm:pl-0 last:sm:pr-0 flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between text-xs font-mono text-ink-faint">
                <span>FIG. 0{index + 1}</span>
                {stat.suffix && (
                  <span className="px-2 py-0.5 rounded bg-bone-warm text-ink-2 font-medium">
                    {stat.suffix}
                  </span>
                )}
              </div>

              <div className="my-6 flex items-baseline gap-2">
                <span className="display-monument text-ink text-5xl sm:text-6xl xl:text-7xl group-hover:text-vermilion transition-colors duration-300">
                  {stat.value}
                </span>
              </div>

              <div className="space-y-1.5 border-t border-rule/70 pt-4">
                <h3 className="font-semibold text-base text-ink">{stat.label}</h3>
                <p className="text-xs text-ink-muted leading-relaxed">{stat.sublabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
