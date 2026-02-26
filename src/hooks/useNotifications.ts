import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const useNotifications = () => {
    const [enabled, setEnabled] = useState(false);

    // Charger la valeur sauvegardée au démarrage
    useEffect(() => {
        AsyncStorage.getItem('user-notificationsEnabled').then(value => {
            if (value !== null) setEnabled(value === 'true');
        });
    }, []);

    // Fonction pour basculer le switch et sauvegarder
    const toggle = async () => {
        const newValue = !enabled;
        setEnabled(newValue);
        await AsyncStorage.setItem('user-notificationsEnabled', newValue.toString());
    };
    return { enabled, toggle };
}