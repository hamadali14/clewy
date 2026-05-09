"use client";

import { ArrowRight } from "lucide-react";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { GlassPanel } from "@/components/ui/glass-panel";
import { GradientButton } from "@/components/ui/gradient-button";
import { FloatingBar } from "@/components/ui/floating-bar";
import { SvgIcon } from "@/components/ui/svg-icon";

const beliefs = [
  "AI should understand the brief, not own the architecture.",
  "Blueprints make quality repeatable across niches.",
  "Schemas keep refinements inspectable and reversible.",
  "A renderer should be boringly reliable and visually excellent."
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-28 pt-28">
      <AnimatedBackground />
      <section className="relative mx-auto max-w-6xl">
        <FloatingBar className="mb-6 w-fit">
          <SvgIcon name="spark" className="h-4 w-4 text-cyan-200" />
          <span className="pr-2 text-xs font-semibold text-white/70">Manifesto</span>
        </FloatingBar>
        <h1 className="text-balance text-6xl font-semibold text-white sm:text-7xl">The future builder is not a slot machine.</h1>
        <p className="mt-6 max-w-3xl text-xl leading-9 text-white/62">
          Blueprint is a product bet: AI becomes more powerful when it operates inside excellent constraints. The user gets speed, polish, and refinement without surrendering stability.
        </p>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {beliefs.map((belief, index) => (
            <GlassPanel key={belief} className={index % 2 === 0 ? "p-7 md:translate-y-8" : "p-7"} interactive>
              <p className="text-sm font-semibold text-cyan-200">0{index + 1}</p>
              <h2 className="mt-5 text-2xl font-semibold text-white">{belief}</h2>
            </GlassPanel>
          ))}
        </div>
        <GlassPanel className="mt-16 p-8 sm:p-10">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-3xl font-semibold text-white">Built now as a local platform foundation.</h2>
              <p className="mt-3 max-w-2xl text-white/60">The next phase is the real blueprint library, richer section contracts, and AI-assisted structured content that stays inside the rails.</p>
            </div>
            <GradientButton href="/builder">
              Try the builder <ArrowRight className="h-4 w-4" />
            </GradientButton>
          </div>
        </GlassPanel>
      </section>
    </main>
  );
}
