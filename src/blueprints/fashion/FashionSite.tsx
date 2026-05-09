"use client";

import { CommerceShelf, getSection, getText, type SiteProps } from "../site-primitives";

export function FashionSite({ schema }: SiteProps) {
  const hero = getSection(schema, "hero");
  return (
    <main className="bg-[#050505] text-white">
      <section className="min-h-[780px] px-6 py-8">
        <div className="flex justify-between text-xs uppercase tracking-[0.4em] text-white/50"><span>{schema.name}</span><span>Lookbook / Shop / Cart</span></div>
        <h1 className="mt-20 text-[16vw] font-black uppercase leading-[0.75]">{getText(hero, "title", schema.name)}</h1>
        <div className="mt-12 grid gap-4 lg:grid-cols-[1.4fr_.6fr]">
          <div className="h-[420px] bg-[linear-gradient(90deg,#111,#f5f5f4,#7f1d1d)]" />
          <CommerceShelf schema={schema} />
        </div>
      </section>
    </main>
  );
}
