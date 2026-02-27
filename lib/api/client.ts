import axios from "axios";
import { API_BASE_URL } from "../config/env";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 240000,
});

apiClient.interceptors.request.use((config) => {
  // attach token here if needed
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // global error handling
    return Promise.reject(error);
  },
);
