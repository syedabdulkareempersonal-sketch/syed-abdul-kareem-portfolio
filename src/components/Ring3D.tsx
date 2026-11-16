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
    radius: 360,
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
        st.cardH = 188;
      } else if (vw < 768) {
        st.radius = 275;
        st.cardW = 178;
        st.cardH = 216;
      } else if (vw < 1024) {
        st.radius = 330;
        st.cardW = 198;
        st.cardH = 238;
      } else {
        st.radius = 385;
        st.cardW = 220;
        st.cardH = 262;
      }
      renderFrame();
    };

    const renderFrame = () => {
      if (!carousel) return;
      carousel.style.transform = `translateZ(${-st.radius * 0.35}px) rotateX(-5deg) rotateY(${st.rotationY}deg)`;

      slabRefs.current.forEach((slab, idx) => {
        if (!slab) return;
        const itemAngle = idx * angleStep;
        const totalDeg = (itemAngle + st.rotationY) % 360;
        const rad = (totalDeg * Math.PI) / 180;
        const cosVal = Math.cos(rad); // +1 at front, -1 at back

        const normalizedFront = (cosVal + 1) / 2; // 0 (back) to 1 (front)
        const opacity = 0.25 + normalizedFront * 0.75;

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
            st.velocity *= 0.94;
          } else if (!st.reducedMotion) {
            st.rotationY -= 0.16;
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
      carouselRef.current.style.transform = `translateZ(${-st.radius * 0.35}px) rotateX(-5deg) rotateY(${st.rotationY}deg)`;

      slabRefs.current.forEach((slab, idx) => {
        if (!slab) return;
        const itemAngle = idx * angleStep;
        const totalDeg = (itemAngle + st.rotationY) % 360;
        const cosVal = Math.cos((totalDeg * Math.PI) / 180);
        const normalizedFront = (cosVal + 1) / 2;
        slab.style.opacity = (0.25 + normalizedFront * 0.75).toFixed(3);
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
        return 'bg-gradient-to-br from-[#14F195] to-[#0B7A5E] text-[#041019] border border-[#14F195] shadow-[0_20px_50px_-12px_rgba(20,241,149,0.4)] dot-texture-light';
      case 'navy':
        return 'bg-gradient-to-br from-[#13203D] to-[#070D1C] text-white border border-[#14F195]/40 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.85)] dot-texture-emerald';
      case 'gold':
        return 'bg-gradient-to-br from-[#F5C451] to-[#B58917] text-[#050811] border border-[#FDE68A] shadow-[0_20px_50px_-12px_rgba(245,196,81,0.38)] dot-texture-light';
      default:
        return 'bg-[#0B1325]/95 text-white border border-white/15 shadow-[0_22px_50px_-12px_rgba(0,0,0,0.85)] backdrop-blur-xl';
    }
  };

  return (
    <section
      aria-label="Interactive 3D Project & Capability Ring"
      className="relative mx-auto max-w-[1440px] overflow-hidden px-4 py-8 sm:px-8 sm:py-12"
    >
      {/* Top bar with DRAG TO SPIN pill & accessible keyboard controls */}
      <div className="mx-auto mb-4 flex max-w-[1280px] flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#14F195]/35 bg-[#081022]/90 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#14F195] shadow-[0_0_24px_rgba(20,241,149,0.18)]">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#14F195]"
            aria-hidden="true"
          >
            <path d="M18 8L22 12L18 16" />
            <path d="M6 8L2 12L6 16" />
            <line x1="2" y1="12" x2="22" y2="12" />
          </svg>
          <span>DRAG TO SPIN · 3D ORBIT</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => nudgeRing(3.2)}
            aria-label="Spin ring left"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#0B1325] text-white transition-all hover:border-[#14F195] hover:text-[#14F195] active:scale-95"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => nudgeRing(-3.2)}
            aria-label="Spin ring right"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#0B1325] text-white transition-all hover:border-[#14F195] hover:text-[#14F195] active:scale-95"
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
        {/* Subtle glowing orbital floor reflection */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-4 h-16 w-3/4 max-w-[680px] rounded-full bg-[#14F195]/15 blur-3xl"
        />

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
                  className={`rounded-full px-2.5 py-1 font-display text-[10px] font-extrabold uppercase tracking-wider ${
                    item.type === 'project'
                      ? 'border border-[#14F195]/35 bg-[#14F195]/15 text-[#14F195]'
                      : item.accent === 'navy'
                      ? 'border border-white/20 bg-white/10 text-white'
                      : 'bg-black/20 text-current'
                  }`}
                >
                  {item.type === 'project' ? 'SHIPPED' : 'PILLAR'}
                </span>
                <span className="font-display text-xs font-extrabold opacity-75">0{idx + 1}</span>
              </div>

              {/* Center visual: project logo OR category display icon */}
              {item.type === 'project' && item.logo ? (
                <div className="my-auto flex items-center justify-center py-2">
                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-[#050811] p-2 shadow-inner sm:h-24 sm:w-24">
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
                  <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-black/15">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
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
                <div className="font-display text-lg font-extrabold leading-tight tracking-tight sm:text-xl">
                  {item.title}
                </div>
                <div className="mt-0.5 text-xs font-semibold opacity-80">{item.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
