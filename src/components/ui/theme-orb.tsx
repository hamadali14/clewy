"use client";

import { cn } from "@/lib/utils";

export function ThemeOrb({ color, active = false, onClick, label }: { color: string; active?: boolean; onClick?: () => void; label: string }) {
  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      className={cn("relative h-9 w-9 rounded-full border border-white/18 transition hover:scale-105", active && "ring-2 ring-white/70 ring-offset-2 ring-offset-slate-950")}
      style={{ background: color }}
    >
      <span className="absolute inset-1 rounded-full bg-white/20 blur-[1px]" />
    </button>
  );
}
