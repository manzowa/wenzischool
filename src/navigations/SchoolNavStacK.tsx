import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, SearchScreen, NewsScreen } from "@/screens";
import { Colors } from '@/constants';
import { IconCustom, NavBottomTabListType } from "@/utils";

const Tab = createBottomTabNavigator<NavBottomTabListType>();

export function SchoolNavStacK() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => 
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
            fontFamily: 'Comfortaa-SemiBold'
          },
        }
      )
    }
    >
      <Tab.Screen 
        name="Home" component={HomeScreen} 
        options={{ 
          title: 'Accueil',
          tabBarIcon: ({ color, focused }) => (
            <IconCustom 
              iconName={"Ionicons"}
              source={focused ? 'home-sharp' : 'home-outline'} 
              color={color} size={24} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Search" component={SearchScreen} 
        options={{ 
          title: 'Rechercher',
          tabBarIcon: ({ color, focused }) => (
            <IconCustom 
              iconName={"Ionicons"}
              source={focused ? 'search-sharp' : 'search-outline'} 
              color={color} size={24} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="News" component={NewsScreen}
        options={{ 
          title: 'Info Ecole' ,
          tabBarIcon: ({ color, focused }) => (
            <IconCustom 
              iconName={"Ionicons"} 
              source={focused ? 'school-sharp' : 'school-outline'} 
              color={color} size={24} 
            />
          ), 
        }} 
      />
    </Tab.Navigator>
  );
}