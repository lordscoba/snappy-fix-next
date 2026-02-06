import AuthCard from "../../../components/auth/AuthCard";
import AuthInput from "../../../components/auth/AuthInput";

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f8f5ff]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-40 h-96 w-96 rounded-full bg-[#e7dbff] blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-[28rem] w-[28rem] rounded-full bg-[#ffd6e7] blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-16">
        <div className="grid w-full items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <AuthCard
            title="Create account"
            subtitle="Let’s get you set up in minutes"
            footerText="Already have an account?"
            footerLinkLabel="Sign in"
            footerHref="/login"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <AuthInput id="firstName" label="First name" placeholder="Ada" />
              <AuthInput
                id="lastName"
                label="Last name"
                placeholder="Lovelace"
              />
            </div>
            <AuthInput
              id="email"
              label="Work email"
              type="email"
              placeholder="you@snappyfix.com"
            />
            <AuthInput
              id="password"
              label="Create password"
              type="password"
              placeholder="Minimum 8 characters"
            />

            <label className="flex items-start gap-2 text-sm text-[#6f5a88]">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-[#d4c6ea]"
              />
              I agree to Snappy-fix terms and the privacy policy.
            </label>

            <button
              type="button"
              className="w-full rounded-2xl bg-[#2b1d3a] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2b1d3a]/30 transition hover:translate-y-[-1px]"
            >
              Create account
            </button>

            <button
              type="button"
              className="w-full rounded-2xl border border-[#e1d6f3] bg-white px-6 py-3 text-sm font-semibold text-[#2b1d3a] transition hover:border-[#b08fd9]"
            >
              Continue with Google
            </button>
          </AuthCard>

          <section className="space-y-6 text-[#2b1d3a]">
            <p className="text-sm uppercase tracking-[0.3em] text-[#b08fd9]">
              Join the studio
            </p>
            <h1 className="text-4xl font-semibold md:text-5xl">
              Build stunning digital experiences with Snappy-fix.
            </h1>
            <p className="max-w-md text-base text-[#6f5a88]">
              Create an account to collaborate with the team, track milestones,
              and launch new work faster.
            </p>
            <div className="grid gap-4 text-sm text-[#6f5a88]">
              <div className="rounded-2xl bg-white/80 px-4 py-3 shadow">
                Quick onboarding with guided project templates.
              </div>
              <div className="rounded-2xl bg-white/80 px-4 py-3 shadow">
                Centralized asset library and team approvals.
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
