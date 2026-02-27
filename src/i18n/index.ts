import i18n from 'i18next'; 
import { initReactI18next } from 'react-i18next'; // Importation de l'intégration React avec i18next
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from '@/locales/en.json';
import fr from '@/locales/fr.json';

const LANGUAGE_KEY = 'user-language';

export const initI18n = async () => {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);

    // Utilisation correcte de `use` avec i18next
    await i18n
        .use(initReactI18next)  // Utilisation de l'intégration React de i18next
        .init({
            resources: {
                en: { translation: en },
                fr: { translation: fr },
            },
            lng: savedLanguage || 'fr', // Par défaut français
            fallbackLng: 'en', // Langue de secours si la langue choisie n'est pas disponible
            interpolation: {
                escapeValue: false, // Pas d'échappement de valeur pour React
            },
        });
};

// Initialisation d'i18next lors du démarrage de l'application
initI18n();

export default i18n;  // Export de i18n pour l'utiliser ailleurs dans l'application