"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import Link from "next/link";
import { useEffect, useState } from "react";

type DashboardShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export default function DashboardShell({
  title,
  subtitle,
  children,
}: DashboardShellProps) {
  const { user, requireUser, logoutUser, isHydrated, isAuthenticated } =
    useAuth();
  useEffect(() => {
    requireUser();
  }, []);

  // Use isHydrated to ensure we've checked localStorage before deciding to show content
  if (!isHydrated || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f3fb]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#b08fd9] border-t-transparent"></div>
          <p className="text-sm font-medium text-[#6f5a88]">
            Securing session...
          </p>
        </div>
      </div>
    );
  }
  return (
    <main className="min-h-screen bg-[#f6f3fb] text-[#2b1d3a]">
      <div className="mx-auto max-w-6xl px-6 py-10 space-y-8">
        <header className="rounded-3xl border border-[#e6dcf4] bg-white/90 px-6 py-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#b08fd9] mb-1">
                Snappy‑Fix Dashboard
              </p>
              <h1 className="text-3xl font-semibold">
                {title}, {user?.first_name}!
              </h1>
              <p className="text-sm text-[#6f5a88]">{subtitle}</p>
            </div>

            <nav className="flex items-center gap-2 text-sm">
              <Link
                href="/dashboard"
                className="rounded-full px-4 py-2 text-[#6f5a88] hover:bg-[#f1e9ff] transition-colors"
              >
                Home
              </Link>
              {/* <Link
                href="/dashboard/profile"
                className="rounded-full px-4 py-2 text-[#6f5a88] hover:bg-[#f1e9ff] transition-colors"
              >
                Profile
              </Link> */}

              {/* Profile Shortcut */}
              <div className="h-8 w-[1px] bg-[#e6dcf4] mx-2 hidden md:block" />

              <button
                type="button"
                onClick={logoutUser}
                className="rounded-full bg-[#fb397d] px-6 py-2 text-white font-semibold shadow-md shadow-[#fb397d]/20 hover:bg-[#e02d6b] transition-all active:scale-95"
              >
                Logout
              </button>
            </nav>
          </div>
        </header>

        {/* Content Area */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>
      </div>
    </main>
  );
}
