import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { saveTokens, getTokens, deleteTokens } from "@/storage";
import apiClient from "@/services/apiClient";


type AuthTokens = {
  session_id: number;
  access_token: string;
  access_token_expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  created_at?: number; // timestamp pour vérifier expiration
};

type AuthContextType = {
  tokens: AuthTokens | null;
  login: (tokens: AuthTokens) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  refreshToken: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tokens, setTokens] = useState<AuthTokens | null>(null);

  useEffect(() => {
    (async () => {
      const stored = await getTokens();
      if (stored) setTokens(stored);
    })();
  }, []);

  // Charger les tokens au démarrage
  useEffect(() => {
    loadTokens();
  }, []);

  const loadTokens = async () => {
    const stored = await getTokens();
    if (stored) setTokens(stored);
  };

  const login = async (tokenData: AuthTokens) => {
    const now = Math.floor(Date.now() / 1000);
    const data = { ...tokenData, created_at: now };
    setTokens(data);
    await saveTokens(data);
  };

  const logout = async () => {
    setTokens(null);
    await deleteTokens();
  };

  // Vérifie si access_token est expiré
  const refreshToken = async () => {
    if (!tokens) return;

    const now = Math.floor(Date.now() / 1000);
    const expiry = tokens.created_at! + tokens.access_token_expires_in;

    if (now < expiry - 60) return; // encore valide

    try {
      const response = await apiClient.post("/token/refresh", { refresh_token: tokens.refresh_token });
      if (response.data.success) {
        await login(response.data.data);
      } else {
        await logout();
      }
    } catch (error) {
      console.error("Refresh token failed", error);
      await logout();
    }
  };


  return (
    <AuthContext.Provider
      value={{ tokens, login, logout, isAuthenticated: !!tokens, refreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
