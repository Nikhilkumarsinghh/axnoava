import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Pic } from "@/components/pic";
import { photo, photoAny, rasterPhoto, video } from "@/lib/photos";
import { HeroCarousel } from "@/components/hero-carousel";
import { site } from "@/data/site-config";
import { pillars } from "@/data/pillars";
const reviews = site.reviews;

const caps = [
  ["Web & product engineering", "Websites, portals and SaaS platforms built to be fast, secure and easy to extend.", "/services/web-development"],
  ["Mobile applications", "Android and iOS apps your customers actually keep installed.", "/services/mobile-app-development"],
  ["AI & automation", "Assistants, document processing and workflow automation that save real hours.", "/services/ai-machine-learning"],
  ["Cloud & DevOps", "Hosting, pipelines and monitoring so releases are calm, not stressful.", "/services/cloud-computing"],
  ["Cybersecurity", "Application reviews and hardening before attackers find the gaps.", "/services/cybersecurity"],
  ["Design & UX", "Research-led interfaces that make complex products simple to use.", "/services/ui-ux-design"],
];
const inds: [string, string][] = [["Banking & financial services", "banking-financial-services"], ["Healthcare", "healthcare"], ["Retail & e-commerce", "retail-e-commerce"], ["Education & EdTech", "education-edtech"], ["Manufacturing", "manufacturing"], ["Logistics & supply chain", "logistics-supply-chain"], ["Real estate", "real-estate"], ["Government & public sector", "government-public-sector"]];
const models = [
  ["Fixed scope", "A defined product, a fixed plan and a clear price. Best for launches and MVPs."],
  ["Dedicated team", "Engineers and designers working as an extension of your team, month to month."],
  ["Support & growth", "Ongoing maintenance, security updates and improvements after launch."],
];
const why = [
  ["You talk to the builders", "Discuss requirements with the project owner and agree who is responsible for delivery before work begins."],
  ["Plain, written plans", "Scope, timeline, cost and risks in writing before any code is written."],
  ["Visible progress", "A working build every week, so you can see and steer instead of waiting."],
  ["Security from day one", "Secure defaults, reviewed code and clear ownership of your data and source code."],
];
const stack = ["Next.js", "React", "Node.js", "TypeScript", "React Native", "Python", "PostgreSQL", "AWS", "Docker", "Kubernetes", "OpenAI & Claude APIs", "Figma"];

