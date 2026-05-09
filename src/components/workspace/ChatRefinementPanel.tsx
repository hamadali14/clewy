"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { refineProject } from "@/core/refinement-engine";
import type { ProjectSchema } from "@/core/types";
import { GradientButton } from "@/components/ui/GradientButton";

const chips = ["make it more premium", "change color to blue", "add testimonials", "remove pricing", "make hero shorter", "dark mode"];

export function ChatRefinementPanel({ schema, onChange }: { schema: ProjectSchema; onChange: (schema: ProjectSchema) => void }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "system"; text: string }>>([
    { role: "system", text: "Workspace ready. Refinements apply as deterministic schema patches." }
  ]);

  function submit(command = input) {
    const trimmed = command.trim();
    if (!trimmed) return;
    const result = refineProject(trimmed, schema);
    onChange(result.schema);
    setMessages((current) => [...current, { role: "user", text: trimmed }, { role: "system", text: result.explanation }]);
    setInput("");
  }

  return (
    <div className="flex h-full flex-col">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/42">Refinement</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {chips.map((chip) => (
          <button key={chip} onClick={() => submit(chip)} className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1.5 text-xs text-white/64 transition hover:bg-white/12 hover:text-white">
            {chip}
          </button>
        ))}
      </div>
      <div className="preview-scroll mt-4 min-h-56 flex-1 space-y-3 overflow-auto rounded-3xl border border-white/10 bg-black/16 p-3">
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={`${message.role}-${index}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={message.role === "user" ? "ml-auto max-w-[88%] rounded-2xl bg-white/14 p-3 text-sm text-white" : "max-w-[92%] rounded-2xl bg-white/[0.055] p-3 text-sm text-white/66"}
            >
              {message.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="mt-3 flex gap-2">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") submit();
          }}
          placeholder="Type a refinement"
          className="min-w-0 flex-1 rounded-full border border-white/12 bg-white/[0.07] px-4 text-sm text-white outline-none placeholder:text-white/34 focus:border-white/28"
        />
        <GradientButton type="button" onClick={() => submit()} className="h-11 w-11 px-0" aria-label="Send refinement">
          <Send className="h-4 w-4" />
        </GradientButton>
      </div>
    </div>
  );
}
