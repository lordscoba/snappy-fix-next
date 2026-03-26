import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { API_BASE_URL, MAIN_API_BASE_URL } from "../config/env";
import { tokenStorage } from "@/lib/utils/tokenStorage";
import { WEB_ENDPOINTS } from "./endpoints";
import { RefreshTokenResponse } from "@/types/auth-types";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 240000,
});

const mainApiClient = axios.create({
  baseURL: MAIN_API_BASE_URL,
  timeout: 240000,
});

const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = tokenStorage.getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
};

apiClient.interceptors.request.use(requestInterceptor);
mainApiClient.interceptors.request.use(requestInterceptor);

let isRefreshing = false;
type QueueItem = {
  resolve: (token: string) => void;
  reject: (error: any) => void;
};
let failedQueue: QueueItem[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token ?? "");
  });
  failedQueue = [];
};

// Factory — each client gets its OWN response interceptor
//    so retries go back through the SAME client that made the original request
const attachResponseInterceptor = (client: AxiosInstance) => {
  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: any) => {
      const originalRequest = error.config;

      if (error.response?.status !== 401 || originalRequest._retry) {
        return Promise.reject(error);
      }

      // Exact match — not includes() — prevents false positives
      const isRefreshCall = originalRequest.url === WEB_ENDPOINTS.refreshToken;
      if (isRefreshCall) {
        tokenStorage.clearTokens();
        if (typeof window !== "undefined") window.location.href = "/login";
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // Queue the request and retry with new token when refresh completes
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return client(originalRequest); // ✅ same client
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const rfToken = tokenStorage.getRefreshToken();
        const rfJti = tokenStorage.getRefreshJti();

        if (!rfToken || !rfJti) {
          throw new Error("No refresh token available");
        }

        // Always use mainApiClient for refresh — it's a golang endpoint
        const response = await mainApiClient.post<RefreshTokenResponse>(
          WEB_ENDPOINTS.refreshToken,
          { refresh_jti: rfJti, refresh_token: rfToken },
        );

        const { access_token, refresh_token, refresh_jti } = response.data.data;

        tokenStorage.setTokens(access_token, refresh_token, refresh_jti);
        processQueue(null, access_token);

        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return client(originalRequest); // retry on same client
      } catch (err) {
        processQueue(err, null);
        tokenStorage.clearTokens();
        if (typeof window !== "undefined") window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    },
  );
};

attachResponseInterceptor(apiClient);
attachResponseInterceptor(mainApiClient);

export const clients = {
  fastapi: apiClient,
  golang: mainApiClient,
};
