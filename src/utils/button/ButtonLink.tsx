import { useCallback } from "react";
import { Linking, Alert } from "react-native";
import { ButtonCustom} from "@/utils/custom";
import { Colors } from "@/constants";

type ButtonLinkProps = {
    url: string;
    children: string;
    style?: any;
};
export const ButtonLink = ({url, children, style}: ButtonLinkProps) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);
  return (
    <ButtonCustom 
      title={children} 
      onPress={handlePress} 
      colorText={Colors.light}
      style={style}
      textStyle={{ fontWeight: "bold" }}
    />
  );
};
