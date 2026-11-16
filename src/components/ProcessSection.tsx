import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const ProcessSection: React.FC = () => {
  const { process } = PORTFOLIO_DATA;

  return (
    <section
      id="process"
      aria-label="Working Process"
      className="border-b border-rule bg-bone"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-10 border-b border-rule">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-vermilion">
              06 / Methodology
            </p>
            <h2 className="mt-2 display-monument uppercase text-ink text-4xl sm:text-5xl lg:text-6xl">
              How I{' '}
              <span className="serif-editorial italic font-normal lowercase text-vermilion">
                build
              </span>
            </h2>
          </div>
          <p className="font-mono text-xs text-ink-muted max-w-sm">
            Three disciplined phases from initial problem framing to production release.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-rule border-b border-rule">
          {process.map((step) => (
            <div
              key={step.number}
              className="py-8 md:px-6 first:md:pl-0 last:md:pr-0 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="display-monument text-4xl sm:text-5xl text-vermilion">
                    {step.number}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 rounded bg-bone-warm text-ink-2">
                    {step.deliverable}
                  </span>
                </div>
                <h3 className="mt-5 font-display font-bold text-xl sm:text-2xl text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-ink-2 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
