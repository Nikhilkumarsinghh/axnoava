import type { Metadata } from "next";
import { Banner } from "@/components/banner";
import { ReviewForm } from "@/components/review-form";
export const metadata: Metadata = { title: "Leave a review", description: "Worked with AXNOVATECH? Share your experience.", alternates: { canonical: "/review" } };
export default function Review() { return <div className="m-page"><section className="m-phero m-phero-ph"><Banner slot="sec-contact" fallback="sec-services" /><div className="container-x"><p className="m-kicker m-amber">YOUR FEEDBACK</p><h1>Worked with us? Tell us how it went.</h1><p>Your review is sent to our founder. With your permission it appears on this website.</p></div></section><section className="m-sec container-x" style={{ maxWidth: 760 }}><ReviewForm /></section></div>; }
