"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Circle,
  Clock3,
  Command,
  Download,
  History,
  Mic,
  Paperclip,
  PenLine,
  Redo2,
  Rocket,
  Send,
  Sparkles,
  Undo2,
  ZoomIn,
  ZoomOut
} from "lucide-react";
import { createProjectFromBlueprintKey, createProjectFromPrompt, examplePrompts } from "@/core/project-workspace";
import { updateTheme, toggleSectionVisibility, addSection } from "@/core/schema-diff";
import { styleAccents } from "@/core/blueprint-contracts";
import { currentProjectKey, loadProject, saveProject, saveProjectHistory } from "@/core/project-store";
import { createLocalRefinementPatches } from "@/core/local-refinement";
import { applyRefinementPatches } from "@/core/apply-patch";
import type { DeviceMode, ProjectSchema, SectionKind, SectionNode } from "@/core/types";
import { cn } from "@/lib/utils";
import { PreviewRenderer } from "@/components/preview/PreviewRenderer";
import { DeviceToggle } from "@/components/workspace/DeviceToggle";
import { FloatingBar } from "@/components/ui/floating-bar";
import { PremiumLoader } from "@/components/ui/premium-loader";
import { SvgIcon } from "@/components/ui/svg-icon";
import { ThemeOrb } from "@/components/ui/theme-orb";

const storageKey = currentProjectKey;
const quickActions = ["/premium", "/dark", "/luxury", "/add testimonials", "/pricing", "/glass", "/minimal", "/modern", "/sections", "/theme"];
const streamSteps = [
  "Classifying intent...",
  "Matching blueprint...",
  "Generating sections...",
  "Applying premium styling...",
  "Rendering preview..."
];

type BuilderResult = ReturnType<typeof createProjectFromPrompt>;
type ChatMessage = { id: string; role: "user" | "ai" | "event"; text: string; streaming?: boolean };
type Snapshot = { id: string; label: string; schema: ProjectSchema; createdAt: string };

