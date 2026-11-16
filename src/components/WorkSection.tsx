import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const WorkSection: React.FC = () => {
  const sectionRef = useScrollReveal<HTMLElement>(100);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="mx-auto max-w-[1280px] px-4 py-16 sm:px-8 sm:py-24"
    >
      {/* Section Header */}
      <div className="reveal-up mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="section-pill mb-4">
            <span className="section-pill-dot" aria-hidden="true" />
            <span>SELECTED WORK // SHIPPED PRODUCTS</span>
          </div>
          <h2 className="section-h2">
            Products <span className="serif-italic font-normal text-[#14F195]">shipped</span> with AI.
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

          return (
            <article
              key={project.id}
              style={{ transform: `rotate(${project.tilt})` }}
              className={`reveal-up work-card cyber-glass group relative flex flex-col justify-between overflow-hidden rounded-[32px] p-7 sm:p-9 ${
                isWide ? 'lg:col-span-12' : index === 1 ? 'lg:col-span-6' : 'lg:col-span-6'
              }`}
            >
              {/* Top glowing accent bar */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-1.5 opacity-90"
                style={{
                  background:
                    project.accentColor === '#10A37F'
                      ? 'linear-gradient(90deg, #14F195, #10A37F, transparent)'
                      : 'linear-gradient(90deg, #F5C451, #C9A227, transparent)',
                }}
              />

              {/* Ambient glow orb on hover */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#14F195]/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
              />

              <div className={isWide ? 'grid grid-cols-1 items-center gap-8 lg:grid-cols-12' : 'flex flex-col h-full justify-between'}>
                {/* Logo & Header block */}
                <div className={isWide ? 'lg:col-span-5' : ''}>
                  <div className="mb-6 flex items-center justify-between gap-4">
                    {/* Project Logo on Top */}
                    <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-[#050914] p-2.5 shadow-[0_12px_30px_rgba(0,0,0,0.6)] sm:h-24 sm:w-24">
                      <img
                        src={project.logo}
                        alt={project.logoAlt}
                        width={96}
                        height={96}
                        loading="lazy"
                        decoding="async"
                        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#14F195]/30 bg-[#14F195]/10 px-3.5 py-1.5 font-display text-xs font-extrabold uppercase tracking-wider text-[#14F195]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#14F195]" />
                      {project.category}
                    </span>
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
                      <p className="mt-3 rounded-2xl border border-white/10 bg-[#060B17]/80 px-4 py-3 text-sm font-semibold leading-relaxed text-slate-300">
                        {project.extraDetail}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2" aria-label={`${project.title} features`}>
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/12 bg-white/[0.05] px-3.5 py-1.5 font-display text-xs font-bold text-slate-200"
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
                        className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#14F195]/50 bg-[#14F195]/15 px-4 py-2 font-display text-xs font-extrabold uppercase tracking-wider text-[#14F195] transition-all hover:bg-[#14F195] hover:text-[#041019]"
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
            </article>
          );
        })}
      </div>
    </section>
  );
};
