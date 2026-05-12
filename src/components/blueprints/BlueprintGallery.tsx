"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, CheckCircle2, Search } from "lucide-react";
import type { AppArchetype, BlueprintDefinition, IndustryKey } from "@/core/blueprint-types";
import { appArchetypes, industries } from "@/core/blueprint-registries";
import { cn } from "@/lib/utils";

export function BlueprintGallery({ blueprints }: { blueprints: BlueprintDefinition[] }) {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState<IndustryKey | "all">("all");
  const [archetype, setArchetype] = useState<AppArchetype | "all">("all");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return blueprints.filter((blueprint) => {
      const matchesQuery = !normalized || [blueprint.name, blueprint.key, blueprint.description, blueprint.industry, blueprint.archetype, blueprint.visualDNA.signature].join(" ").toLowerCase().includes(normalized);
      const matchesIndustry = industry === "all" || blueprint.industry === industry;
      const matchesArchetype = archetype === "all" || blueprint.archetype === archetype;
      return matchesQuery && matchesIndustry && matchesArchetype;
    });
  }, [archetype, blueprints, industry, query]);

  return (
    <section className="mt-8">
      <div className="sticky top-20 z-20 rounded-[2rem] border border-white/12 bg-slate-950/58 p-3 shadow-[0_24px_90px_rgba(0,0,0,.28)] backdrop-blur-2xl">
        <div className="grid gap-3 lg:grid-cols-[1fr_220px_250px]">
          <label className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.07] px-4">
            <Search className="h-4 w-4 text-white/40" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search industry, workflow, visual DNA..." className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/32" />
          </label>
          <select value={industry} onChange={(event) => setIndustry(event.target.value as IndustryKey | "all")} className="rounded-full border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none">
            <option value="all">All industries</option>
            {industries.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
          </select>
          <select value={archetype} onChange={(event) => setArchetype(event.target.value as AppArchetype | "all")} className="rounded-full border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none">
            <option value="all">All archetypes</option>
            {Object.entries(appArchetypes).map(([key, item]) => <option key={key} value={key}>{item.label}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-white/50">
        <span>{filtered.length} blueprints ready</span>
        <span>All generated from strict contracts</span>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((blueprint, index) => (
          <Link
            href={`/blueprints/${blueprint.key}`}
            key={blueprint.key}
            className={cn(
              "group relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.065] p-5 shadow-[0_20px_70px_rgba(0,0,0,.24)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-white/24",
              index % 5 === 1 && "md:translate-y-6",
              index % 7 === 3 && "xl:-translate-y-4"
            )}
          >
            <div className="absolute inset-0 opacity-80" style={{ background: `radial-gradient(ellipse at 18% 12%, ${blueprint.visualDNA.palette[1]}44, transparent 38%), radial-gradient(ellipse at 86% 18%, ${blueprint.visualDNA.palette[2]}24, transparent 42%)` }} />
            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-white/42">{blueprint.industry}</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">{blueprint.name}</h2>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-slate-950 transition group-hover:scale-110">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-4 line-clamp-3 text-sm leading-6 text-white/58">{blueprint.description}</p>
              <div className="mt-6 h-36 rounded-[1.5rem] border border-white/12 bg-slate-950/40 p-4">
                <div className="flex h-full gap-3">
                  <div className="w-1/3 rounded-[1.1rem]" style={{ background: blueprint.visualDNA.palette[1] }} />
                  <div className="flex-1 space-y-3">
                    <div className="h-5 rounded-full bg-white/18" />
                    <div className="h-16 rounded-[1rem] bg-white/10" />
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-8 rounded-full bg-white/10" />
                      <div className="h-8 rounded-full bg-white/10" />
                      <div className="h-8 rounded-full bg-white/10" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-xs text-white/58">{blueprint.archetype}</span>
                <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-xs text-white/58">{blueprint.visualDNA.preset}</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200/20 bg-emerald-200/10 px-3 py-1 text-xs text-emerald-100">
                  <CheckCircle2 className="h-3 w-3" />
                  target {blueprint.qualityScoreTarget}
                </span>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 text-xs text-white/42">
                <span>{blueprint.pages.length} pages</span>
                <span>{blueprint.features.length} features</span>
                <span>{blueprint.workflows.length} flows</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
