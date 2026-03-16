export const tokenStorage = {
  getAccessToken: () =>
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null,

  getRefreshToken: () =>
    typeof window !== "undefined"
      ? localStorage.getItem("refresh_token")
      : null,

  getRefreshJti: () =>
    typeof window !== "undefined" ? localStorage.getItem("refresh_jti") : null,

  setTokens: (
    accessToken: string,
    refreshToken: string,
    refreshJti: string,
  ) => {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("refresh_jti", refreshJti);
  },

  clearTokens: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("refresh_jti");
  },
};
