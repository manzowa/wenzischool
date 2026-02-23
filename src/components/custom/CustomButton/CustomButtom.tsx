import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from "react-native";
import { AppStyle, useAppStyle} from "@/constants";
import { useTheme } from "@/hooks";


export type CustomButtonProps = {
  title: string;
  colorText?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  testID?: string;
};

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  colorText = "#000",
  style,
  textStyle,
  onPress,
  disabled = false,
  testID,
}) => {
  const { theme } = useTheme();
  const ss =useAppStyle({theme});

  return (
    <TouchableOpacity
      style={[ss.button, style, disabled && AppStyle.disabled]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
      testID={testID}
    >
      <Text style={[ss.small, { color: colorText }, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
CustomButton.displayName = "CustomButton";
