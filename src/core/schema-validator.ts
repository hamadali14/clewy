import { knownSectionKinds } from "./blueprint-contracts";
import { blueprintCatalog } from "./blueprint-catalog";
import type { ProjectSchema, ValidationIssue, ValidationResult } from "./types";

export function validateSchema(schema: ProjectSchema): ValidationResult {
  const issues: ValidationIssue[] = [];
  const ids = new Set<string>();
  const blueprint = blueprintCatalog.find((item) => item.key === schema.blueprintKey);

  if (!schema.pages.length) {
    issues.push({ path: "pages", severity: "error", message: "Project must include at least one page." });
  }

  schema.pages.forEach((page, pageIndex) => {
    if (!page.sections.length) {
      issues.push({ path: `pages.${pageIndex}.sections`, severity: "error", message: "Page must include sections." });
    }

    page.sections.forEach((section, sectionIndex) => {
      const path = `pages.${pageIndex}.sections.${sectionIndex}`;
      if (ids.has(section.id)) {
        issues.push({ path: `${path}.id`, severity: "error", message: `Duplicate section id ${section.id}.` });
      }
      ids.add(section.id);

      if (!knownSectionKinds.includes(section.kind)) {
        issues.push({ path: `${path}.kind`, severity: "warning", message: `Unknown section kind ${section.kind}.` });
      }
    });
  });

  if (blueprint) {
    const kinds = new Set(schema.pages.flatMap((page) => page.sections.map((section) => section.kind)));
    blueprint.requiredSections.forEach((kind) => {
      if (!kinds.has(kind)) {
        issues.push({ path: "pages", severity: "error", message: `Required section ${kind} is missing.` });
      }
    });
  }

  return {
    valid: !issues.some((issue) => issue.severity === "error"),
    issues
  };
}
