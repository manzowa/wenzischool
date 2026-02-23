import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const LoginScreen = React.lazy(() => import('@/screens/LoginScreen'));
const RegisterScreen = React.lazy(() => import('@/screens/RegisterScreen'));

const AuthNavigator: React.FC = () =>{
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

AuthNavigator.displayName = 'AuthNavigator';
export { AuthNavigator };