import type {
  AppArchetype,
  BlueprintDataModel,
  BlueprintDefinition,
  BlueprintFeatureDefinition,
  BlueprintInteraction,
  BlueprintPageDefinition,
  BlueprintPageSection,
  BlueprintRole,
  BlueprintVisualDNA,
  BlueprintWorkflow,
  BlueprintWorkflowKey,
  IndustryKey
} from "./blueprint-types";
import {
  appArchetypes,
  dataModelTemplates,
  featureModules,
  industries,
  interactionPatterns,
  visualDNAPresets,
  workflowTemplates
} from "./blueprint-registries";

type FeatureKey = keyof typeof featureModules;
type DataModelKey = keyof typeof dataModelTemplates;
type InteractionKey = keyof typeof interactionPatterns;
type VisualPresetKey = keyof typeof visualDNAPresets;

type BlueprintVariant = {
  id: string;
  label: string;
  angle: string;
  archetype: AppArchetype;
  preset: VisualPresetKey;
  densityShift: "airy" | "balanced" | "dense" | "cinematic";
};

const firstTwentyIndustries = new Set<IndustryKey>(industries.slice(0, 20).map((industry) => industry.key));

const paletteByIndustry: Record<IndustryKey, string[]> = {
  restaurant: ["#070403", "#d6b46a", "#3b2415", "#fff4df"],
  cafe: ["#3b2415", "#f2c078", "#f7efe3", "#7c4a2d"],
  barbershop: ["#080504", "#c08457", "#2a1710", "#f1e4d2"],
  "beauty-salon": ["#fff7fb", "#f0a6c1", "#f8e4bd", "#7c2d4b"],
  "dental-clinic": ["#eefcff", "#5eead4", "#38bdf8", "#0f766e"],
  "private-clinic": ["#f8fbff", "#7dd3fc", "#0f766e", "#0f172a"],
  gym: ["#030303", "#f97316", "#a3e635", "#ef4444"],
  "personal-trainer": ["#111111", "#bef264", "#fb923c", "#f8fafc"],
  mechanic: ["#09090b", "#facc15", "#64748b", "#f8fafc"],
  "car-detailing": ["#020617", "#38bdf8", "#94a3b8", "#0f172a"],
  construction: ["#17120a", "#f59e0b", "#fef3c7", "#92400e"],
  electrician: ["#04111f", "#facc15", "#38bdf8", "#f8fafc"],
  plumber: ["#082f49", "#38bdf8", "#e0f2fe", "#0369a1"],
  "cleaning-company": ["#f8fafc", "#22c55e", "#bae6fd", "#0f172a"],
  "real-estate": ["#0d0b08", "#c5a46d", "#f3eadb", "#111111"],
  hotel: ["#09111f", "#eab308", "#dbeafe", "#172554"],
  "event-agency": ["#12071b", "#c084fc", "#f0abfc", "#f8fafc"],
  photographer: ["#030303", "#f59e0b", "#fff7ed", "#451a03"],
  "ecommerce-fashion": ["#050505", "#f5f5f4", "#b91c1c", "#d6d3d1"],
  "ecommerce-electronics": ["#020617", "#22d3ee", "#8b5cf6", "#e0f2fe"],
  "ecommerce-furniture": ["#2b2118", "#c5a46d", "#f5efe6", "#111827"],
  "online-course": ["#f8fbff", "#60a5fa", "#8b5cf6", "#22c55e"],
  coaching: ["#fff7ed", "#fb923c", "#0f172a", "#fed7aa"],
  "law-firm": ["#071426", "#d6b46a", "#f7f0df", "#101827"],
  accounting: ["#f8fafc", "#0f766e", "#38bdf8", "#0f172a"],
  childcare: ["#fff7ed", "#fb7185", "#fde68a", "#38bdf8"],
  school: ["#f8fbff", "#2563eb", "#facc15", "#0f172a"],
  nonprofit: ["#f8fafc", "#16a34a", "#f97316", "#0f172a"],
  "mosque-community": ["#042f2e", "#d6b46a", "#ecfdf5", "#0f766e"],
  coworking: ["#0f172a", "#22d3ee", "#c084fc", "#f8fafc"],
  "SaaS-dashboard": ["#050816", "#8b5cf6", "#22d3ee", "#f0f9ff"],
  "AI-agency": ["#050713", "#a78bfa", "#5eead4", "#f8fafc"],
  logistics: ["#07111f", "#38bdf8", "#f97316", "#e0f2fe"],
  delivery: ["#111827", "#22c55e", "#facc15", "#f8fafc"],
  marketplace: ["#f8fafc", "#4f46e5", "#22c55e", "#0f172a"],
  "repair-service": ["#111827", "#f97316", "#94a3b8", "#f8fafc"],
  "pet-care": ["#fff7ed", "#fb7185", "#a3e635", "#0f172a"],
  "travel-agency": ["#eff6ff", "#38bdf8", "#f97316", "#0f172a"],
  "wedding-service": ["#fff7fb", "#f0a6c1", "#d6b46a", "#4c1d32"],
  "portfolio-studio": ["#030303", "#f8fafc", "#8b5cf6", "#f59e0b"]
};

