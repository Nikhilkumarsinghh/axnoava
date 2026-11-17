import type { Metadata } from "next";
import { Banner } from "@/components/banner";
import { Check } from "lucide-react";
import { PricingExplorer } from "@/components/pricing-explorer";
export const metadata: Metadata = { title: "Pricing", description: "Explore engagement models and request a written proposal based on your requirements.", alternates: { canonical: "/pricing" } };
const all = ["Written scope and assumptions", "Milestones and review cadence agreed", "Source-code and IP terms documented", "NDA available on request", "Support options defined in the proposal"];
const faq = [["Are prices final?", "Pricing depends on requirements, integrations, complexity and delivery model. We provide a written proposal after discovery."], ["Do you charge GST?", "Applicable taxes are shown on the formal quotation or invoice."], ["How do payments work?", "Payment milestones are agreed in writing and tied to the delivery plan."]];
export default function Pricing() {
  return (
    <div className="m-page">
      <section className="m-phero m-phero-ph"><Banner slot="sec-pricing" fallback="sec-services" /><div className="container-x"><p className="m-kicker m-amber">PRICING</p><h1>Choose the engagement that fits your requirements.</h1><p>Every project is scoped before pricing is confirmed. You receive written deliverables, assumptions, milestones and payment terms before work starts.</p></div></section>
      <section className="m-sec container-x"><PricingExplorer />
        <div className="m-all"><h2>Included in every plan</h2><ul>{all.map((a) => <li key={a}><Check size={16} />{a}</li>)}</ul></div>
        <div className="m-faq">{faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
    </div>
  );
}
