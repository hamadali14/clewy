import { BlueprintGallery } from "@/components/blueprints/BlueprintGallery";
import { BlueprintStats } from "@/components/blueprints/BlueprintStats";
import { getBlueprintStats, listBlueprints } from "@/core/blueprint-catalog";

export default function BlueprintsPage() {
  const blueprints = listBlueprints();
  const stats = getBlueprintStats();

  return (
    <main className="min-h-screen overflow-hidden px-4 pb-24 pt-28 text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_18%_8%,rgba(34,211,238,.22),transparent_34rem),radial-gradient(ellipse_at_86%_8%,rgba(167,139,250,.2),transparent_38rem),linear-gradient(135deg,#050713,#0f172a_48%,#050713)]" />
      <section className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-100/54">Automated blueprint catalog</p>
          <h1 className="mt-5 text-balance text-5xl font-semibold leading-none md:text-7xl">100 production-ready blueprint systems, not 100 copied landing pages.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/58">
            Each blueprint is a strict config composed from registries, visual DNA, page systems, feature modules, workflows, data models, interactions, seed data, and validation gates.
          </p>
        </div>
        <div className="mt-8">
          <BlueprintStats stats={stats} />
        </div>
        <BlueprintGallery blueprints={blueprints} />
      </section>
    </main>
  );
}
