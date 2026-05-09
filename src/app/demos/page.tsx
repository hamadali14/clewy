"use client";

import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { DemoGallery } from "@/components/landing/DemoGallery";
import { GlassPanel } from "@/components/ui/glass-panel";
import { FloatingBar } from "@/components/ui/floating-bar";
import { SvgIcon } from "@/components/ui/svg-icon";

export default function DemosPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-28 pt-28">
      <AnimatedBackground />
      <section className="relative mx-auto max-w-7xl">
        <FloatingBar className="mb-6 w-fit">
          <SvgIcon name="blueprint" className="h-4 w-4 text-cyan-200" />
          <span className="pr-2 text-xs font-semibold text-white/70">Blueprint gallery</span>
        </FloatingBar>
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <h1 className="text-balance text-6xl font-semibold text-white">A marketplace preview, not a pile of templates.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/62">
              Every demo runs through the same deterministic classifier, matcher, schema generator, validator, preview renderer, and workspace.
            </p>
          </div>
          <GlassPanel className="p-5">
            <div className="grid grid-cols-3 gap-3">
              {["Niche signal", "Style tokens", "Section rules", "Match score", "Schema", "Renderer"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-sm text-white/62">
                  {item}
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
        <div className="mt-12">
          <DemoGallery />
        </div>
      </section>
    </main>
  );
}
