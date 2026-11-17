import type { Metadata } from "next";
import { OpsDashboard } from "@/components/ops-dashboard";
export const metadata: Metadata = { title: "Operations Workspace", robots: { index: false, follow: false } };
export default function OpsPage() { return <OpsDashboard />; }
