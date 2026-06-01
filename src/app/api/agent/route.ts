import { streamText } from "ai";
import { xai } from "@ai-sdk/xai";
import { redis } from "@/lib/redis";
import type { NextRequest } from "next/server";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId = "default" } = await request.json();

    if (!message?.trim()) {
      return new Response("Message is required", { status: 400 });
    }

    // Persist message to Redis chat history (capped at 100 entries)
    const historyKey = `chat:history:${sessionId}`;
    const entry = JSON.stringify({
      role: "user",
      content: message,
      timestamp: new Date().toISOString(),
    });
    await redis.lpush(historyKey, entry);
    await redis.ltrim(historyKey, 0, 99);

    const result = streamText({
      model: xai("grok-3-mini"),
      system:
        "You are Velocity, an AI agentic assistant. You help users complete tasks, write code, search the web, and reason through complex problems. Be concise, precise, and proactive.",
      prompt: message,
    });

    return result.toTextStreamResponse();
  } catch (err) {
    console.error("[agent] Error:", err);
    return new Response("Agent error", { status: 500 });
  }
}
