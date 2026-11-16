import React from 'react';
import { PORTFOLIO_DATA, ServiceItem } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SpotlightCard } from './SpotlightCard';

export const ServicesSection: React.FC = () => {
  const sectionRef = useScrollReveal<HTMLElement>(90);

  const renderIcon = (icon: ServiceItem['icon']) => {
    switch (icon) {
      case 'app':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="5" y="2" width="14" height="20" rx="3" />
            <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
        );
      case 'web':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2.5" />
            <line x1="8" y1="21" x2="16" y2="21" strokeLinecap="round" />
            <line x1="12" y1="17" x2="12" y2="21" strokeLinecap="round" />
          </svg>
        );
      case 'video':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="23 7 16 12 23 17 23 7" strokeLinejoin="round" />
            <rect x="1" y="5" width="15" height="14" rx="2.5" />
          </svg>
        );
      case 'marketing':
      default:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              strokeLinejoin="round"
            />
          </svg>
        );
    }
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative z-10 mx-auto max-w-[1280px] px-4 py-16 sm:px-8 sm:py-20"
    >
      <div className="reveal-up mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="section-pill mb-4">
            <span className="section-pill-dot" aria-hidden="true" />
            <span>[04] // CAPABILITIES · WHAT I OFFER</span>
          </div>
          <h2 className="section-h2">
            What I <span className="serif-italic font-normal text-neon-gold">build</span> for you.
          </h2>
        </div>
        <p className="max-w-[420px] text-base font-medium leading-relaxed text-slate-300">
          End-to-end execution across apps, websites, AI video, and brand content.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PORTFOLIO_DATA.services.map((service) => {
          const isEmerald = service.accent === 'emerald';
          return (
            <SpotlightCard
              key={service.id}
              glowColor={isEmerald ? 'rgba(0, 245, 160, 0.16)' : 'rgba(229, 184, 75, 0.16)'}
              className={`reveal-up rounded-[28px] p-7 ${
                isEmerald ? 'cyber-glass-emerald' : 'cyber-glass-gold'
              }`}
            >
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${
                        isEmerald
                          ? 'border-[#00F5A0]/40 bg-[#00F5A0]/12 text-[#00F5A0]'
                          : 'border-[#E5B84B]/40 bg-[#E5B84B]/12 text-[#E5B84B]'
                      }`}
                    >
                      {renderIcon(service.icon)}
                    </div>
                    <span
                      className={`font-mono text-xs font-semibold tracking-widest ${
                        isEmerald ? 'text-[#00F5A0]' : 'text-[#E5B84B]'
                      }`}
                    >
                      SVC // {service.number}
                    </span>
                  </div>

                  <h3 className="mb-3 font-display text-xl font-extrabold tracking-tight text-white">
                    {service.title}
                  </h3>
                  <p className="text-sm font-medium leading-relaxed text-slate-300 sm:text-base">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-white/[0.08] pt-4">
                  <a
                    href="#contact"
                    className={`inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider transition-colors ${
                      isEmerald ? 'text-[#00F5A0] hover:text-white' : 'text-[#E5B84B] hover:text-white'
                    }`}
                  >
                    <span>Start a project</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
};
