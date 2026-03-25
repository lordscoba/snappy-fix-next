import { RegisterComponent } from "@/components/auth/RegisterComponent";

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f8f5ff]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-40 h-96 w-96 rounded-full bg-[#e7dbff] blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-[28rem] w-[28rem] rounded-full bg-[#ffd6e7] blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-16">
        <div className="grid w-full items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <RegisterComponent />
          {/* RIGHT CONTENT unchanged */}
          <section className="space-y-6 text-[#2b1d3a]">
            <h1 className="text-4xl font-semibold">
              Build stunning digital experiences
            </h1>
          </section>
        </div>
      </div>
    </main>
  );
}
