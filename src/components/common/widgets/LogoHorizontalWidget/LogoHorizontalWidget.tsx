import { StyleProp, ViewStyle } from "react-native";
import { Image, ImageProps } from "expo-image";
import { ThemeProps } from '@/theme';
import { Widget } from '@/components/common/widgets/Widget';

export type LogoHorizontalWidgetProps = {
  theme: ThemeProps,
  image: ImageProps
  containerStyle?: StyleProp<ViewStyle>
}
export const LogoHorizontalWidget = ({ 
  image, theme, containerStyle
}: LogoHorizontalWidgetProps) => {

  const style: StyleProp<ViewStyle> = [
    containerStyle,
    {
      flex: 1, 
      margin: theme.spacing.xl, 
      padding: theme.spacing.xs 
    }
  ];
  return (
    <Widget style={style}>
      <Image { ...image } />
    </Widget>
  )
};
