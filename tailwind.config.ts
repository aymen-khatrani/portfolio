import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Tokens resolve to CSS variables (space-separated RGB) so the whole
        // palette can be swapped at runtime between the dark and light themes.
        // See the :root / [data-theme='light'] blocks in globals.css.
        ink: {
          950: 'rgb(var(--ink-950) / <alpha-value>)',
          900: 'rgb(var(--ink-900) / <alpha-value>)',
          800: 'rgb(var(--ink-800) / <alpha-value>)',
          700: 'rgb(var(--ink-700) / <alpha-value>)',
          600: 'rgb(var(--ink-600) / <alpha-value>)',
          500: 'rgb(var(--ink-500) / <alpha-value>)',
        },
        bone: {
          50:  'rgb(var(--bone-50) / <alpha-value>)',
          100: 'rgb(var(--bone-100) / <alpha-value>)',
          200: 'rgb(var(--bone-200) / <alpha-value>)',
          300: 'rgb(var(--bone-300) / <alpha-value>)',
        },
        moss: {
          200: 'rgb(var(--moss-200) / <alpha-value>)',
          300: 'rgb(var(--moss-300) / <alpha-value>)',
          400: 'rgb(var(--moss-400) / <alpha-value>)',
          500: 'rgb(var(--moss-500) / <alpha-value>)',
          600: 'rgb(var(--moss-600) / <alpha-value>)',
          700: 'rgb(var(--moss-700) / <alpha-value>)',
          800: 'rgb(var(--moss-800) / <alpha-value>)',
          900: 'rgb(var(--moss-900) / <alpha-value>)',
        },

        // Semantic tokens — theme-aware (see globals.css). Use these for new UI:
        // bg-background, bg-card, border-border, text-text-primary, bg-primary…
        background: 'var(--background)',
        surface: 'var(--surface)',
        'surface-elevated': 'var(--surface-elevated)',
        card: 'var(--card)',
        border: 'var(--border)',
        'border-strong': 'var(--border-strong)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        primary: 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
        'primary-contrast': 'var(--primary-contrast)',
        accent: 'var(--accent)',
        'accent-soft': 'var(--accent-soft)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
        'focus-ring': 'var(--focus-ring)',
      },
      fontFamily: {
        display: [
          'var(--font-display)',
          'Barlow Condensed',
          'Oswald',
          'Roboto Condensed',
          'ui-sans-serif',
          'sans-serif',
        ],
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
