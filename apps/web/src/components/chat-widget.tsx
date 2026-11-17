"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
type M = { r: "bot" | "user"; t: string };
const quick = ["What do you build for local shops?", "Do you offer white-label development?", "Do you build CRM?", "How do I start a project?"];
export function ChatWidget() {
  const [open, setOpen] = useState(false), [busy, setBusy] = useState(false), [v, setV] = useState("");
  const [msgs, setMsgs] = useState<M[]>([{ r: "bot", t: "Hi! I am the AXNOVATECH assistant. Ask about services, business solutions, partnerships or our delivery process." }]);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, busy, open]);
  async function send(text: string) {
    const t = text.trim(); if (!t || busy) return; const next = [...msgs, { r: "user" as const, t }]; setMsgs(next); setV(""); setBusy(true);
    try {
      const r = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: next.map((m) => ({ role: m.r === "bot" ? "assistant" : "user", content: m.t })) }) });
      const d = await r.json(); setMsgs((x) => [...x, { r: "bot", t: d.reply || "Please try again." }]);
    } catch { setMsgs((x) => [...x, { r: "bot", t: "I could not connect. Please use our contact page and we will reply soon." }]); } finally { setBusy(false); }
  }
  const linkify = (t: string) => t.split(/(\/[a-z][a-z0-9/-]+)/g).map((p, i) => /^\/[a-z]/.test(p) ? <Link key={i} href={p}>{p}</Link> : p);
  return (
    <>
      {open && <div className="cw" role="dialog" aria-label="AXNOVATECH chat">
        <div className="cw-h"><div><b>AXNOVATECH Assistant</b><small>Typically replies instantly</small></div><button onClick={() => setOpen(false)} aria-label="Close chat"><X size={18} /></button></div>
        <div className="cw-b">{msgs.map((m, i) => <p key={i} className={m.r}>{linkify(m.t)}</p>)}{busy && <p className="bot cw-dots"><i /><i /><i /></p>}<div ref={end} /></div>
        <div className="cw-q">{quick.map((q) => <button key={q} onClick={() => send(q)}>{q}</button>)}<Link href="/contact">Talk to our team</Link></div>
        <form className="cw-f" onSubmit={(e) => { e.preventDefault(); send(v); }}><input value={v} onChange={(e) => setV(e.target.value)} placeholder="Type your question..." maxLength={400} aria-label="Your message" /><button aria-label="Send" disabled={busy}><Send size={18} /></button></form>
      </div>}
      <button className="cw-fab" onClick={() => setOpen(!open)} aria-label={open ? "Close chat" : "Chat with us"}>{open ? <X size={24} /> : <MessageCircle size={26} />}</button>
    </>
  );
}
