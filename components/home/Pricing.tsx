import { Footer } from "../../images/bg-img";

type Plan = {
  title: string;
  price: number;
  starting: number;
  weeks: number;
  featured?: boolean;
};

const plans: Plan[] = [
  { title: "Blog Website Development", price: 80, starting: 40, weeks: 2 },
  {
    title: "Investment Platform Development",
    price: 500,
    starting: 350,
    weeks: 4,
  },
  {
    title: "E-commerce Website Development",
    price: 500,
    starting: 350,
    weeks: 4,
    featured: true,
  },
  {
    title: "Education Website Development",
    price: 500,
    starting: 350,
    weeks: 4,
  },
];

const Pricing = () => {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="bg-cover bg-center py-20"
      style={{ backgroundImage: `url(${Footer.src})` }}
    >
      <div className="max-w-7xl mx-auto px-6 space-y-14">
        <header className="text-center space-y-4">
          <h2
            id="pricing-heading"
            className="text-4xl md:text-5xl font-bold text-[#5b32b4]"
          >
            Website Development Pricing Plans
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose a flexible website development package that fits your
            business needs and budget.
          </p>
          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <PriceCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PriceCard = ({ plan }: { plan: Plan }) => {
  return (
    <article
      className={`relative rounded-3xl border bg-white p-8 text-center transition hover:-translate-y-2 hover:shadow-xl
      ${plan.featured ? "border-[#fb397d] ring-2 ring-[#fb397d]/30" : ""}`}
    >
      {plan.featured && (
        <span className="absolute top-4 right-4 bg-[#fb397d] text-white text-xs px-3 py-1 rounded-full">
          Most Popular
        </span>
      )}

      <h3 className="text-xl font-semibold text-[#5b32b4]">{plan.title}</h3>

      <div className="mt-6 flex justify-center gap-1 text-[#fb397d]">
        <span className="text-lg">$</span>
        <span className="text-5xl font-bold">{plan.price}</span>
      </div>

      <ul className="mt-8 space-y-3 text-gray-600">
        <li>Starting from ${plan.starting}</li>
        <li>{plan.weeks}-week delivery</li>
        <li>Free hosting included</li>
        <li>Mobile-friendly responsive design</li>
      </ul>

      <button className="mt-10 w-full rounded-full py-3 font-medium bg-[#5b32b4] text-white hover:bg-[#47238f]">
        Get Started
      </button>
    </article>
  );
};

export default Pricing;
