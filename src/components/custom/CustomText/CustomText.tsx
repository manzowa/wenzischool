import React from 'react';
import {
  Text, TextProps,
  StyleSheet, TextStyle
} from 'react-native';
import { Colors, AppStyle } from "@/constants";

type TextVariant =
  | "title" | "titleBold"
  | "subtitle" | "subtitleBold"
  | "body" | "bodyBold"
  | "caption" | "captionBold"
  | "small" | "smallBold"
  | "medium" | "mediumBold";

type TextColor =
  "primary"
  | "secondary"
  | "light"
  | "dark"
  | "error"
  | "warning";

export type CustomTextProps = TextProps & {
  children: React.ReactNode;
  type?: TextVariant;
  color?: TextColor;
};
export const isTextVariant = (value: any): value is TextVariant =>
  [
    "title", "titleBold",
    "subtitle", "subtitleBold",
    "body", "bodyBold",
    "caption", "captionBold",
    "small", "smallBold",
    "medium", "mediumBold",
  ].includes(value);
export const CustomText: React.FC<CustomTextProps> = ({
  children,
  type = "body",
  color = "primary",
  style,
  ...props
}: CustomTextProps) => {

  const textVariants: Record<TextVariant, TextStyle> = {
    title: AppStyle.title,
    titleBold: { ...AppStyle.title, fontWeight: "900" },

    subtitle: AppStyle.subtitle,
    subtitleBold: { ...AppStyle.subtitle, fontWeight: "700" },

    body: AppStyle.body,
    bodyBold: { ...AppStyle.body, fontWeight: "bold" },

    caption: AppStyle.caption,
    captionBold: { ...AppStyle.caption, fontWeight: "bold" },

    small: AppStyle.small,
    smallBold: { ...AppStyle.small, fontWeight: "bold" },

    medium: AppStyle.medium,
    mediumBold: { ...AppStyle.medium, fontWeight: "bold" },
  };

  const textColors: Record<TextColor, TextStyle> = {
    primary: { color: Colors.primary },
    secondary: { color: Colors.secondary },
    light: { color: Colors.light },
    dark: { color: Colors.dark },
    error: { color: Colors.error },
    warning: { color: Colors.warning },
  };

  const variantStyle = textVariants[type] || AppStyle.body;
  const colorStyle = textColors[color] || { color: Colors.primary };

  const combinedStyle = StyleSheet.flatten([
    variantStyle,
    colorStyle,
    style,
  ]);

  return (
    <Text style={combinedStyle} {...props}>
      {children}
    </Text>
  );
};
