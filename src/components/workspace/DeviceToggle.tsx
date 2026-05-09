"use client";

import { Monitor, Smartphone, Tablet } from "lucide-react";
import type { DeviceMode } from "@/core/types";
import { cn } from "@/lib/utils";

const items: Array<{ value: DeviceMode; label: string; Icon: typeof Monitor }> = [
  { value: "desktop", label: "Desktop", Icon: Monitor },
  { value: "tablet", label: "Tablet", Icon: Tablet },
  { value: "mobile", label: "Mobile", Icon: Smartphone }
];

export function DeviceToggle({ value, onChange, tone = "dark" }: { value: DeviceMode; onChange: (value: DeviceMode) => void; tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <div className={light ? "flex rounded-full border border-slate-200 bg-white/70 p-1 shadow-sm" : "flex rounded-full border border-white/12 bg-white/6 p-1"}>
      {items.map(({ value: item, label, Icon }) => (
        <button
          key={item}
          title={label}
          onClick={() => onChange(item)}
          className={cn(
            "grid h-9 w-10 place-items-center rounded-full transition",
            light ? "text-slate-400 hover:text-slate-950" : "text-white/58 hover:text-white",
            value === item && (light ? "bg-slate-950 text-white" : "bg-white/14 text-white")
          )}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  );
}
