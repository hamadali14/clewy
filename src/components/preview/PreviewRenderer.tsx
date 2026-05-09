"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Calendar, Check, MapPin, MessageSquare, Shield, Sparkles, Star, Zap } from "lucide-react";
import type { ProjectSchema, SectionNode } from "@/core/types";
import { cn } from "@/lib/utils";
import { SectionShell } from "@/components/ui/section-shell";
import { NoiseOverlay } from "@/components/ui/noise-overlay";

function text(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function list(value: unknown, fallback: string[]) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : fallback;
}

function tone(schema: ProjectSchema) {
  const light = schema.theme.mode === "light";
  return {
    light,
    page: light ? "bg-[#f5f8fb] text-slate-950" : "bg-[#050812] text-white",
    soft: light ? "border-slate-200/80 bg-white/68 text-slate-950" : "border-white/12 bg-white/[0.065] text-white",
    muted: light ? "text-slate-600" : "text-white/62",
    heading: light ? "text-slate-950" : "text-white"
  };
}

function blueprintSkin(schema: ProjectSchema) {
  const key = schema.blueprintKey;
  const skins: Record<string, string> = {
    "restaurant-luxury": "bg-[radial-gradient(ellipse_at_75%_10%,rgba(214,180,106,.18),transparent_30rem),linear-gradient(135deg,#050403,#160d08)]",
    "dental-clinic-premium": "bg-[radial-gradient(ellipse_at_20%_5%,rgba(94,234,212,.24),transparent_32rem),linear-gradient(135deg,#f0fdff,#eaf7ff)]",
    "ai-saas-launch": "bg-[radial-gradient(ellipse_at_72%_10%,rgba(139,92,246,.25),transparent_34rem),linear-gradient(135deg,#050816,#0b1024)]",
    "gym-fitness-energy": "bg-[radial-gradient(ellipse_at_70%_10%,rgba(249,115,22,.24),transparent_34rem),linear-gradient(135deg,#030303,#120707)]",
    "real-estate-premium": "bg-[radial-gradient(ellipse_at_20%_8%,rgba(197,164,109,.22),transparent_34rem),linear-gradient(135deg,#f3eadb,#fffaf2)]",
    "beauty-spa-glow": "bg-[radial-gradient(ellipse_at_75%_8%,rgba(240,166,193,.24),transparent_32rem),linear-gradient(135deg,#fff7fb,#fffdf7)]",
    "auto-detailing-pro": "bg-[radial-gradient(ellipse_at_80%_10%,rgba(56,189,248,.22),transparent_34rem),linear-gradient(135deg,#020617,#0f172a)]",
    "law-firm-authority": "bg-[radial-gradient(ellipse_at_70%_10%,rgba(214,180,106,.18),transparent_34rem),linear-gradient(135deg,#071426,#050b14)]",
    "event-photographer-gallery": "bg-[radial-gradient(ellipse_at_70%_10%,rgba(245,158,11,.2),transparent_34rem),linear-gradient(135deg,#030303,#130d08)]",
    "course-academy-modern": "bg-[radial-gradient(ellipse_at_75%_10%,rgba(96,165,250,.24),transparent_32rem),linear-gradient(135deg,#f8fbff,#eef6ff)]"
  };
  return skins[key] ?? "";
}

function PreviewButton({ children, accent }: { children: string; accent: string }) {
  return (
    <button
      className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_16px_42px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5"
      style={{ background: `linear-gradient(135deg, #ffffff, ${accent})` }}
    >
      {children}
      <ArrowUpRight className="h-4 w-4" />
    </button>
  );
}

function Nav({ schema, activePageId, onPageChange }: { schema: ProjectSchema; activePageId: string; onPageChange: (id: string) => void }) {
  const t = tone(schema);
  return (
    <div className={cn("sticky top-3 z-30 mx-3 mb-5 flex items-center justify-between rounded-full border px-4 py-3 backdrop-blur-2xl", t.light ? "border-white/80 bg-white/70 shadow-[0_18px_50px_rgba(80,100,130,0.12)]" : "border-white/12 bg-slate-950/58")}>
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-full text-slate-950" style={{ background: schema.theme.accent }}>
          <Sparkles className="h-4 w-4" />
        </span>
        <div>
          <p className={cn("text-sm font-semibold", t.heading)}>{schema.name}</p>
          <p className={cn("text-[11px]", t.muted)}>{schema.intent.businessType}</p>
        </div>
      </div>
      <div className={cn("hidden gap-2 text-xs font-medium md:flex", t.muted)}>
        {schema.pages.map((page) => (
          <button
            key={page.id}
            onClick={() => onPageChange(page.id)}
            className={cn("rounded-full px-3 py-1.5 transition hover:bg-white/12", activePageId === page.id && (t.light ? "bg-slate-950 text-white" : "bg-white text-slate-950"))}
          >
            {page.title}
          </button>
        ))}
      </div>
    </div>
  );
}

