"use client";

import { updateTheme } from "@/core/schema-diff";
import { styleAccents } from "@/core/blueprint-contracts";
import type { ProjectSchema, StyleToken } from "@/core/types";
import { cn } from "@/lib/utils";

const themes: Array<{ label: string; value: StyleToken; mode: "light" | "dark" }> = [
  { label: "Minimal", value: "minimal", mode: "light" },
  { label: "Modern", value: "modern", mode: "dark" },
  { label: "Luxury", value: "luxury", mode: "dark" },
  { label: "Dark premium", value: "dark", mode: "dark" }
];

export function ThemeSelector({ schema, onChange }: { schema: ProjectSchema; onChange: (schema: ProjectSchema) => void }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/42">Theme</p>
      <div className="grid gap-2">
        {themes.map((theme) => (
          <button
            key={theme.value}
            onClick={() => onChange(updateTheme(schema, { style: theme.value, mode: theme.mode, accent: styleAccents[theme.value] }))}
            className={cn(
              "flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.055] px-3 py-3 text-left text-sm text-white/70 transition hover:bg-white/10",
              schema.theme.style === theme.value && "border-white/24 bg-white/12 text-white"
            )}
          >
            {theme.label}
            <span className="h-3 w-3 rounded-full" style={{ background: styleAccents[theme.value] }} />
          </button>
        ))}
      </div>
    </div>
  );
}
