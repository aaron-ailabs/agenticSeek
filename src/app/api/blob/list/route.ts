import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { blobs } = await list();
    const files = blobs.map((b) => ({
      pathname: b.pathname,
      url: b.url,
      size: b.size,
      uploadedAt: b.uploadedAt,
    }));
    return NextResponse.json({ files });
  } catch (err) {
    console.error("[blob/list] Error:", err);
    return NextResponse.json({ files: [] }, { status: 200 });
  }
}
