import SecurePasswordGeneratorTools from "@/components/tools/PasswordGeneratorTools";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";

const currentTool = tools.find(
  (tool) => tool.slug === "secure-password-generator",
)!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}
export default function SecurePasswordGeneratorPage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a secure password generator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A secure password generator creates strong random passwords using combinations of letters, numbers, and symbols to improve account security.",
        },
      },
      {
        "@type": "Question",
        name: "Why should I use a password generator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Using a password generator helps create complex passwords that are difficult for hackers to guess or crack using brute force attacks.",
        },
      },
      {
        "@type": "Question",
        name: "Are generated passwords stored?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. The Snappy Fix Secure Password Generator creates passwords directly in your browser and does not store them on our servers.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Generate a Secure Password",
    description:
      "Step-by-step guide to generating strong and secure passwords using the Snappy Fix Secure Password Generator.",
    totalTime: "PT15S",
    supply: [
      {
        "@type": "HowToSupply",
        name: "Password requirements (length, symbols, numbers, etc.)",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Snappy Fix Secure Password Generator",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Choose password settings",
        text: "Select the desired password length and character types such as letters, numbers, and symbols.",
      },
      {
        "@type": "HowToStep",
        name: "Generate the password",
        text: "Click the generate button to create a strong random password.",
      },
      {
        "@type": "HowToStep",
        name: "Copy the password",
        text: "Copy the generated password and use it to secure your account.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="secure-password-generator-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />

      <Script
        id="secure-password-generator-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Script
        id="secure-password-generator-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />

      <Script
        id="secure-password-generator-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <ToolTopNav />
      <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-3 py-16 space-y-16">
        {/* Header */}
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
            Secure Password Generator
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Instantly generate strong and secure passwords to protect your
            online accounts. Customize password length and include symbols,
            numbers, and uppercase or lowercase characters for maximum security.
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        {/* Tool Component */}
        <SecurePasswordGeneratorTools />

        {/* SEO Content Section */}
        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Generate Strong and Secure Passwords Instantly
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Weak passwords are one of the biggest security risks online. Our
            Secure Password Generator helps you create highly secure random
            passwords with customizable options such as length, symbols,
            numbers, and special characters. These strong passwords help protect
            your accounts from hacking and brute-force attacks.
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
            <li>Generate strong random passwords instantly</li>
            <li>Customize length and character types</li>
            <li>Include symbols, numbers, and letters</li>
            <li>Secure browser-based generation</li>
            <li>Free and unlimited usage</li>
          </ul>
        </section>

        {/* Other Tools */}
        <OtherToolsSection currentSlug="secure-password-generator" />

        {/* Random tools */}
        <RandomToolsSection />

        {/* Categories */}
        <ToolCategoriesSection />
      </section>
    </main>
  );
}
