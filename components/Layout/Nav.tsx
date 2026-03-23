"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { LogOut, ChevronDown, User } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";

// ─── Types ────────────────────────────────────────────────────────────────────
type NavLink = {
  label: string;
  href: string;
};

type NavProps = {
  background: string;
  links?: NavLink[];
};

// ─── Default nav links ────────────────────────────────────────────────────────
const DEFAULT_LINKS: NavLink[] = [
  { label: "Home", href: "/#hero" },
  { label: "Why us", href: "/#why" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Testimonials", href: "/#testimonial" },
  { label: "Tools", href: "/tools" },
  { label: "Blog", href: "/blog" },
  { label: "About us", href: "/about" },
  { label: "Contact us", href: "/contact" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  active: boolean,
  callback: () => void,
) {
  useEffect(() => {
    if (!active) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) callback();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref, active, callback]);
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
type AvatarProps = {
  initials: string;
  size?: "sm" | "md";
};

const Avatar = ({ initials, size = "sm" }: AvatarProps) => (
  <div
    className={`flex items-center justify-center rounded-full bg-gradient-to-br from-[#9572e8] to-[#fb397d] font-bold text-white shrink-0 ${
      size === "md" ? "w-10 h-10 text-sm" : "w-8 h-8 text-xs"
    }`}
  >
    {initials}
  </div>
);

// ─── Nav ──────────────────────────────────────────────────────────────────────
const Nav = ({ background, links = DEFAULT_LINKS }: NavProps) => {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  const { user, isAuthenticated, isHydrated, logoutUser } = useAuth();

  // Outside-click handlers via reusable hook
  useClickOutside(menuRef, open, () => setOpen(false));
  useClickOutside(userMenuRef, userMenuOpen, () => setUserMenuOpen(false));

  // Escape key closes both menus
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Derived user display values
  const firstName = user?.first_name ?? "";
  const lastName = user?.last_name ?? "";
  const initials =
    firstName && lastName
      ? `${firstName[0]}${lastName[0]}`.toUpperCase()
      : firstName
        ? firstName[0].toUpperCase()
        : "?";
  const displayName = firstName ? `${firstName} ${lastName}`.trim() : "Account";

  // ── Desktop auth section ────────────────────────────────────────────────
  const DesktopAuth = () => {
    if (!isHydrated) {
      return (
        <div className="hidden md:block w-28 h-10 rounded-full bg-white/10 animate-pulse" />
      );
    }

    if (!isAuthenticated) {
      return (
        <Link
          href="/login"
          className="hidden md:block border-2 border-[#9572e8] px-8 py-2 rounded-full text-white hover:bg-[#fb397d] transition"
        >
          Login
        </Link>
      );
    }

    return (
      <div className="hidden md:block relative" ref={userMenuRef}>
        <button
          type="button"
          aria-label="User menu"
          onClick={() => setUserMenuOpen((p) => !p)}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded-full text-white transition"
        >
          <Avatar initials={initials} size="sm" />
          <span className="text-sm font-medium max-w-[120px] truncate">
            {displayName}
          </span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`}
          />
        </button>

        {userMenuOpen && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#9572e8]/10 to-[#fb397d]/10 border-b border-gray-100">
              <Avatar initials={initials} size="md" />
              <div className="min-w-0">
                <p className="text-sm font-bold text-[#2b1d3a] truncate">
                  {displayName}
                </p>
                <p className="text-[10px] text-gray-400 truncate">
                  {user?.email}
                </p>
              </div>
            </div>

            {/* Role badge */}
            {user?.role && (
              <div className="px-4 py-2 border-b border-gray-100">
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    user.role === "ADMIN"
                      ? "bg-[#9572e8]/15 text-[#9572e8]"
                      : "bg-emerald-100 text-emerald-600"
                  }`}
                >
                  <User size={9} />
                  {user.role}
                </span>
              </div>
            )}

            {user?.role === "ADMIN" && (
              <Link
                href="/admin"
                onClick={() => setUserMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 text-sm text-[#3e2a55] hover:bg-[#faf7ff] transition"
              >
                Dashboard
              </Link>
            )}

            <Link
              href="/profile"
              onClick={() => setUserMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 text-sm text-[#3e2a55] hover:bg-[#faf7ff] transition"
            >
              My Profile
            </Link>

            <button
              type="button"
              aria-label="Sign out"
              onClick={() => {
                setUserMenuOpen(false);
                logoutUser();
              }}
              className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition border-t border-gray-100"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition ${background}`}>
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/#hero" aria-label="Snappy-Fix Technologies home">
          <Image
            src="/images/logo/snappy-fix-logo.webp"
            alt="Snappy-Fix Technologies"
            width={48}
            height={48}
            priority
            className="w-10 sm:w-12 h-auto object-contain"
            sizes="(max-width: 640px) 40px, 48px"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 text-white text-sm">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="hover:text-[#c3003a] transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop auth */}
        <DesktopAuth />

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((p) => !p)}
          className="md:hidden text-white text-3xl leading-none"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden">
          <div
            ref={menuRef}
            className="absolute top-0 right-0 w-72 h-full bg-[#47238f] text-white flex flex-col p-6 gap-4 shadow-xl overflow-y-auto"
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="self-end text-2xl leading-none"
            >
              ✕
            </button>

            {/* Mobile user card */}
            {isHydrated && isAuthenticated && user && (
              <div className="flex items-center gap-3 bg-white/15 rounded-2xl p-3 mb-2">
                <Avatar initials={initials} size="md" />
                <div className="min-w-0">
                  <p className="text-sm font-bold truncate">{displayName}</p>
                  <p className="text-[10px] opacity-70 truncate">
                    {user.email}
                  </p>
                  {user.role && (
                    <span
                      className={`inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-full mt-0.5 ${
                        user.role === "ADMIN"
                          ? "bg-white/30 text-white"
                          : "bg-white/20 text-white"
                      }`}
                    >
                      {user.role}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Nav links */}
            {links.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="text-lg hover:underline"
              >
                {label}
              </Link>
            ))}

            {/* Mobile auth actions */}
            <div className="mt-auto flex flex-col gap-3">
              {isHydrated && isAuthenticated ? (
                <>
                  {user?.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      onClick={() => setOpen(false)}
                      className="text-center border-2 border-white px-6 py-3 rounded-full hover:bg-white/20 transition text-sm font-bold"
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="text-center border-2 border-white/50 px-6 py-3 rounded-full hover:bg-white/20 transition text-sm"
                  >
                    My Profile
                  </Link>
                  <button
                    type="button"
                    aria-label="Sign out"
                    onClick={() => {
                      setOpen(false);
                      logoutUser();
                    }}
                    className="flex items-center justify-center gap-2 bg-[#fb397d] px-6 py-3 rounded-full font-bold text-sm hover:bg-[#e02d6e] transition"
                  >
                    <LogOut size={15} />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="text-center border-2 border-white px-6 py-3 rounded-full hover:bg-[#fb397d] transition"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
