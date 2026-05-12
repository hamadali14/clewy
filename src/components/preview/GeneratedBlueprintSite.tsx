"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Check, MousePointer2, Sparkles } from "lucide-react";
import type { ProjectSchema, SectionNode } from "@/core/types";
import { demoBackend } from "@/lib/demo-backend";
import { cn } from "@/lib/utils";

function stringList(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) return fallback;
  return value.map((item) => {
    if (typeof item === "string") return item;
    if (item && typeof item === "object") {
      const record = item as Record<string, unknown>;
      return String(record.name ?? record.title ?? record.label ?? fallback[0]);
    }
    return String(item);
  });
}

function text(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function runSectionAction(schema: ProjectSchema, section: SectionNode) {
  const action = stringList(section.data.sourceInteractions, ["submitContact"])[0];
  const payload = {
    blueprintKey: schema.blueprintKey,
    projectName: schema.name,
    sectionId: section.id,
    section: section.label,
    name: "Demo Customer",
    email: "demo@example.com",
    item: text(section.data.title, section.label)
  };

  if (action.toLowerCase().includes("cart")) return demoBackend.addToCart(payload);
  if (action.toLowerCase().includes("checkout")) return demoBackend.checkoutDemoPayment(payload);
  if (action.toLowerCase().includes("booking") || action.toLowerCase().includes("reservation")) return demoBackend.createBooking(payload);
  if (action.toLowerCase().includes("review")) return demoBackend.createReview(payload);
  if (action.toLowerCase().includes("favorite")) return demoBackend.addFavorite(payload);
  if (action.toLowerCase().includes("admin")) return demoBackend.createAdminItem(payload);
  return demoBackend.submitContactForm(payload);
}

function GeneratedSection({ schema, section, index, onAction }: { schema: ProjectSchema; section: SectionNode; index: number; onAction: (section: SectionNode) => void }) {
  const dna = schema.metadata?.visualDNA;
  const palette = dna?.palette ?? [schema.theme.surface ?? "#050713", schema.theme.accent, schema.theme.secondary ?? "#8b5cf6", "#ffffff"];
  const items = stringList(section.data.items ?? section.data.plans ?? section.data.products ?? section.data.metrics ?? section.data.quotes, ["Primary action", "Trust proof", "Conversion detail"]);
  const isHero = section.kind === "hero";
  const isOperational = ["dashboard", "listings", "products", "courses"].includes(section.kind);
  const isForm = ["booking", "contact", "valuation", "checkout"].includes(section.kind);

  if (isHero) {
    return (
      <section className="relative overflow-hidden rounded-[2.8rem] border border-white/12 bg-white/[0.075] p-8 shadow-[0_30px_110px_rgba(0,0,0,.34),inset_0_1px_0_rgba(255,255,255,.12)] backdrop-blur-2xl md:p-12 lg:col-span-full">
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 16% 16%, ${palette[1]}44, transparent 38rem), radial-gradient(ellipse at 86% 20%, ${palette[2]}33, transparent 34rem)` }} />
        <div className="relative grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-white/42">{text(section.data.eyebrow, schema.niche)}</p>
            <h1 className="mt-6 text-balance text-5xl font-semibold leading-none text-white md:text-7xl">{text(section.data.title, schema.name)}</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/62">{text(section.data.subtitle, schema.intent.goal)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => onAction(section)} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.03]">
                {text(section.data.cta, "Start action")}
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <span className="rounded-full border border-white/12 bg-white/[0.08] px-5 py-3 text-sm text-white/58">{dna?.navigationModel ?? "live blueprint"}</span>
            </div>
          </div>
          <div className="relative min-h-[340px] overflow-hidden rounded-[2rem] border border-white/12 bg-slate-950/42 p-5">
            <div className="absolute -right-10 top-8 h-44 w-44 rounded-full blur-3xl" style={{ background: palette[1] }} />
            <div className="relative grid h-full grid-rows-[1fr_auto] gap-4">
              <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.08] p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-white/38">{dna?.preset ?? "blueprint dna"}</p>
                <p className="mt-4 text-3xl font-semibold text-white">{dna?.layoutPattern ?? schema.blueprintKey}</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {items.slice(0, 3).map((item) => <div key={item} className="rounded-2xl bg-white/[0.08] p-3 text-xs text-white/62">{item}</div>)}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "group relative overflow-hidden border border-white/12 bg-white/[0.065] shadow-[0_20px_70px_rgba(0,0,0,.25),inset_0_1px_0_rgba(255,255,255,.12)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/22",
        isOperational ? "min-h-[330px] rounded-[2.2rem] p-6 md:col-span-2" : "min-h-[250px] rounded-[1.8rem] p-5",
        index % 5 === 2 && "md:-translate-y-4",
        index % 6 === 4 && "md:translate-y-5"
      )}
    >
      <div className="absolute inset-0 opacity-80" style={{ background: `radial-gradient(ellipse at ${index % 2 ? "80%" : "18%"} 12%, ${palette[(index % 3) + 1] ?? palette[1]}30, transparent 38%)` }} />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/36">{section.kind} / {section.data.sourceFeature ? String(section.data.sourceFeature) : "core"}</p>
            <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">{text(section.data.title, section.label)}</h2>
          </div>
          <span className="grid h-10 w-10 place-items-center rounded-full text-slate-950" style={{ background: palette[1] }}>
            <Sparkles className="h-4 w-4" />
          </span>
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/58">{text(section.data.detail ?? section.data.subtitle, "Deterministic section generated from the selected blueprint DNA.")}</p>
        {isForm ? (
          <div className="mt-5 grid gap-2 md:grid-cols-3">
            {stringList(section.data.fields, ["Name", "Email", "Message"]).slice(0, 4).map((field) => (
              <input key={field} placeholder={field} className="rounded-2xl border border-white/12 bg-slate-950/48 px-4 py-3 text-sm text-white outline-none placeholder:text-white/32" />
            ))}
          </div>
        ) : (
          <div className={cn("mt-5 grid gap-2", isOperational ? "md:grid-cols-3" : "")}>
            {items.slice(0, isOperational ? 6 : 3).map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/36 p-3 text-sm text-white/68">{item}</div>
            ))}
          </div>
        )}
        <button onClick={() => onAction(section)} className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.08] px-4 py-2 text-sm font-semibold text-white/70 transition hover:bg-white hover:text-slate-950">
          <MousePointer2 className="h-4 w-4" />
          {text(section.data.cta, "Run local action")}
        </button>
      </div>
    </section>
  );
}

export function GeneratedBlueprintSite({ schema, className }: { schema: ProjectSchema; className?: string }) {
  const [activePageId, setActivePageId] = useState(schema.pages[0]?.id ?? "page-home");
  const [message, setMessage] = useState("");
  const page = schema.pages.find((candidate) => candidate.id === activePageId) ?? schema.pages[0];
  const dna = schema.metadata?.visualDNA;
  const palette = dna?.palette ?? [schema.theme.surface ?? "#050713", schema.theme.accent, schema.theme.secondary ?? "#8b5cf6", "#ffffff"];
  const grid = useMemo(() => {
    if (dna?.density === "dense") return "lg:grid-cols-3";
    if (dna?.density === "airy") return "lg:grid-cols-2";
    return "lg:grid-cols-2";
  }, [dna?.density]);

  function onAction(section: SectionNode) {
    runSectionAction(schema, section);
    setMessage(`${text(section.data.title, section.label)} synced to local demo backend.`);
  }

  return (
    <main className={cn("relative min-h-full overflow-hidden bg-[#050713] text-white", className)} style={{ background: `radial-gradient(ellipse at 18% 6%, ${palette[1]}24, transparent 34rem), radial-gradient(ellipse at 88% 10%, ${palette[2]}20, transparent 36rem), linear-gradient(135deg, ${palette[0]}, #050713 55%, #02040a)` }}>
      <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,.75)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.75)_1px,transparent_1px)] [background-size:38px_38px]" />
      <div className="relative mx-auto max-w-7xl px-4 py-4">
        <nav className="sticky top-3 z-30 mb-5 flex flex-wrap items-center justify-between gap-3 rounded-full border border-white/12 bg-slate-950/58 px-4 py-3 shadow-[0_18px_60px_rgba(0,0,0,.28)] backdrop-blur-2xl">
          <div>
            <p className="text-sm font-semibold text-white">{schema.name}</p>
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/36">{schema.metadata?.archetype ?? schema.niche}</p>
          </div>
          <div className="flex gap-1 overflow-x-auto">
            {schema.pages.map((candidate) => (
              <button key={candidate.id} onClick={() => setActivePageId(candidate.id)} className={cn("shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition", candidate.id === activePageId ? "bg-white text-slate-950" : "text-white/50 hover:bg-white/10 hover:text-white")}>
                {candidate.title}
              </button>
            ))}
          </div>
        </nav>

        <div className={cn("grid gap-4", grid)}>
          {page.sections
            .filter((section) => section.visible)
            .sort((a, b) => a.order - b.order)
            .map((section, index) => <GeneratedSection key={section.id} schema={schema} section={section} index={index} onAction={onAction} />)}
        </div>
      </div>
      {message && (
        <div className="sticky bottom-5 z-40 mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-emerald-200/20 bg-emerald-200/12 px-4 py-3 text-sm text-emerald-50 shadow-[0_18px_60px_rgba(0,0,0,.28)] backdrop-blur-2xl">
          <Check className="h-4 w-4" />
          {message}
        </div>
      )}
    </main>
  );
}
