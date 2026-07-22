import { Suspense, useEffect } from 'react';
import {
  NavigationContainer
} from '@react-navigation/native';
import {
  StatusBar, StatusBarProps, KeyboardAvoidingView,
  KeyboardAvoidingViewProps, Platform
} from 'react-native';
import { useAppStyle } from '@/constants';
import { NetworkBanner, Loading } from '@/components';

import { RootNavigator } from '@/navigations/RootNavigator';
import { useTheme } from '@/hooks';

// const Root = () => {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? <AppNavigator /> : <AuthNavigator />;
// };

function AppContent() {
  const { theme } = useTheme(); // ✅ safe now, inside ThemeProvider
  const ss = useAppStyle({ theme });

  const bgProps: KeyboardAvoidingViewProps = {
    style: ss.flex,
    behavior: Platform.OS === 'ios' ? 'padding' : 'height',
  };
  const statusBarProps: StatusBarProps = {
    animated: true,
    backgroundColor: theme.colors.primary,
    barStyle: 'light-content',
  };

    // ✅ Ajustement de la couleur de la barre de statut pour Android
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBarStyle('light-content'); // Pour un contraste suffisant avec un fond sombre
      StatusBar.setBackgroundColor(theme.colors.primary); // Applique la couleur du thème à la barre de statut
    }
  }, [theme]);

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