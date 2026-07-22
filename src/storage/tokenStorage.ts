import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth_tokens";

export const saveTokens = async (tokens: any) => {
  await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(tokens));
};

export const getTokens = async () => {
  const tokens = await SecureStore.getItemAsync(TOKEN_KEY);
  return tokens ? JSON.parse(tokens) : null;
};

export const deleteTokens = async () => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
};