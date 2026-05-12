import { realBlueprints } from "@/blueprints";
import { generatedBlueprints } from "./generated-blueprints";
import { validateBlueprintCatalog } from "./blueprint-validator";
import type { AppArchetype, BlueprintDefinition, BlueprintKey, IndustryKey } from "./blueprint-types";

export const blueprintCatalog = realBlueprints;

export function listBlueprints(): BlueprintDefinition[] {
  return generatedBlueprints;
}

export function getBlueprint(key: BlueprintKey): BlueprintDefinition | undefined {
  return generatedBlueprints.find((blueprint) => blueprint.key === key);
}

export function listBlueprintsByIndustry(industry: IndustryKey): BlueprintDefinition[] {
  return generatedBlueprints.filter((blueprint) => blueprint.industry === industry);
}

export function listBlueprintsByArchetype(archetype: AppArchetype): BlueprintDefinition[] {
  return generatedBlueprints.filter((blueprint) => blueprint.archetype === archetype);
}

export function searchBlueprints(query: string): BlueprintDefinition[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return generatedBlueprints;
  return generatedBlueprints.filter((blueprint) =>
    [
      blueprint.key,
      blueprint.name,
      blueprint.industry,
      blueprint.archetype,
      blueprint.description,
      blueprint.targetCustomer,
      blueprint.visualDNA.layoutPattern,
      ...blueprint.features.map((feature) => feature.label)
    ]
      .join(" ")
      .toLowerCase()
      .includes(normalized)
  );
}

export function validateAllBlueprints() {
  return validateBlueprintCatalog(generatedBlueprints);
}

export function getBlueprintStats() {
  const validation = validateAllBlueprints();
  const byIndustry = generatedBlueprints.reduce<Record<string, number>>((acc, blueprint) => {
    acc[blueprint.industry] = (acc[blueprint.industry] ?? 0) + 1;
    return acc;
  }, {});
  const byArchetype = generatedBlueprints.reduce<Record<string, number>>((acc, blueprint) => {
    acc[blueprint.archetype] = (acc[blueprint.archetype] ?? 0) + 1;
    return acc;
  }, {});
  return {
    total: generatedBlueprints.length,
    valid: validation.valid,
    issueCount: validation.issues.length,
    averageQualityTarget: Math.round(generatedBlueprints.reduce((sum, blueprint) => sum + blueprint.qualityScoreTarget, 0) / generatedBlueprints.length),
    industries: Object.keys(byIndustry).length,
    archetypes: Object.keys(byArchetype).length,
    byIndustry,
    byArchetype
  };
}
