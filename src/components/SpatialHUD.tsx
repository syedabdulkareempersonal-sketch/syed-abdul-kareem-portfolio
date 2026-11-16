import React, { useEffect, useRef, useState } from 'react';

const CHAPTERS = [
  { id: 'top', index: '01', label: 'CORE' },
  { id: 'work', index: '02', label: 'WORK' },
  { id: 'services', index: '03', label: 'SERVICES' },
  { id: 'videos', index: '04', label: 'REEL' },
  { id: 'journey', index: '05', label: 'JOURNEY' },
  { id: 'toolkit', index: '06', label: 'STACK' },
  { id: 'contact', index: '07', label: 'CONTACT' },
];

export const SpatialHUD: React.FC = () => {
  const [scrollPct, setScrollPct] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateScroll = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const pct = Math.min(Math.max(Math.round((window.scrollY / max) * 100), 0), 100);
      setScrollPct(pct);

      const idx = Math.min(
        CHAPTERS.length - 1,
        Math.floor((window.scrollY / max) * CHAPTERS.length)
      );
      setActiveIdx(idx);
    };

    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!hasFinePointer || prefersReducedMotion) return;

    let tx = -100;
    let ty = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${tx - 4}px, ${ty - 4}px, 0)`;
      }
    };

    const loop = () => {
      rx += (tx - rx) * 0.16;
      ry += (ty - ry) * 0.16;
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <>
      {/* Top Laser Scroll Progress Bar */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] bg-white/[0.04]"
      >
        <div
          className="h-full bg-gradient-to-r from-[#00F5A0] via-[#00D9F5] to-[#E5B84B] shadow-[0_0_14px_#00F5A0] transition-[width] duration-75"
          style={{ width: `${scrollPct}%` }}
        />
      </div>

      {/* Custom Magnetic Cursor (Fine Pointer Desktop Only) */}
      <div
        ref={cursorDotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[80] hidden h-2 w-2 rounded-full bg-[#00F5A0] shadow-[0_0_12px_#00F5A0] lg:block"
      />
      <div
        ref={cursorRingRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[79] hidden h-9 w-9 rounded-full border border-[#00F5A0]/45 bg-[#00F5A0]/[0.03] backdrop-blur-[1px] lg:block"
      />

      {/* Right Spatial Chapter Telemetry Rail (Desktop XL) */}
      <aside
        aria-label="Section progress indicator"
        className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-2.5 xl:flex"
      >
        <div className="mb-1 rounded-full border border-white/10 bg-[#050811]/80 px-2.5 py-1 font-mono text-[10px] font-bold tracking-widest text-[#00F5A0] backdrop-blur-md">
          {String(scrollPct).padStart(3, '0')}%
        </div>

        {CHAPTERS.map((ch, idx) => {
          const isActive = idx === activeIdx;
          return (
            <a
              key={ch.id}
              href={`#${ch.id}`}
              className="group flex items-center gap-2.5 py-0.5 text-right"
              aria-label={`Jump to ${ch.label}`}
            >
              <span
                className={`font-mono text-[10px] font-bold tracking-[0.18em] transition-all duration-200 ${
                  isActive
                    ? 'translate-x-0 text-[#00F5A0] opacity-100'
                    : 'translate-x-1 text-slate-400 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                }`}
              >
                {ch.index} // {ch.label}
              </span>
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? 'h-5 w-1.5 bg-[#00F5A0] shadow-[0_0_12px_#00F5A0]'
                    : 'h-1.5 w-1.5 bg-white/25 group-hover:bg-white/60'
                }`}
              />
            </a>
          );
        })}
      </aside>
    </>
  );
};
