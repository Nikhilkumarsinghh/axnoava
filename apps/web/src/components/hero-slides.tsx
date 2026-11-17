"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
export function HeroSlides({ slides }: { slides: { src: string | null; label: string; href: string }[] }) {
  const [i, setI] = useState(0), [hold, setHold] = useState(false), n = slides.length;
  useEffect(() => { if (hold) return; const t = setInterval(() => setI((x) => (x + 1) % n), 6000); return () => clearInterval(t); }, [hold, n]);
  return (
    <div className="hs" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
      <div className="hs-stack">{slides.map((s, k) => <div key={k} className={`hs-slide hs-f${k % 5} ${k === i ? "on" : ""}`} style={s.src ? { backgroundImage: `url(${s.src})` } : undefined} aria-hidden="true" />)}</div>
      <div className="hs-veil" />
      <div className="hs-ui container-x">
        <Link href={slides[i].href} className="hs-cap"><small>0{i + 1} / 0{n}</small><b>{slides[i].label}</b><ArrowUpRight size={18} /></Link>
        <div className="hs-dots" role="tablist" aria-label="Hero slides">{slides.map((s, k) => <button key={k} role="tab" aria-selected={k === i} aria-label={`Slide ${k + 1}: ${s.label}`} className={k === i ? "on" : ""} onClick={() => setI(k)} />)}</div>
      </div>
    </div>
  );
}
