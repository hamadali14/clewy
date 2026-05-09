import { classifyIntent } from "./intent-classifier";
import { matchBlueprint } from "./blueprint-matcher";

export const matcherSmokeCases = [
  { prompt: "barbershop", expectedBlueprintKey: "modern-barbershop" },
  { prompt: "I need booking for haircuts and beard trim", expectedBlueprintKey: "modern-barbershop" },
  { prompt: "restaurant with menu reservation", expectedBlueprintKey: "restaurant-luxury" },
  { prompt: "tattoo studio portfolio artists booking", expectedBlueprintKey: "tattoo-studio" },
  { prompt: "car detailing ceramic coating booking", expectedBlueprintKey: "auto-detailing-pro" },
  { prompt: "fashion store ecommerce", expectedBlueprintKey: "fashion-brand" },
  { prompt: "hotel booking rooms", expectedBlueprintKey: "hotel-resort" },
  { prompt: "law firm consultation", expectedBlueprintKey: "law-firm-authority" }
];

export function runMatcherSmokeCases() {
  return matcherSmokeCases.map((testCase) => {
    const intent = classifyIntent(testCase.prompt);
    const match = matchBlueprint(intent);
    return {
      ...testCase,
      actualBlueprintKey: match.bestBlueprint.key,
      passed: match.bestBlueprint.key === testCase.expectedBlueprintKey,
      reasons: match.reasons
    };
  });
}
