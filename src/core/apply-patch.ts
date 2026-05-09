import type { ProjectSchema, SectionNode } from "./types";
import type { RefinementPatchOperation } from "./refinement-patch-schema";
import { normalizeSchema } from "./schema-normalizer";

const allowedRoots = new Set(["data", "theme", "visible", "label"]);

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function pathParts(path: string) {
  return path.split(".").map((part) => part.trim()).filter(Boolean);
}

function coerceValue(path: string, value: unknown) {
  if (typeof value === "string" && (path.endsWith(".fields") || path.endsWith(".items") || path.endsWith(".plans"))) {
    return value.split(",").map((item) => item.trim()).filter(Boolean);
  }
  return value;
}

function setPath(target: Record<string, unknown>, path: string, value: unknown) {
  const parts = pathParts(path);
  if (!parts.length || !allowedRoots.has(parts[0])) return false;
  let cursor: Record<string, unknown> = target;
  for (const part of parts.slice(0, -1)) {
    const next = cursor[part];
    if (!next || typeof next !== "object" || Array.isArray(next)) cursor[part] = {};
    cursor = cursor[part] as Record<string, unknown>;
  }
  cursor[parts[parts.length - 1]] = coerceValue(path, value);
  return true;
}

function getArray(target: Record<string, unknown>, path: string) {
  const parts = pathParts(path);
  if (!parts.length || !allowedRoots.has(parts[0])) return null;
  let cursor: unknown = target;
  for (const part of parts) {
    if (!cursor || typeof cursor !== "object") return null;
    cursor = (cursor as Record<string, unknown>)[part];
  }
  return Array.isArray(cursor) ? cursor : null;
}

function findPage(schema: ProjectSchema, pageId: string) {
  return schema.pages.find((page) => page.id === pageId);
}

function findSection(schema: ProjectSchema, pageId: string, sectionId: string) {
  const page = findPage(schema, pageId);
  return page?.sections.find((section) => section.id === sectionId);
}

export function validateRefinementPatch(schema: ProjectSchema, patch: RefinementPatchOperation): string | null {
  if ("pageId" in patch && !findPage(schema, patch.pageId)) return `Unknown page ${patch.pageId}`;
  if ("sectionId" in patch && !findSection(schema, patch.pageId, patch.sectionId)) return `Unknown section ${patch.sectionId}`;
  if ("path" in patch && patch.path.includes("__proto__")) return "Unsafe path";
  if (patch.op === "update_theme" && !patch.path.startsWith("theme.")) return "Theme patch must target theme.*";
  if (patch.op === "add_section" && (!patch.section?.id || !patch.section.kind)) return "Invalid section payload";
  return null;
}

export function applyRefinementPatch(schema: ProjectSchema, patch: RefinementPatchOperation): ProjectSchema {
  const error = validateRefinementPatch(schema, patch);
  if (error) return schema;

  const next = clone(schema);
  if (patch.op === "update_theme") {
    setPath(next as unknown as Record<string, unknown>, patch.path, patch.value);
    return normalizeSchema(next);
  }

  if (patch.op === "add_section") {
    const page = findPage(next, patch.pageId);
    if (!page) return schema;
    const insertIndex = patch.afterSectionId ? page.sections.findIndex((section) => section.id === patch.afterSectionId) + 1 : page.sections.length;
    const section = { ...patch.section, visible: true, order: insertIndex };
    page.sections.splice(Math.max(0, insertIndex), 0, section);
    return normalizeSchema(next);
  }

  if (patch.op === "remove_section") {
    const page = findPage(next, patch.pageId);
    if (!page) return schema;
    page.sections = page.sections.filter((section) => section.id !== patch.sectionId);
    return normalizeSchema(next);
  }

  const section = findSection(next, patch.pageId, patch.sectionId) as SectionNode | undefined;
  if (!section) return schema;
  const sectionRecord = section as unknown as Record<string, unknown>;

  if (patch.op === "update_text") {
    setPath(sectionRecord, patch.path, patch.value);
  }

  if (patch.op === "set_form_field") {
    const form = typeof section.data.form === "object" && section.data.form ? section.data.form as Record<string, unknown> : {};
    form[patch.field] = patch.value;
    section.data.form = form;
  }

  if (patch.op === "set_component_variant") {
    section.data.variant = patch.variant;
  }

  if (patch.op === "add_array_item") {
    const array = getArray(sectionRecord, patch.path);
    if (array) array.push(patch.item);
    else setPath(sectionRecord, patch.path, [patch.item]);
  }

  if (patch.op === "update_array_item") {
    const array = getArray(sectionRecord, patch.path);
    if (array) {
      const item = array.find((entry) => entry && typeof entry === "object" && String((entry as Record<string, unknown>)[patch.matchKey]) === patch.matchValue);
      if (item && typeof item === "object") Object.assign(item, patch.updates);
    }
  }

  return normalizeSchema(next);
}

export function applyRefinementPatches(schema: ProjectSchema, patches: RefinementPatchOperation[]) {
  return patches.reduce((current, patch) => applyRefinementPatch(current, patch), schema);
}
