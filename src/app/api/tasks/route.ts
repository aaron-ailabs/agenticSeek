import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import type { NextRequest } from "next/server";

export interface Task {
  id: string;
  title: string;
  status: "pending" | "running" | "done" | "error";
  created_at: string;
  result?: string;
}

const TASKS_KEY = "velocity:tasks";

export async function GET() {
  try {
    const raw = await redis.lrange(TASKS_KEY, 0, 49);
    const tasks: Task[] = raw.map((item) =>
      typeof item === "string" ? JSON.parse(item) : (item as Task)
    );
    return NextResponse.json({ tasks });
  } catch (err) {
    console.error("[tasks] GET error:", err);
    return NextResponse.json({ tasks: [] }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json();
    if (!title?.trim()) {
      return NextResponse.json({ error: "title is required" }, { status: 400 });
    }

    const task: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      status: "pending",
      created_at: new Date().toISOString(),
    };

    await redis.lpush(TASKS_KEY, JSON.stringify(task));
    await redis.ltrim(TASKS_KEY, 0, 199);

    return NextResponse.json({ task }, { status: 201 });
  } catch (err) {
    console.error("[tasks] POST error:", err);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}
