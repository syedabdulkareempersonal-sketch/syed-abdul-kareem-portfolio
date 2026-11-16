import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const ServicesSection: React.FC = () => {
  const { services } = PORTFOLIO_DATA;

  return (
    <section
      id="services"
      aria-label="Services"
      className="border-b border-rule bg-bone"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column Header */}
          <div className="lg:col-span-4">
            <p className="font-mono text-xs uppercase tracking-widest text-vermilion">
              03 / Capabilities
            </p>
            <h2 className="mt-2 display-monument uppercase text-ink text-4xl sm:text-5xl">
              What I{' '}
              <span className="serif-editorial italic font-normal lowercase text-vermilion">
                deliver
              </span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-ink-muted leading-relaxed">
              End-to-end execution across product engineering, web design, generative video, and brand content.
            </p>
          </div>

          {/* Right Column: 4 Architectural Service Rows */}
          <div className="lg:col-span-8 divide-y divide-rule border-t border-b border-rule">
            {services.map((service) => (
              <div
                key={service.id}
                className="py-7 sm:py-9 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 group"
              >
                <div className="flex items-baseline gap-5">
                  <span className="font-mono text-xs text-vermilion font-medium">
                    /{service.number}
                  </span>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-ink group-hover:text-vermilion transition-colors">
                    {service.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-ink-2 sm:max-w-md sm:text-right leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
