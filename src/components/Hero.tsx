import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const monolithRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !heroRef.current) return;

    const ctx = gsap.context(() => {
      const words = heroRef.current?.querySelectorAll('.hero-word');
      const metaItems = heroRef.current?.querySelectorAll('.hero-meta');
      const archFrame = heroRef.current?.querySelector('.hero-arch-wrap');
      const floatingBadges = heroRef.current?.querySelectorAll('.hero-float-badge');

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      if (words && words.length > 0) {
        tl.fromTo(
          words,
          { y: 38, opacity: 0, rotateX: -20 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.7, stagger: 0.055 },
          0.05
        );
      }

      if (metaItems && metaItems.length > 0) {
        tl.fromTo(
          metaItems,
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.58, stagger: 0.08 },
          0.26
        );
      }

      if (archFrame) {
        tl.fromTo(
          archFrame,
          { y: 30, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.78 },
          0.32
        );
      }

      if (floatingBadges && floatingBadges.length > 0) {
        tl.fromTo(
          floatingBadges,
          { y: 18, opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, duration: 0.55, stagger: 0.1 },
          0.5
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleMonolithMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!monolithRef.current || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const rect = monolithRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / Math.max(rect.width, 1) - 0.5;
    const ny = (e.clientY - rect.top) / Math.max(rect.height, 1) - 0.5;
    setTilt({ rx: -ny * 12, ry: nx * 14 });
  };

  const resetMonolithTilt = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative mx-auto max-w-[1280px] px-4 pb-12 pt-8 sm:px-8 sm:pt-14 lg:pb-20 lg:pt-16"
    >
      <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Left Column: Telemetry + Kinetic Headline + Positioning + CTAs */}
        <div className="lg:col-span-7">
          <div className="hero-meta mb-6 flex flex-wrap items-center gap-2.5">
            <div className="section-pill">
              <span className="section-pill-dot" aria-hidden="true" />
              <span>[01] {PORTFOLIO_DATA.owner.badge}</span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E5B84B]/40 bg-[#E5B84B]/10 px-3.5 py-1.5 font-mono text-[11px] font-bold tracking-wider text-[#FDE68A] backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E5B84B]" />
              {PORTFOLIO_DATA.hero.positioningLine}
            </span>
          </div>

          <h1 className="hero-h1 mb-6 [perspective:900px]">
            <span className="hero-word inline-block">I</span>{' '}
            <span className="hero-word inline-block">build</span>{' '}
            <span className="hero-word serif-italic text-neon-gold inline-block font-normal">real</span>{' '}
            <span className="hero-word inline-block">products</span>{' '}
            <span className="hero-word inline-block">with</span>{' '}
            <span className="hero-word text-neon-emerald inline-block">AI.</span>
          </h1>

          <p className="hero-meta mb-8 max-w-[600px] text-base font-medium leading-relaxed text-slate-300 sm:text-lg md:text-xl">
            <strong className="font-bold text-white">{PORTFOLIO_DATA.hero.positioningLine}</strong>{' '}
            {PORTFOLIO_DATA.hero.subline}
          </p>

          <div className="hero-meta flex flex-wrap items-center gap-3.5 sm:gap-4">
            <a href={PORTFOLIO_DATA.hero.primaryCta.href} className="btn-primary">
              <span>{PORTFOLIO_DATA.hero.primaryCta.label}</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>

            <a href={PORTFOLIO_DATA.hero.secondaryCta.href} className="btn-secondary">
              <span>{PORTFOLIO_DATA.hero.secondaryCta.label}</span>
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          </div>

          {/* Spatial Telemetry Strip */}
          <div className="hero-meta cyber-glass mt-9 grid max-w-[560px] grid-cols-3 gap-2 rounded-2xl p-3.5">
            <div className="px-2">
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                DAILY AI USE
              </div>
              <div className="mt-0.5 font-display text-sm font-extrabold text-[#00F5A0] sm:text-base">
                Since 2022
              </div>
            </div>
            <div className="border-x border-white/10 px-3">
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                HANDS-ON TIME
              </div>
              <div className="mt-0.5 font-display text-sm font-extrabold text-white sm:text-base">
                8,000+ hrs (est.)
              </div>
            </div>
            <div className="px-2">
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                SHIPPED
              </div>
              <div className="mt-0.5 font-display text-sm font-extrabold text-[#FDE68A] sm:text-base">
                4 Products
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Interactive Parallax Hologram Portrait Monolith */}
        <div className="relative mx-auto flex w-full max-w-[410px] items-center justify-center lg:col-span-5 lg:max-w-none">
          <div
            ref={monolithRef}
            onPointerMove={handleMonolithMove}
            onPointerLeave={resetMonolithTilt}
            style={{
              transform: `perspective(1200px) rotateX(${tilt.rx.toFixed(2)}deg) rotateY(${tilt.ry.toFixed(2)}deg)`,
              transformStyle: 'preserve-3d',
            }}
            className="relative flex w-full max-w-[360px] items-center justify-center transition-transform duration-200 ease-out sm:max-w-[385px]"
          >
            {/* Glowing Orbital Halo */}
            <div
              aria-hidden="true"
              className="pulse-aura pointer-events-none absolute -inset-4 rounded-[9999px_9999px_40px_40px] border border-[#00F5A0]/25 bg-gradient-to-b from-[#00F5A0]/15 via-[#00D9F5]/5 to-[#E5B84B]/12 blur-md"
            />

            {/* Arch Portrait Monolith */}
            <div className="hero-arch-wrap arch-portrait relative w-full">
              {/* Animated Holographic Scanline */}
              <div
                aria-hidden="true"
                className="holo-scanline pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-transparent via-[#00F5A0]/12 to-transparent"
              />

              {/* Top Monolith Coordinate Bar */}
              <div className="pointer-events-none absolute inset-x-0 top-4 z-10 flex justify-center">
                <span className="rounded-full border border-white/15 bg-[#030508]/75 px-3 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-[0.2em] text-[#00F5A0] backdrop-blur-md">
                  KADAPA · IN // AI BUILDER
                </span>
              </div>

              <img
                src={PORTFOLIO_DATA.owner.portraitArch}
                alt={PORTFOLIO_DATA.owner.portraitAlt}
                width={780}
                height={960}
                fetchPriority="high"
                decoding="async"
                className="block h-auto w-full object-cover object-top"
              />

              {/* Bottom Obsidian Vignette */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#030508] via-[#030508]/45 to-transparent"
              />
            </div>

            {/* 3D Floating "Available for work" Pill (translateZ depth layer) */}
            <div
              style={{ transform: 'translateZ(36px)' }}
              className="hero-float-badge absolute -left-3 bottom-7 z-20 flex items-center gap-2.5 rounded-full border border-[#00F5A0]/45 bg-[#050914]/90 px-4 py-2.5 shadow-[0_18px_40px_rgba(0,0,0,0.85)] backdrop-blur-xl sm:-left-6 sm:bottom-9"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00F5A0] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#00F5A0] shadow-[0_0_10px_#00F5A0]" />
              </span>
              <span className="font-display text-xs font-extrabold tracking-tight text-white sm:text-sm">
                {PORTFOLIO_DATA.owner.availableText}
              </span>
            </div>

            {/* 3D Floating Rotating Circular Text Badge */}
            <div
              style={{ transform: 'translateZ(44px)' }}
              className="hero-float-badge absolute -right-2 -top-5 z-20 flex h-28 w-28 items-center justify-center rounded-full border border-white/15 bg-[#050914]/90 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:-right-5 sm:-top-6 sm:h-32 sm:w-32"
              aria-label="Apps, Websites, Videos, Marketing"
            >
              <svg viewBox="0 0 120 120" className="spin-badge h-full w-full p-1.5" aria-hidden="true">
                <defs>
                  <path
                    id="hero-badge-circle"
                    d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
                  />
                </defs>
                <text
                  fill="#F8FAFC"
                  fontSize="9.3"
                  fontWeight="800"
                  fontFamily="Plus Jakarta Sans, sans-serif"
                  letterSpacing="2.25px"
                >
                  <textPath href="#hero-badge-circle" startOffset="0%">
                    APPS · WEBSITES · VIDEOS · MARKETING ·
                  </textPath>
                </text>
              </svg>
              <div className="absolute flex h-8 w-8 items-center justify-center rounded-full border border-[#00F5A0]/40 bg-[#00F5A0]/15">
                <span className="h-3 w-3 rounded-full bg-[#00F5A0] shadow-[0_0_14px_#00F5A0]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
