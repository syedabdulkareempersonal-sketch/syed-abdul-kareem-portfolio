import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const ContactSection: React.FC = () => {
  const { contact, owner } = PORTFOLIO_DATA;
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(label);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = value;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedField(label);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  return (
    <footer
      id="contact"
      aria-label="Contact and Footer"
      className="bg-ink text-bone"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-16 sm:pt-24 pb-12">
        {/* Top Metadata */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-bone/15">
          <p className="font-mono text-xs uppercase tracking-widest text-vermilion">
            08 / Initiate Collaboration
          </p>
          <p className="font-mono text-xs text-bone/70">
            {owner.positioningLine} · {contact.location}
          </p>
        </div>

        {/* Monumental Call to Action */}
        <div className="py-12 sm:py-16 border-b border-bone/15">
          <h2 className="display-monument uppercase text-bone text-[clamp(2.6rem,7.5vw,7rem)]">
            Let&apos;s build your{' '}
            <span className="serif-editorial italic font-normal lowercase text-vermilion">
              next
            </span>{' '}
            product.
          </h2>
        </div>

        {/* 3 Direct Contact Channels with Instant Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-bone/15 border-b border-bone/15">
          {/* Email */}
          <div className="py-8 lg:pr-8 flex flex-col justify-between gap-5">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-bone/50">
                01 / Electronic Mail
              </span>
              <a
                href={`mailto:${contact.email}`}
                id="contact-email-link"
                className="mt-2 block font-mono text-sm sm:text-base text-bone hover:text-vermilion break-all transition-colors"
              >
                {contact.email}
              </a>
            </div>
            <div>
              <button
                type="button"
                id="copy-email-btn"
                onClick={() => handleCopy(contact.email, 'email')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-bone/25 text-xs font-mono uppercase tracking-wider text-bone hover:bg-bone hover:text-ink transition-colors"
              >
                <span>{copiedField === 'email' ? 'Copied email ✓' : 'Copy email'}</span>
              </button>
            </div>
          </div>

          {/* Phone */}
          <div className="py-8 lg:px-8 flex flex-col justify-between gap-5">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-bone/50">
                02 / Direct Line
              </span>
              <a
                href={contact.phoneHref}
                id="contact-phone-link"
                className="mt-2 block font-display font-bold text-xl sm:text-2xl text-bone hover:text-vermilion transition-colors"
              >
                {contact.phone}
              </a>
            </div>
            <div>
              <button
                type="button"
                id="copy-phone-btn"
                onClick={() => handleCopy(contact.phone, 'phone')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-bone/25 text-xs font-mono uppercase tracking-wider text-bone hover:bg-bone hover:text-ink transition-colors"
              >
                <span>{copiedField === 'phone' ? 'Copied phone ✓' : 'Copy phone'}</span>
              </button>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="py-8 lg:pl-8 flex flex-col justify-between gap-5">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-bone/50">
                03 / Professional Network
              </span>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                id="contact-linkedin-link"
                className="mt-2 block font-mono text-sm sm:text-base text-bone hover:text-vermilion break-all transition-colors"
              >
                {contact.linkedinLabel} ↗
              </a>
            </div>
            <div>
              <button
                type="button"
                id="copy-linkedin-btn"
                onClick={() => handleCopy(contact.linkedin, 'linkedin')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-bone/25 text-xs font-mono uppercase tracking-wider text-bone hover:bg-bone hover:text-ink transition-colors"
              >
                <span>{copiedField === 'linkedin' ? 'Copied URL ✓' : 'Copy LinkedIn URL'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Colophon / Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-bone/60">
          <div>{contact.copyright}</div>
          <div>AI Builder · Kadapa, Andhra Pradesh, India</div>
          <a
            href="#top"
            id="footer-back-to-top"
            className="text-bone hover:text-vermilion transition-colors"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
};
