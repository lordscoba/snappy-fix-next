const ContactUs = () => {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-[#f5f9fc] py-20"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left Content */}
        <article className="space-y-8">
          <header>
            <h2
              id="contact-heading"
              className="text-3xl md:text-5xl font-bold text-[#5b32b4]"
            >
              Contact Snappy-Fix Technologies
            </h2>
            <div className="mt-3 h-1 w-20 bg-[#fb397d] rounded" />
          </header>

          <p className="text-[#726a84] max-w-md leading-relaxed">
            Reach out to our team for website development, web applications,
            UI/UX design, and custom digital solutions.
          </p>

          <address className="not-italic space-y-4 text-[#726a84]">
            <p>
              <strong className="text-[#5b32b4]">Address:</strong> Uyo, Akwaibom
              State Nigeria
            </p>
            <p>
              <strong className="text-[#5b32b4]">Phone:</strong>{" "}
              <a href="tel:+2348087690994">+234 808 769 0994</a>
            </p>
            <p>
              <strong className="text-[#5b32b4]">Email:</strong>{" "}
              <a href="mailto:lordscoba2tm@gmail.com">lordscoba2tm@gmail.com</a>
            </p>
          </address>
        </article>

        {/* Right Form */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <form className="space-y-5" aria-label="Contact form">
            <Input label="Your Name" name="name" />
            <Input label="Your Email" name="email" type="email" />
            <Textarea label="Your Message" name="message" />

            <button
              type="submit"
              className="w-full bg-[#fb397d] text-white py-3 rounded-3xl font-medium
                         transition-all duration-300 hover:bg-[#5b32b4] hover:shadow-xl"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Input = ({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) => (
  <div className="space-y-1">
    <label htmlFor={name} className="text-sm text-[#5b32b4] font-medium">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      required
      className="w-full border border-gray-200 rounded-2xl px-5 py-3
                 focus:outline-none focus:ring-2 focus:ring-[#fb397d]/40"
    />
  </div>
);

const Textarea = ({ label, name }: { label: string; name: string }) => (
  <div className="space-y-1">
    <label htmlFor={name} className="text-sm text-[#5b32b4] font-medium">
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      rows={4}
      required
      className="w-full border border-gray-200 rounded-2xl px-5 py-3 resize-none
                 focus:outline-none focus:ring-2 focus:ring-[#fb397d]/40"
    />
  </div>
);

export default ContactUs;
