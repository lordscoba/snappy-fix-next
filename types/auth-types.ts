export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
  created_at: string;
  updated_at: string;
  is_email_verified?: boolean;
  is_phone_verified?: boolean;
  date_of_birth?: string;
};

/* ---------------- REGISTER ---------------- */

export type RegisterRequest = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  date_of_birth: string;
  phone_number: string;
};

export type RegisterResponse = {
  status: string;
  code: number;
  message: string;
  data: {
    user: User;
  };
};

/* ---------------- LOGIN ---------------- */

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  status: string;
  code: number;
  message: string;
  data: {
    access_token: string;
    access_token_expires_in: number;
    refresh_token: string;
    refresh_token_expires_in: number;
    refresh_jti: string;
    token_type: string;
    device_token: string;
    device_type: string;
    user: User;
  };
};

/* ---------------- REFRESH TOKEN ---------------- */

export type RefreshTokenRequest = {
  refresh_jti: string;
  refresh_token: string;
};

export type RefreshTokenResponse = {
  status: string;
  code: number;
  message: string;
  data: {
    access_token: string;
    access_token_expires_in: number;
    refresh_jti: string;
    refresh_token: string;
    refresh_token_expires_in: number;
  };
};

/* ---------------- LOGOUT ---------------- */

export type LogoutResponse = {
  status: string;
  code: number;
  message: string;
  data: {};
};
