import { getBlueprintContent } from "@/blueprints";
import { defaultTheme, styleAccents } from "./blueprint-contracts";
import type { BlueprintDefinition, ProjectSchema, SectionKind, UserIntent } from "./types";

function fallbackSection(kind: SectionKind) {
  return {
    title: kind.replace(/([A-Z])/g, " $1").replace(/^./, (value) => value.toUpperCase()),
    items: ["Premium layout", "Interactive state", "Conversion-ready content"]
  };
}

function sectionContent(kind: SectionKind, blueprint: BlueprintDefinition) {
  const content = getBlueprintContent(blueprint.key);
  const specific = content.sections[kind] ?? {};
  const shared: Partial<Record<SectionKind, Record<string, unknown>>> = {
    hero: {
      title: content.headline,
      subtitle: content.subheadline,
      eyebrow: content.eyebrow,
      cta: content.cta,
      secondaryCta: content.secondaryCta,
      visual: content.heroVisual,
      compact: false
    },
    cta: {
      title: `Ready to build with ${content.name}?`,
      cta: content.cta,
      secondaryCta: content.secondaryCta
    },
    booking: {
      title: "Book a preferred time",
      detail: "Interactive booking mock with service, date, contact details, and conversion-ready CTA.",
      fields: ["Name", "Email", "Preferred date", "Service"]
    },
    contact: {
      title: "Start the conversation",
      detail: "Contact form, response expectation, address, and operational notes.",
      fields: ["Name", "Email", "Message"]
    },
    pricing: {
      title: "Packages and pricing",
      plans: ["Essential", "Signature", "Premier"]
    },
    testimonials: {
      title: "What clients say",
      quotes: ["The experience felt premium from the first touch.", "Clear, beautiful, and easy to act on."]
    },
    faq: {
      title: "Questions, answered",
      items: ["How do bookings work?", "Can the content be refined?", "Is this mobile responsive?"]
    },
    stats: {
      title: "Proof in motion",
      stats: ["94% match score", "6 page system", "Live preview"]
    },
    gallery: {
      title: "Selected visuals",
      items: ["Hero moment", "Detail image", "Editorial scene", "Conversion panel"]
    },
    services: {
      title: "Signature services",
      items: ["Discovery", "Premium delivery", "Ongoing refinement"]
    },
    features: {
      title: "Built for conversion",
      items: ["Fast scanning", "Trust signals", "Clear next step"]
    }
  } satisfies Partial<Record<SectionKind, Record<string, unknown>>>;

  return {
    ...(shared[kind] ?? fallbackSection(kind)),
    ...specific
  };
}

export function generateProjectSchema(intent: UserIntent, blueprint: BlueprintDefinition): ProjectSchema {
  const content = getBlueprintContent(blueprint.key);
  const primaryStyle = intent.style.find((style) => blueprint.styleTags.includes(style)) ?? blueprint.styleTags[0] ?? "premium";
  const now = new Date().toISOString();

  return {
    id: `project-${blueprint.key}`,
    name: content.name,
    blueprintKey: blueprint.key,
    niche: blueprint.niche,
    intent,
    theme: {
      ...defaultTheme,
      mode: content.palette.mode,
      style: primaryStyle,
      accent: content.palette.accent || styleAccents[primaryStyle] || defaultTheme.accent,
      secondary: content.palette.secondary,
      surface: content.palette.surface,
      fontFeel: content.palette.fontFeel,
      density: blueprint.preview.visualIdentity?.includes("spacious") ? "spacious" : "balanced"
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
        visible: true,
        theme: {},
        data: {
          ...sectionContent(section.kind, blueprint),
          ...(section.defaultData ?? {})
        },
        order
      }))
    })),
    metadata: {
      visualIdentity: blueprint.preview.visualIdentity,
      suggestedRefinements: content.suggestedRefinements,
      missingDetails: content.missingDetails
    },
    createdAt: now,
    updatedAt: now
  };
}
