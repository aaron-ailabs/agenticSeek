import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import type { NextRequest } from "next/server";

const SETTINGS_KEY = "velocity:settings";

export async function GET() {
  try {
    const raw = await redis.get(SETTINGS_KEY);
    const settings = raw
      ? (typeof raw === "string" ? JSON.parse(raw) : raw)
      : {};
    // Mask secret values — return only presence booleans
    const masked = Object.fromEntries(
      Object.keys(settings).map((k) => [k, !!settings[k]])
    );
    return NextResponse.json({ settings: masked });
  } catch (err) {
    console.error("[settings] GET error:", err);
    return NextResponse.json({ settings: {} }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const allowed = ["groq", "grok", "neon", "redis", "redisToken", "search", "stripe", "blob"];

    // Merge with existing, only update allowed keys with non-empty values
    const existing: Record<string, string> = (() => {
      return {};
    })();

    const raw = await redis.get(SETTINGS_KEY);
    const current: Record<string, string> = raw
      ? (typeof raw === "string" ? JSON.parse(raw) : (raw as Record<string, string>))
      : {};

    const updated: Record<string, string> = { ...current };
    for (const key of allowed) {
      if (body[key] !== undefined && body[key] !== "") {
        updated[key] = body[key];
      }
    }

    await redis.set(SETTINGS_KEY, JSON.stringify(updated));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[settings] POST error:", err);
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}
