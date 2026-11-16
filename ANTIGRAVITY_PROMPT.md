# Build my portfolio website (AI Builder)

You are building a personal portfolio website for **Syed Abdul Kareem**, an AI Builder from Kadapa, India. He builds apps, websites, videos and marketing using AI. The site must look like a premium, award-style agency portfolio and make a recruiter or freelance client want to contact him within 10 seconds.

## 0. Before you write any code
1. Open `index.html` in this folder. It is a **working first draft** (single file) that already has the right structure, copy and motion. Treat it as the baseline to rebuild and improve, not something to throw away.
2. Open the two reference sites in the browser and study them properly (layout, spacing, type, colour, motion). Do not guess from descriptions:
   - https://agenciex.framer.website/
   - https://dribbble.com/shots/ (search: "Portfolio Animation" by Ridoy Rock)
3. If these skills are installed, use them: `ui-ux-pro-max` (pick the design system first: pattern, style, palette, type pairing, effects, anti-patterns), `emil-design-eng` (animation craft), `web3d-integration-patterns`. If not, follow the rules in sections 3 and 5.
4. Show me a short plan (stack, sections, design tokens) and then build it.

## 1. What the references actually look like (what I must match)
**Agenciex (Framer):** warm cream background with a faint dot grid; one hot accent colour used in big solid fills; very heavy black display headlines with one italic serif word mixed in; a centred floating pill navigation with a small outline button on the right; small pill badges above section titles; a hero with a **drag-to-spin 3D ring of project cards**; oversized faded "ghost" text marquee; rounded cards that sit slightly tilted; big colour stat blocks with dotted texture.

**Ridoy Rock Dribbble shot:** a flat colour slide, the person's photo cut into an **arch shape**, a **rotating circular text badge** overlapping the photo's corner, a huge name/word over the image, confident generous whitespace.

Mine must feel like these two, in my own colours. **It must be a light theme.** Do not make it dark.

## 2. Stack
- Vite + React + TypeScript + Tailwind CSS.
- GSAP (+ ScrollTrigger) for scroll and intro motion, Motion (Framer Motion) for hover and layout, optional Lenis for smooth scroll.
- The 3D ring should be CSS 3D (perspective + preserve-3d) with pointer-event drag and momentum. Only use Three.js / React Three Fiber if it clearly improves the hero, and keep it lazy-loaded.
- Output must be deployable as a static site (Vercel, Netlify, Cloudflare Pages). Put images in `/public/assets`, in WebP.
- Optional hero upgrade: a looping background made with the `hyperframes` or `lemo-opuscar` skills (muted, autoplay, loop, poster image, under 3 MB). Use it only if it does not hurt readability or load speed.

## 3. Design system
- **Background:** cream `#F3EFE7` with a 1px dot grid (about 22px spacing, 8% opacity ink).
- **Ink / dark:** navy `#101A2E`.
- **Accent (hot colour):** emerald `#10A37F`. Supporting gold `#C9A227`. Use accent as big solid fills (stat blocks, buttons, the ring cards), not as thin lines.
- **Type:** Plus Jakarta Sans 800 for headlines (tight tracking, -0.03em), Instrument Serif *italic* for one emphasised word per headline, Manrope for body. Fluid sizes with `clamp()`. Hero H1 should be huge (about 96 to 120px on desktop).
- **Shapes:** very round (pills for nav, badges and buttons; 24 to 32px radius on cards; arch for the portrait).
- **Shadows:** soft and low, never heavy.
- **Easing:** `cubic-bezier(0.23, 1, 0.32, 1)` for entrances; hover and press at 150 to 250ms; buttons scale to 0.97 on `:active`; never animate from `scale(0)`; only animate `transform` and `opacity`.
- Use real SVG icons, no emoji.

