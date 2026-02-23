import React, { forwardRef } from "react";
import {
  View,
  ViewProps,
  Text,
  TextProps,
  StyleProp,
  ViewStyle
} from "react-native";
import { useAppStyle } from "@/constants";
import { useTheme } from "@/hooks";


// ==========================
//     FONCTIONS INTERNES
// ==========================

const Root = forwardRef<View, ViewProps>(({ children, style, ...props }, ref) => {

  const { theme } = useTheme();
  const ss =useAppStyle({theme});

  return (
    <View ref={ref} style={[ss.card, style]} {...props}>
      {children}
    </View>
  );
});
Root.displayName = "Card";

const Header = forwardRef<View, ViewProps>(({ children, style, ...props }, ref) => {
  
  const { theme } = useTheme();
  const ss = useAppStyle({theme});

  return (
    <View ref={ref} style={[ss.cardHeader, style]} {...props}>
      {children}
    </View>
  );
});
Header.displayName = "Card.Header";

const Body = forwardRef<View, ViewProps>(({ children, style, ...props }, ref) => {
  const { theme } = useTheme();
  const ss =useAppStyle({theme});

  return (
    <View ref={ref} style={[ss.cardBody, style]} {...props}>
      {children}
    </View>
  );
});
Body.displayName = "Card.Body";

const Row = forwardRef<View, ViewProps>(({ children, style, ...props }, ref) => {
  const { theme } = useTheme();
  const ss = useAppStyle({theme});
  return (
    <View ref={ref} style={[ss.cardRow, style]} {...props}>
      {children}
    </View>
  );
});
Row.displayName = "Card.Row";

type CardFlexProps = ViewProps & {
  flex?: number;
};

const Flex = forwardRef<View, CardFlexProps>(
  ({ children, flex = 1, style, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[{ flex, padding: 2 } as StyleProp<ViewStyle>, style]}
        {...props}
      >
        {children}
      </View>
    );
  }
);
Flex.displayName = "Card.Flex";

const Title = forwardRef<Text, TextProps>(({ children, style, ...props }, ref) => {
  const { theme } = useTheme();
  const ss = useAppStyle({theme});

  return (
    <Text ref={ref} style={[ss.cardTitle, style]} {...props}>
      {children}
    </Text>
  );
});
Title.displayName = "Card.Title";

const Subtitle = forwardRef<Text, TextProps>(({ children, style, ...props }, ref) => {
  const { theme } = useTheme();
  const ss = useAppStyle({theme});

  return (
    <Text ref={ref} style={[ss.cardSubtitle, style]} {...props}>
      {children}
    </Text>
  );
});
Subtitle.displayName = "Card.Subtitle";

const TextComp = forwardRef<Text, TextProps>(({ children, style, ...props }, ref) => {
  const { theme } = useTheme();
  const ss = useAppStyle({theme});

  return (
    <Text ref={ref} style={[ss.cardText, style]} {...props}>
      {children}
    </Text>
  );
});
TextComp.displayName = "Card.Text";

// ==========================
//      EXPORT COMPOSANT
// ==========================

export const Card = Object.assign(Root, {
  Header,
  Body,
  Row,
  Flex,
  Title,
  Subtitle,
  Text: TextComp,
});
