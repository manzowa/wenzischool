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
    background: require('../../assets/images/dark.webp'),
    logo: require('../../assets/images/logo-sign-dark.webp'),
    logoHorizontal: require('../../assets/images/horizontal-dark.webp'),
    townIcon: require('../../assets/images/Kinshasa-dark.webp'),
    flagFr: require('../../assets/images/flag-fr-dark.webp'),
    flagEn: require('../../assets/images/flag-en-dark.webp'),
    flagCd: require('../../assets/images/flag-cd-dark.webp')
} as const;

const DarkTheme: Theme = {
    dark: true,
    colors: {
        primary: Colors.dark,
        light: Colors.light,
        black: Colors.dark,
        secondary: Colors.gray,
        success: Colors.success,
        error: Colors.error,
        warning: Colors.warning,
        gray: Colors.gray,
        grayDark: Colors.grayDark,
        grayLight: Colors.grayLight,
        background: Colors.light,
        foreground: Colors.dark,
        card: Colors.gray,
        text: Colors.light,
        textDefault: Colors.dark,
        border: Colors.primary,
        notification: Colors.warning,
        default: Colors.default
    },
    images : images,
    fonts: Fonts,
    spacing: spacing,
    radius: radius,
    fontSizes: fontSize,
    lineHeights: lineHeight,
    border: border
}

export default DarkTheme;