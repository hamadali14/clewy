"use client";

import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function SmartTextarea({ tone = "light", className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { tone?: "light" | "dark" }) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full resize-none rounded-2xl border px-4 py-3 text-sm outline-none transition",
        tone === "light"
          ? "border-slate-200 bg-white text-slate-950 placeholder:text-slate-400 focus:border-slate-400"
          : "border-white/12 bg-slate-950/45 text-white placeholder:text-slate-400 focus:border-white/30",
        className
      )}
    />
  );
}
