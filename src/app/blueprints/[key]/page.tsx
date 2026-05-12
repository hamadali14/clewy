import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { BlueprintInspector } from "@/components/blueprints/BlueprintInspector";
import { BlueprintPreview } from "@/components/blueprints/BlueprintPreview";
import { InteractiveDemoPanel } from "@/components/blueprints/InteractiveDemoPanel";
import { getBlueprint, listBlueprints } from "@/core/blueprint-catalog";
import { validateBlueprint } from "@/core/blueprint-validator";

export function generateStaticParams() {
  return listBlueprints().map((blueprint) => ({ key: blueprint.key }));
}

export default function BlueprintDetailPage({ params }: { params: { key: string } }) {
  const blueprint = getBlueprint(params.key);
  if (!blueprint) notFound();
  const validation = validateBlueprint(blueprint);
  const checklist = [
    ["Pages", `${blueprint.pages.length} deterministic pages`],
    ["Features", `${blueprint.features.length} registered features`],
    ["Workflows", `${blueprint.workflows.length} local workflows`],
    ["Interactions", `${blueprint.interactions.length} wired actions`],
    ["Publishing", blueprint.publishingConfig.analyticsReady ? "Analytics-ready config" : "Analytics disabled"]
  ];

  return (
    <main className="min-h-screen px-4 pb-24 pt-24 text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_12%_12%,rgba(34,211,238,.18),transparent_34rem),radial-gradient(ellipse_at_86%_10%,rgba(245,158,11,.16),transparent_36rem),linear-gradient(135deg,#050713,#111827_48%,#050713)]" />
      <div className="mx-auto max-w-7xl">
        <Link href="/blueprints" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/62 transition hover:bg-white hover:text-slate-950">
          <ArrowLeft className="h-4 w-4" />
          Back to catalog
        </Link>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-100/54">{blueprint.industry} / {blueprint.archetype}</p>
            <h1 className="mt-5 text-balance text-5xl font-semibold leading-none md:text-7xl">{blueprint.name}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/58">{blueprint.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-950">{blueprint.visualDNA.preset}</span>
              <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-xs text-white/62">{blueprint.visualDNA.navigationModel}</span>
              <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-xs text-white/62">quality target {blueprint.qualityScoreTarget}</span>
            </div>
          </div>
          <div className="rounded-[1.7rem] border border-white/12 bg-white/[0.065] p-5 backdrop-blur-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-white/38">Publishing readiness</p>
            <div className="mt-4 space-y-3">
              {checklist.map(([label, detail]) => (
                <div key={label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/35 p-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-200" />
                  <div>
                    <p className="text-sm font-semibold text-white/84">{label}</p>
                    <p className="text-xs text-white/42">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <BlueprintPreview blueprint={blueprint} />
            <InteractiveDemoPanel blueprint={blueprint} />
          </div>
          <BlueprintInspector blueprint={blueprint} validation={validation} />
        </section>
      </div>
    </main>
  );
}
