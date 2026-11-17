import type { Metadata } from "next";
import { Banner } from "@/components/banner";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/data/site-config";
export const metadata: Metadata = { title: "Our process", description: "How AXNOVATECH scopes, designs, builds, tests and hands over software projects.", alternates: { canonical: "/process" } };
const promises = [["Clear ownership terms", "Source-code, intellectual-property and access handover terms are documented in the agreement."], ["Written scope and quote", "Deliverables, assumptions, exclusions, timeline and price are agreed before work starts."], ["Visible progress", "Review points, demos and reporting cadence are agreed for the project."], ["Confidential discussions", "An NDA can be discussed before sharing sensitive project information."]];
export default function Process() {
  return (
    <div className="m-page">
      <section className="m-phero m-phero-ph"><Banner slot="sec-process" fallback="sec-services" /><div className="container-x"><p className="m-kicker m-amber">OUR PROCESS</p><h1>How your project runs, from first call to launch.</h1><p>A structured delivery approach. Exact stages, review cadence and outputs are tailored to the engagement and recorded in the proposal.</p></div></section>
      <section className="m-sec container-x"><ol className="m-steps">{site.process.map(([t, when, d, out], i) => <li key={t}><span>{String(i + 1).padStart(2, "0")}</span><div><h2>{t}</h2><small>{when}</small><p>{d}</p><b>You receive: {out}</b></div></li>)}</ol></section>
      <section className="m-sec m-dark"><div className="container-x"><div className="m-head"><p className="m-kicker m-amber">OUR COMMITMENTS</p><h2>What you can count on.</h2></div><div className="m-cols">{promises.map(([t, d]) => <div key={t}><h3>{t}</h3><p>{d}</p></div>)}</div><Link href="/contact" className="m-btn m-btn-amber">Discuss your project <ArrowRight size={16} /></Link></div></section>
    </div>
  );
}
