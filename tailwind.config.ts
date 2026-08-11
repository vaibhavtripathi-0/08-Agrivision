import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#F2F7F4',
          100: '#E1ECE5',
          200: '#C3D9CB',
          300: '#9CBDA7',
          400: '#6E9C7E',
          500: '#487A5B',
          600: '#345D44',
          700: '#2A4B37',
          800: '#1E3A2B',
          900: '#13281C',
          950: '#0A170F',
        },
        harvest: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#F59E0B',
          500: '#D97706',
          600: '#B45309',
          700: '#92400E',
          800: '#78350F',
          900: '#451A03',
        },
        earth: {
          50: '#FAF8F5',
          100: '#F5F0E6',
          200: '#EADFC9',
          300: '#D4C4A8',
          400: '#B8A383',
          500: '#9A8262',
          600: '#7C6649',
          700: '#614E38',
          800: '#483A2A',
          900: '#2D2319',
        },
        slateDark: {
          800: '#151E1A',
          900: '#0D1311',
          950: '#070A09',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(19, 40, 28, 0.06), 0 2px 6px -1px rgba(19, 40, 28, 0.04)',
        'elevated': '0 12px 32px -4px rgba(19, 40, 28, 0.12), 0 4px 12px -2px rgba(19, 40, 28, 0.06)',
        'glow-green': '0 0 25px -5px rgba(52, 93, 68, 0.3)',
      }
    },
  },
  plugins: [],
};
export default config;
