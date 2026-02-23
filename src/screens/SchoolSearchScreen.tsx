import {
  ImageBackground, ImageBackgroundProps,
  ScrollViewProps,
  Animated, StyleProp, ViewStyle
} from "react-native";
import {
  SafeAreaView, SafeAreaProvider,
  useSafeAreaInsets
} from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAppStyle } from "@/constants";
import {
  SchoolSearchContent,
  SchoolSearchContentProps
} from "@/content";
import { AppStackParamList } from "@/types";
import {
  useTheme,
  useFadeScaleAnimation
} from "@/hooks";

type SearchScreenProp = NativeStackScreenProps<AppStackParamList, "Search">;
export default function SchoolSearchScreen({ navigation }: SearchScreenProp) {
  const insets = useSafeAreaInsets();
  const { animatedStyle } = useFadeScaleAnimation({ duration: 400 });
  const { theme } = useTheme();
  const ss = useAppStyle({ theme });

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
  const searchContentProps: SchoolSearchContentProps = {
    navigation: navigation,
    theme: theme,
    scrollViewProps: scrollViewProps
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={ss.flex}>
        <ImageBackground {...bgProps}>
          <Animated.View style={animatedStyle}>
            <SchoolSearchContent {...searchContentProps} />
          </Animated.View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}