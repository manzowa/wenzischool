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

export type InfoWidgetProps = {
  theme: ThemeProps;
  navigation: NavigationProp;
  onPress?: () => void;
  title?: string;
  message?: string;
  button_title?: string;
};
export const InfoWidget = ({ 
  theme, navigation, 
  title, message, button_title
}: InfoWidgetProps) => {

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
        <CustomText color="light">{title}</CustomText>
        <View style={ss.infoRowContent}>
          <CustomText type="caption" style={ss.infoTextRowContent}>{message}</CustomText>
          <CustomIcon {...iconProps} />
        </View>
        <Button title={button_title || "Aller sur Manzowa"} color={theme.colors.secondary} onPress={handlePress}/>
      </View>
    </Widget>
  );
};