import {
  ScrollViewProps,
  ImageBackground, ImageBackgroundProps, ViewStyle,
  Animated, StyleProp,
} from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useAppStyle } from "@/constants";
import { 
  EventContent, 
  EventContentProps 
} from "@/content";
import { 
  useTheme, 
  useFadeScaleAnimation 
} from "@/hooks";


export default function EventScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const ss = useAppStyle({ theme });

  const { animatedStyle } = useFadeScaleAnimation({ duration: 400 });

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
  const bgProps: ImageBackgroundProps = {
    style: ss.flex,
    source: theme.images.background,
    resizeMode: "cover",
  };
  const eventContentProps: EventContentProps = {
    theme: theme,
    scrollViewProps: scrollViewProps,
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={ss.flex}>
        <ImageBackground {...bgProps}>
          <Animated.View style={animatedStyle}>
            <EventContent {...eventContentProps} />
          </Animated.View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}