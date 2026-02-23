import { Colors } from "@/constants";
import type { Theme } from "@react-navigation/native";
import { Fonts } from "@/theme/Fonts";
import {
  fontSize,
  lineHeight,
  radius,
  spacing,
  border
} from '@/constants/typography';

export const images = {
    background: require('../../assets/images/bg.webp'),
    logo: require('../../assets/images/logo-sign.webp'),
    logoHorizontal: require('../../assets/images/horizontal.webp'),
    townIcon: require('../../assets/images/Kinshasa.webp'),
    flagFr: require('../../assets/images/flag-fr.webp'),
    flagEn: require('../../assets/images/flag-en.webp'),
    flagCd: require('../../assets/images/flag-cd.webp')
} as const;


const LightTheme: Theme = {
    dark: false,
    colors: {
        primary: Colors.primary,
        light: Colors.light,
        black: Colors.dark,
        secondary: Colors.secondary,
        success: Colors.success,
        error: Colors.error,
        warning: Colors.warning,
        gray: Colors.gray,
        grayDark: Colors.grayDark,
        grayLight: Colors.grayLight,
        background: Colors.light,
        foreground: Colors.primary,
        card: Colors.light,
        text: Colors.light,
        textDefault: Colors.light,
        border: Colors.primary,
        notification: Colors.warning,
        default: Colors.default
    },
    images: images,
    fonts: Fonts,
    spacing: spacing,
    radius: radius,
    fontSizes: fontSize,
    lineHeights: lineHeight,
    border: border
}

export default LightTheme;