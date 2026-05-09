"use client";

import { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { GlassPanel } from "@/components/ui/glass-panel";
import { GradientButton } from "@/components/ui/gradient-button";
import { FloatingBar } from "@/components/ui/floating-bar";

const plans = [
  { name: "Starter", monthly: 19, copy: "Solo builders validating blueprint-first generation.", items: ["10 projects", "10 premium blueprints", "Local export", "Basic snapshots"] },
  { name: "Pro", monthly: 49, copy: "Creators and small teams shipping client-ready sites.", items: ["Unlimited projects", "Version history", "Premium refinements", "Preview sharing"], featured: true },
  { name: "Studio", monthly: 129, copy: "Studios building repeated niche sites with reliable systems.", items: ["Blueprint collections", "Team presence", "Advanced export", "Client review links"] },
  { name: "Agency", monthly: 299, copy: "Agencies that need scalable blueprint authoring and governance.", items: ["Custom blueprint authoring", "Schema governance", "White-label previews", "Priority support"] }
];

const faq = ["Can I add my own blueprints?", "Does it generate arbitrary code?", "Can refinements be reverted?", "Is this ready for client previews?"];

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);
  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-28 pt-28 text-white">
      <AnimatedBackground />
      <section className="relative mx-auto max-w-7xl">
        <FloatingBar className="mb-6 w-fit">
          <Sparkles className="h-4 w-4 text-cyan-200" />
          <span className="pr-2 text-xs font-semibold text-white/70">Premium pricing</span>
        </FloatingBar>
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <h1 className="text-balance text-6xl font-semibold">Pricing for serious blueprint-first creation.</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/62">Dark premium platform packaging with versioning, live previews, schema-safe refinements and future blueprint authoring.</p>
          </div>
          <FloatingBar>
            <button onClick={() => setYearly(false)} className={yearly ? "rounded-full px-4 py-2 text-sm text-white/54" : "rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950"}>Monthly</button>
            <button onClick={() => setYearly(true)} className={yearly ? "rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950" : "rounded-full px-4 py-2 text-sm text-white/54"}>Yearly</button>
          </FloatingBar>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {plans.map((plan) => (
            <GlassPanel key={plan.name} className={plan.featured ? "p-6 ring-1 ring-cyan-200/50" : "p-6"} interactive>
              {plan.featured && <span className="rounded-full bg-cyan-200 px-3 py-1 text-xs font-semibold text-slate-950">Recommended</span>}
              <p className="mt-4 text-sm text-white/54">{plan.name}</p>
              <p className="mt-4 text-5xl font-semibold">${yearly ? plan.monthly * 10 : plan.monthly}</p>
              <p className="mt-4 min-h-24 text-sm leading-6 text-white/58">{plan.copy}</p>
              <div className="mt-6 space-y-3">
                {plan.items.map((item) => (
                  <p key={item} className="flex items-center gap-2 text-sm text-white/70">
                    <Check className="h-4 w-4 text-cyan-200" />
                    {item}
                  </p>
                ))}
              </div>
              <div className="mt-7">
                <GradientButton href="/builder" variant={plan.featured ? "primary" : "secondary"} className="w-full">Start building</GradientButton>
              </div>
            </GlassPanel>
          ))}
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <GlassPanel className="p-6">
            <h2 className="text-3xl font-semibold">Plan comparison</h2>
            <div className="mt-5 grid gap-3">
              {["Blueprint matching", "Schema-safe refinement", "Live preview studio", "Version snapshots", "Export and publish mock"].map((feature) => (
                <div key={feature} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-sm text-white/70">
                  {feature}
                  <span className="text-cyan-200">Included</span>
                </div>
              ))}
            </div>
          </GlassPanel>
          <GlassPanel className="p-6">
            <h2 className="text-3xl font-semibold">FAQ</h2>
            <div className="mt-5 grid gap-3">
              {faq.map((item) => (
                <details key={item} className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                  <summary className="cursor-pointer text-sm font-semibold text-white/78">{item}</summary>
                  <p className="mt-3 text-sm leading-6 text-white/56">The current foundation is local-only, deterministic, and designed to plug into hosted services later.</p>
                </details>
              ))}
            </div>
          </GlassPanel>
        </div>

        <GlassPanel className="mt-12 p-10 text-center">
          <h2 className="text-balance text-4xl font-semibold">Start with a blueprint. Refine with confidence.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">The real value is not random generation. It is repeatable quality, live preview, and safe updates.</p>
          <div className="mt-7"><GradientButton href="/builder">Open builder</GradientButton></div>
        </GlassPanel>
      </section>
    </main>
  );
}
