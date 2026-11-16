import React, { useEffect, useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { owner, nav } = PORTFOLIO_DATA;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-bone/90 backdrop-blur-md border-b border-rule'
          : 'bg-bone border-b border-rule'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
        {/* Left: Monogram & Name */}
        <a
          href="#top"
          id="nav-logo"
          className="flex items-center gap-3 group"
          aria-label={`${owner.fullName} — Home`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-vermilion transition-transform duration-300 ease-expo-out group-hover:scale-125" />
          <span className="font-display font-bold tracking-tight text-sm sm:text-base text-ink uppercase">
            {owner.fullName}
          </span>
        </a>

        {/* Center: Editorial Index Links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
          {nav.map((item, idx) => (
            <a
              key={item.href}
              href={item.href}
              id={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              className="group flex items-baseline gap-1.5 text-sm font-medium text-ink-muted hover:text-ink transition-colors duration-200"
            >
              <span className="font-mono text-[10px] text-ink-faint group-hover:text-vermilion transition-colors">
                0{idx + 1}
              </span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Right: Availability & Direct Action */}
        <div className="hidden md:flex items-center gap-5">
          <div className="flex items-center gap-2 text-xs font-mono text-ink-muted">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vermilion opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-vermilion" />
            </span>
            <span>{owner.availableText}</span>
          </div>

          <a
            href="#contact"
            id="nav-cta-contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink text-bone text-xs font-mono uppercase tracking-wider hover:bg-vermilion transition-colors duration-300"
          >
            <span>Start a project</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          id="nav-mobile-toggle"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
          className="md:hidden inline-flex items-center justify-center px-3.5 py-2 rounded-full border border-ink/20 text-xs font-mono uppercase tracking-wider text-ink"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-bone border-b border-rule px-5 pt-4 pb-6 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {nav.map((item, idx) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-baseline gap-2 py-2.5 px-3 rounded-lg bg-bone-warm/60 text-sm font-medium text-ink"
              >
                <span className="font-mono text-[11px] text-vermilion">0{idx + 1}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
          <div className="pt-2 flex items-center justify-between border-t border-rule">
            <span className="text-xs font-mono text-ink-muted">{owner.positioningLine}</span>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 rounded-full bg-ink text-bone text-xs font-mono uppercase tracking-wider"
            >
              Get in touch ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
