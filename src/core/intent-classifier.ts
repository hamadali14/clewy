import type { Niche, PageType, StyleToken, UserIntent } from "./types";

const nicheRules: Array<{ niche: Niche; words: string[]; businessType: string }> = [
  { niche: "dental", words: ["dentist", "dental", "clinic", "teeth", "orthodontic"], businessType: "Dental clinic" },
  { niche: "restaurant", words: ["restaurant", "menu", "chef", "table", "reservation", "food"], businessType: "Restaurant" },
  { niche: "saas", words: ["saas", "software", "startup", "app", "platform", "dashboard"], businessType: "Software product" },
  { niche: "gym", words: ["gym", "fitness", "studio", "trainer", "workout", "classes"], businessType: "Fitness studio" },
  { niche: "real-estate", words: ["real estate", "property", "home", "listing", "realtor", "agent"], businessType: "Real estate brand" },
  { niche: "consultant", words: ["consultant", "agency", "advisor", "coach", "strategy", "expert"], businessType: "Consulting practice" }
];

const featureRules = [
  { feature: "booking", words: ["booking", "book", "appointment", "reserve", "schedule"] },
  { feature: "pricing", words: ["pricing", "price", "plans", "membership", "packages"] },
  { feature: "contact", words: ["contact", "location", "phone", "hours"] },
  { feature: "testimonials", words: ["testimonials", "reviews", "proof", "stories"] },
  { feature: "gallery", words: ["gallery", "photos", "portfolio", "listings"] },
  { feature: "faq", words: ["faq", "questions"] },
  { feature: "services", words: ["services", "treatments", "offers", "programs"] }
];

const styleRules: Array<{ style: StyleToken; words: string[] }> = [
  { style: "premium", words: ["premium", "high-end", "polished"] },
  { style: "luxury", words: ["luxury", "elegant", "exclusive"] },
  { style: "modern", words: ["modern", "clean", "sleek"] },
  { style: "minimal", words: ["minimal", "simple", "calm"] },
  { style: "dark", words: ["dark", "black", "night"] },
  { style: "friendly", words: ["friendly", "warm", "approachable"] }
];

function hasAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

export function classifyIntent(prompt: string): UserIntent {
  const normalized = prompt.toLowerCase().trim();
  const nicheHits = nicheRules
    .map((rule) => ({ ...rule, hits: rule.words.filter((word) => normalized.includes(word)).length }))
    .sort((a, b) => b.hits - a.hits);
  const top = nicheHits[0];
  const niche = top.hits > 0 ? top.niche : "general";
  const features = featureRules.filter((rule) => hasAny(normalized, rule.words)).map((rule) => rule.feature);
  const styles: StyleToken[] = styleRules.filter((rule) => hasAny(normalized, rule.words)).map((rule) => rule.style);
  const pages: PageType[] = ["landing"];
  const selectedStyles: StyleToken[] = styles.length ? styles : ["premium", "modern"];

  if (features.includes("pricing")) pages.push("pricing");
  if (features.includes("booking")) pages.push("booking");
  if (features.includes("contact")) pages.push("contact");

  const keywords = normalized.split(/[^a-z0-9-]+/).filter(Boolean);

  return {
    niche,
    businessType: niche === "general" ? "Local business" : top.businessType,
    goal: features.includes("booking") ? "Generate booked leads" : "Launch a polished web presence",
    requiredFeatures: Array.from(new Set(features.length ? features : ["services", "contact", "cta"])),
    style: Array.from(new Set<StyleToken>(selectedStyles)),
    pages: Array.from(new Set(pages)),
    confidence: Math.min(0.96, 0.48 + top.hits * 0.12 + features.length * 0.05 + styles.length * 0.04),
    keywords,
    rawPrompt: prompt
  };
}
