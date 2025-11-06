import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, EventScreen, SearchScreen} from "@/screens";
import { Colors } from '@/constants';
import { SchoolStackParamList } from "@/utils/types";
import { IconCustom } from "@/utils/custom";
import { Platform } from "react-native";

const SchoolStack = createBottomTabNavigator<SchoolStackParamList>();

const SchoolNavigation: React.FC = () => {
  return (
    <SchoolStack.Navigator screenOptions={({ route }) => 
      (
        {
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.primary,
          headerTintColor: Colors.light,
          headerStyle: { 
            backgroundColor: Colors.primary,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: Platform.select({
              ios: 'System',
              android: 'sans-serif',
              default: 'System',
            }),
          },
        }
      )
    }
    >
      <SchoolStack.Screen 
        name="Home"
        component={HomeScreen} 
        options={{ 
          title: 'Accueil',
          tabBarIcon: ({ color, focused }) => (
            <IconCustom 
              iconName={"Ionicons"}
              source={focused ? 'home-sharp' : 'home-outline'} 
              color={color} size={24} 
            />
          ),
          tabBarLabel: 'Accueil'
        }}
      />
      <SchoolStack.Screen 
        name="Event"
        component={EventScreen} 
        options={{ 
          title: 'Évènement scolaire',
          tabBarIcon: ({ color, focused }) => (
            <IconCustom 
              iconName={"MaterialIcons"}
              source={focused ? 'event' : 'event-note'} 
              color={color} size={24} 
            />
          ),
          tabBarLabel: 'Évènement scolaire'
        }}
      />
      <SchoolStack.Screen 
        name="Search"
        component={SearchScreen} 
        options={{ 
          title: 'Rechercher',
          tabBarIcon: ({ color, focused }) => (
            <IconCustom 
              iconName={"Ionicons"}
              source={focused ? 'search-sharp' : 'search-outline'} 
              color={color} size={24} 
            />
          ),
          tabBarLabel: 'Rechercher'
        }}
      />
    </SchoolStack.Navigator>
  );
}
SchoolNavigation.displayName = "SchoolNavigation";
export { SchoolNavigation };