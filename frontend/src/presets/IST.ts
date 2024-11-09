import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';

// Definisci i tuoi colori
const primaryColors = {
  50: '#fcf3f8',
  100: '#f9e7f1',
  200: '#f3d0e0',
  300: '#ecb8d0',
  400: '#daa1bc',
  500: '#a74964',
  600: '#8b3b58',
  700: '#743149',
  800: '#5d273b',
  900: '#461e2c',
  950: '#2f141d',
};

const surfaceColors = {
  0: '#ffffff',
  50: '#fdf4f7',
  100: '#fbe9ef',
  200: '#f6d3de',
  300: '#f1bdce',
  400: '#eaa7be',
  500: '#e491ad',
  600: '#c87d99',
  700: '#a46881',
  800: '#815469',
  900: '#5d3f51',
  950: '#392b39',
};

const neutralColors = {
  10: '#f5f5f5',
  20: '#e0e0e0',
  30: '#bdbdbd',
  40: '#9e9e9e',
  50: '#757575',
  60: '#616161',
  70: '#424242',
  80: '#212121',
};

// IST è un preset basato su Aura
// LogiBot
export const IST = definePreset(Aura, {
  semantic: {
    primary: primaryColors,
    surface: surfaceColors,
    neutral: neutralColors,
    colorScheme: {
      light: {
        primary: {
          color: primaryColors[500], // Base primary color
          contrastColor: surfaceColors[0], // White
          hoverColor: primaryColors[600], // Slightly darker primary
          activeColor: primaryColors[700], // Even darker primary
        },
        highlight: {
          background: primaryColors[50], // Lightest primary background
          focusBackground: primaryColors[100], // Lighter primary for focus
          color: primaryColors[700], // Dark primary for highlight text
          focusColor: primaryColors[800], // Darker primary for focus text
        },
      },
      dark: {
        primary: {
          color: primaryColors[50], // Light primary for dark mode
          contrastColor: primaryColors[950], // Very dark for contrast
          hoverColor: primaryColors[100], // Lighter primary on hover
          activeColor: primaryColors[200], // Even lighter primary on active
        },
        highlight: {
          background: primaryColors[50], // Light primary background
          focusBackground: primaryColors[300], // Slightly darker highlight for focus
          color: primaryColors[950], // Dark primary for highlight text
          focusColor: primaryColors[950], // Darker primary for focus text
        },
      },
    },
  },
});

export default IST;
