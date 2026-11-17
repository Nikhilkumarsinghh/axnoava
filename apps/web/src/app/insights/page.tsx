import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { articles } from "@/data/content";
import { catalog } from "@/data/catalog";
import { photoAny } from "@/lib/photos";
export const metadata:Metadata={title:"Insights & Research | AXNOVATECH",description:"Practical guides and research topics on software engineering, AI, cloud, cybersecurity, business automation, data and digital transformation.",alternates:{canonical:"/insights"}};
export default function Insights(){
 const [featured,...rest]=articles;const hero=photoAny("sec-solutions","hero-code","hero-team");
 return <main className="m-page axn-company-page">
  <section className="m-phero m-phero-ph">{hero&&<img className="m-banner" src={hero} alt="" fetchPriority="high"/>}<div className="container-x"><p className="m-kicker m-amber">INSIGHTS / KNOWLEDGE</p><h1>Ideas and practical guidance for building better digital systems.</h1><p>Explore explainers, planning guides and engineering perspectives for business owners, product teams and technology leaders.</p><div className="m-facts"><span><b>{articles.length} articles</b>practical guides</span><span><b>{catalog.insights.length} research topics</b>technology knowledge areas</span></div></div></section>
  <section className="container-x axn-detail-intro"><p className="axn-section-eyebrow">FEATURED ARTICLE</p><Link href={`/insights/${featured.slug}`} className="m-feat"><small>EDITORIAL / {featured.read} READ</small><h2>{featured.title}</h2><p>{featured.excerpt}</p><span>Read article <ArrowRight size={16}/></span></Link>
   <div className="m-head" style={{marginTop:55}}><p className="axn-section-eyebrow">LATEST GUIDES</p><h2>Practical articles <em>for better decisions.</em></h2></div><div className="axn-related-grid axn-insight-articles">{rest.map((a,i)=>{const img=photoAny(`ins-${i+1}`);return <Link href={`/insights/${a.slug}`} key={a.slug}>{img&&<Image src={img} alt="" width={1200} height={675} sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 33vw" loading="lazy"/>}<span><small>{a.read} READ</small><br/>{a.title}<p>{a.excerpt}</p></span><ArrowUpRight size={17}/></Link>;})}</div>
  </section>
  <section className="axn-detail-paper"><div className="container-x"><p className="axn-section-eyebrow">KNOWLEDGE DIRECTORY</p><h2>Explore topics <em>by discipline.</em></h2><div className="axn-industry-directory">{catalog.insights.map((x,i)=>{const img=photoAny(`ins-topic-${x.slug}`);return <Link href={`/insights/${x.slug}`} key={x.slug} className="axn-industry-card">{img&&<Image src={img} alt="" width={1200} height={675} sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 33vw" loading="lazy"/>}<div><small>KNOWLEDGE / {String(i+1).padStart(2,"0")}</small><h3>{x.title}</h3><p>{x.description}</p><b>Explore topic <ArrowUpRight size={15}/></b></div></Link>;})}</div></div></section>
 </main>;
}
