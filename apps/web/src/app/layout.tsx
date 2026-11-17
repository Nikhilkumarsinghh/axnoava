import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./v70.css";
import "./v78.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CookieConsent } from "@/components/cookie-consent";
import { ChatWidget } from "@/components/chat-widget";
import { RevealObserver } from "@/components/reveal-observer";
import { ProjectEnquiryDialog } from "@/components/project-enquiry-dialog";

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://axnovatech.com";
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#081426" };
export const metadata: Metadata = {
  title: { default: "AXNOVATECH | Digital, AI, Cloud & Enterprise Technology", template: "%s | AXNOVATECH" },
  description: "AXNOVATECH brings digital engineering, AI, cloud, enterprise technology and product development together to solve practical business challenges.",
  metadataBase: new URL(site),
  alternates: { canonical: "/" },
  keywords: ["AXNOVATECH", "software development company India", "custom software development", "web application development", "mobile app development", "CRM development", "ERP solutions", "AI automation", "cloud and DevOps", "cybersecurity", "business software"],
  icons: { icon: "/favicon.svg?v=78", shortcut: "/favicon.svg?v=78", apple: "/favicon.svg?v=78" },
  openGraph: { title: "AXNOVATECH | Digital Engineering & Technology Solutions", description: "Strategy, design and engineering for meaningful digital progress.", url: site, siteName: "AXNOVATECH", type: "website", images: [{ url: "/images/axn-cinematic-hero.png", width: 1200, height: 630, alt: "AXNOVATECH" }] },
  twitter: { card: "summary_large_image", title: "AXNOVATECH | Digital Engineering & Technology Solutions", description: "Software, AI, cloud and business systems built around real business needs." },
  robots: { index: true, follow: true },
};
const jsonLd = [
  { "@context": "https://schema.org", "@type": "Organization", name: "AXNOVATECH", url: site, logo: `${site}/brand/logo/axnovatech-symbol.svg`, description: "Software, business systems, AI automation and digital engineering services for businesses in India.", areaServed: { "@type": "Country", name: "India" }, knowsAbout: ["Custom software development", "Web and mobile applications", "CRM and ERP systems", "Business process automation", "AI integration", "Cloud and DevOps"], subOrganization: [
    { "@type": "Organization", name: "AXNOVA DIGITAL", url: `${site}/pillars/axnova-digital` },
    { "@type": "Organization", name: "AXNOVA AI", url: `${site}/pillars/axnova-ai` },
    { "@type": "Organization", name: "AXNOVA CLOUD", url: `${site}/pillars/axnova-cloud` },
    { "@type": "Organization", name: "AXNOVA ENTERPRISE", url: `${site}/pillars/axnova-enterprise` },
    { "@type": "Organization", name: "AXNOVA PRODUCTS", url: `${site}/pillars/axnova-products` }
  ] },
  { "@context": "https://schema.org", "@type": "WebSite", name: "AXNOVATECH", url: site, inLanguage: "en-IN" }
];
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <body id="top">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SiteHeader /><main>{children}</main><SiteFooter /><CookieConsent /><RevealObserver /><ProjectEnquiryDialog /><ChatWidget />
      </body>
    </html>
  );
}
