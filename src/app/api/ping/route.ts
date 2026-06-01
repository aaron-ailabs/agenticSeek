import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET() {
  try {
    // Ping Redis as the canonical liveness check
    await redis.ping();
    return NextResponse.json({ status: "ok", timestamp: new Date().toISOString() });
  } catch (err) {
    console.error("[ping] Redis unreachable:", err);
    return NextResponse.json(
      { status: "error", error: "Redis unreachable" },
      { status: 503 }
    );
  }
}
