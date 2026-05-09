"use client";

import type { ReactNode } from "react";
import type { DeviceMode } from "@/core/types";
import { cn } from "@/lib/utils";

const deviceWidth: Record<DeviceMode, string> = {
  desktop: "w-full",
  tablet: "max-w-[820px]",
  mobile: "max-w-[390px]"
};

export function DeviceFrame({ children, device = "desktop", className }: { children: ReactNode; device?: DeviceMode; className?: string }) {
  return (
    <div className={cn("mx-auto transition-all duration-300", deviceWidth[device], className)}>
      <div className={cn("overflow-hidden border border-white/12 bg-slate-950/45 shadow-[0_30px_100px_rgba(0,0,0,0.28)]", device === "mobile" ? "rounded-[2.4rem] p-2" : "rounded-[2rem] p-3")}>
        <div className="mb-3 flex items-center gap-2 px-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-200/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
          <span className="ml-2 rounded-full bg-white/8 px-3 py-1 text-[11px] text-white/42">preview.blueprint.local</span>
        </div>
        <div className="overflow-hidden rounded-[1.45rem]">{children}</div>
      </div>
    </div>
  );
}
