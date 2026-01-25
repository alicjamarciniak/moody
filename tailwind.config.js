/** @type {import('tailwindcss').Config} */
import { colors } from './src/theme/colors.ts';

module.exports = {
  darkMode: 'class',
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: colors.lightYellow[50],
          dark: colors.charcoalBlue[950],
        },
        awesome: {
          DEFAULT: colors.bubblegum[500],
          dark: colors.bubblegum[400],
        },
        good: {
          DEFAULT: colors.amber[500],
          dark: colors.amber[400],
        },
        okey: {
          DEFAULT: colors.emerald[500],
          dark: colors.emerald[400],
        },
        sad: {
          DEFAULT: colors.pacific[500],
          dark: colors.pacific[400],
        },
        awful: {
          DEFAULT: colors.dustyGrape[500],
          dark: colors.dustyGrape[400],
        },
        light: colors.light,
        dark: colors.dark,
      },
    },
  },
  plugins: [],
};
