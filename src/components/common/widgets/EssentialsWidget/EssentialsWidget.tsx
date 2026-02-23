
import { View } from "react-native";
import { useAppStyle } from "@/constants";
import { 
  CustomIcon,CustomIconProps, CustomText
} from "@/components/custom";
import { ThemeProps } from '@/theme';
import { Widget } from '@/components/common/widgets/Widget';

type NavigationProp = {
  navigate: (screen: string) => void;
};
export type EssentialsWidgetProps = {
  navigation: NavigationProp;
  theme: ThemeProps;
  message: string;
};
export const EssentialsWidget = ({ 
  navigation, theme, message 
}: EssentialsWidgetProps) => {
  const ss = useAppStyle({ theme });
  const handleSearchPress = () => navigation.navigate("Search");
  const handleEventPress = () => navigation.navigate("Event");

  const iconTrophyProps: CustomIconProps = {
    iconName: "Ionicons",
    source: "trophy-sharp",
    style: ss.icon,
    onPress: handleEventPress,
  };
  const iconSearchProps: CustomIconProps = {
    iconName: "Ionicons",
    source: "search",
    style: ss.icon,
    onPress: handleSearchPress
  };

  return (
    <Widget style={ss.gistContainer}>
      <CustomText style={{ color: theme.colors.secondary }}>{message}</CustomText>
      <View style={ss.gistContent}>
        <CustomIcon {...iconTrophyProps} />
        <CustomIcon {...iconSearchProps} />
      </View>
    </Widget>
  );
};