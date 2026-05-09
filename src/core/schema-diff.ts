import type { PatchOperation, ProjectSchema, SectionNode, ThemeSettings } from "./types";
import { normalizeSchema } from "./schema-normalizer";

const touch = (schema: ProjectSchema): ProjectSchema => normalizeSchema({ ...schema, updatedAt: new Date().toISOString() });

export function addSection(schema: ProjectSchema, pageId: string, section: SectionNode): ProjectSchema {
  return touch({
    ...schema,
    pages: schema.pages.map((page) =>
      page.id === pageId ? { ...page, sections: [...page.sections, { ...section, order: page.sections.length }] } : page
    )
  });
}

export function removeSection(schema: ProjectSchema, pageId: string, sectionId: string): ProjectSchema {
  return touch({
    ...schema,
    pages: schema.pages.map((page) =>
      page.id === pageId ? { ...page, sections: page.sections.filter((section) => section.id !== sectionId) } : page
    )
  });
}

export function updateSection(schema: ProjectSchema, pageId: string, sectionId: string, data: Partial<SectionNode>): ProjectSchema {
  return touch({
    ...schema,
    pages: schema.pages.map((page) =>
      page.id === pageId
        ? { ...page, sections: page.sections.map((section) => (section.id === sectionId ? { ...section, ...data } : section)) }
        : page
    )
  });
}

export function updateTheme(schema: ProjectSchema, theme: Partial<ThemeSettings>): ProjectSchema {
  return touch({ ...schema, theme: { ...schema.theme, ...theme } });
}

export function reorderSections(schema: ProjectSchema, pageId: string, sectionIds: string[]): ProjectSchema {
  return touch({
    ...schema,
    pages: schema.pages.map((page) => {
      if (page.id !== pageId) return page;
      const byId = new Map(page.sections.map((section) => [section.id, section]));
      const ordered = sectionIds.flatMap((id) => {
        const section = byId.get(id);
        return section ? [section] : [];
      });
      const missing = page.sections.filter((section) => !sectionIds.includes(section.id));
      return { ...page, sections: [...ordered, ...missing] };
    })
  });
}

export function toggleSectionVisibility(schema: ProjectSchema, pageId: string, sectionId: string, visible: boolean): ProjectSchema {
  return updateSection(schema, pageId, sectionId, { visible });
}

export function applyPatch(schema: ProjectSchema, patch: PatchOperation): ProjectSchema {
  switch (patch.type) {
    case "addSection":
      return addSection(schema, patch.pageId, patch.section);
    case "removeSection":
      return removeSection(schema, patch.pageId, patch.sectionId);
    case "updateSection":
      return updateSection(schema, patch.pageId, patch.sectionId, patch.data);
    case "updateTheme":
      return updateTheme(schema, patch.theme);
    case "reorderSections":
      return reorderSections(schema, patch.pageId, patch.sectionIds);
    case "toggleSectionVisibility":
      return toggleSectionVisibility(schema, patch.pageId, patch.sectionId, patch.visible);
    default:
      return schema;
  }
}
