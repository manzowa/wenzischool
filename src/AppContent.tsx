import { Suspense } from 'react';
import {
  NavigationContainer
} from '@react-navigation/native';
import { 
  StatusBar, StatusBarProps, KeyboardAvoidingView, 
  KeyboardAvoidingViewProps, Platform 
} from 'react-native';
import { useAppStyle } from '@/constants';
import {NetworkBanner, Loading} from '@/components';

import { RootNavigator } from '@/navigations/RootNavigator';
import { useTheme } from '@/hooks';

function AppContent() {
    const { theme } = useTheme(); // ✅ safe now, inside ThemeProvider
    const ss = useAppStyle({theme});

    const bgProps: KeyboardAvoidingViewProps = {
      style: ss.flex,
      behavior: Platform.OS === 'ios' ? 'padding' : 'height',
    };
    const statusBarProps: StatusBarProps = {
      animated: true,
      backgroundColor: theme.colors.primary,
      barStyle: 'light-content',
    };

  return (
    <NavigationContainer theme={theme}>
      <StatusBar {...statusBarProps} />
      <NetworkBanner />
      <KeyboardAvoidingView {...bgProps}>
        <Suspense fallback={<Loading />}>
          <RootNavigator />
        </Suspense>
      </KeyboardAvoidingView>
    </NavigationContainer>
  );
}

export default AppContent;