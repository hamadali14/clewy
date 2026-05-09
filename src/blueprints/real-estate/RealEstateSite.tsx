"use client";

import { ContactFlow, getItems, getSection, getText, type SiteProps } from "../site-primitives";

export function RealEstateSite({ schema }: SiteProps) {
  const hero = getSection(schema, "hero");
  const listings = getSection(schema, "listings");
  return (
    <main className="bg-[#f3eadb] text-[#111]">
      <section className="grid min-h-[740px] lg:grid-cols-[.9fr_1.1fr]">
        <div className="p-8 lg:p-16"><p>Premium property advisory</p><h1 className="mt-6 text-6xl font-semibold leading-none lg:text-8xl">{getText(hero, "title", schema.name)}</h1></div>
        <div className="bg-[linear-gradient(135deg,#111,#c5a46d,#fffaf2)]" />
      </section>
      <section className="grid gap-4 p-8 md:grid-cols-3">
        {getItems(listings, "items", ["Penthouse", "Villa", "Townhouse"]).map((item) => <div key={String(item)} className="min-h-72 bg-white p-5 text-2xl shadow-xl">{String(item)}<button className="mt-8 block underline">Open detail</button></div>)}
      </section>
      <section className="p-8"><ContactFlow schema={schema} tone="light" /></section>
    </main>
  );
}
