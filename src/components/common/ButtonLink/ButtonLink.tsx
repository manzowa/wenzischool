import { useCallback } from "react";
import { Linking, Alert } from "react-native";
import { CustomButton } from "@/components/custom";
import { useTheme } from "@/hooks";

type ButtonLinkProps = {
  url: string;
  children: string;
  style?: any;
};
export const ButtonLink = ({ url, children, style }: ButtonLinkProps) => {
  const { theme } = useTheme();
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);
  return (
    <CustomButton
      title={children}
      onPress={handlePress}
      colorText={theme.colors.light}
      style={style}
      textStyle={{ fontWeight: "bold" }}
    />
  );
};
