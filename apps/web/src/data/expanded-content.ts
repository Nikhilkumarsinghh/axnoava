import type { Entry } from "@/data/catalog";

export type DetailContent = {
  eyebrow: string;
  intro: string;
  outcomes: string[];
  capabilities: { title: string; body: string }[];
  delivery: { title: string; body: string }[];
  deliverables: string[];
  faqs: { q: string; a: string }[];
};


const serviceSpecific: Record<string,{features:[string,string][];deliverables:string[]}> = {
 "application-development":{features:[["Product discovery & architecture","Translate business requirements into user stories, system boundaries, data models and a delivery roadmap."],["Web application engineering","Build responsive interfaces, secure APIs, business rules and role-based workflows."],["Integration & automation","Connect existing tools, databases and external services through documented interfaces."],["Testing & release engineering","Validate core journeys, error handling, performance and deployment readiness."]],deliverables:["Product requirements and user stories","Architecture and API documentation","Application source code under agreed IP terms","Test report and release checklist","Deployment and handover guide"]},
 "web-development":{features:[["Corporate & service websites","Build fast, responsive pages with clear information architecture, accessible components and conversion-focused journeys."],["Web applications & portals","Create account-based workflows, dashboards, forms and role-based access."],["Content management & SEO","Plan metadata, structured content, redirects, sitemap and editable page structures."],["Performance & accessibility","Optimise images, fonts, caching, keyboard navigation and Core Web Vitals."]],deliverables:["Page architecture and content plan","Responsive UI implementation","CMS or content workflow where scoped","SEO and accessibility checklist","Deployment and analytics handover"]},
 "mobile-app-development":{features:[["Mobile product strategy","Define the user journey, supported devices, offline needs, notifications and app-store constraints."],["Cross-platform application","Build shared iOS and Android experiences with secure API integration."],["Device capabilities","Integrate camera, location, push notifications and device permissions where required."],["Release & lifecycle","Prepare store assets, test builds, crash reporting and version update workflows."]],deliverables:["Mobile app requirements and screen flows","iOS and Android application build","API integration and test notes","Store release support as agreed","Maintenance and upgrade plan"]},
 "enterprise-software":{features:[["Process and system mapping","Map business units, roles, approvals, master data and system dependencies."],["Role-based business applications","Build internal tools, dashboards, portals and workflow systems with permission boundaries."],["Enterprise integration","Connect CRM, ERP, finance, HR, inventory and reporting systems where interfaces are available."],["Governance and handover","Document architecture, environments, release controls, audit needs and ownership."]],deliverables:["Business process and requirement map","Solution architecture and data model","Role-based application modules","Integration and test documentation","Operations and knowledge-transfer pack"]},
 "ai-machine-learning":{features:[["AI use-case assessment","Prioritise workflows by business value, data readiness, risk and measurable success."],["Data preparation & evaluation","Review data quality, define test sets and measure accuracy, latency and failure cases."],["Model and workflow integration","Integrate suitable models into approved business workflows with access boundaries."],["Human oversight & monitoring","Add review steps, fallback paths, usage limits and ongoing quality evaluation."]],deliverables:["AI use-case and risk assessment","Data and evaluation plan","Prototype or integrated AI workflow","Human review and fallback design","Usage, cost and quality monitoring plan"]},
 "generative-ai":{features:[["Knowledge assistant design","Build retrieval workflows over approved business documents and content."],["Prompt and tool orchestration","Connect model prompts with approved tools, APIs and structured actions."],["Guardrails & evaluation","Test answer quality, source grounding, privacy, prompt injection and unsafe outputs."],["Enterprise deployment","Plan authentication, access permissions, logging, usage budgets and escalation."]],deliverables:["Generative AI solution brief","Knowledge sources and permission plan","Assistant or copilot prototype","Evaluation and guardrail report","Operations and usage-cost guide"]},
 "cloud-computing":{features:[["Cloud architecture","Select services and network boundaries based on workload, availability and operating cost."],["Infrastructure provisioning","Create repeatable environments, identity controls, secrets handling and backups."],["Reliability & observability","Set up metrics, logs, alerts, health checks and recovery procedures."],["Cost and operations","Review resource usage, scaling policies, ownership and monthly operating cost."]],deliverables:["Cloud architecture diagram","Environment and access configuration","Infrastructure-as-code where scoped","Monitoring and backup setup","Runbook and cost handover"]},
 "cloud-migration":{features:[["Workload assessment","Inventory applications, data, dependencies, licensing and migration constraints."],["Migration strategy","Choose rehost, replatform, refactor or retire for each workload."],["Data transfer & validation","Plan secure transfer, consistency checks, cutover and rollback."],["Post-migration optimisation","Review performance, security, reliability and cloud spend after transition."]],deliverables:["Application and dependency inventory","Migration plan and risk register","Data migration and validation plan","Cutover and rollback checklist","Post-migration review"]},
 "devops-engineering":{features:[["CI/CD automation","Automate build, test, security checks and deployment workflows."],["Infrastructure as code","Version infrastructure configuration and create repeatable environments."],["Observability & incident readiness","Configure logs, metrics, alerts, runbooks and service health dashboards."],["Developer experience","Improve environment setup, release consistency and deployment feedback."]],deliverables:["CI/CD pipeline configuration","Infrastructure automation","Monitoring and alert rules","Deployment and rollback guide","Operational runbooks"]},
 "cybersecurity":{features:[["Application threat review","Identify trust boundaries, attack surfaces, sensitive data and likely abuse cases."],["Security testing","Review authentication, authorisation, input validation, dependencies and exposed interfaces."],["Prioritised remediation","Explain findings by severity, impact, evidence and practical remediation steps."],["Retest & secure delivery","Verify fixes and agree ongoing security ownership and monitoring."]],deliverables:["Agreed test scope and rules of engagement","Prioritised security findings report","Remediation guidance","Retest summary where included","Security improvement roadmap"]},
 "data-engineering":{features:[["Data source integration","Connect operational systems, APIs, files and databases with clear ownership."],["Pipeline engineering","Build reliable batch or event-driven ingestion, transformation and validation."],["Data quality & governance","Add schema checks, lineage, access control, retention and error handling."],["Platform operations","Monitor freshness, failures, costs and recovery of data workflows."]],deliverables:["Data source and lineage map","Pipeline architecture","Ingestion and transformation workflows","Data quality checks","Monitoring and support notes"]},
 "data-analytics":{features:[["Business question framing","Translate management questions into metrics, dimensions and decision needs."],["Data modelling","Prepare clean, consistent datasets and documented metric definitions."],["Dashboard development","Create interactive reporting for trends, segments and operational performance."],["Adoption & insight reviews","Help teams interpret the data and refine dashboards based on usage."]],deliverables:["Analytics requirements and KPI definitions","Prepared reporting dataset","Interactive dashboards","Metric dictionary and user guide","Data refresh and ownership notes"]},
 "business-intelligence":{features:[["KPI and reporting design","Agree definitions, targets, filters and reporting cadence with business owners."],["Data consolidation","Bring approved sources into a consistent reporting layer."],["Executive and operational dashboards","Build role-appropriate views for leadership and teams."],["Governance and access","Define row-level permissions, refresh schedules and report ownership."]],deliverables:["KPI catalogue and data map","Dashboard wireframes","Published reports and dashboards","Access and refresh configuration","Reporting handover guide"]},
 "ui-ux-design":{features:[["User research","Understand user goals, context, accessibility needs and existing friction."],["Information architecture","Organise navigation, content, tasks and product structure."],["Interaction and visual design","Create wireframes, high-fidelity interfaces and reusable design patterns."],["Prototype & validation","Test key flows and refine design before engineering handoff."]],deliverables:["Research findings and user personas where scoped","User journeys and wireframes","High-fidelity UI designs","Interactive prototype","Design system and developer handover"]},
 "digital-transformation":{features:[["Current-state assessment","Review business processes, systems, data, people and change readiness."],["Digital roadmap","Prioritise initiatives by value, effort, dependencies and risk."],["Modernisation & integration","Improve applications, workflows, data flows and customer experiences."],["Adoption & measurement","Define owners, rollout plans, training and business outcome metrics."]],deliverables:["Current-state assessment","Prioritised transformation roadmap","Target-state architecture","Pilot or implementation plan","Change and measurement framework"]},
 "it-consulting":{features:[["Technology assessment","Review architecture, vendors, operating costs, security and technical debt."],["Options analysis","Compare build, buy, integrate and modernise options against constraints."],["Architecture & vendor guidance","Define target architecture, integration approach and evaluation criteria."],["Execution governance","Support milestones, technical decisions, risks and delivery reviews."]],deliverables:["Technology assessment report","Options and trade-off analysis","Target architecture and roadmap","Vendor or platform evaluation criteria","Implementation governance plan"]},
 "erp-solutions":{features:[["Process and module mapping","Map finance, procurement, inventory, HR, production and approval workflows."],["Master data and permissions","Define entities, roles, data migration and validation responsibilities."],["Integration and reporting","Connect relevant systems and create operational reporting."],["Rollout and adoption","Plan pilot groups, training, cutover, support and change control."]],deliverables:["ERP process map and scope","Module configuration or customisation plan","Data migration and integration plan","User acceptance test scenarios","Rollout and training pack"]},
 "crm-development":{features:[["Lead and account management","Capture enquiries, contacts, organisations, opportunities and ownership."],["Sales pipeline & follow-up","Manage stages, reminders, activities, quotations and next actions."],["Customer service workflows","Track requests, communication history, service levels and escalations."],["Reporting & integrations","Connect web forms, email, telephony or other systems where supported."]],deliverables:["CRM workflow and data model","Lead and customer modules","Pipeline and activity views","Reporting and integration setup","User roles and training guide"]},
 "api-integration":{features:[["Integration discovery","Review APIs, authentication, rate limits, data contracts and vendor terms."],["API and middleware design","Define endpoints, schemas, validation, retries and idempotency."],["Secure data exchange","Protect secrets, apply least privilege and log integration events."],["Monitoring and recovery","Handle failures, alert owners and document reconciliation procedures."]],deliverables:["Integration architecture and API map","Documented data contracts","Integration implementation","Error handling and monitoring","Support and reconciliation runbook"]},
 "quality-engineering":{features:[["Quality strategy","Define risk-based test coverage, environments and acceptance criteria."],["Functional and integration testing","Validate user journeys, permissions, APIs and error handling."],["Automation engineering","Automate stable regression paths and connect checks to CI/CD."],["Release quality reporting","Summarise defects, coverage, residual risks and go-live readiness."]],deliverables:["Quality strategy and test plan","Test scenarios and evidence","Automated regression suite where scoped","Defect and risk report","Release readiness recommendation"]}
};

