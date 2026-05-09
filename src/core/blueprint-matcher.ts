import { blueprintCatalog } from "./blueprint-catalog";
import type { BlueprintDefinition, MatchResult, UserIntent } from "./types";

function scoreBlueprint(intent: UserIntent, blueprint: BlueprintDefinition) {
  let score = 0;
  const reasons: string[] = [];

  if (intent.niche === blueprint.niche) {
    score += 52;
    reasons.push(`Industry match: ${blueprint.niche}`);
  }

  if (intent.rawPrompt.toLowerCase().includes(blueprint.key.toLowerCase())) {
    score += 90;
    reasons.push("Explicit blueprint key requested");
  }

  const keywordHits = blueprint.scoreKeywords.filter((word) => intent.rawPrompt.toLowerCase().includes(word)).length;
  if (keywordHits) {
    score += keywordHits * 8;
    reasons.push(`${keywordHits} keyword signals`);
  }

  const featureHits = intent.requiredFeatures.filter((feature) =>
    blueprint.supportedFeatures.some((supported) => supported.includes(feature) || feature.includes(supported))
  ).length;
  if (featureHits) {
    score += featureHits * 9;
    reasons.push(`${featureHits} requested features supported`);
  }

  const styleHits = intent.style.filter((style) => blueprint.styleTags.includes(style)).length;
  if (styleHits) {
    score += styleHits * 6;
    reasons.push(`${styleHits} style tags aligned`);
  }

  const pageHits = intent.pages.filter((page) => blueprint.pages.some((candidate) => candidate.type === page)).length;
  if (pageHits) {
    score += pageHits * 5;
    reasons.push(`${pageHits} page requirements aligned`);
  }

  if (intent.requiredFeatures.some((feature) => ["booking", "pricing", "contact"].includes(feature))) {
    score += blueprint.supportedFeatures.some((feature) => ["booking", "pricing", "consultation", "appointment", "reservations"].some((needle) => feature.includes(needle))) ? 8 : 0;
  }

  return { blueprint, score, reasons };
}

function missingDetails(intent: UserIntent) {
  const missing: string[] = [];
  if (!intent.rawPrompt.match(/\b(location|city|stockholm|new york|london|address)\b/i)) missing.push("Location or service area");
  if (!intent.rawPrompt.match(/\b(name|called|brand)\b/i)) missing.push("Brand name");
  if (!intent.requiredFeatures.includes("pricing")) missing.push("Pricing or package preference");
  return missing.slice(0, 3);
}

function suggestedRefinements(intent: UserIntent, blueprint: BlueprintDefinition) {
  const suggestions = [`Make ${blueprint.label} more premium`, "Make CTA stronger"];
  if (!intent.requiredFeatures.includes("testimonials")) suggestions.push("Add reviews");
  if (!intent.requiredFeatures.includes("booking")) suggestions.push("Add booking");
  if (blueprint.styleTags.includes("luxury")) suggestions.push("Make it more luxury");
  return suggestions.slice(0, 4);
}

export function matchBlueprint(intent: UserIntent): MatchResult {
  const ranked = blueprintCatalog.map((blueprint) => scoreBlueprint(intent, blueprint)).sort((a, b) => b.score - a.score);
  const best = ranked[0];

  return {
    bestBlueprint: best.blueprint,
    score: best.score,
    reasons: best.reasons.length ? best.reasons : ["Fallback to the strongest general blueprint structure"],
    missingDetails: missingDetails(intent),
    suggestedRefinements: suggestedRefinements(intent, best.blueprint),
    alternatives: ranked.slice(1, 4).map((item) => ({
      blueprint: item.blueprint,
      score: item.score,
      reasons: item.reasons
    }))
  };
}
