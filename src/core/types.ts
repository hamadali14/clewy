export type Niche =
  | "dental"
  | "restaurant"
  | "saas"
  | "gym"
  | "real-estate"
  | "beauty"
  | "auto"
  | "law"
  | "photography"
  | "education"
  | "barbershop"
  | "tattoo"
  | "coffee"
  | "fashion"
  | "jewelry"
  | "architecture"
  | "interior"
  | "portfolio"
  | "music"
  | "nightclub"
  | "hotel"
  | "travel"
  | "wedding"
  | "pet"
  | "gaming"
  | "creator"
  | "watch"
  | "agency"
  | "sports"
  | "aesthetics"
  | "consultant"
  | "general";

export type PageType =
  | "landing"
  | "home"
  | "menu"
  | "reservations"
  | "gallery"
  | "about"
  | "contact"
  | "services"
  | "pricing"
  | "booking"
  | "team"
  | "features"
  | "docs"
  | "testimonials"
  | "classes"
  | "trainers"
  | "memberships"
  | "schedule"
  | "listings"
  | "property-detail"
  | "agents"
  | "valuation"
  | "packages"
  | "results"
  | "practice-areas"
  | "attorneys"
  | "case-results"
  | "consultation"
  | "portfolio"
  | "client-galleries"
  | "courses"
  | "course-detail"
  | "student-dashboard";

export type StyleToken = "minimal" | "modern" | "luxury" | "premium" | "dark" | "friendly";

export type SectionKind =
  | "hero"
  | "services"
  | "features"
  | "pricing"
  | "testimonials"
  | "faq"
  | "contact"
  | "booking"
  | "gallery"
  | "stats"
  | "cta"
  | "menu"
  | "hours"
  | "story"
  | "team"
  | "trust"
  | "dashboard"
  | "tabs"
  | "schedule"
  | "profiles"
  | "transformations"
  | "listings"
  | "filters"
  | "valuation"
  | "packages"
  | "beforeAfter"
  | "vehicleSelector"
  | "caseResults"
  | "badges"
  | "portfolio"
  | "proofing"
  | "courses"
  | "progress"
  | "instructors"
  | "map"
  | "lookbook"
  | "products"
  | "cart"
  | "checkout"
  | "rooms"
  | "weather"
  | "artists"
  | "audio"
  | "tournament"
  | "rankings"
  | "timeline"
  | "availability"
  | "wishlist"
  | "concierge";

export type DeviceMode = "desktop" | "tablet" | "mobile";

export interface UserIntent {
  niche: Niche;
  businessType: string;
  goal: string;
  requiredFeatures: string[];
  style: StyleToken[];
  pages: PageType[];
  confidence: number;
  keywords: string[];
  rawPrompt: string;
}

export interface SectionDefinition {
  kind: SectionKind;
  label: string;
  required: boolean;
  defaultData?: Record<string, unknown>;
}

export interface BlueprintPageDefinition {
  type: PageType;
  label: string;
  sections: SectionDefinition[];
}

export interface BlueprintDefinition {
  key: string;
  label: string;
  niche: Niche;
  supportedFeatures: string[];
  styleTags: StyleToken[];
  pages: BlueprintPageDefinition[];
  requiredSections: SectionKind[];
  optionalSections: SectionKind[];
  scoreKeywords: string[];
  preview: {
    title: string;
    description: string;
    accent: string;
    palette?: string[];
    complexity?: "focused" | "multi-page" | "advanced";
    visualIdentity?: string;
  };
}

export interface ThemeSettings {
  mode: "light" | "dark";
  style: StyleToken;
  accent: string;
  secondary?: string;
  surface?: string;
  fontFeel?: "editorial" | "clinical" | "tech" | "bold" | "luxury" | "soft" | "authority" | "creative" | "learning";
  radius: "soft" | "round" | "pill";
  density: "compact" | "balanced" | "spacious";
}

export interface SectionNode {
  id: string;
  kind: SectionKind;
  label: string;
  visible: boolean;
  theme: Partial<ThemeSettings>;
  data: Record<string, unknown>;
  order: number;
}

export interface PageSchema {
  id: string;
  type: PageType;
  title: string;
  path: string;
  sections: SectionNode[];
}

export interface ProjectSchema {
  id: string;
  name: string;
  blueprintKey: string;
  niche: Niche;
  intent: UserIntent;
  theme: ThemeSettings;
  pages: PageSchema[];
  createdAt: string;
  updatedAt: string;
  metadata?: {
    visualIdentity?: string;
    suggestedRefinements?: string[];
    missingDetails?: string[];
    generatedBlueprintKey?: string;
    archetype?: string;
    visualDNA?: {
      preset: string;
      layoutPattern: string;
      heroComposition: string;
      navigationModel: string;
      sectionRhythm: string;
      density: string;
      colorMode: string;
      palette: string[];
      typography: string;
      motion: string;
      cardShape: string;
      texture: string;
      signature: string;
    };
    qualityScoreTarget?: number;
  };
}

export interface ValidationIssue {
  path: string;
  severity: "warning" | "error";
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
}

export type PatchOperation =
  | { type: "addSection"; pageId: string; section: SectionNode }
  | { type: "removeSection"; pageId: string; sectionId: string }
  | { type: "updateSection"; pageId: string; sectionId: string; data: Partial<SectionNode> }
  | { type: "updateTheme"; theme: Partial<ThemeSettings> }
  | { type: "reorderSections"; pageId: string; sectionIds: string[] }
  | { type: "toggleSectionVisibility"; pageId: string; sectionId: string; visible: boolean };

export interface MatchResult {
  bestBlueprint: BlueprintDefinition;
  score: number;
  reasons: string[];
  missingDetails: string[];
  suggestedRefinements: string[];
  alternatives: Array<{ blueprint: BlueprintDefinition; score: number; reasons: string[] }>;
}
