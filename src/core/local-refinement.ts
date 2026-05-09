import type { ProjectSchema, SectionKind, SectionNode } from "./types";
import type { RefinementPatchOperation, RefinementPatchResponse } from "./refinement-patch-schema";

function firstPage(schema: ProjectSchema) {
  return schema.pages[0];
}

function byKind(schema: ProjectSchema, kind: SectionKind) {
  return firstPage(schema).sections.find((section) => section.kind === kind);
}

function section(kind: SectionKind, label: string, order: number, data: Record<string, unknown>): SectionNode {
  return {
    id: `${kind}-${Date.now()}`,
    kind,
    label,
    visible: true,
    theme: {},
    data,
    order
  };
}

export function createLocalRefinementPatches(command: string, schema: ProjectSchema): RefinementPatchResponse {
  const text = command.toLowerCase();
  const page = firstPage(schema);
  const patches: RefinementPatchOperation[] = [];
  let explanation = "Applied a deterministic local refinement.";

  const hero = byKind(schema, "hero");
  const cta = page.sections.find((item) => item.kind === "hero" || item.kind === "cta");
  const pricing = byKind(schema, "pricing") ?? byKind(schema, "packages");
  const booking = byKind(schema, "booking");

  const titleMatch = command.match(/(?:add|change|set|update).{0,20}title(?:\s+to)?\s+(.+)/i);
  if (titleMatch && hero) {
    patches.push({ op: "update_text", pageId: page.id, sectionId: hero.id, path: "data.title", value: titleMatch[1].trim() });
    explanation = "Updated the main hero title.";
  }

  const ctaMatch = command.match(/(?:button|cta).{0,20}(?:text\s*)?(?:to)?\s+(.+)/i);
  if (ctaMatch && cta) {
    patches.push({ op: "update_text", pageId: page.id, sectionId: cta.id, path: "data.cta", value: ctaMatch[1].trim() });
    explanation = "Updated the primary button text.";
  }

  const priceMatch = command.match(/add\s+(?:price\s+)?package\s+(.+?)\s+(?:for\s+)?(\$?\d+[0-9,.]*\$?)/i);
  if (priceMatch && pricing) {
    patches.push({
      op: "add_array_item",
      pageId: page.id,
      sectionId: pricing.id,
      path: "data.plans",
      item: { name: priceMatch[1].trim(), price: priceMatch[2].trim(), detail: "Added from chat refinement" }
    });
    explanation = "Added a new visible pricing package.";
  }

  if (text.includes("booking form shorter") || text.includes("make booking form shorter")) {
    if (booking) {
      patches.push({ op: "update_text", pageId: page.id, sectionId: booking.id, path: "data.fields", value: "Name, Phone, Date" });
      patches.push({ op: "set_component_variant", pageId: page.id, sectionId: booking.id, variant: "compact" });
      explanation = "Made the booking form shorter.";
    }
  }

  if (text.includes("add testimonials") || text.includes("add reviews")) {
    if (!byKind(schema, "testimonials")) {
      patches.push({
        op: "add_section",
        pageId: page.id,
        afterSectionId: hero?.id,
        section: section("testimonials", "Client proof", page.sections.length, {
          title: "People already trust this experience",
          quotes: ["The booking felt effortless.", "The first impression was premium and clear."]
        })
      });
    }
    explanation = "Added a testimonials section.";
  }

  if (text.includes("luxury") || text.includes("premium")) {
    patches.push({ op: "update_theme", path: "theme.style", value: "luxury" });
    patches.push({ op: "update_theme", path: "theme.accent", value: "#d6b46a" });
    patches.push({ op: "update_theme", path: "theme.density", value: "spacious" });
    if (hero) patches.push({ op: "set_component_variant", pageId: page.id, sectionId: hero.id, variant: "cinematic" });
    explanation = "Applied a more luxury visual direction.";
  }

  if (text.includes("dark mode") || text === "dark") {
    patches.push({ op: "update_theme", path: "theme.mode", value: "dark" });
    explanation = "Switched to dark mode.";
  }

  if (text.includes("blue")) {
    patches.push({ op: "update_theme", path: "theme.accent", value: "#38bdf8" });
    explanation = "Changed the accent color to blue.";
  }

  return { explanation, patches };
}
