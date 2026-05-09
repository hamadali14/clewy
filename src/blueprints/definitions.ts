import type { BlueprintDefinition, Niche, PageType, SectionDefinition, SectionKind, StyleToken } from "@/core/types";

export interface BlueprintContent {
  name: string;
  headline: string;
  subheadline: string;
  eyebrow: string;
  cta: string;
  secondaryCta: string;
  nav: string[];
  palette: {
    mode: "light" | "dark";
    accent: string;
    secondary: string;
    surface: string;
    fontFeel: NonNullable<import("@/core/types").ThemeSettings["fontFeel"]>;
  };
  heroVisual: string;
  sections: Record<string, Record<string, unknown>>;
  suggestedRefinements: string[];
  missingDetails: string[];
}

const section = (kind: SectionKind, label: string, required = true, defaultData?: Record<string, unknown>): SectionDefinition => ({
  kind,
  label,
  required,
  defaultData
});

function blueprint({
  key,
  label,
  niche,
  supportedFeatures,
  styleTags,
  pages,
  requiredSections,
  optionalSections,
  scoreKeywords,
  title,
  description,
  accent,
  palette,
  visualIdentity
}: {
  key: string;
  label: string;
  niche: Niche;
  supportedFeatures: string[];
  styleTags: StyleToken[];
  pages: Array<{ type: PageType; label: string; sections: SectionDefinition[] }>;
  requiredSections: SectionKind[];
  optionalSections: SectionKind[];
  scoreKeywords: string[];
  title: string;
  description: string;
  accent: string;
  palette: string[];
  visualIdentity: string;
}): BlueprintDefinition {
  return {
    key,
    label,
    niche,
    supportedFeatures,
    styleTags,
    pages,
    requiredSections,
    optionalSections,
    scoreKeywords,
    preview: {
      title,
      description,
      accent,
      palette,
      complexity: "advanced",
      visualIdentity
    }
  };
}

