import Link from "next/link";

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
  return (
    <main className="min-h-screen bg-[#f6f3fb] text-[#2b1d3a]">
      <div className="mx-auto max-w-6xl px-6 py-10 space-y-8">
        <header className="rounded-3xl border border-[#e6dcf4] bg-white/90 px-6 py-6 shadow">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#b08fd9]">
                Snappy‑Fix Dashboard
              </p>
              <h1 className="text-3xl font-semibold">{title}</h1>
              <p className="text-sm text-[#6f5a88]">{subtitle}</p>
            </div>

            <nav className="flex items-center gap-3 text-sm">
              <Link
                className="rounded-full px-4 py-2 text-[#6f5a88] hover:bg-[#f1e9ff]"
                href="/dashboard"
              >
                Home
              </Link>
              <Link
                className="rounded-full px-4 py-2 text-[#6f5a88] hover:bg-[#f1e9ff]"
                href="/dashboard/profile"
              >
                Profile
              </Link>
              <button className="rounded-full bg-[#fb397d] px-4 py-2 text-white hover:opacity-90">
                Logout
              </button>
            </nav>
          </div>
        </header>

        {children}
      </div>
    </main>
  );
}
