import {
  Animated,
  ImageBackground, ImageBackgroundProps,
  StyleProp, ViewStyle, ScrollViewProps,
} from "react-native";
import {
  useSafeAreaInsets,
  SafeAreaView, SafeAreaProvider
} from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  useSchools, useTheme,
  useFadeScaleAnimation
} from "@/hooks";
import { useAppStyle } from "@/constants";
import { AppStackParamList } from "@/types";
import { HomeContent, HomeContentProps } from '@/content';

type HomeScreenProps = NativeStackScreenProps<AppStackParamList, "Home">;

export default function HomeScreen({ 
  navigation }: HomeScreenProps
) {
  const { schools, loading } = useSchools();
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
  };
  const scrollViewProps: ScrollViewProps = {
    contentContainerStyle: scrollStyle,
    contentInsetAdjustmentBehavior: "automatic",
    showsVerticalScrollIndicator: false,
    bounces: false,
  };
  const contentProps: HomeContentProps = {
    schools,
    loading,
    navigation,
    theme,
    scrollViewProps
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={ss.flex}>
        <ImageBackground {...bgProps}>
          <Animated.View style={animatedStyle}>
            <HomeContent {...contentProps} />
          </Animated.View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}