import { View } from "react-native";
import { useAppStyle } from '@/constants';
import { 
    CustomIcon,CustomIconProps, CustomText
} from "@/components/custom";
import { useTheme } from "@/hooks";

export type BlockWidgetProps = {
    text?: string
    iconName?: any,
    source?: any,
    size?: number,
    color?: string
};

export const BlockWidget = ({text, iconName, source, size= 25, color=""}:BlockWidgetProps) => {
    const { theme } = useTheme();
    const ss = useAppStyle({theme});
    const iconLeftProps: CustomIconProps = {
        iconName: iconName,
        source: source,
        style: [ss.iconAlter],
        size: size,
        color: color,
    };
    const iconRightProps: CustomIconProps = {
        iconName: "Logo",
        source: theme.images.logo,
        style: [ss.icon, ss.blockWidgetTheme],
        size: size,
        color: color,
    };
    
    return(
        <View style={[ss.blockWidgetContainer]}>
            <CustomIcon {...iconLeftProps} />
            <CustomText style={[ss.small, ss.blockWidgetText]}>{text}</CustomText>
            <CustomIcon {...iconRightProps} />
        </View>
    )
};