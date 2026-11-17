import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { catalog } from "@/data/catalog";
import { getDetailContent } from "@/data/expanded-content";
import { ServiceVideoHero } from "@/components/service-video-hero";
import { ContactForm } from "@/components/contact-form";
export const dynamicParams = false;
const entries = catalog.services;
const find = (slug: string) => entries.find((x) => x.slug === slug);
export function generateStaticParams() { return entries.map((entry) => ({ slug: entry.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const entry = find(slug); if (!entry) return {};
  return { title: `${entry.title} Services`, description: `${entry.description} Discover our approach, deliverables and engineering process.`, alternates: { canonical: `/services/capabilities/${slug}` }, openGraph: { title: `${entry.title} | AXNOVATECH`, description: entry.description, type: "website" } };
}
export default async function ServiceCapabilityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const entry = find(slug); if (!entry) notFound();
  const data = getDetailContent("services", entry);
  const related = entries.filter((x) => x.slug !== slug).slice(0, 6);
  const jsonLd = [
    { "@context":"https://schema.org", "@type":"Service", name:entry.title, description:entry.description, provider:{"@type":"Organization",name:"AXNOVATECH",url:process.env.NEXT_PUBLIC_SITE_URL||"https://axnovatech.com"}, areaServed:{"@type":"Country",name:"India"} },
    { "@context":"https://schema.org", "@type":"FAQPage", mainEntity:data.faqs.map(x=>({"@type":"Question",name:x.q,acceptedAnswer:{"@type":"Answer",text:x.a}})) }
  ];
  const videoFamily = /mobile/.test(slug) ? "mobile-app-development" :
    /ai|generative|data|analytics|intelligence/.test(slug) ? "ai-machine-learning" :
    /cloud|devops/.test(slug) ? "cloud-computing" :
    /cyber|security/.test(slug) ? "cybersecurity" :
    /design|ux/.test(slug) ? "ui-ux-design" :
    /enterprise|erp|crm|api|quality|consulting|transformation/.test(slug) ? "enterprise-software" : "web-development";
  return <main className="axn-service-detail">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,"\\u003c")}}/>
    <ServiceVideoHero title={entry.title} eyebrow="AXNOVATECH / TECHNOLOGY SERVICES" description={data.intro} slug={slug} videoSlot={`service-${videoFamily}`}/>
    <section className="container-x axn-detail-intro"><p className="axn-section-eyebrow">01 / BUSINESS OUTCOMES</p><h2>Technology should create <em>measurable progress.</em></h2><p className="axn-section-lead">We connect the engineering work to a business objective, clear ownership and a practical definition of done.</p><div className="axn-outcome-grid">{data.outcomes.map((x,i)=><article key={x}><span>0{i+1}</span><CheckCircle2 size={19}/><p>{x}</p></article>)}</div></section>
    <section className="axn-detail-paper"><div className="container-x"><p className="axn-section-eyebrow">02 / CAPABILITIES</p><h2>What this service <em>covers.</em></h2><div className="axn-capability-grid">{data.capabilities.map((x,i)=><article key={x.title}><small>CAPABILITY / 0{i+1}</small><h3>{x.title}</h3><p>{x.body}</p></article>)}</div></div></section>
    <section className="container-x axn-detail-intro"><p className="axn-section-eyebrow">03 / DELIVERY METHOD</p><h2>A transparent path from <em>brief to launch.</em></h2><div className="axn-delivery-grid">{data.delivery.map((x)=><article key={x.title}><h3>{x.title}</h3><p>{x.body}</p></article>)}</div></section>
    <section className="axn-detail-paper"><div className="container-x axn-detail-split"><div><p className="axn-section-eyebrow">04 / PROJECT OUTPUTS</p><h2>Know what you <em>will receive.</em></h2><p className="axn-section-lead">The proposal records which deliverables apply to your scope, what is excluded and how acceptance will be reviewed.</p></div><ul className="axn-deliverables">{data.deliverables.map(x=><li key={x}><CheckCircle2 size={18}/>{x}</li>)}</ul></div></section>
    <section className="container-x axn-detail-intro"><p className="axn-section-eyebrow">05 / QUESTIONS</p><h2>Frequently asked <em>questions.</em></h2><div className="axn-detail-faq">{data.faqs.map(x=><details key={x.q}><summary>{x.q}</summary><p>{x.a}</p></details>)}</div></section>
    <section className="axn-related"><div className="container-x"><p className="axn-section-eyebrow">06 / RELATED CAPABILITIES</p><h2>Explore connected <em>services.</em></h2><div className="axn-related-grid">{related.map(x=><Link key={x.slug} href={`/services/capabilities/${x.slug}`}><span>{x.title}</span><ArrowUpRight size={17}/></Link>)}</div><div className="axn-service-cta"><div><small>READY TO DISCUSS YOUR REQUIREMENT?</small><h2>Let's define the right next step.</h2><p>Tell us about your users, business goals, existing systems and constraints.</p></div><Link href="#project-enquiry" className="axn-primary">Start a conversation <ArrowRight size={17}/></Link></div></div></section>
    <section id="project-enquiry" className="axn-service-enquiry"><div className="container-x axn-service-enquiry-grid"><div><p className="m-kicker">DISCUSS THIS CAPABILITY</p><h2>Tell us what you need.</h2><p>Share your goals, users and existing systems. We will review your requirement and respond by email.</p><div className="axn-service-enquiry-note"><b>{entry.title}</b><span>Service pre-selected · No obligation to proceed</span></div></div><div><ContactForm initialService={entry.title}/></div></div></section>
  </main>;
}
