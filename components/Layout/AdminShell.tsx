"use client";

import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import AdminFooter from "./AdminFooter";
import Image from "next/image";
import { useAuth } from "@/lib/hooks/useAuth";

const NavGroup = ({
  item,
  onItemClick,
}: {
  item: any;
  onItemClick: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubItems = item.subItems && item.subItems.length > 0;

  return (
    <div className="space-y-1">
      {hasSubItems ? (
        // Collapsible Header
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-[#6f5a88] transition-all hover:bg-[#f1e9ff] hover:text-[#2b1d3a]"
        >
          <div className="flex items-center gap-3">
            <span>{item.icon}</span>
            {item.label}
          </div>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      ) : (
        // Regular Link
        <Link
          href={item.href}
          onClick={onItemClick}
          className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-[#6f5a88] transition-all hover:bg-[#f1e9ff] hover:text-[#2b1d3a]"
        >
          <span>{item.icon}</span>
          {item.label}
        </Link>
      )}

      {/* Sub-items list */}
      {hasSubItems && isOpen && (
        <div className="ml-9 space-y-1 border-l border-[#eee4fb] pl-2">
          {item.subItems.map((sub: any) => (
            <Link
              key={sub.label}
              href={sub.href}
              onClick={onItemClick}
              className="block rounded-xl px-4 py-2 text-xs font-medium text-[#6f5a88] hover:text-[#2b1d3a] hover:bg-[#faf7ff]"
            >
              {sub.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

type AdminShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export default function AdminShell({
  title,
  subtitle,
  children,
}: AdminShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: "📊" },
    { label: "Usage Logs", href: "/admin/usage-logs", icon: "📊" },

    {
      label: "Blog",
      icon: "📰",
      subItems: [
        { label: "View All", href: "/admin/blog" },
        { label: "Create Post", href: "/admin/blog/create" },
      ],
    },
    {
      label: "Category",
      icon: "📂",
      subItems: [
        { label: "View All", href: "/admin/category" },
        { label: "Create", href: "/admin/category/create" },
      ],
    },
    {
      label: "Images",
      icon: "🖼️",
      subItems: [
        { label: "View All", href: "/admin/images" },
        { label: "Upload", href: "/admin/images/create" },
      ],
    },
    { label: "Contact Us", href: "/admin/contact-us", icon: "📧" },
    { label: "Settings", href: "/admin/settings", icon: "⚙️" },
  ];

  const { user, requireAdmin, logoutUser, isHydrated, isAuthenticated } =
    useAuth();
  useEffect(() => {
    requireAdmin();
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

  const SidebarContent = () => {
    const firstName = user?.first_name ?? "";
    const lastName = user?.last_name ?? "";
    const initials =
      firstName && lastName
        ? `${firstName[0]}${lastName[0]}`.toUpperCase()
        : firstName
          ? firstName[0].toUpperCase()
          : "A";
    const displayName = firstName
      ? `${firstName} ${lastName}`.trim()
      : "Admin User";

    return (
      <>
        {/* ── Logo ── */}
        <div className="mb-10 px-2 gap-3">
          <Link href={"/"}>
            <div className="flex flex-row items-center gap-3">
              <Image
                src="/images/logo/snappy-fix-logo.webp"
                alt="Logo"
                width={56}
                height={56}
                priority
                className="w-24 sm:w-10 md:w-14 lg:w-16"
              />
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#b08fd9]">
                Snappy-fix
              </p>
            </div>
          </Link>
          <span className="text-[10px] text-[#6f5a88] opacity-60">
            ADMIN PANEL V2.0
          </span>
        </div>

        {/* ── Nav ── */}
        <nav className="flex-1 space-y-2 overflow-y-auto pr-2">
          {navItems.map((item) => (
            <NavGroup
              key={item.label}
              item={item}
              onItemClick={() => setIsMobileMenuOpen(false)}
            />
          ))}
        </nav>

        {/* ── User footer ── */}
        <div className="mt-auto pt-6 border-t border-[#eee4fb] space-y-3">
          {/* User card */}
          <div className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-[#faf7ff] border border-[#eee4fb]">
            {/* Avatar */}
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[#9572e8] to-[#fb397d] text-white text-xs font-bold shrink-0">
              {initials}
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-[#2b1d3a] truncate">
                {displayName}
              </p>
              <p className="text-[10px] text-[#b08fd9] truncate">
                {user?.email}
              </p>
            </div>

            {/* Role badge */}
            {user?.role && (
              <span className="shrink-0 text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#9572e8]/15 text-[#9572e8]">
                {user.role}
              </span>
            )}
          </div>

          {/* Logout button */}
          <button
            type="button"
            onClick={logoutUser}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#fb397d]/10 hover:bg-[#fb397d] px-4 py-2.5 text-xs font-bold text-[#c3003a] hover:text-white border border-[#fb397d]/20 hover:border-transparent transition-all active:scale-95 group"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:translate-x-0.5"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign Out
          </button>
        </div>
      </>
    );
  };

  // const SidebarContent = () => (
  //   <>
  //     <div className="mb-10 px-2 gap-3">
  //       <div className=" flex flex-row items-center gap-3">
  //         <Image
  //           src="/images/logo/snappy-fix-logo.webp"
  //           alt="Logo"
  //           width={56}
  //           height={56}
  //           priority
  //           className="w-24 sm:w-10 md:w-14 lg:w-16"
  //         />
  //         <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#b08fd9]">
  //           Snappy-fix
  //         </p>
  //       </div>
  //       <span className="text-[10px] text-[#6f5a88] opacity-60">
  //         ADMIN PANEL V2.0
  //       </span>
  //     </div>

  //     <nav className="flex-1 space-y-2 overflow-y-auto pr-2">
  //       {navItems.map((item) => (
  //         <NavGroup
  //           key={item.label}
  //           item={item}
  //           onItemClick={() => setIsMobileMenuOpen(false)}
  //         />
  //       ))}
  //     </nav>

  //     <div className="mt-auto pt-6 border-t border-[#eee4fb]">
  //       <div className="flex items-center gap-3 px-2">
  //         <div className="h-8 w-8 rounded-full bg-[#b08fd9]" />
  //         <div className="text-xs">
  //           <p className="font-semibold text-[#2b1d3a]">Admin User</p>
  //           <button
  //             type="button"
  //             onClick={logoutUser}
  //             className="rounded-full bg-[#fb397d] px-6 py-2 text-white font-semibold shadow-md shadow-[#fb397d]/20 hover:bg-[#e02d6b] transition-all active:scale-95"
  //           >
  //             Logout
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );

  return (
    <div className="flex min-h-screen bg-[#f6f3fb] text-[#2b1d3a]">
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="fixed inset-y-0 left-0 w-64 border-r border-[#e6dcf4] bg-white px-6 py-8 hidden lg:flex flex-col">
        <SidebarContent />
      </aside>

      {/* --- MOBILE SIDEBAR (Drawer) --- */}
      <div
        className={`fixed inset-0 z-50 flex lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-[#2b1d3a]/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer Panel */}
        <aside
          className={`relative w-72 bg-white h-full px-6 py-8 shadow-2xl transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute right-4 top-4 text-[#b08fd9] p-2"
          >
            ✕
          </button>
          <SidebarContent />
        </aside>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen w-full overflow-x-hidden bg-[#f6f3fb]">
        <header className="sticky top-0 z-40 border-b border-[#e6dcf4] bg-white/80 px-4 md:px-8 py-4 backdrop-blur-md w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-[#f1e9ff] text-[#6f5a88] hover:bg-[#e6dcf4] transition"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>

              <div>
                <h1 className="text-lg md:text-xl font-semibold tracking-tight leading-tight">
                  {title}
                </h1>
                <p className="hidden md:block text-xs text-[#6f5a88]">
                  {subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="rounded-full bg-[#2b1d3a] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#45325a] shadow-sm">
                + New <span className="hidden sm:inline">Task</span>
              </button>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="flex-1 p-4 md:p-8">
          <div className="max-w-full xl:max-w-6xl mx-auto">{children}</div>
        </div>

        <AdminFooter />
      </main>
    </div>
  );
}
