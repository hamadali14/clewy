"use client";

import { Download, ExternalLink, Rocket } from "lucide-react";
import type { DeviceMode, ProjectSchema } from "@/core/types";
import { DeviceFrame } from "@/components/ui/device-frame";
import { FloatingBar } from "@/components/ui/floating-bar";
import { PreviewRenderer } from "./PreviewRenderer";

export function PreviewFrame({
  schema,
  device = "desktop",
  chrome = true,
  onPublish,
  onExport,
  publishing = false
}: {
  schema: ProjectSchema;
  device?: DeviceMode;
  chrome?: boolean;
  onPublish?: () => void;
  onExport?: () => void;
  publishing?: boolean;
}) {
  return (
    <div className="relative h-full min-h-0">
      {chrome && (
        <FloatingBar className="absolute left-1/2 top-4 z-30 -translate-x-1/2">
          <button className="rounded-full px-3 py-1.5 text-xs font-semibold text-white/72 transition hover:bg-white/10">
            {device}
          </button>
          <button onClick={onExport} className="grid h-8 w-8 place-items-center rounded-full text-white/66 transition hover:bg-white/10 hover:text-white" title="Export">
            <Download className="h-4 w-4" />
          </button>
          <button onClick={onPublish} className="inline-flex h-8 items-center gap-2 rounded-full bg-white px-3 text-xs font-semibold text-slate-950 transition hover:scale-[1.02]" title="Publish">
            {publishing ? <Rocket className="h-3.5 w-3.5 animate-pulse" /> : <ExternalLink className="h-3.5 w-3.5" />}
            {publishing ? "Publishing" : "Publish"}
          </button>
        </FloatingBar>
      )}
      <div className="editor-scroll h-full overflow-y-auto px-4 pb-8 pt-20">
        <DeviceFrame device={device}>
          <PreviewRenderer schema={schema} />
        </DeviceFrame>
      </div>
    </div>
  );
}
