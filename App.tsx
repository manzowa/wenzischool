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
  AppState
} from 'react-native';
import NetworkBanner from '@/components/NetworkBanner';
import { Colors, AppStyle } from '@/constants';

// Prevent auto hide of splash screen
SplashScreen.preventAutoHideAsync().catch(console.warn);

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  /**
   * Prepare app (load resources, fonts, etc.)
   */
  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Charger des ressources si nécessaire
      } catch (e) {
        console.warn('Erreur de préparation de l’application :', e);
      } finally {
        setAppIsReady(true);
      }
    };
    prepareApp();
  }, []);

  /**
   * 🔐 Lock Orientation safely
   */
  useEffect(() => {
    if (!appIsReady) return;

    let timeoutId: NodeJS.Timeout | null = null;
    let isMounted = true;

    const lockOrientation = async () => {
      try {
        if (!isMounted) return;
        if (Platform.OS === 'web') return;
        if (Platform.OS === 'ios' && !Device.isDevice) {
          console.warn('[Orientation info] Ignoré sur iOS Simulator');
          return;
        }

        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP
        );
      } catch (err) {
        console.warn('[Orientation error]', err);
      }
    };

    const handleAppStateChange = (state: string) => {
      if (state === 'active') {
        // Small delay ensures activity is ready on Android
        timeoutId = setTimeout(lockOrientation, 100);
      }
    };

    // Listen for app state changes
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );

    // Initial orientation lock
    lockOrientation();

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
      subscription.remove();
    };
  }, [appIsReady]);

  /**
   * Hide SplashScreen when ready
   */
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
