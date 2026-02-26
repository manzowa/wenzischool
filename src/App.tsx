import {AppLoading } from '@/components/common/Loading/AppLoading';
import { 
  useAppInit, useOrientationLock,
  useAndroidAppUpdate 
} from '@/hooks';
import { AuthProvider, ThemeProvider } from '@/context';
import AppContent from '@/AppContent';


export default function App() {
  const { isReady } = useAppInit();
  useOrientationLock(isReady);
  //useAndroidAppUpdate();
  return (
    <AuthProvider>
      <ThemeProvider>
        {isReady ? <AppContent /> : <AppLoading />}
      </ThemeProvider>
    </AuthProvider>
  );
}