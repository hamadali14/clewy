"use client";

import { motion } from "framer-motion";
import { ArrowRight, Braces, FileCheck2, Layers3, MessageSquare, Radar, WandSparkles } from "lucide-react";

const steps = [
  { label: "Prompt", icon: MessageSquare },
  { label: "Intent", icon: Radar },
  { label: "Blueprint Match", icon: Layers3 },
  { label: "Schema", icon: Braces },
  { label: "Preview", icon: FileCheck2 },
  { label: "Refinement", icon: WandSparkles }
];

export function PipelineAnimation() {
  return (
    <div className="grid gap-3 md:grid-cols-6">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.07 }}
            className="relative rounded-3xl border border-white/12 bg-white/[0.065] p-4"
          >
            <Icon className="h-5 w-5 text-teal-200" />
            <p className="mt-4 text-sm font-semibold text-white">{step.label}</p>
            {index < steps.length - 1 && <ArrowRight className="absolute -right-5 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-white/28 md:block" />}
          </motion.div>
        );
      })}
    </div>
  );
}
