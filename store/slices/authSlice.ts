import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/auth-types";

// ✅ Mirror your Go UserType constants
export type UserRole = "USER" | "ADMIN";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
