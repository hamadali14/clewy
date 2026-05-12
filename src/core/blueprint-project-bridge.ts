import { assembleBlueprint } from "./blueprint-assembler";
import { getBlueprint, listBlueprints } from "./blueprint-catalog";
import type { BlueprintDefinition as GeneratedBlueprintDefinition, IndustryKey } from "./blueprint-types";
import type {
  BlueprintDefinition as LegacyBlueprintDefinition,
  MatchResult,
  Niche,
  PageSchema,
  PageType,
  ProjectSchema,
  SectionKind,
  SectionNode,
  StyleToken,
  UserIntent,
  ValidationResult
} from "./types";
import { normalizeSchema } from "./schema-normalizer";
import { validateSchema } from "./schema-validator";

const industryToNiche: Record<IndustryKey, Niche> = {
  restaurant: "restaurant",
  cafe: "coffee",
  barbershop: "barbershop",
  "beauty-salon": "beauty",
  "dental-clinic": "dental",
  "private-clinic": "dental",
  gym: "gym",
  "personal-trainer": "gym",
  mechanic: "auto",
  "car-detailing": "auto",
  construction: "consultant",
  electrician: "consultant",
  plumber: "consultant",
  "cleaning-company": "consultant",
  "real-estate": "real-estate",
  hotel: "hotel",
  "event-agency": "wedding",
  photographer: "photography",
  "ecommerce-fashion": "fashion",
  "ecommerce-electronics": "saas",
  "ecommerce-furniture": "interior",
  "online-course": "education",
  coaching: "consultant",
  "law-firm": "law",
  accounting: "consultant",
  childcare: "education",
  school: "education",
  nonprofit: "general",
  "mosque-community": "general",
  coworking: "agency",
  "SaaS-dashboard": "saas",
  "AI-agency": "agency",
  logistics: "saas",
  delivery: "saas",
  marketplace: "saas",
  "repair-service": "consultant",
  "pet-care": "pet",
  "travel-agency": "travel",
  "wedding-service": "wedding",
  "portfolio-studio": "portfolio"
};

const pageTypeMap: Record<string, PageType> = {
  home: "home",
  booking: "booking",
  menu: "menu",
  shop: "pricing",
  products: "services",
  cart: "pricing",
  checkout: "pricing",
  dashboard: "student-dashboard",
  admin: "services",
  marketplace: "listings",
  listings: "listings",
  details: "property-detail",
  services: "services",
  pricing: "pricing",
  portfolio: "portfolio",
  gallery: "gallery",
  "case-studies": "portfolio",
  events: "schedule",
  community: "about",
  members: "team",
  courses: "courses",
  lessons: "course-detail",
  profile: "team",
  contact: "contact",
  about: "about",
  map: "contact",
  donate: "pricing",
  quote: "consultation",
  schedule: "schedule",
  support: "contact"
};

function sectionKindFor(kind: string, featureKey?: string): SectionKind {
  if (kind === "hero") return "hero";
  if (kind === "map") return "map";
  if (kind === "calendar") return featureKey === "events" ? "schedule" : "booking";
  if (kind === "checkout") return "checkout";
  if (kind === "dashboard" || kind === "admin") return "dashboard";
  if (kind === "gallery") return "gallery";
  if (kind === "timeline") return "timeline";
  if (kind === "pricing") return "pricing";
  if (kind === "profile") return "profiles";
  if (kind === "lesson") return "courses";
  if (kind === "feed") return "testimonials";
  if (kind === "form") return featureKey === "contact" ? "contact" : featureKey === "quote" ? "valuation" : "booking";
  if (kind === "wizard") return featureKey === "quote" ? "valuation" : "booking";
  if (kind === "grid") {
    if (featureKey === "cart" || featureKey === "checkout") return "products";
    if (featureKey === "courseEnrollment") return "courses";
    if (featureKey === "listings" || featureKey === "filters") return "listings";
    return "features";
  }
  if (kind === "editorial") return "story";
  if (kind === "stats") return "stats";
  if (kind === "comparison" || kind === "navigation" || kind === "community") return "features";
  return "features";
}

function styleFor(blueprint: GeneratedBlueprintDefinition): StyleToken {
  if (blueprint.visualDNA.preset.includes("luxury")) return "luxury";
  if (blueprint.visualDNA.colorMode === "dark") return "dark";
  if (blueprint.visualDNA.density === "airy") return "minimal";
  return "premium";
}

