import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { articles } from "@/data/content";
import { catalog } from "@/data/catalog";
import { getDetailContent } from "@/data/expanded-content";
import { photoAny } from "@/lib/photos";
export const dynamicParams=false;
const findArticle=(slug:string)=>articles.find(x=>x.slug===slug);
const findTopic=(slug:string)=>(catalog.insights||[]).find(x=>x.slug===slug);
export function generateStaticParams(){return [...articles.map(x=>({slug:x.slug})),...(catalog.insights||[]).map(x=>({slug:x.slug}))].filter((x,i,a)=>a.findIndex(y=>y.slug===x.slug)===i);}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;const a=findArticle(slug);const topic=findTopic(slug);const item=a||topic;if(!item)return{};
 return{title:item.title,description:item.excerpt||item.description,alternates:{canonical:`/insights/${slug}`},openGraph:{title:`${item.title} | AXNOVATECH Insights`,description:item.excerpt||item.description,type:"article"}};
}
export default async function InsightDetail({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const article=findArticle(slug);const topic=findTopic(slug);if(!article&&!topic)notFound();
 const title=article?.title||topic!.title;const description=article?.excerpt||topic!.description;
 const body=article?.body||[];const detail=topic?getDetailContent("insights",topic):null;
 const image=photoAny(`ins-topic-${slug}`,`ins-${articles.findIndex(x=>x.slug===slug)}`,"ins-0","hero-code","sec-solutions");
 return <main className="m-page axn-company-page">
  <section className="axn-generic-hero">{image&&<img src={image} alt="" fetchPriority="high"/>}<div className="axn-generic-shade"/><div className="container-x"><p className="axn-film-eyebrow"><span/>AXNOVATECH / INSIGHTS & RESEARCH</p><h1>{title}</h1><p>{description}</p><div className="axn-film-actions"><span>EDITORIAL / PRACTICAL GUIDANCE</span></div></div></section>
  <article className="container-x axn-article-body">{article?body.map((paragraph,i)=><p key={i}>{paragraph}</p>):<><p>{detail!.intro}</p><h2>Key considerations</h2><div className="axn-capability-grid">{detail!.capabilities.map((x,i)=><section key={x.title}><small>TOPIC / 0{i+1}</small><h3>{x.title}</h3><p>{x.body}</p></section>)}</div><h2>Practical steps</h2><div className="axn-delivery-grid">{detail!.delivery.map(x=><section key={x.title}><h3>{x.title}</h3><p>{x.body}</p></section>)}</div><h2>Checklist</h2><ul className="axn-deliverables">{detail!.deliverables.map(x=><li key={x}><CheckCircle2 size={18}/>{x}</li>)}</ul></>}</article>
  <section className="axn-related"><div className="container-x"><p className="axn-section-eyebrow">CONTINUE EXPLORING</p><h2>More ideas for <em>better technology decisions.</em></h2><div className="axn-related-grid">{articles.filter(x=>x.slug!==slug).slice(0,3).map(x=><Link href={`/insights/${x.slug}`} key={x.slug}><span>{x.title}</span><ArrowUpRight size={17}/></Link>)}</div><Link href="/insights" className="axn-primary">Back to insights <ArrowRight size={16}/></Link></div></section>
 </main>;
}
