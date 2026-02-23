import {
    Animated,
    ImageBackground, ImageBackgroundProps,
    ScrollViewProps, StyleProp, ViewStyle
} from "react-native";
import { 
    SafeAreaView, SafeAreaProvider, useSafeAreaInsets 
} from "react-native-safe-area-context";
import { useAppStyle } from "@/constants";
import { useTheme, useFadeScaleAnimation } from '@/hooks';
import { SupportContent, SupportContentProps } from '@/content';

export default function SupportScreen() {
    const { theme } = useTheme();
    const { animatedStyle } = useFadeScaleAnimation({ duration: 400 });
    const insets = useSafeAreaInsets();
    const ss = useAppStyle({theme});

    const bgProps: ImageBackgroundProps = {
        style: ss.flex,
        source: theme.images.background,
        resizeMode: "cover",
    };
    const scrollStyle: StyleProp<ViewStyle> = {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        flexGrow: 1,
        justifyContent: "center"
    };
    const scrollViewProps: ScrollViewProps = {
        contentContainerStyle: scrollStyle,
        contentInsetAdjustmentBehavior: "automatic",
        showsVerticalScrollIndicator: false,
        bounces: false,
    };

    const contentProps: SupportContentProps = {
        theme,
        scrollViewProps
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={ss.flex}>
                <ImageBackground {...bgProps}>
                    <Animated.View style={animatedStyle}>
                        <SupportContent {...contentProps} />
                    </Animated.View>
                </ImageBackground>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}