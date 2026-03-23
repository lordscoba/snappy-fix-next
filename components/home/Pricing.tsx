import Link from "next/link";
import { SectionHeader } from "./Helpers";

const PLANS = [
  { title: "Blog Website", price: 80, starting: 40, weeks: 2, popular: false },
  {
    title: "E-commerce Platform",
    price: 500,
    starting: 350,
    weeks: 4,
    popular: true,
  },
  {
    title: "Investment Platform",
    price: 500,
    starting: 350,
    weeks: 4,
    popular: false,
  },
  {
    title: "Education Platform",
    price: 500,
    starting: 350,
    weeks: 4,
    popular: false,
  },
];

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="py-20 bg-gradient-to-br from-[#faf7ff] to-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="Pricing"
          title="Website Development Pricing"
          subtitle="Flexible packages for every business — from blogs to full e-commerce and SaaS platforms."
        />
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.map((plan, i) => (
            <article
              key={i}
              className={`relative bg-white rounded-3xl border p-7 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ${plan.popular ? "border-[#fb397d] ring-2 ring-[#fb397d]/20" : "border-[#e9e1ff]"}`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#fb397d] text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                  Most Popular
                </span>
              )}
              <h3 className="font-bold text-[#2b1d3a] text-center mb-4 leading-snug">
                {plan.title}
              </h3>
              <div className="flex items-end justify-center gap-1 text-[#5b32b4] mb-6">
                <span className="text-lg font-bold self-start mt-2">$</span>
                <span className="text-5xl font-extrabold">{plan.price}</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-500 text-center mb-8">
                <li>Starting from ${plan.starting}</li>
                <li>{plan.weeks}-week delivery</li>
                <li>Free hosting included</li>
                <li>Responsive design</li>
              </ul>
              <Link
                href="/contact"
                className={`block text-center font-bold py-3 rounded-full transition-all active:scale-95 ${plan.popular ? "bg-[#fb397d] text-white hover:bg-[#e02d6e]" : "bg-[#f4edff] text-[#5b32b4] hover:bg-[#5b32b4] hover:text-white"}`}
              >
                Get Started
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
