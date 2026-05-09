import { classifyIntent } from "./intent-classifier";
import { matchBlueprint } from "./blueprint-matcher";
import { generateProjectSchema } from "./schema-generator";
import { normalizeSchema } from "./schema-normalizer";
import { validateSchema } from "./schema-validator";

export function createProjectFromPrompt(prompt: string) {
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

export const examplePrompts = [
  "I need a premium website for a dental clinic with booking, services, pricing and contact.",
  "Create a modern restaurant website with menu highlights, reservation booking and gallery.",
  "Build a dark premium SaaS landing page with features, pricing, FAQ and testimonials.",
  "I want a luxury real estate site for property listings, viewing requests and agent contact.",
  "Make a polished consultant website with services, testimonials and strategy call booking."
];
