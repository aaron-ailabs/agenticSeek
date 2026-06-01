import { del } from "@vercel/blob";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const { url } = await request.json();
    if (!url) {
      return NextResponse.json({ error: "url is required" }, { status: 400 });
    }
    await del(url);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[blob/delete] Error:", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
