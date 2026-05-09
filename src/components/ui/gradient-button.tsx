"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ink" | "light";

const variants: Record<Variant, string> = {
  primary: "bg-[linear-gradient(135deg,#f8ffff,#8ff7df_42%,#9db7ff)] text-slate-950 shadow-[0_18px_50px_rgba(63,220,196,0.26)]",
  secondary: "border border-white/18 bg-white/12 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] hover:bg-white/18",
  ink: "bg-slate-950 text-white shadow-[0_18px_50px_rgba(0,0,0,0.22)] hover:bg-slate-800",
  light: "border border-slate-200/80 bg-white/70 text-slate-950 shadow-[0_18px_50px_rgba(80,100,130,0.14)] hover:bg-white"
};

export function GradientButton({
  children,
  href,
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; href?: string; variant?: Variant }) {
  const inner = (
    <motion.span
      whileTap={{ scale: 0.975 }}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition duration-200",
        variants[variant],
        className
      )}
    >
      {children}
    </motion.span>
  );

  if (href) return <Link href={href}>{inner}</Link>;

  return (
    <button {...props} className="contents">
      {inner}
    </button>
  );
}
