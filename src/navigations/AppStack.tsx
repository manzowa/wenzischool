import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SchoolNavStacK } from '@/navigations/SchoolNavStacK';
import { SchoolScreen, SupportScreen } from '@/screens';
import { RootStackType } from '@/utils/types';
import { Colors } from "@/constants/Colors";

const Stack = createNativeStackNavigator<RootStackType>();
export function AppStack() {
    
    const defaultConfig: any = {
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
        <Stack.Navigator initialRouteName="MainNav">
            <Stack.Screen 
                name="MainNav" 
                component={SchoolNavStacK} 
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="School" 
                component={SchoolScreen} 
                options={defaultConfig.ecole} 
            />
            <Stack.Screen 
                name="Support" 
                component={SupportScreen} 
                options={defaultConfig.support} 
            />
        </Stack.Navigator>
    );
}