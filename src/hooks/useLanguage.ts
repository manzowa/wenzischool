import { useEffect, useState } from 'react';
import i18n, { initI18n } from '@/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Language = 'fr' | 'en';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('fr');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        await initI18n(); // 👈 attend que i18n soit initialisé
        const saved = await AsyncStorage.getItem('user-language');
        if (saved === 'fr' || saved === 'en') {
          setLanguage(saved);
          await i18n.changeLanguage(saved);
        } else {
          await i18n.changeLanguage('fr');
        }
      } catch (err) {
        console.log('Erreur chargement langue:', err);
      } finally {
        setLoading(false);
      }
    };
    loadLanguage();
  }, []);

  const changeLanguage = async (lang: Language) => {
    try {
      setLanguage(lang);
      await AsyncStorage.setItem('user-language', lang);
      await i18n.changeLanguage(lang);
    } catch (err) {
      console.log('Erreur changement langue:', err);
    }
  };

  return { language, changeLanguage, loading };
};