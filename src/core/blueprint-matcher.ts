import { blueprintCatalog } from "./blueprint-catalog";
import type { BlueprintDefinition, MatchResult, UserIntent } from "./types";

function scoreBlueprint(intent: UserIntent, blueprint: BlueprintDefinition) {
  let score = 0;
  const reasons: string[] = [];

  if (intent.niche === blueprint.niche) {
    score += 46;
    reasons.push(`Niche match: ${blueprint.niche}`);
  }

  const keywordHits = blueprint.scoreKeywords.filter((word) => intent.rawPrompt.toLowerCase().includes(word)).length;
  if (keywordHits) {
    score += keywordHits * 7;
    reasons.push(`${keywordHits} keyword signals`);
  }

  const featureHits = intent.requiredFeatures.filter((feature) => blueprint.supportedFeatures.includes(feature)).length;
  if (featureHits) {
    score += featureHits * 8;
    reasons.push(`${featureHits} requested features supported`);
  }

  const styleHits = intent.style.filter((style) => blueprint.styleTags.includes(style)).length;
  if (styleHits) {
    score += styleHits * 6;
    reasons.push(`${styleHits} style tags aligned`);
  }

  const pageHits = intent.pages.filter((page) => blueprint.pages.some((candidate) => candidate.type === page)).length;
  score += pageHits * 3;

  return { blueprint, score, reasons };
}

export function matchBlueprint(intent: UserIntent): MatchResult {
  const ranked = blueprintCatalog.map((blueprint) => scoreBlueprint(intent, blueprint)).sort((a, b) => b.score - a.score);
  const best = ranked[0];

  return {
    bestBlueprint: best.blueprint,
    score: best.score,
    reasons: best.reasons.length ? best.reasons : ["Fallback to the strongest general blueprint structure"],
    alternatives: ranked.slice(1, 4).map((item) => ({
      blueprint: item.blueprint,
      score: item.score,
      reasons: item.reasons
    }))
  };
}
