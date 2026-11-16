import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const VideoReelSection: React.FC = () => {
  const { videoReel } = PORTFOLIO_DATA;

  return (
    <section
      id="videos"
      aria-label="AI Video Production Reel"
      className="border-b border-rule bg-bone-warm/50"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Narrative Column */}
          <div className="lg:col-span-6 space-y-5">
            <p className="font-mono text-xs uppercase tracking-widest text-vermilion">
              04 / Generative Motion
            </p>
            <h2 className="display-monument uppercase text-ink text-4xl sm:text-5xl lg:text-6xl">
              AI Video{' '}
              <span className="serif-editorial italic font-normal lowercase text-vermilion">
                production
              </span>
            </h2>
            <p className="text-base sm:text-lg text-ink-2 leading-relaxed max-w-xl">
              {videoReel.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <span className="font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-bone border border-rule text-ink-2">
                {videoReel.format}
              </span>
              <a
                href={videoReel.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="video-watch-youtube"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-bone font-mono text-xs uppercase tracking-wider hover:bg-vermilion transition-colors"
              >
                <span>Watch on YouTube</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          {/* Right Vertical 9:16 Cinema Frame */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-[320px] sm:max-w-[340px] rounded-2xl border border-ink/15 bg-bone p-3 shadow-sm">
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-rule font-mono text-[11px] text-ink-muted">
                <span>REEL // 01</span>
                <span>9:16 SHORT</span>
              </div>
              <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-ink">
                <iframe
                  src={videoReel.embedUrl}
                  title={videoReel.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