const customerByIndustry: Record<IndustryKey, string> = {
  restaurant: "fine dining operators and hospitality groups",
  cafe: "independent cafes and roasteries",
  barbershop: "premium grooming studios",
  "beauty-salon": "salons and spa owners",
  "dental-clinic": "trust-focused clinics",
  "private-clinic": "private medical operators",
  gym: "fitness studios and gym owners",
  "personal-trainer": "solo coaches and training brands",
  mechanic: "auto repair shops",
  "car-detailing": "premium detailing businesses",
  construction: "builders and contractors",
  electrician: "electrical service companies",
  plumber: "plumbing businesses",
  "cleaning-company": "cleaning teams and facilities services",
  "real-estate": "estate agencies and property advisors",
  hotel: "hotels, resorts, and boutique stays",
  "event-agency": "event planners and production teams",
  photographer: "commercial and event photographers",
  "ecommerce-fashion": "fashion brands and boutiques",
  "ecommerce-electronics": "electronics retailers",
  "ecommerce-furniture": "furniture and interior stores",
  "online-course": "course creators and academies",
  coaching: "coaches and advisors",
  "law-firm": "law firms and legal practices",
  accounting: "accounting firms",
  childcare: "childcare providers",
  school: "schools and education teams",
  nonprofit: "nonprofits and campaign teams",
  "mosque-community": "mosque and community organizers",
  coworking: "coworking operators",
  "SaaS-dashboard": "software companies",
  "AI-agency": "AI service agencies",
  logistics: "logistics operators",
  delivery: "delivery businesses",
  marketplace: "marketplace founders",
  "repair-service": "repair service teams",
  "pet-care": "pet care providers",
  "travel-agency": "travel advisors",
  "wedding-service": "wedding planners and vendors",
  "portfolio-studio": "studios and independent creatives"
};

const primaryArchetypeByIndustry: Record<IndustryKey, AppArchetype> = {
  restaurant: "restaurant-experience",
  cafe: "restaurant-experience",
  barbershop: "booking-first",
  "beauty-salon": "booking-first",
  "dental-clinic": "booking-first",
  "private-clinic": "booking-first",
  gym: "membership-platform",
  "personal-trainer": "booking-first",
  mechanic: "service-portal",
  "car-detailing": "booking-first",
  construction: "lead-gen-funnel",
  electrician: "service-portal",
  plumber: "service-portal",
  "cleaning-company": "step-wizard",
  "real-estate": "map-first-finder",
  hotel: "booking-first",
  "event-agency": "content-portfolio",
  photographer: "content-portfolio",
  "ecommerce-fashion": "commerce-store",
  "ecommerce-electronics": "commerce-store",
  "ecommerce-furniture": "commerce-store",
  "online-course": "course-platform",
  coaching: "booking-first",
  "law-firm": "lead-gen-funnel",
  accounting: "service-portal",
  childcare: "community-portal",
  school: "community-portal",
  nonprofit: "donation-platform",
  "mosque-community": "community-portal",
  coworking: "membership-platform",
  "SaaS-dashboard": "dashboard-first",
  "AI-agency": "dashboard-first",
  logistics: "admin-command-center",
  delivery: "mobile-app-interface",
  marketplace: "marketplace-grid",
  "repair-service": "service-portal",
  "pet-care": "booking-first",
  "travel-agency": "step-wizard",
  "wedding-service": "content-portfolio",
  "portfolio-studio": "content-portfolio"
};

