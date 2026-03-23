import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import SecurePasswordGeneratorPageClient from "./client";

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
      <SecurePasswordGeneratorPageClient />
    </main>
  );
}
