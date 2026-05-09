import { NextResponse } from "next/server";
import { applyRefinementPatches } from "@/core/apply-patch";
import { generateAnthropicPatches } from "@/core/anthropic-client";
import { createLocalRefinementPatches } from "@/core/local-refinement";
import { sanitizePatchResponse } from "@/core/refinement-patch-schema";
import type { ProjectSchema } from "@/core/types";

type RefineRequest = {
  instruction?: string;
  command?: string;
  schema: ProjectSchema;
  blueprintKey?: string;
  context?: {
    activePageId?: string;
  };
};

export async function POST(request: Request) {
  const body = (await request.json()) as RefineRequest;
  const instruction = body.instruction ?? body.command ?? "";

  try {
    const ai = await generateAnthropicPatches({
      command: instruction,
      schema: body.schema,
      activePageId: body.context?.activePageId
    });
    if (ai?.patches.length) {
      const sanitized = sanitizePatchResponse(ai);
      const schema = applyRefinementPatches(body.schema, sanitized.patches);
      return NextResponse.json({ source: "anthropic", schema, explanation: sanitized.explanation, patches: sanitized.patches });
    }
  } catch {
    // Local deterministic fallback below.
  }

  const local = createLocalRefinementPatches(instruction, body.schema);
  const schema = applyRefinementPatches(body.schema, local.patches);
  return NextResponse.json({ source: "local", schema, explanation: local.explanation, patches: local.patches });
}