function Hero({ section, schema }: { section: SectionNode; schema: ProjectSchema }) {
  const compact = Boolean(section.data.compact);
  const t = tone(schema);
  return (
    <div className={cn("relative isolate overflow-hidden rounded-[2.4rem] border p-7 sm:p-12", t.soft, compact ? "min-h-[340px]" : "min-h-[520px]")}>
      <NoiseOverlay />
      <div className="absolute inset-x-8 top-0 h-28 rounded-b-[3rem] opacity-60 blur-3xl" style={{ background: `linear-gradient(90deg, transparent, ${schema.theme.accent}88, transparent)` }} />
      <div className="relative z-10 grid h-full items-center gap-8 lg:grid-cols-[1.08fr_.92fr]">
        <div>
          <span className={cn("rounded-full border px-3 py-1 text-xs font-semibold", t.light ? "border-slate-200 bg-white/70 text-slate-600" : "border-white/14 bg-white/10 text-white/70")}>
            {text(section.data.eyebrow, schema.name)}
          </span>
          <h1 className={cn("mt-6 text-balance text-4xl font-semibold tracking-normal sm:text-6xl", t.heading)}>
            {text(section.data.title, schema.name)}
          </h1>
          <p className={cn("mt-5 max-w-2xl text-base leading-7 sm:text-lg", t.muted)}>{text(section.data.subtitle, "A premium structured preview.")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PreviewButton accent={schema.theme.accent}>{text(section.data.cta, "Start now")}</PreviewButton>
            <button className={cn("rounded-full border px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5", t.light ? "border-slate-200 bg-white/70 text-slate-800" : "border-white/14 bg-white/10 text-white/80")}>
              Explore sections
            </button>
          </div>
        </div>
        <div className={cn("relative hidden min-h-[310px] rounded-[2rem] border p-4 lg:block", t.light ? "border-slate-200/80 bg-white/62" : "border-white/12 bg-slate-950/28")}>
          <div className="absolute -right-10 top-10 h-40 w-40 rounded-[3rem] blur-3xl" style={{ background: `${schema.theme.accent}66` }} />
          <div className="relative grid h-full grid-rows-[1fr_auto] gap-4">
            <div className={cn("rounded-[1.5rem] border p-5", t.soft)}>
              <p className={cn("text-xs font-semibold uppercase tracking-[0.18em]", t.muted)}>Blueprint fit</p>
              <p className={cn("mt-5 text-5xl font-semibold", t.heading)}>94%</p>
              <div className="mt-6 grid gap-2">
                {["Intent", "Schema", "Renderer"].map((item) => (
                  <div key={item} className={cn("flex items-center justify-between rounded-full px-3 py-2 text-sm", t.light ? "bg-slate-100" : "bg-white/8")}>
                    <span>{item}</span>
                    <Check className="h-4 w-4" style={{ color: schema.theme.accent }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {["Patch", "Theme", "Ship"].map((item) => (
                <div key={item} className={cn("rounded-2xl p-3 text-xs font-medium", t.light ? "bg-slate-100 text-slate-600" : "bg-white/8 text-white/58")}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureBand({ section, schema }: { section: SectionNode; schema: ProjectSchema }) {
  const t = tone(schema);
  const items = list(section.data.items, ["Blueprint logic", "Structured schema", "Live preview"]);
  return (
    <div className="py-10">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className={cn("max-w-xl text-3xl font-semibold", t.heading)}>{text(section.data.title, section.label)}</h2>
        <span className={cn("hidden rounded-full border px-3 py-1 text-xs md:block", t.light ? "border-slate-200 bg-white/70 text-slate-500" : "border-white/12 bg-white/8 text-white/54")}>section registry</span>
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_1.2fr_.9fr]">
        {items.map((item, index) => (
          <div
            key={item}
            className={cn("min-h-44 rounded-[2rem] border p-5 transition hover:-translate-y-1", t.soft, index === 1 && "md:-mt-6")}
          >
            <div className="grid h-11 w-11 place-items-center rounded-2xl text-slate-950" style={{ background: schema.theme.accent }}>
              {index === 0 ? <Shield className="h-5 w-5" /> : index === 1 ? <Zap className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
            </div>
            <h3 className={cn("mt-7 text-lg font-semibold", t.heading)}>{item}</h3>
            <p className={cn("mt-2 text-sm leading-6", t.muted)}>A distinct section block controlled by schema, theme, and safe deterministic patches.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Pricing({ section, schema }: { section: SectionNode; schema: ProjectSchema }) {
  const t = tone(schema);
  const [yearly, setYearly] = useState(false);
  return (
    <div className="py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className={cn("text-3xl font-semibold", t.heading)}>{text(section.data.title, "Simple packages")}</h2>
        <button onClick={() => setYearly(!yearly)} className={cn("rounded-full border px-4 py-2 text-xs font-semibold", t.light ? "border-slate-200 bg-white text-slate-700" : "border-white/12 bg-white/8 text-white/66")}>
          {yearly ? "Yearly billing" : "Monthly billing"}
        </button>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {list(section.data.plans, ["Essential", "Growth", "Premier"]).map((plan, index) => (
          <div key={plan} className={cn("rounded-[2rem] border p-5", t.soft, index === 1 && "scale-[1.02]")} style={index === 1 ? { boxShadow: `0 24px 70px ${schema.theme.accent}22` } : undefined}>
            <p className={cn("text-sm", t.muted)}>{plan}</p>
            <p className={cn("mt-3 text-4xl font-semibold", t.heading)}>${yearly ? [490, 990, 1790][index] : [49, 99, 179][index]}</p>
            <p className={cn("mt-3 text-sm leading-6", t.muted)}>Structured plan content that can be hidden, edited, or expanded without changing renderer code.</p>
            <div className="mt-5"><PreviewButton accent={schema.theme.accent}>Choose plan</PreviewButton></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Testimonials({ section, schema }: { section: SectionNode; schema: ProjectSchema }) {
  const t = tone(schema);
  return (
    <div className="py-10">
      <div className={cn("relative overflow-hidden rounded-[2.4rem] border p-7", t.soft)}>
        <div className="absolute right-8 top-8 text-8xl font-semibold opacity-10" style={{ color: schema.theme.accent }}>“</div>
        <h2 className={cn("text-3xl font-semibold", t.heading)}>{text(section.data.title, "Trusted by clients")}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {list(section.data.quotes, ["A polished experience from start to finish.", "The first draft felt launch-ready."]).map((quote) => (
            <div key={quote} className={cn("rounded-[1.5rem] border p-5", t.light ? "border-slate-200/80 bg-white/68" : "border-white/10 bg-white/8")}>
              <Star className="h-5 w-5 text-amber-300" />
              <p className={cn("mt-4 leading-7", t.light ? "text-slate-700" : "text-white/74")}>{quote}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SimpleSection({ section, schema }: { section: SectionNode; schema: ProjectSchema }) {
  const t = tone(schema);
  const icons = [Calendar, MessageSquare, MapPin];
  const data = list(section.data.stats ?? section.data.items, ["Fast", "Stable", "Refinable"]).slice(0, 3);
  return (
    <div className="py-10">
      <div className={cn("grid gap-6 rounded-[2.4rem] border p-6 md:grid-cols-[.8fr_1.2fr]", t.soft)}>
        <div>
          <h2 className={cn("text-3xl font-semibold", t.heading)}>{text(section.data.title, section.label)}</h2>
          <p className={cn("mt-3 text-sm leading-6", t.muted)}>{text(section.data.detail, "A structured section generated from the active blueprint.")}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {data.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div key={item} className={cn("rounded-[1.5rem] p-4", t.light ? "bg-slate-100" : "bg-white/8")}>
                <Icon className="h-4 w-4" style={{ color: schema.theme.accent }} />
                <p className={cn("mt-8 text-sm font-semibold", t.heading)}>{item}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function InteractiveList({ section, schema }: { section: SectionNode; schema: ProjectSchema }) {
  const t = tone(schema);
  const [active, setActive] = useState(0);
  const items = list(section.data.items ?? section.data.categories ?? section.data.people, ["Signature", "Premium", "Concierge"]);
  return (
    <div className="py-10">
      <div className={cn("rounded-[2.4rem] border p-6", t.soft)}>
        <h2 className={cn("text-3xl font-semibold", t.heading)}>{text(section.data.title, section.label)}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-[.7fr_1.3fr]">
          <div className="grid gap-2">
            {items.map((item, index) => (
              <button key={item} onClick={() => setActive(index)} className={cn("rounded-2xl px-4 py-3 text-left text-sm transition", active === index ? "text-slate-950" : t.light ? "bg-white text-slate-600" : "bg-white/8 text-white/58")} style={active === index ? { background: schema.theme.accent } : undefined}>
                {item}
              </button>
            ))}
          </div>
          <div className={cn("min-h-56 rounded-[2rem] border p-6", t.light ? "border-slate-200 bg-white/72" : "border-white/10 bg-slate-950/28")}>
            <p className={cn("text-sm", t.muted)}>Selected</p>
            <p className={cn("mt-3 text-4xl font-semibold", t.heading)}>{items[active]}</p>
            <p className={cn("mt-4 max-w-xl text-sm leading-6", t.muted)}>Interactive blueprint content with hover and selection states, ready for real data or future API-backed enrichment.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormSection({ section, schema }: { section: SectionNode; schema: ProjectSchema }) {
  const t = tone(schema);
  return (
    <div className="py-10">
      <div className={cn("grid gap-6 rounded-[2.4rem] border p-6 lg:grid-cols-[.9fr_1.1fr]", t.soft)}>
        <div>
          <h2 className={cn("text-3xl font-semibold", t.heading)}>{text(section.data.title, "Book now")}</h2>
          <p className={cn("mt-3 text-sm leading-6", t.muted)}>{text(section.data.detail, "A conversion-ready interactive form mock.")}</p>
        </div>
        <div className="grid gap-3">
          {list(section.data.fields, ["Name", "Email", "Preferred date"]).map((field) => (
            <input key={field} aria-label={field} placeholder={field} className={cn("rounded-2xl border px-4 py-3 text-sm outline-none", t.light ? "border-slate-200 bg-white text-slate-950 placeholder:text-slate-400" : "border-white/10 bg-white/8 text-white placeholder:text-white/34")} />
          ))}
          <PreviewButton accent={schema.theme.accent}>{text(section.data.cta, "Submit request")}</PreviewButton>
        </div>
      </div>
    </div>
  );
}

function VisualProof({ section, schema }: { section: SectionNode; schema: ProjectSchema }) {
  const t = tone(schema);
  const [after, setAfter] = useState(true);
  return (
    <div className="py-10">
      <div className={cn("overflow-hidden rounded-[2.4rem] border p-6", t.soft)}>
        <div className="flex items-center justify-between gap-4">
          <h2 className={cn("text-3xl font-semibold", t.heading)}>{text(section.data.title, section.label)}</h2>
          <button onClick={() => setAfter(!after)} className="rounded-full px-4 py-2 text-xs font-semibold text-slate-950" style={{ background: schema.theme.accent }}>
            {after ? "After" : "Before"}
          </button>
        </div>
        <div className={cn("mt-6 h-72 rounded-[2rem] transition", after ? "scale-100 opacity-100" : "scale-[.98] opacity-70")} style={{ background: `radial-gradient(ellipse at 70% 20%, ${schema.theme.accent}66, transparent 45%), linear-gradient(135deg, rgba(255,255,255,.22), rgba(255,255,255,.04))` }} />
      </div>
    </div>
  );
}

function DashboardSection({ section, schema }: { section: SectionNode; schema: ProjectSchema }) {
  const t = tone(schema);
  return (
    <div className="py-10">
      <div className={cn("rounded-[2.4rem] border p-5", t.soft)}>
        <h2 className={cn("text-3xl font-semibold", t.heading)}>{text(section.data.title, "Live dashboard")}</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-[1.3fr_.7fr]">
          <div className={cn("rounded-[2rem] border p-4", t.light ? "border-slate-200 bg-white/72" : "border-white/10 bg-slate-950/36")}>
            <div className="grid gap-3 sm:grid-cols-3">
              {list(section.data.metrics ?? section.data.stats, ["Realtime", "Automated", "Ready"]).map((metric) => (
                <div key={metric} className={cn("rounded-2xl p-4", t.light ? "bg-slate-100" : "bg-white/8")}>
                  <p className={cn("text-sm font-semibold", t.heading)}>{metric}</p>
                  <div className="mt-8 h-2 rounded-full" style={{ background: `linear-gradient(90deg, ${schema.theme.accent}, transparent)` }} />
                </div>
              ))}
            </div>
            <div className="mt-4 h-44 rounded-[1.5rem]" style={{ background: `linear-gradient(135deg, ${schema.theme.accent}33, rgba(255,255,255,.06))` }} />
          </div>
          <div className="grid gap-3">
            {["Sync", "Score", "Deploy"].map((item) => (
              <div key={item} className={cn("rounded-2xl border p-4", t.light ? "border-slate-200 bg-white/70" : "border-white/10 bg-white/8")}>
                <p className={cn("text-sm font-semibold", t.heading)}>{item}</p>
                <p className={cn("mt-2 text-xs", t.muted)}>Interactive product state</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CTA({ section, schema }: { section: SectionNode; schema: ProjectSchema }) {
  const t = tone(schema);
  return (
    <div className="py-10">
      <div className="relative overflow-hidden rounded-[2.6rem] border border-white/18 p-10 text-center" style={{ background: `linear-gradient(135deg, ${schema.theme.accent}33, rgba(255,255,255,.16))` }}>
        <NoiseOverlay />
        <h2 className={cn("relative mx-auto max-w-2xl text-balance text-4xl font-semibold", t.heading)}>{text(section.data.title, "Ready to launch?")}</h2>
        <div className="relative mt-7"><PreviewButton accent={schema.theme.accent}>{text(section.data.cta, "Start building")}</PreviewButton></div>
      </div>
    </div>
  );
}

function renderSection(section: SectionNode, schema: ProjectSchema) {
  switch (section.kind) {
    case "hero":
      return <Hero section={section} schema={schema} />;
    case "services":
    case "features":
    case "gallery":
      return <FeatureBand section={section} schema={schema} />;
    case "pricing":
      return <Pricing section={section} schema={schema} />;
    case "booking":
    case "contact":
    case "valuation":
      return <FormSection section={section} schema={schema} />;
    case "menu":
    case "tabs":
    case "schedule":
    case "profiles":
    case "team":
    case "listings":
    case "filters":
    case "packages":
    case "vehicleSelector":
    case "caseResults":
    case "badges":
    case "portfolio":
    case "proofing":
    case "courses":
    case "progress":
    case "instructors":
    case "hours":
    case "story":
    case "map":
      return <InteractiveList section={section} schema={schema} />;
    case "beforeAfter":
    case "transformations":
      return <VisualProof section={section} schema={schema} />;
    case "dashboard":
      return <DashboardSection section={section} schema={schema} />;
    case "testimonials":
      return <Testimonials section={section} schema={schema} />;
    case "cta":
      return <CTA section={section} schema={schema} />;
    default:
      return <SimpleSection section={section} schema={schema} />;
  }
}

export function PreviewRenderer({ schema, className }: { schema: ProjectSchema; className?: string }) {
  const [activePageId, setActivePageId] = useState(schema.pages[0]?.id ?? "page-home");
  const page = schema.pages.find((candidate) => candidate.id === activePageId) ?? schema.pages[0];
  const t = tone(schema);

  return (
    <div className={cn("relative min-h-full transition", t.page, blueprintSkin(schema), className)} style={{ ["--accent" as string]: schema.theme.accent }}>
      <div className={cn("absolute inset-0", t.light ? "preview-grid opacity-80" : "bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:34px_34px] opacity-35")} />
      <div className="relative mx-auto max-w-6xl px-3 py-4 sm:px-6">
        <Nav schema={schema} activePageId={page.id} onPageChange={setActivePageId} />
        <AnimatePresence mode="popLayout">
          {page.sections
            .filter((section) => section.visible)
            .sort((a, b) => a.order - b.order)
            .map((section) => (
              <SectionShell key={section.id} label={section.label}>
                {renderSection(section, schema)}
              </SectionShell>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