export function BuilderExperience({ initialPrompt = "", initialBlueprintKey = "" }: { initialPrompt?: string; initialBlueprintKey?: string }) {
  const startingPrompt = initialPrompt || (initialBlueprintKey ? `Build from ${initialBlueprintKey} and adapt it to my business.` : examplePrompts[0]);
  const [prompt, setPrompt] = useState(startingPrompt);
  const [result, setResult] = useState<BuilderResult>(() =>
    initialBlueprintKey ? createProjectFromBlueprintKey(initialBlueprintKey, startingPrompt) : createProjectFromPrompt(startingPrompt)
  );
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "ai",
      text: "Tell me what you want to build. I will classify the brief, select a blueprint, render it live, and keep every refinement inside safe schema patches."
    }
  ]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [device, setDevice] = useState<DeviceMode>("desktop");
  const [zoom, setZoom] = useState(0.88);
  const [publishing, setPublishing] = useState(false);
  const [syncPulse, setSyncPulse] = useState(0);
  const [mobileTab, setMobileTab] = useState<"chat" | "preview">("chat");
  const [history, setHistory] = useState<ProjectSchema[]>([]);
  const [future, setFuture] = useState<ProjectSchema[]>([]);
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [showVersions, setShowVersions] = useState(false);
  const [showSections, setShowSections] = useState(false);

  useEffect(() => {
    if (initialBlueprintKey) {
      const next = createProjectFromBlueprintKey(initialBlueprintKey, startingPrompt);
      setPrompt(startingPrompt);
      setResult(next);
      persist(next.schema);
      setHistory([]);
      setFuture([]);
      setSnapshots([
        { id: "blueprint-start", label: `Started from ${next.match.bestBlueprint.label}`, schema: next.schema, createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }
      ]);
      pushMessage({ role: "ai", text: `Opened ${next.match.bestBlueprint.label}. Now describe the customer's brand, offer, city, tone, or edits and I will patch this blueprint instead of starting from scratch.` });
      setMobileTab("preview");
      return;
    }
    if (initialPrompt) runGeneration(initialPrompt);
    if (!initialPrompt) {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        try {
          const schema = loadProject() ?? JSON.parse(stored) as ProjectSchema;
          setResult((current) => ({ ...current, schema }));
        } catch {
          localStorage.removeItem(storageKey);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt, initialBlueprintKey]);

  const visibleSections = useMemo(
    () => result.schema.pages[0].sections.filter((section) => section.visible).length,
    [result.schema]
  );

  function persist(schema: ProjectSchema) {
    saveProject(schema);
  }

  function updateSchema(schema: ProjectSchema, label = "Refinement") {
    setHistory((current) => [...current.slice(-11), result.schema]);
    saveProjectHistory([...history, result.schema]);
    setFuture([]);
    setResult((current) => ({ ...current, schema }));
    persist(schema);
    setSyncPulse((value) => value + 1);
    setSnapshots((current) => [
      { id: `${Date.now()}`, label, schema, createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
      ...current.slice(0, 4)
    ]);
  }

  function pushMessage(message: Omit<ChatMessage, "id">) {
    setMessages((current) => [...current, { ...message, id: `${Date.now()}-${Math.random()}` }]);
  }

  function runGeneration(nextPrompt = prompt, blueprintKey = "") {
    setPrompt(nextPrompt);
    setIsGenerating(true);
    setActiveStep(0);
    pushMessage({ role: "user", text: nextPrompt });
    streamSteps.forEach((step, index) => {
      window.setTimeout(() => {
        setActiveStep(index);
        pushMessage({ role: "event", text: step, streaming: index === streamSteps.length - 1 });
      }, index * 430);
    });
    window.setTimeout(() => {
      const next = blueprintKey ? createProjectFromBlueprintKey(blueprintKey, nextPrompt) : createProjectFromPrompt(nextPrompt);
      setResult(next);
      persist(next.schema);
      setHistory([]);
      setFuture([]);
      setSnapshots([
        { id: "initial", label: "Initial generation", schema: next.schema, createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }
      ]);
      setIsGenerating(false);
      setActiveStep(streamSteps.length - 1);
      setSyncPulse((value) => value + 1);
      pushMessage({ role: "ai", text: `Blueprint selected: ${next.match.bestBlueprint.label}. Reasons: ${next.match.reasons.slice(0, 3).join(" | ")}. The live studio is ready for refinement.` });
      setMobileTab("preview");
    }, 2450);
  }

  function runRefinement(command: string) {
    const trimmed = command.trim();
    if (!trimmed) return;
    pushMessage({ role: "user", text: trimmed });
    setInput("");

    if (trimmed.toLowerCase().startsWith("generate") || trimmed.length > 90) {
      runGeneration(trimmed.replace(/^generate\s*/i, ""), result.schema.metadata?.generatedBlueprintKey ?? "");
      return;
    }

    pushMessage({ role: "event", text: "Reading refinement intent...", streaming: true });
    window.setTimeout(() => pushMessage({ role: "event", text: "Preparing safe schema patch..." }), 260);
    window.setTimeout(async () => {
      const normalized = normalizeCommand(trimmed);
      try {
        const response = await fetch("/api/refine", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            instruction: normalized,
            schema: result.schema,
            blueprintKey: result.schema.blueprintKey,
            context: {
              activePageId: result.schema.pages[0]?.id,
              affectedSectionIds: result.schema.pages[0]?.sections.slice(0, 4).map((section) => section.id)
            }
          })
        });
        const refined = (await response.json()) as { schema: ProjectSchema; explanation: string; source: string };
        updateSchema(refined.schema, normalized);
        pushMessage({ role: "ai", text: `${refined.explanation} Preview synced via ${refined.source}.` });
      } catch {
        const local = createLocalRefinementPatches(normalized, result.schema);
        const schema = applyRefinementPatches(result.schema, local.patches);
        updateSchema(schema, normalized);
        pushMessage({ role: "ai", text: `${local.explanation} Preview synced locally.` });
      }
    }, 560);
  }

  function normalizeCommand(command: string) {
    const slashMap: Record<string, string> = {
      "/premium": "make it more premium",
      "/dark": "dark mode",
      "/luxury": "make it more luxury",
      "/add testimonials": "add testimonials",
      "/pricing": "add pricing",
      "/glass": "make it more premium",
      "/minimal": "minimal style",
      "/modern": "change color to blue",
      "/sections": "add faq",
      "/theme": "change color to purple"
    };
    return slashMap[command.toLowerCase()] ?? command;
  }

  function undo() {
    const previous = history[history.length - 1];
    if (!previous) return;
    setFuture((current) => [result.schema, ...current]);
    setHistory((current) => current.slice(0, -1));
    setResult((current) => ({ ...current, schema: previous }));
    persist(previous);
    pushMessage({ role: "ai", text: "Restored the previous version." });
  }

  function redo() {
    const next = future[0];
    if (!next) return;
    setHistory((current) => [...current, result.schema]);
    setFuture((current) => current.slice(1));
    setResult((current) => ({ ...current, schema: next }));
    persist(next);
    pushMessage({ role: "ai", text: "Reapplied the next version." });
  }

  function publishMock() {
    setPublishing(true);
    pushMessage({ role: "event", text: "Running pre-publish checks..." });
    window.setTimeout(() => {
      setPublishing(false);
      pushMessage({ role: "ai", text: "Publish mock complete. A production deploy adapter can connect here later." });
    }, 1300);
  }

  function duplicateHero() {
    const page = result.schema.pages[0];
    const hero = page.sections.find((section) => section.kind === "hero");
    if (!hero) return;
    const duplicate: SectionNode = {
      ...hero,
      id: `${hero.id}-copy-${Date.now()}`,
      label: "Alternate hero",
      order: page.sections.length,
      data: { ...hero.data, title: "A sharper alternate hero variation" }
    };
    updateSchema(addSection(result.schema, page.id, duplicate), "Duplicate section");
    pushMessage({ role: "ai", text: "Duplicated the hero as a new editable section." });
  }

  function toggleSection(kind: SectionKind) {
    const page = result.schema.pages[0];
    const section = page.sections.find((item) => item.kind === kind);
    if (!section) return;
    updateSchema(toggleSectionVisibility(result.schema, page.id, section.id, !section.visible), `${section.visible ? "Hide" : "Show"} ${kind}`);
  }

  return (
    <main className="h-screen overflow-hidden bg-[#050713] text-white">
      <div className="hidden h-screen lg:flex">
        <AIChatPanel
          prompt={prompt}
          setPrompt={setPrompt}
          input={input}
          setInput={setInput}
          messages={messages}
          isGenerating={isGenerating}
          activeStep={activeStep}
          onGenerate={() => runGeneration()}
          onCommand={runRefinement}
        />
        <PreviewStudio
          result={result}
          device={device}
          setDevice={setDevice}
          zoom={zoom}
          setZoom={setZoom}
          publishing={publishing}
          onPublish={publishMock}
          onSchemaChange={updateSchema}
          undo={undo}
          redo={redo}
          canUndo={history.length > 0}
          canRedo={future.length > 0}
          snapshots={snapshots}
          restoreSnapshot={(snapshot) => updateSchema(snapshot.schema, `Restore ${snapshot.label}`)}
          showVersions={showVersions}
          setShowVersions={setShowVersions}
          showSections={showSections}
          setShowSections={setShowSections}
          duplicateHero={duplicateHero}
          toggleSection={toggleSection}
          syncPulse={syncPulse}
          visibleSections={visibleSections}
        />
      </div>

      <div className="flex h-screen flex-col lg:hidden">
        <div className="border-b border-white/10 bg-slate-950/70 p-3 backdrop-blur-2xl">
          <FloatingBar className="mx-auto w-fit">
            <button onClick={() => setMobileTab("chat")} className={cn("rounded-full px-4 py-2 text-sm font-semibold", mobileTab === "chat" ? "bg-white text-slate-950" : "text-white/62")}>Chat</button>
            <button onClick={() => setMobileTab("preview")} className={cn("rounded-full px-4 py-2 text-sm font-semibold", mobileTab === "preview" ? "bg-white text-slate-950" : "text-white/62")}>Preview</button>
          </FloatingBar>
        </div>
        <div className="min-h-0 flex-1 overflow-hidden">
          {mobileTab === "chat" ? (
            <AIChatPanel
              prompt={prompt}
              setPrompt={setPrompt}
              input={input}
              setInput={setInput}
              messages={messages}
              isGenerating={isGenerating}
              activeStep={activeStep}
              onGenerate={() => runGeneration()}
              onCommand={runRefinement}
              mobile
            />
          ) : (
            <PreviewStudio
              result={result}
              device={device}
              setDevice={setDevice}
              zoom={zoom}
              setZoom={setZoom}
              publishing={publishing}
              onPublish={publishMock}
              onSchemaChange={updateSchema}
              undo={undo}
              redo={redo}
              canUndo={history.length > 0}
              canRedo={future.length > 0}
              snapshots={snapshots}
              restoreSnapshot={(snapshot) => updateSchema(snapshot.schema, `Restore ${snapshot.label}`)}
              showVersions={showVersions}
              setShowVersions={setShowVersions}
              showSections={showSections}
              setShowSections={setShowSections}
              duplicateHero={duplicateHero}
              toggleSection={toggleSection}
              syncPulse={syncPulse}
              visibleSections={visibleSections}
              mobile
            />
          )}
        </div>
      </div>
    </main>
  );
}

