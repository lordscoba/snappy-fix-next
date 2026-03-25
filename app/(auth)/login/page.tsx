import { LoginComponent } from "@/components/auth/LoginComponent";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f8f5ff]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-40 h-96 w-96 rounded-full bg-[#e7dbff] blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-[28rem] w-[28rem] rounded-full bg-[#ffd6e7] blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-16">
        <div className="grid w-full items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
          {/* LEFT CONTENT (unchanged) */}
          <section className="space-y-6 text-[#2b1d3a]">
            <p className="text-sm uppercase tracking-[0.3em] text-[#b08fd9]">
              Welcome back
            </p>
            <h1 className="text-4xl font-semibold md:text-5xl">
              Sign in to keep your projects moving.
            </h1>
            <p className="max-w-md text-base text-[#6f5a88]">
              Manage ongoing work, review progress, and keep the Snappy-fix crew
              aligned.
            </p>
          </section>

          {/* login components */}
          <LoginComponent />
        </div>
      </div>
    </main>
  );
}
