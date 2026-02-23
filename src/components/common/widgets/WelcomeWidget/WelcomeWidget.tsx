import { StyleProp , ViewStyle} from "react-native";
import { useAppStyle } from "@/constants";
import { CustomText} from "@/components/custom";
import { ThemeProps } from '@/theme';
import { Widget } from '@/components/common/widgets/Widget';

export type WelcomeWidgetProps = {
  theme: ThemeProps;
  message?: string;
};
export const WelcomeWidget = ({ theme, message }: WelcomeWidgetProps) => {
  const ss = useAppStyle({ theme });
  const containerStyle: StyleProp<ViewStyle> = [
    ss.shadow,
    {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.radius.md,
      padding: theme.spacing.lg,
      margin: theme.spacing.xl
    }
  ];
  return (
    <Widget style={containerStyle}>
      <CustomText color="light" type="caption">{message}</CustomText>
    </Widget>
  );
};