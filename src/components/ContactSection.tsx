import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';

type CopiedKey = 'email' | 'phone' | 'linkedin' | null;

export const ContactSection: React.FC = () => {
  const sectionRef = useScrollReveal<HTMLElement>(90);
  const [copiedKey, setCopiedKey] = useState<CopiedKey>(null);

  const handleCopy = async (key: CopiedKey, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => {
        setCopiedKey((prev) => (prev === key ? null : prev));
      }, 2200);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = value;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedKey(key);
      setTimeout(() => {
        setCopiedKey((prev) => (prev === key ? null : prev));
      }, 2200);
    }
  };

  const { contact } = PORTFOLIO_DATA;

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="mx-auto max-w-[1280px] px-4 pb-12 pt-8 sm:px-8 sm:pb-16"
    >
      <div className="reveal-up cyber-glass dot-texture-emerald relative overflow-hidden rounded-[36px] border border-[#14F195]/35 p-7 text-white sm:p-12 lg:p-16">
        {/* Decorative ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#14F195]/20 blur-[90px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#F5C451]/15 blur-[90px]"
        />

        <div className="relative z-10">
          {/* Pill Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#14F195]/40 bg-[#14F195]/15 px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-widest text-[#14F195]">
            <span className="h-2 w-2 rounded-full bg-[#14F195] shadow-[0_0_8px_#14F195]" />
            <span>TRANSMISSION // AVAILABLE FOR WORK</span>
          </div>

          {/* Headline */}
          <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <h2 className="font-display text-[clamp(2.2rem,5vw,4.3rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-white">
              Let’s build something <span className="serif-italic font-normal text-[#14F195]">real</span> together.
            </h2>
            <p className="max-w-[400px] text-base font-medium leading-relaxed text-slate-300">
              {PORTFOLIO_DATA.hero.positioningLine} Based in {contact.location}. Reach out directly by email, phone, or
              LinkedIn.
            </p>
          </div>

          {/* 3 Contact Cards with Copy Buttons */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {/* Email Card */}
            <div className="flex flex-col justify-between rounded-3xl border border-white/12 bg-[#060B17]/90 p-6 transition-colors hover:border-[#14F195]/50">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-display text-xs font-extrabold uppercase tracking-wider text-slate-400">
                    Email
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#14F195]/20 text-[#14F195]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </span>
                </div>
                <a
                  href={`mailto:${contact.email}`}
                  className="block break-all font-display text-base font-bold text-white transition-colors hover:text-[#14F195] sm:text-lg"
                >
                  {contact.email}
                </a>
              </div>

              <div className="mt-6 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => handleCopy('email', contact.email)}
                  className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 font-display text-xs font-extrabold uppercase tracking-wider text-white transition-all hover:border-[#14F195] hover:bg-[#14F195] hover:text-[#041019] active:scale-[0.97]"
                >
                  {copiedKey === 'email' ? (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                      </svg>
                      <span>Copy Email</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${contact.email}`}
                  aria-label="Send email"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#14F195] text-[#041019] transition-transform hover:-translate-y-0.5 active:scale-95"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <div className="flex flex-col justify-between rounded-3xl border border-white/12 bg-[#060B17]/90 p-6 transition-colors hover:border-[#14F195]/50">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-display text-xs font-extrabold uppercase tracking-wider text-slate-400">
                    Phone / WhatsApp
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#F5C451]/20 text-[#F5C451]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                </div>
                <a
                  href={contact.phoneHref}
                  className="block font-display text-xl font-bold text-white transition-colors hover:text-[#14F195]"
                >
                  {contact.phone}
                </a>
              </div>

              <div className="mt-6 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => handleCopy('phone', contact.phone)}
                  className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 font-display text-xs font-extrabold uppercase tracking-wider text-white transition-all hover:border-[#14F195] hover:bg-[#14F195] hover:text-[#041019] active:scale-[0.97]"
                >
                  {copiedKey === 'phone' ? (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                      </svg>
                      <span>Copy Phone</span>
                    </>
                  )}
                </button>

                <a
                  href={contact.phoneHref}
                  aria-label="Call phone number"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#14F195] text-[#041019] transition-transform hover:-translate-y-0.5 active:scale-95"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>

            {/* LinkedIn Card */}
            <div className="flex flex-col justify-between rounded-3xl border border-white/12 bg-[#060B17]/90 p-6 transition-colors hover:border-[#14F195]/50">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-display text-xs font-extrabold uppercase tracking-wider text-slate-400">
                    LinkedIn
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#14F195]/20 text-[#14F195]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </span>
                </div>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block break-all font-display text-base font-bold text-white transition-colors hover:text-[#14F195] sm:text-lg"
                >
                  {contact.linkedinLabel}
                </a>
              </div>

              <div className="mt-6 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => handleCopy('linkedin', contact.linkedin)}
                  className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 font-display text-xs font-extrabold uppercase tracking-wider text-white transition-all hover:border-[#14F195] hover:bg-[#14F195] hover:text-[#041019] active:scale-[0.97]"
                >
                  {copiedKey === 'linkedin' ? (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                      </svg>
                      <span>Copy Link</span>
                    </>
                  )}
                </button>

                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open LinkedIn profile in new tab"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#14F195] text-[#041019] transition-transform hover:-translate-y-0.5 active:scale-95"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Footer Bar */}
          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-7 text-sm font-medium text-slate-400 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="font-display font-extrabold text-white">
                Abdul<span className="text-[#14F195]">Kareem</span>
              </span>
              <span>·</span>
              <span>{contact.copyright}</span>
            </div>

            <a
              href="#top"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-display text-xs font-extrabold uppercase tracking-wider text-white transition-colors hover:border-[#14F195] hover:text-[#14F195]"
            >
              <span>Back to top</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="m18 15-6-6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
