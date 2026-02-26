import { View, Button } from "react-native";
import { useAppStyle } from "@/constants";
import { 
  CustomText, CustomIcon, CustomIconProps
} from "@/components/custom";
import { ThemeProps } from '@/theme';
import { Widget } from '@/components/common/widgets/Widget';;

type NavigationProp = {
  navigate: (screen: string) => void;
};

export type HelpWidgetProps = {
  theme: ThemeProps;
  navigation: NavigationProp;
  onPress?: () => void;
  title?: string;
  message?: string;
  button_title?: string;
};
export const HelpWidget = ({ 
  theme, navigation, 
  title, message, button_title
}: HelpWidgetProps) => {

  const ss = useAppStyle({ theme });
  const handlePress = () => navigation.navigate("Support");
 
  const iconProps: CustomIconProps = {
    iconName: "AntDesign",
    source: "question-circle",
    size: 80,
    style: ss.infoIconRowContent,
  };

  return (
    <Widget style={ss.infoContainer}>
      <View style={ss.container}>
        <CustomText style={[{color: theme.colors.light}, ss.medium]}>{title}</CustomText>
        <View style={ss.infoRowContent}>
          <CustomText style={ss.infoTextRowContent}>{message}</CustomText>
          <CustomIcon {...iconProps} />
        </View>
        <Button title={button_title || "Aller sur Manzowa"} color={theme.colors.secondary} onPress={handlePress}/>
      </View>
    </Widget>
  );
};