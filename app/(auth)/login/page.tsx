import AuthCard from "../../../components/auth/AuthCard";
import AuthInput from "../../../components/auth/AuthInput";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f8f5ff]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-40 h-96 w-96 rounded-full bg-[#e7dbff] blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-[28rem] w-[28rem] rounded-full bg-[#ffd6e7] blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-16">
        <div className="grid w-full items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-6 text-[#2b1d3a]">
            <p className="text-sm uppercase tracking-[0.3em] text-[#b08fd9]">
              Welcome back
            </p>
            <h1 className="text-4xl font-semibold md:text-5xl">
              Sign in to keep your projects moving.
            </h1>
            <p className="max-w-md text-base text-[#6f5a88]">
              Manage ongoing work, review progress, and keep the Snappy-fix crew
              aligned in one place.
            </p>
            <div className="flex items-center gap-3 text-sm text-[#6f5a88]">
              <span className="h-10 w-10 rounded-2xl bg-white shadow" />
              Secure sign-in with modern sessions and encrypted storage.
            </div>
          </section>

          <AuthCard
            title="Sign in"
            subtitle="Enter your details to continue"
            footerText="Don’t have an account?"
            footerLinkLabel="Create one"
            footerHref="/register"
          >
            <AuthInput
              id="email"
              label="Email address"
              type="email"
              placeholder="you@snappyfix.com"
            />
            <AuthInput
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
            />

            <div className="flex items-center justify-between text-sm text-[#6f5a88]">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-[#d4c6ea]"
                />
                Remember me
              </label>
              <button
                type="button"
                className="font-medium text-[#fb397d] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="button"
              className="w-full rounded-2xl bg-[#2b1d3a] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2b1d3a]/30 transition hover:translate-y-[-1px]"
            >
              Sign in
            </button>

            <button
              type="button"
              className="w-full rounded-2xl border border-[#e1d6f3] bg-white px-6 py-3 text-sm font-semibold text-[#2b1d3a] transition hover:border-[#b08fd9]"
            >
              Continue with Google
            </button>
          </AuthCard>
        </div>
      </div>
    </main>
  );
}