export const realBlueprints: BlueprintDefinition[] = [
  blueprint({
    key: "restaurant-luxury",
    label: "Luxury Restaurant / Fine Dining",
    niche: "restaurant",
    supportedFeatures: ["reservations", "menu", "gallery", "chef story", "opening hours", "contact"],
    styleTags: ["luxury", "premium", "dark"],
    pages: [
      { type: "home", label: "Home", sections: [section("hero", "Editorial dining hero"), section("menu", "Signature tasting menu"), section("gallery", "Cinematic plate gallery"), section("story", "Chef story"), section("hours", "Opening hours"), section("booking", "Reservation form"), section("cta", "Private dining CTA")] },
      { type: "menu", label: "Menu", sections: [section("menu", "Interactive menu categories"), section("gallery", "Dish reveals"), section("faq", "Dietary notes")] },
      { type: "reservations", label: "Reservations", sections: [section("booking", "Reservation form"), section("hours", "Service hours"), section("contact", "Concierge contact")] },
      { type: "gallery", label: "Gallery", sections: [section("gallery", "Dining gallery"), section("testimonials", "Guest notes")] },
      { type: "about", label: "About", sections: [section("story", "Chef philosophy"), section("team", "Kitchen team")] },
      { type: "contact", label: "Contact", sections: [section("contact", "Contact form"), section("map", "Map placeholder")] }
    ],
    requiredSections: ["hero", "menu", "booking", "gallery", "hours"],
    optionalSections: ["story", "team", "testimonials", "faq", "contact"],
    scoreKeywords: ["restaurant", "dining", "food", "menu", "reservation", "chef", "fine dining", "wine"],
    title: "Maison Aurelia",
    description: "Dark editorial fine dining website with reservations, menu storytelling, and cinematic food presentation.",
    accent: "#d6b46a",
    palette: ["#050403", "#d6b46a", "#3a2415", "#f8ead1"],
    visualIdentity: "Dark editorial luxury with gold accents, serif scale, cinematic food panels."
  }),
  blueprint({
    key: "dental-clinic-premium",
    label: "Dental Clinic / Healthcare",
    niche: "dental",
    supportedFeatures: ["appointment", "treatments", "pricing", "team", "trust badges", "faq"],
    styleTags: ["premium", "modern", "friendly"],
    pages: [
      { type: "home", label: "Home", sections: [section("hero", "Calm clinic hero"), section("trust", "Trust badges"), section("services", "Treatment cards"), section("pricing", "Care plans"), section("team", "Doctors"), section("booking", "Appointment booking"), section("faq", "Patient FAQ")] },
      { type: "services", label: "Services", sections: [section("services", "Treatments"), section("features", "Care process"), section("faq", "Treatment FAQ")] },
      { type: "pricing", label: "Pricing", sections: [section("pricing", "Transparent plans"), section("trust", "Insurance badges")] },
      { type: "booking", label: "Booking", sections: [section("booking", "Appointment form"), section("hours", "Clinic hours")] },
      { type: "team", label: "Team", sections: [section("team", "Doctor profiles"), section("testimonials", "Patient reviews")] },
      { type: "contact", label: "Contact", sections: [section("contact", "Clinic contact"), section("map", "Location map")] }
    ],
    requiredSections: ["hero", "services", "booking", "trust"],
    optionalSections: ["pricing", "team", "faq", "testimonials"],
    scoreKeywords: ["dentist", "dental", "clinic", "healthcare", "treatment", "appointment", "teeth"],
    title: "Aurelia Dental Studio",
    description: "Calm clinical glass website for appointments, treatments, pricing, doctors, and patient trust.",
    accent: "#5eead4",
    palette: ["#eefcff", "#5eead4", "#38bdf8", "#0f766e"],
    visualIdentity: "Calm mint and cyan glass, trust-focused spacing, clean clinical content hierarchy."
  }),
  blueprint({
    key: "ai-saas-launch",
    label: "SaaS Startup / AI Software",
    niche: "saas",
    supportedFeatures: ["pricing", "feature tabs", "product dashboard", "docs preview", "faq", "testimonials"],
    styleTags: ["dark", "modern", "premium"],
    pages: [
      { type: "home", label: "Home", sections: [section("hero", "AI product hero"), section("dashboard", "Animated product UI"), section("tabs", "Feature tabs"), section("stats", "Growth proof"), section("pricing", "Pricing toggle"), section("testimonials", "Customer proof"), section("cta", "Trial CTA")] },
      { type: "features", label: "Features", sections: [section("tabs", "Feature tabs"), section("dashboard", "Workflow preview"), section("faq", "Technical FAQ")] },
      { type: "pricing", label: "Pricing", sections: [section("pricing", "Monthly yearly plans"), section("faq", "Billing FAQ")] },
      { type: "docs", label: "Docs Preview", sections: [section("features", "Docs cards"), section("dashboard", "API console mock")] },
      { type: "testimonials", label: "Testimonials", sections: [section("testimonials", "Customer wall"), section("stats", "Proof metrics")] },
      { type: "contact", label: "Contact", sections: [section("contact", "Sales contact"), section("cta", "Demo CTA")] }
    ],
    requiredSections: ["hero", "dashboard", "tabs", "pricing"],
    optionalSections: ["testimonials", "faq", "stats"],
    scoreKeywords: ["saas", "startup", "ai", "software", "app", "platform", "dashboard", "docs"],
    title: "NeonLayer AI",
    description: "Futuristic AI SaaS launch site with animated dashboard, pricing toggle, feature tabs, and docs preview.",
    accent: "#8b5cf6",
    palette: ["#050816", "#22d3ee", "#8b5cf6", "#f0f9ff"],
    visualIdentity: "Futuristic dark neon with violet/cyan gradients and animated product interface layers."
  }),
  blueprint({
    key: "gym-fitness-energy",
    label: "Gym / Fitness Studio",
    niche: "gym",
    supportedFeatures: ["classes", "trainers", "memberships", "schedule", "stats", "signup"],
    styleTags: ["dark", "modern", "premium"],
    pages: [
      { type: "home", label: "Home", sections: [section("hero", "Energy hero"), section("stats", "Performance stats"), section("schedule", "Class schedule"), section("profiles", "Trainer profiles"), section("pricing", "Memberships"), section("transformations", "Transformations"), section("cta", "Join CTA")] },
      { type: "classes", label: "Classes", sections: [section("schedule", "Weekly classes"), section("features", "Training formats")] },
      { type: "trainers", label: "Trainers", sections: [section("profiles", "Coach cards"), section("testimonials", "Member wins")] },
      { type: "memberships", label: "Memberships", sections: [section("pricing", "Membership tiers"), section("faq", "Membership FAQ")] },
      { type: "schedule", label: "Schedule", sections: [section("schedule", "Live schedule"), section("booking", "Trial signup")] },
      { type: "contact", label: "Contact", sections: [section("contact", "Studio contact"), section("map", "Studio map")] }
    ],
    requiredSections: ["hero", "schedule", "pricing", "profiles"],
    optionalSections: ["transformations", "stats", "testimonials"],
    scoreKeywords: ["gym", "fitness", "workout", "trainer", "membership", "classes", "studio"],
    title: "Forge Method",
    description: "High-energy fitness studio website with classes, memberships, trainers, schedule, and conversion CTAs.",
    accent: "#f97316",
    palette: ["#030303", "#f97316", "#a3e635", "#ef4444"],
    visualIdentity: "High-contrast black fitness system with red, orange, lime gradients and kinetic typography."
  }),
  blueprint({
    key: "real-estate-premium",
    label: "Real Estate Agency",
    niche: "real-estate",
    supportedFeatures: ["listings", "property filters", "valuation", "agents", "map", "featured property"],
    styleTags: ["luxury", "minimal", "premium"],
    pages: [
      { type: "home", label: "Home", sections: [section("hero", "Featured property hero"), section("filters", "Listing filters"), section("listings", "Property cards"), section("valuation", "Valuation form"), section("profiles", "Agent profiles"), section("map", "Map preview"), section("cta", "Viewing CTA")] },
      { type: "listings", label: "Listings", sections: [section("filters", "Filters"), section("listings", "Listing grid"), section("map", "Map placeholder")] },
      { type: "property-detail", label: "Property Detail", sections: [section("hero", "Property hero"), section("gallery", "Property gallery"), section("features", "Property features"), section("booking", "Viewing request")] },
      { type: "agents", label: "Agents", sections: [section("profiles", "Agent profiles"), section("testimonials", "Client stories")] },
      { type: "valuation", label: "Valuation", sections: [section("valuation", "Home valuation"), section("stats", "Market stats")] },
      { type: "contact", label: "Contact", sections: [section("contact", "Agency contact"), section("map", "Office map")] }
    ],
    requiredSections: ["hero", "filters", "listings", "valuation"],
    optionalSections: ["profiles", "map", "testimonials"],
    scoreKeywords: ["real estate", "property", "realtor", "homes", "listings", "agent", "valuation"],
    title: "Northline Estates",
    description: "Warm premium real estate website with editorial property presentation, filters, agents, and valuation.",
    accent: "#c5a46d",
    palette: ["#0d0b08", "#f3eadb", "#c5a46d", "#2b2118"],
    visualIdentity: "Warm beige and black luxury with spacious editorial property layouts."
  }),
  blueprint({
    key: "beauty-spa-glow",
    label: "Beauty Salon / Spa",
    niche: "beauty",
    supportedFeatures: ["service booking", "packages", "gallery", "staff", "gift card", "before after"],
    styleTags: ["luxury", "friendly", "premium"],
    pages: [
      { type: "home", label: "Home", sections: [section("hero", "Pearl glow hero"), section("services", "Treatment services"), section("packages", "Spa packages"), section("beforeAfter", "Before after"), section("team", "Artists"), section("booking", "Booking"), section("cta", "Gift card CTA")] },
      { type: "services", label: "Services", sections: [section("services", "Treatments"), section("pricing", "Service pricing")] },
      { type: "booking", label: "Booking", sections: [section("booking", "Service booking"), section("team", "Choose specialist")] },
      { type: "packages", label: "Packages", sections: [section("packages", "Treatment packages"), section("cta", "Gift card")] },
      { type: "gallery", label: "Gallery", sections: [section("gallery", "Glow gallery"), section("beforeAfter", "Before after")] },
      { type: "contact", label: "Contact", sections: [section("contact", "Salon contact"), section("map", "Location")] }
    ],
    requiredSections: ["hero", "services", "booking", "packages"],
    optionalSections: ["beforeAfter", "team", "gallery"],
    scoreKeywords: ["beauty", "salon", "spa", "nails", "lashes", "treatment", "facial", "glow"],
    title: "Pearl & Rose Atelier",
    description: "Soft rose and champagne spa website with booking, treatment packages, gallery, and gift card CTA.",
    accent: "#f0a6c1",
    palette: ["#fff7fb", "#f0a6c1", "#f8e4bd", "#7c2d4b"],
    visualIdentity: "Soft rose, champagne, pearl glassmorphism with elegant feminine premium rhythm."
  }),
  blueprint({
    key: "auto-detailing-pro",
    label: "Auto Detailing / Car Care",
    niche: "auto",
    supportedFeatures: ["packages", "before after", "booking", "vehicle selector", "ceramic coating", "results"],
    styleTags: ["dark", "premium", "modern"],
    pages: [
      { type: "home", label: "Home", sections: [section("hero", "Chrome detail hero"), section("vehicleSelector", "Vehicle selector"), section("services", "Detail services"), section("pricing", "Packages"), section("beforeAfter", "Before after slider"), section("booking", "Booking form"), section("cta", "Ceramic CTA")] },
      { type: "services", label: "Services", sections: [section("services", "Service cards"), section("features", "Process")] },
      { type: "packages", label: "Packages", sections: [section("pricing", "Package pricing"), section("vehicleSelector", "Vehicle type")] },
      { type: "results", label: "Results", sections: [section("beforeAfter", "Results slider"), section("gallery", "Finish gallery")] },
      { type: "booking", label: "Booking", sections: [section("booking", "Booking form"), section("faq", "Care FAQ")] },
      { type: "contact", label: "Contact", sections: [section("contact", "Shop contact"), section("map", "Shop map")] }
    ],
    requiredSections: ["hero", "vehicleSelector", "pricing", "beforeAfter", "booking"],
    optionalSections: ["services", "gallery", "faq"],
    scoreKeywords: ["car detailing", "auto", "vehicle", "wash", "polish", "ceramic coating", "detailing", "car care"],
    title: "Obsidian Detail Lab",
    description: "Dark chrome detailing website with vehicle selector, package pricing, before/after slider, and booking.",
    accent: "#38bdf8",
    palette: ["#020617", "#38bdf8", "#94a3b8", "#0f172a"],
    visualIdentity: "Dark chrome, electric blue, metallic glass and premium vehicle-care surfaces."
  }),
  blueprint({
    key: "law-firm-authority",
    label: "Legal / Law Firm",
    niche: "law",
    supportedFeatures: ["consultation", "practice areas", "attorneys", "case results", "legal badges", "contact"],
    styleTags: ["luxury", "premium", "minimal"],
    pages: [
      { type: "home", label: "Home", sections: [section("hero", "Authority hero"), section("badges", "Legal badges"), section("services", "Practice areas"), section("caseResults", "Case results"), section("profiles", "Attorneys"), section("booking", "Consultation form"), section("cta", "Case review CTA")] },
      { type: "practice-areas", label: "Practice Areas", sections: [section("services", "Practice cards"), section("faq", "Legal FAQ")] },
      { type: "attorneys", label: "Attorneys", sections: [section("profiles", "Attorney profiles"), section("badges", "Bar admissions")] },
      { type: "case-results", label: "Case Results", sections: [section("caseResults", "Results"), section("testimonials", "Client trust")] },
      { type: "consultation", label: "Consultation", sections: [section("booking", "Consultation form"), section("contact", "Office contact")] },
      { type: "contact", label: "Contact", sections: [section("contact", "Firm contact"), section("map", "Office map")] }
    ],
    requiredSections: ["hero", "services", "caseResults", "booking"],
    optionalSections: ["profiles", "badges", "testimonials"],
    scoreKeywords: ["lawyer", "law", "legal", "attorney", "consultation", "firm", "case"],
    title: "Kensington Legal Group",
    description: "Authoritative navy and ivory law firm website with practice areas, case results, attorneys, and consultation.",
    accent: "#d6b46a",
    palette: ["#071426", "#f7f0df", "#d6b46a", "#101827"],
    visualIdentity: "Deep navy, ivory, gold and confident professional luxury."
  }),
  blueprint({
    key: "event-photographer-gallery",
    label: "Event Photographer / Gallery Delivery",
    niche: "photography",
    supportedFeatures: ["portfolio", "packages", "client galleries", "booking", "proofing", "testimonials"],
    styleTags: ["dark", "premium", "modern"],
    pages: [
      { type: "home", label: "Home", sections: [section("hero", "Cinematic photographer hero"), section("portfolio", "Portfolio grid"), section("packages", "Packages"), section("proofing", "Client proofing"), section("testimonials", "Carousel"), section("booking", "Booking form"), section("cta", "Gallery CTA")] },
      { type: "portfolio", label: "Portfolio", sections: [section("portfolio", "Portfolio grid"), section("gallery", "Image story")] },
      { type: "packages", label: "Packages", sections: [section("packages", "Session packages"), section("faq", "Delivery FAQ")] },
      { type: "client-galleries", label: "Client Galleries", sections: [section("proofing", "Proofing mock"), section("gallery", "Private galleries")] },
      { type: "booking", label: "Booking", sections: [section("booking", "Inquiry form"), section("hours", "Availability")] },
      { type: "contact", label: "Contact", sections: [section("contact", "Contact"), section("testimonials", "Client words")] }
    ],
    requiredSections: ["hero", "portfolio", "packages", "booking"],
    optionalSections: ["proofing", "testimonials", "gallery"],
    scoreKeywords: ["photographer", "event photos", "wedding", "gallery", "portfolio", "photo", "client galleries"],
    title: "Noir Frame Studio",
    description: "Cinematic image-first photographer website with portfolio, packages, client galleries, proofing, and booking.",
    accent: "#f59e0b",
    palette: ["#030303", "#f59e0b", "#78350f", "#fff7ed"],
    visualIdentity: "Cinematic black, warm highlights, image-first portfolio and premium creative spacing."
  }),
  blueprint({
    key: "course-academy-modern",
    label: "Education / Online Course Platform",
    niche: "education",
    supportedFeatures: ["courses", "course detail", "pricing", "student dashboard", "instructors", "faq"],
    styleTags: ["modern", "friendly", "premium"],
    pages: [
      { type: "home", label: "Home", sections: [section("hero", "Learning platform hero"), section("courses", "Course cards"), section("progress", "Dashboard preview"), section("instructors", "Instructor section"), section("pricing", "Enrollment pricing"), section("faq", "Student FAQ"), section("cta", "Enrollment CTA")] },
      { type: "courses", label: "Courses", sections: [section("courses", "Course library"), section("filters", "Course filters")] },
      { type: "course-detail", label: "Course Detail", sections: [section("hero", "Course hero"), section("features", "Curriculum"), section("instructors", "Instructor"), section("cta", "Enroll CTA")] },
      { type: "pricing", label: "Pricing", sections: [section("pricing", "Plans"), section("faq", "Billing FAQ")] },
      { type: "student-dashboard", label: "Dashboard Preview", sections: [section("progress", "Progress mock"), section("courses", "Active courses")] },
      { type: "contact", label: "Contact", sections: [section("contact", "Admissions contact"), section("faq", "Support FAQ")] }
    ],
    requiredSections: ["hero", "courses", "progress", "pricing"],
    optionalSections: ["instructors", "faq", "testimonials"],
    scoreKeywords: ["course", "academy", "school", "education", "learning", "students", "online course", "instructor"],
    title: "Orbit Academy",
    description: "Bright futuristic course platform with course cards, progress mock, instructors, pricing, and enrollment.",
    accent: "#60a5fa",
    palette: ["#f8fbff", "#60a5fa", "#8b5cf6", "#22c55e"],
    visualIdentity: "Bright futuristic learning UI with blue, purple, green and clean dashboard sections."
  })
];

