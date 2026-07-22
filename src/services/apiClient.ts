import axios from "axios";
import { API_URL } from "@env";
import { getTokens, saveTokens, deleteTokens } from "@/storage";

// --- INSTANCE ---
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

apiClient.interceptors.request.use(async (config) => {
  let tokens = await getTokens();

  if (tokens) {
    const now = Math.floor(Date.now() / 1000);
    const expiry = tokens.created_at! + tokens.access_token_expires_in;

    if (now >= expiry - 60) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const response = await apiClient.post("/token/refresh", { refresh_token: tokens.refresh_token });
          if (response.data.success) {
            tokens = { ...response.data.data, created_at: Math.floor(Date.now() / 1000) };
            await saveTokens(tokens);
            processQueue(null, tokens.access_token);
          } else {
            await deleteTokens();
            processQueue("Refresh failed", null);
          }
        } catch (err) {
          processQueue(err, null);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            if (config.headers) config.headers.Authorization = `Bearer ${token}`;
            resolve(config);
          },
          reject: (err: any) => reject(err),
        });
      });
    }

    if (config.headers) config.headers.Authorization = `Bearer ${tokens.access_token}`;
  }

  return config;
});

// --- ERROR HANDLER INTERCEPTOR ---
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (__DEV__) console.error("API ERROR:", error.response?.status, error.config?.url);
    return Promise.reject(error);
  }
);

export default apiClient;
