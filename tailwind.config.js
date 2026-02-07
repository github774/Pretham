/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          dark: '#4f46e5',
          light: '#818cf8',
        },
        accent: {
          DEFAULT: '#10b981',
          dark: '#059669',
          light: '#34d399',
        },
        slate: {
          950: '#020617',
        }
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(99, 102, 241, 0.2)',
        'glow-accent': '0 0 20px rgba(16, 185, 129, 0.2)',
      }
    },
  },
  plugins: [],
}
