import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { RootStackParamList } from '@/types';
import { AppNavigator } from '@/navigations/AppNavigator';
import { useTheme } from '@/hooks';
import { 
  SchoolScreen, 
  SupportScreen, 
  EventDetailScreen 
} from '@/screens';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <RootStack.Navigator initialRouteName="App"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.light,
      }}
     >
      <RootStack.Screen name="App" component={AppNavigator} options={{ headerShown: false }} />
      <RootStack.Screen name="School" component={SchoolScreen} options={{ title: t('school') }} />
      <RootStack.Screen name="Support" component={SupportScreen} options={{ title: t('support_center')}} />
      <RootStack.Screen name="EventDetail" component={EventDetailScreen} options={{ title: t('event_details') }} />
    </RootStack.Navigator>
  );
}

RootNavigator.displayName = "RootNavigator";