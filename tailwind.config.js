/** @type {import('tailwindcss').Config} */
import { colors } from './src/theme/colors.ts';

module.exports = {
  darkMode: 'class',
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    fontFamily: { sans: ['Roboto_300Light'] },
    extend: {
      colors: {
        primary: {
          DEFAULT: colors.lightYellow[50],
          dark: colors.charcoalBlue[900],
        },
        awesome: {
          DEFAULT: colors.bubblegum[500],
          dark: colors.bubblegum[400],
        },
        good: {
          DEFAULT: colors.amber[500],
          dark: colors.amber[400],
        },
        okay: {
          DEFAULT: colors.emerald[500],
          dark: colors.emerald[400],
        },
        bad: {
          DEFAULT: colors.pacific[500],
          dark: colors.pacific[400],
        },
        awful: {
          DEFAULT: colors.dustyGrape[500],
          dark: colors.dustyGrape[400],
        },
        light: colors.light,
        dark: colors.dark,
        darkGray: colors.darkGray,
        lightGray: colors.lightGray,
        midGray: colors.midGray,
        dirtyWhite: colors.dirtyWhite,
        darkBlue: colors.darkBlue,
        bubblegum: colors.bubblegum[400],
      },
      fontFamily: {
        roboto: ['Roboto_300Light'],
        'roboto-medium': ['Roboto_500Medium'],
        'roboto-bold': ['Roboto_700Bold'],
      },
    },
  },
  plugins: [],
};
