"use client";

import { useState } from "react";
import SecurePasswordGeneratorTools from "@/components/tools/PasswordGeneratorTools";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";
import {
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Zap,
  Globe,
  Lock,
  KeyRound,
  RefreshCw,
  Eye,
  AlertTriangle,
  Copy,
} from "lucide-react";

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const faqs = [
  {
    question: "What makes a password strong?",
    answer:
      "A strong password has four key properties: length (at least 12 characters — 16 or more is recommended), character diversity (a mix of uppercase letters, lowercase letters, numbers, and symbols), unpredictability (randomly generated rather than based on words, names, or patterns), and uniqueness (used for only one account). The strength meter in the tool scores your generated password across these properties — length above 8 gives a point, length above 12 gives another, and each character class present (uppercase, numbers, symbols) adds a point.",
  },
  {
    question: "Is the password generated on my device or sent to a server?",
    answer:
      "The password is generated server-side via a secure API request with your chosen parameters (length, character types, exclude characters). The server generates a cryptographically random password and returns it. The password is never logged, stored, or associated with your session — it exists only in the API response and in your browser until you navigate away. No account or identity information is transmitted with the request.",
  },
  {
    question: "What is the 'Exclude Characters' field for?",
    answer:
      "The exclude characters field lets you prevent specific characters from appearing in the generated password. The most common use is excluding visually ambiguous characters — for example `0` (zero) and `O` (capital O), `1` (one), `l` (lowercase L), and `I` (capital I) — which look identical in many fonts and can cause errors when typing a password from a screen. Type the characters you want excluded (e.g. `0OIl1`) in the field and they will be omitted from the character pool for all generated passwords.",
  },
  {
    question: "How long should my password be?",
    answer:
      "The minimum recommended length for any account password is 12 characters. For high-value accounts (email, banking, password manager master password), 16–20 characters is recommended. For any account where the service allows long passwords (many allow up to 64 or 128 characters), use the maximum the tool supports (128 characters) — a 128-character random password is effectively impossible to crack by any current or near-future computational method. The tool's default of 16 is appropriate for most accounts.",
  },
  {
    question: "Should I include symbols in my password?",
    answer:
      "Including symbols significantly increases password strength by expanding the character pool. A 16-character password using only lowercase letters has roughly 43 trillion possible combinations. Adding uppercase, numbers, and symbols increases this to over 290 trillion combinations for the same length — a 6× increase. Symbols are disabled by default in the tool because some older systems and specific applications do not accept all symbol characters. Enable them when you know the target system supports them — most modern systems do.",
  },
  {
    question: "Can I use the same strong password for multiple accounts?",
    answer:
      "No — and this is critical. Even a 20-character randomly generated password should never be reused across accounts. When any website or service is breached, attackers test stolen username/password combinations against other services (credential stuffing). If you use the same password everywhere, a breach on one low-security site compromises your email, banking, and every other account that uses it. Use this tool to generate a unique password for each account and store them in a password manager.",
  },
  {
    question: "What is a password manager and should I use one?",
    answer:
      "A password manager is a secure application that stores all your passwords in an encrypted vault, accessible with a single master password or biometric. Because a password manager remembers your passwords, you can use a unique, randomly generated strong password for every account without having to memorise any of them. Popular options include Bitwarden (open source, free), 1Password, Dashlane, and Apple Keychain. Use this tool to generate passwords and your password manager to store them.",
  },
  {
    question: "Is the Secure Password Generator free?",
    answer:
      "Yes — completely free with no usage limits. Generate as many passwords as you need at no cost with no account required.",
  },
];

