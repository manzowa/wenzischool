// theme/fonts.ts
import { Platform } from 'react-native';
import { WEB_FONT_STACK } from '@/constants';
import type { Theme } from '@react-navigation/native';

// type FontStyle = Theme['fonts']['regular'];

const createFonts = (): Theme['fonts'] => ({
  regular: {
    fontFamily:
      Platform.OS === 'web' ? WEB_FONT_STACK : Platform.OS === 'ios' ? 'System' : 'sans-serif',
    fontWeight: '400',
  },
  medium: {
    fontFamily:
      Platform.OS === 'web' ? WEB_FONT_STACK : Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
    fontWeight: '500',
  },
  bold: {
    fontFamily:
      Platform.OS === 'web' ? WEB_FONT_STACK : Platform.OS === 'ios' ? 'System' : 'sans-serif',
    fontWeight: '600',
  },
  heavy: {
    fontFamily:
      Platform.OS === 'web' ? WEB_FONT_STACK : Platform.OS === 'ios' ? 'System' : 'sans-serif',
    fontWeight: '700',
  },
});

export const Fonts = createFonts();
