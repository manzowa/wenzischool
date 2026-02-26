import { useEffect } from 'react';
import * as InAppUpdates from 'expo-in-app-updates';
import { Platform } from 'react-native';

export function useAndroidAppUpdate() {

  useEffect(() => {
    if (Platform.OS === 'android') {
      checkForAppUpdate();
    }
  }, []);

  const checkForAppUpdate = async () => {
    try {
      const result = await InAppUpdates.checkForUpdate();
      // console.log('Update result:', result);

      if (result.updateAvailable && !result.updateInProgress) {

        if (result.flexibleAllowed) {
          // false = FLEXIBLE
          await InAppUpdates.startUpdate(false);
        }
        else if (result.immediateAllowed) {
          // true = IMMEDIATE
          await InAppUpdates.startUpdate(true);
        }
      }
    } catch (error) {
      console.log('Update error:', error);
    }
  };
}