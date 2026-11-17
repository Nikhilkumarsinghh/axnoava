// EDIT THIS FILE with verified facts only. Empty lists show an honest empty state or hide the section.
export const site = {
  email: "", phone: "", address: "Serving clients across India",
  founder: { name: "Nikhil Kumar", title: "Founder", photo: "" as string, note: "Founder of AXNOVATECH, focused on building a practical technology company that helps businesses move from manual processes to dependable digital systems. The company is being developed around clear communication, honest scope and accountable delivery." },
  stats: [{ v: "01", l: "clear point of contact" }, { v: "02", l: "transparent project stages" }, { v: "03", l: "documented handover" }],
  clients: [] as string[],
  // Add ONLY real, permitted client reviews here: { name, role, company, text, rating (1-5) }
  reviews: [] as { name: string; role: string; company: string; text: string; rating: number }[],
  caseStudies: [
    { client: "UniqueToo", industry: "Workforce & education", title: "UniqueToo: workforce, jobs and learning platform", challenge: "Bring campus placement, hiring for skilled and non-skilled candidates, courses and enquiries into one fast, searchable website.", built: ["Jobs and campus placement sections", "Academy and learning pages", "Blog and project showcase", "Enquiry forms that email the team directly", "SEO-ready pages and smooth page transitions"], result: "Live at uniquetoo.in as a single platform for hiring, placement and learning.", stack: ["Next.js", "React", "Node.js", "SEO"], href: "https://uniquetoo.in" },
    { client: "AXNOVATECH", industry: "In-house platform", title: "AXNOVATECH: company website and service platform", challenge: "Create a clear digital presence for business software, custom development and technology partnerships.", built: ["Service and industry information architecture", "Responsive company website", "Project enquiry and review submission workflows", "SEO metadata, sitemap and structured data foundation"], result: "In-house platform under active development. Public claims, pricing and capabilities are published only after verification.", stack: ["Next.js", "TypeScript", "React", "Node.js"], href: "/" },
  ] as { client: string; industry: string; title: string; challenge: string; result: string; href: string; built?: string[]; stack?: string[] }[],
  // Pricing is intentionally quote-based until AXNOVATECH validates and approves a public rate card.
  pricing: [
    { name: "Business website", from: "Custom quote", time: "Confirmed after discovery", items: ["Up to 8 custom-designed pages", "Mobile-first, fast and SEO-ready", "Enquiry forms with email delivery", "Support window documented in proposal"] },
    { name: "Web app / SaaS MVP", from: "Custom quote", time: "Confirmed after discovery", items: ["Discovery, UX and architecture", "Login, dashboards, payments", "Admin panel and analytics", "Cloud deployment and handover"] },
    { name: "Mobile app", from: "Custom quote", time: "Confirmed after discovery", items: ["Android and iOS from one codebase", "Push notifications and APIs", "Store submission support", "Crash and usage monitoring"] },
    { name: "AI & automation", from: "Custom quote", time: "Confirmed after discovery", items: ["AI assistants and chatbots", "Document and workflow automation", "Integration with your tools", "Usage and cost controls"] },
    { name: "Cloud & DevOps", from: "Custom quote", time: "Confirmed after discovery", items: ["Hosting and CI/CD pipelines", "Backups and monitoring", "Cost optimisation", "Runbooks for your team"] },
    { name: "Cybersecurity review", from: "Custom quote", time: "Confirmed after discovery", items: ["Application security review", "OWASP-based testing", "Prioritised fix report", "Re-test after fixes"] },
    { name: "UI/UX design", from: "Custom quote", time: "Confirmed after discovery", items: ["User research and flows", "High-fidelity Figma screens", "Design system", "Developer-ready handover"] },
  ],
  process: [
    ["Discover", "Initial stage", "We learn your goals, users, existing tools and constraints.", "A written brief and success measures"],
    ["Plan & quote", "After discovery", "We turn the brief into scope, timeline, delivery approach and a written proposal.", "Proposal with scope, price, risks"],
    ["Design", "As scoped", "User flows and interface direction are reviewed before implementation.", "Approved design direction and files, where included"],
    ["Build", "Agreed milestones", "Implementation follows the approved scope, architecture and milestone plan.", "Working increments and progress updates as agreed"],
    ["Test & secure", "Before every release", "Functional, performance and security checks on real devices.", "Test and security report"],
    ["Launch & support", "Go-live and after", "Deployment, training and handover are completed according to the agreement.", "Release notes, agreed documentation and support options"],
  ] as string[][],
};

// Publish team profiles only after names, roles and consent are confirmed.
export const team: { name: string; role: string; bio: string; photo: string }[] = [];
export const office = { name: "AXNOVATECH", address: "Serving clients across India", hours: "Meetings by appointment", mapQuery: "" };
