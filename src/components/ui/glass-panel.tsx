"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "dark" | "light" | "mist" | "solid";

const tones: Record<Tone, string> = {
  dark: "border-white/12 bg-slate-950/42 text-white shadow-[0_24px_90px_rgba(0,0,0,0.28)]",
  light: "border-white/70 bg-white/56 text-slate-950 shadow-[0_24px_80px_rgba(90,116,148,0.16)]",
  mist: "border-white/28 bg-white/20 text-white shadow-[0_20px_70px_rgba(20,40,80,0.16)]",
  solid: "border-slate-200/70 bg-white text-slate-950 shadow-[0_20px_70px_rgba(70,90,130,0.12)]"
};

export function GlassPanel({
  children,
  className,
  tone = "dark",
  interactive = false,
  as = "div"
}: {
  children: ReactNode;
  className?: string;
  tone?: Tone;
  interactive?: boolean;
  as?: "div" | "section" | "article";
}) {
  const Component = motion[as];

  return (
    <Component
      whileHover={interactive ? { y: -5, scale: 1.01 } : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className={cn("relative overflow-hidden rounded-[2rem] border backdrop-blur-2xl", tones[tone], className)}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-70" />
      {children}
    </Component>
  );
}
