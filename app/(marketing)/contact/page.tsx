// ─── app/contact/page.tsx ─────────────────────────────────────────────────────
import type { Metadata } from "next";
import Script from "next/script";
import ContactPageClient from "./Contactpageclient ";

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Contact Us | Get a Website Quote",
  description:
    "Contact Snappy-Fix Technologies for website development, web applications, mobile apps, and digital solutions. Based in Uyo, Nigeria — serving clients worldwide. We respond within 24 hours.",

  keywords: [
    "contact snappy-fix technologies",
    "hire web developer nigeria",
    "website development quote",
    "get a website built nigeria",
    "web developer uyo akwa ibom",
    "software company contact",
    "nigerian web development agency",
    "hire flutter developer nigeria",
    "web application development nigeria",
    "snappy-fix contact",
    "snappy-fix email",
    "snappy-fix phone number",
    "website quote nigeria",
    "tech company uyo nigeria",
  ],

  alternates: {
    canonical: "https://www.snappy-fix.com/contact",
  },

  openGraph: {
    title: "Contact Snappy-Fix Technologies | Get a Website Quote",
    description:
      "Get in touch with Snappy-Fix Technologies for website development, web apps, mobile apps, and digital solutions. Based in Uyo, Nigeria — responding within 24 hours.",
    url: "https://www.snappy-fix.com/contact",
    siteName: "Snappy-Fix Technologies",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/images/snappy-fix-logo.png",
        width: 1200,
        height: 630,
        alt: "Contact Snappy-Fix Technologies",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact Snappy-Fix Technologies | Get a Website Quote",
    description:
      "Get in touch for website development, web apps, mobile apps, and digital solutions. Based in Uyo, Nigeria — responding within 24 hours.",
    creator: "@snappyfix",
    site: "@snappyfix",
    images: [
      {
        url: "/images/snappy-fix-logo.png",
        alt: "Snappy-Fix Technologies",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  // ContactPage schema — tells Google this is a contact page and links it
  // back to the Organization entity in layout.tsx via @id
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Snappy-Fix Technologies",
    url: "https://www.snappy-fix.com/contact",
    description:
      "Contact Snappy-Fix Technologies for website development, web applications, mobile app development, and digital solutions. We respond within 24 hours.",
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: "Snappy-Fix Technologies",
      url: "https://www.snappy-fix.com",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.snappy-fix.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contact Us",
          item: "https://www.snappy-fix.com/contact",
        },
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "Snappy-Fix Technologies",
      url: "https://www.snappy-fix.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.snappy-fix.com/images/snappy-fix-logo.png",
        width: 512,
        height: 512,
      },
    },
  };

  // LocalBusiness schema — the most important schema for a contact page.
  // This is what powers Google's local business panel, maps listing,
  // and click-to-call features in search results.
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://www.snappy-fix.com/#localbusiness",
    name: "Snappy-Fix Technologies",
    url: "https://www.snappy-fix.com",
    logo: "https://www.snappy-fix.com/images/snappy-fix-logo.png",
    image: "https://www.snappy-fix.com/images/snappy-fix-logo.png",
    description:
      "Snappy-Fix Technologies is a Nigerian software development company building scalable websites, web applications, mobile apps, and free online image tools for businesses worldwide.",

    // Contact details — directly renders click-to-call and email in Google
    telephone: "+2348087690994",
    email: "snappyfix.tech@gmail.com",

    // Address
    address: {
      "@type": "PostalAddress",
      streetAddress: "Uyo",
      addressLocality: "Uyo",
      addressRegion: "Akwa Ibom",
      addressCountry: "NG",
    },

    // Geographic coordinates (Uyo, Akwa Ibom)
    geo: {
      "@type": "GeoCoordinates",
      latitude: 5.0377,
      longitude: 7.9128,
    },

    // Opening hours — Mon–Fri 9am–6pm WAT (UTC+1)
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],

    // Service area — broader than just Nigeria
    areaServed: [
      { "@type": "Country", name: "Nigeria" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "India" },
    ],

    // What they do
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website Development",
            description:
              "Custom websites and web applications built with Next.js, React, and Node.js.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mobile App Development",
            description:
              "Cross-platform iOS and Android apps built with Flutter.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Free Online Image Tools",
            description:
              "29+ free image tools — converters, compressors, optimisers, and more.",
          },
          price: "0",
          priceCurrency: "USD",
        },
      ],
    },

    // Social profiles
    sameAs: [
      "https://web.facebook.com/p/Snappy-fix-Technologies-100064249260204/",
    ],

    // Connects this to the Organization entity in layout.tsx
    parentOrganization: {
      "@type": "Organization",
      "@id": "https://www.snappy-fix.com/#organization",
      name: "Snappy-Fix Technologies",
    },
  };

  // FAQPage schema — matches your ContactFaq component.
  // Google can display these as expandable rich results under your
  // contact page in search, which increases click-through rate.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How long does a website project take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most blog and business websites take 1–2 weeks. E-commerce and SaaS platforms typically take 3–6 weeks depending on complexity. We agree on a timeline before starting and stick to it.",
        },
      },
      {
        "@type": "Question",
        name: "Do you work with international clients?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We work with clients across Nigeria, the UK, the US, Canada, and beyond. All project communication is done remotely via email, WhatsApp, and video calls.",
        },
      },
      {
        "@type": "Question",
        name: "Are the online tools really free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — completely free with no usage limits and no watermark. All 29 tools are free to use with no signup required.",
        },
      },
      {
        "@type": "Question",
        name: "Can you maintain my website after launch?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We offer post-launch maintenance and update packages. Just mention this in your enquiry and we will include maintenance options in the proposal.",
        },
      },
      {
        "@type": "Question",
        name: "What do you need to get started on a project?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A brief description of what you need, your target audience, any examples you like, and your budget range. Send us a message and we will take it from there.",
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="contact-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <Script
        id="contact-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ContactPageClient />
    </>
  );
}
