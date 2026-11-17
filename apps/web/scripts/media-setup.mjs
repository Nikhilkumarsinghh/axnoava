#!/usr/bin/env node
/**
 * AXNOVATECH media setup (V70)
 * Downloads real, royalty-free Pixabay photos and videos into apps/web/public/{photos,videos}
 * using the official Pixabay API (https://pixabay.com/api/docs/). Files are stored locally: Pixabay's
 * terms ask apps to download images instead of hotlinking them.
 *
 * Usage (from repo root or apps/web):
 *   npm run media:setup                # download everything that is missing
 *   npm run media:setup -- --force     # re-download everything
 *   npm run media:setup -- --only=hero-team,intro
 *   npm run media:setup -- --if-missing --soft   # used by "prebuild": never fails the build
 *
 * Key: PIXABAY_API_KEY in apps/web/.env.local (never commit it).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const photoDir = path.join(root, "public", "photos");
const videoDir = path.join(root, "public", "videos");
const args = process.argv.slice(2);
const flag = (n) => args.includes(`--${n}`);
const only = (args.find((a) => a.startsWith("--only=")) || "").slice(7).split(",").filter(Boolean);
const FORCE = flag("force"), SOFT = flag("soft"), IF_MISSING = flag("if-missing");
const BASE = process.env.PIXABAY_BASE || "https://pixabay.com";

function readKey() {
  if (process.env.PIXABAY_API_KEY) return process.env.PIXABAY_API_KEY.trim();
  for (const f of [".env.local", ".env"]) {
    try {
      for (const line of fs.readFileSync(path.join(root, f), "utf8").split(/\r?\n/)) {
        const m = line.match(/^\s*PIXABAY_API_KEY\s*=\s*(.*?)\s*$/);
        if (m) return m[1].replace(/^["']|["']$/g, "");
      }
    } catch {}
  }
  return "";
}

/** [slot, [search queries tried in order], optional category] */
const P = [
  // Homepage + hero
  ["hero-team", ["software team meeting laptops office", "business team collaboration laptop", "startup team working together"]],
  ["hero-code", ["programmer coding laptop screen", "developer writing code", "software development code monitor"]],
  ["hero-server", ["data center servers", "server room network cables", "cloud server infrastructure"]],
  ["hero-retail", ["shop owner billing counter", "retail store point of sale", "small business owner shop"]],
  ["auto-1", ["business automation workflow laptop", "digital workflow dashboard office", "process automation technology"]],
  ["crm-1", ["analytics dashboard laptop", "business dashboard charts screen", "sales report laptop"]],
  ["home-local-business", ["small business owner using point of sale tablet shop", "independent retailer using digital billing system", "small business owner shop counter technology"]],
  ["home-automation", ["business workflow automation team laptop process", "digital operations automation dashboard office", "business process automation workspace"]],
  ["home-client-management", ["project management dashboard team planning", "client project review team office", "business collaboration project tracking"]],
  ["home-film-poster", ["technology innovation office cinematic workspace", "modern software engineering office cinematic", "digital technology infrastructure cinematic"]],
  ["capability-strategy", ["business strategy consulting team meeting office", "executive business planning workshop", "technology strategy consultants collaboration"]],
  ["capability-product", ["product designer ux research wireframe team", "digital product design team workshop", "user experience designer interface planning"]],
  ["capability-engineering", ["software engineers collaborating multiple monitors office", "software development team code review", "web application engineering workstation"]],
  ["capability-cloud", ["cybersecurity operations center monitors", "cloud data center network infrastructure", "enterprise cloud security server room"]],
  // Section banners (used behind inner-page heroes)
  ["sec-services", ["software engineers working", "web developers office", "coding team desk"]],
  ["sec-industries", ["modern factory automation", "warehouse logistics technology", "business city skyline office"]],
  ["sec-solutions", ["product design team whiteboard", "ux designers sketching app", "startup product planning"]],
  ["sec-work", ["team presentation meeting", "client meeting office", "project review team"]],
  ["sec-about", ["business team portrait office", "company team discussion", "colleagues meeting room"]],
  ["sec-pricing", ["business planning calculator laptop", "proposal meeting documents", "budget planning office"]],
  ["sec-process", ["project planning sticky notes", "agile team board", "workflow planning whiteboard"]],
  ["sec-contact", ["customer support headset", "business handshake meeting", "consultation meeting office"]],
  ["sec-partners", ["business partnership handshake", "partners meeting table", "corporate collaboration"]],
  ["sec-careers", ["young developers team office", "startup office culture", "team brainstorming laptops"]],
  // Service families
  ["fam-web-development", ["web design laptop", "website development screen code", "responsive website mockup"]],
  ["fam-mobile-app-development", ["mobile app development smartphone", "developer testing mobile app", "smartphone app design"]],
  ["fam-ai-machine-learning", ["artificial intelligence technology", "machine learning data", "ai robot technology"]],
  ["fam-cloud-computing", ["cloud computing technology", "data center cloud", "network servers cloud"]],
  ["fam-cybersecurity", ["cyber security laptop", "data protection security lock", "hacker security code"]],
  ["fam-ui-ux-design", ["ui ux design wireframe", "designer working on app interface", "user experience design sketch"]],
  ["fam-enterprise-software", ["enterprise software dashboard", "erp crm business software", "office team computer dashboard"]],
  // Dedicated service-page imagery
  ["service-application-development", ["software application developers coding team", "software application developers coding team office", "software application developers coding team technology"]],
  ["service-web-development", ["web developer designing responsive website laptop", "web developer designing responsive website laptop office", "web developer designing responsive website laptop technology"]],
  ["service-mobile-app-development", ["mobile app developer smartphone testing", "mobile app developer smartphone testing office", "mobile app developer smartphone testing technology"]],
  ["service-enterprise-software", ["enterprise software dashboard office", "enterprise software dashboard office office", "enterprise software dashboard office technology"]],
  ["service-ai-machine-learning", ["artificial intelligence machine learning technology", "artificial intelligence machine learning technology office", "artificial intelligence machine learning technology technology"]],
  ["service-generative-ai", ["generative artificial intelligence computer", "generative artificial intelligence computer office", "generative artificial intelligence computer technology"]],
  ["service-cloud-computing", ["cloud computing server infrastructure", "cloud computing server infrastructure office", "cloud computing server infrastructure technology"]],
  ["service-cloud-migration", ["cloud data center infrastructure migration", "cloud data center infrastructure migration office", "cloud data center infrastructure migration technology"]],
  ["service-devops-engineering", ["devops engineer server monitoring", "devops engineer server monitoring office", "devops engineer server monitoring technology"]],
  ["service-cybersecurity", ["cybersecurity security operations center", "cybersecurity security operations center office", "cybersecurity security operations center technology"]],
  ["service-data-engineering", ["data engineer data pipeline computers", "data engineer data pipeline computers office", "data engineer data pipeline computers technology"]],
  ["service-data-analytics", ["data analytics dashboard business", "data analytics dashboard business office", "data analytics dashboard business technology"]],
  ["service-business-intelligence", ["business intelligence dashboard screens", "business intelligence dashboard screens office", "business intelligence dashboard screens technology"]],
  ["service-ui-ux-design", ["ux designer wireframe product design", "ux designer wireframe product design office", "ux designer wireframe product design technology"]],
  ["service-digital-transformation", ["digital transformation business technology", "digital transformation business technology office", "digital transformation business technology technology"]],
  ["service-it-consulting", ["technology consulting business meeting", "technology consulting business meeting office", "technology consulting business meeting technology"]],
  ["service-erp-solutions", ["enterprise resource planning dashboard", "enterprise resource planning dashboard office", "enterprise resource planning dashboard technology"]],
  ["service-crm-development", ["customer relationship management dashboard", "customer relationship management dashboard office", "customer relationship management dashboard technology"]],
  ["service-api-integration", ["software integration computer code", "software integration computer code office", "software integration computer code technology"]],
  ["service-quality-engineering", ["software quality assurance testing monitors", "software quality assurance testing monitors office", "software quality assurance testing monitors technology"]],
  // Industries
  ["ind-banking-financial-services", ["banking finance technology", "fintech mobile payment", "bank office finance"]],
  ["ind-insurance", ["insurance agent documents", "insurance protection family", "insurance office consultation"]],
  ["ind-healthcare", ["hospital technology doctor tablet", "healthcare digital doctor", "medical clinic reception"]],
  ["ind-pharmaceuticals", ["pharmacy laboratory research", "pharmaceutical lab", "medicine laboratory scientist"]],
  ["ind-retail-e-commerce", ["ecommerce online shopping", "retail store shelves customer", "online store packaging"]],
  ["ind-education-edtech", ["online learning student laptop", "classroom technology students", "e-learning education"]],
  ["ind-manufacturing", ["manufacturing factory industry", "factory automation robot arm", "industrial production line"]],
  ["ind-logistics-supply-chain", ["logistics warehouse trucks", "supply chain warehouse", "cargo shipping containers"]],
  ["ind-telecommunications", ["telecommunications tower network", "5g network technology", "telecom engineer"]],
  ["ind-real-estate", ["real estate modern building", "property agent house keys", "apartment building architecture"]],
  ["ind-travel-hospitality", ["hotel reception hospitality", "travel booking airport", "resort hotel lobby"]],
  ["ind-energy-utilities", ["solar panels energy", "power grid electricity", "wind turbines energy"]],
  ["ind-automotive-mobility", ["automotive factory cars", "electric car charging", "car service garage"]],
  ["ind-media-entertainment", ["video production studio", "media streaming creator", "film studio camera"]],
  ["ind-government-public-sector", ["government building india", "public service digital", "smart city technology"]],
  ["ind-agriculture", ["smart farming technology", "agriculture drone field", "farmer tablet field"]],
  ["ind-professional-services", ["recruitment interview office", "hr hiring interview", "business consulting meeting"]],
  ["ind-food-beverage", ["restaurant kitchen chef", "cafe coffee shop owner", "food delivery restaurant"]],
  ["ind-construction-engineering", ["construction site engineers", "civil engineering blueprint", "architect construction tablet"]],
  ["ind-non-profit-social-impact", ["volunteers community help", "ngo community project", "social impact team"]],
  // Business solution pages
  ["biz-retail-pos-billing", ["retail shop point of sale billing counter", "retail shop point of sale billing counter business", "retail shop point of sale billing counter technology"]],
  ["biz-inventory-stock-control", ["warehouse inventory barcode stock", "warehouse inventory barcode stock business", "warehouse inventory barcode stock technology"]],
  ["biz-ecommerce-storefront", ["ecommerce online shopping laptop", "ecommerce online shopping laptop business", "ecommerce online shopping laptop technology"]],
  ["biz-restaurant-ordering-operations", ["restaurant digital ordering kitchen", "restaurant digital ordering kitchen business", "restaurant digital ordering kitchen technology"]],
  ["biz-appointment-booking-system", ["appointment booking computer calendar", "appointment booking computer calendar business", "appointment booking computer calendar technology"]],
  ["biz-small-business-crm", ["small business customer relationship dashboard", "small business customer relationship dashboard business", "small business customer relationship dashboard technology"]],
  ["biz-accounting-invoice-workflow", ["accounting invoice finance laptop", "accounting invoice finance laptop business", "accounting invoice finance laptop technology"]],
  ["biz-clinic-practice-management", ["clinic healthcare reception computer", "clinic healthcare reception computer business", "clinic healthcare reception computer technology"]],
  ["biz-school-coaching-management", ["school learning management computer", "school learning management computer business", "school learning management computer technology"]],
  ["biz-hotel-property-operations", ["hotel booking property management", "hotel booking property management business", "hotel booking property management technology"]],
  ["biz-salon-fitness-management", ["salon fitness studio management", "salon fitness studio management business", "salon fitness studio management technology"]],
  ["biz-wholesale-distributor-portal", ["wholesale distribution warehouse", "wholesale distribution warehouse business", "wholesale distribution warehouse technology"]],
  ["biz-field-service-management", ["field technician mobile tablet service", "field technician mobile tablet service business", "field technician mobile tablet service technology"]],
  ["biz-fleet-delivery-tracking", ["fleet delivery logistics tracking", "fleet delivery logistics tracking business", "fleet delivery logistics tracking technology"]],
  ["biz-hr-employee-self-service", ["human resources employee management office", "human resources employee management office business", "human resources employee management office technology"]],
  ["biz-document-approval-automation", ["digital document workflow approval", "digital document workflow approval business", "digital document workflow approval technology"]],
  ["biz-whatsapp-business-automation", ["business messaging smartphone office", "business messaging smartphone office business", "business messaging smartphone office technology"]],
  ["biz-multi-branch-dashboard", ["business analytics dashboard retail", "business analytics dashboard retail business", "business analytics dashboard retail technology"]],
  ["biz-loyalty-customer-engagement", ["customer loyalty retail store", "customer loyalty retail store business", "customer loyalty retail store technology"]],
  ["biz-custom-business-software", ["business software developers office", "business software developers office business", "business software developers office technology"]],
  // Solution-specific editorial imagery
  ["sol-enterprise-portals", ["enterprise portals digital platform", "enterprise portals business technology", "enterprise portals software dashboard"]],
  ["sol-customer-experience-platforms", ["customer experience platforms digital platform", "customer experience platforms business technology", "customer experience platforms software dashboard"]],
  ["sol-workflow-automation", ["workflow automation digital platform", "workflow automation business technology", "workflow automation software dashboard"]],
  ["sol-ai-knowledge-assistant", ["ai knowledge assistant digital platform", "ai knowledge assistant business technology", "ai knowledge assistant software dashboard"]],
  ["sol-document-intelligence", ["document intelligence digital platform", "document intelligence business technology", "document intelligence software dashboard"]],
  ["sol-predictive-analytics", ["predictive analytics digital platform", "predictive analytics business technology", "predictive analytics software dashboard"]],
  ["sol-modern-data-platform", ["modern data platform digital platform", "modern data platform business technology", "modern data platform software dashboard"]],
  ["sol-cloud-native-modernization", ["cloud-native modernization digital platform", "cloud-native modernization business technology", "cloud-native modernization software dashboard"]],
  ["sol-digital-commerce", ["digital commerce digital platform", "digital commerce business technology", "digital commerce software dashboard"]],
  ["sol-customer-relationship-platform", ["customer relationship platform digital platform", "customer relationship platform business technology", "customer relationship platform software dashboard"]],
  ["sol-enterprise-resource-planning", ["enterprise resource planning digital platform", "enterprise resource planning business technology", "enterprise resource planning software dashboard"]],
  ["sol-learning-management-system", ["learning management system digital platform", "learning management system business technology", "learning management system software dashboard"]],
  ["sol-recruitment-management", ["recruitment management digital platform", "recruitment management business technology", "recruitment management software dashboard"]],
  ["sol-field-service-management", ["field service management digital platform", "field service management business technology", "field service management software dashboard"]],
  ["sol-iot-monitoring-platform", ["iot monitoring platform digital platform", "iot monitoring platform business technology", "iot monitoring platform software dashboard"]],
  ["sol-security-operations-dashboard", ["security operations dashboard digital platform", "security operations dashboard business technology", "security operations dashboard software dashboard"]],
  ["sol-api-management", ["api management digital platform", "api management business technology", "api management software dashboard"]],
  ["sol-business-intelligence-hub", ["business intelligence hub digital platform", "business intelligence hub business technology", "business intelligence hub software dashboard"]],
  ["sol-payment-experience", ["payment experience digital platform", "payment experience business technology", "payment experience software dashboard"]],
  ["sol-mobile-workforce-platform", ["mobile workforce platform digital platform", "mobile workforce platform business technology", "mobile workforce platform software dashboard"]],
  // Insights
  ["ins-0", ["project planning scope notebook", "requirements planning meeting"]],
  ["ins-1", ["website design laptop", "web application laptop screen"]],
  ["ins-2", ["business partnership meeting", "handshake agreement office"]],
  ["ins-3", ["cyber security data protection", "secure login password laptop"]],
  ["ins-4", ["artificial intelligence business", "ai assistant chatbot technology"]],
  // Portfolio and concept page imagery
  ["work-fintech-platform-concept", ["fintech platform concept technology project", "fintech platform concept business software dashboard", "software project team"]],
  ["work-retail-commerce-concept", ["retail commerce concept technology project", "retail commerce concept business software dashboard", "software project team"]],
  ["work-healthcare-portal-concept", ["healthcare portal concept technology project", "healthcare portal concept business software dashboard", "software project team"]],
  ["work-learning-platform-concept", ["learning platform concept technology project", "learning platform concept business software dashboard", "software project team"]],
  ["work-logistics-dashboard-concept", ["logistics dashboard concept technology project", "logistics dashboard concept business software dashboard", "software project team"]],
  ["work-ai-knowledge-assistant-concept", ["ai knowledge assistant concept technology project", "ai knowledge assistant concept business software dashboard", "software project team"]],
  ["work-crm-workflow-concept", ["crm workflow concept technology project", "crm workflow concept business software dashboard", "software project team"]],
  ["work-real-estate-portal-concept", ["real estate portal concept technology project", "real estate portal concept business software dashboard", "software project team"]],
  ["work-manufacturing-analytics-concept", ["manufacturing analytics concept technology project", "manufacturing analytics concept business software dashboard", "software project team"]],
  ["work-mobile-banking-concept", ["mobile banking concept technology project", "mobile banking concept business software dashboard", "software project team"]],
  ["work-field-service-app-concept", ["field service app concept technology project", "field service app concept business software dashboard", "software project team"]],
  ["work-hr-recruitment-portal-concept", ["hr recruitment portal concept technology project", "hr recruitment portal concept business software dashboard", "software project team"]],
  ["work-travel-booking-concept", ["travel booking concept technology project", "travel booking concept business software dashboard", "software project team"]],
  ["work-energy-monitoring-concept", ["energy monitoring concept technology project", "energy monitoring concept business software dashboard", "software project team"]],
  ["work-api-integration-blueprint", ["api integration blueprint technology project", "api integration blueprint business software dashboard", "software project team"]],
  ["work-cloud-modernization-blueprint", ["cloud modernization blueprint technology project", "cloud modernization blueprint business software dashboard", "software project team"]],
  ["work-data-platform-blueprint", ["data platform blueprint technology project", "data platform blueprint business software dashboard", "software project team"]],
  ["work-cybersecurity-review-framework", ["cybersecurity review framework technology project", "cybersecurity review framework business software dashboard", "software project team"]],
  ["work-design-system-showcase", ["design system showcase technology project", "design system showcase business software dashboard", "software project team"]],
  ["work-automation-workflow-concept", ["automation workflow concept technology project", "automation workflow concept business software dashboard", "software project team"]],
  // Career and discipline page imagery
  ["career-frontend-engineer", ["frontend engineer professional at work", "frontend engineer technology team office", "technology professionals collaboration"]],
  ["career-backend-engineer", ["backend engineer professional at work", "backend engineer technology team office", "technology professionals collaboration"]],
  ["career-full-stack-developer", ["full-stack developer professional at work", "full-stack developer technology team office", "technology professionals collaboration"]],
  ["career-ui-ux-designer", ["ui/ux designer professional at work", "ui/ux designer technology team office", "technology professionals collaboration"]],
  ["career-mobile-app-developer", ["mobile app developer professional at work", "mobile app developer technology team office", "technology professionals collaboration"]],
  ["career-ai-ml-engineer", ["ai/ml engineer professional at work", "ai/ml engineer technology team office", "technology professionals collaboration"]],
  ["career-data-engineer", ["data engineer professional at work", "data engineer technology team office", "technology professionals collaboration"]],
  ["career-cloud-engineer", ["cloud engineer professional at work", "cloud engineer technology team office", "technology professionals collaboration"]],
  ["career-devops-engineer", ["devops engineer professional at work", "devops engineer technology team office", "technology professionals collaboration"]],
  ["career-qa-automation-engineer", ["qa automation engineer professional at work", "qa automation engineer technology team office", "technology professionals collaboration"]],
  ["career-cybersecurity-analyst", ["cybersecurity analyst professional at work", "cybersecurity analyst technology team office", "technology professionals collaboration"]],
  ["career-business-analyst", ["business analyst professional at work", "business analyst technology team office", "technology professionals collaboration"]],
  ["career-project-coordinator", ["project coordinator professional at work", "project coordinator technology team office", "technology professionals collaboration"]],
  ["career-technical-content-writer", ["technical content writer professional at work", "technical content writer technology team office", "technology professionals collaboration"]],
  ["career-seo-specialist", ["seo specialist professional at work", "seo specialist technology team office", "technology professionals collaboration"]],
  ["career-graphic-designer", ["graphic designer professional at work", "graphic designer technology team office", "technology professionals collaboration"]],
  ["career-sales-development-associate", ["sales development associate professional at work", "sales development associate technology team office", "technology professionals collaboration"]],
  ["career-client-success-associate", ["client success associate professional at work", "client success associate technology team office", "technology professionals collaboration"]],
  ["career-internship-programme", ["internship programme professional at work", "internship programme technology team office", "technology professionals collaboration"]],
  ["career-talent-community", ["talent community professional at work", "talent community technology team office", "technology professionals collaboration"]],
  // Insight topic page photography
  ["ins-topic-digital-transformation-guide", ["digital transformation guide technology concept", "digital transformation guide business technology", "technology strategy team"]],
  ["ins-topic-how-to-plan-a-website-project", ["how to plan a website project technology concept", "how to plan a website project business technology", "technology strategy team"]],
  ["ins-topic-choosing-a-mobile-app-strategy", ["choosing a mobile app strategy technology concept", "choosing a mobile app strategy business technology", "technology strategy team"]],
  ["ins-topic-ai-readiness-for-businesses", ["ai readiness for businesses technology concept", "ai readiness for businesses business technology", "technology strategy team"]],
  ["ins-topic-generative-ai-governance", ["generative ai governance technology concept", "generative ai governance business technology", "technology strategy team"]],
  ["ins-topic-cloud-migration-planning", ["cloud migration planning technology concept", "cloud migration planning business technology", "technology strategy team"]],
  ["ins-topic-devops-fundamentals", ["devops fundamentals technology concept", "devops fundamentals business technology", "technology strategy team"]],
  ["ins-topic-cybersecurity-basics-for-smes", ["cybersecurity basics for smes technology concept", "cybersecurity basics for smes business technology", "technology strategy team"]],
  ["ins-topic-api-design-principles", ["api design principles technology concept", "api design principles business technology", "technology strategy team"]],
  ["ins-topic-data-quality-essentials", ["data quality essentials technology concept", "data quality essentials business technology", "technology strategy team"]],
  ["ins-topic-ux-research-methods", ["ux research methods technology concept", "ux research methods business technology", "technology strategy team"]],
  ["ins-topic-accessibility-in-digital-products", ["accessibility in digital products technology concept", "accessibility in digital products business technology", "technology strategy team"]],
  ["ins-topic-modernizing-legacy-systems", ["modernizing legacy systems technology concept", "modernizing legacy systems business technology", "technology strategy team"]],
  ["ins-topic-e-commerce-performance", ["e-commerce performance technology concept", "e-commerce performance business technology", "technology strategy team"]],
  ["ins-topic-building-an-effective-crm", ["building an effective crm technology concept", "building an effective crm business technology", "technology strategy team"]],
  ["ins-topic-automation-opportunity-mapping", ["automation opportunity mapping technology concept", "automation opportunity mapping business technology", "technology strategy team"]],
  ["ins-topic-software-testing-strategy", ["software testing strategy technology concept", "software testing strategy business technology", "technology strategy team"]],
  ["ins-topic-technology-cost-optimization", ["technology cost optimization technology concept", "technology cost optimization business technology", "technology strategy team"]],
  ["ins-topic-responsible-data-practices", ["responsible data practices technology concept", "responsible data practices business technology", "technology strategy team"]],
  ["ins-topic-measuring-digital-product-success", ["measuring digital product success technology concept", "measuring digital product success business technology", "technology strategy team"]],
  // Company information page photography
  ["about-who-we-are", ["who we are corporate technology", "who we are business meeting", "professional team office"]],
  ["about-company-overview", ["company overview corporate technology", "company overview business meeting", "professional team office"]],
  ["about-our-vision", ["our vision corporate technology", "our vision business meeting", "professional team office"]],
  ["about-our-mission", ["our mission corporate technology", "our mission business meeting", "professional team office"]],
  ["about-our-values", ["our values corporate technology", "our values business meeting", "professional team office"]],
  ["about-leadership", ["leadership corporate technology", "leadership business meeting", "professional team office"]],
  ["about-our-approach", ["our approach corporate technology", "our approach business meeting", "professional team office"]],
  ["about-how-we-work", ["how we work corporate technology", "how we work business meeting", "professional team office"]],
  ["about-our-story", ["our story corporate technology", "our story business meeting", "professional team office"]],
  ["about-technology-philosophy", ["technology philosophy corporate technology", "technology philosophy business meeting", "professional team office"]],
  ["about-quality-commitment", ["quality commitment corporate technology", "quality commitment business meeting", "professional team office"]],
  ["about-security-trust", ["security and trust corporate technology", "security and trust business meeting", "professional team office"]],
  ["about-responsible-ai", ["responsible ai corporate technology", "responsible ai business meeting", "professional team office"]],
  ["about-innovation", ["innovation corporate technology", "innovation business meeting", "professional team office"]],
  ["about-partnerships", ["partnerships corporate technology", "partnerships business meeting", "professional team office"]],
  ["about-community", ["community corporate technology", "community business meeting", "professional team office"]],
  ["about-diversity-inclusion", ["diversity and inclusion corporate technology", "diversity and inclusion business meeting", "professional team office"]],
  ["about-sustainability", ["sustainability corporate technology", "sustainability business meeting", "professional team office"]],
  ["about-careers-culture", ["careers and culture corporate technology", "careers and culture business meeting", "professional team office"]],
  ["about-frequently-asked-questions", ["frequently asked questions corporate technology", "frequently asked questions business meeting", "professional team office"]],
  ["about-our-story", ["our story corporate technology", "our story business meeting", "professional team office"]],
  ["about-leadership", ["leadership corporate technology", "leadership business meeting", "professional team office"]],
  ["about-our-team", ["our team corporate technology", "our team business meeting", "professional team office"]],
  ["about-values", ["our values corporate technology", "our values business meeting", "professional team office"]],
  ["about-how-we-work", ["how we work corporate technology", "how we work business meeting", "professional team office"]],
  ["about-quality-and-security", ["quality and security corporate technology", "quality and security business meeting", "professional team office"]],
  ["about-technology", ["technology we use corporate technology", "technology we use business meeting", "professional team office"]],
  ["about-engagement-models", ["ways to work with us corporate technology", "ways to work with us business meeting", "professional team office"]],
  ["about-office-and-location", ["office and location corporate technology", "office and location business meeting", "professional team office"]],
  ["about-faq", ["frequently asked questions corporate technology", "frequently asked questions business meeting", "professional team office"]],
  // About / team imagery
  ["about-team", ["team of developers office laptops", "business people meeting table"]],
  ["about-office", ["modern office workspace", "creative office desks"]],

  ["home-slide-digital", ["software engineer writing code on multiple monitors in modern studio", "software development team product engineering workspace", "web developer coding modern application"]],
  ["home-slide-ai", ["artificial intelligence scientist computer vision research lab", "AI machine learning data science engineer office", "artificial intelligence neural network research screens"]],
  ["home-slide-cloud", ["large modern data center server racks aisle", "cloud infrastructure network operations center", "enterprise server room blue lights"]],
  ["home-slide-enterprise", ["enterprise digital transformation business leaders meeting", "corporate technology consulting workshop", "enterprise software strategy team meeting"]],
  ["home-slide-products", ["SaaS product designer interface dashboard workstation", "software product team planning digital platform", "modern app design product development studio"]],
  // Dedicated homepage division imagery: each pillar gets its own unique Pixabay photo.
  ["home-pillar-digital", ["software product engineering team working in modern office", "web application developers collaborating on software product", "digital product engineering workstation"]],
  ["home-pillar-ai", ["artificial intelligence researcher working with neural network data screens", "AI machine learning technology research laboratory", "data scientist analysing artificial intelligence model"]],
  ["home-pillar-cloud", ["modern hyperscale data center server aisle blue lights", "cloud infrastructure engineer server racks", "enterprise data center network infrastructure"]],
  ["home-pillar-enterprise", ["enterprise technology consulting team boardroom meeting", "business executives reviewing digital transformation dashboard", "corporate team collaborating on enterprise software"]],
  ["home-pillar-products", ["SaaS product designer working on analytics dashboard laptop", "software product team reviewing app interface", "digital product management workspace"]],
  ["pillar-axnova-digital", ["software developers engineering digital product on multiple monitors", "web application software engineering team office", "digital product development studio"]],
  ["pillar-axnova-ai", ["AI research scientist working on machine learning systems", "artificial intelligence data science laboratory", "machine learning engineer neural network monitors"]],
  ["pillar-axnova-cloud", ["cloud computing infrastructure data center server racks", "cloud operations engineer monitoring server room", "cybersecurity operations center enterprise"]],
  ["pillar-axnova-enterprise", ["enterprise architects collaborating in modern corporate office", "enterprise software implementation team workshop", "business technology integration meeting"]],
  ["pillar-axnova-products", ["SaaS product team planning software dashboard", "software startup product design workshop", "digital product interface design team"]],
  ["work-uniquetoo-platform", ["workforce recruitment platform laptop dashboard office", "professional hiring team reviewing candidate management software", "education technology platform computer"]],
  ["work-axnovatech-platform", ["software company team building digital products office", "technology engineering team working together office", "software product development workstation"]],

];

