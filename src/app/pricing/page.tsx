"use client";

import { Check, Sparkles } from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { GradientButton } from "@/components/ui/gradient-button";
import { FloatingBar } from "@/components/ui/floating-bar";
import { NoiseOverlay } from "@/components/ui/noise-overlay";

const plans = [
  { name: "Studio", price: "$0", copy: "Local blueprint foundation for experimenting with deterministic generation.", items: ["Mock classifier", "Six blueprint demos", "Local workspace"], tone: "light" as const },
  { name: "Builder", price: "$29", copy: "A future hosted tier for teams shipping polished niche websites faster.", items: ["Expanded blueprint library", "Reusable projects", "Preview sharing"], featured: true, tone: "dark" as const },
  { name: "Platform", price: "$99", copy: "A future extensibility layer for agencies and internal product teams.", items: ["Blueprint authoring", "Versioned schemas", "Export adapters"], tone: "light" as const }
];

export default function PricingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden light-glass-bg px-4 pb-28 pt-28 text-slate-950">
      <NoiseOverlay />
      <section className="relative mx-auto max-w-7xl">
        <FloatingBar light className="mb-6 w-fit">
          <Sparkles className="h-4 w-4 text-cyan-600" />
          <span className="pr-2 text-xs font-semibold text-slate-600">Pricing model preview</span>
        </FloatingBar>
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <h1 className="text-balance text-6xl font-semibold">Clean SaaS packaging for a platform that is local today.</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">No auth, no Stripe, no backend in this phase. The commercial surface is designed for the next step without pretending it is wired now.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {plans.map((plan) => (
              <GlassPanel key={plan.name} tone={plan.tone} className={plan.featured ? "p-6 ring-1 ring-cyan-200/60" : "p-6"} interactive>
                <p className={plan.tone === "dark" ? "text-sm text-white/54" : "text-sm text-slate-500"}>{plan.name}</p>
                <p className={plan.tone === "dark" ? "mt-4 text-5xl font-semibold text-white" : "mt-4 text-5xl font-semibold text-slate-950"}>{plan.price}</p>
                <p className={plan.tone === "dark" ? "mt-4 min-h-20 text-sm leading-6 text-white/58" : "mt-4 min-h-20 text-sm leading-6 text-slate-600"}>{plan.copy}</p>
                <div className="mt-6 space-y-3">
                  {plan.items.map((item) => (
                    <p key={item} className={plan.tone === "dark" ? "flex items-center gap-2 text-sm text-white/70" : "flex items-center gap-2 text-sm text-slate-600"}>
                      <Check className="h-4 w-4 text-cyan-400" />
                      {item}
                    </p>
                  ))}
                </div>
                <div className="mt-7">
                  <GradientButton href="/builder" variant={plan.featured ? "primary" : "ink"} className="w-full">Start building</GradientButton>
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
