import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { API_BASE_URL, MAIN_API_BASE_URL } from "../config/env";
import { tokenStorage } from "@/lib/utils/tokenStorage";
import { WEB_ENDPOINTS } from "./endpoints";
import { RefreshTokenResponse } from "@/types/auth-types";

/* ---------------- CLIENTS ---------------- */

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 240000,
});

const mainApiClient = axios.create({
  baseURL: MAIN_API_BASE_URL,
  timeout: 240000,
});

/* ---------------- REQUEST INTERCEPTOR ---------------- */

const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = tokenStorage.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

apiClient.interceptors.request.use(requestInterceptor);
mainApiClient.interceptors.request.use(requestInterceptor);

/* ---------------- RESPONSE INTERCEPTOR ---------------- */

let isRefreshing = false;
type QueueItem = {
  resolve: (token: string) => void;
  reject: (error: any) => void;
};

let failedQueue: QueueItem[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else if (token !== null) prom.resolve(token);
    else prom.resolve(""); // Handle the case when token is null
  });

  failedQueue = [];
};

const responseSuccess = (response: AxiosResponse) => response;

const responseError = async (error: any) => {
  const originalRequest = error.config as InternalAxiosRequestConfig & {
    _retry?: boolean;
  };

  if (
    error.response?.status === 401 &&
    !originalRequest._retry &&
    !originalRequest.url?.includes(WEB_ENDPOINTS.refreshToken)
  ) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axios(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = tokenStorage.getRefreshToken();
      const refreshJti = tokenStorage.getRefreshJti();

      const response = await apiClient.post<RefreshTokenResponse>(
        WEB_ENDPOINTS.refreshToken,
        {
          refresh_jti: refreshJti,
          refresh_token: refreshToken,
        },
      );

      const newAccessToken = response.data.data.access_token;
      const newRefreshToken = response.data.data.refresh_token;
      const newRefreshJti = response.data.data.refresh_jti;

      tokenStorage.setTokens(newAccessToken, newRefreshToken, newRefreshJti);

      processQueue(null, newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return axios(originalRequest);
    } catch (err) {
      processQueue(err, null);

      tokenStorage.clearTokens();

      window.location.href = "/login";

      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }

  return Promise.reject(error);
};

apiClient.interceptors.response.use(responseSuccess, responseError);
mainApiClient.interceptors.response.use(responseSuccess, responseError);

export const clients = {
  fastapi: apiClient,
  golang: mainApiClient,
};