export const blueprintContents: Record<string, BlueprintContent> = {
  "restaurant-luxury": {
    name: "Maison Aurelia",
    headline: "A candlelit tasting room for seasonal Nordic fire cooking",
    subheadline: "Reserve a table, explore the chef's tasting menu, and step into an editorial dining experience before you arrive.",
    eyebrow: "Fine dining · Stockholm",
    cta: "Reserve a table",
    secondaryCta: "View tasting menu",
    nav: ["Home", "Menu", "Reservations", "Gallery", "About", "Contact"],
    palette: { mode: "dark", accent: "#d6b46a", secondary: "#7c4a1f", surface: "#0b0704", fontFeel: "editorial" },
    heroVisual: "Layered amber plate photography, wine cellar glass, and editorial serif type.",
    suggestedRefinements: ["Add wine pairing section", "Make it more intimate", "Show private dining CTA"],
    missingDetails: ["Cuisine style", "Reservation capacity", "Address"],
    sections: {
      menu: { title: "Seasonal tasting menu", categories: ["Tasting", "A la carte", "Wine pairings"], items: ["Charcoal scallop, dill ash", "Dry-aged duck, lingonberry jus", "Cloudberry souffle"] },
      gallery: { title: "From flame to table", items: ["Open kitchen", "Chef's counter", "Cellar room", "Signature dessert"] },
      story: { title: "Chef Elin turns local harvests into quiet theatre", detail: "A restrained kitchen built on smoke, preservation, and precise service." },
      hours: { title: "Service hours", items: ["Tue-Thu 18:00-23:00", "Fri-Sat 17:30-00:30", "Chef's counter by request"] }
    }
  },
  "dental-clinic-premium": {
    name: "Aurelia Dental Studio",
    headline: "Calm, precise dentistry for people who want to feel looked after",
    subheadline: "Same-week appointments, transparent treatment plans, and a clinic experience designed around trust.",
    eyebrow: "Premium dental care",
    cta: "Book appointment",
    secondaryCta: "View treatments",
    nav: ["Home", "Services", "Pricing", "Booking", "Team", "Contact"],
    palette: { mode: "light", accent: "#5eead4", secondary: "#38bdf8", surface: "#eefcff", fontFeel: "clinical" },
    heroVisual: "Mint clinical glass panels, soft blue trust badges, and doctor profile cards.",
    suggestedRefinements: ["Add emergency appointments", "Make it more clinical", "Show insurance badges"],
    missingDetails: ["Clinic address", "Doctor names", "Insurance providers"],
    sections: {
      services: { title: "Treatment pathways", items: ["Preventive care", "Cosmetic dentistry", "Implants", "Emergency visits"] },
      pricing: { title: "Transparent care plans", plans: ["Essential care", "Smile design", "Implant consult"] },
      team: { title: "Specialists with a calm chairside approach", people: ["Dr. Lina Berg", "Dr. Omar Nordin", "Hygienist Freja Lind"] },
      trust: { title: "Trusted by nervous patients", items: ["4.9 patient rating", "Digital scanning", "Transparent estimates"] }
    }
  },
  "ai-saas-launch": {
    name: "NeonLayer AI",
    headline: "AI operations that ship from signal to workflow",
    subheadline: "A launch-grade SaaS site with product UI, feature tabs, proof, pricing, docs preview, and conversion CTAs.",
    eyebrow: "AI workflow platform",
    cta: "Start free",
    secondaryCta: "View docs",
    nav: ["Home", "Features", "Pricing", "Docs", "Customers", "Contact"],
    palette: { mode: "dark", accent: "#8b5cf6", secondary: "#22d3ee", surface: "#050816", fontFeel: "tech" },
    heroVisual: "Floating neon product dashboard with command rail and metric cards.",
    suggestedRefinements: ["Make CTA stronger", "Add security section", "Show enterprise plan"],
    missingDetails: ["Product category", "Target user", "Pricing model"],
    sections: {
      dashboard: { title: "Realtime operating layer", metrics: ["82% less manual triage", "14 integrations", "2.4s workflow start"] },
      tabs: { title: "One platform, three motion systems", items: ["Automate", "Analyze", "Collaborate"] },
      pricing: { title: "Scale with usage", plans: ["Launch", "Growth", "Enterprise"] },
      faq: { title: "Technical questions", items: ["How does data sync?", "Can we self-host?", "Does it support SSO?"] }
    }
  },
  "gym-fitness-energy": {
    name: "Forge Method",
    headline: "Small-group training with competition-level energy",
    subheadline: "Classes, coaches, memberships, and trial bookings for a studio built around measurable progress.",
    eyebrow: "Strength · conditioning · mobility",
    cta: "Book trial class",
    secondaryCta: "View schedule",
    nav: ["Home", "Classes", "Trainers", "Memberships", "Schedule", "Contact"],
    palette: { mode: "dark", accent: "#f97316", secondary: "#a3e635", surface: "#030303", fontFeel: "bold" },
    heroVisual: "Kinetic class cards, orange heat gradients, and bold performance stats.",
    suggestedRefinements: ["Add transformations", "Make it more intense", "Show trainer certifications"],
    missingDetails: ["Class times", "Membership pricing", "Trainer names"],
    sections: {
      schedule: { title: "This week's class energy", items: ["Mon 07:00 Strength", "Wed 18:00 Engine", "Sat 10:00 Hybrid"] },
      profiles: { title: "Coaches who track every rep", people: ["Mika Power", "Sara Engine", "Jonas Mobility"] },
      transformations: { title: "Member transformations", stats: ["12 week programs", "31% avg strength gain", "600+ coached sessions"] },
      pricing: { title: "Memberships", plans: ["Drop-in", "Unlimited", "Performance"] }
    }
  },
  "real-estate-premium": {
    name: "Northline Estates",
    headline: "Quietly exceptional homes, represented with market precision",
    subheadline: "Browse featured listings, request a valuation, and meet the advisors behind high-trust property moves.",
    eyebrow: "Premium property advisory",
    cta: "Schedule viewing",
    secondaryCta: "Browse listings",
    nav: ["Home", "Listings", "Property Detail", "Agents", "Valuation", "Contact"],
    palette: { mode: "light", accent: "#c5a46d", secondary: "#111111", surface: "#f3eadb", fontFeel: "luxury" },
    heroVisual: "Warm editorial property panels, beige paper texture, and black luxury controls.",
    suggestedRefinements: ["Add waterfront listings", "Make it more minimal", "Show valuation form earlier"],
    missingDetails: ["Market area", "Listing count", "Agent contacts"],
    sections: {
      listings: { title: "Featured homes", items: ["Östermalm penthouse", "Lakeside villa", "Historic townhouse"] },
      filters: { title: "Search by lifestyle", items: ["Waterfront", "Penthouse", "Family villa", "Investment"] },
      valuation: { title: "Request a precise valuation", detail: "Three inputs, one advisor follow-up." },
      profiles: { title: "Local market advisors", people: ["Astrid Holm", "Noah Lind", "Maja Ek"] }
    }
  },
  "beauty-spa-glow": {
    name: "Pearl & Rose Atelier",
    headline: "A softer kind of luxury for skin, lashes, nails, and calm",
    subheadline: "Book treatments, browse glow packages, and explore a pearl-glass salon experience.",
    eyebrow: "Beauty · spa · glow",
    cta: "Book treatment",
    secondaryCta: "View packages",
    nav: ["Home", "Services", "Booking", "Packages", "Gallery", "Contact"],
    palette: { mode: "light", accent: "#f0a6c1", secondary: "#f8e4bd", surface: "#fff7fb", fontFeel: "soft" },
    heroVisual: "Rose pearl glass, champagne ribbons, and soft treatment cards.",
    suggestedRefinements: ["Add gift card CTA", "Show more photos", "Make it brighter"],
    missingDetails: ["Treatment duration", "Staff names", "Booking policy"],
    sections: {
      services: { title: "Signature treatments", items: ["Hydra glow facial", "Lash lift", "Gel manicure", "Massage ritual"] },
      packages: { title: "Glow packages", plans: ["Lunch glow", "Weekend reset", "Pearl ritual"] },
      beforeAfter: { title: "Subtle transformations", items: ["Skin clarity", "Brow shaping", "Lash lift"] },
      team: { title: "Artists and therapists", people: ["Mira", "Elise", "Nora"] }
    }
  },
  "auto-detailing-pro": {
    name: "Obsidian Detail Lab",
    headline: "Paint correction, ceramic coating, and concours-level finish",
    subheadline: "Premium detailing packages, before/after proof, vehicle selection, and booking for serious car care.",
    eyebrow: "Auto detailing · ceramic coating",
    cta: "Book detail",
    secondaryCta: "Compare packages",
    nav: ["Home", "Services", "Packages", "Results", "Booking", "Contact"],
    palette: { mode: "dark", accent: "#38bdf8", secondary: "#94a3b8", surface: "#020617", fontFeel: "tech" },
    heroVisual: "Metallic glass, blue inspection light, and chrome package cards.",
    suggestedRefinements: ["Add ceramic coating upsell", "Show more photos", "Change color to blue"],
    missingDetails: ["Vehicle types", "Service area", "Package prices"],
    sections: {
      vehicleSelector: { title: "Select vehicle profile", items: ["Coupe", "SUV", "Supercar", "Fleet"] },
      pricing: { title: "Detail packages", plans: ["Signature wash", "Paint correction", "Ceramic pro"] },
      beforeAfter: { title: "Before / after finish", items: ["Swirl removal", "Wheel restoration", "Interior reset"] },
      services: { title: "Lab-grade services", items: ["Ceramic coating", "Paint correction", "Interior detail"] }
    }
  },
  "law-firm-authority": {
    name: "Kensington Legal Group",
    headline: "Measured legal strategy for high-stakes decisions",
    subheadline: "Practice areas, attorneys, case results, and consultation flow for an authoritative modern firm.",
    eyebrow: "Legal counsel · dispute strategy",
    cta: "Request consultation",
    secondaryCta: "View practice areas",
    nav: ["Home", "Practice Areas", "Attorneys", "Case Results", "Consultation", "Contact"],
    palette: { mode: "dark", accent: "#d6b46a", secondary: "#f7f0df", surface: "#071426", fontFeel: "authority" },
    heroVisual: "Deep navy legal panels, ivory copy blocks, and gold trust seals.",
    suggestedRefinements: ["Make CTA stronger", "Add case results", "Make it more authoritative"],
    missingDetails: ["Jurisdiction", "Practice focus", "Attorney bios"],
    sections: {
      services: { title: "Practice areas", items: ["Commercial disputes", "Employment law", "M&A advisory", "Regulatory"] },
      caseResults: { title: "Results with discretion", stats: ["$42M dispute resolved", "18 industries served", "94% consultation fit"] },
      profiles: { title: "Senior attorneys", people: ["Amelia Grant", "Victor Hale", "Noor Bennett"] },
      badges: { title: "Professional trust", items: ["Bar admitted", "Chambers ranked", "Confidential review"] }
    }
  },
  "event-photographer-gallery": {
    name: "Noir Frame Studio",
    headline: "Cinematic event photography delivered in private gallery rooms",
    subheadline: "Portfolio, packages, client proofing, gallery delivery, and booking for weddings, launches, and private events.",
    eyebrow: "Event photographer",
    cta: "Book a date",
    secondaryCta: "View portfolio",
    nav: ["Home", "Portfolio", "Packages", "Client Galleries", "Booking", "Contact"],
    palette: { mode: "dark", accent: "#f59e0b", secondary: "#fff7ed", surface: "#030303", fontFeel: "creative" },
    heroVisual: "Warm cinematic image grid, black proofing rooms, and amber film highlights.",
    suggestedRefinements: ["Show more photos", "Add reviews", "Make it more cinematic"],
    missingDetails: ["Event type", "Package hours", "Delivery timeline"],
    sections: {
      portfolio: { title: "Recent stories", items: ["Winter wedding", "Brand launch", "Private gala", "Editorial portraits"] },
      packages: { title: "Coverage packages", plans: ["Essentials", "Full story", "Weekend archive"] },
      proofing: { title: "Client gallery delivery", detail: "Private proofing rooms with favorites and download states." },
      testimonials: { title: "Clients remember the atmosphere", quotes: ["The gallery felt like reliving the night.", "Every image carried the room's energy."] }
    }
  },
  "course-academy-modern": {
    name: "Orbit Academy",
    headline: "A modern academy for students who learn by building",
    subheadline: "Course catalog, dashboard preview, instructors, pricing, progress states, and enrollment CTAs.",
    eyebrow: "Online learning platform",
    cta: "Explore courses",
    secondaryCta: "Preview dashboard",
    nav: ["Home", "Courses", "Course Detail", "Pricing", "Dashboard", "Contact"],
    palette: { mode: "light", accent: "#60a5fa", secondary: "#8b5cf6", surface: "#f8fbff", fontFeel: "learning" },
    heroVisual: "Bright learning dashboard, progress rings, blue/purple/green course cards.",
    suggestedRefinements: ["Add student reviews", "Make it more modern", "Show course progress"],
    missingDetails: ["Course categories", "Instructor names", "Enrollment model"],
    sections: {
      courses: { title: "Course library", items: ["AI product design", "Frontend systems", "Launch strategy", "Data foundations"] },
      progress: { title: "Student dashboard preview", stats: ["72% weekly progress", "4 active courses", "18 completed lessons"] },
      instructors: { title: "Instructor team", people: ["Leah Park", "Sam Rivera", "Mina Cho"] },
      pricing: { title: "Enrollment options", plans: ["Single course", "Academy pass", "Team cohort"] }
    }
  }
};

export function getBlueprintContent(key: string): BlueprintContent {
  return blueprintContents[key] ?? blueprintContents["ai-saas-launch"];
}
