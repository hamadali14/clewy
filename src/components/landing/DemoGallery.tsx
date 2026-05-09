"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { blueprintCatalog } from "@/core/blueprint-catalog";
import { GradientButton } from "@/components/ui/gradient-button";
import { cn } from "@/lib/utils";

const promptFor = (key: string, label: string) => `Build a premium ${label.toLowerCase()} website with booking, pricing, gallery and contact. Use blueprint ${key}.`;

const industries = ["all", ...Array.from(new Set(blueprintCatalog.map((item) => item.niche)))];
const styles = ["all", "luxury", "dark", "modern", "premium", "friendly", "minimal"];

export function DemoGallery({ limit = blueprintCatalog.length }: { limit?: number }) {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("all");
  const [style, setStyle] = useState("all");

  const filtered = useMemo(
    () =>
      blueprintCatalog
        .filter((blueprint) => industry === "all" || blueprint.niche === industry)
        .filter((blueprint) => style === "all" || blueprint.styleTags.includes(style as never))
        .filter((blueprint) => {
          const haystack = `${blueprint.label} ${blueprint.niche} ${blueprint.supportedFeatures.join(" ")} ${blueprint.scoreKeywords.join(" ")}`.toLowerCase();
          return haystack.includes(query.toLowerCase());
        })
        .slice(0, limit),
    [industry, limit, query, style]
  );

  return (
    <div>
      <div className="mb-6 grid gap-3 lg:grid-cols-[1fr_auto_auto]">
        <label className="flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.08] px-4 py-3 text-white/70 backdrop-blur-xl">
          <Search className="h-4 w-4" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search blueprints, features, industries" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-white/34" />
        </label>
        <select value={industry} onChange={(event) => setIndustry(event.target.value)} className="rounded-full border border-white/12 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none">
          {industries.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select value={style} onChange={(event) => setStyle(event.target.value)} className="rounded-full border border-white/12 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none">
          {styles.map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((blueprint) => {
          const styleConfig = styleFor(blueprint.key);
          return (
            <div key={blueprint.key} className={cn("group relative overflow-hidden rounded-[2.1rem] border p-3 shadow-[0_24px_70px_rgba(20,40,80,0.16)] backdrop-blur-2xl transition hover:-translate-y-1", styleConfig.shell)}>
              <div className="absolute inset-x-6 top-0 h-24 rounded-b-[3rem] blur-3xl transition group-hover:opacity-90" style={{ background: blueprint.preview.accent, opacity: 0.32 }} />
              <div className={cn("relative mb-3 h-44 overflow-hidden rounded-[1.65rem] border", styleConfig.visual)}>
                <div className="absolute left-5 top-5 rounded-full border border-white/24 bg-white/28 px-3 py-1 text-xs font-semibold text-white backdrop-blur-xl">{blueprint.niche}</div>
                <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2">
                  {blueprint.pages.slice(0, 3).map((page) => <span key={page.type} className="rounded-2xl bg-white/25 px-3 py-3 text-xs text-white/80 backdrop-blur-xl">{page.label}</span>)}
                </div>
              </div>
              <div className={cn("relative rounded-[1.6rem] border p-5", styleConfig.card)}>
                <p className={cn("text-xs font-semibold uppercase tracking-[0.18em]", styleConfig.muted)}>{blueprint.preview.visualIdentity}</p>
                <h3 className={cn("mt-4 text-xl font-semibold", styleConfig.heading)}>{blueprint.label}</h3>
                <p className={cn("mt-2 text-sm leading-6", styleConfig.muted)}>{blueprint.preview.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {blueprint.supportedFeatures.slice(0, 4).map((feature) => (
                    <span key={feature} className={cn("rounded-full border px-3 py-1 text-xs", styleConfig.chip)}>{feature}</span>
                  ))}
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <GradientButton href={`/builder?prompt=${encodeURIComponent(promptFor(blueprint.key, blueprint.label))}`} variant={styleConfig.button} className="w-full">
                  Open demo
                </GradientButton>
                <GradientButton href={`/builder?prompt=${encodeURIComponent(`Use ${blueprint.key} for my new website`)}`} variant={styleConfig.buttonAlt} className="w-full">
                  Use blueprint
                </GradientButton>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function styleFor(key: string) {
  type ButtonVariant = "primary" | "secondary" | "ink" | "light";
  type DemoStyle = {
    shell: string;
    visual: string;
    card: string;
    heading: string;
    muted: string;
    chip: string;
    button: ButtonVariant;
    buttonAlt: ButtonVariant;
  };
  const dark = {
    card: "border-white/10 bg-slate-950/48",
    heading: "text-white",
    muted: "text-white/54",
    chip: "border-white/10 bg-white/[0.06] text-white/54",
    button: "primary" as const,
    buttonAlt: "secondary" as const
  };
  const light = {
    card: "border-white/70 bg-white/58",
    heading: "text-slate-950",
    muted: "text-slate-600",
    chip: "border-slate-200 bg-white/70 text-slate-600",
    button: "ink" as const,
    buttonAlt: "light" as const
  };
  const styles: Record<string, DemoStyle> = {
    "restaurant-luxury": { ...dark, shell: "border-amber-200/30 bg-[#120906]/82", visual: "border-amber-200/20 bg-[linear-gradient(135deg,#050403,#d6b46a)]" },
    "dental-clinic-premium": { ...light, shell: "border-cyan-100/80 bg-cyan-50/74", visual: "border-cyan-100 bg-[linear-gradient(135deg,#ecfeff,#5eead4,#38bdf8)]" },
    "ai-saas-launch": { ...dark, shell: "border-violet-200/30 bg-slate-950/78", visual: "border-violet-200/20 bg-[linear-gradient(135deg,#050816,#22d3ee,#8b5cf6)]" },
    "gym-fitness-energy": { ...dark, shell: "border-orange-200/25 bg-black/82", visual: "border-orange-200/20 bg-[linear-gradient(135deg,#030303,#ef4444,#a3e635)]" },
    "real-estate-premium": { ...light, shell: "border-stone-200 bg-[#f3eadb]/82", visual: "border-stone-200 bg-[linear-gradient(135deg,#fffaf2,#c5a46d,#111)]" },
    "beauty-spa-glow": { ...light, shell: "border-pink-100 bg-[#fff7fb]/82", visual: "border-pink-100 bg-[linear-gradient(135deg,#fff7fb,#f0a6c1,#f8e4bd)]" },
    "auto-detailing-pro": { ...dark, shell: "border-sky-200/25 bg-slate-950/82", visual: "border-sky-200/20 bg-[linear-gradient(135deg,#020617,#38bdf8,#94a3b8)]" },
    "law-firm-authority": { ...dark, shell: "border-amber-200/25 bg-[#071426]/84", visual: "border-amber-200/20 bg-[linear-gradient(135deg,#071426,#d6b46a)]" },
    "event-photographer-gallery": { ...dark, shell: "border-orange-200/25 bg-black/82", visual: "border-orange-200/20 bg-[linear-gradient(135deg,#030303,#f59e0b)]" },
    "course-academy-modern": { ...light, shell: "border-blue-100 bg-[#f8fbff]/82", visual: "border-blue-100 bg-[linear-gradient(135deg,#f8fbff,#60a5fa,#8b5cf6,#22c55e)]" }
  };
  return styles[key] ?? styles["ai-saas-launch"];
}
