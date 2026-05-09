"use client";

import { Check, X } from "lucide-react";

const rows = [
  ["Generation model", "Writes code from scratch", "Selects a proven blueprint"],
  ["Output shape", "Unpredictable file changes", "Typed project schema"],
  ["Refinement", "Prompt can rewrite everything", "Safe patch operations"],
  ["Preview", "Depends on generated code compiling", "Renderer is deterministic"],
  ["Scale path", "More prompts add fragility", "More blueprints add coverage"]
];

export function ComparisonTable() {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.06]">
      <div className="grid grid-cols-3 border-b border-white/10 bg-white/[0.06] text-sm font-semibold text-white">
        <div className="p-4">Dimension</div>
        <div className="p-4">AI-from-scratch</div>
        <div className="p-4">Blueprint-first</div>
      </div>
      {rows.map((row) => (
        <div key={row[0]} className="grid grid-cols-3 border-b border-white/8 last:border-b-0">
          <div className="p-4 text-sm text-white/70">{row[0]}</div>
          <div className="flex items-start gap-2 p-4 text-sm text-white/52">
            <X className="mt-0.5 h-4 w-4 text-rose-200" />
            {row[1]}
          </div>
          <div className="flex items-start gap-2 p-4 text-sm text-white/74">
            <Check className="mt-0.5 h-4 w-4 text-teal-200" />
            {row[2]}
          </div>
        </div>
      ))}
    </div>
  );
}
