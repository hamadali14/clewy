"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Boxes, Cable, GalleryHorizontalEnd, Home, Info, Layers3, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/builder", label: "Builder", icon: Sparkles },
  { href: "/workspace", label: "Workspace", icon: Layers3 },
  { href: "/demos", label: "Demos", icon: GalleryHorizontalEnd },
  { href: "/engine", label: "Engine", icon: Cable },
  { href: "/pricing", label: "Pricing", icon: Boxes },
  { href: "/about", label: "About", icon: Info }
];

export function FloatingDock() {
  const pathname = usePathname();

  if (pathname === "/builder" || pathname === "/workspace") return null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-1/2 z-50 hidden -translate-x-1/2 rounded-full border border-white/14 bg-slate-950/45 px-2 py-2 shadow-glass backdrop-blur-2xl md:block"
      aria-label="Main navigation"
    >
      <div className="flex items-center gap-1">
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={cn(
                "group relative grid h-11 w-11 place-items-center rounded-full text-white/66 transition hover:text-white",
                active && "bg-white/12 text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="pointer-events-none absolute -top-10 scale-95 rounded-full border border-white/12 bg-slate-950/80 px-3 py-1 text-xs opacity-0 shadow-glass backdrop-blur-xl transition group-hover:scale-100 group-hover:opacity-100">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
