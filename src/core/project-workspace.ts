import { classifyIntent } from "./intent-classifier";
import { matchBlueprint } from "./blueprint-matcher";
import { generateProjectSchema } from "./schema-generator";
import { normalizeSchema } from "./schema-normalizer";
import { validateSchema } from "./schema-validator";
import { createProjectFromGeneratedBlueprint, createProjectFromGeneratedBlueprintKey, matchGeneratedBlueprintFromPrompt } from "./blueprint-project-bridge";

export function createProjectFromPrompt(prompt: string) {
  const generatedBlueprint = matchGeneratedBlueprintFromPrompt(prompt);
  if (generatedBlueprint) return createProjectFromGeneratedBlueprint(generatedBlueprint, prompt);

  const intent = classifyIntent(prompt);
  const match = matchBlueprint(intent);
  const schema = normalizeSchema(generateProjectSchema(intent, match.bestBlueprint));
  const validation = validateSchema(schema);

  return {
    intent,
    match,
    schema,
    validation
  };
}

export function createProjectFromBlueprintKey(key: string, prompt = "") {
  return createProjectFromGeneratedBlueprintKey(key, prompt) ?? createProjectFromPrompt(prompt || key);
}

export const examplePrompts = [
  "Build a premium barbershop website with haircut booking, barber profiles, services and beard trim packages.",
  "Create a luxury restaurant website with menu journey, reservations, gallery and private dining inquiry.",
  "Build an ecommerce fashion store with product grid, cart, checkout, wishlist and campaign lookbook.",
  "Create a SaaS dashboard product with command center, admin workflows, pricing and support.",
  "Build an online course platform with course catalog, enrollment, lessons and student dashboard.",
  "I need a premium website for a dental clinic with booking, services, pricing and contact.",
  "Create a modern restaurant website with menu highlights, reservation booking and gallery.",
  "Build a dark premium SaaS landing page with features, pricing, FAQ and testimonials.",
  "I want a luxury real estate site for property listings, viewing requests and agent contact.",
  "Make a polished consultant website with services, testimonials and strategy call booking."
];
