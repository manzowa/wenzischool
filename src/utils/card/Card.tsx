import React, { forwardRef } from "react";
import {
  View,
  ViewProps,
  Text,
  TextProps,
  StyleProp,
  ViewStyle
} from "react-native";
import { AppStyle } from "@/constants";


// ==========================
//     FONCTIONS INTERNES
// ==========================

const Root = forwardRef<View, ViewProps>(({ children, style, ...props }, ref) => {
  return (
    <View ref={ref} style={[AppStyle.card, style]} {...props}>
      {children}
    </View>
  );
});
Root.displayName = "Card";

const Header = forwardRef<View, ViewProps>(({ children, style, ...props }, ref) => {
  return (
    <View ref={ref} style={[AppStyle.cardHeader, style]} {...props}>
      {children}
    </View>
  );
});
Header.displayName = "Card.Header";

const Body = forwardRef<View, ViewProps>(({ children, style, ...props }, ref) => {
  return (
    <View ref={ref} style={[AppStyle.cardBody, style]} {...props}>
      {children}
    </View>
  );
});
Body.displayName = "Card.Body";

const Row = forwardRef<View, ViewProps>(({ children, style, ...props }, ref) => {
  return (
    <View ref={ref} style={[AppStyle.cardRow, style]} {...props}>
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
  return (
    <Text ref={ref} style={[AppStyle.cardTitle, style]} {...props}>
      {children}
    </Text>
  );
});
Title.displayName = "Card.Title";

const Subtitle = forwardRef<Text, TextProps>(({ children, style, ...props }, ref) => {
  return (
    <Text ref={ref} style={[AppStyle.cardSubtitle, style]} {...props}>
      {children}
    </Text>
  );
});
Subtitle.displayName = "Card.Subtitle";

const TextComp = forwardRef<Text, TextProps>(({ children, style, ...props }, ref) => {
  return (
    <Text ref={ref} style={[AppStyle.cardText, style]} {...props}>
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
