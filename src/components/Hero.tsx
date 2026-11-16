import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_DATA } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const { owner, hero } = PORTFOLIO_DATA;
  const sectionRef = useRef<HTMLElement>(null);
  const portraitWrapRef = useRef<HTMLDivElement>(null);
  const portraitImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Masked line reveal for hero typography
      gsap.fromTo(
        '.hero-line-inner',
        { yPercent: 108, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.05,
          stagger: 0.08,
          ease: 'power4.out',
          delay: 0.1,
        }
      );

      // Portrait slit curtain reveal
      gsap.fromTo(
        portraitWrapRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.25,
          ease: 'power4.inOut',
          delay: 0.2,
        }
      );

      gsap.fromTo(
        portraitImgRef.current,
        { scale: 1.18 },
        {
          scale: 1,
          duration: 1.45,
          ease: 'power3.out',
          delay: 0.2,
        }
      );

      // Subtle scroll parallax on the portrait column
      if (portraitImgRef.current && sectionRef.current) {
        gsap.to(portraitImgRef.current, {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-label="Introduction"
      className="relative border-b border-rule overflow-hidden"
    >
      {/* Top 4-column Swiss Metadata Bar */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 border-b border-rule">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-rule text-xs font-mono">
          <div className="py-3.5 pr-4 flex items-center justify-between">
            <span className="text-ink-faint uppercase">Role</span>
            <span className="text-ink font-medium">AI Builder</span>
          </div>
          <div className="py-3.5 sm:px-4 flex items-center justify-between">
            <span className="text-ink-faint uppercase">Base</span>
            <span className="text-ink font-medium">Kadapa, India</span>
          </div>
          <div className="py-3.5 sm:px-4 flex items-center justify-between">
            <span className="text-ink-faint uppercase">Track Record</span>
            <span className="text-ink font-medium">{owner.positioningLine}</span>
          </div>
          <div className="py-3.5 sm:pl-4 flex items-center justify-between">
            <span className="text-ink-faint uppercase">Daily Practice</span>
            <span className="text-vermilion font-medium">Since Nov 2022 · 8,000+ hrs (est.)</span>
          </div>
        </div>
      </div>

      {/* Main Monumental Editorial Stage */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 lg:pb-20">
        {/* Giant Monumental Name with Architectural Portrait Slit */}
        <div className="relative">
          <h1 className="sr-only">
            {owner.fullName} — {hero.headlinePrefix} {hero.headlineItalic} {hero.headlineMiddle}{' '}
            {hero.headlineAccent} {owner.positioningLine}
          </h1>

          <div
            aria-hidden="true"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end"
          >
            {/* Left / Center Monumental Display Typography */}
            <div className="lg:col-span-8 xl:col-span-9">
              <div className="line-mask">
                <span className="hero-line-inner display-monument uppercase text-ink text-[clamp(3.1rem,9.2vw,8.6rem)]">
                  SYED ABDUL
                </span>
              </div>
              <div className="line-mask mt-1 sm:mt-2 flex flex-wrap items-baseline gap-x-4 sm:gap-x-6">
                <span className="hero-line-inner display-monument uppercase text-ink text-[clamp(3.1rem,9.2vw,8.6rem)]">
                  KAREEM
                </span>
                <span className="hero-line-inner font-mono text-xs sm:text-sm uppercase tracking-widest px-3 py-1 rounded-full border border-ink/25 text-ink-2">
                  (2022 → 2026)
                </span>
              </div>

              {/* Editorial Serif Positioning Headline */}
              <div className="line-mask mt-4 sm:mt-6">
                <p className="hero-line-inner serif-editorial text-ink text-[clamp(2.2rem,5.4vw,5.1rem)]">
                  {hero.headlinePrefix}{' '}
                  <em className="italic text-vermilion underline decoration-vermilion/30 decoration-1 underline-offset-8">
                    {hero.headlineItalic}
                  </em>{' '}
                  {hero.headlineMiddle}{' '}
                  <span className="font-display font-extrabold tracking-tight text-ink">
                    {hero.headlineAccent}
                  </span>
                </p>
              </div>
            </div>

            {/* Right: Architectural Portrait Window + Rotating Circular Seal */}
            <div className="lg:col-span-4 xl:col-span-3 flex justify-start lg:justify-end">
              <div className="relative w-full max-w-[300px] sm:max-w-[320px]">
                {/* Rotating Circular Text Badge overlapping corner */}
                <div
                  aria-hidden="true"
                  className=" -top-6 -left-6 z-20 w-24 h-24 rounded-full bg-bone border border-rule flex items-center justify-center shadow-sm hidden sm:flex"
                >
                  <svg viewBox="0 0 100 100" className="w-20 h-20 animate-seal">
                    <defs>
                      <path
                        id="sealPath"
                        d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                      />
                    </defs>
                    <text className="fill-ink font-mono text-[8.3px] uppercase tracking-[0.19em]">
                      <textPath href="#sealPath">{owner.rotatingBadgeText}</textPath>
                    </text>
                  </svg>
                  <span className="absolute w-2.5 h-2.5 rounded-full bg-vermilion" />
                </div>

                {/* Portrait Frame */}
                <div
                  ref={portraitWrapRef}
                  className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[140px] rounded-b-2xl border border-ink/15 bg-bone-warm"
                >
                  <img
                    ref={portraitImgRef}
                    src={owner.portraitArch}
                    alt={owner.portraitAlt}
                    width={640}
                    height={800}
                    fetchPriority="high"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent flex items-center justify-between text-bone">
                    <span className="font-mono text-[11px] uppercase tracking-wider">
                      {owner.fullName}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-bone/95 text-ink">
                      <span className="w-1.5 h-1.5 rounded-full bg-vermilion" />
                      {owner.availableText}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Editorial Sub-ledger: Bio Copy + Primary Actions + Quick Shipped Index */}
        <div className="mt-10 sm:mt-14 pt-8 border-t border-rule grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-4">
            <p className="font-mono text-xs uppercase tracking-widest text-vermilion">
              {owner.badge} — {owner.positioningLine}
            </p>
            <p className="text-base sm:text-lg text-ink-2 leading-relaxed max-w-2xl">
              {hero.subline}
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col sm:flex-row lg:justify-end items-stretch sm:items-center gap-3.5">
            <a
              href={hero.primaryCta.href}
              id="hero-cta-work"
              className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-ink text-bone font-mono text-xs uppercase tracking-wider hover:bg-vermilion transition-colors duration-300"
            >
              <span>{hero.primaryCta.label}</span>
              <span aria-hidden="true">↓</span>
            </a>
            <a
              href={hero.secondaryCta.href}
              id="hero-cta-contact"
              className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full border border-ink text-ink font-mono text-xs uppercase tracking-wider hover:bg-ink hover:text-bone transition-colors duration-300"
            >
              <span>{hero.secondaryCta.label}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Subtle Editorial Ticker Strip */}
      <div className="border-t border-rule bg-bone-warm/60 py-3 overflow-hidden">
        <div className="animate-editorial-marquee">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center shrink-0">
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-ink-muted px-6">
                {PORTFOLIO_DATA.marqueeText}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-vermilion" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
