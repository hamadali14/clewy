"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Blocks, Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/builder", label: "Builder" },
  { href: "/workspace", label: "Workspace" },
  { href: "/demos", label: "Demos" },
  { href: "/engine", label: "Engine" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" }
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname === "/builder" || pathname === "/workspace") return null;

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-slate-950/36 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-2xl border border-white/14 bg-white/10">
            <Blocks className="h-5 w-5 text-teal-200" />
          </span>
          <span className="font-semibold text-white">Blueprint</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn("rounded-full px-4 py-2 text-sm text-white/58 transition hover:bg-white/10 hover:text-white", pathname === link.href && "bg-white/10 text-white")}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/8 text-white md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Open navigation">
          <Menu className="h-5 w-5" />
        </button>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-slate-950/88 p-3 md:hidden">
          <div className="grid gap-1">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-sm text-white/70 hover:bg-white/10">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
