import React, { useState } from 'react';
import { PORTFOLIO_DATA, ProjectItem } from '../data/portfolio';

export const WorkSection: React.FC = () => {
  const { projects } = PORTFOLIO_DATA;
  const [activeProject, setActiveProject] = useState<ProjectItem>(projects[0]);

  return (
    <section
      id="work"
      aria-label="Selected Work"
      className="border-b border-rule bg-bone"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-24">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-rule">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-vermilion">
              02 / Selected Works (2022 – 2026)
            </p>
            <h2 className="mt-2 display-monument uppercase text-ink text-4xl sm:text-6xl lg:text-7xl">
              Shipped{' '}
              <span className="serif-editorial italic font-normal lowercase text-vermilion">
                products
              </span>
            </h2>
          </div>
          <p className="font-mono text-xs text-ink-muted max-w-sm">
            Four products architected, designed, and built end to end with AI. Select or hover any entry to inspect the build dossier.
          </p>
        </div>

        {/* Signature Split Stage: Sticky Visual Dossier + Interactive Editorial Index */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pt-10 items-start">
          {/* Left Sticky Stage (5 cols on desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-ink/15 bg-bone-warm p-6 sm:p-8 transition-all duration-500">
              <div className="flex items-center justify-between border-b border-rule pb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                  Dossier // {activeProject.id.toUpperCase()}
                </span>
                <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-ink text-bone">
                  {activeProject.category}
                </span>
              </div>

              {/* Project Logo Stage */}
              <div className="my-6 aspect-[16/10] rounded-xl bg-bone border border-rule flex items-center justify-center p-6 overflow-hidden">
                <img
                  key={activeProject.id}
                  src={activeProject.logo}
                  alt={activeProject.logoAlt}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain transition-transform duration-500 ease-expo-out scale-100 hover:scale-105"
                />
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-ink">
                {activeProject.title}
              </h3>

              <p className="mt-3 text-sm sm:text-base text-ink-2 leading-relaxed">
                {activeProject.description}
              </p>

              {activeProject.extraDetail && (
                <p className="mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {activeProject.extraDetail}
                </p>
              )}

              {/* Capability Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {activeProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] px-3 py-1 rounded-full bg-bone border border-rule text-ink-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Conditional Live URL Button — Only renders when url is non-empty */}
              {activeProject.url && activeProject.url.trim() !== '' && (
                <div className="mt-6 pt-5 border-t border-rule">
                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`work-dossier-visit-${activeProject.id}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-vermilion text-bone font-mono text-xs uppercase tracking-wider hover:bg-ink transition-colors"
                  >
                    <span>Visit live project</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right: Numbered Editorial Monograph List (7 cols on desktop) */}
          <div className="lg:col-span-7 divide-y divide-rule border-t border-b border-rule">
            {projects.map((project, index) => {
              const isSelected = activeProject.id === project.id;
              const hasLiveUrl = Boolean(project.url && project.url.trim() !== '');

              return (
                <article
                  key={project.id}
                  onMouseEnter={() => setActiveProject(project)}
                  onFocus={() => setActiveProject(project)}
                  onClick={() => setActiveProject(project)}
                  tabIndex={0}
                  id={`work-item-${project.id}`}
                  aria-label={`${project.title} — ${project.category}`}
                  className={`group cursor-pointer py-8 sm:py-10 px-4 sm:px-6 transition-colors duration-300 ${
                    isSelected ? 'bg-bone-warm/80' : 'hover:bg-bone-warm/40'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <div className="flex items-baseline gap-4">
                      <span
                        className={`font-mono text-xs transition-colors ${
                          isSelected ? 'text-vermilion font-semibold' : 'text-ink-faint'
                        }`}
                      >
                        0{index + 1}
                      </span>
                      <h3 className="font-display font-bold text-2xl sm:text-4xl text-ink group-hover:text-vermilion transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                      {project.category}
                    </span>
                  </div>

                  <div className="mt-4 pl-0 sm:pl-8 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    <div className="sm:col-span-9 space-y-2">
                      <p className="text-sm sm:text-base text-ink-2 leading-relaxed">
                        {project.description}
                      </p>
                      {project.extraDetail && (
                        <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                          {project.extraDetail}
                        </p>
                      )}
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded bg-bone border border-rule text-ink-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="sm:col-span-3 flex sm:justify-end items-center gap-3">
                      <img
                        src={project.logo}
                        alt={project.logoAlt}
                        loading="lazy"
                        className="w-14 h-14 rounded-xl object-contain bg-bone border border-rule p-1.5"
                      />
                    </div>
                  </div>

                  {/* Automatic Live Link Button when project.url is populated in data */}
                  {hasLiveUrl && (
                    <div className="mt-5 pl-0 sm:pl-8">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        id={`work-card-visit-${project.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink text-bone font-mono text-xs uppercase tracking-wider hover:bg-vermilion transition-colors"
                      >
                        <span>Visit live project</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
