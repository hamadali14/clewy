import type { getBlueprintStats } from "@/core/blueprint-catalog";

export function BlueprintStats({ stats }: { stats: ReturnType<typeof getBlueprintStats> }) {
  const items = [
    { label: "Blueprints", value: stats.total },
    { label: "Industries", value: stats.industries },
    { label: "Archetypes", value: stats.archetypes },
    { label: "Quality target", value: `${stats.averageQualityTarget}%` }
  ];

  return (
    <div className="grid gap-3 md:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="rounded-[1.6rem] border border-white/12 bg-white/[0.07] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.12)] backdrop-blur-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-white/38">{item.label}</p>
          <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