function AIChatPanel({
  prompt,
  setPrompt,
  input,
  setInput,
  messages,
  isGenerating,
  activeStep,
  onGenerate,
  onCommand,
  mobile = false
}: {
  prompt: string;
  setPrompt: (value: string) => void;
  input: string;
  setInput: (value: string) => void;
  messages: ChatMessage[];
  isGenerating: boolean;
  activeStep: number;
  onGenerate: () => void;
  onCommand: (value: string) => void;
  mobile?: boolean;
}) {
  return (
    <aside className={cn("relative flex h-screen flex-col overflow-hidden border-r border-white/10 bg-slate-950/62 backdrop-blur-2xl", mobile ? "w-full" : "w-1/3")}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_10%,rgba(34,211,238,.18),transparent_34rem),radial-gradient(ellipse_at_90%_80%,rgba(167,139,250,.16),transparent_30rem)]" />
      <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:38px_38px]" />

      <div className="relative flex items-center justify-between px-5 py-5">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-[1.2rem] border border-white/14 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,.18)]">
            <SvgIcon name="blueprint" className="h-5 w-5 text-cyan-200" />
          </span>
          <div>
            <p className="font-semibold">Blueprint AI</p>
            <p className="flex items-center gap-1.5 text-xs text-white/42">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,.9)]" />
              live workspace
            </p>
          </div>
        </div>
        <Command className="h-5 w-5 text-white/38" />
      </div>

      <div className="relative px-5">
        <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.055] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,.12)]">
          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            className="h-24 w-full resize-none bg-transparent text-sm leading-6 text-white outline-none placeholder:text-white/34"
          />
          <div className="flex items-center justify-between gap-3">
            <button onClick={onGenerate} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-950 transition hover:scale-[1.02]">
              <Sparkles className="h-3.5 w-3.5" />
              {isGenerating ? "Composing" : "Generate"}
            </button>
            {isGenerating && <PremiumLoader label={streamSteps[activeStep] ?? "Rendering"} variant="circular" />}
          </div>
        </div>
      </div>

      <div className="editor-scroll relative flex-1 overflow-y-auto px-5 py-5">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10 }}
              className={cn(
                "mb-3 max-w-[92%] rounded-[1.35rem] border px-4 py-3 text-sm leading-6 shadow-[inset_0_1px_0_rgba(255,255,255,.12)]",
                message.role === "user" && "ml-auto border-cyan-200/24 bg-cyan-200/12 text-cyan-50",
                message.role === "ai" && "border-white/10 bg-white/[0.07] text-white/72",
                message.role === "event" && "border-violet-200/18 bg-violet-200/10 text-violet-50/78"
              )}
            >
              <span className="flex items-center gap-2">
                {message.role === "event" && <Circle className={cn("h-2 w-2 fill-current text-cyan-200", message.streaming && "animate-pulse")} />}
                {message.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="relative border-t border-white/10 bg-slate-950/65 p-4 backdrop-blur-2xl">
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
          {quickActions.map((action) => (
            <button key={action} onClick={() => onCommand(action)} className="shrink-0 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-white/58 transition hover:border-cyan-200/40 hover:text-white">
              {action}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/14 bg-white/[0.09] p-1 shadow-[0_18px_60px_rgba(0,0,0,.28),inset_0_1px_0_rgba(255,255,255,.16)] backdrop-blur-2xl">
          <button className="grid h-10 w-10 place-items-center rounded-full text-white/45 transition hover:bg-white/10 hover:text-white" title="Attach">
            <Paperclip className="h-4 w-4" />
          </button>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") onCommand(input);
            }}
            placeholder="Ask for a refinement or type /premium"
            className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/34"
          />
          <button className="grid h-10 w-10 place-items-center rounded-full text-white/45 transition hover:bg-white/10 hover:text-white" title="Voice">
            <Mic className="h-4 w-4" />
          </button>
          <button onClick={() => onCommand(input)} className="grid h-10 w-10 place-items-center rounded-full bg-white text-slate-950 transition hover:scale-105" title="Send">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

function PreviewStudio({
  result,
  device,
  setDevice,
  zoom,
  setZoom,
  publishing,
  onPublish,
  onSchemaChange,
  undo,
  redo,
  canUndo,
  canRedo,
  snapshots,
  restoreSnapshot,
  showVersions,
  setShowVersions,
  showSections,
  setShowSections,
  duplicateHero,
  toggleSection,
  syncPulse,
  visibleSections,
  mobile = false
}: {
  result: BuilderResult;
  device: DeviceMode;
  setDevice: (value: DeviceMode) => void;
  zoom: number;
  setZoom: (value: number) => void;
  publishing: boolean;
  onPublish: () => void;
  onSchemaChange: (schema: ProjectSchema, label?: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  snapshots: Snapshot[];
  restoreSnapshot: (snapshot: Snapshot) => void;
  showVersions: boolean;
  setShowVersions: (value: boolean) => void;
  showSections: boolean;
  setShowSections: (value: boolean) => void;
  duplicateHero: () => void;
  toggleSection: (kind: SectionKind) => void;
  syncPulse: number;
  visibleSections: number;
  mobile?: boolean;
}) {
  const width = device === "desktop" ? "w-full" : device === "tablet" ? "max-w-[900px]" : "max-w-[430px]";
  return (
    <section className={cn("relative h-screen overflow-hidden bg-[#070a14]", mobile ? "w-full" : "w-2/3")}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(34,211,238,.16),transparent_34rem),radial-gradient(ellipse_at_82%_22%,rgba(167,139,250,.14),transparent_36rem),linear-gradient(135deg,#070a14,#111827_48%,#060814)]" />
      <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,.75)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.75)_1px,transparent_1px)] [background-size:42px_42px]" />

      <motion.div
        key={syncPulse}
        initial={{ opacity: 0.8, scale: 0.96 }}
        animate={{ opacity: 0, scale: 1.12 }}
        transition={{ duration: 0.9 }}
        className="pointer-events-none absolute inset-8 rounded-[3rem] border border-cyan-200/30"
      />

      <FloatingBar className="absolute left-5 top-5 z-30">
        <span className="flex items-center gap-2 px-3 py-1.5 text-xs text-white/68">
          <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,.9)]" />
          Live synced
        </span>
        <button onClick={undo} disabled={!canUndo} className="grid h-8 w-8 place-items-center rounded-full text-white/58 transition hover:bg-white/10 disabled:opacity-30" title="Undo">
          <Undo2 className="h-4 w-4" />
        </button>
        <button onClick={redo} disabled={!canRedo} className="grid h-8 w-8 place-items-center rounded-full text-white/58 transition hover:bg-white/10 disabled:opacity-30" title="Redo">
          <Redo2 className="h-4 w-4" />
        </button>
        <button onClick={() => setShowVersions(!showVersions)} className="grid h-8 w-8 place-items-center rounded-full text-white/58 transition hover:bg-white/10" title="Versions">
          <History className="h-4 w-4" />
        </button>
      </FloatingBar>

      <FloatingBar className="absolute left-1/2 top-5 z-30 -translate-x-1/2">
        <DeviceToggle value={device} onChange={setDevice} />
        <button onClick={() => setZoom(Math.max(0.68, zoom - 0.08))} className="grid h-9 w-9 place-items-center rounded-full text-white/58 transition hover:bg-white/10" title="Zoom out">
          <ZoomOut className="h-4 w-4" />
        </button>
        <span className="px-2 text-xs text-white/52">{Math.round(zoom * 100)}%</span>
        <button onClick={() => setZoom(Math.min(1, zoom + 0.08))} className="grid h-9 w-9 place-items-center rounded-full text-white/58 transition hover:bg-white/10" title="Zoom in">
          <ZoomIn className="h-4 w-4" />
        </button>
      </FloatingBar>

      <FloatingBar className="absolute right-5 top-5 z-30">
        <ThemeOrb color="linear-gradient(135deg,#ecfeff,#5eead4)" label="Light glass" active={result.schema.theme.mode === "light"} onClick={() => onSchemaChange(updateTheme(result.schema, { mode: "light", style: "premium", accent: styleAccents.premium }), "Light glass")} />
        <ThemeOrb color="linear-gradient(135deg,#111827,#8b5cf6)" label="Dark premium" active={result.schema.theme.mode === "dark"} onClick={() => onSchemaChange(updateTheme(result.schema, { mode: "dark", style: "dark", accent: styleAccents.dark }), "Dark premium")} />
        <button className="grid h-9 w-9 place-items-center rounded-full text-white/58 transition hover:bg-white/10" title="Export">
          <Download className="h-4 w-4" />
        </button>
        <button onClick={onPublish} className="inline-flex h-9 items-center gap-2 rounded-full bg-white px-4 text-xs font-semibold text-slate-950 transition hover:scale-[1.02]">
          <Rocket className={cn("h-3.5 w-3.5", publishing && "animate-pulse")} />
          {publishing ? "Publishing" : "Publish"}
        </button>
      </FloatingBar>

      <div className="editor-scroll relative h-full overflow-y-auto px-6 pb-12 pt-24">
        <motion.div
          layout
          className={cn("mx-auto origin-top transition-all duration-300", width)}
          style={{ scale: zoom }}
        >
          <div className="overflow-hidden rounded-[2.2rem] border border-white/12 bg-white/[0.08] shadow-[0_30px_120px_rgba(0,0,0,.42)] backdrop-blur-2xl">
            <PreviewRenderer schema={result.schema} />
          </div>
        </motion.div>
      </div>

      <FloatingBar className="absolute bottom-5 left-1/2 z-30 -translate-x-1/2">
        <button onClick={() => setShowSections(!showSections)} className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-white/62 transition hover:bg-white/10 hover:text-white">
          <PenLine className="h-3.5 w-3.5" />
          {visibleSections} sections
        </button>
        <button onClick={duplicateHero} className="rounded-full px-3 py-1.5 text-xs font-semibold text-white/62 transition hover:bg-white/10 hover:text-white">Duplicate hero</button>
        <button onClick={() => toggleSection("testimonials")} className="rounded-full px-3 py-1.5 text-xs font-semibold text-white/62 transition hover:bg-white/10 hover:text-white">Toggle proof</button>
      </FloatingBar>

      <AnimatePresence>
        {showVersions && (
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }} className="absolute right-5 top-20 z-40 w-80 rounded-[1.7rem] border border-white/12 bg-slate-950/76 p-4 shadow-[0_24px_80px_rgba(0,0,0,.36)] backdrop-blur-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/38">Version snapshots</p>
            <div className="mt-3 space-y-2">
              {snapshots.map((snapshot) => (
                <button key={snapshot.id} onClick={() => restoreSnapshot(snapshot)} className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.055] px-3 py-3 text-left transition hover:bg-white/10">
                  <span>
                    <span className="block text-sm font-medium text-white/78">{snapshot.label}</span>
                    <span className="block text-xs text-white/38">{snapshot.createdAt}</span>
                  </span>
                  <ArrowLeft className="h-4 w-4 text-white/34" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
        {showSections && (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }} className="absolute bottom-20 left-1/2 z-40 w-[min(760px,calc(100%-2rem))] -translate-x-1/2 rounded-[1.7rem] border border-white/12 bg-slate-950/78 p-4 shadow-[0_24px_80px_rgba(0,0,0,.36)] backdrop-blur-2xl">
            <div className="flex flex-wrap gap-2">
              {result.schema.pages[0].sections.map((section) => (
                <button key={section.id} onClick={() => toggleSection(section.kind)} className={cn("rounded-full border px-3 py-2 text-xs transition", section.visible ? "border-cyan-200/30 bg-cyan-200/12 text-cyan-50" : "border-white/10 bg-white/[0.045] text-white/38")}>
                  {section.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-none absolute bottom-5 right-5 flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/55 px-3 py-2 text-xs text-white/46 backdrop-blur-xl">
        <Clock3 className="h-3.5 w-3.5" />
        {result.schema.updatedAt ? "updated now" : "ready"}
      </div>
    </section>
  );
}
