export const tokenStorage = {
  getAccessToken: () =>
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null,

  getRefreshToken: () =>
    typeof window !== "undefined"
      ? localStorage.getItem("refresh_token")
      : null,

  getRefreshJti: () =>
    typeof window !== "undefined" ? localStorage.getItem("refresh_jti") : null,

  // ✅ Store user so role survives page refresh
  getUser: () => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem("auth_user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  setTokens: (
    accessToken: string,
    refreshToken: string,
    refreshJti: string,
  ) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("refresh_jti", refreshJti);
  },

  // ✅ Separate user setter so it can be called after login
  setUser: (user: object) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("auth_user", JSON.stringify(user));
  },

  clearTokens: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("refresh_jti");
    localStorage.removeItem("auth_user"); // ✅ clear user too
  },
};
