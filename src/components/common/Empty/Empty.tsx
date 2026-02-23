import React from 'react';
import { View, Animated, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { CustomIcon, CustomIconProps, CustomText } from '@/components/custom';
import { useTheme, useFadeScaleAnimation } from '@/hooks';

export type EmptyProps = {
    message?: string;
}

const Empty: React.FC<EmptyProps> = ({ message = "Aucune donnée disponible" }: EmptyProps) => {
    const { theme } = useTheme();

    const { animatedStyle } = useFadeScaleAnimation({ duration: 1000 });
    const iconProps: CustomIconProps = {
        iconName: "MaterialIcons",
        source: "image-not-supported",
        size: 40,
        color: theme.colors.default,
    };
    const textStyle: StyleProp<TextStyle> = [{
        color: theme.colors.default,
        fontSize: 14,
        fontStyle: 'italic'
    }];
    const containerStyle: StyleProp<ViewStyle> = [
        {
            backgroundColor: theme.colors.grayLight,
            justifyContent: 'center', 
            alignItems: 'center', height: 200,
            borderRadius: theme.radius.md
        }
    ];

    return (
        <View style={containerStyle}>
            <Animated.View style={animatedStyle} >
                <CustomIcon {...iconProps} />
            </Animated.View>
            <Animated.View style={animatedStyle}>
                <CustomText style={textStyle}>{message}</CustomText>
            </Animated.View>
        </View>
    );
};
export default Empty;