const V = [
  // Reusable cinematic service films, selected by the capability family on every service page
  ["service-web-development", ["software development team working together", "web development office coding", "software engineering collaboration"]],
  ["service-mobile-app-development", ["mobile app developer smartphone technology", "mobile application development team", "smartphone app testing"]],
  ["service-ai-machine-learning", ["artificial intelligence data science technology", "AI data analytics office", "machine learning technology team"]],
  ["service-cloud-computing", ["cloud computing data center server room", "cloud infrastructure technology", "server room network operations"]],
  ["service-cybersecurity", ["cybersecurity operations center monitors", "cyber security analyst computer", "network security technology"]],
  ["service-ui-ux-design", ["UX UI design team working", "product designer digital interface", "user experience design office"]],
  ["service-enterprise-software", ["enterprise software developers office", "business technology team meeting", "enterprise dashboard workplace"]],
  ["service-data-engineering", ["data analytics technology screens", "data engineering dashboard office", "business intelligence analytics"]],
  ["biz-business-operations", ["small business owner working with digital tools", "retail business technology point of sale", "small business software office"]],
  ["intro", ["business team technology office", "software developers office", "team working laptops"]],
  ["delivery", ["coding software development", "data center server", "programming screen code"]]
];

const key = readKey();
const slotsP = P.filter(([s]) => !only.length || only.includes(s));
const slotsV = V.filter(([s]) => !only.length || only.includes(s));
fs.mkdirSync(photoDir, { recursive: true });
fs.mkdirSync(videoDir, { recursive: true });
const manifestPath = path.join(photoDir, "manifest.json");
let manifest = {};
try { manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8")); } catch {}
const have = (dir, file) => fs.existsSync(path.join(dir, file));
// Audit the existing manifest: older releases could map several slots to the same Pixabay ID.
// Keep the first occurrence and re-download every duplicate slot so each content section has
// a genuinely distinct photograph.
const idOwners = new Map();
const duplicatePhotoSlots = new Set();
for (const [slot, meta] of Object.entries(manifest)) {
  if (slot.startsWith("video:") || !meta?.id) continue;
  const id = String(meta.id);
  if (idOwners.has(id)) duplicatePhotoSlots.add(slot);
  else idOwners.set(id, slot);
}
const missingP = slotsP.filter(([s]) => FORCE || !have(photoDir, s + ".jpg") || duplicatePhotoSlots.has(s));
const missingV = slotsV.filter(([s]) => FORCE || !have(videoDir, s + ".mp4"));

if (IF_MISSING && !missingP.length && !missingV.length) { console.log("[media] All media present; no duplicate photo IDs found."); process.exit(0); }
if (!key) {
  console.warn("[media] PIXABAY_API_KEY not found. Add it to apps/web/.env.local, then run: npm run media:setup");
  process.exit(SOFT ? 0 : 1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let lastCall = 0;
async function api(kind, params) {
  const wait = 650 - (Date.now() - lastCall); // stay far below Pixabay's 100 requests / 60 s limit
  if (wait > 0) await sleep(wait);
  lastCall = Date.now();
  const url = `${BASE}/api/${kind}?key=${encodeURIComponent(key)}&${new URLSearchParams(params)}`;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": "axnovatech-media-setup/1.0" } });
      if (r.status === 429) { console.warn("[media] Rate limited, waiting 60s..."); await sleep(60000); continue; }
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return await r.json();
    } catch (e) { if (attempt === 3) throw e; await sleep(1500 * attempt); }
  }
}
async function download(url, target, min = 20000) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const r = await fetch(url, { redirect: "follow", headers: { "User-Agent": "axnovatech-media-setup/1.0" } });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.length < min) throw new Error("file too small");
      fs.writeFileSync(target, buf);
      return buf.length;
    } catch (e) { if (attempt === 3) throw e; await sleep(1500 * attempt); }
  }
}

