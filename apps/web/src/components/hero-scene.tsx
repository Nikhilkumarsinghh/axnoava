"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// Real WebGL scene: polished metal knot with environment reflections, glass rings, particle field, mouse + scroll parallax.
export function HeroScene() {
  const host = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(false);
  useEffect(() => {
    const el = host.current!;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" }); } catch { setFallback(true); return; }
    const small = window.innerWidth < 700, reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.15;
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const pm = new THREE.PMREMGenerator(renderer);
    scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    const cam = new THREE.PerspectiveCamera(40, 1, 0.1, 100); cam.position.set(0, 0, 9);
    const group = new THREE.Group(); scene.add(group);

    const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.5, 0.46, small ? 160 : 300, small ? 20 : 36, 2, 3),
      new THREE.MeshPhysicalMaterial({ color: 0xd9a400, metalness: 1, roughness: 0.16, clearcoat: 1, clearcoatRoughness: 0.08, envMapIntensity: 1.4 }));
    group.add(knot);
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.62, 3), new THREE.MeshStandardMaterial({ color: 0xffc72c, emissive: 0xffc72c, emissiveIntensity: 1.6, roughness: 0.3 }));
    group.add(core);
    const glass = new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0, roughness: 0.05, transmission: 1, thickness: 0.6, ior: 1.45, transparent: true, opacity: 1 });
    const rings = [3.1, 3.7].map((r, i) => { const m = new THREE.Mesh(new THREE.TorusGeometry(r, 0.035, 24, 220), glass); m.rotation.set(1.1 + i * 0.6, i * 0.9, 0); group.add(m); return m; });
    const N = small ? 500 : 1400, pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) { const r = 4 + Math.random() * 6, t = Math.random() * 6.283, p = Math.acos(2 * Math.random() - 1); pos.set([r * Math.sin(p) * Math.cos(t), r * Math.sin(p) * Math.sin(t), r * Math.cos(p)], i * 3); }
    const pg = new THREE.BufferGeometry(); pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const dust = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xb98f00, size: 0.035, transparent: true, opacity: 0.8, depthWrite: false }));
    scene.add(dust);
    const key = new THREE.PointLight(0xffc72c, 40, 30); key.position.set(4, 3, 5); scene.add(key);
    const rim = new THREE.PointLight(0xffd9a8, 45, 30); rim.position.set(-5, -2, 4); scene.add(rim);

    let mx = 0, my = 0, tx = 0, ty = 0, vis = true, raf = 0, sy = 0;
    const fit = () => { const w = el.clientWidth, h = el.clientHeight; renderer.setSize(w, h); cam.aspect = w / h; cam.updateProjectionMatrix(); group.scale.setScalar(w < 600 ? 0.78 : 1); };
    const move = (e: PointerEvent) => { const r = el.getBoundingClientRect(); tx = ((e.clientX - r.left) / r.width - 0.5) * 2; ty = ((e.clientY - r.top) / r.height - 0.5) * 2; };
    const scroll = () => { sy = window.scrollY / window.innerHeight; };
    const clock = new THREE.Clock();
    const frame = () => {
      raf = requestAnimationFrame(frame); if (!vis) return;
      const t = clock.getElapsedTime(); mx += (tx - mx) * 0.05; my += (ty - my) * 0.05;
      knot.rotation.set(t * 0.18 + my * 0.4, t * 0.25 + mx * 0.6 + sy, 0);
      core.scale.setScalar(1 + Math.sin(t * 2) * 0.06);
      rings.forEach((r, i) => { r.rotation.z = t * (0.15 + i * 0.1) * (i ? -1 : 1); });
      dust.rotation.y = t * 0.02 + sy * 0.3; group.position.y = Math.sin(t * 0.8) * 0.12 - sy * 0.8;
      renderer.render(scene, cam);
    };
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; });
    fit(); io.observe(el); window.addEventListener("resize", fit); window.addEventListener("scroll", scroll, { passive: true }); el.addEventListener("pointermove", move);
    if (reduce) renderer.render(scene, cam); else frame();
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("resize", fit); window.removeEventListener("scroll", scroll); el.removeEventListener("pointermove", move);
      scene.traverse((o) => { const m = o as THREE.Mesh; m.geometry?.dispose?.(); }); pm.dispose(); renderer.dispose(); renderer.domElement.remove(); };
  }, []);
  if (fallback) return <div className="hero-scene hero-scene-fallback" aria-hidden="true"><img src="/images/axn-cinematic-hero.webp" alt="" /></div>;
  return <div ref={host} className="hero-scene" role="img" aria-label="Interactive 3D visual of connected engineering systems" />;
}
