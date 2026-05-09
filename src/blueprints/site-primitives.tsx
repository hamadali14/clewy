"use client";

import { useMemo, useState } from "react";
import type { ProjectSchema, SectionKind, SectionNode } from "@/core/types";
import { addToCart, checkout, getCart, submitBooking, submitContact, updateCart } from "@/core/preview-actions";
import { SmartInput } from "@/components/ui/SmartInput";
import { SmartSelect } from "@/components/ui/SmartSelect";
import { SmartTextarea } from "@/components/ui/SmartTextarea";
import { cn } from "@/lib/utils";

export type SiteProps = { schema: ProjectSchema };

export function getSection(schema: ProjectSchema, kind: SectionKind) {
  return schema.pages.flatMap((page) => page.sections).find((section) => section.kind === kind);
}

export function getText(section: SectionNode | undefined, key: string, fallback: string) {
  const value = section?.data[key];
  return typeof value === "string" ? value : fallback;
}

export function getItems(section: SectionNode | undefined, key = "items", fallback: string[] = []) {
  const value = section?.data[key];
  if (Array.isArray(value)) return value;
  return fallback;
}

export function BookingFlow({
  schema,
  mode = "general",
  tone = "dark"
}: {
  schema: ProjectSchema;
  mode?: "restaurant" | "barber" | "hotel" | "general";
  tone?: "light" | "dark";
}) {
  const [form, setForm] = useState<Record<string, string>>({});
  const [confirmation, setConfirmation] = useState<Record<string, string> | null>(null);
  const fields =
    mode === "restaurant"
      ? ["name", "email", "phone", "date", "time", "guests", "occasion"]
      : mode === "barber"
        ? ["name", "phone", "service", "barber", "date", "time"]
        : mode === "hotel"
          ? ["name", "email", "room", "check-in", "guests"]
          : ["name", "email", "phone", "date", "service"];

  function submit() {
    const missing = fields.filter((field) => !form[field]?.trim());
    if (missing.length) {
      setConfirmation({ status: `Missing ${missing[0]}` });
      return;
    }
    const saved = submitBooking({ ...form, blueprint: schema.blueprintKey });
    setConfirmation(saved);
  }

  return (
    <div className={cn("rounded-[2rem] border p-4", tone === "light" ? "border-slate-200 bg-white/75 text-slate-950" : "border-white/12 bg-white/[0.07] text-white")}>
      <div className="grid gap-3 sm:grid-cols-2">
        {fields.map((field) =>
          ["service", "barber", "room", "guests"].includes(field) ? (
            <SmartSelect key={field} tone={tone} value={form[field] ?? ""} onChange={(event) => setForm((current) => ({ ...current, [field]: event.target.value }))}>
              <option value="">{field}</option>
              <option>{field === "room" ? "Ocean suite" : field === "barber" ? "Abo" : field === "guests" ? "2" : "Signature"}</option>
              <option>{field === "room" ? "Garden villa" : field === "barber" ? "Samir" : field === "guests" ? "4" : "Premium"}</option>
            </SmartSelect>
          ) : (
            <SmartInput key={field} tone={tone} placeholder={field} value={form[field] ?? ""} onChange={(event) => setForm((current) => ({ ...current, [field]: event.target.value }))} />
          )
        )}
      </div>
      <button onClick={submit} className="mt-4 rounded-full px-5 py-3 text-sm font-semibold text-slate-950" style={{ background: schema.theme.accent }}>
        {mode === "restaurant" ? "Request reservation" : mode === "barber" ? "Book appointment" : "Confirm request"}
      </button>
      {confirmation && (
        <div className={cn("mt-4 rounded-2xl p-4 text-sm", tone === "light" ? "bg-slate-100 text-slate-700" : "bg-slate-950/45 text-white/78")}>
          <strong>{mode === "restaurant" ? "Reservation request received" : mode === "barber" ? "Appointment booked" : "Request received"}</strong>
          <pre className="mt-2 whitespace-pre-wrap font-sans text-xs opacity-70">{JSON.stringify(confirmation, null, 2)}</pre>
          <button onClick={() => setConfirmation(null)} className="mt-2 text-xs underline">Close</button>
        </div>
      )}
    </div>
  );
}

export function ContactFlow({ schema, tone = "dark" }: { schema: ProjectSchema; tone?: "light" | "dark" }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [done, setDone] = useState(false);
  return (
    <div className="grid gap-3">
      <SmartInput tone={tone} placeholder="Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
      <SmartInput tone={tone} placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
      <SmartTextarea tone={tone} placeholder="Message" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} />
      <button
        onClick={() => {
          submitContact({ ...form, blueprint: schema.blueprintKey });
          setDone(true);
        }}
        className="rounded-full px-5 py-3 text-sm font-semibold text-slate-950"
        style={{ background: schema.theme.accent }}
      >
        Send
      </button>
      {done && <div className="rounded-2xl bg-emerald-400/14 p-3 text-sm">Message saved locally.</div>}
    </div>
  );
}

export function CommerceShelf({ schema, tone = "dark" }: { schema: ProjectSchema; tone?: "light" | "dark" }) {
  const productSection = getSection(schema, "products") ?? getSection(schema, "pricing");
  const products = getItems(productSection, "items", ["Signature item", "Limited release", "Collector piece"]);
  const [cart, setCart] = useState<Array<Record<string, unknown>>>(() => getCart());
  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const total = useMemo(() => cart.length * 120, [cart.length]);
  return (
    <div>
      <div className="grid gap-3 md:grid-cols-3">
        {products.slice(0, 3).map((product, index) => (
          <button
            key={String(product)}
            onClick={() => {
              setCart(addToCart({ name: typeof product === "string" ? product : `Product ${index + 1}`, price: 120 + index * 80 }));
              setOpen(true);
            }}
            className={cn("min-h-44 rounded-[2rem] border p-5 text-left transition hover:-translate-y-1", tone === "light" ? "border-slate-200 bg-white/80 text-slate-950" : "border-white/12 bg-white/[0.07] text-white")}
          >
            <div className="h-20 rounded-[1.5rem]" style={{ background: `linear-gradient(135deg, ${schema.theme.accent}, transparent)` }} />
            <p className="mt-4 font-semibold">{String(product)}</p>
            <p className="mt-1 text-sm opacity-60">${120 + index * 80}</p>
          </button>
        ))}
      </div>
      {open && (
        <div className="fixed right-5 top-24 z-50 w-80 rounded-[2rem] border border-white/12 bg-slate-950/90 p-5 text-white shadow-2xl backdrop-blur-2xl">
          <h3 className="text-xl font-semibold">Cart</h3>
          <div className="mt-4 space-y-2">
            {cart.map((item, index) => (
              <div key={String(item.id)} className="flex items-center justify-between rounded-2xl bg-white/8 p-3 text-sm">
                <span>{String(item.name)}</span>
                <button onClick={() => setCart(updateCart(cart.filter((_, itemIndex) => itemIndex !== index)))}>Remove</button>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-white/60">Total ${total}</p>
          <button
            onClick={() => {
              checkout({ name: "Preview customer", email: "demo@example.com" });
              setCart([]);
              setConfirmed(true);
            }}
            className="mt-4 w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
          >
            Checkout
          </button>
          {confirmed && <p className="mt-3 rounded-2xl bg-emerald-400/15 p-3 text-sm">Order confirmation saved.</p>}
          <button onClick={() => setOpen(false)} className="mt-3 text-xs text-white/50 underline">Close</button>
        </div>
      )}
    </div>
  );
}
