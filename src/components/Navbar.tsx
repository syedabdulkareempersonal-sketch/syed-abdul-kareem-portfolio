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
            ? 'border border-[#14F195]/30 bg-[#070C18]/90 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.85)] backdrop-blur-xl'
            : 'border border-white/10 bg-[#080E1E]/75 backdrop-blur-md'
        }`}
      >
        {/* Left Brand Logo */}
        <a
          href="#top"
          className="inline-flex min-h-[44px] items-center gap-2 font-display text-lg font-extrabold tracking-tight text-white sm:text-xl"
          aria-label="Syed Abdul Kareem — Home"
        >
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#14F195] shadow-[0_0_12px_#14F195]" />
          <span>
            {PORTFOLIO_DATA.owner.firstName}
            <span className="text-[#14F195]">{PORTFOLIO_DATA.owner.lastName}</span>
          </span>
        </a>

        {/* Center Floating Pill Nav (Desktop) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden items-center gap-1 rounded-full border border-white/10 bg-[#050914]/90 px-2 py-1 lg:flex"
        >
          {PORTFOLIO_DATA.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex min-h-[40px] items-center rounded-full px-3.5 py-1.5 font-display text-sm font-bold text-slate-300 transition-colors duration-200 hover:bg-[#14F195]/15 hover:text-[#14F195]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Outline Pill Button */}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden min-h-[44px] items-center gap-2 rounded-full border border-[#14F195]/45 bg-[#10A37F]/15 px-5 py-2 font-display text-sm font-bold text-white shadow-[0_0_20px_rgba(20,241,149,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#14F195] hover:bg-[#14F195] hover:text-[#041019] active:scale-[0.97] sm:inline-flex"
          >
            <span>Get in touch</span>
            <svg
              width="15"
              height="15"
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#0B1325] text-white transition-colors hover:border-[#14F195] lg:hidden"
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
          className="mx-auto mt-2 max-w-[1280px] rounded-3xl border border-[#14F195]/30 bg-[#080E1E]/95 p-4 shadow-2xl backdrop-blur-xl lg:hidden"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            {PORTFOLIO_DATA.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-[46px] items-center justify-between rounded-2xl px-4 py-2.5 font-display text-base font-bold text-white transition-colors hover:bg-[#14F195]/15 hover:text-[#14F195]"
              >
                <span>{item.label}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#14F195] to-[#10A37F] px-5 py-3 font-display text-sm font-extrabold text-[#041019]"
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
