import { ImageSourcePropType } from 'react-native';
import '@react-navigation/native';

type ImageKey =
  | 'logo'
  | 'logoHorizontal'
  | 'background'
  | 'townIcon'
  | 'flagFr'
  | 'flagEn'
  | 'flagCd';

type ImageType = Partial<Record<ImageKey, ImageSourcePropType>>;

declare module '@react-navigation/native' {
  interface Theme {
    dark: boolean;
    colors: {
      primary: string;
      light: string;
      black: string;
      secondary: string;
      success: string;
      error: string;
      warning: string;
      gray: string;
      grayDark: string;
      grayLight: string;
      background: string;
      foreground: string;
      card: string;
      text: string;
      textDefault: string;
      border: string;
      notification: string;
      default: string;

    };
    images: ImageType;
    fonts: {
      regular: { fontFamily: string; fontWeight: '400' | '500' | '600' | '700' };
      medium: { fontFamily: string; fontWeight: '400' | '500' | '600' | '700' };
      bold: { fontFamily: string; fontWeight: '400' | '500' | '600' | '700' };
      heavy: { fontFamily: string; fontWeight: '400' | '500' | '600' | '700' };
    };
    spacing: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    },
    radius: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      full: number;
    },
    fontSizes: {
      xxs: number;
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    },
    lineHeights: {
      xxs: number;
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    },
    border: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
    }
  }
}