// ─── Benefits ─────────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: <RefreshCw size={20} className="text-[#c3003a]" />,
    title: "Server-side random generation",
    description:
      "Passwords are generated server-side using cryptographically secure randomness — not predictable browser Math.random() — ensuring genuine unpredictability.",
  },
  {
    icon: <Lock size={20} className="text-[#5b32b4]" />,
    title: "Full character class control",
    description:
      "Toggle uppercase, lowercase, numbers, and symbols independently. Build exactly the character set required by any platform's password policy.",
  },
  {
    icon: <Eye size={20} className="text-[#c3003a]" />,
    title: "Exclude ambiguous characters",
    description:
      "Exclude visually similar characters (0, O, 1, l, I) to prevent transcription errors when typing passwords from screen.",
  },
  {
    icon: <KeyRound size={20} className="text-[#5b32b4]" />,
    title: "Live strength meter",
    description:
      "Instant Weak / Fair / Good / Strong rating based on length and character diversity — scored as you generate.",
  },
  {
    icon: <Copy size={20} className="text-[#c3003a]" />,
    title: "One-click copy",
    description:
      "Copy the generated password to clipboard instantly — no selecting, no highlighting, no risk of partial copy.",
  },
  {
    icon: <Globe size={20} className="text-[#5b32b4]" />,
    title: "Works on any device",
    description:
      "Fully responsive — generate passwords on desktop, laptop, tablet, or smartphone from any modern browser.",
  },
];

// ─── Password strength reference ─────────────────────────────────────────────
const strengthRef = [
  {
    length: "6–7 chars",
    example: "Tj4!kP",
    rating: "Weak",
    time: "Seconds to minutes",
    color: "text-red-500",
  },
  {
    length: "8–11 chars",
    example: "Xm9#vKpQ2n",
    rating: "Fair",
    time: "Hours to days",
    color: "text-orange-500",
  },
  {
    length: "12–15 chars",
    example: "Rw7!mVqP3xZk",
    rating: "Good",
    time: "Years",
    color: "text-blue-500",
  },
  {
    length: "16+ chars, mixed",
    example: "Kp#8vNxQ2m!rYj5@",
    rating: "Strong",
    time: "Millions of years",
    color: "text-emerald-600",
  },
  {
    length: "20+ chars, all types",
    example: "f@G2vK!n9QmXpZ4$rBwT",
    rating: "Strong+",
    time: "Computationally infeasible",
    color: "text-[#5b32b4]",
  },
];

// ─── Common password mistakes ─────────────────────────────────────────────────
const passwordMistakes = [
  {
    mistake: "Using a dictionary word",
    why: "Cracked in seconds by dictionary attacks",
  },
  {
    mistake: "Adding numbers at the end (e.g. Password1)",
    why: "Predictable pattern — first thing attackers try",
  },
  {
    mistake: "Using your name, birthday, or pet's name",
    why: "Guessable from public social media information",
  },
  {
    mistake: "Reusing passwords across sites",
    why: "One breach compromises all accounts using that password",
  },
  {
    mistake: "Replacing letters with symbols (p@ssw0rd)",
    why: "Leet-speak substitutions are in all standard attack lists",
  },
  {
    mistake: "Using a short password because it's 'complex'",
    why: "Length beats complexity — 8 chars is crackable in hours",
  },
];

