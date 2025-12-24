import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigation } from '@/navigations';
import * as SplashScreen from 'expo-splash-screen';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as Device from 'expo-device';
import {
  StatusBar,
  View,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  AppState,
} from 'react-native';
import NetworkBanner from '@/components/NetworkBanner';
import { Colors, AppStyle } from '@/constants';

// ⛔ Empêche le splash screen de se cacher automatiquement
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  /**
   * Préparation de l’application
   */
  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Charger fonts / assets si nécessaire
      } catch (error) {
        console.warn('Erreur de préparation de l’application :', error);
      } finally {
        setAppIsReady(true);
      }
    };

    prepareApp();
  }, []);

  /**
   * 🔐 Gestion SAFE du verrouillage d’orientation
   */
  useEffect(() => {
    if (!appIsReady) return;
    if (Platform.OS === 'web') return;

    let timeoutId: NodeJS.Timeout | null = null;

    const lockOrientation = async () => {
      try {
        // iOS Simulator n’a pas d’orientation réelle
        if (Platform.OS === 'ios' && !Device.isDevice) {
          console.warn('[Orientation info] Ignoré sur iOS Simulator');
          return;
        }

        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP
        );
      } catch (error) {
        console.warn('[Orientation error]', error);
      }
    };

    const handleAppStateChange = (state: string) => {
      if (state === 'active') {
        // ⏱️ Délai nécessaire sur Android
        timeoutId = setTimeout(lockOrientation, 100);
      }
    };

    // 🔒 Lock initial
    lockOrientation();

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      subscription.remove();

      // 🔓 Libère l’orientation au démontage
      ScreenOrientation.unlockAsync().catch(() => {});
    };
  }, [appIsReady]);

  /**
   * 🎬 Cache le splash screen quand l’app est prête
   */
  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [appIsReady]);

  /**
   * ⏳ Écran de chargement
   */
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

  /**
   * 🚀 Application
   */
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
      >
        <AppNavigation />
      </KeyboardAvoidingView>
    </NavigationContainer>
  );
}