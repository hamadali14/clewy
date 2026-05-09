import { styleAccents } from "./blueprint-contracts";
import { addSection, removeSection, updateSection, updateTheme } from "./schema-diff";
import type { ProjectSchema, SectionKind, SectionNode, StyleToken } from "./types";

function firstPage(schema: ProjectSchema) {
  return schema.pages[0];
}

function newSection(kind: SectionKind, order: number): SectionNode {
  const labels: Record<SectionKind, string> = {
    hero: "Hero",
    services: "Services",
    features: "Features",
    pricing: "Pricing",
    testimonials: "Testimonials",
    faq: "FAQ",
    contact: "Contact",
    booking: "Booking",
    gallery: "Gallery",
    stats: "Stats",
    cta: "CTA"
  };

  return {
    id: `landing-${kind}-${Date.now()}`,
    kind,
    label: labels[kind],
    visible: true,
    theme: {},
    data: {
      title: labels[kind] === "FAQ" ? "Questions, answered" : `${labels[kind]} section`,
      items: ["Clear structure", "Premium presentation", "Deterministic update"]
    },
    order
  };
}

function ensureSection(schema: ProjectSchema, kind: SectionKind) {
  const page = firstPage(schema);
  const existing = page.sections.find((section) => section.kind === kind);
  if (existing) {
    return updateSection(schema, page.id, existing.id, { visible: true });
  }
  return addSection(schema, page.id, newSection(kind, page.sections.length));
}

function removeByKind(schema: ProjectSchema, kind: SectionKind) {
  const page = firstPage(schema);
  const section = page.sections.find((candidate) => candidate.kind === kind);
  return section ? removeSection(schema, page.id, section.id) : schema;
}

function setStyle(schema: ProjectSchema, style: StyleToken, mode = schema.theme.mode) {
  return updateTheme(schema, { style, mode, accent: styleAccents[style] ?? schema.theme.accent });
}

export function refineProject(command: string, schema: ProjectSchema): { schema: ProjectSchema; explanation: string } {
  const text = command.toLowerCase();
  let next = schema;
  let explanation = "Kept the structure stable and applied a safe content-level refinement.";

  if (text.includes("premium") || text.includes("luxury")) {
    next = setStyle(schema, text.includes("luxury") ? "luxury" : "premium");
    explanation = "Shifted the visual system toward a more premium presentation.";
  }

  if (text.includes("minimal")) {
    next = setStyle(next, "minimal", "light");
    explanation = "Reduced visual density and moved the theme toward a minimal light system.";
  }

  if (text.includes("dark")) {
    next = updateTheme(next, { mode: "dark", style: "dark", accent: styleAccents.dark });
    explanation = "Enabled dark premium mode across the preview.";
  }

  const colorMatch = text.match(/(?:color|accent)\s+(?:to\s+)?(blue|teal|green|purple|gold|pink|red)/);
  if (colorMatch) {
    const colors: Record<string, string> = {
      blue: "#60a5fa",
      teal: "#5eead4",
      green: "#86efac",
      purple: "#a78bfa",
      gold: "#f5c76b",
      pink: "#fb7185",
      red: "#f87171"
    };
    next = updateTheme(next, { accent: colors[colorMatch[1]] });
    explanation = `Changed the accent color to ${colorMatch[1]}.`;
  }

  if (text.includes("add testimonials")) {
    next = ensureSection(next, "testimonials");
    explanation = "Added a testimonials section to strengthen social proof.";
  }
  if (text.includes("remove testimonials")) {
    next = removeByKind(next, "testimonials");
    explanation = "Removed the testimonials section while preserving section order.";
  }
  if (text.includes("add pricing")) {
    next = ensureSection(next, "pricing");
    explanation = "Added a pricing section with structured plan content.";
  }
  if (text.includes("remove pricing")) {
    next = removeByKind(next, "pricing");
    explanation = "Removed pricing from the active page schema.";
  }
  if (text.includes("add faq")) {
    next = ensureSection(next, "faq");
    explanation = "Added an FAQ section for objection handling.";
  }

  if (text.includes("hero shorter") || text.includes("shorter hero")) {
    const page = firstPage(next);
    const hero = page.sections.find((section) => section.kind === "hero");
    if (hero) {
      next = updateSection(next, page.id, hero.id, { data: { ...hero.data, compact: true } });
      explanation = "Made the hero more compact.";
    }
  }

  if (text.includes("hero more direct") || text.includes("more direct")) {
    const page = firstPage(next);
    const hero = page.sections.find((section) => section.kind === "hero");
    if (hero) {
      next = updateSection(next, page.id, hero.id, {
        data: { ...hero.data, title: "Launch a polished site from a proven blueprint", subtitle: "Clear structure, premium design, and safe refinements without code roulette." }
      });
      explanation = "Rewrote the hero to be more direct.";
    }
  }

  const ctaMatch = command.match(/change cta text(?: to)? ["']?([^"']+)["']?/i);
  if (ctaMatch?.[1]) {
    const page = firstPage(next);
    const ctaSections = page.sections.filter((section) => section.kind === "cta" || section.kind === "hero");
    ctaSections.forEach((section) => {
      next = updateSection(next, page.id, section.id, { data: { ...section.data, cta: ctaMatch[1].trim() } });
    });
    explanation = `Updated CTA text to "${ctaMatch[1].trim()}".`;
  }

  return { schema: next, explanation };
}
