"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";

type Column={title:string;items:[string,string][]};
type NavItem={l:string;h:string;columns?:Column[]};
const nav:NavItem[]=[
 {l:"Our divisions",h:"/about",columns:[
  {title:"Technology divisions",items:[["AXNOVA DIGITAL","/pillars/axnova-digital"],["AXNOVA AI","/pillars/axnova-ai"],["AXNOVA CLOUD","/pillars/axnova-cloud"],["AXNOVA ENTERPRISE","/pillars/axnova-enterprise"],["AXNOVA PRODUCTS","/pillars/axnova-products"]]},
  {title:"Explore",items:[["About AXNOVATECH","/about"],["Our work","/work"],["Our delivery process","/process"]]},
  {title:"Start a conversation",items:[["Discuss a project","/contact"],["Technology partnerships","/technology-partners"],["Frequently asked questions","/faq"]]}
 ]},
 {l:"What we do",h:"/services",columns:[
  {title:"Technology services",items:[["Application development","/services/capabilities/application-development"],["Web & product engineering","/services/web-development"],["AI & machine learning","/services/capabilities/ai-machine-learning"],["Cloud & DevOps","/services/capabilities/cloud-computing"],["Cybersecurity","/services/capabilities/cybersecurity"],["View all services","/services"]]},
  {title:"Industries",items:[["Banking & financial services","/industries/banking-financial-services"],["Healthcare","/industries/healthcare"],["Retail & e-commerce","/industries/retail-e-commerce"],["Manufacturing","/industries/manufacturing"],["Logistics & supply chain","/industries/logistics-supply-chain"],["Explore industries","/industries"]]},
  {title:"Business & enterprise",items:[["Business solutions","/business-solutions"],["Enterprise software","/enterprise-solutions"],["Workflow automation","/solutions/workflow-automation"],["Technology partnerships","/technology-partners"],["Explore all solutions","/solutions"]]}
 ]},
 {l:"Products & solutions",h:"/solutions",columns:[
  {title:"Business systems",items:[["Retail POS & billing","/business-solutions/retail-pos-billing"],["Inventory & stock control","/business-solutions/inventory-stock-control"],["Small business CRM","/business-solutions/small-business-crm"],["E-commerce storefront","/business-solutions/ecommerce-storefront"],["Custom business software","/business-solutions/custom-business-software"]]},
  {title:"Digital platforms",items:[["Enterprise portals","/solutions/enterprise-portals"],["Customer experience","/solutions/customer-experience-platforms"],["AI knowledge assistant","/solutions/ai-knowledge-assistant"],["Document intelligence","/solutions/document-intelligence"],["Predictive analytics","/solutions/predictive-analytics"]]},
  {title:"Explore",items:[["All business solutions","/business-solutions"],["All solutions","/solutions"],["Our delivery process","/process"]]}
 ]},
 {l:"Who we are",h:"/about",columns:[
  {title:"AXNOVATECH",items:[["Our company story","/about"],["Purpose & values","/about/values"],["Leadership","/about/leadership"],["Our team","/team"],["How we work","/process"]]},
  {title:"People & culture",items:[["Careers","/careers"],["Talent community","/careers"],["Technology partners","/technology-partners"]]},
  {title:"Connect",items:[["Contact us","/contact"],["Frequently asked questions","/faq"],["Privacy & trust","/privacy"]]}
 ]},
 {l:"Insights",h:"/insights"},
 {l:"Our work",h:"/work"},
];
const DESC:Record<string,string>={
 "What we do":"Explore the engineering capabilities and industry knowledge that help solve business challenges.",
 "Products & solutions":"Discover business systems, digital platforms and practical product solutions.",
 "Our divisions":"Five connected business pillars across digital, AI, cloud, enterprise and products.",
 "Who we are":"Meet the people, principles and purpose behind AXNOVATECH."
};
export function SiteHeader(){
 const [open,setOpen]=useState(false),[active,setActive]=useState<string|null>(null),[solid,setSolid]=useState(false),path=usePathname();
 useEffect(()=>{setOpen(false);setActive(null);},[path]);
 useEffect(()=>{const f=()=>setSolid(window.scrollY>8);f();window.addEventListener("scroll",f,{passive:true});return()=>window.removeEventListener("scroll",f);},[]);
 useEffect(()=>{document.body.style.overflow=open?"hidden":"";const k=(e:KeyboardEvent)=>{if(e.key==="Escape"){setOpen(false);setActive(null);}};window.addEventListener("keydown",k);return()=>window.removeEventListener("keydown",k);},[open]);
 return <header className={`axh ${solid?"axh-solid":""}`} onMouseLeave={()=>setActive(null)}>
  <div className="axh-in container-x">
   <Link href="/" className="axh-logo axn-brand-lockup" aria-label="AXNOVATECH — home"><img src="/brand/logo/axnovatech-symbol.svg" alt="" width={44} height={44}/><span>AXNOVA<span>TECH</span></span></Link>
   <nav className="axh-nav" aria-label="Main navigation">
    {nav.map(n=><div className={`axh-item ${active===n.l?"is-open":""}`} key={n.l} onMouseEnter={()=>n.columns&&setActive(n.l)}>
      <Link href={n.h} className={path===n.h||(n.h!=="/"&&path.startsWith(n.h+"/"))?"on":""} aria-haspopup={n.columns?"true":undefined} aria-expanded={n.columns?active===n.l:undefined} onFocus={()=>n.columns&&setActive(n.l)}>{n.l}{n.columns&&<ChevronDown size={14}/>}</Link>
      {n.columns&&<div className="axh-mega"><div className="axh-mega-head"><div><small>EXPLORE AXNOVATECH</small><h2>{n.l}</h2><p>{DESC[n.l]}</p></div><Link href={n.h} className="axh-mega-overview">View overview <ArrowUpRight size={16}/></Link></div><div className="axh-mega-columns">{n.columns.map(col=><section key={col.title}><h3>{col.title}</h3>{col.items.map(([label,href])=><Link key={href+label} href={href}>{label}<ArrowUpRight size={13}/></Link>)}</section>)}</div></div>}
    </div>)}
   </nav>
   <Link href="/contact" className="axh-cta">Contact us <ArrowUpRight size={15}/></Link>
   <button className="axh-burger" aria-label={open?"Close menu":"Open menu"} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X size={24}/>:<Menu size={24}/>}</button>
  </div>
  {open&&<div className="axh-drawer">
   {nav.map(n=>n.columns?<details key={n.l}><summary>{n.l}<ChevronDown size={18}/></summary>{n.columns.map(col=><section className="axh-mobile-col" key={col.title}><h3>{col.title}</h3>{col.items.map(([label,href])=><Link key={href+label} href={href}>{label}</Link>)}</section>)}<Link href={n.h}>View all</Link></details>:<Link key={n.l} href={n.h} className="axh-d1">{n.l}</Link>)}
   <Link href="/contact" className="axh-cta axh-dcta">Contact AXNOVATECH <ArrowUpRight size={16}/></Link>
  </div>}
 </header>;
}
