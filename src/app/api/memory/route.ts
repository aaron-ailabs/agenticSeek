import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import type { NextRequest } from "next/server";

const MEMORY_HASH = "velocity:memory";

export async function GET() {
  try {
    const raw = await redis.hgetall(MEMORY_HASH);
    const entries = raw
      ? Object.entries(raw).map(([key, value]) => ({ key, value: String(value) }))
      : [];
    return NextResponse.json({ entries });
  } catch (err) {
    console.error("[memory] GET error:", err);
    return NextResponse.json({ entries: [] }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { key, value } = await request.json();
    if (!key?.trim() || value === undefined) {
      return NextResponse.json({ error: "key and value are required" }, { status: 400 });
    }
    await redis.hset(MEMORY_HASH, { [key.trim()]: String(value) });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[memory] POST error:", err);
    return NextResponse.json({ error: "Failed to save memory" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { key } = await request.json();
    if (!key?.trim()) {
      return NextResponse.json({ error: "key is required" }, { status: 400 });
    }
    await redis.hdel(MEMORY_HASH, key.trim());
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[memory] DELETE error:", err);
    return NextResponse.json({ error: "Failed to delete memory entry" }, { status: 500 });
  }
}
