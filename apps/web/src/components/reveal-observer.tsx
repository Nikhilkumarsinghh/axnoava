"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SEL = "main section > div > *, main section > h2, .service-card, .project-card, .industry-card, .catalog-card, .engagement-card, .trust-framework article, .faq-grid article, .detail-usecase-grid article, .m-steps li, .m-tier, .m-fam, .m-routes a, .m-price, .m-ind-grid article, .m-team article, .m-incl li, .m-strip li, .m-cols > div, .m-auto li, .m-split > *, .m-faq details";
export function RevealObserver() {
  const path = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(SEL)).filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.92);
    els.forEach((el, i) => { el.classList.add("rv"); el.style.setProperty("--rv-d", `${(i % 4) * 70}ms`); });
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("rv-in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);
  return null;
}
