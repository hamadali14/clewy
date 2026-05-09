"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function GlassShimmer({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[1.5rem] border border-white/12 bg-white/[0.06]", className)}>
      <motion.div
        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/24 to-transparent"
        animate={{ x: ["-120%", "320%"] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="h-full min-h-24" />
    </div>
  );
}

export function OrbitalProgress({ label = "Working" }: { label?: string }) {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.07] px-3 py-2 text-xs text-white/68 backdrop-blur-xl">
      <span className="relative grid h-7 w-7 place-items-center rounded-full border border-cyan-200/30">
        <motion.span className="absolute h-2 w-2 rounded-full bg-cyan-200" animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "14px 14px" }} />
        <Sparkles className="h-3.5 w-3.5 text-cyan-100" />
      </span>
      {label}
    </div>
  );
}

export function PipelineRail({ steps, activeStep }: { steps: string[]; activeStep: number }) {
  return (
    <div className="grid gap-2">
      {steps.map((step, index) => {
        const done = index < activeStep;
        const active = index === activeStep;
        return (
          <div key={step} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] px-3 py-2">
            {done ? <CheckCircle2 className="h-4 w-4 text-emerald-300" /> : <Loader2 className={cn("h-4 w-4 text-cyan-200", active && "animate-spin")} />}
            <span className={cn("text-sm", active ? "text-white" : "text-white/52")}>{step}</span>
          </div>
        );
      })}
    </div>
  );
}

export function BlueprintMatchingLoader() {
  return <OrbitalProgress label="Matching blueprint signals" />;
}

export function SchemaGenerationLoader() {
  return <OrbitalProgress label="Generating structured schema" />;
}

export function PreviewRenderLoader() {
  return <OrbitalProgress label="Rendering live preview" />;
}

export function RefinementLoader() {
  return <OrbitalProgress label="Applying safe refinement patch" />;
}

export function PublishLoader() {
  return <OrbitalProgress label="Preparing publish mock" />;
}