const refreshing = new Set(missingP.map(([slot]) => slot));
const used = new Set(Object.entries(manifest)
  .filter(([slot, meta]) => !slot.startsWith("video:") && !refreshing.has(slot) && meta?.id)
  .map(([, meta]) => String(meta.id)));
const BAD_TAGS = /illustration|vector|clipart|cartoon|logo|icon|nsfw/i;
let ok = 0, fail = 0, bytes = 0;

for (const [slot, queries] of missingP) {
  let done = false;
  for (const q of queries) {
    try {
      const data = await api("", { q, image_type: "photo", orientation: "horizontal", min_width: "1280", min_height: "720", safesearch: "true", order: "popular", per_page: "40", lang: "en" });
      const hit = (data.hits || []).find((h) => !used.has(String(h.id)) && !BAD_TAGS.test(h.tags || "") && h.imageWidth / h.imageHeight >= 1.3 && h.largeImageURL);
      if (!hit) continue;
      const n = await download(hit.largeImageURL, path.join(photoDir, slot + ".jpg"));
      used.add(String(hit.id)); bytes += n; ok++; done = true;
      manifest[slot] = { id: hit.id, file: slot + ".jpg", user: hit.user, page: hit.pageURL, tags: hit.tags, w: hit.imageWidth, h: hit.imageHeight, query: q };
      console.log(`[media] photo ${slot.padEnd(34)} ${Math.round(n / 1024)} KB  (${q})`);
      break;
    } catch (e) { console.warn(`[media] ${slot} / "${q}": ${e.message}`); }
  }
  if (!done) { fail++; console.warn(`[media] No photo found for ${slot}`); }
}

