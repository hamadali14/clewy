"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function PremiumLoader({
  label = "Composing blueprint",
  variant = "pipeline",
  className
}: {
  label?: string;
  variant?: "circular" | "shimmer" | "pipeline" | "boot";
  className?: string;
}) {
  if (variant === "boot") {
    return (
      <div className={cn("relative overflow-hidden rounded-[2rem] border border-white/12 bg-slate-950/55 p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.24)]", className)}>
        <div className="absolute inset-x-8 top-0 h-20 rounded-b-[3rem] bg-cyan-200/20 blur-2xl" />
        <div className="relative flex items-center gap-4">
          <PremiumLoader label="" variant="circular" />
          <div>
            <p className="text-sm font-semibold">{label}</p>
            <p className="mt-1 text-xs text-white/42">Loading schema contracts and renderer rails</p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "circular") {
    return (
      <div className={cn("inline-flex items-center gap-3 text-sm text-white/64", className)}>
        <svg viewBox="0 0 48 48" className="h-7 w-7 animate-spin">
          <circle cx="24" cy="24" r="18" stroke="currentColor" strokeOpacity=".16" strokeWidth="5" fill="none" />
          <path d="M42 24a18 18 0 0 0-18-18" stroke="url(#loaderGradient)" strokeWidth="5" strokeLinecap="round" fill="none" />
          <defs>
            <linearGradient id="loaderGradient" x1="8" y1="8" x2="42" y2="42">
              <stop stopColor="#67e8f9" />
              <stop offset="1" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
        </svg>
        {label}
      </div>
    );
  }

  if (variant === "shimmer") {
    return (
      <div className={cn("overflow-hidden rounded-[1.5rem] border border-white/12 bg-white/[0.055] p-4", className)}>
        <motion.div
          className="h-24 rounded-2xl bg-gradient-to-r from-white/5 via-white/20 to-white/5"
          animate={{ x: ["-60%", "60%"] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    );
  }

  return (
    <div className={cn("rounded-[1.5rem] border border-white/12 bg-white/[0.06] p-4", className)}>
      <div className="mb-3 flex items-center justify-between text-sm text-white/68">
        <span>{label}</span>
        <PremiumLoader label="" variant="circular" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[0, 1, 2, 3].map((item) => (
          <motion.span
            key={item}
            className="h-2 rounded-full bg-gradient-to-r from-cyan-200 to-violet-300"
            animate={{ opacity: [0.25, 1, 0.25], scaleX: [0.6, 1, 0.6] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: item * 0.16 }}
          />
        ))}
      </div>
    </div>
  );
}