const serviceFAQs = (name: string) => [
  { q: `What is included in ${name}?`, a: `The scope is agreed after discovery. It can include requirements, solution design, implementation, testing, deployment and documentation according to the proposal.` },
  { q: `How do you estimate the cost?`, a: "We review the users, features, integrations, data, security requirements and delivery constraints before preparing a written estimate. There is no assumed fixed price for every business." },
  { q: "Can you work with our existing systems?", a: "Yes, subject to a technical review of the existing application, APIs, data quality, access controls and vendor constraints. Dependencies are documented before implementation." },
  { q: "Who owns the code and data?", a: "Ownership, licences, access, data handling and handover responsibilities are written into the project agreement. We do not rely on verbal assumptions." },
];


const businessSpecific: Record<string,[string,string][]> = {
 "retail-pos-billing":[["Product & barcode catalogue","Maintain products, categories, variants, barcode identifiers, price lists and tax settings."],["Fast counter billing","Create invoices, apply discounts, record payment methods, print or share receipts and handle returns."],["Daily cash & sales view","Review counter totals, payment modes, discounts, refunds and end-of-day summaries."],["GST and accounting handoff","Prepare invoice and transaction exports for the accounting workflow, with tax treatment validated by the business."]],
 "inventory-stock-control":[["Stock ledger","Track opening stock, purchases, sales, returns, transfers and adjustments with a traceable movement history."],["Supplier & purchase workflow","Record vendors, purchase orders, goods received, supplier pricing and outstanding actions."],["Reorder & low-stock alerts","Set thresholds, identify fast-moving items and prepare replenishment lists."],["Multi-location inventory","View stock by branch or warehouse and control transfers between locations."]],
 "ecommerce-storefront":[["Product catalogue & search","Organise categories, product details, images, variants, pricing and searchable collections."],["Cart, checkout & payment","Build a clear checkout journey with supported payment-provider integration and server-side verification."],["Order & fulfilment management","Track order status, shipping details, cancellations, returns and customer notifications."],["Customer & sales analytics","Review conversion, order value, repeat customers and product performance."]],
 "restaurant-ordering-operations":[["Digital menu & QR ordering","Publish menus, modifiers, availability and table-linked ordering journeys."],["Kitchen order workflow","Route tickets to preparation stations and track accepted, preparing, ready and served states."],["Table, takeaway & delivery","Coordinate order types, table status, pickup and delivery handoffs."],["Sales & menu performance","Review item sales, peak periods, cancellations and operational patterns."]],
 "appointment-booking-system":[["Service & availability setup","Define services, durations, staff, working hours, breaks and bookable resources."],["Customer self-booking","Let customers select a service, choose a slot and receive confirmation."],["Reminders & rescheduling","Send approved reminders and provide controlled cancellation or rescheduling flows."],["Schedule & utilisation view","Give staff a shared calendar and visibility into capacity and no-shows."]],
 "small-business-crm":[["Lead capture","Collect enquiries from website forms, campaigns and approved communication channels."],["Pipeline & follow-up","Assign owners, manage stages, set reminders and track next actions."],["Customer history","Keep contact details, notes, conversations, quotations and service history together."],["Sales reporting","Review lead sources, conversion stages, ageing opportunities and team activity."]],
 "accounting-invoice-workflow":[["Quotation to invoice","Create quotes, convert approved work into invoices and track payment status."],["Expense & document records","Attach receipts, supplier documents and supporting files with appropriate access."],["Payment reconciliation","Match incoming payment references with invoice records and flag exceptions."],["Accounting export","Prepare structured exports for the accounting software or finance professional selected by the business."]],
 "clinic-practice-management":[["Appointment desk","Manage provider schedules, appointment requests, cancellations and reminders."],["Patient administration","Maintain only the records and information necessary for the agreed administrative workflow."],["Staff & room scheduling","Coordinate availability, service rooms and daily clinic capacity."],["Privacy & access","Define role-based access, audit needs, retention and secure handling of sensitive information."]],
 "school-coaching-management":[["Enquiry & admission pipeline","Capture prospective student details, follow-ups, applications and admission decisions."],["Batch & timetable management","Organise courses, batches, teachers, schedules and attendance."],["Fees & reminders","Track fee plans, payment status, receipts and due reminders."],["Student and parent communication","Share approved notices, progress updates, documents and course information."]],
 "hotel-property-operations":[["Property and unit inventory","Maintain rooms or units, availability, rates, amenities and booking restrictions."],["Reservation workflow","Capture enquiries, bookings, changes, check-in and check-out status."],["Guest and service requests","Coordinate guest details, housekeeping or maintenance requests and follow-ups."],["Occupancy and revenue reporting","Review occupancy, booking sources, cancellations and operating indicators."]],
 "salon-fitness-management":[["Services, packages & memberships","Configure service menus, session packs, memberships and renewal rules."],["Staff and trainer schedules","Manage staff availability, appointments, classes and capacity."],["Customer profile & history","Track preferences, visits, membership status and follow-up reminders."],["Retention and performance","Review renewals, attendance, repeat visits and service utilisation."]],
 "wholesale-distributor-portal":[["B2B catalogue & customer pricing","Show approved product ranges, bulk quantities and customer-specific price rules."],["Order capture & approvals","Accept repeat orders, validate credit or quantity rules and route exceptions."],["Warehouse & dispatch","Track picking, packing, stock allocation and delivery status."],["Account and sales visibility","Give customers and internal teams clear order, invoice and account information."]],
 "field-service-management":[["Job intake & triage","Capture service requests, issue type, priority, location and customer context."],["Technician scheduling","Assign work based on availability, location, skills and service windows."],["Mobile work updates","Capture checklists, notes, photos, parts used and customer sign-off."],["Service history & SLA reporting","Track response, completion, repeat visits and outstanding jobs."]],
 "fleet-delivery-tracking":[["Fleet and driver records","Maintain vehicles, drivers, documents, capacity and availability."],["Dispatch & route planning","Assign consignments, stops, routes and delivery windows."],["Live status & proof of delivery","Record dispatch, in-transit, delivered and exception states with supporting evidence."],["Fleet performance","Review utilisation, delays, delivery success and operational exceptions."]],
 "hr-employee-self-service":[["Employee profile & onboarding","Manage approved employee information, joining tasks and policy acknowledgements."],["Leave and attendance requests","Submit requests, route approvals and provide a clear status history."],["Internal notices & documents","Share policy documents, payslip access links or announcements according to access rules."],["HR administration dashboard","Track pending tasks, employee changes and recurring administrative workflows."]],
 "document-approval-automation":[["Document intake","Collect files through controlled forms, upload rules and required metadata."],["Review and approval routing","Send tasks to the right reviewer based on document type, amount or business unit."],["Version and audit history","Track who submitted, reviewed, changed or approved each item."],["Notifications and reporting","Show pending approvals, ageing items, exceptions and completion status."]],
 "whatsapp-business-automation":[["Opt-in enquiry capture","Connect approved business messaging entry points and record customer consent where required."],["Template and notification workflows","Send approved reminders, order updates and service notifications through supported provider APIs."],["Human handoff","Route complex requests to a person and retain the conversation context."],["Message analytics & controls","Monitor delivery, opt-outs, response rates, templates and provider policy compliance."]],
 "multi-branch-dashboard":[["Branch-level data model","Define locations, teams, permissions and consistent operational metrics."],["Consolidated performance","Compare sales, service, inventory or workload across branches."],["Exception alerts","Highlight unusual changes, low stock, overdue actions or operational blockers."],["Drill-down reporting","Move from company-wide summaries to branch, date and category detail."]],
 "loyalty-customer-engagement":[["Customer membership","Manage customer profiles, consent, membership levels and loyalty identifiers."],["Points, rewards & offers","Define earn and redeem rules, expiry, offer eligibility and transaction adjustments."],["Campaign segments","Group customers using approved purchase, visit or preference signals."],["Feedback & retention","Collect feedback and measure repeat visits, redemptions and campaign response."]],
 "custom-business-software":[["Workflow discovery","Map the specific process, users, exceptions and information that existing tools do not handle well."],["Tailored user experience","Design screens and task flows around staff and customer needs."],["Custom data & integration","Model the required records and connect approved external systems."],["Governed rollout","Pilot with representative users, validate adoption and agree support ownership."]]
};

