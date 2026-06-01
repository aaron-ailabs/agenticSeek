import { NextResponse } from "next/server";
import { searchIndex } from "@/lib/search";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const q = request.nextUrl.searchParams.get("q");
    const topK = Number(request.nextUrl.searchParams.get("topK") ?? "10");
    if (!q?.trim()) {
      return NextResponse.json({ error: "q is required" }, { status: 400 });
    }

    const results = await searchIndex.query({ query: q, topK });
    return NextResponse.json({ results });
  } catch (err) {
    console.error("[search/query] Error:", err);
    return NextResponse.json({ results: [] }, { status: 200 });
  }
}
