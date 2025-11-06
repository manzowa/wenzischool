import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigation } from '@/navigations';
import * as SplashScreen from 'expo-splash-screen';
import * as ScreenOrientation from 'expo-screen-orientation';
import {
  StatusBar,
  View,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  AppState
} from 'react-native';
import NetworkBanner from '@/components/NetworkBanner';
import { Colors, AppStyle } from '@/constants';

SplashScreen.preventAutoHideAsync().catch(console.warn);

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Tu peux charger ici des ressources si nécessaire
      } catch (e) {
        console.warn('Erreur de préparation de l’application :', e);
      } finally {
        setAppIsReady(true);
      }
    };
    prepareApp();
  }, []);

  // 💡 Appel de lockAsync une fois que l'app est prête + activité active
  useEffect(() => {
    if (!appIsReady) return;

    const lockOrientation = async () => {
      try {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      } catch (err) {
        console.warn('[Orientation error]', err);
      }
    };

    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        setTimeout(lockOrientation, 100); // Donne le temps à l'activité de se stabiliser
      }
    });

    // Appel initial
    lockOrientation();

    return () => subscription.remove();
  }, [appIsReady]);

  // 💡 SplashScreen.hide() uniquement quand tout est prêt
  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync().catch(console.warn);
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <View style={AppStyle.appLoadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={AppStyle.appLoadingText}>
          Chargement de l'application...
        </Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar
        animated
        backgroundColor={Colors.primary}
        barStyle="light-content"
      />
      <NetworkBanner />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <AppNavigation />
      </KeyboardAvoidingView>
    </NavigationContainer>
  );
}