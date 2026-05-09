"use client";

import { BookingFlow, getItems, getSection, getText, type SiteProps } from "../site-primitives";

export function RestaurantSite({ schema }: SiteProps) {
  const hero = getSection(schema, "hero");
  const menu = getSection(schema, "menu");
  return (
    <main className="bg-[#050403] text-[#f8ead1]">
      <section className="relative min-h-[820px] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(214,180,106,.34),transparent_32rem),linear-gradient(135deg,#050403,#1c0f08)]" />
        <nav className="relative z-10 flex items-center justify-between px-8 py-6 text-sm uppercase tracking-[0.28em] text-[#d6b46a]"><span>{schema.name}</span><span>Menu · Reserve · Cellar</span></nav>
        <div className="relative z-10 grid min-h-[680px] items-end gap-8 px-8 pb-10 lg:grid-cols-[1fr_.7fr] lg:px-16">
          <div>
            <p className="text-[#d6b46a]">{getText(hero, "eyebrow", "Fine dining")}</p>
            <h1 className="mt-5 max-w-4xl text-6xl font-semibold leading-none lg:text-8xl">{getText(hero, "title", schema.name)}</h1>
          </div>
          <div className="rounded-[2rem] border border-[#d6b46a]/25 bg-black/35 p-5 backdrop-blur-xl">
            <BookingFlow schema={schema} mode="restaurant" />
          </div>
        </div>
      </section>
      <section className="grid gap-6 px-8 py-20 lg:grid-cols-[.8fr_1.2fr] lg:px-16">
        <h2 className="text-5xl font-semibold">Tasting journey</h2>
        <div className="space-y-4">
          {getItems(menu, "items", ["Charcoal scallop", "Dry-aged duck", "Cloudberry souffle"]).map((item) => (
            <div key={String(item)} className="flex justify-between border-b border-[#d6b46a]/20 py-5 text-2xl"><span>{String(item)}</span><span className="text-[#d6b46a]">Reveal</span></div>
          ))}
        </div>
      </section>
    </main>
  );
}
