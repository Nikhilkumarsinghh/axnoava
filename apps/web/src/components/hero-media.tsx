import { photo, video } from "@/lib/photos";

function Art({ label }: { label: string }) {
  return <div className="axn-media-empty" aria-hidden="true"><i /><i /><i /><span>{label}</span></div>;
}

export function HeroMedia() {
  const team = photo("hero-team");
  const code = photo("hero-code");
  const server = photo("hero-server");
  const retail = photo("hero-retail");
  const intro = video("intro");

  return (
    <div className="axn-hero-media" aria-label="Real-world technology and business imagery">
      <div className="axn-media-main">
        {intro ? (
          <video className="axn-main-video" src={intro} poster={team || undefined} autoPlay muted loop playsInline preload="metadata" />
        ) : team ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={team} alt="Technology team collaborating around a business application" fetchPriority="high" decoding="async" />
        ) : (
          <Art label="Engineering in action" />
        )}
        <div className="axn-media-shade" />
        <div className="axn-media-main-label"><span className="live-dot" /> REAL-WORLD ENGINEERING</div>
        <div className="axn-media-main-caption">
          <small>FROM DISCOVERY TO DELIVERY</small>
          <strong>Ideas into systems<br />that move business forward.</strong>
        </div>
      </div>
      <div className="axn-media-stack">
        <figure className="axn-media-card axn-code-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {code ? <img src={code} alt="Developer working on software code" loading="lazy" decoding="async" /> : <Art label="Software" />}
          <figcaption><span>01</span><b>Software engineering</b></figcaption>
        </figure>
        <figure className="axn-media-card axn-server-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {server ? <img src={server} alt="Server and digital infrastructure equipment" loading="lazy" decoding="async" /> : <Art label="Cloud" />}
          <figcaption><span>02</span><b>Cloud & infrastructure</b></figcaption>
        </figure>
        <figure className="axn-media-card axn-retail-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {retail ? <img src={retail} alt="Retail business operations" loading="lazy" decoding="async" /> : <Art label="Business" />}
          <figcaption><span>03</span><b>Business systems</b></figcaption>
        </figure>
      </div>
      <div className="axn-media-footnote"><span>AXNOVATECH</span><i /> SOFTWARE · AUTOMATION · CLOUD</div>
    </div>
  );
}
