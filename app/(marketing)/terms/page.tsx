import Link from "next/link";
import Script from "next/script";

export const metadata = {
  title: "Terms of Service | Snappy-fix Technologies",
  description:
    "Read the terms and conditions for using Snappy-fix Technologies online tools platform including file processing, usage policies, and service rules.",
  alternates: {
    canonical: "https://snappy-fix.com/terms",
  },
  openGraph: {
    title: "Terms of Service | Snappy-fix Technologies",
    description:
      "Terms and conditions governing the use of Snappy-fix Technologies online tools and services.",
    url: "https://snappy-fix.com/terms",
    siteName: "Snappy-fix Technologies",
    type: "website",
  },
};

export default function Terms() {
  return (
    <main className="bg-white">
      <Script
        id="terms-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Terms of Service",
              url: "https://snappy-fix.com/terms",
              description:
                "Terms and conditions governing the use of Snappy-fix Technologies tools platform.",
            },
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Snappy-fix Technologies",
              url: "https://snappy-fix.com",
              logo: "https://snappy-fix.com/logo.png",
            },
          ]),
        }}
      />
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-[#5b32b4]">
            Terms of Service
          </h1>
          <p className="text-gray-500 text-sm">Last Updated: June 2025</p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These Terms of Service govern the use of Snappy-fix Technologies'
            website, web and mobile development services, tools platform, APIs,
            and all related services offered through www.snappy-fix.com.
          </p>
        </header>

        {/* Introduction */}
        <section className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            Welcome to Snappy-fix Technologies. These Terms of Service ("Terms,"
            "Agreement") form a legally binding contract between you ("User,"
            "Client," "you," or "your") and Snappy-fix Technologies
            ("Snappy-fix," "we," "us," or "our") regarding your access to and
            use of the Snappy-fix website located at www.snappy-fix.com, all
            subdomains, mobile applications, APIs, and online tools platform.
          </p>
          <p>
            Snappy-fix Technologies is a full-service web and mobile development
            company. We design, build, and deploy custom digital products
            including websites, progressive web applications, native and
            cross-platform mobile applications, e-commerce platforms, content
            management systems, and bespoke software solutions for individuals,
            startups, small-to-medium enterprises, and large organizations
            across a wide range of industries.
          </p>
          <p>
            In addition to our core web and mobile development services,
            Snappy-fix provides a suite of web-based digital productivity tools
            designed to help individuals, developers, designers, and businesses
            process, convert, optimize, and analyze digital media and documents.
            These services include tools such as image converters, PDF
            utilities, GIF generation tools, sticker creation tools, image
            optimization tools, metadata analysis tools, security utilities, and
            other digital productivity services.
          </p>
          <p>
            These Terms apply to all visitors, registered users, project
            clients, API consumers, and any other parties who access or use any
            part of the Snappy-fix platform or engage Snappy-fix Technologies
            for development services, whether directly, through a third-party
            referral, or through any partner arrangement. By accessing or using
            the Snappy-fix platform or services in any way, you acknowledge that
            you have read, understood, and agree to be legally bound by these
            Terms and by our Privacy Policy, which is incorporated herein by
            reference.
          </p>
          <p>
            If you do not agree to these Terms in their entirety, you must
            immediately stop accessing or using our website, services, tools,
            and APIs.
          </p>
        </section>

        {/* 1. Eligibility */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">1. Eligibility</h2>
          <p className="text-gray-700">
            You must be at least 13 years of age to use the Snappy-fix platform
            in any capacity. Users between the ages of 13 and 17 may only use
            the platform with the express knowledge and consent of a parent or
            legal guardian who agrees to be bound by these Terms on their
            behalf.
          </p>
          <p className="text-gray-700">
            To engage Snappy-fix Technologies for web or mobile development
            projects, including the signing of project agreements, scope of work
            documents, or any paid service arrangement, you must be at least 18
            years of age or the age of majority in your jurisdiction, whichever
            is higher, and must have the legal capacity to enter into a binding
            contract.
          </p>
          <p className="text-gray-700">
            By accessing the website or engaging our services, you represent and
            warrant that you meet the applicable age requirement and have the
            full legal right, power, and authority to enter into and perform
            your obligations under these Terms.
          </p>
          <p className="text-gray-700">
            If you are accessing or using Snappy-fix services on behalf of a
            corporation, limited liability company, partnership, nonprofit
            organization, government entity, or any other legal entity, you
            represent and warrant that: (a) you have the authority to bind that
            entity to these Terms; (b) the entity is duly organized and validly
            existing under applicable law; and (c) your agreement to these Terms
            on behalf of the entity creates a legally binding obligation for
            that entity.
          </p>
          <p className="text-gray-700">
            Snappy-fix reserves the right to verify eligibility at any time and
            to suspend or terminate access for any user who does not meet the
            requirements set forth in this section.
          </p>
        </section>

        {/* 2. Web & Mobile Development Services */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            2. Web and Mobile Development Services
          </h2>
          <p className="text-gray-700">
            Snappy-fix Technologies is a professional web and mobile development
            company. Our primary business offering includes the design,
            development, testing, deployment, and ongoing maintenance of digital
            products and software applications for clients across industries
            worldwide.
          </p>
          <p className="text-gray-700">
            Our web and mobile development services include but are not limited
            to:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Custom website design and development</li>
            <li>
              Mobile application development for iOS and Android platforms
            </li>
            <li>Progressive web application (PWA) development</li>
            <li>E-commerce platform development and integration</li>
            <li>
              Content management system (CMS) setup, customization, and
              deployment
            </li>
            <li>API design, development, and integration</li>
            <li>UI/UX design and prototyping</li>
            <li>Cloud deployment and infrastructure setup</li>
            <li>Website maintenance, updates, and technical support</li>
            <li>
              Performance optimization and search engine optimization (SEO)
              implementation
            </li>
            <li>
              Third-party software integrations (payment gateways, CRMs, ERPs,
              etc.)
            </li>
            <li>Custom software and SaaS platform development</li>
          </ul>
          <p className="text-gray-700">
            All development projects are governed by individual project
            agreements, statements of work, or contracts entered into between
            Snappy-fix Technologies and the client. In the event of any conflict
            between a specific project agreement and these Terms, the project
            agreement shall take precedence for matters specifically addressed
            therein, while these Terms shall govern all other matters.
          </p>
          <p className="text-gray-700">
            Snappy-fix Technologies does not guarantee specific outcomes,
            timelines, or business results from the products we develop, as
            final results depend on many factors outside our control, including
            client-provided content, third-party services, market conditions,
            and ongoing maintenance after delivery. We commit to delivering
            professional, industry-standard work in accordance with mutually
            agreed specifications.
          </p>
          <p className="text-gray-700">
            All project engagements are subject to Snappy-fix's standard
            pricing, payment schedule, and revision policies as outlined in the
            relevant project agreement. Clients are expected to provide timely
            feedback, required content, credentials, and approvals to ensure
            projects can be completed within agreed timelines. Delays resulting
            from client inaction may affect project deadlines and could result
            in additional charges as specified in the project agreement.
          </p>
        </section>

        {/* 3. Description of Digital Tool Services */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            3. Description of Digital Tool Services
          </h2>
          <p className="text-gray-700">
            In addition to its development services, Snappy-fix Technologies
            provides a collection of online processing tools that operate
            directly within the browser or through server-based processing.
            These tools are made available free of charge or on a freemium basis
            and are intended to assist users with common digital media and
            document tasks.
          </p>
          <p className="text-gray-700">These services may include:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Image conversion and format transformation tools</li>
            <li>Image editing and manipulation utilities</li>
            <li>Image compression and optimization tools</li>
            <li>PDF conversion, merging, splitting, and processing tools</li>
            <li>GIF creation and animation tools</li>
            <li>Sticker generation and export tools</li>
            <li>Image metadata analysis and EXIF stripping tools</li>
            <li>Security and privacy utilities</li>
            <li>Developer utilities and code formatting tools</li>
            <li>File type detection and validation tools</li>
            <li>Color picker and palette generation tools</li>
            <li>Text extraction and OCR utilities</li>
          </ul>
          <p className="text-gray-700">
            Snappy-fix Technologies makes no representations that any specific
            tool will be available at all times. Services may be modified,
            updated, improved, temporarily suspended, or permanently
            discontinued at any time without prior notice and without liability
            to you. We reserve the right to introduce new tools, retire existing
            tools, adjust usage limits, or change the feature set of any tool at
            our sole discretion.
          </p>
          <p className="text-gray-700">
            Some tools may be subject to usage limits, file size restrictions,
            format restrictions, or processing time limits. These limits are set
            to maintain platform performance and fairness for all users. Users
            who require higher limits or dedicated processing capacity may
            contact Snappy-fix Technologies to discuss commercial or enterprise
            options.
          </p>
        </section>

        {/* 4. File Processing Policy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            4. File Processing Policy
          </h2>
          <p className="text-gray-700">
            Many Snappy-fix tools require users to upload files such as images,
            videos, documents, or other digital assets for processing.
          </p>
          <p className="text-gray-700">
            Snappy-fix Technologies does NOT permanently store uploaded files.
            Files uploaded to our tools are processed temporarily and solely for
            the purpose of performing the requested operation requested by the
            user.
          </p>
          <p className="text-gray-700">
            After processing is completed, files are automatically and
            permanently removed from our systems. We do not maintain a permanent
            database of uploaded images, videos, PDFs, documents, or any other
            content submitted through our tools. Processed output files made
            available for download are also removed from temporary storage
            within a short window of time following generation, typically within
            one hour.
          </p>
          <p className="text-gray-700">
            While Snappy-fix Technologies takes reasonable technical precautions
            to protect files during processing — including the use of encrypted
            transmission protocols (HTTPS) — we strongly advise users not to
            upload files containing highly sensitive, confidential, classified,
            or irreplaceable personal information through our public tools. For
            sensitive document processing needs, please contact us directly to
            discuss secure, private processing options.
          </p>
          <p className="text-gray-700">
            Because of this ephemeral processing architecture, users remain
            fully responsible for maintaining their own copies of uploaded and
            processed files. Snappy-fix Technologies shall not be liable for any
            loss of data, files, or content resulting from the temporary nature
            of our processing environment.
          </p>
          <p className="text-gray-700">
            By uploading files to any Snappy-fix tool, you confirm that you are
            the rightful owner of the content or have obtained all necessary
            licenses, permissions, and rights required to upload and process
            that content through our platform.
          </p>
        </section>

        {/* 5. Intellectual Property — Development Projects */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            5. Intellectual Property — Development Projects
          </h2>
          <p className="text-gray-700">
            Intellectual property ownership for web and mobile development
            projects is governed by the specific project agreement entered into
            between Snappy-fix Technologies and the client. The following
            general principles apply unless otherwise specified in a written
            project agreement.
          </p>
          <p className="text-gray-700">
            Upon receipt of full payment for a completed project, Snappy-fix
            Technologies transfers to the client all rights, title, and interest
            in the custom-developed work product specifically created for that
            project ("Deliverables"), to the extent that such rights are owned
            by Snappy-fix Technologies. This transfer includes source code,
            design assets, and documentation specifically produced for the
            client's project.
          </p>
          <p className="text-gray-700">
            Snappy-fix Technologies retains ownership of all pre-existing
            intellectual property, proprietary tools, code libraries,
            frameworks, development methodologies, know-how, templates, and
            background technology used in the creation of Deliverables
            ("Retained IP"). The client is granted a non-exclusive, perpetual,
            royalty-free license to use the Retained IP solely as embodied in
            the Deliverables, but may not separately distribute, resell, or
            sublicense the Retained IP.
          </p>
          <p className="text-gray-700">
            Third-party open-source software, libraries, or frameworks
            incorporated into Deliverables remain subject to their respective
            open-source licenses. Snappy-fix Technologies will disclose the use
            of significant third-party components and their applicable licenses
            upon client request.
          </p>
          <p className="text-gray-700">
            The Snappy-fix Technologies name, logo, brand identity, website
            design, and all associated trademarks and service marks are the
            exclusive property of Snappy-fix Technologies. Users and clients may
            not use, reproduce, or modify Snappy-fix's trademarks without prior
            written permission.
          </p>
        </section>

        {/* 6. Intellectual Property — Platform and Tools */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            6. Intellectual Property — Platform and Tools
          </h2>
          <p className="text-gray-700">
            The Snappy-fix platform, including the website, all digital tools,
            software, algorithms, processing logic, user interface designs,
            graphics, text content, and all other materials made available
            through www.snappy-fix.com ("Platform Content"), are the exclusive
            intellectual property of Snappy-fix Technologies and are protected
            by applicable copyright, trademark, patent, and trade secret laws.
          </p>
          <p className="text-gray-700">
            Users are granted a limited, non-exclusive, non-transferable,
            revocable license to access and use the platform and its tools
            solely for their personal or internal business purposes in
            accordance with these Terms. This license does not grant you any
            ownership rights to the platform or its content.
          </p>
          <p className="text-gray-700">
            You may not reproduce, distribute, publicly display, publicly
            perform, create derivative works from, sell, resell, sublicense, or
            otherwise exploit any portion of the Platform Content without the
            express prior written consent of Snappy-fix Technologies.
          </p>
          <p className="text-gray-700">
            Content you upload, process, or generate through our tools remains
            your own property. By uploading content, you grant Snappy-fix
            Technologies a limited, temporary, royalty-free license to process
            and handle your content for the sole purpose of providing you with
            the requested service. This license terminates when your files are
            deleted from our systems following processing.
          </p>
        </section>

        {/* 7. Prohibited Content */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            7. Prohibited Content
          </h2>
          <p className="text-gray-700">
            Users may not upload, process, transmit, distribute, or otherwise
            make available through the Snappy-fix platform any content that
            violates applicable local, national, or international laws, or
            infringes upon the rights of any individual or entity.
          </p>
          <p className="text-gray-700">
            Prohibited content includes but is not limited to:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              Malware, ransomware, spyware, viruses, or other malicious files
            </li>
            <li>Content that is illegal under applicable law</li>
            <li>Copyrighted material used without proper authorization</li>
            <li>Sexually explicit or pornographic material</li>
            <li>
              Child sexual abuse material (CSAM) or any content that sexually
              exploits minors
            </li>
            <li>
              Content that promotes, glorifies, or facilitates violence,
              self-harm, or terrorism
            </li>
            <li>
              Content that promotes illegal activities or instructs in criminal
              conduct
            </li>
            <li>
              Content that harasses, defames, threatens, or invades the privacy
              of individuals
            </li>
            <li>
              Personal data of third parties uploaded without their knowledge or
              consent
            </li>
            <li>
              Classified government or sensitive institutional data uploaded in
              violation of applicable security regulations
            </li>
            <li>
              Content that violates the intellectual property rights of any
              third party
            </li>
            <li>
              Disinformation, deepfakes, or manipulated media intended to
              deceive or harm others
            </li>
            <li>
              Spam, unsolicited promotional materials, or content designed to
              conduct phishing
            </li>
          </ul>
          <p className="text-gray-700">
            Snappy-fix Technologies reserves the right — but does not assume the
            obligation — to monitor, review, and remove any content that
            violates this policy, and to report such content to appropriate law
            enforcement authorities where required by law or deemed appropriate
            in our judgment.
          </p>
        </section>

        {/* 8. Service Abuse Policy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            8. Service Abuse Policy
          </h2>
          <p className="text-gray-700">
            Snappy-fix Technologies employs automated systems including rate
            limiting, request monitoring, anomaly detection, and abuse
            prevention mechanisms to maintain the stability, performance, and
            integrity of the platform for all users.
          </p>
          <p className="text-gray-700">
            You agree not to engage in any of the following prohibited
            behaviors:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              Using automated bots, scripts, or crawlers to submit excessive
              requests or overload the platform
            </li>
            <li>
              Bypassing or circumventing any rate limiting, access controls, or
              security mechanisms
            </li>
            <li>
              Scraping tools, content, or interfaces excessively or in a manner
              that degrades platform performance for other users
            </li>
            <li>
              Attempting to reverse engineer, decompile, disassemble, or extract
              proprietary source code or algorithms from the platform
            </li>
            <li>
              Submitting artificially large volumes of files to consume
              disproportionate server resources
            </li>
            <li>
              Probing, scanning, or testing the platform for security
              vulnerabilities without prior written authorization from
              Snappy-fix Technologies
            </li>
            <li>
              Distributing or reselling access to Snappy-fix tools or services
              without authorization
            </li>
            <li>Impersonating another user, entity, or Snappy-fix employee</li>
            <li>
              Interfering with or disrupting the integrity or performance of the
              platform or its data
            </li>
          </ul>
          <p className="text-gray-700">
            We reserve the right to monitor usage patterns and to block,
            throttle, rate-limit, or permanently ban abusive IP addresses,
            accounts, or automated processes without prior notice. Abuse of the
            platform may also result in legal action where warranted.
          </p>
          <p className="text-gray-700">
            If you identify a security vulnerability in our platform, we
            encourage responsible disclosure by contacting us privately. We are
            committed to addressing legitimate security concerns in a timely
            manner.
          </p>
        </section>

        {/* 9. API Usage Terms */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            9. API Usage Terms
          </h2>
          <p className="text-gray-700">
            Some Snappy-fix tools and services are powered by internal APIs that
            may be accessible through the website interface. These APIs are
            designed primarily to support the function of the Snappy-fix
            platform and its publicly accessible tools.
          </p>
          <p className="text-gray-700">
            Unauthorized programmatic use of our APIs outside the intended
            interface — including direct API calls not initiated through our
            official tools interface — is strictly prohibited without prior
            written authorization from Snappy-fix Technologies. Users wishing to
            integrate Snappy-fix capabilities into their own applications,
            workflows, or systems must contact us to discuss authorized API
            access, commercial licensing, or white-label arrangements.
          </p>
          <p className="text-gray-700">
            Excessive automated requests, whether through authorized or
            unauthorized access, may be rate-limited, throttled, or blocked at
            Snappy-fix's sole discretion. API access granted for any purpose
            does not constitute a transfer of intellectual property rights or a
            license to the underlying platform logic.
          </p>
          <p className="text-gray-700">
            Any API keys, access tokens, or credentials issued by Snappy-fix
            Technologies to authorized users are confidential. Users are
            responsible for securing their credentials and must not share,
            disclose, or transfer credentials to any unauthorized third party.
            Snappy-fix Technologies is not responsible for unauthorized use
            resulting from credential compromise caused by user negligence.
          </p>
          <p className="text-gray-700">
            Snappy-fix Technologies reserves the right to modify, deprecate, or
            discontinue any API endpoint at any time. Where commercially
            reasonable, we will endeavor to provide advance notice of
            significant API changes to active authorized users.
          </p>
        </section>

        {/* 10. Payment and Billing — Development Services */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            10. Payment and Billing — Development Services
          </h2>
          <p className="text-gray-700">
            Payment terms for web and mobile development projects are set out in
            the applicable project agreement or statement of work entered into
            between the client and Snappy-fix Technologies. The following
            general policies apply unless otherwise agreed in writing.
          </p>
          <p className="text-gray-700">
            Development projects typically require an upfront deposit before
            work commences, with the balance due at defined milestones or upon
            project completion. The specific deposit amount and payment schedule
            will be detailed in the project agreement. Failure to meet payment
            obligations on time may result in work being paused or suspended
            until payment is received.
          </p>
          <p className="text-gray-700">
            All fees are quoted in the currency specified in the project
            agreement (typically USD or the client's local currency as agreed).
            Clients are responsible for any applicable taxes, duties, bank
            transfer fees, or currency conversion charges associated with
            payments.
          </p>
          <p className="text-gray-700">
            Invoices not paid within the agreed payment period may be subject to
            late payment charges as specified in the project agreement.
            Snappy-fix Technologies reserves the right to withhold delivery of
            final files, deployment credentials, or source code until full
            payment has been received and cleared.
          </p>
          <p className="text-gray-700">
            Refund eligibility for development services is governed by the
            project agreement. As a general policy, deposits are non-refundable
            once work has commenced unless Snappy-fix Technologies is unable to
            fulfill the agreed scope. Partial refunds for incomplete work may be
            considered on a case-by-case basis at Snappy-fix's sole discretion.
          </p>
        </section>

        {/* 11. Confidentiality */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            11. Confidentiality
          </h2>
          <p className="text-gray-700">
            During the course of a development engagement, both Snappy-fix
            Technologies and the client may have access to confidential
            information belonging to the other party, including but not limited
            to business plans, proprietary technology, financial information,
            marketing strategies, design concepts, and user data ("Confidential
            Information").
          </p>
          <p className="text-gray-700">
            Both parties agree to: (a) keep Confidential Information strictly
            confidential; (b) not disclose Confidential Information to any third
            party without prior written consent; (c) use Confidential
            Information only for the purpose of fulfilling obligations under the
            project agreement; and (d) take reasonable steps to protect
            Confidential Information from unauthorized disclosure.
          </p>
          <p className="text-gray-700">
            These confidentiality obligations do not apply to information that:
            (i) is or becomes publicly available through no fault of the
            receiving party; (ii) was already known to the receiving party
            before disclosure; (iii) is independently developed by the receiving
            party without reference to the Confidential Information; or (iv) is
            required to be disclosed by law, regulation, or court order,
            provided that the disclosing party gives prompt written notice where
            legally permissible.
          </p>
          <p className="text-gray-700">
            Snappy-fix Technologies may include general references to completed
            projects in its portfolio, case studies, or marketing materials
            unless the client specifically requests otherwise in writing. We
            will never disclose proprietary client data, source code, or
            sensitive business information in such materials.
          </p>
        </section>

        {/* 12. Copyright and DMCA Policy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            12. Copyright and DMCA Policy
          </h2>
          <p className="text-gray-700">
            Snappy-fix Technologies respects the intellectual property rights of
            others and expects users and clients to do the same. We comply with
            the Digital Millennium Copyright Act (DMCA) and respond promptly to
            valid notices of alleged copyright infringement.
          </p>
          <p className="text-gray-700">
            If you believe in good faith that your copyrighted work has been
            copied, used, or made accessible on or through our platform in a
            manner that constitutes copyright infringement, you may submit a
            formal DMCA takedown notice to Snappy-fix Technologies' designated
            copyright agent. Your DMCA notice must include all of the following
            information to be valid:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              Your full legal name, mailing address, telephone number, and email
              address
            </li>
            <li>
              A clear and specific description of the copyrighted work that you
              claim has been infringed
            </li>
            <li>
              A description of where on the Snappy-fix platform the allegedly
              infringing material is located, with sufficient detail to allow us
              to locate it
            </li>
            <li>
              A statement that you have a good faith belief that the disputed
              use of the material is not authorized by the copyright owner, its
              agent, or the law
            </li>
            <li>
              A statement that the information in your notice is accurate and,
              under penalty of perjury, that you are the copyright owner or
              authorized to act on the copyright owner's behalf
            </li>
            <li>Your physical or electronic signature</li>
          </ul>
          <p className="text-gray-700">
            Counter-notifications: If you believe your content was removed as a
            result of a mistaken or wrongful DMCA notice, you may submit a
            counter-notification. We will restore removed content within 10 to
            14 business days of receiving a valid counter-notification, unless
            the original complainant informs us that legal action has been
            initiated.
          </p>
          <p className="text-gray-700">
            Repeat infringers: Snappy-fix Technologies will terminate the
            accounts or access of users who are determined to be repeat
            copyright infringers, in accordance with applicable law and our
            internal policies.
          </p>
        </section>

        {/* 13. Privacy and Data Protection */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            13. Privacy and Data Protection
          </h2>
          <p className="text-gray-700">
            Your use of the Snappy-fix platform is also governed by our Privacy
            Policy, which is incorporated into these Terms by reference. The
            Privacy Policy explains what personal data we collect, how we use
            it, how we protect it, and what rights you have in relation to your
            data.
          </p>
          <p className="text-gray-700">
            Snappy-fix Technologies is committed to protecting the personal data
            of its users and clients in accordance with applicable data
            protection laws, including the General Data Protection Regulation
            (GDPR) where applicable to users in the European Economic Area, the
            UK Data Protection Act, and other relevant national and regional
            data protection frameworks.
          </p>
          <p className="text-gray-700">
            For web and mobile development clients, Snappy-fix Technologies may
            act as a data processor on the client's behalf when handling
            personal data as part of the development, testing, or deployment
            process. In such cases, a separate data processing agreement may be
            entered into as required by applicable law.
          </p>
          <p className="text-gray-700">
            Snappy-fix Technologies will never sell your personal data to third
            parties. We may use anonymized, aggregated usage data to improve our
            platform, tools, and services. Any personal information collected
            during project engagements is handled strictly in accordance with
            our Privacy Policy and applicable data protection obligations.
          </p>
          <p className="text-gray-700">
            If you have questions about how we handle personal data or wish to
            exercise any data rights (including access, rectification, erasure,
            or data portability), please contact us using the information
            provided in the Contact section of these Terms.
          </p>
        </section>

        {/* 14. Third-Party Services and Links */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            14. Third-Party Services and Links
          </h2>
          <p className="text-gray-700">
            The Snappy-fix platform may contain hyperlinks to external websites,
            services, or resources operated by third parties. These links are
            provided for informational and convenience purposes only. Snappy-fix
            Technologies does not endorse, control, or assume any responsibility
            for the content, privacy practices, policies, or availability of any
            linked third-party website or service.
          </p>
          <p className="text-gray-700">
            Your use of third-party websites and services is at your own risk
            and subject to the terms and conditions of those third parties.
            Snappy-fix Technologies strongly recommends that you review the
            privacy policies and terms of service of any third-party website you
            visit.
          </p>
          <p className="text-gray-700">
            Our tools and platform may rely on third-party cloud infrastructure,
            content delivery networks, payment processors, analytics services,
            or other technology providers to deliver certain functionality.
            Snappy-fix Technologies selects such providers with care and
            contractually requires them to maintain appropriate security and
            data protection standards where applicable.
          </p>
          <p className="text-gray-700">
            In development projects, we may integrate clients' applications with
            third-party services such as payment gateways, email service
            providers, map services, social platforms, or cloud storage
            providers. The terms and availability of such integrations are
            governed by the respective third-party providers and are subject to
            change at their discretion. Snappy-fix Technologies is not liable
            for changes, outages, or discontinuation of third-party services.
          </p>
        </section>

        {/* 15. Disclaimers and Warranties */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            15. Disclaimers and Warranties
          </h2>
          <p className="text-gray-700">
            THE SNAPPY-FIX PLATFORM, TOOLS, AND DIGITAL SERVICES ARE PROVIDED ON
            AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND,
            EITHER EXPRESS OR IMPLIED, TO THE FULLEST EXTENT PERMITTED BY
            APPLICABLE LAW.
          </p>
          <p className="text-gray-700">
            SNAPPY-FIX TECHNOLOGIES EXPRESSLY DISCLAIMS ALL WARRANTIES,
            INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, ACCURACY,
            RELIABILITY, AND UNINTERRUPTED OR ERROR-FREE OPERATION. WE DO NOT
            WARRANT THAT THE PLATFORM WILL MEET YOUR REQUIREMENTS OR
            EXPECTATIONS, OR THAT RESULTS OBTAINED FROM USE OF THE PLATFORM WILL
            BE ACCURATE, COMPLETE, OR RELIABLE.
          </p>
          <p className="text-gray-700">
            While Snappy-fix Technologies strives to provide professional,
            high-quality web and mobile development services, we do not warrant
            that any website, application, or digital product developed by us
            will be entirely free of bugs, security vulnerabilities, or errors.
            Post-delivery bug fixing, security patching, and ongoing maintenance
            are matters to be agreed separately in the applicable project or
            maintenance agreement.
          </p>
          <p className="text-gray-700">
            Snappy-fix Technologies makes no warranties regarding the continued
            availability of any third-party service, library, framework, or
            platform used in any developed product, as such third-party
            technologies are outside our control.
          </p>
        </section>

        {/* 16. Limitation of Liability */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            16. Limitation of Liability
          </h2>
          <p className="text-gray-700">
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL
            SNAPPY-FIX TECHNOLOGIES, ITS DIRECTORS, OFFICERS, EMPLOYEES,
            CONTRACTORS, AGENTS, PARTNERS, OR LICENSORS BE LIABLE FOR ANY
            INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY
            DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, LOSS OF
            REVENUE, LOSS OF DATA, LOSS OF BUSINESS OPPORTUNITY, BUSINESS
            INTERRUPTION, OR REPUTATIONAL HARM, ARISING OUT OF OR IN CONNECTION
            WITH YOUR USE OF THE SNAPPY-FIX PLATFORM OR SERVICES, EVEN IF WE
            HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          </p>
          <p className="text-gray-700">
            This limitation of liability applies regardless of the legal theory
            under which the claim arises, whether in contract, tort (including
            negligence), strict liability, or any other theory, and regardless
            of whether Snappy-fix Technologies has been advised of the
            possibility of such damage.
          </p>
          <p className="text-gray-700">
            This includes but is not limited to: data loss or file corruption
            resulting from use of our tools; service interruptions or downtime;
            results obtained or not obtained from processed files; third-party
            service failures; or any decisions made based on outputs from our
            tools. For development services, our aggregate liability shall not
            exceed the total fees paid by the client to Snappy-fix Technologies
            in connection with the specific project giving rise to the claim, in
            the twelve (12) months preceding the event giving rise to liability.
          </p>
          <p className="text-gray-700">
            Some jurisdictions do not allow the exclusion or limitation of
            incidental or consequential damages. In such jurisdictions, the
            above limitations may not fully apply, and our liability will be
            limited to the minimum extent required by applicable law.
          </p>
        </section>

        {/* 17. Indemnification */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            17. Indemnification
          </h2>
          <p className="text-gray-700">
            You agree to indemnify, defend, and hold harmless Snappy-fix
            Technologies and its directors, officers, employees, contractors,
            partners, and agents from and against any and all claims, damages,
            losses, liabilities, costs, and expenses (including reasonable
            attorneys' fees) arising out of or related to:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              Your use of the Snappy-fix platform or services in violation of
              these Terms
            </li>
            <li>
              Your breach of any representation, warranty, or obligation under
              these Terms
            </li>
            <li>
              Content that you upload, submit, or process through our platform
            </li>
            <li>
              Your violation of any third-party rights, including intellectual
              property rights or privacy rights
            </li>
            <li>Your violation of any applicable law or regulation</li>
            <li>
              Any project materials, content, or instructions provided by you to
              Snappy-fix Technologies that infringe third-party rights or
              violate applicable law
            </li>
          </ul>
          <p className="text-gray-700">
            Snappy-fix Technologies reserves the right to assume exclusive
            control of the defense of any matter subject to indemnification by
            you at your expense. You agree to cooperate fully with our defense
            of any such claim. You may not settle any claim without Snappy-fix
            Technologies' prior written consent.
          </p>
        </section>

        {/* 18. International Use */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            18. International Use
          </h2>
          <p className="text-gray-700">
            Snappy-fix Technologies operates globally through its website at
            www.snappy-fix.com and may be accessed and engaged by users and
            clients from different countries and legal jurisdictions.
          </p>
          <p className="text-gray-700">
            Users and clients are solely responsible for ensuring that their use
            of the Snappy-fix platform, tools, and services complies with all
            applicable local, national, and international laws and regulations
            in their respective jurisdictions. This includes laws related to
            data privacy, digital services, electronic commerce, import and
            export controls, and professional licensing requirements.
          </p>
          <p className="text-gray-700">
            Snappy-fix Technologies does not represent that the platform or any
            of its services are appropriate or available for use in every
            country. Access from territories where the content or use of such
            services is illegal or restricted is done at the user's own risk and
            responsibility.
          </p>
          <p className="text-gray-700">
            For international development clients, payment terms, applicable
            taxes, data transfer compliance requirements, and governing law will
            be addressed in the project agreement. International wire transfers
            or alternative international payment methods may be accommodated
            upon request.
          </p>
        </section>

        {/* 19. Governing Law and Dispute Resolution */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            19. Governing Law and Dispute Resolution
          </h2>
          <p className="text-gray-700">
            These Terms and any disputes arising out of or in connection with
            your use of the Snappy-fix platform or services shall be governed by
            and construed in accordance with the laws of the jurisdiction in
            which Snappy-fix Technologies is registered, without regard to its
            conflict of law provisions.
          </p>
          <p className="text-gray-700">
            Before initiating any formal legal proceedings, both parties agree
            to attempt to resolve any dispute, claim, or controversy arising
            from or relating to these Terms or the services through good-faith
            negotiation. Either party may initiate this process by sending
            written notice of the dispute to the other party. The parties shall
            have thirty (30) calendar days from the date of such notice to
            attempt resolution before pursuing other remedies.
          </p>
          <p className="text-gray-700">
            If a dispute cannot be resolved through negotiation within the
            specified period, it shall be submitted to binding arbitration in
            accordance with the rules of a mutually agreed arbitration body, or
            in the absence of agreement, in a court of competent jurisdiction in
            Snappy-fix Technologies' jurisdiction of registration. Both parties
            waive any right to a jury trial in connection with any dispute
            related to these Terms to the fullest extent permitted by law.
          </p>
          <p className="text-gray-700">
            Nothing in this section shall prevent either party from seeking
            emergency injunctive or equitable relief from a court of competent
            jurisdiction to prevent imminent harm, protect confidential
            information, or enforce intellectual property rights pending
            resolution of a dispute.
          </p>
        </section>

        {/* 20. Termination and Suspension */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            20. Termination and Suspension
          </h2>
          <p className="text-gray-700">
            Snappy-fix Technologies reserves the right, at its sole discretion
            and without prior notice or liability, to suspend, restrict, or
            permanently terminate your access to the platform or any part of its
            services for any reason, including but not limited to: violation of
            these Terms, abusive or illegal behavior, extended inactivity, or
            the discontinuation of a service.
          </p>
          <p className="text-gray-700">
            You may stop using the Snappy-fix platform at any time. If you are a
            registered user with an account, you may request account deletion by
            contacting us. Upon account termination, your access to any
            associated features will cease immediately.
          </p>
          <p className="text-gray-700">
            For development project engagements, termination rights, procedures,
            and consequences (including the handling of work in progress and
            applicable fees for work completed to date) are set out in the
            relevant project agreement.
          </p>
          <p className="text-gray-700">
            Provisions of these Terms that by their nature should survive
            termination shall continue to apply following termination, including
            without limitation: intellectual property provisions,
            confidentiality obligations, disclaimers, limitations of liability,
            indemnification, and dispute resolution clauses.
          </p>
        </section>

        {/* 21. Changes to Terms */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            21. Changes to Terms
          </h2>
          <p className="text-gray-700">
            Snappy-fix Technologies reserves the right to update, modify, or
            replace these Terms at any time at its sole discretion. When
            material changes are made, we will update the "Last Updated" date at
            the top of this page and, where feasible, provide notice through the
            platform or via email to registered users or active clients.
          </p>
          <p className="text-gray-700">
            It is your responsibility to review these Terms periodically to stay
            informed of any updates. Your continued access to or use of the
            Snappy-fix platform after the effective date of any updated Terms
            constitutes your acceptance of and agreement to those revised Terms.
            If you do not agree with the revised Terms, you must stop using the
            platform immediately.
          </p>
          <p className="text-gray-700">
            For ongoing development projects, material changes to these Terms
            that would affect existing project agreements will not apply
            retroactively to those agreements without the written consent of
            both parties.
          </p>
        </section>

        {/* 22. Force Majeure */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            22. Force Majeure
          </h2>
          <p className="text-gray-700">
            Snappy-fix Technologies shall not be liable for any failure or delay
            in the performance of its obligations under these Terms or any
            project agreement where such failure or delay results from
            circumstances beyond our reasonable control, including but not
            limited to acts of God, natural disasters, pandemics, civil unrest,
            war, terrorism, government actions, internet infrastructure
            failures, cyberattacks, power outages, or the failure of third-party
            service providers.
          </p>
          <p className="text-gray-700">
            In the event of a force majeure event, Snappy-fix Technologies will
            notify affected clients as soon as reasonably practicable and will
            use commercially reasonable efforts to mitigate the impact of the
            disruption and resume performance as soon as possible.
          </p>
        </section>

        {/* 23. Severability and Entire Agreement */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            23. Severability and Entire Agreement
          </h2>
          <p className="text-gray-700">
            If any provision of these Terms is found by a court or arbitrator of
            competent jurisdiction to be invalid, illegal, or unenforceable for
            any reason, such provision shall be modified to the minimum extent
            necessary to make it enforceable, or if modification is not
            possible, shall be severed from these Terms. The remaining
            provisions shall continue in full force and effect and shall not be
            affected by such invalidity or unenforceability.
          </p>
          <p className="text-gray-700">
            These Terms, together with our Privacy Policy and any applicable
            project agreements, statements of work, or supplemental agreements
            entered into between Snappy-fix Technologies and the user or client,
            constitute the entire agreement between the parties with respect to
            the subject matter hereof and supersede all prior and
            contemporaneous agreements, representations, understandings, and
            negotiations, whether written or oral.
          </p>
          <p className="text-gray-700">
            Snappy-fix Technologies' failure to enforce any right or provision
            of these Terms shall not be deemed a waiver of such right or
            provision. Any waiver of any provision of these Terms must be in
            writing and signed by an authorized representative of Snappy-fix
            Technologies.
          </p>
        </section>

        {/* 24. Contact Information */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            24. Contact Information
          </h2>
          <p className="text-gray-700">
            If you have any questions, concerns, or requests regarding these
            Terms of Service, wish to report a violation, submit a DMCA notice,
            discuss a development project, or exercise any rights under
            applicable data protection law, please contact Snappy-fix
            Technologies through our official contact channels.
          </p>
          <p className="text-gray-700">
            We are committed to responding to all legitimate inquiries in a
            timely and professional manner. General inquiries and support
            requests are typically addressed within 2 to 5 business days.
          </p>
          <Link
            href="/#contact"
            className="text-[#fb397d] font-semibold hover:underline"
          >
            Contact Us →
          </Link>
        </section>
      </section>
    </main>
  );
}