// ─── How-to steps ─────────────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    title: "Set password length",
    description:
      "Enter your required password length in the Length field (minimum 6, maximum 128). The default is 16, which is appropriate for most accounts. For high-value accounts like email or banking, use 20 or more.",
  },
  {
    number: "02",
    title: "Choose character types",
    description:
      "Toggle the character type checkboxes: Uppercase Letters, Lowercase Letters, Numbers, and Symbols. Uppercase and lowercase are on by default. Enable Symbols for maximum strength on platforms that support them.",
  },
  {
    number: "03",
    title: "Exclude ambiguous characters (optional)",
    description:
      "If you will need to type the password manually, enter visually similar characters in the Exclude field (e.g. 0OIl1) to prevent confusion. Leave blank if you are copying from the tool directly.",
  },
  {
    number: "04",
    title: "Generate, check strength, and copy",
    description:
      "Click Generate Password and review the strength meter — aim for Strong (green). Click Copy Password to copy to clipboard, then paste it directly into your password manager or account registration. Do not type it somewhere you might save it insecurely.",
  },
];

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FaqItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        open
          ? "border-[#5b32b4]/40 bg-gradient-to-br from-[#faf7ff] to-white shadow-md shadow-[#5b32b4]/10"
          : "border-[#e9e1ff] bg-white hover:border-[#d4c5f9]"
      }`}
    >
      <button
        type="button"
        aria-label="Expand"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-4">
          <span
            className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
              open
                ? "bg-gradient-to-br from-[#5b32b4] to-[#fb397d] text-white"
                : "bg-[#f3ecff] text-[#5b32b4]"
            }`}
          >
            {index + 1}
          </span>
          <span className="font-bold text-[#2b1d3a] text-sm sm:text-base">
            {question}
          </span>
        </div>
        <ChevronDown
          size={18}
          className={`shrink-0 text-[#5b32b4] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-gray-600 text-sm leading-relaxed pl-[4.5rem]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function SecurePasswordGeneratorPageClient() {
  return (
    <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
      {/* ── Header ──────────────────────────────────────────── */}
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#f3ecff] border border-[#e9e1ff] text-[#5b32b4] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
          <ShieldCheck size={14} />
          Security Tool
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
          Secure Password Generator
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Generate cryptographically strong passwords instantly. Customise
          length up to 128 characters, toggle character types, exclude ambiguous
          characters, and check strength with a live meter. Free, server-side
          generation, nothing stored.
        </p>
        <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {[
            "100% Free",
            "Up to 128 Characters",
            "Strength Meter",
            "Exclude Ambiguous Chars",
            "Nothing Stored",
            "No Signup",
          ].map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5b32b4] bg-[#f3ecff] border border-[#e9e1ff] px-3 py-1.5 rounded-full"
            >
              <CheckCircle2 size={12} className="text-[#c3003a]" />
              {badge}
            </span>
          ))}
        </div>
      </header>

      {/* ── Tool ────────────────────────────────────────────── */}
      <SecurePasswordGeneratorTools />

      {/* ── Direct Intent ───────────────────────────────────── */}
      <section
        className="max-w-4xl mx-auto space-y-8"
        aria-labelledby="intent-heading"
      >
        <h2
          id="intent-heading"
          className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
        >
          Why Weak Passwords Are Still the Biggest Security Risk
        </h2>
        <p className="text-gray-600 leading-relaxed">
          The majority of account breaches are not caused by sophisticated
          hacking — they are caused by weak, predictable, or reused passwords. A
          password like "Password1" or a common word with a number appended can
          be cracked in seconds using freely available tools and pre-compiled
          word lists. A 16-character randomly generated password using mixed
          character types, by contrast, would take millions of years to crack by
          brute force with current hardware.
        </p>
        <p className="text-gray-600 leading-relaxed">
          This tool generates passwords server-side using cryptographically
          secure randomness — not browser-based pseudo-random functions. You
          control the exact character set, length, and exclusions. The live
          strength meter gives immediate feedback on whether the generated
          password meets the threshold for genuine security, not just
          superficial complexity.
        </p>

        {/* Strength reference table */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base">
            Password length vs crack time — what the strength meter measures
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-[#e9e1ff]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f3ecff]">
                  {[
                    "Length / type",
                    "Example",
                    "Rating",
                    "Estimated crack time",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 font-bold text-[#5b32b4] text-xs uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {strengthRef.map((row, i) => (
                  <tr
                    key={row.length}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#faf7ff]"}
                  >
                    <td className="px-5 py-3 font-bold text-[#2b1d3a] text-xs">
                      {row.length}
                    </td>
                    <td className="px-5 py-3 text-xs font-mono text-gray-500 break-all">
                      {row.example}
                    </td>
                    <td className={`px-5 py-3 text-xs font-black ${row.color}`}>
                      {row.rating}
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-600">
                      {row.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Crack times assume modern GPU-based brute force. Against a leaked
            hash, actual times may be shorter. Always use the longest password a
            service permits.
          </p>
        </div>

        {/* Common mistakes callout */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base">
            Common password mistakes — and why they fail
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {passwordMistakes.map((m, i) => (
              <div
                key={m.mistake}
                className="rounded-2xl border border-[#e9e1ff] bg-gradient-to-br from-white to-[#faf7ff] p-4 flex items-start gap-3"
              >
                <AlertTriangle
                  size={14}
                  className={`shrink-0 mt-0.5 ${
                    i % 2 === 0 ? "text-[#c3003a]" : "text-amber-500"
                  }`}
                />
                <div>
                  <p className="font-bold text-[#2b1d3a] text-xs mb-0.5">
                    {m.mistake}
                  </p>
                  <p className="text-xs text-gray-500">{m.why}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Value intent */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#faf7ff] via-white to-[#fff5f9] border border-[#e9e1ff] p-6 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#fb397d]/10 blur-2xl pointer-events-none" />
          <div className="relative grid sm:grid-cols-2 gap-6">
            <div>
              <p className="font-bold text-[#2b1d3a] text-sm mb-3">
                When to generate a new strong password:
              </p>
              <ul className="space-y-2">
                {[
                  "Registering for any new online account",
                  "After a data breach notification from a service",
                  "When a site flags your current password as weak",
                  "When changing from a reused password to a unique one",
                  "For work accounts when starting a new job or project",
                  "Any time you are required to change a password",
                ].map((item, idx) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle2
                      size={13}
                      className={`mt-0.5 shrink-0 ${
                        idx % 2 === 0 ? "text-[#5b32b4]" : "text-[#c3003a]"
                      }`}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-bold text-[#2b1d3a] text-sm mb-3">
                What to do with generated passwords:
              </p>
              <ul className="space-y-2">
                {[
                  "Copy directly into a password manager — never write in a doc or note",
                  "Use a unique password for every account — never reuse",
                  "Enable two-factor authentication (2FA) alongside the password",
                  "Never share a generated password via email, chat, or SMS",
                  "Store the master password for your password manager somewhere physical and secure",
                  "Regenerate if you suspect any exposure or breach",
                ].map((item, idx) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle2
                      size={13}
                      className={`mt-0.5 shrink-0 ${
                        idx % 2 === 0 ? "text-[#c3003a]" : "text-[#5b32b4]"
                      }`}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── How to Use ──────────────────────────────────────── */}
      <section
        className="max-w-4xl mx-auto space-y-8"
        aria-labelledby="howto-heading"
      >
        <div className="text-center space-y-3">
          <h2
            id="howto-heading"
            className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
          >
            How to Generate a Secure Password
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Four steps. Custom settings. Strong result.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative bg-gradient-to-br from-white to-[#faf7ff] border border-[#e9e1ff] rounded-2xl p-6 overflow-hidden group hover:border-[#5b32b4]/40 hover:shadow-lg hover:shadow-[#5b32b4]/10 transition-all duration-300"
            >
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-[#5b32b4]/5 group-hover:bg-[#5b32b4]/10 transition-all" />
              <span className="text-5xl font-black text-[#f3ecff] leading-none block mb-3 select-none">
                {step.number}
              </span>
              <h3 className="font-bold text-[#2b1d3a] mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Benefits ────────────────────────────────────────── */}
      <section
        className="max-w-4xl mx-auto space-y-8"
        aria-labelledby="benefits-heading"
      >
        <div className="text-center space-y-3">
          <h2
            id="benefits-heading"
            className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
          >
            Why Use the Snappy-Fix Password Generator?
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Server-side cryptographic generation, live strength meter, exclude
            ambiguous characters, and up to 128 characters — in one tool.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-white border border-[#e9e1ff] rounded-2xl p-5 hover:border-[#5b32b4]/40 hover:shadow-md hover:shadow-[#5b32b4]/10 hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#f3ecff] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {benefit.icon}
              </div>
              <h3 className="font-bold text-[#2b1d3a] mb-1.5 text-sm">
                {benefit.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section
        className="max-w-3xl mx-auto space-y-6"
        aria-labelledby="faq-heading"
      >
        <div className="text-center space-y-3">
          <h2
            id="faq-heading"
            className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-sm">
            Everything you need to know about generating strong passwords and
            protecting your online accounts.
          </p>
          <div className="h-1 w-12 bg-[#fb397d] mx-auto rounded" />
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FaqItem
              key={i}
              index={i}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </section>

      {/* ── Other Tools ─────────────────────────────────────── */}
      <OtherToolsSection currentSlug="secure-password-generator" />
      <RandomToolsSection />
      <ToolCategoriesSection />
    </section>
  );
}