for (const [slot, queries] of missingV) {
  let done = false;
  for (const q of queries) {
    try {
      const data = await api("videos/", { q, video_type: "film", min_width: "1280", safesearch: "true", order: "popular", per_page: "30" });
      const hit = (data.hits || []).find((h) => !used.has("v" + h.id) && h.duration >= 8 && h.duration <= 35 && (h.videos?.medium?.url || h.videos?.small?.url) && ((h.videos.medium?.size || h.videos.small?.size || 0) < 5_000_000));
      if (!hit) continue;
      const v = hit.videos.medium?.url ? hit.videos.medium : hit.videos.small;
      const n = await download(v.url, path.join(videoDir, slot + ".mp4"), 100000);
      used.add("v" + hit.id); bytes += n; ok++; done = true;
      manifest["video:" + slot] = { id: "v" + hit.id, file: slot + ".mp4", user: hit.user, page: hit.pageURL, tags: hit.tags, query: q };
      console.log(`[media] video ${slot.padEnd(34)} ${(n / 1048576).toFixed(1)} MB  (${q})`);
      break;
    } catch (e) { console.warn(`[media] ${slot} / "${q}": ${e.message}`); }
  }
  if (!done) { fail++; console.warn(`[media] No video found for ${slot}`); }
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
const lines = ["AXNOVATECH media credits", "Photos and videos: Pixabay (https://pixabay.com), Pixabay Content License. Attribution is appreciated, not required.", ""];
for (const [slot, m] of Object.entries(manifest)) lines.push(`${slot.padEnd(36)} ${m.user} | ${m.page}`);
fs.writeFileSync(path.join(root, "public", "MEDIA-CREDITS.txt"), lines.join("\n") + "\n");
console.log(`\n[media] Done: ${ok} downloaded (${(bytes / 1048576).toFixed(1)} MB), ${fail} not found. Restart the site and hard refresh.`);
process.exit(fail && !SOFT ? 2 : 0);
