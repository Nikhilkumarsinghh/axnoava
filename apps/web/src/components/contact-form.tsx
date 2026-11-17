"use client";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Search } from "lucide-react";
import { catalog } from "@/data/catalog";

const divisionServices = ["AXNOVA DIGITAL", "AXNOVA AI", "AXNOVA CLOUD", "AXNOVA ENTERPRISE", "AXNOVA PRODUCTS"];
const options = [
  { group: "Technology services", items: catalog.services || [] },
  { group: "Business solutions", items: catalog.businessSolutions || [] },
  { group: "Digital solutions", items: catalog.solutions || [] },
  { group: "AXNOVATECH divisions", items: divisionServices.map((title) => ({ title })) },
];
const allServices = options.flatMap((group) => group.items.map((item) => ({ title: item.title, group: group.group })));
const inquiryTypes = ["New project", "Partnership", "Careers", "Support & maintenance", "Media & other"];

export function ContactForm({ initialService = "" }: { initialService?: string }) {
  const [step,setStep]=useState<1|2>(1);
  const [service,setService]=useState(initialService);
  const [query,setQuery]=useState("");
  const [busy,setBusy]=useState(false);
  const [typ,setTyp]=useState("New project");
  const [msg,setMsg]=useState<{ok:boolean;text:string}|null>(null);
  useEffect(()=>{
    const params=new URLSearchParams(window.location.search);
    const serviceParam=params.get("service");
    const typeParam=params.get("type");
    if(serviceParam) setService(serviceParam);
    if(typeParam && inquiryTypes.includes(typeParam)) setTyp(typeParam);
  },[initialService]);
  const filtered=useMemo(()=>allServices.filter(x=>`${x.title} ${x.group}`.toLowerCase().includes(query.toLowerCase())),[query]);
  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();setBusy(true);setMsg(null);
    const form=e.currentTarget;
    const payload=Object.fromEntries(new FormData(form).entries());
    try{
      const mailResponse=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
      const mailData=await mailResponse.json().catch(()=>({}));
      if(!mailResponse.ok) throw new Error(mailData.error||"Unable to send your enquiry. Please try again.");
      setMsg({ok:true,text:"Thank you. Your enquiry has been sent to the AXNOVATECH team."});
      form.reset();setStep(1);setService("");setQuery("");
    }catch(err){setMsg({ok:false,text:err instanceof Error?err.message:"Something went wrong."});}
    finally{setBusy(false);}
  }
  return <div className="axn-contact-wizard">
    <div className="axn-contact-steps" aria-label="Enquiry steps"><span className={step===1?"current":"complete"}><b>01</b> Select a service</span><i/><span className={step===2?"current":""}><b>02</b> Your details</span></div>
    {step===1 ? <section className="axn-service-picker">
      <p className="axn-picker-kicker">LET'S START WITH YOUR REQUIREMENT</p>
      <h3>Which service are you interested in?</h3>
      <p className="axn-picker-help">Choose a service first. We will show the enquiry form after your selection.</p>
      <label className="axn-picker-search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search services and business solutions" aria-label="Search services"/></label>
      <div className="axn-picker-groups">{options.map(group=>{
        const items=filtered.filter(x=>x.group===group.group);
        if(!items.length)return null;
        return <div className="axn-picker-group" key={group.group}><h4>{group.group}</h4><div className="axn-picker-options">{items.map(item=><button type="button" key={`${group.group}-${item.title}`} className={service===item.title?"selected":""} onClick={()=>setService(item.title)}><span>{item.title}</span>{service===item.title&&<CheckCircle2 size={18}/>}</button>)}</div></div>;
      })}</div>
      <button type="button" className="axn-form-btn axn-continue" disabled={!service} onClick={()=>{setMsg(null);setStep(2);}}>{service?"Continue with "+service:"Select a service to continue"} <ArrowRight size={17}/></button>
      <button type="button" className="axn-other-service" onClick={()=>{setService("Other / not sure");setStep(2);}}>Not sure which service? Continue with “Other”</button>
      {msg&&<p role="status" className={msg.ok?"axn-form-ok":"axn-form-err"}>{msg.text}</p>}
    </section> : <form onSubmit={submit} className="axn-form">
      <div className="axn-selected-service"><div><small>SELECTED SERVICE</small><b>{service}</b></div><button type="button" onClick={()=>setStep(1)}><ArrowLeft size={15}/> Change</button></div>
      <input type="hidden" name="service" value={service}/>
      <div className="axn-form-row">
        <label>Full name<input required name="name" minLength={2} autoComplete="name"/></label>
        <label>Work email<input required type="email" name="email" autoComplete="email"/></label>
      </div>
      <div className="axn-form-row">
        <label>Business / company<input name="company" autoComplete="organization" maxLength={160}/></label>
        <label>City / location<input name="location" autoComplete="address-level2" maxLength={120}/></label>
      </div>
      <div className="axn-form-row">
        <label>Phone<input name="phone" type="tel" autoComplete="tel"/></label>
        <label>Enquiry type<select name="type" value={typ} onChange={e=>setTyp(e.target.value)}>{inquiryTypes.map(n=><option key={n}>{n}</option>)}</select></label>
      </div>
      <label>Indicative budget<select name="budget" defaultValue="Not decided"><option>Not decided</option><option>Under ₹25,000</option><option>₹25,000–₹1 lakh</option><option>₹1–5 lakh</option><option>₹5 lakh+</option></select></label>
      <label>Project details<textarea required minLength={10} name="message" rows={5} placeholder="What does your business do, what problem should we solve, and what would success look like?"/></label>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="axn-hp"/>
      <button disabled={busy} className="axn-form-btn">{busy?"Sending enquiry...":"Submit enquiry →"}</button>
      {msg&&<p role="status" className={msg.ok?"axn-form-ok":"axn-form-err"}>{msg.text}</p>}
      <p className="axn-form-note">We use these details to review and respond to your enquiry. Please do not submit passwords, payment details or sensitive personal information. See our Privacy Policy.</p>
    </form>}
  </div>;
}
