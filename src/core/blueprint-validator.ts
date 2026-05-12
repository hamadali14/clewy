import type { BlueprintDefinition, BlueprintValidationIssue, BlueprintValidationResult } from "./blueprint-types";
import { appArchetypes, dataModelTemplates, featureModules, industries, interactionPatterns, pageTypes, roles, visualDNAPresets, workflowTemplates } from "./blueprint-registries";

const industryKeys = new Set(industries.map((industry) => industry.key));
const archetypeKeys = new Set(Object.keys(appArchetypes));
const pageTypeKeys = new Set<string>(pageTypes);
const featureKeys = new Set(Object.keys(featureModules));
const roleKeys = new Set<string>(roles);
const dataModelKeys = new Set(Object.keys(dataModelTemplates));
const workflowKeys = new Set(Object.keys(workflowTemplates));
const visualPresetKeys = new Set(Object.keys(visualDNAPresets));
const interactionKeys = new Set(Object.keys(interactionPatterns));
const demoActions = new Set([
  ...Object.values(interactionPatterns).map((pattern) => pattern.demoBackendAction),
  "createOrder"
]);

function issue(blueprintKey: string | undefined, path: string, message: string, severity: "error" | "warning" = "error"): BlueprintValidationIssue {
  return { blueprintKey, path, message, severity };
}

export function validateBlueprint(blueprint: BlueprintDefinition): BlueprintValidationResult {
  const issues: BlueprintValidationIssue[] = [];
  const push = (path: string, message: string, severity: "error" | "warning" = "error") => issues.push(issue(blueprint.key, path, message, severity));

  if (!industryKeys.has(blueprint.industry)) push("industry", `Unknown industry ${blueprint.industry}`);
  if (!archetypeKeys.has(blueprint.archetype)) push("archetype", `Unknown archetype ${blueprint.archetype}`);
  if (!visualPresetKeys.has(blueprint.visualDNA.preset)) push("visualDNA.preset", `Unknown visual DNA preset ${blueprint.visualDNA.preset}`);
  if (blueprint.visualDNA.palette.length < 4) push("visualDNA.palette", "Palette must include at least four colors");
  if (!blueprint.visualDNA.layoutPattern || !blueprint.visualDNA.heroComposition || !blueprint.visualDNA.navigationModel) push("visualDNA", "Visual DNA is missing layout, hero, or navigation differentiation");
  if (blueprint.pages.length < 4) push("pages", "Blueprint must have at least 4 pages");
  if (blueprint.features.length < 5) push("features", "Blueprint must have at least 5 features");
  if (blueprint.workflows.length < 3) push("workflows", "Blueprint must have at least 3 workflows");
  if (blueprint.interactions.length < 3) push("interactions", "Blueprint must have at least 3 interactions");
  if (blueprint.qualityScoreTarget < 90) push("qualityScoreTarget", "qualityScoreTarget must be at least 90");
  if (!blueprint.publishingConfig || !blueprint.publishingConfig.defaultDomainHint) push("publishingConfig", "Publishing config is required");

  const pageKeys = new Set<string>();
  blueprint.pages.forEach((page, pageIndex) => {
    if (pageKeys.has(page.key)) push(`pages.${pageIndex}.key`, `Duplicate page key ${page.key}`);
    pageKeys.add(page.key);
    if (!pageTypeKeys.has(page.type)) push(`pages.${pageIndex}.type`, `Unknown page type ${page.type}`);
    if (page.sections.length < 2) push(`pages.${pageIndex}.sections`, "Each page needs at least two renderable sections");
    page.sections.forEach((section, sectionIndex) => {
      section.interactionKeys.forEach((key) => {
        if (!interactionKeys.has(key)) push(`pages.${pageIndex}.sections.${sectionIndex}.interactionKeys`, `Unknown interaction ${key}`);
      });
      if (section.featureKey && !featureKeys.has(section.featureKey)) push(`pages.${pageIndex}.sections.${sectionIndex}.featureKey`, `Unknown feature ${section.featureKey}`);
      if (section.workflowKey && !workflowKeys.has(section.workflowKey)) push(`pages.${pageIndex}.sections.${sectionIndex}.workflowKey`, `Unknown workflow ${section.workflowKey}`);
    });
  });

  blueprint.features.forEach((feature, index) => {
    if (!featureKeys.has(feature.key)) push(`features.${index}.key`, `Unknown feature ${feature.key}`);
    feature.dataModels.forEach((model) => {
      if (!dataModelKeys.has(model)) push(`features.${index}.dataModels`, `Unknown data model ${model}`);
    });
    feature.workflowKeys.forEach((workflow) => {
      if (!workflowKeys.has(workflow)) push(`features.${index}.workflowKeys`, `Unknown workflow ${workflow}`);
    });
    feature.interactionKeys.forEach((interaction) => {
      if (!interactionKeys.has(interaction)) push(`features.${index}.interactionKeys`, `Unknown interaction ${interaction}`);
    });
  });

  blueprint.roles.forEach((role, index) => {
    if (!roleKeys.has(role)) push(`roles.${index}`, `Unknown role ${role}`);
  });

  blueprint.dataModels.forEach((model, index) => {
    if (!dataModelKeys.has(model.key)) push(`dataModels.${index}.key`, `Unknown data model ${model.key}`);
    if (!model.fields.length) push(`dataModels.${index}.fields`, "Data model needs fields");
    if (!model.fields.some((field) => field.required)) push(`dataModels.${index}.fields`, "Data model needs at least one required field");
    if (!blueprint.seedData[model.key]?.length) push(`seedData.${model.key}`, "Seed data is required for every data model");
  });

  const workflowActionSet = new Set(blueprint.workflows.flatMap((workflow) => workflow.actions));
  blueprint.workflows.forEach((workflow, index) => {
    if (!workflowKeys.has(workflow.key)) push(`workflows.${index}.key`, `Unknown workflow ${workflow.key}`);
    if (workflow.steps.length < 3) push(`workflows.${index}.steps`, "Workflow needs at least 3 steps");
    workflow.actions.forEach((action) => {
      if (!demoActions.has(action)) push(`workflows.${index}.actions`, `Workflow action ${action} is not backed by demo adapter`);
    });
  });

  blueprint.interactions.forEach((interaction, index) => {
    if (!interactionKeys.has(interaction.key)) push(`interactions.${index}.key`, `Unknown interaction ${interaction.key}`);
    if (!demoActions.has(interaction.demoBackendAction)) push(`interactions.${index}.demoBackendAction`, `Unknown demo backend action ${interaction.demoBackendAction}`);
    if (interaction.workflowKey && !workflowKeys.has(interaction.workflowKey)) push(`interactions.${index}.workflowKey`, `Unknown workflow ${interaction.workflowKey}`);
    if (!workflowActionSet.has(interaction.demoBackendAction) && !demoActions.has(interaction.demoBackendAction)) {
      push(`interactions.${index}.demoBackendAction`, "Interaction must map to a workflow action or mocked action");
    }
  });

  return { valid: issues.every((item) => item.severity !== "error"), issues };
}

