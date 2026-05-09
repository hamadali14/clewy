"use client";

import { blueprintCatalog } from "@/core/blueprint-catalog";
import { BlueprintCard } from "@/components/builder/BlueprintCard";
import { GradientButton } from "@/components/ui/gradient-button";
import { cn } from "@/lib/utils";

const demoPrompts: Record<string, string> = {
  "dental-premium": "I need a premium website for a dental clinic with booking, services, pricing and contact.",
  "restaurant-modern": "Create a modern restaurant website with menu highlights, reservation booking and gallery.",
  "saas-landing": "Build a dark premium SaaS landing page with features, pricing, FAQ and testimonials.",
  "gym-studio": "Make a premium gym studio website with classes, memberships and trial booking.",
  "real-estate": "I want a luxury real estate site for property listings, viewing requests and agent contact.",
  "consultant-pro": "Make a polished consultant website with services, testimonials and strategy call booking."
};

export function DemoGallery({ limit = 6 }: { limit?: number }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {blueprintCatalog.slice(0, limit).map((blueprint) => (
        <div key={blueprint.key} className={cn("group relative overflow-hidden rounded-[2rem] border p-3 shadow-[0_24px_70px_rgba(20,40,80,0.16)] backdrop-blur-2xl", styleFor(blueprint.key).shell)}>
          <div className="absolute inset-x-6 top-0 h-24 rounded-b-[3rem] blur-3xl transition group-hover:opacity-90" style={{ background: blueprint.preview.accent, opacity: 0.28 }} />
          <div className={cn("relative mb-3 h-36 overflow-hidden rounded-[1.5rem] border", styleFor(blueprint.key).visual)}>
            <div className="absolute left-5 top-5 h-16 w-28 rounded-3xl bg-white/34 backdrop-blur-xl" />
            <div className="absolute bottom-5 right-5 grid gap-2">
              <span className="h-2 w-28 rounded-full bg-white/55" />
              <span className="h-2 w-20 rounded-full bg-white/35" />
            </div>
            <div className="absolute inset-x-8 bottom-0 h-12 rounded-t-[2rem] bg-white/25 backdrop-blur-xl" />
          </div>
          <BlueprintCard blueprint={blueprint} tone={styleFor(blueprint.key).tone} />
          <div className="mt-3">
            <GradientButton href={`/builder?prompt=${encodeURIComponent(demoPrompts[blueprint.key])}`} variant={styleFor(blueprint.key).button} className="w-full">
              Open demo
            </GradientButton>
          </div>
        </div>
      ))}
    </div>
  );
}

function styleFor(key: string): { shell: string; visual: string; tone: "dark" | "light"; button: "primary" | "secondary" | "ink" | "light" } {
  const styles: Record<string, { shell: string; visual: string; tone: "dark" | "light"; button: "primary" | "secondary" | "ink" | "light" }> = {
    "dental-premium": {
      shell: "border-cyan-100/80 bg-cyan-50/70",
      visual: "border-cyan-100 bg-[linear-gradient(135deg,#ecfeff,#bae6fd)]",
      tone: "light",
      button: "ink"
    },
    "restaurant-modern": {
      shell: "border-amber-100/80 bg-[#fff7ed]/75",
      visual: "border-amber-100 bg-[linear-gradient(135deg,#431407,#fed7aa)]",
      tone: "light",
      button: "ink"
    },
    "saas-landing": {
      shell: "border-violet-200/40 bg-slate-950/70",
      visual: "border-white/10 bg-[linear-gradient(135deg,#111827,#22d3ee,#8b5cf6)]",
      tone: "dark",
      button: "primary"
    },
    "gym-studio": {
      shell: "border-lime-200/30 bg-black/76",
      visual: "border-lime-200/20 bg-[linear-gradient(135deg,#030712,#84cc16)]",
      tone: "dark",
      button: "primary"
    },
    "real-estate": {
      shell: "border-stone-200 bg-[#f5efe6]/80",
      visual: "border-stone-200 bg-[linear-gradient(135deg,#fafaf9,#d6c4a8)]",
      tone: "light",
      button: "ink"
    },
    "consultant-pro": {
      shell: "border-slate-200 bg-white/74",
      visual: "border-slate-200 bg-[linear-gradient(135deg,#f8fafc,#cbd5e1)]",
      tone: "light",
      button: "ink"
    }
  };
  return styles[key] ?? styles["consultant-pro"];
}
