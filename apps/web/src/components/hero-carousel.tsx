"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
type Slide = { image: string | null; video?: string | null; title: string; label: string; href: string };
export function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [active,setActive]=useState(0);
  const [failedVideos,setFailedVideos]=useState<number[]>([]);
  useEffect(()=>{
    if(slides.length<2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer=window.setInterval(()=>{ if(document.visibilityState==="visible") setActive(v=>(v+1)%slides.length); },5600);
    return ()=>window.clearInterval(timer);
  },[slides.length]);
  const current=slides[active];
  const go=(direction:number)=>setActive(v=>(v+direction+slides.length)%slides.length);
  return <div className="axn-carousel">
    <div className="axn-carousel-stage">
      {slides.map((slide,index)=><div className={`axn-carousel-slide ${active===index?"is-active":""}`} key={slide.label} aria-hidden={active!==index}>
        {slide.video && !failedVideos.includes(index) ? (
          <video src={slide.video} poster={slide.image || undefined} autoPlay muted loop playsInline preload="metadata"
            onError={() => setFailedVideos((current) => current.includes(index) ? current : [...current, index])} />
        ) : slide.image ? (
          <img src={slide.image} alt={slide.label} loading={index===0?"eager":"lazy"} decoding="async" fetchPriority={index===0?"high":"auto"}/>
        ) : <div className="axn-carousel-fallback"/>}
        <div className="axn-carousel-shade"/>
      </div>)}
      <div className="axn-carousel-top"><span><i/> AXNOVATECH / LIVE CAPABILITIES</span><span>0{active+1} <b>/ 0{slides.length}</b></span></div>
      <div className="axn-carousel-caption"><small>{current.label}</small><h2>{current.title}</h2><Link href={current.href}>Explore capability <ArrowUpRight size={16}/></Link></div>
      <div className="axn-carousel-controls"><div className="axn-carousel-dots">{slides.map((slide,index)=><button key={slide.label} aria-label={`Show ${slide.label}`} aria-pressed={index===active} className={index===active?"active":""} onClick={()=>setActive(index)}/>)}</div><div className="axn-carousel-arrows"><button aria-label="Previous slide" onClick={()=>go(-1)}><ArrowLeft size={17}/></button><button aria-label="Next slide" onClick={()=>go(1)}><ArrowRight size={17}/></button></div></div>
    </div>
    <div className="axn-carousel-foot"><span>ENGINEERING · AI · CLOUD · BUSINESS SYSTEMS</span><span>SCROLL TO EXPLORE ↓</span></div>
  </div>;
}
