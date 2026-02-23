import LightTheme from "./Light";
import DarkTheme from "./Dark";
export{  LightTheme, DarkTheme };
export { Fonts } from './Fonts';


export const themes = {
  dark: DarkTheme,
  light: LightTheme,
};

export type ThemeProps = typeof LightTheme | typeof DarkTheme;
