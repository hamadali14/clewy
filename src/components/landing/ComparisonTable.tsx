"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Braces, Check, GitBranch, Sparkles, X } from "lucide-react";

const scenes = [
  {
    label: "Generation",
    chaos: "Blank-canvas AI rewrites structure on every prompt.",
    blueprint: "Intent selects a directed blueprint with known contracts."
  },
  {
    label: "Refinement",
    chaos: "Small text changes can mutate layout and behavior.",
    blueprint: "Patches target theme, content, sections, or pages."
  },
  {
    label: "Preview",
    chaos: "Preview depends on generated code staying valid.",
    blueprint: "Renderer stays deterministic while content evolves."
  }
];

export function ComparisonTable() {
  const [active, setActive] = useState(0);
  const scene = scenes[active];

  return (
    <div className="relative overflow-hidden rounded-[2.4rem] border border-white/12 bg-white/[0.06] p-5 backdrop-blur-2xl">
      <div className="absolute inset-x-10 top-0 h-24 rounded-b-[4rem] bg-cyan-200/20 blur-3xl" />
      <div className="relative flex flex-wrap gap-2">
        {scenes.map((item, index) => (
          <button
            key={item.label}
            onClick={() => setActive(index)}
            className={index === active ? "rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950" : "rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm text-white/58"}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="relative mt-6 grid gap-4 lg:grid-cols-2">
        <motion.div key={`chaos-${active}`} initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} className="min-h-80 rounded-[2rem] border border-rose-200/16 bg-rose-950/18 p-6">
          <div className="flex items-center gap-3 text-rose-100">
            <X className="h-5 w-5" />
            <span className="font-semibold">AI-from-scratch</span>
          </div>
          <p className="mt-5 text-2xl font-semibold text-white">{scene.chaos}</p>
          <div className="mt-8 grid gap-3">
            {[0, 1, 2].map((item) => (
              <motion.div key={item} animate={{ x: [0, item % 2 ? 12 : -10, 0], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2.4, repeat: Infinity, delay: item * 0.2 }} className="h-12 rounded-2xl border border-rose-200/12 bg-white/[0.045]" />
            ))}
          </div>
        </motion.div>
        <motion.div key={`blueprint-${active}`} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} className="min-h-80 rounded-[2rem] border border-cyan-200/20 bg-cyan-200/10 p-6">
          <div className="flex items-center gap-3 text-cyan-100">
            <Check className="h-5 w-5" />
            <span className="font-semibold">Blueprint-first</span>
          </div>
          <p className="mt-5 text-2xl font-semibold text-white">{scene.blueprint}</p>
          <div className="mt-8 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-3">
            <Node icon={<Sparkles className="h-4 w-4" />} label="Intent" />
            <GitBranch className="h-4 w-4 text-white/30" />
            <Node icon={<Braces className="h-4 w-4" />} label="Schema" />
            <GitBranch className="h-4 w-4 text-white/30" />
            <Node icon={<Check className="h-4 w-4" />} label="Preview" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Node({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="grid place-items-center rounded-[1.5rem] border border-white/12 bg-white/[0.08] p-4 text-center">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-slate-950">{icon}</span>
      <span className="mt-3 text-xs font-semibold text-white/66">{label}</span>
    </motion.div>
  );
}
