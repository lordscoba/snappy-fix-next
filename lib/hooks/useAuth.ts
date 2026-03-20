"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { tokenStorage } from "@/lib/utils/tokenStorage";
import { setAuth, clearAuth, UserRole } from "@/store/slices/authSlice";
import { logout as logoutService } from "@/lib/api/services/auth.service";
import { User } from "@/types/auth-types";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );
  const [isHydrated, setIsHydrated] = useState(false);

  // ✅ Rehydrate Redux from localStorage on every mount
  // Covers page refresh where Redux resets but tokens survive
  useEffect(() => {
    const token = tokenStorage.getAccessToken();
    const storedUser = tokenStorage.getUser() as User | null;

    if (token && storedUser && !isAuthenticated) {
      dispatch(setAuth(storedUser)); // ✅ restores user + role into Redux
    }

    setIsHydrated(true);
  }, []); // ✅ run once on mount only

  // ── Role helpers ──────────────────────────────────────────────────────────
  const role = (user?.role ??
    tokenStorage.getUser()?.role ??
    null) as UserRole | null;
  const isAdmin = role === "ADMIN";
  const isUser = role === "USER";

  // ── Guards ────────────────────────────────────────────────────────────────

  // Redirect to login if no token
  const requireAuth = () => {
    const token = tokenStorage.getAccessToken();
    if (!token) router.push("/login");
  };

  // Redirect to dashboard if already logged in (for login/register pages)
  const redirectIfAuthenticated = () => {
    const token = tokenStorage.getAccessToken();
    const storedUser = tokenStorage.getUser() as User | null;
    const userRole = user?.role ?? storedUser?.role;

    if (!token) return;

    // ✅ Role-aware redirect
    if (userRole === "ADMIN") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  };
  // ✅ Redirect to login if not ADMIN — use on admin-only pages
  const requireAdmin = () => {
    const token = tokenStorage.getAccessToken();
    const storedUser = tokenStorage.getUser() as User | null;
    const userRole = user?.role ?? storedUser?.role;

    if (!token) {
      router.push("/login");
      return;
    }
    if (userRole !== "ADMIN") {
      router.push("/unauthorized"); // create this page or use "/"
    }
  };

  // ✅ Redirect if not USER role
  const requireUser = () => {
    const token = tokenStorage.getAccessToken();
    const storedUser = tokenStorage.getUser() as User | null;
    const userRole = user?.role ?? storedUser?.role;

    if (!token) {
      router.push("/login");
      return;
    }
    if (userRole !== "USER") {
      router.push("/unauthorized");
    }
  };

  // ── Auth actions ──────────────────────────────────────────────────────────

  const loginUser = (
    userData: User,
    tokens: { access: string; refresh: string; jti: string },
  ) => {
    tokenStorage.setTokens(tokens.access, tokens.refresh, tokens.jti);
    tokenStorage.setUser(userData); // ✅ persist user for rehydration
    dispatch(setAuth(userData));
  };

  const logoutUser = async () => {
    try {
      await logoutService();
    } finally {
      tokenStorage.clearTokens(); // ✅ clears user too
      dispatch(clearAuth());
      router.push("/login");
    }
  };

  return {
    user,
    isAuthenticated: isAuthenticated || !!tokenStorage.getAccessToken(),
    isHydrated,
    role,
    isAdmin, // ✅ boolean shorthand
    isUser, // ✅ boolean shorthand
    loginUser,
    logoutUser,
    requireAuth,
    requireAdmin, // ✅ new
    requireUser, // ✅ new
    redirectIfAuthenticated,
  };
};

// How to use

// // ── Protect any page ──────────────────────────────────────────────────
// // Generic auth (any logged-in user)
// const { requireAuth, isHydrated } = useAuth();
// useEffect(() => { requireAuth(); }, []);

// // Admin-only page
// const { requireAdmin, isHydrated } = useAuth();
// useEffect(() => { requireAdmin(); }, []);

// // User-only page
// const { requireUser, isHydrated } = useAuth();
// useEffect(() => { requireUser(); }, []);

// // ── Conditional UI ────────────────────────────────────────────────────
// const { isAdmin, isUser, user, isHydrated } = useAuth();

// if (!isHydrated) return <Loader />; // ✅ wait for hydration before rendering

// return (
//   <div>
//     <p>Welcome {user?.first_name}</p>
//     {isAdmin && <AdminPanel />}   // ✅ only renders for ADMIN
//     {isUser && <UserDashboard />} // ✅ only renders for USER
//   </div>
// );

// // ── After login ───────────────────────────────────────────────────────
// const { loginUser } = useAuth();

// const handleLogin = async () => {
//   const res = await login({ email, password });
//   loginUser(res.data.data.user, {
//     access: res.data.data.access_token,
//     refresh: res.data.data.refresh_token,
//     jti: res.data.data.refresh_jti,
//   });
//   // role is now in Redux + localStorage — isAdmin/isUser work immediately
// };
