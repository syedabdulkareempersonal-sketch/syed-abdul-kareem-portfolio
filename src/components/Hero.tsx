import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { HeroScene3D } from './HeroScene3D';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement | null>(null);

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
          { y: 34, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, stagger: 0.055 },
          0.05
        );
      }

      if (metaItems && metaItems.length > 0) {
        tl.fromTo(
          metaItems,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.08 },
          0.26
        );
      }

      if (archFrame) {
        tl.fromTo(
          archFrame,
          { y: 28, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.72 },
          0.34
        );
      }

      if (floatingBadges && floatingBadges.length > 0) {
        tl.fromTo(
          floatingBadges,
          { y: 16, opacity: 0, scale: 0.94 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1 },
          0.52
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative mx-auto max-w-[1280px] overflow-hidden px-4 pb-10 pt-8 sm:px-8 sm:pt-14 lg:pb-16 lg:pt-16"
    >
      {/* Interactive WebGL 3D Neural Core & Particle Field */}
      <HeroScene3D />

      {/* Ambient Neon Glow Spheres */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-8 h-80 w-80 rounded-full bg-[#14F195]/15 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-6 h-80 w-80 rounded-full bg-[#F5C451]/12 blur-[110px]"
      />

      <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Left Column: Badge + Headline + Positioning + Sub-line + Buttons */}
        <div className="lg:col-span-7">
          <div className="hero-meta mb-5 flex flex-wrap items-center gap-2.5">
            <div className="section-pill">
              <span className="section-pill-dot" aria-hidden="true" />
              <span>{PORTFOLIO_DATA.owner.badge}</span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#F5C451]/40 bg-[#C9A227]/15 px-3.5 py-1.5 font-display text-xs font-extrabold tracking-wide text-[#F5C451]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {PORTFOLIO_DATA.hero.positioningLine}
            </span>
          </div>

          <h1 className="hero-h1 mb-6">
            <span className="hero-word inline-block">I</span>{' '}
            <span className="hero-word inline-block">build</span>{' '}
            <span className="hero-word serif-italic inline-block font-normal text-[#F5C451]">real</span>{' '}
            <span className="hero-word inline-block">products</span>{' '}
            <span className="hero-word inline-block">with</span>{' '}
            <span className="hero-word text-neon-emerald inline-block">AI.</span>
          </h1>

          <p className="hero-meta mb-8 max-w-[610px] text-base font-medium leading-relaxed text-slate-300 sm:text-lg md:text-xl">
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

          {/* Futuristic HUD Telemetry Strip */}
          <div className="hero-meta mt-8 grid max-w-[560px] grid-cols-3 gap-2.5 rounded-2xl border border-white/10 bg-[#091022]/80 p-3 backdrop-blur-md">
            <div className="px-2">
              <div className="font-display text-[11px] font-bold uppercase tracking-wider text-slate-400">
                DAILY AI USE
              </div>
              <div className="font-display text-sm font-extrabold text-[#14F195] sm:text-base">Since 2022</div>
            </div>
            <div className="border-x border-white/10 px-3">
              <div className="font-display text-[11px] font-bold uppercase tracking-wider text-slate-400">
                HANDS-ON TIME
              </div>
              <div className="font-display text-sm font-extrabold text-white sm:text-base">8,000+ hrs (est.)</div>
            </div>
            <div className="px-2">
              <div className="font-display text-[11px] font-bold uppercase tracking-wider text-slate-400">
                PRODUCTS
              </div>
              <div className="font-display text-sm font-extrabold text-[#F5C451] sm:text-base">4 Shipped</div>
            </div>
          </div>
        </div>

        {/* Right Column: Holographic Arch Portrait + Available Pill + Rotating Circular Text Badge */}
        <div className="relative mx-auto flex w-full max-w-[420px] items-center justify-center lg:col-span-5 lg:max-w-none">
          {/* Glowing Orbital Backdrop Ring */}
          <div
            aria-hidden="true"
            className="pulse-aura pointer-events-none absolute -inset-4 rounded-[9999px_9999px_44px_44px] border border-[#14F195]/25 bg-gradient-to-b from-[#14F195]/15 via-transparent to-[#F5C451]/10 blur-sm"
          />

          {/* Arch Portrait Wrapper */}
          <div className="hero-arch-wrap arch-portrait relative w-full max-w-[360px] sm:max-w-[390px]">
            {/* Top HUD telemetry tag inside arch */}
            <div className="pointer-events-none absolute inset-x-0 top-4 z-10 flex justify-center">
              <span className="rounded-full border border-white/15 bg-[#050811]/70 px-3 py-0.5 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-[#14F195] backdrop-blur-md">
                SYS.AI // SYED ABDUL KAREEM
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

            {/* Subtle bottom gradient vignette */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050811]/90 via-[#050811]/30 to-transparent"
            />
          </div>

          {/* Floating "Available for work" pill with glowing green dot */}
          <div className="hero-float-badge absolute -left-2 bottom-7 z-20 flex items-center gap-2.5 rounded-full border border-[#14F195]/45 bg-[#070E1F]/95 px-4 py-2.5 shadow-[0_14px_34px_rgba(0,0,0,0.75)] backdrop-blur-xl sm:-left-6 sm:bottom-9">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#14F195] opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[#14F195] shadow-[0_0_10px_#14F195]" />
            </span>
            <span className="font-display text-xs font-extrabold tracking-tight text-white sm:text-sm">
              {PORTFOLIO_DATA.owner.availableText}
            </span>
          </div>

          {/* Rotating Circular Text Badge overlapping corner */}
          <div
            className="hero-float-badge absolute -right-2 -top-5 z-20 flex h-28 w-28 items-center justify-center rounded-full border border-[#14F195]/40 bg-[#070E1F]/95 shadow-[0_18px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:-right-5 sm:-top-6 sm:h-32 sm:w-32"
            aria-label="Apps, Websites, Videos, Marketing"
          >
            <svg
              viewBox="0 0 120 120"
              className="spin-badge h-full w-full p-1.5"
              aria-hidden="true"
            >
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
            {/* Center Emerald Neon Core */}
            <div className="absolute flex h-8 w-8 items-center justify-center rounded-full bg-[#14F195]/20">
              <span className="h-3.5 w-3.5 rounded-full bg-[#14F195] shadow-[0_0_14px_#14F195]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
