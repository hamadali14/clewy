"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Command, Search, Sparkles, X } from "lucide-react";
import { FloatingBar } from "@/components/ui/floating-bar";
import { cn } from "@/lib/utils";

const commands = [
  { label: "Open builder", href: "/builder", hint: "Start a realtime AI workspace" },
  { label: "Open workspace", href: "/workspace", hint: "Continue the live project" },
  { label: "Browse demos", href: "/demos", hint: "Explore blueprint identities" },
  { label: "View engine", href: "/engine", hint: "See the deterministic pipeline" },
  { label: "Pricing", href: "/pricing", hint: "Packaging preview" }
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed right-4 top-20 z-50 hidden rounded-full border border-white/12 bg-slate-950/46 px-3 py-2 text-xs font-semibold text-white/64 shadow-[0_18px_50px_rgba(0,0,0,.22)] backdrop-blur-2xl transition hover:text-white md:inline-flex"
      >
        <Command className="mr-2 h-3.5 w-3.5" />
        Ctrl K
      </button>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[80] bg-slate-950/55 p-4 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              className="mx-auto mt-24 max-w-2xl overflow-hidden rounded-[2rem] border border-white/14 bg-slate-950/78 shadow-[0_30px_120px_rgba(0,0,0,.42)] backdrop-blur-2xl"
            >
              <div className="flex items-center gap-3 border-b border-white/10 p-4">
                <Search className="h-5 w-5 text-cyan-200" />
                <input autoFocus placeholder="Search commands, routes, actions" className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-white/34" />
                <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full text-white/44 transition hover:bg-white/10 hover:text-white">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-3">
                {commands.map((command, index) => (
                  <Link
                    key={command.href}
                    href={command.href}
                    onClick={() => setOpen(false)}
                    className={cn("flex items-center justify-between rounded-[1.4rem] px-4 py-3 transition hover:bg-white/[0.075]", index === 0 && "bg-white/[0.055]")}
                  >
                    <span>
                      <span className="block text-sm font-semibold text-white">{command.label}</span>
                      <span className="block text-xs text-white/42">{command.hint}</span>
                    </span>
                    <Sparkles className="h-4 w-4 text-cyan-200/70" />
                  </Link>
                ))}
              </div>
              <div className="border-t border-white/10 p-4">
                <FloatingBar className="w-fit">
                  <span className="px-3 py-1.5 text-xs text-white/58">Realtime controls, snapshots, and AI refinements are available inside the builder.</span>
                </FloatingBar>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