const archetypeRotation: AppArchetype[] = [
  "booking-first",
  "commerce-store",
  "marketplace-grid",
  "dashboard-first",
  "community-portal",
  "service-portal",
  "content-portfolio",
  "course-platform",
  "admin-command-center",
  "map-first-finder",
  "step-wizard",
  "mobile-app-interface",
  "membership-platform",
  "donation-platform",
  "lead-gen-funnel"
];

const presetRotation: VisualPresetKey[] = [
  "split-screen editorial",
  "immersive full-screen scroll",
  "dashboard-first",
  "marketplace grid",
  "luxury brochure",
  "booking-first funnel",
  "map-first service finder",
  "product-commerce grid",
  "cinematic portfolio",
  "mobile-app style interface",
  "community feed",
  "command-center admin",
  "step-by-step wizard",
  "timeline storytelling",
  "modular magazine",
  "glassmorphism control room",
  "dark premium conversion",
  "soft neumorphism service portal",
  "playful youth app",
  "high-trust medical layout"
];

const variantTemplates = [
  { id: "flagship", label: "Flagship", angle: "premium public experience", densityShift: "cinematic" },
  { id: "studio", label: "Studio", angle: "conversion-focused operating site", densityShift: "balanced" },
  { id: "control", label: "Control Room", angle: "dashboard and workflow heavy product", densityShift: "dense" }
] as const;

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function labelForIndustry(industry: IndustryKey) {
  return industries.find((item) => item.key === industry)?.label ?? industry;
}

function getIndustryIndex(industry: IndustryKey) {
  return industries.findIndex((item) => item.key === industry);
}

function variantCount(industry: IndustryKey) {
  return firstTwentyIndustries.has(industry) ? 3 : 2;
}

function archetypeForVariant(industry: IndustryKey, variantIndex: number): AppArchetype {
  if (variantIndex === 0) return primaryArchetypeByIndustry[industry];
  const industryIndex = getIndustryIndex(industry);
  return archetypeRotation[(industryIndex + variantIndex * 5) % archetypeRotation.length];
}

function presetForVariant(industry: IndustryKey, variantIndex: number): VisualPresetKey {
  const industryIndex = getIndustryIndex(industry);
  return presetRotation[(industryIndex * 3 + variantIndex * 7) % presetRotation.length];
}

export function createIndustryBlueprints(industry: IndustryKey, variants: BlueprintVariant[]) {
  return variants.map((variant, index) => createBlueprint({ industry, variant, index }));
}

function createVariants(industry: IndustryKey): BlueprintVariant[] {
  return variantTemplates.slice(0, variantCount(industry)).map((variant, index) => ({
    ...variant,
    archetype: archetypeForVariant(industry, index),
    preset: presetForVariant(industry, index)
  }));
}

export function createBlueprint(config: { industry: IndustryKey; variant: BlueprintVariant; index: number }): BlueprintDefinition {
  const industryLabel = labelForIndustry(config.industry);
  const key = `${slug(config.industry)}-${config.variant.id}`;
  const features = createFeatureBundle(config.variant.archetype, config.industry, config.index);
  const workflows = createWorkflowSet(config.variant.archetype, features);
  const interactions = createInteractions(features, workflows);
  const dataModels = createDataModels(features);
  const pages = createPageSet(config.variant.archetype, config.industry, config.variant, features);
  const visualDNA = createVisualDNA(config.industry, config.variant, config.index);

  return {
    key,
    name: `${industryLabel} ${config.variant.label}`,
    industry: config.industry,
    archetype: config.variant.archetype,
    description: `${industryLabel} blueprint for ${config.variant.angle}, built as a ${appArchetypes[config.variant.archetype].label.toLowerCase()} with ${visualDNA.layoutPattern}.`,
    targetCustomer: customerByIndustry[config.industry],
    visualDNA,
    pages,
    features,
    roles: createRoles(config.variant.archetype, config.industry),
    dataModels,
    workflows,
    interactions,
    seedData: createSeedData(config.industry, dataModels),
    publishingConfig: {
      defaultDomainHint: `${key}.example.com`,
      sitemap: true,
      robots: true,
      analyticsReady: true,
      imageOptimization: true,
      accessibilityLevel: config.variant.archetype === "dashboard-first" ? "strong" : "strict",
      performanceBudgetKb: config.variant.densityShift === "dense" ? 380 : 320
    },
    qualityScoreTarget: 92 + (config.index % 4)
  };
}

