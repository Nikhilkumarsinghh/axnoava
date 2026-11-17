"use client";
import dynamic from "next/dynamic";
const Scene = dynamic(() => import("./hero-scene").then((m) => m.HeroScene), { ssr: false, loading: () => <div className="hero-scene" /> });
export function HeroSceneLazy() { return <Scene />; }
