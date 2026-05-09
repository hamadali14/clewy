"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function FloatingBar({ children, className, light = false }: { children: ReactNode; className?: string; light?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full border px-2 py-2 backdrop-blur-2xl",
        light ? "border-white/70 bg-white/62 text-slate-900 shadow-[0_16px_50px_rgba(80,100,130,0.16)]" : "border-white/12 bg-slate-950/48 text-white shadow-[0_16px_60px_rgba(0,0,0,0.26)]",
        className
      )}
    >
      {children}
    </div>
  );
}