export function createPageSet(archetype: AppArchetype, industry: IndustryKey, variant: BlueprintVariant, features: BlueprintFeatureDefinition[]): BlueprintPageDefinition[] {
  const featureKeys = features.map((feature) => feature.key);
  const industrySlug = slug(industry);
  const section = (kind: BlueprintPageSection["kind"], index: number, featureKey?: string, workflowKey?: BlueprintWorkflowKey): BlueprintPageSection => ({
    key: `${kind}-${index + 1}`,
    kind,
    featureKey,
    workflowKey,
    interactionKeys: featureKey ? (featureModules[featureKey as FeatureKey]?.interactions as unknown as string[] ?? ["switchPage"]) : ["switchPage"],
    dataModel: featureKey ? (featureModules[featureKey as FeatureKey]?.dataModels[0] as string | undefined) : undefined,
    variant: `${variant.id}-${industrySlug}-${index + 1}`
  });

  const templates: Record<AppArchetype, BlueprintPageDefinition[]> = {
    "booking-first": [
      page("home", "Studio", "split booking hero with service rail", [section("hero", 0), section("wizard", 1, "booking", "booking"), section("gallery", 2), section("pricing", 3)]),
      page("booking", "Book", "full conversion calendar with confirmation", [section("calendar", 0, "booking", "booking"), section("form", 1, "contact", "contact"), section("timeline", 2)]),
      page("services", "Services", "sticky vertical service chooser", [section("grid", 0, "quote", "quoteRequest"), section("comparison", 1), section("stats", 2)]),
      page("contact", "Contact", "floating local contact panel", [section("form", 0, "contact", "contact"), section("map", 1), section("profile", 2)])
    ],
    "commerce-store": [
      page("home", "Collection", "editorial product runway", [section("hero", 0), section("grid", 1, "cart", "checkout"), section("gallery", 2), section("checkout", 3, "checkout", "checkout")]),
      page("products", "Products", "filterable commerce grid", [section("grid", 0, "cart", "checkout"), section("form", 1, "filters", "filterBrowse"), section("profile", 2, "favorites", "favorite")]),
      page("cart", "Cart", "drawer-style cart page", [section("checkout", 0, "checkout", "checkout"), section("pricing", 1), section("form", 2, "contact", "contact")]),
      page("contact", "Support", "post-purchase support", [section("form", 0, "contact", "contact"), section("timeline", 1), section("stats", 2)])
    ],
    "marketplace-grid": [
      page("home", "Discover", "marketplace discovery grid", [section("hero", 0), section("form", 1, "filters", "filterBrowse"), section("grid", 2, "listings", "filterBrowse"), section("profile", 3, "favorites", "favorite")]),
      page("marketplace", "Marketplace", "provider and offer matrix", [section("grid", 0, "listings", "filterBrowse"), section("map", 1), section("form", 2, "vendorOnboarding", "vendorOnboarding")]),
      page("details", "Detail", "offer detail with trust actions", [section("hero", 0), section("profile", 1, "reviews", "review"), section("form", 2, "contact", "contact")]),
      page("admin", "Vendor", "vendor mini dashboard", [section("dashboard", 0, "adminCrud", "adminCrud"), section("form", 1, "vendorOnboarding", "vendorOnboarding")])
    ],
    "dashboard-first": [
      page("dashboard", "Command", "first-screen operating dashboard", [section("dashboard", 0, "dashboard", "adminCrud"), section("stats", 1), section("feed", 2), section("admin", 3, "adminCrud", "adminCrud")]),
      page("home", "Launch", "product marketing shell around dashboard", [section("hero", 0), section("comparison", 1), section("pricing", 2)]),
      page("admin", "Admin", "CRUD control plane", [section("admin", 0, "adminCrud", "adminCrud"), section("form", 1, "contact", "contact"), section("timeline", 2)]),
      page("support", "Support", "support and feedback surface", [section("form", 0, "contact", "contact"), section("feed", 1, "reviews", "review")])
    ],
    "community-portal": [
      page("home", "Community", "announcement-led community hub", [section("hero", 0), section("community", 1, "events", "booking"), section("feed", 2, "contentPublishing", "adminCrud")]),
      page("events", "Events", "events and RSVP board", [section("calendar", 0, "events", "booking"), section("form", 1, "booking", "booking")]),
      page("members", "Members", "member directory and profile cards", [section("profile", 0, "memberPortal", "memberLogin"), section("form", 1, "reviews", "review")]),
      page("admin", "Admin", "community publishing console", [section("admin", 0, "adminCrud", "adminCrud"), section("form", 1, "contentPublishing", "adminCrud")])
    ],
    "service-portal": [
      page("home", "Services", "service triage with trust proof", [section("hero", 0), section("grid", 1, "quote", "quoteRequest"), section("stats", 2), section("form", 3, "contact", "contact")]),
      page("quote", "Quote", "scoped quote request flow", [section("wizard", 0, "quote", "quoteRequest"), section("form", 1, "contact", "contact")]),
      page("schedule", "Schedule", "job booking and status preview", [section("calendar", 0, "booking", "booking"), section("dashboard", 1, "dashboard", "adminCrud")]),
      page("support", "Support", "after-service support", [section("form", 0, "contact", "contact"), section("timeline", 1, "adminCrud", "adminCrud")])
    ],
    "content-portfolio": [
      page("home", "Work", "cinematic hero with selected work", [section("hero", 0), section("gallery", 1), section("timeline", 2), section("form", 3, "contact", "contact")]),
      page("portfolio", "Portfolio", "immersive case study gallery", [section("gallery", 0), section("comparison", 1), section("profile", 2, "reviews", "review")]),
      page("booking", "Inquiry", "creative booking inquiry", [section("form", 0, "booking", "booking"), section("calendar", 1, "booking", "booking")]),
      page("about", "Studio", "studio story and people", [section("editorial", 0), section("profile", 1), section("stats", 2)])
    ],
    "course-platform": [
      page("home", "Learn", "course catalog hero with progress cards", [section("hero", 0), section("grid", 1, "courseEnrollment", "courseEnrollment"), section("dashboard", 2, "memberPortal", "memberLogin")]),
      page("courses", "Courses", "filterable course catalog", [section("grid", 0, "courseEnrollment", "courseEnrollment"), section("form", 1, "filters", "filterBrowse")]),
      page("lessons", "Lessons", "lesson preview workspace", [section("lesson", 0, "courseEnrollment", "courseEnrollment"), section("dashboard", 1, "memberPortal", "profileUpdate")]),
      page("profile", "Student", "student dashboard and rewards", [section("profile", 0, "memberPortal", "memberLogin"), section("stats", 1, "rewards", "reward")])
    ],
    "restaurant-experience": [
      page("home", "Dining", "immersive menu and table journey", [section("hero", 0), section("editorial", 1, "reservations", "reservation"), section("gallery", 2), section("calendar", 3, "reservations", "reservation")]),
      page("menu", "Menu", "interactive tasting route", [section("grid", 0, "reservations", "reservation"), section("gallery", 1), section("comparison", 2)]),
      page("booking", "Reservations", "reservation drawer and hours", [section("calendar", 0, "reservations", "reservation"), section("form", 1, "contact", "contact")]),
      page("contact", "Visit", "map and private dining inquiry", [section("map", 0), section("form", 1, "contact", "contact")])
    ],
    "admin-command-center": [
      page("dashboard", "Ops", "dense operational command center", [section("dashboard", 0, "dashboard", "adminCrud"), section("admin", 1, "adminCrud", "adminCrud"), section("stats", 2)]),
      page("admin", "Admin", "data management console", [section("admin", 0, "adminCrud", "adminCrud"), section("form", 1, "contact", "contact")]),
      page("schedule", "Dispatch", "timeline dispatch board", [section("timeline", 0, "dashboard", "adminCrud"), section("map", 1)]),
      page("contact", "Support", "operator support inbox", [section("feed", 0, "contentPublishing", "adminCrud"), section("form", 1, "contact", "contact")])
    ],
    "map-first-finder": [
      page("home", "Map", "map-led discovery surface", [section("map", 0, "listings", "filterBrowse"), section("form", 1, "filters", "filterBrowse"), section("grid", 2, "favorites", "favorite")]),
      page("listings", "Listings", "listing grid with saved search", [section("grid", 0, "listings", "filterBrowse"), section("profile", 1, "reviews", "review")]),
      page("details", "Details", "detail drawer with booking", [section("hero", 0), section("form", 1, "booking", "booking")]),
      page("contact", "Contact", "agent or provider contact", [section("form", 0, "contact", "contact"), section("map", 1)])
    ],
    "step-wizard": [
      page("home", "Start", "guided wizard first screen", [section("hero", 0), section("wizard", 1, "quote", "quoteRequest"), section("stats", 2)]),
      page("quote", "Wizard", "multi-step quote funnel", [section("wizard", 0, "quote", "quoteRequest"), section("form", 1, "contact", "contact")]),
      page("pricing", "Estimate", "package and estimate comparison", [section("pricing", 0), section("comparison", 1)]),
      page("contact", "Finish", "confirmation and support", [section("form", 0, "contact", "contact"), section("timeline", 1)])
    ],
    "mobile-app-interface": [
      page("home", "App", "mobile app style home", [section("navigation", 0), section("feed", 1, "dashboard", "adminCrud"), section("grid", 2, "favorites", "favorite")]),
      page("profile", "Profile", "compact profile and rewards", [section("profile", 0, "memberPortal", "memberLogin"), section("stats", 1, "rewards", "reward")]),
      page("booking", "Action", "bottom-sheet booking action", [section("calendar", 0, "booking", "booking"), section("form", 1, "contact", "contact")]),
      page("support", "Support", "in-app support channel", [section("form", 0, "contact", "contact"), section("feed", 1)])
    ],
    "membership-platform": [
      page("home", "Membership", "membership value story", [section("hero", 0), section("pricing", 1), section("community", 2, "memberPortal", "memberLogin")]),
      page("members", "Members", "member portal preview", [section("profile", 0, "memberPortal", "memberLogin"), section("stats", 1, "rewards", "reward")]),
      page("events", "Events", "member events and schedule", [section("calendar", 0, "events", "booking"), section("form", 1, "booking", "booking")]),
      page("contact", "Contact", "membership support", [section("form", 0, "contact", "contact"), section("feed", 1, "reviews", "review")])
    ],
    "donation-platform": [
      page("home", "Mission", "campaign storytelling with donation", [section("hero", 0), section("timeline", 1), section("checkout", 2, "donations", "donation")]),
      page("donate", "Donate", "donation checkout", [section("pricing", 0, "donations", "donation"), section("checkout", 1, "donations", "donation")]),
      page("community", "Impact", "updates and member stories", [section("feed", 0, "contentPublishing", "adminCrud"), section("stats", 1)]),
      page("contact", "Volunteer", "volunteer and contact forms", [section("form", 0, "contact", "contact"), section("form", 1, "booking", "booking")])
    ],
    "lead-gen-funnel": [
      page("home", "Trust", "high-trust conversion narrative", [section("hero", 0), section("comparison", 1), section("form", 2, "quote", "quoteRequest")]),
      page("services", "Services", "proof-backed services", [section("grid", 0, "quote", "quoteRequest"), section("stats", 1), section("profile", 2, "reviews", "review")]),
      page("quote", "Request", "qualified lead form", [section("wizard", 0, "quote", "quoteRequest"), section("form", 1, "contact", "contact")]),
      page("contact", "Contact", "direct contact and FAQ", [section("form", 0, "contact", "contact"), section("map", 1)])
    ]
  };

  const base = templates[archetype];
  return base.map((pageDefinition, pageIndex) => ({
    ...pageDefinition,
    key: `${pageDefinition.key}-${variant.id}`,
    path: `/${pageDefinition.key}`,
    layoutIntent: `${pageDefinition.layoutIntent} for ${labelForIndustry(industry).toLowerCase()} with ${variant.angle}`,
    sections: pageDefinition.sections.map((item, itemIndex) => ({
      ...item,
      key: `${item.key}-${featureKeys[itemIndex % featureKeys.length] ?? "core"}`,
      variant: `${item.variant}-${variant.id}`
    }))
  }));
}

