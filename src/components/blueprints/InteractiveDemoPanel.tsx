"use client";

import { useState } from "react";
import { Check, Play } from "lucide-react";
import type { BlueprintDefinition } from "@/core/blueprint-types";
import { demoBackend } from "@/lib/demo-backend";

export function InteractiveDemoPanel({ blueprint }: { blueprint: BlueprintDefinition }) {
  const [message, setMessage] = useState("Demo adapter is ready.");

  const actions = [
    { label: "Create booking", run: () => demoBackend.createBooking({ blueprintKey: blueprint.key, name: "Demo Visitor" }) },
    { label: "Add cart item", run: () => demoBackend.addToCart({ blueprintKey: blueprint.key, item: blueprint.name }) },
    { label: "Submit contact", run: () => demoBackend.submitContactForm({ blueprintKey: blueprint.key, email: "demo@example.com" }) },
    { label: "Create review", run: () => demoBackend.createReview({ blueprintKey: blueprint.key, body: "Polished demo interaction" }) }
  ];

  return (
    <div className="rounded-[1.7rem] border border-white/12 bg-white/[0.065] p-5 backdrop-blur-2xl">
      <p className="text-xs uppercase tracking-[0.2em] text-white/38">Interactive demo actions</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => {
              action.run();
              setMessage(`${action.label} completed locally.`);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-3 text-sm font-semibold text-white/70 transition hover:bg-white hover:text-slate-950"
          >
            <Play className="h-4 w-4" />
            {action.label}
          </button>
        ))}
      </div>
      <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-200/20 bg-emerald-200/10 px-3 py-2 text-sm text-emerald-50">
        <Check className="h-4 w-4" />
        {message}
      </p>
    </div>
  );
}
