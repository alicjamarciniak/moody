import { MOOD_KEYS } from '@/types/mood';
import { colors } from './colors';

export interface ThemeColors extends MoodColors {
  bg: string;
  primary: string;
  light: string;
  dark: string;
}

export type MoodKey = (typeof MOOD_KEYS)[number];

export type MoodColors = {
  [K in MoodKey]: string;
};

export const lightTheme = {
  bg: colors.light,
  primary: colors.light,
  awesome: colors.bubblegum[400],
  good: colors.amber[400],
  okay: colors.emerald[600],
  bad: colors.pacific[600],
  awful: colors.dustyGrape[400],
  light: colors.light,
  dark: colors.dark,
};

export const darkTheme = {
  bg: colors.charcoalBlue[900],
  primary: colors.charcoalBlue[500],
  awesome: colors.bubblegum[800],
  good: colors.amber[700],
  okay: colors.emerald[900],
  bad: colors.pacific[800],
  awful: colors.dustyGrape[700],
  light: colors.light,
  dark: colors.dark,
};
