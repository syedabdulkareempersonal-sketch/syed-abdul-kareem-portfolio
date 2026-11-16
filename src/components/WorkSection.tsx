import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SpotlightCard } from './SpotlightCard';

export const WorkSection: React.FC = () => {
  const sectionRef = useScrollReveal<HTMLElement>(100);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative z-10 mx-auto max-w-[1280px] px-4 py-16 sm:px-8 sm:py-24"
    >
      {/* Section Header */}
      <div className="reveal-up mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="section-pill mb-4">
            <span className="section-pill-dot" aria-hidden="true" />
            <span>[03] // SELECTED WORK · SHIPPED PRODUCTS</span>
          </div>
          <h2 className="section-h2">
            Products <span className="serif-italic font-normal text-neon-emerald">shipped</span> with AI.
          </h2>
        </div>
        <p className="max-w-[440px] text-base font-medium leading-relaxed text-slate-300">
          Real applications and websites built from initial concept to working product using modern AI workflows.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 gap-7 lg:grid-cols-12">
        {PORTFOLIO_DATA.projects.map((project, index) => {
          const isWide = project.featuredWide;
          const hasLiveUrl = Boolean(project.url && project.url.trim().length > 0);
          const isEmerald = project.accentColor === '#10A37F';

          return (
            <SpotlightCard
              key={project.id}
              as="article"
              maxTilt={isWide ? 2.5 : 4}
              glowColor={isEmerald ? 'rgba(0, 245, 160, 0.16)' : 'rgba(229, 184, 75, 0.16)'}
              className={`reveal-up cyber-glass rounded-[32px] p-7 sm:p-9 ${
                isWide ? 'lg:col-span-12' : 'lg:col-span-6'
              }`}
            >
              {/* Top glowing accent bar */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] opacity-90"
                style={{
                  background: isEmerald
                    ? 'linear-gradient(90deg, transparent, #00F5A0, #00D9F5, transparent)'
                    : 'linear-gradient(90deg, transparent, #E5B84B, #FDE68A, transparent)',
                }}
              />

              <div
                className={
                  isWide
                    ? 'grid grid-cols-1 items-center gap-8 lg:grid-cols-12'
                    : 'flex h-full flex-col justify-between'
                }
              >
                {/* Logo & Header block */}
                <div className={isWide ? 'lg:col-span-5' : ''}>
                  <div className="mb-6 flex items-center justify-between gap-4">
                    {/* Project Logo with holographic pedestal */}
                    <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-[#04070E] p-2.5 shadow-[0_14px_34px_rgba(0,0,0,0.75)] sm:h-24 sm:w-24">
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-35"
                        style={{
                          background: isEmerald
                            ? 'radial-gradient(circle at center, rgba(0,245,160,0.35), transparent 70%)'
                            : 'radial-gradient(circle at center, rgba(229,184,75,0.35), transparent 70%)',
                        }}
                      />
                      <img
                        src={project.logo}
                        alt={project.logoAlt}
                        width={96}
                        height={96}
                        loading="lazy"
                        decoding="async"
                        className="relative z-10 max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <span className="font-mono text-[10px] font-semibold tracking-widest text-slate-500">
                        PRJ // 0{index + 1}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider ${
                          isEmerald
                            ? 'border-[#00F5A0]/35 bg-[#00F5A0]/10 text-[#00F5A0]'
                            : 'border-[#E5B84B]/35 bg-[#E5B84B]/10 text-[#E5B84B]'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isEmerald ? 'bg-[#00F5A0] shadow-[0_0_8px_#00F5A0]' : 'bg-[#E5B84B] shadow-[0_0_8px_#E5B84B]'
                          }`}
                        />
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                    {project.title}
                  </h3>
                </div>

                {/* Description, Tags, and Conditional Live Link */}
                <div className={isWide ? 'lg:col-span-7' : 'mt-4 flex flex-1 flex-col justify-between'}>
                  <div>
                    <p className="text-base font-medium leading-relaxed text-slate-200 sm:text-lg">
                      {project.description}
                    </p>

                    {project.extraDetail && (
                      <p className="mt-3.5 rounded-2xl border border-white/10 bg-[#04070E]/85 px-4 py-3 text-sm font-medium leading-relaxed text-slate-300">
                        {project.extraDetail}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] pt-5">
                    <div className="flex flex-wrap gap-2" aria-label={`${project.title} features`}>
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[11px] font-medium text-slate-200 transition-colors group-hover:border-white/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Automatically appears only when project.url is filled in src/data/portfolio.ts */}
                    {hasLiveUrl && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[#00F5A0]/50 bg-[#00F5A0]/15 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#00F5A0] transition-all hover:bg-[#00F5A0] hover:text-[#020806]"
                      >
                        <span>Visit live project</span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M7 17L17 7M7 7h10v10" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
};
