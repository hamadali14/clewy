import { buildRefinementPrompt } from "./refinement-prompt";
import { sanitizePatchResponse } from "./refinement-patch-schema";
import type { ProjectSchema } from "./types";

const endpoint = "https://api.anthropic.com/v1/messages";

export async function generateAnthropicPatches({
  command,
  schema,
  activePageId
}: {
  command: string;
  schema: ProjectSchema;
  activePageId?: string;
}) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || "claude-3-5-haiku-latest",
      max_tokens: 900,
      temperature: 0,
      system:
        "You are a patch generator for a deterministic website schema. Return strict JSON only. Never include prose outside JSON. Never regenerate the whole website.",
      messages: [{ role: "user", content: JSON.stringify(buildRefinementPrompt(command, schema, activePageId)) }]
    })
  });

  if (!response.ok) throw new Error(`Anthropic request failed: ${response.status}`);
  const payload = await response.json();
  const text = payload.content?.find((part: { type: string; text?: string }) => part.type === "text")?.text ?? "{}";
  return sanitizePatchResponse(JSON.parse(text));
}