function page(key: string, title: string, layoutIntent: string, sections: BlueprintPageSection[]): BlueprintPageDefinition {
  return { key, title, path: `/${key}`, type: key, layoutIntent, sections };
}

export function createFeatureBundle(archetype: AppArchetype, industry: IndustryKey, variantIndex: number): BlueprintFeatureDefinition[] {
  const archetypeFeatures: Record<AppArchetype, FeatureKey[]> = {
    "booking-first": ["booking", "contact", "reviews", "schedule", "quote"],
    "commerce-store": ["cart", "checkout", "favorites", "filters", "reviews"],
    "marketplace-grid": ["listings", "filters", "favorites", "reviews", "vendorOnboarding"],
    "dashboard-first": ["dashboard", "adminCrud", "memberPortal", "contact", "reviews"],
    "community-portal": ["events", "memberPortal", "contentPublishing", "reviews", "contact"],
    "service-portal": ["quote", "booking", "dashboard", "contact", "reviews"],
    "content-portfolio": ["contact", "booking", "reviews", "contentPublishing", "favorites"],
    "course-platform": ["courseEnrollment", "memberPortal", "rewards", "reviews", "contact"],
    "restaurant-experience": ["reservations", "booking", "contact", "reviews", "events"],
    "admin-command-center": ["dashboard", "adminCrud", "contact", "memberPortal", "contentPublishing"],
    "map-first-finder": ["listings", "filters", "favorites", "booking", "contact"],
    "step-wizard": ["quote", "contact", "booking", "reviews", "adminCrud"],
    "mobile-app-interface": ["memberPortal", "rewards", "booking", "contact", "favorites"],
    "membership-platform": ["memberPortal", "rewards", "events", "checkout", "contact"],
    "donation-platform": ["donations", "events", "contact", "contentPublishing", "memberPortal"],
    "lead-gen-funnel": ["quote", "contact", "reviews", "booking", "contentPublishing"]
  };
  const industryExtras: Partial<Record<IndustryKey, FeatureKey[]>> = {
    restaurant: ["reservations", "events"],
    cafe: ["reservations", "rewards"],
    barbershop: ["booking", "schedule"],
    "beauty-salon": ["booking", "rewards"],
    "dental-clinic": ["booking", "contact"],
    "private-clinic": ["booking", "memberPortal"],
    gym: ["memberPortal", "schedule"],
    "personal-trainer": ["booking", "courseEnrollment"],
    mechanic: ["quote", "adminCrud"],
    "car-detailing": ["booking", "quote"],
    "real-estate": ["listings", "filters"],
    hotel: ["reservations", "booking"],
    photographer: ["booking", "favorites"],
    "ecommerce-fashion": ["cart", "checkout"],
    "ecommerce-electronics": ["cart", "checkout"],
    "ecommerce-furniture": ["cart", "checkout"],
    "online-course": ["courseEnrollment", "memberPortal"],
    nonprofit: ["donations", "events"],
    marketplace: ["vendorOnboarding", "listings"],
    delivery: ["dashboard", "memberPortal"]
  };
  const featureKeys = Array.from(new Set<FeatureKey>([...(industryExtras[industry] ?? []), ...archetypeFeatures[archetype], "contact"])).slice(0, 7);
  return featureKeys.map((key) => {
    const featureModule = featureModules[key];
    return {
      key,
      label: featureModule.label,
      description: `${featureModule.label} tuned for ${labelForIndustry(industry).toLowerCase()} variant ${variantIndex + 1}.`,
      dataModels: [...featureModule.dataModels],
      workflowKeys: [...featureModule.workflows] as BlueprintWorkflowKey[],
      interactionKeys: [...featureModule.interactions],
      mockedActions: featureModule.interactions.map((interaction) => interactionPatterns[interaction as InteractionKey].demoBackendAction)
    };
  });
}

