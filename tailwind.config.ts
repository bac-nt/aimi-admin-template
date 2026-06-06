import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        primary:   { DEFAULT: 'var(--primary)',   light: 'var(--primary-light)',  dark: 'var(--primary-dark)'  },
        secondary: { DEFAULT: 'var(--secondary)',  light: 'var(--secondary-light)' },
        success:   { DEFAULT: 'var(--success)',    light: 'var(--success-light)'   },
        warning:   { DEFAULT: 'var(--warning)',    light: 'var(--warning-light)'   },
        error:     { DEFAULT: 'var(--error)',      light: 'var(--error-light)'     },
        surface:   'var(--surface)',
        border:    'var(--border)',
        muted:     'var(--muted)',
        'foreground': 'var(--foreground)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        sm: 'var(--radius-sm)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        dropdown: 'var(--shadow-dropdown)',
        button: 'var(--shadow-button)',
      },
      keyframes: {
        'fade-up':    { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        'fade-in':    { from: { opacity: '0' }, to: { opacity: '1' } },
        'slide-left': { from: { transform: 'translateX(-100%)' }, to: { transform: 'translateX(0)' } },
        'bounce-dot': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-4px)' } },
        shimmer:      { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      animation: {
        'fade-up':    'fade-up 0.25s ease forwards',
        'fade-in':    'fade-in 0.2s ease forwards',
        'slide-left': 'slide-left 0.25s ease forwards',
        'bounce-dot': 'bounce-dot 1.2s ease-in-out infinite',
        shimmer:      'shimmer 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
