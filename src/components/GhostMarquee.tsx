import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const GhostMarquee: React.FC = () => {
  const repeatedItems = Array.from({ length: 4 }, (_, i) => i);

  return (
    <div
      aria-hidden="true"
      className="relative z-10 w-full overflow-hidden border-y border-white/[0.07] bg-[#04070E]/60 py-6 backdrop-blur-md select-none sm:py-8"
    >
      <div className="marquee-track flex items-center">
        {repeatedItems.map((idx) => (
          <div key={idx} className="flex shrink-0 items-center">
            <span className="px-4 font-display text-[clamp(2.8rem,7vw,6.4rem)] font-extrabold leading-none tracking-[-0.04em] text-white/[0.05]">
              Built with <span className="serif-italic font-normal text-[#00F5A0]/25">AI</span> — Apps · Websites ·
              Videos · Marketing — <span className="text-[#E5B84B]/20">{PORTFOLIO_DATA.hero.positioningLine}</span> —
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
