import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0a0c0b',
          900: '#10120f',
          800: '#171a17',
          700: '#1f231f',
          600: '#2b302b',
          500: '#5a605c',
        },
        bone: {
          50:  '#f6f4ec',
          100: '#ece9dd',
          200: '#d9d4c4',
          300: '#bdb7a4',
        },
        moss: {
          200: '#cfd6c8',
          300: '#b1bbac',
          400: '#8d998a',
          500: '#6c7a69',
          600: '#4e5a4d',
          700: '#3a4438',
          800: '#252c24',
          900: '#171c16',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-serif', 'Georgia', 'serif'],
        sans:    ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.05em',
        tighten: '-0.025em',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
