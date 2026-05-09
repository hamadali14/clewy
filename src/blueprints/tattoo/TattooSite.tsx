"use client";

import { BookingFlow, getItems, getSection, getText, type SiteProps } from "../site-primitives";

export function TattooSite({ schema }: SiteProps) {
  const hero = getSection(schema, "hero");
  const portfolio = getSection(schema, "portfolio");
  return (
    <main className="min-h-screen bg-black text-zinc-100">
      <section className="grid min-h-[760px] border-b border-red-500/20 lg:grid-cols-[1.1fr_.9fr]">
        <div className="p-8 lg:p-16">
          <p className="font-mono text-red-400">INK / ARTIST / CONSULT</p>
          <h1 className="mt-8 max-w-4xl text-7xl font-black uppercase leading-[0.82] lg:text-9xl">{getText(hero, "title", schema.name)}</h1>
        </div>
        <div className="relative bg-[linear-gradient(135deg,#171717,#3f0505)] p-8">
          <div className="absolute inset-8 rounded-full border border-red-500/20 blur-sm" />
          <BookingFlow schema={schema} tone="dark" />
        </div>
      </section>
      <section className="flex gap-5 overflow-x-auto p-8">
        {getItems(portfolio, "items", ["Flash wall", "Sleeve study", "Fine line", "Blackwork"]).map((item) => (
          <div key={String(item)} className="h-96 w-72 shrink-0 border border-white/10 bg-white/[0.04] p-5 text-3xl font-black uppercase">{String(item)}</div>
        ))}
      </section>
    </main>
  );
}
