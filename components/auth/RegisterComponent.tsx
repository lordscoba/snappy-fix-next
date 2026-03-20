"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/api/services/auth.service"; // Adjust path
import { RegisterRequest } from "@/types/auth-types";
import { useAuth } from "@/lib/hooks/useAuth";

// Professional Country Codes
const COUNTRY_CODES = [
  { code: "+234", label: "NG" },
  { code: "+1", label: "US" },
  { code: "+44", label: "UK" },
  { code: "+233", label: "GH" },
];

export const RegisterComponent = () => {
  const router = useRouter();
  const { redirectIfAuthenticated, isHydrated } = useAuth();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    country_code: "+234",
    date_of_birth: "",
    agree: false,
  });

  const [isManualCountryCode, setIsManualCountryCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // --- AUTH CHECK ---
  useEffect(() => {
    redirectIfAuthenticated();
  }, [redirectIfAuthenticated]);

  const validatePassword = (password: string) => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return hasLetter && hasNumber;
  };

  // Create a helper for the border color
  const getPasswordBorderClass = () => {
    if (form.password.length === 0) return "border-[#e1d6f3]"; // Default
    return validatePassword(form.password)
      ? "border-green-500 focus:border-green-600 focus:ring-green-100"
      : "border-red-500 focus:border-red-600 focus:ring-red-100";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    // Handle Country Code logic
    if (id === "country_code") {
      if (value === "other") {
        setIsManualCountryCode(true);
        setForm((prev) => ({ ...prev, country_code: "+" })); // Start with +
        return;
      }
      setForm((prev) => ({ ...prev, country_code: value }));
      return;
    }

    // Phone validation (numbers only)
    if (id === "phone_number") {
      const onlyNums = value.replace(/[^0-9]/g, "");
      setForm((prev) => ({ ...prev, [id]: onlyNums }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // New Password check
    if (!validatePassword(form.password)) {
      setError("Password must contain both letters and numbers.");
      return;
    }

    if (!form.agree) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload: RegisterRequest = {
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        password: form.password,
        phone_number: `${form.country_code}${form.phone_number}`,
        date_of_birth: form.date_of_birth,
      };

      await register(payload);
      // Show success message
      setSuccessMessage(
        "Account created successfully! Redirecting to login...",
      );

      // Wait 3 seconds then redirect
      setTimeout(() => {
        router.push("/login?registered=true");
      }, 3000);
    } catch (err: any) {
      console.log("Error: ", err.response?.data?.message);
      setError(
        err.response?.data?.message ||
          "Registration failed. Please check your details.",
      );
    } finally {
      setLoading(false);
    }
  };

  // --- LOADER ---
  // If useAuth is still checking for an existing token, show a loader
  if (!isHydrated) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#b08fd9] border-t-transparent"></div>
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
              alt="Snappy-Fix Technologies logo"
              width={112}
              height={112}
              priority
              className="mx-auto w-24 sm:w-28 md:w-32 lg:w-36 h-auto"
            />
          </Link>
          <h1 className="text-3xl font-semibold text-[#2b1d3a]">
            Create account
          </h1>
          <p className="text-sm text-[#6f5a88]">
            Let’s get you set up in minutes
          </p>
        </header>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-[#3e2a55]">
                First name
              </span>
              <input
                id="first_name"
                required
                placeholder="Ada"
                value={form.first_name}
                onChange={handleChange}
                className="w-full rounded-2xl border border-[#e1d6f3] bg-white px-4 py-3 text-sm text-[#2b1d3a] outline-none transition focus:border-[#b08fd9] focus:ring-4 focus:ring-[#e9dbff]"
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-[#3e2a55]">
                Last name
              </span>
              <input
                id="last_name"
                required
                placeholder="Lovelace"
                value={form.last_name}
                onChange={handleChange}
                className="w-full rounded-2xl border border-[#e1d6f3] bg-white px-4 py-3 text-sm text-[#2b1d3a] outline-none transition focus:border-[#b08fd9] focus:ring-4 focus:ring-[#e9dbff]"
              />
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-[#3e2a55]">
              Work email
            </span>
            <input
              id="email"
              type="email"
              required
              placeholder="you@snappyfix.com"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-2xl border border-[#e1d6f3] bg-white px-4 py-3 text-sm text-[#2b1d3a] outline-none transition focus:border-[#b08fd9] focus:ring-4 focus:ring-[#e9dbff]"
            />
          </label>

          {/* Professional Phone Section */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-[#3e2a55]">
              Phone Number
            </span>
            <div className="flex gap-2 items-start">
              {/* Country Code Selection Column */}
              <div className="flex flex-col gap-1 w-28">
                {!isManualCountryCode ? (
                  <select
                    id="country_code"
                    value={form.country_code}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-[#e1d6f3] bg-white px-3 py-3 text-sm text-[#2b1d3a] outline-none transition focus:border-[#b08fd9] focus:ring-4 focus:ring-[#e9dbff]"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.label} ({c.code})
                      </option>
                    ))}
                    <option value="other">Other...</option>
                  </select>
                ) : (
                  <>
                    <input
                      id="country_code"
                      type="text"
                      placeholder="+..."
                      value={form.country_code}
                      maxLength={4}
                      onChange={handleChange}
                      autoFocus
                      className="w-full rounded-2xl border border-[#b08fd9] bg-white px-3 py-3 text-sm text-[#2b1d3a] outline-none transition focus:ring-4 focus:ring-[#e9dbff]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setIsManualCountryCode(false);
                        setForm((prev) => ({ ...prev, country_code: "+234" }));
                      }}
                      className="text-[10px] font-bold text-[#fb397d] text-left px-1 hover:text-[#e02d6b] transition-colors"
                    >
                      ← Back to list
                    </button>
                  </>
                )}
              </div>

              {/* Phone Number Input Column */}
              <div className="flex-1">
                <input
                  id="phone_number"
                  type="text"
                  required
                  placeholder="8123456789"
                  value={form.phone_number}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#e1d6f3] bg-white px-4 py-3 text-sm text-[#2b1d3a] outline-none transition focus:border-[#b08fd9] focus:ring-4 focus:ring-[#e9dbff]"
                />
              </div>
            </div>
          </div>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-[#3e2a55]">
              Date of Birth
            </span>
            <input
              id="date_of_birth"
              type="date"
              required
              value={form.date_of_birth}
              onChange={handleChange}
              className="w-full rounded-2xl border border-[#e1d6f3] bg-white px-4 py-3 text-sm text-[#2b1d3a] outline-none transition focus:border-[#b08fd9] focus:ring-4 focus:ring-[#e9dbff]"
            />
          </label>

          <label className="block space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-[#3e2a55]">
                Create password
              </span>
              {form.password.length > 0 && (
                <span
                  className={`text-[10px] font-bold uppercase ${validatePassword(form.password) ? "text-green-600" : "text-red-500"}`}
                >
                  {validatePassword(form.password)
                    ? "Strong Password"
                    : "Needs Letter & Number"}
                </span>
              )}
            </div>
            <input
              id="password"
              type="password"
              required
              placeholder="Minimum 8 characters"
              value={form.password}
              onChange={handleChange}
              className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm text-[#2b1d3a] outline-none transition focus:ring-4 ${getPasswordBorderClass()}`}
            />
          </label>

          <label className="flex items-start gap-2 text-sm text-[#6f5a88]">
            <input
              id="agree"
              type="checkbox"
              checked={form.agree}
              onChange={handleChange}
              className="mt-1 h-4 w-4 rounded border-[#d4c6ea]"
            />
            I agree to Snappy-fix terms and the privacy policy.
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-[#2b1d3a] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2b1d3a]/30 transition hover:translate-y-[-1px] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>
        {/* Status Messages */}
        {successMessage && (
          <div className="mt-6 bg-green-50 border border-green-100 text-green-600 p-4 rounded-xl text-sm font-medium animate-pulse">
            ✅ {successMessage}
          </div>
        )}
        {error && (
          <div className="mt-6 bg-red-50 border border-red-100 text-red-600 p-3 rounded-xl text-xs">
            ⚠️ {error}
          </div>
        )}

        <div className="mt-6 text-center text-sm text-[#6f5a88]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#fb397d] hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </section>
  );
};