export function createWorkflowSet(archetype: AppArchetype, features: BlueprintFeatureDefinition[]): BlueprintWorkflow[] {
  const keys = new Set<BlueprintWorkflowKey>();
  features.forEach((feature) => feature.workflowKeys.forEach((workflow) => keys.add(workflow)));
  keys.add(archetype === "commerce-store" ? "checkout" : "contact");
  keys.add(archetype === "dashboard-first" || archetype === "admin-command-center" ? "adminCrud" : "review");

  return Array.from(keys).slice(0, 6).map((key) => {
    const template = workflowTemplates[key];
    return {
      key,
      name: template.name,
      trigger: `User starts ${template.name.toLowerCase()}`,
      steps: [...template.steps],
      actions: [...template.actions],
      successState: `${template.name} confirmed locally`,
      failureState: `${template.name} validation error`
    };
  });
}

function createInteractions(features: BlueprintFeatureDefinition[], workflows: BlueprintWorkflow[]): BlueprintInteraction[] {
  const workflowKeys = new Set(workflows.map((workflow) => workflow.key));
  const keys = Array.from(new Set(features.flatMap((feature) => feature.interactionKeys).concat("switchPage"))).slice(0, 8);
  return keys.map((key) => {
    const pattern = interactionPatterns[key as InteractionKey] ?? interactionPatterns.switchPage;
    const workflowKey = features.flatMap((feature) => feature.workflowKeys).find((candidate) => workflowKeys.has(candidate));
    return {
      key,
      label: key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase()),
      event: pattern.event,
      action: key,
      workflowKey,
      demoBackendAction: pattern.demoBackendAction
    };
  });
}

