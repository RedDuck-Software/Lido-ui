import { ThemeName } from './constants';
import themeBase from './base';

export type IColors = typeof themeBase.colors & {
  darkThemeOpacity: string;
  lightThemeOpacity: string;

  lightModeVisibility: string;
  darkModeVisibility: string;

  lightDisplay: string;
  darkDisplay: string;

  secondary: string;
  secondaryHover: string;
  secondaryContrast: string;

  background: string;
  backgroundDarken: string;
  backgroundSecondary: string;

  foreground: string;

  overlay: string;

  shadowLight: string;
  shadowDark: string;

  text: string;
  textSecondary: string;
  accentText: string;

  border: string;
  borderActive: string;
  borderHover: string;
  borderLight: string;
  accentBorder: string;
  accentBorderHover: string;

  controlBg: string;
  accentControlBg: string;

  popupMenuItemBgActiveHover: string;
};

export type ITheme = Omit<typeof themeBase, 'colors'> & {
  name: ThemeName;
  colors: IColors;
};

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}
export type ThemeContext = {
  toggleTheme: () => void;
  themeName: ThemeName;
};
