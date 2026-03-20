import Link from "next/link";

export default function AdminFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[#e6dcf4] bg-white/50 px-8 py-6">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xs text-[#6f5a88]">
          <span className="font-semibold text-[#b08fd9]">Snappy-fix Admin</span>
          <span className="mx-2 opacity-30">|</span>© {currentYear} All Rights
          Reserved.
        </div>

        <div className="flex items-center gap-6 text-xs font-medium text-[#6f5a88]">
          <Link
            href="/admin/support"
            className="hover:text-[#b08fd9] transition"
          >
            Help Center
          </Link>
          <Link href="/terms" className="hover:text-[#b08fd9] transition">
            Privacy Policy
          </Link>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="opacity-70">System: Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
