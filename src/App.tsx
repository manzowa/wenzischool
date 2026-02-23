import {AppLoading } from '@/components/common/Loading/AppLoading';
import { useAppInit } from '@/hooks';
import { useOrientationLock } from '@/hooks/useOrientationLock';
import { AuthProvider, ThemeProvider } from '@/context';
import AppContent from '@/AppContent';


export default function App() {
  const { isReady } = useAppInit();
  useOrientationLock(isReady);

  return (
    <AuthProvider>
      <ThemeProvider>
        {isReady ? <AppContent /> : <AppLoading />}
      </ThemeProvider>
    </AuthProvider>
  );
}