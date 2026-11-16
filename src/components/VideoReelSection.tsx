import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SpotlightCard } from './SpotlightCard';

export const VideoReelSection: React.FC = () => {
  const sectionRef = useScrollReveal<HTMLElement>(90);
  const { videoReel } = PORTFOLIO_DATA;

  return (
    <section
      id="videos"
      ref={sectionRef}
      className="relative z-10 mx-auto max-w-[1280px] px-4 py-16 sm:px-8 sm:py-24"
    >
      <SpotlightCard
        maxTilt={2}
        glowColor="rgba(0, 245, 160, 0.14)"
        className="reveal-up cyber-glass relative overflow-hidden rounded-[36px] border border-[#00F5A0]/30 p-7 sm:p-12 lg:p-14"
      >
        {/* Top laser accent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F5A0] to-transparent opacity-90"
        />

        {/* Ambient background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#00F5A0]/12 blur-[110px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#E5B84B]/12 blur-[110px]"
        />

        <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Left copy */}
          <div className="lg:col-span-7">
            <div className="section-pill mb-4">
              <span className="section-pill-dot" aria-hidden="true" />
              <span>[05] // AI VIDEO PRODUCTION · DEMO REEL</span>
            </div>

            <h2 className="section-h2 mb-5">
              Motion & video <span className="serif-italic font-normal text-neon-emerald">crafted</span> with AI.
            </h2>

            <p className="mb-8 max-w-[540px] text-base font-medium leading-relaxed text-slate-300 sm:text-lg">
              {videoReel.description} Watch the vertical short directly inside the holographic player or open it on
              YouTube Shorts.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={videoReel.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Watch on YouTube Shorts</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-slate-300">
                <span className="h-2 w-2 rounded-full bg-[#E5B84B] shadow-[0_0_8px_#E5B84B]" />
                {videoReel.format}
              </span>
            </div>
          </div>

          {/* Right 9:16 Vertical Holographic Video Frame */}
          <div className="mx-auto flex w-full max-w-[310px] flex-col items-center lg:col-span-5">
            <div className="relative w-full overflow-hidden rounded-[32px] border border-[#00F5A0]/45 bg-[#030509] p-2.5 shadow-[0_28px_70px_rgba(0,0,0,0.9),0_0_45px_rgba(0,245,160,0.2)]">
              {/* Top speaker/camera notch bar */}
              <div className="mb-2 flex items-center justify-between px-3 pt-1">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#00F5A0]">
                  REC // AI SHORT · 9:16
                </span>
                <span className="h-2 w-2 rounded-full bg-[#00F5A0] shadow-[0_0_8px_#00F5A0]" />
              </div>

              <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[22px] bg-[#060A14]">
                <iframe
                  src={videoReel.embedUrl}
                  title={videoReel.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </section>
  );
};
