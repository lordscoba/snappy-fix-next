import Link from "next/link";
import Script from "next/script";

export const metadata = {
  title: "Privacy Policy | Snappy-fix Technologies",
  description:
    "Learn how Snappy-fix Technologies protects your privacy. Files uploaded to our tools are processed temporarily and are not permanently stored.",
  alternates: {
    canonical: "https://www.snappy-fix.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Snappy-fix Technologies",
    description:
      "Learn how Snappy-fix Technologies protects your privacy and processes uploaded files securely.",
    url: "https://www.snappy-fix.com/privacy",
    siteName: "Snappy-fix Technologies",
    type: "website",
  },
};

export default function Privacy() {
  return (
    <main className="bg-white">
      <Script
        id="privacy-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Privacy Policy",
              url: "https://www.snappy-fix.com/privacy",
              description:
                "Learn how Snappy-fix Technologies protects your privacy when using our online tools.",
            },
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Snappy-fix Technologies",
              url: "https://www.snappy-fix.com",
              logo: "https://www.snappy-fix.com/logo.png",
            },
          ]),
        }}
      />
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-[#5b32b4]">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">Last Updated: June 2025</p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            This Privacy Policy explains how Snappy-fix Technologies collects,
            uses, stores, shares, and protects your information when you visit
            our website at www.snappy-fix.com, use our online tools, or engage
            us for web and mobile development services.
          </p>
        </header>

        {/* Introduction */}
        <section className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            Snappy-fix Technologies ("we," "our," "us," or "Snappy-fix")
            operates the website located at www.snappy-fix.com. We are a
            professional web and mobile development company that also provides a
            collection of online digital productivity tools for image
            processing, PDF handling, media conversion, GIF generation, sticker
            creation, metadata analysis, security utilities, and other
            browser-based services.
          </p>
          <p>
            We understand that your privacy matters deeply. Whether you are
            visiting our website to learn about our development services,
            reaching out to us as a prospective client, or using any of our free
            online tools to process your digital files, this Privacy Policy
            governs how we handle any data associated with your interactions
            with us.
          </p>
          <p>
            This Privacy Policy is designed to be transparent, thorough, and
            easy to understand. We encourage you to read it in its entirety so
            that you have a clear picture of your rights and our obligations. If
            at any point you have questions or concerns about anything described
            in this policy, please do not hesitate to contact us through the
            contact information provided at the end of this document.
          </p>
          <p>
            By accessing or using the Snappy-fix website, tools, or services in
            any way, you acknowledge that you have read and understood this
            Privacy Policy and agree to the data practices described herein. If
            you do not agree with any part of this Privacy Policy, you should
            discontinue use of our website and services immediately.
          </p>
          <p>
            This Privacy Policy applies to all users of www.snappy-fix.com,
            including casual visitors, registered users, prospective clients,
            and active development clients. It covers all data collected through
            the website, tools platform, contact forms, email communications,
            project engagements, and any other interaction with Snappy-fix
            Technologies.
          </p>
        </section>

        {/* 1. Who We Are */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">1. Who We Are</h2>
          <p className="text-gray-700">
            Snappy-fix Technologies is a web and mobile development company
            operating through its website at www.snappy-fix.com. We provide
            professional digital services including custom website design and
            development, mobile application development for iOS and Android,
            progressive web application development, e-commerce solutions,
            content management system integration, UI/UX design, API
            development, cloud deployment, and ongoing technical maintenance and
            support.
          </p>
          <p className="text-gray-700">
            In addition to our core development services, we operate a suite of
            free and freemium online tools accessible through our website. These
            tools are designed to assist individuals, developers, designers, and
            businesses with everyday digital media and document tasks directly
            within the browser, without requiring software installation.
          </p>
          <p className="text-gray-700">
            For the purposes of applicable data protection laws, Snappy-fix
            Technologies acts as the data controller in respect of personal data
            collected through our website and services. For development projects
            in which we handle personal data belonging to a client's end users,
            we may act as a data processor on the client's behalf. In such
            cases, a separate data processing agreement will be established as
            required by applicable law.
          </p>
        </section>

        {/* 2. Information We Collect */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            2. Information We Collect
          </h2>
          <p className="text-gray-700">
            The information we collect depends on how you interact with
            Snappy-fix Technologies. We collect information in the following
            ways and categories:
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-2">
            2.1 Information You Provide Directly
          </h3>
          <p className="text-gray-700">
            When you voluntarily contact us, submit an inquiry, request a
            project quote, or communicate with us through our website's contact
            form, email, or any other channel, you may provide us with personal
            information including:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Your full name</li>
            <li>Email address</li>
            <li>Phone number (if provided)</li>
            <li>Company or organization name (if applicable)</li>
            <li>The content of your message, inquiry, or project brief</li>
            <li>
              Any documents, attachments, or materials you choose to share
            </li>
          </ul>
          <p className="text-gray-700">
            For development project clients who enter into formal agreements
            with Snappy-fix Technologies, we may additionally collect:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Billing name and address for invoicing purposes</li>
            <li>
              Payment confirmation details (note: we do not store full payment
              card numbers)
            </li>
            <li>Business registration or tax information where required</li>
            <li>
              Project-related materials including design assets, content,
              branding, and technical specifications
            </li>
            <li>
              Login credentials or access details for third-party platforms
              required to fulfill the project
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 pt-2">
            2.2 Automatically Collected Technical Information
          </h3>
          <p className="text-gray-700">
            When you visit our website, our servers and analytics systems
            automatically collect certain technical information about your
            device and browsing session. This information is collected for the
            purpose of operating, securing, and improving our platform and does
            not, on its own, identify you as a specific individual. This
            technical information may include:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              IP address and approximate geographic location derived from IP
              address
            </li>
            <li>Browser type, version, and language settings</li>
            <li>Operating system and device type (desktop, tablet, mobile)</li>
            <li>
              Referring website URL (the page you visited before arriving at our
              site)
            </li>
            <li>
              Pages visited within our website and time spent on each page
            </li>
            <li>Date and time of your visit</li>
            <li>
              Clicks, scrolls, and interactions with tools and interface
              elements
            </li>
            <li>Error logs and performance data</li>
            <li>Screen resolution and display settings</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 pt-2">
            2.3 Files Uploaded to Our Tools
          </h3>
          <p className="text-gray-700">
            When you use any of our online processing tools — such as image
            converters, PDF utilities, GIF generators, or other file-handling
            tools — you may upload digital files to our platform for temporary
            processing. These files may include images, videos, documents, PDFs,
            audio files, and other digital assets.
          </p>
          <p className="text-gray-700">
            We wish to be completely transparent: uploaded files are handled
            solely for the purpose of performing the operation you requested. We
            do not analyze, mine, or otherwise use the content of your files for
            any purpose beyond the immediate processing task. Further details
            about how we handle uploaded files are provided in Section 3 of this
            Privacy Policy.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-2">
            2.4 Cookies and Tracking Technologies
          </h3>
          <p className="text-gray-700">
            We use cookies and similar tracking technologies to enhance your
            experience on our website. Detailed information about our use of
            cookies is provided in Section 5 of this Privacy Policy.
          </p>
        </section>

        {/* 3. File Processing and Storage */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            3. File Processing and Storage
          </h2>
          <p className="text-gray-700">
            Our online tools require users to upload files in order to perform
            digital processing tasks. We want to be fully transparent about
            exactly how these files are handled from the moment they are
            uploaded to the moment they are deleted from our systems.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-2">
            3.1 No Permanent File Storage
          </h3>
          <p className="text-gray-700">
            Snappy-fix Technologies does NOT permanently store user-uploaded
            files. This is a core architectural principle of our platform. We
            have intentionally designed our tools to use ephemeral, temporary
            processing so that your files are never retained beyond what is
            strictly necessary to complete the task you requested.
          </p>
          <p className="text-gray-700">
            After a processing operation is completed and the output file is
            made available for your download, both the original uploaded file
            and the processed output file are automatically and permanently
            deleted from our systems. Output files are typically removed from
            temporary storage within one hour of generation. At no point do we
            maintain a permanent database of uploaded content.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-2">
            3.2 How Files Are Processed
          </h3>
          <p className="text-gray-700">
            Files uploaded through our tools are transmitted to our servers via
            encrypted HTTPS connections. Once received, files are temporarily
            stored in secure, isolated processing environments for the duration
            of the operation. They are not shared with other users, not
            transferred to third-party marketing platforms, and not used to
            train machine learning models or algorithms.
          </p>
          <p className="text-gray-700">
            Certain tools may operate entirely within the browser on your own
            device using client-side processing technology, meaning that in
            those cases your files never leave your device at all. Where this is
            the case, it will be indicated in the tool's interface.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-2">
            3.3 Your Responsibility for Uploaded Content
          </h3>
          <p className="text-gray-700">
            Because files are deleted after processing, you are responsible for
            retaining your own copies of both uploaded files and processed
            outputs. Snappy-fix Technologies accepts no responsibility for any
            loss of content resulting from the automatic deletion of temporary
            files.
          </p>
          <p className="text-gray-700">
            We strongly advise against uploading files that contain highly
            sensitive, classified, or confidential personal information through
            our public tools. While we implement reasonable security measures,
            our public tools platform is not designed or certified for the
            handling of classified government data, highly sensitive medical
            records, financial data subject to strict regulatory requirements,
            or similar high-risk content categories. For such requirements,
            please contact us to discuss private processing arrangements.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-2">
            3.4 Metadata in Uploaded Files
          </h3>
          <p className="text-gray-700">
            Files uploaded to our platform may contain embedded metadata such as
            EXIF data in images (which can include GPS coordinates, device
            information, timestamps, and other details). Some of our tools are
            specifically designed to help users view or strip such metadata for
            privacy purposes. We do not extract, store, or analyze metadata from
            uploaded files for any purpose beyond the tool's stated function.
          </p>
        </section>

        {/* 4. How We Use Your Information */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            4. How We Use Your Information
          </h2>
          <p className="text-gray-700">
            Snappy-fix Technologies uses the information we collect strictly for
            legitimate business and operational purposes. We do not use your
            data in ways that are inconsistent with the purposes for which it
            was originally collected without your knowledge or consent.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-2">
            4.1 Operating and Improving Our Platform
          </h3>
          <p className="text-gray-700">
            We use automatically collected technical data and anonymized
            analytics information to maintain, monitor, and continuously improve
            our website and tools. This includes identifying and resolving
            technical errors, monitoring server health and performance,
            optimizing page load speeds, and understanding which tools and
            features are most used and valued by our audience.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-2">
            4.2 Responding to Inquiries and Managing Client Relationships
          </h3>
          <p className="text-gray-700">
            When you contact us through our website or by email, we use the
            personal information you provide to respond to your inquiry, provide
            a project quote, discuss your requirements, and manage our ongoing
            relationship with you as a client or prospective client. This
            information may be stored in our internal customer relationship
            management systems for the duration of our business relationship and
            for a reasonable retention period thereafter in accordance with
            applicable law.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-2">
            4.3 Delivering Development Services
          </h3>
          <p className="text-gray-700">
            For clients who engage Snappy-fix Technologies for web or mobile
            development services, we use the information and materials provided
            by the client solely for the purpose of designing, developing,
            testing, and delivering the agreed project. This may include using
            client-provided content, brand assets, access credentials, and
            technical specifications to build and deploy the client's product.
            We do not use client project materials for any purpose outside of
            fulfilling the project agreement.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-2">
            4.4 Preventing Abuse and Ensuring Security
          </h3>
          <p className="text-gray-700">
            Technical data including IP addresses, request logs, and usage
            patterns are used to detect and prevent abusive, fraudulent, or
            unauthorized use of our platform. This includes identifying bot
            traffic, preventing denial-of-service attacks, enforcing rate
            limits, and blocking users or IP addresses that violate our Terms of
            Service.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-2">
            4.5 Legal Compliance
          </h3>
          <p className="text-gray-700">
            We may use or disclose your information where required to do so by
            applicable law, regulation, legal process, or enforceable
            governmental request. This includes complying with court orders,
            subpoenas, regulatory investigations, or mandatory reporting
            obligations. Where legally permissible, we will endeavor to notify
            you before disclosing your information in response to a legal
            request.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-2">
            4.6 What We Do NOT Do With Your Information
          </h3>
          <p className="text-gray-700">
            We want to be explicit about practices we do not engage in:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>We do NOT sell your personal data to any third party, ever.</li>
            <li>
              We do NOT rent or lease your personal data to advertisers or data
              brokers.
            </li>
            <li>
              We do NOT use your uploaded files to train machine learning
              models.
            </li>
            <li>We do NOT permanently retain uploaded tool files.</li>
            <li>
              We do NOT share your personal data with third parties for their
              own independent marketing purposes.
            </li>
            <li>
              We do NOT use your data to build advertising profiles or engage in
              behavioral advertising.
            </li>
          </ul>
        </section>

        {/* 5. Cookies and Analytics */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            5. Cookies and Analytics
          </h2>
          <p className="text-gray-700">
            Cookies are small text files placed on your device by websites you
            visit. They are widely used to make websites work efficiently and to
            provide website operators with analytical information about usage
            patterns. Our website uses cookies and similar technologies for
            purposes described in this section.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-2">
            5.1 Types of Cookies We Use
          </h3>
          <p className="text-gray-700">
            We may use the following categories of cookies on our website:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <span className="font-medium">Essential Cookies:</span> These are
              necessary for the website to function correctly. They enable core
              features such as navigation, tool functionality, and security.
              Without these cookies, the website cannot function properly and
              they cannot be disabled.
            </li>
            <li>
              <span className="font-medium">
                Performance and Analytics Cookies:
              </span>{" "}
              These cookies collect anonymous information about how visitors use
              our website — including which pages are visited most frequently,
              how long visitors spend on each page, and whether any errors
              occur. This data helps us understand and improve the performance
              of our platform.
            </li>
            <li>
              <span className="font-medium">Functional Cookies:</span> These
              cookies remember preferences and settings you have selected to
              improve your experience, such as language preferences or tool
              configuration options.
            </li>
            <li>
              <span className="font-medium">Security Cookies:</span> These
              cookies help us detect and prevent fraudulent activity, abuse, and
              unauthorized access attempts, supporting the overall security of
              our platform.
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 pt-2">
            5.2 Third-Party Analytics
          </h3>
          <p className="text-gray-700">
            We may use third-party analytics services such as Google Analytics
            or similar tools to help us understand how visitors interact with
            our website. These services may use cookies and similar technologies
            to collect anonymous usage data on our behalf. The data collected is
            aggregated and anonymized and is used only for the purpose of
            improving our website and services.
          </p>
          <p className="text-gray-700">
            Third-party analytics providers are contractually prohibited from
            using your data for their own independent advertising purposes and
            are required to process it only in accordance with our instructions
            and applicable law. Please refer to the privacy policies of any
            third-party analytics services for additional information about
            their data practices.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-2">
            5.3 Managing and Disabling Cookies
          </h3>
          <p className="text-gray-700">
            You have the right to control and manage the use of cookies on your
            device. Most modern web browsers allow you to manage cookies through
            your browser's settings, including the ability to block, delete, or
            receive notifications when cookies are being set. The specific steps
            to manage cookies vary by browser, but are typically found in the
            browser's "Privacy," "Security," or "Settings" section.
          </p>
          <p className="text-gray-700">
            Please be aware that disabling certain cookies — particularly
            essential cookies — may affect the functionality of our website and
            tools, and some features may not work correctly if cookies are
            disabled.
          </p>
          <p className="text-gray-700">
            Additionally, you may opt out of certain third-party analytics
            tracking by installing available browser opt-out tools, such as the
            Google Analytics Opt-out Browser Add-on where applicable.
          </p>
        </section>

        {/* 6. Data Sharing and Third-Party Services */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            6. Data Sharing and Third-Party Services
          </h2>
          <p className="text-gray-700">
            Snappy-fix Technologies does not sell, trade, or rent your personal
            data to third parties for their own use. We may share limited
            information with trusted third-party service providers strictly for
            the purpose of operating our website, platform, and business. The
            following describes the categories of third parties with whom we may
            share data and the reasons for doing so.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-2">
            6.1 Infrastructure and Hosting Providers
          </h3>
          <p className="text-gray-700">
            Our website and tools are hosted on third-party cloud infrastructure
            providers. These providers process data on our behalf in the course
            of providing hosting, storage, and computing services. They are
            contractually bound to process data only according to our
            instructions and to maintain appropriate security standards.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-2">
            6.2 Content Delivery Networks (CDNs)
          </h3>
          <p className="text-gray-700">
            We may use content delivery network services to improve website
            performance and loading speeds globally. CDN providers may process
            technical information such as IP addresses as part of their
            infrastructure operations.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-2">
            6.3 Analytics Providers
          </h3>
          <p className="text-gray-700">
            We use third-party analytics services to understand website usage.
            These providers receive anonymized, aggregated technical data. They
            do not receive personal identifying information and are prohibited
            from using the data for any purpose beyond providing analytics
            services to us.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-2">
            6.4 Payment Processors
          </h3>
          <p className="text-gray-700">
            For development project clients, payments are processed through
            secure third-party payment processors. When you make a payment, your
            payment details are handled directly by the payment processor and
            are subject to their security standards and privacy policies.
            Snappy-fix Technologies does not store full payment card numbers or
            sensitive financial credentials on our own systems.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-2">
            6.5 Communication and Collaboration Tools
          </h3>
          <p className="text-gray-700">
            We may use third-party tools for business communication, project
            management, and collaboration with clients, such as email services,
            video conferencing platforms, or project management software. Data
            shared through these channels is subject to the privacy policies of
            the respective platforms. We take care to use reputable, secure
            communication platforms with appropriate data protection standards.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-2">
            6.6 Legal Disclosure
          </h3>
          <p className="text-gray-700">
            We may disclose your personal information to law enforcement
            agencies, government authorities, courts, or other relevant parties
            when we are legally required to do so, including but not limited to
            compliance with court orders, subpoenas, legal process, or
            government investigations. We may also disclose information where we
            believe disclosure is necessary to protect the rights, property, or
            safety of Snappy-fix Technologies, our users, or the public.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-2">
            6.7 Business Transfers
          </h3>
          <p className="text-gray-700">
            In the event that Snappy-fix Technologies undergoes a merger,
            acquisition, restructuring, sale of assets, or similar business
            transaction, your personal information may be transferred as part of
            that transaction. We will endeavor to ensure that any successor
            entity is bound to honor the commitments made in this Privacy Policy
            with respect to your personal data. We will notify you of any such
            material change through our website or via email where required by
            applicable law.
          </p>
        </section>

        {/* 7. International Data Transfers */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            7. International Data Transfers
          </h2>
          <p className="text-gray-700">
            Snappy-fix Technologies operates globally and serves clients and
            users from many different countries. As a result, your personal data
            may be processed in countries other than the country in which you
            are located. Different countries have different data protection
            laws, and the level of protection afforded to personal data in some
            countries may differ from that in your home country.
          </p>
          <p className="text-gray-700">
            Where we transfer personal data internationally — including to our
            cloud infrastructure providers or other third-party service
            providers located in different jurisdictions — we take steps to
            ensure that appropriate safeguards are in place to protect your data
            in accordance with applicable law. Such safeguards may include
            standard contractual clauses approved by relevant data protection
            authorities, adequacy decisions, or other recognized legal
            mechanisms for cross-border data transfers.
          </p>
          <p className="text-gray-700">
            For users located in the European Economic Area (EEA), the United
            Kingdom, or Switzerland, we comply with applicable requirements
            governing international transfers of personal data, including GDPR
            Chapter V requirements and UK GDPR provisions where applicable.
          </p>
          <p className="text-gray-700">
            By using our website and services, you acknowledge and consent to
            the transfer, processing, and storage of your information in
            countries other than your country of residence, subject to the
            safeguards described above.
          </p>
        </section>

        {/* 8. Data Retention */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            8. Data Retention
          </h2>
          <p className="text-gray-700">
            We retain your personal data only for as long as is necessary for
            the purposes described in this Privacy Policy, and for as long as
            required by applicable law. The specific retention period depends on
            the type of data and the context in which it was collected.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <span className="font-medium">Uploaded tool files:</span> Deleted
              automatically within one hour of processing completion. No
              permanent copies are retained.
            </li>
            <li>
              <span className="font-medium">
                Contact form submissions and email correspondence:
              </span>{" "}
              Retained for as long as is necessary to respond to your inquiry
              and for a reasonable period thereafter in case of follow-up
              queries, typically up to 2 years unless you request earlier
              deletion.
            </li>
            <li>
              <span className="font-medium">Active client project data:</span>{" "}
              Retained for the duration of the project engagement and for a
              post-project period as required for warranty, maintenance, dispute
              resolution, and legal compliance purposes, typically up to 5 years
              following project completion.
            </li>
            <li>
              <span className="font-medium">
                Financial and billing records:
              </span>{" "}
              Retained for the period required by applicable tax and accounting
              laws, typically 5 to 7 years.
            </li>
            <li>
              <span className="font-medium">
                Server logs and technical data:
              </span>{" "}
              Typically retained for up to 90 days for security monitoring and
              performance analysis, after which they are deleted or anonymized.
            </li>
            <li>
              <span className="font-medium">Analytics data:</span> Aggregated
              and anonymized analytics data may be retained indefinitely for the
              purpose of trend analysis and platform improvement.
            </li>
          </ul>
          <p className="text-gray-700">
            Once the applicable retention period expires, we securely delete or
            anonymize personal data so that it can no longer be associated with
            you. If you have made a request for erasure of your personal data
            (see Section 10), we will delete your data earlier where we are not
            required by law to retain it.
          </p>
        </section>

        {/* 9. Data Security */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            9. Data Security
          </h2>
          <p className="text-gray-700">
            The security of your data is a priority for Snappy-fix Technologies.
            We implement a range of technical and organizational security
            measures designed to protect your personal data against unauthorized
            access, accidental loss, disclosure, alteration, or destruction.
          </p>
          <p className="text-gray-700">
            Our security measures include, but are not limited to:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              Encryption of data in transit using HTTPS/TLS protocols for all
              communications between your browser and our servers
            </li>
            <li>Secure, isolated processing environments for uploaded files</li>
            <li>
              Access controls and authentication mechanisms to restrict access
              to personal data within our organization to those with a
              legitimate need
            </li>
            <li>Regular security monitoring and system health checks</li>
            <li>Automated rate limiting and abuse detection systems</li>
            <li>
              Temporary processing architecture that eliminates the risk of
              long-term file exposure
            </li>
            <li>
              Regular review of our data handling practices and security posture
            </li>
            <li>
              Confidentiality obligations for all personnel who may access
              personal data
            </li>
          </ul>
          <p className="text-gray-700">
            While we take these precautions seriously and apply
            industry-standard security practices, no internet-based system or
            data transmission can be guaranteed to be completely secure. We
            cannot provide an absolute guarantee of the security of data
            transmitted to or from our website. You transmit data to us at your
            own risk.
          </p>
          <p className="text-gray-700">
            In the event of a data breach that is likely to result in a risk to
            your rights and freedoms, we will notify you and any applicable
            regulatory authorities in accordance with our obligations under
            applicable data protection law, within the timeframes required by
            law.
          </p>
          <p className="text-gray-700">
            If you discover or suspect any security vulnerability or breach
            related to our platform, please contact us immediately using the
            contact details provided in Section 14 of this Privacy Policy. We
            take all security reports seriously and are committed to addressing
            legitimate security concerns promptly.
          </p>
        </section>

        {/* 10. Your Rights and Choices */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            10. Your Rights and Choices
          </h2>
          <p className="text-gray-700">
            Depending on your location and applicable data protection law, you
            may have certain rights in relation to your personal data.
            Snappy-fix Technologies is committed to honoring these rights where
            they apply to you. The following outlines the rights you may have
            and how to exercise them.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-2">
            10.1 Right of Access
          </h3>
          <p className="text-gray-700">
            You have the right to request a copy of the personal data we hold
            about you. We will provide this information in a commonly used,
            machine-readable format where possible. We may ask you to verify
            your identity before fulfilling an access request.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-2">
            10.2 Right to Rectification
          </h3>
          <p className="text-gray-700">
            If any personal data we hold about you is inaccurate or incomplete,
            you have the right to request that we correct or update it. We will
            act on such requests promptly.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-2">
            10.3 Right to Erasure ("Right to Be Forgotten")
          </h3>
          <p className="text-gray-700">
            You have the right to request that we delete personal data we hold
            about you in certain circumstances — for example, where the data is
            no longer necessary for the purpose for which it was collected, or
            where you withdraw consent on which processing was based. We will
            fulfill erasure requests except where we have a legal obligation or
            legitimate ground to retain the data.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-2">
            10.4 Right to Restriction of Processing
          </h3>
          <p className="text-gray-700">
            In certain circumstances, you have the right to request that we
            restrict the processing of your personal data — for example, while a
            dispute about data accuracy is being resolved, or where you have
            objected to processing pending verification of our legitimate
            grounds.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-2">
            10.5 Right to Data Portability
          </h3>
          <p className="text-gray-700">
            Where processing is based on your consent or on a contract, and
            processing is carried out by automated means, you may have the right
            to receive the personal data you have provided to us in a
            structured, commonly used, machine-readable format, and to have that
            data transmitted directly to another controller where technically
            feasible.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-2">
            10.6 Right to Object
          </h3>
          <p className="text-gray-700">
            You have the right to object to the processing of your personal data
            where processing is based on legitimate interests or is carried out
            for direct marketing purposes. We will cease processing upon receipt
            of a valid objection unless we can demonstrate compelling legitimate
            grounds for the processing that override your interests, rights, and
            freedoms.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-2">
            10.7 Rights Related to Automated Decision-Making
          </h3>
          <p className="text-gray-700">
            We do not engage in automated decision-making (including profiling)
            that produces legal or similarly significant effects on individuals.
            If this changes in the future, we will update this Privacy Policy
            accordingly and provide appropriate information about your rights in
            this regard.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-2">
            10.8 How to Exercise Your Rights
          </h3>
          <p className="text-gray-700">
            To exercise any of the rights described above, please contact us
            using the information provided in Section 14. We will respond to all
            legitimate requests within 30 days. In cases of complexity or
            multiple requests, we may extend this period by up to an additional
            two months, in which case we will notify you of the extension and
            the reasons for it. We will not charge a fee for reasonable
            requests.
          </p>
          <p className="text-gray-700">
            Please note that some rights are subject to conditions and
            exceptions under applicable law. We will inform you if we are unable
            to fulfill a request and the reasons why.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-2">
            10.9 Right to Lodge a Complaint
          </h3>
          <p className="text-gray-700">
            If you believe that our processing of your personal data infringes
            applicable data protection law, you have the right to lodge a
            complaint with the relevant supervisory or data protection authority
            in your country or region. We would, however, appreciate the
            opportunity to address your concerns directly before you approach a
            regulatory authority, and encourage you to contact us in the first
            instance.
          </p>
        </section>

        {/* 11. Legal Bases for Processing (GDPR) */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            11. Legal Bases for Processing Personal Data
          </h2>
          <p className="text-gray-700">
            For users located in the European Economic Area (EEA), the United
            Kingdom, or other jurisdictions that require us to identify a legal
            basis for processing personal data, the following describes the
            legal bases upon which we rely when processing your personal data.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <span className="font-medium">Performance of a Contract:</span>{" "}
              Where processing is necessary to fulfill our obligations under a
              development project agreement or service arrangement with you,
              including responding to pre-contractual inquiries.
            </li>
            <li>
              <span className="font-medium">Legitimate Interests:</span> Where
              processing is necessary for our legitimate business interests,
              such as maintaining the security and performance of our platform,
              preventing abuse, analyzing usage to improve our services, and
              managing our business operations — provided that your fundamental
              rights and interests are not overridden.
            </li>
            <li>
              <span className="font-medium">Legal Obligation:</span> Where
              processing is required for us to comply with applicable legal
              obligations, including tax and financial record-keeping
              requirements, regulatory reporting, or responses to lawful
              governmental requests.
            </li>
            <li>
              <span className="font-medium">Consent:</span> Where you have given
              explicit consent for a specific processing activity, such as
              subscribing to marketing communications or accepting non-essential
              cookies. You may withdraw consent at any time without affecting
              the lawfulness of prior processing based on consent.
            </li>
          </ul>
        </section>

        {/* 12. Children's Privacy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            12. Children's Privacy
          </h2>
          <p className="text-gray-700">
            The Snappy-fix website and services are not directed to or intended
            for use by children under the age of 13. We do not knowingly
            collect, solicit, or process personal information from children
            under 13 years of age.
          </p>
          <p className="text-gray-700">
            If you are a parent or legal guardian and you believe that your
            child under the age of 13 has provided personal information to us
            without your knowledge or consent, please contact us immediately
            using the contact details in Section 14. Upon receiving such
            notification, we will take prompt steps to verify the situation and,
            where confirmed, to delete the child's personal information from our
            systems as quickly as possible.
          </p>
          <p className="text-gray-700">
            Users between the ages of 13 and 17 may use our website with the
            knowledge and consent of a parent or legal guardian. By allowing a
            minor to use our platform, the parent or guardian agrees to this
            Privacy Policy and accepts responsibility for the minor's use of our
            services. Snappy-fix Technologies encourages parents and guardians
            to actively engage with and supervise their children's online
            activities.
          </p>
          <p className="text-gray-700">
            Engagement of Snappy-fix Technologies for development services
            requires the user to be 18 years of age or older, or the age of
            majority in their jurisdiction, as it involves entering into a
            legally binding contract.
          </p>
        </section>

        {/* 13. Changes to This Privacy Policy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            13. Changes to This Privacy Policy
          </h2>
          <p className="text-gray-700">
            Snappy-fix Technologies reserves the right to update, revise, or
            modify this Privacy Policy at any time to reflect changes in our
            data practices, business operations, applicable law, or regulatory
            requirements. When we make changes to this Privacy Policy, we will
            update the "Last Updated" date displayed at the top of this page.
          </p>
          <p className="text-gray-700">
            For material changes — that is, changes that significantly affect
            how we collect, use, or share your personal data — we will make
            reasonable efforts to notify you, which may include prominently
            displaying a notice on our website, sending a notification to
            registered users, or reaching out to active clients directly via
            email. The method of notification will depend on the nature of the
            change and the information we hold about you.
          </p>
          <p className="text-gray-700">
            We encourage you to review this Privacy Policy periodically to stay
            informed about how we are protecting your information. Your
            continued use of the Snappy-fix website and services after any
            revised Privacy Policy has been posted constitutes your acceptance
            of the updated terms. If you do not agree with any changes, you
            should discontinue use of our services.
          </p>
          <p className="text-gray-700">
            Previous versions of this Privacy Policy may be made available upon
            request. If you have questions about any specific change, please
            contact us and we will be happy to explain.
          </p>
        </section>

        {/* 14. Contact Us */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">14. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions, concerns, or requests relating to this
            Privacy Policy or the way Snappy-fix Technologies handles your
            personal data, we encourage you to get in touch with us. We are
            committed to addressing all legitimate privacy inquiries in a
            timely, professional, and transparent manner.
          </p>
          <p className="text-gray-700">
            You may contact us for any of the following reasons:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>To exercise any of your data rights described in Section 10</li>
            <li>
              To ask questions about this Privacy Policy or our data practices
            </li>
            <li>To report a suspected data breach or security vulnerability</li>
            <li>To withdraw consent for any processing based on consent</li>
            <li>
              To raise a concern or complaint about how your data is being
              handled
            </li>
            <li>
              To request a copy of previous versions of this Privacy Policy
            </li>
            <li>
              To discuss data processing arrangements for a development project
            </li>
          </ul>
          <p className="text-gray-700">
            We aim to respond to all privacy-related inquiries within 5 business
            days for general questions, and within 30 days for formal data
            rights requests in accordance with applicable law.
          </p>
          <p className="text-gray-700">
            Please reach out to us through our official contact page:
          </p>
          <Link
            href="/#contact"
            className="text-[#fb397d] font-semibold hover:underline"
          >
            Contact Snappy-fix Technologies →
          </Link>
        </section>
      </section>
    </main>
  );
}
