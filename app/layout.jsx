import "./globals.css";
import "antd/dist/reset.css";
// import "bootstrap/dist/css/bootstrap.css";
import { Rubik } from "next/font/google";

// components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Facebook } from "/app/components/Facebook";
import WhatsAppButton from "/app/components/WhatsAppButton";
import { socials } from "./components/socials";

const rubik = Rubik({ subsets: ["latin"], display: "swap" });

const SITE_URL = "https://hayzeeonline.com";
const SITE_NAME = "Hayzeeonline";
const SITE_DESCRIPTION =
  "Buy quality US/UK used laptops, iPhones, Samsung & Android phones at affordable prices. Tested & trusted gadgets with nationwide delivery and pay-on-delivery across Nigeria.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hayzeeonline — US/UK Used Laptops & Phones at Affordable Prices",
    template: "%s | Hayzeeonline",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: "Hayzee Computer Resources",
  referrer: "origin-when-cross-origin",
  category: "ecommerce",
  keywords: [
    "US used laptops",
    "UK used laptops",
    "fairly used laptops in Ibadan",
    "affordable laptops Nigeria",
    "refurbished laptops",
    "used iPhones",
    "used Samsung phones",
    "Android phones Nigeria",
    "HP",
    "Dell",
    "Lenovo",
    "MacBook",
    "gaming laptops",
    "cheap laptops Nigeria",
    "Hayzeeonline",
  ],
  formatDetection: { telephone: true, email: true, address: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Hayzeeonline — US/UK Used Laptops & Phones at Affordable Prices",
    description: SITE_DESCRIPTION,
    images: [
      { url: "/logo5.png", width: 512, height: 512, alt: "Hayzeeonline" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hayzeeonline — US/UK Used Laptops & Phones",
    description: SITE_DESCRIPTION,
    images: ["/logo5.png"],
    creator: "@hayzeeonline",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  verification: {
    google: "4Zkz1j8swUUwJUJrRx2wsqs4YwJy6ru1Xb-9WmFnjek",
  },
  // Next 13.5 (installed here) does not support the separate `export const
  // viewport` API that arrived in Next 14, so these live inside `metadata`.
  themeColor: "#0E1B4D",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      legalName: "Hayzee Computer Resources",
      url: SITE_URL,
      logo: `${SITE_URL}/logo5.png`,
      description: SITE_DESCRIPTION,
      sameAs: socials.map((s) => s.href),
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+234-916-140-1307",
        contactType: "customer service",
        areaServed: "NG",
        availableLanguage: ["en"],
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ibadan",
        addressRegion: "Oyo",
        addressCountry: "NG",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-NG",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/search/{search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-NG" className={rubik.className}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        {children}
        <Facebook />
        <WhatsAppButton
          phoneNumber="2349161401307"
          message="Hello! I need a gadget"
        />

        <Footer />
      </body>
    </html>
  );
}
