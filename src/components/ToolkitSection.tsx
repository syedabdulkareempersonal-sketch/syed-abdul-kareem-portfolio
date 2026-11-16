import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const ToolkitSection: React.FC = () => {
  const { toolkit } = PORTFOLIO_DATA;

  return (
    <section
      id="toolkit"
      aria-label="AI Platforms and Technical Stack"
      className="border-b border-rule bg-bone"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-10 border-b border-rule">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-vermilion">
              07 / Daily Stack
            </p>
            <h2 className="mt-2 display-monument uppercase text-ink text-4xl sm:text-5xl lg:text-6xl">
              AI{' '}
              <span className="serif-editorial italic font-normal lowercase text-vermilion">
                toolkit
              </span>
            </h2>
          </div>
          <p className="font-mono text-xs text-ink-muted max-w-sm">
            4 AI platforms in daily rotation combined with standard web technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-10">
          {/* Left Panel: 4 AI Platforms */}
          <div className="lg:col-span-7">
            <h3 className="font-mono text-xs uppercase tracking-widest text-ink-muted mb-4">
              Core AI Platforms (Daily Use)
            </h3>
            <div className="divide-y divide-rule border-t border-b border-rule">
              {toolkit.aiPlatforms.map((platform, idx) => (
                <div
                  key={platform.name}
                  className="py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-vermilion">0{idx + 1}</span>
                    <span className="font-display font-bold text-lg sm:text-xl text-ink">
                      {platform.name}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm text-ink-muted sm:text-right">
                    {platform.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: Building with AI */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl border border-rule bg-bone-warm/60 space-y-6">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-vermilion">
                  What I Build with AI
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {toolkit.buildingWithAi.whatIMake.map((item) => (
                    <span
                      key={item}
                      className="px-3.5 py-1.5 rounded-full bg-ink text-bone font-mono text-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-rule">
                <h3 className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                  Web & App Technologies
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {toolkit.buildingWithAi.techUsed.map((tech) => (
                    <span
                      key={tech}
                      className="px-3.5 py-1.5 rounded-full bg-bone border border-rule text-ink font-mono text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-rule">
                <h3 className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                  Creative & CMS
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {toolkit.buildingWithAi.creativeAndCms.map((tool) => (
                    <span
                      key={tool}
                      className="px-3.5 py-1.5 rounded-full bg-bone border border-rule text-ink font-mono text-xs"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
