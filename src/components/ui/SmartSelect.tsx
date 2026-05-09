"use client";

import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function SmartSelect({ tone = "light", className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { tone?: "light" | "dark" }) {
  return (
    <select
      {...props}
      className={cn(
        "w-full rounded-2xl border px-4 py-3 text-sm outline-none transition",
        tone === "light"
          ? "border-slate-200 bg-white text-slate-950 focus:border-slate-400"
          : "border-white/12 bg-slate-950 text-white focus:border-white/30",
        className
      )}
    >
      {children}
    </select>
  );
}
