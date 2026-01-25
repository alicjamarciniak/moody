import { colors } from './colors';

export interface ThemeColors {
  colors: {
    bg: string;
    primary: string;
    awesome: string;
    good: string;
    okey: string;
    sad: string;
    awful: string;
    light: string;
    dark: string;
  };
}

export const lightTheme = {
  colors: {
    bg: colors.lightYellow[50],
    primary: colors.lightYellow[50],
    awesome: colors.bubblegum[500],
    good: colors.amber[500],
    okey: colors.emerald[500],
    sad: colors.pacific[500],
    awful: colors.dustyGrape[500],
    light: colors.light,
    dark: colors.dark,
  },
};

export const darkTheme = {
  colors: {
    bg: colors.charcoalBlue[950],
    primary: colors.charcoalBlue[500],
    awesome: colors.bubblegum[400],
    good: colors.amber[400],
    okey: colors.emerald[400],
    sad: colors.pacific[400],
    awful: colors.dustyGrape[400],
    light: colors.light,
    dark: colors.dark,
  },
};
