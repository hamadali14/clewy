import type { Niche, PageType, StyleToken, UserIntent } from "./types";

const nicheRules: Array<{ niche: Niche; words: string[]; businessType: string }> = [
  { niche: "restaurant", words: ["restaurant", "dining", "food", "menu", "reservation", "chef", "fine dining"], businessType: "Luxury restaurant" },
  { niche: "dental", words: ["dentist", "dental", "clinic", "healthcare", "treatment", "appointment", "teeth", "orthodontic"], businessType: "Dental clinic" },
  { niche: "saas", words: ["saas", "startup", "ai", "software", "app", "platform", "dashboard", "docs"], businessType: "AI software product" },
  { niche: "gym", words: ["gym", "fitness", "workout", "trainer", "membership", "classes", "studio"], businessType: "Fitness studio" },
  { niche: "real-estate", words: ["real estate", "property", "realtor", "homes", "listings", "agent", "valuation"], businessType: "Real estate agency" },
  { niche: "beauty", words: ["beauty", "salon", "spa", "nails", "lashes", "treatment", "facial"], businessType: "Beauty salon and spa" },
  { niche: "auto", words: ["car detailing", "auto", "vehicle", "wash", "polish", "ceramic coating", "detailing", "car care"], businessType: "Auto detailing studio" },
  { niche: "law", words: ["lawyer", "law", "legal", "attorney", "consultation", "firm", "case"], businessType: "Law firm" },
  { niche: "photography", words: ["photographer", "event photos", "wedding", "gallery", "portfolio", "photo", "client galleries"], businessType: "Event photographer" },
  { niche: "education", words: ["course", "academy", "school", "education", "learning", "students", "online course", "instructor"], businessType: "Online course platform" },
  { niche: "consultant", words: ["consultant", "agency", "advisor", "coach", "strategy", "expert"], businessType: "Consulting practice" }
];

const featureRules = [
  { feature: "booking", words: ["booking", "book", "appointment", "reserve", "reservation", "schedule", "consultation"] },
  { feature: "pricing", words: ["pricing", "price", "plans", "membership", "packages", "tiers"] },
  { feature: "contact", words: ["contact", "location", "phone", "hours"] },
  { feature: "testimonials", words: ["testimonials", "reviews", "proof", "stories", "case results"] },
  { feature: "gallery", words: ["gallery", "photos", "portfolio", "listings", "before after"] },
  { feature: "faq", words: ["faq", "questions"] },
  { feature: "services", words: ["services", "treatments", "offers", "programs", "practice areas"] },
  { feature: "menu", words: ["menu", "dish", "dining"] },
  { feature: "courses", words: ["courses", "students", "lessons"] },
  { feature: "listings", words: ["listings", "properties", "homes"] },
  { feature: "dashboard", words: ["dashboard", "docs", "product ui"] }
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
  const pages: PageType[] = ["home"];
  const selectedStyles: StyleToken[] = styles.length ? styles : ["premium", "modern"];

  if (features.includes("pricing")) pages.push("pricing");
  if (features.includes("booking")) pages.push("booking");
  if (features.includes("contact")) pages.push("contact");
  if (features.includes("gallery")) pages.push("gallery");
  if (features.includes("menu")) pages.push("menu");
  if (features.includes("courses")) pages.push("courses");
  if (features.includes("listings")) pages.push("listings");

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
