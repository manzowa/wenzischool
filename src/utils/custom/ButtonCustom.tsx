import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from "react-native";
import { AppStyle } from "@/constants";

type ButtonCustomProps = {
  title: string;
  colorText?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  testID?: string;
};

export const ButtonCustom: React.FC<ButtonCustomProps> = ({
  title,
  colorText = "#000",
  style,
  textStyle,
  onPress,
  disabled = false,
  testID,
}) => {
  return (
    <TouchableOpacity
      style={[
        AppStyle.button,
        style,
        disabled && AppStyle.disabled,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
      testID={testID}
    >
      <Text style={[AppStyle.medium, { color: colorText }, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
ButtonCustom.displayName = "ButtonCustom";