function signature(blueprint: BlueprintDefinition) {
  return [
    blueprint.archetype,
    blueprint.visualDNA.preset,
    blueprint.visualDNA.navigationModel,
    blueprint.visualDNA.sectionRhythm,
    blueprint.pages.map((page) => page.type).join(">"),
    blueprint.features.map((feature) => feature.key).sort().join("+")
  ].join("|");
}

function similarity(a: BlueprintDefinition, b: BlueprintDefinition) {
  const aTokens = new Set(signature(a).split(/[\|>\+ ]+/).filter(Boolean));
  const bTokens = new Set(signature(b).split(/[\|>\+ ]+/).filter(Boolean));
  const intersection = Array.from(aTokens).filter((token) => bTokens.has(token)).length;
  const union = new Set([...Array.from(aTokens), ...Array.from(bTokens)]).size;
  return union ? intersection / union : 0;
}

export function validateBlueprintCatalog(blueprints: BlueprintDefinition[]): BlueprintValidationResult {
  const issues: BlueprintValidationIssue[] = [];
  if (blueprints.length !== 100) issues.push(issue(undefined, "catalog.count", `Expected exactly 100 blueprints, received ${blueprints.length}`));

  const keyCounts = new Map<string, number>();
  blueprints.forEach((blueprint) => keyCounts.set(blueprint.key, (keyCounts.get(blueprint.key) ?? 0) + 1));
  keyCounts.forEach((count, key) => {
    if (count > 1) issues.push(issue(key, "key", `Duplicate blueprint key ${key}`));
  });

  blueprints.forEach((blueprint) => issues.push(...validateBlueprint(blueprint).issues));

  for (let i = 0; i < blueprints.length; i += 1) {
    for (let j = i + 1; j < blueprints.length; j += 1) {
      const score = similarity(blueprints[i], blueprints[j]);
      if (score > 0.92 && blueprints[i].industry === blueprints[j].industry) {
        issues.push(issue(blueprints[i].key, "similarity", `Too similar to ${blueprints[j].key}: ${Math.round(score * 100)}%`));
      }
    }
  }

  return { valid: issues.every((item) => item.severity !== "error"), issues };
}
