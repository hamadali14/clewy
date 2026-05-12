"use client";

import { useMemo, useState } from "react";
import { Check, MousePointer2, Sparkles } from "lucide-react";
import type { AssembledBlueprintPage, AssembledBlueprintSchema, AssembledBlueprintNode } from "@/core/blueprint-assembler";
import { demoBackend } from "@/lib/demo-backend";
import { cn } from "@/lib/utils";

type DemoResult = { label: string; detail: string };

function runDemoAction(action: string, payload: Record<string, unknown>) {
  switch (action) {
    case "createBooking":
      return demoBackend.createBooking(payload);
    case "cancelBooking":
      return demoBackend.cancelBooking(String(payload.id ?? ""));
    case "createOrder":
      return demoBackend.createOrder(payload);
    case "addToCart":
      return demoBackend.addToCart(payload);
    case "checkoutDemoPayment":
      return demoBackend.checkoutDemoPayment(payload);
    case "submitContactForm":
      return demoBackend.submitContactForm(payload);
    case "loginDemoUser":
      return demoBackend.loginDemoUser(payload);
    case "registerDemoUser":
      return demoBackend.registerDemoUser(payload);
    case "updateProfile":
      return demoBackend.updateProfile(payload);
    case "createReview":
      return demoBackend.createReview(payload);
    case "addFavorite":
      return demoBackend.addFavorite(payload);
    case "redeemReward":
      return demoBackend.redeemReward(payload);
    case "createAdminItem":
      return demoBackend.createAdminItem(payload);
    case "updateAdminItem":
      return demoBackend.updateAdminItem(payload);
    case "deleteAdminItem":
      return demoBackend.deleteAdminItem(payload);
    default:
      return demoBackend.updateProfile(payload);
  }
}

function NodeCard({ node, schema, onAction }: { node: AssembledBlueprintNode; schema: AssembledBlueprintSchema; onAction: (action: string, label: string) => void }) {
  const isLarge = ["hero", "dashboard", "gallery", "map"].includes(node.kind);
  const isForm = ["form", "checkout", "wizard", "calendar"].includes(node.kind);
  const primaryAction = schema.interactions.find((interaction) => node.interactionKeys.includes(interaction.key)) ?? schema.interactions[0];

  return (
    <section
      className={cn(
        "group relative overflow-hidden border border-white/12 bg-white/[0.07] shadow-[0_20px_70px_rgba(0,0,0,.25),inset_0_1px_0_rgba(255,255,255,.12)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/24",
        isLarge ? "min-h-[310px] rounded-[2.2rem] p-7 md:col-span-2" : "min-h-[220px] rounded-[1.7rem] p-5"
      )}
    >
      <div className="absolute inset-0 opacity-80" style={{ background: `radial-gradient(ellipse at 12% 8%, ${node.accent}33, transparent 40%), linear-gradient(135deg, rgba(255,255,255,.07), transparent)` }} />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/38">{node.kind} / {node.variant}</p>
            <h3 className={cn("mt-3 font-semibold text-white", isLarge ? "text-4xl" : "text-2xl")}>{node.title}</h3>
          </div>
          <span className="grid h-10 w-10 place-items-center rounded-full text-slate-950" style={{ background: node.accent }}>
            <Sparkles className="h-4 w-4" />
          </span>
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/58">{node.copy}</p>
        {node.seed.length > 0 && (
          <div className={cn("mt-5 grid gap-2", isLarge ? "md:grid-cols-3" : "")}>
            {node.seed.slice(0, 3).map((item, index) => (
              <div key={index} className="rounded-2xl border border-white/10 bg-slate-950/35 p-3">
                <p className="text-sm font-medium text-white/80">{String(item.title ?? item.name ?? item.email ?? item.status ?? `${node.title} ${index + 1}`)}</p>
                <p className="mt-1 text-xs text-white/38">{String(item.price ?? item.date ?? item.createdAt ?? item.status ?? "demo record")}</p>
              </div>
            ))}
          </div>
        )}
        {isForm && (
          <div className="mt-5 grid gap-2 md:grid-cols-3">
            <input className="rounded-2xl border border-white/12 bg-slate-950/45 px-4 py-3 text-sm text-white outline-none placeholder:text-white/32" placeholder="Name" />
            <input className="rounded-2xl border border-white/12 bg-slate-950/45 px-4 py-3 text-sm text-white outline-none placeholder:text-white/32" placeholder="Email" />
            <input className="rounded-2xl border border-white/12 bg-slate-950/45 px-4 py-3 text-sm text-white outline-none placeholder:text-white/32" placeholder="Details" />
          </div>
        )}
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => onAction(primaryAction.demoBackendAction, primaryAction.label)}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:scale-[1.03]"
          >
            <MousePointer2 className="h-4 w-4" />
            {primaryAction.label}
          </button>
          <button
            onClick={() => onAction("addFavorite", "Saved preview item")}
            className="rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white/62 transition hover:bg-white/12 hover:text-white"
          >
            Save state
          </button>
        </div>
      </div>
    </section>
  );
}

