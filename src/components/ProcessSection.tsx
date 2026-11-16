import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const ProcessSection: React.FC = () => {
  const sectionRef = useScrollReveal<HTMLElement>(100);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="mx-auto max-w-[1280px] px-4 py-16 sm:px-8 sm:py-24"
    >
      {/* Header */}
      <div className="reveal-up mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="section-pill mb-4">
            <span className="section-pill-dot" aria-hidden="true" />
            <span>EXECUTION PROTOCOL // HOW I WORK</span>
          </div>
          <h2 className="section-h2">
            From idea to <span className="serif-italic font-normal text-[#14F195]">working</span> product.
          </h2>
        </div>
        <p className="max-w-[420px] text-base font-medium leading-relaxed text-slate-300">
          Three focused steps that turn clear requirements into real, usable software and media.
        </p>
      </div>

      {/* 3 Steps */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {PORTFOLIO_DATA.process.map((step, idx) => (
          <div
            key={step.number}
            className={`reveal-up relative flex flex-col justify-between rounded-[28px] p-7 sm:p-8 ${
              idx === 1
                ? 'bg-gradient-to-br from-[#14F195] to-[#0B7A5E] text-[#041019] dot-texture-light border border-[#14F195] shadow-[0_24px_60px_-16px_rgba(20,241,149,0.35)]'
                : 'cyber-glass text-white'
            }`}
          >
            <div>
              {/* Step Number Pill */}
              <div className="mb-8 flex items-center justify-between">
                <span
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl font-display text-lg font-extrabold ${
                    idx === 1
                      ? 'bg-black/20 text-[#041019]'
                      : 'border border-[#14F195]/40 bg-[#14F195]/15 text-[#14F195]'
                  }`}
                >
                  {step.number}
                </span>

                <span
                  className={`rounded-full px-3 py-1 font-display text-xs font-extrabold uppercase tracking-wider ${
                    idx === 1
                      ? 'bg-black/15 text-[#041019]'
                      : 'border border-white/15 bg-white/5 text-slate-300'
                  }`}
                >
                  Step {step.number}
                </span>
              </div>

              <h3 className="mb-3 font-display text-2xl font-extrabold tracking-tight">{step.title}</h3>
              <p
                className={`text-base font-medium leading-relaxed ${
                  idx === 1 ? 'text-[#041019]/85' : 'text-slate-300'
                }`}
              >
                {step.description}
              </p>
            </div>

            <div
              className={`mt-8 flex items-center justify-between border-t pt-4 text-xs font-bold uppercase tracking-wider ${
                idx === 1 ? 'border-black/15 text-[#041019]' : 'border-white/10 text-[#14F195]'
              }`}
            >
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
        ))}
      </div>
    </section>
  );
};
