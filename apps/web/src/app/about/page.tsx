import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Compass, Handshake, ShieldCheck, Target, Users, Code2, Sparkles, Cloud, Building2, Boxes } from "lucide-react";
import { site } from "@/data/site-config";
import { catalog } from "@/data/catalog";

export const metadata: Metadata = {
  title: "About AXNOVATECH | Our Story, Vision & Values",
  description: "Discover AXNOVATECH's purpose, five technology divisions, engineering principles and practical delivery approach.",
  alternates: { canonical: "/about" },
};

const values = [
  [Target, "Business before technology", "We start with the problem, users and measurable outcome. Tools are selected only after the need is understood."],
  [Compass, "Clarity at every step", "Scope, assumptions, milestones, responsibilities and commercials are written down before delivery begins."],
  [ShieldCheck, "Trust by engineering", "Privacy, security, accessibility, maintainability and ownership are considered throughout the product lifecycle."],
  [Handshake, "Partnership beyond launch", "We aim to build lasting working relationships through communication, reliable handover and support options."],
] as const;

const pillars = [
  { no: "01", name: "AXNOVA DIGITAL", slug: "axnova-digital", line: "Engineering digital experiences.", body: "Websites, applications and software engineering built around the way your business works.", icon: Code2 },
  { no: "02", name: "AXNOVA AI", slug: "axnova-ai", line: "Making businesses intelligent.", body: "AI assistants, intelligent automation and data-led workflows with people in control.", icon: Sparkles },
  { no: "03", name: "AXNOVA CLOUD", slug: "axnova-cloud", line: "Building secure digital foundations.", body: "Cloud architecture, DevOps, reliability and cybersecurity for modern products.", icon: Cloud },
  { no: "04", name: "AXNOVA ENTERPRISE", slug: "axnova-enterprise", line: "Connecting enterprise operations.", body: "Enterprise platforms, integrations and technology partnerships for complex needs.", icon: Building2 },
  { no: "05", name: "AXNOVA PRODUCTS", slug: "axnova-products", line: "Building products for tomorrow.", body: "A product studio for validated SaaS ideas and practical business platforms.", icon: Boxes },
];

const chapters = [
  ["01", "The reason", "Businesses of every size depend on technology, but the path from a business problem to a dependable digital solution can feel confusing. Many teams face fragmented tools, manual work, unclear project scope or technology that is difficult to maintain."],
  ["02", "The idea", "AXNOVATECH is being built to make that journey clearer. The company brings business understanding, product design and software engineering into one accountable process — from the first conversation through delivery and improvement."],
  ["03", "The operating model", "Five connected divisions bring digital engineering, AI, cloud, enterprise solutions and product development together under one technology brand. Each engagement is accepted according to confirmed capacity and fit."],
  ["04", "The ambition", "The long-term ambition is to grow from a founder-led technology practice into a trusted engineering and solutions company with specialist teams, repeatable delivery standards and useful software products."],
];

export default function About() {
  return <main className="m-page axn-company-page">
    <section className="m-phero m-phero-ph axn-about-hero"><div className="container-x">
      <p className="m-kicker">WHO WE ARE / ABOUT AXNOVATECH</p>
      <h1>Technology should make <em>business progress easier.</em></h1>
      <p>AXNOVATECH is a technology and digital engineering company in development, bringing software, AI, cloud and enterprise solutions together around practical business outcomes.</p>
      <div className="m-facts"><span><b>Business-led</b>Start with the real problem</span><span><b>Engineering-focused</b>Build for long-term use</span><Link href="/team" className="m-btn">Explore our people & expertise <ArrowRight size={16}/></Link></div>
    </div></section>

    <section className="container-x axn-story-grid axn-about-story">
      <div><p className="axn-section-eyebrow">THE AXNOVATECH STORY</p><h2>Built around a simple belief: <em>good technology starts with listening.</em></h2>
        <p>We believe software should reduce friction, improve service and give people better information to make decisions. It should not become another complicated system that teams struggle to use.</p>
        <p>That belief shapes how AXNOVATECH is being developed: understand first, scope honestly, engineer carefully, test properly and remain clear about what happens after launch.</p>
        <Link href="/process" className="axn-text-link">Explore our delivery process <ArrowUpRight size={16}/></Link>
      </div>
      <div className="axn-about-visual" aria-label="AXNOVATECH digital engineering visual"><div className="axn-about-orbit"><span>AX</span></div><b>IDEA → ENGINEERING → IMPACT</b><small>ONE PARTNER · FIVE DIVISIONS</small></div>
    </section>

    <section className="axn-detail-paper"><div className="container-x"><p className="axn-section-eyebrow">OUR JOURNEY / WHY WE EXIST</p><h2>A company being built <em>with intention.</em></h2>
      <div className="axn-story-chapters">{chapters.map(([n,t,d])=><article key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div></article>)}</div>
    </div></section>

    <section className="container-x axn-pillars-about"><p className="axn-section-eyebrow">OUR BUSINESS ARCHITECTURE</p><h2>Five divisions. <em>One connected technology partner.</em></h2>
      <div className="axn-pillar-list">{pillars.map(p=>{const Icon=p.icon;return <Link href={`/pillars/${p.slug}`} key={p.slug}><span>{p.no}</span><Icon size={24}/><div><h3>{p.name}</h3><b>{p.line}</b><p>{p.body}</p></div><ArrowUpRight size={20}/></Link>})}</div>
    </section>

    <section className="axn-detail-paper"><div className="container-x"><p className="axn-section-eyebrow">OUR VALUES</p><h2>The standards we want to <em>be known for.</em></h2>
      <div className="axn-capability-grid">{values.map(([Icon,title,body],i)=><article key={title}><small>VALUE / 0{i+1}</small><h3><Icon size={20}/> {title}</h3><p>{body}</p></article>)}</div>
    </div></section>

    <section className="container-x axn-detail-intro"><p className="axn-section-eyebrow">FOUNDER-LED LEADERSHIP</p><div className="axn-founder-inline"><div className="axn-founder-mark">NK</div><div><h2>{site.founder.name}</h2><h3>{site.founder.title}, AXNOVATECH</h3><p>{site.founder.note}</p><Link href="/team" className="axn-text-link">Meet the team structure <ArrowUpRight size={16}/></Link></div></div></section>

    <section className="axn-related"><div className="container-x"><p className="axn-section-eyebrow">EXPLORE THE COMPANY</p><h2>Discover more about <em>how we work.</em></h2><div className="axn-related-grid">
      <Link href="/team"><span>Company leadership & team</span><ArrowUpRight size={17}/></Link><Link href="/careers"><span>Careers & culture</span><ArrowUpRight size={17}/></Link><Link href="/faq"><span>Frequently asked questions</span><ArrowUpRight size={17}/></Link><Link href="/contact"><span>Contact AXNOVATECH</span><ArrowUpRight size={17}/></Link>
    </div></div></section>
  </main>;
}
