import { NextResponse } from "next/server";
import { searchIndex } from "@/lib/search";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { id, content, metadata = {} } = await request.json();
    if (!id || !content) {
      return NextResponse.json({ error: "id and content are required" }, { status: 400 });
    }

    await searchIndex.upsert([{ id: String(id), content, metadata }]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[search/upsert] Error:", err);
    return NextResponse.json({ error: "Upsert failed" }, { status: 500 });
  }
}
