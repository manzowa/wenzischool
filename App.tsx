import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigation } from '@/navigations';
import * as SplashScreen from 'expo-splash-screen';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar, View, Text, ActivityIndicator } from 'react-native';
import NetworkBanner from '@/components/NetworkBanner';
import { Colors, AppStyle } from '@/constants';

// Empêche le splash screen de se cacher automatiquement
SplashScreen.preventAutoHideAsync().catch(console.warn);

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepareApp() {
      try {
        // Verrouille l’orientation par défaut (souvent libre ou système)
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);

        // TODO: Chargez ici vos ressources (fonts, données, etc.) si besoin

      } catch (e) {
        console.warn('Erreur pendant la préparation de l’application :', e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepareApp();

    return () => {
      // Nettoyage : re-verrouille l’orientation en portrait
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP).catch(console.warn);
    };
  }, []);

  // Écran de chargement personnalisé
  if (!appIsReady) {
    return (
      <View style={AppStyle.appLoadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={AppStyle.appLoadingText}>Chargement de l'application...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor={Colors.primary}
        barStyle="light-content"
      />
      <NetworkBanner />
      <AppNavigation />
    </NavigationContainer>
  );
}