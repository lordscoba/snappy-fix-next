import Link from "next/link";

type AdminShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export default function AdminShell({
  title,
  subtitle,
  children,
}: AdminShellProps) {
  return (
    <main className="min-h-screen bg-[#f6f3fb] text-[#2b1d3a]">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-10">
        <header className="flex flex-col gap-4 rounded-3xl border border-[#e6dcf4] bg-white/90 px-6 py-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#b08fd9]">
                Snappy-fix Admin
              </p>
              <h1 className="text-3xl font-semibold">{title}</h1>
              <p className="text-sm text-[#6f5a88]">{subtitle}</p>
            </div>
            <nav className="flex items-center gap-3 text-sm">
              <Link
                className="rounded-full px-4 py-2 text-[#6f5a88] hover:bg-[#f1e9ff]"
                href="/admin"
              >
                Home
              </Link>
              <Link
                className="rounded-full px-4 py-2 text-[#6f5a88] hover:bg-[#f1e9ff]"
                href="/admin/settings"
              >
                Settings
              </Link>
            </nav>
          </div>
        </header>

        {children}
      </div>
    </main>
  );
}
