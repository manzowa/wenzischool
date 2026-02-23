import axios from "axios";
import { API_URL } from "@env";

// --- INSTANCE ---
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// --- OPTIONAL: ADD TOKEN AUTOMATICALLY ---
apiClient.interceptors.request.use(
  async (config) => {
    // Exemple si tu stockes un token dans AsyncStorage
    // const token = await AsyncStorage.getItem("token");

    const token = null; // Change ici si tu récupères un token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- ERROR HANDLER INTERCEPTOR ---
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (__DEV__) {
      console.error("API ERROR:", {
        url: error?.config?.url,
        status: error?.response?.status,
        data: error?.response?.data,
      });
    }

    // tu peux gérer ici les 401, 403, refresh token etc.
    return Promise.reject(error);
  }
);

export default apiClient;
