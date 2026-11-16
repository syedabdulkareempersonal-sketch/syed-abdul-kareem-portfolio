import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const JourneyEducationSection: React.FC = () => {
  const { journey, education } = PORTFOLIO_DATA;

  return (
    <section
      id="journey"
      aria-label="AI Journey and Education"
      className="border-b border-rule bg-bone"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-24">
        {/* Part 1: 2022 -> 2026 AI Chronicle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-10 border-b border-rule">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-vermilion">
              05 / Chronicle (2022 → 2026)
            </p>
            <h2 className="mt-2 display-monument uppercase text-ink text-4xl sm:text-5xl lg:text-6xl">
              The AI{' '}
              <span className="serif-editorial italic font-normal lowercase text-vermilion">
                journey
              </span>
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-wider text-ink-2">
            {journey.positioningLine}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-rule border-b border-rule">
          {journey.milestones.map((item, idx) => (
            <div
              key={item.period}
              className="py-8 md:px-6 first:md:pl-0 last:md:pr-0 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-vermilion font-semibold">
                    0{idx + 1} // {item.period}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded bg-bone-warm text-ink-2">
                    {item.badge}
                  </span>
                </div>
                <h3 className="mt-4 font-display font-bold text-xl sm:text-2xl text-ink">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm sm:text-base text-ink-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Part 2: Academic Credentials & Single-Line Certificate */}
        <div className="mt-14 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-baseline">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-widest text-vermilion">
                Academic Foundation
              </p>
              <h3 className="mt-1 font-display font-bold text-2xl text-ink">
                Education & Certification
              </h3>
            </div>

            <div className="lg:col-span-8 space-y-5">
              {/* Degree */}
              <div className="p-6 rounded-2xl border border-rule bg-bone-warm/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-display font-bold text-lg sm:text-xl text-ink">
                    {education.degree}
                  </h4>
                  <p className="text-sm sm:text-base text-ink-2">
                    {education.institution}, {education.location}
                  </p>
                </div>
                <div className="sm:text-right font-mono text-xs text-ink-muted shrink-0">
                  <div className="text-ink font-semibold">{education.score}</div>
                  <div>{education.period}</div>
                </div>
              </div>

              {/* Single short line certificate as strictly requested */}
              <p className="font-mono text-xs sm:text-sm text-ink-2 px-2">
                {education.certificateSingleLine}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
