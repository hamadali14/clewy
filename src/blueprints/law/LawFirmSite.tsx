"use client";

import { BookingFlow, getItems, getSection, getText, type SiteProps } from "../site-primitives";

export function LawFirmSite({ schema }: SiteProps) {
  const hero = getSection(schema, "hero");
  const cases = getSection(schema, "caseResults");
  return (
    <main className="bg-[#071426] text-[#f7f0df]">
      <section className="grid min-h-[740px] lg:grid-cols-[1.2fr_.8fr]">
        <div className="p-8 lg:p-16"><p className="text-[#d6b46a]">LEGAL AUTHORITY</p><h1 className="mt-8 text-6xl font-semibold leading-none lg:text-8xl">{getText(hero, "title", schema.name)}</h1></div>
        <div className="border-l border-[#d6b46a]/20 p-8"><BookingFlow schema={schema} /></div>
      </section>
      <section className="grid gap-4 p-8 md:grid-cols-3">{getItems(cases, "stats", ["$42M resolved", "18 industries", "94% fit"]).map((item) => <div key={String(item)} className="border-t border-[#d6b46a]/30 py-8 text-3xl">{String(item)}</div>)}</section>
    </main>
  );
}
