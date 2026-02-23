import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { ThemeProps} from "@/theme";

export type useThemeResult = {
  theme: ThemeProps;
  mode: 'light' | 'dark'|'system';
  setMode: (mode: 'light' | 'dark' | 'system') => void;
}

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

