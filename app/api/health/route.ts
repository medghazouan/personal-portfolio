import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { status: "ok", ts: Date.now() },
    {
      headers: {
        "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
      },
    }
  );
}