function createDataModels(features: BlueprintFeatureDefinition[]): BlueprintDataModel[] {
  const modelKeys = Array.from(new Set(features.flatMap((feature) => feature.dataModels))) as DataModelKey[];
  return modelKeys.map((key) => {
    const template = dataModelTemplates[key];
    return {
      key,
      label: template.label,
      fields: template.fields.map((field) => {
        const [fieldKey, type] = field.split(":") as [string, BlueprintDataModel["fields"][number]["type"]];
        return { key: fieldKey, type, required: true };
      }),
      seedCount: 3
    };
  });
}

function createRoles(archetype: AppArchetype, industry: IndustryKey): BlueprintRole[] {
  const base = new Set<BlueprintRole>(["visitor", "customer", "owner", "admin"]);
  if (["marketplace-grid", "map-first-finder"].includes(archetype)) base.add("vendor");
  if (["community-portal", "membership-platform", "donation-platform"].includes(archetype)) base.add("member");
  if (archetype === "course-platform" || industry === "online-course" || industry === "school") base.add("student");
  if (["logistics", "delivery"].includes(industry)) base.add("driver");
  if (industry === "real-estate") base.add("agent");
  if (["service-portal", "booking-first"].includes(archetype)) base.add("staff");
  return Array.from(base);
}

