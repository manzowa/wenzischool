import { View } from "react-native";
import { useAppStyle } from "@/constants";
import { CustomText, CustomIcon } from "@/components/custom";
import { ThemeProps } from '@/theme';
import { Widget } from '@/components/common/widgets/Widget';;

export type AssistanceTechniqueWidgetProps = {
  theme: ThemeProps;
  title?: string;
  message?: string;
};
export const AssistanceTechniqueWidget = ({
  theme, title, message
}: AssistanceTechniqueWidgetProps) => {
  const ss = useAppStyle({ theme });

  return (
    <Widget style={ss.flex}>
      <View style={ss.container}>
        <CustomText style={[{ color: theme.colors.primary }, { textAlign: 'left' }, ss.medium]}>{title}</CustomText>
        <View style={ss.supportContent}>
          <CustomIcon
            iconName="AntDesign"
            source="info-circle"
            size={80}
            style={{ color: theme.colors.primary }}
          />
          <CustomText style={[{ color: theme.colors.secondary, flex: 1 }, ss.extraSmall]}>{message} </CustomText>
        </View>
      </View>
    </Widget>
  )
};