import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SchoolNavigation } from '@/navigations/SchoolNavigation';
import { SchoolScreen, SupportScreen } from '@/screens';
import { AppStackParamList } from '@/utils/types';
import { Colors } from "@/constants/Colors";


const AppStack = createNativeStackNavigator<AppStackParamList>();
const AppNavigation: React.FC = () => {

    const oConfig: any = {
        default: {
            headerShown: false // Default configuration for all screens
        },
        ecole : {
            title: 'Ecole',
            headerStyle: {
                backgroundColor: Colors.primary,
            },
            headerTintColor: Colors.light,
        },
        support: {
            title: "Centre d’Assistance",
            headerStyle: {
                backgroundColor: Colors.primary,
            },
            headerTintColor: Colors.light,
        },
    };
    return (
        <AppStack.Navigator initialRouteName="App">
            <AppStack.Screen name="App" component={SchoolNavigation} options={oConfig.default} />
            <AppStack.Screen name="School" component={SchoolScreen} options={oConfig.ecole} />
            <AppStack.Screen name="Support" component={SupportScreen} options={oConfig.support} />
        </AppStack.Navigator>
    );
}
AppNavigation.displayName = "AppNavigation";
export { AppNavigation };