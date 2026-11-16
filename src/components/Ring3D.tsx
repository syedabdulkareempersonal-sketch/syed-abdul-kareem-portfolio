import React, { useEffect, useRef, useState } from 'react';
import { PORTFOLIO_DATA, RingItem } from '../data/portfolio';

export const Ring3D: React.FC = () => {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const slabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const stateRef = useRef({
    rotationY: -18,
    velocity: 0,
    isPointerDown: false,
    startX: 0,
    lastX: 0,
    lastTime: 0,
    isVisible: true,
    reducedMotion: false,
    radius: 370,
    cardW: 215,
    cardH: 255,
  });

  useEffect(() => {
    const stage = stageRef.current;
    const carousel = carouselRef.current;
    if (!stage || !carousel) return;

    const st = stateRef.current;
    st.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const count = PORTFOLIO_DATA.ringItems.length;
    const angleStep = 360 / count;

    const updateGeometry = () => {
      const vw = window.innerWidth;
      if (vw < 480) {
        st.radius = 225;
        st.cardW = 152;
        st.cardH = 190;
      } else if (vw < 768) {
        st.radius = 275;
        st.cardW = 178;
        st.cardH = 218;
      } else if (vw < 1024) {
        st.radius = 335;
        st.cardW = 198;
        st.cardH = 240;
      } else {
        st.radius = 395;
        st.cardW = 222;
        st.cardH = 264;
      }
      renderFrame();
    };

    const renderFrame = () => {
      if (!carousel) return;
      carousel.style.transform = `translateZ(${-st.radius * 0.32}px) rotateX(-6deg) rotateY(${st.rotationY}deg)`;

      slabRefs.current.forEach((slab, idx) => {
        if (!slab) return;
        const itemAngle = idx * angleStep;
        const totalDeg = (itemAngle + st.rotationY) % 360;
        const rad = (totalDeg * Math.PI) / 180;
        const cosVal = Math.cos(rad);

        const normalizedFront = (cosVal + 1) / 2;
        const opacity = 0.22 + normalizedFront * 0.78;

        slab.style.width = `${st.cardW}px`;
        slab.style.height = `${st.cardH}px`;
        slab.style.marginLeft = `${-st.cardW / 2}px`;
        slab.style.marginTop = `${-st.cardH / 2}px`;
        slab.style.transform = `rotateY(${itemAngle}deg) translateZ(${st.radius}px)`;
        slab.style.opacity = opacity.toFixed(3);
      });
    };

    updateGeometry();
    window.addEventListener('resize', updateGeometry);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          st.isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(stage);

    let rafId = 0;
    const tick = () => {
      if (st.isVisible) {
        if (!st.isPointerDown) {
          if (Math.abs(st.velocity) > 0.01) {
            st.rotationY += st.velocity;
            st.velocity *= 0.945;
          } else if (!st.reducedMotion) {
            st.rotationY -= 0.15;
          }
          renderFrame();
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updateGeometry);
      observer.disconnect();
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const st = stateRef.current;
    st.isPointerDown = true;
    st.startX = e.clientX;
    st.lastX = e.clientX;
    st.lastTime = performance.now();
    st.velocity = 0;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const st = stateRef.current;
    if (!st.isPointerDown) return;

    const now = performance.now();
    const dx = e.clientX - st.lastX;
    const dt = Math.max(now - st.lastTime, 8);

    const deltaDeg = dx * 0.28;
    st.rotationY += deltaDeg;
    st.velocity = Math.max(Math.min(deltaDeg * (16 / dt), 4.5), -4.5);

    st.lastX = e.clientX;
    st.lastTime = now;

    if (carouselRef.current) {
      const count = PORTFOLIO_DATA.ringItems.length;
      const angleStep = 360 / count;
      carouselRef.current.style.transform = `translateZ(${-st.radius * 0.32}px) rotateX(-6deg) rotateY(${st.rotationY}deg)`;

      slabRefs.current.forEach((slab, idx) => {
        if (!slab) return;
        const itemAngle = idx * angleStep;
        const totalDeg = (itemAngle + st.rotationY) % 360;
        const cosVal = Math.cos((totalDeg * Math.PI) / 180);
        const normalizedFront = (cosVal + 1) / 2;
        slab.style.opacity = (0.22 + normalizedFront * 0.78).toFixed(3);
      });
    }
  };

  const handlePointerUpOrCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    const st = stateRef.current;
    if (!st.isPointerDown) return;
    st.isPointerDown = false;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture already released
    }
  };

  const nudgeRing = (delta: number) => {
    stateRef.current.velocity = delta;
  };

  const getSlabTheme = (item: RingItem) => {
    switch (item.accent) {
      case 'emerald':
        return 'bg-gradient-to-b from-[#071F1C]/90 to-[#050A14]/95 text-white border border-[#00F5A0]/45 shadow-[0_24px_60px_-14px_rgba(0,245,160,0.22),inset_0_1px_0_0_rgba(0,245,160,0.35)] backdrop-blur-xl dot-texture-emerald';
      case 'gold':
        return 'bg-gradient-to-b from-[#1F1A0A]/90 to-[#050A14]/95 text-white border border-[#E5B84B]/45 shadow-[0_24px_60px_-14px_rgba(229,184,75,0.2),inset_0_1px_0_0_rgba(229,184,75,0.35)] backdrop-blur-xl dot-texture-light';
      case 'navy':
        return 'bg-gradient-to-b from-[#0B192E]/90 to-[#050A14]/95 text-white border border-[#00D9F5]/40 shadow-[0_24px_60px_-14px_rgba(0,217,245,0.2),inset_0_1px_0_0_rgba(0,217,245,0.3)] backdrop-blur-xl dot-texture-light';
      default:
        return 'bg-gradient-to-b from-[#0C1426]/92 to-[#050811]/96 text-white border border-white/15 shadow-[0_24px_60px_-14px_rgba(0,0,0,0.9),inset_0_1px_0_0_rgba(255,255,255,0.18)] backdrop-blur-xl';
    }
  };

  return (
    <section
      aria-label="Interactive 3D Project & Capability Ring"
      className="relative z-10 mx-auto max-w-[1440px] overflow-hidden px-4 py-8 sm:px-8 sm:py-12"
    >
      {/* Top bar with DRAG TO SPIN pill & accessible keyboard controls */}
      <div className="mx-auto mb-4 flex max-w-[1280px] flex-wrap items-center justify-between gap-3">
        <div className="section-pill">
          <span className="section-pill-dot" aria-hidden="true" />
          <span>DRAG TO SPIN · 3D ORBITAL DECK</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => nudgeRing(3.2)}
            aria-label="Spin ring left"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#070D19]/85 text-white backdrop-blur-md transition-all hover:border-[#00F5A0] hover:text-[#00F5A0] active:scale-95"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => nudgeRing(-3.2)}
            aria-label="Spin ring right"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#070D19]/85 text-white backdrop-blur-md transition-all hover:border-[#00F5A0] hover:text-[#00F5A0] active:scale-95"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* 3D Stage */}
      <div
        ref={stageRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUpOrCancel}
        onPointerCancel={handlePointerUpOrCancel}
        className={`ring-stage relative mx-auto flex h-[300px] w-full items-center justify-center sm:h-[360px] lg:h-[400px] ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        <div ref={carouselRef} className="ring-carousel relative h-full w-full">
          {PORTFOLIO_DATA.ringItems.map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => {
                slabRefs.current[idx] = el;
              }}
              className={`ring-slab flex flex-col justify-between p-5 ${getSlabTheme(item)}`}
            >
              {/* Top row */}
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full px-2.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-widest ${
                    item.type === 'project'
                      ? 'border border-[#00F5A0]/35 bg-[#00F5A0]/12 text-[#00F5A0]'
                      : item.accent === 'gold'
                      ? 'border border-[#E5B84B]/40 bg-[#E5B84B]/15 text-[#FDE68A]'
                      : 'border border-[#00D9F5]/35 bg-[#00D9F5]/12 text-[#00D9F5]'
                  }`}
                >
                  {item.type === 'project' ? 'SHIPPED' : 'PILLAR'}
                </span>
                <span className="font-mono text-[11px] font-bold text-slate-400">0{idx + 1}</span>
              </div>

              {/* Center visual: project logo OR category display icon */}
              {item.type === 'project' && item.logo ? (
                <div className="my-auto flex items-center justify-center py-2">
                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-white/12 bg-[#03060C] p-2.5 shadow-[0_12px_30px_rgba(0,0,0,0.75)] sm:h-24 sm:w-24">
                    <img
                      src={item.logo}
                      alt={`${item.title} logo`}
                      width={96}
                      height={96}
                      draggable={false}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>
              ) : (
                <div className="my-auto flex flex-col justify-center py-2">
                  <div
                    className={`mb-2 inline-flex h-11 w-11 items-center justify-center rounded-2xl border ${
                      item.accent === 'gold'
                        ? 'border-[#E5B84B]/40 bg-[#E5B84B]/12 text-[#FDE68A]'
                        : 'border-[#00F5A0]/40 bg-[#00F5A0]/12 text-[#00F5A0]'
                    }`}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                      <polyline points="2 12 12 17 22 12" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Bottom Title & Subtitle */}
              <div>
                <div className="font-display text-lg font-extrabold leading-tight tracking-tight text-white sm:text-xl">
                  {item.title}
                </div>
                <div className="mt-1 font-mono text-[11px] font-medium text-slate-400">{item.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