export default function Home() {
  return (
    <div className="home-corporate m-home">
      <section className="axn-fullscreen-hero" aria-label="AXNOVATECH featured capabilities">
        <HeroCarousel slides={[
          { image: rasterPhoto("hero-team") || "/images/axn-cinematic-hero.webp", video: video("intro") || undefined, label: "AXNOVATECH / THE TECHNOLOGY GROUP", title: "Engineering progress for ambitious businesses.", href: "/about" },
          { image: rasterPhoto("home-slide-digital"), label: "01 / AXNOVA DIGITAL", title: "Digital products engineered around your customers.", href: "/pillars/axnova-digital" },
          { image: rasterPhoto("home-slide-ai"), label: "02 / AXNOVA AI", title: "Turn business knowledge into intelligent action.", href: "/pillars/axnova-ai" },
          { image: rasterPhoto("home-slide-cloud"), label: "03 / AXNOVA CLOUD", title: "Secure foundations. Reliable operations. Confident scale.", href: "/pillars/axnova-cloud" },
          { image: rasterPhoto("home-slide-enterprise"), label: "04 / AXNOVA ENTERPRISE", title: "Connect systems, people and enterprise workflows.", href: "/pillars/axnova-enterprise" },
          { image: rasterPhoto("home-slide-products"), label: "05 / AXNOVA PRODUCTS", title: "Building useful software products for what comes next.", href: "/pillars/axnova-products" }
        ]} />
      </section>

      <section className="m-video axn-film-section">
        <video src={(video("delivery") || video("intro")) || "/videos/axnovatech-brand-film.mp4"} poster={photo("home-film-poster")} autoPlay muted loop playsInline controls preload="metadata" aria-label="AXNOVATECH technology film" />
        <div className="container-x"><div className="m-video-copy"><p className="m-kicker">THE AXNOVATECH FILM</p><h2>Technology should make business work better.</h2><p>See how we approach software engineering, AI-enabled workflows, cloud foundations and practical business systems — from discovery through delivery.</p><Link href="/process" className="m-btn">See our delivery process <ArrowRight size={16} /></Link></div></div>
      </section>

      <section className="m-stats"><div className="container-x m-stats-grid">{site.stats.map((s) => <div key={s.l}><b>{s.v}</b><span>{s.l}</span></div>)}</div></section>









      <section className="axn-five-pillars"><div className="container-x">
        <div className="axn-five-pillars-head"><div><p className="m-kicker">THE AXNOVATECH GROUP</p><h2>Five specialist divisions.<br/><em>One connected technology partner.</em></h2></div><p>From digital products and intelligent automation to cloud foundations and enterprise platforms, our divisions work together around your business priorities.</p></div>
        <div className="axn-five-pillars-grid">{pillars.map((p,i)=> <Link href={`/pillars/${p.slug}`} key={p.slug} className={`axn-five-card axn-five-card-${p.visual}`}><span className="axn-five-number">{p.slug==="axnova-digital"?"01":p.slug==="axnova-ai"?"02":p.slug==="axnova-cloud"?"03":p.slug==="axnova-enterprise"?"04":"05"}</span><div className="axn-five-art" aria-hidden="true">{photo(
            p.slug === "axnova-digital" ? "home-pillar-digital" :
            p.slug === "axnova-ai" ? "home-pillar-ai" :
            p.slug === "axnova-cloud" ? "home-pillar-cloud" :
            p.slug === "axnova-enterprise" ? "home-pillar-enterprise" : "home-pillar-products"
          ) ? <img src={photo(
            p.slug === "axnova-digital" ? "home-pillar-digital" :
            p.slug === "axnova-ai" ? "home-pillar-ai" :
            p.slug === "axnova-cloud" ? "home-pillar-cloud" :
            p.slug === "axnova-enterprise" ? "home-pillar-enterprise" : "home-pillar-products"
          )} alt="" loading="lazy" decoding="async"/> : <span className="axn-photo-pending"/>}</div><div className="axn-five-card-copy"><small>AXNOVATECH / DIVISION</small><h3>{p.name}</h3><b>{p.strapline}</b><p>{p.summary}</p><span className="axn-five-link">Explore division <ArrowUpRight size={16}/></span></div></Link>)}</div>
      </div></section>

      <section className="m-sec m-paper"><div className="container-x">
        <div className="m-head"><p className="m-kicker">HOW WE WORK WITH CLIENTS</p><h2>Flexible engagement for businesses at every stage.</h2></div>
        <div className="m-cols m-cols3">
          <article><span className="m-kicker">01 / BUSINESS</span><h3>Business solutions</h3><p>Websites, ecommerce, POS, inventory, booking, billing and customer management for shops and growing businesses.</p><Link href="/business-solutions" className="m-more">Explore business solutions <ArrowRight size={16}/></Link></article>
          <article><span className="m-kicker">02 / ENTERPRISE</span><h3>Enterprise delivery</h3><p>Custom web applications, CRM, ERP, integrations, dedicated development and white-label project execution.</p><Link href="/technology-partners" className="m-more">Explore partnerships <ArrowRight size={16}/></Link></article>
          <article><span className="m-kicker">03 / PRODUCTS</span><h3>Product innovation</h3><p>Practical AI workflows and configurable business software, developed around validated customer needs.</p><Link href="/solutions" className="m-more">Explore solutions <ArrowRight size={16}/></Link></article>
        </div>
      </div></section>

      <section className="m-sec container-x">
        <div className="m-head"><p className="m-kicker">WHAT WE DO</p><h2>Technology services from business websites to custom enterprise software.</h2></div>
        <div className="m-fam-grid">{caps.map(([t, d, h], i) => { const src = photo("fam-" + h.split("/").pop()); return <Link href={h} className="m-fam" key={t}><span className="m-fam-img">{src ? <Image src={src} alt="" width={1200} height={750} sizes="(max-width: 620px) 100vw, (max-width: 1000px) 50vw, 33vw" quality={75} loading="lazy" decoding="async" /> : <span className="m-pic-fb" aria-hidden="true"><i /><i /><i /></span>}<em>{String(i + 1).padStart(2, "0")}</em></span><span className="m-fam-body"><h3>{t}</h3><p>{d}</p><b>Explore <ArrowUpRight size={16} /></b></span></Link>; })}</div>
        <Link href="/services" className="m-more">Explore all services <ArrowRight size={16} /></Link>
      </section>

      <section className="m-sec m-dark"><div className="container-x">
        <div className="m-head"><p className="m-kicker m-amber">WHY CLIENTS WORK WITH US</p><h2>Built on how we work, not on slogans.</h2></div>
        <div className="m-cols">{why.map(([t, d]) => <div key={t}><h3>{t}</h3><p>{d}</p></div>)}</div>
      </div></section>

      <section className="m-sec container-x">
        <div className="m-head"><p className="m-kicker">INDUSTRIES</p><h2>Experience across the sectors that run the economy.</h2></div>
        <div className="m-ind-tiles">{inds.map(([t, sl]) => { const src = photoAny("ind-" + sl); return <Link key={sl} href={`/industries/${sl}`} className="m-ind-tile">{src ? <Image src={src} alt="" width={1200} height={750} sizes="(max-width: 620px) 100vw, (max-width: 1000px) 50vw, 33vw" quality={75} loading="lazy" decoding="async" /> : <span className="m-pic-fb" aria-hidden="true"><i /><i /><i /></span>}<span className="m-ind-name">{t}<ArrowUpRight size={16} /></span></Link>; })}</div>
      </section>

      {site.caseStudies.length > 0 && <section className="m-sec"><div className="container-x">
        <div className="m-head"><p className="m-kicker">OUR WORK</p><h2>What we have built and how.</h2></div>
        <div className="m-cases">{site.caseStudies.map((c, i) => <Link href={c.href} key={c.title} className="m-case">
          <span className="m-case-visual">{photo(i === 0 ? "work-uniquetoo-platform" : "work-axnovatech-platform") ? <Image src={photo(i === 0 ? "work-uniquetoo-platform" : "work-axnovatech-platform")} alt="" width={1200} height={720} sizes="(max-width: 700px) 100vw, 50vw" quality={75} loading="lazy"/> : null}</span><small>{c.client} · {c.industry}</small><h3>{c.title}</h3><p><b>Challenge:</b> {c.challenge}</p><p><b>Result:</b> {c.result}</p><span>Read the story <ArrowRight size={15} /></span></Link>)}</div>
      </div></section>}

      <section className="m-sec container-x">
        <div className="m-head"><p className="m-kicker">HOW WE ENGAGE</p><h2>Three ways to work together.</h2></div>
        <div className="m-cols m-cols3">{models.map(([t, d], i) => <div className="m-model" key={t}><span>0{i + 1}</span><h3>{t}</h3><p>{d}</p></div>)}</div>
      </section>

      <section className="m-sec m-paper"><div className="container-x m-split"><Pic src={photo("home-local-business")} alt="Shop owner using a billing and inventory system" /><div><p className="m-kicker">FOR LOCAL BUSINESSES</p><h2 className="m-h2b">Technology for the shop around the corner.</h2><p className="m-lede">Kirana and general stores, restaurants and cafés, clothing stores, medical shops, salons, gyms and garages run on thin margins and long days. We build the simple systems that give hours back.</p><ul className="m-tick"><li>Billing, GST-ready invoices and inventory in one place</li><li>WhatsApp ordering, booking and reminder flows</li><li>A fast website and Google Business profile that bring walk-ins</li><li>Staff accounts, daily reports and cloud backups</li></ul><Link href="/business-solutions" className="m-more">See local business solutions <ArrowRight size={16} /></Link></div></div></section>

      <section className="m-sec container-x"><div className="m-split"><Pic src={photo("home-automation")} alt="Business process automation" /><div><p className="m-kicker">FULL AUTOMATION</p><h2 className="m-h2b">Automate the work that slows your business down.</h2><ul className="m-auto">{[["CRM and lead automation", "Capture, assign and follow up on every enquiry automatically."], ["Workflow and approvals", "Replace email chains with tracked, multi-step approvals."], ["Billing and invoicing", "Quotes, invoices and payment reminders on autopilot."], ["Reports and dashboards", "Daily numbers delivered without spreadsheets."], ["Support bots", "Answer common questions instantly, at any hour."], ["System integrations", "Keep CRM, accounting and web apps in sync."]].map(([t, d]) => <li key={t}><b>{t}</b><span>{d}</span></li>)}</ul><Link href="/services/enterprise-software" className="m-more">Explore business software <ArrowRight size={16} /></Link></div></div></section>

      <section className="m-sec m-paper"><div className="container-x m-split"><div><p className="m-kicker">CLIENT MANAGEMENT</p><h2 className="m-h2b">Project delivery you can follow.</h2><p className="m-lede">We agree on a point of contact, milestones, review dates and handover expectations before work begins. You receive progress updates through the communication channel agreed for your project.</p><ul className="m-tick"><li>Written requirements, scope and assumptions</li><li>Milestones, review points and change requests</li><li>Testing, deployment notes and handover</li></ul></div><Pic src={photo("home-client-management")} alt="CRM dashboard" /></div></section>



      <section className="axn-capability-band axn-capability-photo-band">
        <div className="container-x">
          <div className="axn-capability-band-head">
            <div><p className="m-kicker">ONE ENGINEERING PARTNER</p><h2>From business strategy to technology that delivers.</h2></div>
            <p>One accountable team connects consulting, experience design, software engineering and secure operations — with clear milestones and measurable outcomes.</p>
          </div>
          <div className="axn-capability-band-grid">
            {[
              ["01", "Strategy & consulting", "Discovery, operating-model design, technology roadmaps, architecture and delivery governance.", "capability-strategy"],
              ["02", "Product & experience", "Customer research, product strategy, UX architecture, design systems and accessible interfaces.", "capability-product"],
              ["03", "Engineering & integration", "Web and mobile platforms, APIs, custom software, testing and enterprise integrations.", "capability-engineering"],
              ["04", "Cloud, data & security", "Cloud foundations, DevOps, data platforms, observability, cybersecurity and resilience.", "capability-cloud"],
            ].map(([n, title, body, slot]) => <article className="axn-capability-photo-card" key={slot}>
              <img src={photo(slot)} alt={`${title} at work`} loading="lazy" decoding="async" />
              <div className="axn-capability-photo-shade" />
              <span>{n} / CAPABILITY</span><div><b>{title}</b><p>{body}</p></div>
            </article>)}
          </div>
          <div className="axn-capability-band-foot"><span>Every engagement begins with agreed scope, ownership, milestones and success measures.</span><Link href="/team">Meet our expertise <ArrowUpRight size={16}/></Link></div>
        </div>
      </section>

      <section id="reviews" className="m-sec m-paper"><div className="container-x m-rev">
        <div className="m-head"><p className="m-kicker">CLIENT REVIEWS</p><h2>What clients say about working with us.</h2></div>
        {reviews.length > 0 ? <div className="m-cases">{reviews.map((r) => <figure className="m-case" key={r.name + r.company}><div className="m-stars" aria-label={`${r.rating} out of 5`}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div><blockquote>“{r.text}”</blockquote><figcaption><b>{r.name}</b><br />{r.role}, {r.company}</figcaption></figure>)}</div>
        : <div className="m-empty"><p>We are a growing studio and we collect written feedback from every client at project close. Verified reviews appear here as they come in. Want to speak to a past client first? We will arrange a reference call.</p><div><Link href="/contact?service=Other" className="m-btn">Request a client reference <ArrowRight size={16} /></Link><Link href="/review" className="m-link">Worked with us? Leave a review →</Link></div></div>}
      </div></section>

      <section className="m-sec container-x"><div className="m-head"><p className="m-kicker">PRICING</p><h2>Clear proposals. No surprise scope changes.</h2></div>
        <div className="m-list">{site.pricing.slice(0, 4).map((p, i) => <Link href={`/contact?service=${encodeURIComponent(p.name)}`} className="m-row" key={p.name}><span>0{i + 1}</span><h3>{p.name}</h3><p>Scope, integrations and delivery plan confirmed after discovery.</p><ArrowUpRight size={22} /></Link>)}</div><Link href="/pricing" className="m-more">See all pricing <ArrowRight size={16} /></Link></section>


    </div>
  );
}
