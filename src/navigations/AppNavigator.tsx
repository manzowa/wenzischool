import { useTranslation } from 'react-i18next';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppStackParamList } from "@/types";
import { CustomIcon } from "@/components/custom";
import { SuspenseWrapper } from '@/components/common/SuspenseWrapper';
import { Platform } from 'react-native';
import { useTheme } from '@/hooks';



const AppStack = createBottomTabNavigator<AppStackParamList>();

// Lazy-loaded screens
const HomeScreen = React.lazy(() => import('@/screens/HomeScreen'));
const EventScreen = React.lazy(() => import('@/screens/EventScreen'));
const SchoolSearchScreen = React.lazy(() => import('@/screens/SchoolSearchScreen'));
const SettingsScreen = React.lazy(() => import('@/screens/SettingsScreen'));

const LazyHomeScreen: React.FC<any> = (props) => (
  <SuspenseWrapper>
    <HomeScreen {...props} />
  </SuspenseWrapper>
);

const LazyEventScreen: React.FC<any> = (props) => (
  <SuspenseWrapper>
    <EventScreen {...props} />
  </SuspenseWrapper>
);

const LazySchoolSearchScreen: React.FC<any> = (props) => (
  <SuspenseWrapper>
    <SchoolSearchScreen {...props} />
  </SuspenseWrapper>
);

const LazySettingsScreen: React.FC<any> = (props) => (
  <SuspenseWrapper>
    <SettingsScreen {...props} />
  </SuspenseWrapper>
);

const AppNavigator: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <AppStack.Navigator screenOptions={({ route }) =>
    (
      {
        headerTintColor: theme.colors.light,
        headerStyle: {
          backgroundColor: theme.colors.primary,
          elevation: 4,
          shadowColor: theme.colors.primary,
          shadowOpacity: 0.1,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 4}
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontFamily: Platform.select({
            ios: 'System',
            android: 'sans-serif',
            default: 'System',
          }),
        },
        tabBarStyle: {
          backgroundColor: theme.colors.primary,
          borderTopWidth: 0,
          elevation: 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontWeight: '600',
        },
        tabBarActiveTintColor: theme.colors.light, // Définit la couleur (icône et texte) de l'onglet actif
        tabBarInactiveTintColor: theme.colors.light, // Définit la couleur (icône et texte) des onglets inactifs
        tabBarShowLabel: true,// masque le texte des onglets
        // // 🔥 Animation douce au changement d’onglet
        tabBarHideOnKeyboard: true,
      }
    )
    }
    >
      <AppStack.Screen
        name="Home"
        component={LazyHomeScreen}
        options={{
          title: t('home'),
          tabBarLabel: t('home'),
          tabBarIcon: ({ color, focused }) => (
            <CustomIcon
              iconName={"Ionicons"}
              source={focused ? 'home-sharp' : 'home-outline'}
              color={color} size={24}
              style={{
                transform: [{ scale: focused ? 1.15 : 1 }],
              }}
            />
          ),

        }}
      />
      <AppStack.Screen
        name="Event"
        component={LazyEventScreen}
        options={{
          title: t('school_event'),
          tabBarLabel: t('school_event'),
          tabBarIcon: ({ color, focused }) => (
            <CustomIcon
              iconName={"Ionicons"}
              source={focused ? 'trophy-sharp' : 'trophy-outline'}
              color={color} size={24}
              style={{
                transform: [{ scale: focused ? 1.15 : 1 }],
              }}
            />
          ),
        }}
      />
      <AppStack.Screen
        name="Search"
        component={LazySchoolSearchScreen}
        options={{
          title: t('search'),
          tabBarLabel: t('search'),
          tabBarIcon: ({ color, focused }) => (
            <CustomIcon
              iconName={"Ionicons"}
              source={focused ? 'search-sharp' : 'search-outline'}
              color={color} size={24}
              style={{
                transform: [{ scale: focused ? 1.15 : 1 }],
              }}
            />
          ),

        }}
      />
      <AppStack.Screen
        name="Settings"
        component={LazySettingsScreen}
        options={{
          title: t('settings'),
          tabBarLabel: t('settings'),
          tabBarIcon: ({ color, focused }) => (
            <CustomIcon
              iconName={"Ionicons"}
              source={focused ? 'settings-sharp' : 'settings-outline'}
              color={color} size={24}
              style={{
                transform: [{ scale: focused ? 1.15 : 1 }],
              }}
            />
          ),

        }}
      />
    </AppStack.Navigator>
  );
}
AppNavigator.displayName = "AppNavigator";
export { AppNavigator };