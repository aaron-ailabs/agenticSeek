import { streamText } from "ai";
import { xai } from "@ai-sdk/xai";
import type { NextRequest } from "next/server";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const { prompt, model = "grok-3-mini" } = await request.json();

    if (!prompt?.trim()) {
      return new Response("Prompt is required", { status: 400 });
    }

    const result = streamText({
      model: xai(model),
      prompt: prompt.trim(),
      system:
        "You are a helpful AI assistant. Respond clearly and concisely.",
    });

    return result.toTextStreamResponse();
  } catch (err) {
    console.error("[llm] Error:", err);
    return new Response("LLM error", { status: 500 });
  }
}
