import { useTranslation } from 'react-i18next';
import {
  ImageBackground, ImageBackgroundProps,
  Animated, StyleProp, ViewStyle, ScrollViewProps
} from 'react-native';
import {
  SafeAreaProvider, SafeAreaView,
  useSafeAreaInsets
} from 'react-native-safe-area-context';
import { useAppStyle } from '@/constants';
import {
  SettingsContent,
  SettingsContentProps
} from '@/content';
import { useTheme, useFadeScaleAnimation } from '@/hooks';
import { 
  SettingsThemeWidgetType, 
  SettingsLanguageWidgetType 
} from '@/components/common/widgets';

export default function SettingsScreen() 
{
  const { t } = useTranslation();
  const { theme, mode, setMode } = useTheme();
  const { animatedStyle } = useFadeScaleAnimation({ duration: 400 });
  const insets = useSafeAreaInsets();
  const ss = useAppStyle({ theme });

  const btnBottomColor: StyleProp<ViewStyle> = {
    borderBottomColor: theme.colors.primary,
    borderBottomWidth: 1,
    borderEndEndRadius: 8,
    borderStartEndRadius: 8,
  }

  // Définir les options du thème
  const themeOptions: SettingsThemeWidgetType[] = [
    {
      icon: {
        iconName: "MaterialCommunityIcons", 
        source: "theme-light-dark",
        size: 18, 
        color: theme.colors.primary
      },
      radio: {
        value: 'system',
        label: t('automatic'),
        onPress: () => { },
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.primary,
        color: theme.colors.secondary,
        style: btnBottomColor
      }
    },
    {
      icon: { 
        iconName: "Ionicons", 
        source: "sunny-sharp", 
        size: 18, 
        color: theme.colors.primary 
      },
      radio: {
        value: 'light',
        label: t('light'),
        onPress: () => { },
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.primary,
        color: theme.colors.secondary,
        style: btnBottomColor
      }

    },
    {
      icon: { iconName: "Ionicons", source: "moon-sharp", size: 18, color: theme.colors.primary },
      radio: {
        value: 'dark',
        label: t('dark'),
        onPress: () => { },
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.primary,
        color: theme.colors.secondary,
      }
    },
  ];
  // Définir Les option du langue
  const languageOptions: SettingsLanguageWidgetType[] = [
    {
      icon: {
        iconName: "Logo",
        source: theme.images.flagFr,
        size: 20,
        style: [ss.settingsWidgetFlag]
      },
      radio: {
        value: 'fr',
        label: t('fr'),
        onPress: () => { },
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.primary,
        color: theme.colors.secondary,
        style: btnBottomColor
      },
      
    },
    {
      icon: {
        iconName: "Logo",
        source: theme.images.flagEn,
        size: 20,
        style: [ss.settingsWidgetFlag]
      },
      radio: {
        value: 'en',
        label: t('en'),
        onPress: () => { },
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.primary,
        color: theme.colors.secondary,
      },
    }
  ];
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

  const contentProps: SettingsContentProps = {
    themeOptions,
    languageOptions,
    scrollViewProps,
    themeResult: {
      theme,
      mode,
      setMode
    }
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={ss.flex}>
        <ImageBackground {...bgProps}>
          <Animated.View style={animatedStyle}>
            <SettingsContent {...contentProps} />
          </Animated.View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
