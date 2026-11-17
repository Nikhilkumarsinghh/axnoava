import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, Clock3, Mail, MapPin, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { site, office } from "@/data/site-config";
import { Banner } from "@/components/banner";

export const metadata: Metadata = {
  title: "Start a project | Contact AXNOVATECH",
  description: "Tell AXNOVATECH about your software, website, AI automation or business systems requirement. Get a clear next step and written project scope.",
  alternates: { canonical: "/contact" },
};
const next = [
  ["We review your brief", "Your requirement is reviewed and routed to the right service discipline."],
  ["We clarify the outcome", "We ask focused questions about users, integrations, timeline and constraints."],
  ["You receive a clear next step", "Where there is a fit, we propose a discovery call and a written scope."],
];
export default function Contact() {
  return (
    <div className="m-page axn-contact-page">
      <section className="axn-contact-hero">
        <Banner slot="sec-contact" fallback="sec-services" />
        <div className="axn-contact-hero-shade"/>
        <div className="container-x axn-contact-hero-inner">
          <div>
            <p className="m-kicker">LET'S BUILD SOMETHING USEFUL</p>
            <h1>Start with the challenge.<br/><em>We'll shape the next step.</em></h1>
            <p className="axn-contact-hero-lede">Tell us what your business is trying to improve. We’ll help define the right technology, a practical scope and a delivery path you can evaluate.</p>
            <div className="axn-contact-proof"><span><CheckCircle2 size={16}/> Clear scope before delivery</span><span><ShieldCheck size={16}/> NDA on request</span><span><Clock3 size={16}/> Meetings by appointment</span></div>
          </div>
          <div className="axn-contact-hero-card"><span className="axn-contact-card-icon"><Sparkles size={21}/></span><small>WHAT CAN WE HELP WITH?</small><b>Websites & platforms</b><b>Business software & integrations</b><b>AI & workflow automation</b><b>Cloud, security & support</b><Link href="#project-enquiry">Tell us about your project <ArrowDownRightIcon/></Link></div>
        </div>
      </section>

      <section id="project-enquiry" className="axn-contact-workspace">
        <div className="container-x axn-contact-layout">
          <div className="axn-contact-form-column">
            <p className="m-kicker">PROJECT ENQUIRY / 01</p>
            <h2>What would you like to make possible?</h2>
            <p className="axn-contact-intro">Choose a service to get started. You can share the details in the next step — no lengthy brief required.</p>
            <ContactForm />
          </div>
          <aside className="axn-contact-sidebar">
            <div className="axn-contact-sidebar-top"><small>THE NEXT STEPS</small><h3>A thoughtful start makes better delivery.</h3><ol>{next.map(([title, body], i) => <li key={title}><span>0{i+1}</span><div><b>{title}</b><p>{body}</p></div></li>)}</ol></div>
            <div className="axn-contact-details">
              <small>CONTACT & LOCATION</small>
              <p><MapPin size={17}/>{office.address}</p>
              <p><Clock3 size={17}/>{office.hours}</p>
              {site.email && <p><Mail size={17}/><a href={`mailto:${site.email}`}>{site.email}</a></p>}
              {site.phone && <p><Phone size={17}/><a href={`tel:${site.phone}`}>{site.phone}</a></p>}
              <Link href="/faq">Read common project questions <ArrowUpRight size={15}/></Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="axn-contact-bottom">
        <div className="container-x"><div><p className="m-kicker">NOT READY TO START?</p><h2>Explore our work and capabilities first.</h2><p>Understand our service areas, delivery approach and the types of business problems we work on.</p></div><div className="axn-contact-bottom-links"><Link href="/services">Explore services <ArrowRight size={16}/></Link><Link href="/work">View our work <ArrowRight size={16}/></Link><Link href="/team">Meet our team <ArrowRight size={16}/></Link></div></div>
      </section>
    </div>
  );
}
function ArrowDownRightIcon(){ return <ArrowUpRight size={16}/>; }
