"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, Settings2, X } from "lucide-react";
type Consent = { necessary: true; analytics: boolean; marketing: boolean; savedAt: string };
const KEY = "axn_cookie_consent_v1";
export function CookieConsent() {
 const [visible,setVisible]=useState(false),[settings,setSettings]=useState(false),[analytics,setAnalytics]=useState(false),[marketing,setMarketing]=useState(false);
 useEffect(()=>{try{const raw=localStorage.getItem(KEY);if(!raw)setVisible(true);else{const v=JSON.parse(raw) as Consent;setAnalytics(!!v.analytics);setMarketing(!!v.marketing)}}catch{setVisible(true)}
 const open=()=>{setSettings(true);setVisible(true)};window.addEventListener("axn:cookie-settings",open);return()=>window.removeEventListener("axn:cookie-settings",open)},[]);
 function save(a:boolean,m:boolean){localStorage.setItem(KEY,JSON.stringify({necessary:true,analytics:a,marketing:m,savedAt:new Date().toISOString()}));setSettings(false);setVisible(false)}
 if(!visible)return null;
 return <div className={`cookie-layer${settings ? " is-modal" : ""}`} role="dialog" aria-modal={settings ? "true" : undefined} aria-labelledby="cookie-title"><section className="cookie-panel"><div className="cookie-icon"><Cookie size={21}/></div><button className="cookie-close" aria-label="Close cookie settings" onClick={()=>{if(localStorage.getItem(KEY))setVisible(false)}}><X size={17}/></button><p className="cookie-kicker">YOUR PRIVACY, YOUR CHOICE</p><h2 id="cookie-title">{settings?"Cookie preferences":"A better experience, on your terms."}</h2><p className="cookie-copy">This site stores your cookie preference. Optional analytics and advertising integrations are not enabled in this build; if added later, they must respect your saved choice. Read our <Link href="/cookies">Cookie Policy</Link> and <Link href="/privacy">Privacy Policy</Link>.</p>
 {settings&&<div className="cookie-options"><div><span><b>Essential</b><small>Required for security and core site functions.</small></span><strong>Always on</strong></div><label><span><b>Analytics</b><small>Allows aggregate usage measurement only if an analytics integration is later enabled.</small></span><input type="checkbox" checked={analytics} onChange={e=>setAnalytics(e.target.checked)}/></label><label><span><b>Marketing</b><small>Allows advertising-related storage only if an approved integration is later enabled.</small></span><input type="checkbox" checked={marketing} onChange={e=>setMarketing(e.target.checked)}/></label></div>}
 <div className="cookie-actions"><button className="cookie-secondary" onClick={()=>settings?save(false,false):setSettings(true)}>{settings?"Reject optional":"Customize"} <Settings2 size={15}/></button>{!settings&&<button className="cookie-secondary" onClick={()=>save(false,false)}>Reject optional</button>}<button className="cookie-primary" onClick={()=>save(settings?analytics:true,settings?marketing:true)}>{settings?"Save preferences":"Accept all"}</button></div><span className="cookie-footnote">Change your choice anytime using Cookie settings in the footer.</span></section></div>;
}
export function CookieSettingsButton(){return <button type="button" className="cookie-settings-link" onClick={()=>window.dispatchEvent(new Event("axn:cookie-settings"))}>Cookie settings</button>}
