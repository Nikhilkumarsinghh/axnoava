"use client";
import { useEffect, useState } from "react";
import { X, ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export function ProjectEnquiryDialog() {
  const [open,setOpen]=useState(false);
  useEffect(()=>{
    if(!open) return;
    const previous=document.body.style.overflow;document.body.style.overflow="hidden";
    const close=(e:KeyboardEvent)=>{if(e.key==="Escape")setOpen(false)};
    window.addEventListener("keydown",close);
    return ()=>{document.body.style.overflow=previous;window.removeEventListener("keydown",close)};
  },[open]);
  return <>
    <button type="button" className="axn-global-discuss" onClick={()=>setOpen(true)}>Discuss a project <ArrowUpRight size={15}/></button>
    {open&&<div className="axn-dialog-backdrop" role="presentation" onMouseDown={(e)=>{if(e.target===e.currentTarget)setOpen(false)}}>
      <section className="axn-dialog" role="dialog" aria-modal="true" aria-labelledby="axn-dialog-title">
        <div className="axn-dialog-head"><div><small>AXNOVATECH / PROJECT ENQUIRY</small><h2 id="axn-dialog-title">Tell us what you want to build.</h2></div><button type="button" onClick={()=>setOpen(false)} aria-label="Close project enquiry"><X size={21}/></button></div>
        <ContactForm/>
      </section>
    </div>}
  </>;
}
