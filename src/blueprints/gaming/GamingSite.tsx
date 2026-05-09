"use client";

import { getItems, getSection, getText, type SiteProps } from "../site-primitives";

export function GamingSite({ schema }: SiteProps) {
  const hero = getSection(schema, "hero");
  const ranks = getSection(schema, "rankings");
  return (
    <main className="min-h-screen bg-[#020617] text-lime-100">
      <section className="grid min-h-[760px] lg:grid-cols-[1fr_420px]">
        <div className="p-8 lg:p-16">
          <p className="text-lime-300">LIVE ARENA</p>
          <h1 className="mt-8 text-7xl font-black uppercase italic leading-[0.85] lg:text-9xl">{getText(hero, "title", schema.name)}</h1>
          <button className="mt-10 rounded-full bg-lime-300 px-6 py-3 font-bold text-slate-950">Join tournament</button>
        </div>
        <aside className="border-l border-lime-300/20 bg-lime-300/10 p-6">
          <h2 className="text-3xl font-black">Rankings</h2>
          {getItems(ranks, "stats", ["#1 team", "24 matches", "98% energy"]).map((item) => <div key={String(item)} className="mt-4 rounded-2xl border border-lime-300/20 p-4">{String(item)}</div>)}
        </aside>
      </section>
    </main>
  );
}
