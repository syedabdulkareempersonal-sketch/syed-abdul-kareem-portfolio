# Syed Abdul Kareem — Futuristic 3D AI Builder Portfolio

A futuristic dark-space 3D portfolio built for **Syed Abdul Kareem** (`AI Builder · Kadapa, India · 4 years of hands-on AI experience`).

## Stack
- **Vite 6 + React 18 + TypeScript**
- **Three.js (WebGL)** — Interactive 3D neural core, gyroscopic orbital rings, and floating particle field in the Hero section
- **CSS 3D (`perspective` + `preserve-3d`)** — Drag-to-spin 8-card 3D project & capability ring with momentum physics
- **GSAP 3 + IntersectionObserver** — Staggered hero entrance and guaranteed-visible scroll reveals
- **Tailwind CSS 3** — Deep space dark theme (`#050811`), neon emerald (`#14F195` / `#10A37F`), and gold (`#F5C451` / `#C9A227`) glassmorphism

## How to Run Locally

```bash
npm install
npm run dev
```

## How to Build for Production

```bash
npm run build
npm run preview
```

The static production build is output to `dist/` and is ready for GitHub Pages, Vercel, Netlify, or Cloudflare Pages.

## Which Files to Edit

| What you want to change | File to edit |
| --- | --- |
| **All text, stats, projects, services, video reel, journey timeline, education, toolkit & contact info** | [`src/data/portfolio.ts`](./src/data/portfolio.ts) |
| **Add a live URL to WaqtOS, HOOR-E-AIN, CricApex, or Kadapa Cars** (button appears automatically when `url` is non-empty) | [`src/data/portfolio.ts`](./src/data/portfolio.ts) (`projects[].url`) |
| **Your portrait (`abdul-arch.webp`) & project logos (`waqtos.webp`, `hoor-e-ain.webp`, `cricapex.webp`, `kadapa-cars.webp`)** | [`public/assets/`](./public/assets/) |
| **Colors, neon glow tokens, glassmorphism & typography** | [`src/index.css`](./src/index.css) and [`tailwind.config.js`](./tailwind.config.js) |
| **WebGL 3D Hero Neural Core** | [`src/components/HeroScene3D.tsx`](./src/components/HeroScene3D.tsx) |
