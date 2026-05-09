"use client";

import { BookingFlow, getItems, getSection, getText, type SiteProps } from "../site-primitives";

export function BarbershopSite({ schema }: SiteProps) {
  const hero = getSection(schema, "hero");
  const services = getSection(schema, "services");
  return (
    <main className="min-h-screen overflow-hidden bg-[#080504] text-[#f1e4d2]">
      <section className="grid min-h-[760px] lg:grid-cols-[90px_1fr_1.1fr]">
        <aside className="hidden border-r border-[#c08457]/20 px-4 py-8 [writing-mode:vertical-rl] lg:block">BLACKLINE · SHAVE · CUT · RITUAL</aside>
        <div className="flex flex-col justify-between p-8 lg:p-14">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-[#c08457]">{getText(hero, "eyebrow", "Modern barbershop")}</p>
            <h1 className="mt-8 max-w-3xl text-6xl font-black uppercase leading-[0.88] lg:text-8xl">{getText(hero, "title", schema.name)}</h1>
          </div>
          <div className="grid gap-3">
            {getItems(services, "items", ["Fade", "Beard trim", "Hot towel shave"]).map((item, index) => (
              <button key={String(item)} className="group flex items-center justify-between border-b border-[#c08457]/20 py-4 text-left text-2xl uppercase">
                {String(item)}
                <span className="text-[#c08457] transition group-hover:translate-x-2">0{index + 1}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="relative min-h-[520px] bg-[radial-gradient(ellipse_at_40%_25%,rgba(192,132,87,.45),transparent_34rem),linear-gradient(135deg,#2a1710,#050403)] p-8">
          <div className="absolute inset-8 border border-[#c08457]/20" />
          <div className="absolute bottom-8 left-8 right-8 rounded-[2rem] border border-white/10 bg-black/35 p-5 backdrop-blur-xl">
            <h2 className="text-2xl font-bold uppercase">Choose cut → barber → time</h2>
            <div className="mt-5"><BookingFlow schema={schema} mode="barber" /></div>
          </div>
        </div>
      </section>
    </main>
  );
}
