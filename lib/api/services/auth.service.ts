import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  LogoutResponse,
} from "@/types/auth-types";

import { clients } from "../client";
import { WEB_ENDPOINTS } from "../endpoints";

/* ---------------- REGISTER ---------------- */

export const register = async (payload: RegisterRequest) => {
  return clients.golang.post<RegisterResponse>(WEB_ENDPOINTS.register, payload);
};

/* ---------------- LOGIN ---------------- */

export const login = async (payload: LoginRequest) => {
  return clients.golang.post<LoginResponse>(WEB_ENDPOINTS.login, payload);
};

/* ---------------- REFRESH TOKEN ---------------- */

export const refreshToken = async (payload: RefreshTokenRequest) => {
  return clients.golang.post<RefreshTokenResponse>(
    WEB_ENDPOINTS.refreshToken,
    payload,
  );
};

/* ---------------- LOGOUT ---------------- */

export const logout = async () => {
  return clients.golang.post<LogoutResponse>(WEB_ENDPOINTS.logout);
};
