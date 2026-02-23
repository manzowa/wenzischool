import { useTranslation } from 'react-i18next';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppNavigator } from '@/navigations/AppNavigator';
import { RootStackParamList } from '@/types';
import { useTheme } from '@/hooks';


// Lazy-loaded screens
const SchoolScreen = React.lazy(() => import('@/screens/SchoolScreen'));
const SupportScreen = React.lazy(() => import('@/screens/SupportScreen'));
const EventDetailScreen = React.lazy(() => import('@/screens/EventDetailScreen'));


const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const oConfig: any = {
    default: {
      headerShown: false // Default configuration for all screens
    },
    ecole: {
      title: t("school"),
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
      headerTintColor: theme.colors.light,
    },
    support: {
      title: t("support_center"),
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
      headerTintColor: theme.colors.light,
    },
    event: {
      title: t('event_details'),
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
      headerTintColor: theme.colors.light,
    }
  };
  return (
    <RootStack.Navigator initialRouteName="App">
      <RootStack.Screen name="App" component={AppNavigator} options={oConfig.default} />
      <RootStack.Screen name="School" component={SchoolScreen} options={oConfig.ecole} />
      <RootStack.Screen name="Support" component={SupportScreen} options={oConfig.support} />
      <RootStack.Screen name="EventDetail" component={EventDetailScreen} options={oConfig.event} />
    </RootStack.Navigator>
  );
}

RootNavigator.displayName = "RootNavigator";
export { RootNavigator };