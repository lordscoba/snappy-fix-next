"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/services/auth.service"; // Adjust path
import { useAuth } from "@/lib/hooks/useAuth";

export const LoginComponent = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { loginUser, redirectIfAuthenticated, isHydrated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // ✅ Wait for hydration before checking — prevents flash redirect on refresh
  useEffect(() => {
    if (isHydrated) redirectIfAuthenticated();
  }, [isHydrated]); //

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login(form);
      const { access_token, refresh_token, refresh_jti, user } =
        response.data.data;

      // 1. Store tokens
      // tokenStorage.setTokens(access_token, refresh_token, refresh_jti);

      // Use the hook to log in
      loginUser(user, {
        access: access_token,
        refresh: refresh_token,
        jti: refresh_jti,
      });

      setSuccessMessage("Login successful! Redirecting to dashboard...");

      // Wait 3 seconds then redirect
      setTimeout(() => {
        if (user.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      }, 3000);

      // Force a refresh if you aren't using a global state manager to update UI
      router.refresh();
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Invalid email or password. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // If we are checking for a token, show a clean loading state or nothing
  if (!isHydrated) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#b08fd9] border-t-transparent" />
      </div>
    );
  }

  return (
    <section className="w-full max-w-md rounded-3xl border border-[#e7ddf2] bg-white/90 shadow-[0_20px_60px_rgba(17,24,39,0.15)] backdrop-blur">
      <div className="px-8 pb-8 pt-10">
        <header className="space-y-2 text-center">
          <Link href="/">
            <Image
              src="/images/logo/snappy-fix-logo.webp"
              alt="Logo"
              width={112}
              height={112}
              priority
              className="mx-auto w-24 sm:w-28 md:w-32 lg:w-36 h-auto"
            />
          </Link>
          <h1 className="text-3xl font-semibold text-[#2b1d3a]">
            Welcome back
          </h1>
          <p className="text-sm text-[#6f5a88]">
            Enter your credentials to access your account
          </p>
        </header>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-[#3e2a55]">
              Email Address
            </span>
            <input
              id="email"
              type="email"
              required
              placeholder="name@company.com"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-2xl border border-[#e1d6f3] bg-white px-4 py-3 text-sm text-[#2b1d3a] outline-none transition focus:border-[#b08fd9] focus:ring-4 focus:ring-[#e9dbff]"
            />
          </label>

          <label className="block space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-[#3e2a55]">
                Password
              </span>
              <Link
                href="/forgot-password"
                target="_blank"
                className="text-xs text-[#c3003a] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-2xl border border-[#e1d6f3] bg-white px-4 py-3 text-sm text-[#2b1d3a] outline-none transition focus:border-[#b08fd9] focus:ring-4 focus:ring-[#e9dbff]"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-[#2b1d3a] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2b1d3a]/30 transition hover:translate-y-[-1px] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {error && (
          <div className="mt-6 bg-red-50 border border-red-100 text-red-600 p-3 rounded-xl text-xs">
            ⚠️ {error}
          </div>
        )}
        {/* Status Messages */}
        {successMessage && (
          <div className="mt-6 bg-green-50 border border-green-100 text-green-600 p-4 rounded-xl text-sm font-medium animate-pulse">
            ✅ {successMessage}
          </div>
        )}
        <div className="mt-6 text-center text-sm text-[#6f5a88]">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-[#c3003a] hover:underline"
          >
            Create one
          </Link>
        </div>
      </div>
    </section>
  );
};
