import { NextResponse } from "next/server";
import { applyPatch } from "@/core/schema-diff";
import { refineProject } from "@/core/refinement-engine";
import type { PatchOperation, ProjectSchema } from "@/core/types";

const anthropicEndpoint = "https://api.anthropic.com/v1/messages";
const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-20250514";

type RefineRequest = {
  command: string;
  schema: ProjectSchema;
  context?: {
    activePageId?: string;
    affectedSectionIds?: string[];
  };
};

export async function POST(request: Request) {
  const body = (await request.json()) as RefineRequest;
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    const fallback = refineProject(body.command, body.schema);
    return NextResponse.json({ source: "local", schema: fallback.schema, explanation: fallback.explanation, patches: [] });
  }

  const activePage = body.schema.pages.find((page) => page.id === body.context?.activePageId) ?? body.schema.pages[0];
  const minimalContext = {
    command: body.command,
    project: {
      blueprintKey: body.schema.blueprintKey,
      niche: body.schema.niche,
      theme: body.schema.theme,
      page: {
        id: activePage.id,
        type: activePage.type,
        title: activePage.title,
        sections: activePage.sections.map((section) => ({
          id: section.id,
          kind: section.kind,
          label: section.label,
          visible: section.visible,
          data: {
            title: section.data.title,
            cta: section.data.cta,
            items: section.data.items,
            plans: section.data.plans
          }
        }))
      }
    }
  };

  try {
    const response = await fetch(anthropicEndpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model,
        max_tokens: 900,
        system:
          "You are a schema patch planner for a deterministic blueprint website builder. Return only compact JSON with keys explanation and patches. Patches must match the provided PatchOperation union: updateTheme, updateSection, addSection, removeSection, toggleSectionVisibility. Never regenerate the whole site.",
        messages: [
          {
            role: "user",
            content: JSON.stringify(minimalContext)
          }
        ]
      })
    });

    if (!response.ok) throw new Error(`Anthropic request failed: ${response.status}`);

    const payload = await response.json();
    const text = payload.content?.find((part: { type: string; text?: string }) => part.type === "text")?.text ?? "{}";
    const parsed = JSON.parse(text) as { explanation?: string; patches?: PatchOperation[] };
    const patches = Array.isArray(parsed.patches) ? parsed.patches.slice(0, 6) : [];
    const next = patches.reduce((schema, patch) => applyPatch(schema, patch), body.schema);

    return NextResponse.json({
      source: "anthropic",
      schema: next,
      explanation: parsed.explanation ?? "Applied AI-planned schema patches.",
      patches
    });
  } catch {
    const fallback = refineProject(body.command, body.schema);
    return NextResponse.json({ source: "local-fallback", schema: fallback.schema, explanation: fallback.explanation, patches: [] });
  }
}
