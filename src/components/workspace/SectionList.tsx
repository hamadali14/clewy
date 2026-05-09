"use client";

import { Eye, EyeOff } from "lucide-react";
import { toggleSectionVisibility } from "@/core/schema-diff";
import type { ProjectSchema } from "@/core/types";

export function SectionList({ schema, onChange, tone = "dark" }: { schema: ProjectSchema; onChange: (schema: ProjectSchema) => void; tone?: "dark" | "light" }) {
  const page = schema.pages[0];
  const light = tone === "light";
  return (
    <div>
      <p className={light ? "mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400" : "mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/42"}>Sections</p>
      <div className="space-y-2">
        {page.sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onChange(toggleSectionVisibility(schema, page.id, section.id, !section.visible))}
            className={light ? "flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-left transition hover:bg-white" : "flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.055] px-3 py-3 text-left transition hover:bg-white/10"}
          >
            <span>
              <span className={light ? "block text-sm font-medium text-slate-800" : "block text-sm font-medium text-white"}>{section.label}</span>
              <span className={light ? "block text-xs text-slate-400" : "block text-xs text-white/42"}>{section.kind}</span>
            </span>
            {section.visible ? <Eye className="h-4 w-4 text-teal-500" /> : <EyeOff className={light ? "h-4 w-4 text-slate-300" : "h-4 w-4 text-white/34"} />}
          </button>
        ))}
      </div>
    </div>
  );
}