export function BlueprintRenderer({ schema, page }: { schema: AssembledBlueprintSchema; page: AssembledBlueprintPage }) {
  const [result, setResult] = useState<DemoResult | null>(null);
  const palette = schema.visualDNA.palette;
  const pageTone = useMemo(() => schema.visualDNA.colorMode === "light" ? "bg-slate-50 text-slate-950" : "bg-[#050712] text-white", [schema.visualDNA.colorMode]);

  function onAction(action: string, label: string) {
    runDemoAction(action, {
      blueprintKey: schema.key,
      page: page.title,
      label,
      name: "Demo User",
      email: "demo@example.com",
      item: label
    });
    setResult({ label, detail: `${action} completed in local demo backend.` });
  }

  return (
    <div className={cn("min-h-[720px] overflow-hidden rounded-[2rem]", pageTone)} style={{ background: `radial-gradient(ellipse at 16% 8%, ${palette[1]}30, transparent 36rem), radial-gradient(ellipse at 88% 10%, ${palette[2]}24, transparent 34rem), ${schema.visualDNA.colorMode === "light" ? "#f8fafc" : "#050712"}` }}>
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-slate-950/45 px-5 py-4 text-white backdrop-blur-2xl">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-white/38">{schema.industry} / {schema.archetype}</p>
          <p className="text-lg font-semibold">{schema.name}</p>
        </div>
        <span className="rounded-full border border-white/12 bg-white/[0.07] px-3 py-1.5 text-xs text-white/58">{schema.visualDNA.navigationModel}</span>
      </header>

      <main className={cn("grid gap-4 p-4 md:p-6", schema.visualDNA.density === "dense" ? "lg:grid-cols-3" : "lg:grid-cols-2")}>
        <section className="relative overflow-hidden rounded-[2.4rem] border border-white/12 bg-white/[0.08] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,.12)] backdrop-blur-xl lg:col-span-full">
          <div className="absolute inset-0" style={{ background: `linear-gradient(120deg, ${palette[1]}22, transparent 45%, ${palette[2]}22)` }} />
          <div className="relative max-w-4xl">
            <p className="text-xs uppercase tracking-[0.25em] text-white/42">{schema.visualDNA.heroComposition}</p>
            <h1 className="mt-5 text-balance text-5xl font-semibold leading-none text-white md:text-7xl">{page.title} for {schema.name}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/62">{page.layoutIntent}</p>
          </div>
        </section>
        {page.nodes.map((node) => <NodeCard key={node.id} node={node} schema={schema} onAction={onAction} />)}
      </main>

      {result && (
        <div className="sticky bottom-4 mx-auto mb-4 flex w-fit items-center gap-3 rounded-full border border-emerald-200/20 bg-emerald-200/12 px-4 py-3 text-sm text-emerald-50 shadow-[0_18px_50px_rgba(0,0,0,.28)] backdrop-blur-2xl">
          <Check className="h-4 w-4" />
          <span>{result.label}: {result.detail}</span>
        </div>
      )}
    </div>
  );
}
