import React from 'react';
import {
  Text, TextProps,
  StyleSheet
} from 'react-native';


export type CustomTextProps = TextProps & {
  children?: React.ReactNode;
};

  
export const CustomText: React.FC<CustomTextProps> = ({
  children,
  style,
  ...props
}: CustomTextProps) => {

  const combinedStyle = StyleSheet.flatten([
    style,
  ]);

  return (
    <Text style={combinedStyle} {...props}>
      {children}
    </Text>
  );
};