## 4. Sections (in order)
1. **Nav:** sticky, centred pill with `Work`, `Process`, `Toolkit`, `Contact`; logo "Abdul**Kareem**" on the left (Kareem in emerald); outline pill button "Get in touch" on the right. Collapses to a menu on mobile.
2. **Hero:** badge `AI BUILDER · KADAPA, INDIA`. Headline: `I build *real* products with AI.` (italic serif on "real", emerald on "AI."). Sub-line: "Apps, websites, videos and marketing, built end to end with AI. I have used these tools for hours every day since ChatGPT opened to the public in 2022." Buttons: `See the work` (filled) and `Start a project` (outline). Right side: my photo in an **arch frame**, a floating pill "Available for work" with a green dot, and a **rotating circular text badge** around a small emerald dot reading "APPS · WEBSITES · VIDEOS · MARKETING ·".
3. **Drag-to-spin 3D ring** under the hero with 8 cards: WaqtOS (logo), Apps, HOOR-E-AIN (logo), Websites, CricApex (logo), Videos, Kadapa Cars (logo), Marketing. Slow auto-rotate, drag with momentum, front cards fully visible, back cards faded, back faces hidden, never mirrored text. Small hint: "DRAG TO SPIN". Must also work with touch on mobile and pause when off-screen.
4. **Ghost marquee:** huge faded text "Built with AI — Apps · Websites · Videos · Marketing —" scrolling slowly.
5. **Stat blocks (4, solid colours with dot texture):** `8,000+` hours of hands-on AI use (est.) · `2022` using AI daily since launch · `4` products shipped · `4` AI platforms in daily use.
6. **Selected work (bento grid, tilted cards, logo on top):**
   - **WaqtOS**, personal operating system. "A Salah-centered personal operating system. It brings worship, time management, tasks, schedules and daily responsibilities into one place, so Muslims can live a more organized, balanced and purposeful life." Tags: Salah-centered, Time management, Tasks and schedules, Daily responsibilities. (wide card)
   - **HOOR-E-AIN**, app with AI companion. "A lifetime wellness, family and love companion. It organizes daily routines, tracks health and habits, supports spiritual and personal growth, keeps a private journal, and includes HOOR AI for everyday questions and support."
   - **CricApex**, sports app. "A full cricket scoring and tournament platform: ball-by-ball live scoring, digital scorecards and player statistics, plus league and knockout tournaments with automatic fixtures, a points table and Net Run Rate." Also: live match following, live broadcasting support, player and team records.
   - **Kadapa Cars**, website. "A website I built with AI." Keep it short; do not invent details.
7. **Process (3 steps, numbered 01 to 03):** Brief it clearly → Build it with AI → Ship and refine.
8. **Toolkit (two panels):** *AI platforms:* Claude Max, ChatGPT Pro, Google Antigravity Pro, open-source models run locally. *Building with AI:* apps, websites, videos, marketing content; tech used: HTML, CSS, JavaScript, React, Firebase; Canva, WordPress.
9. **Contact (dark navy panel):** email `syedabdulkareempersonal@gmail.com`, phone `+91 95156 24770`, LinkedIn `https://www.linkedin.com/in/syedabdulkareemofficial/`, each with a Copy button. Footer: "© 2026 Syed Abdul Kareem".

## 5. Motion rules
- Hero intro: headline words rise one by one (about 55ms stagger), then badge, sub-line and buttons, then the arch photo, then the pill and rotating badge.
- Scroll reveals: fade and rise 24px, once per element; stat blocks, process steps and work cards stagger.
- Cards: gentle lift and untilt on hover (only on devices that have hover).
- Respect `prefers-reduced-motion` (no auto-rotate, no reveals, everything visible).
- **Important lesson from the draft:** scroll reveals must never leave content invisible. Use IntersectionObserver or ScrollTrigger with a fallback so everything becomes visible even if the observer never fires.

## 6. Content rules (important)
- **Do not mention digital marketing jobs, performance marketing, ad campaigns or any employer.** This portfolio is for a career move into AI building.
- Do not invent clients, numbers, testimonials, awards or project details. The only numbers allowed are the ones in section 4. Keep "(est.)" on the hours figure.
- Do not add the HOOR-E-AIN private journal or personal letters detail beyond what is written above.
- English only. Plain, confident, short sentences.

## 7. Quality bar (check before you tell me it is done)
- Looks right at 1440px, 1024px, 768px and 390px; no horizontal scroll; ring and arch photo scale down cleanly.
- Text contrast at least 4.5:1; visible focus rings; all images have alt text; tap targets at least 44px.
- Lighthouse: Performance 90 or higher, Accessibility 95 or higher. Images are WebP and lazy-loaded below the fold; fonts preloaded.
- Include `<title>`, meta description, Open Graph image, favicon, and a `robots.txt`.
- Take screenshots of every section at desktop and mobile and compare them side by side with the two references. List anything that still differs and fix it.

## 8. Deliver
- The full project, a short README (how to run, build, deploy), and the live preview.
- Then tell me which file to edit to change: my photo, project logos, text, and colours.
