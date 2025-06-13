import {NavigationContainer} from '@react-navigation/native';
import {AppStack} from '@/navigations';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useEffect} from 'react';
import { Fonts } from '@/constants';
import * as ScreenOrientation from 'expo-screen-orientation';

SplashScreen.preventAutoHideAsync(); 
function App() 
{
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ANY );
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);
  const [fontsLoaded, fontsError] = useFonts({
    'Comfortaa-Bold': Fonts.ComfortaaBold,
    'Comfortaa-Light':  Fonts.ComfortaaLight,
    'Comfortaa-Medium':  Fonts.ComfortaaMedium,
    'Comfortaa-Regular':  Fonts.ComfortaaRegular,
    'Comfortaa-SemiBold':  Fonts.ComfortaaSemiBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);
  
  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}

export default App;