/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0A0A',
          800: '#111418',
          700: '#1C2127',
          600: '#2A2F37',
        },
        brand: {
          DEFAULT: '#10B981',
          dark: '#059669',
          light: '#34D399',
          tint: '#ECFDF5',
        },
        canvas: '#FFFFFF',
        mist: '#F6F7F9',
        line: '#E5E7EB',
        warn: '#F59E0B',
        warntint: '#FFFBEB',
        danger: '#EF4444',
        wa: {
          header: '#075E54',
          teal: '#128C7E',
          green: '#25D366',
          sent: '#DCF8C6',
          bg: '#ECE5DD',
          tick: '#34B7F1',
        },
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,24,40,0.04), 0 1px 3px rgba(16,24,40,0.06)',
        cardlg: '0 4px 12px rgba(16,24,40,0.06), 0 12px 32px rgba(16,24,40,0.06)',
        glow: '0 0 0 4px rgba(16,185,129,0.12)',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.125rem',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.6s linear infinite',
        pulseDot: 'pulseDot 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
