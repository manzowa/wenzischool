import { useEffect } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as Device from 'expo-device';

export function useOrientationLock(enabled: boolean) {
  useEffect(() => {
    if (!enabled || Platform.OS === 'web') return;

    let isMounted = true;
    let timeoutId: NodeJS.Timeout | null = null;

    const lockOrientation = async () => {
      if (!isMounted) return;
      try {
        if (Platform.OS === 'ios' && !Device.isDevice) return;
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP
        );
      } catch (e) {
        console.warn('[Orientation]', e);
      }
    };

    const handleAppStateChange = (state: AppStateStatus) => {
      if (state === 'active') {
        timeoutId = setTimeout(lockOrientation, 50); // plus rapide
      }
    };

    lockOrientation();

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
      subscription.remove();
      ScreenOrientation.unlockAsync().catch(() => {});
    };
  }, [enabled]);
}