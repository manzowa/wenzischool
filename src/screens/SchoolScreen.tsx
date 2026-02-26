import { useMemo } from 'react';
import {
  SafeAreaView, SafeAreaProvider,
  useSafeAreaInsets
} from "react-native-safe-area-context";
import { useRoute, RouteProp } from "@react-navigation/native";
import {
  Animated,
  ImageBackground, ImageBackgroundProps,
  StyleProp, ViewStyle, ScrollViewProps
} from "react-native";
import { useAppStyle } from "@/constants";
import { useSchool, useTheme, useFadeScaleAnimation } from "@/hooks";
import { SchoolContent, SchoolContentProps } from "@/content";
import {
  SchoolType, ImageType,
  RootStackParamList
} from "@/types";

/**
 * Écran d'affichage des détails d'une école.
 *
 * @param {SchoolScreenProps} props - Propriétés de navigation et de route.
 * @returns {JSX.Element} 
 */
export default function SchoolScreen() {
  const route =  useRoute<RouteProp<RootStackParamList, 'School'>>();
  const { theme } = useTheme();
  const { animatedStyle } = useFadeScaleAnimation({ duration: 400 });
  const { schoolid } = route.params;
  const { school } = useSchool(parseInt(schoolid));
  const insets = useSafeAreaInsets();

  const images: ImageType[] = useMemo(() => school?.images ?? [], [school?.images]);
  const logo: ImageType | undefined = useMemo(() => {
    return images.find((image: ImageType) =>
      image.filename?.toLowerCase().includes('logo')
    );
  }, [images]);
  const horaires = useMemo(() => school?.horaires ?? [], [school?.horaires]);
  const eventements = useMemo(() => school?.evenements ?? [], [school?.evenements]);
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
  const contentProps: SchoolContentProps = {
    school: school as SchoolType,
    images: images,
    logo: logo,
    horaires: horaires,
    evenements: eventements,
    theme: theme,
    scrollViewProps: scrollViewProps,
    navigation: null
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={ss.flex} >
        <ImageBackground {...bgProps}>
          <Animated.View style={animatedStyle}>
            <SchoolContent {...contentProps} />
          </Animated.View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}