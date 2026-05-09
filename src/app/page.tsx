"use client";

import { motion } from "framer-motion";
import { ArrowRight, Braces, Check, GitCompareArrows, Layers3, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { PipelineAnimation } from "@/components/landing/PipelineAnimation";
import { DemoGallery } from "@/components/landing/DemoGallery";
import { ComparisonTable } from "@/components/landing/ComparisonTable";
import { GlassPanel } from "@/components/ui/glass-panel";
import { GradientButton } from "@/components/ui/gradient-button";
import { FloatingBar } from "@/components/ui/floating-bar";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { SvgIcon } from "@/components/ui/svg-icon";
import { PremiumLoader } from "@/components/ui/premium-loader";

const features = [
  ["Intent classifier", "Turns vague requests into typed product intent.", SvgIcon, "intent"],
  ["Blueprint matcher", "Ranks deterministic templates instead of inventing architecture.", SvgIcon, "blueprint"],
  ["Schema renderer", "Renders validated pages from structured content.", SvgIcon, "preview"],
  ["Patch refinement", "Chat edits become safe diff operations.", SvgIcon, "patch"]
] as const;

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />

      <section className="relative mx-auto grid max-w-[1500px] items-center gap-10 px-4 pb-24 pt-28 lg:min-h-screen lg:grid-cols-[0.82fr_1.18fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <FloatingBar className="mb-7 w-fit">
            <Sparkles className="h-4 w-4 text-cyan-200" />
            <span className="pr-2 text-xs font-semibold text-white/72">Blueprint-first AI app builder</span>
          </FloatingBar>
          <h1 className="text-balance text-6xl font-semibold tracking-normal text-white sm:text-8xl">
            Build with AI. Render with certainty.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/66">
            A high-end builder where prompts classify intent, blueprints define structure, schemas hold content, and refinement stays safe.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <GradientButton href="/builder">
              Start building <ArrowRight className="h-4 w-4" />
            </GradientButton>
            <GradientButton href="/demos" variant="secondary">View demos</GradientButton>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 34, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.12, duration: 0.75 }} className="relative min-h-[620px]">
          <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-cyan-300/24 blur-3xl" />
          <div className="absolute bottom-8 right-8 h-80 w-80 rounded-full bg-violet-400/20 blur-3xl" />

          <motion.div animate={{ y: [0, -10, 0], rotate: [0, -1.5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute left-0 top-10 w-[58%]">
            <GlassPanel className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-200" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                </div>
                <span className="text-xs text-white/38">live preview</span>
              </div>
              <div className="mt-5 overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.06] p-5">
                <div className="h-32 rounded-[1.3rem] bg-[radial-gradient(ellipse_at_70%_20%,rgba(94,234,212,.42),transparent_55%),linear-gradient(135deg,rgba(255,255,255,.14),rgba(255,255,255,.04))]" />
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <span className="h-20 rounded-2xl bg-white/10" />
                  <span className="h-20 rounded-2xl bg-white/16" />
                  <span className="h-20 rounded-2xl bg-white/10" />
                </div>
              </div>
            </GlassPanel>
          </motion.div>

          <motion.div animate={{ y: [0, 12, 0], rotate: [0, 1.2, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute right-4 top-0 w-[48%]">
            <GlassPanel className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70">Blueprint match</p>
              <div className="mt-5 flex items-center justify-between rounded-[1.4rem] border border-white/10 bg-white/[0.07] p-4">
                <span>
                  <span className="block font-semibold text-white">Dental Premium</span>
                  <span className="block text-xs text-white/42">booking · services · pricing</span>
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-950">94%</span>
              </div>
              <div className="mt-4">
                <PremiumLoader label="Matching blueprint" variant="pipeline" />
              </div>
            </GlassPanel>
          </motion.div>

          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-20 left-24 w-[52%]">
            <GlassPanel className="p-5">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-slate-950">
                  <MessageSquare className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm text-white/74">make it more luxury</p>
                  <p className="mt-2 text-xs text-cyan-100/70">Refinement applied. Palette, spacing, and hero rhythm updated.</p>
                </div>
              </div>
            </GlassPanel>
          </motion.div>

          <motion.div animate={{ y: [0, 9, 0] }} transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-4 right-16 w-[42%]">
            <GlassPanel tone="light" className="p-4">
              <div className="flex items-center justify-between text-slate-950">
                <span className="text-sm font-semibold">Live sync</span>
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,.9)]" />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {["Intent", "Schema", "Preview"].map((item) => (
                  <span key={item} className="rounded-full bg-slate-950 px-3 py-2 text-center text-xs font-semibold text-white">{item}</span>
                ))}
              </div>
            </GlassPanel>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative light-glass-bg py-24 text-slate-950">
        <NoiseOverlay />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold text-cyan-700">Why this exists</p>
            <h2 className="mt-3 text-balance text-5xl font-semibold">AI builders should feel magical without becoming fragile.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map(([title, copy, Icon, iconName]) => (
              <GlassPanel key={title} tone="light" className="p-6" interactive>
                <Icon name={iconName} className="text-slate-950" />
                <h3 className="mt-6 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
              </GlassPanel>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-cyan-200">Rail pipeline</p>
            <h2 className="mt-3 text-balance text-5xl font-semibold text-white">Prompt in. Blueprint rail out.</h2>
          </div>
          <FloatingBar>
            <span className="px-3 py-1.5 text-xs text-white/62">No backend required</span>
          </FloatingBar>
        </div>
        <GlassPanel className="p-5 sm:p-8">
          <PipelineAnimation />
        </GlassPanel>
      </section>

      <section className="relative -skew-y-2 border-y border-white/10 bg-white/[0.06] py-24 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl skew-y-2 px-4">
          <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <p className="text-sm font-semibold text-cyan-200">Design language</p>
              <h2 className="mt-3 max-w-3xl text-balance text-5xl font-semibold text-white">A builder interface with layered glass, rails, islands, and deterministic controls.</h2>
            </div>
            <div className="grid gap-3">
              {[
                ["Section registry", Braces],
                ["Diff-safe updates", GitCompareArrows],
                ["Deterministic renderer", ShieldCheck],
                ["Chat refinement", MessageSquare]
              ].map(([label, Icon]) => (
                <div key={label as string} className="flex items-center gap-3 rounded-[1.4rem] border border-white/12 bg-slate-950/38 p-4">
                  <Icon className="h-5 w-5 text-cyan-200" />
                  <span className="font-medium text-white/78">{label as string}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-24">
        <div className="mb-10">
          <p className="text-sm font-semibold text-cyan-200">Blueprint marketplace preview</p>
          <h2 className="mt-3 text-balance text-5xl font-semibold text-white">Ten industries, ten distinct visual systems.</h2>
        </div>
        <DemoGallery />
      </section>

      <section className="relative mx-auto grid max-w-7xl gap-6 px-4 py-24 lg:grid-cols-[.9fr_1.1fr]">
        <GlassPanel className="p-8">
          <p className="text-sm font-semibold text-cyan-200">Comparison</p>
          <h2 className="mt-4 text-balance text-5xl font-semibold text-white">Blank-canvas AI is exciting. Contracts make it shippable.</h2>
          <div className="mt-8 grid gap-3">
            {["No arbitrary code rewrites", "Schema-first content", "Renderer stays stable"].map((item) => (
              <p key={item} className="flex items-center gap-3 text-white/68">
                <Check className="h-4 w-4 text-cyan-200" />
                {item}
              </p>
            ))}
          </div>
        </GlassPanel>
        <ComparisonTable />
      </section>

      <section className="relative mx-auto max-w-6xl px-4 pb-28 pt-10">
        <GlassPanel className="p-10 text-center sm:p-14">
          <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-[1.4rem] bg-white text-slate-950">
            <SvgIcon name="spark" />
          </div>
          <h2 className="text-balance text-5xl font-semibold text-white">Start from a blueprint. Refine like a conversation.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-white/60">The platform foundation is local, deterministic, and ready for real blueprint expansion.</p>
          <div className="mt-8"><GradientButton href="/builder">Open the builder</GradientButton></div>
        </GlassPanel>
      </section>

      <footer className="border-t border-white/10 px-4 py-10 text-center text-sm text-white/42">
        Blueprint-first generation platform. Local demo, deterministic engine.
      </footer>
    </main>
  );
}
