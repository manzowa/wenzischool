import {
  ScrollView, ScrollViewProps
} from 'react-native';
import { useAppStyle } from '@/constants';
import { Widget } from '@/components/common/widgets/Widget';
import { useThemeResult } from '@/hooks';
import { 
  SettingsThemeWidget,  SettingsThemeWidgetType,
  SettingsAccountWidget, 
  SettingsLanguageWidget, SettingsLanguageWidgetType
} from '@/components/common/widgets';


export type SettingsContentProps = {
  themeOptions: SettingsThemeWidgetType[];
  languageOptions: SettingsLanguageWidgetType[];
  handleChangeTheme: (value: string) => void;
  scrollViewProps?: ScrollViewProps;
  themeResult: useThemeResult;
  navigation?: null;
};

export default function SettingsContent(
  {
    themeOptions, languageOptions,
    handleChangeTheme, scrollViewProps, 
    themeResult, navigation
  }: SettingsContentProps) {
  const { theme } = themeResult;
  const ss = useAppStyle({ theme });

  return (
    <ScrollView {...scrollViewProps}>
      <Widget style={ss.container}>
        <SettingsThemeWidget options={themeOptions} />
        <SettingsLanguageWidget options={languageOptions} />
        {/* <SettingsAccountWidget /> */}
      </Widget>
    </ScrollView>
  );
};