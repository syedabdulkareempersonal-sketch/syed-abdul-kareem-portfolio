import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4 sm:px-8">
      <div
        className={`mx-auto flex max-w-[1280px] items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 sm:px-6 ${
          scrolled
            ? 'border border-[#00F5A0]/25 bg-[#04070E]/85 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.9)] backdrop-blur-2xl'
            : 'border border-white/10 bg-[#050912]/65 backdrop-blur-xl'
        }`}
      >
        {/* Left Brand Logo */}
        <a
          href="#top"
          className="inline-flex min-h-[44px] items-center gap-2.5 font-display text-lg font-extrabold tracking-tight text-white sm:text-xl"
          aria-label="Syed Abdul Kareem — Home"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00F5A0] opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#00F5A0] shadow-[0_0_12px_#00F5A0]" />
          </span>
          <span>
            {PORTFOLIO_DATA.owner.firstName}
            <span className="text-neon-emerald">{PORTFOLIO_DATA.owner.lastName}</span>
          </span>
          <span className="hidden rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-widest text-slate-400 xl:inline-block">
            SYS.26
          </span>
        </a>

        {/* Center Floating Pill Nav (Desktop) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden items-center gap-1 rounded-full border border-white/10 bg-[#030509]/80 px-2 py-1 lg:flex"
        >
          {PORTFOLIO_DATA.nav.map((item, idx) => (
            <a
              key={item.href}
              href={item.href}
              className="group inline-flex min-h-[38px] items-center gap-1.5 rounded-full px-3.5 py-1.5 font-display text-xs font-bold tracking-wide text-slate-300 transition-all duration-200 hover:bg-[#00F5A0]/12 hover:text-[#00F5A0]"
            >
              <span className="font-mono text-[10px] text-slate-500 transition-colors group-hover:text-[#00F5A0]/80">
                0{idx + 1}
              </span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Right Outline Pill Button */}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden min-h-[42px] items-center gap-2 rounded-full border border-[#00F5A0]/40 bg-[#00F5A0]/10 px-5 py-2 font-display text-xs font-extrabold uppercase tracking-wider text-white shadow-[0_0_24px_rgba(0,245,160,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#00F5A0] hover:bg-[#00F5A0] hover:text-[#020806] active:scale-[0.97] sm:inline-flex"
          >
            <span>Get in touch</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>

          {/* Mobile Hamburger Button (>= 44x44 tap target) */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#070C18] text-white transition-colors hover:border-[#00F5A0] lg:hidden"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Collapsible Menu */}
      {menuOpen && (
        <div
          id="mobile-nav-drawer"
          className="mx-auto mt-2 max-w-[1280px] rounded-3xl border border-[#00F5A0]/30 bg-[#050912]/95 p-4 shadow-2xl backdrop-blur-2xl lg:hidden"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            {PORTFOLIO_DATA.nav.map((item, idx) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-[46px] items-center justify-between rounded-2xl px-4 py-2.5 font-display text-base font-bold text-white transition-colors hover:bg-[#00F5A0]/15 hover:text-[#00F5A0]"
              >
                <span className="flex items-center gap-2.5">
                  <span className="font-mono text-xs text-[#00F5A0]/70">0{idx + 1}</span>
                  <span>{item.label}</span>
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00F5A0] to-[#00D9F5] px-5 py-3 font-display text-sm font-extrabold text-[#020806]"
            >
              <span>Get in touch</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
