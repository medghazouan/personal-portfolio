import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Message } from "@/models/Message";
import { sendContactEmail } from "@/lib/email";

/* ── Lazy rate limiter — only initialised when Upstash creds exist ── */
async function checkRateLimit(ip: string): Promise<{ allowed: boolean }> {
  const url   = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  // Skip rate limiting if creds are missing / placeholder
  if (!url || !token || url.includes("placeholder") || url.includes("xxxx")) {
    return { allowed: true };
  }

  try {
    const { Ratelimit } = await import("@upstash/ratelimit");
    const { Redis }     = await import("@upstash/redis");

    const ratelimit = new Ratelimit({
      redis:     new Redis({ url, token }),
      limiter:   Ratelimit.slidingWindow(3, "60 s"),
      analytics: false,
    });

    const { success } = await ratelimit.limit(ip);
    return { allowed: success };
  } catch (err) {
    // If Upstash fails for any reason, allow the request through
    console.warn("[contact] Rate limiter error — skipping:", err);
    return { allowed: true };
  }
}

export async function POST(req: NextRequest) {
  /* 1. Parse body first — so we always return valid JSON on bad input */
  let body: { name?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "INVALID_PAYLOAD" }, { status: 400 });
  }

  /* 2. Validate */
  const { name, email, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "MISSING_REQUIRED_FIELDS: name, email, message" },
      { status: 422 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "INVALID_FREQUENCY: malformed email address" },
      { status: 422 }
    );
  }

  /* 3. Rate limit by IP */
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  const { allowed } = await checkRateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { error: "TRANSMISSION_RATE_EXCEEDED. Try again shortly." },
      { status: 429 }
    );
  }

  /* 4. Persist to MongoDB */
  try {
    await connectDB();
    await Message.create({
      name:    name.trim().slice(0, 120),
      email:   email.trim().toLowerCase(),
      message: message.trim().slice(0, 2000),
      ip,
    });
  } catch (err) {
    console.error("[contact] DB error:", err);
    return NextResponse.json(
      { error: "DB_WRITE_FAILED" },
      { status: 500 }
    );
  }

  /* 5. Send email — non-blocking, never fails the request */
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey && !resendKey.includes("placeholder") && resendKey !== "re_placeholder") {
    try {
      await sendContactEmail({
        name:    name.trim(),
        email:   email.trim(),
        message: message.trim(),
      });
    } catch (err) {
      console.error("[contact] Email send failed:", err);
    }
  }

  return NextResponse.json(
    { status: "SIGNAL_RECEIVED", message: "Transmission logged successfully." },
    { status: 201 }
  );
}