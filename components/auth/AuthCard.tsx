import Link from "next/link";

type AuthCardProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footerText: string;
  footerLinkLabel: string;
  footerHref: string;
};

export default function AuthCard({
  title,
  subtitle,
  children,
  footerText,
  footerLinkLabel,
  footerHref,
}: AuthCardProps) {
  return (
    <section className="w-full max-w-md rounded-3xl border border-[#e7ddf2] bg-white/90 shadow-[0_20px_60px_rgba(17,24,39,0.15)] backdrop-blur">
      <div className="px-8 pb-8 pt-10">
        <header className="space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#b08fd9]">
            Snappy-fix
          </p>
          <h1 className="text-3xl font-semibold text-[#2b1d3a]">{title}</h1>
          <p className="text-sm text-[#6f5a88]">{subtitle}</p>
        </header>

        <div className="mt-8 space-y-4">{children}</div>

        <div className="mt-6 text-center text-sm text-[#6f5a88]">
          {footerText}{" "}
          <Link
            className="font-semibold text-[#fb397d] hover:underline"
            href={footerHref}
          >
            {footerLinkLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
