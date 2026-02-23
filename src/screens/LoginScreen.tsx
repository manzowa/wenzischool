import React from "react";
import { View, Button, Text } from 'react-native';
import { useAuth } from '@/context/AuthContext';


export default function LoginScreen({ route }: any) 
{
    const { login } = useAuth();

    const handleLogin = () => {
    // Simulation API
        login({
            id: '1',
            email: 'user@test.com',
        });
    };
    return (
        <View>
            <Text>Connexion</Text>
            <Button title="Se connecter" onPress={handleLogin} />
        </View>
    );
}