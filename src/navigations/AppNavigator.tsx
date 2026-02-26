import React, { useMemo, useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { AppStackParamList } from "@/types";
import { CustomIcon } from "@/components/custom";
import { Platform } from 'react-native';
import { useTheme } from '@/hooks';
import {
  HomeScreen, EventScreen,
  SchoolSearchScreen, SettingsScreen
} from '@/screens';

const AppStack = createBottomTabNavigator<AppStackParamList>();


export const AppNavigator = () => {
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
        elevation: 10,
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
  const iconFuncStyle = (focused: boolean) => ({
    transform: [{ scale: focused ? 1.15 : 1 }],
  });
  // ✅ Reusable icon renderer
  const renderIcon = useCallback(
    (focused: boolean, color: string, active: string, inactive: string) => (
      <CustomIcon
        iconName={"Ionicons"}
        source={focused ? active : inactive}
        color={color}
        size={24}
        style={iconFuncStyle(focused)}
      />
    ), []);



  return (
    <AppStack.Navigator screenOptions={screenOptions}>
      <AppStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: t('home'),
          tabBarLabel: t('home'),
          tabBarIcon: ({ color, focused }) => (
            renderIcon(focused, color, 'home-sharp', 'home-outline')
          ),

        }}
      />
      <AppStack.Screen
        name="Event"
        component={EventScreen}
        options={{
          title: t('school_event'),
          tabBarLabel: t('school_event'),
          tabBarIcon: ({ color, focused }) => (
            renderIcon(focused, color, 'trophy-sharp', 'trophy-outline')
          ),
        }}
      />
      <AppStack.Screen
        name="Search"
        component={SchoolSearchScreen}
        options={{
          title: t('search'),
          tabBarLabel: t('search'),
          tabBarIcon: ({ color, focused }) => (
            renderIcon(focused, color, 'search-sharp', 'search-outline')
          ),

        }}
      />
      <AppStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: t('settings'),
          tabBarLabel: t('settings'),
          tabBarIcon: ({ color, focused }) => (
            renderIcon(focused, color, 'settings-sharp', 'settings-outline')
          ),

        }}
      />
    </AppStack.Navigator>
  );
}
AppNavigator.displayName = "AppNavigator";