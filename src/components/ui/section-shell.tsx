"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionShell({
  children,
  label,
  className
}: {
  children: ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <motion.section
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className={cn("group relative", className)}
    >
      {label && (
        <div className="pointer-events-none absolute left-4 top-4 z-20 translate-y-1 rounded-full border border-cyan-200/40 bg-slate-950/70 px-3 py-1 text-[11px] font-semibold text-cyan-100 opacity-0 shadow-lg backdrop-blur-xl transition group-hover:translate-y-0 group-hover:opacity-100">
          Edit {label}
        </div>
      )}
      {children}
    </motion.section>
  );
}
