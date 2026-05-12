import type { BlueprintDefinition, BlueprintPageSection } from "./blueprint-types";

export interface AssembledBlueprintNode extends BlueprintPageSection {
  id: string;
  title: string;
  copy: string;
  accent: string;
  seed: Array<Record<string, unknown>>;
}

export interface AssembledBlueprintPage {
  id: string;
  key: string;
  title: string;
  path: string;
  type: string;
  layoutIntent: string;
  nodes: AssembledBlueprintNode[];
}

export interface AssembledBlueprintSchema {
  key: string;
  name: string;
  industry: string;
  archetype: string;
  visualDNA: BlueprintDefinition["visualDNA"];
  pages: AssembledBlueprintPage[];
  workflows: BlueprintDefinition["workflows"];
  interactions: BlueprintDefinition["interactions"];
  roles: BlueprintDefinition["roles"];
  dataModels: BlueprintDefinition["dataModels"];
  seedData: BlueprintDefinition["seedData"];
}

function titleFromKey(value: string) {
  return value
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function nodeCopy(blueprint: BlueprintDefinition, section: BlueprintPageSection, pageTitle: string) {
  const feature = blueprint.features.find((candidate) => candidate.key === section.featureKey);
  if (feature) return `${feature.label} powers the ${pageTitle.toLowerCase()} experience with ${feature.workflowKeys.join(", ")} workflow support.`;
  return `${blueprint.name} uses ${section.kind} composition shaped by ${blueprint.visualDNA.layoutPattern}.`;
}

export function assembleBlueprint(blueprint: BlueprintDefinition): AssembledBlueprintSchema {
  return {
    key: blueprint.key,
    name: blueprint.name,
    industry: blueprint.industry,
    archetype: blueprint.archetype,
    visualDNA: blueprint.visualDNA,
    workflows: blueprint.workflows,
    interactions: blueprint.interactions,
    roles: blueprint.roles,
    dataModels: blueprint.dataModels,
    seedData: blueprint.seedData,
    pages: blueprint.pages.map((page, pageIndex) => ({
      id: `${blueprint.key}-${page.key}`,
      key: page.key,
      title: page.title,
      path: page.path,
      type: page.type,
      layoutIntent: page.layoutIntent,
      nodes: page.sections.map((section, sectionIndex) => {
        const seed = section.dataModel ? blueprint.seedData[section.dataModel] ?? [] : [];
        return {
          ...section,
          id: `${blueprint.key}-${page.key}-${section.key}-${sectionIndex}`,
          title: section.featureKey ? titleFromKey(section.featureKey) : `${titleFromKey(section.kind)} ${sectionIndex + 1}`,
          copy: nodeCopy(blueprint, section, page.title),
          accent: blueprint.visualDNA.palette[(pageIndex + sectionIndex) % blueprint.visualDNA.palette.length],
          seed
        };
      })
    }))
  };
}
