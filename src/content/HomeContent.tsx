import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  ScrollView, ScrollViewProps,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  Widget,
  WelcomeWidget, WelcomeWidgetProps,
  SchoolWidget, SchoolWidgetProps,
  HelpWidget, HelpWidgetProps,
  AssistanceTechniqueWidget, AssistanceTechniqueWidgetProps,
  LogoHorizontalWidget,
  LogoHorizontalWidgetProps,
  EssentialsWidget, EssentialsWidgetProps, 
} from "@/components/common/widgets";
import { AppStackParamList } from "@/types";
import { ThemeProps } from "@/theme";
import { useAppStyle } from "@/constants/Styles";


type HomeNavigationProps = NativeStackNavigationProp<AppStackParamList, "Home">;

export type HomeContentProps = {
  theme: ThemeProps;
  schools: any[];
  loading: boolean;
  navigation: HomeNavigationProps;
  scrollViewProps?: ScrollViewProps;
};

export default function HomeContent({
  schools, loading, navigation,
  theme, scrollViewProps
}: HomeContentProps) {
  const { t } = useTranslation();
  const ss = useAppStyle({ theme });

  const welcomeWidgetProps: WelcomeWidgetProps = {
    theme: theme,
    message: t('welcome_message')
  };
  const logoHorizontalWidgetProps: LogoHorizontalWidgetProps = {
    theme: theme,
    image: {
      source: theme.images.logoHorizontal,
      style: ss.logo,
    },

  };
  const essentialsWidgetProps: EssentialsWidgetProps = {
    navigation: navigation,
    theme: theme,
    message: t('essentials_message')
  };
  const schoolWidgetProps: SchoolWidgetProps = {
    data: schools,
    title: t('recently_added'),
    message: t('no_school')
  };
  const helpWidgetProps: HelpWidgetProps = {
    theme: theme,
    navigation: navigation,
    title: t('info_help_title'),
    message: t('info_help_message'),
    button_title: t('info_help_button')
  };
  const assistanceTechniqueWidgetProps: AssistanceTechniqueWidgetProps = {
    theme: theme,
    title: t('support_title'),
    message: t('support_message')
  };


  return (
    <ScrollView {...scrollViewProps}>
      <LogoHorizontalWidget {...logoHorizontalWidgetProps}  />
      <WelcomeWidget {...welcomeWidgetProps} />
      <EssentialsWidget {...essentialsWidgetProps} />
      <Widget style={ss.container}>
        {
          loading ?
            (<ActivityIndicator size="large" color={theme.colors.primary} />)
            : (<SchoolWidget {...schoolWidgetProps} />)
        }
      </Widget>
      <HelpWidget {...helpWidgetProps} />
      <AssistanceTechniqueWidget {...assistanceTechniqueWidgetProps} />
    </ScrollView>
  );
}
