export type BlueprintKey = string;

export type IndustryKey =
  | "restaurant"
  | "cafe"
  | "barbershop"
  | "beauty-salon"
  | "dental-clinic"
  | "private-clinic"
  | "gym"
  | "personal-trainer"
  | "mechanic"
  | "car-detailing"
  | "construction"
  | "electrician"
  | "plumber"
  | "cleaning-company"
  | "real-estate"
  | "hotel"
  | "event-agency"
  | "photographer"
  | "ecommerce-fashion"
  | "ecommerce-electronics"
  | "ecommerce-furniture"
  | "online-course"
  | "coaching"
  | "law-firm"
  | "accounting"
  | "childcare"
  | "school"
  | "nonprofit"
  | "mosque-community"
  | "coworking"
  | "SaaS-dashboard"
  | "AI-agency"
  | "logistics"
  | "delivery"
  | "marketplace"
  | "repair-service"
  | "pet-care"
  | "travel-agency"
  | "wedding-service"
  | "portfolio-studio";

export type AppArchetype =
  | "booking-first"
  | "commerce-store"
  | "marketplace-grid"
  | "dashboard-first"
  | "community-portal"
  | "service-portal"
  | "content-portfolio"
  | "course-platform"
  | "restaurant-experience"
  | "admin-command-center"
  | "map-first-finder"
  | "step-wizard"
  | "mobile-app-interface"
  | "membership-platform"
  | "donation-platform"
  | "lead-gen-funnel";

export type BlueprintRole =
  | "visitor"
  | "customer"
  | "member"
  | "student"
  | "vendor"
  | "staff"
  | "editor"
  | "admin"
  | "owner"
  | "driver"
  | "agent"
  | "provider";

export type BlueprintWorkflowKey =
  | "booking"
  | "reservation"
  | "checkout"
  | "contact"
  | "leadCapture"
  | "memberLogin"
  | "profileUpdate"
  | "review"
  | "favorite"
  | "reward"
  | "adminCrud"
  | "filterBrowse"
  | "quoteRequest"
  | "courseEnrollment"
  | "donation"
  | "vendorOnboarding";

export interface BlueprintPageSection {
  key: string;
  kind:
    | "hero"
    | "navigation"
    | "feed"
    | "grid"
    | "map"
    | "form"
    | "calendar"
    | "checkout"
    | "dashboard"
    | "gallery"
    | "timeline"
    | "wizard"
    | "pricing"
    | "profile"
    | "editorial"
    | "stats"
    | "community"
    | "admin"
    | "lesson"
    | "comparison";
  featureKey?: string;
  workflowKey?: BlueprintWorkflowKey;
  interactionKeys: string[];
  dataModel?: string;
  variant: string;
}

export interface BlueprintPageDefinition {
  key: string;
  title: string;
  path: string;
  type: string;
  layoutIntent: string;
  sections: BlueprintPageSection[];
}

export interface BlueprintFeatureDefinition {
  key: string;
  label: string;
  description: string;
  dataModels: string[];
  workflowKeys: BlueprintWorkflowKey[];
  interactionKeys: string[];
  mockedActions: string[];
}

export interface BlueprintDataModel {
  key: string;
  label: string;
  fields: Array<{
    key: string;
    type: "string" | "number" | "boolean" | "date" | "datetime" | "enum" | "currency" | "email" | "phone" | "image" | "relation";
    required: boolean;
  }>;
  seedCount: number;
}

export interface BlueprintWorkflow {
  key: BlueprintWorkflowKey;
  name: string;
  trigger: string;
  steps: string[];
  actions: string[];
  successState: string;
  failureState: string;
}

export interface BlueprintVisualDNA {
  preset: string;
  layoutPattern: string;
  heroComposition: string;
  navigationModel: string;
  sectionRhythm: string;
  density: "airy" | "balanced" | "dense" | "cinematic";
  colorMode: "light" | "dark" | "mixed";
  palette: string[];
  typography: string;
  motion: string;
  cardShape: string;
  texture: string;
  signature: string;
}

export interface BlueprintInteraction {
  key: string;
  label: string;
  event: "click" | "submit" | "change" | "hover" | "drag" | "toggle";
  action: string;
  workflowKey?: BlueprintWorkflowKey;
  demoBackendAction: string;
}

export interface BlueprintPublishingConfig {
  defaultDomainHint: string;
  sitemap: boolean;
  robots: boolean;
  analyticsReady: boolean;
  imageOptimization: boolean;
  accessibilityLevel: "baseline" | "strong" | "strict";
  performanceBudgetKb: number;
}

export interface BlueprintDefinition {
  key: BlueprintKey;
  name: string;
  industry: IndustryKey;
  archetype: AppArchetype;
  description: string;
  targetCustomer: string;
  visualDNA: BlueprintVisualDNA;
  pages: BlueprintPageDefinition[];
  features: BlueprintFeatureDefinition[];
  roles: BlueprintRole[];
  dataModels: BlueprintDataModel[];
  workflows: BlueprintWorkflow[];
  interactions: BlueprintInteraction[];
  seedData: Record<string, Array<Record<string, unknown>>>;
  publishingConfig: BlueprintPublishingConfig;
  qualityScoreTarget: number;
}

export interface BlueprintValidationIssue {
  blueprintKey?: string;
  path: string;
  severity: "error" | "warning";
  message: string;
}

export interface BlueprintValidationResult {
  valid: boolean;
  issues: BlueprintValidationIssue[];
}
