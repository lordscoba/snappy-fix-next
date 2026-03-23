import {
  ArrowRight,
  CheckCircle,
  Clock,
  Code2,
  ImageIcon,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// ─── Contact info ─────────────────────────────────────────────────────────────
const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Office Address",
    value: "Uyo, Akwa Ibom State, Nigeria",
    sub: "West Africa",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+234 808 769 0994",
    href: "tel:+2348087690994",
    sub: "Mon–Fri, 9am–6pm WAT",
  },
  {
    icon: Mail,
    label: "Email",
    value: "snappyfix.tech@gmail.com",
    href: "mailto:snappyfix.tech@gmail.com",
    sub: "We reply within 24 hours",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Monday – Friday",
    sub: "9:00 AM – 6:00 PM WAT",
  },
];

// ─── Enquiry types ────────────────────────────────────────────────────────────
const ENQUIRY_TYPES = [
  { icon: Code2, label: "Website Development", value: "web-dev" },
  {
    icon: ImageIcon,
    label: "Online Tools Feedback",
    value: "tools",
  },
  {
    icon: MessageCircle,
    label: "General Enquiry",
    value: "general",
  },
  { icon: Mail, label: "Partnership", value: "partnership" },
];

export default function ContactMainContent() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [enquiryType, setEnquiryType] = useState("general");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1200);
  };

  const update =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10">
          {/* ── Left: Contact info ── */}
          <aside className="space-y-5">
            <div className="bg-gradient-to-br from-[#5b32b4] to-[#884bdf] rounded-3xl p-7 text-white space-y-6">
              <div>
                <h2 className="text-xl font-extrabold mb-1">
                  Contact Information
                </h2>
                <p className="text-white/65 text-sm">
                  Reach us directly or fill the form on the right.
                </p>
              </div>
              <div className="space-y-5">
                {CONTACT_INFO.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white/50 uppercase tracking-wider">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="font-semibold text-white hover:text-[#c3003a] transition-colors text-sm"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-semibold text-white text-sm">
                            {item.value}
                          </p>
                        )}
                        <p className="text-white/50 text-xs mt-0.5">
                          {item.sub}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Social / location note */}
              <div className="pt-4 border-t border-white/15">
                <p className="text-white/50 text-xs">
                  Based in Uyo, Akwa Ibom, Nigeria 🇳🇬
                </p>
                <p className="text-white/50 text-xs mt-1">
                  Serving clients globally.
                </p>
              </div>
            </div>

            {/* Quick links */}
            <div className="bg-white border border-[#e9e1ff] rounded-3xl p-6 space-y-4">
              <h3 className="font-bold text-[#2b1d3a] text-sm">Quick Links</h3>
              <div className="space-y-2">
                {[
                  {
                    label: "Browse Free Tools",
                    href: "/tools",
                    icon: <ImageIcon size={14} />,
                  },
                  {
                    label: "Read Our Blog",
                    href: "/blog",
                    icon: <MessageCircle size={14} />,
                  },
                  {
                    label: "About Snappy-Fix",
                    href: "/about",
                    icon: <Code2 size={14} />,
                  },
                ].map((link: any) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl hover:bg-[#faf7ff] transition-colors group"
                  >
                    <span className="flex items-center gap-2 text-sm font-medium text-[#2b1d3a] group-hover:text-[#5b32b4] transition-colors">
                      <span className="text-[#c3003a]">{link.icon}</span>
                      {link.label}
                    </span>
                    <ArrowRight
                      size={13}
                      className="text-[#6b5d80] group-hover:text-[#5b32b4] group-hover:translate-x-0.5 transition-all"
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-gradient-to-br from-[#faf7ff] to-[#f4edff] border border-[#e9e1ff] rounded-3xl p-6 text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#5b32b4]/10 flex items-center justify-center mx-auto">
                <MapPin size={20} className="text-[#5b32b4]" />
              </div>
              <p className="font-bold text-[#2b1d3a] text-sm">Uyo, Akwa Ibom</p>
              <p className="text-xs text-gray-400">Nigeria, West Africa</p>
              <a
                href="https://maps.app.goo.gl/FUpYEyVPeGMGMAx26"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#5b32b4] hover:underline"
              >
                View on Google Maps →
              </a>
            </div>
          </aside>

          {/* ── Right: Contact form ── */}
          <div className="bg-white border border-[#e9e1ff] rounded-3xl p-7 md:p-10 shadow-sm">
            {sent ? (
              /* ── Success state ── */
              <div className="flex flex-col items-center justify-center text-center py-16 space-y-5">
                <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  <CheckCircle size={36} className="text-emerald-500" />
                </div>
                <h2 className="text-2xl font-extrabold text-[#2b1d3a]">
                  Message Received!
                </h2>
                <p className="text-gray-500 max-w-sm">
                  Thank you for reaching out. We'll get back to you within 24
                  hours.
                </p>
                <button
                  type="button"
                  aria-label="Send Another Message"
                  onClick={() => {
                    setSent(false);
                    setForm({
                      name: "",
                      email: "",
                      subject: "",
                      message: "",
                    });
                  }}
                  className="inline-flex items-center gap-2 bg-[#5b32b4] hover:bg-[#47238f] text-white font-bold px-7 py-3 rounded-full transition-all active:scale-95 text-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-extrabold text-[#2b1d3a]">
                    Send Us a Message
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Fill the form and we'll respond within 24 hours.
                  </p>
                </div>

                {/* ── Enquiry type selector ── */}
                <div className="mb-6">
                  <p className="text-sm font-bold text-[#5b32b4] mb-3">
                    What's this about?
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {ENQUIRY_TYPES.map((type) => {
                      const Icon2 = type.icon;
                      return (
                        <button
                          type="button"
                          aria-label="Select enquiry type"
                          key={type.value}
                          onClick={() => setEnquiryType(type.value)}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                            enquiryType === type.value
                              ? "bg-[#5b32b4] border-[#5b32b4] text-white shadow-md"
                              : "border-[#e9e1ff] text-[#726a84] hover:border-[#5b32b4]/40 hover:text-[#5b32b4]"
                          }`}
                        >
                          <Icon2 size={14} />
                          <span className="text-left leading-tight">
                            {type.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  aria-label="Contact form"
                >
                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      label="Your Name"
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={update("name")}
                      placeholder="John Doe"
                      required
                    />
                    <FormField
                      label="Your Email"
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={update("email")}
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  {/* Subject */}
                  <FormField
                    label="Subject"
                    id="subject"
                    type="text"
                    value={form.subject}
                    onChange={update("subject")}
                    placeholder={
                      enquiryType === "web-dev"
                        ? "Website development enquiry"
                        : enquiryType === "tools"
                          ? "Feedback on image tools"
                          : enquiryType === "partnership"
                            ? "Partnership opportunity"
                            : "How can we help?"
                    }
                    required
                  />

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="message"
                      className="text-sm font-bold text-[#5b32b4]"
                    >
                      Your Message <span className="text-[#c3003a]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={update("message")}
                      placeholder={
                        enquiryType === "web-dev"
                          ? "Tell us about your project — what type of website, your target audience, budget range, and any specific features you need..."
                          : "Tell us more about how we can help you..."
                      }
                      className="w-full border border-[#e9e1ff] rounded-2xl px-5 py-3.5 resize-none focus:outline-none focus:ring-2 focus:ring-[#5b32b4]/30 focus:border-[#5b32b4]/40 text-[#2b1d3a] text-sm placeholder-gray-300 transition-all"
                    />
                  </div>

                  {/* Privacy note */}
                  <p className="text-xs text-gray-400">
                    By submitting, you agree that we may contact you at the
                    email you provided. We never share your data with third
                    parties.
                  </p>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full flex items-center justify-center gap-2 bg-[#fb397d] hover:bg-[#e02d6e] disabled:bg-[#fb397d]/60 text-white font-bold py-4 rounded-2xl transition-all active:scale-[0.99] shadow-lg shadow-[#fb397d]/20 text-sm"
                  >
                    {sending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label,
  id,
  type,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-bold text-[#5b32b4]">
        {label} {required && <span className="text-[#c3003a]">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-[#e9e1ff] rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#5b32b4]/30 focus:border-[#5b32b4]/40 text-[#2b1d3a] text-sm placeholder-gray-300 transition-all"
      />
    </div>
  );
}
