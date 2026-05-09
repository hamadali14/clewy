import { defaultTheme, styleAccents } from "./blueprint-contracts";
import type { BlueprintDefinition, ProjectSchema, SectionKind, UserIntent } from "./types";

const copyByNiche = {
  dental: {
    name: "Aurelia Dental Studio",
    heroTitle: "Premium dental care shaped around calm, confident visits",
    subtitle: "Modern treatment plans, transparent pricing, and same-week appointments in a refined clinic experience.",
    cta: "Book an appointment"
  },
  restaurant: {
    name: "Noma Vale Kitchen",
    heroTitle: "Seasonal dining with atmosphere from the first glance",
    subtitle: "A modern restaurant site for reservations, menus, signature dishes, and warm local discovery.",
    cta: "Reserve a table"
  },
  saas: {
    name: "Vectorlane",
    heroTitle: "Launch a sharper product story in minutes",
    subtitle: "A structured SaaS landing page with proof, pricing, features, and conversion-ready calls to action.",
    cta: "Start free"
  },
  gym: {
    name: "Pulse Form Studio",
    heroTitle: "Training programs that feel personal from day one",
    subtitle: "Showcase classes, memberships, coaches, and trial sessions with a high-energy premium web presence.",
    cta: "Book a trial"
  },
  "real-estate": {
    name: "Northline Estates",
    heroTitle: "Curated homes, confident moves, and market clarity",
    subtitle: "A luxury real estate showcase for listings, agent trust, viewing requests, and neighborhood insight.",
    cta: "Schedule a viewing"
  },
  consultant: {
    name: "Arden Strategy",
    heroTitle: "Sharper strategy for teams ready to move with focus",
    subtitle: "A refined consulting presence built for authority, offers, outcomes, and qualified calls.",
    cta: "Book a strategy call"
  },
  general: {
    name: "Blueprint Studio",
    heroTitle: "A polished web presence generated from a reliable blueprint",
    subtitle: "Structured sections, consistent design, and deterministic refinement for your next launch.",
    cta: "Start building"
  }
};

const sectionContent = (kind: SectionKind, niche: keyof typeof copyByNiche) => {
  const copy = copyByNiche[niche];
  const commonItems = {
    dental: ["Cosmetic dentistry", "Preventive care", "Implants"],
    restaurant: ["Chef tasting menu", "Private dining", "Weekend brunch"],
    saas: ["Automated workflows", "Realtime analytics", "Team permissions"],
    gym: ["Strength training", "Mobility classes", "Personal coaching"],
    "real-estate": ["Luxury listings", "Buyer advisory", "Market valuation"],
    consultant: ["Growth strategy", "Operating cadence", "Executive advisory"],
    general: ["Discovery", "Design system", "Launch support"]
  }[niche];

  switch (kind) {
    case "hero":
      return { title: copy.heroTitle, subtitle: copy.subtitle, cta: copy.cta, eyebrow: copy.name, compact: false };
    case "services":
    case "features":
      return { title: kind === "services" ? "Signature services" : "Built for conversion", items: commonItems };
    case "pricing":
      return { title: "Simple packages", plans: ["Essential", "Growth", "Premier"] };
    case "testimonials":
      return { title: "Trusted by exacting clients", quotes: ["The experience felt polished from the first interaction.", "Everything was clear, fast, and beautifully presented."] };
    case "faq":
      return { title: "Questions, answered", items: ["How fast can we launch?", "Can we refine the content?", "Is the design responsive?"] };
    case "contact":
      return { title: "Start the conversation", detail: "Open weekdays with flexible consultation slots." };
    case "booking":
      return { title: "Reserve your preferred time", detail: "Choose a slot and receive a clear deterministic confirmation flow." };
    case "gallery":
      return { title: "Selected highlights", items: commonItems };
    case "stats":
      return { title: "Proof in motion", stats: ["42% lift", "7 day launch", "98% clarity"] };
    case "cta":
      return { title: "Ready to see the first version?", cta: copy.cta };
    default:
      return {};
  }
};

export function generateProjectSchema(intent: UserIntent, blueprint: BlueprintDefinition): ProjectSchema {
  const niche = intent.niche === "general" ? blueprint.niche : intent.niche;
  const copy = copyByNiche[niche];
  const primaryStyle = intent.style[0] ?? blueprint.styleTags[0] ?? "premium";
  const accent = blueprint.preview.accent || styleAccents[primaryStyle] || defaultTheme.accent;
  const now = new Date().toISOString();

  return {
    id: `project-${blueprint.key}`,
    name: copy.name,
    blueprintKey: blueprint.key,
    niche,
    intent,
    theme: {
      ...defaultTheme,
      style: primaryStyle,
      accent,
      mode: primaryStyle === "minimal" ? "light" : "dark"
    },
    pages: blueprint.pages.map((page, pageIndex) => ({
      id: `page-${page.type}`,
      type: page.type,
      title: page.label,
      path: pageIndex === 0 ? "/" : `/${page.type}`,
      sections: page.sections.map((section, order) => ({
        id: `${page.type}-${section.kind}-${order + 1}`,
        kind: section.kind,
        label: section.label,
        visible: section.required || intent.requiredFeatures.includes(section.kind),
        theme: {},
        data: sectionContent(section.kind, niche),
        order
      }))
    })),
    createdAt: now,
    updatedAt: now
  };
}
