"use client";

import { CommerceShelf, getItems, getSection, getText, type SiteProps } from "../site-primitives";

export function CourseAcademySite({ schema }: SiteProps) {
  const hero = getSection(schema, "hero");
  const courses = getSection(schema, "courses");
  return (
    <main className="bg-[#f8fbff] text-slate-950">
      <section className="grid min-h-[720px] items-center gap-8 p-8 lg:grid-cols-[1fr_1fr] lg:p-16">
        <div><p className="text-blue-600">ONLINE ACADEMY</p><h1 className="mt-6 text-6xl font-black leading-none lg:text-8xl">{getText(hero, "title", schema.name)}</h1></div>
        <div className="rounded-[2rem] bg-white p-5 shadow-2xl"><div className="h-60 rounded-[1.5rem] bg-[linear-gradient(135deg,#60a5fa,#8b5cf6,#22c55e)]" /><p className="mt-4 font-semibold">Student dashboard · 72% progress</p></div>
      </section>
      <section className="grid gap-4 p-8 md:grid-cols-4">{getItems(courses, "items", ["AI design", "Frontend", "Launch", "Data"]).map((item) => <div key={String(item)} className="rounded-[2rem] bg-white p-5 shadow-lg">{String(item)}<button className="mt-8 block rounded-full bg-slate-950 px-4 py-2 text-white">Enroll</button></div>)}</section>
      <section className="p-8"><CommerceShelf schema={schema} tone="light" /></section>
    </main>
  );
}
