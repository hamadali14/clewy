import type { ProjectSchema } from "./types";

export function normalizeSchema(schema: ProjectSchema): ProjectSchema {
  const pages = schema.pages.map((page) => ({
    ...page,
    sections: page.sections
      .map((section, index) => ({
        ...section,
        id: section.id || `${page.id}-${section.kind}-${index + 1}`,
        kind: section.kind,
        visible: typeof section.visible === "boolean" ? section.visible : true,
        theme: section.theme ?? {},
        data: section.data ?? {},
        order: index
      }))
      .sort((a, b) => a.order - b.order)
  }));

  return {
    ...schema,
    pages,
    updatedAt: new Date().toISOString()
  };
}
