// tailwind.config.js
/** @type {import('tailwindcss').Config} */
import tailwindcssPrimeui from 'tailwindcss-primeui';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      primary: '#A74964',
      'primary-dm': '#A74964',
      'primary-light': '#F3C2CF', // Un colore più chiaro basato sul primario

      'on-primary': '#FFFFFF', // Testo chiaro su sfondo primario
      'on-primary-dm': '#FFFFFF',

      'elevation-dark-0': '#1F1F1F',
      'elevation-dark-1': '#2B2B2B',
      'elevation-dark-2': '#373737',

      'elevation-light-0': '#FFFFFF',
      'elevation-light-1': '#F7F7F7',
      'elevation-light-2': '#EFEFEF',

      'neutral-100': '#FFFFFF',
      'neutral-90': '#F5F5F5',
      'neutral-80': '#E0E0E0',
      'neutral-60': '#9E9E9E',
      'neutral-10': '#1F1F1F',

      'on-surface-dark-title': '#FFFFFF',
      'on-surface-dark-subtitle': '#B3B3B3',

      'on-surface-light-title': '#1F1F1F',
      'on-surface-light-subtitle': '#5C5C5C',
      'on-surface-light-1': '#757575', // Testo su livello 1 (chiaro)
      'on-surface-light-2': '#9E9E9E', // Testo su livello 2 (chiaro)
      'on-surface-light-0': '#BDBDBD', // Testo su livello 0 (chiaro)

      red: '#E57373',
      blue: '#64B5F6',
      light: '#FFFFFF',
      gray: '#F5F5F5',
      dark: '#1F1F1F',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      transitionTimingFunction: {
        'bounce-effect': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [tailwindcssPrimeui],
};
