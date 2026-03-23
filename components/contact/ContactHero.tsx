export default function ContactHero() {
  return (
    <header className="relative pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e] via-[#3e1f7a] to-[#5b32b4]" />
      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#fb397d]/15 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#9572e8]/20 blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center space-y-5">
        <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#fb397d] bg-[#fb397d]/15 border border-[#fb397d]/30 px-4 py-1.5 rounded-full">
          Get In Touch
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
          Let's Build Something{" "}
          <span className="bg-gradient-to-r from-[#fb397d] to-[#f1b922] bg-clip-text text-transparent">
            Great Together
          </span>
        </h1>
        <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
          Have a project in mind? A question about our tools? We'd love to hear
          from you. We respond within 24 hours.
        </p>
        {/* Quick response time badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-white text-sm px-5 py-2.5 rounded-full">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Average response time: under 4 hours
        </div>
      </div>
    </header>
  );
}
