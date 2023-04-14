import themeBase from './base';
import { ThemeName } from './constants';
import { ITheme } from './types';
export const themeLight: ITheme = {
  ...themeBase,
  name: ThemeName.light,
  colors: {
    ...themeBase.colors,
    darkThemeOpacity: '0',
    lightThemeOpacity: '1',

    lightModeVisibility: 'visible',
    darkModeVisibility: 'hidden',

    lightDisplay: 'initial',
    darkDisplay: 'none',

    secondary: '#273852',
    secondaryHover: '#212f45',
    secondaryContrast: '#fff',

    background: '#f2f4f6',
    backgroundDarken: '#ffffff',
    backgroundSecondary: '#EFF2F6',

    foreground: '#fff',

    overlay: 'rgba(0, 0, 0, 0.5)',

    shadowLight: 'rgba(39, 56, 82, 0.08)',
    shadowDark: 'rgba(0, 0, 0, .25)',

    text: '#273852',
    textSecondary: '#7a8aa0',
    accentText: '#273852',

    border: 'rgba(0, 10, 61, 0.12)',
    borderActive: 'rgba(0, 10, 61, 0.48)',
    borderHover: 'rgba(0, 10, 61, 0.24)',
    borderLight: '#dfe5eb',
    accentBorder: 'rgba(0, 10, 61, 0.12)',
    accentBorderHover: 'rgba(0, 10, 61, 0.24)',

    controlBg: '#fff',
    accentControlBg: 'rgba(239, 242, 246, 0.56)',

    popupMenuItemBgActiveHover: '#000a3d',
  },
};

export const themeDark: ITheme = {
  ...themeBase,
  name: ThemeName.dark,
  colors: {
    ...themeBase.colors,
    darkThemeOpacity: '1',
    lightThemeOpacity: '0',

    lightModeVisibility: 'hidden',
    darkModeVisibility: 'visible',

    lightDisplay: 'none',
    darkDisplay: 'initial',

    secondary: 'rgba(255, 255, 255, .8)',
    secondaryHover: '#fff',
    secondaryContrast: '#273852',

    primary: '#192B45',
    primaryContrast: '#17A8FA',
    primaryHover: '#192B50',

    accent: '#06070A',

    background: 'linear-gradient(112.08deg, #3d6585 -19.77%, #000000 56.84%)',
    backgroundDarken: '#06070A',
    backgroundSecondary: '#27272E',

    foreground: '#131823',

    overlay: 'rgba(0, 0, 0, 0.5)',

    shadowLight: 'rgba(0, 0, 0, .25)',
    shadowDark: 'rgba(0, 0, 0, .5)',

    text: '#fff',
    textSecondary: 'rgba(255, 255, 255, .8)',
    accentText: '#fff',

    border: '#2D3853',
    borderActive: 'rgba(255, 255, 255, 0.48)',
    borderHover: 'rgba(255, 255, 255, 0.24)',
    borderLight: '#484855',
    accentBorder: 'rgba(255, 255, 255, 0.12)',
    accentBorderHover: 'rgba(255, 255, 255, 0.24)',

    controlBg: '#131823',
    accentControlBg: 'rgba(39, 39, 46, 0.56)',

    popupMenuItemBgActiveHover: '#fff',
  },
};

export const themeMap: Record<ThemeName, ITheme> = {
  [ThemeName.light]: themeLight,
  [ThemeName.dark]: themeDark,
};

export const reverseThemeMap = new WeakMap([
  [themeLight, ThemeName.light],
  [themeDark, ThemeName.dark],
]);

export const themeDefault = themeLight;
