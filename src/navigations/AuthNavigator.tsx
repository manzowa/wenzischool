import React, { useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomIcon } from "@/components/custom";
import { Platform } from 'react-native';
import { useTheme } from '@/hooks';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/types';
import {
  LoginScreen,
  RegisterScreen
} from '@/screens';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  // ✅ Memoized header font config
  const headerTitleStyle = useMemo(
    () => ({
      fontWeight: 'bold' as const,
      fontFamily: Platform.select({
        ios: 'System',
        android: 'sans-serif',
        default: 'System',
      }),
    }),
    []
  );
  // ✅ Memoized screen options (prevents recreation on every render)
  const screenOptions = useMemo(
    () => ({
      headerTintColor: theme.colors.light,
      headerStyle: {
        backgroundColor: theme.colors.primary,
        elevation: 4,
      },
      headerTitleStyle,
      tabBarStyle: {
        backgroundColor: theme.colors.primary,
        borderTopWidth: 0,
        elevation: 0,
        shadowColor: 'rgba(0, 0, 0, 0.2)', // Ombre subtile
        shadowOpacity: 1, // Ombre visible
        shadowRadius: 5, // Taille de l'ombre
      },
      tabBarLabelStyle: { fontWeight: '600' as const },
      tabBarActiveTintColor: theme.colors.light,
      tabBarInactiveTintColor: theme.colors.light,
      tabBarShowLabel: true,
      tabBarHideOnKeyboard: true,
      lazy: true,
    }),
    [theme, headerTitleStyle]
  );


  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: t('log_in') }}  />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: t('sign_up') }} />
    </Stack.Navigator>
  );
}

AuthNavigator.displayName = 'AuthNavigator';