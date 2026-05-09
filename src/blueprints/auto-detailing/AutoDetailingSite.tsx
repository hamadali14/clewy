"use client";

import { BookingFlow, getSection, getText, type SiteProps } from "../site-primitives";

export function AutoDetailingSite({ schema }: SiteProps) {
  const hero = getSection(schema, "hero");
  return (
    <main className="bg-[#020617] text-white">
      <section className="grid min-h-[760px] lg:grid-cols-[1fr_1fr]">
        <div className="p-8 lg:p-16"><p className="text-sky-300">CERAMIC / POLISH / CHROME</p><h1 className="mt-8 text-7xl font-black uppercase leading-[.86]">{getText(hero, "title", schema.name)}</h1></div>
        <div className="relative bg-[radial-gradient(ellipse_at_50%_30%,rgba(56,189,248,.5),transparent_30rem),linear-gradient(135deg,#0f172a,#020617)]">
          <div className="absolute bottom-10 left-10 right-10"><BookingFlow schema={schema} /></div>
        </div>
      </section>
      <section className="p-8"><input type="range" className="w-full accent-sky-300" /><div className="mt-4 h-80 rounded-[2rem] bg-[linear-gradient(90deg,#111_50%,#38bdf8_50%)]" /></section>
    </main>
  );
}
