/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bone: '#F4F0EA',
        'bone-warm': '#EAE3D8',
        'bone-card': '#EFE9DF',
        ink: '#0F0F0E',
        'ink-2': '#262522',
        'ink-muted': '#57534E',
        'ink-faint': '#8C857B',
        rule: '#D8D0C3',
        vermilion: '#E03E1A',
        forest: '#143023',
      },
      fontFamily: {
        display: ['"Syne"', '"Segoe UI"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        body: ['"Manrope"', '"Segoe UI"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

