import { kv } from "@/lib/kv";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { state } = await req.json();
  const res = kv.set("state", state);
  const previousState = await kv.get("state");
  console.log("updated state : ", { previousState, state , res});
  return NextResponse.json({ success: true });
}

export async function GET() {
  const state = await kv.get("state");
  console.log("state : ", state);
  return NextResponse.json({ state });
}