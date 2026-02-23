import React, { createContext, useState, useEffect, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";
import { LightTheme, DarkTheme } from "@/theme";

type ThemeMode = "light" | "dark" | "system";
type ResolvedThemeMode = Exclude<ThemeMode, "system">;


type ThemeContextType = {
    theme: typeof LightTheme | typeof DarkTheme;
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "@app_theme_mode";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const systemScheme = useColorScheme();

    const [mode, setMode] = useState<ThemeMode>("system");

    // 🎯 Détermine le thème réellement utilisé
    const resolvedMode: ResolvedThemeMode = systemScheme === "dark" ? "dark" : "light"
    const activeMode = mode === "system" ? resolvedMode : mode;


    const theme = useMemo(() => (activeMode === "dark" ? DarkTheme : LightTheme), [activeMode]);


    // ✅ Charger le mode sauvegardé
    useEffect(() => {
        const loadTheme = async () => {
            try {
                const storedMode = await AsyncStorage.getItem(STORAGE_KEY);
                if (
                    storedMode === "light" ||
                    storedMode === "dark" ||
                    storedMode === "system"
                ) {
                    setMode(storedMode);
                }
            } catch (e) {
                console.error("Failed to load theme mode:", e);
            }
        };
        loadTheme();
    }, []);

    // ✅ Sauvegarder le mode
    useEffect(() => {
        const saveThme = async () => {
            try {
                await AsyncStorage.setItem(STORAGE_KEY, mode);
            } catch (e) {
                console.error("Failed to save theme mode:", e);
            }
        };
        saveThme();
    }, [mode]);

    return (
        <ThemeContext.Provider value={{ theme, mode, setMode }} >
            {children}
        </ThemeContext.Provider>
    );
}