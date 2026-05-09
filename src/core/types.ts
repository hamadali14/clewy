export type Niche =
  | "dental"
  | "restaurant"
  | "saas"
  | "gym"
  | "real-estate"
  | "consultant"
  | "general";

export type PageType = "landing" | "services" | "pricing" | "booking" | "contact" | "about";

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
  | "cta";

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
  };
}

export interface ThemeSettings {
  mode: "light" | "dark";
  style: StyleToken;
  accent: string;
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
  alternatives: Array<{ blueprint: BlueprintDefinition; score: number; reasons: string[] }>;
}
