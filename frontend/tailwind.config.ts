import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0C447C",
          navyDark: '#0f1a30',
          green: '#2e7d32',
          greenLight: '#e8f5e9',
          sky: '#e8f0fe',
        },
      },
      boxShadow: {
        card: '0 4px 20px rgba(0, 0, 0, 0.06)',
        cardHover: '0 8px 40px rgba(0, 0, 0, 0.1)',
        form: '0 8px 40px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-up': 'fadeUp 0.5s ease-out',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
      },
      keyframes: {
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
export default config