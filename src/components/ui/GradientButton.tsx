"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
};

const classes = {
  primary:
    "bg-[linear-gradient(135deg,#ffffff,#99f6e4_45%,#93c5fd)] text-slate-950 shadow-glow hover:brightness-110",
  secondary: "border border-white/15 bg-white/10 text-white hover:bg-white/15",
  ghost: "text-white/76 hover:bg-white/10"
};

export function GradientButton({ children, href, className, variant = "primary", ...props }: Props) {
  const content = (
    <motion.span
      whileTap={{ scale: 0.97 }}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition",
        classes[variant],
        className
      )}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return (
    <button {...props} className="contents">
      {content}
    </button>
  );
}
