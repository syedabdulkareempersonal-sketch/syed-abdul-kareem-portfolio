import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const GhostMarquee: React.FC = () => {
  const repeatedItems = Array.from({ length: 4 }, (_, i) => i);

  return (
    <div
      aria-hidden="true"
      className="relative w-full overflow-hidden border-y border-white/10 bg-[#060B17]/80 py-6 select-none sm:py-9"
    >
      <div className="marquee-track flex items-center">
        {repeatedItems.map((idx) => (
          <div key={idx} className="flex shrink-0 items-center">
            <span className="px-4 font-display text-[clamp(3.2rem,8vw,7.4rem)] font-extrabold leading-none tracking-[-0.04em] text-white/[0.06]">
              Built with <span className="serif-italic font-normal text-[#14F195]/25">AI</span> — Apps · Websites ·
              Videos · Marketing — <span className="text-[#F5C451]/20">{PORTFOLIO_DATA.hero.positioningLine}</span> —
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
