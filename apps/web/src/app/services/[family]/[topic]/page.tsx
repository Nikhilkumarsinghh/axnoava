import type { Metadata } from "next";
import { ServiceVideoHero } from "@/components/service-video-hero";
import { ContactForm } from "@/components/contact-form";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Pic } from "@/components/pic";
import { photo } from "@/lib/photos";
import { families, slugify } from "@/data/services-data";
import { site } from "@/data/site-config";
export const dynamicParams = false;
export function generateStaticParams() { return families.flatMap((f) => f.topics.map((t) => ({ family: f.slug, topic: slugify(t[0]) }))); }
const find = async (p: Promise<{ family: string; topic: string }>) => { const { family, topic } = await p; const f = families.find((x) => x.slug === family); const t = f?.topics.find((x) => slugify(x[0]) === topic); return f && t ? { f, t } : null; };
export async function generateMetadata({ params }: { params: Promise<{ family: string; topic: string }> }): Promise<Metadata> { const r = await find(params); return r ? { title: `${r.t[0]} services`, description: `${r.t[1]} Request a scoped proposal from AXNOVATECH.`, alternates: { canonical: `/services/${r.f.slug}/${slugify(r.t[0])}` } } : {}; }
export default async function Topic({ params }: { params: Promise<{ family: string; topic: string }> }) {
  const r = await find(params); if (!r) notFound(); const { f, t } = r;
  const tiers = [["Starter", "Focused scope", [...f.inc.slice(0, 2), "Email support"]], ["Business", "Growth scope", [...f.inc, "Priority support options", "Progress reviews"]], ["Enterprise", "Tailored scope", ["Dedicated delivery plan", "Support model by agreement", "Security and integration review"]]] as [string, string, string[]][];
  const q = "#project-enquiry";
  return (
    <div className="m-page">
      <ServiceVideoHero title={t[0]} eyebrow={`AXNOVATECH / ${f.name.toUpperCase()}`} description={t[1]} slug={f.slug} videoSlot={`service-${f.slug}`} cta="Get a quote" />
      <section className="m-sec container-x"><div className="m-head"><p className="m-kicker">WHAT YOU GET</p><h2>{t[0]}, delivered end to end.</h2></div>
        <ul className="m-incl">{[...f.inc, "Written scope and quote", "Agreed review milestones", "Source-code handover as contracted"].map((x) => <li key={x}><Check size={18} />{x}</li>)}</ul></section>
      <section className="m-sec container-x"><div className="m-split"><Pic src={photo("fam-" + f.slug)} alt={f.name} /><div><p className="m-kicker">WHY IT MATTERS</p><h2 className="m-h2b">{t[0]} that fits how you work.</h2><p className="m-lede">{t[1]} We start from your goals, agree scope in writing and set review milestones that fit the engagement. Project communication, review cadence and status reporting are agreed at kickoff.</p></div></div></section>
      <section className="m-sec m-paper"><div className="container-x"><div className="m-head"><p className="m-kicker">PRICING</p><h2>Plans for {t[0].toLowerCase()}.</h2></div><div className="m-tiers">{tiers.map(([n, p, l]) => <article key={n} className={`m-tier ${n === "Business" ? "hl" : ""}`}>{n === "Business" && <em>Recommended</em>}<h3>{n}</h3><small>{p === "Tailored scope" ? "Scoped proposal" : "Engagement model"}</small><b>{p}</b><ul>{l.map((x) => <li key={x}><Check size={16} />{x}</li>)}</ul><Link href={q} className="m-btn">{n === "Enterprise" ? "Talk to sales" : "Get this quote"}</Link></article>)}</div><p className="m-tab-note">Final scope, timeline, pricing and applicable taxes are documented in the proposal before work begins.</p></div></section>
      <section className="m-sec container-x"><div className="m-head"><p className="m-kicker">HOW IT RUNS</p><h2>From first conversation to confident launch.</h2><p className="m-lede">A clear, reviewable delivery path — tailored to the service and agreed in your proposal.</p></div><ol className="axn-process-steps">{site.process.map(([n, w, detail, output], i) => <li key={n}><span className="axn-process-number">0{i+1}</span><div><h3>{n}</h3><small>{w}</small><p>{detail}</p><b>{output}</b></div></li>)}</ol><Link href="/process" className="m-more">Explore the full delivery process <ArrowRight size={16} /></Link></section>
      <section id="project-enquiry" className="axn-service-enquiry"><div className="container-x axn-service-enquiry-grid"><div><p className="m-kicker">DISCUSS THIS SERVICE</p><h2>Tell us what you need.</h2><p>Share a few details and the AXNOVATECH team will review your requirement. Your enquiry is sent securely to our business inbox.</p><div className="axn-service-enquiry-note"><b>{t[0]}</b><span>Service pre-selected · No obligation to proceed</span></div></div><div><ContactForm initialService={t[0]} /></div></div></section>
      <section className="m-sec container-x"><div className="m-faq">{[[`How much does ${t[0].toLowerCase()} cost?`, `Pricing depends on scope, integrations and delivery requirements. We share a written proposal before work begins.`], ["How long does it take?", `Timeline is confirmed in the proposal after discovery.`], ["Who owns the work?", "Source-code, intellectual-property and documentation handover are defined in the project agreement."]].map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
      <section className="m-sec container-x"><div className="m-head"><p className="m-kicker">MORE IN {f.name.toUpperCase()}</p><h2>Related services.</h2></div><div className="m-rel">{f.topics.filter((x) => x[0] !== t[0]).map((x) => <Link key={x[0]} href={`/services/${f.slug}/${slugify(x[0])}`}>{x[0]}<ArrowRight size={15} /></Link>)}</div></section>
    </div>
  );
}
