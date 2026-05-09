"use client";

import { Layers3 } from "lucide-react";
import type { BlueprintDefinition } from "@/core/types";
import { GlassPanel } from "@/components/ui/glass-panel";

export function BlueprintCard({ blueprint, score, tone = "dark" }: { blueprint: BlueprintDefinition; score?: number; tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <GlassPanel tone={light ? "solid" : "dark"} interactive className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className={light ? "grid h-11 w-11 place-items-center rounded-2xl bg-slate-100" : "grid h-11 w-11 place-items-center rounded-2xl bg-white/10"}>
          <Layers3 className="h-5 w-5" style={{ color: blueprint.preview.accent }} />
        </div>
        {typeof score === "number" && <span className={light ? "rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500" : "rounded-full bg-white/10 px-3 py-1 text-xs text-white/62"}>{score} match</span>}
      </div>
      <h3 className={light ? "mt-5 text-lg font-semibold text-slate-950" : "mt-5 text-lg font-semibold text-white"}>{blueprint.label}</h3>
      <p className={light ? "mt-2 text-sm leading-6 text-slate-500" : "mt-2 text-sm leading-6 text-white/58"}>{blueprint.preview.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {blueprint.supportedFeatures.slice(0, 4).map((feature) => (
          <span key={feature} className={light ? "rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-500" : "rounded-full border border-white/10 bg-white/[0.055] px-3 py-1 text-xs text-white/50"}>
            {feature}
          </span>
        ))}
      </div>
    </GlassPanel>
  );
}
