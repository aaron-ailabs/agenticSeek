import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const blob = await put(file.name, file, { access: "private" });

    return NextResponse.json({ pathname: blob.pathname, url: blob.url, size: file.size, contentType: file.type });
  } catch (err) {
    console.error("[blob/upload] Error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
