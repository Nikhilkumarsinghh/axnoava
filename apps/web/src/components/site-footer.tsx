import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { CookieSettingsButton } from "@/components/cookie-consent";
import { site } from "@/data/site-config";

const cols: [string, [string, string][]][] = [
  ["Divisions", [["AXNOVA DIGITAL", "/pillars/axnova-digital"], ["AXNOVA AI", "/pillars/axnova-ai"], ["AXNOVA CLOUD", "/pillars/axnova-cloud"], ["AXNOVA ENTERPRISE", "/pillars/axnova-enterprise"], ["AXNOVA PRODUCTS", "/pillars/axnova-products"]]],
  ["Industries", [["Banking & finance", "/industries/banking-financial-services"], ["Healthcare", "/industries/healthcare"], ["Retail & e-commerce", "/industries/retail-e-commerce"], ["Education", "/industries/education-edtech"], ["Manufacturing", "/industries/manufacturing"], ["All industries", "/industries"]]],
  ["Work with us", [["Local business solutions", "/business-solutions"], ["Enterprise solutions", "/enterprise-solutions"], ["Technology partnerships", "/technology-partners"], ["Our process", "/process"], ["Our work", "/work"], ["Request a proposal", "/contact"]]],
  ["Company", [["Our story", "/about"], ["Our team", "/team"], ["Careers", "/careers"], ["Insights", "/insights"], ["FAQs", "/faq"], ["Contact", "/contact"], ["Workforce & hiring (UniqueToo)", "https://uniquetoo.in"]]],
];
export function SiteFooter() {
  return (
    <footer className="axf">
      <div className="axf-cta container-x"><div><h2>Have a project in mind?</h2><p>Tell us what you need. We will review your requirements and agree on clear next steps.</p></div><Link href="/contact" className="axf-btn">Start a project <ArrowUpRight size={18} /></Link></div>
      <div className="axf-main container-x">
        <div className="axf-brand"><div className="axf-brand-lockup"><img src="/brand/logo/axnovatech-symbol.svg" alt="" width={42} height={42}/><span>AXNOVA<span>TECH</span></span></div><p>Software, business systems and digital engineering for local businesses, startups, agencies and enterprise teams. Clear scope, documented delivery and practical support.</p><address>{site.address}{site.phone && <><br />{site.phone}</>}{site.email && <><br />{site.email}</>}</address></div>
        {cols.map(([t, l]) => <div key={t}><h3>{t}</h3>{l.map(([a, h]) => <Link key={a} href={h}>{a}</Link>)}</div>)}
      </div>
      <div className="axf-bottom container-x"><span>© {new Date().getFullYear()} AXNOVATECH. All rights reserved.</span><div><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms of Service</Link><Link href="/cookies">Cookie Policy</Link><Link href="/refund">Refund Policy</Link><a href="/sitemap.xml">Sitemap</a><a href="/MEDIA-CREDITS.txt">Media credits</a><CookieSettingsButton /><a href="#top" className="axf-top" aria-label="Back to top"><ArrowUp size={16} /></a></div></div>
    </footer>
  );
}
