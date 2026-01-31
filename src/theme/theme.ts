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
  awesome: colors.amber[400],
  good: colors.emerald[600],
  okay: colors.greenGray[300],
  bad: colors.pacific[600],
  awful: colors.dustyGrape[400],
  light: colors.light,
  dark: colors.dark,
};

export const darkTheme = {
  bg: colors.charcoalBlue[900],
  primary: colors.charcoalBlue[500],
  awesome: colors.amber[700],
  good: colors.emerald[800],
  okay: colors.greenGray[700],
  bad: colors.pacific[800],
  awful: colors.dustyGrape[700],
  light: colors.light,
  dark: colors.dark,
};
