"use client";
import { useState } from "react";
export function ReviewForm() {
  const [busy, setBusy] = useState(false), [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setMsg(null); const f = e.currentTarget; const d = Object.fromEntries(new FormData(f).entries());
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: d.name, email: d.email, service: `${d.company} - ${d.rating}/5 stars`, type: "Client review", message: `Rating: ${d.rating}/5\nCompany: ${d.company}\nPermission to publish: ${d.ok ? "YES" : "NO"}\n\n${d.text}`, website: d.website }) });
      const j = await r.json().catch(() => ({})); if (!r.ok) throw new Error(j.error || "Could not send."); setMsg({ ok: true, t: "Thank you. Your review has been sent." }); f.reset();
    } catch (x) { setMsg({ ok: false, t: x instanceof Error ? x.message : "Something went wrong." }); } finally { setBusy(false); }
  }
  return (
    <form onSubmit={submit} className="axn-form">
      <div className="axn-form-row"><label>Your name<input required name="name" minLength={2} /></label><label>Email<input required type="email" name="email" /></label></div>
      <div className="axn-form-row"><label>Company<input name="company" /></label><label>Rating<select name="rating" defaultValue="5"><option>5</option><option>4</option><option>3</option><option>2</option><option>1</option></select></label></div>
      <label>Your experience<textarea required minLength={10} name="text" rows={5} /></label>
      <label style={{ display: "flex", gap: 10, alignItems: "center", fontWeight: 500 }}><input type="checkbox" name="ok" style={{ width: "auto" }} /> You may publish this review on the AXNOVATECH website.</label>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="axn-hp" />
      <button disabled={busy} className="axn-form-btn">{busy ? "Sending..." : "Submit review"}</button>
      {msg && <p role="status" className={msg.ok ? "axn-form-ok" : "axn-form-err"}>{msg.t}</p>}
    </form>
  );
}
