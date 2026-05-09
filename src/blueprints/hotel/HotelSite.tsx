"use client";

import { BookingFlow, getItems, getSection, getText, type SiteProps } from "../site-primitives";

export function HotelSite({ schema }: SiteProps) {
  const hero = getSection(schema, "hero");
  const rooms = getSection(schema, "rooms");
  return (
    <main className="bg-[#061923] text-white">
      <section className="relative min-h-[820px] bg-[radial-gradient(ellipse_at_70%_20%,rgba(125,211,252,.35),transparent_34rem),linear-gradient(135deg,#061923,#123547)]">
        <div className="absolute right-8 top-8 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-xl">24°C · 19:42</div>
        <div className="grid min-h-[820px] items-end gap-8 p-8 lg:grid-cols-[1fr_420px] lg:p-16">
          <div><p className="text-sky-200">Resort concierge</p><h1 className="mt-5 max-w-4xl text-7xl font-semibold leading-none">{getText(hero, "title", schema.name)}</h1></div>
          <BookingFlow schema={schema} mode="hotel" />
        </div>
      </section>
      <section className="grid gap-4 p-8 md:grid-cols-3">
        {getItems(rooms, "items", ["Ocean suite", "Garden villa", "Private loft"]).map((item) => <div key={String(item)} className="h-72 rounded-[2rem] bg-white/10 p-5 text-2xl">{String(item)}</div>)}
      </section>
    </main>
  );
}
