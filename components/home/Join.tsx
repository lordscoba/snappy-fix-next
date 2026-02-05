const Join = () => {
  return (
    <section
      id="join"
      aria-labelledby="join-heading"
      className="bg-gradient-to-r from-[#a765e1] to-[#7973ed]"
    >
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Text */}
        <header className="max-w-xl space-y-4 text-center md:text-left">
          <h2
            id="join-heading"
            className="text-white text-3xl md:text-4xl font-bold"
          >
            Join Businesses Growing with Snappy-Fix Technologies
          </h2>

          <p className="text-white/90 text-base md:text-lg leading-relaxed">
            Partner with Snappy-Fix Technologies to build high-performance
            websites and digital products that drive real business growth.
          </p>
        </header>

        {/* CTA */}
        <div>
          <button
            type="button"
            className="py-3 px-10 rounded-3xl bg-white text-[#fb397d] font-medium
             shadow-lg transition-colors duration-300 hover:bg-[#5b32b4] hover:text-white
             animate-soft-bounce"
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default Join;
