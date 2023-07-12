import { tracer, context } from "../../../instrumentation";
import { NextResponse } from "next/server";

export async function GET() {
  const span = tracer.startSpan("getUser", undefined, context.active());
  const ms = Math.floor(Math.random() * 1000);
  span.setAttribute("sleep", ms);
  await new Promise((resolve) => setTimeout(resolve, ms));
  NextResponse.json({ greetings: `Hi there ${ms}!` }, { status: 200 });
  return span.end();
}