function intentFromBlueprint(blueprint: GeneratedBlueprintDefinition, prompt: string): UserIntent {
  const style = styleFor(blueprint);
  return {
    niche: industryToNiche[blueprint.industry],
    businessType: blueprint.name,
    goal: blueprint.description,
    requiredFeatures: blueprint.features.map((feature) => feature.key),
    style: [style, "modern"].filter((item, index, items) => items.indexOf(item) === index) as StyleToken[],
    pages: blueprint.pages.map((page) => pageTypeMap[page.type] ?? "home").filter((page, index, pages) => pages.indexOf(page) === index),
    confidence: 0.97,
    keywords: [blueprint.industry, blueprint.archetype, ...blueprint.features.map((feature) => feature.key)],
    rawPrompt: prompt || blueprint.description
  };
}

function labelFromKey(value: string) {
  return value
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function seedItems(seed: Array<Record<string, unknown>>) {
  if (!seed.length) return ["Primary moment", "Conversion state", "Trust proof"];
  return seed.map((item, index) => String(item.title ?? item.name ?? item.email ?? item.status ?? item.category ?? `Item ${index + 1}`));
}

function sectionData(blueprint: GeneratedBlueprintDefinition, section: ReturnType<typeof assembleBlueprint>["pages"][number]["nodes"][number], pageTitle: string) {
  const items = seedItems(section.seed);
  const cta = section.interactionKeys[0] ? labelFromKey(section.interactionKeys[0]) : "Start action";
  const base = {
    title: section.kind === "hero" ? blueprint.name : section.title,
    subtitle: section.kind === "hero" ? blueprint.description : section.copy,
    detail: section.copy,
    eyebrow: `${blueprint.industry} / ${blueprint.archetype}`,
    cta,
    visual: blueprint.visualDNA.heroComposition,
    items,
    metrics: items,
    stats: items,
    quotes: items.map((item) => `${item} works as a local interactive proof point.`),
    fields: ["Name", "Email", "Phone", "Preferred date", "Message"],
    plans: items.map((item, index) => ({ name: item, price: `$${(index + 1) * 99}`, detail: `${pageTitle} package` })),
    sourceFeature: section.featureKey,
    sourceWorkflow: section.workflowKey,
    sourceInteractions: section.interactionKeys,
    visualDNA: blueprint.visualDNA
  };

  if (section.kind === "checkout" || section.featureKey === "cart") {
    return {
      ...base,
      products: items.map((item, index) => ({ name: item, price: `$${(index + 1) * 79}`, category: blueprint.industry }))
    };
  }

  return base;
}

function pagesFromGeneratedBlueprint(blueprint: GeneratedBlueprintDefinition): PageSchema[] {
  const assembled = assembleBlueprint(blueprint);
  return assembled.pages.map((page, pageIndex) => ({
    id: `page-${page.key}`,
    type: pageTypeMap[page.type] ?? "home",
    title: page.title,
    path: pageIndex === 0 ? "/" : page.path,
    sections: page.nodes.map<SectionNode>((node, order) => ({
      id: `${page.key}-${sectionKindFor(node.kind, node.featureKey)}-${order + 1}`,
      kind: sectionKindFor(node.kind, node.featureKey),
      label: node.title,
      visible: true,
      theme: {},
      data: sectionData(blueprint, node, page.title),
      order
    }))
  }));
}

function legacyBlueprint(blueprint: GeneratedBlueprintDefinition): LegacyBlueprintDefinition {
  const pages = pagesFromGeneratedBlueprint(blueprint);
  return {
    key: blueprint.key,
    label: blueprint.name,
    niche: industryToNiche[blueprint.industry],
    supportedFeatures: blueprint.features.map((feature) => feature.key),
    styleTags: [styleFor(blueprint), "modern"],
    pages: pages.map((page) => ({
      type: page.type,
      label: page.title,
      sections: page.sections.map((section, index) => ({
        kind: section.kind,
        label: section.label,
        required: index < 4,
        defaultData: section.data
      }))
    })),
    requiredSections: pages[0]?.sections.slice(0, 4).map((section) => section.kind) ?? ["hero", "features", "contact"],
    optionalSections: pages[0]?.sections.slice(4).map((section) => section.kind) ?? [],
    scoreKeywords: [blueprint.industry, blueprint.archetype, ...blueprint.features.map((feature) => feature.key)],
    preview: {
      title: blueprint.name,
      description: blueprint.description,
      accent: blueprint.visualDNA.palette[1] ?? "#5eead4",
      palette: blueprint.visualDNA.palette,
      complexity: "advanced",
      visualIdentity: blueprint.visualDNA.signature
    }
  };
}

function matchResult(blueprint: GeneratedBlueprintDefinition, prompt: string): MatchResult {
  const legacy = legacyBlueprint(blueprint);
  const alternatives = listBlueprints()
    .filter((candidate) => candidate.key !== blueprint.key && (candidate.industry === blueprint.industry || candidate.archetype === blueprint.archetype))
    .slice(0, 3)
    .map((candidate, index) => ({
      blueprint: legacyBlueprint(candidate),
      score: 88 - index * 4,
      reasons: [`Related ${candidate.industry} / ${candidate.archetype} blueprint`]
    }));

  return {
    bestBlueprint: legacy,
    score: 98,
    reasons: [
      `Selected 100-catalog blueprint: ${blueprint.key}`,
      `Industry: ${blueprint.industry}`,
      `Archetype: ${blueprint.archetype}`,
      prompt ? "Prompt was applied as customer direction" : "Opened directly from blueprint catalog"
    ],
    missingDetails: ["Brand name", "Location", "Offer details"],
    suggestedRefinements: ["Make hero more direct", "Add stronger proof", "Tune the palette", "Add testimonials"],
    alternatives
  };
}

function scoreBlueprint(prompt: string, blueprint: GeneratedBlueprintDefinition) {
  const text = prompt.toLowerCase();
  const industryWords = blueprint.industry.toLowerCase().split(/[-_]/);
  const nameWords = blueprint.name.toLowerCase().split(/[^a-z0-9]+/);
  const featureWords = blueprint.features.flatMap((feature) => [feature.key, feature.label]).join(" ").toLowerCase().split(/[^a-z0-9]+/);
  let score = 0;

  if (text.includes(blueprint.key.toLowerCase())) score += 1000;
  if (text.includes(blueprint.industry.toLowerCase())) score += 160;
  industryWords.forEach((word) => {
    if (word.length > 2 && text.includes(word)) score += 45;
  });
  nameWords.forEach((word) => {
    if (word.length > 4 && text.includes(word)) score += 12;
  });
  featureWords.forEach((word) => {
    if (word.length > 3 && text.includes(word)) score += 8;
  });
  if (text.includes(blueprint.archetype.toLowerCase())) score += 80;
  if (text.includes("booking") && blueprint.features.some((feature) => feature.workflowKeys.includes("booking"))) score += 60;
  if (text.includes("shop") || text.includes("ecommerce") || text.includes("store")) {
    if (blueprint.archetype === "commerce-store") score += 80;
  }
  if (text.includes("dashboard") && blueprint.archetype === "dashboard-first") score += 80;
  if (text.includes("marketplace") && blueprint.archetype === "marketplace-grid") score += 80;
  return score;
}

export function matchGeneratedBlueprintFromPrompt(prompt: string) {
  const normalized = prompt.trim();
  if (!normalized) return getBlueprint("SaaS-dashboard-flagship") ?? listBlueprints()[0];
  return [...listBlueprints()].sort((a, b) => scoreBlueprint(normalized, b) - scoreBlueprint(normalized, a))[0];
}

export function createProjectFromGeneratedBlueprint(blueprint: GeneratedBlueprintDefinition, prompt = ""): {
  intent: UserIntent;
  match: MatchResult;
  schema: ProjectSchema;
  validation: ValidationResult;
} {
  const now = new Date().toISOString();
  const style = styleFor(blueprint);
  const schema = normalizeSchema({
    id: `project-${blueprint.key}`,
    name: blueprint.name,
    blueprintKey: blueprint.key,
    niche: industryToNiche[blueprint.industry],
    intent: intentFromBlueprint(blueprint, prompt),
    theme: {
      mode: blueprint.visualDNA.colorMode === "light" ? "light" : "dark",
      style,
      accent: blueprint.visualDNA.palette[1] ?? "#5eead4",
      secondary: blueprint.visualDNA.palette[2],
      surface: blueprint.visualDNA.palette[0],
      fontFeel: blueprint.visualDNA.typography.includes("editorial") ? "editorial" : blueprint.visualDNA.typography.includes("trust") ? "authority" : "tech",
      radius: blueprint.visualDNA.cardShape.includes("pill") ? "pill" : "round",
      density: blueprint.visualDNA.density === "dense" ? "compact" : blueprint.visualDNA.density === "airy" || blueprint.visualDNA.density === "cinematic" ? "spacious" : "balanced"
    },
    pages: pagesFromGeneratedBlueprint(blueprint),
    metadata: {
      generatedBlueprintKey: blueprint.key,
      archetype: blueprint.archetype,
      visualIdentity: blueprint.visualDNA.signature,
      visualDNA: blueprint.visualDNA,
      qualityScoreTarget: blueprint.qualityScoreTarget,
      suggestedRefinements: ["Make it more premium", "Add reviews", "Change CTA text", "Add booking"],
      missingDetails: ["Brand name", "Location", "Primary offer"]
    },
    createdAt: now,
    updatedAt: now
  });

  return {
    intent: schema.intent,
    match: matchResult(blueprint, prompt),
    schema,
    validation: validateSchema(schema)
  };
}

export function createProjectFromGeneratedBlueprintKey(key: string, prompt = "") {
  const blueprint = getBlueprint(key);
  return blueprint ? createProjectFromGeneratedBlueprint(blueprint, prompt) : null;
}
