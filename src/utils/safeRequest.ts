export async function safeRequest<T>(callback: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await callback();
  } catch (error) {
    if (__DEV__) console.warn("safeRequest error:", error);
    return fallback;
  }
}