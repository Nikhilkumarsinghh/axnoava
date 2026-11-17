import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { catalog } from "@/data/catalog";
import { getDetailContent } from "@/data/expanded-content";
import { ServiceVideoHero } from "@/components/service-video-hero";
import { ContactForm } from "@/components/contact-form";
import { photoAny } from "@/lib/photos";
export const dynamicParams = false;
const entries = catalog.businessSolutions || [];
const find = (slug: string) => entries.find((x) => x.slug === slug);
export function generateStaticParams() { return entries.map((entry) => ({ slug: entry.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const entry = find(slug); if (!entry) return {};
  return { title: `${entry.title} for Small Business`, description: `${entry.description} Explore features, implementation, deliverables and support from AXNOVATECH.`, alternates: { canonical: `/business-solutions/${slug}` }, openGraph: { title: `${entry.title} | AXNOVATECH`, description: entry.description, type: "website" } };
}
export default async function BusinessSolutionDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const entry = find(slug); if (!entry) notFound();
  const data = getDetailContent("businessSolutions", entry);
  const related = entries.filter((x) => x.slug !== slug).slice(0, 6);
  const image = photoAny(`biz-${slug}`, "hero-retail", "auto-1");
  return <main className="axn-service-detail">
    <ServiceVideoHero title={entry.title} eyebrow="AXNOVATECH / BUSINESS SOLUTIONS" description={data.intro} slug={slug} videoSlot="biz-business-operations" posterSlot={`biz-${slug}`}/>
    <section className="container-x axn-detail-intro"><p className="axn-section-eyebrow">01 / BUSINESS IMPACT</p><h2>Less admin. Better <em>business visibility.</em></h2><div className="axn-outcome-grid">{data.outcomes.map((x,i)=><article key={x}><span>0{i+1}</span><CheckCircle2 size={19}/><p>{x}</p></article>)}</div></section>
    {image && <section className="axn-business-image"><img src={image} alt={`${entry.title} business workflow context`} loading="lazy"/><div><small>DESIGNED AROUND YOUR OPERATIONS</small><h2>Software that fits the way your business works.</h2></div></section>}
    <section className="axn-detail-paper"><div className="container-x"><p className="axn-section-eyebrow">02 / SOLUTION CAPABILITIES</p><h2>What your system <em>can include.</em></h2><div className="axn-capability-grid">{data.capabilities.map((x,i)=><article key={x.title}><small>MODULE / 0{i+1}</small><h3>{x.title}</h3><p>{x.body}</p></article>)}</div></div></section>
    <section className="container-x axn-detail-intro"><p className="axn-section-eyebrow">03 / IMPLEMENTATION</p><h2>From business walkthrough <em>to go-live.</em></h2><div className="axn-delivery-grid">{data.delivery.map(x=><article key={x.title}><h3>{x.title}</h3><p>{x.body}</p></article>)}</div></section>
    <section className="axn-detail-paper"><div className="container-x axn-detail-split"><div><p className="axn-section-eyebrow">04 / WHAT YOU RECEIVE</p><h2>A clear list of <em>deliverables.</em></h2><p className="axn-section-lead">The exact features, integrations, data migration and training are recorded in your written proposal.</p></div><ul className="axn-deliverables">{data.deliverables.map(x=><li key={x}><CheckCircle2 size={18}/>{x}</li>)}</ul></div></section>
    <section className="container-x axn-detail-intro"><p className="axn-section-eyebrow">05 / FAQ</p><h2>Questions from <em>business owners.</em></h2><div className="axn-detail-faq">{data.faqs.map(x=><details key={x.q}><summary>{x.q}</summary><p>{x.a}</p></details>)}</div></section>
    <section className="axn-related"><div className="container-x"><p className="axn-section-eyebrow">06 / RELATED SOLUTIONS</p><h2>Explore more <em>business systems.</em></h2><div className="axn-related-grid">{related.map(x=><Link href={`/business-solutions/${x.slug}`} key={x.slug}><span>{x.title}</span><ArrowUpRight size={17}/></Link>)}</div><div className="axn-service-cta"><div><small>LET'S IMPROVE YOUR DAILY OPERATIONS</small><h2>Start with one workflow.</h2><p>Tell us your business type, current tools and the task you want to simplify first.</p></div><Link href="#project-enquiry" className="axn-primary">Discuss this solution <ArrowRight size={17}/></Link></div></div></section>
    <section id="project-enquiry" className="axn-service-enquiry"><div className="container-x axn-service-enquiry-grid"><div><p className="m-kicker">DISCUSS THIS SOLUTION</p><h2>Tell us about your workflow.</h2><p>Describe the process you want to improve and the tools you use today. We will review your requirement and reply by email.</p><div className="axn-service-enquiry-note"><b>{entry.title}</b><span>Solution pre-selected · No obligation to proceed</span></div></div><div><ContactForm initialService={entry.title}/></div></div></section>
  </main>;
}
