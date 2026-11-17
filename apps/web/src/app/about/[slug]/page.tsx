import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { aboutPages } from "@/data/services-data";
import { catalog } from "@/data/catalog";
import { getDetailContent } from "@/data/expanded-content";
import { photoAny } from "@/lib/photos";
export const dynamicParams=false;
const findPage=(slug:string)=>aboutPages.find(x=>x[0]===slug);
const findCatalog=(slug:string)=>(catalog.about||[]).find(x=>x.slug===slug);
export function generateStaticParams(){return [...new Set([...aboutPages.map(x=>x[0]),...(catalog.about||[]).map(x=>x.slug)])].map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;const p=findPage(slug);const c=findCatalog(slug);const title=p?.[1]||c?.title;const description=p?.[2]||c?.description;
 return title?{title,description,alternates:{canonical:`/about/${slug}`},openGraph:{title:`${title} | AXNOVATECH`,description,type:"website"}}:{};
}
export default async function AboutSub({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const p=findPage(slug);const c=findCatalog(slug);if(!p&&!c)notFound();
 const title=p?.[1]||c!.title;const description=p?.[2]||c!.description;
 const content=p?.[3]||getDetailContent("about",c!).capabilities.map(x=>`${x.title}. ${x.body}`);
 const image=photoAny(`about-${slug}`,"about-office","about-team","sec-about");
 return <main className="m-page axn-company-page">
  <section className="m-phero m-phero-ph">{image&&<img className="m-banner" src={image} alt="" fetchPriority="high"/>}<div className="container-x"><p className="m-kicker m-amber"><Link href="/about">WHO WE ARE</Link> / COMPANY INFORMATION</p><h1>{title}</h1><p>{description}</p><div className="m-facts"><span><b>AXNOVATECH</b>company principles and practices</span><Link href="/team" className="m-btn">Meet the founder & team <ArrowRight size={16}/></Link></div></div></section>
  <section className="container-x axn-detail-split axn-about-sub"><div><p className="axn-section-eyebrow">COMPANY / {slug.toUpperCase()}</p><h2>{title} <em>at AXNOVATECH.</em></h2>{content.map((x,i)=><p key={i}>{x}</p>)}<Link href="/contact" className="axn-text-link">Talk to our team <ArrowUpRight size={16}/></Link></div>{image&&<img src={image} alt="AXNOVATECH company and engineering environment" loading="lazy"/>}</section>
  <section className="axn-related"><div className="container-x"><p className="axn-section-eyebrow">EXPLORE THE COMPANY</p><h2>More about <em>who we are.</em></h2><div className="axn-related-grid"><Link href="/about"><span>Company overview & story</span><ArrowUpRight size={17}/></Link><Link href="/team"><span>Founder & team</span><ArrowUpRight size={17}/></Link><Link href="/careers"><span>Careers & culture</span><ArrowUpRight size={17}/></Link><Link href="/faq"><span>Frequently asked questions</span><ArrowUpRight size={17}/></Link></div></div></section>
 </main>;
}
