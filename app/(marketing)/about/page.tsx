import type { Metadata } from "next";
import Script from "next/script";
import AboutPageClient from "./Aboutpageclient";

export const metadata: Metadata = {
  title: "About Us | Nigerian Software Company & Free Image Tools",
  description:
    "Snappy-Fix Technologies is a Nigerian software development company founded in Uyo, Akwa Ibom. We build scalable websites, web apps, mobile apps, and 29+ free online image tools used by developers and businesses worldwide.",

  keywords: [
    "about snappy-fix technologies",
    "nigerian software company",
    "software development company uyo",
    "software development company akwa ibom",
    "web development company nigeria",
    "snappy-fix team",
    "nigerian tech company",
    "web developers nigeria",
    "flutter developers nigeria",
    "full stack developers nigeria",
    "free image tools company",
    "image optimization tools",
    "snappy-fix about",
    "software company port harcourt",
  ],

  alternates: {
    canonical: "https://www.snappy-fix.com/about",
  },

  openGraph: {
    title: "About Snappy-Fix Technologies | Nigerian Software Company",
    description:
      "Founded in Uyo, Nigeria — Snappy-Fix Technologies builds scalable websites, web applications, mobile apps, and 29+ free online image tools for developers and businesses worldwide.",
    url: "https://www.snappy-fix.com/about",
    siteName: "Snappy-Fix Technologies",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/images/snappy-fix-logo.png",
        width: 1200,
        height: 630,
        alt: "Snappy-Fix Technologies — Nigerian Software Company",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "About Snappy-Fix Technologies | Nigerian Software Company",
    description:
      "Founded in Uyo, Nigeria — Snappy-Fix Technologies builds websites, web apps, mobile apps, and 29+ free online image tools.",
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
export default function AboutPage() {
  // AboutPage schema — AboutPage type tells Google this is a company about page,
  // not a blog post or product page. Linked back to the Organization entity
  // from layout.tsx so Google can connect them in the Knowledge Graph.
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Snappy-Fix Technologies",
    url: "https://www.snappy-fix.com/about",
    description:
      "Snappy-Fix Technologies is a Nigerian software development company founded in Uyo, Akwa Ibom State. We build scalable websites, web applications, mobile apps using Flutter, React, and Next.js, and maintain a suite of 29+ free online image tools for developers, designers, and marketers worldwide.",
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: "Snappy-Fix Technologies",
      url: "https://www.snappy-fix.com",
    },
    about: {
      "@type": "Organization",
      "@id": "https://www.snappy-fix.com/#organization",
      name: "Snappy-Fix Technologies",
      url: "https://www.snappy-fix.com",
      logo: "https://www.snappy-fix.com/images/snappy-fix-logo.png",
      foundingDate: "2019",
      foundingLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Uyo",
          addressRegion: "Akwa Ibom",
          addressCountry: "NG",
        },
      },
      numberOfEmployees: {
        "@type": "QuantitativeValue",
        minValue: 1,
        maxValue: 10,
      },
      areaServed: [
        { "@type": "Country", name: "Nigeria" },
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "India" },
      ],
      knowsAbout: [
        "Web Application Development",
        "Mobile App Development",
        "Image Optimisation",
        "Web Performance",
        "Search Engine Optimisation",
        "PDF Processing",
        "Software as a Service",
        "Flutter Development",
        "React Development",
        "Next.js Development",
      ],
      sameAs: [
        "https://web.facebook.com/p/Snappy-fix-Technologies-100064249260204/",
      ],
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
          name: "About Us",
          item: "https://www.snappy-fix.com/about",
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

  // ItemList of services — helps Google surface your services
  // in rich results when someone searches for your company
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Snappy-Fix Technologies Services",
    description:
      "Software development and online tool services offered by Snappy-Fix Technologies",
    url: "https://www.snappy-fix.com/about",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Service",
          name: "Website & Web Application Development",
          description:
            "Custom websites, SaaS platforms, and web applications built with Next.js, React, and Node.js.",
          provider: {
            "@type": "Organization",
            name: "Snappy-Fix Technologies",
          },
          areaServed: "Worldwide",
          serviceType: "Web Development",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Service",
          name: "Mobile App Development",
          description:
            "Cross-platform iOS and Android mobile applications built with Flutter and Firebase.",
          provider: {
            "@type": "Organization",
            name: "Snappy-Fix Technologies",
          },
          areaServed: "Worldwide",
          serviceType: "Mobile Development",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Service",
          name: "Free Online Image Tools",
          description:
            "29+ free online image tools — converters, optimisers, compressors, watermark tools, favicon generators, and more.",
          provider: {
            "@type": "Organization",
            name: "Snappy-Fix Technologies",
          },
          url: "https://www.snappy-fix.com/tools",
          areaServed: "Worldwide",
          serviceType: "Software Tools",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Service",
          name: "SEO & Web Performance Optimisation",
          description:
            "PageSpeed, Core Web Vitals, and technical SEO built into every project from the start.",
          provider: {
            "@type": "Organization",
            name: "Snappy-Fix Technologies",
          },
          areaServed: "Worldwide",
          serviceType: "SEO Services",
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="about-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <Script
        id="about-services-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <AboutPageClient />
    </>
  );
}
