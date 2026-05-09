import type { ProjectSchema } from "./types";

export function buildRefinementPrompt(command: string, schema: ProjectSchema, activePageId?: string) {
  const page = schema.pages.find((item) => item.id === activePageId) ?? schema.pages[0];
  return {
    instruction: command,
    contract:
      "Return strict JSON only: {\"explanation\":\"...\",\"patches\":[...]}. Use only the allowed patch operations. Prefer minimal patches. Do not return markdown.",
    allowedOperations: [
      "update_text",
      "update_theme",
      "add_section",
      "remove_section",
      "update_array_item",
      "add_array_item",
      "set_form_field",
      "set_component_variant"
    ],
    schemaContext: {
      projectId: schema.id,
      blueprintKey: schema.blueprintKey,
      niche: schema.niche,
      theme: schema.theme,
      page: {
        id: page.id,
        title: page.title,
        sections: page.sections.map((section) => ({
          id: section.id,
          kind: section.kind,
          label: section.label,
          visible: section.visible,
          data: {
            title: section.data.title,
            subtitle: section.data.subtitle,
            cta: section.data.cta,
            secondaryCta: section.data.secondaryCta,
            items: section.data.items,
            plans: section.data.plans,
            fields: section.data.fields,
            quotes: section.data.quotes
          }
        }))
      }
    }
  };
}