export function createVisualDNA(industry: IndustryKey, variant: BlueprintVariant, variantIndex: number): BlueprintVisualDNA {
  const preset = visualDNAPresets[variant.preset];
  const palette = paletteByIndustry[industry];
  return {
    preset: variant.preset,
    layoutPattern: `${variant.preset} ${variant.id} ${labelForIndustry(industry).toLowerCase()}`,
    heroComposition: `${variant.angle} with ${variant.preset} hero composition`,
    navigationModel: variantIndex % 3 === 0 ? "floating glass rail" : variantIndex % 3 === 1 ? "contextual side dock" : "compact command tabs",
    sectionRhythm: variantIndex % 3 === 0 ? "cinematic full-height beats" : variantIndex % 3 === 1 ? "alternating editorial panels" : "dense operational modules",
    density: variant.densityShift,
    colorMode: preset.colorMode,
    palette,
    typography: variantIndex % 2 === 0 ? "sharp grotesk with editorial display" : "calm sans with high-trust labels",
    motion: preset.motion,
    cardShape: variantIndex % 2 === 0 ? "asymmetric soft glass panes" : "pill controls with layered slabs",
    texture: `${labelForIndustry(industry).toLowerCase()} ambient texture with subtle noise`,
    signature: `${slug(industry)}:${variant.id}:${variant.preset}:${variant.densityShift}`
  };
}

function createSeedData(industry: IndustryKey, models: BlueprintDataModel[]) {
  return Object.fromEntries(models.map((model) => [
    model.key,
    Array.from({ length: 3 }, (_, index) => seedItem(industry, model, index))
  ]));
}

function seedItem(industry: IndustryKey, model: BlueprintDataModel, index: number): Record<string, unknown> {
  const label = labelForIndustry(industry);
  return Object.fromEntries(model.fields.map((field) => {
    const value = (() => {
      if (field.type === "currency") return 49 + index * 120;
      if (field.type === "number") return index + 1;
      if (field.type === "boolean") return index % 2 === 0;
      if (field.type === "date") return `2026-0${(index % 8) + 1}-1${index}`;
      if (field.type === "datetime") return `2026-0${(index % 8) + 1}-1${index}T10:00:00.000Z`;
      if (field.type === "email") return `demo${index + 1}@${slug(industry)}.local`;
      if (field.type === "phone") return `+46 70 000 00 0${index + 1}`;
      if (field.type === "image") return `${slug(industry)}-image-${index + 1}`;
      if (field.type === "enum") return index === 0 ? "new" : index === 1 ? "confirmed" : "archived";
      if (field.type === "relation") return `${model.key}-rel-${index + 1}`;
      return `${label} ${field.key} ${index + 1}`;
    })();
    return [field.key, value];
  }));
}

export const generatedBlueprints: BlueprintDefinition[] = industries.flatMap((industry) =>
  createIndustryBlueprints(industry.key, createVariants(industry.key))
);
