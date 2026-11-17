"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { site } from "@/data/site-config";

export function PricingExplorer() {
  const [i, setI] = useState(0); const p = site.pricing[i];
  const tiers = [
    { n: "Starter", sub: "For a focused first release", f: [...p.items.slice(0, 2), "Defined deliverables", "Handover notes"] },
    { n: "Business", sub: "For a growing operation", f: [...p.items, "Integration planning", "Post-launch support options"], hl: true },
    { n: "Enterprise", sub: "For complex requirements", f: ["Discovery and solution architecture", "Dedicated delivery plan", "Security and integration review", "Support model by agreement"] },
  ];
  return (
    <div>
      <div className="m-tabs" role="tablist" aria-label="Select a service">{site.pricing.map((s, k) => <button key={s.name} role="tab" aria-selected={k === i} className={k === i ? "on" : ""} onClick={() => setI(k)}>{s.name}</button>)}</div>
      <p className="m-tab-note">Pricing is based on scope, integrations, complexity and delivery requirements. We provide a written proposal before work begins.</p>
      <div className="m-tiers">{tiers.map((t) => (
        <article key={t.n} className={`m-tier ${t.hl ? "hl" : ""}`}>{t.hl && <em>Popular engagement</em>}<h3>{t.n}</h3><small>{t.sub}</small><b>Custom quote</b>
          <ul>{t.f.map((x) => <li key={x}><Check size={16} />{x}</li>)}</ul>
          <Link href={`/contact?service=${encodeURIComponent(p.name)}&type=New%20project`} className="m-btn">Discuss requirements <ArrowRight size={16} /></Link></article>
      ))}</div>
    </div>
  );
}
