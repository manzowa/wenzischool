import { View } from "react-native";
import { useAppStyle } from "@/constants";
import { CustomText, CustomIcon } from "@/components/custom";
import { ThemeProps } from '@/theme';
import { Widget } from '@/components/common/widgets/Widget';;

export type SupportWidgetProps = {
  theme: ThemeProps;
  title?: string;
  message?: string;
};
export const SupportWidget = ({
  theme, title, message
}: SupportWidgetProps) => {
  const ss = useAppStyle({ theme });

  return (
    <Widget style={ss.flex}>
      <View style={ss.container}>
        <CustomText style={[{ color: theme.colors.primary }, { textAlign: 'left' }]}>{title}</CustomText>
        <View style={ss.supportContent}>
          <CustomIcon
            iconName="AntDesign"
            source="info-circle"
            size={80}
            style={{ color: theme.colors.primary }}
          />
          <CustomText
            type="caption"
            style={{ color: theme.colors.secondary, flex: 1 }}
          >{message} </CustomText>
        </View>
      </View>
    </Widget>
  )
};