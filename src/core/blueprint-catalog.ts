import type { BlueprintDefinition, SectionDefinition, SectionKind } from "./types";

const section = (kind: SectionKind, label: string, required = true): SectionDefinition => ({
  kind,
  label,
  required
});

export const blueprintCatalog: BlueprintDefinition[] = [
  {
    key: "dental-premium",
    label: "Dental Clinic Premium",
    niche: "dental",
    supportedFeatures: ["booking", "services", "pricing", "contact", "testimonials"],
    styleTags: ["premium", "modern", "friendly"],
    pages: [
      {
        type: "landing",
        label: "Home",
        sections: [
          section("hero", "Appointment hero"),
          section("services", "Treatments"),
          section("booking", "Booking panel"),
          section("pricing", "Care plans", false),
          section("testimonials", "Patient stories", false),
          section("contact", "Clinic contact"),
          section("cta", "Final booking CTA")
        ]
      }
    ],
    requiredSections: ["hero", "services", "booking", "contact", "cta"],
    optionalSections: ["pricing", "testimonials", "faq", "stats"],
    scoreKeywords: ["dentist", "dental", "clinic", "teeth", "booking", "care"],
    preview: {
      title: "Premium Dental Clinic",
      description: "A conversion-focused clinic site with booking and treatment sections.",
      accent: "#67e8f9"
    }
  },
  {
    key: "restaurant-modern",
    label: "Restaurant Modern",
    niche: "restaurant",
    supportedFeatures: ["menu", "booking", "gallery", "contact", "testimonials"],
    styleTags: ["modern", "premium", "friendly"],
    pages: [
      {
        type: "landing",
        label: "Home",
        sections: [
          section("hero", "Dining hero"),
          section("gallery", "Signature plates"),
          section("features", "Menu highlights"),
          section("booking", "Reservation block"),
          section("testimonials", "Guest reviews", false),
          section("contact", "Opening hours"),
          section("cta", "Book a table")
        ]
      }
    ],
    requiredSections: ["hero", "gallery", "features", "booking", "contact"],
    optionalSections: ["testimonials", "faq", "cta"],
    scoreKeywords: ["restaurant", "menu", "chef", "table", "reservation", "food"],
    preview: {
      title: "Modern Restaurant",
      description: "A polished restaurant launch page with reservations and menu highlights.",
      accent: "#fb7185"
    }
  },
  {
    key: "saas-landing",
    label: "SaaS Landing System",
    niche: "saas",
    supportedFeatures: ["features", "pricing", "faq", "testimonials", "cta"],
    styleTags: ["modern", "minimal", "dark", "premium"],
    pages: [
      {
        type: "landing",
        label: "Home",
        sections: [
          section("hero", "Product hero"),
          section("stats", "Proof metrics"),
          section("features", "Feature grid"),
          section("pricing", "Plans"),
          section("testimonials", "Customer proof", false),
          section("faq", "FAQ", false),
          section("cta", "Trial CTA")
        ]
      }
    ],
    requiredSections: ["hero", "features", "pricing", "cta"],
    optionalSections: ["stats", "testimonials", "faq"],
    scoreKeywords: ["saas", "software", "startup", "app", "platform", "trial"],
    preview: {
      title: "SaaS Landing Page",
      description: "A crisp software landing page with pricing, proof, and signup CTA.",
      accent: "#60a5fa"
    }
  },
  {
    key: "gym-studio",
    label: "Gym Studio",
    niche: "gym",
    supportedFeatures: ["classes", "pricing", "booking", "testimonials", "gallery"],
    styleTags: ["modern", "dark", "premium"],
    pages: [
      {
        type: "landing",
        label: "Home",
        sections: [
          section("hero", "Training hero"),
          section("stats", "Member stats"),
          section("services", "Programs"),
          section("pricing", "Memberships"),
          section("gallery", "Studio gallery", false),
          section("booking", "Trial booking"),
          section("cta", "Join CTA")
        ]
      }
    ],
    requiredSections: ["hero", "services", "pricing", "booking"],
    optionalSections: ["gallery", "testimonials", "faq", "stats"],
    scoreKeywords: ["gym", "fitness", "studio", "workout", "trainer", "classes"],
    preview: {
      title: "Fitness Studio",
      description: "A confident studio site for classes, memberships, and trials.",
      accent: "#a3e635"
    }
  },
  {
    key: "real-estate",
    label: "Real Estate Showcase",
    niche: "real-estate",
    supportedFeatures: ["gallery", "contact", "booking", "stats", "testimonials"],
    styleTags: ["luxury", "premium", "minimal"],
    pages: [
      {
        type: "landing",
        label: "Home",
        sections: [
          section("hero", "Property hero"),
          section("stats", "Market proof"),
          section("gallery", "Listings"),
          section("features", "Neighborhood fit"),
          section("testimonials", "Client wins", false),
          section("contact", "Agent contact"),
          section("cta", "Schedule viewing")
        ]
      }
    ],
    requiredSections: ["hero", "gallery", "features", "contact"],
    optionalSections: ["stats", "testimonials", "booking", "faq"],
    scoreKeywords: ["real estate", "property", "homes", "listing", "realtor", "agent"],
    preview: {
      title: "Real Estate Showcase",
      description: "A luxury property and agent presence with lead capture.",
      accent: "#f5c76b"
    }
  },
  {
    key: "consultant-pro",
    label: "Consultant Pro",
    niche: "consultant",
    supportedFeatures: ["services", "booking", "pricing", "testimonials", "contact"],
    styleTags: ["minimal", "premium", "modern"],
    pages: [
      {
        type: "landing",
        label: "Home",
        sections: [
          section("hero", "Authority hero"),
          section("services", "Advisory offers"),
          section("features", "Operating model"),
          section("testimonials", "Client outcomes", false),
          section("pricing", "Engagements", false),
          section("booking", "Strategy call"),
          section("cta", "Consultation CTA")
        ]
      }
    ],
    requiredSections: ["hero", "services", "features", "booking"],
    optionalSections: ["testimonials", "pricing", "faq", "contact"],
    scoreKeywords: ["consultant", "agency", "advisor", "coaching", "strategy", "expert"],
    preview: {
      title: "Consultant Pro",
      description: "A refined expert site for offers, proof, and booked calls.",
      accent: "#c4b5fd"
    }
  }
];
