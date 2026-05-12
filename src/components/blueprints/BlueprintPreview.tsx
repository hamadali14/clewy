"use client";

import { useMemo, useState } from "react";
import { Monitor, Smartphone } from "lucide-react";
import type { BlueprintDefinition } from "@/core/blueprint-types";
import { assembleBlueprint } from "@/core/blueprint-assembler";
import { BlueprintRenderer } from "./BlueprintRenderer";
import { cn } from "@/lib/utils";

export function BlueprintPreview({ blueprint }: { blueprint: BlueprintDefinition }) {
  const schema = useMemo(() => assembleBlueprint(blueprint), [blueprint]);
  const [pageId, setPageId] = useState(schema.pages[0].id);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const page = schema.pages.find((candidate) => candidate.id === pageId) ?? schema.pages[0];

  return (
    <section className="rounded-[2rem] border border-white/12 bg-white/[0.06] p-3 shadow-[0_28px_100px_rgba(0,0,0,.32)] backdrop-blur-2xl">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 px-2">
        <div className="flex gap-2 overflow-x-auto">
          {schema.pages.map((item) => (
            <button key={item.id} onClick={() => setPageId(item.id)} className={cn("shrink-0 rounded-full px-3 py-2 text-xs font-semibold transition", pageId === item.id ? "bg-white text-slate-950" : "border border-white/10 bg-white/[0.06] text-white/52 hover:text-white")}>
              {item.title}
            </button>
          ))}
        </div>
        <div className="flex rounded-full border border-white/10 bg-white/[0.06] p-1">
          <button onClick={() => setDevice("desktop")} className={cn("grid h-9 w-9 place-items-center rounded-full", device === "desktop" ? "bg-white text-slate-950" : "text-white/52")}>
            <Monitor className="h-4 w-4" />
          </button>
          <button onClick={() => setDevice("mobile")} className={cn("grid h-9 w-9 place-items-center rounded-full", device === "mobile" ? "bg-white text-slate-950" : "text-white/52")}>
            <Smartphone className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className={cn("mx-auto transition-all duration-300", device === "mobile" ? "max-w-[430px]" : "max-w-full")}>
        <BlueprintRenderer schema={schema} page={page} />
      </div>
    </section>
  );
}
