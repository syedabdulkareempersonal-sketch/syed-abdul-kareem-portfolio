/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#050811',
        space: '#080D1B',
        panel: '#0D1529',
        cream: '#F3EFE7',
        'cream-2': '#EAE3D5',
        paper: '#FFFFFF',
        ink: '#101A2E',
        'ink-soft': '#94A3B8',
        accent: '#10A37F',
        'accent-bright': '#14F195',
        'accent-wash': '#0B2B26',
        'accent-deep': '#096950',
        gold: '#C9A227',
        'gold-bright': '#F5C451',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', '"Segoe UI"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        body: ['"Manrope"', '"Segoe UI"', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        'out-Quart': 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
  plugins: [],
};
