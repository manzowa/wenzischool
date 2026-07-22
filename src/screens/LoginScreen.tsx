import React from "react";
import {
    SafeAreaView, SafeAreaProvider,
    useSafeAreaInsets
} from "react-native-safe-area-context";
import {
    Animated,
    ImageBackground, ImageBackgroundProps,
    StyleProp, ViewStyle, ScrollViewProps,
    View, Button, Text
} from "react-native";
import {
    useTheme, useFadeScaleAnimation
} from "@/hooks";
import { useAppStyle } from "@/constants";
// import { useAuth } from '@/context/AuthContext';
import { LoginContent, LoginContentProps } from '@/content';



export default function LoginScreen() {
    const { theme } = useTheme();
    const { animatedStyle } = useFadeScaleAnimation({ duration: 400 });
    const insets = useSafeAreaInsets();
    const ss = useAppStyle({ theme });

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
    };

    const scrollViewProps: ScrollViewProps = {
        contentContainerStyle: scrollStyle,
        contentInsetAdjustmentBehavior: "automatic",
        showsVerticalScrollIndicator: false,
        bounces: false,
    };
    const contentProps: LoginContentProps = {
        theme,
        scrollViewProps
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={ss.flex} >
                <ImageBackground {...bgProps}>
                    <Animated.View style={animatedStyle}>
                       <LoginContent {...contentProps} />
                    </Animated.View>
                </ImageBackground>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}