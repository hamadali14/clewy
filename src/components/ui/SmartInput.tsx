"use client";

import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function SmartInput({ tone = "light", className, ...props }: InputHTMLAttributes<HTMLInputElement> & { tone?: "light" | "dark" }) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-2xl border px-4 py-3 text-sm outline-none transition",
        tone === "light"
          ? "border-slate-200 bg-white text-slate-950 placeholder:text-slate-400 focus:border-slate-400"
          : "border-white/12 bg-slate-950/45 text-white placeholder:text-slate-400 focus:border-white/30",
        className
      )}
    />
  );
}
