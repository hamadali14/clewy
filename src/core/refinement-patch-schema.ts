import type { SectionNode } from "./types";

export type RefinementPatchOperation =
  | { op: "update_text"; pageId: string; sectionId: string; path: string; value: string }
  | { op: "update_theme"; path: string; value: string }
  | { op: "add_section"; pageId: string; afterSectionId?: string; section: SectionNode }
  | { op: "remove_section"; pageId: string; sectionId: string }
  | { op: "update_array_item"; pageId: string; sectionId: string; path: string; matchKey: string; matchValue: string; updates: Record<string, unknown> }
  | { op: "add_array_item"; pageId: string; sectionId: string; path: string; item: Record<string, unknown> }
  | { op: "set_form_field"; pageId: string; sectionId: string; field: string; value: string }
  | { op: "set_component_variant"; pageId: string; sectionId: string; variant: string };

export type RefinementPatchResponse = {
  explanation: string;
  patches: RefinementPatchOperation[];
};

const patchOps = new Set([
  "update_text",
  "update_theme",
  "add_section",
  "remove_section",
  "update_array_item",
  "add_array_item",
  "set_form_field",
  "set_component_variant"
]);

export function isRefinementPatchOperation(value: unknown): value is RefinementPatchOperation {
  if (!value || typeof value !== "object") return false;
  const patch = value as { op?: unknown };
  if (typeof patch.op !== "string" || !patchOps.has(patch.op)) return false;
  return true;
}

export function sanitizePatchResponse(value: unknown): RefinementPatchResponse {
  if (!value || typeof value !== "object") return { explanation: "Applied a safe local refinement.", patches: [] };
  const candidate = value as { explanation?: unknown; patches?: unknown };
  return {
    explanation: typeof candidate.explanation === "string" ? candidate.explanation : "Applied schema patches.",
    patches: Array.isArray(candidate.patches) ? candidate.patches.filter(isRefinementPatchOperation).slice(0, 8) : []
  };
}