const businessOutcomes = [
  "Reduce repetitive manual work and avoid duplicate data entry.",
  "Give owners and managers a clearer view of daily operations.",
  "Make customer interactions more consistent across channels.",
  "Create a foundation that can grow as the business adds people or locations.",
];

export function getDetailContent(section: string, entry: Entry): DetailContent {
  const name = entry.title;
  const slug = entry.slug;
  if (section === "services") {
    const specific = serviceSpecific[slug];
    const focus = /AI|machine|intelligence|automation|analytics|data/i.test(name)
      ? "data quality, safe automation, evaluation and human oversight"
      : /cloud|DevOps|migration|infrastructure/i.test(name)
      ? "architecture, resilience, access, deployment automation and operating cost"
      : /security|cyber/i.test(name)
      ? "asset scope, threat context, access control, secure defaults and remediation"
      : /design|UX/i.test(name)
      ? "user research, journeys, information architecture, accessibility and design systems"
      : /mobile/i.test(name)
      ? "device coverage, app journeys, APIs, release readiness and ongoing maintenance"
      : "business workflows, user experience, architecture, integrations and maintainability";
    return {
      eyebrow: "TECHNOLOGY SERVICE",
      intro: `${entry.description} Our ${name.toLowerCase()} engagements begin with the operating context: who uses the system, what must improve, which platforms are already in place and what constraints matter. We then agree a practical scope and delivery plan.`,
      outcomes: [
        "A shared understanding of the business problem and success measures.",
        "A solution architecture matched to the current environment and future needs.",
        "A tested implementation with agreed acceptance criteria.",
        "A documented handover and a clear path for ongoing support."
      ],
      capabilities: specific ? specific.features.map(([title,body])=>({title,body})) : [
        { title: "Discovery & assessment", body: `Review users, workflows, existing technology and dependencies. For this capability, we pay particular attention to ${focus}.` },
        { title: "Solution architecture", body: "Define the components, data flows, interfaces, permissions and integration points. Record assumptions and design decisions before build." },
        { title: "Experience & implementation", body: "Create the agreed user experience and engineer the solution in reviewable increments. Keep the codebase understandable and maintainable." },
        { title: "Quality & release", body: "Test the agreed user journeys, error cases, supported devices and operational requirements. Resolve release blockers before production handover." },
        { title: "Operate & improve", body: "Document deployment, access, monitoring and support responsibilities. Prioritise improvements using feedback and observed usage." },
        { title: "Integration & governance", body: "Plan API contracts, data ownership, security boundaries, change control and third-party dependencies as part of the delivery." }
      ],
      delivery: [
        { title: "01 / Discover", body: "Stakeholder discussion, current-state review, user needs and success criteria." },
        { title: "02 / Define", body: "Scope, exclusions, architecture, estimate, milestones and acceptance criteria." },
        { title: "03 / Design", body: "User flows, interface direction and technical decisions reviewed with you." },
        { title: "04 / Build", body: "Incremental implementation with agreed demos, reviews and change control." },
        { title: "05 / Validate", body: "Functional, integration, responsive and risk-based quality checks." },
        { title: "06 / Launch", body: "Deployment, documentation, handover and optional support plan." }
      ],
      deliverables: specific?.deliverables || [
        "Requirements brief and agreed scope",
        "Solution design and architecture notes",
        "Working software or configured capability",
        "Test results against agreed acceptance criteria",
        "Deployment and handover documentation",
        "Support options and improvement backlog"
      ],
      faqs: serviceFAQs(name)
    };
  }

  if (section === "businessSolutions") {
    return {
      eyebrow: "SMALL & GROWING BUSINESS SOLUTION",
      intro: `${entry.description} The goal is not to add software for its own sake. We first understand how your business currently handles customers, staff, orders, money and information, then choose the smallest useful system that improves the workflow.`,
      outcomes: businessOutcomes,
      capabilities: (businessSpecific[slug] || [
        ["Understand your day-to-day work","Map how enquiries arrive, how staff complete tasks, where records are kept and which steps cause delays or mistakes."],
        ["Choose the right modules","Select only the workflows you need now. Keep optional features separate so the first release remains affordable and easier to adopt."],
        ["Connect your tools","Where supported, connect payment providers, messaging, accounting, inventory, delivery or existing business systems through documented integrations."],
        ["Make it easy for staff","Design simple screens, clear permissions, useful reports and practical training so that the system fits the people using it."],
        ["Launch and support","Plan data import, backups, staff onboarding, issue reporting and the support arrangement before going live."],
        ["Measure improvement","Review adoption, time saved, errors, customer response and operational visibility. Decide what to improve next using real feedback."]
      ]).map(([title,body])=>({title,body})),
      delivery: [
        { title: "Business walkthrough", body: "Understand the business model, team, locations, customer journey and current tools." },
        { title: "Workflow map", body: "Identify the key tasks, exceptions, reports and information that need to be managed." },
        { title: "Module plan", body: "Prioritise launch essentials, integrations, data migration and training." },
        { title: "Build & configure", body: "Create the agreed screens, roles, automations and reports." },
        { title: "Pilot & train", body: "Test with real staff and sample workflows before wider rollout." },
        { title: "Go live & improve", body: "Launch with handover, backups and an agreed support path." }
      ],
      deliverables: [
        "Business workflow and requirements map",
        "Module and feature plan",
        "Configured or custom-built business system",
        "User roles and staff onboarding guide",
        "Data import and launch checklist",
        "Support and future improvement plan"
      ],
      faqs: [
        { q: "Is this suitable for a small shop or a single-location business?", a: "Yes. The solution can be scoped for one location and kept deliberately simple. We will not recommend enterprise complexity if a smaller workflow is enough." },
        { q: "Can I start with one module and add more later?", a: "Yes. We can prioritise the most useful workflow first and document how additional modules or integrations could be added later." },
        { q: "Can you migrate my existing Excel data?", a: "We can assess spreadsheets and exports for structure, duplicates, missing fields and data quality. The migration scope and validation steps are agreed before import." },
        { q: "Will staff need training?", a: "Training and quick-reference guidance can be included. The format depends on the number of users, locations and complexity of the workflow." }
      ]
    };
  }

  if (section === "solutions") {
    return {
      eyebrow: "DIGITAL SOLUTION",
      intro: `${entry.description} We treat this as a business capability, not a standalone feature list. The design connects users, information, workflow rules, integrations and operational ownership into one solution.`,
      outcomes: ["A clearer journey for customers, employees or partners.", "Fewer disconnected steps between systems and teams.", "More consistent information, permissions and reporting.", "A solution that can be measured, maintained and improved."],
      capabilities: [
        { title: "Experience design", body: "Map user roles, journeys, tasks and accessibility needs. Keep the most important actions clear and easy to complete." },
        { title: "Workflow orchestration", body: "Define states, approvals, notifications, exception paths and the people responsible for each action." },
        { title: "Data architecture", body: "Plan information models, validation, retention, audit history and data ownership." },
        { title: "System integration", body: "Connect required APIs and existing tools with documented contracts, retries and error handling." },
        { title: "Administration & reporting", body: "Provide role-based administration, useful operational dashboards and transparent system configuration." },
        { title: "Security & operations", body: "Plan authentication, authorisation, secrets, backups, monitoring and incident responsibilities." }
      ],
      delivery: [
        { title: "Problem framing", body: "Agree the business outcome, user groups, current process and measurable success criteria." },
        { title: "Solution blueprint", body: "Define architecture, user journeys, data flows, integration points and delivery phases." },
        { title: "Prototype", body: "Validate critical journeys and assumptions with representative users before full implementation." },
        { title: "Build & integrate", body: "Develop the agreed components and connect required systems in reviewable increments." },
        { title: "Test & launch", body: "Validate workflows, access, error cases and operational readiness before release." },
        { title: "Improve", body: "Review adoption, service quality and user feedback to prioritise the next improvements." }
      ],
      deliverables: ["Solution brief and success measures", "User journeys and workflow model", "Technical architecture and integration plan", "Working solution and administration tools", "Test and launch readiness notes", "Handover and operating guide"],
      faqs: serviceFAQs(name)
    };
  }

  if (section === "careers") {
    return {
      eyebrow: "CAREER ROLE FAMILY",
      intro: `${entry.description} This page describes a professional discipline that may contribute to AXNOVATECH projects as the company grows. It is a role-family overview, not an active vacancy unless a specific opening is separately published.`,
      outcomes: ["Understand the typical responsibilities in this discipline.", "See how the role collaborates with product, engineering and delivery teams.", "Know which skills and working practices are relevant.", "Register interest through the official company contact channel."],
      capabilities: [
        { title: "Core responsibilities", body: `Contribute specialist work in ${name.toLowerCase()} according to the agreed project scope, standards and delivery plan.` },
        { title: "Cross-functional collaboration", body: "Work with product owners, designers, developers, QA and client stakeholders to clarify requirements and resolve dependencies." },
        { title: "Quality and documentation", body: "Follow review practices, document important decisions and make work understandable for the next person." },
        { title: "Learning and improvement", body: "Keep skills current, share knowledge and improve repeatable engineering practices." },
        { title: "Client and team communication", body: "Communicate progress, risks, blockers and estimates clearly and early." },
        { title: "Responsible delivery", body: "Respect privacy, confidentiality, security requirements and agreed ownership of project information." }
      ],
      delivery: [
        { title: "Role requirement", body: "A specific opening is published only when the role, location, engagement type and compensation range are approved." },
        { title: "Application", body: "Candidates share a resume, portfolio or work examples through a verified company channel." },
        { title: "Conversation", body: "The team discusses relevant experience, working approach and role expectations." },
        { title: "Practical evaluation", body: "Where applicable, an evaluation is relevant to the role and its expectations." },
        { title: "Offer & agreement", body: "Terms are shared in writing and reviewed before any work begins." },
        { title: "Onboarding", body: "Responsibilities, access, confidentiality and team processes are explained at onboarding." }
      ],
      deliverables: ["A clear role description when hiring is active", "Named hiring contact and interview stages", "Written compensation and engagement terms", "Role-specific onboarding plan", "Confidentiality and access expectations", "Feedback on the application process"],
      faqs: [
        { q: "Is this role currently open?", a: "This page describes a role family, not an active job opening. Only a vacancy explicitly marked as open on the Careers page should be treated as active." },
        { q: "Do candidates have to pay any fee?", a: "No. AXNOVATECH does not ask candidates to pay recruitment or interview fees. Never share banking passwords, OTPs or card details." },
        { q: "Can I apply for future opportunities?", a: "Yes. Use the contact page and choose Careers. Include your preferred role, location, availability and relevant portfolio or work samples." },
        { q: "Can I work remotely or as a contractor?", a: "Engagement type, location, availability and working arrangements depend on the specific approved role and will be shared in writing." }
      ]
    };
  }

  if (section === "insights") {
    return {
      eyebrow: "ENGINEERING INSIGHT",
      intro: `${entry.description} This guide is designed to help business and technology teams frame the question, compare options and understand the practical trade-offs before committing to a build or platform decision.`,
      outcomes: ["Clarify the decision or problem before selecting a tool.", "Understand the people, process, data and technology involved.", "Identify cost, security, adoption and maintenance considerations.", "Define a small next step that can be tested and measured."],
      capabilities: [
        { title: "Frame the question", body: "Write down the business outcome, users, constraints and current evidence. Separate assumptions from facts that need validation." },
        { title: "Map the current state", body: "Understand the existing process, applications, data sources, handoffs and operational responsibilities." },
        { title: "Compare options", body: "Evaluate build, buy, integrate or improve choices using total cost, time, risk, flexibility and ownership." },
        { title: "Plan for quality", body: "Define acceptance criteria, privacy, security, accessibility, reliability and support expectations." },
        { title: "Pilot and measure", body: "Test the highest-risk assumption with a focused pilot and agree how the result will be measured." },
        { title: "Learn and improve", body: "Review outcomes, gather feedback and decide what to change, scale or stop." }
      ],
      delivery: [
        { title: "Question", body: "Define the decision, business context and people affected." },
        { title: "Evidence", body: "Gather current process information, user feedback and technical constraints." },
        { title: "Options", body: "Compare practical approaches and explain the trade-offs." },
        { title: "Pilot", body: "Test a focused version with clear success and stop criteria." },
        { title: "Review", body: "Measure results and document what was learned." },
        { title: "Roadmap", body: "Turn the evidence into a prioritised next-step plan." }
      ],
      deliverables: ["Problem statement and decision brief", "Current-state process map", "Options and trade-off comparison", "Pilot plan and success measures", "Risk and dependency checklist", "Prioritised next-step roadmap"],
      faqs: [
        { q: "Is this advice a substitute for a technical assessment?", a: "No. It is a starting point for discussion. A specific system or security decision requires review of the actual environment and constraints." },
        { q: "Can AXNOVATECH help implement the recommendations?", a: "Implementation can be discussed after discovery and a review of delivery fit, scope and capacity." },
        { q: "How do we know whether a pilot worked?", a: "Define success measures and stop criteria before the pilot. Use user feedback and observable operational data to evaluate the result." },
        { q: "Can this be adapted to our industry?", a: "Yes. The approach should reflect your sector, users, information sensitivity and applicable obligations." }
      ]
    };
  }

  if (section === "work") {
    return {
      eyebrow: "PORTFOLIO CONCEPT / REFERENCE BLUEPRINT",
      intro: `${entry.description} This page is a concept or reference direction for discussion. It is not represented as a completed paid client project, production deployment or independently verified outcome.`,
      outcomes: ["Show how a business problem can be translated into a digital product direction.", "Make the intended users and workflow easier to understand.", "Identify key architecture, integration and security questions.", "Create a starting point for a scoped proof of concept."],
      capabilities: [
        { title: "Problem statement", body: "Define the user, context, problem and reason the concept may be useful." },
        { title: "Experience direction", body: "Describe the primary user journey, key screens and interaction model." },
        { title: "Functional scope", body: "Identify core capabilities, supporting workflows and features that should remain outside an initial pilot." },
        { title: "Technical direction", body: "Outline possible application layers, data needs and integration dependencies for validation." },
        { title: "Risk & feasibility", body: "Identify security, privacy, adoption, operating-cost and third-party dependencies." },
        { title: "Validation plan", body: "Define what a prototype or pilot should test before any production commitment." }
      ],
      delivery: [
        { title: "Explore", body: "Discuss the problem and validate whether the concept matches a real need." },
        { title: "Research", body: "Review users, existing alternatives, constraints and technical dependencies." },
        { title: "Prototype", body: "Create a focused experience or proof of concept to test assumptions." },
        { title: "Evaluate", body: "Gather feedback and review feasibility, risk and total cost of ownership." },
        { title: "Scope", body: "If validated, define the production requirements, acceptance criteria and estimate." },
        { title: "Decide", body: "Proceed, revise or stop based on evidence and stakeholder priorities." }
      ],
      deliverables: ["Concept brief and problem statement", "User journey or prototype direction", "Initial architecture and integration questions", "Risk and feasibility checklist", "Pilot success criteria", "Production scope recommendation"],
      faqs: [
        { q: "Is this a completed client project?", a: "No. This portfolio item is a concept or reference blueprint unless the page explicitly identifies a verified client delivery." },
        { q: "Can AXNOVATECH build this for my organisation?", a: "We can discuss the use case, feasibility and delivery requirements. Any commitment depends on discovery, capacity and a written proposal." },
        { q: "Can I request a demonstration?", a: "Use the contact page to describe what you want to evaluate. We will confirm whether a working demo or a scoped prototype is available." },
        { q: "Who owns the resulting product?", a: "Intellectual property, source-code ownership and third-party licences are agreed in the project contract before implementation." }
      ]
    };
  }

  if (section === "industries") {
    return {
      eyebrow: "INDUSTRY SOLUTIONS",
      intro: `${entry.description} Technology in ${name.toLowerCase()} needs to reflect sector-specific users, workflows, information sensitivity and operational constraints. We start with those realities rather than assuming that one template fits every organisation.`,
      outcomes: [
        "More consistent experiences for customers, employees, partners or citizens.",
        "Better visibility across the workflows that matter in this sector.",
        "Connected systems and information with clearer ownership.",
        "A delivery approach that accounts for sector-specific risks and dependencies."
      ],
      capabilities: [
        { title: "Customer & user journeys", body: `Understand the people interacting with ${name.toLowerCase()} services and identify the digital steps that can be simplified.` },
        { title: "Operational workflows", body: "Map handoffs, approvals, service tasks, exceptions and reporting needs across teams." },
        { title: "Data & integration", body: "Identify systems of record, integration boundaries, data quality requirements and access permissions." },
        { title: "Security & governance", body: "Review the sensitivity of information and validate applicable legal, regulatory and contractual requirements with the client." },
        { title: "Digital platforms", body: "Design web applications, portals, mobile workflows, dashboards or automation that fit the operating model." },
        { title: "Continuous improvement", body: "Measure adoption, reliability, task completion and service quality after release." }
      ],
      delivery: [
        { title: "Sector discovery", body: "Interview stakeholders and understand the service model, users and domain constraints." },
        { title: "Process mapping", body: "Document current workflows, systems, data and pain points." },
        { title: "Solution definition", body: "Prioritise capabilities, integrations, risk controls and acceptance criteria." },
        { title: "Implementation", body: "Build or configure the agreed experience and system components." },
        { title: "Validation", body: "Test realistic user journeys, permissions, data handling and exception scenarios." },
        { title: "Adoption", body: "Support rollout, training, documentation and ongoing measurement." }
      ],
      deliverables: [
        "Industry and stakeholder discovery brief",
        "Current-state workflow and system map",
        "Prioritised solution architecture",
        "Configured or custom-built digital capability",
        "Test and readiness report",
        "Rollout, training and support documentation"
      ],
      faqs: [
        { q: `Do you already have a ready-made ${name.toLowerCase()} platform?`, a: "We assess whether an existing product, integration or custom build is the best fit. We do not claim a pre-built regulated platform unless one is specifically verified." },
        { q: "How do you handle compliance requirements?", a: "The client identifies applicable obligations and stakeholders. Requirements are reviewed during discovery and mapped to the agreed scope; legal or regulatory advice is obtained from qualified specialists where required." },
        { q: "Can the solution integrate with our existing systems?", a: "Potential integrations are assessed for API availability, data ownership, security, licensing and vendor constraints before they are included in the proposal." },
        { q: "Can we begin with a pilot?", a: "A focused pilot is often a useful way to validate workflows, user adoption and integration assumptions before a broader rollout." }
      ]
    };
  }

  return {
    eyebrow: "DIGITAL BUSINESS SOLUTION",
    intro: `${entry.description} We translate the business need into a connected solution with clear users, workflows, information, integrations and ownership.`,
    outcomes: ["A simpler digital journey for the people using the service.", "Less fragmented work across tools and teams.", "More useful operational information and reporting.", "A maintainable foundation for future improvements."],
    capabilities: [
      { title: "User experience", body: "Define user groups, journeys, permissions and the key tasks the solution must support." },
      { title: "Workflow design", body: "Map the happy path, exceptions, approvals, notifications and ownership of each step." },
      { title: "Data & integration", body: "Define data sources, APIs, validation, access boundaries and audit requirements." },
      { title: "Application engineering", body: "Build the agreed interfaces and services with a maintainable architecture." },
      { title: "Testing & adoption", body: "Validate the workflows with representative users and prepare training and handover." },
      { title: "Operations", body: "Agree hosting, monitoring, backups, support and future change responsibilities." }
    ],
    delivery: [
      { title: "Understand", body: "Clarify the user, business objective and current process." },
      { title: "Architect", body: "Define components, data flows and integration approach." },
      { title: "Prototype", body: "Review important journeys and validate assumptions early." },
      { title: "Engineer", body: "Build the approved solution in milestones." },
      { title: "Verify", body: "Test functionality, access, edge cases and performance." },
      { title: "Handover", body: "Launch with documentation and agreed support." }
    ],
    deliverables: ["Discovery and solution brief", "User journeys and technical design", "Working digital solution", "Integration and test notes", "Launch and user documentation", "Support and enhancement roadmap"],
    faqs: serviceFAQs(name)
  };
}
