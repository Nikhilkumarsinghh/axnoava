import type { MetadataRoute } from "next";
import { catalog } from "@/data/catalog";
import { families, slugify, aboutPages } from "@/data/services-data";
import { articles } from "@/data/content";
import { pillars } from "@/data/pillars";
const base=(process.env.NEXT_PUBLIC_SITE_URL||"https://axnovatech.com").replace(/\/$/,"");
const entry=(path:string,priority:number=.6):MetadataRoute.Sitemap[number]=>({url:`${base}${path}`,lastModified:new Date(),changeFrequency:"monthly",priority});
export default function sitemap():MetadataRoute.Sitemap{
 const fixed=["","about","team","faq","services","industries","solutions","business-solutions","enterprise-solutions","technology-partners","work","careers","insights","contact","pricing","process","review","privacy","terms","refund","cookies"].map((x)=>entry(x?`/${x}`:"/",x===""?1:.7));
 const serviceDetails=catalog.services.map(x=>entry(`/services/capabilities/${x.slug}`,.75));
 const serviceFamilies=families.map(f=>entry(`/services/${f.slug}`,.7));
 const serviceTopics=families.flatMap(f=>f.topics.map(t=>entry(`/services/${f.slug}/${slugify(t[0])}`,.62)));
 const businessDetails=(catalog.businessSolutions||[]).map(x=>entry(`/business-solutions/${x.slug}`,.7));
 const generic=Object.entries(catalog).filter(([k])=>["industries","solutions","work","careers","about"].includes(k)).flatMap(([section,items])=>items.map(x=>entry(`/${section}/${x.slug}`,.58)));
 const insightPages=[...articles.map(x=>entry(`/insights/${x.slug}`,.55)),...(catalog.insights||[]).map(x=>entry(`/insights/${x.slug}`,.55))];
 const aboutDetails=aboutPages.map(x=>entry(`/about/${x[0]}`,.5));
 const pillarPages=pillars.map(p=>entry(`/pillars/${p.slug}`,.78));
 const urls=[...fixed,...pillarPages,...serviceDetails,...serviceFamilies,...serviceTopics,...businessDetails,...generic,...insightPages,...aboutDetails];
 return [...new Map(urls.map(x=>[x.url,x])).values()];
}
