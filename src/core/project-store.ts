import type { ProjectSchema } from "./types";

export const currentProjectKey = "blueprint-builder-current-project";
export const historyKey = "blueprint-builder-history";

export function saveProject(schema: ProjectSchema) {
  if (typeof window === "undefined") return;
  localStorage.setItem(currentProjectKey, JSON.stringify(schema));
}

export function loadProject() {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(currentProjectKey);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as ProjectSchema;
  } catch {
    localStorage.removeItem(currentProjectKey);
    return null;
  }
}

export function saveProjectHistory(items: ProjectSchema[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(historyKey, JSON.stringify(items.slice(-20)));
}
