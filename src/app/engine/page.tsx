"use client";

import { motion } from "framer-motion";
import { ArrowRight, Braces, FileCheck2, GitCompareArrows, Layers3, Radar, RefreshCcw, ShieldCheck } from "lucide-react";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { GlassPanel } from "@/components/ui/glass-panel";
import { FloatingBar } from "@/components/ui/floating-bar";
import { SvgIcon } from "@/components/ui/svg-icon";

const modules = [
  ["Classify", "intent-classifier.ts", "Extracts niche, business type, features, style, confidence, and pages.", Radar],
  ["Match", "blueprint-matcher.ts", "Scores blueprint definitions using deterministic weighted rules.", Layers3],
  ["Generate", "schema-generator.ts", "Creates ProjectSchema from intent plus contract-backed blueprint definitions.", Braces],
  ["Normalize", "schema-normalizer.ts", "Stabilizes ids, visibility, section order, theme, and data.", RefreshCcw],
  ["Validate", "schema-validator.ts", "Reports missing pages, duplicate ids, unknown kinds, and required sections.", FileCheck2],
  ["Patch", "schema-diff.ts", "Adds, removes, reorders, toggles, and updates sections through pure functions.", GitCompareArrows],
  ["Refine", "refinement-engine.ts", "Maps chat commands to safe schema edits without arbitrary code generation.", ShieldCheck]
];

export default function EnginePage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-28 pt-28">
      <AnimatedBackground />
      <section className="relative mx-auto max-w-7xl">
        <FloatingBar className="mb-6 w-fit">
          <SvgIcon name="schema" className="h-4 w-4 text-cyan-200" />
          <span className="pr-2 text-xs font-semibold text-white/70">Architecture visualizer</span>
        </FloatingBar>
        <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <h1 className="text-balance text-6xl font-semibold text-white">Contracts first. Intelligence second.</h1>
            <p className="mt-5 text-lg leading-8 text-white/62">
              Future AI can improve extraction and content, but the shippable surface remains blueprints, typed schemas, pure patches, and a deterministic renderer.
            </p>
          </div>
          <GlassPanel className="p-5">
            <div className="relative">
              <div className="absolute left-6 top-8 h-[calc(100%-4rem)] w-px bg-gradient-to-b from-cyan-200 via-white/30 to-violet-300" />
              <div className="space-y-3">
                {modules.map(([label, file, copy, Icon], index) => (
                  <motion.div
                    key={file as string}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative grid grid-cols-[3rem_1fr_auto] items-center gap-3 rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-3"
                  >
                    <span className="z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-slate-950">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-white">{label as string}</span>
                      <span className="block text-xs text-white/42">{file as string}</span>
                      <span className="mt-1 block text-sm text-white/58">{copy as string}</span>
                    </span>
                    {index < modules.length - 1 && <ArrowRight className="hidden h-4 w-4 text-white/28 md:block" />}
                  </motion.div>
                ))}
              </div>
            </div>
          </GlassPanel>
        </div>
      </section>
    </main>
  );
}
