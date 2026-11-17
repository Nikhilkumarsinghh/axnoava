import type { Metadata } from "next";
import { ServiceVideoHero } from "@/components/service-video-hero";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { families, slugify } from "@/data/services-data";
import { ContactForm } from "@/components/contact-form";

export const dynamicParams = false;
export function generateStaticParams() { return families.map((family) => ({ family: family.slug })); }
async function findFamily(params: Promise<{ family: string }>) {
  const { family } = await params;
  return families.find((item) => item.slug === family) || null;
}
export async function generateMetadata({ params }: { params: Promise<{ family: string }> }): Promise<Metadata> {
  const family = await findFamily(params);
  return family ? { title: family.name, description: `${family.lead} Explore services and request a scoped proposal.`, alternates: { canonical: `/services/${family.slug}` } } : {};
}
export default async function ServiceFamilyPage({ params }: { params: Promise<{ family: string }> }) {
  const family = await findFamily(params);
  if (!family) notFound();
  return <div className="m-page">
    <ServiceVideoHero title={family.name} eyebrow="AXNOVATECH / SERVICE PORTFOLIO" description={`${family.lead} We begin with your requirements and define the solution, deliverables, dependencies and support model before work starts.`} slug={family.slug} videoSlot={`service-${family.slug}`} />
    <section className="m-sec container-x"><div className="m-head"><p className="m-kicker">SERVICE AREAS</p><h2>Choose the capability that matches your requirement.</h2></div><div className="m-ind-grid">{family.topics.map(([title, description]) => <article key={title}><h2>{title}</h2><p>{description}</p><ul>{family.inc.map((item) => <li key={item}><Check size={16}/>{item}</li>)}</ul><Link href={`/services/${family.slug}/${slugify(title)}`} className="m-more">Explore service <ArrowUpRight size={16}/></Link></article>)}</div></section>
    <section className="m-sec m-paper"><div className="container-x m-two"><div><p className="m-kicker">HOW WE WORK</p><h2 className="m-h2b">A clear plan before implementation.</h2><p className="m-lede">Discovery, scope, design, engineering, testing, deployment and support are tailored to the project. Acceptance criteria and commercial terms are documented before work begins.</p></div><ul className="m-incl">{["Requirements and assumptions", "Architecture and delivery plan", "Review and acceptance criteria", "Handover and support terms"].map((item) => <li key={item}><Check size={18}/>{item}</li>)}</ul></div></section>
    <section className="m-sec m-dark"><div className="container-x"><div className="m-head"><p className="m-kicker m-amber">NEXT STEP</p><h2>Tell us what you need to build.</h2></div><p className="m-lede">Share the business context, users, integrations and constraints. We will review the requirement and discuss fit before committing to scope.</p><Link href="#project-enquiry" className="m-btn">Request a proposal <ArrowRight size={16}/></Link></div></section>
    <section id="project-enquiry" className="axn-service-enquiry"><div className="container-x axn-service-enquiry-grid"><div><p className="m-kicker">DISCUSS THIS SERVICE AREA</p><h2>Tell us what you need.</h2><p>Choose a specific capability or describe the outcome you want to achieve. We will review your brief and respond by email.</p><div className="axn-service-enquiry-note"><b>{family.name}</b><span>Service area pre-selected · No obligation to proceed</span></div></div><div><ContactForm initialService={family.name}/></div></div></section>
  </div>;
}
