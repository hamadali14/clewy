import type { BlueprintDefinition, BlueprintValidationResult } from "@/core/blueprint-types";

export function BlueprintInspector({ blueprint, validation }: { blueprint: BlueprintDefinition; validation: BlueprintValidationResult }) {
  return (
    <aside className="space-y-4">
      <div className="rounded-[1.7rem] border border-white/12 bg-white/[0.065] p-5 backdrop-blur-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-white/38">Feature bundle</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {blueprint.features.map((feature) => (
            <span key={feature.key} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-white/62">{feature.label}</span>
          ))}
        </div>
      </div>
      <div className="rounded-[1.7rem] border border-white/12 bg-white/[0.065] p-5 backdrop-blur-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-white/38">Workflows</p>
        <div className="mt-4 space-y-3">
          {blueprint.workflows.map((workflow) => (
            <div key={workflow.key} className="rounded-2xl border border-white/10 bg-slate-950/35 p-3">
              <p className="text-sm font-semibold text-white/84">{workflow.name}</p>
              <p className="mt-1 text-xs text-white/42">{workflow.steps.join(" -> ")}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[1.7rem] border border-white/12 bg-white/[0.065] p-5 backdrop-blur-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-white/38">Roles</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {blueprint.roles.map((role) => (
            <span key={role} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-950">{role}</span>
          ))}
        </div>
      </div>
      <div className="rounded-[1.7rem] border border-white/12 bg-white/[0.065] p-5 backdrop-blur-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-white/38">Validation</p>
        <p className="mt-3 text-2xl font-semibold text-white">{validation.valid ? "Ready" : "Needs review"}</p>
        <div className="mt-3 max-h-64 space-y-2 overflow-y-auto pr-1">
          {validation.issues.length === 0 ? (
            <p className="text-sm text-emerald-100/80">No validation issues found.</p>
          ) : validation.issues.map((issue, index) => (
            <div key={`${issue.path}-${index}`} className="rounded-2xl border border-amber-200/20 bg-amber-200/10 p-3 text-xs text-amber-50">
              <p className="font-semibold">{issue.path}</p>
              <p className="mt-1 text-amber-50/68">{issue.message}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[1.7rem] border border-white/12 bg-white/[0.065] p-5 backdrop-blur-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-white/38">Seed data</p>
        <pre className="mt-4 max-h-72 overflow-auto rounded-2xl bg-slate-950/65 p-3 text-xs leading-5 text-white/58">{JSON.stringify(blueprint.seedData, null, 2)}</pre>
      </div>
    </aside>
  );
}
