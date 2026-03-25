"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQ = [
  {
    question: "How long does a website project take?",
    answer:
      "Most blog and business websites take 1–2 weeks. E-commerce and SaaS platforms typically take 3–6 weeks depending on complexity. We agree on a timeline before starting and stick to it.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes. We work with clients across Nigeria, the UK, the US, Canada, and beyond. All project communication is done remotely via email, WhatsApp, and video calls.",
  },
  {
    question: "Are the online tools really free?",
    answer:
      "Yes — completely free with no usage limits and no watermark. All 29 tools are free to use with no signup required.",
  },
  {
    question: "Can you maintain my website after launch?",
    answer:
      "Yes. We offer post-launch maintenance and update packages. Just mention this in your enquiry and we'll include maintenance options in the proposal.",
  },
  {
    question: "What do you need to get started on a project?",
    answer:
      "A brief description of what you need, your target audience, any examples you like, and your budget range. Send us a message and we'll take it from there.",
  },
];

export default function ContactFaq() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <section className="py-16 bg-gradient-to-br from-[#faf7ff] to-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center space-y-3 mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#c3003a] bg-[#fb397d]/10 px-4 py-1.5 rounded-full">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2b1d3a]">
            Common Questions
          </h2>
        </div>
        <div className="space-y-3">
          {FAQ.map((item, i) => (
            <div
              key={i}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openFaq === i ? "border-[#5b32b4]/40 bg-white shadow-md shadow-[#5b32b4]/10" : "border-[#e9e1ff] bg-white hover:border-[#d4c5f9]"}`}
            >
              <button
                type="button"
                aria-label="Expand"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={openFaq === i}
              >
                <span className="font-bold text-[#2b1d3a] text-sm sm:text-base">
                  {item.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-[#5b32b4] shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ${openFaq === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
